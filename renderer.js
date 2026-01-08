// Renderer Logic
// Namespaces for rendering different layers of the track diagram

const TrackRenderer = (function() {
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
    yardsToMiles_text,
    ticksCache,
    normalizeElr
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
      // const ALT_RULER_COLOR = 'gray'; // Unused
      const ALT_RULER_COLOR = 'gray';
      const ALT_RULER_LABEL_COLOR = 'rgba(128, 128, 128, 0.85)';
      
      const RULER_TICK_MEDIUM_YARDS = 440;
      const RULER_TICK_MINOR_YARDS = 110;
  
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
              //const txtW = ctx.measureText(txt).width;
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
            // Map junctionGroup -> collected connection yardages (with scName) and pick closest candidate per SC
            const groups = new Map();
            for (const sw of route.switchesAndCrossings) {
              const group = (sw && sw.junctionGroup) ? String(sw.junctionGroup) : null;
              if (!group) continue;
              if (!groups.has(group)) groups.set(group, { entries: [] });
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
                    if (!groups.has(g)) groups.set(g, { entries: [] });
                    groups.get(g).entries.push({ scName, at: atVal });
                  }
                });
              }
  
              // For each group, reduce multiple candidates for the same scName to a single representative
              for (const [g, obj] of groups.entries()) {
                const list = obj.entries || [];
                if (!list.length) { obj.chosen = []; continue; }
  
                // Build scName -> [atVals]
                const scMap = new Map();
                for (const e of list) {
                  if (!scMap.has(e.scName)) scMap.set(e.scName, []);
                  scMap.get(e.scName).push(Number(e.at));
                }
  
                // Compute mean per scName (used as fallback)
                const scMeans = new Map();
                for (const [sn, arr] of scMap.entries()) {
                  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
                  scMeans.set(sn, mean);
                }
  
                const chosen = [];
                if (scMap.size === 1) {
                  // Single scName: take mean of its values
                  const only = Array.from(scMap.values())[0];
                  const mean = only.reduce((a, b) => a + b, 0) / only.length;
                  chosen.push(mean);
                } else {
                  // Multiple scNames: for each scName, pick the candidate closest to the other scMeans
                  for (const [sn, arr] of scMap.entries()) {
                    if (arr.length === 1) { chosen.push(arr[0]); continue; }
  
                    // compute means of other scNames
                    const otherMeans = Array.from(scMeans.entries()).filter(([k]) => k !== sn).map(([k, v]) => v);
                    // choose candidate minimizing sum absolute distance to otherMeans
                    let best = arr[0];
                    let bestScore = Infinity;
                    for (const cand of arr) {
                      const score = otherMeans.reduce((s, om) => s + Math.abs(cand - om), 0);
                      if (score < bestScore) { bestScore = score; best = cand; }
                    }
                    chosen.push(best);
                  }
                }
  
                obj.chosen = chosen;
              }
  
              // Draw label for each group using midpoint of min/max of chosen representatives
              const LABEL_Y = 60; // fixed Y (px) below main ruler
              ctx.font = '12px Arial';
              ctx.textBaseline = 'top';
              for (const [group, obj] of groups.entries()) {
                const arr = obj.chosen || [];
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
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
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = 'black';
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
    computePathMidpoint,
    overlayData
  }) {
    if (!overlayData) return;

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

  function drawSideDiagram({
    sideCanvas,
    config,
    getVisibleBounds,
    route
  }) {
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

  return {
    drawStationsLayer,
    drawRulerLayer,
    drawHorizontalGridLinesLayer,
    drawTracksLayer,
    drawConnectionsLayer,
    drawBuffersLayer,
    drawStructuresLayer,
    drawOverlaysLayer,
    drawSideDiagram
  };
})();
