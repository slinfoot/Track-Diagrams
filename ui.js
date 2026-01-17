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

let isSyncingCalcFields = false;

function formatNumberForInput(value) {
  if (!Number.isFinite(value)) return '';
  // Prefer integers when we can; otherwise keep a few decimals.
  const roundedInt = Math.round(value);
  if (Math.abs(value - roundedInt) < 1e-9) return String(roundedInt);

  const fixed = value.toFixed(3);
  // Trim trailing zeros and trailing dot.
  return fixed.replace(/\.?(0+)$/, (m) => (m.startsWith('.') ? '' : '')).replace(/\.$/, '');
}

function syncCalcYardsFromChains() {
  if (!calcChains || !calcYards) return;
  if (isSyncingCalcFields) return;
  isSyncingCalcFields = true;
  try {
    const rawChains = String(calcChains.value ?? '').trim();
    if (rawChains === '') {
      calcYards.value = '';
      return;
    }
    const chainsVal = Number(rawChains);
    if (!Number.isFinite(chainsVal)) return;
    const yardsVal = chainsVal * 22;
    calcYards.value = formatNumberForInput(yardsVal);
  } finally {
    isSyncingCalcFields = false;
  }
}

function syncCalcChainsFromYards() {
  if (!calcChains || !calcYards) return;
  if (isSyncingCalcFields) return;
  isSyncingCalcFields = true;
  try {
    const rawYards = String(calcYards.value ?? '').trim();
    if (rawYards === '') {
      calcChains.value = '';
      return;
    }
    const yardsVal = Number(rawYards);
    if (!Number.isFinite(yardsVal)) return;
    const chainsVal = yardsVal / 22;
    calcChains.value = formatNumberForInput(chainsVal);
  } finally {
    isSyncingCalcFields = false;
  }
}

window.showYardsCalc = function(targetInput) {
  if (!yardsCalcModal) return;
  if (!targetInput) return;
  activeCalcInput = targetInput;
  const currentYards = Number(targetInput.value);
  const centerYards = window.TrackDiagramApp?.getCenterYards?.();
  // Populate based on the *current viewport center* (per UX request).
  // Only fall back to the target input value if we can't determine a center.
  const seedMainYards = Number.isFinite(centerYards)
    ? centerYards
    : (Number.isFinite(currentYards) ? currentYards : null);
  if (calcElr) calcElr.value = '';
  if (calcMiles) calcMiles.value = '';
  if (calcYards) calcYards.value = '';
  if (calcChains) calcChains.value = '';

  // Prefer showing ELR/mile/yard relative to a section (uses section.offset).
  // If the target input already has a value, use that; otherwise use the viewport center.
  const route = window.TrackDiagramApp?.getRoute?.();
  if (Number.isFinite(seedMainYards) && route && typeof TrackDomain !== 'undefined' && typeof TrackDomain.getElrAndRelativeYardsForMainYards === 'function') {
    const res = TrackDomain.getElrAndRelativeYardsForMainYards(route, seedMainYards);
    const elr = res?.elr;
    const rel = res?.relativeYards;

    if (calcElr && elr && elr !== '-') calcElr.value = String(elr);

    if (Number.isFinite(rel)) {
      const miles = Math.floor(rel / 1760);
      const yards = Math.round(rel % 1760);
      if (calcMiles) calcMiles.value = miles;
      if (calcYards) calcYards.value = yards;
    } else {
      // Fallback: show absolute route miles/yards.
      const miles = Math.floor(seedMainYards / 1760);
      const yards = Math.round(seedMainYards % 1760);
      if (calcMiles) calcMiles.value = miles;
      if (calcYards) calcYards.value = yards;
    }
  } else if (Number.isFinite(seedMainYards)) {
    // Minimal fallback: absolute route miles/yards.
    const miles = Math.floor(seedMainYards / 1760);
    const yards = Math.round(seedMainYards % 1760);
    if (calcMiles) calcMiles.value = miles;
    if (calcYards) calcYards.value = yards;
  }
  yardsCalcModal.hidden = false;

  // UX: focus ELR field immediately for quick typing.
  // Use a timeout to ensure focus happens after the modal becomes visible.
  if (calcElr) {
    setTimeout(() => {
      try {
        calcElr.focus();
        calcElr.select?.();
      } catch (e) {
        // ignore
      }
    }, 0);
  }
};

if (calcModalCloseBtn) calcModalCloseBtn.addEventListener('click', () => yardsCalcModal.hidden = true);
if (calcCancelBtn) calcCancelBtn.addEventListener('click', () => yardsCalcModal.hidden = true);

if (calcChains) calcChains.addEventListener('input', syncCalcYardsFromChains);
if (calcYards) calcYards.addEventListener('input', syncCalcChainsFromYards);

function applyCalcToActiveInput() {
  if (!activeCalcInput) return;
  const miles = Number(calcMiles?.value || 0);
  const yards = Number(calcYards?.value || 0);
  const elr = (calcElr?.value ?? '').toString().trim();

  let totalYards = null;

  // If ELR is provided and we have a loaded route + domain, use the same mapping
  // as the rest of the app (respects section offsets and alt-route yardage maps).
  if (elr && typeof TrackDomain !== 'undefined' && typeof TrackDomain.computeAbsoluteYards === 'function') {
    const route = window.TrackDiagramApp?.getRoute?.();
    const sectionsByElr = window.TrackDiagramApp?.getSectionsByElr?.() || new Map();
    const res = TrackDomain.computeAbsoluteYards(elr, miles, yards, route, sectionsByElr);
    if (res && res.value !== null && res.value !== undefined && Number.isFinite(Number(res.value))) {
      totalYards = Number(res.value);
    } else if (res?.error) {
      window.alert(res.error);
      return; // Exit early on error - don't apply incorrect values
    }
  }

  // Fallback: treat inputs as main-route miles/yards/chains (only if no ELR specified).
  if (totalYards === null) {
    const m = Number.isFinite(miles) ? miles : 0;
    totalYards = (m * 1760) + yards;
  }

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
