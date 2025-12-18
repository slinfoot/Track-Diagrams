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
const addTrackBtn = document.getElementById('addTrackBtn');
const editSelectedTrackBtn = document.getElementById('editSelectedTrackBtn');
const editTabButtons = Array.from(document.querySelectorAll('.edit-tab-button'));
const editTabPanels = Array.from(document.querySelectorAll('.edit-tab-content'));

// Modal elements
const trackEditModal = document.getElementById('trackEditModal');
const modalTitle = document.getElementById('modalTitle');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const trackEditForm = document.getElementById('trackEditForm');
const formTid = document.getElementById('formTid');
const formFromType = document.getElementById('formFromType');
const formFromSc = document.getElementById('formFromSc');
const formFromTrack = document.getElementById('formFromTrack');
const formFromAt = document.getElementById('formFromAt');
const formToType = document.getElementById('formToType');
const formToSc = document.getElementById('formToSc');
const formToTrack = document.getElementById('formToTrack');
const formToAt = document.getElementById('formToAt');
const formAltRouteElr = document.getElementById('formAltRouteElr');
const shapeTableModalBody = document.getElementById('shapeTableModalBody');
const addShapeBtn = document.getElementById('addShapeBtn');

// Yards calculator modal
const yardsCalcModal = document.getElementById('yardsCalcModal');
const calcModalCloseBtn = document.getElementById('calcModalCloseBtn');
const calcCancelBtn = document.getElementById('calcCancelBtn');
const yardsCalcForm = document.getElementById('yardsCalcForm');
const calcElr = document.getElementById('calcElr');
const calcMiles = document.getElementById('calcMiles');
const calcYards = document.getElementById('calcYards');

let selectedTrack = null;
let selectedTrackTid = null;
let isAddingNewTrack = false;
let editingShapeIndex = null;
let calcTargetInput = null;

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
    selectedTrackTid = null;
    updateTrackActionButtons();
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
    selectedTrack = null;
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
    tracksTableBody.innerHTML = '<tr><td colspan="10" class="table-empty">No tracks match the filter.</td></tr>';
    selectedTrack = null;
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
    return '<tr data-track-index="' + index + '" data-tid="' + String(tidVal) + '" class="track-row">' +
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

  // Restore selection if possible
  if (selectedTrackTid != null) {
    const tidToFind = String(selectedTrackTid);
    let found = false;
    tracksTableBody.querySelectorAll('.track-row').forEach(row => {
      if (row.dataset.tid === tidToFind) {
        row.classList.add('selected');
        found = true;
      }
    });
    if (!found) {
      selectedTrack = null;
      selectedTrackTid = null;
    }
  }
  updateTrackActionButtons();
  
  // Add click handlers to center on track and show details
  tracksTableBody.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', () => {
      const trackIndex = parseInt(row.dataset.trackIndex);
      const track = sortedTracks[trackIndex];
      
      // Update selection styling
      tracksTableBody.querySelectorAll('.track-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
      
      if (track) {
        selectedTrack = track;
        selectedTrackTid = track.tid ?? null;
        updateTrackActionButtons();

        // Center diagram on track
        const extents = computeTrackExtents(track);
        if (extents) {
          const centerYards = (extents.minFrom + extents.maxFrom) / 2;
          window.TrackDiagramApp?.centerOnYards?.(centerYards, true);
        }
      }
    });
  });
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
  if (formToType) formToType.value = track.toConnection?.type ?? '';
  if (formToSc) formToSc.value = track.toConnection?.sc_name ?? '';
  if (formToTrack) formToTrack.value = track.toConnection?.track ?? '';
  if (formToAt) formToAt.value = track.toConnection?.at ?? '';
  if (formAltRouteElr) formAltRouteElr.value = track.altRoute?.elr ?? '';

  renderShapeTable();
  trackEditModal.hidden = false;
}

function hideTrackModal() {
  if (trackEditModal) trackEditModal.hidden = true;
  if (trackEditForm) trackEditForm.reset();
}

function saveTrackFromForm() {
  if (!selectedTrack) return;

  const r = window.TrackDiagramApp?.getRoute();
  if (!r) return;

  // Update track from form
  const newTid = Number(formTid?.value);
  if (Number.isFinite(newTid)) {
    selectedTrack.tid = newTid;
    selectedTrackTid = newTid;
  }

  // From connection
  if (!selectedTrack.fromConnection) selectedTrack.fromConnection = {};
  selectedTrack.fromConnection.type = formFromType?.value || undefined;
  selectedTrack.fromConnection.sc_name = formFromSc?.value || undefined;
  const fromTrackVal = formFromTrack?.value;
  selectedTrack.fromConnection.track = fromTrackVal ? Number(fromTrackVal) : undefined;
  const fromAtVal = formFromAt?.value;
  selectedTrack.fromConnection.at = fromAtVal ? Number(fromAtVal) : undefined;

  // To connection
  if (!selectedTrack.toConnection) selectedTrack.toConnection = {};
  selectedTrack.toConnection.type = formToType?.value || undefined;
  selectedTrack.toConnection.sc_name = formToSc?.value || undefined;
  const toTrackVal = formToTrack?.value;
  selectedTrack.toConnection.track = toTrackVal ? Number(toTrackVal) : undefined;
  const toAtVal = formToAt?.value;
  selectedTrack.toConnection.at = toAtVal ? Number(toAtVal) : undefined;

  // Alt Route
  const altElrVal = formAltRouteElr?.value?.trim();
  if (altElrVal) {
    if (!selectedTrack.altRoute) selectedTrack.altRoute = {};
    selectedTrack.altRoute.elr = altElrVal;
  } else {
    delete selectedTrack.altRoute;
  }

  // Shape array is already updated in-place via renderShapeTable inline editing

  // If adding new, push to route
  if (isAddingNewTrack) {
    if (!Array.isArray(r.tracks)) r.tracks = [];
    r.tracks.push(selectedTrack);
  }

  // Clear filter if needed
  let effectiveFilter = tidFilter?.value ?? '';
  if (effectiveFilter.trim() && !String(selectedTrackTid).toLowerCase().includes(effectiveFilter.trim().toLowerCase())) {
    effectiveFilter = '';
    if (tidFilter) tidFilter.value = '';
  }

  hideTrackModal();
  renderTracksTable(effectiveFilter);
}

function addNewTrack() {
  const r = window.TrackDiagramApp?.getRoute();
  if (!r) return;

  const newTid = getNextTid(r);
  const newTrack = {
    tid: newTid,
    shape: [{ from: 0, to: 0, yFrom: null, yTo: null }]
  };
  
  selectedTrack = newTrack;
  selectedTrackTid = newTid;
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
    shapeTableModalBody.innerHTML = '<tr class="shape-empty-row"><td colspan="5">No shape segments. Click "+ Add Segment" to create one.</td></tr>';
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
      selectedTrack.shape[idx][field] = val === '' ? null : Number(val);
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
  selectedTrack.shape.push({ from: null, to: null, yFrom: null, yTo: null });
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

// Yards Calculator
function showYardsCalc(targetInput) {
  if (!yardsCalcModal) return;
  calcTargetInput = targetInput;
  
  const currentYards = Number(targetInput.value);
  const route = window.TrackDiagramApp?.getRoute();
  const hasAltRoute = selectedTrack?.altRoute?.elr;
  
  // Reset form
  if (calcElr) calcElr.value = '';
  if (calcMiles) calcMiles.value = '';
  if (calcYards) calcYards.value = '';
  
  // If there's already a yardage value, reverse-calculate
  if (Number.isFinite(currentYards) && currentYards !== 0) {
    if (hasAltRoute) {
      // Use altRoute ELR, but don't calculate miles/yards
      if (calcElr) calcElr.value = selectedTrack.altRoute.elr;
    } else if (route?.sections?.length) {
      // Find the section that contains this yardage (including boundary for last section)
      const section = route.sections.find(s => currentYards >= s.from && currentYards <= s.to);
      if (section) {
        // Set ELR from section
        if (calcElr) calcElr.value = section.elr;
        
        // Calculate miles and yards relative to section offset
        const relativeYards = currentYards - (section.offset || 0);
        const miles = Math.floor(relativeYards / 1760);
        const yards = relativeYards % 1760;
        
        if (calcMiles) calcMiles.value = miles;
        if (calcYards) calcYards.value = Math.round(yards);
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
  let offset = 0;
  
  // Find section with matching ELR to get offset
  if (route?.sections?.length) {
    const section = route.sections.find(s => s.elr === elr);
    if (section) {
      offset = section.offset || 0;
    }
  }
  
  // Calculate total yards: (miles * 1760) + yards + offset
  const totalYards = (miles * 1760) + yards + offset;
  
  // Set the target input value
  calcTargetInput.value = totalYards;
  
  // Trigger input event to update the track data
  const event = new Event('input', { bubbles: true });
  calcTargetInput.dispatchEvent(event);
  
  hideYardsCalc();
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
  trackEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveTrackFromForm();
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
