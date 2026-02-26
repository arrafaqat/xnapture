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
        // Store CSS pixel dimensions so dashboard can display at correct size
        openDashboard(croppedDataUrl, { cssWidth: msg.rect.width, cssHeight: msg.rect.height });
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

  if (msg.action === 'LAUNCH_PRO_AUTH') {
    const email = msg.email;
    const extensionId = chrome.runtime.id;
    const redirectUri = `https://${extensionId}.chromiumapp.org/callback`;
    const authUrl = `https://xnapture.com/auth/start?email=${encodeURIComponent(email)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      (responseUrl) => {
        if (chrome.runtime.lastError || !responseUrl) {
          sendResponse({ success: false, error: chrome.runtime.lastError?.message || 'Auth cancelled' });
          return;
        }

        let sessionToken;
        try {
          const url = new URL(responseUrl);
          sessionToken = url.searchParams.get('session_token');
        } catch {
          sendResponse({ success: false, error: 'Invalid redirect URL' });
          return;
        }

        if (!sessionToken) {
          sendResponse({ success: false, error: 'No session token in redirect' });
          return;
        }

        fetch('https://xnapture.com/api/auth/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_token: sessionToken })
        })
          .then(r => r.json())
          .then(data => {
            if (data.valid && data.plan === 'pro') {
              chrome.storage.local.set({
                xnaptureProEmail: { email: data.email, plan: 'pro' }
              });
              sendResponse({ success: true, email: data.email });
            } else {
              sendResponse({ success: false, error: data.error || 'Not a Pro account' });
            }
          })
          .catch(err => sendResponse({ success: false, error: err.message }));
      }
    );
    return true; // keep message channel open for async response
  }
});

function openDashboard(dataUrl, meta = null) {
  const data = { pendingScreenshot: dataUrl };
  if (meta) data.pendingScreenshotMeta = meta;
  chrome.storage.session.set(data, () => {
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
