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

  const randomIndex = Math.floor(Math.random() * logoCandidates.length);
  const selectedLogo = logoCandidates[randomIndex];

  logoImg.src = selectedLogo;
  logoImg.alt = "Labophase logo";
  logoWrap.classList.toggle("logo-full", /logo_full\.png$/i.test(selectedLogo));
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

// Load profiles
updateProfileDropdown();

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
worldBossesInit();
