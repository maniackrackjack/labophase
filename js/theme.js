// ============================================================
// Theme presets — color schemes with storage persistence
// ============================================================

const THEME_STORAGE_KEY = "glacrystal_theme_preset";
let themeEventManager = null;
let themePickerOverlay = null;

function getThemeEventManager() {
  if (!themeEventManager && typeof EventManager === "function") {
    themeEventManager = new EventManager();
  }
  return themeEventManager;
}

const THEME_PRESETS = {
  classic: {
    "--bg-page": "#3c2a18",
    "--text-main": "#f6eccf",
    "--bg-sidebar": "#2a1a0e",
    "--border-accent": "#6a4a20",
    "--border-soft": "#6a4a2055",
    "--text-title": "#ffe39a",
    "--text-muted": "#c99c67",
    "--bg-tab": "#4a2e14",
    "--text-tab": "#f8edd1",
    "--bg-tab-active": "#a0742b",
    "--text-tab-active": "#120800",
    "--btn-ghost-border": "rgba(255, 255, 255, 0.2)",
    "--btn-ghost-hover-border": "rgba(255, 255, 255, 0.4)",
    "--btn-ghost-bg": "transparent",
    "--btn-ghost-hover-bg": "rgba(255, 255, 255, 0.12)",
    "--bg-panel": "#2a1a0e",
    "--text-panel": "#f6eccf",
    "--bg-surface-1": "#3a2410",
    "--bg-surface-2": "#4a2e14",
    "--input-bg": "#3a2410",
    "--input-border": "#6a4a20",
    "--input-text": "#f8edd1",
    "--input-focus": "#d9b06b"
  },
  ocean: {
    "--bg-page": "#102534",
    "--text-main": "#e8f6ff",
    "--bg-sidebar": "#0a1b27",
    "--border-accent": "#2c6b8a",
    "--border-soft": "#2c6b8a66",
    "--text-title": "#b5e8ff",
    "--text-muted": "#9fd2e8",
    "--bg-tab": "#123449",
    "--text-tab": "#e8f6ff",
    "--bg-tab-active": "#4eb8e6",
    "--text-tab-active": "#041822",
    "--btn-ghost-border": "rgba(150, 215, 255, 0.35)",
    "--btn-ghost-hover-border": "rgba(150, 215, 255, 0.7)",
    "--btn-ghost-bg": "rgba(14, 44, 63, 0.45)",
    "--btn-ghost-hover-bg": "rgba(78, 184, 230, 0.18)",
    "--bg-panel": "#0f2635",
    "--text-panel": "#e8f6ff",
    "--bg-surface-1": "#143246",
    "--bg-surface-2": "#1a3f56",
    "--input-bg": "#143246",
    "--input-border": "#2c6b8a",
    "--input-text": "#e8f6ff",
    "--input-focus": "#7dd8ff"
  },
  forest: {
    "--bg-page": "#1d2b1f",
    "--text-main": "#edf8e8",
    "--bg-sidebar": "#132016",
    "--border-accent": "#4f7c4f",
    "--border-soft": "#4f7c4f66",
    "--text-title": "#c6efb5",
    "--text-muted": "#aad79b",
    "--bg-tab": "#1f3a24",
    "--text-tab": "#edf8e8",
    "--bg-tab-active": "#83c66d",
    "--text-tab-active": "#0b1a0e",
    "--btn-ghost-border": "rgba(185, 235, 173, 0.3)",
    "--btn-ghost-hover-border": "rgba(185, 235, 173, 0.65)",
    "--btn-ghost-bg": "rgba(20, 45, 23, 0.45)",
    "--btn-ghost-hover-bg": "rgba(131, 198, 109, 0.18)",
    "--bg-panel": "#16261a",
    "--text-panel": "#edf8e8",
    "--bg-surface-1": "#1e3323",
    "--bg-surface-2": "#24402b",
    "--input-bg": "#1e3323",
    "--input-border": "#4f7c4f",
    "--input-text": "#edf8e8",
    "--input-focus": "#bce9a8"
  },
  ember: {
    "--bg-page": "#2d1c17",
    "--text-main": "#fff0e6",
    "--bg-sidebar": "#1f130f",
    "--border-accent": "#a14f2e",
    "--border-soft": "#a14f2e66",
    "--text-title": "#ffd0ac",
    "--text-muted": "#e1a586",
    "--bg-tab": "#41231b",
    "--text-tab": "#fff0e6",
    "--bg-tab-active": "#e6864b",
    "--text-tab-active": "#220f0a",
    "--btn-ghost-border": "rgba(255, 190, 155, 0.35)",
    "--btn-ghost-hover-border": "rgba(255, 190, 155, 0.7)",
    "--btn-ghost-bg": "rgba(53, 24, 18, 0.45)",
    "--btn-ghost-hover-bg": "rgba(230, 134, 75, 0.18)",
    "--bg-panel": "#25130f",
    "--text-panel": "#fff0e6",
    "--bg-surface-1": "#341b14",
    "--bg-surface-2": "#46251c",
    "--input-bg": "#341b14",
    "--input-border": "#a14f2e",
    "--input-text": "#fff0e6",
    "--input-focus": "#ffc091"
  },
  white: {
    "--bg-page": "#f3f5f8",
    "--text-main": "#18202a",
    "--bg-sidebar": "#e6ebf2",
    "--border-accent": "#8fa0b8",
    "--border-soft": "#8fa0b855",
    "--text-title": "#243447",
    "--text-muted": "#4f637d",
    "--bg-tab": "#dde4ee",
    "--text-tab": "#1f2b3a",
    "--bg-tab-active": "#ffffff",
    "--text-tab-active": "#122033",
    "--btn-ghost-border": "rgba(40, 62, 90, 0.24)",
    "--btn-ghost-hover-border": "rgba(40, 62, 90, 0.45)",
    "--btn-ghost-bg": "rgba(255, 255, 255, 0.55)",
    "--btn-ghost-hover-bg": "rgba(143, 160, 184, 0.2)",
    "--bg-panel": "#ffffff",
    "--text-panel": "#1b2430",
    "--bg-surface-1": "#edf1f7",
    "--bg-surface-2": "#e3eaf3",
    "--input-bg": "#f7f9fc",
    "--input-border": "#a0b0c6",
    "--input-text": "#1b2430",
    "--input-focus": "#5a7ea8"
  },
  black: {
    "--bg-page": "#0d0f12",
    "--text-main": "#eef1f5",
    "--bg-sidebar": "#07090b",
    "--border-accent": "#3f4755",
    "--border-soft": "#3f475566",
    "--text-title": "#ffffff",
    "--text-muted": "#a8b0bf",
    "--bg-tab": "#141820",
    "--text-tab": "#dfe5ee",
    "--bg-tab-active": "#2b3240",
    "--text-tab-active": "#ffffff",
    "--btn-ghost-border": "rgba(220, 230, 255, 0.24)",
    "--btn-ghost-hover-border": "rgba(220, 230, 255, 0.45)",
    "--btn-ghost-bg": "rgba(20, 24, 32, 0.55)",
    "--btn-ghost-hover-bg": "rgba(63, 71, 85, 0.28)",
    "--bg-panel": "#10141a",
    "--text-panel": "#eef1f5",
    "--bg-surface-1": "#151b23",
    "--bg-surface-2": "#1d2530",
    "--input-bg": "#131921",
    "--input-border": "#3f4755",
    "--input-text": "#eef1f5",
    "--input-focus": "#7f8aa0"
  },
  pink: {
    "--bg-page": "#2a1020",
    "--text-main": "#ffeef7",
    "--bg-sidebar": "#1b0b15",
    "--border-accent": "#b84d86",
    "--border-soft": "#b84d8666",
    "--text-title": "#ffc7e6",
    "--text-muted": "#e7a8cb",
    "--bg-tab": "#3a1530",
    "--text-tab": "#ffeef7",
    "--bg-tab-active": "#e96bb0",
    "--text-tab-active": "#2c0a1e",
    "--btn-ghost-border": "rgba(255, 196, 233, 0.3)",
    "--btn-ghost-hover-border": "rgba(255, 196, 233, 0.6)",
    "--btn-ghost-bg": "rgba(50, 17, 39, 0.45)",
    "--btn-ghost-hover-bg": "rgba(233, 107, 176, 0.2)",
    "--bg-panel": "#220d1b",
    "--text-panel": "#ffeef7",
    "--bg-surface-1": "#341328",
    "--bg-surface-2": "#451834",
    "--input-bg": "#341328",
    "--input-border": "#b84d86",
    "--input-text": "#ffeef7",
    "--input-focus": "#ff9fd1"
  },
  purple: {
    "--bg-page": "#1f1535",
    "--text-main": "#f2ecff",
    "--bg-sidebar": "#140d23",
    "--border-accent": "#6f56b8",
    "--border-soft": "#6f56b866",
    "--text-title": "#d8c8ff",
    "--text-muted": "#bda9e8",
    "--bg-tab": "#291b45",
    "--text-tab": "#f2ecff",
    "--bg-tab-active": "#9a7cff",
    "--text-tab-active": "#1a1033",
    "--btn-ghost-border": "rgba(212, 196, 255, 0.3)",
    "--btn-ghost-hover-border": "rgba(212, 196, 255, 0.6)",
    "--btn-ghost-bg": "rgba(34, 21, 56, 0.45)",
    "--btn-ghost-hover-bg": "rgba(154, 124, 255, 0.2)",
    "--bg-panel": "#181029",
    "--text-panel": "#f2ecff",
    "--bg-surface-1": "#26193f",
    "--bg-surface-2": "#322152",
    "--input-bg": "#26193f",
    "--input-border": "#6f56b8",
    "--input-text": "#f2ecff",
    "--input-focus": "#b79fff"
  },
  red: {
    "--bg-page": "#2a1010",
    "--text-main": "#ffecec",
    "--bg-sidebar": "#190909",
    "--border-accent": "#bf3f3f",
    "--border-soft": "#bf3f3f66",
    "--text-title": "#ffb7b7",
    "--text-muted": "#e19797",
    "--bg-tab": "#3a1515",
    "--text-tab": "#ffecec",
    "--bg-tab-active": "#e45f5f",
    "--text-tab-active": "#260909",
    "--btn-ghost-border": "rgba(255, 198, 198, 0.3)",
    "--btn-ghost-hover-border": "rgba(255, 198, 198, 0.6)",
    "--btn-ghost-bg": "rgba(50, 17, 17, 0.45)",
    "--btn-ghost-hover-bg": "rgba(228, 95, 95, 0.2)",
    "--bg-panel": "#220d0d",
    "--text-panel": "#ffecec",
    "--bg-surface-1": "#341313",
    "--bg-surface-2": "#4b1a1a",
    "--input-bg": "#341313",
    "--input-border": "#bf3f3f",
    "--input-text": "#ffecec",
    "--input-focus": "#ff9d9d"
  },
  pastelPink: {
    "--bg-page": "#fff3f8",
    "--text-main": "#3b2331",
    "--bg-sidebar": "#ffe5f0",
    "--border-accent": "#e7a2bf",
    "--border-soft": "#e7a2bf66",
    "--text-title": "#6f3e55",
    "--text-muted": "#97647c",
    "--bg-tab": "#ffddea",
    "--text-tab": "#442737",
    "--bg-tab-active": "#ffc1d8",
    "--text-tab-active": "#3a2230",
    "--btn-ghost-border": "rgba(111, 62, 85, 0.24)",
    "--btn-ghost-hover-border": "rgba(111, 62, 85, 0.45)",
    "--btn-ghost-bg": "rgba(255, 255, 255, 0.6)",
    "--btn-ghost-hover-bg": "rgba(231, 162, 191, 0.24)",
    "--bg-panel": "#fff8fb",
    "--text-panel": "#3b2331",
    "--bg-surface-1": "#ffeef5",
    "--bg-surface-2": "#ffe1ed",
    "--input-bg": "#fff7fa",
    "--input-border": "#e7a2bf",
    "--input-text": "#3b2331",
    "--input-focus": "#d57ba2"
  },
  darkBlue: {
    "--bg-page": "#0e1a2d",
    "--text-main": "#e8f0ff",
    "--bg-sidebar": "#081120",
    "--border-accent": "#3763a5",
    "--border-soft": "#3763a566",
    "--text-title": "#bcd4ff",
    "--text-muted": "#94b2e5",
    "--bg-tab": "#132745",
    "--text-tab": "#e8f0ff",
    "--bg-tab-active": "#4c7fd1",
    "--text-tab-active": "#081325",
    "--btn-ghost-border": "rgba(186, 212, 255, 0.28)",
    "--btn-ghost-hover-border": "rgba(186, 212, 255, 0.52)",
    "--btn-ghost-bg": "rgba(14, 31, 56, 0.5)",
    "--btn-ghost-hover-bg": "rgba(76, 127, 209, 0.22)",
    "--bg-panel": "#0e1d33",
    "--text-panel": "#e8f0ff",
    "--bg-surface-1": "#142743",
    "--bg-surface-2": "#193253",
    "--input-bg": "#12233c",
    "--input-border": "#3763a5",
    "--input-text": "#e8f0ff",
    "--input-focus": "#7aa6ef"
  },
  pastelYellow: {
    "--bg-page": "#fffbe8",
    "--text-main": "#3d3415",
    "--bg-sidebar": "#fff4bd",
    "--border-accent": "#e3c866",
    "--border-soft": "#e3c86666",
    "--text-title": "#6e5a1c",
    "--text-muted": "#8d7630",
    "--bg-tab": "#ffef9f",
    "--text-tab": "#413612",
    "--bg-tab-active": "#ffe07a",
    "--text-tab-active": "#3a2f0d",
    "--btn-ghost-border": "rgba(110, 90, 28, 0.25)",
    "--btn-ghost-hover-border": "rgba(110, 90, 28, 0.45)",
    "--btn-ghost-bg": "rgba(255, 255, 255, 0.6)",
    "--btn-ghost-hover-bg": "rgba(227, 200, 102, 0.26)",
    "--bg-panel": "#fffdf1",
    "--text-panel": "#3d3415",
    "--bg-surface-1": "#fff7cf",
    "--bg-surface-2": "#fff1b0",
    "--input-bg": "#fffcee",
    "--input-border": "#e3c866",
    "--input-text": "#3d3415",
    "--input-focus": "#c7a53a"
  }
};

const THEME_LABEL_KEYS = {
  classic: "themeClassic",
  ocean: "themeOcean",
  forest: "themeForest",
  ember: "themeEmber",
  white: "themeWhite",
  black: "themeBlack",
  pink: "themePink",
  purple: "themePurple",
  red: "themeRed",
  pastelPink: "themePastelPink",
  darkBlue: "themeDarkBlue",
  pastelYellow: "themePastelYellow"
};

function getThemeLabel(name) {
  const key = THEME_LABEL_KEYS[name];
  if (!key) return name;
  if (typeof t === "function") return t(key);
  return name;
}

function getCurrentThemePreset() {
  if (typeof document === "undefined") return "classic";
  const active = document.documentElement.getAttribute("data-theme") || "classic";
  return THEME_PRESETS[active] ? active : "classic";
}

function getThemePickerAriaLabel() {
  if (typeof t === "function") {
    const label = t("themePickerAriaLabel");
    if (label && label !== "themePickerAriaLabel") return label;
  }
  return "Theme preset";
}

function themeEscape(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getPresetPreviewGradient(presetName) {
  const preset = THEME_PRESETS[presetName];
  if (!preset) return "#000";
  const c1 = preset["--bg-sidebar"] || "#222";
  const c2 = preset["--bg-tab-active"] || "#666";
  const c3 = preset["--text-title"] || "#ccc";
  return `linear-gradient(90deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
}

function renderThemePreview(activePreset) {
  const mount = document.getElementById("theme-preview");
  if (!mount) return;

  const safePreset = THEME_PRESETS[activePreset] ? activePreset : "classic";
  const activeLabel = getThemeLabel(safePreset);
  const activeSwatch = getPresetPreviewGradient(safePreset);
  const pickerAriaLabel = getThemePickerAriaLabel();

  mount.innerHTML = `<div class="themePickerCompact"><button type="button" class="themePickerToggle" data-theme-toggle aria-label="${themeEscape(pickerAriaLabel)}" aria-haspopup="dialog"><span class="themePresetOptionSwatch" aria-hidden="true" style="background:${themeEscape(activeSwatch)};"></span><span class="themePickerActiveName">${themeEscape(activeLabel)}</span></button></div>`;
}

function refreshThemePickerSelection() {
  if (!themePickerOverlay) return;
  const activePreset = getCurrentThemePreset();

  themePickerOverlay.querySelectorAll("[data-theme-picker-preset]").forEach((button) => {
    const preset = button.getAttribute("data-theme-picker-preset") || "";
    button.classList.toggle("is-selected", preset === activePreset);
  });
}

function closeThemePickerOverlay() {
  if (!themePickerOverlay) return;
  themePickerOverlay.classList.remove("is-open");
}

function ensureThemePickerOverlay() {
  if (themePickerOverlay || typeof document === "undefined") return;

  const pickerAriaLabel = getThemePickerAriaLabel();
  const options = Object.keys(THEME_PRESETS)
    .map((name) => {
      const label = getThemeLabel(name);
      const swatch = getPresetPreviewGradient(name);
      return `<button type="button" class="theme-picker-item" data-theme-picker-preset="${themeEscape(name)}"><span class="themePresetOptionSwatch" aria-hidden="true" style="background:${themeEscape(swatch)};"></span><span class="theme-picker-item-name">${themeEscape(label)}</span></button>`;
    })
    .join("");

  themePickerOverlay = document.createElement("div");
  themePickerOverlay.className = "logo-picker-overlay theme-picker-overlay";
  themePickerOverlay.innerHTML = `<div class="logo-picker-modal theme-picker-modal" role="dialog" aria-modal="true" aria-label="${themeEscape(pickerAriaLabel)}"><div class="logo-picker-head theme-picker-head"><h4>${themeEscape(pickerAriaLabel)}</h4><button type="button" class="logo-picker-close" data-theme-picker-close aria-label="Close">✕</button></div><div class="theme-picker-grid">${options}</div></div>`;

  themePickerOverlay.addEventListener("click", (event) => {
    if (event.target === themePickerOverlay) {
      closeThemePickerOverlay();
      return;
    }

    const closeBtn = event.target.closest("[data-theme-picker-close]");
    if (closeBtn) {
      closeThemePickerOverlay();
      return;
    }

    const presetBtn = event.target.closest("[data-theme-picker-preset]");
    if (!presetBtn) return;
    const preset = presetBtn.getAttribute("data-theme-picker-preset") || "";
    applyThemePreset(preset);
    closeThemePickerOverlay();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeThemePickerOverlay();
  });

  document.body.appendChild(themePickerOverlay);
}

function openThemePickerOverlay() {
  ensureThemePickerOverlay();
  if (!themePickerOverlay) return;
  refreshThemePickerSelection();
  themePickerOverlay.classList.add("is-open");
}

function bindThemePreviewEvents() {
  const mount = document.getElementById("theme-preview");
  if (!mount) return;

  // Remove previous listener to avoid duplicates
  if (mount._themeToggleListener) {
    mount.removeEventListener("click", mount._themeToggleListener);
  }

  mount._themeToggleListener = (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    event.preventDefault();
    event.stopPropagation();
    openThemePickerOverlay();
  };

  mount.addEventListener("click", mount._themeToggleListener);
}

function applyThemePreset(presetName) {
  const safePreset = THEME_PRESETS[presetName] ? presetName : "classic";
  const preset = THEME_PRESETS[safePreset];
  const root = document.documentElement;

  if (root.getAttribute("data-theme") === safePreset) {
    renderThemePreview(safePreset);
    bindThemePreviewEvents();
    return;
  }

  Object.entries(preset).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.setAttribute("data-theme", safePreset);

  try {
    if (typeof storageManager !== "undefined" && storageManager && typeof storageManager.setRaw === "function") {
      storageManager.setRaw(THEME_STORAGE_KEY, safePreset);
    } else if (window.localStorage) {
      localStorage.setItem(THEME_STORAGE_KEY, safePreset);
    }
  } catch (_err) {
    // Ignore storage failures silently.
  }

  renderThemePreview(safePreset);
  bindThemePreviewEvents();
  refreshThemePickerSelection();
}

function initThemePresetSelector() {
  const defaultPreset = "classic";

  let storedPreset = defaultPreset;
  try {
    if (typeof storageManager !== "undefined" && storageManager && typeof storageManager.getRaw === "function") {
      storedPreset = storageManager.getRaw(THEME_STORAGE_KEY) || defaultPreset;
    } else if (window.localStorage) {
      storedPreset = localStorage.getItem(THEME_STORAGE_KEY) || defaultPreset;
    }
  } catch (_err) {
    storedPreset = defaultPreset;
  }

  applyThemePreset(storedPreset);
  bindThemePreviewEvents();
}

function themeApplyTranslations() {
  // Re-render the sidebar toggle button with the new language's label
  renderThemePreview(getCurrentThemePreset());
  bindThemePreviewEvents();

  // If the picker overlay is already built, rebuild it so labels update
  if (themePickerOverlay) {
    themePickerOverlay.remove();
    themePickerOverlay = null;
  }
}

function themeOnHide() {
  closeThemePickerOverlay();
}

function themeOnShow() {
  bindThemePreviewEvents();
}
