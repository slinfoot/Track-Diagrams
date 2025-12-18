// UI wiring for Track Diagrams
const apiUrl = 'http://localhost:3000/api/routes';

// Elements
const routeSelector = document.getElementById('routeSelector');
const yardsPerPixelInput = document.getElementById('yardsPerPixelInput');
const gridSpacingInput = document.getElementById('gridSpacingInput');
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
const editTabButtons = Array.from(document.querySelectorAll('.edit-tab-button'));

let selectedTrack = null;

const detailTid = document.getElementById('detailTid');
const detailFromType = document.getElementById('detailFromType');
const detailFromSc = document.getElementById('detailFromSc');
const detailFromTrack = document.getElementById('detailFromTrack');
const detailFromAt = document.getElementById('detailFromAt');
const detailToType = document.getElementById('detailToType');
const detailToSc = document.getElementById('detailToSc');
const detailToTrack = document.getElementById('detailToTrack');
const detailToAt = document.getElementById('detailToAt');
const editTabPanels = Array.from(document.querySelectorAll('.edit-tab-content'));

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
    if (editRouteName) editRouteName.value = r.name || '';
    if (editRouteCode) editRouteCode.value = r.code || '';
    if (editRouteLength) {
      const miles = Math.floor((r.length_yards || 0) / 1760);
      const yards = (r.length_yards || 0) % 1760;
      editRouteLength.textContent = `${miles}M ${yards}Y`;
    }
    renderTracksTable();
  }
});

window.addEventListener('DOMContentLoaded', () => {
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

function renderTracksTable(filterTid = '') {
  if (!tracksTableBody) return;
  const r = window.TrackDiagramApp?.getRoute();
  if (!r?.tracks?.length) {
    tracksTableBody.innerHTML = '<tr><td colspan="10" class="table-empty">No tracks available.</td></tr>';
    return;
  }
  
  // Filter tracks by TID if filter is provided
  let tracks = r.tracks;
  if (filterTid.trim()) {
    const filterLower = filterTid.trim().toLowerCase();
    tracks = tracks.filter(t => String(t.tid || '').toLowerCase().includes(filterLower));
  }
  
  if (!tracks.length) {
    tracksTableBody.innerHTML = '<tr><td colspan="10" class="table-empty">No tracks match the filter.</td></tr>';
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
    return '<tr data-track-index="' + index + '" class="track-row">' +
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
      '</tr>';
  }).join('');
  tracksTableBody.innerHTML = rows;
  
  // Add click handlers to center on track and show details
  tracksTableBody.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', () => {
      const trackIndex = parseInt(row.dataset.trackIndex);
      const track = sortedTracks[trackIndex];
      
      // Update selection styling
      tracksTableBody.querySelectorAll('.track-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      
      if (track) {
        // Center diagram on track
        const extents = computeTrackExtents(track);
        if (extents) {
          const centerYards = (extents.minFrom + extents.maxFrom) / 2;
          window.TrackDiagramApp?.centerOnYards?.(centerYards, true);
        }
        
        // Populate detail form
        selectedTrack = track;
        populateTrackDetails(track, r);
      }
    });
  });
}

function populateTrackDetails(track, route) {
  const detailEmpty = document.querySelector('.detail-empty');
  const detailContent = document.querySelector('.detail-content');
  
  if (detailEmpty) detailEmpty.style.display = 'none';

  if (detailContent) detailContent.hidden = false;

  if (detailTid) detailTid.value = track.tid ?? '';

  // fromConnection controls
  const fc = track.fromConnection || {};
  if (detailFromType) detailFromType.value = fc.type ?? '';
  if (detailFromSc) detailFromSc.value = fc.sc_name ?? '';
  if (detailFromTrack) detailFromTrack.value = (fc.track ?? '') === null ? '' : (fc.track ?? '');
  if (detailFromAt) detailFromAt.value = (fc.at ?? '') === null ? '' : (fc.at ?? '');

  // toConnection controls
  const tc = track.toConnection || {};
  if (detailToType) detailToType.value = tc.type ?? '';
  if (detailToSc) detailToSc.value = tc.sc_name ?? '';
  if (detailToTrack) detailToTrack.value = (tc.track ?? '') === null ? '' : (tc.track ?? '');
  if (detailToAt) detailToAt.value = (tc.at ?? '') === null ? '' : (tc.at ?? '');
}

function ensureFromConnection(track) {
  if (!track.fromConnection || typeof track.fromConnection !== 'object') {
    track.fromConnection = {};
  }
  return track.fromConnection;
}

function ensureToConnection(track) {
  if (!track.toConnection || typeof track.toConnection !== 'object') {
    track.toConnection = {};
  }
  return track.toConnection;
}

// In-memory editing (no persistence yet)
if (detailFromType) {
  detailFromType.addEventListener('input', () => {
    if (!selectedTrack) return;
    ensureFromConnection(selectedTrack).type = detailFromType.value;
  });
}

if (detailFromSc) {
  detailFromSc.addEventListener('input', () => {
    if (!selectedTrack) return;
    ensureFromConnection(selectedTrack).sc_name = detailFromSc.value;
  });
}

if (detailFromTrack) {
  detailFromTrack.addEventListener('input', () => {
    if (!selectedTrack) return;
    const v = detailFromTrack.value;
    ensureFromConnection(selectedTrack).track = v === '' ? null : Number(v);
  });
}

if (detailFromAt) {
  detailFromAt.addEventListener('input', () => {
    if (!selectedTrack) return;
    const v = detailFromAt.value;
    ensureFromConnection(selectedTrack).at = v === '' ? null : Number(v);
  });
}

if (detailToType) {
  detailToType.addEventListener('input', () => {
    if (!selectedTrack) return;
    ensureToConnection(selectedTrack).type = detailToType.value;
  });
}

if (detailToSc) {
  detailToSc.addEventListener('input', () => {
    if (!selectedTrack) return;
    ensureToConnection(selectedTrack).sc_name = detailToSc.value;
  });
}

if (detailToTrack) {
  detailToTrack.addEventListener('input', () => {
    if (!selectedTrack) return;
    const v = detailToTrack.value;
    ensureToConnection(selectedTrack).track = v === '' ? null : Number(v);
  });
}

if (detailToAt) {
  detailToAt.addEventListener('input', () => {
    if (!selectedTrack) return;
    const v = detailToAt.value;
    ensureToConnection(selectedTrack).at = v === '' ? null : Number(v);
  });
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
}

if (tidFilter) {
  tidFilter.addEventListener('input', () => {
    renderTracksTable(tidFilter.value);
  });
}

if (editTabButtons.length) {
  editTabButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveEditTab(btn.dataset.tab));
  });
  setActiveEditTab(editTabButtons[0].dataset.tab);
}
