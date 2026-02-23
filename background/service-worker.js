// Xnapture — Background Service Worker

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'CAPTURE_VISIBLE') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error('Capture error:', chrome.runtime.lastError);
        return;
      }
      openDashboard(dataUrl);
    });
    return true;
  }

  if (msg.action === 'CAPTURE_REGION') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error('Capture error:', chrome.runtime.lastError);
        return;
      }
      try {
        const croppedDataUrl = await cropImage(dataUrl, msg.rect);
        openDashboard(croppedDataUrl);
      } catch (err) {
        console.error('Crop error:', err);
        openDashboard(dataUrl);
      }
    });
    return true;
  }

  if (msg.action === 'OPEN_DASHBOARD') {
    openDashboard(msg.dataUrl);
    return true;
  }
});

function openDashboard(dataUrl) {
  chrome.storage.session.set({ pendingScreenshot: dataUrl }, () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('dashboard/dashboard.html')
    });
  });
}

async function cropImage(dataUrl, rect) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  const { x, y, width, height, dpr = 1 } = rect;

  // Ensure valid dimensions
  const cropX = Math.max(0, Math.round(x * dpr));
  const cropY = Math.max(0, Math.round(y * dpr));
  const cropW = Math.max(1, Math.round(width * dpr));
  const cropH = Math.max(1, Math.round(height * dpr));

  const canvas = new OffscreenCanvas(cropW, cropH);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

  const outBlob = await canvas.convertToBlob({ type: 'image/png' });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(outBlob);
  });
}
