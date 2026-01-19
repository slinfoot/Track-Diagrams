// Overlay Logic
// Manages reading, parsing, and preparing overlay data for the renderer

const OverlayManager = (function() {
  function parseUrlOverlayLike(raw, index = 0) {
    if (!raw || typeof raw !== 'object') return null;

    const elr = raw.elr;
    const tid = Number.parseInt(raw.tid, 10);
    const mileFrom = Number.parseFloat(raw.mileFrom);
    const yardFrom = Number.parseFloat(raw.yardFrom);
    const mileTo = Number.parseFloat(raw.mileTo);
    const yardTo = Number.parseFloat(raw.yardTo);
    const text = (raw.text === undefined || raw.text === null) ? '' : String(raw.text);

    if (!elr || !Number.isFinite(tid) || !Number.isFinite(mileFrom) || !Number.isFinite(yardFrom) || !Number.isFinite(mileTo) || !Number.isFinite(yardTo)) {
      return null;
    }

    return {
      group: 'URL Overlay',
      elr: String(elr),
      tid,
      mileFrom,
      yardFrom,
      mileTo,
      yardTo,
      text,
      index
    };
  }

  function parseOverlayListParam(raw) {
    if (raw === null || raw === undefined) return null;

    // URLSearchParams.get() already decodes percent-encoding, but callers might still
    // double-encode or pass raw JSON. We'll try a couple of safe parses.
    const attempts = [];
    attempts.push(String(raw));
    try {
      // only try decode if it looks encoded
      if (/%[0-9A-Fa-f]{2}/.test(raw)) attempts.push(decodeURIComponent(raw));
    } catch {
      // ignore
    }

    for (const candidate of attempts) {
      try {
        const parsed = JSON.parse(candidate);
        if (Array.isArray(parsed)) return parsed;
        // allow a single object (treated as a 1-item list)
        if (parsed && typeof parsed === 'object') return [parsed];
      } catch {
        // try next
      }
    }

    return null;
  }

  function consumeUrlOverlaysFromLocation() {
    try {
      if (typeof window === 'undefined' || !window.location) return null;

      const url = new URL(window.location.href);
      const params = url.searchParams;

      // New: overlaylist / overlayList = JSON array of overlay objects
      const overlayListRaw = params.get('overlaylist') ?? params.get('overlayList');
      const overlayList = parseOverlayListParam(overlayListRaw);
      if (overlayListRaw !== null && overlayListRaw !== undefined && overlayList === null) {
        // Helpful debug signal when the param is present but invalid.
        console.warn('Invalid overlaylist/overlayList parameter: must be URL-encoded JSON. Example: overlaylist=' +
          encodeURIComponent('[{"elr":"ECM1","tid":1100,"mileFrom":10,"yardFrom":880,"mileTo":10,"yardTo":1100}]'));
      }

      if (Array.isArray(overlayList) && overlayList.length > 0) {
        const overlays = overlayList
          .map((o, idx) => parseUrlOverlayLike(o, idx))
          .filter(Boolean);

        if (overlays.length === 0) {
          console.warn('overlaylist/overlayList parsed but contained no valid overlays (each item must have elr, tid, mileFrom, yardFrom, mileTo, yardTo).');
          return null;
        }

        // One-shot: remove overlay params from the URL once consumed.
        if (window.history && typeof window.history.replaceState === 'function') {
          const overlayKeys = ['overlaylist', 'overlayList', 'elr', 'tid', 'mileFrom', 'yardFrom', 'mileTo', 'yardTo', 'text'];
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

        return overlays;
      }

      // Back-compat: single overlay via individual params
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
        const overlayKeys = ['elr', 'tid', 'mileFrom', 'yardFrom', 'mileTo', 'yardTo', 'text'];
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

      const overlay = {
        group: 'URL Overlay',
        elr: qElr,
        tid: parseInt(qTid),
        mileFrom: parseFloat(qMileFrom),
        yardFrom: parseFloat(qYardFrom),
        mileTo: parseFloat(qMileTo),
        yardTo: parseFloat(qYardTo),
        text: qText || ''
      };

      return [overlay];
    } catch {
      return null;
    }
  }

  function consumeUrlOverlayFromLocation() {
    const overlays = consumeUrlOverlaysFromLocation();
    if (!Array.isArray(overlays) || overlays.length === 0) return null;
    return overlays[0];
  }

  function addOverlayIfMissing(overlay, isDuplicateFn) {
    // Check if overlayData exists in global scope (legacy support) or if it needs to be passed in. 
    // Ideally this function would operate on a passed array, but preserving original behavior for now.
    // Assuming window.overlayData or global overlayData is used.
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
  
    const startYards = (urlOverlay.mileFrom * TrackDomain.CONSTANTS.YARDS_PER_MILE) + urlOverlay.yardFrom;
    const endYards = (urlOverlay.mileTo * TrackDomain.CONSTANTS.YARDS_PER_MILE) + urlOverlay.yardTo;
    return {
      centerYards: (startYards + endYards) / 2,
      startRes,
      endRes,
      usedFallback: true
    };
  }

  function getMatchingTracksForOverlay(overlay, tracksByTid, sectionsByElr) {
    // Find all tracks with the matching TID
    let matchingTracks = tracksByTid.get(overlay.tid) || [];

    // Filter by ELR if specified
    const overlayElrNorm = TrackDomain.normalizeElr(overlay.elr);
    if (overlayElrNorm) {
      const isMainRouteELR = sectionsByElr.has(overlayElrNorm);
      matchingTracks = matchingTracks.filter(track => {
        const trackAltElrNorm = TrackDomain.normalizeElr(track.altRoute?.elr);
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

  return {
    consumeUrlOverlayFromLocation,
    consumeUrlOverlaysFromLocation,
    addOverlayIfMissing,
    computeOverlayCenterYards,
    getMatchingTracksForOverlay
  };
})();