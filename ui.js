// UI wiring for Track Diagrams
const apiUrl = (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : 'http://localhost:3000/api/routes');

// Elements
const routeSelector = document.getElementById('routeSelector');
const yardsPerPixelInput = document.getElementById('yardsPerPixelInput');
const gridSpacingInput = document.getElementById('gridSpacingInput');
const showArrayOverlays = document.getElementById('showArrayOverlays');
const showUrlOverlays = document.getElementById('showUrlOverlays');
const windowSizeInput = document.getElementById('windowSizeInput');
const elrInput = document.getElementById('elrInput');
const mileInput = document.getElementById('mileInput');
const yardInput = document.getElementById('yardInput');
const centerButton = document.getElementById('centerButton');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const editDiagramBtn = document.getElementById('editDiagramBtn');
const editPanel = document.getElementById('editPanel');
const closeEditPanelBtn = document.getElementById('closeEditPanelBtn');
const editRouteName = document.getElementById('editRouteName');
const editRouteCode = document.getElementById('editRouteCode');
const editRouteLength = document.getElementById('editRouteLength');
const tracksTableBody = document.getElementById('tracksTableBody');
const tidFilter = document.getElementById('tidFilter');
const addTrackBtn = document.getElementById('addTrackBtn');
const editSelectedTrackBtn = document.getElementById('editSelectedTrackBtn');
const editTabButtons = Array.from(document.querySelectorAll('.edit-tab-button'));
const editTabPanels = Array.from(document.querySelectorAll('.edit-tab-content'));
// Alt Yardage Elements
const altYardageTableBody = document.getElementById('altYardageTableBody');
const altElrFilter = document.getElementById('altElrFilter');
const addAltYardageBtn = document.getElementById('addAltYardageBtn');
const editSelectedAltYardageBtn = document.getElementById('editSelectedAltYardageBtn');

// Alt Yardage Modal Elements
const altYardageEditModal = document.getElementById('altYardageEditModal');
const altYardageModalTitle = document.getElementById('altYardageModalTitle');
const altYardageModalCloseBtn = document.getElementById('altYardageModalCloseBtn');
const altYardageModalCancelBtn = document.getElementById('altYardageModalCancelBtn');
const altYardageModalSaveBtn = document.getElementById('altYardageModalSaveBtn');
const altYardageEditForm = document.getElementById('altYardageEditForm');
const formAltElr = document.getElementById('formAltElr');
const formFromMain = document.getElementById('formFromMain');
const formToMain = document.getElementById('formToMain');
const formFromAlt = document.getElementById('formFromAlt');
const formToAlt = document.getElementById('formToAlt');

// Modal elements
const trackEditModal = document.getElementById('trackEditModal');
const modalTitle = document.getElementById('modalTitle');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalSaveBtn = document.getElementById('modalSaveBtn');
const trackEditForm = document.getElementById('trackEditForm');
const formTid = document.getElementById('formTid');
const formFromType = document.getElementById('formFromType');
const formFromSc = document.getElementById('formFromSc');
const formFromTrack = document.getElementById('formFromTrack');
const formFromAt = document.getElementById('formFromAt');
const formFromElr = document.getElementById('formFromElr');
const formToType = document.getElementById('formToType');
const formToSc = document.getElementById('formToSc');
const formToTrack = document.getElementById('formToTrack');
const formToAt = document.getElementById('formToAt');
const formToElr = document.getElementById('formToElr');
const formAltRouteElr = document.getElementById('formAltRouteElr');
const formAltRouteShowRuler = document.getElementById('formAltRouteShowRuler');
const shapeTableModalBody = document.getElementById('shapeTableModalBody');
const addShapeBtn = document.getElementById('addShapeBtn');

// Station Elements
const stationsTableBody = document.getElementById('stationsTableBody');
const stationFilter = document.getElementById('stationFilter');
const addStationBtn = document.getElementById('addStationBtn');
const editSelectedStationBtn = document.getElementById('editSelectedStationBtn');

// Station Modal Elements
const stationEditModal = document.getElementById('stationEditModal');
const stationModalTitle = document.getElementById('stationModalTitle');
const stationModalCloseBtn = document.getElementById('stationModalCloseBtn');
const stationModalCancelBtn = document.getElementById('stationModalCancelBtn');
const stationModalSaveBtn = document.getElementById('stationModalSaveBtn');
const stationEditForm = document.getElementById('stationEditForm');
const formStationName = document.getElementById('formStationName');
const formStationAt = document.getElementById('formStationAt');
const formStationSideDiagramVisible = document.getElementById('formStationSideDiagramVisible');
const platformsTableBody = document.getElementById('platformsTableBody');
const addPlatformBtn = document.getElementById('addPlatformBtn');

// Structure Elements
const structuresTableBody = document.getElementById('structuresTableBody');
const structureFilter = document.getElementById('structureFilter');
const addStructureBtn = document.getElementById('addStructureBtn');
const editSelectedStructureBtn = document.getElementById('editSelectedStructureBtn');

// Structure Modal Elements
const structureEditModal = document.getElementById('structureEditModal');
const structureModalTitle = document.getElementById('structureModalTitle');
const structureModalCloseBtn = document.getElementById('structureModalCloseBtn');
const structureModalCancelBtn = document.getElementById('structureModalCancelBtn');
const structureModalSaveBtn = document.getElementById('structureModalSaveBtn');
const structureEditForm = document.getElementById('structureEditForm');
const formStructureName = document.getElementById('formStructureName');
const formStructureType = document.getElementById('formStructureType');
const formStructureNo = document.getElementById('formStructureNo');
const structureTracksTableBody = document.getElementById('structureTracksTableBody');
const addStructureTrackBtn = document.getElementById('addStructureTrackBtn');

// Yards calculator modal
const yardsCalcModal = document.getElementById('yardsCalcModal');
const calcModalCloseBtn = document.getElementById('calcModalCloseBtn');
const calcCancelBtn = document.getElementById('calcCancelBtn');
const yardsCalcForm = document.getElementById('yardsCalcForm');
const calcElr = document.getElementById('calcElr');
const calcMiles = document.getElementById('calcMiles');
const calcYards = document.getElementById('calcYards');
const calcChains = document.getElementById('calcChains');

let selectedTrack = null;
let selectedTrackId = null;
let selectedTrackTid = null;
let isAddingNewTrack = false;
let isSavingTrack = false;

let selectedStation = null;
let selectedStationId = null;
let isAddingNewStation = false;
let isSavingStation = false;

let selectedStructure = null;
let selectedStructureId = null;
let isAddingNewStructure = false;
let isSavingStructure = false;

// Alt Yardage state
let selectedAltYardage = null;
let selectedAltYardageIndex = null;
let isAddingNewAltYardage = false;
let isSavingAltYardage = false;

let editingShapeIndex = null;
let calcTargetInput = null;
let calcSourceMainYards = null;
let calcAutofillEnabled = false;
let calcProgrammaticUpdate = false;

// Side diagram click -> center mapping
const sideDiagramCanvas = document.getElementById('sideDiagramCanvas');
if (sideDiagramCanvas) {
  sideDiagramCanvas.addEventListener('dblclick', (ev) => {
    try {
      const route = window.TrackDiagramApp?.getRoute();
      if (!route) return;
      const totalYards = Number(route.length_yards) || Number(route.totalYards) || 0;
      if (!Number.isFinite(totalYards) || totalYards <= 0) return;

      const rect = sideDiagramCanvas.getBoundingClientRect();
      const clientY = ev.clientY - rect.top;

      const padding = 20; // must match drawSideDiagram padding
      const topY = padding;
      const bottomY = rect.height - padding;
      const routeHeight = bottomY - topY;
      if (routeHeight <= 0) return;

      // convert canvas client coordinate (y) to ratio along route
      // bottom corresponds to 0 yards, top corresponds to totalYards
      let ratio = (bottomY - clientY) / routeHeight;
      if (!Number.isFinite(ratio)) return;
      ratio = Math.max(0, Math.min(1, ratio));

      const mainYards = ratio * totalYards;
      if (!Number.isFinite(mainYards)) return;

      window.TrackDiagramApp?.centerOnYards?.(mainYards, true);
    } catch (err) {
      console.error('Error handling side diagram dblclick:', err);
    }
  });
}

// Make modals draggable by their header. This keeps the overlay full-screen
// but allows moving the `.modal-content` around. Works with mouse and touch.
function makeModalDraggable(modalEl) {
  if (!modalEl) return;
  const content = modalEl.querySelector('.modal-content');
  const header = modalEl.querySelector('.modal-header');
  if (!content || !header) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let origLeft = 0;
  let origTop = 0;

  function toPx(n) { return `${Math.round(n)}px`; }

  function onPointerDown(e) {
    // ignore right-click
    if (e.button === 2) return;
    isDragging = true;
    const rect = content.getBoundingClientRect();
    // ensure content is absolutely positioned so left/top work
    content.style.position = 'absolute';
    // prevent centering flex from moving it
    modalEl.style.alignItems = 'flex-start';
    modalEl.style.justifyContent = 'flex-start';

    origLeft = rect.left;
    origTop = rect.top;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startY = (e.touches ? e.touches[0].clientY : e.clientY);

    // set initial left/top style
    content.style.left = toPx(origLeft);
    content.style.top = toPx(origTop);

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
    const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
    let dx = clientX - startX;
    let dy = clientY - startY;

    let nextLeft = origLeft + dx;
    let nextTop = origTop + dy;

    // Constrain to viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = content.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    nextLeft = Math.max(0, Math.min(nextLeft, vw - w));
    nextTop = Math.max(0, Math.min(nextTop, vh - h));

    content.style.left = toPx(nextLeft);
    content.style.top = toPx(nextTop);

    if (e.cancelable) e.preventDefault();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);
  }

  header.addEventListener('mousedown', onPointerDown);
  header.addEventListener('touchstart', onPointerDown, { passive: false });

  // When modal is hidden/shown, if shown centered we should clear inline positioning
  const observer = new MutationObserver(() => {
    if (modalEl.hasAttribute('hidden')) return;
    // If modal is visible and hasn't been moved, leave centering; otherwise keep absolute position
    // No-op; leaving to preserve moved position between opens.
  });
  observer.observe(modalEl, { attributes: true, attributeFilter: ['hidden'] });
}

// Attach to all modals on the page
document.querySelectorAll('.modal').forEach(m => makeModalDraggable(m));

// Helper to normalize ELR for comparison
function normalizeElrForComparison(elr) {
  return elr ? String(elr).toUpperCase().trim() : '';
}

// Find which route contains a given ELR (in sections or altRouteYardageMap)
async function findRouteCodeForElr(elr) {
  if (!elr) return null;
  const normElr = normalizeElrForComparison(elr);
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    
    const routes = await res.json();
    if (!Array.isArray(routes)) return null;
    
    for (const route of routes) {
      // Check main sections
      if (route.sections && Array.isArray(route.sections)) {
        const found = route.sections.some(s => normalizeElrForComparison(s.elr) === normElr);
        if (found) return route.code;
      }
      
      // Check alt route yardage map
      if (route.altRouteYardageMap && Array.isArray(route.altRouteYardageMap)) {
        const found = route.altRouteYardageMap.some(m => normalizeElrForComparison(m.elr) === normElr);
        if (found) return route.code;
      }
    }
  } catch (err) {
    console.error('Error finding route for ELR:', err);
  }
  
  return null;
}

function updateTrackActionButtons() {
  if (!editSelectedTrackBtn) return;
  editSelectedTrackBtn.disabled = !selectedTrack;
}

function toggleEditPanel() {
  if (editPanel) {
    editPanel.classList.toggle('open');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 310);
  }
}

if (hamburgerMenu && sidebar) {
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    sidebar.classList.toggle('open');
  });
}

if (editDiagramBtn) {
  editDiagramBtn.addEventListener('click', () => {
    toggleEditPanel();
    if (hamburgerMenu && sidebar) {
      hamburgerMenu.classList.remove('active');
      sidebar.classList.remove('open');
    }
  });
}

if (closeEditPanelBtn) {
  closeEditPanelBtn.addEventListener('click', toggleEditPanel);
}

async function populateRouteSelector() {
  if (!routeSelector) return;
  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const list = await res.json();
      if (Array.isArray(list) && list.length) {
        routeSelector.innerHTML = '';
        list.forEach(r => {
          const opt = document.createElement('option');
          opt.value = r.code;
          opt.textContent = `${r.code} - ${r.name || 'Unknown'}`;
          routeSelector.appendChild(opt);
        });
        if (window.TrackDiagramApp?.getRoute()?.code) {
          routeSelector.value = window.TrackDiagramApp.getRoute().code;
        }
        return;
      }
    }
  } catch (err) {
    console.error('Error fetching routes:', err);
  }

  // fallback to local data if present
  if (typeof routes !== 'undefined' && Array.isArray(routes)) {
    routeSelector.innerHTML = '';
    routes.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.code;
      opt.textContent = `${r.code} - ${r.name || 'Unknown'}`;
      routeSelector.appendChild(opt);
    });
    if (window.TrackDiagramApp?.getRoute()?.code) {
      routeSelector.value = window.TrackDiagramApp.getRoute().code;
    }
  }
}

if (routeSelector) {
  routeSelector.addEventListener('change', (e) => {
    const code = e.target.value;
    if (code) {
      window.TrackDiagramApp?.loadRoute(code);
    }
  });
}

if (yardsPerPixelInput) {
  yardsPerPixelInput.addEventListener('input', () => {
    const v = parseFloat(yardsPerPixelInput.value);
    if (Number.isFinite(v) && v > 0) {
      window.TrackDiagramApp?.setYardsPerPixel(v, true);
    }
  });
}

if (gridSpacingInput) {
  gridSpacingInput.addEventListener('input', () => {
    const v = parseFloat(gridSpacingInput.value);
    if (Number.isFinite(v) && v > 0) {
      window.TrackDiagramApp?.setGridSpacing(v);
    }
  });
}

if (windowSizeInput) {
  windowSizeInput.addEventListener('input', () => {
    const v = parseFloat(windowSizeInput.value);
    if (Number.isFinite(v) && v > 0) {
      window.TrackDiagramApp?.setWindowSizeMiles(v);
    }
  });
}

if (showArrayOverlays) {
  showArrayOverlays.addEventListener('change', () => {
    window.TrackDiagramApp?.setShowArrayOverlays(showArrayOverlays.checked);
  });
}

if (showUrlOverlays) {
  showUrlOverlays.addEventListener('change', () => {
    window.TrackDiagramApp?.setShowUrlOverlays(showUrlOverlays.checked);
  });
}

function centerFromInputs() {
  const milesVal = parseFloat(mileInput?.value);
  const yardsVal = parseFloat(yardInput?.value);
  const elrVal = elrInput?.value;
  window.TrackDiagramApp?.centerByELR(elrVal, milesVal, yardsVal);
}

if (centerButton) {
  centerButton.addEventListener('click', centerFromInputs);
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

window.addEventListener('diagram:routeLoaded', () => {
  if (window.TrackDiagramApp?.getRoute()?.code && routeSelector) {
    routeSelector.value = window.TrackDiagramApp.getRoute().code;
  }
  const r = window.TrackDiagramApp?.getRoute();
  if (r) {
    selectedTrack = null;
    selectedTrackId = null;
    selectedTrackTid = null;
    updateTrackActionButtons();
    if (editRouteName) editRouteName.value = r.name || '';
    if (editRouteCode) editRouteCode.value = r.code || '';
    if (editRouteLength) {
      const miles = Math.floor((r.length_yards || 0) / 1760);
      const yards = (r.length_yards || 0) % 1760;
      editRouteLength.textContent = `${miles}M ${yards}Y`;
    }
    renderTracksTable(tidFilter?.value ?? '');
    renderStationsTable(stationFilter?.value ?? '');
    if (typeof renderAltYardageTable === 'function') {
      renderAltYardageTable(altElrFilter?.value ?? '');
    }
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  // Check if there's an overlay in the URL that requires auto-loading a route
  try {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const overlayElr = params.get('elr');
    
    console.log('DOMContentLoaded: Checking for URL overlay...');
    console.log('URL params:', {
      elr: params.get('elr'),
      tid: params.get('tid'),
      mileFrom: params.get('mileFrom'),
      yardFrom: params.get('yardFrom'),
      mileTo: params.get('mileTo'),
      yardTo: params.get('yardTo'),
      text: params.get('text')
    });
    
    if (overlayElr) {
      console.log('Found overlay ELR:', overlayElr);
      // Find which route contains this ELR
      const routeCode = await findRouteCodeForElr(overlayElr);
      console.log('Route code for ELR:', routeCode);
      
      if (routeCode) {
        // Populate route selector first
        await populateRouteSelector();
        if (routeSelector) {
          routeSelector.value = routeCode;
        }
        console.log('Loading route:', routeCode);
        // Load the route - this will trigger consumeUrlOverlayFromLocation in script.js
        window.TrackDiagramApp?.loadRoute(routeCode);
        return; // Early return - route loaded
      } else {
        console.warn('Could not find route for ELR:', overlayElr);
      }
    } else {
      console.log('No overlay ELR found in URL');
    }
  } catch (err) {
    console.error('Error auto-loading route from URL overlay:', err);
  }
  
  // No URL overlay or couldn't find route, do normal initialization
  console.log('Normal initialization - populating route selector');
  populateRouteSelector();
});

// Local editing of route name/code (in-memory only)
if (editRouteName) {
  editRouteName.addEventListener('input', () => {
    const r = window.TrackDiagramApp?.getRoute();
    if (r) r.name = editRouteName.value;
  });
}

if (editRouteCode) {
  editRouteCode.addEventListener('input', () => {
    const r = window.TrackDiagramApp?.getRoute();
    if (r) r.code = editRouteCode.value;
  });
}

function yardsToMilesParts(yards) {
  if (!Number.isFinite(yards)) return { miles: '-', yards: '-' };
  return { miles: Math.floor(yards / 1760), yards: Math.round(yards % 1760) };
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

// Given a main-route absolute yards value, determine the ELR and the
// corresponding relative yardage (within that ELR) using sections or
// the altRouteYardageMap. Returns { elr, relativeYards } where
// relativeYards is the yardage to display (or null if unavailable).
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

  // 2) Try altRouteYardageMap: find a segment that covers this main yards
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

  // 3) If not inside any segment, pick the nearest alt segment and extrapolate
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

function renderTracksTable(filterTid = '') {
  if (!tracksTableBody) return;
  const r = window.TrackDiagramApp?.getRoute();
  if (!r?.tracks?.length) {
    tracksTableBody.innerHTML = '<tr><td colspan="11" class="table-empty">No tracks available.</td></tr>';
    selectedTrack = null;
    selectedTrackId = null;
    selectedTrackTid = null;
    updateTrackActionButtons();
    return;
  }
  
  // Filter tracks by TID if filter is provided
  let tracks = r.tracks;
  if (filterTid.trim()) {
    const filterLower = filterTid.trim().toLowerCase();
    tracks = tracks.filter(t => String(t.tid || '').toLowerCase().includes(filterLower));
  }
  
  if (!tracks.length) {
    tracksTableBody.innerHTML = '<tr><td colspan="11" class="table-empty">No tracks match the filter.</td></tr>';
    selectedTrack = null;
    selectedTrackId = null;
    selectedTrackTid = null;
    updateTrackActionButtons();
    return;
  }
  
  // Sort tracks by minimum from value
  const sortedTracks = [...tracks].sort((a, b) => {
    const extentsA = computeTrackExtents(a);
    const extentsB = computeTrackExtents(b);
    if (!extentsA) return 1;
    if (!extentsB) return -1;
    return extentsA.minFrom - extentsB.minFrom;
  });
  
  const rows = sortedTracks.map((track, index) => {
    const elr = getTrackELR(track, r);
    const extents = computeTrackExtents(track);
    
    let fromParts = { miles: '-', yards: '-' };
    let toParts = { miles: '-', yards: '-' };
    
    if (extents && r?.sections?.length) {
      const fromSection = r.sections.find(s => extents.minFrom >= s.from && extents.minFrom < s.to);
      const toSection = r.sections.find(s => extents.maxFrom >= s.from && extents.maxFrom < s.to);
      
      if (fromSection) {
        const relativeYards = extents.minFrom - (fromSection.offset || 0);
        fromParts = yardsToMilesParts(relativeYards);
      }
      
      if (toSection) {
        const relativeYards = extents.maxFrom - (toSection.offset || 0);
        toParts = yardsToMilesParts(relativeYards);
      }
    }
    
    const fromFormatted = (fromParts.miles !== '-' && fromParts.yards !== '-') 
      ? `${String(fromParts.miles).padStart(3, '0')}M ${String(fromParts.yards).padStart(4, '0')}Y`
      : '-';
    const toFormatted = (toParts.miles !== '-' && toParts.yards !== '-')
      ? `${String(toParts.miles).padStart(3, '0')}M ${String(toParts.yards).padStart(4, '0')}Y`
      : '-';
    const yFromVal = track.shape?.[0]?.yFrom;
    const yToVal = track.shape?.[track.shape.length - 1]?.yTo;
    const fromConnType = track.fromConnection?.type ?? '-';
    const toConnType = track.toConnection?.type ?? '-';
    const scFrom = track.fromConnection?.sc_name ?? '-';
    const scTo = track.toConnection?.sc_name ?? '-';
    const tidVal = track.tid ?? '';
    const trackIdVal = track._id ?? '';
    return '<tr data-track-index="' + index + '" data-track-id="' + String(trackIdVal) + '" data-tid="' + String(tidVal) + '" class="track-row">' +
      `<td>${elr}</td>` +
      `<td>${track.tid ?? ''}</td>` +
      `<td>${fromFormatted}</td>` +
      `<td>${toFormatted}</td>` +
      `<td>${yFromVal ?? '-'}</td>` +
      `<td>${yToVal ?? '-'}</td>` +
      `<td>${fromConnType}</td>` +
      `<td>${toConnType}</td>` +
      `<td>${scFrom}</td>` +
      `<td>${scTo}</td>` +
      `<td><button type="button" class="btn-shape-action btn-shape-delete btn-track-delete" data-track-id="${String(trackIdVal)}" title="Delete this track">Delete</button></td>` +
      '</tr>';
  }).join('');
  tracksTableBody.innerHTML = rows;

  // Restore selection if possible
  if (selectedTrackId != null) {
    const idToFind = String(selectedTrackId);
    let found = false;
    tracksTableBody.querySelectorAll('.track-row').forEach(row => {
      if (row.dataset.trackId === idToFind) {
        row.classList.add('selected');
        found = true;
      }
    });
    if (!found) {
      selectedTrack = null;
      selectedTrackId = null;
      selectedTrackTid = null;
    }
  }
  updateTrackActionButtons();
  
  // Add click handlers to select track (double-click to center)
  tracksTableBody.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-track-delete')) {
        return;
      }
      const trackIndex = parseInt(row.dataset.trackIndex);
      const track = sortedTracks[trackIndex];
      
      // Update selection styling
      tracksTableBody.querySelectorAll('.track-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      
      if (track) {
        selectedTrack = track;
        selectedTrackId = track._id ?? null;
        selectedTrackTid = track.tid ?? null;
        updateTrackActionButtons();
      }
    });

    // Double-click to center on track
    row.addEventListener('dblclick', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-track-delete')) {
        return;
      }
      const trackIndex = parseInt(row.dataset.trackIndex);
      const track = sortedTracks[trackIndex];
      
      if (track) {
        const extents = computeTrackExtents(track);
        if (extents) {
          const centerYards = (extents.minFrom + extents.maxFrom) / 2;
          window.TrackDiagramApp?.centerOnYards?.(centerYards, true);
        }
      }
    });
  });

  // Wire up delete buttons (delete by Mongo subdocument _id)
  tracksTableBody.querySelectorAll('.btn-track-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const route = window.TrackDiagramApp?.getRoute();
      if (!route?.code) {
        window.alert('No route loaded.');
        return;
      }
      const trackId = e.currentTarget.dataset.trackId;
      if (!trackId) {
        window.alert('Cannot delete this track (missing id).');
        return;
      }

      const ok = window.confirm('Delete this track?');
      if (!ok) return;

      try {
        const safeCode = encodeURIComponent(String(route.code || '').trim());
        const safeId = encodeURIComponent(String(trackId));
        const url = `${apiUrl}/code/${safeCode}/tracks/by-id/${safeId}`;
        const resp = await fetch(url, { method: 'DELETE' });
        if (!resp.ok) {
          let details = '';
          try {
            const contentType = resp.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const errJson = await resp.json();
              details = errJson?.message ? ` - ${errJson.message}` : ` - ${JSON.stringify(errJson)}`;
            } else {
              const errText = await resp.text();
              details = errText ? ` - ${errText}` : '';
            }
          } catch {
            // ignore parse errors
          }
          throw new Error(`HTTP error! status: ${resp.status}${details}`);
        }

        // Clear selection if we deleted the selected track
        if (selectedTrackId && String(selectedTrackId) === String(trackId)) {
          selectedTrack = null;
          selectedTrackId = null;
          selectedTrackTid = null;
          updateTrackActionButtons();
        }

        // Refresh route + table
        window.TrackDiagramApp?.loadRoute(route.code);
      } catch (err) {
        console.error('Error deleting track:', err);
        window.alert('Error deleting track: ' + (err?.message || String(err)));
      }
    });
  });
}

function renderStationsTable(filterName = '') {
  if (!stationsTableBody) return;
  const r = window.TrackDiagramApp?.getRoute();
  if (!r?.stations?.length) {
    stationsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No stations available.</td></tr>';
    selectedStation = null;
    selectedStationId = null;
    updateStationActionButtons();
    return;
  }

  let stations = r.stations;
  if (filterName.trim()) {
    const filterLower = filterName.trim().toLowerCase();
    stations = stations.filter(s => String(s.name || '').toLowerCase().includes(filterLower));
  }

  if (!stations.length) {
    stationsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No stations match the filter.</td></tr>';
    selectedStation = null;
    selectedStationId = null;
    updateStationActionButtons();
    return;
  }

  // Sort by 'at' location
  const sortedStations = [...stations].sort((a, b) => (a.at || 0) - (b.at || 0));

  const rows = sortedStations.map((station, index) => {
    const stationIdVal = station._id ?? '';
    const platformCount = station.platforms?.length || 0;

    // Determine ELR and relative yards for display (use sections first, then altRouteYardageMap)
    const loc = getElrAndRelativeYardsForMainYards(r, station.at);
    const elrDisplay = loc.elr ?? '-';
    let atFormatted = '-';
    if (Number.isFinite(loc.relativeYards)) {
      const parts = yardsToMilesParts(loc.relativeYards);
      if (parts.miles !== '-' && parts.yards !== '-') {
        atFormatted = `${String(parts.miles).padStart(3, '0')}M ${String(parts.yards).padStart(4, '0')}Y`;
      }
    } else {
      // Fallback: show absolute yards converted to miles/yards
      const parts = yardsToMilesParts(station.at);
      if (parts.miles !== '-' && parts.yards !== '-') {
        atFormatted = `${String(parts.miles).padStart(3, '0')}M ${String(parts.yards).padStart(4, '0')}Y`;
      }
    }

    return '<tr data-station-index="' + index + '" data-station-id="' + String(stationIdVal) + '" class="station-row">' +
      `<td>${elrDisplay}</td>` +
      `<td>${station.name ?? ''}</td>` +
      `<td>${atFormatted}</td>` +
      `<td>${platformCount}</td>` +
      `<td><button type="button" class="btn-shape-action btn-shape-delete btn-station-delete" data-station-id="${String(stationIdVal)}" title="Delete this station">Delete</button></td>` +
      '</tr>';
  }).join('');
  stationsTableBody.innerHTML = rows;

  // Restore selection
  if (selectedStationId != null) {
    const idToFind = String(selectedStationId);
    let found = false;
    stationsTableBody.querySelectorAll('.station-row').forEach(row => {
      if (row.dataset.stationId === idToFind) {
        row.classList.add('selected');
        found = true;
      }
    });
    if (!found) {
      selectedStation = null;
      selectedStationId = null;
    }
  }
  updateStationActionButtons();

  // Click handlers
  stationsTableBody.querySelectorAll('.station-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-station-delete')) {
        return;
      }
      const stationIndex = parseInt(row.dataset.stationIndex);
      const station = sortedStations[stationIndex];

      stationsTableBody.querySelectorAll('.station-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');

      if (station) {
        selectedStation = station;
        selectedStationId = station._id ?? null;
        updateStationActionButtons();
      }
    });
    
    // Double-click to center
    row.addEventListener('dblclick', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-station-delete')) {
        return;
      }
      const stationIndex = parseInt(row.dataset.stationIndex);
      const station = sortedStations[stationIndex];
      
      if (station && Number.isFinite(station.at)) {
        window.TrackDiagramApp?.centerOnYards?.(station.at, true);
      }
    });
  });
  
  // Delete handlers
  stationsTableBody.querySelectorAll('.btn-station-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const route = window.TrackDiagramApp?.getRoute();
      if (!route?.code) return;
      
      const stationId = btn.dataset.stationId;
      if (!stationId) return;

      if (!window.confirm('Are you sure you want to delete this station?')) return;
      
      try {
        const safeCode = encodeURIComponent(String(route.code || '').trim());
        const safeId = encodeURIComponent(String(stationId));
        const url = `${apiUrl}/code/${safeCode}/stations/${safeId}`;
        const resp = await fetch(url, { method: 'DELETE' });
        
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

        if (selectedStationId && String(selectedStationId) === String(stationId)) {
          selectedStation = null;
          selectedStationId = null;
          updateStationActionButtons();
        }

        window.TrackDiagramApp?.loadRoute(route.code);
      } catch (err) {
        console.error('Error deleting station:', err);
        window.alert('Error deleting station: ' + err.message);
      }
    });
  });
}

function updateStationActionButtons() {
  if (!editSelectedStationBtn) return;
  editSelectedStationBtn.disabled = !selectedStation;
}

function getNextTid(route) {
  const tids = (route?.tracks || [])
    .map(t => Number(t?.tid))
    .filter(n => Number.isFinite(n));
  if (!tids.length) return 1;
  return Math.max(...tids) + 1;
}

function showTrackModal(track, isNew = false) {
  if (!trackEditModal) return;
  isAddingNewTrack = isNew;

  if (modalTitle) {
    modalTitle.textContent = isNew ? 'Add New Track' : 'Edit Track';
  }

  // Populate form
  if (formTid) formTid.value = track.tid ?? '';
  if (formFromType) formFromType.value = track.fromConnection?.type ?? '';
  if (formFromSc) formFromSc.value = track.fromConnection?.sc_name ?? '';
  if (formFromTrack) formFromTrack.value = track.fromConnection?.track ?? '';
  if (formFromAt) formFromAt.value = track.fromConnection?.at ?? '';
  if (formFromElr) formFromElr.value = track.fromConnection?.elr ?? '';
  if (formToType) formToType.value = track.toConnection?.type ?? '';
  if (formToSc) formToSc.value = track.toConnection?.sc_name ?? '';
  if (formToTrack) formToTrack.value = track.toConnection?.track ?? '';
  if (formToAt) formToAt.value = track.toConnection?.at ?? '';
  if (formToElr) formToElr.value = track.toConnection?.elr ?? '';
  if (formAltRouteElr) formAltRouteElr.value = track.altRoute?.elr ?? '';
  if (formAltRouteShowRuler) formAltRouteShowRuler.checked = track.altRoute?.showAltRuler === true;

  renderShapeTable();
  trackEditModal.hidden = false;
}

function hideTrackModal() {
  if (trackEditModal) trackEditModal.hidden = true;
  if (trackEditForm) trackEditForm.reset();
}

async function saveTrackFromForm() {
  try {
    if (!selectedTrack) {
      window.alert('No track is selected to save.');
      return;
    }

    const r = window.TrackDiagramApp?.getRoute();
    if (!r) {
      window.alert('No route is loaded. Please select a route first.');
      return;
    }

  // Update track from form
  const newTid = Number(formTid?.value);
  if (!Number.isFinite(newTid)) {
    window.alert('Please enter a valid TID.');
    return;
  }

  selectedTrack.tid = newTid;
  selectedTrackTid = newTid;

  // Validate shape required fields (schema requires from/to for every segment)
  const shape = Array.isArray(selectedTrack.shape) ? selectedTrack.shape : [];
  if (!shape.length) {
    window.alert('Please add at least one shape segment.');
    return;
  }
  for (let i = 0; i < shape.length; i++) {
    const seg = shape[i];
    if (!Number.isFinite(seg?.from) || !Number.isFinite(seg?.to)) {
      window.alert(`Shape segment ${i + 1} must have numeric From and To values.`);
      return;
    }
  }

  // Connections are optional, but if present schema requires a valid type.
  const allowedConnTypes = new Set(['buffer_stop', 'junction', 'fixed', 'buffer', 'other']);

  // From connection
  const fromType = (formFromType?.value || '').trim();
  if (fromType) {
    if (!allowedConnTypes.has(fromType)) {
      window.alert('From Connection Type must be one of: buffer_stop, junction, fixed, buffer, other.');
      return;
    }
    const fromConn = { type: fromType };
    const fromScVal = (formFromSc?.value || '').trim();
    if (fromScVal) fromConn.sc_name = fromScVal;
    const fromTrackVal = (formFromTrack?.value || '').trim();
    if (fromTrackVal) fromConn.track = Number(fromTrackVal);
    const fromAtVal = (formFromAt?.value || '').trim();
    if (fromAtVal) fromConn.at = Number(fromAtVal);
    const fromElrVal = (formFromElr?.value || '').trim();
    if (fromElrVal) fromConn.elr = fromElrVal;
    selectedTrack.fromConnection = fromConn;
  } else {
    delete selectedTrack.fromConnection;
  }

  // To connection
  const toType = (formToType?.value || '').trim();
  if (toType) {
    if (!allowedConnTypes.has(toType)) {
      window.alert('To Connection Type must be one of: buffer_stop, junction, fixed, buffer, other.');
      return;
    }
    const toConn = { type: toType };
    const toScVal = (formToSc?.value || '').trim();
    if (toScVal) toConn.sc_name = toScVal;
    const toTrackVal = (formToTrack?.value || '').trim();
    if (toTrackVal) toConn.track = Number(toTrackVal);
    const toAtVal = (formToAt?.value || '').trim();
    if (toAtVal) toConn.at = Number(toAtVal);
    const toElrVal = (formToElr?.value || '').trim();
    if (toElrVal) toConn.elr = toElrVal;
    selectedTrack.toConnection = toConn;
  } else {
    delete selectedTrack.toConnection;
  }

  // Alt Route
  const altElrVal = formAltRouteElr?.value?.trim();
  if (altElrVal) {
    if (!selectedTrack.altRoute) selectedTrack.altRoute = {};
    selectedTrack.altRoute.elr = altElrVal;
    selectedTrack.altRoute.showAltRuler = formAltRouteShowRuler?.checked === true;
  } else {
    delete selectedTrack.altRoute;
  }

  // Shape array is already updated in-place via renderShapeTable inline editing

    // Persist to API (API will handle adding new or updating existing)
    await saveTrackToApi(r.code, selectedTrack, isAddingNewTrack);
  } catch (err) {
    console.error('Unexpected error while saving track from form:', err);
    window.alert('Unexpected error while saving: ' + (err?.message || String(err)));
  }
}

function addNewTrack() {
  const r = window.TrackDiagramApp?.getRoute();
  if (!r) return;

  const newTrack = {
    tid: null,
    shape: [{ from: 0, to: 0, yFrom: null, yTo: null, electrification: 'overhead' }]
  };
  
  selectedTrack = newTrack;
  selectedTrackTid = null;
  showTrackModal(newTrack, true);
}

function editSelectedTrack() {
  if (!selectedTrack) return;
  showTrackModal(selectedTrack, false);
}

function setActiveEditTab(tabName) {
  if (!tabName) return;
  editTabButtons.forEach(btn => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
  });
  editTabPanels.forEach(panel => {
    const isActive = panel.dataset.tab === tabName;
    panel.classList.toggle('active', isActive);
  });

  // Trigger render for the active tab
  if (tabName === 'tracks') {
      if (typeof renderTracksTable === 'function') renderTracksTable(tidFilter?.value || '');
  } else if (tabName === 'stations') {
      if (typeof renderStationsTable === 'function') renderStationsTable(stationFilter?.value || '');
  } else if (tabName === 'structures') {
      if (typeof renderStructuresTable === 'function') renderStructuresTable(structureFilter?.value || '');
    } else if (tabName === 'altyardage') {
      if (typeof renderAltYardageTable === 'function') renderAltYardageTable(altElrFilter?.value || '');
  }
}

if (tidFilter) {
  tidFilter.addEventListener('input', () => {
    renderTracksTable(tidFilter.value);
  });
}

if (addTrackBtn) {
  addTrackBtn.addEventListener('click', addNewTrack);
}

if (editSelectedTrackBtn) {
  editSelectedTrackBtn.addEventListener('click', editSelectedTrack);
  updateTrackActionButtons();
}

function renderShapeTable() {
  if (!shapeTableModalBody || !selectedTrack) return;
  
  const shape = Array.isArray(selectedTrack.shape) ? selectedTrack.shape : [];
  if (!shape.length) {
    shapeTableModalBody.innerHTML = '<tr class="shape-empty-row"><td colspan="6">No shape segments. Click "+ Add Segment" to create one.</td></tr>';
    return;
  }

  shapeTableModalBody.innerHTML = shape.map((seg, idx) => {
    return `<tr>
      <td>
        <div class="input-with-calc">
          <input type="number" class="shape-input" id="shapeFrom_${idx}" data-idx="${idx}" data-field="from" value="${seg.from ?? ''}" />
          <button type="button" class="btn-calc" data-target="shapeFrom_${idx}" title="Calculate from ELR/Mile/Yard">📍</button>
        </div>
      </td>
      <td>
        <div class="input-with-calc">
          <input type="number" class="shape-input" id="shapeTo_${idx}" data-idx="${idx}" data-field="to" value="${seg.to ?? ''}" />
          <button type="button" class="btn-calc" data-target="shapeTo_${idx}" title="Calculate from ELR/Mile/Yard">📍</button>
        </div>
      </td>
      <td>
        <input type="number" class="shape-input" id="shapeYFrom_${idx}" data-idx="${idx}" data-field="yFrom" value="${seg.yFrom ?? ''}" />
      </td>
      <td>
        <input type="number" class="shape-input" id="shapeYTo_${idx}" data-idx="${idx}" data-field="yTo" value="${seg.yTo ?? ''}" />
      </td>
      <td>
        <select class="shape-input" data-idx="${idx}" data-field="electrification">
            <option value="none" ${seg.electrification === 'none' ? 'selected' : ''}>None</option>
            <option value="overhead" ${(!seg.electrification || seg.electrification === 'overhead') ? 'selected' : ''}>Overhead</option>
            <option value="3rd_4th_rail" ${seg.electrification === '3rd_4th_rail' ? 'selected' : ''}>3rd/4th Rail</option>
            <option value="both" ${seg.electrification === 'both' ? 'selected' : ''}>Both</option>
        </select>
      </td>
      <td class="shape-actions">
        <button type="button" class="btn-shape-action btn-shape-delete" data-idx="${idx}">Delete</button>
      </td>
    </tr>`;
  }).join('');

  // Attach input change handlers
  shapeTableModalBody.querySelectorAll('.shape-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const field = e.target.dataset.field;
      const val = e.target.value.trim();
      if (!selectedTrack.shape[idx]) return;
      
      if (field === 'electrification') {
          selectedTrack.shape[idx][field] = val;
      } else {
          selectedTrack.shape[idx][field] = val === '' ? null : Number(val);
      }
    });
  });

  // Attach delete handlers
  shapeTableModalBody.querySelectorAll('.btn-shape-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      if (selectedTrack.shape && Array.isArray(selectedTrack.shape)) {
        selectedTrack.shape.splice(idx, 1);
        renderShapeTable();
      }
    });
  });

  // Attach calculator button handlers
  shapeTableModalBody.querySelectorAll('.btn-calc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.dataset.target;
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        showYardsCalc(targetInput);
      }
    });
  });
}

function addShapeSegment() {
  if (!selectedTrack) return;
  if (!Array.isArray(selectedTrack.shape)) selectedTrack.shape = [];
  selectedTrack.shape.push({ from: null, to: null, yFrom: null, yTo: null, electrification: 'overhead' });
  renderShapeTable();
}

if (editTabButtons.length) {
  editTabButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveEditTab(btn.dataset.tab));
  });
  setActiveEditTab(editTabButtons[0].dataset.tab);
}

if (addShapeBtn) {
  addShapeBtn.addEventListener('click', addShapeSegment);
}

// Alt Yardage Rendering
function renderAltYardageTable(filterElr = '') {
  if (!altYardageTableBody) return;
  const r = window.TrackDiagramApp?.getRoute();
  const list = Array.isArray(r?.altRouteYardageMap) ? r.altRouteYardageMap : [];

  // Filter by alt ELR
  let filtered = list;
  if (filterElr.trim()) {
    const term = filterElr.trim().toLowerCase();
    filtered = list.filter(item => String(item.elr || '').toLowerCase().includes(term));
  }

  if (!filtered.length) {
    altYardageTableBody.innerHTML = '<tr><td colspan="7" class="table-empty">No mappings found.</td></tr>';
    selectedAltYardage = null;
    selectedAltYardageIndex = null;
    updateAltYardageActionButtons();
    return;
  }

  const rows = filtered.map((item, idx) => {
    return `<tr class="alt-yardage-row" data-index="${idx}">
      <td>${item.elr || '-'}</td>
      <td>${Number.isFinite(item.fromYardageMainRoute) ? item.fromYardageMainRoute : '-'}</td>
      <td>${Number.isFinite(item.toYardageMainRoute) ? item.toYardageMainRoute : '-'}</td>
      <td>${Number.isFinite(item.fromYardageAltRoute) ? item.fromYardageAltRoute : '-'}</td>
      <td>${Number.isFinite(item.toYardageAltRoute) ? item.toYardageAltRoute : '-'}</td>
      <td><button type="button" class="btn-shape-action btn-shape-delete btn-alt-yardage-delete" data-index="${idx}" title="Delete this mapping">Delete</button></td>
    </tr>`;
  }).join('');
  altYardageTableBody.innerHTML = rows;

  // Selection
  altYardageTableBody.querySelectorAll('.alt-yardage-row').forEach((row, visibleIdx) => {
    row.addEventListener('click', () => {
      altYardageTableBody.querySelectorAll('.alt-yardage-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      selectedAltYardage = filtered[visibleIdx];
      selectedAltYardageIndex = r.altRouteYardageMap.indexOf(selectedAltYardage);
      updateAltYardageActionButtons();
    });
  });

  // Delete handlers
  altYardageTableBody.querySelectorAll('.btn-alt-yardage-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const route = window.TrackDiagramApp?.getRoute();
      if (!route) return;
      const idx = Number(e.currentTarget.dataset.index);
      const ok = window.confirm('Delete this alt yardage mapping?');
      if (!ok) return;
      const current = Array.isArray(route.altRouteYardageMap) ? [...route.altRouteYardageMap] : [];
      const filteredCurrent = current.filter((_, i) => i !== idx);
      try {
        await saveAltYardageMapToApi(route._id, filteredCurrent);
        window.TrackDiagramApp?.loadRoute(route.code);
      } catch (err) {
        console.error('Error deleting alt yardage:', err);
        window.alert('Error deleting alt yardage: ' + (err?.message || String(err)));
      }
    });
  });
}

function updateAltYardageActionButtons() {
  if (!editSelectedAltYardageBtn) return;
  editSelectedAltYardageBtn.disabled = !selectedAltYardage;
}

function showAltYardageModal(item, isNew) {
  if (!altYardageEditModal) return;
  isAddingNewAltYardage = isNew;
  selectedAltYardage = item || null;
  if (altYardageModalTitle) altYardageModalTitle.textContent = isNew ? 'Add Alt Yardage' : 'Edit Alt Yardage';
  formAltElr.value = item?.elr || '';
  formFromMain.value = item?.fromYardageMainRoute ?? '';
  formToMain.value = item?.toYardageMainRoute ?? '';
  formFromAlt.value = item?.fromYardageAltRoute ?? '';
  formToAlt.value = item?.toYardageAltRoute ?? '';
  altYardageEditModal.hidden = false;
}

function hideAltYardageModal() {
  if (altYardageEditModal) altYardageEditModal.hidden = true;
  if (altYardageEditForm) altYardageEditForm.reset();
}

async function saveAltYardageFromForm() {
  try {
    const route = window.TrackDiagramApp?.getRoute();
    if (!route) return;
    const obj = {
      elr: formAltElr.value.trim(),
      fromYardageMainRoute: Number(formFromMain.value),
      toYardageMainRoute: Number(formToMain.value),
      fromYardageAltRoute: Number(formFromAlt.value),
      toYardageAltRoute: Number(formToAlt.value)
    };

    if (!obj.elr) { window.alert('Alt ELR is required.'); return; }
    const nums = [obj.fromYardageMainRoute, obj.toYardageMainRoute, obj.fromYardageAltRoute, obj.toYardageAltRoute];
    if (!nums.every(n => Number.isFinite(n))) { window.alert('All yardage fields must be numeric.'); return; }

    const current = Array.isArray(route.altRouteYardageMap) ? [...route.altRouteYardageMap] : [];
    if (isAddingNewAltYardage || selectedAltYardageIndex == null) {
      current.push(obj);
    } else {
      current[selectedAltYardageIndex] = obj;
    }

    await saveAltYardageMapToApi(route._id, current);
    hideAltYardageModal();
    isAddingNewAltYardage = false;
    window.TrackDiagramApp?.loadRoute(route.code);
  } catch (err) {
    console.error('Error saving alt yardage:', err);
    window.alert('Error saving alt yardage: ' + (err?.message || String(err)));
  }
}

async function saveAltYardageMapToApi(routeId, altMapArray) {
  const safeId = encodeURIComponent(String(routeId || ''));
  const url = `${apiUrl}/${safeId}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ altRouteYardageMap: altMapArray })
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`HTTP ${resp.status} - ${txt}`);
  }
  return await resp.json();
}

// Yards Calculator
function showYardsCalc(targetInput) {
  if (!yardsCalcModal) return;
  calcTargetInput = targetInput;
  
  const currentYards = Number(targetInput.value);
  const route = window.TrackDiagramApp?.getRoute();
  const hasAltRoute = selectedTrack?.altRoute?.elr;

  calcSourceMainYards = Number.isFinite(currentYards) ? currentYards : null;
  calcAutofillEnabled = Number.isFinite(currentYards);
  
  // Reset form
  if (calcElr) calcElr.value = '';
  if (calcMiles) calcMiles.value = '';
  if (calcYards) calcYards.value = '';

  // Auto-fill disabled: do not populate ELR from diagram center when opening calculator
  
  // If there's already a yardage value, reverse-calculate
  if (Number.isFinite(currentYards)) {
    if (hasAltRoute) {
      if (calcElr) calcElr.value = selectedTrack.altRoute.elr;
      // If possible, compute the alt-route miles/yards for this location.
      tryFillMilesYardsFromMainYards(currentYards, calcElr?.value, route);
    } else if (route?.sections?.length) {
      // Find the section that contains this yardage (including boundary for last section)
      const section = route.sections.find(s => currentYards >= s.from && currentYards <= s.to);
      if (section) {
        if (calcElr) calcElr.value = section.elr;
        tryFillMilesYardsFromMainYards(currentYards, calcElr?.value, route);
      }
    }
  }
  
  yardsCalcModal.hidden = false;
  if (calcElr) calcElr.focus();
}

function hideYardsCalc() {
  if (yardsCalcModal) yardsCalcModal.hidden = true;
  if (yardsCalcForm) yardsCalcForm.reset();
  calcTargetInput = null;
  calcSourceMainYards = null;
  calcAutofillEnabled = false;
  calcProgrammaticUpdate = false;
}

function normalizeElrForCompare(value) {
  return String(value || '').trim().toUpperCase();
}

// Helper: validate and extract segment fields
function validateAndExtractSegment(seg) {
  const fromAlt = Number(seg?.fromYardageAltRoute);
  const toAlt = Number(seg?.toYardageAltRoute);
  const fromMain = Number(seg?.fromYardageMainRoute);
  const toMain = Number(seg?.toYardageMainRoute);
  
  if (![fromAlt, toAlt, fromMain, toMain].every(Number.isFinite)) return null;
  return { fromAlt, toAlt, fromMain, toMain };
}

// Helper: linear interpolation
function linearInterpolate(value, fromInput, toInput, fromOutput, toOutput) {
  if (!Number.isFinite(value)) return null;
  const denom = toInput - fromInput;
  if (denom === 0) return null;
  const t = (value - fromInput) / denom;
  return fromOutput + t * (toOutput - fromOutput);
}

// Helper: generic segment finder with extrapolation support
function findAltRouteYardageSegmentGeneric(route, elr, value, getRangeFn) {
  const elrNorm = normalizeElrForCompare(elr);
  const list = Array.isArray(route?.altRouteYardageMap) ? route.altRouteYardageMap : [];
  
  let nearestSeg = null;
  let nearestDist = Infinity;

  for (const seg of list) {
    if (normalizeElrForCompare(seg?.elr) !== elrNorm) continue;
    
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

function mapAltYardsToMainYards(seg, altYards) {
  const extracted = validateAndExtractSegment(seg);
  if (!extracted) return null;
  const { fromAlt, toAlt, fromMain, toMain } = extracted;
  
  // Works for both same-direction and reverse-direction mappings.
  return linearInterpolate(altYards, fromAlt, toAlt, fromMain, toMain);
}

function mapMainYardsToAltYards(seg, mainYards) {
  const extracted = validateAndExtractSegment(seg);
  if (!extracted) return null;
  const { fromAlt, toAlt, fromMain, toMain } = extracted;
  
  // Works for both same-direction and reverse-direction mappings.
  return linearInterpolate(mainYards, fromMain, toMain, fromAlt, toAlt);
}

function setCalcMilesYardsFromAbsoluteYards(absYards) {
  if (!calcMiles || !calcYards) return;
  if (!Number.isFinite(absYards)) return;
  const miles = Math.floor(absYards / 1760);
  const remainder = absYards - (miles * 1760);
  const yards = Math.round(remainder);

  calcProgrammaticUpdate = true;
  calcMiles.value = String(miles);
  calcYards.value = String(yards);
  // Trigger chain recalculation (and any other listeners)
  calcYards.dispatchEvent(new Event('input', { bubbles: true }));
  calcProgrammaticUpdate = false;
}

function tryFillMilesYardsFromMainYards(mainYards, elrValue, route) {
  if (!Number.isFinite(mainYards)) return false;
  const elrNorm = normalizeElrForCompare(elrValue);
  if (!elrNorm) return false;

  const r = route || window.TrackDiagramApp?.getRoute();
  if (!r) return false;

  // 1) If ELR is in sections, show miles/yards within that ELR by offset.
  if (Array.isArray(r.sections) && r.sections.length) {
    const section = r.sections.find(s => normalizeElrForCompare(s?.elr) === elrNorm);
    if (section) {
      const offset = Number(section.offset) || 0;
      setCalcMilesYardsFromAbsoluteYards(mainYards - offset);
      return true;
    }
  }

  // 2) Otherwise, use altRouteYardageMap to compute alt yards at this main yardage.
  const seg = findAltRouteYardageSegmentForMain(r, elrNorm, mainYards);
  if (!seg) return false;
  const altYards = mapMainYardsToAltYards(seg, mainYards);
  if (!Number.isFinite(altYards)) return false;
  setCalcMilesYardsFromAbsoluteYards(altYards);
  return true;
}

function calculateAndSetYards() {
  if (!calcTargetInput) return;
  
  const elr = calcElr?.value?.trim();
  const miles = Number(calcMiles?.value);
  const yards = Number(calcYards?.value);
  
  if (!elr || !Number.isFinite(miles) || !Number.isFinite(yards)) {
    window.alert('Please enter valid ELR, Miles, and Yards.');
    return;
  }
  
  const route = window.TrackDiagramApp?.getRoute();
  const inputElr = elr;
  const inputElrNorm = normalizeElrForCompare(inputElr);
  const inputAltYards = (miles * 1760) + yards;

  let totalYards = null;

  // 1) Try normal section-based mapping first.
  if (route?.sections?.length) {
    const section = route.sections.find(s => normalizeElrForCompare(s?.elr) === inputElrNorm);
    if (section) {
      const offset = Number(section.offset) || 0;
      totalYards = inputAltYards + offset;
    }
  }

  // 2) If ELR is not in sections, try altRouteYardageMap.
  if (totalYards == null) {
    const seg = findAltRouteYardageSegment(route, inputElr, inputAltYards);
    if (!seg) {
      window.alert('ELR not found in route sections, and no Alt Yardage mapping exists for that ELR.');
      return;
    }
    const mapped = mapAltYardsToMainYards(seg, inputAltYards);
    if (!Number.isFinite(mapped)) {
      window.alert('Alt Yardage mapping is invalid (cannot compute mapping).');
      return;
    }
    totalYards = mapped;
  }

  totalYards = Math.round(totalYards);
  
  // Set the target input value
  calcTargetInput.value = totalYards;
  
  // Trigger input event to update the track data
  const event = new Event('input', { bubbles: true });
  calcTargetInput.dispatchEvent(event);
  
  hideYardsCalc();
}

// API call to save track to MongoDB
async function saveTrackToApi(routeCode, track, isNew = false) {
  try {
    const safeCode = encodeURIComponent(String(routeCode || '').trim());
    const safeTid = encodeURIComponent(String(track?.tid ?? ''));
    const safeId = encodeURIComponent(String(track?._id ?? ''));
    const url = isNew
      ? `${apiUrl}/code/${safeCode}/tracks`
      : (track?._id
          ? `${apiUrl}/code/${safeCode}/tracks/by-id/${safeId}`
          : `${apiUrl}/code/${safeCode}/tracks/${safeTid}`);
    const response = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(track)
    });

    if (!response.ok) {
      let details = '';
      try {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errJson = await response.json();
          details = errJson?.message ? ` - ${errJson.message}` : ` - ${JSON.stringify(errJson)}`;
        } else {
          const errText = await response.text();
          details = errText ? ` - ${errText}` : '';
        }
      } catch {
        // ignore parse errors
      }
      throw new Error(`HTTP error! status: ${response.status}${details}`);
    }

    const savedTrack = await response.json();
    console.log('Track saved successfully:', savedTrack);

    // Ensure selection stays tied to the saved track's unique id
    if (savedTrack?._id) {
      selectedTrackId = savedTrack._id;
    }

    // Clear filter and re-render to show any changes
    let effectiveFilter = tidFilter?.value ?? '';
    if (effectiveFilter.trim() && !String(selectedTrackTid).toLowerCase().includes(effectiveFilter.trim().toLowerCase())) {
      effectiveFilter = '';
      if (tidFilter) tidFilter.value = '';
    }

    hideTrackModal();
    isAddingNewTrack = false;

    // Reload the route to refresh the diagram + table (table rerenders on diagram:routeLoaded)
    if (tidFilter) tidFilter.value = effectiveFilter;
    window.TrackDiagramApp?.loadRoute(routeCode);

    //window.alert('Track saved to database!');
  } catch (error) {
    console.error('Error saving track:', error);
    window.alert('Error saving track to database: ' + error.message);
  }
}

// Station Functions

function showStationModal(station, isNew) {
  if (!stationEditModal) return;
  isAddingNewStation = isNew;
  selectedStation = station; // Ensure we're editing this object
  
  if (stationModalTitle) stationModalTitle.textContent = isNew ? 'Add New Station' : 'Edit Station';
  
  if (formStationName) formStationName.value = station.name || '';
  if (formStationAt) formStationAt.value = station.at ?? '';
  if (formStationSideDiagramVisible) formStationSideDiagramVisible.checked = station.sideDiagramVisible === true;
  
  renderPlatformsTable();
  stationEditModal.hidden = false;
}

function hideStationModal() {
  if (stationEditModal) stationEditModal.hidden = true;
  if (stationEditForm) stationEditForm.reset();
}

function renderPlatformsTable() {
  if (!platformsTableBody || !selectedStation) return;
  
  const platforms = Array.isArray(selectedStation.platforms) ? selectedStation.platforms : [];
  if (!platforms.length) {
    platformsTableBody.innerHTML = '<tr class="shape-empty-row"><td colspan="7">No platforms. Click "+ Add Platform" to create one.</td></tr>';
    return;
  }

  platformsTableBody.innerHTML = platforms.map((plat, idx) => {
    return `<tr>
      <td><input type="number" class="plat-input" data-idx="${idx}" data-field="track" value="${plat.track ?? ''}" placeholder="TID"></td>
      <td><input type="number" class="plat-input" data-idx="${idx}" data-field="platformNo" value="${plat.platformNo ?? ''}" placeholder="No"></td>
      <td>
        <div class="input-with-calc">
          <input type="number" class="plat-input" id="platFrom_${idx}" data-idx="${idx}" data-field="from" value="${plat.from ?? ''}">
          <button type="button" class="btn-calc" data-target="platFrom_${idx}" title="Calculate">📍</button>
        </div>
      </td>
      <td>
        <div class="input-with-calc">
          <input type="number" class="plat-input" id="platTo_${idx}" data-idx="${idx}" data-field="to" value="${plat.to ?? ''}">
          <button type="button" class="btn-calc" data-target="platTo_${idx}" title="Calculate">📍</button>
        </div>
      </td>
      <td>
        <select class="plat-input" data-idx="${idx}" data-field="position">
          <option value="above" ${plat.position === 'above' ? 'selected' : ''}>Above</option>
          <option value="below" ${plat.position === 'below' ? 'selected' : ''}>Below</option>
        </select>
      </td>
      <td><input type="text" class="plat-input" data-idx="${idx}" data-field="elr" value="${plat.elr ?? ''}" placeholder="ELR"></td>
      <td class="shape-actions">
        <button type="button" class="btn-shape-action btn-shape-delete" data-idx="${idx}">Delete</button>
      </td>
    </tr>`;
  }).join('');

  // Attach input handlers
  platformsTableBody.querySelectorAll('.plat-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const field = e.target.dataset.field;
      let val = e.target.value;
      
      if (field === 'track' || field === 'platformNo' || field === 'from' || field === 'to') {
        val = val === '' ? null : Number(val);
      }
      
      if (selectedStation.platforms[idx]) {
        selectedStation.platforms[idx][field] = val;
      }
    });
  });

  // Attach delete handlers
  platformsTableBody.querySelectorAll('.btn-shape-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      if (selectedStation.platforms) {
        selectedStation.platforms.splice(idx, 1);
        renderPlatformsTable();
      }
    });
  });
  
  // Attach calculator handlers
  platformsTableBody.querySelectorAll('.btn-calc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.dataset.target;
      const targetInput = document.getElementById(targetId);
      if (targetInput) showYardsCalc(targetInput);
    });
  });
}

function addPlatform() {
  if (!selectedStation) return;
  if (!Array.isArray(selectedStation.platforms)) selectedStation.platforms = [];
  selectedStation.platforms.push({ track: null, platformNo: null, from: null, to: null, position: 'above', elr: '' });
  renderPlatformsTable();
}

async function saveStationFromForm() {
  try {
    if (!selectedStation) return;
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;

    // Update station from form
    const name = formStationName?.value?.trim();
    if (!name) {
      window.alert('Station Name is required.');
      return;
    }
    selectedStation.name = name;

    const atVal = Number(formStationAt?.value);
    if (!Number.isFinite(atVal)) {
      window.alert('Station "At" location is required.');
      return;
    }
    selectedStation.at = atVal;

    // Update sideDiagramVisible from checkbox
    if (formStationSideDiagramVisible) {
      selectedStation.sideDiagramVisible = formStationSideDiagramVisible.checked;
    }

    // Validate platforms
    const platforms = selectedStation.platforms || [];
    for (let i = 0; i < platforms.length; i++) {
      const p = platforms[i];
      if (!Number.isFinite(p.track) || !Number.isFinite(p.platformNo) || !Number.isFinite(p.from) || !Number.isFinite(p.to)) {
        window.alert(`Platform ${i + 1} is missing required numeric fields (Track, No, From, To).`);
        return;
      }
    }

    await saveStationToApi(r.code, selectedStation, isAddingNewStation);
  } catch (err) {
    console.error('Error saving station:', err);
    window.alert('Error saving station: ' + err.message);
  }
}

async function saveStationToApi(routeCode, station, isNew) {
  try {
    const safeCode = encodeURIComponent(String(routeCode || '').trim());
    const safeId = encodeURIComponent(String(station._id || ''));
    const url = isNew
      ? `${apiUrl}/code/${safeCode}/stations`
      : `${apiUrl}/code/${safeCode}/stations/${safeId}`;
      
    const response = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(station)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errText}`);
    }

    const savedStation = await response.json();
    console.log('Station saved:', savedStation);
    
    if (savedStation._id) selectedStationId = savedStation._id;
    
    hideStationModal();
    isAddingNewStation = false;
    
    // Reload route
    window.TrackDiagramApp?.loadRoute(routeCode);
  } catch (error) {
    console.error('Error saving station:', error);
    window.alert('Error saving station: ' + error.message);
  }
}

function addNewStation() {
  const r = window.TrackDiagramApp?.getRoute();
  if (!r) return;
  
  const newStation = {
    name: '',
    at: null,
    platforms: []
  };
  
  selectedStation = newStation;
  selectedStationId = null;
  showStationModal(newStation, true);
}

function editSelectedStation() {
  if (!selectedStation) return;
  showStationModal(selectedStation, false);
}

// Structure Functions

function updateStructureActionButtons() {
  if (!editSelectedStructureBtn) return;
  editSelectedStructureBtn.disabled = !selectedStructure;
}

function renderStructuresTable(filterText = '') {
  if (!structuresTableBody) return;
  const route = window.TrackDiagramApp?.getRoute();
  const structures = route?.structures || [];

  // Filter
  const filtered = structures.filter(s => {
    if (!filterText) return true;
    const term = filterText.toLowerCase();
    return (s.name || '').toLowerCase().includes(term) ||
           (s.structureNo || '').toLowerCase().includes(term);
  });

  if (filtered.length === 0) {
    structuresTableBody.innerHTML = '<tr><td colspan="6" class="table-empty">No structures found.</td></tr>';
    return;
  }

  // Sort by minimum from yardage
  const sortedStructures = [...filtered].sort((a, b) => {
    const minFromA = Math.min(...(a.trackLocation || []).map(t => t.from || Infinity));
    const minFromB = Math.min(...(b.trackLocation || []).map(t => t.from || Infinity));
    return minFromA - minFromB;
  });

  structuresTableBody.innerHTML = sortedStructures.map((s, idx) => {
    const isSelected = selectedStructure === s;
    const trackCount = s.trackLocation ? s.trackLocation.length : 0;
    
    // Compute min from and max to across all trackLocation entries
    let minFrom = Infinity;
    let maxTo = -Infinity;
    if (s.trackLocation && s.trackLocation.length > 0) {
      s.trackLocation.forEach(t => {
        const from = Number(t.from);
        const to = Number(t.to);
        if (Number.isFinite(from) && from < minFrom) minFrom = from;
        if (Number.isFinite(to) && to > maxTo) maxTo = to;
      });
    }
    
    let fromFormatted = '-';
    let toFormatted = '-';
    
    if (Number.isFinite(minFrom) && minFrom !== Infinity && route?.sections?.length) {
      const fromSection = route.sections.find(sec => minFrom >= sec.from && minFrom < sec.to);
      if (fromSection) {
        const relativeYards = minFrom - (fromSection.offset || 0);
        const fromParts = yardsToMilesParts(relativeYards);
        if (fromParts.miles !== '-' && fromParts.yards !== '-') {
          fromFormatted = `${String(fromParts.miles).padStart(3, '0')}M ${String(fromParts.yards).padStart(4, '0')}Y`;
        }
      }
    }
    
    if (Number.isFinite(maxTo) && maxTo !== -Infinity && route?.sections?.length) {
      const toSection = route.sections.find(sec => maxTo >= sec.from && maxTo < sec.to);
      if (toSection) {
        const relativeYards = maxTo - (toSection.offset || 0);
        const toParts = yardsToMilesParts(relativeYards);
        if (toParts.miles !== '-' && toParts.yards !== '-') {
          toFormatted = `${String(toParts.miles).padStart(3, '0')}M ${String(toParts.yards).padStart(4, '0')}Y`;
        }
      }
    }
    
    return `<tr class="${isSelected ? 'selected' : ''}" data-idx="${idx}">
      <td>${s.name || '-'}</td>
      <td>${s.type || '-'}</td>
      <td>${s.structureNo || '-'}</td>
      <td>${fromFormatted}</td>
      <td>${toFormatted}</td>
      <td><button type="button" class="btn-shape-action btn-shape-delete btn-structure-delete" data-structure-id="${String(s._id || '')}" title="Delete this structure">Delete</button></td>
    </tr>`;
  }).join('');

  // Row selection and double-click centering
  structuresTableBody.querySelectorAll('tr').forEach((row, i) => {
    row.addEventListener('click', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-structure-delete')) {
        return;
      }
      const idx = parseInt(row.dataset.idx);
      selectedStructure = sortedStructures[idx];
      selectedStructureId = selectedStructure._id;
      renderStructuresTable(filterText);
      updateStructureActionButtons();
    });
    
    // Double-click to center
    row.addEventListener('dblclick', (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('btn-structure-delete')) {
        return;
      }
      const idx = parseInt(row.dataset.idx);
      const structure = sortedStructures[idx];
      
      if (structure && structure.trackLocation && structure.trackLocation.length > 0) {
        let minFrom = Infinity;
        let maxTo = -Infinity;
        structure.trackLocation.forEach(t => {
          const from = Number(t.from);
          const to = Number(t.to);
          if (Number.isFinite(from) && from < minFrom) minFrom = from;
          if (Number.isFinite(to) && to > maxTo) maxTo = to;
        });
        
        if (Number.isFinite(minFrom) && Number.isFinite(maxTo) && minFrom !== Infinity && maxTo !== -Infinity) {
          const centerYards = (minFrom + maxTo) / 2;
          window.TrackDiagramApp?.centerOnYards?.(centerYards, true);
        }
      }
    });
  });

  // Delete button
  structuresTableBody.querySelectorAll('.btn-structure-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const structureId = btn.dataset.structureId;
      const idx = parseInt(btn.closest('tr').dataset.idx);
      const s = sortedStructures[idx];
      if (window.confirm(`Are you sure you want to delete structure "${s.name}"?`)) {
        // TODO: Implement delete API
        // For now, just remove from array and save? No, should use API.
        // Assuming we have a delete endpoint or we update the route.
        // Since we don't have a specific delete structure endpoint in the snippets, 
        // we might need to implement it or just remove from local and save?
        // Let's assume we can't easily delete without an endpoint.
        // For now, let's just alert.
        window.alert('Delete functionality not yet implemented for structures.');
      }
    });
  });
}

function renderStructureTracksTable() {
  if (!structureTracksTableBody || !selectedStructure) return;
  
  const tracks = Array.isArray(selectedStructure.trackLocation) ? selectedStructure.trackLocation : [];
  if (!tracks.length) {
    structureTracksTableBody.innerHTML = '<tr class="shape-empty-row"><td colspan="5">No tracks. Click "+ Add Track" to create one.</td></tr>';
    return;
  }

  structureTracksTableBody.innerHTML = tracks.map((t, idx) => {
    return `<tr>
      <td><input type="text" class="struct-track-input" data-idx="${idx}" data-field="elr" value="${t.elr ?? ''}" placeholder="ELR"></td>
      <td><input type="number" class="struct-track-input" data-idx="${idx}" data-field="tid" value="${t.tid ?? ''}" placeholder="TID"></td>
      <td>
        <div class="input-with-calc">
          <input type="number" class="struct-track-input" id="structFrom_${idx}" data-idx="${idx}" data-field="from" value="${t.from ?? ''}">
          <button type="button" class="btn-calc" data-target="structFrom_${idx}" title="Calculate">📍</button>
        </div>
      </td>
      <td>
        <div class="input-with-calc">
          <input type="number" class="struct-track-input" id="structTo_${idx}" data-idx="${idx}" data-field="to" value="${t.to ?? ''}">
          <button type="button" class="btn-calc" data-target="structTo_${idx}" title="Calculate">📍</button>
        </div>
      </td>
      <td class="shape-actions">
        <button type="button" class="btn-shape-action btn-shape-delete" data-idx="${idx}">Delete</button>
      </td>
    </tr>`;
  }).join('');

  // Attach input handlers
  structureTracksTableBody.querySelectorAll('.struct-track-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const field = e.target.dataset.field;
      let val = e.target.value;
      
      if (field === 'tid' || field === 'from' || field === 'to') {
        val = val === '' ? null : Number(val);
      }
      
      if (selectedStructure.trackLocation[idx]) {
        selectedStructure.trackLocation[idx][field] = val;
      }
    });
  });

  // Attach delete handlers
  structureTracksTableBody.querySelectorAll('.btn-shape-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      if (selectedStructure.trackLocation) {
        selectedStructure.trackLocation.splice(idx, 1);
        renderStructureTracksTable();
      }
    });
  });
  
  // Attach calculator handlers
  structureTracksTableBody.querySelectorAll('.btn-calc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.dataset.target;
      const targetInput = document.getElementById(targetId);
      if (targetInput) showYardsCalc(targetInput);
    });
  });
}

function addStructureTrack() {
  if (!selectedStructure) return;
  if (!Array.isArray(selectedStructure.trackLocation)) selectedStructure.trackLocation = [];
  selectedStructure.trackLocation.push({ tid: null, from: null, to: null, elr: '' });
  renderStructureTracksTable();
}

function showStructureModal(structure, isNew) {
  if (!structureEditModal) return;
  isAddingNewStructure = isNew;
  selectedStructure = structure;
  
  if (structureModalTitle) structureModalTitle.textContent = isNew ? 'Add New Structure' : 'Edit Structure';
  
  if (formStructureName) formStructureName.value = structure.name || '';
  if (formStructureType) formStructureType.value = structure.type || 'tunnel';
  if (formStructureNo) formStructureNo.value = structure.structureNo || '';
  
  renderStructureTracksTable();
  structureEditModal.hidden = false;
}

function hideStructureModal() {
  if (structureEditModal) structureEditModal.hidden = true;
  if (structureEditForm) structureEditForm.reset();
}

async function saveStructureFromForm() {
  try {
    if (!selectedStructure) return;
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;

    // Update structure from form
    const name = formStructureName?.value?.trim();
    if (!name) {
      window.alert('Structure Name is required.');
      return;
    }
    selectedStructure.name = name;
    
    selectedStructure.type = formStructureType?.value || 'tunnel';
    selectedStructure.structureNo = formStructureNo?.value?.trim() || '';

    // Validate tracks
    const tracks = selectedStructure.trackLocation || [];
    for (let i = 0; i < tracks.length; i++) {
      const t = tracks[i];
      if (!Number.isFinite(t.tid) || !Number.isFinite(t.from) || !Number.isFinite(t.to)) {
        window.alert(`Track ${i + 1} is missing required numeric fields (TID, From, To).`);
        return;
      }
    }

    await saveStructureToApi(r.code, selectedStructure, isAddingNewStructure);
  } catch (err) {
    console.error('Error saving structure:', err);
    window.alert('Error saving structure: ' + err.message);
  }
}

async function saveStructureToApi(routeCode, structure, isNew) {
  try {
    const safeCode = encodeURIComponent(String(routeCode || '').trim());
    const safeId = encodeURIComponent(String(structure._id || ''));
    const url = isNew
      ? `${apiUrl}/code/${safeCode}/structures`
      : `${apiUrl}/code/${safeCode}/structures/${safeId}`;
      
    const response = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(structure)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errText}`);
    }

    const savedStructure = await response.json();
    console.log('Structure saved:', savedStructure);
    
    if (savedStructure._id) selectedStructureId = savedStructure._id;
    
    hideStructureModal();
    isAddingNewStructure = false;
    
    // Reload route
    window.TrackDiagramApp?.loadRoute(routeCode);
  } catch (error) {
    console.error('Error saving structure:', error);
    window.alert('Error saving structure: ' + error.message);
  }
}

function addNewStructure() {
  const r = window.TrackDiagramApp?.getRoute();
  if (!r) return;
  
  const newStructure = {
    name: '',
    type: 'tunnel',
    structureNo: '',
    trackLocation: []
  };
  
  selectedStructure = newStructure;
  selectedStructureId = null;
  showStructureModal(newStructure, true);
}

function editSelectedStructure() {
  if (!selectedStructure) return;
  showStructureModal(selectedStructure, false);
}

// Wire up calculator modal handlers
if (calcModalCloseBtn) {
  calcModalCloseBtn.addEventListener('click', hideYardsCalc);
}

if (calcCancelBtn) {
  calcCancelBtn.addEventListener('click', hideYardsCalc);
}

if (yardsCalcForm) {
  yardsCalcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateAndSetYards();
  });
}

// When the calculator is opened from an existing yardage value, allow switching ELR
// to see the equivalent miles/yards (including altRoute mappings). Once the user
// starts typing miles/yards, stop auto-filling.
if (calcElr) {
  calcElr.addEventListener('input', () => {
    if (!calcAutofillEnabled) return;
    if (!Number.isFinite(calcSourceMainYards)) return;
    tryFillMilesYardsFromMainYards(calcSourceMainYards, calcElr.value, window.TrackDiagramApp?.getRoute());
  });
}

if (calcMiles) {
  calcMiles.addEventListener('input', () => {
    if (calcProgrammaticUpdate) return;
    calcAutofillEnabled = false;
  });
}

if (calcYards) {
  calcYards.addEventListener('input', () => {
    if (calcProgrammaticUpdate) return;
    calcAutofillEnabled = false;
  });
}

if (yardsCalcModal) {
  yardsCalcModal.addEventListener('click', (e) => {
    if (e.target === yardsCalcModal || e.target.classList.contains('modal-overlay')) {
      hideYardsCalc();
    }
  });
}

// Wire up calculator buttons on main form (fromAt, toAt)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-calc') && !e.target.closest('#shapeTableModalBody')) {
    const targetId = e.target.dataset.target;
    const targetInput = document.getElementById(targetId);
    if (targetInput) {
      showYardsCalc(targetInput);
    }
  }
});

// Modal handlers
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', hideTrackModal);
}

if (modalCancelBtn) {
  modalCancelBtn.addEventListener('click', hideTrackModal);
}

if (trackEditForm) {
  trackEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSavingTrack) return;
    isSavingTrack = true;
    if (modalSaveBtn) modalSaveBtn.disabled = true;
    try {
      await saveTrackFromForm();
    } finally {
      isSavingTrack = false;
      if (modalSaveBtn) modalSaveBtn.disabled = false;
    }
  });
}

// Close modal on overlay click
if (trackEditModal) {
  trackEditModal.addEventListener('click', (e) => {
    if (e.target === trackEditModal || e.target.classList.contains('modal-overlay')) {
      hideTrackModal();
    }
  });
}

// Station Event Listeners

if (stationFilter) {
  stationFilter.addEventListener('input', () => {
    renderStationsTable(stationFilter.value);
  });
}

if (addStationBtn) {
  addStationBtn.addEventListener('click', addNewStation);
}

if (editSelectedStationBtn) {
  editSelectedStationBtn.addEventListener('click', editSelectedStation);
  updateStationActionButtons();
}

if (stationModalCloseBtn) {
  stationModalCloseBtn.addEventListener('click', hideStationModal);
}

if (stationModalCancelBtn) {
  stationModalCancelBtn.addEventListener('click', hideStationModal);
}

if (stationEditForm) {
  stationEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSavingStation) return;
    isSavingStation = true;
    if (stationModalSaveBtn) stationModalSaveBtn.disabled = true;
    try {
      await saveStationFromForm();
    } finally {
      isSavingStation = false;
      if (stationModalSaveBtn) stationModalSaveBtn.disabled = false;
    }
  });
}

if (stationEditModal) {
  stationEditModal.addEventListener('click', (e) => {
    if (e.target === stationEditModal || e.target.classList.contains('modal-overlay')) {
      hideStationModal();
    }
  });
}

if (addPlatformBtn) {
  addPlatformBtn.addEventListener('click', addPlatform);
}

// Structure Event Listeners

if (structureFilter) {
  structureFilter.addEventListener('input', () => {
    renderStructuresTable(structureFilter.value);
  });
}

if (addStructureBtn) {
  addStructureBtn.addEventListener('click', addNewStructure);
}

if (editSelectedStructureBtn) {
  editSelectedStructureBtn.addEventListener('click', editSelectedStructure);
  updateStructureActionButtons();
}

if (structureModalCloseBtn) {
  structureModalCloseBtn.addEventListener('click', hideStructureModal);
}

if (structureModalCancelBtn) {
  structureModalCancelBtn.addEventListener('click', hideStructureModal);
}

if (structureEditForm) {
  structureEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSavingStructure) return;
    isSavingStructure = true;
    if (structureModalSaveBtn) structureModalSaveBtn.disabled = true;
    try {
      await saveStructureFromForm();
    } finally {
      isSavingStructure = false;
      if (structureModalSaveBtn) structureModalSaveBtn.disabled = false;
    }
  });
}

if (structureEditModal) {
  structureEditModal.addEventListener('click', (e) => {
    if (e.target === structureEditModal || e.target.classList.contains('modal-overlay')) {
      hideStructureModal();
    }
  });
}

if (addStructureTrackBtn) {
  addStructureTrackBtn.addEventListener('click', addStructureTrack);
}

// Alt Yardage Event Listeners
if (altElrFilter) {
  altElrFilter.addEventListener('input', () => {
    renderAltYardageTable(altElrFilter.value);
  });
}

if (addAltYardageBtn) {
  addAltYardageBtn.addEventListener('click', () => {
    selectedAltYardageIndex = null;
    showAltYardageModal({}, true);
  });
}

if (editSelectedAltYardageBtn) {
  editSelectedAltYardageBtn.addEventListener('click', () => {
    if (selectedAltYardage) showAltYardageModal(selectedAltYardage, false);
  });
  updateAltYardageActionButtons();
}

if (altYardageModalCloseBtn) {
  altYardageModalCloseBtn.addEventListener('click', hideAltYardageModal);
}

if (altYardageModalCancelBtn) {
  altYardageModalCancelBtn.addEventListener('click', hideAltYardageModal);
}

if (altYardageEditForm) {
  altYardageEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSavingAltYardage) return;
    isSavingAltYardage = true;
    if (altYardageModalSaveBtn) altYardageModalSaveBtn.disabled = true;
    try {
      await saveAltYardageFromForm();
    } finally {
      isSavingAltYardage = false;
      if (altYardageModalSaveBtn) altYardageModalSaveBtn.disabled = false;
    }
  });
}

if (altYardageEditModal) {
  altYardageEditModal.addEventListener('click', (e) => {
    if (e.target === altYardageEditModal || e.target.classList.contains('modal-overlay')) {
      hideAltYardageModal();
    }
  });
}

// Yards/Chains Conversion Event Listeners
if (calcYards && calcChains) {
  // When yards changes, update chains
  calcYards.addEventListener('input', () => {
    const yardsValue = parseFloat(calcYards.value);
    if (!isNaN(yardsValue)) {
      calcChains.value = (yardsValue / 22).toFixed(2);
    } else {
      calcChains.value = '';
    }
  });

  // When chains changes, update yards
  calcChains.addEventListener('input', () => {
    const chainsValue = parseFloat(calcChains.value);
    if (!isNaN(chainsValue)) {
      calcYards.value = Math.round(chainsValue * 22);
    } else {
      calcYards.value = '';
    }
  });
}
