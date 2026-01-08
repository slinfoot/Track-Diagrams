// Viewport State Management
// This object tracks the current state of the diagram viewport including
// scroll position, zoom level (yards per pixel), and visible area.

const ViewportManager = (function() {
  const state = {
    lastCenterYards: null,
    lastVisibleCenterYards: null,
    lastScrollTopPx: null,
    lastScrollLeftPx: null,
    lastShowFromYards: null,
    lastYardsPerPixel: null,
    boundContainer: null,
    isMouseDownInDiagram: false,
    lastNearEdge: false
  };

  function captureFromDom() {
    if (!state.boundContainer) return;

    state.lastScrollTopPx = state.boundContainer.scrollTop;
    state.lastScrollLeftPx = state.boundContainer.scrollLeft;

    if (Number.isFinite(state.lastShowFromYards) && Number.isFinite(state.lastYardsPerPixel)) {
      const visibleCenterX = state.boundContainer.scrollLeft + (state.boundContainer.clientWidth / 2);
      const visibleCenterYards = state.lastShowFromYards + (visibleCenterX * state.lastYardsPerPixel);
      if (Number.isFinite(visibleCenterYards)) {
        state.lastCenterYards = visibleCenterYards;
        state.lastVisibleCenterYards = visibleCenterYards;
      }
    }
  }

  function getstate() {
    return state;
  }

  function bindContainer(container) {
    state.boundContainer = container;
  }

  return {
    state,
    captureFromDom,
    bindContainer
  };
})();
