const API_URL = 'http://localhost:3000/api/routes';
const DEFAULT_ROUTE_CODE = 'ECML';

let route = null;
const yardsPerPixelInput = document.getElementById('yardsPerPixelInput');
const gridSpacingInput = document.getElementById('gridSpacingInput');
const elrInput = document.getElementById('elrInput');
const mileInput = document.getElementById('mileInput');
const yardInput = document.getElementById('yardInput');
const centerButton = document.getElementById('centerButton');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const windowSizeInput = document.getElementById('windowSizeInput');

// Toggle sidebar
if (hamburgerMenu && sidebar) {
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    sidebar.classList.toggle('open');
  });
}

async function loadRoute(routeCode = DEFAULT_ROUTE_CODE) {
  try {
    const response = await fetch(`${API_URL}/code/${encodeURIComponent(routeCode)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch route (${response.status})`);
    }

    route = await response.json();
    console.log('Route loaded from API:', route);
    initializeApp();
  } catch (err) {
    console.error('Error loading route from API:', err);

    // Fallback: try to load from local data.js if API fails
    if (typeof routes !== 'undefined') {
      const fallbackRoute = routes.find(r => r.code === routeCode);
      if (fallbackRoute) {
        route = fallbackRoute;
        console.warn('Loaded route from local data.js as fallback');
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

  // Configuration for logical distances (mutable so UI changes can tweak values)
  const config = {
    totalYards: route.length_yards,
    yardsPerPixel: parseFloat(yardsPerPixelInput?.value) || 1,
    horizontalGridSpacing: parseFloat(gridSpacingInput?.value) || 50,
    horizontalGridLinesNo: 100,
    windowSizeYards: 17600 * 2, // 20 miles
    showFromYards: 0,
    showToYards: 17600 * 2
  };

  // Track current center position in full route for windowed scrolling
  let currentCenterYards = (((1760 * 28) + 1320 + 331782) || (config.windowSizeYards / 2));

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
  }

  function centerOnYards(yards, updateWindow = true) {
    if (!container) return;

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
    drawAll();
  }

  function computeAbsoluteYards(elrCode, miles, yards) {
    if (!route || !Array.isArray(route.sections)) return { value: null, error: 'Route sections unavailable' };
    const normElr = (elrCode || '').trim().toUpperCase();
    if (!normElr) return { value: null, error: 'ELR is required' };

    const section = route.sections.find(s => (s.elr || '').toUpperCase() === normElr);
    if (!section) return { value: null, error: `ELR ${normElr} not found in sections` };

    const milesVal = Number.isFinite(miles) ? miles : 0;
    const yardsVal = Number.isFinite(yards) ? yards : 0;
    const relativeYards = (milesVal * 1760) + yardsVal;
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
  let scrollTimeout = null;

  // Get canvas drawing context
  const ctx = rulerCanvas.getContext('2d');

  // Resize canvas
  function canvasResize() {
    rulerCanvas.width = rulerCanvas.clientWidth * dpr;
    rulerCanvas.height = rulerCanvas.clientHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  // Convert Yards to Mileage
  function yardsToMiles_text(yards) {
    return  Math.floor(yards / 1760) + "M " + (yards % 1760) + "Y";
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
  function getYAtJunction(trackId, at, elr, visited = []) {
    if (visited.includes(trackId)) return null;

    const potentialTracks = route.tracks.filter(t => t.tid === trackId);

    for (const connectedTrack of potentialTracks) {
      if (elr && !route.sections.some(s => s.elr === elr)) {
        if (!connectedTrack.altRoute || connectedTrack.altRoute.elr !== elr) {
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
            const startY = getYAtJunction(connectedTrack.fromConnection.track, connectedTrack.fromConnection.at, connectedTrack.fromConnection.elr, [...visited, trackId]);
            if (startY !== null) effectiveYFrom = startY;
          }

          if (i === connectedTrack.shape.length - 1 && connectedTrack.toConnection && connectedTrack.toConnection.type === 'junction') {
            const endY = getYAtJunction(connectedTrack.toConnection.track, connectedTrack.toConnection.at, connectedTrack.toConnection.elr, [...visited, trackId]);
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

  // Helper: Convert yards to screen X
  function getX(yards) {
    return ((yards - config.showFromYards) / config.yardsPerPixel) - scrollPosX;
  }

  // Helper: Convert grid Y to screen Y
  function getY(gridY, centered = false) {
    const offset = centered ? (config.horizontalGridSpacing / 2) : 0;
    return (gridY * config.horizontalGridSpacing) + offset - scrollPosY;
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
    ctx.clearRect(0, 0, rulerCanvas.width, rulerCanvas.height);

    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);

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

      if (adjustedYard % 1760 === 0) {
        drawLine(screenX, 0, screenX, 30, 2, 'black');
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(yardsToMiles_text(adjustedYard), screenX + 2, 40);
        drawLine(screenX, 30, screenX, rulerCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.2)');
      }

      if (adjustedYard % 440 === 0 && adjustedYard % 1760 !== 0) {
        drawLine(screenX, 0, screenX, 20, 2, 'black');
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(yardsToMiles_text(adjustedYard), screenX + 2, 30);
        drawLine(screenX, 20, screenX, rulerCanvas.clientHeight, 1, 'rgba(255, 0, 0, 0.3)');
      }

      if (adjustedYard % 110 === 0 && adjustedYard % 440 !== 0) {
        drawLine(screenX, 0, screenX, rulerCanvas.clientHeight, 1, 'rgba(0, 0, 255, 0.3)');
      }

      if (adjustedYard % 22 === 0 && adjustedYard % 110 !== 0) {
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
  }

  // Draw horizontal grid lines
  function drawHorizontalGridLines() {
    const gridSpacing = config.horizontalGridSpacing;
    const numberOfLines = config.horizontalGridLinesNo;

    for (let i = 0; i < numberOfLines; i++) {
      const y = getY(i, false);
      if (y >= 0 && y <= rulerCanvas.clientHeight) {
        drawLine(0, y, rulerCanvas.clientWidth, y, 1, 'rgba(0, 0, 0, 0.75)');
        // Label the lines with their index. Write the text half between the lines
        // The labels will stay at the left even when scrolling horizontally
        ctx.font = '10px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(i, 10, y + (gridSpacing / 2));
      }

    }
  }

  // Draw track diagram
  function drawTracks() {
    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);

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
              drawLine(startX, startYPos, endX, endYPos, 3, 'red');
            }
          }
        }
      });
    });

    // Write TIDs
    route.tracks.forEach(track => {
      let visibleStart = null;
      let visibleEnd = null;

      track.shape.forEach(segment => {
        const segMin = Math.min(segment.from, segment.to);
        const segMax = Math.max(segment.from, segment.to);

        if (segMin < visibleRightLimitYards && segMax > visibleLeftLimitYards) {
          const segStart = Math.max(segMin, visibleLeftLimitYards);
          const segEnd = Math.min(segMax, visibleRightLimitYards);
          if (visibleStart === null) visibleStart = segStart;
          visibleEnd = segEnd;
        }
      });

      if (visibleStart !== null && visibleEnd !== null) {
        const trackMidYard = (visibleStart + visibleEnd) / 2;
        const midX = getX(trackMidYard);

        let midYPos = null;
        track.shape.forEach((segment, index) => {
          const segMin = Math.min(segment.from, segment.to);
          const segMax = Math.max(segment.from, segment.to);

          if (trackMidYard >= segMin && trackMidYard <= segMax) {
            const segmentYFrom = resolveTrackY(track, index, 'from');
            const segmentYTo = resolveTrackY(track, index, 'to');

            if (segmentYFrom === null || segmentYTo === null) return;

            let ratio;
            if (segment.from <= segment.to) {
              ratio = (trackMidYard - segment.from) / (segment.to - segment.from);
            } else {
              ratio = (trackMidYard - segment.to) / (segment.from - segment.to);
            }

            const interpolatedY = segmentYFrom + ratio * (segmentYTo - segmentYFrom);
            midYPos = getY(interpolatedY, true);
          }
        });

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
  }

  // Draw connection labels (fromConnection and toConnection)
  function drawConnections() {
    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);

    const labels = [];
    const fontSize = 10;
    ctx.font = `${fontSize}px Arial`;

    route.tracks.forEach(track => {
      // Collect fromConnection label
      if (track.fromConnection && track.fromConnection.sc_name) {
        const firstSegment = track.shape[0];
        const connectionYard = firstSegment.from;

        if (connectionYard >= visibleLeftLimitYards && connectionYard <= visibleRightLimitYards) {
          const trackY = resolveTrackY(track, 0, 'from');

          if (trackY !== null) {
            const connectionX = getX(connectionYard);
            const trackYPos = getY(trackY, true);
            const text = track.fromConnection.sc_name;
            const width = ctx.measureText(text).width;

            labels.push({
              text: text,
              x: connectionX,
              y: trackYPos,
              width: width,
              height: fontSize,
              halfWidth: width / 2,
              halfHeight: fontSize / 2
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
            const connectionX = getX(connectionYard);
            const trackYPos = getY(trackY, true);
            const text = track.toConnection.sc_name;
            const width = ctx.measureText(text).width;

            labels.push({
              text: text,
              x: connectionX,
              y: trackYPos,
              width: width,
              height: fontSize,
              halfWidth: width / 2,
              halfHeight: fontSize / 2
            });
          }
        }
      }
    });

    // Deduplicate labels (same text and very close position)
    const uniqueLabels = [];
    labels.forEach(label => {
      const exists = uniqueLabels.find(l =>
        l.text === label.text &&
        Math.abs(l.x - label.x) < 5 &&
        Math.abs(l.y - label.y) < 5
      );
      if (!exists) {
        uniqueLabels.push(label);
      }
    });

    // Resolve overlaps
    const iterations = 10;
    const padding = 2; // Vertical padding between labels

    for (let i = 0; i < iterations; i++) {
      let moved = false;
      for (let j = 0; j < uniqueLabels.length; j++) {
        for (let k = j + 1; k < uniqueLabels.length; k++) {
          const l1 = uniqueLabels[j];
          const l2 = uniqueLabels[k];

          // Check for overlap
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

            // We only want to resolve vertically as per request
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

    // Draw labels
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    uniqueLabels.forEach(label => {
      ctx.fillText(label.text, label.x, label.y);
    });
  }

  // Draw stations
  function drawStations() {
    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);
    const visibleTopLimitY = (scrollPosY / config.horizontalGridSpacing);
    const visibleBottomLimitY = ((scrollPosY + rulerCanvas.clientHeight) / config.horizontalGridSpacing);

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
        const track = route.tracks.find(t => {
          if (t.tid !== platform.track) return false;
          // Check if any segment overlaps with platform
          return t.shape.some(seg => {
            const segMin = Math.min(seg.from, seg.to);
            const segMax = Math.max(seg.from, seg.to);
            const platMin = Math.min(platform.from, platform.to);
            const platMax = Math.max(platform.from, platform.to);
            return Math.max(segMin, platMin) < Math.min(segMax, platMax); // Overlap check
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
  }

  // Draw structures (tunnels, overbridges)
  function drawStructures() {
    if (!route.structures) return;

    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);

    route.structures.forEach(structure => {
      if (structure.type === 'viaduct' || structure.type === 'underbridge') {
        // Find top-most and bottom-most tracks
        let topTrackLoc = null;
        let bottomTrackLoc = null;
        let minGridY = Infinity;
        let maxGridY = -Infinity;

        structure.trackLocation.forEach(loc => {
          const midYard = (loc.from + loc.to) / 2;
          const gridY = getYAtJunction(loc.tid, midYard);
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
          const track = route.tracks.find(t => {
            if (t.tid !== loc.tid) return false;
            // Check if any segment overlaps with loc
            return t.shape.some(seg => {
              const segMin = Math.min(seg.from, seg.to);
              const segMax = Math.max(seg.from, seg.to);
              const locMin = Math.min(loc.from, loc.to);
              const locMax = Math.max(loc.from, loc.to);
              return Math.max(segMin, locMin) < Math.min(segMax, locMax); // Overlap check
            });
          });
          if (!track) return;

          const startYard = Math.min(loc.from, loc.to);
          const endYard = Math.max(loc.from, loc.to);

          // Collect segments that are part of the structure
          const segmentsToDraw = [];

          track.shape.forEach(segment => {
            const segMin = Math.min(segment.from, segment.to);
            const segMax = Math.max(segment.from, segment.to);

            if (segMax > startYard && segMin < endYard) {
              const clipFrom = Math.max(startYard, segMin);
              const clipTo = Math.min(endYard, segMax);
              segmentsToDraw.push({ from: clipFrom, to: clipTo });
            }
          });

          segmentsToDraw.sort((a, b) => a.from - b.from);

          // Calculate raw offset lines
          const rawLines = segmentsToDraw.map(seg => {
            const yFromGrid = getYAtJunction(loc.tid, seg.from);
            const yToGrid = getYAtJunction(loc.tid, seg.to);

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
        const gridY = getYAtJunction(loc.tid, midYard);

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
  }

  // Draw buffers
  function drawBuffers() {
    const visibleLeftLimitYards = config.showFromYards + (scrollPosX * config.yardsPerPixel);
    const visibleRightLimitYards = config.showFromYards + ((scrollPosX + rulerCanvas.clientWidth) * config.yardsPerPixel);
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
  }

  function updateConfigFromInputs(recenter = false) {
    const newYardsPerPixel = parseFloat(yardsPerPixelInput?.value);
    const newGridSpacing = parseFloat(gridSpacingInput?.value);

    if (Number.isFinite(newYardsPerPixel) && newYardsPerPixel > 0) {
      config.yardsPerPixel = newYardsPerPixel;
    }

    if (Number.isFinite(newGridSpacing) && newGridSpacing > 0) {
      config.horizontalGridSpacing = newGridSpacing;
    }

    applyLayoutSizing(recenter);
  }

  function centerFromInputs() {
    const milesVal = parseFloat(mileInput?.value);
    const yardsVal = parseFloat(yardInput?.value);
    const elrVal = elrInput?.value;

    const { value, error } = computeAbsoluteYards(elrVal, milesVal, yardsVal);
    if (error || value === null) {
      console.warn(error || 'Unable to compute yardage');
      return;
    }

    centerOnYards(value);
  }

  function drawAll() {
    drawRuler();
    drawHorizontalGridLines();
    drawTracks();
    drawConnections();
    drawBuffers();
    drawStations();
    drawStructures();
  }

  // Initialize window and scroll position
  updateVisibleWindow(currentCenterYards);
  applyLayoutSizing(false);
  centerOnYards(currentCenterYards, false);
  centerOnRow(50);

  // Redraw ruler when viewport resizes
  window.addEventListener("resize", () => {
    canvasResize();
    drawAll();
  });

  if (yardsPerPixelInput) {
    yardsPerPixelInput.addEventListener('input', () => updateConfigFromInputs(true));
  }

  if (gridSpacingInput) {
    gridSpacingInput.addEventListener('input', () => updateConfigFromInputs(true));
  }

  // Window size control
  if (windowSizeInput) {
    windowSizeInput.value = config.windowSizeYards / 1760;
    windowSizeInput.addEventListener('input', () => {
      const miles = parseFloat(windowSizeInput.value);
      if (Number.isFinite(miles) && miles > 0) {
        config.windowSizeYards = miles * 1760;
        updateVisibleWindow(currentCenterYards);
        applyLayoutSizing(false);
        centerOnYards(currentCenterYards, false);
      }
    });
  }

  if (centerButton) {
    centerButton.addEventListener('click', () => centerFromInputs());
  }

  [elrInput, mileInput, yardInput].forEach(input => {
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          centerFromInputs();
        }
      });
    }
  });

  // Update scroll position with windowed scrolling support
  container.addEventListener('scroll', () => {
    scrollPosX = container.scrollLeft;
    scrollPosY = container.scrollTop;
    drawAll();

    // Calculate current visible center in yards
    const visibleCenterX = scrollPosX + (container.clientWidth / 2);
    const visibleCenterYards = config.showFromYards + (visibleCenterX * config.yardsPerPixel);

    // Check if near edges of window (within 20% from either side)
    const windowMargin = config.windowSizeYards * 0.2;
    const distanceFromStart = visibleCenterYards - config.showFromYards;
    const distanceFromEnd = config.showToYards - visibleCenterYards;

    const nearEdge = distanceFromStart < windowMargin || distanceFromEnd < windowMargin;

    // Clear previous timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Recenter window when scrolling stops or near edge
    scrollTimeout = setTimeout(() => {
      const currentVisibleCenterX = scrollPosX + (container.clientWidth / 2);
      const currentVisibleCenterYards = config.showFromYards + (currentVisibleCenterX * config.yardsPerPixel);
      
      // Only update if significantly different from current window center
      if (Math.abs(currentVisibleCenterYards - currentCenterYards) > config.windowSizeYards * 0.1) {
        updateVisibleWindow(currentVisibleCenterYards);
        applyLayoutSizing(false);
        // Maintain view by recentering on same yards
        centerOnYards(currentVisibleCenterYards, false);
      }
    }, nearEdge ? 100 : 500); // Faster response near edges
  });
}

// Load route when page loads
window.addEventListener('DOMContentLoaded', () => {
  loadRoute();
});
