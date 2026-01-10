
// UI Settings Module
// Handles View Controls and Sidebar Settings
const UISettings = (function() {
  // Elements
  const yardsPerPixelInput = document.getElementById('yardsPerPixelInput');
  const gridSpacingInput = document.getElementById('gridSpacingInput');
  const windowSizeInput = document.getElementById('windowSizeInput');
  const showArrayOverlays = document.getElementById('showArrayOverlays');
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
      if (showArrayOverlays) window.TrackDiagramApp?.setShowArrayOverlays(showArrayOverlays.checked);
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
