// ============================================================
// Wanted Pirates tab - match-ups + 2 custom tier modes
// ============================================================

const WANTED_MAX_OPTIONS = 6;
const WANTED_TIER_STORAGE_KEY = "glacrystal_wanted_tier_list_v2";
const WANTED_TIER_IDS = ["s", "a", "b", "c", "d"];
const WANTED_TIER_COLORS = {
  s: "#f5bf3b",
  a: "#7fd16d",
  b: "#70bde8",
  c: "#b08be8",
  d: "#e07a7a"
};

const WANTED_ICON_ALIASES = {
  ace: "portgas_ace",
  apoo: "scratchmen_apoo",
  basil: "basil_hawkins",
  bn: "buggy",
  buchi_sham: "bucchi_sham",
  capone: "capone_bege",
  "capone_gang_bege": "capone_bege",
  "buchi_e_sham": "bucchi_sham",
  daddy: "daddy_masterson",
  daddy_masterson: "daddy_masterson",
  burgess: "jesus_burgess",
  burguess: "jesus_burgess",
  doffy: "doflamingo",
  drake: "x_drake",
  franky_pre: "franky",
  frankypre: "franky",
  garp: "monkey_garp",
  hancock: "boa_hancock",
  hawkins: "basil_hawkins",
  ichiji: "vinsmoke_ichiji",
  ivankov: "emporio_ivankov",
  kid: "eustass_kid",
  kizaru: "borsalino_kizaru",
  kuma: "bartholomew_kuma",
  law: "trafalgar_law",
  leo: "leo_mansherry",
  "leo_e_mansherry": "leo_mansherry",
  luffy: "monkey_luffy",
  "luffy_pre": "monkey_luffy",
  "luffy_ts": "monkey_luffy_ts",
  lucci: "rob_lucci",
  marguerite: "margareth",
  margareth: "margareth",
  "monkey_d_luffy": "monkey_luffy",
  moria: "gecko_moria",
  mr1: "mr_1",
  mr2: "mr_2",
  mr3: "mr_3",
  mr4: "mr_4",
  mr5: "mr_5",
  bonney: "jewelry_bonney",
  niji: "vinsmoke_niji",
  "nami_ts": "nami_ts",
  rayleigh: "silvers_rayleigh",
  mihawk: "dracule_mihawk",
  reiju: "vinsmoke_reiju",
  robin: "nico_robin",
  robin_ts: "nico_robin_ts",
  "robin_pre": "nico_robin",
  sanji: "vinsmoke_sanji",
  sanji_ts: "vinsmoke_sanji_ts",
  "sanji_pre": "vinsmoke_sanji",
  teach: "marshall_teach",
  yonji: "vinsmoke_yonji",
  "usopp_pre": "usopp",
  "usopp_ts": "usopp_ts",
  "vinsmoker_reiju": "vinsmoke_reiju",
  zoro: "roronoa_zoro",
  "zoro_pre": "roronoa_zoro",
  "zoro_ts": "roronoa_zoro_ts",
  "x_drake": "x_drake"
};

let wantedSubTabActive = "matchups";
let wantedDragPayload = null;
let wantedUniqueIdCounter = 1;

let wantedCounterPoolNames = [];
let wantedWantedNames = [];

let wantedTierState = {
  selectedWanted: "",
  assignments: {}
};

let wantedRowsState = {
  rows: []
};

function wantedInit() {
  const input = document.getElementById("wanted-search-input");
  const sortSelect = document.getElementById("wanted-sort-select");
  const rowsPanel = document.getElementById("wanted-subtab-rows");

  if (!input || !sortSelect) return;

  if (input.dataset.wantedBound !== "1") {
    input.dataset.wantedBound = "1";
    sortSelect.dataset.wantedBound = "1";

    input.addEventListener("input", () => wantedRenderRows(input.value));
    sortSelect.addEventListener("change", () => wantedRenderRows(input.value));

    const rowsTargetSelect = document.getElementById("wanted-rows-target-select");
    const rowsSearchInput = document.getElementById("wanted-rows-search-input");
    const rowsAddBtn = document.getElementById("wanted-rows-add-btn");
    const rowsClearBtn = document.getElementById("wanted-rows-clear-btn");
    const rowsResetBtn = document.getElementById("wanted-rows-reset-btn");

    if (rowsSearchInput) {
      rowsSearchInput.addEventListener("input", () => wantedRenderRowsMode());
    }
    if (rowsAddBtn && rowsTargetSelect) {
      rowsAddBtn.addEventListener("click", () => wantedAddWantedRow(rowsTargetSelect.value));
    }
    if (rowsClearBtn) {
      rowsClearBtn.addEventListener("click", wantedClearRowsCounters);
    }
    if (rowsResetBtn) {
      rowsResetBtn.addEventListener("click", wantedResetRowsMode);
    }
  }

  if (rowsPanel && rowsPanel.dataset.wantedDndBound !== "1") {
    rowsPanel.dataset.wantedDndBound = "1";
    rowsPanel.addEventListener("dragstart", wantedOnDragStart);
    rowsPanel.addEventListener("dragover", wantedOnDragOver);
    rowsPanel.addEventListener("dragleave", wantedOnDragLeave);
    rowsPanel.addEventListener("drop", wantedOnDrop);
    rowsPanel.addEventListener("dragend", wantedOnDragEnd);
    rowsPanel.addEventListener("dblclick", wantedOnDoubleClickRemove);
    rowsPanel.addEventListener("click", wantedOnClickRemove);
  }

  wantedEnsureState();
  wantedApplyTranslations();
  wantedRenderRows();
}

function wantedEnsureState() {
  wantedWantedNames = wantedCollectWantedNames();
  wantedCounterPoolNames = wantedCollectCharacterCounters();

  const saved = wantedLoadState();

  const selectedSaved = saved && saved.tier && typeof saved.tier.selectedWanted === "string"
    ? wantedCleanDisplayName(saved.tier.selectedWanted)
    : "";

  const selectedWanted = wantedWantedNames.includes(selectedSaved)
    ? selectedSaved
    : (wantedWantedNames[0] || "");

  wantedTierState = {
    selectedWanted,
    assignments: {}
  };

  const savedAssignments = saved && saved.tier && saved.tier.assignments && typeof saved.tier.assignments === "object"
    ? saved.tier.assignments
    : {};

  Object.keys(savedAssignments).forEach((wantedName) => {
    const cleanWanted = wantedCleanDisplayName(wantedName);
    if (!wantedWantedNames.includes(cleanWanted)) return;
    const key = wantedGetWantedStorageKey(cleanWanted);
    wantedTierState.assignments[key] = wantedNormalizeTierAssignment(savedAssignments[wantedName], cleanWanted);
  });

  wantedEnsureTierAssignment(selectedWanted);

  const savedRows = saved && saved.rows && Array.isArray(saved.rows.rows) ? saved.rows.rows : [];
  wantedRowsState = {
    rows: savedRows
      .map((row) => wantedNormalizeRowsEntry(row))
      .filter((row) => row && row.wantedName)
  };
}

function wantedLoadState() {
  try {
    const raw = window.localStorage.getItem(WANTED_TIER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_err) {
    return null;
  }
}

function wantedSaveState() {
  const assignments = {};
  Object.keys(wantedTierState.assignments || {}).forEach((key) => {
    const wantedName = wantedWantedNames.find((name) => wantedGetWantedStorageKey(name) === key);
    if (!wantedName) return;
    assignments[wantedName] = wantedTierState.assignments[key];
  });

  const payload = {
    tier: {
      selectedWanted: wantedTierState.selectedWanted,
      assignments
    },
    rows: {
      rows: wantedRowsState.rows
    }
  };

  try {
    window.localStorage.setItem(WANTED_TIER_STORAGE_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore storage failures
  }
}

function switchWantedSubTab(subTab, btn) {
  const safeSubTab = ["matchups", "rows"].includes(subTab) ? subTab : "matchups";
  wantedSubTabActive = safeSubTab;

  document.querySelectorAll(".wanted-subtab-btn").forEach((b) => {
    b.classList.toggle("active", b === btn || b.id === `wanted-subtab-btn-${safeSubTab}`);
    b.setAttribute("aria-selected", b.classList.contains("active") ? "true" : "false");
  });

  document.querySelectorAll(".wanted-subtab-panel").forEach((panel) => {
    const isActive = panel.id === `wanted-subtab-${safeSubTab}`;
    if (isActive) {
      panel.style.display = "block";
      panel.classList.remove("active");
      requestAnimationFrame(() => {
        panel.classList.add("active");
      });
    } else {
      panel.classList.remove("active");
      panel.style.display = "none";
    }
  });

  if (safeSubTab === "tierlist") wantedRenderTierList();
  if (safeSubTab === "rows") wantedRenderRowsMode();
}

function wantedApplyTranslations() {
  const input = document.getElementById("wanted-search-input");
  const tierSearchInput = document.getElementById("wanted-tier-search-input");
  const rowsSearchInput = document.getElementById("wanted-rows-search-input");

  if (input) input.placeholder = typeof t === "function" ? t("wantedSearchPlaceholder") : "Search";
  if (tierSearchInput) {
    tierSearchInput.placeholder = typeof t === "function" ? t("wantedTierSearchPlaceholder") : "Search counter";
    tierSearchInput.setAttribute("title", tierSearchInput.placeholder);
  }
  if (rowsSearchInput) {
    rowsSearchInput.placeholder = typeof t === "function" ? t("wantedTierSearchPlaceholder") : "Search counter";
    rowsSearchInput.setAttribute("title", rowsSearchInput.placeholder);
  }

  wantedRenderTierTargetSelect();
  wantedRenderRowsTargetSelect();
  wantedRenderHeader();
  wantedRenderRows(input ? input.value : "");
  wantedRenderTierList();
  wantedRenderRowsMode();
}

function wantedRenderHeader() {
  const thead = document.getElementById("wanted-table-head");
  if (!thead) return;

  let html = "<tr>";
  html += `<th>${t("wantedPirateColumn")}</th>`;
  for (let i = 1; i <= WANTED_MAX_OPTIONS; i++) {
    html += `<th>${t("wantedOptionColumn")} ${i}</th>`;
  }
  html += "</tr>";
  thead.innerHTML = html;
}

function wantedRenderRows(filterText = "") {
  const tbody = document.getElementById("wanted-table-body");
  const sortSelect = document.getElementById("wanted-sort-select");
  if (!tbody) return;

  const normalizedFilter = wantedNormalizeKey(filterText);
  let rows = WANTED_PIRATES_DATA.filter((row) => {
    if (!normalizedFilter) return true;
    return wantedNormalizeKey(row.wanted).includes(normalizedFilter);
  });

  if ((sortSelect && sortSelect.value) !== "original") {
    rows = [...rows].sort((a, b) => a.wanted.localeCompare(b.wanted, "pt-BR", { sensitivity: "base" }));
  }

  if (!rows.length) {
    tbody.innerHTML = `<tr><td class="wanted-empty" colspan="7">${wantedEscapeHtml(t("wantedNoResults"))}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => {
      const wantedCell = wantedBuildPersonCell(row.wanted, true);
      const options = [...row.options];
      while (options.length < WANTED_MAX_OPTIONS) options.push("");

      const optionCells = options
        .map((name, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? ` wanted-rank-${rank}` : "";
          return `<td class="wanted-rank${rankClass}">${wantedBuildRankCell(name)}</td>`;
        })
        .join("");

      return `<tr><td>${wantedCell}</td>${optionCells}</tr>`;
    })
    .join("");
}

function wantedBuildRankCell(rawValue) {
  const entries = wantedSplitRankEntries(rawValue);
  if (!entries.length) return "";
  if (entries.length === 1) return wantedBuildPersonCell(entries[0], false);

  const people = entries
    .map((name) => `<div class="wanted-rank-entry">${wantedBuildPersonCell(name, false)}</div>`)
    .join("");

  return `<div class="wanted-person-list">${people}</div>`;
}

function wantedSplitRankEntries(rawValue) {
  if (!rawValue) return [];
  return String(rawValue)
    .split(/\s*(?:\/|\||;)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function wantedBuildPersonCell(rawName, isWantedPirate = false) {
  const cleanedName = wantedCleanDisplayName(rawName);
  const iconPath = wantedGetPortraitPath(cleanedName);
  const escapedName = wantedEscapeHtml(cleanedName);
  const sizeClass = isWantedPirate ? " wanted-person-main" : "";

  return `
    <span class="wanted-person${sizeClass}">
      <img src="${iconPath}" alt="${escapedName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
      <span>${escapedName}</span>
    </span>
  `;
}

function wantedCollectWantedNames() {
  return [...new Set(
    WANTED_PIRATES_DATA
      .map((row) => wantedCleanDisplayName(row.wanted))
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}

function wantedCollectCharacterCounters() {
  if (typeof CHARACTERS_DATA !== "undefined" && Array.isArray(CHARACTERS_DATA) && CHARACTERS_DATA.length) {
    const names = CHARACTERS_DATA
      .map((character) => wantedCleanDisplayName(character && character.name))
      .filter(Boolean);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
  }

  // Fallback: derive from wanted sheet if character list is unavailable.
  const set = new Set();
  WANTED_PIRATES_DATA.forEach((row) => {
    if (row && row.wanted) set.add(wantedCleanDisplayName(row.wanted));
    (row.options || []).forEach((option) => {
      wantedSplitRankEntries(option).forEach((name) => set.add(wantedCleanDisplayName(name)));
    });
  });
  return [...set].filter(Boolean).sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}

function wantedGetWantedStorageKey(wantedName) {
  return wantedNormalizeKey(wantedName);
}

function wantedNormalizeTierAssignment(rawAssignment, selectedWanted) {
  const allSet = new Set(wantedCounterPoolNames.filter((name) => name !== selectedWanted));
  const tiers = {};
  const usedNames = new Set();

  WANTED_TIER_IDS.forEach((tierId) => {
    tiers[tierId] = wantedNormalizeEntryList(rawAssignment && rawAssignment.tiers ? rawAssignment.tiers[tierId] : [], allSet)
      .filter((entry) => {
        const key = wantedNormalizeKey(entry.name);
        if (usedNames.has(key)) return false;
        usedNames.add(key);
        return true;
      });
  });

  return { tiers };
}

function wantedNormalizeRowsEntry(rawRow) {
  if (!rawRow || typeof rawRow !== "object") return null;
  const wantedName = wantedCleanDisplayName(rawRow.wantedName || "");
  if (!wantedName) return null;

  return {
    id: rawRow.id || wantedMakeUid(),
    wantedName,
    counters: wantedNormalizeEntryList(rawRow.counters || [], new Set(wantedCounterPoolNames))
  };
}

function wantedNormalizeEntryList(list, allowedSet) {
  const rawList = Array.isArray(list) ? list : [];
  const seen = new Set();
  return rawList
    .map((entry) => {
      if (typeof entry === "string") {
        const name = wantedCleanDisplayName(entry);
        if (!name || (allowedSet && !allowedSet.has(name))) return null;
        return { id: wantedMakeUid(), name };
      }
      if (!entry || typeof entry !== "object") return null;
      const name = wantedCleanDisplayName(entry.name || "");
      if (!name || (allowedSet && !allowedSet.has(name))) return null;
      return { id: entry.id || wantedMakeUid(), name };
    })
    .filter((entry) => {
      if (!entry) return false;
      const key = wantedNormalizeKey(entry.name);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .filter(Boolean);
}

function wantedTierHasCounter(assignment, counterName, excludeEntryId = "") {
  if (!assignment || !counterName) return false;
  const keyToFind = wantedNormalizeKey(counterName);
  for (const tierId of WANTED_TIER_IDS) {
    const exists = (assignment.tiers[tierId] || []).some((entry) => {
      if (excludeEntryId && entry.id === excludeEntryId) return false;
      return wantedNormalizeKey(entry.name) === keyToFind;
    });
    if (exists) return true;
  }
  return false;
}

function wantedRowHasCounter(row, counterName, excludeEntryId = "") {
  if (!row || !counterName) return false;
  const keyToFind = wantedNormalizeKey(counterName);
  return (row.counters || []).some((entry) => {
    if (excludeEntryId && entry.id === excludeEntryId) return false;
    return wantedNormalizeKey(entry.name) === keyToFind;
  });
}

function wantedMakeUid() {
  wantedUniqueIdCounter += 1;
  return `w_${Date.now()}_${wantedUniqueIdCounter}`;
}

function wantedEnsureTierAssignment(wantedName) {
  if (!wantedName) return;
  const key = wantedGetWantedStorageKey(wantedName);
  if (!wantedTierState.assignments[key]) {
    wantedTierState.assignments[key] = wantedNormalizeTierAssignment(null, wantedName);
  } else {
    wantedTierState.assignments[key] = wantedNormalizeTierAssignment(wantedTierState.assignments[key], wantedName);
  }
}

function wantedGetCurrentTierAssignment() {
  const selectedWanted = wantedTierState.selectedWanted;
  if (!selectedWanted) return null;
  const key = wantedGetWantedStorageKey(selectedWanted);
  return wantedTierState.assignments[key] || null;
}

function wantedSelectTierWanted(wantedName) {
  const cleanWanted = wantedCleanDisplayName(wantedName);
  if (!wantedWantedNames.includes(cleanWanted)) return;

  wantedTierState.selectedWanted = cleanWanted;
  wantedEnsureTierAssignment(cleanWanted);
  wantedSaveState();
  wantedRenderTierTargetSelect();
  wantedRenderTierList();
}

function wantedRenderTierTargetSelect() {
  const select = document.getElementById("wanted-tier-target-select");
  if (!select) return;

  const currentValue = wantedTierState.selectedWanted || "";
  select.innerHTML = wantedWantedNames
    .map((name) => `<option value="${wantedEscapeHtml(name)}"${name === currentValue ? " selected" : ""}>${wantedEscapeHtml(name)}</option>`)
    .join("");

  if (currentValue) select.value = currentValue;
}

function wantedRenderRowsTargetSelect() {
  const select = document.getElementById("wanted-rows-target-select");
  if (!select) return;

  const currentValue = select.value;
  select.innerHTML = wantedWantedNames
    .map((name) => `<option value="${wantedEscapeHtml(name)}">${wantedEscapeHtml(name)}</option>`)
    .join("");

  if (currentValue && wantedWantedNames.includes(currentValue)) {
    select.value = currentValue;
  }
}

function wantedBuildPoolCardsHtml(filterText, contextClass) {
  const normalized = wantedNormalizeKey(filterText || "");
  const names = wantedCounterPoolNames.filter((name) => {
    if (!normalized) return true;
    return wantedNormalizeKey(name).includes(normalized);
  });

  return names.map((name) => wantedBuildCounterPoolCard(name, contextClass)).join("");
}

function wantedBuildCounterPoolCard(name, contextClass) {
  const { charName, weaponIcon } = wantedParseCounterName(name);
  const escapedName = wantedEscapeHtml(charName);
  const iconPath = wantedGetPortraitPath(name);
  const encodedName = encodeURIComponent(name);
  const compactClass = contextClass === "rows" ? " is-rows" : "";
  const tierClass = contextClass === "tier" ? " is-tier" : "";
  const weaponOverlay = weaponIcon
    ? `<img class="wanted-weapon-overlay" src="${wantedEscapeHtml(weaponIcon)}" alt="" />`
    : "";

  return `
    <article class="wanted-tier-card${compactClass}${tierClass}" draggable="true" data-counter-context="pool" data-pool-context="${contextClass}" data-counter-name="${encodedName}">
      <div class="wanted-portrait-wrap"><img src="${iconPath}" alt="${escapedName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />${weaponOverlay}</div>
      <span>${escapedName}</span>
    </article>
  `;
}

function wantedBuildCounterEntryCard(entry, context, extraData = "") {
  const { charName, weaponIcon } = wantedParseCounterName(entry.name);
  const escapedName = wantedEscapeHtml(charName);
  const iconPath = wantedGetPortraitPath(entry.name);
  const compactClass = context === "rows" ? " is-rows" : "";
  const tierClass = context === "tier" ? " is-tier" : "";
  const weaponOverlay = weaponIcon
    ? `<img class="wanted-weapon-overlay" src="${wantedEscapeHtml(weaponIcon)}" alt="" />`
    : "";

  return `
    <article class="wanted-tier-card${compactClass}${tierClass}" draggable="true" data-counter-context="${context}" data-entry-id="${wantedEscapeHtml(entry.id)}" ${extraData}>
      <div class="wanted-portrait-wrap"><img src="${iconPath}" alt="${escapedName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />${weaponOverlay}</div>
      <span>${escapedName}</span>
      <button type="button" class="wanted-counter-remove" data-remove-entry="${wantedEscapeHtml(entry.id)}">×</button>
    </article>
  `;
}

function wantedRenderTierList() {
  const board = document.getElementById("wanted-tier-board");
  const pool = document.getElementById("wanted-tier-pool");
  if (!board || !pool) return;

  wantedEnsureTierAssignment(wantedTierState.selectedWanted);
  const assignment = wantedGetCurrentTierAssignment();
  if (!assignment) return;

  const currentWanted = wantedTierState.selectedWanted || "";
  const currentWantedIcon = wantedGetPortraitPath(currentWanted);

  const tierRowsHtml = WANTED_TIER_IDS.map((tierId) => {
    const tierLabel = typeof t === "function" ? t(`wantedTierRow${tierId.toUpperCase()}`) : tierId.toUpperCase();
    const cardsHtml = (assignment.tiers[tierId] || [])
      .map((entry) => wantedBuildCounterEntryCard(entry, "tier", `data-tier-id="${tierId}"`))
      .join("");

    return `
      <section class="wanted-tier-row" data-tier-row="${tierId}">
        <div class="wanted-tier-label wanted-tier-label-${tierId}">${wantedEscapeHtml(tierLabel)}</div>
        <div class="wanted-tier-dropzone wanted-tier-cards" data-tier-target="${tierId}">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join("");

  board.innerHTML = `
    <div class="wanted-tier-category-banner">
      <img src="${currentWantedIcon}" alt="${wantedEscapeHtml(currentWanted)}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
      <strong>${wantedEscapeHtml(currentWanted)}</strong>
    </div>
    ${tierRowsHtml}
  `;

  const searchInput = document.getElementById("wanted-tier-search-input");
  pool.setAttribute("data-tier-target", "pool");
  pool.innerHTML = wantedBuildPoolCardsHtml(searchInput ? searchInput.value : "", "tier");
}

function wantedAddWantedRow(wantedName) {
  const cleanWanted = wantedCleanDisplayName(wantedName);
  if (!cleanWanted) return;

  const alreadyExists = wantedRowsState.rows.some((row) => row.wantedName === cleanWanted);
  if (alreadyExists) {
    if (typeof showToast === "function") showToast(t("wantedRowsAlreadyAdded"));
    return;
  }

  wantedRowsState.rows.push({
    id: wantedMakeUid(),
    wantedName: cleanWanted,
    counters: []
  });

  wantedSaveState();
  wantedRenderRowsMode();
}

function wantedRenderRowsMode() {
  const board = document.getElementById("wanted-rows-board");
  const pool = document.getElementById("wanted-rows-pool");
  if (!board || !pool) return;

  if (!wantedRowsState.rows.length) {
    board.innerHTML = `<div class="wanted-tier-category-banner">${wantedEscapeHtml(t("wantedRowsEmpty"))}</div>`;
  } else {
    board.innerHTML = wantedRowsState.rows.map((row) => {
      const cards = row.counters
        .map((entry) => wantedBuildCounterEntryCard(entry, "rows", `data-row-id="${wantedEscapeHtml(row.id)}"`))
        .join("");

      return `
        <section class="wanted-tier-row wanted-row-line" data-row-line="${wantedEscapeHtml(row.id)}">
          <div class="wanted-row-wanted-box">
            <div class="wanted-row-title">
              <img src="${wantedGetPortraitPath(row.wantedName)}" alt="${wantedEscapeHtml(row.wantedName)}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
            </div>
          </div>
          <div class="wanted-tier-dropzone wanted-row-dropzone" data-row-target="${wantedEscapeHtml(row.id)}">
            <div class="wanted-row-actions">
              <button type="button" class="wanted-row-remove" data-remove-row="${wantedEscapeHtml(row.id)}">${wantedEscapeHtml(t("wantedRowsRemoveRow"))}</button>
            </div>
            <div class="wanted-tier-cards">${cards}</div>
          </div>
        </section>
      `;
    }).join("");
  }

  const rowsSearchInput = document.getElementById("wanted-rows-search-input");
  pool.innerHTML = wantedBuildPoolCardsHtml(rowsSearchInput ? rowsSearchInput.value : "", "rows");
}

function wantedClearTierRows() {
  wantedEnsureTierAssignment(wantedTierState.selectedWanted);
  const assignment = wantedGetCurrentTierAssignment();
  if (!assignment) return;

  WANTED_TIER_IDS.forEach((tierId) => {
    assignment.tiers[tierId] = [];
  });

  wantedSaveState();
  wantedRenderTierList();
}

function wantedResetTierList() {
  const selectedWanted = wantedTierState.selectedWanted;
  if (!selectedWanted) return;

  const key = wantedGetWantedStorageKey(selectedWanted);
  wantedTierState.assignments[key] = wantedNormalizeTierAssignment(null, selectedWanted);

  wantedSaveState();
  wantedRenderTierList();
}

function wantedClearRowsCounters() {
  wantedRowsState.rows = wantedRowsState.rows.map((row) => ({
    ...row,
    counters: []
  }));
  wantedSaveState();
  wantedRenderRowsMode();
}

function wantedResetRowsMode() {
  wantedRowsState.rows = [];
  wantedSaveState();
  wantedRenderRowsMode();
}

function wantedOnDragStart(event) {
  const card = event.target && event.target.closest ? event.target.closest(".wanted-tier-card") : null;
  if (!card) return;

  const context = card.getAttribute("data-counter-context");
  if (!context) return;

  if (context === "pool") {
    const name = decodeURIComponent(card.getAttribute("data-counter-name") || "");
    if (!name) return;

    wantedDragPayload = {
      context: "pool",
      name,
      poolContext: card.getAttribute("data-pool-context") || "tier"
    };
  } else if (context === "tier") {
    wantedDragPayload = {
      context: "tier",
      entryId: card.getAttribute("data-entry-id") || "",
      tierId: card.getAttribute("data-tier-id") || ""
    };
  } else if (context === "rows") {
    wantedDragPayload = {
      context: "rows",
      entryId: card.getAttribute("data-entry-id") || "",
      rowId: card.getAttribute("data-row-id") || ""
    };
  }

  if (!wantedDragPayload) return;

  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", JSON.stringify(wantedDragPayload));
}

function wantedOnDragOver(event) {
  const tierTarget = event.target && event.target.closest ? event.target.closest("[data-tier-target], [data-row-target]") : null;
  if (!tierTarget) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  tierTarget.classList.add("is-drag-over");
}

function wantedOnDragLeave(event) {
  const tierTarget = event.target && event.target.closest ? event.target.closest("[data-tier-target], [data-row-target]") : null;
  if (!tierTarget) return;
  tierTarget.classList.remove("is-drag-over");
}

function wantedOnDrop(event) {
  const dropZone = event.target && event.target.closest ? event.target.closest("[data-tier-target], [data-row-target]") : null;
  if (!dropZone) return;

  event.preventDefault();
  dropZone.classList.remove("is-drag-over");

  let payload = wantedDragPayload;
  const rawPayload = event.dataTransfer.getData("text/plain");
  if (rawPayload) {
    try {
      payload = JSON.parse(rawPayload);
    } catch (_err) {
      payload = wantedDragPayload;
    }
  }

  if (!payload) return;

  const tierTarget = dropZone.getAttribute("data-tier-target");
  const rowTarget = dropZone.getAttribute("data-row-target");

  if (tierTarget) {
    wantedHandleDropToTier(payload, tierTarget);
  } else if (rowTarget) {
    wantedHandleDropToRow(payload, rowTarget);
  }
}

function wantedHandleDropToTier(payload, tierTarget) {
  wantedEnsureTierAssignment(wantedTierState.selectedWanted);
  const assignment = wantedGetCurrentTierAssignment();
  if (!assignment) return;

  if (tierTarget === "pool") {
    if (payload.context === "tier") {
      WANTED_TIER_IDS.forEach((tierId) => {
        assignment.tiers[tierId] = (assignment.tiers[tierId] || []).filter((entry) => entry.id !== payload.entryId);
      });
      wantedSaveState();
      wantedRenderTierList();
    }
    return;
  }

  if (!WANTED_TIER_IDS.includes(tierTarget)) return;

  if (payload.context === "pool") {
    if (wantedTierHasCounter(assignment, payload.name)) return;
    assignment.tiers[tierTarget].push({ id: wantedMakeUid(), name: payload.name });
  } else if (payload.context === "tier") {
    let moved = null;
    let sourceTier = "";
    WANTED_TIER_IDS.forEach((tierId) => {
      const source = assignment.tiers[tierId] || [];
      const idx = source.findIndex((entry) => entry.id === payload.entryId);
      if (idx !== -1) {
        moved = source[idx];
        sourceTier = tierId;
      }
    });
    if (!moved) return;
    if (sourceTier === tierTarget) return;
    if (wantedTierHasCounter(assignment, moved.name, moved.id)) return;
    assignment.tiers[sourceTier] = (assignment.tiers[sourceTier] || []).filter((entry) => entry.id !== moved.id);
    assignment.tiers[tierTarget].push(moved);
  } else if (payload.context === "rows") {
    const row = wantedRowsState.rows.find((r) => r.id === payload.rowId);
    if (row) {
      const entry = row.counters.find((item) => item.id === payload.entryId);
      if (entry && !wantedTierHasCounter(assignment, entry.name)) {
        assignment.tiers[tierTarget].push({ id: wantedMakeUid(), name: entry.name });
      }
    }
  }

  wantedSaveState();
  wantedRenderTierList();
}

function wantedHandleDropToRow(payload, rowId) {
  const row = wantedRowsState.rows.find((r) => r.id === rowId);
  if (!row) return;

  if (payload.context === "pool") {
    if (wantedRowHasCounter(row, payload.name)) return;
    row.counters.push({ id: wantedMakeUid(), name: payload.name });
  } else if (payload.context === "rows") {
    const sourceRow = wantedRowsState.rows.find((r) => r.id === payload.rowId);
    if (!sourceRow) return;

    const idx = sourceRow.counters.findIndex((entry) => entry.id === payload.entryId);
    if (idx === -1) return;

    const movedEntry = sourceRow.counters[idx];
    if (wantedRowHasCounter(row, movedEntry.name, movedEntry.id)) return;

    const [moved] = sourceRow.counters.splice(idx, 1);
    row.counters.push(moved);
  } else if (payload.context === "tier") {
    const assignment = wantedGetCurrentTierAssignment();
    if (!assignment) return;

    let found = null;
    WANTED_TIER_IDS.forEach((tierId) => {
      if (found) return;
      const entry = (assignment.tiers[tierId] || []).find((item) => item.id === payload.entryId);
      if (entry) found = entry;
    });

    if (found && !wantedRowHasCounter(row, found.name)) {
      row.counters.push({ id: wantedMakeUid(), name: found.name });
    }
  }

  wantedSaveState();
  wantedRenderRowsMode();
}

function wantedOnDragEnd() {
  wantedDragPayload = null;
  document.querySelectorAll(".wanted-tier-card.is-dragging").forEach((card) => card.classList.remove("is-dragging"));
  document.querySelectorAll(".wanted-tier-dropzone.is-drag-over, .wanted-row-dropzone.is-drag-over").forEach((zone) => zone.classList.remove("is-drag-over"));
}

function wantedOnDoubleClickRemove(event) {
  const card = event.target && event.target.closest ? event.target.closest(".wanted-tier-card[data-counter-context='tier'], .wanted-tier-card[data-counter-context='rows']") : null;
  if (!card) return;

  const entryId = card.getAttribute("data-entry-id") || "";
  if (!entryId) return;

  if (card.getAttribute("data-counter-context") === "tier") {
    wantedRemoveTierEntry(entryId);
  } else {
    const rowId = card.getAttribute("data-row-id") || "";
    wantedRemoveRowEntry(rowId, entryId);
  }
}

function wantedOnClickRemove(event) {
  const removeEntryBtn = event.target && event.target.closest ? event.target.closest(".wanted-counter-remove") : null;
  if (removeEntryBtn) {
    const card = removeEntryBtn.closest(".wanted-tier-card");
    if (!card) return;

    const entryId = card.getAttribute("data-entry-id") || "";
    if (!entryId) return;

    if (card.getAttribute("data-counter-context") === "tier") {
      wantedRemoveTierEntry(entryId);
    } else if (card.getAttribute("data-counter-context") === "rows") {
      const rowId = card.getAttribute("data-row-id") || "";
      wantedRemoveRowEntry(rowId, entryId);
    }
    return;
  }

  const removeRowBtn = event.target && event.target.closest ? event.target.closest("[data-remove-row]") : null;
  if (removeRowBtn) {
    const rowId = removeRowBtn.getAttribute("data-remove-row") || "";
    wantedRowsState.rows = wantedRowsState.rows.filter((row) => row.id !== rowId);
    wantedSaveState();
    wantedRenderRowsMode();
  }
}

function wantedRemoveTierEntry(entryId) {
  const assignment = wantedGetCurrentTierAssignment();
  if (!assignment) return;

  WANTED_TIER_IDS.forEach((tierId) => {
    assignment.tiers[tierId] = (assignment.tiers[tierId] || []).filter((entry) => entry.id !== entryId);
  });

  wantedSaveState();
  wantedRenderTierList();
}

function wantedRemoveRowEntry(rowId, entryId) {
  const row = wantedRowsState.rows.find((item) => item.id === rowId);
  if (!row) return;

  row.counters = row.counters.filter((entry) => entry.id !== entryId);
  wantedSaveState();
  wantedRenderRowsMode();
}

async function wantedExportTierListImage() {
  wantedEnsureTierAssignment(wantedTierState.selectedWanted);
  const assignment = wantedGetCurrentTierAssignment();
  if (!assignment) return;

  const selectedWanted = wantedTierState.selectedWanted || "";
  const rows = WANTED_TIER_IDS.map((tierId) => ({
    id: tierId,
    label: typeof t === "function" ? t(`wantedTierRow${tierId.toUpperCase()}`) : tierId.toUpperCase(),
    items: [...(assignment.tiers[tierId] || [])].map((entry) => entry.name)
  }));

  const cardW = 188;
  const cardH = 58;
  const cardGapX = 10;
  const cardGapY = 10;
  const outerPad = 28;
  const labelW = 86;
  const boardW = 1600;
  const cardsAreaW = boardW - outerPad * 2 - labelW - 16;
  const perRow = Math.max(1, Math.floor((cardsAreaW + cardGapX) / (cardW + cardGapX)));

  let totalHeight = outerPad + 76;
  rows.forEach((row) => {
    const lineCount = Math.max(1, Math.ceil(row.items.length / perRow));
    const cardsHeight = lineCount * cardH + (lineCount - 1) * cardGapY;
    const rowHeight = Math.max(74, cardsHeight + 16);
    row._height = rowHeight;
    totalHeight += rowHeight + 12;
  });
  totalHeight += outerPad;

  const canvas = document.createElement("canvas");
  canvas.width = boardW;
  canvas.height = totalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageMap = await wantedLoadTierImages(rows);

  const bg = ctx.createLinearGradient(0, 0, boardW, totalHeight);
  bg.addColorStop(0, "#2d160c");
  bg.addColorStop(1, "#16100a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, boardW, totalHeight);

  ctx.fillStyle = "#f6d487";
  ctx.font = "700 40px Georgia";
  ctx.fillText(typeof t === "function" ? t("wantedSubtabTierList") : "Wanted Tier List", outerPad, outerPad + 34);

  ctx.fillStyle = "rgba(255, 225, 154, 0.78)";
  ctx.font = "500 20px Georgia";
  const subtitle = `${typeof t === "function" ? t("wantedTierTargetLabel") : "Wanted"}: ${selectedWanted}`;
  ctx.fillText(subtitle, outerPad, outerPad + 62);
  ctx.fillText(new Date().toLocaleString(), boardW - 280, outerPad + 62);

  let y = outerPad + 76;
  rows.forEach((row) => {
    const rowH = row._height;
    wantedCanvasRoundRect(ctx, outerPad, y, boardW - outerPad * 2, rowH, 14);
    ctx.fillStyle = "rgba(25, 15, 10, 0.86)";
    ctx.fill();

    wantedCanvasRoundRect(ctx, outerPad + 8, y + 8, labelW - 8, rowH - 16, 10);
    ctx.fillStyle = WANTED_TIER_COLORS[row.id] || "#c9a24e";
    ctx.fill();

    ctx.fillStyle = "#241503";
    ctx.font = "700 30px Georgia";
    ctx.fillText(row.label, outerPad + 24, y + rowH / 2 + 10);

    row.items.forEach((name, index) => {
      const col = index % perRow;
      const line = Math.floor(index / perRow);
      const x = outerPad + labelW + 12 + col * (cardW + cardGapX);
      const cardY = y + 8 + line * (cardH + cardGapY);

      wantedCanvasRoundRect(ctx, x, cardY, cardW, cardH, 9);
      ctx.fillStyle = "#3a2410";
      ctx.fill();
      ctx.strokeStyle = "rgba(244, 210, 126, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const icon = imageMap.get(name);
      if (icon) ctx.drawImage(icon, x + 8, cardY + 8, 42, 42);

      ctx.fillStyle = "#f8e6ba";
      ctx.font = "600 18px Georgia";
      ctx.fillText(wantedFitText(ctx, name, cardW - 62), x + 56, cardY + 34);
    });

    y += rowH + 12;
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `wanted-tier-list-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  if (typeof showToast === "function") showToast(t("wantedTierExportSuccess"));
}

function wantedLoadTierImages(rows) {
  const names = new Set();
  rows.forEach((row) => row.items.forEach((name) => names.add(name)));

  const promises = [...names].map((name) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve([name, img]);
    img.onerror = () => {
      const fallback = new Image();
      fallback.onload = () => resolve([name, fallback]);
      fallback.onerror = () => resolve([name, null]);
      fallback.src = "sprites/branding/logo_0.png";
    };
    img.src = wantedGetPortraitPath(name);
  }));

  return Promise.all(promises).then((entries) => new Map(entries.filter((entry) => entry[1])));
}

function wantedCanvasRoundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wantedFitText(ctx, value, maxWidth) {
  const text = String(value || "");
  if (!text) return "";
  if (ctx.measureText(text).width <= maxWidth) return text;

  let result = text;
  while (result.length > 1 && ctx.measureText(`${result}...`).width > maxWidth) {
    result = result.slice(0, -1);
  }
  return `${result}...`;
}

function wantedGetPortraitPath(name) {
  const base = String(name || "");
  const p = base.indexOf("|");
  const clean = p !== -1 ? base.slice(0, p) : base;
  const key = wantedNormalizeKey(clean);
  const mapped = WANTED_ICON_ALIASES[key] || key;
  return `sprites/characters/${mapped}.png`;
}

function wantedCleanDisplayName(name) {
  if (!name) return "";
  return String(name)
    .replace(/\([^)]*\*\)?/g, "")
    .replace(/\d+\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wantedNormalizeKey(name) {
  return wantedCleanDisplayName(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
    .replace(/^mr_([1-5])$/, "mr_$1")
    .replace(/^mr([1-5])$/, "mr_$1");
}

function wantedEscapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// Inimigo tab – tier list com categorias (Wanteds / Worldbosses / Marineford)
// ============================================================

const TIERLIST_STORAGE_KEY = "glacrystal_inimigo_tier_v1";
const TIERLIST_COLUMN_IDS = ["tank", "support", "dps"];
const TIERLIST_COLUMN_COLORS = { tank: "#e07a7a", support: "#7fd16d", dps: "#70bde8" };
function tierlistColumnLabels() {
  const tr = typeof t === "function";
  return { tank: tr ? t("tierlistColumnTank") : "Tank", support: tr ? t("tierlistColumnSupport") : "Support", dps: tr ? t("tierlistColumnDps") : "DPS" };
}

const TIERLIST_WORLD_BOSSES = [
  "Shai-Hulud", "Mihawk", "Hiking Bear", "Byakko", "Bananawani", "Plesiosaur", "Aokiji"
];

const TIERLIST_WB_ICONS = {
  "Shai-Hulud":  "sprites/world_bosses/shai_hulud/top_1_icon.gif",
  "Mihawk":      "sprites/world_bosses/mihawk/top_1_icon.gif",
  "Hiking Bear": "sprites/world_bosses/hiking_bear/top_1_icon.gif",
  "Byakko":      "sprites/world_bosses/byakko/top_1_icon.gif",
  "Bananawani":  "sprites/world_bosses/bananawani/top_1_icon.gif",
  "Plesiosaur":  "sprites/world_bosses/plesiosaur/top_1_icon.gif",
  "Aokiji":      "sprites/world_bosses/aokiji/top_1_icon_aokiji.gif"
};

// weapon key → character sprite id (from items.js weapon.variants, lines 345-545)
const TIERLIST_ARMED_POOL = [
  { weaponKey: "hawkins_warabide",  spriteId: "basil_hawkins"     },
  { weaponKey: "urouge_pencil",     spriteId: "urouge"            },
  { weaponKey: "bonney_meat",       spriteId: "jewelry_bonney"    },
  { weaponKey: "xdrake_weapons",    spriteId: "x_drake"           },
  { weaponKey: "capone_pistol",     spriteId: "capone_bege"       },
  { weaponKey: "killer_punisher",   spriteId: "killer"            },
  { weaponKey: "kid_knife_pistol",  spriteId: "eustass_kid"       },
  { weaponKey: "law_kikoku",        spriteId: "trafalgar_law"     },
  { weaponKey: "apoo_tonfas",       spriteId: "scratchmen_apoo"   },
  { weaponKey: "aokiji_sword",      spriteId: "aokiji"            },
  { weaponKey: "smoker_jitte",      spriteId: "smoker"            },
  { weaponKey: "dalmatian_claws",   spriteId: "dalmatian"         },
  { weaponKey: "hina_iron_bar",     spriteId: "hina"              },
  { weaponKey: "rebecca_longsword", spriteId: "rebecca"           },
  { weaponKey: "leo_needles",       spriteId: "leo_mansherry"     },
  { weaponKey: "koala_gloves",      spriteId: "koala"             },
  { weaponKey: "reiju_raid_suit",   spriteId: "vinsmoke_reiju"    },
  { weaponKey: "ichiji_raid_suit",  spriteId: "vinsmoke_ichiji"   },
  { weaponKey: "niji_raid_suit",    spriteId: "vinsmoke_niji"     },
  { weaponKey: "yonji_raid_suit",   spriteId: "vinsmoke_yonji"    },
];

function tierlistEmptyColumnAssignment() {
  const obj = {};
  TIERLIST_COLUMN_IDS.forEach((col) => {
    obj[col] = {};
    WANTED_TIER_IDS.forEach((rank) => { obj[col][rank] = []; });
  });
  return obj;
}

// Upgrade old flat-array column assignment (from before ranks were added) to ranked structure.
function tierlistNormalizeColumnAssignment(raw) {
  if (!raw || typeof raw !== "object") return tierlistEmptyColumnAssignment();
  const out = tierlistEmptyColumnAssignment();
  TIERLIST_COLUMN_IDS.forEach((col) => {
    const colData = raw[col];
    if (!colData) return;
    if (Array.isArray(colData)) {
      out[col].s = colData.map((e) => ({ id: e.id || wantedMakeUid(), name: e.name || "" }));
    } else if (typeof colData === "object") {
      WANTED_TIER_IDS.forEach((rank) => {
        if (Array.isArray(colData[rank])) {
          out[col][rank] = colData[rank].map((e) => ({ id: e.id || wantedMakeUid(), name: e.name || "" }));
        }
      });
    }
  });
  return out;
}

// Split a combined column-rank drop target "tank_s" → { col: "tank", rank: "s" } or null.
function tierlistParseColRankTarget(tierTarget) {
  if (typeof tierTarget !== "string") return null;
  const sep = tierTarget.lastIndexOf("_");
  if (sep === -1) return null;
  const col  = tierTarget.slice(0, sep);
  const rank = tierTarget.slice(sep + 1);
  if (!TIERLIST_COLUMN_IDS.includes(col) || !WANTED_TIER_IDS.includes(rank)) return null;
  return { col, rank };
}

// Parse "CharName|weaponKey" into { charName, weaponIcon } or { charName: name, weaponIcon: null }.
function wantedParseCounterName(name) {
  const s = String(name || "");
  const p = s.indexOf("|");
  if (p === -1) return { charName: s, weaponIcon: null };
  const charName  = s.slice(0, p);
  const weaponKey = s.slice(p + 1);
  let weaponIcon = null;
  if (typeof items !== "undefined" && items.weapon && items.weapon.variants) {
    const w = items.weapon.variants[weaponKey];
    if (w) weaponIcon = w.icon;
  }
  return { charName, weaponIcon };
}

let tierlistState = {
  selectedCategory: "wanteds",
  selectedEnemy: "",
  wantedAssignments: {},
  columnAssignments: {}
};

let tierlistDragPayload = null;

function tierlistInit() {
  const categorySelect = document.getElementById("tierlist-category-select");
  const enemySelect    = document.getElementById("tierlist-enemy-select");
  const searchInput    = document.getElementById("tierlist-tier-search-input");
  const clearBtn       = document.getElementById("tierlist-tier-clear-btn");
  const resetBtn       = document.getElementById("tierlist-tier-reset-btn");
  const exportBtn      = document.getElementById("tierlist-tier-export-btn");
  const panel          = document.getElementById("tierlist");

  if (!categorySelect || !enemySelect) return;

  if (!wantedWantedNames.length) wantedEnsureState();

  if (categorySelect.dataset.tierlistBound !== "1") {
    categorySelect.dataset.tierlistBound = "1";
    categorySelect.addEventListener("change", () => tierlistOnCategoryChange(categorySelect.value));
    enemySelect.addEventListener("change", () => {
      tierlistState.selectedEnemy = enemySelect.value;
      tierlistSaveState();
      tierlistRenderBoard();
      tierlistRenderPool();
    });
    if (searchInput) searchInput.addEventListener("input", () => tierlistRenderPool());
    if (clearBtn)    clearBtn.addEventListener("click", tierlistClearTiers);
    if (resetBtn)    resetBtn.addEventListener("click", tierlistResetTiers);
    if (exportBtn)   exportBtn.addEventListener("click", tierlistExportImage);
  }

  if (panel && panel.dataset.tierlistDndBound !== "1") {
    panel.dataset.tierlistDndBound = "1";
    panel.addEventListener("dragstart", tierlistOnDragStart);
    panel.addEventListener("dragover",  tierlistOnDragOver);
    panel.addEventListener("dragleave", tierlistOnDragLeave);
    panel.addEventListener("drop",      tierlistOnDrop);
    panel.addEventListener("dragend",   tierlistOnDragEnd);
    panel.addEventListener("dblclick",  tierlistOnDoubleClickRemove);
    panel.addEventListener("click",     tierlistOnClickRemove);
  }

  tierlistLoadState();
  tierlistRenderCategorySelect();
  tierlistRenderEnemySelect();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistLoadState() {
  try {
    const raw = window.localStorage.getItem(TIERLIST_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return;
    tierlistState.selectedCategory = ["wanteds","worldbosses","marineford"].includes(parsed.selectedCategory)
      ? parsed.selectedCategory : "wanteds";
    tierlistState.selectedEnemy      = typeof parsed.selectedEnemy === "string" ? parsed.selectedEnemy : "";
    tierlistState.wantedAssignments  = (parsed.wantedAssignments  && typeof parsed.wantedAssignments  === "object") ? parsed.wantedAssignments  : {};
    if (parsed.columnAssignments && typeof parsed.columnAssignments === "object") {
      const normalized = {};
      Object.keys(parsed.columnAssignments).forEach((key) => {
        normalized[key] = tierlistNormalizeColumnAssignment(parsed.columnAssignments[key]);
      });
      tierlistState.columnAssignments = normalized;
    } else {
      tierlistState.columnAssignments = {};
    }
  } catch (_err) {}
}

function tierlistSaveState() {
  try {
    window.localStorage.setItem(TIERLIST_STORAGE_KEY, JSON.stringify(tierlistState));
  } catch (_err) {}
}

function tierlistGetEnemyListForCategory(category) {
  if (category === "wanteds")     return wantedWantedNames;
  if (category === "worldbosses") return TIERLIST_WORLD_BOSSES;
  if (category === "marineford")  return ["Marineford"];
  return [];
}

function tierlistGetEnemyIcon(enemy, category) {
  if (category === "wanteds")     return wantedGetPortraitPath(enemy);
  if (category === "worldbosses") return TIERLIST_WB_ICONS[enemy] || "sprites/branding/logo_0.png";
  if (category === "marineford")  return "sprites/marineford/marineford.png";
  return "sprites/branding/logo_0.png";
}

function tierlistGetColumnKey(name) {
  return wantedNormalizeKey(name);
}

function tierlistOnCategoryChange(category) {
  tierlistState.selectedCategory = category;
  tierlistRenderCategorySelect();
  tierlistRenderEnemySelect();
  tierlistSaveState();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistRenderCategorySelect() {
  const select = document.getElementById("tierlist-category-select");
  if (select) select.value = tierlistState.selectedCategory;
}

function tierlistRenderEnemySelect() {
  const select = document.getElementById("tierlist-enemy-select");
  if (!select) return;
  const names       = tierlistGetEnemyListForCategory(tierlistState.selectedCategory);
  const validEnemy  = names.includes(tierlistState.selectedEnemy) ? tierlistState.selectedEnemy : (names[0] || "");
  tierlistState.selectedEnemy = validEnemy;
  select.innerHTML = names
    .map((n) => `<option value="${wantedEscapeHtml(n)}"${n === validEnemy ? " selected" : ""}>${wantedEscapeHtml(n)}</option>`)
    .join("");
}

function tierlistRenderBoard() {
  const board = document.getElementById("tierlist-tier-board");
  if (!board) return;
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) { board.innerHTML = ""; return; }

  const icon = wantedEscapeHtml(tierlistGetEnemyIcon(enemy, category));
  const name = wantedEscapeHtml(enemy);
  const banner = `<div class="wanted-tier-category-banner">
    <img src="${icon}" alt="${name}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
    <strong>${name}</strong>
  </div>`;

  if (category === "wanteds") {
    const key = wantedGetWantedStorageKey(enemy);
    if (!tierlistState.wantedAssignments[key]) {
      tierlistState.wantedAssignments[key] = wantedNormalizeTierAssignment(null, enemy);
    }
    const assignment = tierlistState.wantedAssignments[key];
    const rowsHtml = WANTED_TIER_IDS.map((tid) => {
      const label    = typeof t === "function" ? t(`wantedTierRow${tid.toUpperCase()}`) : tid.toUpperCase();
      const cardsHtml = (assignment.tiers[tid] || [])
        .map((e) => wantedBuildCounterEntryCard(e, "tier", `data-tier-id="${tid}"`))
        .join("");
      return `<section class="wanted-tier-row" data-tier-row="${tid}">
        <div class="wanted-tier-label wanted-tier-label-${tid}">${wantedEscapeHtml(label)}</div>
        <div class="wanted-tier-dropzone wanted-tier-cards" data-tier-target="${tid}">${cardsHtml}</div>
      </section>`;
    }).join("");
    board.innerHTML = banner + rowsHtml;
  } else {
    const key = tierlistGetColumnKey(enemy);
    if (!tierlistState.columnAssignments[key]) {
      tierlistState.columnAssignments[key] = tierlistEmptyColumnAssignment();
    }
    const assignment = tierlistState.columnAssignments[key];
    const labels = tierlistColumnLabels();
    const colsHtml = TIERLIST_COLUMN_IDS.map((col) => {
      const colData = assignment[col] || {};
      const ranksHtml = WANTED_TIER_IDS.map((rank) => {
        const rankLabel = typeof t === "function" ? t(`wantedTierRow${rank.toUpperCase()}`) : rank.toUpperCase();
        const cardsHtml = (colData[rank] || [])
          .map((e) => wantedBuildCounterEntryCard(e, "tier", `data-tier-id="${col}_${rank}"`))
          .join("");
        return `<section class="wanted-tier-row tierlist-rank-row" data-tier-row="${rank}">
          <div class="wanted-tier-label wanted-tier-label-${rank}">${wantedEscapeHtml(rankLabel)}</div>
          <div class="wanted-tier-dropzone wanted-tier-cards" data-tier-target="${col}_${rank}">${cardsHtml}</div>
        </section>`;
      }).join("");
      return `<div class="tierlist-column">
        <div class="tierlist-column-header" style="background:${TIERLIST_COLUMN_COLORS[col]}">${wantedEscapeHtml(labels[col])}</div>
        ${ranksHtml}
      </div>`;
    }).join("");
    board.innerHTML = banner + `<div class="tierlist-columns-layout">${colsHtml}</div>`;
  }
}

function tierlistRenderPool() {
  const pool        = document.getElementById("tierlist-tier-pool");
  const searchInput = document.getElementById("tierlist-tier-search-input");
  if (!pool) return;
  pool.setAttribute("data-tier-target", "pool");
  const filter = searchInput ? searchInput.value : "";
  pool.innerHTML = wantedBuildPoolCardsHtml(filter, "tier") + tierlistBuildArmedPoolHtml(filter);
}

function tierlistBuildArmedPoolHtml(filterText) {
  if (typeof CHARACTERS_DATA === "undefined" || !Array.isArray(CHARACTERS_DATA)) return "";
  const normalized = wantedNormalizeKey(filterText || "");
  return TIERLIST_ARMED_POOL.map(({ spriteId, weaponKey }) => {
    const char = CHARACTERS_DATA.find((c) => c.id === spriteId);
    if (!char) return "";
    const charName = char.name;
    if (normalized && !wantedNormalizeKey(charName).includes(normalized)) return "";
    const armedName = charName + "|" + weaponKey;
    const escapedCharName = wantedEscapeHtml(charName);
    const iconPath = `sprites/characters/${spriteId}.png`;
    let weaponIcon = "";
    if (typeof items !== "undefined" && items.weapon && items.weapon.variants && items.weapon.variants[weaponKey]) {
      weaponIcon = items.weapon.variants[weaponKey].icon;
    }
    const overlay = weaponIcon ? `<img class="wanted-weapon-overlay" src="${wantedEscapeHtml(weaponIcon)}" alt="" />` : "";
    return `<article class="wanted-tier-card is-tier" draggable="true" data-counter-context="pool" data-pool-context="tier" data-counter-name="${encodeURIComponent(armedName)}">
      <div class="wanted-portrait-wrap"><img src="${iconPath}" alt="${escapedCharName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />${overlay}</div>
      <span>${escapedCharName}</span>
    </article>`;
  }).join("");
}

function tierlistClearTiers() {
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) return;
  if (category === "wanteds") {
    const key = wantedGetWantedStorageKey(enemy);
    if (tierlistState.wantedAssignments[key]) {
      WANTED_TIER_IDS.forEach((tid) => { tierlistState.wantedAssignments[key].tiers[tid] = []; });
    }
  } else {
    const key = tierlistGetColumnKey(enemy);
    tierlistState.columnAssignments[key] = tierlistEmptyColumnAssignment();
  }
  tierlistSaveState();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistResetTiers() {
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) return;
  if (category === "wanteds") {
    delete tierlistState.wantedAssignments[wantedGetWantedStorageKey(enemy)];
  } else {
    delete tierlistState.columnAssignments[tierlistGetColumnKey(enemy)];
  }
  tierlistSaveState();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistWantedHasCounter(assignment, name, excludeId) {
  const key = wantedNormalizeKey(name);
  return WANTED_TIER_IDS.some((tid) =>
    (assignment.tiers[tid] || []).some((e) => e.id !== excludeId && wantedNormalizeKey(e.name) === key)
  );
}

function tierlistColumnHasCounter(assignment, name, excludeId) {
  const key = wantedNormalizeKey(name);
  return TIERLIST_COLUMN_IDS.some((col) => {
    const colData = assignment[col];
    if (!colData || typeof colData !== "object") return false;
    return WANTED_TIER_IDS.some((rank) =>
      (colData[rank] || []).some((e) => e.id !== excludeId && wantedNormalizeKey(e.name) === key)
    );
  });
}

function tierlistRemoveEntry(entryId) {
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) return;
  if (category === "wanteds") {
    const assignment = tierlistState.wantedAssignments[wantedGetWantedStorageKey(enemy)];
    if (!assignment) return;
    WANTED_TIER_IDS.forEach((tid) => {
      assignment.tiers[tid] = (assignment.tiers[tid] || []).filter((e) => e.id !== entryId);
    });
  } else {
    const assignment = tierlistState.columnAssignments[tierlistGetColumnKey(enemy)];
    if (!assignment) return;
    TIERLIST_COLUMN_IDS.forEach((col) => {
      const colData = assignment[col];
      if (!colData || typeof colData !== "object") return;
      WANTED_TIER_IDS.forEach((rank) => {
        if (Array.isArray(colData[rank])) colData[rank] = colData[rank].filter((e) => e.id !== entryId);
      });
    });
  }
  tierlistSaveState();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistHandleDropToTier(payload, tierTarget) {
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) return;

  if (category === "wanteds") {
    const key = wantedGetWantedStorageKey(enemy);
    if (!tierlistState.wantedAssignments[key]) {
      tierlistState.wantedAssignments[key] = wantedNormalizeTierAssignment(null, enemy);
    }
    const assignment = tierlistState.wantedAssignments[key];

    if (tierTarget === "pool") {
      if (payload.context === "tier") {
        WANTED_TIER_IDS.forEach((tid) => {
          assignment.tiers[tid] = (assignment.tiers[tid] || []).filter((e) => e.id !== payload.entryId);
        });
        tierlistSaveState(); tierlistRenderBoard(); tierlistRenderPool();
      }
      return;
    }
    if (!WANTED_TIER_IDS.includes(tierTarget)) return;

    if (payload.context === "pool") {
      if (tierlistWantedHasCounter(assignment, payload.name)) return;
      assignment.tiers[tierTarget].push({ id: wantedMakeUid(), name: payload.name });
    } else if (payload.context === "tier") {
      let moved = null, src = "";
      WANTED_TIER_IDS.forEach((tid) => {
        const idx = (assignment.tiers[tid] || []).findIndex((e) => e.id === payload.entryId);
        if (idx !== -1) { moved = assignment.tiers[tid][idx]; src = tid; }
      });
      if (!moved || src === tierTarget) return;
      if (tierlistWantedHasCounter(assignment, moved.name, moved.id)) return;
      assignment.tiers[src] = (assignment.tiers[src] || []).filter((e) => e.id !== moved.id);
      assignment.tiers[tierTarget].push(moved);
    }
  } else {
    const key = tierlistGetColumnKey(enemy);
    if (!tierlistState.columnAssignments[key]) {
      tierlistState.columnAssignments[key] = tierlistEmptyColumnAssignment();
    }
    const assignment = tierlistState.columnAssignments[key];

    if (tierTarget === "pool") {
      if (payload.context === "tier") {
        TIERLIST_COLUMN_IDS.forEach((col) => {
          const colData = assignment[col];
          if (!colData) return;
          WANTED_TIER_IDS.forEach((rank) => {
            if (Array.isArray(colData[rank])) colData[rank] = colData[rank].filter((e) => e.id !== payload.entryId);
          });
        });
        tierlistSaveState(); tierlistRenderBoard(); tierlistRenderPool();
      }
      return;
    }

    const parsed = tierlistParseColRankTarget(tierTarget);
    if (!parsed) return;
    const { col, rank } = parsed;
    if (!assignment[col]) assignment[col] = {};
    if (!assignment[col][rank]) assignment[col][rank] = [];

    if (payload.context === "pool") {
      if (tierlistColumnHasCounter(assignment, payload.name)) return;
      assignment[col][rank].push({ id: wantedMakeUid(), name: payload.name });
    } else if (payload.context === "tier") {
      let moved = null, srcCol = "", srcRank = "";
      TIERLIST_COLUMN_IDS.forEach((c) => {
        const cd = assignment[c];
        if (!cd) return;
        WANTED_TIER_IDS.forEach((r) => {
          const idx = (cd[r] || []).findIndex((e) => e.id === payload.entryId);
          if (idx !== -1) { moved = cd[r][idx]; srcCol = c; srcRank = r; }
        });
      });
      if (!moved || (srcCol === col && srcRank === rank)) return;
      if (tierlistColumnHasCounter(assignment, moved.name, moved.id)) return;
      assignment[srcCol][srcRank] = assignment[srcCol][srcRank].filter((e) => e.id !== moved.id);
      assignment[col][rank].push(moved);
    }
  }

  tierlistSaveState();
  tierlistRenderBoard();
  tierlistRenderPool();
}

function tierlistOnDragStart(event) {
  const card = event.target && event.target.closest ? event.target.closest(".wanted-tier-card") : null;
  if (!card) return;
  const context = card.getAttribute("data-counter-context");
  if (!context) return;
  if (context === "pool") {
    const name = decodeURIComponent(card.getAttribute("data-counter-name") || "");
    if (!name) return;
    tierlistDragPayload = { context: "pool", name, poolContext: "tier" };
  } else if (context === "tier") {
    tierlistDragPayload = {
      context: "tier",
      entryId: card.getAttribute("data-entry-id") || "",
      tierId:  card.getAttribute("data-tier-id")  || ""
    };
  }
  if (!tierlistDragPayload) return;
  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", JSON.stringify(tierlistDragPayload));
}

function tierlistOnDragOver(event) {
  const target = event.target && event.target.closest ? event.target.closest("[data-tier-target]") : null;
  if (!target) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  target.classList.add("is-drag-over");
}

function tierlistOnDragLeave(event) {
  const target = event.target && event.target.closest ? event.target.closest("[data-tier-target]") : null;
  if (!target) return;
  target.classList.remove("is-drag-over");
}

function tierlistOnDrop(event) {
  const dropZone = event.target && event.target.closest ? event.target.closest("[data-tier-target]") : null;
  if (!dropZone) return;
  event.preventDefault();
  dropZone.classList.remove("is-drag-over");
  let payload = tierlistDragPayload;
  const raw = event.dataTransfer.getData("text/plain");
  if (raw) { try { payload = JSON.parse(raw); } catch (_err) {} }
  if (!payload) return;
  tierlistHandleDropToTier(payload, dropZone.getAttribute("data-tier-target"));
}

function tierlistOnDragEnd() {
  tierlistDragPayload = null;
  document.querySelectorAll(".wanted-tier-card.is-dragging").forEach((c) => c.classList.remove("is-dragging"));
  document.querySelectorAll("[data-tier-target].is-drag-over").forEach((z) => z.classList.remove("is-drag-over"));
}

function tierlistOnDoubleClickRemove(event) {
  const card = event.target && event.target.closest
    ? event.target.closest(".wanted-tier-card[data-counter-context='tier']") : null;
  if (!card) return;
  const entryId = card.getAttribute("data-entry-id") || "";
  if (entryId) tierlistRemoveEntry(entryId);
}

function tierlistOnClickRemove(event) {
  const btn = event.target && event.target.closest ? event.target.closest(".wanted-counter-remove") : null;
  if (!btn) return;
  const card = btn.closest(".wanted-tier-card");
  if (!card) return;
  const entryId = card.getAttribute("data-entry-id") || "";
  if (entryId) tierlistRemoveEntry(entryId);
}

async function tierlistExportImage() {
  const category = tierlistState.selectedCategory;
  const enemy    = tierlistState.selectedEnemy;
  if (!enemy) return;

  if (category === "wanteds") {
    const key = wantedGetWantedStorageKey(enemy);
    if (!tierlistState.wantedAssignments[key]) return;
    const assignment = tierlistState.wantedAssignments[key];
    const rows = WANTED_TIER_IDS.map((tid) => ({
      id: tid,
      label: typeof t === "function" ? t(`wantedTierRow${tid.toUpperCase()}`) : tid.toUpperCase(),
      items: [...(assignment.tiers[tid] || [])].map((e) => e.name)
    }));
    await _tierlistExportWantedCanvas(enemy, rows);
  } else {
    const key = tierlistGetColumnKey(enemy);
    const assignment = tierlistState.columnAssignments[key] || tierlistEmptyColumnAssignment();
    const labels = tierlistColumnLabels();
    const cols = TIERLIST_COLUMN_IDS.map((col) => {
      const colData = assignment[col] || {};
      return {
        id: col,
        label: labels[col],
        ranks: WANTED_TIER_IDS.map((rank) => ({
          id: rank,
          label: typeof t === "function" ? t(`wantedTierRow${rank.toUpperCase()}`) : rank.toUpperCase(),
          items: (colData[rank] || []).map((e) => e.name)
        }))
      };
    });
    await _tierlistExportColumnCanvas(enemy, category, cols);
  }
}

async function _tierlistExportWantedCanvas(enemy, rows) {
  const cardW = 188, cardH = 58, cardGapX = 10, cardGapY = 10;
  const outerPad = 28, labelW = 86, boardW = 1600;
  const cardsAreaW = boardW - outerPad * 2 - labelW - 16;
  const perRow = Math.max(1, Math.floor((cardsAreaW + cardGapX) / (cardW + cardGapX)));

  let totalH = outerPad + 76;
  rows.forEach((row) => {
    const lines = Math.max(1, Math.ceil(row.items.length / perRow));
    row._height = Math.max(74, lines * cardH + (lines - 1) * cardGapY + 16);
    totalH += row._height + 12;
  });
  totalH += outerPad;

  const canvas = document.createElement("canvas");
  canvas.width = boardW; canvas.height = totalH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageMap = await wantedLoadTierImages(rows);
  const bg = ctx.createLinearGradient(0, 0, boardW, totalH);
  bg.addColorStop(0, "#2d160c"); bg.addColorStop(1, "#16100a");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, boardW, totalH);

  ctx.fillStyle = "#f6d487"; ctx.font = "700 40px Georgia";
  ctx.fillText("Inimigo Tier List", outerPad, outerPad + 34);
  ctx.fillStyle = "rgba(255,225,154,0.78)"; ctx.font = "500 20px Georgia";
  ctx.fillText(`Inimigo: ${enemy}`, outerPad, outerPad + 62);
  ctx.fillText(new Date().toLocaleString(), boardW - 280, outerPad + 62);

  let y = outerPad + 76;
  rows.forEach((row) => {
    wantedCanvasRoundRect(ctx, outerPad, y, boardW - outerPad * 2, row._height, 14);
    ctx.fillStyle = "rgba(25,15,10,0.86)"; ctx.fill();
    wantedCanvasRoundRect(ctx, outerPad + 8, y + 8, labelW - 8, row._height - 16, 10);
    ctx.fillStyle = WANTED_TIER_COLORS[row.id] || "#c9a24e"; ctx.fill();
    ctx.fillStyle = "#241503"; ctx.font = "700 30px Georgia";
    ctx.fillText(row.label, outerPad + 24, y + row._height / 2 + 10);
    row.items.forEach((name, i) => {
      const col = i % perRow, line = Math.floor(i / perRow);
      const x = outerPad + labelW + 12 + col * (cardW + cardGapX);
      const cy = y + 8 + line * (cardH + cardGapY);
      wantedCanvasRoundRect(ctx, x, cy, cardW, cardH, 9);
      ctx.fillStyle = "#3a2410"; ctx.fill();
      ctx.strokeStyle = "rgba(244,210,126,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      const icon = imageMap.get(name);
      if (icon) ctx.drawImage(icon, x + 8, cy + 8, 42, 42);
      const { charName: displayName } = wantedParseCounterName(name);
      ctx.fillStyle = "#f8e6ba"; ctx.font = "600 18px Georgia";
      ctx.fillText(wantedFitText(ctx, displayName, cardW - 62), x + 56, cy + 34);
    });
    y += row._height + 12;
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `tierlist-tier-list-${Date.now()}.png`;
  document.body.appendChild(link); link.click(); link.remove();
  if (typeof showToast === "function") showToast(t("wantedTierExportSuccess"));
}

async function _tierlistExportColumnCanvas(enemy, category, cols) {
  const outerPad = 24, colGap = 10, rankLabelW = 48, cardW = 130, cardH = 46, cardGap = 6, headerH = 44;
  const boardW = 1600;
  const colW = Math.floor((boardW - outerPad * 2 - colGap * 2) / 3);
  const cardsAreaW = colW - rankLabelW - 16;
  const perRow = Math.max(1, Math.floor((cardsAreaW + cardGap) / (cardW + cardGap)));

  cols.forEach((col) => {
    col._rankH = col.ranks.map((r) => {
      const lines = Math.max(1, Math.ceil(r.items.length / perRow));
      return Math.max(cardH + 12, lines * cardH + (lines - 1) * cardGap + 12);
    });
  });

  const maxColH = Math.max(...cols.map((col) => col._rankH.reduce((s, h) => s + h, 0) + headerH + 12));
  const boardH = outerPad + 76 + maxColH + outerPad;

  const canvas = document.createElement("canvas");
  canvas.width = boardW; canvas.height = boardH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const allItems = [];
  cols.forEach((col) => col.ranks.forEach((r) => r.items.forEach((n) => allItems.push(n))));
  const imageMap = await wantedLoadTierImages([{ items: allItems }]);

  const bg = ctx.createLinearGradient(0, 0, boardW, boardH);
  bg.addColorStop(0, "#2d160c"); bg.addColorStop(1, "#16100a");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, boardW, boardH);

  ctx.fillStyle = "#f6d487"; ctx.font = "700 36px Georgia";
  ctx.fillText("Tierlist", outerPad, outerPad + 30);
  ctx.fillStyle = "rgba(255,225,154,0.78)"; ctx.font = "500 18px Georgia";
  ctx.fillText(`Inimigo: ${enemy}`, outerPad, outerPad + 56);
  ctx.fillText(new Date().toLocaleString(), boardW - 280, outerPad + 56);

  const startY = outerPad + 76;
  cols.forEach((col, ci) => {
    const cx = outerPad + ci * (colW + colGap);
    wantedCanvasRoundRect(ctx, cx, startY, colW, maxColH, 12);
    ctx.fillStyle = "rgba(25,15,10,0.80)"; ctx.fill();
    ctx.fillStyle = TIERLIST_COLUMN_COLORS[col.id] || "#aaa";
    ctx.fillRect(cx, startY, colW, headerH);
    ctx.fillStyle = "#241503"; ctx.font = "700 22px Georgia"; ctx.textAlign = "center";
    ctx.fillText(col.label, cx + colW / 2, startY + headerH - 10);
    ctx.textAlign = "left";

    let ry = startY + headerH + 8;
    col.ranks.forEach((rank, ri) => {
      const rankH = col._rankH[ri];
      wantedCanvasRoundRect(ctx, cx + 6, ry, rankLabelW - 4, rankH, 6);
      ctx.fillStyle = WANTED_TIER_COLORS[rank.id] || "#c9a24e"; ctx.fill();
      ctx.fillStyle = "#241503"; ctx.font = "700 18px Georgia"; ctx.textAlign = "center";
      ctx.fillText(rank.label, cx + 6 + (rankLabelW - 4) / 2, ry + rankH / 2 + 6);
      ctx.textAlign = "left";
      rank.items.forEach((name, i) => {
        const col2 = i % perRow, row2 = Math.floor(i / perRow);
        const ix = cx + rankLabelW + 4 + col2 * (cardW + cardGap);
        const iy = ry + 6 + row2 * (cardH + cardGap);
        wantedCanvasRoundRect(ctx, ix, iy, cardW, cardH, 7);
        ctx.fillStyle = "#3a2410"; ctx.fill();
        ctx.strokeStyle = "rgba(244,210,126,0.3)"; ctx.lineWidth = 1; ctx.stroke();
        const icon = imageMap.get(name);
        if (icon) ctx.drawImage(icon, ix + 5, iy + 5, 36, 36);
        const { charName } = wantedParseCounterName(name);
        ctx.fillStyle = "#f8e6ba"; ctx.font = "600 13px Georgia";
        ctx.fillText(wantedFitText(ctx, charName, cardW - 48), ix + 46, iy + 27);
      });
      ry += rankH + 6;
    });
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `tierlist-tier-list-${Date.now()}.png`;
  document.body.appendChild(link); link.click(); link.remove();
  if (typeof showToast === "function") showToast(t("wantedTierExportSuccess"));
}
