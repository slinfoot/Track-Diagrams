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
const calcChains = document.getElementById('calcChains');
const calcModalCloseBtn = document.getElementById('calcModalCloseBtn');
const calcCancelBtn = document.getElementById('calcCancelBtn');
const calcOkBtn = document.getElementById('calcOkBtn');

let activeCalcInput = null;

window.showYardsCalc = function(targetInput) {
  if (!yardsCalcModal) return;
  if (!targetInput) return;
  activeCalcInput = targetInput;
  const currentYards = Number(targetInput.value);
  if (calcElr) calcElr.value = '';
  if (calcMiles) calcMiles.value = '';
  if (calcYards) calcYards.value = '';
  if (calcChains) calcChains.value = '';

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

function applyCalcToActiveInput() {
  if (!activeCalcInput) return;
  const miles = Number(calcMiles?.value || 0);
  const yards = Number(calcYards?.value || 0);
  const chains = Number(calcChains?.value || 0);
  // 1 mile = 1760 yards, 1 chain = 22 yards
  const totalYards = (miles * 1760) + yards + (chains * 22);
  activeCalcInput.value = String(Math.round(totalYards));
  activeCalcInput.dispatchEvent(new Event('input', { bubbles: true }));
  activeCalcInput.dispatchEvent(new Event('change', { bubbles: true }));
}

if (yardsCalcForm) {
  yardsCalcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    applyCalcToActiveInput();
    yardsCalcModal.hidden = true;
  });
}

if (calcOkBtn) {
  calcOkBtn.addEventListener('click', (e) => {
    // Button is inside a form; prevent any default navigation.
    e.preventDefault();
    applyCalcToActiveInput();
    yardsCalcModal.hidden = true;
  });
}

// Delegate clicks for 📍 buttons across all modals/tables.
document.addEventListener('click', (e) => {
  const btn = e.target.closest?.('.btn-calc');
  if (!btn) return;

  // Primary path: explicit target id.
  if (btn.dataset?.target) {
    const targetEl = document.getElementById(btn.dataset.target);
    if (targetEl && window.showYardsCalc) window.showYardsCalc(targetEl);
    return;
  }

  // Fallback: find input within the same input-with-calc wrapper.
  const wrapper = btn.closest?.('.input-with-calc');
  const input = wrapper?.querySelector?.('input');
  if (input && window.showYardsCalc) window.showYardsCalc(input);
});
