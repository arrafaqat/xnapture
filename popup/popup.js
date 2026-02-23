// Snap.shot — Popup Script

document.addEventListener('DOMContentLoaded', () => {
  const btnScreen = document.getElementById('btn-capture-screen');
  const btnRegion = document.getElementById('btn-select-region');

  // Capture full visible tab
  btnScreen.addEventListener('click', async () => {
    btnScreen.classList.add('loading');
    btnScreen.querySelector('.btn-icon').textContent = '';

    try {
      // Close popup first so it doesn't appear in screenshot
      // We use a small delay to let the popup close
      chrome.runtime.sendMessage({ action: 'CAPTURE_VISIBLE' });
      window.close();
    } catch (err) {
      console.error('Capture error:', err);
      btnScreen.classList.remove('loading');
      btnScreen.querySelector('.btn-icon').textContent = '📸';
    }
  });

  // Select region — inject selection overlay
  btnRegion.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab || !tab.id) {
        console.error('No active tab found');
        return;
      }

      // Check if we can inject into this tab (not chrome:// pages, etc.)
      if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('about:'))) {
        alert('Cannot capture Chrome internal pages. Please navigate to a regular webpage.');
        return;
      }

      // Send message to content script to start selection
      chrome.tabs.sendMessage(tab.id, { action: 'START_SELECTION' }, (response) => {
        if (chrome.runtime.lastError) {
          // Content script might not be injected yet, inject it then retry
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content/selection.js']
          }).then(() => {
            chrome.tabs.sendMessage(tab.id, { action: 'START_SELECTION' });
            window.close();
          }).catch(err => {
            console.error('Failed to inject content script:', err);
            window.close();
          });
        } else {
          // Content script already present — safe to close now
          window.close();
        }
      });
    } catch (err) {
      console.error('Region selection error:', err);
    }
  });
});
