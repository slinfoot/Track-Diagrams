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
  
  // URL Overlay handling is performed by script.js to prevent race conditions.
  // We only need to populate the route selector here.
  
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
