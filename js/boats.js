// ============================================================
// Boats - Arsenal + Refinery + Ship Skins Planner
// ============================================================

let boatState = {
  selectedArsenal: {},
  selectedSkins: {}
};

let boatData = {
  itemMap: {},
  refinery: {},
  arsenal: {},
  skins: {},
  order: {
    item: {},
    refinery: {},
    arsenal: {},
    ink: {}
  }
};

const BOAT_KEY_ALIASES = {
  wood_plank: "wood_planks",
  oak_plank: "oak_planks",
  mahogany_plank: "mahogany_planks",
  adam_plank: "adam_planks",
  titanium_ingots: "titanium_ingot",
  sapphite: "sapphire"
};

function boatsNormalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function boatsCanonicalKey(value) {
  const normalized = boatsNormalizeKey(value);
  return BOAT_KEY_ALIASES[normalized] || normalized;
}

function boatsPrettyName(key) {
  return String(key || "")
    .replace(/^item\./, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function boatsBerryFormat(value) {
  const localeMap = { pt: "pt-BR", en: "en-US", es: "es-ES", pl: "pl-PL" };
  const formatter = new Intl.NumberFormat(localeMap[currentLang] || "en-US");
  return "฿ " + formatter.format(Math.round(Number(value) || 0));
}

function boatsItemDisplayName(itemKey) {
  const canonical = boatsCanonicalKey(itemKey);

  if (boatsNamesLang && boatsNamesLang[canonical]) {
    const map = boatsNamesLang[canonical];
    return map[currentLang] || map.en || boatsPrettyName(canonical);
  }

  const item = boatData.itemMap[canonical];
  if (!item) return boatsPrettyName(canonical);

  const langKey = boatsCanonicalKey(String(item.labelKey || "").replace("item.", ""));
  if (recipesLang?.[currentLang]?.item?.[langKey]) {
    return recipesLang[currentLang].item[langKey];
  }

  return boatsPrettyName(langKey || canonical);
}

function boatsResolveItemSprite(itemKey) {
  const canonical = boatsCanonicalKey(itemKey);

  // 1) Raw purchasable materials for boats
  const boatItemPath = "sprites/boats/items/" + canonical + ".png";
  if (canonical in boatData.itemMap) return boatItemPath;

  if (boatData.refinery[canonical]) {
    const refineryFile = canonical === "titanium_ingot" ? "titanium_ingots" : canonical;
    return "sprites/boats/refinery/" + refineryFile + ".png";
  }

  if (boatData.arsenal[canonical]) {
    return boatsResolveArsenalSprite(canonical);
  }

  if (/_ink$/.test(canonical)) {
    return "sprites/boats/inks/" + canonical + ".png";
  }

  // Fallback for unknown keys (kept for robustness)
  return boatItemPath;
}

function boatsResolveArsenalSprite(itemKey) {
  const file = itemKey === "ship_upgrade_kit" ? "upgrade_kit_6" : itemKey + "_6";
  return "sprites/boats/arsenal/" + file + ".png";
}

function boatsResolveSkinSprite(skinKey) {
  const mapped = skinKey === "sapphite" ? "sapphire" : skinKey;
  return "sprites/boats/skins/boat_" + mapped + ".png";
}

function boatsSplitSections(text) {
  const sections = { refinery: [], arsenal: [], ships: [] };
  let current = "";

  String(text || "").split(/\r?\n/).forEach((lineRaw) => {
    const line = lineRaw.trim();
    if (!line) return;

    const heading = boatsNormalizeKey(line);
    if (heading === "refinery") {
      current = "refinery";
      return;
    }
    if (heading === "arsenal") {
      current = "arsenal";
      return;
    }
    if (heading === "ships") {
      current = "ships";
      return;
    }

    if (current) sections[current].push(line);
  });

  return sections;
}

function boatsParseIngredientChunk(chunk) {
  const parsed = String(chunk || "").trim().match(/^(\d+)\s+(.+)$/i);
  if (!parsed) {
    const key = boatsCanonicalKey(chunk);
    return { qty: 1, key };
  }
  return { qty: Number(parsed[1] || 1), key: boatsCanonicalKey(parsed[2]) };
}

function boatsParseRecipeLine(line) {
  const parts = String(line || "").split("=");
  if (parts.length !== 2) return null;

  const left = parts[0].trim();
  const right = parts[1].trim();

  let outputQty = 1;
  let outputName = left;
  const leftMatch = left.match(/^(\d+)\s+(.+)$/i);
  if (leftMatch) {
    outputQty = Number(leftMatch[1] || 1);
    outputName = leftMatch[2] || "";
  }

  const outputKey = boatsCanonicalKey(outputName);
  if (!outputKey) return null;

  const ingredients = right
    .split(",")
    .map((chunk) => boatsParseIngredientChunk(chunk))
    .filter((it) => it && it.key);

  return {
    outputKey,
    outputName: outputName.trim(),
    outputQty,
    ingredients
  };
}

function boatsBuildData() {
  const itemMap = {};
  const order = {
    item: {},
    refinery: {},
    arsenal: {},
    ink: {}
  };

  BOAT_ITEMS_LIST.forEach((item) => {
    const key = boatsNormalizeKey(String(item.labelKey || "").replace(/^item\./, ""));
    itemMap[key] = {
      id: item.id,
      key,
      labelKey: String(item.labelKey || "").replace(/^item\./, ""),
      value: Number(item.value) || 0,
      sprite: item.sprite || ""
    };
    order.item[key] = Number(item.id) || Number.MAX_SAFE_INTEGER;
  });

  const sections = boatsSplitSections(BOAT_RECIPES_RAW);
  const refinery = {};
  const arsenal = {};
  const skins = {};

  sections.refinery.forEach((line, index) => {
    const recipe = boatsParseRecipeLine(line);
    if (!recipe) return;

    // Fix known typo from source txt
    if (recipe.outputKey === "advanced_rope" && recipe.ingredients.length === 1 && recipe.ingredients[0].key === "advanced_rope") {
      recipe.ingredients = [{ qty: 2, key: "advanced_cloth" }];
    }

    refinery[recipe.outputKey] = recipe;
    order.refinery[recipe.outputKey] = index;
  });

  sections.arsenal.forEach((line, index) => {
    const recipe = boatsParseRecipeLine(line);
    if (!recipe) return;
    arsenal[recipe.outputKey] = recipe;
    order.arsenal[recipe.outputKey] = index;
  });

  let inkOrderIndex = 0;
  sections.ships.forEach((line) => {
    const recipe = boatsParseRecipeLine(line);
    if (!recipe) return;
    recipe.ingredients.forEach((ing) => {
      if (order.ink[ing.key] === undefined) {
        order.ink[ing.key] = inkOrderIndex++;
      }
    });
    skins[recipe.outputKey] = recipe;
  });

  return { itemMap, refinery, arsenal, skins, order };
}

function boatsGetOrderValue(group, key) {
  const canonicalKey = boatsCanonicalKey(key);
  const itemOrder = boatData.order?.item?.[canonicalKey];
  if (Number.isFinite(itemOrder)) return itemOrder;

  const groupOrder = boatData.order?.[group]?.[canonicalKey];
  if (Number.isFinite(groupOrder)) return groupOrder;

  return Number.MAX_SAFE_INTEGER;
}

function boatsSortEntries(entries, group) {
  return entries.slice().sort((a, b) => {
    const orderDiff = boatsGetOrderValue(group, a[0]) - boatsGetOrderValue(group, b[0]);
    if (orderDiff !== 0) return orderDiff;
    return String(a[0]).localeCompare(String(b[0]));
  });
}

function boatsGetArsenalCatalog() {
  return BOAT_ARSENAL_ICON_ORDER.map((key) => {
    return {
      key,
      name: boatsItemDisplayName(key),
      sprite: boatsResolveArsenalSprite(key),
      hasRecipe: !!boatData.arsenal[key]
    };
  });
}

function boatsGetSkinCatalog() {
  return BOAT_SKIN_ICON_ORDER.map((key) => {
    return {
      key,
      name: boatsItemDisplayName(key),
      sprite: boatsResolveSkinSprite(key),
      hasRecipe: !!boatData.skins[key] || key === "sapphire"
    };
  });
}

function boatsInit() {
  const panel = document.getElementById("boats");
  if (!panel) return;

  boatData = boatsBuildData();

  // Ensure all items exist in state map
  boatsGetArsenalCatalog().forEach((item) => {
    if (typeof boatState.selectedArsenal[item.key] !== "number") boatState.selectedArsenal[item.key] = 0;
  });
  boatsGetSkinCatalog().forEach((skin) => {
    if (typeof boatState.selectedSkins[skin.key] !== "boolean") boatState.selectedSkins[skin.key] = false;
  });

  boatsBindEvents();
  boatsApplyTranslations();
  boatsRender();
}

function boatsBindEvents() {
  const panel = document.getElementById("boats");
  if (!panel || panel.dataset.boatsBound === "1") return;
  panel.dataset.boatsBound = "1";

  panel.addEventListener("change", (event) => {
    const arsenalCb = event.target.closest("[data-boat-arsenal]");
    if (arsenalCb) {
      const key = arsenalCb.getAttribute("data-boat-arsenal");
      const currentQty = Number(boatState.selectedArsenal[key] || 0);
      boatState.selectedArsenal[key] = arsenalCb.checked ? Math.max(1, currentQty) : 0;
      autoSaveBuild();
      boatsRender();
      return;
    }

    const arsenalQty = event.target.closest("[data-boat-arsenal-qty]");
    if (arsenalQty) {
      const key = arsenalQty.getAttribute("data-boat-arsenal-qty");
      const parsed = Math.floor(Number(arsenalQty.value) || 0);
      const qty = Math.max(0, Math.min(999, parsed));
      boatState.selectedArsenal[key] = qty;
      autoSaveBuild();
      boatsRender();
      return;
    }

    const skinCb = event.target.closest("[data-boat-skin]");
    if (skinCb) {
      const key = skinCb.getAttribute("data-boat-skin");
      boatState.selectedSkins[key] = !!skinCb.checked;
      autoSaveBuild();
      boatsRender();
    }
  });

  panel.addEventListener("click", (event) => {
    const selectAllArsenal = event.target.closest("[data-boats-action='arsenal-all']");
    if (selectAllArsenal) {
      boatsGetArsenalCatalog().forEach((it) => {
        if (it.hasRecipe) boatState.selectedArsenal[it.key] = Math.max(1, Number(boatState.selectedArsenal[it.key] || 0));
      });
      autoSaveBuild();
      boatsRender();
      return;
    }

    const clearArsenal = event.target.closest("[data-boats-action='arsenal-clear']");
    if (clearArsenal) {
      boatsGetArsenalCatalog().forEach((it) => {
        boatState.selectedArsenal[it.key] = 0;
      });
      autoSaveBuild();
      boatsRender();
      return;
    }

    const selectAllSkins = event.target.closest("[data-boats-action='skins-all']");
    if (selectAllSkins) {
      boatsGetSkinCatalog().forEach((it) => {
        if (it.hasRecipe) boatState.selectedSkins[it.key] = true;
      });
      autoSaveBuild();
      boatsRender();
      return;
    }

    const clearSkins = event.target.closest("[data-boats-action='skins-clear']");
    if (clearSkins) {
      boatsGetSkinCatalog().forEach((it) => {
        boatState.selectedSkins[it.key] = false;
      });
      autoSaveBuild();
      boatsRender();
    }
  });
}

function boatsExpandMaterial(itemKey, qty, out, stack) {
  if (!itemKey || qty <= 0) return;
  const canonicalKey = boatsCanonicalKey(itemKey);

  const arsenalRecipe = boatData.arsenal[canonicalKey];
  if (arsenalRecipe) {
    const batches = Math.ceil(qty / Math.max(1, arsenalRecipe.outputQty || 1));
    out.build[canonicalKey] = (out.build[canonicalKey] || 0) + batches;
    arsenalRecipe.ingredients.forEach((ing) => {
      boatsExpandMaterial(ing.key, ing.qty * batches, out, stack);
    });
    return;
  }

  const refineryRecipe = boatData.refinery[canonicalKey];
  if (refineryRecipe) {
    const batches = Math.ceil(qty / Math.max(1, refineryRecipe.outputQty || 1));
    out.refine[canonicalKey] = (out.refine[canonicalKey] || 0) + batches;
    refineryRecipe.ingredients.forEach((ing) => {
      boatsExpandMaterial(ing.key, ing.qty * batches, out, stack);
    });
    return;
  }

  out.base[canonicalKey] = (out.base[canonicalKey] || 0) + qty;
  const value = boatData.itemMap[canonicalKey]?.value || 0;
  out.baseCost += value * qty;
}

function boatsComputeArsenalPlan() {
  const selected = Object.keys(boatState.selectedArsenal).filter((key) => Number(boatState.selectedArsenal[key] || 0) > 0);
  const out = { selected, base: {}, refine: {}, build: {}, baseCost: 0 };

  selected.forEach((key) => {
    boatsExpandMaterial(key, Number(boatState.selectedArsenal[key] || 0), out, "root");
  });

  return out;
}

function boatsComputeSkinsPlan() {
  const selected = Object.keys(boatState.selectedSkins).filter((key) => !!boatState.selectedSkins[key]);
  const inks = {};

  selected.forEach((skinKey) => {
    const mapped = skinKey === "sapphire" ? "sapphite" : skinKey;
    const recipe = boatData.skins[mapped];
    if (!recipe) return;
    recipe.ingredients.forEach((ing) => {
      inks[ing.key] = (inks[ing.key] || 0) + ing.qty;
    });
  });

  return { selected, inks };
}

function boatsRenderArsenalCards() {
  const mount = document.getElementById("boats-arsenal-grid");
  if (!mount) return;

  const cards = boatsGetArsenalCatalog().map((item) => {
    const qty = Number(boatState.selectedArsenal[item.key] || 0);
    const checked = qty > 0;
    const disabled = !item.hasRecipe;
    return `
      <label class="boats-card${checked ? " is-selected" : ""}${disabled ? " is-disabled" : ""}">
        <img src="${item.sprite}" alt="${item.name}" loading="lazy" />
        <span class="boats-card-name">${item.name}</span>
        <input type="checkbox" data-boat-arsenal="${item.key}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
        <input
          class="boats-card-qty"
          type="number"
          min="0"
          max="999"
          step="1"
          data-boat-arsenal-qty="${item.key}"
          value="${qty}"
          ${disabled ? "disabled" : ""}
          title="Quantidade"
        />
      </label>
    `;
  });

  mount.innerHTML = cards.join("");
}

function boatsRenderSkinCards() {
  const mount = document.getElementById("boats-skins-grid");
  if (!mount) return;

  const cards = boatsGetSkinCatalog().map((item) => {
    const checked = !!boatState.selectedSkins[item.key];
    const disabled = !item.hasRecipe;
    return `
      <label class="boats-card boats-card-skin${checked ? " is-selected" : ""}${disabled ? " is-disabled" : ""}">
        <img src="${item.sprite}" alt="${item.name}" loading="lazy" />
        <span class="boats-card-name">${item.name}</span>
        <input type="checkbox" data-boat-skin="${item.key}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
      </label>
    `;
  });

  mount.innerHTML = cards.join("");
}

function boatsRenderQtyIconRow(itemKey, qty, options) {
  const opts = options || {};
  const icon = opts.icon || boatsResolveItemSprite(itemKey);
  const title = opts.title || boatsItemDisplayName(itemKey);
  const meta = opts.meta ? `<span class="boats-plan-meta">${opts.meta}</span>` : "";
  return `
    <div class="boats-plan-row" title="${title}">
      <img src="${icon}" alt="${title}" loading="lazy" />
      <span class="boats-plan-name">${title}</span>
      <strong>x${qty}</strong>
      ${meta}
    </div>
  `;
}

function boatsRenderRequirementIcons(recipe, factor) {
  if (!recipe || !Array.isArray(recipe.ingredients) || !recipe.ingredients.length) return "";
  const list = recipe.ingredients
    .map((ing) => {
      const needQty = ing.qty * factor;
      const title = `${boatsItemDisplayName(ing.key)} x${needQty}`;
      return `
        <span class="boats-req-chip" title="${title}">
          <img src="${boatsResolveItemSprite(ing.key)}" alt="${title}" loading="lazy" />
          <b>${needQty}</b>
        </span>
      `;
    })
    .join("");

  return `<div class="boats-req-list">${list}</div>`;
}

function boatsRenderSummary() {
  const mount = document.getElementById("boats-summary");
  if (!mount) return;

  const arsenalPlan = boatsComputeArsenalPlan();
  const skinsPlan = boatsComputeSkinsPlan();

  const hasArsenal = arsenalPlan.selected.length > 0;
  const hasSkins = skinsPlan.selected.length > 0;
  if (!hasArsenal && !hasSkins) {
    mount.innerHTML = `<div class="boats-empty">${t("boatsNoSelection")}</div>`;
    return;
  }

  const baseRows = boatsSortEntries(Object.entries(arsenalPlan.base), "item")
    .map(([key, qty]) => {
      const value = boatData.itemMap[key]?.value || 0;
      const rowCost = value * qty;
      return boatsRenderQtyIconRow(key, qty, { meta: boatsBerryFormat(rowCost) });
    });

  const refineRows = boatsSortEntries(Object.entries(arsenalPlan.refine), "refinery")
    .map(([key, qty]) => {
      const recipe = boatData.refinery[key];
      if (!recipe) return "";
      return `
        <div class="boats-plan-row-wrap">
          ${boatsRenderQtyIconRow(key, qty)}
          ${boatsRenderRequirementIcons(recipe, qty)}
        </div>
      `;
    })
    .filter(Boolean);

  const buildRows = boatsSortEntries(Object.entries(arsenalPlan.build), "arsenal")
    .map(([key, qty]) => {
      const recipe = boatData.arsenal[key];
      if (!recipe) return "";
      return `
        <div class="boats-plan-row-wrap">
          ${boatsRenderQtyIconRow(key, qty, { icon: boatsResolveArsenalSprite(key), title: boatsItemDisplayName(key) })}
          ${boatsRenderRequirementIcons(recipe, qty)}
        </div>
      `;
    })
    .filter(Boolean);

  const inkRows = boatsSortEntries(Object.entries(skinsPlan.inks), "ink")
    .map(([key, qty]) => boatsRenderQtyIconRow(key, qty, { meta: t("boatsNotPurchasable") }));

  const skinsSection = hasSkins
    ? `
      <section class="boats-step boats-step-skins">
        <h4>4. ${t("boatsStepSkins")}</h4>
        <div class="boats-plan-list">${inkRows.join("")}</div>
      </section>
    `
    : "";

  mount.innerHTML = `
    <section class="boats-step">
      <h4>1. ${t("boatsStepBuy")}</h4>
      ${baseRows.length ? `<div class="boats-plan-list">${baseRows.join("")}</div>` : `<div class="boats-muted">${t("boatsNoSelection")}</div>`}
      ${baseRows.length ? `<div class="boats-total">${t("boatsTotalBaseCost")}: <strong>${boatsBerryFormat(arsenalPlan.baseCost)}</strong></div>` : ""}
    </section>

    <section class="boats-step">
      <h4>2. ${t("boatsStepRefine")}</h4>
      ${refineRows.length ? `<div class="boats-plan-list">${refineRows.join("")}</div>` : `<div class="boats-muted">${t("boatsNoRefineNeeded")}</div>`}
    </section>

    <section class="boats-step">
      <h4>3. ${t("boatsStepBuild")}</h4>
      ${buildRows.length ? `<div class="boats-plan-list">${buildRows.join("")}</div>` : `<div class="boats-muted">${t("boatsNoBuildNeeded")}</div>`}
    </section>

    ${skinsSection}
  `;
}

function boatsRender() {
  boatsRenderArsenalCards();
  boatsRenderSkinCards();
  boatsRenderSummary();
}

function boatsApplyTranslations() {
  boatsRenderSummary();
}

function getBoatsState() {
  return {
    version: 1,
    selectedArsenal: { ...boatState.selectedArsenal },
    selectedSkins: { ...boatState.selectedSkins }
  };
}

function applyBoatsState(state) {
  const selectedArsenal = state && typeof state === "object" && state.selectedArsenal && typeof state.selectedArsenal === "object"
    ? state.selectedArsenal
    : {};
  const selectedSkins = state && typeof state === "object" && state.selectedSkins && typeof state.selectedSkins === "object"
    ? state.selectedSkins
    : {};

  Object.keys(boatState.selectedArsenal).forEach((key) => {
    const raw = selectedArsenal[key];
    if (typeof raw === "boolean") {
      boatState.selectedArsenal[key] = raw ? 1 : 0;
    } else {
      boatState.selectedArsenal[key] = Math.max(0, Math.min(999, Math.floor(Number(raw) || 0)));
    }
  });
  Object.keys(boatState.selectedSkins).forEach((key) => {
    boatState.selectedSkins[key] = !!selectedSkins[key];
  });

  boatsRender();
}

function resetBoatsState() {
  Object.keys(boatState.selectedArsenal).forEach((key) => {
    boatState.selectedArsenal[key] = 0;
  });
  Object.keys(boatState.selectedSkins).forEach((key) => {
    boatState.selectedSkins[key] = false;
  });
  boatsRender();
}
