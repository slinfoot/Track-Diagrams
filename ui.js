// UI Core Orchestrator
// Initializes modules and handles high-level events

// Ensure dependencies
if (typeof UISettings === 'undefined' || typeof UINavigation === 'undefined' || typeof UIEditor === 'undefined') {
  console.error('UI Modules not loaded correctly.');
}

window.addEventListener('DOMContentLoaded', async () => {
  console.log('UI Core Initializing...');

  // Initialize Sub-modules
  UISettings.init();
  UINavigation.init();
  UIEditor.init();
  
  // Initialize Draggable Modals (from modal.js)
  if (typeof ModalManager !== 'undefined') {
    ModalManager.initDraggableModals();
  }

  // Sync settings
  UISettings.syncWithApp();
  
  // Check URL Overlays
  try {
    const url = new URL(window.location.href);
    const overlayElr = url.searchParams.get('elr');
    
    if (overlayElr) {
      console.log('Found overlay ELR:', overlayElr);
      const routeCode = await UINavigation.findRouteCodeForElr(overlayElr);
      
      if (routeCode) {
        await UINavigation.populateRouteSelector();
        // Set selector value manually since we are about to load it
        const selector = document.getElementById('routeSelector');
        if (selector) selector.value = routeCode;
        
        window.TrackDiagramApp?.loadRoute(routeCode);
        return;
      }
    }
  } catch (err) {
    console.error('Error auto-loading route:', err);
  }
  
  // Default Load
  UINavigation.populateRouteSelector();
});

// Global Calculator Helpers
const yardsCalcModal = document.getElementById('yardsCalcModal');
const yardsCalcForm = document.getElementById('yardsCalcForm');
const calcElr = document.getElementById('calcElr');
const calcMiles = document.getElementById('calcMiles');
const calcYards = document.getElementById('calcYards');
const calcModalCloseBtn = document.getElementById('calcModalCloseBtn');
const calcCancelBtn = document.getElementById('calcCancelBtn');

window.showYardsCalc = function(targetInput) {
  if (!yardsCalcModal) return;
  const currentYards = Number(targetInput.value);
  if (calcElr) calcElr.value = '';
  if (calcMiles) calcMiles.value = '';
  if (calcYards) calcYards.value = '';

  if (Number.isFinite(currentYards)) {
      const miles = Math.floor(currentYards / 1760);
      const yards = Math.round(currentYards % 1760);
      if (calcMiles) calcMiles.value = miles;
      if (calcYards) calcYards.value = yards;
  }
  yardsCalcModal.hidden = false;
};

if (calcModalCloseBtn) calcModalCloseBtn.addEventListener('click', () => yardsCalcModal.hidden = true);
if (calcCancelBtn) calcCancelBtn.addEventListener('click', () => yardsCalcModal.hidden = true);
