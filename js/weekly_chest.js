// ============================================================
// Weekly Chest
// ============================================================

const WC_ROTATION_DATA = {
  ace: "no_rotation",
  akainu: "no_rotation",
  alvida: "no_rotation",
  aokiji: "no_rotation",
  apoo: "17/04",
  arlong: "no_rotation",
  baby_5: "27/03",
  bartomolomeo: "10/04",
  bastille: "10/04",
  bellamy: "13/03",
  bepo: "no_rotation",
  blueno: "24/04",
  bonney: "20/03",
  brook: "10/04",
  "buchi_&_sham": "no_rotation",
  buggy: "no_rotation",
  burgess: "12/12",
  cabaji: "no_rotation",
  capone_bege: "24/04",
  carrot: "23/01",
  chew: "no_rotation",
  chopper: "17/04",
  crocodile: "27/03",
  daddy: "no_rotation",
  dalmatian: "13/03",
  doflamingo: "no_rotation",
  don_krieg: "no_rotation",
  drake: "03/04",
  enel: "no_rotation",
  eric: "no_rotation",
  franky: "27/03",
  garp: "no_rotation",
  gedatsu: "no_rotation",
  gin: "no_rotation",
  hancock: "no_rotation",
  hatchan: "no_rotation",
  hawkins: "13/03",
  hina: "10/04",
  ichiji: "20/02",
  ivankov: "no_rotation",
  jabra: "17/04",
  jango: "no_rotation",
  jinbe: "no_rotation",
  kaku: "17/04",
  kalifa: "20/02",
  kid: "03/04",
  killer: "02/01",
  kizaru: "no_rotation",
  koala: "10/04",
  kuma: "no_rotation",
  kuro: "no_rotation",
  kuroobi: "no_rotation",
  law: "03/04",
  leo: "24/04",
  lucci: "03/04",
  luffy: "10/04",
  marco: "17/04",
  marguerite: "27/02",
  mihawk: "no_rotation",
  "miss_doublefinger_(zala)": "no_rotation",
  miss_goldenweek: "no_rotation",
  mohji: "no_rotation",
  morgan: "no_rotation",
  moria: "20/03",
  "mr._1": "no_rotation",
  "mr._2": "no_rotation",
  "mr._3": "no_rotation",
  "mr._4": "no_rotation",
  "mr._5": "no_rotation",
  nami: "03/04",
  niji: "20/03",
  ohm: "no_rotation",
  pearl: "no_rotation",
  perona: "27/03",
  rayleigh: "no_rotation",
  rebecca: "24/04",
  reiju: "17/04",
  robin: "24/04",
  ryuma: "20/03",
  sabo: "no_rotation",
  sanji: "03/04",
  satori: "no_rotation",
  shanks: "no_rotation",
  shura: "no_rotation",
  smoker: "06/02",
  tashigi: "no_rotation",
  teach: "no_rotation",
  urouge: "27/03",
  usopp: "27/03",
  uta: "20/03",
  van_augur: "24/04",
  vivi: "no_rotation",
  wapol: "no_rotation",
  yonji: "27/02",
  zoro: "20/03"
};

const WC_CURRENT_CHESTS = [
  ["kaku", "chopper", "reiju"],
  ["marco", "apoo", "jabra"]
];

const WC_NEXT_CHESTS = [
  ["rebecca", "van_augur", "robin"],
  ["leo", "capone_bege", "blueno"]
];

const WC_CURRENT_SET = new Set(WC_CURRENT_CHESTS.flat());

const WC_CLASS_DEFS = [
  { key: "tank",    icon: "sprites/icons_classes/icon_tank.png",    labelKey: "charactersGroupTank" },
  { key: "bruiser", icon: "sprites/icons_classes/icon_bruiser.png", labelKey: "charactersGroupBruiser" },
  { key: "dps",     icon: "sprites/icons_classes/icon_dps.png",     labelKey: "charactersGroupDps" },
  { key: "support", icon: "sprites/icons_classes/icon_support.png", labelKey: "charactersGroupSupport" },
];

// spriteId -> class key, built once from CHARACTER_GROUPS_CONFIG
let WC_SPRITE_CLASS = null;

function wcBuildSpriteClassMap() {
  WC_SPRITE_CLASS = {};
  if (typeof CHARACTER_GROUPS_CONFIG === "undefined") return;
  for (const cls of ["tank", "bruiser", "dps", "support"]) {
    for (const spriteId of (CHARACTER_GROUPS_CONFIG[cls] || [])) {
      WC_SPRITE_CLASS[spriteId] = cls;
    }
  }
}

// Keys from rotation data that differ from CHARACTER_NAME_TO_SPRITE_ID
const WC_EXTRA_KEY_MAP = {
  "buchi_&_sham": "bucchi_sham",
  "miss_doublefinger_(zala)": "miss_doublefinger",
  "mr._1": "mr_1",
  "mr._2": "mr_2",
  "mr._3": "mr_3",
  "mr._4": "mr_4",
  "mr._5": "mr_5"
};

function wcGetSpriteId(key) {
  if (WC_EXTRA_KEY_MAP[key]) return WC_EXTRA_KEY_MAP[key];
  if (CHARACTER_NAME_TO_SPRITE_ID[key]) return CHARACTER_NAME_TO_SPRITE_ID[key];
  return key;
}

function wcGetDisplayName(spriteId) {
  const ov = typeof CHARACTER_OVERRIDES !== "undefined" && CHARACTER_OVERRIDES[spriteId];
  if (ov && ov.name) return ov.name;
  return spriteId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function wcParseDate(dateStr) {
  const parts = dateStr.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const now = new Date();
  const d = new Date(now.getFullYear(), month - 1, day);
  // If more than ~6 months in the future, it belongs to the previous year
  if (d.getTime() - now.getTime() > 183 * 24 * 60 * 60 * 1000) {
    d.setFullYear(now.getFullYear() - 1);
  }
  return d;
}

function wcGetStatus(key, dateStr) {
  if (WC_CURRENT_SET.has(key)) return "current";
  if (dateStr === "no_rotation") return "no_rotation";
  const diffDays = (Date.now() - wcParseDate(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "purple";  // Future date
  if (diffDays <= 30) return "yellow";
  if (diffDays <= 60) return "orange";
  return "red";
}

function wcNormalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wcMatchesSearch(key, spriteId, query) {
  if (!query) return true;
  const q = wcNormalize(query);
  if (wcNormalize(key.replace(/[_&.()/]/g, " ")).includes(q)) return true;
  if (wcNormalize(wcGetDisplayName(spriteId)).includes(q)) return true;
  const ov = typeof CHARACTER_OVERRIDES !== "undefined" && CHARACTER_OVERRIDES[spriteId];
  if (ov && ov.aliases) {
    for (const alias of ov.aliases) {
      if (wcNormalize(alias).includes(q)) return true;
    }
  }
  return false;
}

function wcBuildChestChar(key, isNext) {
  const spriteId = wcGetSpriteId(key);
  const displayName = wcGetDisplayName(spriteId);
  return (
    `<div class="wc-chest-char" title="${displayName}">` +
      `<div class="wc-chest-char-sprite-wrap">` +
        `<img class="wc-chest-char-sprite" src="sprites/characters/${spriteId}.png" alt="${displayName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />` +
      `</div>` +
      `<div class="wc-chest-char-name">${displayName}</div>` +
    `</div>`
  );
}

function wcRenderChests() {
  const currentContainer = document.getElementById("wc-current-chests");
  const nextContainer = document.getElementById("wc-next-chests");
  if (!currentContainer || !nextContainer) return;

  function buildRows(chests, isNext) {
    return chests.map((row, i) => {
      const chars = row.map((key) => wcBuildChestChar(key, isNext)).join("");
      return (
        `<div class="wc-chest-row">` +
          `<span class="wc-chest-row-label">${t("wcChestLabel")} ${i + 1}</span>` +
          `<div class="wc-chest-row-chars">${chars}</div>` +
        `</div>`
      );
    }).join("");
  }

  currentContainer.innerHTML = buildRows(WC_CURRENT_CHESTS, false);
  nextContainer.innerHTML = buildRows(WC_NEXT_CHESTS, true);
}

function wcBuildCard(key, dateStr) {
  const spriteId = wcGetSpriteId(key);
  const displayName = wcGetDisplayName(spriteId);
  const status = wcGetStatus(key, dateStr);
  const dateLabel = dateStr === "no_rotation" ? "&mdash;" : dateStr;

  return (
    `<div class="wc-char-card wc-status-${status}" title="${displayName}">` +
      `<div class="wc-char-sprite-wrap">` +
        `<img class="wc-char-sprite" src="sprites/characters/${spriteId}.png" alt="${displayName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />` +
        `<div class="wc-char-date wc-date-${status}">${dateLabel}</div>` +
      `</div>` +
      `<div class="wc-char-name">${displayName}</div>` +
    `</div>`
  );
}

// Pre-computed per-character data built once at init; avoids repeated lookups inside sort
let WC_CHAR_CACHE = null;

function wcBuildCharCache() {
  if (!WC_SPRITE_CLASS) wcBuildSpriteClassMap();
  const now = Date.now();
  WC_CHAR_CACHE = Object.entries(WC_ROTATION_DATA).map(([key, dateStr]) => {
    const spriteId = wcGetSpriteId(key);
    const displayName = wcGetDisplayName(spriteId);
    const sortDate = dateStr === "no_rotation"
      ? -Infinity
      : (WC_CURRENT_SET.has(key) ? now : wcParseDate(dateStr).getTime());
    const charClass = WC_SPRITE_CLASS[spriteId] || null;
    const cardHtml = wcBuildCard(key, dateStr);
    return { key, dateStr, spriteId, displayName, sortName: displayName.toLowerCase(), sortDate, charClass, cardHtml };
  });
}

function wcRender() {
  const container = document.getElementById("wc-grid");
  if (!container) return;
  if (!WC_CHAR_CACHE) wcBuildCharCache();

  const query = (document.getElementById("wc-search-input") || {}).value || "";
  const hideNoRot = !!(document.getElementById("wc-hide-no-rotation") || {}).checked;
  const sortMode = (document.getElementById("wc-sort-select") || {}).value || "name_az";

  const entries = WC_CHAR_CACHE.slice();

  switch (sortMode) {
    case "name_za":     entries.sort((a, b) => b.sortName.localeCompare(a.sortName)); break;
    case "date_newest": entries.sort((a, b) => b.sortDate - a.sortDate);              break;
    case "date_oldest": entries.sort((a, b) => a.sortDate - b.sortDate);              break;
    default:            entries.sort((a, b) => a.sortName.localeCompare(b.sortName)); break;
  }

  const activeClasses = new Set(
    [...document.querySelectorAll(".wc-class-btn.is-active")].map((b) => b.dataset.wcClass)
  );

  let html = "";
  let count = 0;
  for (const entry of entries) {
    if (hideNoRot && entry.dateStr === "no_rotation") continue;
    if (activeClasses.size > 0 && !activeClasses.has(entry.charClass)) continue;
    if (!wcMatchesSearch(entry.key, entry.spriteId, query)) continue;
    html += entry.cardHtml;
    count++;
  }

  container.innerHTML = count === 0
    ? `<p class="wc-no-results">${t("wcNoResults")}</p>`
    : html;
}

function wcBuildFilterButtons() {
  const row = document.getElementById("wc-filter-row");
  if (!row) return;
  row.innerHTML = WC_CLASS_DEFS.map(({ key, icon, labelKey }) =>
    `<button type="button" class="characters-filter-toggle wc-class-btn" data-wc-class="${key}" title="${t(labelKey)}">` +
      `<img src="${icon}" alt="${t(labelKey)}" />` +
      `<span>${t(labelKey)}</span>` +
    `</button>`
  ).join("");
  row.querySelectorAll(".wc-class-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-active");
      requestAnimationFrame(wcRender);
    });
  });
}

function weeklyChestInit() {
  const searchInput = document.getElementById("wc-search-input");
  if (searchInput) {
    searchInput.placeholder = t("wcSearchPlaceholder");
    searchInput.addEventListener("input", wcRender);
  }
  const cb = document.getElementById("wc-hide-no-rotation");
  if (cb) cb.addEventListener("change", wcRender);
  const sortSel = document.getElementById("wc-sort-select");
  if (sortSel) sortSel.addEventListener("change", () => requestAnimationFrame(wcRender));
  wcBuildSpriteClassMap();
  wcBuildCharCache();
  wcBuildFilterButtons();
  wcRenderChests();
  wcRender();
}

function weeklyChestApplyTranslations() {
  const searchInput = document.getElementById("wc-search-input");
  if (searchInput) searchInput.placeholder = t("wcSearchPlaceholder");
  wcBuildFilterButtons();
  wcRenderChests();
  wcRender();
}
