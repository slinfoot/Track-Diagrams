const API_URL = (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : 'http://localhost:3000/api/routes');

// Set true for verbose debugging.
const DEBUG = false;

function debugLog(...args) {
  if (DEBUG) console.log(...args);
}

function normalizeElr(elr) {
  return TrackDomain.normalizeElr(elr);
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
const viewportState = ViewportManager.state;

function captureViewportStateFromDom() {
  ViewportManager.captureFromDom();
}

function buildTracksByTid(nextRoute) {
  return TrackDomain.buildTracksByTid(nextRoute);
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

function drawStationsLayer(params) {
  TrackRenderer.drawStationsLayer(params);
}

function drawRulerLayer(params) {
  TrackRenderer.drawRulerLayer({
    ...params,
    ticksCache,
    normalizeElr
  });
}

function drawHorizontalGridLinesLayer(params) {
  TrackRenderer.drawHorizontalGridLinesLayer(params);
}

function drawTracksLayer(params) {
  TrackRenderer.drawTracksLayer(params);
}

function drawConnectionsLayer(params) {
  TrackRenderer.drawConnectionsLayer(params);
}

function drawBuffersLayer(params) {
  TrackRenderer.drawBuffersLayer(params);
}

function drawStructuresLayer(params) {
  TrackRenderer.drawStructuresLayer(params);
}

function drawOverlaysLayer(params) {
  TrackRenderer.drawOverlaysLayer({
    ...params,
    overlayData: (typeof overlayData !== 'undefined' ? overlayData : null)
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
  const { container, logicalSize, diagramCanvas } = getDiagramDomRefs();

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
    const currentDpr = window.devicePixelRatio || 1;
    diagramCanvas.width = diagramCanvas.clientWidth * currentDpr;
    diagramCanvas.height = diagramCanvas.clientHeight * currentDpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(currentDpr, currentDpr);
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
    TrackRenderer.drawSideDiagram({
      sideCanvas: document.getElementById('sideDiagramCanvas'),
      config,
      getVisibleBounds,
      route
    });
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
