
// UI Navigation Module
// Handles Sidebar toggling, Edit Panel toggling, Route Selection, and Navigation Inputs
const UINavigation = (function() {
  const apiUrl = (typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : 'http://localhost:3000/api/routes');

  // Elements
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const sidebar = document.getElementById('sidebar');
  const routeSelector = document.getElementById('routeSelector');
  const editDiagramBtn = document.getElementById('editDiagramBtn');
  const editPanel = document.getElementById('editPanel');
  const closeEditPanelBtn = document.getElementById('closeEditPanelBtn');
  const elrInput = document.getElementById('elrInput');
  const mileInput = document.getElementById('mileInput');
  const yardInput = document.getElementById('yardInput');
  const centerButton = document.getElementById('centerButton');

  // Constants for Edit Lock
  const FAKE_WINDOW_WIDTH = '1825';
  const EDIT_UNLOCK_KEY = 'td_edit_unlocked';

  function init() {
    initSidebar();
    initRouteSelector();
    initNavigationControls();
    initEditPanelToggle();
  }

  function initSidebar() {
    if (hamburgerMenu && sidebar) {
      hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        sidebar.classList.toggle('open');
        // Update edit button lock state when sidebar toggles (if needed)
        setTimeout(updateEditButtonLockState, 0);
      });
    }
  }

  function initEditPanelToggle() {
    // Initialize lock state
    updateEditButtonLockState();

    if (editDiagramBtn) {
      editDiagramBtn.addEventListener('click', () => {
        const entered = window.prompt('Enter the password to open Edit Diagram:');
        if (entered === null) return; // user cancelled
        if (String(entered).trim() === FAKE_WINDOW_WIDTH) {
          toggleEditPanel();
          if (hamburgerMenu && sidebar) {
            hamburgerMenu.classList.remove('active');
            sidebar.classList.remove('open');
          }
        } else {
          window.alert('Incorrect password.');
        }
      });
    }

    if (closeEditPanelBtn) {
      closeEditPanelBtn.addEventListener('click', toggleEditPanel);
    }

    window.addEventListener('storage', (ev) => {
      if (ev.key === EDIT_UNLOCK_KEY) updateEditButtonLockState();
    });
  }

  function toggleEditPanel() {
    if (editPanel) {
      editPanel.classList.toggle('open');
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 310);
    }
  }

  function updateEditButtonLockState() {
    try {
      if (!editDiagramBtn) return;
      editDiagramBtn.classList.remove('locked');
      editDiagramBtn.removeAttribute('aria-disabled');
      editDiagramBtn.title = '';
    } catch (e) { /* ignore */ }
  }

  function initNavigationControls() {
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
  }

  function centerFromInputs() {
    const milesVal = parseFloat(mileInput?.value);
    const yardsVal = parseFloat(yardInput?.value);
    const elrVal = elrInput?.value;
    window.TrackDiagramApp?.centerByELR(elrVal, milesVal, yardsVal);
  }

  function initRouteSelector() {
    if (routeSelector) {
      routeSelector.addEventListener('change', (e) => {
        const code = e.target.value;
        if (code) {
          window.TrackDiagramApp?.loadRoute(code);
        }
      });
    }
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

  async function findRouteCodeForElr(elr) {
    if (!elr) return null;
    const normElr = TrackDomain.normalizeElr(elr);
    
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) return null;
      
      const routes = await res.json();
      if (!Array.isArray(routes)) return null;
      
      for (const route of routes) {
        // Check main sections
        if (route.sections && Array.isArray(route.sections)) {
          const found = route.sections.some(s => TrackDomain.normalizeElr(s.elr) === normElr);
          if (found) return route.code;
        }
        
        // Check alt route yardage map
        if (route.altRouteYardageMap && Array.isArray(route.altRouteYardageMap)) {
          const found = route.altRouteYardageMap.some(m => TrackDomain.normalizeElr(m.elr) === normElr);
          if (found) return route.code;
        }
      }
    } catch (err) {
      console.error('Error finding route for ELR:', err);
    }
    
    return null;
  }

  return {
    init,
    populateRouteSelector,
    findRouteCodeForElr
  };
})();
