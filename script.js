const API_URL = (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : 'http://localhost:3000/api/routes');

// Set true for verbose debugging.
const DEBUG = false;

function debugLog(...args) {
  if (DEBUG) console.log(...args);
}

function normalizeElr(elr) {
  const norm = (elr ?? '').toString().trim().toUpperCase();
  return norm || null;
}

// Domain constants
const YARDS_PER_MILE = 1760;
const RULER_TICK_MAJOR_YARDS = YARDS_PER_MILE;
const RULER_TICK_MEDIUM_YARDS = 440;
const RULER_TICK_MINOR_YARDS = 110;
const RULER_TICK_MICRO_YARDS = 22;

const DEFAULT_ROUTE_CODE = 'ECML';
const DEFAULT_YARDS_PER_PIXEL = 1;
const DEFAULT_GRID_SPACING = 50;
const DEFAULT_SCROLL_SIZE_MILES = 10;

// Default initial centering (historically York area). Used when no prior viewport state exists.
const DEFAULT_INITIAL_TARGET_YARDS = 134786;

// Layout/label defaults
const WINDOW_EDGE_MARGIN_RATIO = 0.2;
const DEFAULT_LABEL_OVERLAP_ITERATIONS = 10;
const DEFAULT_LABEL_OVERLAP_PADDING_PX = 2;

let route = null;
let appAPI = null;

// Cache for precomputed tick positions per-route (rebuilt on route load)
let ticksCache = null;

// Preserve viewport state across route reloads (save/edit/delete triggers loadRoute again)
const viewportState = {
  lastCenterYards: null,
  lastVisibleCenterYards: null,
  lastScrollTopPx: null,
  lastScrollLeftPx: null,
  lastShowFromYards: null,
  lastYardsPerPixel: null,
  boundContainer: null,
  boundScrollHandler: null,
  boundResizeHandler: null,
  boundPointerDownHandler: null,
  boundPointerUpHandler: null,
  boundPointerCancelHandler: null,
  isMouseDownInDiagram: false,
  lastNearEdge: false
};

function captureViewportStateFromDom() {
  if (!viewportState.boundContainer) return;

  viewportState.lastScrollTopPx = viewportState.boundContainer.scrollTop;
  viewportState.lastScrollLeftPx = viewportState.boundContainer.scrollLeft;

  if (Number.isFinite(viewportState.lastShowFromYards) && Number.isFinite(viewportState.lastYardsPerPixel)) {
    const visibleCenterX = viewportState.boundContainer.scrollLeft + (viewportState.boundContainer.clientWidth / 2);
    const visibleCenterYards = viewportState.lastShowFromYards + (visibleCenterX * viewportState.lastYardsPerPixel);
    if (Number.isFinite(visibleCenterYards)) {
      viewportState.lastCenterYards = visibleCenterYards;
      viewportState.lastVisibleCenterYards = visibleCenterYards;
    }
  }
}

function buildTracksByTid(nextRoute) {
  const tracksByTid = new Map();
  if (Array.isArray(nextRoute?.tracks)) {
    nextRoute.tracks.forEach(track => {
      const tid = track?.tid;
      if (tid === null || tid === undefined) return;
      const bucket = tracksByTid.get(tid);
      if (bucket) {
        bucket.push(track);
      } else {
        tracksByTid.set(tid, [track]);
      }
    });
  }
  return tracksByTid;
}

// Precompute tick positions for a route's sections to avoid per-yard loops during draw
function computeTicksForRoute(nextRoute) {
  const cache = {
    major: [],
    medium: [],
    minor: [],
    micro: [],
    sections: []
  };

  if (!nextRoute || !Array.isArray(nextRoute.sections)) return cache;

  for (const s of nextRoute.sections) {
    const from = Number(s.from);
    const to = Number(s.to);
    const offset = Number(s.offset) || 0;
    if (!Number.isFinite(from) || !Number.isFinite(to)) continue;

    // store section summary
    cache.sections.push({ from, to, offset, elr: s.elr });

    // helper to generate ticks within this section
    const gen = (spacing, targetArray, skipIfMajorMultiple = false) => {
      const firstRel = Math.ceil((from - offset) / spacing) * spacing;
      const lastRel = Math.floor((to - offset) / spacing) * spacing;
      for (let rel = firstRel; rel <= lastRel; rel += spacing) {
        if (skipIfMajorMultiple && (rel % RULER_TICK_MAJOR_YARDS === 0)) continue;
        const mainY = rel + offset;
        // relative yards inside ELR for labels
        const relative = rel;
        targetArray.push({ mainY, relative, section: s });
      }
    };

    gen(RULER_TICK_MAJOR_YARDS, cache.major, false);
    gen(RULER_TICK_MEDIUM_YARDS, cache.medium, true);
    gen(RULER_TICK_MINOR_YARDS, cache.minor, false);
    gen(RULER_TICK_MICRO_YARDS, cache.micro, false);
  }

  // Sort arrays just in case
  ['major', 'medium', 'minor', 'micro'].forEach(k => cache[k].sort((a, b) => a.mainY - b.mainY));
  return cache;
}

function buildSectionsByElr(nextRoute) {
  const sectionsByElr = new Map();
  if (Array.isArray(nextRoute?.sections)) {
    nextRoute.sections.forEach(section => {
      const normElr = normalizeElr(section?.elr);
      if (!normElr) return;
      if (!sectionsByElr.has(normElr)) {
        sectionsByElr.set(normElr, section);
      }
    });
  }
  return sectionsByElr;
}

function getDiagramDomRefs() {
  const diagramCanvas = document.getElementById('diagramCanvas') || document.getElementById('rulerCanvas');
  return {
    container: document.getElementById('container'),
    logicalSize: document.getElementById('logicalSize'),
    diagramCanvas,
    // Back-compat alias (older markup used this id/name)
    rulerCanvas: diagramCanvas,
    dpr: window.devicePixelRatio || 1
  };
}

function consumeUrlOverlayFromLocation() {
  try {
    if (typeof window === 'undefined' || !window.location) return null;

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const qElr = params.get('elr');
    const qTid = params.get('tid');
    const qMileFrom = params.get('mileFrom');
    const qYardFrom = params.get('yardFrom');
    const qMileTo = params.get('mileTo');
    const qYardTo = params.get('yardTo');
    const qText = params.get('text');

    // No longer require routeCode - we'll auto-discover the route from the ELR
    if (!(qElr && qTid && qMileFrom !== null && qYardFrom !== null && qMileTo !== null && qYardTo !== null)) {
      return null;
    }

    // One-shot: remove overlay params from the URL once consumed, so future route reloads
    // (e.g. triggered by Save) don't keep forcing a recenter.
    if (window.history && typeof window.history.replaceState === 'function') {
      const overlayKeys = ['elr', 'tid', 'mileFrom', 'yardFrom', 'mileTo', 'yardTo', 'text', 'routeCode'];
      let changed = false;
      overlayKeys.forEach(key => {
        if (params.has(key)) {
          params.delete(key);
          changed = true;
        }
      });
      if (changed) {
        url.search = params.toString();
        window.history.replaceState(null, '', url.toString());
      }
    }

    return {
      group: 'URL Overlay',
      elr: qElr,
      tid: parseInt(qTid),
      mileFrom: parseFloat(qMileFrom),
      yardFrom: parseFloat(qYardFrom),
      mileTo: parseFloat(qMileTo),
      yardTo: parseFloat(qYardTo),
      text: qText || ''
    };
  } catch {
    return null;
  }
}

function addOverlayIfMissing(overlay, isDuplicateFn) {
  if (typeof overlayData !== 'undefined') {
    const exists = typeof isDuplicateFn === 'function'
      ? overlayData.some(isDuplicateFn)
      : false;
    if (!exists) {
      overlayData.push(overlay);
    }
    return;
  }

  // Preserve existing behavior: overwrite window.overlayData when overlayData is undefined.
  window.overlayData = [overlay];
}

function computeInitialTargetYards({ lastCenterYards }, config) {
  if (Number.isFinite(lastCenterYards)) return lastCenterYards;
  return DEFAULT_INITIAL_TARGET_YARDS || (config.scrollSizeYards / 2);
}

function createDefaultConfig(nextRoute) {
  return {
    totalYards: nextRoute.length_yards,
    yardsPerPixel: DEFAULT_YARDS_PER_PIXEL,
    horizontalGridSpacing: DEFAULT_GRID_SPACING,
    horizontalGridLinesNo: 100,
    scrollSizeYards: DEFAULT_SCROLL_SIZE_MILES * YARDS_PER_MILE,
    showFromYards: 0,
    showToYards: DEFAULT_SCROLL_SIZE_MILES * YARDS_PER_MILE,
    showArrayOverlays: true,
    showUrlOverlays: true,
    showAltRulers: true
  };
}

function unbindViewportEvents() {
  // Avoid accumulating event listeners on repeated loadRoute() calls
  if (viewportState.boundContainer && viewportState.boundScrollHandler) {
    viewportState.boundContainer.removeEventListener('scroll', viewportState.boundScrollHandler);
  }
  if (viewportState.boundResizeHandler) {
    window.removeEventListener('resize', viewportState.boundResizeHandler);
  }
  if (viewportState.boundContainer && viewportState.boundPointerDownHandler) {
    viewportState.boundContainer.removeEventListener('pointerdown', viewportState.boundPointerDownHandler);
  }
  if (viewportState.boundPointerUpHandler) {
    window.removeEventListener('pointerup', viewportState.boundPointerUpHandler);
  }
  if (viewportState.boundPointerCancelHandler) {
    window.removeEventListener('pointercancel', viewportState.boundPointerCancelHandler);
  }
}

function bindViewportEvents({
  container,
  canvasResize,
  drawAll,
  updateVisibleWindow,
  applyLayoutSizing,
  centerOnYards,
  config,
  setScrollPosX,
  setScrollPosY
}) {
  if (!container) return;

  // Redraw ruler when viewport resizes
  viewportState.boundResizeHandler = () => {
    canvasResize();
    drawAll();
  };
  window.addEventListener('resize', viewportState.boundResizeHandler);

  // Update scroll position with windowed scrolling support
  viewportState.boundContainer = container;

  // Recenter window only when the user releases the mouse button near an edge.
  // This avoids unexpected snapping while the user is still scrolling.
  viewportState.boundPointerDownHandler = (e) => {
    if (e.pointerType === 'mouse' && e.button === 0) {
      viewportState.isMouseDownInDiagram = true;
    }
  };
  viewportState.boundPointerUpHandler = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (!viewportState.isMouseDownInDiagram) return;
    viewportState.isMouseDownInDiagram = false;

    if (viewportState.lastNearEdge && Number.isFinite(viewportState.lastVisibleCenterYards)) {
      updateVisibleWindow(viewportState.lastVisibleCenterYards);
      applyLayoutSizing(false);
      // Maintain view by keeping the same yards under the viewport center
      centerOnYards(viewportState.lastVisibleCenterYards, false);
    }
  };
  viewportState.boundPointerCancelHandler = () => {
    viewportState.isMouseDownInDiagram = false;
  };

  container.addEventListener('pointerdown', viewportState.boundPointerDownHandler);
  window.addEventListener('pointerup', viewportState.boundPointerUpHandler);
  window.addEventListener('pointercancel', viewportState.boundPointerCancelHandler);

  viewportState.boundScrollHandler = () => {
    const scrollX = container.scrollLeft;
    const scrollY = container.scrollTop;
    setScrollPosX(scrollX);
    setScrollPosY(scrollY);
    viewportState.lastScrollTopPx = scrollY;
    viewportState.lastScrollLeftPx = scrollX;
    drawAll();

    // Calculate current visible center in yards
    const visibleCenterX = scrollX + (container.clientWidth / 2);
    const visibleCenterYards = config.showFromYards + (visibleCenterX * config.yardsPerPixel);
    viewportState.lastCenterYards = visibleCenterYards;
    viewportState.lastVisibleCenterYards = visibleCenterYards;
    viewportState.lastShowFromYards = config.showFromYards;
    viewportState.lastYardsPerPixel = config.yardsPerPixel;

    // Check if near edges of window (within 20% from either side)
    const windowMargin = config.scrollSizeYards * WINDOW_EDGE_MARGIN_RATIO;
    const distanceFromStart = visibleCenterYards - config.showFromYards;
    const distanceFromEnd = config.showToYards - visibleCenterYards;
    viewportState.lastNearEdge = distanceFromStart < windowMargin || distanceFromEnd < windowMargin;
  };

  container.addEventListener('scroll', viewportState.boundScrollHandler);
}

function drawStationsLayer({
  ctx,
  route,
  config,
  tracksByTid,
  withCanvasState,
  getVisibleBounds,
  getRangeMinMax,
  segmentOverlapsRange,
  getYAtJunction,
  getX,
  getY
}) {
  if (!route?.stations?.length) return;

  withCanvasState(() => {
    const {
      leftYards: visibleLeftLimitYards,
      rightYards: visibleRightLimitYards,
      topGridY: visibleTopLimitY,
      bottomGridY: visibleBottomLimitY
    } = getVisibleBounds();

    // Most labels in this diagram are placed by their center.
    ctx.textBaseline = 'middle';

    route.stations.forEach(station => {
      // Find the min and max platform extents for this station
      let stationMinYard = null;
      let stationMaxYard = null;

      station.platforms.forEach(platform => {
        if (stationMinYard === null || platform.from < stationMinYard) {
          stationMinYard = platform.from;
        }
        if (stationMaxYard === null || platform.to > stationMaxYard) {
          stationMaxYard = platform.to;
        }
      });

      // Check if any platform is within horizontal viewport bounds
      if (stationMinYard === null || stationMaxYard === null ||
        stationMaxYard < visibleLeftLimitYards || stationMinYard > visibleRightLimitYards) {
        return; // Skip station if no platforms are in horizontal viewport
      }

      // Label the station name at the top of the diagram
      const stationX = getX(station.at);
      ctx.font = '16px Arial';
      ctx.fillStyle = 'blue';
      ctx.textAlign = 'center';
      ctx.fillText(station.name, stationX, 15);

      // Draw each platform
      station.platforms.forEach(platform => {
        const candidates = tracksByTid.get(platform.track) || [];
        const track = candidates.find(t => {
          // Check if any segment overlaps with platform
          const { min: platMin, max: platMax } = getRangeMinMax(platform.from, platform.to);
          return t.shape.some(seg => {
            return segmentOverlapsRange(seg, platMin, platMax);
          });
        });
        if (!track) return;
        // Get the tracks vertical grid number
        const platformMid = (platform.from + platform.to) / 2;
        const trackY = getYAtJunction(platform.track, platformMid, platform.elr);
        if (trackY === null) return;

        // Check if platform is within vertical viewport bounds
        if (trackY < visibleTopLimitY || trackY > visibleBottomLimitY) {
          return; // Skip platform if outside vertical viewport
        }

        // Get the platforms start and end X positions
        const platformStartX = getX(platform.from);
        const platformEndX = getX(platform.to);
        // Draw the platform above or below the track in the first 1/3 or last 1/3 of the horizontal grid spacing
        const trackYPos = getY(trackY, false);
        let platformYPos;
        if (platform.position === 'above') {
          platformYPos = trackYPos;
        } else {
          platformYPos = trackYPos + ((config.horizontalGridSpacing / 3) * 2);
        }
        ctx.fillStyle = 'red';
        ctx.fillRect(platformStartX, platformYPos, platformEndX - platformStartX, (config.horizontalGridSpacing / 3));
        // Label the platform with platform number
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`P${platform.platformNo}`, platformStartX + (platformEndX - platformStartX) / 2, platformYPos + (config.horizontalGridSpacing / 6));
      });
    });
  });
}

function drawRulerLayer({
  ctx,
  diagramCanvas,
  route,
  config,
  withCanvasState,
  getVisibleBounds,
  drawLine,
  getX,
  yardsToMiles_text
}) {
  withCanvasState(() => {
    ctx.clearRect(0, 0, diagramCanvas.width, diagramCanvas.height);

    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

    drawLine(0, 0, diagramCanvas.clientWidth, 0, 4, 'black');

    // --- Alt-route ruler (optional) ---
    // Draws a simple secondary ruler beneath the main ruler when a track has
    // altRoute.showAltRuler=true and its altRoute ELR exists in altRouteYardageMap.
    // The ruler spans the merged extents of selected TIDs (merge if overlapping or end-to-end)
    // and renders only the baseline + quarter-mile tick marks (440 yards) using alt-route yardage.

    // Multiple alt ELRs can be shown; each ELR gets its own "lane" stacked vertically.
    const ALT_RULER_FIRST_BASELINE_Y = 105;
    const ALT_RULER_LANE_SPACING_PX = 50;
    const ALT_RULER_TICK_HEIGHT_PX = 10;
    const ALT_RULER_LINE_WIDTH_PX = 2;
    const ALT_RULER_MERGE_EPS_YARDS = 0; // treat exact end-to-end as merge
    const ALT_RULER_COLOR = 'gray';
    const ALT_RULER_LABEL_COLOR = 'rgba(128, 128, 128, 0.85)';

    function computeTrackExtentYards(track) {
      const shape = Array.isArray(track?.shape) ? track.shape : [];
      let minYard = null;
      let maxYard = null;
      for (const seg of shape) {
        const from = Number(seg?.from);
        const to = Number(seg?.to);
        if (!Number.isFinite(from) || !Number.isFinite(to)) continue;
        const segMin = Math.min(from, to);
        const segMax = Math.max(from, to);
        if (minYard === null || segMin < minYard) minYard = segMin;
        if (maxYard === null || segMax > maxYard) maxYard = segMax;
      }
      if (minYard === null || maxYard === null) return null;
      return { from: minYard, to: maxYard };
    }

    function getAltMapSegmentsForElr(elrNorm) {
      const list = Array.isArray(route?.altRouteYardageMap) ? route.altRouteYardageMap : [];
      return list
        .filter(seg => normalizeElr(seg?.elr) === elrNorm)
        .map(seg => {
          const fromMain = Number(seg?.fromYardageMainRoute);
          const toMain = Number(seg?.toYardageMainRoute);
          const fromAlt = Number(seg?.fromYardageAltRoute);
          const toAlt = Number(seg?.toYardageAltRoute);
          if (![fromMain, toMain, fromAlt, toAlt].every(Number.isFinite)) return null;
          if (fromMain === toMain || fromAlt === toAlt) return null;
          return { fromMain, toMain, fromAlt, toAlt };
        })
        .filter(Boolean);
    }

    function mapMainToAltOnSegment(seg, mainYards) {
      const denom = (seg.toMain - seg.fromMain);
      if (!Number.isFinite(denom) || denom === 0) return null;
      const ratio = (mainYards - seg.fromMain) / denom;
      return seg.fromAlt + ratio * (seg.toAlt - seg.fromAlt);
    }

    function mapAltToMainOnSegment(seg, altYards) {
      const denom = (seg.toAlt - seg.fromAlt);
      if (!Number.isFinite(denom) || denom === 0) return null;
      const ratio = (altYards - seg.fromAlt) / denom;
      return seg.fromMain + ratio * (seg.toMain - seg.fromMain);
    }

    function findBestAltMapSegmentForMain(elrNorm, mainYards) {
      const segments = getAltMapSegmentsForElr(elrNorm);
      if (!segments.length || !Number.isFinite(mainYards)) return null;

      // Prefer a segment that contains the main yardage.
      for (const seg of segments) {
        const segMinMain = Math.min(seg.fromMain, seg.toMain);
        const segMaxMain = Math.max(seg.fromMain, seg.toMain);
        if (mainYards >= segMinMain && mainYards <= segMaxMain) return seg;
      }

      // Otherwise pick the nearest endpoint across all segments.
      let best = null;
      let bestDist = Infinity;
      for (const seg of segments) {
        const a = seg.fromMain;
        const b = seg.toMain;
        const segMinMain = Math.min(a, b);
        const segMaxMain = Math.max(a, b);
        const dist = mainYards < segMinMain
          ? (segMinMain - mainYards)
          : (mainYards > segMaxMain ? (mainYards - segMaxMain) : 0);
        if (dist < bestDist) {
          bestDist = dist;
          best = seg;
        }
      }
      return best;
    }

    function findBestAltMapSegmentForAlt(elrNorm, altYards) {
      const segments = getAltMapSegmentsForElr(elrNorm);
      if (!segments.length || !Number.isFinite(altYards)) return null;

      for (const seg of segments) {
        const segMinAlt = Math.min(seg.fromAlt, seg.toAlt);
        const segMaxAlt = Math.max(seg.fromAlt, seg.toAlt);
        if (altYards >= segMinAlt && altYards <= segMaxAlt) return seg;
      }

      let best = null;
      let bestDist = Infinity;
      for (const seg of segments) {
        const a = seg.fromAlt;
        const b = seg.toAlt;
        const segMinAlt = Math.min(a, b);
        const segMaxAlt = Math.max(a, b);
        const dist = altYards < segMinAlt
          ? (segMinAlt - altYards)
          : (altYards > segMaxAlt ? (altYards - segMaxAlt) : 0);
        if (dist < bestDist) {
          bestDist = dist;
          best = seg;
        }
      }
      return best;
    }

    function mapMainToAltExtrapolated(elrNorm, mainYards) {
      const seg = findBestAltMapSegmentForMain(elrNorm, mainYards);
      if (!seg) return null;
      return mapMainToAltOnSegment(seg, mainYards);
    }

    function mapAltToMainExtrapolated(elrNorm, altYards) {
      const seg = findBestAltMapSegmentForAlt(elrNorm, altYards);
      if (!seg) return null;
      return mapAltToMainOnSegment(seg, altYards);
    }

    function mergeRanges(ranges) {
      const sorted = [...ranges].sort((a, b) => a.from - b.from);
      const merged = [];
      for (const r of sorted) {
        if (!merged.length) {
          merged.push({ from: r.from, to: r.to });
          continue;
        }
        const last = merged[merged.length - 1];
        if (r.from > last.to + ALT_RULER_MERGE_EPS_YARDS) {
          merged.push({ from: r.from, to: r.to });
        } else {
          last.to = Math.max(last.to, r.to);
        }
      }
      return merged;
    }

    function collectQuarterMileTicks(elrNorm, mainFrom, mainTo) {
      // Extrapolates beyond the mapped segments using the nearest segment slope.
      // This allows alt rulers to extend when a selected alt track exceeds the mapping extents.
      const segments = getAltMapSegmentsForElr(elrNorm);
      if (!segments.length) return [];

      const minMain = Math.min(mainFrom, mainTo);
      const maxMain = Math.max(mainFrom, mainTo);

      const altAtFrom = mapMainToAltExtrapolated(elrNorm, mainFrom);
      const altAtTo = mapMainToAltExtrapolated(elrNorm, mainTo);
      if (!Number.isFinite(altAtFrom) || !Number.isFinite(altAtTo)) return [];

      const minAlt = Math.min(altAtFrom, altAtTo);
      const maxAlt = Math.max(altAtFrom, altAtTo);

      const firstTickAlt = Math.ceil(minAlt / RULER_TICK_MEDIUM_YARDS) * RULER_TICK_MEDIUM_YARDS;
      const lastTickAlt = Math.floor(maxAlt / RULER_TICK_MEDIUM_YARDS) * RULER_TICK_MEDIUM_YARDS;

      const ticksByMain = new Map();
      const EPS = 1e-6;

      for (let altTick = firstTickAlt; altTick <= lastTickAlt; altTick += RULER_TICK_MEDIUM_YARDS) {
        const mainTick = mapAltToMainExtrapolated(elrNorm, altTick);
        if (!Number.isFinite(mainTick)) continue;
        if (mainTick + EPS < minMain || mainTick - EPS > maxMain) continue;

        const mainKey = Math.round(mainTick * 1000) / 1000;
        if (!ticksByMain.has(mainKey)) {
          ticksByMain.set(mainKey, altTick);
        }
      }

      return Array.from(ticksByMain.entries())
        .map(([mainYards, altYards]) => ({ mainYards, altYards }))
        .sort((a, b) => a.mainYards - b.mainYards);
    }

    function drawAltRulersIfAny() {
      if (!config || !config.showAltRulers) return;
      const tracks = Array.isArray(route?.tracks) ? route.tracks : [];
      const selectedAlt = tracks
        .filter(t => t?.altRoute?.showAltRuler === true)
        .map(t => ({
          elrNorm: normalizeElr(t?.altRoute?.elr),
          extent: computeTrackExtentYards(t)
        }))
        .filter(x => x.elrNorm && x.extent);

      if (!selectedAlt.length) return;

      const byElr = new Map();
      for (const item of selectedAlt) {
        const bucket = byElr.get(item.elrNorm) || [];
        bucket.push(item.extent);
        byElr.set(item.elrNorm, bucket);
      }

      // Build spans array: each merged extent for an ELR becomes a span
      const spans = [];
      for (const [elrNorm, extents] of byElr.entries()) {
        // Only draw if we actually have a mapping for this alt ELR.
        const segments = getAltMapSegmentsForElr(elrNorm);
        if (!segments.length) continue;

        const merged = mergeRanges(extents);
        for (const r of merged) {
          spans.push({ elrNorm, from: r.from, to: r.to });
        }
      }

      if (!spans.length) return;

      // Sort spans by start (shorter-first might help packing, but start order is fine)
      spans.sort((a, b) => a.from - b.from || (a.to - a.from) - (b.to - b.from));

      // Allocate lanes so that spans that don't overlap can share the top lane.
      const lanes = [];
      for (const s of spans) {
        let placed = false;
        for (let i = 0; i < lanes.length; i++) {
          const lane = lanes[i];
          // Check overlap against all spans already in this lane
          const overlaps = lane.some(existing => (s.from < existing.to) && (s.to > existing.from));
          if (!overlaps) {
            lane.push(s);
            s.laneIndex = i;
            placed = true;
            break;
          }
        }
        if (!placed) {
          s.laneIndex = lanes.length;
          lanes.push([s]);
        }
      }

      // Draw each span at its assigned lane
      for (const s of spans) {
        const laneIndex = s.laneIndex || 0;
        const baselineY = ALT_RULER_FIRST_BASELINE_Y + (laneIndex * ALT_RULER_LANE_SPACING_PX);
        const elrLabelY = baselineY - 18;
        const tickLabelY = baselineY + ALT_RULER_TICK_HEIGHT_PX + 4;

        const clippedFrom = Math.max(s.from, visibleLeftLimitYards);
        const clippedTo = Math.min(s.to, visibleRightLimitYards);
        if (clippedFrom > clippedTo) continue;

        const x1 = getX(clippedFrom);
        const x2 = getX(clippedTo);
        drawLine(x1, baselineY, x2, baselineY, ALT_RULER_LINE_WIDTH_PX, ALT_RULER_COLOR);

        // ELR label centered over the alt ruler span.
        const midX = getX((clippedFrom + clippedTo) / 2);
        ctx.font = '14px Arial';
        ctx.fillStyle = ALT_RULER_LABEL_COLOR;
        ctx.textBaseline = 'top';
        ctx.fillText(s.elrNorm, midX - 10, elrLabelY);

        // Draw start/end mileage labels for the alt ruler span (map main-route endpoints to alt-route yardages)
        try {
          const altStart = mapMainToAltExtrapolated(s.elrNorm, clippedFrom);
          const altEnd = mapMainToAltExtrapolated(s.elrNorm, clippedTo);
          ctx.font = '12px Arial';
          ctx.fillStyle = ALT_RULER_LABEL_COLOR;
          ctx.textBaseline = 'top';
          if (Number.isFinite(altStart)) {
            const txt = yardsToMiles_text(Math.round(altStart));
            const txtW = ctx.measureText(txt).width;
            // place start label slightly right of the span start
            const startX = x1 + 4;
            ctx.fillText(txt, startX, elrLabelY);
          }
          if (Number.isFinite(altEnd)) {
            const txt = yardsToMiles_text(Math.round(altEnd));
            const txtW = ctx.measureText(txt).width;
            // place end label slightly left of the span end
            const endX = x2 - txtW - 4;
            ctx.fillText(txt, endX, elrLabelY);
          }
        } catch (err) {
          // silently ignore mapping errors
        }

        const ticks = collectQuarterMileTicks(s.elrNorm, s.from, s.to);
        for (const tick of ticks) {
          const mainTick = tick.mainYards;
          if (mainTick < clippedFrom || mainTick > clippedTo) continue;
          const x = getX(mainTick);
          drawLine(x, baselineY, x, baselineY + ALT_RULER_TICK_HEIGHT_PX, 1, ALT_RULER_COLOR);

          // Label tick with alt-route miles/yards.
          ctx.font = '12px Arial';
          ctx.fillStyle = ALT_RULER_LABEL_COLOR;
          ctx.textBaseline = 'top';
          ctx.fillText(yardsToMiles_text(tick.altYards), x + 2, tickLabelY);
        }
      }
    }

    // Draw ticks from precomputed cache (major/medium/minor/micro)
    if (ticksCache) {
      // Major ticks (full label)
      for (const t of ticksCache.major) {
        if (t.mainY < visibleLeftLimitYards || t.mainY > visibleRightLimitYards) continue;
        const screenX = getX(t.mainY);
        drawLine(screenX, 0, screenX, 30, 2, 'black');
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(yardsToMiles_text(Math.round(t.relative)), screenX + 2, 40);
        drawLine(screenX, 30, screenX, diagramCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.2)');
      }

      // Medium ticks (label, shorter)
      for (const t of ticksCache.medium) {
        if (t.mainY < visibleLeftLimitYards || t.mainY > visibleRightLimitYards) continue;
        const screenX = getX(t.mainY);
        drawLine(screenX, 0, screenX, 20, 2, 'black');
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(yardsToMiles_text(Math.round(t.relative)), screenX + 2, 30);
        drawLine(screenX, 20, screenX, diagramCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.3)');
      }

      // Minor ticks (no label)
      for (const t of ticksCache.minor) {
        if (t.mainY < visibleLeftLimitYards || t.mainY > visibleRightLimitYards) continue;
        const screenX = getX(t.mainY);
        drawLine(screenX, 0, screenX, diagramCanvas.clientHeight, 1, 'rgba(0, 0, 255, 0.3)');
      }

      // Micro ticks (very small, skip those that coincide with minor)
      for (const t of ticksCache.micro) {
        if (t.relative % RULER_TICK_MINOR_YARDS === 0) continue;
        if (t.mainY < visibleLeftLimitYards || t.mainY > visibleRightLimitYards) continue;
        const screenX = getX(t.mainY);
        drawLine(screenX, 0, screenX, diagramCanvas.clientHeight, 1, 'rgba(0, 0, 0, 0.2)');
      }

      // Draw junction-group labels (fixed Y below main ruler)
      try {
        if (route && Array.isArray(route.switchesAndCrossings) && route.switchesAndCrossings.length) {
          // Map junctionGroup -> array of yard locations found on track connections
          const groups = new Map();
          for (const sw of route.switchesAndCrossings) {
            const group = (sw && sw.junctionGroup) ? String(sw.junctionGroup) : null;
            if (!group) continue;
            if (!groups.has(group)) groups.set(group, []);
          }

          if (groups.size > 0) {
            const tracks = Array.isArray(route.tracks) ? route.tracks : [];
            for (const t of tracks) {
              ['fromConnection', 'toConnection'].forEach(key => {
                const conn = t?.[key];
                if (!conn || !conn.sc_name) return;
                const scName = String(conn.sc_name);
                // find switches that match this sc_name
                const matches = route.switchesAndCrossings.filter(s => s.sc_Name === scName && s.junctionGroup);
                if (!matches.length) return;
                const atVal = Number(conn.at);
                if (!Number.isFinite(atVal)) return;
                for (const m of matches) {
                  const g = String(m.junctionGroup);
                  if (!groups.has(g)) groups.set(g, []);
                  groups.get(g).push(atVal);
                }
              });
            }

            // Draw label for each group using midpoint of min/max
            const LABEL_Y = 60; // fixed Y (px) below main ruler
            ctx.font = '12px Arial';
            ctx.textBaseline = 'top';
            for (const [group, arr] of groups.entries()) {
              if (!arr || !arr.length) continue;
              const finite = arr.filter(v => Number.isFinite(Number(v))).map(v => Number(v));
              if (!finite.length) continue;
              const minY = Math.min(...finite);
              const maxY = Math.max(...finite);
              const mid = (minY + maxY) / 2;

              // Only draw if midpoint visible horizontally (with small margin)
              if (mid < visibleLeftLimitYards - 1000 || mid > visibleRightLimitYards + 1000) continue;

              const x = getX(mid);
              const text = String(group);
              const padding = 6;
              const txtW = ctx.measureText(text).width;
              const boxW = txtW + padding * 2;
              const boxH = 18;
              const boxX = x - (boxW / 2);
              const boxY = LABEL_Y;

              // Fill: light yellow, border: thin red, text: red
              ctx.fillStyle = 'rgba(255, 255, 200, 0.95)';
              ctx.fillRect(boxX, boxY, boxW, boxH);
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 1;
              ctx.strokeRect(boxX, boxY, boxW, boxH);
              ctx.fillStyle = 'red';
              ctx.fillText(text, boxX + padding, boxY + 3);
            }
          }
        }
      } catch (err) {
        console.error('Error drawing junction group labels:', err);
      }

      // Draw after the main ruler so it sits visually beneath it.
      drawAltRulersIfAny();

      route.sections.forEach(s => {
        if (s.from < visibleRightLimitYards && s.to > visibleLeftLimitYards) {
          const sectionMidYard = (Math.max(s.from, visibleLeftLimitYards) + Math.min(s.to, visibleRightLimitYards)) / 2;
          const sectionMidX = getX(sectionMidYard);
          ctx.font = '14px Arial';
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.textBaseline = 'top';
          ctx.fillText(s.elr, sectionMidX - 10, 5);

          if (s.from >= visibleLeftLimitYards && s.from <= visibleRightLimitYards) {
            const interfaceX = getX(s.from);
            drawLine(interfaceX, 0, interfaceX, diagramCanvas.clientHeight, 5, 'rgba(0, 150, 0, 0.2)');
          }
        }
      });
    }

    // Draw after the main ruler so it sits visually beneath it.
    drawAltRulersIfAny();
  });
}

function drawHorizontalGridLinesLayer({
  ctx,
  config,
  diagramCanvas,
  withCanvasState,
  drawLine,
  getY
}) {
  withCanvasState(() => {
    const gridSpacing = config.horizontalGridSpacing;
    const numberOfLines = config.horizontalGridLinesNo;

    // Label the lines with their index. Write the text half between the lines.
    // The labels will stay at the left even when scrolling horizontally.
    ctx.font = '10px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numberOfLines; i++) {
      const y = getY(i, false);
      if (y >= 0 && y <= diagramCanvas.clientHeight) {
        drawLine(0, y, diagramCanvas.clientWidth, y, 1, 'rgba(0, 0, 0, 0.75)');
        ctx.fillText(i, 10, y + (gridSpacing / 2));
      }
    }
  });
}

function drawTracksLayer({
  ctx,
  route,
  withCanvasState,
  getVisibleBounds,
  resolveTrackY,
  drawLine,
  getX,
  getY,
  getVisibleSpanYardsForTrack,
  getTrackGridYAtYards
}) {
  withCanvasState(() => {
    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

    route.tracks.forEach(track => {
      track.shape.forEach((segment, index) => {
        const segMin = Math.min(segment.from, segment.to);
        const segMax = Math.max(segment.from, segment.to);

        if (segMin < visibleRightLimitYards && segMax > visibleLeftLimitYards) {
          const startY = resolveTrackY(track, index, 'from');
          const endY = resolveTrackY(track, index, 'to');

          if (startY !== null && endY !== null) {
            const startX = getX(segment.from);
            const endX = getX(segment.to);
            const startYPos = getY(startY, true);
            const endYPos = getY(endY, true);

            if (track.altRoute) {
              const altColor = segment.electrification === 'none' ? 'gray' : 'lightcoral';
              drawLine(startX, startYPos, endX, endYPos, 3, altColor);
            } else {
              const color = segment.electrification === 'none' ? 'black' : 'red';
              drawLine(startX, startYPos, endX, endYPos, 3, color);
            }
          }
        }
      });
    });

    // Write TIDs
    route.tracks.forEach(track => {
      const visibleSpan = getVisibleSpanYardsForTrack(track, visibleLeftLimitYards, visibleRightLimitYards);
      if (visibleSpan) {
        const trackMidYard = (visibleSpan.start + visibleSpan.end) / 2;
        const midX = getX(trackMidYard);

        const midGridY = getTrackGridYAtYards(track, trackMidYard);
        const midYPos = (midGridY === null) ? null : getY(midGridY, true);

        if (midYPos !== null) {
          ctx.font = '12px Arial';
          ctx.fillStyle = 'black';
          ctx.textBaseline = 'middle';
          if (track.altRoute) {
            ctx.fillStyle = 'gray';
            ctx.fillText(`${track.altRoute.elr} ${track.tid}`, midX, midYPos);
          } else {
            ctx.fillText(`${track.tid}`, midX, midYPos);
          }
        }
      }
    });
  });
}

function drawConnectionsLayer({
  ctx,
  withCanvasState,
  getVisibleBounds,
  collectConnectionLabelCandidates,
  buildConnectionLabelsWithMetrics,
  dedupeNearbyLabels,
  resolveLabelOverlapsVertically
}) {
  withCanvasState(() => {
    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

    const fontSize = 12;
    //ctx.font = `${fontSize}px Arial`;

    const candidates = collectConnectionLabelCandidates(visibleLeftLimitYards, visibleRightLimitYards);
    const labels = buildConnectionLabelsWithMetrics(candidates, fontSize);

    const uniqueLabels = dedupeNearbyLabels(labels, 5);
    resolveLabelOverlapsVertically(uniqueLabels);

    // Draw labels
    ctx.font = `Bold ${fontSize}px Arial`;
    ctx.fillStyle = 'green';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    uniqueLabels.forEach(label => {
      ctx.fillText(label.text, label.x, label.y);
    });
  });
}

function drawBuffersLayer({
  route,
  config,
  withCanvasState,
  getVisibleBounds,
  resolveTrackY,
  getX,
  getY,
  drawLine
}) {
  withCanvasState(() => {
    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();
    const bufferLength = config.horizontalGridSpacing * 0.1;

    route.tracks.forEach(track => {
      // Check fromConnection
      if (track.fromConnection && (track.fromConnection.type === 'buffer' || track.fromConnection.type === 'buffer_stop')) {
        const segment = track.shape[0];
        const at = track.fromConnection.at !== undefined ? track.fromConnection.at : segment.from;

        if (at >= visibleLeftLimitYards && at <= visibleRightLimitYards) {
          const startYGrid = resolveTrackY(track, 0, 'from');
          const endYGrid = resolveTrackY(track, 0, 'to');

          if (startYGrid !== null && endYGrid !== null) {
            const x1 = getX(segment.from);
            const y1 = getY(startYGrid, true);
            const x2 = getX(segment.to);
            const y2 = getY(endYGrid, true);

            const angle = Math.atan2(y2 - y1, x2 - x1);
            const perpAngle = angle + Math.PI / 2;

            const bx = getX(at);
            let by = y1;
            if (at !== segment.from && (segment.to - segment.from) !== 0) {
              const ratio = (at - segment.from) / (segment.to - segment.from);
              by = y1 + ratio * (y2 - y1);
            }

            const dx = (bufferLength / 2) * Math.cos(perpAngle);
            const dy = (bufferLength / 2) * Math.sin(perpAngle);

            drawLine(bx - dx, by - dy, bx + dx, by + dy, 6, 'black');
          }
        }
      }

      // Check toConnection
      if (track.toConnection && (track.toConnection.type === 'buffer' || track.toConnection.type === 'buffer_stop')) {
        const lastIdx = track.shape.length - 1;
        const segment = track.shape[lastIdx];
        const at = track.toConnection.at !== undefined ? track.toConnection.at : segment.to;

        if (at >= visibleLeftLimitYards && at <= visibleRightLimitYards) {
          const startYGrid = resolveTrackY(track, lastIdx, 'from');
          const endYGrid = resolveTrackY(track, lastIdx, 'to');

          if (startYGrid !== null && endYGrid !== null) {
            const x1 = getX(segment.from);
            const y1 = getY(startYGrid, true);
            const x2 = getX(segment.to);
            const y2 = getY(endYGrid, true);

            const angle = Math.atan2(y2 - y1, x2 - x1);
            const perpAngle = angle + Math.PI / 2;

            const bx = getX(at);
            let by = y2;
            if (at !== segment.to && (segment.to - segment.from) !== 0) {
              const ratio = (at - segment.from) / (segment.to - segment.from);
              by = y1 + ratio * (y2 - y1);
            }

            const dx = (bufferLength / 2) * Math.cos(perpAngle);
            const dy = (bufferLength / 2) * Math.sin(perpAngle);

            drawLine(bx - dx, by - dy, bx + dx, by + dy, 6, 'black');
          }
        }
      }
    });
  });
}

function drawStructuresLayer({
  ctx,
  route,
  config,
  tracksByTid,
  sectionsByElr,
  withCanvasState,
  getVisibleBounds,
  getYAtJunction,
  getX,
  getY,
  getRangeMinMax,
  segmentOverlapsRange,
  clipSegmentToRange,
  drawLine,
  normalizeElr
}) {
  if (!route.structures) return;

  withCanvasState(() => {
    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();
    ctx.textBaseline = 'middle';

    route.structures.forEach(structure => {
      if (structure.type === 'viaduct' || structure.type === 'underbridge') {
      // Find top-most and bottom-most tracks
      let topTrackLoc = null;
      let bottomTrackLoc = null;
      let minGridY = Infinity;
      let maxGridY = -Infinity;

      structure.trackLocation.forEach(loc => {
        const midYard = (loc.from + loc.to) / 2;
        const gridY = getYAtJunction(loc.tid, midYard, loc.elr);
        if (gridY !== null) {
          if (gridY < minGridY) {
            minGridY = gridY;
            topTrackLoc = loc;
          }
          if (gridY > maxGridY) {
            maxGridY = gridY;
            bottomTrackLoc = loc;
          }
        }
      });

      if (!topTrackLoc || !bottomTrackLoc) return;

      const offset = config.horizontalGridSpacing * 0.25;
      const flareLen = offset;

      const drawWall = (loc, isTop) => {
        const candidates = tracksByTid.get(loc.tid) || [];
        const locElrNorm = normalizeElr(loc.elr);
        const track = candidates.find(t => {
          if (locElrNorm) {
            const isMainElr = sectionsByElr.has(locElrNorm);
            if (isMainElr) {
              if (t.altRoute) return false;
            } else {
              if (!t.altRoute || normalizeElr(t.altRoute.elr) !== locElrNorm) return false;
            }
          } else {
            if (t.altRoute) return false;
          }

          // Check if any segment overlaps with loc
          const { min: locMin, max: locMax } = getRangeMinMax(loc.from, loc.to);
          return t.shape.some(seg => {
            return segmentOverlapsRange(seg, locMin, locMax);
          });
        });
        if (!track) return;

        const startYard = Math.min(loc.from, loc.to);
        const endYard = Math.max(loc.from, loc.to);

        // Collect segments that are part of the structure
        const segmentsToDraw = [];

        track.shape.forEach(segment => {
          const clipped = clipSegmentToRange(segment, startYard, endYard);
          if (clipped) segmentsToDraw.push(clipped);
        });

        segmentsToDraw.sort((a, b) => a.from - b.from);

        // Calculate raw offset lines
        const rawLines = segmentsToDraw.map(seg => {
          const yFromGrid = getYAtJunction(loc.tid, seg.from, loc.elr);
          const yToGrid = getYAtJunction(loc.tid, seg.to, loc.elr);

          if (yFromGrid === null || yToGrid === null) return null;

          const x1 = getX(seg.from);
          const y1 = getY(yFromGrid, true);
          const x2 = getX(seg.to);
          const y2 = getY(yToGrid, true);

          const dx = x2 - x1;
          const dy = y2 - y1;
          const angle = Math.atan2(dy, dx);
          const offsetAngle = isTop ? angle - Math.PI / 2 : angle + Math.PI / 2;

          const ox = Math.cos(offsetAngle) * offset;
          const oy = Math.sin(offsetAngle) * offset;

          return {
            start: { x: x1 + ox, y: y1 + oy },
            end: { x: x2 + ox, y: y2 + oy },
            angle: angle // Keep track angle for flares
          };
        }).filter(l => l !== null);

        if (rawLines.length === 0) return;

        const points = [];
        points.push(rawLines[0].start);

        for (let i = 0; i < rawLines.length - 1; i++) {
          const l1 = rawLines[i];
          const l2 = rawLines[i + 1];

          // Find intersection of l1 and l2
          const x1 = l1.start.x, y1 = l1.start.y;
          const x2 = l1.end.x, y2 = l1.end.y;
          const x3 = l2.start.x, y3 = l2.start.y;
          const x4 = l2.end.x, y4 = l2.end.y;

          const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

          if (Math.abs(denom) < 0.001) {
            // Parallel lines, just use the end of the first line
            points.push(l1.end);
          } else {
            const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
            const ix = x1 + ua * (x2 - x1);
            const iy = y1 + ua * (y2 - y1);
            points.push({ x: ix, y: iy });
          }
        }

        points.push(rawLines[rawLines.length - 1].end);

        // Draw the polyline
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        // Flares
        // Start flare
        const startAngle = rawLines[0].angle;
        let startFlareAngle;
        if (isTop) {
          startFlareAngle = startAngle - 3 * Math.PI / 4;
        } else {
          startFlareAngle = startAngle + 3 * Math.PI / 4;
        }
        drawLine(points[0].x, points[0].y, points[0].x + Math.cos(startFlareAngle) * flareLen, points[0].y + Math.sin(startFlareAngle) * flareLen, 2, 'blue');

        // End flare
        const endAngle = rawLines[rawLines.length - 1].angle;
        let endFlareAngle;
        if (isTop) {
          endFlareAngle = endAngle - Math.PI / 4;
        } else {
          endFlareAngle = endAngle + Math.PI / 4;
        }
        const lastP = points[points.length - 1];
        drawLine(lastP.x, lastP.y, lastP.x + Math.cos(endFlareAngle) * flareLen, lastP.y + Math.sin(endFlareAngle) * flareLen, 2, 'blue');

        return { start: points[0], end: lastP };
      };

      const topWall = drawWall(topTrackLoc, true);
      const bottomWall = drawWall(bottomTrackLoc, false);

      if (topWall && bottomWall) {
        ctx.setLineDash([5, 5]);
        drawLine(topWall.start.x, topWall.start.y, bottomWall.start.x, bottomWall.start.y, 1, 'rgba(0,0,255,0.5)');
        drawLine(topWall.end.x, topWall.end.y, bottomWall.end.x, bottomWall.end.y, 1, 'rgba(0,0,255,0.5)');
        ctx.setLineDash([]);
      }

      // Label
      let midX, midY;
      if (topWall && bottomWall) {
        midX = (topWall.start.x + topWall.end.x + bottomWall.start.x + bottomWall.end.x) / 4;
        midY = (topWall.start.y + topWall.end.y + bottomWall.start.y + bottomWall.end.y) / 4;
      } else {
        midX = (getX(topTrackLoc.from) + getX(topTrackLoc.to)) / 2;
        midY = (getY(minGridY, true) + getY(maxGridY, true)) / 2;
      }

      ctx.fillStyle = 'blue';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      
      if (structure.structureNo) {
        ctx.fillText(structure.name, midX, midY - 7);
        ctx.fillText(structure.structureNo, midX, midY + 7);
      } else {
        ctx.fillText(structure.name, midX, midY);
      }

        return;
      }

      if (structure.type === 'level_crossing') {
        // Find top-most and bottom-most tracks
        let topTrackLoc = null;
        let bottomTrackLoc = null;
        let minGridY = Infinity;
        let maxGridY = -Infinity;

        structure.trackLocation.forEach(loc => {
          const midYard = (loc.from + loc.to) / 2;
          const gridY = getYAtJunction(loc.tid, midYard, loc.elr);
          if (gridY !== null) {
            if (gridY < minGridY) {
              minGridY = gridY;
              topTrackLoc = loc;
            }
            if (gridY > maxGridY) {
              maxGridY = gridY;
              bottomTrackLoc = loc;
            }
          }
        });

        if (!topTrackLoc || !bottomTrackLoc) return;

        const offset = config.horizontalGridSpacing * 0.25;

        const drawWall = (loc, isTop) => {
          const candidates = tracksByTid.get(loc.tid) || [];
          const locElrNorm = normalizeElr(loc.elr);
          const track = candidates.find(t => {
            if (locElrNorm) {
              const isMainElr = sectionsByElr.has(locElrNorm);
              if (isMainElr) {
                if (t.altRoute) return false;
              } else {
                if (!t.altRoute || normalizeElr(t.altRoute.elr) !== locElrNorm) return false;
              }
            } else {
              if (t.altRoute) return false;
            }

            // Check if any segment overlaps with loc
            const { min: locMin, max: locMax } = getRangeMinMax(loc.from, loc.to);
            return t.shape.some(seg => {
              return segmentOverlapsRange(seg, locMin, locMax);
            });
          });
          if (!track) return;

          const startYard = Math.min(loc.from, loc.to);
          const endYard = Math.max(loc.from, loc.to);

          // Collect segments that are part of the structure
          const segmentsToDraw = [];

          track.shape.forEach(segment => {
            const clipped = clipSegmentToRange(segment, startYard, endYard);
            if (clipped) segmentsToDraw.push(clipped);
          });

          segmentsToDraw.sort((a, b) => a.from - b.from);

          // Calculate raw offset lines
          const rawLines = segmentsToDraw.map(seg => {
            const yFromGrid = getYAtJunction(loc.tid, seg.from, loc.elr);
            const yToGrid = getYAtJunction(loc.tid, seg.to, loc.elr);

            if (yFromGrid === null || yToGrid === null) return null;

            const x1 = getX(seg.from);
            const y1 = getY(yFromGrid, true);
            const x2 = getX(seg.to);
            const y2 = getY(yToGrid, true);

            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
            const offsetAngle = isTop ? angle - Math.PI / 2 : angle + Math.PI / 2;

            const ox = Math.cos(offsetAngle) * offset;
            const oy = Math.sin(offsetAngle) * offset;

            return {
              start: { x: x1 + ox, y: y1 + oy },
              end: { x: x2 + ox, y: y2 + oy },
              angle: angle
            };
          }).filter(l => l !== null);

          if (rawLines.length === 0) return;

          const points = [];
          points.push(rawLines[0].start);

          for (let i = 0; i < rawLines.length - 1; i++) {
            const l1 = rawLines[i];
            const l2 = rawLines[i + 1];

            // Find intersection of l1 and l2
            const x1 = l1.start.x, y1 = l1.start.y;
            const x2 = l1.end.x, y2 = l1.end.y;
            const x3 = l2.start.x, y3 = l2.start.y;
            const x4 = l2.end.x, y4 = l2.end.y;

            const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

            if (Math.abs(denom) < 0.001) {
              // Parallel lines, just use the end of the first line
              points.push(l1.end);
            } else {
              const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
              const ix = x1 + ua * (x2 - x1);
              const iy = y1 + ua * (y2 - y1);
              points.push({ x: ix, y: iy });
            }
          }

          points.push(rawLines[rawLines.length - 1].end);

          return points;
        };

        const topWall = drawWall(topTrackLoc, true);
        const bottomWall = drawWall(bottomTrackLoc, false);

        if (topWall && bottomWall) {
          // Draw filled polygon with solid outline
          ctx.beginPath();
          ctx.moveTo(topWall[0].x, topWall[0].y);
          
          // Top wall left to right
          for (let i = 1; i < topWall.length; i++) {
            ctx.lineTo(topWall[i].x, topWall[i].y);
          }
          
          // Right side
          ctx.lineTo(bottomWall[bottomWall.length - 1].x, bottomWall[bottomWall.length - 1].y);
          
          // Bottom wall right to left
          for (let i = bottomWall.length - 2; i >= 0; i--) {
            ctx.lineTo(bottomWall[i].x, bottomWall[i].y);
          }
          
          // Left side
          ctx.closePath();
          
          // Fill with gray
          ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
          ctx.fill();
          
          // Solid outline
          ctx.strokeStyle = 'gray';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          ctx.stroke();
          
          // Draw dashed centerline from top to bottom
          const centerTopX = (topWall[0].x + topWall[topWall.length - 1].x) / 2;
          const centerTopY = (topWall[0].y + topWall[topWall.length - 1].y) / 2;
          const centerBottomX = (bottomWall[0].x + bottomWall[bottomWall.length - 1].x) / 2;
          const centerBottomY = (bottomWall[0].y + bottomWall[bottomWall.length - 1].y) / 2;
          
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(centerTopX, centerTopY);
          ctx.lineTo(centerBottomX, centerBottomY);
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Draw red X above and below the crossing
          const xWidth = offset * 0.8;
          const xHeight = xWidth * (2/3);
          const xClearance = offset * 0.5;
          
          // Calculate direction vector from center of crossing to top/bottom
          const dx = centerBottomX - centerTopX;
          const dy = centerBottomY - centerTopY;
          const length = Math.sqrt(dx * dx + dy * dy);
          const dirX = length > 0 ? dx / length : 0;
          const dirY = length > 0 ? dy / length : 1;
          
          // Top X (above the crossing) - offset outward
          const topCenterX = centerTopX - dirX * (xHeight + xClearance);
          const topCenterY = centerTopY - dirY * (xHeight + xClearance);
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(topCenterX - xWidth, topCenterY - xHeight);
          ctx.lineTo(topCenterX + xWidth, topCenterY + xHeight);
          ctx.moveTo(topCenterX + xWidth, topCenterY - xHeight);
          ctx.lineTo(topCenterX - xWidth, topCenterY + xHeight);
          ctx.stroke();
          
          // Bottom X (below the crossing) - offset outward
          const bottomCenterX = centerBottomX + dirX * (xHeight + xClearance);
          const bottomCenterY = centerBottomY + dirY * (xHeight + xClearance);
          ctx.beginPath();
          ctx.moveTo(bottomCenterX - xWidth, bottomCenterY - xHeight);
          ctx.lineTo(bottomCenterX + xWidth, bottomCenterY + xHeight);
          ctx.moveTo(bottomCenterX + xWidth, bottomCenterY - xHeight);
          ctx.lineTo(bottomCenterX - xWidth, bottomCenterY + xHeight);
          ctx.stroke();
        }

        // Label
        let midX, midY;
        if (topWall && bottomWall) {
          const allX = [...topWall.map(p => p.x), ...bottomWall.map(p => p.x)];
          const allY = [...topWall.map(p => p.y), ...bottomWall.map(p => p.y)];
          midX = allX.reduce((sum, x) => sum + x, 0) / allX.length;
          midY = allY.reduce((sum, y) => sum + y, 0) / allY.length;
        } else {
          midX = (getX(topTrackLoc.from) + getX(topTrackLoc.to)) / 2;
          midY = (getY(minGridY, true) + getY(maxGridY, true)) / 2;
        }

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        if (structure.structureNo) {
          ctx.fillText(structure.name, midX, midY - 7);
          ctx.fillText(structure.structureNo, midX, midY + 7);
        } else {
          ctx.fillText(structure.name, midX, midY);
        }

        return;
      }

      if (structure.type !== 'tunnel' && structure.type !== 'overbridge') return;

    // Collect points for From and To lines
    const fromPoints = [];
    const toPoints = [];

    structure.trackLocation.forEach(loc => {
      const midYard = (loc.from + loc.to) / 2;
      const gridY = getYAtJunction(loc.tid, midYard, loc.elr);

      if (gridY !== null) {
        const screenY = getY(gridY, true);
        fromPoints.push({ x: getX(loc.from), y: screenY });
        toPoints.push({ x: getX(loc.to), y: screenY });
      }
    });

    if (fromPoints.length === 0) return;

    // Helper to draw the portal line
    function drawPortalLine(points, isFrom) {
      // Find top-most and bottom-most points based on Y
      points.sort((a, b) => a.y - b.y);

      const topPoint = points[0];
      const bottomPoint = points[points.length - 1];

      const extension = config.horizontalGridSpacing * 0.25;

      // Calculate angle of the line to handle skew
      const dx = bottomPoint.x - topPoint.x;
      const dy = bottomPoint.y - topPoint.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      let startX, startY, endX, endY;
      let angle;

      if (length === 0) {
        // Single track structure, vertical line
        startX = topPoint.x;
        startY = topPoint.y - extension;
        endX = bottomPoint.x;
        endY = bottomPoint.y + extension;
        angle = Math.PI / 2;
      } else {
        // Extend vector
        const ux = dx / length;
        const uy = dy / length;

        startX = topPoint.x - ux * extension;
        startY = topPoint.y - uy * extension;
        endX = bottomPoint.x + ux * extension;
        endY = bottomPoint.y + uy * extension;
        angle = Math.atan2(dy, dx);
      }

      drawLine(startX, startY, endX, endY, 2, 'blue');

      // Flares
      const flareLen = extension;
      const flareAngleDelta = Math.PI / 4;
      const topBaseAngle = angle + Math.PI;
      const bottomBaseAngle = angle;

      let topFlareAngle, bottomFlareAngle;

      if (isFrom) {
        // Left side
        topFlareAngle = topBaseAngle - flareAngleDelta;
        bottomFlareAngle = bottomBaseAngle + flareAngleDelta;
      } else {
        // Right side
        topFlareAngle = topBaseAngle + flareAngleDelta;
        bottomFlareAngle = bottomBaseAngle - flareAngleDelta;
      }

      drawLine(startX, startY, startX + Math.cos(topFlareAngle) * flareLen, startY + Math.sin(topFlareAngle) * flareLen, 2, 'blue');
      drawLine(endX, endY, endX + Math.cos(bottomFlareAngle) * flareLen, endY + Math.sin(bottomFlareAngle) * flareLen, 2, 'blue');

      return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
    }

    const fromPortal = drawPortalLine(fromPoints, true);
    const toPortal = drawPortalLine(toPoints, false);

    if (fromPortal && toPortal) {
      ctx.setLineDash([5, 5]);
      drawLine(fromPortal.start.x, fromPortal.start.y, toPortal.start.x, toPortal.start.y, 1, 'rgba(0,0,255,0.5)');
      drawLine(fromPortal.end.x, fromPortal.end.y, toPortal.end.x, toPortal.end.y, 1, 'rgba(0,0,255,0.5)');
      ctx.setLineDash([]);
    }

    // Draw Label
    const centerX = (fromPortal.start.x + fromPortal.end.x + toPortal.start.x + toPortal.end.x) / 4;
    const centerY = (fromPortal.start.y + fromPortal.end.y + toPortal.start.y + toPortal.end.y) / 4;

    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    if (structure.structureNo) {
      ctx.fillText(structure.name, centerX, centerY - 7);
      ctx.fillText(structure.structureNo, centerX, centerY + 7);
    } else {
      ctx.fillText(structure.name, centerX, centerY);
    }
    });
  });
}

function drawOverlaysLayer({
  ctx,
  config,
  withCanvasState,
  getVisibleBounds,
  shouldDrawOverlay,
  getMatchingTracksForOverlay,
  computeOverlayStartEndYards,
  buildOverlayPathsForTrack,
  computeOffsetPolygonPoints,
  computePathMidpoint
}) {
  if (typeof overlayData === 'undefined' || !overlayData) return;

  withCanvasState(() => {
    const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

    overlayData.forEach(overlay => {
      if (!shouldDrawOverlay(overlay)) return;

      const matchingTracks = getMatchingTracksForOverlay(overlay);
      if (matchingTracks.length === 0) {
        if (overlay.group === 'URL Overlay') console.warn('No matching tracks found for overlay TID:', overlay.tid, 'ELR:', overlay.elr);
        return;
      }

      const { startYards, endYards } = computeOverlayStartEndYards(overlay);
      const minOverlay = Math.min(startYards, endYards);
      const maxOverlay = Math.max(startYards, endYards);
      if (maxOverlay < visibleLeftLimitYards || minOverlay > visibleRightLimitYards) return;

      matchingTracks.forEach(track => {
        const offset = config.horizontalGridSpacing * 0.25;
        const paths = buildOverlayPathsForTrack(track, overlay.tid, minOverlay, maxOverlay, overlay.elr);

        paths.forEach(path => {
          if (path.length < 2) return;

          const { topPoints, bottomPoints } = computeOffsetPolygonPoints(path, offset);

          ctx.beginPath();
          ctx.moveTo(topPoints[0].x, topPoints[0].y);
          for (let i = 1; i < topPoints.length; i++) {
            ctx.lineTo(topPoints[i].x, topPoints[i].y);
          }
          for (let i = bottomPoints.length - 1; i >= 0; i--) {
            ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
          }
          ctx.closePath();

          ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
          ctx.fill();
          ctx.strokeStyle = 'orange';
          ctx.lineWidth = 2;
          ctx.stroke();

          if (overlay.text) {
            const midPoint = computePathMidpoint(path);
            withCanvasState(() => {
              ctx.fillStyle = 'black';
              ctx.font = 'bold 12px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(overlay.text, midPoint.x, midPoint.y);
            });
          }
        });
      });
    });
  });
}

function computeOverlayCenterYards(urlOverlay, computeAbsoluteYardsFn) {
  if (!urlOverlay || typeof computeAbsoluteYardsFn !== 'function') {
    return { centerYards: null, startRes: null, endRes: null, usedFallback: false };
  }

  const startRes = computeAbsoluteYardsFn(urlOverlay.elr, urlOverlay.mileFrom, urlOverlay.yardFrom);
  const endRes = computeAbsoluteYardsFn(urlOverlay.elr, urlOverlay.mileTo, urlOverlay.yardTo);

  if (startRes?.value !== null && endRes?.value !== null) {
    return {
      centerYards: (startRes.value + endRes.value) / 2,
      startRes,
      endRes,
      usedFallback: false
    };
  }

  const startYards = (urlOverlay.mileFrom * YARDS_PER_MILE) + urlOverlay.yardFrom;
  const endYards = (urlOverlay.mileTo * YARDS_PER_MILE) + urlOverlay.yardTo;
  return {
    centerYards: (startYards + endYards) / 2,
    startRes,
    endRes,
    usedFallback: true
  };
}

function dispatchRouteLoaded() {
  window.dispatchEvent(new CustomEvent('diagram:routeLoaded', { detail: { route } }));
}

async function loadRoute(routeCode = DEFAULT_ROUTE_CODE) {
  // If this is a reload of the currently-viewed route (e.g. after saving a track/station/structure),
  // capture the current viewport so we can restore it after the data refresh.
  const requestedCode = (routeCode ?? '').toString().trim();
  const currentCode = route?.code ? String(route.code).trim() : '';
  if (requestedCode && currentCode && requestedCode !== currentCode) {
    // Switching routes: don't carry over the previous route's viewport.
    viewportState.lastCenterYards = null;
    viewportState.lastVisibleCenterYards = null;
    viewportState.lastScrollTopPx = null;
    viewportState.lastScrollLeftPx = null;
  } else {
    captureViewportStateFromDom();
  }

  try {
    const response = await fetch(`${API_URL}/code/${encodeURIComponent(routeCode)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch route (${response.status})`);
    }

    route = await response.json();
    debugLog('Route loaded from API:', route);
    dispatchRouteLoaded();
      // compute tick cache for this route
      ticksCache = computeTicksForRoute(route);
      initializeApp();
  } catch (err) {
    console.error('Error loading route from API:', err);

    // Fallback: try to load from local data.js if API fails
    if (typeof routes !== 'undefined') {
      const fallbackRoute = routes.find(r => r.code === routeCode);
      if (fallbackRoute) {
        route = fallbackRoute;
        console.warn('Loaded route from local data.js as fallback');
        dispatchRouteLoaded();
          // compute tick cache for this route (fallback path)
          ticksCache = computeTicksForRoute(route);
          initializeApp();
        return;
      }
    }

    console.error('No route data available to initialize the app.');
  }
}

function initializeApp() {
  if (!route) {
    console.error('Cannot initialize app without route data.');
    return;
  }

  // Pre-index common lookups to reduce repeated full scans during rendering.
  // Note: These indexes are rebuilt on every route load (initializeApp call).
  const tracksByTid = buildTracksByTid(route);
  const sectionsByElr = buildSectionsByElr(route);

  // Configuration for logical distances (mutable so UI changes can tweak values)
  const config = createDefaultConfig(route);

  // Preserve the user's global "Show Alt ELR Rulers" UI preference when re-initializing
  // (loadRoute recreates the config and would otherwise reset to the default).
  try {
    const el = (typeof document !== 'undefined') ? document.getElementById('showAltElrRulers') : null;
    if (el && typeof el.checked === 'boolean') {
      config.showAltRulers = !!el.checked;
    }
  } catch (e) {
    // ignore - running in non-DOM environment or element not present
  }

  // Keep a minimal copy of the viewport-related config in globals so loadRoute()
  // can capture the current center even if a scroll event hasn't fired recently.
  viewportState.lastYardsPerPixel = config.yardsPerPixel;
  viewportState.lastShowFromYards = config.showFromYards;

  // Track current center position in full route for windowed scrolling
  // Keep the previous center when reloading the route to avoid "snap back".
  let initialTargetYards = computeInitialTargetYards(viewportState, config);

  const urlOverlay = consumeUrlOverlayFromLocation();

  // URL overlays: if present in the URL, add to overlay data and center the initial view.
  // Parsing/clearing is done in consumeUrlOverlayFromLocation() so it acts one-shot.
  if (urlOverlay) {
    debugLog('URL Params detected:', urlOverlay);
    debugLog('Created overlay object:', urlOverlay);

    addOverlayIfMissing(
      urlOverlay,
      o => o.group === 'URL Overlay' &&
        o.tid === urlOverlay.tid &&
        o.mileFrom === urlOverlay.mileFrom &&
        o.yardFrom === urlOverlay.yardFrom
    );

    // Calculate center based on ELR offset if available
    debugLog('Attempting to compute absolute yards for centering...');
    debugLog('Route sections available:', route.sections ? route.sections.length : 'None');

    const { centerYards, startRes, endRes, usedFallback } = computeOverlayCenterYards(urlOverlay, computeAbsoluteYards);
    debugLog('Compute results:', { start: startRes, end: endRes });

    if (Number.isFinite(centerYards)) {
      viewportState.lastCenterYards = centerYards;
      initialTargetYards = centerYards;
      if (usedFallback) {
        console.warn('Could not compute absolute yards for overlay centering', startRes?.error, endRes?.error);
        debugLog('Fallback centering at:', centerYards);
      } else {
        debugLog('Centered on overlay at absolute yards:', centerYards);
      }
    }
  }

  // DOM references
  const { container, logicalSize, diagramCanvas, dpr } = getDiagramDomRefs();

  if (!container || !logicalSize || !diagramCanvas) {
    console.error('Required DOM elements not found:', { container, logicalSize, diagramCanvas });
    return;
  }

  // Programmatically set spacer size
  function centerOnRow(rowIndex = 50) {
    if (!container) return;
    const targetY = rowIndex * config.horizontalGridSpacing;
    const centerY = container.clientHeight / 2;
    scrollPosY = Math.max(0, targetY - centerY);
    container.scrollTop = scrollPosY;
    viewportState.lastScrollTopPx = scrollPosY;
  }

  function updateVisibleWindow(centerYards) {
    const halfWindow = config.scrollSizeYards / 2;
    let newFrom = centerYards - halfWindow;
    let newTo = centerYards + halfWindow;

    // Clamp to route bounds
    if (newFrom < 0) {
      newFrom = 0;
      newTo = Math.min(config.scrollSizeYards, config.totalYards);
    } else if (newTo > config.totalYards) {
      newTo = config.totalYards;
      newFrom = Math.max(0, config.totalYards - config.scrollSizeYards);
    }

    config.showFromYards = newFrom;
    config.showToYards = newTo;
    currentCenterYards = (newFrom + newTo) / 2;
    viewportState.lastCenterYards = currentCenterYards;
    viewportState.lastShowFromYards = config.showFromYards;
    viewportState.lastYardsPerPixel = config.yardsPerPixel;
  }

  function centerOnYards(yards, updateWindow = true) {
    if (!container) return;

    if (Number.isFinite(yards)) {
      viewportState.lastCenterYards = yards;
    }

    if (updateWindow) {
      // Update window to be centered on target yards
      updateVisibleWindow(yards);
      applyLayoutSizing(false);
    }

    // Center scrollbar on target within current window
    const targetX = (yards - config.showFromYards) / config.yardsPerPixel;
    const centerX = container.clientWidth / 2;
    const maxScrollX = Math.max(0, logicalSize.clientWidth - container.clientWidth);
    const nextScrollX = Math.min(Math.max(0, targetX - centerX), maxScrollX);
    scrollPosX = nextScrollX;
    container.scrollLeft = nextScrollX;
    viewportState.lastScrollLeftPx = nextScrollX;
    drawAll();
  }

  function computeAbsoluteYards(elrCode, miles, yards) {
    if (!route || !Array.isArray(route.sections)) return { value: null, error: 'Route sections unavailable' };
    const normElr = normalizeElr(elrCode);
    if (!normElr) return { value: null, error: 'ELR is required' };

    // Ensure inputs are numbers
    const m = typeof miles === 'string' ? parseFloat(miles) : miles;
    const y = typeof yards === 'string' ? parseFloat(yards) : yards;
    const milesVal = Number.isFinite(m) ? m : 0;
    const yardsVal = Number.isFinite(y) ? y : 0;
    const altYardage = (milesVal * YARDS_PER_MILE) + yardsVal;

    const section = sectionsByElr.get(normElr);
    if (section) {
      // ELR found in main route sections
      const absoluteYards = altYardage + (section.offset || 0);
      return { value: absoluteYards, section, relativeYards: altYardage };
    }

    // ELR not in main route sections, try alt route yardage mapping
    if (route.altRouteYardageMap && Array.isArray(route.altRouteYardageMap)) {
      // Find segment(s) for this ELR
      const segments = route.altRouteYardageMap.filter(seg => normalizeElr(seg.elr) === normElr);
      if (segments.length > 0) {
        // Try to map the alt yardage to main route yardage
        for (const seg of segments) {
          const segFromAlt = Number(seg.fromYardageAltRoute);
          const segToAlt = Number(seg.toYardageAltRoute);
          if (Number.isFinite(segFromAlt) && Number.isFinite(segToAlt) &&
              altYardage >= Math.min(segFromAlt, segToAlt) && 
              altYardage <= Math.max(segFromAlt, segToAlt)) {
            // Within segment range, interpolate using linear formula
            const mainFrom = Number(seg.fromYardageMainRoute);
            const mainTo = Number(seg.toYardageMainRoute);
            if (Number.isFinite(mainFrom) && Number.isFinite(mainTo)) {
              // Standard linear interpolation: works with forward and reverse directions
              const fraction = (altYardage - segFromAlt) / (segToAlt - segFromAlt);
              const mainYards = mainFrom + fraction * (mainTo - mainFrom);
              return { value: mainYards, relativeYards: altYardage, fromAltRoute: true };
            }
          }
        }
        // Not within any segment range, try nearest segment for extrapolation
        let bestSeg = segments[0];
        let bestDist = Math.abs(altYardage - Number(bestSeg.fromYardageAltRoute));
        for (let i = 1; i < segments.length; i++) {
          const segFromAlt = Number(segments[i].fromYardageAltRoute);
          const dist = Math.abs(altYardage - segFromAlt);
          if (dist < bestDist) {
            bestDist = dist;
            bestSeg = segments[i];
          }
        }
        const segFromAlt = Number(bestSeg.fromYardageAltRoute);
        const segToAlt = Number(bestSeg.toYardageAltRoute);
        const mainFrom = Number(bestSeg.fromYardageMainRoute);
        const mainTo = Number(bestSeg.toYardageMainRoute);
        if (Number.isFinite(segFromAlt) && Number.isFinite(segToAlt) &&
            Number.isFinite(mainFrom) && Number.isFinite(mainTo) &&
            Math.abs(segToAlt - segFromAlt) > 0) {
          const fraction = (altYardage - segFromAlt) / (segToAlt - segFromAlt);
          const mainYards = mainFrom + fraction * (mainTo - mainFrom);
          return { value: mainYards, relativeYards: altYardage, fromAltRoute: true };
        }
      }
    }

    const availableElrs = route.sections.map(s => s.elr).join(', ');
    return { value: null, error: `ELR ${normElr} not found in sections. Available: ${availableElrs}` };
  }

  function applyLayoutSizing(recenter = false) {
    logicalSize.style.width = `${(config.showToYards - config.showFromYards) / config.yardsPerPixel}px`;
    logicalSize.style.height = `${config.horizontalGridLinesNo * config.horizontalGridSpacing}px`;
    canvasResize();
    if (recenter) {
      centerOnRow(50);
    }
    drawAll();
  }

  // Track scroll position
  let scrollPosX = 0;
  let scrollPosY = 0;

  // Get canvas drawing context
  const ctx = diagramCanvas.getContext('2d');

  function withCanvasState(drawFn) {
    ctx.save();
    try {
      drawFn();
    } finally {
      ctx.restore();
    }
  }

  // Resize canvas
  function canvasResize() {
    diagramCanvas.width = diagramCanvas.clientWidth * dpr;
    diagramCanvas.height = diagramCanvas.clientHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  // Convert Yards to Mileage
  function yardsToMiles_text(yards) {
    return  Math.floor(yards / YARDS_PER_MILE) + "M " + (yards % YARDS_PER_MILE) + "Y";
    // if (yards % 1760 === 0) {
    //   return (yards / 1760) + "M 0Y";
    // } else {
    //   return (yards % 1760) + " Y";
    // }
  }

  // Draw line function
  function drawLine(x1, y1, x2, y2, lineWidth = 1, color = 'black') {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  // Helper function to get Y position at junction (recursive)
  let junctionYCache = new Map();

  function getYAtJunction(trackId, at, elr) {
    const elrNorm = normalizeElr(elr) || '';
    const key = `${trackId}|${at}|${elrNorm}`;
    if (junctionYCache.has(key)) return junctionYCache.get(key);

    const value = getYAtJunctionInner(trackId, at, elrNorm || null, []);
    junctionYCache.set(key, value);
    return value;
  }

  function getYAtJunctionInner(trackId, at, elrNorm, visited) {
    if (visited.includes(trackId)) return null;

    const potentialTracks = tracksByTid.get(trackId) || [];

    for (const connectedTrack of potentialTracks) {
      if (elrNorm && !sectionsByElr.has(elrNorm)) {
        if (!connectedTrack.altRoute || normalizeElr(connectedTrack.altRoute.elr) !== elrNorm) {
          continue;
        }
      } else {
        if (connectedTrack.altRoute) {
          continue;
        }
      }

      for (let i = 0; i < connectedTrack.shape.length; i++) {
        const segment = connectedTrack.shape[i];
        const segMin = Math.min(segment.from, segment.to);
        const segMax = Math.max(segment.from, segment.to);

        if (at >= segMin && at <= segMax) {
          let effectiveYFrom = segment.yFrom;
          let effectiveYTo = segment.yTo;

          if (i === 0 && connectedTrack.fromConnection && connectedTrack.fromConnection.type === 'junction') {
            const startY = getYAtJunctionInner(
              connectedTrack.fromConnection.track,
              connectedTrack.fromConnection.at,
              normalizeElr(connectedTrack.fromConnection.elr),
              [...visited, trackId]
            );
            if (startY !== null) effectiveYFrom = startY;
          }

          if (i === connectedTrack.shape.length - 1 && connectedTrack.toConnection && connectedTrack.toConnection.type === 'junction') {
            const endY = getYAtJunctionInner(
              connectedTrack.toConnection.track,
              connectedTrack.toConnection.at,
              normalizeElr(connectedTrack.toConnection.elr),
              [...visited, trackId]
            );
            if (endY !== null) effectiveYTo = endY;
          }

          if (effectiveYFrom === null || effectiveYTo === null) continue;

          let ratio;
          if (segment.from <= segment.to) {
            ratio = (at - segment.from) / (segment.to - segment.from);
          } else {
            ratio = (at - segment.to) / (segment.from - segment.to);
          }

          return effectiveYFrom + ratio * (effectiveYTo - effectiveYFrom);
        }
      }
    }
    return null;
  }

  let textWidthCache = new Map();

  function measureTextWidth(text) {
    const key = `${ctx.font}|${text}`;
    const cached = textWidthCache.get(key);
    if (cached !== undefined) return cached;
    const width = ctx.measureText(text).width;
    textWidthCache.set(key, width);
    return width;
  }

  function dedupeNearbyLabels(labels, posTolerancePx = 5) {
    const uniqueLabels = [];
    labels.forEach(label => {
      const exists = uniqueLabels.find(l =>
        l.text === label.text &&
        Math.abs(l.x - label.x) < posTolerancePx &&
        Math.abs(l.y - label.y) < posTolerancePx
      );
      if (!exists) {
        uniqueLabels.push(label);
      }
    });
    return uniqueLabels;
  }

  function resolveLabelOverlapsVertically(labels, { iterations = DEFAULT_LABEL_OVERLAP_ITERATIONS, padding = DEFAULT_LABEL_OVERLAP_PADDING_PX } = {}) {
    for (let i = 0; i < iterations; i++) {
      let moved = false;
      for (let j = 0; j < labels.length; j++) {
        for (let k = j + 1; k < labels.length; k++) {
          const l1 = labels[j];
          const l2 = labels[k];

          // Labels are centered at x, y (based on textAlign='center', textBaseline='middle')
          const l1Left = l1.x - l1.halfWidth;
          const l1Right = l1.x + l1.halfWidth;
          const l1Top = l1.y - l1.halfHeight;
          const l1Bottom = l1.y + l1.halfHeight;

          const l2Left = l2.x - l2.halfWidth;
          const l2Right = l2.x + l2.halfWidth;
          const l2Top = l2.y - l2.halfHeight;
          const l2Bottom = l2.y + l2.halfHeight;

          // Simple AABB intersection test
          if (l1Left < l2Right && l1Right > l2Left &&
            l1Top < l2Bottom && l1Bottom > l2Top) {

            // Calculate overlap amounts
            const overlapY = Math.min(l1Bottom - l2Top, l2Bottom - l1Top);

            // Resolve vertically only
            if (overlapY > 0) {
              const moveAmount = (overlapY + padding) / 2;

              if (l1.y < l2.y) {
                l1.y -= moveAmount;
                l2.y += moveAmount;
              } else if (l1.y > l2.y) {
                l1.y += moveAmount;
                l2.y -= moveAmount;
              } else {
                // Equal Y, move based on index to be deterministic
                l1.y -= moveAmount;
                l2.y += moveAmount;
              }
              moved = true;
            }
          }
        }
      }
      if (!moved) break;
    }
  }

  // Helper: Convert yards to screen X
  function getX(yards) {
    return ((yards - config.showFromYards) / config.yardsPerPixel) - scrollPosX;
  }

  // Helper: Convert grid Y to screen Y
  function getY(gridY, centered = false) {
    const offset = centered ? (config.horizontalGridSpacing / 2) : 0;
    return (gridY * config.horizontalGridSpacing) + offset - scrollPosY;
  }

  function getVisibleBounds() {
    const leftYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const rightYards = config.showFromYards + ((scrollPosX + diagramCanvas.clientWidth) * config.yardsPerPixel);
    const topGridY = (scrollPosY / config.horizontalGridSpacing);
    const bottomGridY = ((scrollPosY + diagramCanvas.clientHeight) / config.horizontalGridSpacing);
    return { leftYards, rightYards, topGridY, bottomGridY };
  }

  function getRangeMinMax(a, b) {
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }

  function rangesOverlap(minA, maxA, minB, maxB) {
    // Strict overlap (matches existing < logic)
    return Math.max(minA, minB) < Math.min(maxA, maxB);
  }

  function segmentOverlapsRange(segment, rangeMin, rangeMax) {
    const segMin = Math.min(segment.from, segment.to);
    const segMax = Math.max(segment.from, segment.to);
    return rangesOverlap(segMin, segMax, rangeMin, rangeMax);
  }

  function clipSegmentToRange(segment, rangeMin, rangeMax) {
    const segMin = Math.min(segment.from, segment.to);
    const segMax = Math.max(segment.from, segment.to);
    if (!rangesOverlap(segMin, segMax, rangeMin, rangeMax)) return null;
    return { from: Math.max(rangeMin, segMin), to: Math.min(rangeMax, segMax) };
  }

  function getVisibleSpanYardsForTrack(track, visibleLeftYards, visibleRightYards) {
    let visibleStart = null;
    let visibleEnd = null;

    track.shape.forEach(segment => {
      const segMin = Math.min(segment.from, segment.to);
      const segMax = Math.max(segment.from, segment.to);

      if (segMin < visibleRightYards && segMax > visibleLeftYards) {
        const segStart = Math.max(segMin, visibleLeftYards);
        const segEnd = Math.min(segMax, visibleRightYards);
        if (visibleStart === null) visibleStart = segStart;
        visibleEnd = segEnd;
      }
    });

    if (visibleStart === null || visibleEnd === null) return null;
    return { start: visibleStart, end: visibleEnd };
  }

  function getTrackGridYAtYards(track, yards) {
    let gridY = null;

    track.shape.forEach((segment, index) => {
      const segMin = Math.min(segment.from, segment.to);
      const segMax = Math.max(segment.from, segment.to);

      if (yards < segMin || yards > segMax) return;

      const segmentYFrom = resolveTrackY(track, index, 'from');
      const segmentYTo = resolveTrackY(track, index, 'to');
      if (segmentYFrom === null || segmentYTo === null) return;

      let ratio;
      if (segment.from <= segment.to) {
        ratio = (yards - segment.from) / (segment.to - segment.from);
      } else {
        ratio = (yards - segment.to) / (segment.from - segment.to);
      }

      gridY = segmentYFrom + ratio * (segmentYTo - segmentYFrom);
    });

    return gridY;
  }

  // Helper: Resolve Y position for track end, handling junctions
  function resolveTrackY(track, index, side) {
    const segment = track.shape[index];
    const isFrom = side === 'from';
    let y = isFrom ? segment.yFrom : segment.yTo;
    const connection = isFrom ? track.fromConnection : track.toConnection;
    const isEndSegment = isFrom ? index === 0 : index === track.shape.length - 1;

    if (isEndSegment && connection) {
      if (y === null || connection.type === 'junction') {
        const junctionY = getYAtJunction(connection.track, connection.at, connection.elr);
        if (junctionY !== null) return junctionY;
      }
    }
    return y;
  }

  // Draw Vertical ruler lines and labels
  function drawRuler() {
    drawRulerLayer({
      ctx,
      diagramCanvas,
      route,
      config,
      withCanvasState,
      getVisibleBounds,
      drawLine,
      getX,
      yardsToMiles_text
    });
  }

  // Draw horizontal grid lines
  function drawHorizontalGridLines() {
    drawHorizontalGridLinesLayer({
      ctx,
      config,
      diagramCanvas,
      withCanvasState,
      drawLine,
      getY
    });
  }

  // Draw track diagram
  function drawTracks() {
    drawTracksLayer({
      ctx,
      route,
      withCanvasState,
      getVisibleBounds,
      resolveTrackY,
      drawLine,
      getX,
      getY,
      getVisibleSpanYardsForTrack,
      getTrackGridYAtYards
    });
  }

  // Draw connection labels (fromConnection and toConnection)
  function collectConnectionLabelCandidates(visibleLeftLimitYards, visibleRightLimitYards) {
    const candidates = [];

    route.tracks.forEach(track => {
      // Collect fromConnection label
      if (track.fromConnection && track.fromConnection.sc_name) {
        const firstSegment = track.shape[0];
        const connectionYard = firstSegment.from;

        if (connectionYard >= visibleLeftLimitYards && connectionYard <= visibleRightLimitYards) {
          const trackY = resolveTrackY(track, 0, 'from');
          if (trackY !== null) {
            candidates.push({
              text: track.fromConnection.sc_name,
              x: getX(connectionYard),
              y: getY(trackY, true)
            });
          }
        }
      }

      // Collect toConnection label
      if (track.toConnection && track.toConnection.sc_name) {
        const lastIndex = track.shape.length - 1;
        const lastSegment = track.shape[lastIndex];
        const connectionYard = lastSegment.to;

        if (connectionYard >= visibleLeftLimitYards && connectionYard <= visibleRightLimitYards) {
          const trackY = resolveTrackY(track, lastIndex, 'to');
          if (trackY !== null) {
            candidates.push({
              text: track.toConnection.sc_name,
              x: getX(connectionYard),
              y: getY(trackY, true)
            });
          }
        }
      }
    });

    return candidates;
  }

  function buildConnectionLabelsWithMetrics(candidates, fontSize) {
    return candidates.map(c => {
      const width = measureTextWidth(c.text);
      return {
        text: c.text,
        x: c.x,
        y: c.y,
        width: width,
        height: fontSize,
        halfWidth: width / 2,
        halfHeight: fontSize / 2
      };
    });
  }

  function drawConnections() {
    drawConnectionsLayer({
      ctx,
      withCanvasState,
      getVisibleBounds,
      collectConnectionLabelCandidates,
      buildConnectionLabelsWithMetrics,
      dedupeNearbyLabels,
      resolveLabelOverlapsVertically
    });
  }

  // Draw stations
  function drawStations() {
    drawStationsLayer({
      ctx,
      route,
      config,
      tracksByTid,
      withCanvasState,
      getVisibleBounds,
      getRangeMinMax,
      segmentOverlapsRange,
      getYAtJunction,
      getX,
      getY
    });
  }

  // Draw structures (tunnels, overbridges)
  function drawStructures() {
    drawStructuresLayer({
      ctx,
      route,
      config,
      tracksByTid,
      sectionsByElr,
      withCanvasState,
      getVisibleBounds,
      getYAtJunction,
      getX,
      getY,
      getRangeMinMax,
      segmentOverlapsRange,
      clipSegmentToRange,
      drawLine,
      normalizeElr
    });
  }

  // Draw buffers
  function drawBuffers() {
    drawBuffersLayer({
      route,
      config,
      withCanvasState,
      getVisibleBounds,
      resolveTrackY,
      getX,
      getY,
      drawLine
    });
  }

  function setYardsPerPixel(value, preserveCenter = false) {
    if (!Number.isFinite(value) || value <= 0) return;

    let centerYards = null;
    if (preserveCenter && container) {
      const centerX = scrollPosX + (container.clientWidth / 2);
      centerYards = config.showFromYards + (centerX * config.yardsPerPixel);
    }

    config.yardsPerPixel = value;
    viewportState.lastYardsPerPixel = value;
    applyLayoutSizing(false);

    if (preserveCenter && centerYards !== null && container) {
      const newCenterX = (centerYards - config.showFromYards) / config.yardsPerPixel;
      const newScrollX = newCenterX - (container.clientWidth / 2);
      scrollPosX = Math.max(0, newScrollX);
      container.scrollLeft = scrollPosX;
      viewportState.lastScrollLeftPx = scrollPosX;
      drawAll();
    }
  }

  function setGridSpacing(value) {
    if (!Number.isFinite(value) || value <= 0) return;
    config.horizontalGridSpacing = value;
    applyLayoutSizing(true);
  }

  function setWindowSizeMiles(miles) {
    if (!Number.isFinite(miles) || miles <= 0) return;
    config.scrollSizeYards = miles * YARDS_PER_MILE;
    updateVisibleWindow(currentCenterYards);
    applyLayoutSizing(false);
    centerOnYards(currentCenterYards, false);
  }

  function centerByELR(elrVal, milesVal, yardsVal) {
    const { value, error } = computeAbsoluteYards(elrVal, milesVal, yardsVal);
    if (error || value === null) {
      console.warn(error || 'Unable to compute yardage');
      return;
    }

    centerOnYards(value);
  }

  function setShowArrayOverlays(enabled) {
    config.showArrayOverlays = !!enabled;
    drawAll();
  }

  function setShowUrlOverlays(enabled) {
    config.showUrlOverlays = !!enabled;
    drawAll();
  }

  function setShowAltRulers(enabled) {
    config.showAltRulers = !!enabled;
    drawAll();
  }

  function shouldDrawOverlay(overlay) {
    if (overlay.group === 'URL Overlay') {
      return !!config.showUrlOverlays;
    }
    return !!config.showArrayOverlays;
  }

  function getMatchingTracksForOverlay(overlay) {
    // Find all tracks with the matching TID
    let matchingTracks = tracksByTid.get(overlay.tid) || [];

    // Filter by ELR if specified
    const overlayElrNorm = normalizeElr(overlay.elr);
    if (overlayElrNorm) {
      const isMainRouteELR = sectionsByElr.has(overlayElrNorm);
      matchingTracks = matchingTracks.filter(track => {
        const trackAltElrNorm = normalizeElr(track.altRoute?.elr);
        if (trackAltElrNorm) {
          // Track is on an alternative route (e.g. MEB)
          return trackAltElrNorm === overlayElrNorm;
        }
        // Track is on the main route (e.g. ECM1..ECM7)
        // It matches if the requested ELR is also a main route ELR
        return isMainRouteELR;
      });
    }

    return matchingTracks;
  }

  function computeOverlayStartEndYards(overlay) {
    // Try to resolve using ELR first
    const startRes = computeAbsoluteYards(overlay.elr, overlay.mileFrom, overlay.yardFrom);
    const endRes = computeAbsoluteYards(overlay.elr, overlay.mileTo, overlay.yardTo);

    if (startRes.value !== null && endRes.value !== null) {
      return { startYards: startRes.value, endYards: endRes.value };
    }

    // Fallback to raw calculation
    return {
      startYards: (overlay.mileFrom * YARDS_PER_MILE) + overlay.yardFrom,
      endYards: (overlay.mileTo * YARDS_PER_MILE) + overlay.yardTo
    };
  }

  function buildOverlayPathsForTrack(track, tid, minOverlay, maxOverlay, overlayElr) {
    const paths = [];
    let currentPath = [];

    const sortedSegments = [...track.shape].sort((a, b) => Math.min(a.from, a.to) - Math.min(b.from, b.to));

    sortedSegments.forEach(segment => {
      const clipped = clipSegmentToRange(segment, minOverlay, maxOverlay);
      if (!clipped) return;

      const clipFrom = clipped.from;
      const clipTo = clipped.to;

      // Use overlay ELR when resolving junctions so alt-route tracks are supported
      const yFromGrid = getYAtJunction(tid, clipFrom, overlayElr);
      const yToGrid = getYAtJunction(tid, clipTo, overlayElr);
      if (yFromGrid === null || yToGrid === null) return;

      const p1 = { x: getX(clipFrom), y: getY(yFromGrid, true) };
      const p2 = { x: getX(clipTo), y: getY(yToGrid, true) };

      if (currentPath.length === 0) {
        currentPath.push(p1);
        currentPath.push(p2);
        return;
      }

      const last = currentPath[currentPath.length - 1];
      // Check continuity (tolerance 1px)
      if (Math.hypot(p1.x - last.x, p1.y - last.y) < 1) {
        currentPath.push(p2);
      } else {
        paths.push(currentPath);
        currentPath = [p1, p2];
      }
    });

    if (currentPath.length > 0) paths.push(currentPath);
    return paths;
  }

  function computeOffsetPolygonPoints(path, offset) {
    const topPoints = [];
    const bottomPoints = [];

    for (let i = 0; i < path.length; i++) {
      const p = path[i];
      let dx, dy;

      if (i === 0) {
        // Start point: use normal of first segment
        const pNext = path[i + 1];
        const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x);
        const perp = angle + Math.PI / 2;
        dx = offset * Math.cos(perp);
        dy = offset * Math.sin(perp);
      } else if (i === path.length - 1) {
        // End point: use normal of last segment
        const pPrev = path[i - 1];
        const angle = Math.atan2(p.y - pPrev.y, p.x - pPrev.x);
        const perp = angle + Math.PI / 2;
        dx = offset * Math.cos(perp);
        dy = offset * Math.sin(perp);
      } else {
        // Internal point: calculate miter
        const pPrev = path[i - 1];
        const pNext = path[i + 1];

        // Normal 1
        const a1 = Math.atan2(p.y - pPrev.y, p.x - pPrev.x);
        const n1x = Math.cos(a1 + Math.PI / 2);
        const n1y = Math.sin(a1 + Math.PI / 2);

        // Normal 2
        const a2 = Math.atan2(pNext.y - p.y, pNext.x - p.x);
        const n2x = Math.cos(a2 + Math.PI / 2);
        const n2y = Math.sin(a2 + Math.PI / 2);

        // Average normal (bisector direction)
        let mx = n1x + n2x;
        let my = n1y + n2y;
        const len = Math.hypot(mx, my);

        if (len < 0.001) {
          // Fallback for 180 turn
          dx = n1x * offset;
          dy = n1y * offset;
        } else {
          mx /= len;
          my /= len;
          // Miter length scale = 1 / dot(miter, normal)
          const dot = mx * n1x + my * n1y;
          const scale = offset / dot;
          dx = mx * scale;
          dy = my * scale;
        }
      }

      // "Top" is p - normal*offset (to the left relative to direction? No, +PI/2 is left)
      // Original code: x - dx, y - dy.
      // If dx,dy is "left" vector, then -dx,-dy is "right".
      // Let's stick to the subtraction to match previous behavior.
      topPoints.push({ x: p.x - dx, y: p.y - dy });
      bottomPoints.push({ x: p.x + dx, y: p.y + dy });
    }

    return { topPoints, bottomPoints };
  }

  function computePathMidpoint(path) {
    // Calculate path length
    let totalLen = 0;
    const dists = [0];
    for (let i = 0; i < path.length - 1; i++) {
      const d = Math.hypot(path[i + 1].x - path[i].x, path[i + 1].y - path[i].y);
      totalLen += d;
      dists.push(totalLen);
    }

    // Find midpoint
    const midLen = totalLen / 2;
    let midPoint = path[0];

    for (let i = 0; i < dists.length - 1; i++) {
      if (midLen >= dists[i] && midLen <= dists[i + 1]) {
        const t = (midLen - dists[i]) / (dists[i + 1] - dists[i]);
        midPoint = {
          x: path[i].x + (path[i + 1].x - path[i].x) * t,
          y: path[i].y + (path[i + 1].y - path[i].y) * t
        };
        break;
      }
    }

    return midPoint;
  }

  function drawSideDiagram() {
    const sideCanvas = document.getElementById('sideDiagramCanvas');
    if (!sideCanvas) return;

    const sideCtx = sideCanvas.getContext('2d');
    const sideDpr = window.devicePixelRatio || 1;

    // Set canvas resolution
    sideCanvas.width = sideCanvas.clientWidth * sideDpr;
    sideCanvas.height = sideCanvas.clientHeight * sideDpr;
    sideCtx.setTransform(1, 0, 0, 1, 0, 0);
    sideCtx.scale(sideDpr, sideDpr);

    // Clear canvas
    sideCtx.clearRect(0, 0, sideCanvas.clientWidth, sideCanvas.clientHeight);

    const padding = 20;
    const lineX = sideCanvas.clientWidth / 2;
    const topY = padding;
    const bottomY = sideCanvas.clientHeight - padding;
    const routeHeight = bottomY - topY;

    // Draw vertical line representing the route
    sideCtx.strokeStyle = '#0f172a';
    sideCtx.lineWidth = 3;
    sideCtx.beginPath();
    sideCtx.moveTo(lineX, topY);
    sideCtx.lineTo(lineX, bottomY);
    sideCtx.stroke();

    // Draw viewport indicator rectangle
    // Calculate actual visible yards in the viewport (not scrollSizeYards which is scrollable area)
    const { leftYards, rightYards } = getVisibleBounds();
    const visibleStartYards = leftYards;
    const visibleEndYards = rightYards;
    
    const startRatio = visibleStartYards / config.totalYards;
    const endRatio = visibleEndYards / config.totalYards;
    
    const rectTop = bottomY - (endRatio * routeHeight);
    const rectBottom = bottomY - (startRatio * routeHeight);
    const rectHeight = rectBottom - rectTop;
    
    sideCtx.fillStyle = 'rgba(37, 99, 235, 0.2)';
    sideCtx.strokeStyle = '#2563eb';
    sideCtx.lineWidth = 2;
    sideCtx.fillRect(0, rectTop, sideCanvas.clientWidth, rectHeight);
    sideCtx.strokeRect(0, rectTop, sideCanvas.clientWidth, rectHeight);

    // Draw stations as circles
    if (route.stations && route.stations.length > 0) {
      route.stations.forEach(station => {
        // Only draw if sideDiagramVisible is true
        if (station.sideDiagramVisible !== true) return;
        
        // Calculate position on the line (bottom = low yardage, top = high yardage)
        const ratio = station.at / config.totalYards;
        const y = bottomY - (ratio * routeHeight);

        // Draw station circle
        sideCtx.fillStyle = '#2563eb';
        sideCtx.strokeStyle = '#ffffff';
        sideCtx.lineWidth = 2;
        sideCtx.beginPath();
        sideCtx.arc(lineX, y, 5, 0, 2 * Math.PI);
        sideCtx.fill();
        sideCtx.stroke();

        // Draw station name (to the right of the line)
        sideCtx.fillStyle = '#0f172a';
        sideCtx.font = '10px Arial';
        sideCtx.textAlign = 'left';
        sideCtx.textBaseline = 'middle';
        sideCtx.fillText(station.name, lineX + 12, y);
      });
    }
  }

  function drawOverlays() {
    drawOverlaysLayer({
      ctx,
      config,
      withCanvasState,
      getVisibleBounds,
      shouldDrawOverlay,
      getMatchingTracksForOverlay,
      computeOverlayStartEndYards,
      buildOverlayPathsForTrack,
      computeOffsetPolygonPoints,
      computePathMidpoint
    });
  }

  function drawAll() {
    junctionYCache.clear();
    textWidthCache.clear();
    drawRuler();
    drawHorizontalGridLines();
    drawTracks();
    drawConnections();
    drawBuffers();
    drawStations();
    drawStructures();
    drawOverlays();
    drawSideDiagram();
  }

  // Expose handlers for UI layer
  appAPI = {
    setYardsPerPixel,
    setGridSpacing,
    setWindowSizeMiles,
    centerByELR,
    centerOnYards,
    setShowArrayOverlays,
    setShowUrlOverlays,
    setShowAltRulers
  };

  // Initialize window and scroll position
  // Use initialTargetYards to set the window bounds, but don't let updateVisibleWindow overwrite our target
  updateVisibleWindow(initialTargetYards);
  applyLayoutSizing(false);

  function applyInitialScrollAndRedraw() {
    centerOnYards(initialTargetYards, false);

    // Preserve vertical scroll position across route reloads (e.g. after saving a station/structure).
    // Only fall back to the default row centering on a full page refresh (when lastScrollTopPx is null).
    if (Number.isFinite(viewportState.lastScrollTopPx)) {
      const maxScrollY = Math.max(0, container.scrollHeight - container.clientHeight);
      const nextScrollTop = Math.min(Math.max(0, viewportState.lastScrollTopPx), maxScrollY);
      scrollPosY = nextScrollTop;
      container.scrollTop = nextScrollTop;
    } else {
      centerOnRow(50);
    }

    drawAll();
  }
  
  // Force scroll after a brief delay to override browser scroll restoration
  // Pass initialTargetYards explicitly to ensure we center on the requested location, 
  // not the center of the clamped window.
  setTimeout(() => {
      applyInitialScrollAndRedraw();
  }, 10);

  unbindViewportEvents();
  bindViewportEvents({
    container,
    canvasResize,
    drawAll,
    updateVisibleWindow,
    applyLayoutSizing,
    centerOnYards,
    config,
    setScrollPosX: (v) => { scrollPosX = v; },
    setScrollPosY: (v) => { scrollPosY = v; }
  });
}

// Load route when page loads
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const routeCode = urlParams.get('routeCode');
  if (routeCode) {
    loadRoute(routeCode);
  } else {
    loadRoute();
  }
});

// Expose a minimal API for UI scripts
window.TrackDiagramApp = {
  loadRoute,
  setYardsPerPixel: (v, preserveCenter = true) => appAPI?.setYardsPerPixel(v, preserveCenter),
  setGridSpacing: (v) => appAPI?.setGridSpacing(v),
  setWindowSizeMiles: (miles) => appAPI?.setWindowSizeMiles(miles),
  centerByELR: (elr, miles, yards) => appAPI?.centerByELR(elr, miles, yards),
  centerOnYards: (yards, updateWindow = true) => appAPI?.centerOnYards(yards, updateWindow),
  setShowArrayOverlays: (v) => appAPI?.setShowArrayOverlays(v),
  setShowUrlOverlays: (v) => appAPI?.setShowUrlOverlays(v),
  setShowAltRulers: (v) => appAPI?.setShowAltRulers(v),
  getRoute: () => route,
  getCenterYards: () => {
    if (Number.isFinite(viewportState?.lastCenterYards)) return viewportState.lastCenterYards;
    if (typeof config?.showFromYards === 'number' && typeof config?.showToYards === 'number') {
      return (config.showFromYards + config.showToYards) / 2;
    }
    if (Number.isFinite(currentCenterYards)) return currentCenterYards;
    return null;
  }
};
