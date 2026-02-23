// Xnapture — Region Selection Content Script

(function () {
  'use strict';

  // Prevent double injection
  if (window.__xnaptureSelectionActive) return;

  let overlay = null;
  let overlayBg = null;
  let selectionBox = null;
  let dimensionsLabel = null;
  let instructions = null;
  let startX = 0, startY = 0;
  let selecting = false;
  let active = false;

  function createOverlay() {
    // Main overlay container
    overlay = document.createElement('div');
    overlay.id = 'xnapture-overlay';

    // Dark background
    overlayBg = document.createElement('div');
    overlayBg.id = 'xnapture-overlay-bg';
    overlay.appendChild(overlayBg);

    // Selection rectangle
    selectionBox = document.createElement('div');
    selectionBox.id = 'xnapture-selection-box';

    dimensionsLabel = document.createElement('div');
    dimensionsLabel.id = 'xnapture-dimensions';
    selectionBox.appendChild(dimensionsLabel);

    overlay.appendChild(selectionBox);

    // Instructions
    instructions = document.createElement('div');
    instructions.id = 'xnapture-instructions';
    instructions.innerHTML = 'Click and drag to select region<br><kbd>Esc</kbd> to cancel';
    overlay.appendChild(instructions);

    document.body.appendChild(overlay);
  }

  function updateSelectionBox(x1, y1, x2, y2) {
    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    selectionBox.style.left = left + 'px';
    selectionBox.style.top = top + 'px';
    selectionBox.style.width = width + 'px';
    selectionBox.style.height = height + 'px';
    selectionBox.style.display = 'block';

    dimensionsLabel.textContent = `${Math.round(width)} × ${Math.round(height)}`;
  }

  function cleanup() {
    window.__xnaptureSelectionActive = false;
    active = false;
    selecting = false;

    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }

    overlay = null;
    overlayBg = null;
    selectionBox = null;
    dimensionsLabel = null;
    instructions = null;

    document.removeEventListener('mousedown', onMouseDown, true);
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('keydown', onKeyDown, true);
  }

  function onMouseDown(e) {
    if (!active) return;
    e.preventDefault();
    e.stopPropagation();

    startX = e.clientX;
    startY = e.clientY;
    selecting = true;

    // Hide instructions once user starts selecting
    if (instructions) {
      instructions.style.opacity = '0';
    }
  }

  function onMouseMove(e) {
    if (!active || !selecting) return;
    e.preventDefault();
    updateSelectionBox(startX, startY, e.clientX, e.clientY);
  }

  function onMouseUp(e) {
    if (!active || !selecting) return;
    e.preventDefault();
    e.stopPropagation();

    selecting = false;

    const endX = e.clientX;
    const endY = e.clientY;

    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    // Ignore tiny selections (accidental clicks)
    if (width < 10 || height < 10) {
      cleanup();
      return;
    }

    const rect = {
      x: left,
      y: top,
      width: width,
      height: height,
      dpr: window.devicePixelRatio || 1,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };

    cleanup();

    // Wait two animation frames so the browser repaints the page
    // without the overlay before captureVisibleTab runs.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        chrome.runtime.sendMessage({ action: 'CAPTURE_REGION', rect });
      });
    });
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      cleanup();
    }
  }

  function startSelection() {
    if (window.__xnaptureSelectionActive) return;
    window.__xnaptureSelectionActive = true;
    active = true;

    createOverlay();

    document.addEventListener('mousedown', onMouseDown, true);
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
    document.addEventListener('keydown', onKeyDown, true);
  }

  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'START_SELECTION') {
      startSelection();
      sendResponse({ status: 'started' });
    }
    return true;
  });

})();
