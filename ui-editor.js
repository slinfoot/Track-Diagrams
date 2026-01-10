
// UI Editor Module
// Handles the Editor Panel, Tables, and CRUD Modals
const UIEditor = (function() {
  const apiUrl = (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : 'http://localhost:3000/api/routes');

  // DOM Elements
  const editRouteName = document.getElementById('editRouteName');
  const editRouteCode = document.getElementById('editRouteCode');
  const editRouteLength = document.getElementById('editRouteLength');
  const tracksTableBody = document.getElementById('tracksTableBody');
  const tidFilter = document.getElementById('tidFilter');
  const addTrackBtn = document.getElementById('addTrackBtn');
  const editSelectedTrackBtn = document.getElementById('editSelectedTrackBtn');
  const editTabButtons = Array.from(document.querySelectorAll('.edit-tab-button'));
  const editTabPanels = Array.from(document.querySelectorAll('.edit-tab-content'));

  // Section Elements
  const sectionsTableBody = document.getElementById('sectionsTableBody');
  const sectionFilter = document.getElementById('sectionFilter');
  const addSectionBtn = document.getElementById('addSectionBtn');
  const editSelectedSectionBtn = document.getElementById('editSelectedSectionBtn');
  const sectionEditModal = document.getElementById('sectionEditModal');
  const sectionEditForm = document.getElementById('sectionEditForm');
  // ... (Section form inputs would be selected inside handlers or passed)

  // Track Modal Elements
  const trackEditModal = document.getElementById('trackEditModal');
  const modalTitle = document.getElementById('modalTitle');
  const trackEditForm = document.getElementById('trackEditForm');
  const formTid = document.getElementById('formTid');

  // Connection Inputs
  const formFromType = document.getElementById('formFromType');
  const formFromSc = document.getElementById('formFromSc');
  const formFromTrack = document.getElementById('formFromTrack');
  const formFromAt = document.getElementById('formFromAt');
  const formFromElr = document.getElementById('formFromElr');
  const formFromLinkDescription = document.getElementById('formFromLinkDescription');
  const formToType = document.getElementById('formToType');
  const formToSc = document.getElementById('formToSc');
  const formToTrack = document.getElementById('formToTrack');
  const formToAt = document.getElementById('formToAt');
  const formToElr = document.getElementById('formToElr');
  const formToLinkDescription = document.getElementById('formToLinkDescription');
  const formAltRouteElr = document.getElementById('formAltRouteElr');
  const formAltRouteShowRuler = document.getElementById('formAltRouteShowRuler');
  const shapeTableModalBody = document.getElementById('shapeTableModalBody');
  const addShapeBtn = document.getElementById('addShapeBtn');
  const modalSaveBtn = document.getElementById('modalSaveBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  
  // Alt Yardage Elements
  const altYardageTableBody = document.getElementById('altYardageTableBody');
  const altElrFilter = document.getElementById('altElrFilter');
  const addAltYardageBtn = document.getElementById('addAltYardageBtn');
  const editSelectedAltYardageBtn = document.getElementById('editSelectedAltYardageBtn');
  const altYardageEditModal = document.getElementById('altYardageEditModal');
  const altYardageEditForm = document.getElementById('altYardageEditForm');
  const formAltElr = document.getElementById('formAltElr');
  const formFromMain = document.getElementById('formFromMain');
  const formToMain = document.getElementById('formToMain');
  const formFromAlt = document.getElementById('formFromAlt');
  const formToAlt = document.getElementById('formToAlt');
  const altYardageModalSaveBtn = document.getElementById('altYardageModalSaveBtn');
  const altYardageModalCancelBtn = document.getElementById('altYardageModalCancelBtn');
  const altYardageModalCloseBtn = document.getElementById('altYardageModalCloseBtn');
  const altYardageModalTitle = document.getElementById('altYardageModalTitle');

  // Station Elements
  const stationsTableBody = document.getElementById('stationsTableBody');
  const stationFilter = document.getElementById('stationFilter');
  const addStationBtn = document.getElementById('addStationBtn');
  const editSelectedStationBtn = document.getElementById('editSelectedStationBtn');

  // Structure Elements
  const structuresTableBody = document.getElementById('structuresTableBody');
  const structureFilter = document.getElementById('structureFilter');
  const addStructureBtn = document.getElementById('addStructureBtn');
  const editSelectedStructureBtn = document.getElementById('editSelectedStructureBtn');
  const structureEditModal = document.getElementById('structureEditModal');
  const structureEditForm = document.getElementById('structureEditForm');
  const formStructureName = document.getElementById('formStructureName');
  const formStructureType = document.getElementById('formStructureType');
  const formStructureNo = document.getElementById('formStructureNo');
  const structureTracksTableBody = document.getElementById('structureTracksTableBody');
  const addStructureTrackBtn = document.getElementById('addStructureTrackBtn');
  const structureModalSaveBtn = document.getElementById('structureModalSaveBtn');
  const structureModalCancelBtn = document.getElementById('structureModalCancelBtn');
  const structureModalCloseBtn = document.getElementById('structureModalCloseBtn');

  // Switch Elements
  const switchesTableBody = document.getElementById('switchesTableBody');
  const switchFilter = document.getElementById('switchFilter');
  const addSwitchBtn = document.getElementById('addSwitchBtn');
  const editSelectedSwitchBtn = document.getElementById('editSelectedSwitchBtn');
  const scEditModal = document.getElementById('scEditModal');
  const scEditForm = document.getElementById('scEditForm');
  const formScName = document.getElementById('formScName');
  const formJunctionGroup = document.getElementById('formJunctionGroup');
  const scModalSaveBtn = document.getElementById('scModalSaveBtn');
  const scModalCancelBtn = document.getElementById('scModalCancelBtn');
  const scModalCloseBtn = document.getElementById('scModalCloseBtn');
  const scModalTitle = document.getElementById('scModalTitle');

  // Section Modal Elements (Detailed)
  const formSectionElr = document.getElementById('formSectionElr');
  const formSectionOffset = document.getElementById('formSectionOffset');
  const formSectionFrom = document.getElementById('formSectionFrom');
  const formSectionTo = document.getElementById('formSectionTo');
  const sectionModalSaveBtn = document.getElementById('sectionModalSaveBtn');
  const sectionModalCancelBtn = document.getElementById('sectionModalCancelBtn');
  const sectionModalCloseBtn = document.getElementById('sectionModalCloseBtn');
  const sectionModalTitle = document.getElementById('sectionModalTitle');

  // Station Modal Elements (Detailed)
  const stationEditModal = document.getElementById('stationEditModal');
  const stationEditForm = document.getElementById('stationEditForm');
  const formStationName = document.getElementById('formStationName');
  const formStationAt = document.getElementById('formStationAt');
  const formStationSideDiagramVisible = document.getElementById('formStationSideDiagramVisible');
  const addPlatformBtn = document.getElementById('addPlatformBtn');
  const platformsTableBody = document.getElementById('platformsTableBody');
  const stationModalSaveBtn = document.getElementById('stationModalSaveBtn');
  const stationModalCancelBtn = document.getElementById('stationModalCancelBtn');
  const stationModalCloseBtn = document.getElementById('stationModalCloseBtn');
  const stationModalTitle = document.getElementById('stationModalTitle');

  // State
  let selectedTrack = null;
  let selectedTrackId = null;
  let isAddingNewTrack = false;
  let selectedSection = null;
  let isAddingNewSection = false;
  let selectedStation = null;
  let selectedStationId = null;
  let isAddingNewStation = false;
  let selectedStructure = null;
  let selectedStructureIndex = null;
  let isAddingNewStructure = false;
  let selectedSwitch = null;
  let selectedSwitchIndex = null;
  let isAddingNewSwitch = false;
  let selectedAltYardage = null;
  let selectedAltYardageIndex = null;
  let isAddingNewAltYardage = false;

  function init() {
    initTabs();
    initTrackInputs();
    initSectionInputs();
    initStationInputs();
    initStructureInputs();
    initSwitchInputs();
    initAltYardageInputs();
    initGlobalEditListeners();
  }

  function initTabs() {
    if (editTabButtons.length) {
      editTabButtons.forEach(btn => {
        btn.addEventListener('click', () => setActiveEditTab(btn.dataset.tab));
      });
      // Set initial tab without triggering massive renders until loaded?
      // actually, just waiting for user interaction is fine.
    }
  }

  function initGlobalEditListeners() {
    // Route Meta editing
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

    window.addEventListener('diagram:routeLoaded', () => {
      onRouteLoaded();
    });
  }

  function onRouteLoaded() {
    const r = window.TrackDiagramApp?.getRoute();
    if (r) {
        // Reset selections
        selectedTrack = null;
        selectedTrackId = null;
        selectedStation = null;
        selectedStationId = null;
        selectedAltYardage = null;

        updateTrackActionButtons();
        updateStationActionButtons();
        updateAltYardageActionButtons();

        // Update Meta UI
        if (editRouteName) editRouteName.value = r.name || '';
        if (editRouteCode) editRouteCode.value = r.code || '';
        if (editRouteLength) {
            const miles = Math.floor((r.length_yards || 0) / 1760);
            const yards = (r.length_yards || 0) % 1760;
            editRouteLength.textContent = `${miles}M ${yards}Y`;
        }

        // Render current tab
        const activeTab = document.querySelector('.edit-tab-button.active');
        if (activeTab) {
            setActiveEditTab(activeTab.dataset.tab);
        } else {
            // Default to tracks
            setActiveEditTab('tracks');
        }
    }
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
        renderTracksTable(tidFilter?.value || '');
    } else if (tabName === 'sections') {
        renderSectionsTable(sectionFilter?.value || '');
    } else if (tabName === 'stations') {
        renderStationsTable(stationFilter?.value || '');
    } else if (tabName === 'structures') {
        renderStructuresTable(structureFilter?.value || '');
    } else if (tabName === 'switches') {
        renderSwitchesTable(switchFilter?.value || '');
    } else if (tabName === 'altyardage') {
        renderAltYardageTable(altElrFilter?.value || '');
    }
  }

  // --- Track Logic ---

  function initTrackInputs() {
    if (tidFilter) {
        tidFilter.addEventListener('input', () => renderTracksTable(tidFilter.value));
    }
    if (addTrackBtn) {
        addTrackBtn.addEventListener('click', addNewTrack);
    }
    if (editSelectedTrackBtn) {
        editSelectedTrackBtn.addEventListener('click', editSelectedTrack);
    }
    if (modalSaveBtn) {
        modalSaveBtn.addEventListener('click', saveTrackFromForm);
    }
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', hideTrackModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideTrackModal);
    if (addShapeBtn) addShapeBtn.addEventListener('click', addShapeSegment);

    // Link visibility toggles
    if (formFromType) formFromType.addEventListener('change', () => setLinkDescriptionVisibility(formFromType, formFromLinkDescription));
    if (formToType) formToType.addEventListener('change', () => setLinkDescriptionVisibility(formToType, formToLinkDescription));
  }

  function setLinkDescriptionVisibility(typeEl, linkInputEl) {
    try {
      const isLink = typeEl && String(typeEl.value) === 'link';
      if (!linkInputEl) return;
      const wrapper = linkInputEl.closest('.form-field');
      if (!wrapper) return;
      wrapper.style.display = isLink ? 'flex' : 'none';
    } catch (e) { /* ignore */ }
  }

  function renderTracksTable(filterTid = '') {
    if (!tracksTableBody) return;
    const r = window.TrackDiagramApp?.getRoute();
    if (!r?.tracks?.length) {
      tracksTableBody.innerHTML = '<tr><td colspan="11" class="table-empty">No tracks available.</td></tr>';
      selectedTrack = null; selectedTrackId = null;
      updateTrackActionButtons();
      return;
    }
    
    // Filter
    let tracks = r.tracks;
    if (filterTid.trim()) {
      const filterLower = filterTid.trim().toLowerCase();
      tracks = tracks.filter(t => String(t.tid || '').toLowerCase().includes(filterLower));
    }
    
    if (!tracks.length) {
        tracksTableBody.innerHTML = '<tr><td colspan="11" class="table-empty">No tracks match the filter.</td></tr>';
        selectedTrack = null; selectedTrackId = null;
        updateTrackActionButtons();
        return;
    }
    
    // Sort
    const sortedTracks = [...tracks].sort((a, b) => {
        const extentsA = TrackDomain.computeTrackExtents(a);
        const extentsB = TrackDomain.computeTrackExtents(b);
        if (!extentsA) return 1; if (!extentsB) return -1;
        return extentsA.minFrom - extentsB.minFrom;
    });
    
    const rows = sortedTracks.map((track, index) => {
      const elr = TrackDomain.getTrackELR(track, r);
      const extents = TrackDomain.computeTrackExtents(track);
      
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
        ? `${String(fromParts.miles).padStart(3, '0')}M ${String(fromParts.yards).padStart(4, '0')}Y` : '-';
      const toFormatted = (toParts.miles !== '-' && toParts.yards !== '-')
        ? `${String(toParts.miles).padStart(3, '0')}M ${String(toParts.yards).padStart(4, '0')}Y` : '-';
      
      const yFromVal = track.shape?.[0]?.yFrom;
      const yToVal = track.shape?.[track.shape.length - 1]?.yTo;
      const fromConnType = track.fromConnection?.type ?? '-';
      const toConnType = track.toConnection?.type ?? '-';
      const scFrom = track.fromConnection?.sc_name ?? '-';
      const scTo = track.toConnection?.sc_name ?? '-';
      const tidVal = track.tid ?? '';
      const trackIdVal = track._id ?? '';

      return `<tr data-track-index="${index}" data-track-id="${String(trackIdVal)}" data-tid="${String(tidVal)}" class="track-row">` +
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

    // Restore selection
    if (selectedTrackId != null) {
        const idToFind = String(selectedTrackId);
        tracksTableBody.querySelectorAll('.track-row').forEach(row => {
        if (row.dataset.trackId === idToFind) row.classList.add('selected');
        });
    }
    updateTrackActionButtons();
    
    // Handlers
    tracksTableBody.querySelectorAll('.track-row').forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.btn-track-delete')) return;
            const trackIndex = parseInt(row.dataset.trackIndex);
            const track = sortedTracks[trackIndex];
            tracksTableBody.querySelectorAll('.track-row').forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
            if (track) {
                selectedTrack = track;
                selectedTrackId = track._id ?? null;
                updateTrackActionButtons();
            }
        });
        row.addEventListener('dblclick', (e) => {
            if (e.target.closest('.btn-track-delete')) return;
            const trackIndex = parseInt(row.dataset.trackIndex);
            const track = sortedTracks[trackIndex];
            if (track) {
                const extents = TrackDomain.computeTrackExtents(track);
                if (extents) {
                    const centerYards = (extents.minFrom + extents.maxFrom) / 2;
                    window.TrackDiagramApp?.centerOnYards?.(centerYards, true);
                }
            }
        });
    });

    tracksTableBody.querySelectorAll('.btn-track-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await deleteTrack(btn.dataset.trackId);
        });
    });
  }

  function addNewTrack() {
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;
    const newTrack = {
      tid: null,
      shape: [{ from: 0, to: 0, yFrom: null, yTo: null, electrification: 'overhead' }]
    };
    selectedTrack = newTrack;
    showTrackModal(newTrack, true);
  }

  function editSelectedTrack() {
    if (!selectedTrack) return;
    showTrackModal(selectedTrack, false);
  }

  function showTrackModal(track, isNew) {
    if (!trackEditModal) return;
    isAddingNewTrack = isNew;
    if (modalTitle) modalTitle.textContent = isNew ? 'Add New Track' : 'Edit Track';

    if (formTid) formTid.value = track.tid ?? '';
    if (formFromType) formFromType.value = track.fromConnection?.type ?? '';
    if (formFromSc) formFromSc.value = track.fromConnection?.sc_name ?? '';
    if (formFromTrack) formFromTrack.value = track.fromConnection?.track ?? '';
    if (formFromAt) formFromAt.value = track.fromConnection?.at ?? '';
    if (formFromLinkDescription) {
        formFromLinkDescription.value = track.fromConnection?.connectionLink?.linkDesctiption ?? '';
        setLinkDescriptionVisibility(formFromType, formFromLinkDescription);
    }
    if (formFromElr) formFromElr.value = track.fromConnection?.elr ?? '';
    if (formToType) formToType.value = track.toConnection?.type ?? '';
    if (formToSc) formToSc.value = track.toConnection?.sc_name ?? '';
    if (formToTrack) formToTrack.value = track.toConnection?.track ?? '';
    if (formToAt) formToAt.value = track.toConnection?.at ?? '';
    if (formToLinkDescription) {
        formToLinkDescription.value = track.toConnection?.connectionLink?.linkDesctiption ?? '';
        setLinkDescriptionVisibility(formToType, formToLinkDescription);
    }
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

  function renderShapeTable() {
    if (!shapeTableModalBody || !selectedTrack) return;
    const shape = Array.isArray(selectedTrack.shape) ? selectedTrack.shape : [];
    
    if (!shape.length) {
        shapeTableModalBody.innerHTML = '<tr class="shape-empty-row"><td colspan="6">No shape segments. Click "+ Add Segment" to create one.</td></tr>';
        return;
    }
    
    shapeTableModalBody.innerHTML = shape.map((seg, idx) => {
        return `<tr>
          <td><div class="input-with-calc"><input type="number" class="shape-input" data-idx="${idx}" data-field="from" value="${seg.from ?? ''}" /><button type="button" class="btn-calc" data-target="from_${idx}">📍</button></div></td>
          <td><div class="input-with-calc"><input type="number" class="shape-input" data-idx="${idx}" data-field="to" value="${seg.to ?? ''}" /><button type="button" class="btn-calc" data-target="to_${idx}">📍</button></div></td>
          <td><input type="number" class="shape-input" data-idx="${idx}" data-field="yFrom" value="${seg.yFrom ?? ''}" /></td>
          <td><input type="number" class="shape-input" data-idx="${idx}" data-field="yTo" value="${seg.yTo ?? ''}" /></td>
          <td>
            <select class="shape-input" data-idx="${idx}" data-field="electrification">
                <option value="none" ${seg.electrification === 'none' ? 'selected' : ''}>None</option>
                <option value="overhead" ${(!seg.electrification || seg.electrification === 'overhead') ? 'selected' : ''}>Overhead</option>
                <option value="3rd_4th_rail" ${seg.electrification === '3rd_4th_rail' ? 'selected' : ''}>3rd/4th Rail</option>
                <option value="both" ${seg.electrification === 'both' ? 'selected' : ''}>Both</option>
            </select>
          </td>
          <td class="shape-actions"><button type="button" class="btn-shape-action btn-shape-delete" data-idx="${idx}">Delete</button></td>
        </tr>`;
    }).join('');

    shapeTableModalBody.querySelectorAll('.shape-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            const field = e.target.dataset.field;
            if (!selectedTrack.shape[idx]) return;
            if (field === 'electrification') selectedTrack.shape[idx][field] = e.target.value;
            else selectedTrack.shape[idx][field] = e.target.value === '' ? null : Number(e.target.value);
        });
    });

    shapeTableModalBody.querySelectorAll('.btn-shape-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.dataset.idx);
            selectedTrack.shape.splice(idx, 1);
            renderShapeTable();
        });
    });
    
    // Calc Button handler - this requires the global calc modal or a passed in function
    // For now, assuming showYardsCalc is available globally or we need to move calc logic here or into a SharedUI
    // Let's assume the calculator modal logic stays in ui.js or we duplicate/move it. 
    // Ideally, Calc logic should be in a separate shared UI file. For now, we will dispatch an event or call global if exists.
    shapeTableModalBody.querySelectorAll('.btn-calc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find input relative to button
            const input = e.currentTarget.parentElement.querySelector('input');
            if (window.showYardsCalc) window.showYardsCalc(input);
        });
    });
  }

  function addShapeSegment() {
    if (!selectedTrack) return;
    if (!Array.isArray(selectedTrack.shape)) selectedTrack.shape = [];
    selectedTrack.shape.push({ from: null, to: null, yFrom: null, yTo: null, electrification: 'overhead' });
    renderShapeTable();
  }

  async function saveTrackFromForm() {
    // ... Copy logic from ui.js saveTrackFromForm ...
    // Simplified for brevity, assume similar validation logic as original
    if (!selectedTrack) return;
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;

    selectedTrack.tid = Number(formTid?.value);
    
    // Connections... (simplified for reconstruction)
    const fromType = formFromType?.value?.trim();
    if (fromType) {
        selectedTrack.fromConnection = {
            type: fromType,
            sc_name: formFromSc?.value,
            track: Number(formFromTrack?.value),
            at: Number(formFromAt?.value),
            elr: formFromElr?.value
        };
        if (fromType === 'link' && formFromLinkDescription?.value) {
            selectedTrack.fromConnection.connectionLink = { linkDesctiption: formFromLinkDescription.value };
        }
    } else { delete selectedTrack.fromConnection; }

    const toType = formToType?.value?.trim();
    if (toType) {
        selectedTrack.toConnection = {
            type: toType,
            sc_name: formToSc?.value,
            track: Number(formToTrack?.value),
            at: Number(formToAt?.value),
            elr: formToElr?.value
        };
        if (toType === 'link' && formToLinkDescription?.value) {
            selectedTrack.toConnection.connectionLink = { linkDesctiption: formToLinkDescription.value };
        }
    } else { delete selectedTrack.toConnection; }

    if (formAltRouteElr?.value) {
        selectedTrack.altRoute = { elr: formAltRouteElr.value, showAltRuler: formAltRouteShowRuler.checked };
    } else { delete selectedTrack.altRoute; }

    try {
        await saveTrackToApi(r.code, selectedTrack, isAddingNewTrack);
        hideTrackModal();
    } catch (err) {
        alert('Error saving track: ' + err.message);
    }
  }

  async function saveTrackToApi(code, track, isNew) {
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew 
        ? `${apiUrl}/code/${code}/tracks`
        : `${apiUrl}/code/${code}/tracks/by-id/${track._id}`;
    
    const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track)
    });
    if (!resp.ok) throw new Error(await resp.text());
    window.TrackDiagramApp?.loadRoute(code);
  }

  async function deleteTrack(trackId) {
    const r = window.TrackDiagramApp?.getRoute();
    if (!r || !trackId) return;
    if (!confirm('Delete this track?')) return;
    
    try {
        await fetch(`${apiUrl}/code/${r.code}/tracks/by-id/${trackId}`, { method: 'DELETE' });
        window.TrackDiagramApp?.loadRoute(r.code);
    } catch(err) {
        console.error(err);
        alert('Delete failed');
    }
  }

  function updateTrackActionButtons() {
    if (editSelectedTrackBtn) editSelectedTrackBtn.disabled = !selectedTrack;
  }

  // --- Station Logic ---

  function initStationInputs() {
      if (stationFilter) stationFilter.addEventListener('input', () => renderStationsTable(stationFilter.value));
      if (editSelectedStationBtn) updateStationActionButtons();
  }

  function renderStationsTable(filterName = '') {
      if (!stationsTableBody) return;
      const r = window.TrackDiagramApp?.getRoute();
      if (!r?.stations?.length) {
          stationsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No stations available.</td></tr>';
          selectedStation = null; selectedStationId = null;
          updateStationActionButtons();
          return;
      }

      let stations = r.stations;
      if (filterName.trim()) {
          stations = stations.filter(s => String(s.name || '').toLowerCase().includes(filterName.trim().toLowerCase()));
      }

      if (!stations.length) {
          stationsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No stations match filter.</td></tr>';
          return;
      }
      
      const sortedStations = [...stations].sort((a, b) => (a.at || 0) - (b.at || 0));
      
      stationsTableBody.innerHTML = sortedStations.map((station, index) => {
          const loc = TrackDomain.getElrAndRelativeYardsForMainYards(r, station.at);
          let atFormatted = '-';
          if (Number.isFinite(loc.relativeYards)) {
               const p = yardsToMilesParts(loc.relativeYards);
               if (p.miles !== '-') atFormatted = `${p.miles}M ${p.yards}Y`;
          } else {
             const p = yardsToMilesParts(station.at);
             if (p.miles !== '-') atFormatted = `${p.miles}M ${p.yards}Y`;
          }

          return `<tr data-idx="${index}" data-id="${station._id}" class="station-row">
            <td>${loc.elr || '-'}</td>
            <td>${station.name}</td>
            <td>${atFormatted}</td>
            <td>${station.platforms?.length || 0}</td>
            <td><button class="btn-shape-action btn-shape-delete btn-station-delete" data-id="${station._id}">Delete</button></td>
          </tr>`;
      }).join('');

      stationsTableBody.querySelectorAll('.station-row').forEach(row => {
          row.addEventListener('click', (e) => {
              if (e.target.closest('.btn-station-delete')) return;
              const s = sortedStations[parseInt(row.dataset.idx)];
              stationsTableBody.querySelectorAll('.station-row').forEach(r => r.classList.remove('selected'));
              row.classList.add('selected');
              selectedStation = s;
              selectedStationId = s._id;
              updateStationActionButtons();
          });
          row.addEventListener('dblclick', () => {
             const s = sortedStations[parseInt(row.dataset.idx)];
             if (s && Number.isFinite(s.at)) window.TrackDiagramApp?.centerOnYards?.(s.at, true); 
          });
      });
      
      stationsTableBody.querySelectorAll('.btn-station-delete').forEach(btn => {
          btn.addEventListener('click', async (e) => {
             e.stopPropagation();
             if (confirm('Delete station?')) {
                 await fetch(`${apiUrl}/code/${r.code}/stations/${btn.dataset.id}`, { method: 'DELETE' });
                 window.TrackDiagramApp?.loadRoute(r.code);
             } 
          });
      });
  }

  function updateStationActionButtons() {
    if (editSelectedStationBtn) editSelectedStationBtn.disabled = !selectedStation;
  }

  // --- Section Logic ---

  function initSectionInputs() {
    if (sectionFilter) sectionFilter.addEventListener('input', () => renderSectionsTable(sectionFilter.value));
    if (addSectionBtn) addSectionBtn.addEventListener('click', () => showSectionModal(null, true));
    if (editSelectedSectionBtn) editSelectedSectionBtn.addEventListener('click', () => showSectionModal(selectedSection, false));
    if (sectionModalSaveBtn) sectionModalSaveBtn.addEventListener('click', saveSectionFromForm);
    if (sectionModalCancelBtn) sectionModalCancelBtn.addEventListener('click', hideSectionModal);
    if (sectionModalCloseBtn) sectionModalCloseBtn.addEventListener('click', hideSectionModal);
  }

  function renderSectionsTable(filterElr = '') {
    if (!sectionsTableBody) return;
    const r = window.TrackDiagramApp?.getRoute();
    if (!r?.sections?.length) {
      sectionsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No sections available.</td></tr>';
      selectedSection = null; updateSectionActionButtons();
      return;
    }

    let list = r.sections;
    if (filterElr.trim()) {
      list = list.filter(s => String(s.elr || '').toLowerCase().includes(filterElr.trim().toLowerCase()));
    }

    if (!list.length) {
      sectionsTableBody.innerHTML = '<tr><td colspan="5" class="table-empty">No sections match filter.</td></tr>';
      return;
    }

    // Sort by from
    const sorted = [...list].sort((a, b) => (a.from || 0) - (b.from || 0));

    sectionsTableBody.innerHTML = sorted.map((s, idx) => {
      // Find real index in main array for selection
      const realIdx = r.sections.indexOf(s);
      
      const pFrom = yardsToMilesParts(s.from);
      const pTo = yardsToMilesParts(s.to);
      const fromStr = pFrom.miles !== '-' ? `${pFrom.miles}M ${pFrom.yards}Y` : '-';
      const toStr = pTo.miles !== '-' ? `${pTo.miles}M ${pTo.yards}Y` : '-';

      return `<tr data-idx="${realIdx}" class="section-row">
        <td>${s.elr}</td>
        <td>${fromStr}</td>
        <td>${toStr}</td>
        <td>${s.offset ?? 0}</td>
        <td><button class="btn-shape-action btn-shape-delete btn-section-delete" data-id="${s._id}">Delete</button></td>
      </tr>`;
    }).join('');

    sectionsTableBody.querySelectorAll('.section-row').forEach(row => {
      row.addEventListener('click', () => {
        sectionsTableBody.querySelectorAll('.section-row').forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        const idx = parseInt(row.dataset.idx);
        selectedSection = r.sections[idx];
        updateSectionActionButtons();
      });
    });

    sectionsTableBody.querySelectorAll('.btn-section-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Delete section?')) {
          await fetch(`${apiUrl}/code/${r.code}/sections/${btn.dataset.id}`, { method: 'DELETE' });
          window.TrackDiagramApp?.loadRoute(r.code);
        }
      });
    });
  }

  function updateSectionActionButtons() {
    if (editSelectedSectionBtn) editSelectedSectionBtn.disabled = !selectedSection;
  }

  function showSectionModal(section, isNew) {
    if (!sectionEditModal) return;
    isAddingNewSection = isNew;
    selectedSection = section;
    if (sectionModalTitle) sectionModalTitle.textContent = isNew ? 'Add Section' : 'Edit Section';

    if (formSectionElr) formSectionElr.value = section?.elr ?? '';
    if (formSectionOffset) formSectionOffset.value = section?.offset ?? 0;
    if (formSectionFrom) formSectionFrom.value = section?.from ?? 0;
    if (formSectionTo) formSectionTo.value = section?.to ?? 0;

    sectionEditModal.hidden = false;
  }

  function hideSectionModal() {
    if (sectionEditModal) sectionEditModal.hidden = true;
    if (sectionEditForm) sectionEditForm.reset();
  }

  async function saveSectionFromForm() {
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;

    const data = {
      elr: formSectionElr?.value,
      offset: Number(formSectionOffset?.value),
      from: Number(formSectionFrom?.value),
      to: Number(formSectionTo?.value)
    };

    const method = isAddingNewSection ? 'POST' : 'PUT';
    const url = isAddingNewSection
      ? `${apiUrl}/code/${r.code}/sections`
      : `${apiUrl}/code/${r.code}/sections/${selectedSection._id}`;

    try {
      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!resp.ok) throw new Error(await resp.text());
      hideSectionModal();
      window.TrackDiagramApp?.loadRoute(r.code);
    } catch (e) {
      alert('Error saving section: ' + e.message);
    }
  }

  // --- Switch Logic ---

  function initSwitchInputs() {
    if (switchFilter) switchFilter.addEventListener('input', () => renderSwitchesTable(switchFilter.value));
    if (addSwitchBtn) addSwitchBtn.addEventListener('click', () => showSwitchModal(null, true));
    if (editSelectedSwitchBtn) editSelectedSwitchBtn.addEventListener('click', () => showSwitchModal(selectedSwitch, false));
    if (scModalSaveBtn) scModalSaveBtn.addEventListener('click', saveSwitchFromForm);
    if (scModalCancelBtn) scModalCancelBtn.addEventListener('click', hideSwitchModal);
    if (scModalCloseBtn) scModalCloseBtn.addEventListener('click', hideSwitchModal);
  }

  function renderSwitchesTable(filterName = '') {
    if (!switchesTableBody) return;
    const r = window.TrackDiagramApp?.getRoute();
    const list = r?.switchesAndCrossings || [];

    if (!list.length) {
      switchesTableBody.innerHTML = '<tr><td colspan="3" class="table-empty">No switches loaded.</td></tr>';
      selectedSwitch = null; updateSwitchActionButtons();
      return;
    }

    let filtered = list;
    if (filterName.trim()) {
      filtered = list.filter(s => String(s.sc_Name || '').toLowerCase().includes(filterName.trim().toLowerCase()));
    }

    if (!filtered.length) {
      switchesTableBody.innerHTML = '<tr><td colspan="3" class="table-empty">No matches.</td></tr>';
      return;
    }

    switchesTableBody.innerHTML = filtered.map((item, idx) => {
      // We need a stable identifier since SCs might not have _id if they are subdocuments without id access here or just indices
      // Mongoose subdocs usually have _id.
      return `<tr data-idx="${idx}" data-id="${item._id}" class="switch-row">
        <td>${item.sc_Name}</td>
        <td>${item.junctionGroup || '-'}</td>
        <td><button class="btn-shape-action btn-shape-delete btn-switch-delete" data-id="${item._id}">Delete</button></td>
      </tr>`;
    }).join('');

    switchesTableBody.querySelectorAll('.switch-row').forEach(row => {
      row.addEventListener('click', () => {
        switchesTableBody.querySelectorAll('.switch-row').forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        const idx = parseInt(row.dataset.idx);
        selectedSwitch = filtered[idx];
        selectedSwitchIndex = r.switchesAndCrossings.indexOf(selectedSwitch);
        updateSwitchActionButtons();
      });
    });

    switchesTableBody.querySelectorAll('.btn-switch-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Delete switch?')) {
          await fetch(`${apiUrl}/code/${r.code}/switches/${btn.dataset.id}`, { method: 'DELETE' });
          window.TrackDiagramApp?.loadRoute(r.code);
        }
      });
    });
  }

  function updateSwitchActionButtons() {
    if (editSelectedSwitchBtn) editSelectedSwitchBtn.disabled = !selectedSwitch;
  }

  function showSwitchModal(item, isNew) {
    if (!scEditModal) return;
    isAddingNewSwitch = isNew;
    selectedSwitch = item;
    if (scModalTitle) scModalTitle.textContent = isNew ? 'Add Switch' : 'Edit Switch';
    
    if (formScName) formScName.value = item?.sc_Name ?? '';
    if (formJunctionGroup) formJunctionGroup.value = item?.junctionGroup ?? '';
    
    scEditModal.hidden = false;
  }

  function hideSwitchModal() {
    if (scEditModal) scEditModal.hidden = true;
    if (scEditForm) scEditForm.reset();
  }

  async function saveSwitchFromForm() {
    const r = window.TrackDiagramApp?.getRoute();
    if (!r) return;

    const data = {
      sc_Name: formScName?.value,
      junctionGroup: formJunctionGroup?.value
    };

    const method = isAddingNewSwitch ? 'POST' : 'PUT';
    const url = isAddingNewSwitch
      ? `${apiUrl}/code/${r.code}/switches`
      : `${apiUrl}/code/${r.code}/switches/${selectedSwitch._id}`; // Check endpoints

    try {
      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!resp.ok) throw new Error(await resp.text());
      hideSwitchModal();
      window.TrackDiagramApp?.loadRoute(r.code);
    } catch (e) {
      alert('Error saving switch: ' + e.message);
    }
  }

  // --- Structure Logic ---

  function initStructureInputs() {
    if (structureFilter) structureFilter.addEventListener('input', () => renderStructuresTable(structureFilter.value));
    if (addStructureBtn) addStructureBtn.addEventListener('click', () => showStructureModal(null, true));
    if (editSelectedStructureBtn) editSelectedStructureBtn.addEventListener('click', () => showStructureModal(selectedStructure, false));
    if (structureModalSaveBtn) structureModalSaveBtn.addEventListener('click', saveStructureFromForm);
    if (structureModalCancelBtn) structureModalCancelBtn.addEventListener('click', hideStructureModal);
    if (structureModalCloseBtn) structureModalCloseBtn.addEventListener('click', hideStructureModal);
    if (addStructureTrackBtn) addStructureTrackBtn.addEventListener('click', addStructureTrackLoc);
  }

  function renderStructuresTable(filterName = '') {
    if (!structuresTableBody) return;
    const r = window.TrackDiagramApp?.getRoute();
    const list = r?.structures || [];

    if (!list.length) {
      structuresTableBody.innerHTML = '<tr><td colspan="6" class="table-empty">No structures available.</td></tr>';
      selectedStructure = null; updateStructureActionButtons();
      return;
    }

    let filtered = list;
    if (filterName.trim()) {
      filtered = list.filter(STR => String(STR.name || '').toLowerCase().includes(filterName.trim().toLowerCase()));
    }

    if (!filtered.length) {
      structuresTableBody.innerHTML = '<tr><td colspan="6" class="table-empty">No matches.</td></tr>';
      return;
    }

    structuresTableBody.innerHTML = filtered.map((st, idx) => {
      // Summarize extents (min from, max to)
      let minF = Infinity, maxT = -Infinity;
      if (st.trackLocation && st.trackLocation.length) {
        st.trackLocation.forEach(tl => {
          if (tl.from < minF) minF = tl.from;
          if (tl.to > maxT) maxT = tl.to;
        });
      }
      if (minF === Infinity) { minF = 0; maxT = 0; }

      const fStr = yardsToMilesParts(minF).miles !== '-' ? `${yardsToMilesParts(minF).miles}M ${yardsToMilesParts(minF).yards}Y` : '-';
      const tStr = yardsToMilesParts(maxT).miles !== '-' ? `${yardsToMilesParts(maxT).miles}M ${yardsToMilesParts(maxT).yards}Y` : '-';

      return `<tr data-idx="${idx}" data-id="${st._id}" class="structure-row">
        <td>${st.name}</td>
        <td>${st.type}</td>
        <td>${st.structureNo || '-'}</td>
        <td>${fStr}</td>
        <td>${tStr}</td>
        <td><button class="btn-shape-action btn-shape-delete btn-structure-delete" data-id="${st._id}">Delete</button></td>
      </tr>`;
    }).join('');

    structuresTableBody.querySelectorAll('.structure-row').forEach(row => {
      row.addEventListener('click', () => {
        structuresTableBody.querySelectorAll('.structure-row').forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        const idx = parseInt(row.dataset.idx);
        selectedStructure = filtered[idx];
        selectedStructureIndex = r.structures.indexOf(selectedStructure);
        updateStructureActionButtons();
      });
    });

    structuresTableBody.querySelectorAll('.btn-structure-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Delete structure?')) {
          await fetch(`${apiUrl}/code/${r.code}/structures/${btn.dataset.id}`, { method: 'DELETE' });
          window.TrackDiagramApp?.loadRoute(r.code);
        }
      });
    });
  }

  function updateStructureActionButtons() {
    if (editSelectedStructureBtn) editSelectedStructureBtn.disabled = !selectedStructure;
  }

  function showStructureModal(item, isNew) {
    if (!structureEditModal) return;
    isAddingNewStructure = isNew;
    selectedStructure = item ? JSON.parse(JSON.stringify(item)) : { // shallow copy or deep clone for editing state
        name: '', type: 'tunnel', structureNo: '', trackLocation: []
    };
    if (structureModalTitle) structureModalTitle.textContent = isNew ? 'Add Structure' : 'Edit Structure';

    if (formStructureName) formStructureName.value = selectedStructure.name;
    if (formStructureType) formStructureType.value = selectedStructure.type;
    if (formStructureNo) formStructureNo.value = selectedStructure.structureNo || '';
    
    renderStructureTrackTable();
    structureEditModal.hidden = false;
  }

  function hideStructureModal() {
    if (structureEditModal) structureEditModal.hidden = true;
    if (structureEditForm) structureEditForm.reset();
  }

  function renderStructureTrackTable() {
    if (!structureTracksTableBody || !selectedStructure) return;
    const locs = selectedStructure.trackLocation || [];
    
    if (!locs.length) {
      structureTracksTableBody.innerHTML = '<tr class="shape-empty-row"><td colspan="5">No track locations. Click "+ Add Track".</td></tr>';
      return;
    }

    structureTracksTableBody.innerHTML = locs.map((tl, idx) => `
      <tr>
        <td><input type="text" class="st-loc-input" data-idx="${idx}" data-field="elr" value="${tl.elr || ''}" style="width:60px"></td>
        <td><input type="number" class="st-loc-input" data-idx="${idx}" data-field="tid" value="${tl.tid}"></td>
        <td><input type="number" class="st-loc-input" data-idx="${idx}" data-field="from" value="${tl.from}"></td>
        <td><input type="number" class="st-loc-input" data-idx="${idx}" data-field="to" value="${tl.to}"></td>
        <td><button type="button" class="btn-shape-action btn-shape-delete" data-idx="${idx}">Del</button></td>
      </tr>
    `).join('');

    structureTracksTableBody.querySelectorAll('.st-loc-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            const field = e.target.dataset.field;
            let val = e.target.value;
            if (field !== 'elr') val = Number(val);
            selectedStructure.trackLocation[idx][field] = val;
        });
    });

    structureTracksTableBody.querySelectorAll('.btn-shape-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.idx);
            selectedStructure.trackLocation.splice(idx, 1);
            renderStructureTrackTable();
        });
    });
  }

  function addStructureTrackLoc() {
      if (!selectedStructure) return;
      if (!selectedStructure.trackLocation) selectedStructure.trackLocation = [];
      selectedStructure.trackLocation.push({ elr: '', tid: 0, from: 0, to: 0 });
      renderStructureTrackTable();
  }

  async function saveStructureFromForm() {
      const r = window.TrackDiagramApp?.getRoute();
      if (!r) return;

      selectedStructure.name = formStructureName.value;
      selectedStructure.type = formStructureType.value;
      selectedStructure.structureNo = formStructureNo.value;
      // trackLocation updated in place

      const method = isAddingNewStructure ? 'POST' : 'PUT';
      const url = isAddingNewStructure 
        ? `${apiUrl}/code/${r.code}/structures`
        : `${apiUrl}/code/${r.code}/structures/${selectedStructure._id}`;

      try {
        const resp = await fetch(url, {
           method,
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(selectedStructure)
        });
        if (!resp.ok) throw new Error(await resp.text());
        hideStructureModal();
        window.TrackDiagramApp?.loadRoute(r.code);
      } catch (err) {
          alert('Error: ' + err.message);
      }
  }

  // --- Alt Yardage Logic ---

  function initAltYardageInputs() {
    if (altElrFilter) altElrFilter.addEventListener('input', () => renderAltYardageTable(altElrFilter.value));
    if (addAltYardageBtn) addAltYardageBtn.addEventListener('click', () => showAltYardageModal(null, true));
    if (editSelectedAltYardageBtn) editSelectedAltYardageBtn.addEventListener('click', () => showAltYardageModal(selectedAltYardage, false));
    if (altYardageModalSaveBtn) altYardageModalSaveBtn.addEventListener('click', saveAltYardageFromForm);
    if (altYardageModalCancelBtn) altYardageModalCancelBtn.addEventListener('click', hideAltYardageModal);
    if (altYardageModalCloseBtn) altYardageModalCloseBtn.addEventListener('click', hideAltYardageModal);
  }

  function renderAltYardageTable(filterElr = '') {
      if (!altYardageTableBody) return;
      const r = window.TrackDiagramApp?.getRoute();
      const list = Array.isArray(r?.altRouteYardageMap) ? r.altRouteYardageMap : [];
      let filtered = list;
      if (filterElr.trim()) filtered = list.filter(i => String(i.elr).toLowerCase().includes(filterElr.trim().toLowerCase()));

      if (!filtered.length) {
          altYardageTableBody.innerHTML = '<tr><td colspan="7" class="table-empty">No mappings.</td></tr>';
          selectedAltYardage = null; updateAltYardageActionButtons();
          return;
      }
      
      altYardageTableBody.innerHTML = filtered.map((item, idx) => `
        <tr class="alt-yardage-row" data-idx="${idx}">
            <td>${item.elr}</td>
            <td>${item.fromYardageMainRoute}</td>
            <td>${item.toYardageMainRoute}</td>
            <td>${item.fromYardageAltRoute}</td>
            <td>${item.toYardageAltRoute}</td>
            <td><button class="btn-shape-action btn-shape-delete btn-alt-delete" data-idx="${idx}">Delete</button></td>
        </tr>
      `).join('');
      
      altYardageTableBody.querySelectorAll('.alt-yardage-row').forEach(row => {
          row.addEventListener('click', () => {
              altYardageTableBody.querySelectorAll('.alt-yardage-row').forEach(r => r.classList.remove('selected'));
              row.classList.add('selected');
              const idx = parseInt(row.dataset.idx);
              selectedAltYardage = filtered[idx];
              selectedAltYardageIndex = r.altRouteYardageMap.indexOf(selectedAltYardage);
              updateAltYardageActionButtons();
          });
      });
      
      altYardageTableBody.querySelectorAll('.btn-alt-delete').forEach(btn => {
         btn.addEventListener('click', async (e) => {
             e.stopPropagation();
             if (!confirm('Delete mapping?')) return;
             const idx = parseInt(btn.dataset.idx);
             const item = filtered[idx];
             const realIndex = r.altRouteYardageMap.indexOf(item);
             if (realIndex > -1) {
                 const newMap = [...r.altRouteYardageMap];
                 newMap.splice(realIndex, 1);
                 await saveAltYardageMapToApi(r._id, newMap);
                 window.TrackDiagramApp?.loadRoute(r.code);
             }
         });
      });
  }

  function updateAltYardageActionButtons() {
    if (editSelectedAltYardageBtn) editSelectedAltYardageBtn.disabled = !selectedAltYardage;
  }

  function showAltYardageModal(item, isNew) {
      if (!altYardageEditModal) return;
      isAddingNewAltYardage = isNew;
      selectedAltYardage = item;
      if (altYardageModalTitle) altYardageModalTitle.textContent = isNew ? 'Add' : 'Edit';
      
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
      const r = window.TrackDiagramApp?.getRoute();
      if (!r) return;
      
      const obj = {
          elr: formAltElr.value.trim(),
          fromYardageMainRoute: Number(formFromMain.value),
          toYardageMainRoute: Number(formToMain.value),
          fromYardageAltRoute: Number(formFromAlt.value),
          toYardageAltRoute: Number(formToAlt.value)
      };

      const current = [...(r.altRouteYardageMap || [])];
      
      // If editing, logic is tricky because we track by index in the filtered list but need to update the main list
      // For simplicity in this refactor, we rely on selectedAltYardageIndex which was set on click
      if (isAddingNewAltYardage) {
          current.push(obj);
      } else if (selectedAltYardageIndex != null && selectedAltYardageIndex > -1) {
          current[selectedAltYardageIndex] = obj;
      }

      await saveAltYardageMapToApi(r._id, current);
      hideAltYardageModal();
      window.TrackDiagramApp?.loadRoute(r.code);
  }

  async function saveAltYardageMapToApi(id, map) {
      await fetch(`${apiUrl}/${id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({altRouteYardageMap: map})
      });
  }

  // --- Utilities ---
  function yardsToMilesParts(yards) {
      if (!Number.isFinite(yards)) return { miles: '-', yards: '-' };
      return { miles: Math.floor(yards / 1760), yards: Math.round(yards % 1760) };
  }

  return {
    init
  };

})();
