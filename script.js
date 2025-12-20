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
const DEFAULT_WINDOW_MILES = 10;

// Layout/label defaults
const WINDOW_EDGE_MARGIN_RATIO = 0.2;
const DEFAULT_LABEL_OVERLAP_ITERATIONS = 10;
const DEFAULT_LABEL_OVERLAP_PADDING_PX = 2;

let route = null;
let appAPI = null;

// Preserve viewport state across route reloads (save/edit/delete triggers loadRoute again)
let lastCenterYards = null;
let lastScrollTopPx = null;
let lastScrollLeftPx = null;
let lastShowFromYards = null;
let lastYardsPerPixel = null;
let boundContainer = null;
let boundScrollHandler = null;
let boundResizeHandler = null;
let boundPointerDownHandler = null;
let boundPointerUpHandler = null;
let boundPointerCancelHandler = null;
let isMouseDownInDiagram = false;
let lastNearEdge = false;
let lastVisibleCenterYards = null;

function captureViewportStateFromDom() {
  if (!boundContainer) return;

  lastScrollTopPx = boundContainer.scrollTop;
  lastScrollLeftPx = boundContainer.scrollLeft;

  if (Number.isFinite(lastShowFromYards) && Number.isFinite(lastYardsPerPixel)) {
    const visibleCenterX = boundContainer.scrollLeft + (boundContainer.clientWidth / 2);
    const visibleCenterYards = lastShowFromYards + (visibleCenterX * lastYardsPerPixel);
    if (Number.isFinite(visibleCenterYards)) {
      lastCenterYards = visibleCenterYards;
      lastVisibleCenterYards = visibleCenterYards;
    }
  }
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
    lastCenterYards = null;
    lastScrollTopPx = null;
    lastScrollLeftPx = null;
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
  // Note: This index is rebuilt on every route load (initializeApp call).
  const tracksByTid = new Map();
  if (Array.isArray(route.tracks)) {
    route.tracks.forEach(track => {
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

  const sectionsByElr = new Map();
  if (Array.isArray(route.sections)) {
    route.sections.forEach(section => {
      const normElr = normalizeElr(section?.elr);
      if (!normElr) return;
      if (!sectionsByElr.has(normElr)) {
        sectionsByElr.set(normElr, section);
      }
    });
  }

  // Configuration for logical distances (mutable so UI changes can tweak values)
  const config = {
    totalYards: route.length_yards,
    yardsPerPixel: DEFAULT_YARDS_PER_PIXEL,
    horizontalGridSpacing: DEFAULT_GRID_SPACING,
    horizontalGridLinesNo: 100,
    windowSizeYards: DEFAULT_WINDOW_MILES * YARDS_PER_MILE,
    showFromYards: 0,
    showToYards: DEFAULT_WINDOW_MILES * YARDS_PER_MILE,
    showArrayOverlays: true,
    showUrlOverlays: true
  };

  // Keep a minimal copy of the viewport-related config in globals so loadRoute()
  // can capture the current center even if a scroll event hasn't fired recently.
  lastYardsPerPixel = config.yardsPerPixel;
  lastShowFromYards = config.showFromYards;

  // Track current center position in full route for windowed scrolling
  // Keep the previous center when reloading the route to avoid "snap back".
  function getInitialTargetYards() {
    return Number.isFinite(lastCenterYards)
      ? lastCenterYards
      : (((YARDS_PER_MILE * 0) + 0 + 331782) || (config.windowSizeYards / 2));
  }

  let initialTargetYards = getInitialTargetYards();

  function clearUrlOverlayQueryParams() {
    try {
      if (typeof window === 'undefined') return;
      if (!window.location) return;
      if (!window.history || typeof window.history.replaceState !== 'function') return;

      const url = new URL(window.location.href);
      const params = url.searchParams;

      // Keep routeCode, but clear overlay-related params so they don't keep re-centering
      // on subsequent loadRoute() calls (e.g. after Save).
      const overlayKeys = ['elr', 'tid', 'mileFrom', 'yardFrom', 'mileTo', 'yardTo', 'text'];
      let changed = false;
      overlayKeys.forEach(key => {
        if (params.has(key)) {
          params.delete(key);
          changed = true;
        }
      });

      if (!changed) return;
      url.search = params.toString();
      window.history.replaceState(null, '', url.toString());
    } catch {
      // ignore
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

  function applyUrlOverlayFromQuery() {
    // Check for URL query params for overlay
    const urlParams = new URLSearchParams(window.location.search);
    const qRouteCode = urlParams.get('routeCode');
    const qElr = urlParams.get('elr');
    const qTid = urlParams.get('tid');
    const qMileFrom = urlParams.get('mileFrom');
    const qYardFrom = urlParams.get('yardFrom');
    const qMileTo = urlParams.get('mileTo');
    const qYardTo = urlParams.get('yardTo');
    const qText = urlParams.get('text');

    if (!(qRouteCode && qElr && qTid && qMileFrom !== null && qYardFrom !== null && qMileTo !== null && qYardTo !== null)) {
      return null;
    }

    debugLog('URL Params detected:', { qRouteCode, qElr, qTid, qMileFrom, qYardFrom, qMileTo, qYardTo });
    if (qRouteCode !== route.code) {
      return null;
    }

    // One-shot: remove overlay params from the URL once consumed, so future route reloads
    // (e.g. triggered by Save) don't keep forcing a recenter.
    clearUrlOverlayQueryParams();

    const overlay = {
      group: 'URL Overlay',
      routeCode: qRouteCode,
      elr: qElr,
      tid: parseInt(qTid),
      mileFrom: parseFloat(qMileFrom),
      yardFrom: parseFloat(qYardFrom),
      mileTo: parseFloat(qMileTo),
      yardTo: parseFloat(qYardTo),
      text: qText || ''
    };
    debugLog('Created overlay object:', overlay);

    addOverlayIfMissing(
      overlay,
      o => o.group === 'URL Overlay' &&
        o.tid === overlay.tid &&
        o.mileFrom === overlay.mileFrom &&
        o.yardFrom === overlay.yardFrom
    );

    // Calculate center based on ELR offset if available
    debugLog('Attempting to compute absolute yards for centering...');
    debugLog('Route sections available:', route.sections ? route.sections.length : 'None');

    const startRes = computeAbsoluteYards(overlay.elr, overlay.mileFrom, overlay.yardFrom);
    const endRes = computeAbsoluteYards(overlay.elr, overlay.mileTo, overlay.yardTo);

    debugLog('Compute results:', { start: startRes, end: endRes });

    if (startRes.value !== null && endRes.value !== null) {
      const centerYards = (startRes.value + endRes.value) / 2;
      lastCenterYards = centerYards;
      debugLog('Centered on overlay at absolute yards:', centerYards);
      return centerYards;
    }

    console.warn('Could not compute absolute yards for overlay centering', startRes.error, endRes.error);
    // Fallback to absolute calculation if ELR lookup fails
    const startYards = (overlay.mileFrom * YARDS_PER_MILE) + overlay.yardFrom;
    const endYards = (overlay.mileTo * YARDS_PER_MILE) + overlay.yardTo;
    const centerYards = (startYards + endYards) / 2;
    lastCenterYards = centerYards;
    debugLog('Fallback centering at:', centerYards);
    return centerYards;
  }

  const urlOverlayCenterYards = applyUrlOverlayFromQuery();
  if (Number.isFinite(urlOverlayCenterYards)) {
    initialTargetYards = urlOverlayCenterYards;
  }

  // DOM references
  const container = document.getElementById('container');
  const logicalSize = document.getElementById('logicalSize');
  const rulerCanvas = document.getElementById('rulerCanvas');
  const dpr = window.devicePixelRatio || 1;

  // Programmatically set spacer size
  function centerOnRow(rowIndex = 50) {
    if (!container) return;
    const targetY = rowIndex * config.horizontalGridSpacing;
    const centerY = container.clientHeight / 2;
    scrollPosY = Math.max(0, targetY - centerY);
    container.scrollTop = scrollPosY;
    lastScrollTopPx = scrollPosY;
  }

  function updateVisibleWindow(centerYards) {
    const halfWindow = config.windowSizeYards / 2;
    let newFrom = centerYards - halfWindow;
    let newTo = centerYards + halfWindow;

    // Clamp to route bounds
    if (newFrom < 0) {
      newFrom = 0;
      newTo = Math.min(config.windowSizeYards, config.totalYards);
    } else if (newTo > config.totalYards) {
      newTo = config.totalYards;
      newFrom = Math.max(0, config.totalYards - config.windowSizeYards);
    }

    config.showFromYards = newFrom;
    config.showToYards = newTo;
    currentCenterYards = (newFrom + newTo) / 2;
    lastCenterYards = currentCenterYards;
    lastShowFromYards = config.showFromYards;
    lastYardsPerPixel = config.yardsPerPixel;
  }

  function centerOnYards(yards, updateWindow = true) {
    if (!container) return;

    if (Number.isFinite(yards)) {
      lastCenterYards = yards;
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
    lastScrollLeftPx = nextScrollX;
    drawAll();
  }

  function computeAbsoluteYards(elrCode, miles, yards) {
    if (!route || !Array.isArray(route.sections)) return { value: null, error: 'Route sections unavailable' };
    const normElr = normalizeElr(elrCode);
    if (!normElr) return { value: null, error: 'ELR is required' };

    const section = sectionsByElr.get(normElr);
    if (!section) {
        const availableElrs = route.sections.map(s => s.elr).join(', ');
        return { value: null, error: `ELR ${normElr} not found in sections. Available: ${availableElrs}` };
    }

    // Ensure inputs are numbers
    const m = typeof miles === 'string' ? parseFloat(miles) : miles;
    const y = typeof yards === 'string' ? parseFloat(yards) : yards;

    const milesVal = Number.isFinite(m) ? m : 0;
    const yardsVal = Number.isFinite(y) ? y : 0;
    const relativeYards = (milesVal * YARDS_PER_MILE) + yardsVal;
    const absoluteYards = relativeYards + (section.offset || 0);

    return { value: absoluteYards, section, relativeYards };
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
  const ctx = rulerCanvas.getContext('2d');

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
    rulerCanvas.width = rulerCanvas.clientWidth * dpr;
    rulerCanvas.height = rulerCanvas.clientHeight * dpr;
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
    const rightYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);
    const topGridY = (scrollPosY / config.horizontalGridSpacing);
    const bottomGridY = ((scrollPosY + rulerCanvas.clientHeight) / config.horizontalGridSpacing);
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
    withCanvasState(() => {
      ctx.clearRect(0, 0, rulerCanvas.width, rulerCanvas.height);

      const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

      drawLine(0, 0, rulerCanvas.clientWidth, 0, 4, 'black');

      for (let yard = 0; yard <= config.totalYards; yard++) {
        if (yard < visibleLeftLimitYards || yard > visibleRightLimitYards) {
          continue;
        }

        let adjustedYard;
        route.sections.forEach(s => {
          if (yard >= s.from && yard < s.to) {
            adjustedYard = yard - s.offset;
          }
        });

        const screenX = getX(yard);

        if (adjustedYard % RULER_TICK_MAJOR_YARDS === 0) {
          drawLine(screenX, 0, screenX, 30, 2, 'black');
          ctx.font = '12px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(yardsToMiles_text(adjustedYard), screenX + 2, 40);
          drawLine(screenX, 30, screenX, rulerCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.2)');
        }

        if (adjustedYard % RULER_TICK_MEDIUM_YARDS === 0 && adjustedYard % RULER_TICK_MAJOR_YARDS !== 0) {
          drawLine(screenX, 0, screenX, 20, 2, 'black');
          ctx.font = '12px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(yardsToMiles_text(adjustedYard), screenX + 2, 30);
          drawLine(screenX, 20, screenX, rulerCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.3)');
        }

        if (adjustedYard % RULER_TICK_MINOR_YARDS === 0 && adjustedYard % RULER_TICK_MEDIUM_YARDS !== 0) {
          drawLine(screenX, 0, screenX, rulerCanvas.clientHeight, 1, 'rgba(0, 0, 255, 0.3)');
        }

        if (adjustedYard % RULER_TICK_MICRO_YARDS === 0 && adjustedYard % RULER_TICK_MINOR_YARDS !== 0) {
          drawLine(screenX, 0, screenX, rulerCanvas.clientHeight, 1, 'rgba(0, 0, 0, 0.2)');
        }

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
              drawLine(interfaceX, 0, interfaceX, rulerCanvas.clientHeight, 5, 'rgba(0, 150, 0, 0.2)');
            }
          }
        });
      }
    });
  }

  // Draw horizontal grid lines
  function drawHorizontalGridLines() {
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
        if (y >= 0 && y <= rulerCanvas.clientHeight) {
          drawLine(0, y, rulerCanvas.clientWidth, y, 1, 'rgba(0, 0, 0, 0.75)');
          ctx.fillText(i, 10, y + (gridSpacing / 2));
        }
      }
    });
  }

  // Draw track diagram
  function drawTracks() {
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
                drawLine(startX, startYPos, endX, endYPos, 3, 'gray');
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
    withCanvasState(() => {
      const { leftYards: visibleLeftLimitYards, rightYards: visibleRightLimitYards } = getVisibleBounds();

      const fontSize = 10;
      ctx.font = `${fontSize}px Arial`;

      const candidates = collectConnectionLabelCandidates(visibleLeftLimitYards, visibleRightLimitYards);
      const labels = buildConnectionLabelsWithMetrics(candidates, fontSize);

      const uniqueLabels = dedupeNearbyLabels(labels, 5);
      resolveLabelOverlapsVertically(uniqueLabels);

      // Draw labels
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = 'blue';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      uniqueLabels.forEach(label => {
        ctx.fillText(label.text, label.x, label.y);
      });
    });
  }

  // Draw stations
  function drawStations() {
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

  // Draw structures (tunnels, overbridges)
  function drawStructures() {
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
          drawLine(topWall.start.x, topWall.start.y, bottomWall.start.x, bottomWall.start.y, 1, 'blue');
          drawLine(topWall.end.x, topWall.end.y, bottomWall.end.x, bottomWall.end.y, 1, 'blue');
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
        drawLine(fromPortal.start.x, fromPortal.start.y, toPortal.start.x, toPortal.start.y, 1, 'blue');
        drawLine(fromPortal.end.x, fromPortal.end.y, toPortal.end.x, toPortal.end.y, 1, 'blue');
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

  // Draw buffers
  function drawBuffers() {
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

  function setYardsPerPixel(value, preserveCenter = false) {
    if (!Number.isFinite(value) || value <= 0) return;

    let centerYards = null;
    if (preserveCenter && container) {
      const centerX = scrollPosX + (container.clientWidth / 2);
      centerYards = config.showFromYards + (centerX * config.yardsPerPixel);
    }

    config.yardsPerPixel = value;
    lastYardsPerPixel = value;
    applyLayoutSizing(false);

    if (preserveCenter && centerYards !== null && container) {
      const newCenterX = (centerYards - config.showFromYards) / config.yardsPerPixel;
      const newScrollX = newCenterX - (container.clientWidth / 2);
      scrollPosX = Math.max(0, newScrollX);
      container.scrollLeft = scrollPosX;
      lastScrollLeftPx = scrollPosX;
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
    config.windowSizeYards = miles * YARDS_PER_MILE;
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

  function buildOverlayPathsForTrack(track, tid, minOverlay, maxOverlay) {
    const paths = [];
    let currentPath = [];

    const sortedSegments = [...track.shape].sort((a, b) => Math.min(a.from, a.to) - Math.min(b.from, b.to));

    sortedSegments.forEach(segment => {
      const clipped = clipSegmentToRange(segment, minOverlay, maxOverlay);
      if (!clipped) return;

      const clipFrom = clipped.from;
      const clipTo = clipped.to;

      // Preserve existing behavior: overlay path lookup uses tid only (no ELR).
      const yFromGrid = getYAtJunction(tid, clipFrom);
      const yToGrid = getYAtJunction(tid, clipTo);
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

  function drawOverlays() {
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
          const paths = buildOverlayPathsForTrack(track, overlay.tid, minOverlay, maxOverlay);

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
  }

  // Expose handlers for UI layer
  appAPI = {
    setYardsPerPixel,
    setGridSpacing,
    setWindowSizeMiles,
    centerByELR,
    centerOnYards,
    setShowArrayOverlays,
    setShowUrlOverlays
  };

  // Initialize window and scroll position
  // Use initialTargetYards to set the window bounds, but don't let updateVisibleWindow overwrite our target
  updateVisibleWindow(initialTargetYards);
  applyLayoutSizing(false);
  
  // Force scroll after a brief delay to override browser scroll restoration
  // Pass initialTargetYards explicitly to ensure we center on the requested location, 
  // not the center of the clamped window.
  setTimeout(() => {
      centerOnYards(initialTargetYards, false);

      // Preserve vertical scroll position across route reloads (e.g. after saving a station/structure).
      // Only fall back to the default row centering on a full page refresh (when lastScrollTopPx is null).
      if (Number.isFinite(lastScrollTopPx)) {
        const maxScrollY = Math.max(0, container.scrollHeight - container.clientHeight);
        const nextScrollTop = Math.min(Math.max(0, lastScrollTopPx), maxScrollY);
        scrollPosY = nextScrollTop;
        container.scrollTop = nextScrollTop;
      } else {
        centerOnRow(50);
      }

      drawAll();
  }, 10);

  function unbindEvents() {
    // Avoid accumulating event listeners on repeated loadRoute() calls
    if (boundContainer && boundScrollHandler) {
      boundContainer.removeEventListener('scroll', boundScrollHandler);
    }
    if (boundResizeHandler) {
      window.removeEventListener('resize', boundResizeHandler);
    }
    if (boundContainer && boundPointerDownHandler) {
      boundContainer.removeEventListener('pointerdown', boundPointerDownHandler);
    }
    if (boundPointerUpHandler) {
      window.removeEventListener('pointerup', boundPointerUpHandler);
    }
    if (boundPointerCancelHandler) {
      window.removeEventListener('pointercancel', boundPointerCancelHandler);
    }
  }

  function bindEvents() {
    // Redraw ruler when viewport resizes
    boundResizeHandler = () => {
      canvasResize();
      drawAll();
    };
    window.addEventListener('resize', boundResizeHandler);

    // Update scroll position with windowed scrolling support
    boundContainer = container;

    // Recenter window only when the user releases the mouse button near an edge.
    // This avoids unexpected snapping while the user is still scrolling.
    boundPointerDownHandler = (e) => {
      if (e.pointerType === 'mouse' && e.button === 0) {
        isMouseDownInDiagram = true;
      }
    };
    boundPointerUpHandler = (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!isMouseDownInDiagram) return;
      isMouseDownInDiagram = false;

      if (lastNearEdge && Number.isFinite(lastVisibleCenterYards)) {
        updateVisibleWindow(lastVisibleCenterYards);
        applyLayoutSizing(false);
        // Maintain view by keeping the same yards under the viewport center
        centerOnYards(lastVisibleCenterYards, false);
      }
    };
    boundPointerCancelHandler = () => {
      isMouseDownInDiagram = false;
    };

    container.addEventListener('pointerdown', boundPointerDownHandler);
    window.addEventListener('pointerup', boundPointerUpHandler);
    window.addEventListener('pointercancel', boundPointerCancelHandler);

    boundScrollHandler = () => {
      scrollPosX = container.scrollLeft;
      scrollPosY = container.scrollTop;
      lastScrollTopPx = scrollPosY;
      lastScrollLeftPx = scrollPosX;
      drawAll();

      // Calculate current visible center in yards
      const visibleCenterX = scrollPosX + (container.clientWidth / 2);
      const visibleCenterYards = config.showFromYards + (visibleCenterX * config.yardsPerPixel);
      lastCenterYards = visibleCenterYards;
      lastVisibleCenterYards = visibleCenterYards;

      lastShowFromYards = config.showFromYards;
      lastYardsPerPixel = config.yardsPerPixel;

      // Check if near edges of window (within 20% from either side)
      const windowMargin = config.windowSizeYards * WINDOW_EDGE_MARGIN_RATIO;
      const distanceFromStart = visibleCenterYards - config.showFromYards;
      const distanceFromEnd = config.showToYards - visibleCenterYards;

      lastNearEdge = distanceFromStart < windowMargin || distanceFromEnd < windowMargin;
    };

    container.addEventListener('scroll', boundScrollHandler);
  }

  unbindEvents();
  bindEvents();
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
  getRoute: () => route
};
