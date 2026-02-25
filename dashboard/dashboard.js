// Xnapture — Dashboard Main Script
'use strict';

// ══════════════════════════════════════════════════════════════
// CONSTANTS & DATA
// ══════════════════════════════════════════════════════════════

const GRADIENTS = [
  { name: 'Sunset',      value: 'linear-gradient(135deg, #ff6b6b, #ffd93d)' },
  { name: 'Ocean',       value: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Emerald',     value: 'linear-gradient(135deg, #10b981, #06b6d4)' },
  { name: 'Aurora',      value: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { name: 'Midnight',    value: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { name: 'Rose',        value: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'Gold',        value: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { name: 'Forest',      value: 'linear-gradient(135deg, #134e5e, #71b280)' },
  { name: 'Candy',       value: 'linear-gradient(135deg, #fddb92, #d1fdff)' },
  { name: 'Dusk',        value: 'linear-gradient(135deg, #2c3e50, #3498db)' },
  { name: 'Peach',       value: 'linear-gradient(135deg, #feac5e, #c779d0, #4bc0c8)' },
  { name: 'Lava',        value: 'linear-gradient(135deg, #f12711, #f5af19)' },
  { name: 'Aqua',        value: 'linear-gradient(135deg, #13547a, #80d0c7)' },
  { name: 'Plum',        value: 'linear-gradient(135deg, #4776e6, #8e54e9)' },
  { name: 'Mint',        value: 'linear-gradient(135deg, #0f9b58, #00bf8f)' },
  { name: 'Neon',        value: 'linear-gradient(135deg, #f953c6, #b91d73)' },
];

const FLAT_COLORS = [
  '#0f2e25', '#1a4d3a', '#10b981', '#34d399', '#6ee7b7',
  '#064e3b', '#065f46', '#047857', '#059669', '#a7f3d0',
  '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8',
  '#0f172a', '#1e40af', '#2563eb', '#3b82f6', '#60a5fa',
  '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe',
  '#dc2626', '#ef4444', '#f97316', '#fbbf24', '#fde047',
];

const RATIOS = [
  { label: 'Auto',      id: 'auto',      w: null,  h: null  },
  { label: '4:3',       id: '4-3',       w: 1600,  h: 1200  },
  { label: '3:2',       id: '3-2',       w: 1500,  h: 1000  },
  { label: '16:9',      id: '16-9',      w: 1920,  h: 1080  },
  { label: '1:1',       id: '1-1',       w: 1200,  h: 1200  },
  { label: 'Twitter',   id: 'twitter',   w: 1600,  h: 900   },
  { label: 'Facebook',  id: 'facebook',  w: 1200,  h: 630   },
  { label: 'Instagram', id: 'instagram', w: 1080,  h: 1080  },
  { label: 'Custom',    id: 'custom',    w: null,  h: null  },
];

// Built-in gradient backgrounds (as CSS gradients rendered to canvas-like thumbnails)
const BG_IMAGES = [
  { name: 'Gradient 1',   bg: '../assets/background-images/gradient-1.jpg',   isFile: true },
  { name: 'Gradient 2',   bg: '../assets/background-images/gradient-2.webp',  isFile: true },
  { name: 'Gradient 3',   bg: '../assets/background-images/gradient-3.jpg',   isFile: true },
  { name: 'Gradient 5',   bg: '../assets/background-images/gradient-5.png',   isFile: true },
  { name: 'Gradient 6',   bg: '../assets/background-images/gradient-6.jpg',   isFile: true },
  { name: 'Gradient 7',   bg: '../assets/background-images/gradient-7.jpg',   isFile: true },
  { name: 'Gradient 8',   bg: '../assets/background-images/gradient-8.jpg',   isFile: true },
  { name: 'Gradient 9',   bg: '../assets/background-images/gradient-9.jpg',   isFile: true },
  { name: 'Cyberpunk',    bg: '../assets/background-images/cyberpunk-4.png',  isFile: true },
  { name: 'Mesh 1',    bg: 'radial-gradient(at 40% 20%, #ff6b6b 0%, transparent 50%), radial-gradient(at 80% 0%, #ffd93d 0%, transparent 50%), radial-gradient(at 0% 50%, #667eea 0%, transparent 50%), radial-gradient(at 50% 100%, #10b981 0%, transparent 50%), #0f2e25' },
  { name: 'Mesh 2',    bg: 'radial-gradient(at 0% 0%, #f093fb 0%, transparent 50%), radial-gradient(at 100% 100%, #4bc0c8 0%, transparent 50%), radial-gradient(at 50% 50%, #f5576c 0%, transparent 70%), #1e1b4b' },
  { name: 'Mesh 3',    bg: 'radial-gradient(at 50% 0%, #ffecd2 0%, transparent 60%), radial-gradient(at 0% 100%, #fcb69f 0%, transparent 60%), #f7971e' },
  { name: 'Noise 1',   bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Abstract',  bg: 'conic-gradient(from 45deg at 30% 70%, #10b981, #06b6d4, #667eea, #f093fb, #10b981)' },
  { name: 'Calm',      bg: 'linear-gradient(160deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Deep Sea',  bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { name: 'Lush',      bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { name: 'Blaze',     bg: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { name: 'Twilight',  bg: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)' },
  { name: 'Cosmic',    bg: 'radial-gradient(ellipse at top, #4776e6 0%, #8e54e9 40%, #0f0c29 100%)' },
  { name: 'Spring',    bg: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)' },
];

const VIDEO_PRESETS = [
  { name: 'Particles',  emoji: '✨', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
  { name: 'Bokeh',      emoji: '🌸', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: 'Waves',      emoji: '🌊', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { name: 'Aurora',     emoji: '🌌', gradient: 'linear-gradient(135deg, #134e5e, #71b280)' },
  { name: 'Fire',       emoji: '🔥', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
  { name: 'Clouds',     emoji: '☁️', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
];

const DEFAULTS = {
  padding: 48,
  inset: 0,
  insetColor: '#ffffff',
  borderRadius: 16,
  shadow: 50,
  bgType: 'gradient',
  bgValue: 'linear-gradient(135deg, #10b981, #06b6d4)',
  ratio: 'auto',
  customWidth: 1920,
  customHeight: 1080,
  removeWatermark: false,
  gradColor1: '#10b981',
  gradColor2: '#06b6d4',
  gradAngle: 135,
  colorOpacity: 100,
  videoDuration: 10,  // seconds
};

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════

let state = { ...DEFAULTS };
let screenshotDataUrl = null;
let currentZoom = 1;
let currentBgTab = 'gradients';
let currentVideoPreset = null;
let customUploadedBgUrl = null;
let customUploadedVideoUrl = null;
let mediaRecorder = null;
let presets = [];

// ══════════════════════════════════════════════════════════════
// DOM REFERENCES
// ══════════════════════════════════════════════════════════════

const $ = (id) => document.getElementById(id);

const els = {
  // Sliders
  sliderPadding:  $('slider-padding'),
  sliderInset:    $('slider-inset'),
  sliderRadius:   $('slider-radius'),
  sliderShadow:   $('slider-shadow'),
  valPadding:     $('val-padding'),
  valInset:       $('val-inset'),
  valRadius:      $('val-radius'),
  valShadow:      $('val-shadow'),

  // Watermark
  toggleWatermark: $('toggle-watermark'),

  // Gradient builder
  gradColor1:     $('grad-color1'),
  gradColor2:     $('grad-color2'),
  gradAngle:      $('grad-angle'),
  valGradAngle:   $('val-grad-angle'),
  gradPreviewBar: $('grad-preview-bar'),

  // Color controls
  customColor:    $('custom-color'),
  hexInput:       $('hex-input'),
  colorOpacity:   $('color-opacity'),
  valColorOpacity:$('val-color-opacity'),

  // Stage
  stageWrapper:   $('stage-wrapper'),
  stage:          $('stage'),
  stageBg:        $('stage-bg'),
  screenshotFrame:$('screenshot-frame'),
  screenshotMat:  $('screenshot-mat'),
  screenshotImg:  $('screenshot-img'),
  watermarkBadge: $('watermark-badge'),
  canvasEmpty:    $('canvas-empty'),

  // Toolbar
  zoomSelect:     $('zoom-select'),
  btnCopy:        $('btn-copy'),
  btnExportPng:   $('btn-export-png'),
  btnExportJpg:   $('btn-export-jpg'),
  btnExportWebm:  $('btn-export-webm'),

  // Export tab
  exportPngMain:  $('export-png-main'),
  exportJpgMain:  $('export-jpg-main'),
  exportWebmMain: $('export-webm-main'),
  copyClipboardMain: $('copy-clipboard-main'),

  // Video duration
  videoDurationPanel:   $('video-duration-panel'),
  videoDurationToolbar: $('video-duration-toolbar'),

  // Header
  btnNewCapture:  $('btn-new-capture'),
  btnReset:       $('btn-reset'),

  // Custom ratio
  customRatioRow: $('custom-ratio-row'),
  customWidth:    $('custom-width'),
  customHeight:   $('custom-height'),

  // Upload buttons
  btnUploadBg:    $('btn-upload-bg'),
  inputUploadBg:  $('input-upload-bg'),
  btnUploadVideo: $('btn-upload-video'),
  inputUploadVideo: $('input-upload-video'),

  // Inset color
  insetColorRow:    $('inset-color-row'),
  insetColorPicker: $('inset-color-picker'),
  btnAutoDetect:    $('btn-auto-detect'),

  // Presets
  presetsList:    $('presets-list'),
  presetNameInput: $('preset-name-input'),
  btnSavePreset:  $('btn-save-preset'),

  // Toast
  toast:          $('toast'),
};

// ══════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════

async function init() {
  // Load saved settings first
  await loadSettings();

  // Load screenshot from session storage
  await loadScreenshot();

  // Load user presets
  await loadPresets();

  // Build dynamic UI
  buildGradientGrid();
  buildColorGrid();
  buildImageGrid();
  buildVideoGrid();
  buildRatioGrid();

  // Attach event listeners
  attachEvents();

  // Apply initial state to UI
  applyStateToUI();

  // Initial preview render
  updatePreview();
}

async function loadScreenshot() {
  try {
    const result = await chrome.storage.session.get('pendingScreenshot');
    if (result.pendingScreenshot) {
      screenshotDataUrl = result.pendingScreenshot;
      els.screenshotImg.src = screenshotDataUrl;
      els.canvasEmpty.style.display = 'none';
      els.stageWrapper.style.display = 'flex';
      // Clear from session to free memory
      chrome.storage.session.remove('pendingScreenshot');
    }
  } catch (err) {
    console.error('Failed to load screenshot:', err);
  }
}

async function loadSettings() {
  try {
    const result = await chrome.storage.local.get('xnaptureSettings');
    if (result.xnaptureSettings) {
      state = { ...DEFAULTS, ...result.xnaptureSettings };
    }
  } catch (err) {
    console.warn('Failed to load settings:', err);
  }
}

function saveSettings() {
  try {
    chrome.storage.local.set({ xnaptureSettings: { ...state } });
  } catch (err) {
    console.warn('Failed to save settings:', err);
  }
}

// ══════════════════════════════════════════════════════════════
// BUILD UI COMPONENTS
// ══════════════════════════════════════════════════════════════

function buildGradientGrid() {
  const grid = $('gradient-grid');
  grid.innerHTML = '';
  GRADIENTS.forEach((g, i) => {
    const swatch = document.createElement('div');
    swatch.className = 'gradient-swatch';
    swatch.style.background = g.value;
    swatch.setAttribute('aria-label', `${g.name} gradient`);
    swatch.setAttribute('role', 'button');
    swatch.setAttribute('tabindex', '0');
    swatch.title = g.name;
    if (state.bgType === 'gradient' && state.bgValue === g.value) {
      swatch.classList.add('selected');
    }
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.gradient-swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      state.bgType = 'gradient';
      state.bgValue = g.value;
      updatePreview();
      saveSettings();
    });
    swatch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') swatch.click();
    });
    grid.appendChild(swatch);
  });
}

function buildColorGrid() {
  const grid = $('color-swatch-grid');
  grid.innerHTML = '';
  FLAT_COLORS.forEach((color) => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.background = color;
    swatch.setAttribute('aria-label', `Color ${color}`);
    swatch.setAttribute('role', 'button');
    swatch.setAttribute('tabindex', '0');
    swatch.title = color;
    if (state.bgType === 'color' && state.bgValue === color) {
      swatch.classList.add('selected');
    }
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      state.bgType = 'color';
      state.bgValue = color;
      els.hexInput.value = color;
      els.customColor.value = color;
      updatePreview();
      saveSettings();
    });
    swatch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') swatch.click();
    });
    grid.appendChild(swatch);
  });
}

function buildImageGrid() {
  const grid = $('bg-image-grid');
  grid.innerHTML = '';
  BG_IMAGES.forEach((img, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'bg-thumb';
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-label', img.name);
    thumb.title = img.name;

    const preview = document.createElement('div');
    preview.className = 'bg-thumb-preview';
    if (img.isFile) {
      preview.style.backgroundImage = `url('${img.bg}')`;
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundPosition = 'center';
    } else {
      preview.style.background = img.bg;
    }
    thumb.appendChild(preview);

    if (state.bgType === 'image-preset' && state.bgValue === img.bg) {
      thumb.classList.add('selected');
    }

    thumb.addEventListener('click', () => {
      document.querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('selected'));
      thumb.classList.add('selected');
      state.bgType = 'image-preset';
      state.bgValue = img.bg;
      updatePreview();
      saveSettings();
    });
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') thumb.click();
    });
    grid.appendChild(thumb);
  });
}

function buildVideoGrid() {
  const grid = $('video-grid');
  grid.innerHTML = '';
  VIDEO_PRESETS.forEach((v, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'video-thumb';
    thumb.style.background = v.gradient;
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-label', `${v.name} video background`);
    thumb.title = v.name;

    const indicator = document.createElement('div');
    indicator.className = 'play-indicator';
    indicator.textContent = v.emoji;
    thumb.appendChild(indicator);

    thumb.addEventListener('click', () => {
      document.querySelectorAll('.video-thumb').forEach(t => t.classList.remove('selected'));
      thumb.classList.add('selected');
      currentVideoPreset = v;
      state.bgType = 'video-preset';
      state.bgValue = v.gradient;
      setVideoExportEnabled(true);
      updatePreview();
      saveSettings();
    });
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') thumb.click();
    });
    grid.appendChild(thumb);
  });
}

function buildRatioGrid() {
  const grid = $('ratio-grid');
  grid.innerHTML = '';
  RATIOS.forEach((r) => {
    const btn = document.createElement('button');
    btn.className = 'ratio-btn';
    btn.textContent = r.label;
    btn.dataset.ratio = r.id;
    if (state.ratio === r.id) btn.classList.add('active');

    btn.addEventListener('click', () => {
      document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.ratio = r.id;
      els.customRatioRow.style.display = r.id === 'custom' ? 'flex' : 'none';
      updatePreview();
      saveSettings();
    });
    grid.appendChild(btn);
  });
}

// ══════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════════════════

function attachEvents() {
  // Slider: Padding
  els.sliderPadding.addEventListener('input', () => {
    state.padding = parseInt(els.sliderPadding.value);
    els.valPadding.textContent = state.padding + 'px';
    els.sliderPadding.setAttribute('aria-valuenow', state.padding);
    updatePreview();
    saveSettings();
  });

  // Slider: Inset
  els.sliderInset.addEventListener('input', () => {
    state.inset = parseInt(els.sliderInset.value);
    els.valInset.textContent = state.inset + 'px';
    els.sliderInset.setAttribute('aria-valuenow', state.inset);
    updatePreview();
    saveSettings();
  });

  // Inset color picker
  if (els.insetColorPicker) {
    els.insetColorPicker.addEventListener('input', () => {
      state.insetColor = els.insetColorPicker.value;
      updatePreview();
      saveSettings();
    });
  }

  // Auto-detect inset color from screenshot background
  if (els.btnAutoDetect) {
    els.btnAutoDetect.addEventListener('click', () => {
      const detected = detectScreenshotBgColor();
      state.insetColor = detected;
      if (els.insetColorPicker) els.insetColorPicker.value = detected;
      updatePreview();
      saveSettings();
      showToast('✓ Color auto-detected');
    });
  }

  // Slider: Border Radius
  els.sliderRadius.addEventListener('input', () => {
    state.borderRadius = parseInt(els.sliderRadius.value);
    els.valRadius.textContent = state.borderRadius + 'px';
    els.sliderRadius.setAttribute('aria-valuenow', state.borderRadius);
    updatePreview();
    saveSettings();
  });

  // Slider: Shadow
  els.sliderShadow.addEventListener('input', () => {
    state.shadow = parseInt(els.sliderShadow.value);
    els.valShadow.textContent = state.shadow + '%';
    els.sliderShadow.setAttribute('aria-valuenow', state.shadow);
    updatePreview();
    saveSettings();
  });

  // Watermark toggle — Pro-gated
  els.toggleWatermark.addEventListener('change', async () => {
    // Unchecking: always allow (show watermark again)
    if (!els.toggleWatermark.checked) {
      state.removeWatermark = false;
      if (els.watermarkBadge) els.watermarkBadge.classList.remove('hidden');
      saveSettings();
      return;
    }
    // Checking: verify Pro status first
    const proData = await getProStatus();
    if (proData && proData.plan === 'pro') {
      state.removeWatermark = true;
      if (els.watermarkBadge) els.watermarkBadge.classList.add('hidden');
      saveSettings();
    } else {
      // Revert toggle and open upgrade modal
      els.toggleWatermark.checked = false;
      showProModal();
    }
  });

  // Header tabs
  document.querySelectorAll('.header-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      document.querySelectorAll('.header-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.tab-content').forEach(c => {
        c.style.display = c.dataset.tab === tabId ? 'block' : 'none';
      });
    });
  });

  // Background sub-tabs
  document.querySelectorAll('.bg-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.bgtab;
      currentBgTab = tabId;
      document.querySelectorAll('.bg-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.bg-panel-content').forEach(c => {
        c.classList.toggle('active', c.dataset.bgtabContent === tabId);
      });
    });
  });

  // Gradient builder
  const updateCustomGradient = () => {
    const angle = els.gradAngle.value;
    const c1 = els.gradColor1.value;
    const c2 = els.gradColor2.value;
    const grad = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    els.gradPreviewBar.style.background = grad;
    els.valGradAngle.textContent = angle + '°';
    state.bgType = 'gradient';
    state.bgValue = grad;
    state.gradColor1 = c1;
    state.gradColor2 = c2;
    state.gradAngle = parseInt(angle);
    // Deselect all gradient swatches
    document.querySelectorAll('.gradient-swatch').forEach(s => s.classList.remove('selected'));
    updatePreview();
    saveSettings();
  };
  els.gradColor1.addEventListener('input', updateCustomGradient);
  els.gradColor2.addEventListener('input', updateCustomGradient);
  els.gradAngle.addEventListener('input', updateCustomGradient);

  // Color picker
  els.customColor.addEventListener('input', () => {
    const color = els.customColor.value;
    els.hexInput.value = color;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    state.bgType = 'color';
    state.bgValue = color;
    updatePreview();
    saveSettings();
  });

  els.hexInput.addEventListener('input', () => {
    const val = els.hexInput.value;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      els.customColor.value = val;
      state.bgType = 'color';
      state.bgValue = val;
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      updatePreview();
      saveSettings();
    }
  });

  els.colorOpacity.addEventListener('input', () => {
    state.colorOpacity = parseInt(els.colorOpacity.value);
    els.valColorOpacity.textContent = state.colorOpacity + '%';
    updatePreview();
    saveSettings();
  });

  // Upload image background
  els.btnUploadBg.addEventListener('click', () => els.inputUploadBg.click());
  els.inputUploadBg.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    customUploadedBgUrl = url;
    state.bgType = 'image-url';
    state.bgValue = 'uploaded';
    updatePreview();
    saveSettings();
  });

  // Drag and drop for image upload
  els.btnUploadBg.addEventListener('dragover', (e) => {
    e.preventDefault();
    els.btnUploadBg.classList.add('dragover');
  });
  els.btnUploadBg.addEventListener('dragleave', () => {
    els.btnUploadBg.classList.remove('dragover');
  });
  els.btnUploadBg.addEventListener('drop', (e) => {
    e.preventDefault();
    els.btnUploadBg.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      customUploadedBgUrl = URL.createObjectURL(file);
      state.bgType = 'image-url';
      state.bgValue = 'uploaded';
      updatePreview();
    }
  });

  // Upload video background
  els.btnUploadVideo.addEventListener('click', () => els.inputUploadVideo.click());
  els.inputUploadVideo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    customUploadedVideoUrl = url;
    state.bgType = 'video-url';
    state.bgValue = 'uploaded';
    setVideoExportEnabled(true);
    updatePreview();
    saveSettings();
  });

  // Custom ratio inputs
  els.customWidth.addEventListener('input', () => {
    state.customWidth = parseInt(els.customWidth.value) || 1920;
    updatePreview();
    saveSettings();
  });
  els.customHeight.addEventListener('input', () => {
    state.customHeight = parseInt(els.customHeight.value) || 1080;
    updatePreview();
    saveSettings();
  });

  // Zoom
  els.zoomSelect.addEventListener('change', () => {
    const val = els.zoomSelect.value;
    if (val === 'fit') {
      fitStageToCanvas();
    } else {
      currentZoom = parseFloat(val);
      applyZoom();
    }
  });

  // ── Video duration — pill buttons (panel) ──
  els.videoDurationPanel.querySelectorAll('.dur-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      els.videoDurationPanel.querySelectorAll('.dur-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.videoDuration = parseInt(pill.dataset.sec, 10);
      // Sync toolbar select
      if (els.videoDurationToolbar) els.videoDurationToolbar.value = state.videoDuration;
      saveSettings();
    });
  });

  // ── Video duration — toolbar compact select ──
  els.videoDurationToolbar.addEventListener('change', () => {
    state.videoDuration = parseInt(els.videoDurationToolbar.value, 10);
    // Sync panel pills
    els.videoDurationPanel.querySelectorAll('.dur-pill').forEach(p => {
      p.classList.toggle('active', parseInt(p.dataset.sec, 10) === state.videoDuration);
    });
    saveSettings();
  });

  // Export buttons (toolbar)
  els.btnExportPng.addEventListener('click', () => exportImage('png'));
  els.btnExportJpg.addEventListener('click', () => exportImage('jpeg'));
  els.btnExportWebm.addEventListener('click', () => exportVideo());
  els.btnCopy.addEventListener('click', () => copyToClipboard());

  // Export buttons (panel)
  els.exportPngMain.addEventListener('click', () => exportImage('png'));
  els.exportJpgMain.addEventListener('click', () => exportImage('jpeg'));
  els.exportWebmMain.addEventListener('click', () => exportVideo());
  els.copyClipboardMain.addEventListener('click', () => copyToClipboard());

  // Header buttons
  els.btnNewCapture.addEventListener('click', () => {
    window.close();
  });

  els.btnReset.addEventListener('click', () => {
    state = { ...DEFAULTS };
    applyStateToUI();
    updatePreview();
    saveSettings();
    showToast('Reset to defaults');
  });

  // Save preset button
  if (els.btnSavePreset) {
    els.btnSavePreset.addEventListener('click', () => {
      const name = els.presetNameInput ? els.presetNameInput.value : '';
      saveCurrentAsPreset(name);
    });
  }

  // Allow Enter key in preset name input to save
  if (els.presetNameInput) {
    els.presetNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveCurrentAsPreset(els.presetNameInput.value);
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const cmdKey = isMac ? e.metaKey : e.ctrlKey;

  // Don't fire when typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (cmdKey && e.key === 's') {
    e.preventDefault();
    exportImage('png');
  } else if (cmdKey && e.key === 'c') {
    e.preventDefault();
    copyToClipboard();
  } else if (cmdKey && e.key === 'z') {
    e.preventDefault();
    state = { ...DEFAULTS };
    applyStateToUI();
    updatePreview();
    saveSettings();
    showToast('Reset to defaults');
  } else if (e.key === '+' || e.key === '=') {
    zoomStep(0.25);
  } else if (e.key === '-') {
    zoomStep(-0.25);
  }
}

// ══════════════════════════════════════════════════════════════
// APPLY STATE TO UI
// ══════════════════════════════════════════════════════════════

function applyStateToUI() {
  // Sliders
  els.sliderPadding.value = state.padding;
  els.valPadding.textContent = state.padding + 'px';
  els.sliderInset.value = state.inset;
  els.valInset.textContent = state.inset + 'px';
  els.sliderRadius.value = state.borderRadius;
  els.valRadius.textContent = state.borderRadius + 'px';
  els.sliderShadow.value = state.shadow;
  els.valShadow.textContent = state.shadow + '%';

  // Watermark — enforce Pro gate on init
  els.toggleWatermark.checked = state.removeWatermark;
  getProStatus().then(proData => {
    const isPro = proData && proData.plan === 'pro';
    const proBadge = document.getElementById('watermark-pro-badge');
    if (proBadge) proBadge.style.display = isPro ? 'inline-flex' : 'none';
    if (!isPro && state.removeWatermark) {
      state.removeWatermark = false;
      els.toggleWatermark.checked = false;
      if (els.watermarkBadge) els.watermarkBadge.classList.remove('hidden');
      saveSettings();
    }
  });

  // Gradient
  els.gradColor1.value = state.gradColor1 || '#10b981';
  els.gradColor2.value = state.gradColor2 || '#06b6d4';
  els.gradAngle.value = state.gradAngle || 135;
  els.valGradAngle.textContent = (state.gradAngle || 135) + '°';
  updateGradientPreviewBar();

  // Color opacity
  els.colorOpacity.value = state.colorOpacity;
  els.valColorOpacity.textContent = state.colorOpacity + '%';

  // Custom ratio inputs
  els.customWidth.value = state.customWidth;
  els.customHeight.value = state.customHeight;

  // Ratio buttons
  document.querySelectorAll('.ratio-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ratio === state.ratio);
  });
  els.customRatioRow.style.display = state.ratio === 'custom' ? 'flex' : 'none';

  // Gradient swatches
  if (state.bgType === 'gradient') {
    document.querySelectorAll('.gradient-swatch').forEach((s, i) => {
      s.classList.toggle('selected', GRADIENTS[i] && GRADIENTS[i].value === state.bgValue);
    });
  }

  // Inset color picker
  if (els.insetColorPicker) {
    els.insetColorPicker.value = state.insetColor || '#ffffff';
  }
  if (els.insetColorRow) {
    els.insetColorRow.style.display = state.inset > 0 ? 'flex' : 'none';
  }

  // Video duration — sync pill buttons and toolbar select to saved state
  const savedDur = state.videoDuration || 10;
  els.videoDurationPanel.querySelectorAll('.dur-pill').forEach(p => {
    p.classList.toggle('active', parseInt(p.dataset.sec, 10) === savedDur);
  });
  if (els.videoDurationToolbar) els.videoDurationToolbar.value = savedDur;

  // Video export controls
  const isVideo = state.bgType === 'video-preset' || state.bgType === 'video-url';
  setVideoExportEnabled(isVideo);
}

// Show/enable or hide/disable all video export controls together
function setVideoExportEnabled(enabled) {
  els.btnExportWebm.disabled    = !enabled;
  els.exportWebmMain.disabled   = !enabled;
  els.videoDurationToolbar.style.display = enabled ? '' : 'none';
}

function updateGradientPreviewBar() {
  const c1 = els.gradColor1.value;
  const c2 = els.gradColor2.value;
  const angle = els.gradAngle.value;
  els.gradPreviewBar.style.background = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
}

// ══════════════════════════════════════════════════════════════
// PREVIEW UPDATE
// ══════════════════════════════════════════════════════════════

function updatePreview() {
  if (!screenshotDataUrl) return;

  const { padding, inset, borderRadius, shadow, bgType, bgValue, colorOpacity, removeWatermark } = state;

  // ── 1. Background ──
  applyBackground(bgType, bgValue, colorOpacity);

  // ── 2. Compute and apply stage pixel dimensions ──
  const { stageW, stageH } = computeStageDimensions();
  els.stage.style.width  = stageW + 'px';
  els.stage.style.height = stageH + 'px';

  // ── 3. Outer padding gap (frame fills stage via position:absolute;inset:0) ──
  els.screenshotFrame.style.padding = padding + 'px';

  // ── 4. Compute image display dimensions explicitly (no CSS % ambiguity) ──
  //    Available space inside the frame (after outer padding and inset)
  const availW = Math.max(10, stageW - padding * 2 - inset * 2);
  const availH = Math.max(10, stageH - padding * 2 - inset * 2);
  const natW   = els.screenshotImg.naturalWidth  || 800;
  const natH   = els.screenshotImg.naturalHeight || 600;
  const imgScale  = Math.min(availW / natW, availH / natH, 1);
  const displayW  = Math.round(natW * imgScale);
  const displayH  = Math.round(natH * imgScale);

  els.screenshotImg.style.width        = displayW + 'px';
  els.screenshotImg.style.height       = displayH + 'px';
  els.screenshotImg.style.borderRadius = borderRadius + 'px';

  // ── 5. Cinematic mat ──
  const mat = els.screenshotMat;
  const matColor = state.insetColor || '#ffffff';
  const shadowCSS = shadow > 0
    ? `0 ${Math.round(shadow * 0.6)}px ${Math.round(shadow * 2)}px rgba(0,0,0,${Math.min(shadow * 0.007, 0.55)})`
    : 'none';

  if (inset > 0) {
    mat.style.padding      = inset + 'px';
    mat.style.background   = matColor;
    mat.style.borderRadius = (borderRadius + inset) + 'px';
    mat.style.boxShadow    = shadowCSS;
    // Show mat color controls
    if (els.insetColorRow) els.insetColorRow.style.display = 'flex';
  } else {
    mat.style.padding      = '0';
    mat.style.background   = 'transparent';
    mat.style.borderRadius = borderRadius + 'px';
    mat.style.boxShadow    = shadowCSS;
    // Hide mat color controls
    if (els.insetColorRow) els.insetColorRow.style.display = 'none';
  }

  // ── 6. Watermark preview badge ──
  if (els.watermarkBadge) {
    els.watermarkBadge.classList.toggle('hidden', removeWatermark);
  }

  // ── 7. Slider track fill ──
  updateSliderFills();
}

// Computes the pixel size the stage should be, based on ratio + canvas area + zoom
function computeStageDimensions() {
  const canvasArea = document.getElementById('canvas-area');
  const canvasW    = canvasArea.clientWidth  - 80;
  const canvasH    = canvasArea.clientHeight - 80;
  const ratio      = RATIOS.find(r => r.id === state.ratio);
  let stageW, stageH;

  if (state.ratio === 'auto' || !ratio || (!ratio.w && !ratio.h)) {
    const natW = els.screenshotImg.naturalWidth  || 800;
    const natH = els.screenshotImg.naturalHeight || 600;
    const { padding } = state;
    const totalW = natW + padding * 2;
    const totalH = natH + padding * 2;
    const s = Math.min(canvasW / totalW, canvasH / totalH, 1) * currentZoom;
    stageW = Math.round(totalW * s);
    stageH = Math.round(totalH * s);
  } else if (state.ratio === 'custom') {
    const s = Math.min(canvasW / state.customWidth, canvasH / state.customHeight) * currentZoom;
    stageW = Math.round(state.customWidth  * s);
    stageH = Math.round(state.customHeight * s);
  } else {
    const s = Math.min(canvasW / ratio.w, canvasH / ratio.h) * currentZoom;
    stageW = Math.round(ratio.w * s);
    stageH = Math.round(ratio.h * s);
  }

  return { stageW, stageH };
}

function applyBackground(bgType, bgValue, opacity = 100) {
  const stageBg = els.stageBg;

  // Remove existing video if switching away
  const existingVideo = stageBg.querySelector('video');

  if (bgType === 'gradient' || bgType === 'image-preset') {
    if (existingVideo) existingVideo.remove();
    stageBg.style.animation = '';           // clear any leftover video shimmer
    const bgEntry = BG_IMAGES.find(b => b.bg === bgValue);
    if (bgEntry && bgEntry.isFile) {
      stageBg.style.background = `url('${bgValue}') center/cover no-repeat`;
    } else {
      stageBg.style.background = bgValue;
    }
    stageBg.style.backgroundSize = 'cover';
    stageBg.style.backgroundPosition = 'center';
  } else if (bgType === 'color') {
    if (existingVideo) existingVideo.remove();
    stageBg.style.animation = '';           // clear any leftover video shimmer
    const alpha = (opacity / 100).toFixed(2);
    // Convert hex to rgba
    const hex = bgValue.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    stageBg.style.background = `rgba(${r},${g},${b},${alpha})`;
  } else if (bgType === 'image-url' && customUploadedBgUrl) {
    if (existingVideo) existingVideo.remove();
    stageBg.style.animation = '';           // clear any leftover video shimmer
    stageBg.style.background = `url('${customUploadedBgUrl}') center/cover no-repeat`;
  } else if (bgType === 'video-preset') {
    // Use animated CSS gradient as video-like background
    if (existingVideo) existingVideo.remove();
    stageBg.style.background = bgValue;
    addAnimatedVideoOverlay(stageBg);       // sets backgroundSize 200%x200% + animation
  } else if (bgType === 'video-url' && customUploadedVideoUrl) {
    applyVideoBackground(null, customUploadedVideoUrl);
  }
}

function applyVideoBackground(gradientFallback, videoUrl) {
  const stageBg = els.stageBg;
  // Remove existing video
  const existingVideo = stageBg.querySelector('video');
  if (existingVideo) existingVideo.remove();

  if (videoUrl) {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
    stageBg.appendChild(video);
    stageBg.style.background = '#000';
  } else if (gradientFallback) {
    stageBg.style.background = gradientFallback;
    addAnimatedVideoOverlay(stageBg);
  }
}

function addAnimatedVideoOverlay(stageBg) {
  // Subtle shimmer animation to simulate video
  stageBg.style.backgroundSize = '200% 200%';
  stageBg.style.animation = 'bgShimmer 4s ease infinite alternate';

  if (!document.querySelector('#bg-shimmer-style')) {
    const style = document.createElement('style');
    style.id = 'bg-shimmer-style';
    style.textContent = `
      @keyframes bgShimmer {
        0%   { background-position: 0% 0%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 100%; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Kept for backward-compat with zoom/fit calls; real work is in computeStageDimensions()
function updateStageRatio() {
  updatePreview();
}

function updateSliderFills() {
  // Update CSS custom property for slider fill visual
  document.querySelectorAll('input[type="range"]').forEach(input => {
    const pct = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--border) ${pct}%)`;
  });
}

// ══════════════════════════════════════════════════════════════
// ZOOM
// ══════════════════════════════════════════════════════════════

function applyZoom() {
  updatePreview();
}

function fitStageToCanvas() {
  currentZoom = 1;
  updatePreview();
}

function zoomStep(step) {
  currentZoom = Math.max(0.25, Math.min(3, currentZoom + step));
  // Update zoom select to nearest option
  const zoomOptions = [0.5, 0.75, 1, 1.5];
  const nearest = zoomOptions.reduce((a, b) =>
    Math.abs(b - currentZoom) < Math.abs(a - currentZoom) ? b : a
  );
  els.zoomSelect.value = nearest.toString();
  updatePreview();
}

// ══════════════════════════════════════════════════════════════
// EXPORT ENGINE
// ══════════════════════════════════════════════════════════════

function getExportDimensions() {
  const ratio = RATIOS.find(r => r.id === state.ratio);

  if (state.ratio === 'auto' || !ratio.w) {
    if (els.screenshotImg.naturalWidth) {
      const { padding } = state;
      return {
        width: els.screenshotImg.naturalWidth + padding * 2,
        height: els.screenshotImg.naturalHeight + padding * 2,
      };
    }
    return { width: 1280, height: 800 };
  }

  if (state.ratio === 'custom') {
    return { width: state.customWidth, height: state.customHeight };
  }

  return { width: ratio.w, height: ratio.h };
}

async function exportImage(format = 'png') {
  if (!screenshotDataUrl) {
    showToast('No screenshot to export', true);
    return;
  }

  const btn     = format === 'png' ? els.btnExportPng  : els.btnExportJpg;
  const btnMain = format === 'png' ? els.exportPngMain : els.exportJpgMain;

  setButtonLoading(btn, true);
  setButtonLoading(btnMain, true);

  try {
    const { width, height } = getExportDimensions();
    const { padding, inset, borderRadius, shadow, bgType, bgValue, colorOpacity, removeWatermark } = state;
    const matColor = state.insetColor || '#ffffff';

    const canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // ── 1. Background ──
    await drawBackgroundToCanvas(ctx, width, height, bgType, bgValue, colorOpacity);

    // ── 2. Load screenshot ──
    const img    = await loadImageElement(screenshotDataUrl);
    const availW = width  - padding * 2;
    const availH = height - padding * 2;
    const scale  = Math.min(availW / img.width, availH / img.height, 1);

    const scaledW = img.width  * scale;
    const scaledH = img.height * scale;

    // Mat rect (cinematic frame — visible only when inset > 0)
    const matW = scaledW + inset * 2;
    const matH = scaledH + inset * 2;
    const matX = (width  - matW) / 2;
    const matY = (height - matH) / 2;
    const matR = borderRadius + inset;  // mat corner radius

    // Screenshot rect (sits inside the mat)
    const imgX = matX + inset;
    const imgY = matY + inset;
    const imgW = scaledW;
    const imgH = scaledH;

    // ── 3. Shadow (drawn on the mat/img shape — must use an opaque fill) ──
    if (shadow > 0) {
      const shadowBlur  = shadow * 2;
      const shadowAlpha = Math.min(shadow * 0.007, 0.55);
      const shadowOffY  = shadow * 0.5;

      ctx.save();
      ctx.shadowBlur    = shadowBlur;
      ctx.shadowColor   = `rgba(0,0,0,${shadowAlpha})`;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = shadowOffY;
      // Fill with opaque color so shadow renders; content will paint over it
      ctx.fillStyle = '#ffffff';
      if (inset > 0) {
        roundedRectPath(ctx, matX, matY, matW, matH, matR);
      } else {
        roundedRectPath(ctx, imgX, imgY, imgW, imgH, borderRadius);
      }
      ctx.fill();
      ctx.restore();
    }

    // ── 4. Cinematic mat (when inset > 0) ──
    if (inset > 0) {
      ctx.save();
      ctx.fillStyle = matColor;
      roundedRectPath(ctx, matX, matY, matW, matH, matR);
      ctx.fill();
      ctx.restore();
    }

    // ── 5. Screenshot clipped with rounded corners ──
    ctx.save();
    roundedRectPath(ctx, imgX, imgY, imgW, imgH, borderRadius);
    ctx.clip();
    ctx.drawImage(img, imgX, imgY, imgW, imgH);
    ctx.restore();

    // ── 6. Watermark pill badge ──
    if (!removeWatermark) {
      drawWatermark(ctx, width, height);
    }

    // ── 7. Convert & download ──
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality  = format === 'jpeg' ? 0.95 : undefined;
    canvas.toBlob((blob) => {
      downloadBlob(blob, `xnapture.${format === 'jpeg' ? 'jpg' : 'png'}`);
      setButtonSuccess(btn);
      setButtonSuccess(btnMain);
      showToast(`✓ Exported as ${format.toUpperCase()}`);
    }, mimeType, quality);

  } catch (err) {
    console.error('Export error:', err);
    showToast('Export failed: ' + err.message, true);
    setButtonLoading(btn, false);
    setButtonLoading(btnMain, false);
  }
}

// Draws the "Made with Xnapture" watermark pill onto any canvas context
function drawWatermark(ctx, canvasW, canvasH) {
  const text     = 'Made with Xnapture';
  const fontSize = Math.max(15, Math.round(canvasH * 0.018));
  const font     = `500 ${fontSize}px sans-serif`;

  ctx.save();
  ctx.font = font;
  const textW  = ctx.measureText(text).width;
  const padX   = fontSize * 0.7;
  const padY   = fontSize * 0.45;
  const pillW  = textW + padX * 2;
  const pillH  = fontSize + padY * 2;
  const pillR  = pillH / 2;
  const margin = Math.round(canvasH * 0.018);
  const pillX  = canvasW - pillW - margin;
  const pillY  = canvasH - pillH - margin;

  // Pill background
  ctx.globalAlpha = 0.38;
  ctx.fillStyle   = '#000000';
  roundedRectPath(ctx, pillX, pillY, pillW, pillH, pillR);
  ctx.fill();

  // Text
  ctx.globalAlpha    = 1;
  ctx.fillStyle      = '#ffffff';
  ctx.textAlign      = 'left';
  ctx.textBaseline   = 'middle';
  ctx.shadowBlur     = 0;
  ctx.shadowOffsetY  = 0;
  ctx.fillText(text, pillX + padX, pillY + pillH / 2);
  ctx.restore();
}

function drawImageCover(ctx, img, width, height) {
  const srcW = img.naturalWidth  || img.videoWidth  || img.width  || width;
  const srcH = img.naturalHeight || img.videoHeight || img.height || height;
  const scale = Math.max(width / srcW, height / srcH);
  const sw = srcW * scale;
  const sh = srcH * scale;
  const sx = (width - sw) / 2;
  const sy = (height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh);
}

async function drawBackgroundToCanvas(ctx, width, height, bgType, bgValue, opacity = 100) {
  const alpha = opacity / 100;

  if (bgType === 'gradient') {
    drawCSSGradientToCanvas(ctx, bgValue, width, height);
  } else if (bgType === 'image-preset') {
    // Check if this is a file-based image or a CSS gradient
    const bgEntry = BG_IMAGES.find(b => b.bg === bgValue);
    if (bgEntry && bgEntry.isFile) {
      const img = await loadImageElement(bgValue);
      drawImageCover(ctx, img, width, height);
    } else {
      drawCSSGradientToCanvas(ctx, bgValue, width, height);
    }
  } else if (bgType === 'color') {
    const hex = bgValue.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.fillRect(0, 0, width, height);
  } else if (bgType === 'image-url' && customUploadedBgUrl) {
    const img = await loadImageElement(customUploadedBgUrl);
    drawImageCover(ctx, img, width, height);
  } else if ((bgType === 'video-preset' || bgType === 'video-url')) {
    // For video, capture current frame
    const videoEl = els.stageBg.querySelector('video');
    if (videoEl) {
      ctx.drawImage(videoEl, 0, 0, width, height);
    } else {
      drawCSSGradientToCanvas(ctx, bgValue, width, height);
    }
  } else {
    // Default: emerald gradient
    const grd = ctx.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, '#10b981');
    grd.addColorStop(1, '#06b6d4');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }
}

function drawCSSGradientToCanvas(ctx, cssGradient, width, height) {
  // Parse and draw linear gradients
  const linearMatch = cssGradient.match(/linear-gradient\((\d+)deg,\s*(.+)\)/);
  if (linearMatch) {
    const angle = parseInt(linearMatch[1]);
    const stops = linearMatch[2].split(',').map(s => s.trim());

    const rad = (angle - 90) * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const len = Math.abs(cos * width) + Math.abs(sin * height);
    const cx = width / 2;
    const cy = height / 2;
    const x0 = cx - cos * len / 2;
    const y0 = cy - sin * len / 2;
    const x1 = cx + cos * len / 2;
    const y1 = cy + sin * len / 2;

    const grd = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach((stop, i) => {
      const colorPart = stop.split(' ')[0];
      grd.addColorStop(i / (stops.length - 1), colorPart);
    });
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    return;
  }

  // Radial or conic: use offscreen approach
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d');

  // For complex gradients, draw via a temporary DOM element
  // Fall back to a simple solid color
  const grd = ctx.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0, '#10b981');
  grd.addColorStop(1, '#059669');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);
}

function roundedRectPath(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function exportVideo() {
  if (!screenshotDataUrl) {
    showToast('No screenshot to export', true);
    return;
  }

  const isVideo = state.bgType === 'video-preset' || state.bgType === 'video-url';
  if (!isVideo) {
    showToast('Select a video background first', true);
    return;
  }

  const durationSec = state.videoDuration || 10;
  const FPS         = 30;
  const totalFrames = durationSec * FPS;

  // ── Set both buttons to "recording" state ──
  function setRecordingState(pct) {
    const label = `REC ${pct}%`;
    [els.btnExportWebm, els.exportWebmMain].forEach(btn => {
      btn.classList.add('recording');
      btn.classList.remove('success');
      btn.textContent = label;
      btn.disabled = true;
    });
  }

  setRecordingState(0);

  try {
    const captureCanvas = document.createElement('canvas');

    // Use identical dimensions as PNG export for consistency
    const { width: capW, height: capH } = getExportDimensions();

    captureCanvas.width  = capW;
    captureCanvas.height = capH;
    const captureCtx = captureCanvas.getContext('2d');

    const captureStream = captureCanvas.captureStream(FPS);
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9' : 'video/webm';

    const recorder = new MediaRecorder(captureStream, { mimeType, videoBitsPerSecond: 8_000_000 });
    const chunks   = [];

    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      downloadBlob(blob, `xnapture-${durationSec}s.webm`);
      [els.btnExportWebm, els.exportWebmMain].forEach(btn => {
        btn.classList.remove('recording');
        btn.textContent = '↓ WebM';
        btn.disabled = false;
      });
      setButtonSuccess(els.btnExportWebm);
      setButtonSuccess(els.exportWebmMain);
      showToast(`✓ ${durationSec}s video exported as WebM`);
    };

    const img = await loadImageElement(screenshotDataUrl);
    const { padding, inset, borderRadius, shadow } = state;
    const matColor = state.insetColor || '#ffffff';

    function drawOneFrame(frameIndex) {
      const w = captureCanvas.width;
      const h = captureCanvas.height;

      // Background
      const videoEl = els.stageBg.querySelector('video');
      if (videoEl) {
        drawImageCover(captureCtx, videoEl, w, h);
      } else {
        // Animate the gradient over time
        const t = frameIndex / totalFrames;
        const colors = state.bgValue.match(/#[0-9a-fA-F]{6}/g) || ['#10b981', '#06b6d4'];
        const grd = captureCtx.createLinearGradient(
          w * (0.25 + 0.25 * Math.sin(t * Math.PI * 2)),
          h * (0.25 + 0.25 * Math.cos(t * Math.PI * 2)),
          w * (0.75 + 0.25 * Math.cos(t * Math.PI * 2)),
          h * (0.75 + 0.25 * Math.sin(t * Math.PI * 2))
        );
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[colors.length - 1]);
        captureCtx.fillStyle = grd;
        captureCtx.fillRect(0, 0, w, h);
      }

      // Screenshot + mat
      const availW  = w - padding * 2;
      const availH  = h - padding * 2;
      const scale   = Math.min(availW / img.width, availH / img.height, 1);
      const scaledW = img.width  * scale;
      const scaledH = img.height * scale;
      const matW    = scaledW + inset * 2;
      const matH    = scaledH + inset * 2;
      const matX    = (w - matW) / 2;
      const matY    = (h - matH) / 2;
      const matR    = borderRadius + inset;
      const imgX    = matX + inset;
      const imgY    = matY + inset;

      if (shadow > 0) {
        captureCtx.save();
        captureCtx.shadowBlur    = shadow * 2;
        captureCtx.shadowColor   = `rgba(0,0,0,0.35)`;
        captureCtx.shadowOffsetY = shadow * 0.5;
        captureCtx.fillStyle     = '#ffffff';
        inset > 0
          ? roundedRectPath(captureCtx, matX, matY, matW, matH, matR)
          : roundedRectPath(captureCtx, imgX, imgY, scaledW, scaledH, borderRadius);
        captureCtx.fill();
        captureCtx.restore();
      }

      if (inset > 0) {
        captureCtx.save();
        captureCtx.fillStyle = matColor;
        roundedRectPath(captureCtx, matX, matY, matW, matH, matR);
        captureCtx.fill();
        captureCtx.restore();
      }

      captureCtx.save();
      roundedRectPath(captureCtx, imgX, imgY, scaledW, scaledH, borderRadius);
      captureCtx.clip();
      captureCtx.drawImage(img, imgX, imgY, scaledW, scaledH);
      captureCtx.restore();

      if (!state.removeWatermark) drawWatermark(captureCtx, w, h);
    }

    recorder.start();

    let frame = 0;
    let lastTime = null;
    const msPerFrame = 1000 / FPS;

    function scheduleFrame(timestamp) {
      if (frame >= totalFrames) {
        recorder.stop();
        return;
      }

      // Only draw when enough time has elapsed for the next frame
      if (lastTime === null || timestamp - lastTime >= msPerFrame) {
        lastTime = timestamp;
        drawOneFrame(frame);
        frame++;

        // Update progress every ~15 frames (twice per second at 30fps)
        if (frame % 15 === 0 || frame === totalFrames) {
          const pct = Math.round((frame / totalFrames) * 100);
          setRecordingState(pct);
        }
      }

      requestAnimationFrame(scheduleFrame);
    }

    requestAnimationFrame(scheduleFrame);

  } catch (err) {
    console.error('Video export error:', err);
    showToast('Video export failed: ' + err.message, true);
    [els.btnExportWebm, els.exportWebmMain].forEach(btn => {
      btn.classList.remove('recording');
      btn.textContent = '↓ WebM';
      btn.disabled = false;
    });
  }
}

async function copyToClipboard() {
  if (!screenshotDataUrl) {
    showToast('No screenshot to copy', true);
    return;
  }

  setButtonLoading(els.btnCopy, true);
  setButtonLoading(els.copyClipboardMain, true);

  try {
    const { width, height } = getExportDimensions();
    const { padding, inset, borderRadius, shadow, bgType, bgValue, colorOpacity, removeWatermark } = state;
    const matColor = state.insetColor || '#ffffff';

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    await drawBackgroundToCanvas(ctx, width, height, bgType, bgValue, colorOpacity);

    const img    = await loadImageElement(screenshotDataUrl);
    const availW = width  - padding * 2;
    const availH = height - padding * 2;
    const scale  = Math.min(availW / img.width, availH / img.height, 1);

    const scaledW = img.width  * scale;
    const scaledH = img.height * scale;
    const matW = scaledW + inset * 2;
    const matH = scaledH + inset * 2;
    const matX = (width  - matW) / 2;
    const matY = (height - matH) / 2;
    const matR = borderRadius + inset;
    const imgX = matX + inset;
    const imgY = matY + inset;

    if (shadow > 0) {
      ctx.save();
      ctx.shadowBlur    = shadow * 2;
      ctx.shadowColor   = `rgba(0,0,0,${Math.min(shadow * 0.007, 0.55)})`;
      ctx.shadowOffsetY = shadow * 0.5;
      ctx.fillStyle     = '#ffffff';
      if (inset > 0) {
        roundedRectPath(ctx, matX, matY, matW, matH, matR);
      } else {
        roundedRectPath(ctx, imgX, imgY, scaledW, scaledH, borderRadius);
      }
      ctx.fill();
      ctx.restore();
    }

    if (inset > 0) {
      ctx.save();
      ctx.fillStyle = matColor;
      roundedRectPath(ctx, matX, matY, matW, matH, matR);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    roundedRectPath(ctx, imgX, imgY, scaledW, scaledH, borderRadius);
    ctx.clip();
    ctx.drawImage(img, imgX, imgY, scaledW, scaledH);
    ctx.restore();

    if (!removeWatermark) {
      drawWatermark(ctx, width, height);
    }

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setButtonSuccess(els.btnCopy);
        setButtonSuccess(els.copyClipboardMain);
        showToast('✓ Copied to clipboard');
      } catch (clipErr) {
        showToast('Clipboard write failed', true);
        setButtonLoading(els.btnCopy, false);
        setButtonLoading(els.copyClipboardMain, false);
      }
    }, 'image/png');

  } catch (err) {
    console.error('Copy error:', err);
    showToast('Copy failed: ' + err.message, true);
    setButtonLoading(els.btnCopy, false);
    setButtonLoading(els.copyClipboardMain, false);
  }
}

// ══════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function showToast(message, isError = false) {
  const toast = els.toast;
  toast.textContent = message;
  toast.className = 'toast' + (isError ? ' error' : '');

  // Show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Hide after 3s
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function setButtonLoading(btn, isLoading) {
  if (!btn) return;
  if (isLoading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Working…';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    btn.disabled = false;
  }
}

function setButtonSuccess(btn) {
  if (!btn) return;
  const original = btn.dataset.originalText || btn.innerHTML;
  btn.innerHTML = '✓ Done';
  btn.classList.add('success');
  btn.disabled = false;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove('success');
  }, 2000);
}

// Handle image load to trigger preview update
function onScreenshotLoad() {
  updatePreview();
}

// ══════════════════════════════════════════════════════════════
// AUTO-DETECT MAT COLOR FROM SCREENSHOT
// ══════════════════════════════════════════════════════════════

/**
 * Samples the four corner regions of the loaded screenshot and averages
 * their RGB values to produce a representative background color.
 * Returns a hex color string like '#1a2b3c'.
 */
function detectScreenshotBgColor() {
  const img = els.screenshotImg;
  if (!img || !img.naturalWidth || !img.naturalHeight) return '#ffffff';

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  // Sample a 20×20 px patch from each corner
  const patch = Math.min(20, Math.floor(Math.min(iw, ih) * 0.05));

  const sCanvas = document.createElement('canvas');
  sCanvas.width  = patch * 2;
  sCanvas.height = patch * 2;
  const sCtx = sCanvas.getContext('2d');

  // Draw four corners into a tiny 2×2 patch canvas
  sCtx.drawImage(img, 0,       0,       patch, patch, 0,     0,     patch, patch);  // top-left
  sCtx.drawImage(img, iw-patch, 0,       patch, patch, patch, 0,     patch, patch);  // top-right
  sCtx.drawImage(img, 0,       ih-patch, patch, patch, 0,     patch, patch, patch);  // bottom-left
  sCtx.drawImage(img, iw-patch, ih-patch, patch, patch, patch, patch, patch, patch); // bottom-right

  let r = 0, g = 0, b = 0, count = 0;
  try {
    const data = sCtx.getImageData(0, 0, patch * 2, patch * 2).data;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
  } catch (e) {
    // Cross-origin guard (shouldn't happen with data URLs but just in case)
    return '#ffffff';
  }

  if (count === 0) return '#ffffff';
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);

  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

// ══════════════════════════════════════════════════════════════
// PRESETS SYSTEM
// ══════════════════════════════════════════════════════════════

async function loadPresets() {
  try {
    const result = await chrome.storage.local.get('xnapturePresets');
    presets = Array.isArray(result.xnapturePresets) ? result.xnapturePresets : [];
  } catch (err) {
    console.warn('Failed to load presets:', err);
    presets = [];
  }
  renderPresetsList();
}

function savePresetsStorage() {
  try {
    chrome.storage.local.set({ xnapturePresets: presets });
  } catch (err) {
    console.warn('Failed to save presets:', err);
  }
}

function saveCurrentAsPreset(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    showToast('Enter a name for the preset', true);
    if (els.presetNameInput) els.presetNameInput.focus();
    return;
  }

  // Capture the current settings
  const settingsSnap = { ...state };

  // Update existing or push new
  const existingIdx = presets.findIndex(p => p.name === trimmed);
  if (existingIdx >= 0) {
    presets[existingIdx].settings = settingsSnap;
    showToast(`✓ Updated preset "${trimmed}"`);
  } else {
    presets.push({ name: trimmed, settings: settingsSnap });
    showToast(`✓ Saved preset "${trimmed}"`);
  }

  savePresetsStorage();
  renderPresetsList();

  // Clear the input
  if (els.presetNameInput) els.presetNameInput.value = '';
}

function deletePreset(index) {
  if (index < 0 || index >= presets.length) return;
  const name = presets[index].name;
  presets.splice(index, 1);
  savePresetsStorage();
  renderPresetsList();
  showToast(`Deleted "${name}"`);
}

function applyPreset(index) {
  const preset = presets[index];
  if (!preset || !preset.settings) return;
  state = { ...DEFAULTS, ...preset.settings };
  applyStateToUI();
  updatePreview();
  saveSettings();
  showToast(`✓ Applied "${preset.name}"`);
}

function renderPresetsList() {
  const list = els.presetsList;
  if (!list) return;

  list.innerHTML = '';

  if (presets.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'presets-empty';
    empty.textContent = 'No presets yet — save your current settings above';
    list.appendChild(empty);
    return;
  }

  presets.forEach((preset, i) => {
    const item = document.createElement('div');
    item.className = 'preset-item';

    const loadBtn = document.createElement('button');
    loadBtn.className = 'preset-load-btn';
    loadBtn.textContent = preset.name;
    loadBtn.title = `Apply "${preset.name}"`;
    loadBtn.addEventListener('click', () => applyPreset(i));

    const delBtn = document.createElement('button');
    delBtn.className = 'preset-delete-btn';
    delBtn.textContent = '✕';
    delBtn.title = `Delete "${preset.name}"`;
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePreset(i);
    });

    item.appendChild(loadBtn);
    item.appendChild(delBtn);
    list.appendChild(item);
  });
}

// ══════════════════════════════════════════════════════════════
// PRO STATUS & UPGRADE MODAL
// ══════════════════════════════════════════════════════════════

async function getProStatus() {
  try {
    const result = await chrome.storage.local.get('xnaptureProEmail');
    return result.xnaptureProEmail || null;
  } catch {
    return null;
  }
}

function showProModal() {
  const modal = document.getElementById('pro-modal');
  const emailInput = document.getElementById('pro-modal-email');
  const sendBtn = document.getElementById('pro-modal-send-btn');
  const statusEl = document.getElementById('pro-modal-status');
  const closeBtn = document.getElementById('pro-modal-close');

  // Reset state
  statusEl.style.display = 'none';
  statusEl.textContent = '';
  statusEl.className = 'pro-modal-status';
  emailInput.value = '';
  sendBtn.disabled = false;
  sendBtn.textContent = 'Send Magic Link';

  modal.style.display = 'flex';
  setTimeout(() => emailInput.focus(), 50);

  closeBtn.onclick = () => { modal.style.display = 'none'; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  sendBtn.onclick = async () => {
    const email = emailInput.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProModalStatus('Please enter a valid email address.', true);
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    try {
      const res = await fetch('https://xnapture.com/api/auth/request-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.status === 'magic_link_sent') {
        setProModalStatus('Magic link sent! Check your inbox, click the link, then click the button below.', false);
        sendBtn.disabled = false;
        sendBtn.textContent = 'Open Auth Window';
        sendBtn.onclick = () => {
          modal.style.display = 'none';
          launchAuthFlow(email);
        };
        return;
      }

      setProModalStatus(data.error || 'Something went wrong. Please try again.', true);
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Magic Link';

    } catch {
      setProModalStatus('Network error. Check your connection and try again.', true);
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Magic Link';
    }
  };
}

function setProModalStatus(message, isError) {
  const statusEl = document.getElementById('pro-modal-status');
  statusEl.textContent = message;
  statusEl.className = 'pro-modal-status' + (isError ? ' error' : '');
  statusEl.style.display = 'block';
}

function launchAuthFlow(email) {
  chrome.runtime.sendMessage({ action: 'LAUNCH_PRO_AUTH', email }, (response) => {
    if (response && response.success) {
      const proBadge = document.getElementById('watermark-pro-badge');
      if (proBadge) proBadge.style.display = 'inline-flex';
      els.toggleWatermark.checked = true;
      state.removeWatermark = true;
      if (els.watermarkBadge) els.watermarkBadge.classList.add('hidden');
      saveSettings();
      showToast('✦ Pro activated! Watermark removed.');
    } else {
      showToast('Auth failed: ' + (response?.error || 'Unknown error'));
    }
  });
}

// ══════════════════════════════════════════════════════════════
// BOOTSTRAP
// ══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Listen for screenshot img load
  els.screenshotImg.addEventListener('load', onScreenshotLoad);
  // Listen for window resize
  window.addEventListener('resize', () => {
    if (screenshotDataUrl) updatePreview();
  });
  init();
});
