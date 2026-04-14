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
  const tierPanel = document.getElementById("wanted-subtab-tierlist");
  const rowsPanel = document.getElementById("wanted-subtab-rows");

  if (!input || !sortSelect) return;

  if (input.dataset.wantedBound !== "1") {
    input.dataset.wantedBound = "1";
    sortSelect.dataset.wantedBound = "1";

    input.addEventListener("input", () => wantedRenderRows(input.value));
    sortSelect.addEventListener("change", () => wantedRenderRows(input.value));

    const tierTargetSelect = document.getElementById("wanted-tier-target-select");
    const tierSearchInput = document.getElementById("wanted-tier-search-input");
    const tierClearBtn = document.getElementById("wanted-tier-clear-btn");
    const tierResetBtn = document.getElementById("wanted-tier-reset-btn");
    const tierExportBtn = document.getElementById("wanted-tier-export-btn");

    if (tierTargetSelect) {
      tierTargetSelect.addEventListener("change", () => wantedSelectTierWanted(tierTargetSelect.value));
    }
    if (tierSearchInput) {
      tierSearchInput.addEventListener("input", () => wantedRenderTierList());
    }
    if (tierClearBtn) {
      tierClearBtn.addEventListener("click", wantedClearTierRows);
    }
    if (tierResetBtn) {
      tierResetBtn.addEventListener("click", wantedResetTierList);
    }
    if (tierExportBtn) {
      tierExportBtn.addEventListener("click", wantedExportTierListImage);
    }

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

  if (tierPanel && tierPanel.dataset.wantedDndBound !== "1") {
    tierPanel.dataset.wantedDndBound = "1";
    tierPanel.addEventListener("dragstart", wantedOnDragStart);
    tierPanel.addEventListener("dragover", wantedOnDragOver);
    tierPanel.addEventListener("dragleave", wantedOnDragLeave);
    tierPanel.addEventListener("drop", wantedOnDrop);
    tierPanel.addEventListener("dragend", wantedOnDragEnd);
    tierPanel.addEventListener("dblclick", wantedOnDoubleClickRemove);
    tierPanel.addEventListener("click", wantedOnClickRemove);
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
  const safeSubTab = ["matchups", "tierlist", "rows"].includes(subTab) ? subTab : "matchups";
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
  const escapedName = wantedEscapeHtml(name);
  const iconPath = wantedGetPortraitPath(name);
  const encodedName = encodeURIComponent(name);
  const compactClass = contextClass === "rows" ? " is-rows" : "";
  const tierClass = contextClass === "tier" ? " is-tier" : "";

  return `
    <article class="wanted-tier-card${compactClass}${tierClass}" draggable="true" data-counter-context="pool" data-pool-context="${contextClass}" data-counter-name="${encodedName}">
      <img src="${iconPath}" alt="${escapedName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
      <span>${escapedName}</span>
    </article>
  `;
}

function wantedBuildCounterEntryCard(entry, context, extraData = "") {
  const escapedName = wantedEscapeHtml(entry.name);
  const iconPath = wantedGetPortraitPath(entry.name);
  const compactClass = context === "rows" ? " is-rows" : "";
  const tierClass = context === "tier" ? " is-tier" : "";

  return `
    <article class="wanted-tier-card${compactClass}${tierClass}" draggable="true" data-counter-context="${context}" data-entry-id="${wantedEscapeHtml(entry.id)}" ${extraData}>
      <img src="${iconPath}" alt="${escapedName}" onerror="this.onerror=null;this.src='sprites/branding/logo_0.png';" />
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
  const key = wantedNormalizeKey(name);
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
