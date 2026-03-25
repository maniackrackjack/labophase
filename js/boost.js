// ============================================================
// Boost - crystal and berries calculator for +0 to +16
// ============================================================

const BOOST_LEVELS = [
  { level: 1, chance: 35, pity: 3, crystal: "sky" },
  { level: 2, chance: 30, pity: 4, crystal: "sky" },
  { level: 3, chance: 25, pity: 5, crystal: "sky" },
  { level: 4, chance: 20, pity: 6, crystal: "sky" },
  { level: 5, chance: 22, pity: 5, crystal: "sage" },
  { level: 6, chance: 18, pity: 6, crystal: "sage" },
  { level: 7, chance: 14, pity: 8, crystal: "sage" },
  { level: 8, chance: 10, pity: 11, crystal: "sage" },
  { level: 9, chance: 10, pity: 11, crystal: "crimson" },
  { level: 10, chance: 9, pity: 12, crystal: "crimson" },
  { level: 11, chance: 8, pity: 13, crystal: "crimson" },
  { level: 12, chance: 7, pity: 15, crystal: "crimson" },
  { level: 13, chance: 6, pity: 17, crystal: "radiant" },
  { level: 14, chance: 5, pity: 21, crystal: "radiant" },
  { level: 15, chance: 4, pity: 26, crystal: "radiant" },
  { level: 16, chance: 3, pity: 34, crystal: "radiant" }
];

const BOOST_CRYSTAL_META = {
  sky: { nameKey: "boostCrystalSky", icon: "sprites/icons/sky_crystal.gif" },
  sage: { nameKey: "boostCrystalSage", icon: "sprites/icons/sage_crystal.gif" },
  crimson: { nameKey: "boostCrystalCrimson", icon: "sprites/icons/crimson_crystal.gif" },
  radiant: { nameKey: "boostCrystalRadiant", icon: "sprites/icons/radiant_crystal.gif" }
};

const BOOST_ITEM_OPTIONS = {
  chapeu: { crystalsPerTry: 2, labelKey: "hat", category: "head" },
  camisa: { crystalsPerTry: 4, labelKey: "shirt", category: "body" },
  calca: { crystalsPerTry: 2, labelKey: "pants", category: "legs" },
  emblema: { crystalsPerTry: 2, labelKey: "emblem", category: "emblem" },
  sabre: { crystalsPerTry: 4, labelKey: "weapon", category: "weapon" },
  colar: { crystalsPerTry: 4, labelKey: "necklace", category: "accessory", accessoryKind: "necklace" },
  anel: { crystalsPerTry: 4, labelKey: "ring", category: "accessory", accessoryKind: "ring" },
  specialWeapon: { crystalsPerTry: 4, labelKey: "boostItemSpecialWeaponBase", category: "weapon" }
};

const BOOST_CALC_TYPE_TO_OPTION = {
  chapeu: "chapeu",
  camisa: "camisa",
  calca: "calca",
  emblema: "emblema",
  sabre: "sabre",
  colar: "colar",
  anel: "anel"
};

function boostDebounce(fn, delay = 120) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function boostInit() {
  const panel = document.getElementById("boost");
  if (!panel) return;

  bindBoostEvents();
  boostPopulateProfileSelect();

  const list = document.getElementById("boost-items-list");
  if (list && !list.children.length) {
    boostCreateItemRow({ type: "chapeu", start: 0, target: 16 });
  }

  boostRecalc();
}

function bindBoostEvents() {
  const debouncedBoostRecalc = boostDebounce(boostRecalc);

  [
    "boost-price-sky",
    "boost-price-sage",
    "boost-price-crimson",
    "boost-price-radiant",
    "boost-stock-sky",
    "boost-stock-sage",
    "boost-stock-crimson",
    "boost-stock-radiant"
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.dataset.boostBound === "1") return;
    el.dataset.boostBound = "1";
    el.addEventListener("input", debouncedBoostRecalc);
    el.addEventListener("change", boostRecalc);
  });

  bindOnce("boost-add-item-btn", "click", () => {
    boostCreateItemRow({ type: "chapeu", start: 0, target: 16 });
    boostRecalc();
  });
  bindOnce("boost-full-set-btn", "click", boostAddFullSet);

  bindOnce("boost-import-current-btn", "click", boostImportCurrentBuild);
  bindOnce("boost-import-profile-btn", "click", boostImportSelectedProfile);
  bindOnce("boost-clear-items-btn", "click", boostClearItems);
}

function bindOnce(id, eventName, handler) {
  const el = document.getElementById(id);
  if (!el || el.dataset.boostBound === "1") return;
  el.dataset.boostBound = "1";
  el.addEventListener(eventName, handler);
}

function boostPopulateProfileSelect() {
  const select = document.getElementById("boost-profile-select");
  if (!select) return;

  const previous = select.value;
  const profiles = typeof getProfilesStorage === "function" ? getProfilesStorage() : {};
  const names = Object.keys(profiles);
  const current = typeof getCurrentProfileName === "function" ? getCurrentProfileName() : "";

  select.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = bt("boostSelectProfilePlaceholder");
  select.appendChild(placeholder);

  names.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  if (previous && names.includes(previous)) select.value = previous;
  else if (current && names.includes(current)) select.value = current;
}

function boostCreateItemRow(initial = {}) {
  const list = document.getElementById("boost-items-list");
  if (!list) return;

  const row = document.createElement("div");
  row.className = "boost-item-row";
  row.innerHTML = `
    <div class="boost-item-controls">
      <span class="boost-item-icon-wrap"><img class="boost-item-icon" alt="" /></span>
      <select class="boost-item-type"></select>
      <select class="boost-item-variant"></select>
      <select class="boost-item-start"></select>
      <select class="boost-item-target"></select>
      <button class="clearBtn boost-item-remove" type="button">X</button>
    </div>
    <div class="boost-item-result"></div>
  `;
  list.appendChild(row);

  const typeSelect = row.querySelector(".boost-item-type");
  const variantSelect = row.querySelector(".boost-item-variant");
  const startSelect = row.querySelector(".boost-item-start");
  const targetSelect = row.querySelector(".boost-item-target");
  const removeBtn = row.querySelector(".boost-item-remove");

  const initType = BOOST_ITEM_OPTIONS[initial.type] ? initial.type : "chapeu";
  populateBoostTypeOptions(typeSelect, initType);
  populateBoostLevelOptions(startSelect, clampInt(initial.start, 0, 16));
  populateBoostLevelOptions(targetSelect, clampInt(initial.target ?? 16, 0, 16));

  row.dataset.variantCategory = initial.variantCategory || "";
  row.dataset.variantId = initial.variantId || "";

  boostSyncRowVariantSelect(row, { keepCurrent: true });

  if (Number(targetSelect.value) < Number(startSelect.value)) {
    targetSelect.value = startSelect.value;
  }

  typeSelect.addEventListener("change", () => {
    boostSyncRowVariantSelect(row, { keepCurrent: false });
    boostRecalc();
  });

  variantSelect.addEventListener("change", () => {
    row.dataset.variantId = variantSelect.value || "";
    row.dataset.variantCategory = boostGetOptionConfig(typeSelect.value).category;

    if (boostGetOptionConfig(typeSelect.value).category === "accessory") {
      const adjustedType = boostAccessoryVariantToType(variantSelect.value, typeSelect.value);
      if (adjustedType !== typeSelect.value) {
        typeSelect.value = adjustedType;
      }
    }

    boostUpdateRowIcon(row);
    boostRecalc();
  });

  [startSelect, targetSelect].forEach((el) => {
    el.addEventListener("change", () => {
      if (Number(targetSelect.value) < Number(startSelect.value)) {
        targetSelect.value = startSelect.value;
      }
      boostRecalc();
    });
  });

  removeBtn.addEventListener("click", () => {
    row.remove();
    boostRecalc();
  });
}

function boostGetOptionConfig(type) {
  return BOOST_ITEM_OPTIONS[type] || BOOST_ITEM_OPTIONS.chapeu;
}

function boostGetVariantIdsForType(type) {
  const cfg = boostGetOptionConfig(type);
  const variants = items?.[cfg.category]?.variants || {};
  const ids = Object.keys(variants);

  if (cfg.category !== "accessory") return ids;

  if (cfg.accessoryKind === "ring") {
    return ids.filter((id) => id.includes("ring"));
  }
  return ids.filter((id) => !id.includes("ring"));
}

function boostAccessoryVariantToType(variantId, fallbackType) {
  if (!variantId) return fallbackType;
  return variantId.includes("ring") ? "anel" : "colar";
}

function boostSyncRowVariantSelect(row, options = {}) {
  const typeSelect = row.querySelector(".boost-item-type");
  const variantSelect = row.querySelector(".boost-item-variant");
  if (!typeSelect || !variantSelect) return;

  const type = typeSelect.value;
  const cfg = boostGetOptionConfig(type);
  const variantIds = boostGetVariantIdsForType(type);

  let preferred = options.keepCurrent ? (row.dataset.variantId || "") : "";
  if (!preferred && options.keepCurrent) {
    preferred = variantSelect.value || "";
  }

  if (!variantIds.includes(preferred)) {
    preferred = variantIds[0] || "";
  }

  variantSelect.innerHTML = "";
  variantIds.forEach((variantId) => {
    const opt = document.createElement("option");
    opt.value = variantId;
    opt.textContent = getVariantName(cfg.category, variantId);
    variantSelect.appendChild(opt);
  });

  variantSelect.value = preferred;
  row.dataset.variantId = preferred;
  row.dataset.variantCategory = cfg.category;
  boostUpdateRowIcon(row);
}

function boostUpdateRowIcon(row) {
  const type = row.querySelector(".boost-item-type")?.value || "chapeu";
  const cfg = boostGetOptionConfig(type);
  const variantId = row.querySelector(".boost-item-variant")?.value || row.dataset.variantId;
  const iconEl = row.querySelector(".boost-item-icon");
  if (!iconEl) return;

  const variant = items?.[cfg.category]?.variants?.[variantId];
  const fallback = itens?.[type]?.icon || "";
  iconEl.src = variant?.icon || fallback;
  iconEl.alt = variantId ? getVariantName(cfg.category, variantId) : bt(cfg.labelKey);
}

function populateBoostLevelOptions(select, selectedValue) {
  if (!select) return;
  select.innerHTML = "";
  for (let i = 0; i <= 16; i++) {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = `+${i}`;
    select.appendChild(opt);
  }
  select.value = String(clampInt(selectedValue, 0, 16));
}

function populateBoostTypeOptions(select, selectedValue) {
  if (!select) return;
  const prev = selectedValue || select.value || "chapeu";
  select.innerHTML = "";

  Object.keys(BOOST_ITEM_OPTIONS).forEach((type) => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = bt(BOOST_ITEM_OPTIONS[type].labelKey);
    select.appendChild(opt);
  });

  select.value = BOOST_ITEM_OPTIONS[prev] ? prev : "chapeu";
}

function boostGetRowsState() {
  const rows = Array.from(document.querySelectorAll("#boost-items-list .boost-item-row"));
  return rows.map((row) => {
    const type = row.querySelector(".boost-item-type")?.value || "chapeu";
    const cfg = boostGetOptionConfig(type);
    const start = clampInt(row.querySelector(".boost-item-start")?.value, 0, 16);
    const target = Math.max(start, clampInt(row.querySelector(".boost-item-target")?.value, 0, 16));
    const variantId = row.querySelector(".boost-item-variant")?.value || row.dataset.variantId || "";
    const variantCategory = cfg.category;
    return { row, type, start, target, variantId, variantCategory };
  });
}

function boostExtractEntriesFromBuildState(state) {
  const entries = [];

  function pushItem(itemState) {
    const type = BOOST_CALC_TYPE_TO_OPTION[itemState?.tipo];
    if (!type) return;
    entries.push({
      type,
      start: 0,
      target: 16,
      variantCategory: itemState.variantCategory || boostGetOptionConfig(type).category,
      variantId: itemState.variantId || ""
    });
  }

  if (Array.isArray(state)) {
    state.forEach(pushItem);
    return entries;
  }

  if (!state || typeof state !== "object") return entries;
  (Array.isArray(state.ungrouped) ? state.ungrouped : []).forEach(pushItem);
  (Array.isArray(state.groups) ? state.groups : []).forEach((groupState) => {
    (Array.isArray(groupState.items) ? groupState.items : []).forEach(pushItem);
  });

  return entries;
}

function boostLoadItems(entries) {
  const list = document.getElementById("boost-items-list");
  if (!list) return;
  list.innerHTML = "";

  const valid = (entries || []).filter((entry) => BOOST_ITEM_OPTIONS[entry.type]);
  if (!valid.length) {
    boostCreateItemRow({ type: "chapeu", start: 0, target: 16 });
    return;
  }

  valid.forEach((entry) => {
    boostCreateItemRow(entry);
  });
}

function boostImportCurrentBuild() {
  if (typeof getBuildState !== "function") return;
  const state = getBuildState();
  const entries = boostExtractEntriesFromBuildState(state);
  if (!entries.length) {
    if (typeof showToast === "function") showToast(bt("boostNoItemsToImport"));
    return;
  }
  boostLoadItems(entries);
  boostRecalc();
}

function boostImportSelectedProfile() {
  const select = document.getElementById("boost-profile-select");
  if (!select || !select.value) {
    if (typeof showToast === "function") showToast(bt("boostNoProfileSelected"));
    return;
  }

  const profiles = typeof getProfilesStorage === "function" ? getProfilesStorage() : {};
  const profile = profiles[select.value];
  const entries = boostExtractEntriesFromBuildState(profile?.buildState);
  if (!entries.length) {
    if (typeof showToast === "function") showToast(bt("boostNoItemsToImport"));
    return;
  }

  boostLoadItems(entries);
  boostRecalc();
}

function boostAddFullSet() {
  const fullSetOrder = ["chapeu", "camisa", "calca", "emblema", "sabre", "colar"];
  fullSetOrder.forEach((type) => {
    boostCreateItemRow({ type, start: 0, target: 16 });
  });
  boostRecalc();
}

function boostClearItems() {
  const list = document.getElementById("boost-items-list");
  if (!list) return;
  list.innerHTML = "";
  boostRecalc();
}

function boostRecalc() {
  const prices = {
    sky: Math.max(0, getNumber("boost-price-sky")),
    sage: Math.max(0, getNumber("boost-price-sage")),
    crimson: Math.max(0, getNumber("boost-price-crimson")),
    radiant: Math.max(0, getNumber("boost-price-radiant"))
  };
  const stock = {
    sky: Math.max(0, getNumber("boost-stock-sky")),
    sage: Math.max(0, getNumber("boost-stock-sage")),
    crimson: Math.max(0, getNumber("boost-stock-crimson")),
    radiant: Math.max(0, getNumber("boost-stock-radiant"))
  };

  const rows = boostGetRowsState();
  const totalMap = { sky: 0, sage: 0, crimson: 0, radiant: 0 };

  rows.forEach((state) => {
    populateBoostTypeOptions(state.row.querySelector(".boost-item-type"), state.type);
    boostSyncRowVariantSelect(state.row, { keepCurrent: true });

    const cfg = boostGetOptionConfig(state.type);
    const levels = BOOST_LEVELS.filter((lvl) => lvl.level > state.start && lvl.level <= state.target);
    const crystalMap = calcItemBoost(levels, cfg.crystalsPerTry).pityByCrystal;

    totalMap.sky += crystalMap.sky;
    totalMap.sage += crystalMap.sage;
    totalMap.crimson += crystalMap.crimson;
    totalMap.radiant += crystalMap.radiant;

    const variantId = state.row.querySelector(".boost-item-variant")?.value || state.variantId;
    renderBoostItemResult(state.row, state.type, state.start, state.target, variantId, crystalMap, prices);
  });

  const payableMap = applyInventoryStock(totalMap, stock);
  const pityCost = calcCost(payableMap, prices);
  renderBreakdown("boost-pity-breakdown", payableMap, prices);

  const pityBerriesLine = document.getElementById("boost-pity-total-berries-line");
  if (pityBerriesLine) {
    pityBerriesLine.innerHTML = `${bt("boostCost")} <strong>฿ ${formatNum(pityCost)}</strong>`;
  }

  renderLevelRows(BOOST_LEVELS, prices);
}

function calcItemBoost(levels, crystalsPerTry) {
  const pityByCrystal = { sky: 0, sage: 0, crimson: 0, radiant: 0 };

  levels.forEach((lvl) => {
    pityByCrystal[lvl.crystal] += lvl.pity * crystalsPerTry;
  });

  return { pityByCrystal };
}

function applyInventoryStock(totalMap, stockMap) {
  return {
    sky: Math.max(0, (totalMap.sky || 0) - (stockMap.sky || 0)),
    sage: Math.max(0, (totalMap.sage || 0) - (stockMap.sage || 0)),
    crimson: Math.max(0, (totalMap.crimson || 0) - (stockMap.crimson || 0)),
    radiant: Math.max(0, (totalMap.radiant || 0) - (stockMap.radiant || 0))
  };
}

function renderBoostItemResult(row, type, start, target, variantId, crystalMap, prices) {
  const host = row.querySelector(".boost-item-result");
  if (!host) return;

  const cfg = boostGetOptionConfig(type);
  const variant = items?.[cfg.category]?.variants?.[variantId];
  const variantName = variantId ? getVariantName(cfg.category, variantId) : bt(cfg.labelKey);
  const variantIcon = variant?.icon || itens?.[type]?.icon || "";
  const totalCost = calcCost(crystalMap, prices);
  const keys = ["sky", "sage", "crimson", "radiant"];

  const rowsHtml = keys
    .filter((key) => (crystalMap[key] || 0) > 0)
    .map((key) => {
      const meta = BOOST_CRYSTAL_META[key];
      const crystalName = bt(meta.nameKey);
      const qty = crystalMap[key] || 0;
      const cost = qty * prices[key];
      return `<tr><td><span class="boost-crystal-cell"><img src="${meta.icon}" alt="${crystalName}" />${crystalName}</span></td><td>${formatNum(qty)}</td><td>฿ ${formatNum(cost)}</td></tr>`;
    })
    .join("");

  host.innerHTML = `
    <div class="boost-item-result-title">${variantIcon ? `<img src="${variantIcon}" alt="${variantName}" />` : ""}${variantName} (+${start} -> +${target})</div>
    <table class="boost-item-table">
      <thead>
        <tr>
          <th>${bt("boostTableCrystal")}</th>
          <th>${bt("boostCrystalsUnit")}</th>
          <th>${bt("boostCost")}</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <div class="boost-item-total">${bt("boostCost")} <strong>฿ ${formatNum(totalCost)}</strong></div>
  `;
}

function calcCost(crystalMap, prices) {
  return (
    crystalMap.sky * prices.sky +
    crystalMap.sage * prices.sage +
    crystalMap.crimson * prices.crimson +
    crystalMap.radiant * prices.radiant
  );
}

function renderBreakdown(targetId, crystalMap, prices) {
  const host = document.getElementById(targetId);
  if (!host) return;

  const keys = ["sky", "sage", "crimson", "radiant"];
  host.innerHTML = "";

  keys.forEach((key) => {
    const amount = crystalMap[key] || 0;
    if (amount <= 0) return;
    
    const meta = BOOST_CRYSTAL_META[key];
    const crystalName = bt(meta.nameKey);
    const cost = amount * (prices[key] || 0);
    const line = document.createElement("div");
    line.className = "boost-breakdown-line";
    line.innerHTML = `<span class="boost-crystal-cell"><img src="${meta.icon}" alt="${crystalName}" />${crystalName}</span><strong>${formatNum(amount)} | ฿ ${formatNum(cost)}</strong>`;
    host.appendChild(line);
  });
}

function renderLevelRows(levels, prices) {
  const tbody = document.getElementById("boost-level-rows");
  if (!tbody) return;

  tbody.innerHTML = "";

  let accumulated2slot = 0;
  let accumulated4slot = 0;

  levels.forEach((lvl) => {
    const crystalName = bt(BOOST_CRYSTAL_META[lvl.crystal].nameKey);
    const tentCol = `${lvl.pity}`;
    const crystalsCol = `${bt("boostCrystals2slot")}: <strong>${lvl.pity * 2}</strong><br>${bt("boostCrystals4slot")}: <strong>${lvl.pity * 4}</strong>`;
    
    // Calculate berries for this level
    const price = prices[lvl.crystal] || 0;
    const berries2slot = lvl.pity * 2 * price;
    const berries4slot = lvl.pity * 4 * price;
    accumulated2slot += berries2slot;
    accumulated4slot += berries4slot;
    
    const berriesCol = `${bt("boostCrystals2slot")}: <strong>฿ ${formatNum(berries2slot)}</strong> <span style="opacity:0.7;">(${bt("boostTotal")} ฿ ${formatNum(accumulated2slot)})</span><br>${bt("boostCrystals4slot")}: <strong>฿ ${formatNum(berries4slot)}</strong> <span style="opacity:0.7;">(${bt("boostTotal")} ฿ ${formatNum(accumulated4slot)})</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>+${lvl.level}</td>
      <td><span class="boost-crystal-cell"><img src="${BOOST_CRYSTAL_META[lvl.crystal].icon}" alt="${crystalName}" />${crystalName}</span></td>
      <td>${lvl.chance}%</td>
      <td>${tentCol}</td>
      <td>${crystalsCol}</td>
      <td>${berriesCol}</td>
    `;
    tbody.appendChild(tr);
  });

  // Add total row
  if (levels.length > 0) {
    const totalTr = document.createElement("tr");
    totalTr.className = "boost-total-row";
    totalTr.innerHTML = `
      <td colspan="5" style="text-align: right; font-weight: bold;">${bt("boostTotal")}</td>
      <td style="font-weight: bold; background: rgba(255, 255, 255, 0.1);">${bt("boostCrystals2slot")}: ฿ ${formatNum(accumulated2slot)}<br>${bt("boostCrystals4slot")}: ฿ ${formatNum(accumulated4slot)}</td>
    `;
    tbody.appendChild(totalTr);
  }

  if (!levels.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="6" class="boost-note">${bt("boostNoRows")}</td>`;
    tbody.appendChild(tr);
  }
}

function bt(key) {
  if (typeof t === "function") return t(key);
  return key;
}

function clampInt(value, min, max) {
  const n = Math.floor(Number(value) || 0);
  return Math.max(min, Math.min(max, n));
}

function getNumber(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const n = Number(el.value);
  return Number.isFinite(n) ? n : 0;
}

function formatNum(n) {
  return Number(n || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
}