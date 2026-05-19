// ============================================================
// Inimigo tab – tier list com categorias (Wanteds / Worldbosses / Marineford)
// Depends on js/wanted.js — must be loaded after it.
// ============================================================

const TIERLIST_STORAGE_KEY = "glacrystal_inimigo_tier_v1";
const TIERLIST_COLUMN_IDS = ["tank", "support", "melee", "ranged"];
const TIERLIST_COLUMN_COLORS = { tank: "#e07a7a", support: "#7fd16d", melee: "#e89968", ranged: "#70bde8" };
function tierlistColumnLabels() {
  const tr = typeof t === "function";
  return {
    tank:    tr ? t("tierlistColumnTank")    : "Tank",
    support: tr ? t("tierlistColumnSupport") : "Support",
    melee:   tr ? t("tierlistColumnMelee")   : "Melee",
    ranged:  tr ? t("tierlistColumnRanged")  : "Ranged",
  };
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
// Also migrates legacy "dps" column (split into melee + ranged) by moving its contents to melee.
function tierlistNormalizeColumnAssignment(raw) {
  if (!raw || typeof raw !== "object") return tierlistEmptyColumnAssignment();
  const out = tierlistEmptyColumnAssignment();
  const readCol = (colData, target) => {
    if (!colData) return;
    if (Array.isArray(colData)) {
      target.s = target.s.concat(colData.map((e) => ({ id: e.id || wantedMakeUid(), name: e.name || "" })));
    } else if (typeof colData === "object") {
      WANTED_TIER_IDS.forEach((rank) => {
        if (Array.isArray(colData[rank])) {
          target[rank] = target[rank].concat(colData[rank].map((e) => ({ id: e.id || wantedMakeUid(), name: e.name || "" })));
        }
      });
    }
  };
  TIERLIST_COLUMN_IDS.forEach((col) => readCol(raw[col], out[col]));
  // Legacy: pre-split "dps" column → all entries go to melee.
  if (raw.dps) readCol(raw.dps, out.melee);
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
    if (searchInput) {
      const debouncedPool = (typeof debounce === "function"
        ? debounce(() => tierlistRenderPool(), 140)
        : () => tierlistRenderPool());
      searchInput.addEventListener("input", debouncedPool);
    }
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

  const loadImg = (src) => new Promise((resolve) => {
    if (!src) { resolve(null); return; }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
  const [imageMap, enemyIcon] = await Promise.all([
    wantedLoadTierImages(rows),
    loadImg(wantedGetPortraitPath(enemy)),
  ]);
  const bg = ctx.createLinearGradient(0, 0, boardW, totalH);
  bg.addColorStop(0, "#2d160c"); bg.addColorStop(1, "#16100a");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, boardW, totalH);

  const iconSize = 60;
  if (enemyIcon) {
    wantedCanvasRoundRect(ctx, outerPad, outerPad, iconSize, iconSize, 8);
    ctx.fillStyle = "#3a2410"; ctx.fill();
    ctx.drawImage(enemyIcon, outerPad + 3, outerPad + 3, iconSize - 6, iconSize - 6);
  }
  const textX = outerPad + iconSize + 14;
  ctx.fillStyle = "#f6d487"; ctx.font = "700 40px Georgia";
  ctx.fillText(enemy, textX, outerPad + 36);
  ctx.fillStyle = "rgba(255,225,154,0.78)"; ctx.font = "500 18px Georgia";
  ctx.fillText(typeof t === "function" ? t("tierlistTab") : "Tierlist", textX, outerPad + 58);
  ctx.fillText(new Date().toLocaleString(), boardW - 280, outerPad + 58);

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
      const entry = imageMap.get(name);
      if (entry && entry.portrait) ctx.drawImage(entry.portrait, x + 8, cy + 8, 42, 42);
      if (entry && entry.weapon) {
        const ow = 22, ox = x + 8, oy = cy + 8 + (42 - ow);
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(ox, oy, ow, ow);
        ctx.drawImage(entry.weapon, ox + 1, oy + 1, ow - 2, ow - 2);
      }
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
  const numCols = cols.length;
  const colW = Math.floor((boardW - outerPad * 2 - colGap * (numCols - 1)) / numCols);
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
  const loadImg = (src) => new Promise((resolve) => {
    if (!src) { resolve(null); return; }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
  const [imageMap, enemyIcon] = await Promise.all([
    wantedLoadTierImages([{ items: allItems }]),
    loadImg(tierlistGetEnemyIcon(enemy, category)),
  ]);

  const bg = ctx.createLinearGradient(0, 0, boardW, boardH);
  bg.addColorStop(0, "#2d160c"); bg.addColorStop(1, "#16100a");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, boardW, boardH);

  const iconSize = 56;
  if (enemyIcon) {
    wantedCanvasRoundRect(ctx, outerPad, outerPad, iconSize, iconSize, 8);
    ctx.fillStyle = "#3a2410"; ctx.fill();
    ctx.drawImage(enemyIcon, outerPad + 3, outerPad + 3, iconSize - 6, iconSize - 6);
  }
  const textX = outerPad + iconSize + 12;
  ctx.fillStyle = "#f6d487"; ctx.font = "700 36px Georgia";
  ctx.fillText(enemy, textX, outerPad + 32);
  ctx.fillStyle = "rgba(255,225,154,0.78)"; ctx.font = "500 16px Georgia";
  ctx.fillText(typeof t === "function" ? t("tierlistTab") : "Tierlist", textX, outerPad + 52);
  ctx.fillText(new Date().toLocaleString(), boardW - 280, outerPad + 52);

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
        const entry = imageMap.get(name);
        if (entry && entry.portrait) ctx.drawImage(entry.portrait, ix + 5, iy + 5, 36, 36);
        if (entry && entry.weapon) {
          const ow = 18, ox = ix + 5, oy = iy + 5 + (36 - ow);
          ctx.fillStyle = "rgba(0,0,0,0.65)";
          ctx.fillRect(ox, oy, ow, ow);
          ctx.drawImage(entry.weapon, ox + 1, oy + 1, ow - 2, ow - 2);
        }
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
