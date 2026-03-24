// ============================================================
// Theme presets — color schemes with localStorage persistence
// ============================================================

const THEME_STORAGE_KEY = "glacrystal_theme_preset";

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
  }
};

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

  const chips = Object.keys(THEME_PRESETS)
    .map((name) => {
      const activeClass = name === activePreset ? " is-active" : "";
      const bg = getPresetPreviewGradient(name);
      return `<button type="button" class="themePreviewChip${activeClass}" data-theme-chip="${name}" title="${name}" style="background:${bg};"></button>`;
    })
    .join("");

  mount.innerHTML = chips;

  mount.querySelectorAll("[data-theme-chip]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const preset = btn.getAttribute("data-theme-chip");
      applyThemePreset(preset);
    });
  });
}

function applyThemePreset(presetName) {
  const safePreset = THEME_PRESETS[presetName] ? presetName : "classic";
  const preset = THEME_PRESETS[safePreset];
  const root = document.documentElement;

  Object.entries(preset).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.setAttribute("data-theme", safePreset);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, safePreset);
  } catch (_err) {
    // Ignore storage failures silently.
  }

  renderThemePreview(safePreset);
}

function initThemePresetSelector() {
  const defaultPreset = "classic";

  let storedPreset = defaultPreset;
  try {
    storedPreset = localStorage.getItem(THEME_STORAGE_KEY) || defaultPreset;
  } catch (_err) {
    storedPreset = defaultPreset;
  }

  applyThemePreset(storedPreset);
}
