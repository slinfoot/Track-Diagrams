// Modal Logic
// Handles generic modal behavior like dragging and initialization

const ModalManager = (function() {
  function makeModalDraggable(modalEl) {
    if (!modalEl) return;
    const content = modalEl.querySelector('.modal-content');
    const header = modalEl.querySelector('.modal-header');
    if (!content || !header) return;
  
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;
  
    function toPx(n) { return `${Math.round(n)}px`; }
  
    function onPointerDown(e) {
      // ignore right-click
      if (e.button === 2) return;
      isDragging = true;
      const rect = content.getBoundingClientRect();
      // ensure content is absolutely positioned so left/top work
      content.style.position = 'absolute';
      // prevent centering flex from moving it
      modalEl.style.alignItems = 'flex-start';
      modalEl.style.justifyContent = 'flex-start';
  
      origLeft = rect.left;
      origTop = rect.top;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      startY = (e.touches ? e.touches[0].clientY : e.clientY);
  
      // set initial left/top style
      content.style.left = toPx(origLeft);
      content.style.top = toPx(origTop);
  
      document.addEventListener('mousemove', onPointerMove);
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
      e.preventDefault();
    }
  
    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
      const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
      let dx = clientX - startX;
      let dy = clientY - startY;
  
      let nextLeft = origLeft + dx;
      let nextTop = origTop + dy;
  
      // Constrain to viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = content.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      nextLeft = Math.max(0, Math.min(nextLeft, vw - w));
      nextTop = Math.max(0, Math.min(nextTop, vh - h));
  
      content.style.left = toPx(nextLeft);
      content.style.top = toPx(nextTop);
  
      if (e.cancelable) e.preventDefault();
    }
  
    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }
  
    header.addEventListener('mousedown', onPointerDown);
    header.addEventListener('touchstart', onPointerDown, { passive: false });
  
    // When modal is hidden/shown, if shown centered we should clear inline positioning
    const observer = new MutationObserver(() => {
      if (modalEl.hasAttribute('hidden')) return;
      // If modal is visible and hasn't been moved, leave centering; otherwise keep absolute position
      // No-op; leaving to preserve moved position between opens.
    });
    observer.observe(modalEl, { attributes: true, attributeFilter: ['hidden'] });
  }

  function initDraggableModals() {
    document.querySelectorAll('.modal').forEach(m => makeModalDraggable(m));
  }

  return {
    makeModalDraggable,
    initDraggableModals
  };
})();
