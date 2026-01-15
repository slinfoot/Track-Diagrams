
// UI Settings Module
// Handles View Controls and Sidebar Settings
const UISettings = (function() {
  // Elements
  const yardsPerPixelInput = document.getElementById('yardsPerPixelInput');
  const gridSpacingInput = document.getElementById('gridSpacingInput');
  const scrollSizeInput = document.getElementById('scrollSizeInput');
  const showUrlOverlays = document.getElementById('showUrlOverlays');
  const showAltElrRulers = document.getElementById('showAltElrRulers');

  function init() {
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

    if (scrollSizeInput) {
      scrollSizeInput.addEventListener('input', () => {
        const v = parseFloat(scrollSizeInput.value);
        if (Number.isFinite(v) && v > 0) {
          window.TrackDiagramApp?.setScrollSizeMiles(v);
        }
      });
    }

    if (showUrlOverlays) {
      showUrlOverlays.addEventListener('change', () => {
        window.TrackDiagramApp?.setShowUrlOverlays(showUrlOverlays.checked);
      });
    }

    if (showAltElrRulers) {
      showAltElrRulers.addEventListener('change', () => {
        window.TrackDiagramApp?.setShowAltRulers(showAltElrRulers.checked);
      });
    }
  }

  function syncWithApp() {
    // Force UI checkbox state to app (useful on load)
    try {
      if (showAltElrRulers) window.TrackDiagramApp?.setShowAltRulers(showAltElrRulers.checked);
      if (showUrlOverlays) window.TrackDiagramApp?.setShowUrlOverlays(showUrlOverlays.checked);
    } catch (e) {
      console.warn('Failed to sync UI toggles with TrackDiagramApp:', e);
    }
  }

  return {
    init,
    syncWithApp
  };
})();
