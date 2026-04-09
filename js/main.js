// ============================================================
// Main — initialization sequence (runs once on page load)
// ============================================================

function setupRandomSidebarLogo() {
  const logoWrap = document.querySelector(".sidebar-logo");
  const logoImg = document.querySelector(".sidebar-logo .logo-icon");
  if (!logoWrap || !logoImg) return;

  const logoCandidates = [
    "sprites/branding/logo_0.png",
    "sprites/branding/logo_1.png",
    "sprites/branding/logo_2.png",
    "sprites/branding/logo_3.png",
    "sprites/branding/logo_4.png",
    "sprites/branding/logo_5.png",
    "sprites/branding/logo_6.png",
    "sprites/branding/logo_full.png"
  ];

  const logoDisplayNames = {
    "logo_0.png": "Vegapunk",
    "logo_1.png": "Shaka",
    "logo_2.png": "Lilith",
    "logo_3.png": "Edison",
    "logo_4.png": "Pythagoras",
    "logo_5.png": "Atlas",
    "logo_6.png": "York",
    "logo_full.png": "Vegapunks"
  };

  const logoPreferenceStorageKey = "labophase.logo.preference";
  let currentPreference = { mode: "random", fixedSrc: "" };
  let logoPickerOverlay = null;

  function safeReadPreference() {
    try {
      const raw = window.localStorage ? localStorage.getItem(logoPreferenceStorageKey) : "";
      if (!raw) return { mode: "random", fixedSrc: "" };
      const parsed = JSON.parse(raw);
      const mode = parsed && parsed.mode === "fixed" ? "fixed" : "random";
      const fixedSrc = parsed && typeof parsed.fixedSrc === "string" ? parsed.fixedSrc : "";
      return { mode, fixedSrc };
    } catch (_err) {
      return { mode: "random", fixedSrc: "" };
    }
  }

  function safeWritePreference(preference) {
    try {
      if (!window.localStorage) return;
      localStorage.setItem(logoPreferenceStorageKey, JSON.stringify(preference));
    } catch (_err) {
      // Ignore storage write failures.
    }
  }

  function applyLogo(src) {
    const selectedLogo = src || logoCandidates[0];
    logoImg.src = selectedLogo;
    logoImg.alt = "Labophase logo";
    logoWrap.classList.toggle("logo-full", /logo_full\.png$/i.test(selectedLogo));
  }

  function pickRandomLogo() {
    const randomIndex = Math.floor(Math.random() * logoCandidates.length);
    return logoCandidates[randomIndex];
  }

  function applyLogoPreference(preference) {
    if (preference.mode === "fixed" && logoCandidates.includes(preference.fixedSrc)) {
      applyLogo(preference.fixedSrc);
      return;
    }
    applyLogo(pickRandomLogo());
  }

  function closeLogoPicker() {
    if (!logoPickerOverlay) return;
    logoPickerOverlay.classList.remove("is-open");
  }

  function refreshLogoPickerSelection() {
    if (!logoPickerOverlay) return;

    const randomBtn = logoPickerOverlay.querySelector("[data-logo-picker-random]");
    if (randomBtn) {
      randomBtn.classList.toggle("is-selected", currentPreference.mode !== "fixed");
    }

    logoPickerOverlay.querySelectorAll("[data-logo-picker-src]").forEach((button) => {
      const src = button.getAttribute("data-logo-picker-src") || "";
      const isSelected = currentPreference.mode === "fixed" && src === currentPreference.fixedSrc;
      button.classList.toggle("is-selected", isSelected);
    });
  }

  function ensureLogoPickerOverlay() {
    if (logoPickerOverlay) return;

    logoPickerOverlay = document.createElement("div");
    logoPickerOverlay.className = "logo-picker-overlay";
    logoPickerOverlay.innerHTML = `
      <div class="logo-picker-modal" role="dialog" aria-modal="true" aria-label="Logo selector">
        <div class="logo-picker-head">
          <h4>Choose Logo</h4>
          <button type="button" class="logo-picker-close" data-logo-picker-close aria-label="Close">✕</button>
        </div>
        <button type="button" class="logo-picker-random" data-logo-picker-random>
          <span class="logo-picker-random-title">Random</span>
          <span class="logo-picker-random-subtitle">Pick a different logo each page load</span>
        </button>
        <div class="logo-picker-grid"></div>
      </div>
    `;

    const grid = logoPickerOverlay.querySelector(".logo-picker-grid");
    if (grid) {
      logoCandidates.forEach((src, index) => {
        const fileName = src.split("/").pop() || "";
        const displayName = logoDisplayNames[fileName] || fileName || `Logo ${index + 1}`;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "logo-picker-item";
        button.setAttribute("data-logo-picker-src", src);
        button.innerHTML = `<img src="${src}" alt="${displayName}" /><span>${displayName}</span>`;
        grid.appendChild(button);
      });
    }

    logoPickerOverlay.addEventListener("click", (event) => {
      if (event.target === logoPickerOverlay) {
        closeLogoPicker();
        return;
      }

      const closeBtn = event.target.closest("[data-logo-picker-close]");
      if (closeBtn) {
        closeLogoPicker();
        return;
      }

      const randomBtn = event.target.closest("[data-logo-picker-random]");
      if (randomBtn) {
        currentPreference = { mode: "random", fixedSrc: "" };
        safeWritePreference(currentPreference);
        applyLogoPreference(currentPreference);
        refreshLogoPickerSelection();
        closeLogoPicker();
        return;
      }

      const fixedBtn = event.target.closest("[data-logo-picker-src]");
      if (fixedBtn) {
        const src = fixedBtn.getAttribute("data-logo-picker-src") || "";
        if (!logoCandidates.includes(src)) return;
        currentPreference = { mode: "fixed", fixedSrc: src };
        safeWritePreference(currentPreference);
        applyLogoPreference(currentPreference);
        refreshLogoPickerSelection();
        closeLogoPicker();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLogoPicker();
    });

    document.body.appendChild(logoPickerOverlay);
  }

  function openLogoPicker() {
    ensureLogoPickerOverlay();
    if (!logoPickerOverlay) return;
    refreshLogoPickerSelection();
    logoPickerOverlay.classList.add("is-open");
  }

  currentPreference = safeReadPreference();
  applyLogoPreference(currentPreference);

  if (logoImg.dataset.logoPickerBound === "1") return;
  logoImg.dataset.logoPickerBound = "1";
  logoImg.title = "Choose logo";
  logoImg.style.cursor = "pointer";

  logoImg.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openLogoPicker();
  });
}

setupRandomSidebarLogo();

if (typeof initThemePresetSelector === "function") {
  initThemePresetSelector();
}

ensureItemsLayout();
gerarTabelas();

// Restore sidebar collapsed state before first paint
initSidebarState();

// Avoid overwriting saved build while initializing
suppressAutoSave = true;
applyTranslations();

// Initialize characters tab before loading saved state
charactersInit();

// Initialize boats tab before loading saved state
boatsInit();

// Initialize global profile modal
initProfileModal();

// Load profile from URL when present
_checkProfileInUrl();

// Load saved build (URL has priority)
if (!loadBuildFromUrl()) {
  loadBuild();
}

if (typeof upgradeAllCardStatControls === 'function') {
  upgradeAllCardStatControls();
}

suppressAutoSave = false;

// Initial calculation (in case items are added programmatically)
if (itemsArea) {
  recalc();
}

// Initialize recipes tab
recipesInit();

// Initialize chest puzzle tab
chestInit();

// Initialize boost tab
boostInit();

// Initialize XP tab
xpInit();

// Characters tab is initialized before state load

// Initialize Wanted tab
wantedInit();
if (typeof worldBossesInit === "function") worldBossesInit();
