// Domain Logic
// Pure functions for handling track data calculations

const TrackDomain = (function() {
  // Domain constants
  const YARDS_PER_MILE = 1760;
  const RULER_TICK_MAJOR_YARDS = YARDS_PER_MILE;
  const RULER_TICK_MEDIUM_YARDS = 440;
  const RULER_TICK_MINOR_YARDS = 110;
  const RULER_TICK_MICRO_YARDS = 22;

  function normalizeElr(elr) {
    const norm = (elr ?? '').toString().trim().toUpperCase();
    return norm || null;
  }

  function buildTracksByTid(route) {
    const tracksByTid = new Map();
    if (Array.isArray(route?.tracks)) {
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
    return tracksByTid;
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

  function computeAbsoluteYards(elrCode, miles, yards, route, sectionsByElr) {
    if (!route || !Array.isArray(route.sections)) return { value: null, error: 'Route sections unavailable' };
    const normElr = normalizeElr(elrCode);
    if (!normElr) return { value: null, error: 'ELR is required' };

    // Some datasets store altRouteYardageMap.{from,to}YardageMainRoute as *section-relative* yards
    // (i.e. the same "miles/yards" yardage that needs section.offset added), while others store
    // them as *absolute* main-route yards. To be robust, we detect and apply an offset only when
    // the mapped value doesn't land inside any section range, but does land when an offset is added.
    function maybeApplySectionOffsetToMainYards(mainYards) {
      if (!Number.isFinite(mainYards)) return mainYards;
      if (!route?.sections?.length) return mainYards;

      // If already in the main yardage coordinate system, keep as-is.
      for (const s of route.sections) {
        const from = Number(s?.from);
        const to = Number(s?.to);
        if (!Number.isFinite(from) || !Number.isFinite(to)) continue;
        const min = Math.min(from, to);
        const max = Math.max(from, to);
        if (mainYards >= min && mainYards <= max) return mainYards;
      }

      // Otherwise, try treating it as section-relative and adding offsets.
      for (const s of route.sections) {
        const from = Number(s?.from);
        const to = Number(s?.to);
        if (!Number.isFinite(from) || !Number.isFinite(to)) continue;
        const offset = Number(s?.offset) || 0;
        const candidate = mainYards + offset;
        const min = Math.min(from, to);
        const max = Math.max(from, to);
        if (candidate >= min && candidate <= max) return candidate;
      }

      return mainYards;
    }

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
              const mappedMain = mainFrom + fraction * (mainTo - mainFrom);
              const mainYards = maybeApplySectionOffsetToMainYards(mappedMain);
              return { value: mainYards, relativeYards: altYardage, fromAltRoute: true, usedSectionOffset: mainYards !== mappedMain };
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
          const mappedMain = mainFrom + fraction * (mainTo - mainFrom);
          const mainYards = maybeApplySectionOffsetToMainYards(mappedMain);
          return { value: mainYards, relativeYards: altYardage, fromAltRoute: true, usedSectionOffset: mainYards !== mappedMain };
        }
      }
    }

    // Provide helpful error message with available ELRs
    let availableElrs = '';
    if (sectionsByElr.size > 0) {
       availableElrs = Array.from(sectionsByElr.keys()).join(', ');
    } else if (route.sections) {
       availableElrs = route.sections.map(s => s.elr).join(', ');
    }
    
    return { value: null, error: `ELR ${normElr} not found in sections. Available: ${availableElrs}` };
  }

  function computeTrackExtents(track) {
    if (!track?.shape?.length) return null;
    let minFrom = Infinity;
    let maxFrom = -Infinity;
    track.shape.forEach(segment => {
      ['from', 'to'].forEach(key => {
        const val = segment[key];
        if (Number.isFinite(val)) {
          minFrom = Math.min(minFrom, val);
          maxFrom = Math.max(maxFrom, val);
        }
      });
    });
    if (!Number.isFinite(minFrom) || !Number.isFinite(maxFrom)) return null;
    return { minFrom, maxFrom };
  }
  
  function getTrackELR(track, route) {
    if (track.altRoute?.elr) {
      return track.altRoute.elr;
    }
    if (!track.shape?.length || !route?.sections?.length) {
      return '-';
    }
    const extents = computeTrackExtents(track);
    if (!extents) return '-';
    
    const midpoint = (extents.minFrom + extents.maxFrom) / 2;
    const section = route.sections.find(s => midpoint >= s.from && midpoint < s.to);
    return section?.elr ?? '-';
  }

  function validateAndExtractSegment(seg) {
    const fromAlt = Number(seg?.fromYardageAltRoute);
    const toAlt = Number(seg?.toYardageAltRoute);
    const fromMain = Number(seg?.fromYardageMainRoute);
    const toMain = Number(seg?.toYardageMainRoute);
    
    if (![fromAlt, toAlt, fromMain, toMain].every(Number.isFinite)) return null;
    return { fromAlt, toAlt, fromMain, toMain };
  }
  
  function linearInterpolate(value, fromInput, toInput, fromOutput, toOutput) {
    if (!Number.isFinite(value)) return null;
    const denom = toInput - fromInput;
    if (denom === 0) return null;
    const t = (value - fromInput) / denom;
    return fromOutput + t * (toOutput - fromOutput);
  }

  function mapMainYardsToAltYards(seg, mainYards) {
     const extracted = validateAndExtractSegment(seg);
     if (!extracted) return null;
     const { fromAlt, toAlt, fromMain, toMain } = extracted;
     // Works for both same-direction and reverse-direction mappings.
     return linearInterpolate(mainYards, fromMain, toMain, fromAlt, toAlt);
   }

   function mapAltYardsToMainYards(seg, altYards) {
    const extracted = validateAndExtractSegment(seg);
    if (!extracted) return null;
    const { fromAlt, toAlt, fromMain, toMain } = extracted;
    // Works for both same-direction and reverse-direction mappings.
    return linearInterpolate(altYards, fromAlt, toAlt, fromMain, toMain);
   }

   function findAltRouteYardageSegmentGeneric(route, elr, value, getRangeFn) {
    const elrNorm = normalizeElr(elr);
    const list = Array.isArray(route?.altRouteYardageMap) ? route.altRouteYardageMap : [];
    
    let nearestSeg = null;
    let nearestDist = Infinity;
  
    for (const seg of list) {
      if (normalizeElr(seg?.elr) !== elrNorm) continue;
      
      const extracted = validateAndExtractSegment(seg);
      if (!extracted) continue;
      
      const range = getRangeFn(extracted);
      const { min, max } = range;
      
      if (value >= min && value <= max) return seg;
      
      // Extrapolation support: if outside all segments, use the nearest segment endpoint.
      if (Number.isFinite(value)) {
        const dist = value < min ? (min - value) : (value > max ? (value - max) : 0);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestSeg = seg;
        }
      }
    }
    return nearestSeg;
  }
  
  function findAltRouteYardageSegment(route, elr, altYards) {
    return findAltRouteYardageSegmentGeneric(route, elr, altYards, 
      ({ fromAlt, toAlt }) => ({ min: Math.min(fromAlt, toAlt), max: Math.max(fromAlt, toAlt) })
    );
  }
  
  function findAltRouteYardageSegmentForMain(route, elr, mainYards) {
    return findAltRouteYardageSegmentGeneric(route, elr, mainYards, 
      ({ fromMain, toMain }) => ({ min: Math.min(fromMain, toMain), max: Math.max(fromMain, toMain) })
    );
  }

   // Returns { elr, relativeYards } or nulls
  function getElrAndRelativeYardsForMainYards(route, mainYards) {
    if (!route) return { elr: '-', relativeYards: null };
    if (!Number.isFinite(mainYards)) return { elr: '-', relativeYards: null };

    // 1) Look in sections (preferred)
    if (Array.isArray(route.sections) && route.sections.length) {
      const section = route.sections.find(s => mainYards >= s.from && mainYards < s.to);
      if (section) {
        const offset = Number(section.offset) || 0;
        return { elr: section.elr ?? '-', relativeYards: mainYards - offset };
      }
    }

    // 2) Try altRouteYardageMap
    const list = Array.isArray(route.altRouteYardageMap) ? route.altRouteYardageMap : [];
    for (const seg of list) {
      const extracted = validateAndExtractSegment(seg);
      if (!extracted) continue;
      const { fromMain, toMain } = extracted;
      const min = Math.min(fromMain, toMain);
      const max = Math.max(fromMain, toMain);
      if (mainYards >= min && mainYards <= max) {
        const altYards = mapMainYardsToAltYards(seg, mainYards);
        if (Number.isFinite(altYards)) return { elr: seg.elr ?? '-', relativeYards: altYards };
      }
    }

    // 3) Nearest segment extrapolation
    let nearest = null;
    let nearestDist = Infinity;
    for (const seg of list) {
      const extracted = validateAndExtractSegment(seg);
      if (!extracted) continue;
      const { fromMain, toMain } = extracted;
      const min = Math.min(fromMain, toMain);
      const max = Math.max(fromMain, toMain);
      const dist = mainYards < min ? (min - mainYards) : (mainYards > max ? (mainYards - max) : 0);
      if (dist < nearestDist) {
         nearestDist = dist;
         nearest = seg;
      }
    }
    if (nearest) {
      const altYards = mapMainYardsToAltYards(nearest, mainYards);
      if (Number.isFinite(altYards)) return { elr: nearest.elr ?? '-', relativeYards: altYards };
    }

    return { elr: '-', relativeYards: null };
  }

  return {
    normalizeElr,
    buildTracksByTid,
    buildSectionsByElr,
    computeTicksForRoute,
    computeAbsoluteYards,
    computeTrackExtents,
    getTrackELR,
    getElrAndRelativeYardsForMainYards,
    validateAndExtractSegment,
    linearInterpolate,
    mapMainYardsToAltYards,
    mapAltYardsToMainYards,
    findAltRouteYardageSegmentGeneric,
    findAltRouteYardageSegment,
    findAltRouteYardageSegmentForMain,
    CONSTANTS: {
      YARDS_PER_MILE,
      RULER_TICK_MAJOR_YARDS,
      RULER_TICK_MEDIUM_YARDS,
      RULER_TICK_MINOR_YARDS,
      RULER_TICK_MICRO_YARDS
    }
  };
})();
