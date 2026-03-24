// ============================================================
// Cards — item card creation, variant selector, stat rendering
// ============================================================

let idCounter = 0;
let variantSelectorOpen = null; // Track which card has the selector open

// Floating card variant selector
function openVariantSelector(cardId, category, event) {
  if (!category || !items[category]?.variants) {
    console.warn('No variants available for category:', category);
    return;
  }
  
  event.stopPropagation();
  
  const selectorId = `variantSelector_${cardId}`;
  
  // Toggle: if this selector is already open, close it
  if (variantSelectorOpen === selectorId) {
    const existing = document.getElementById(selectorId);
    if (existing) existing.remove();
    variantSelectorOpen = null;
    return;
  }
  
  // Close any other selector
  if (variantSelectorOpen) {
    const existing = document.getElementById(variantSelectorOpen);
    if (existing) existing.remove();
  }

  const variants = items[category].variants;
  const variantKeys = Object.keys(variants);
  
  const selector = document.createElement('div');
  selector.id = selectorId;
  selector.className = 'variantSelector';
  selector.style.position = 'fixed';
  selector.style.zIndex = '1000';
  
  // Create grid
  const grid = document.createElement('div');
  grid.className = 'variantGrid';

  // Prefer wider grids for weapons to avoid long vertical lists
  const variantCount = variantKeys.length;
  let columns = 3;
  if (category === 'weapon') {
    columns = 5;
  } else if (variantCount > 16) {
    columns = 5;
  } else if (variantCount > 12) {
    columns = 4;
  }
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  selector.style.minWidth = `${Math.max(260, columns * 68)}px`;
  
  variantKeys.forEach((variantId) => {
    const variant = variants[variantId];
    const variantName = getVariantName(category, variantId);
    
    const item = document.createElement('div');
    item.className = 'variantItem';
    item.title = variantName;
    item.onclick = () => selectVariant(cardId, category, variantId);
    
    const img = document.createElement('img');
    img.src = variant.icon;
    img.alt = variantName;
    
    item.appendChild(img);
    grid.appendChild(item);
  });
  
  selector.appendChild(grid);
  
  // Add to DOM temporarily to get actual dimensions
  document.body.appendChild(selector);
  const selectorRect = selector.getBoundingClientRect();
  
  const card = document.getElementById(cardId);
  const rect = card.getBoundingClientRect();
  
  // Calculate position (prefer right of card, but adjust if off-screen)
  let left = rect.right + 10;
  let top = rect.top;
  
  // Adjust if goes beyond right edge
  if (left + selectorRect.width > window.innerWidth - 10) {
    // Try to position on left side of card
    left = rect.left - selectorRect.width - 10;
    
    // If still off-screen, push to center with padding
    if (left < 10) {
      left = Math.max(10, (window.innerWidth - selectorRect.width) / 2);
    }
  }
  
  // Adjust if goes beyond bottom edge
  if (top + selectorRect.height > window.innerHeight - 10) {
    top = Math.max(10, window.innerHeight - selectorRect.height - 10);
  }
  
  // Ensure top is also not too high
  if (top < 10) {
    top = 10;
  }
  
  selector.style.top = top + 'px';
  selector.style.left = left + 'px';
  
  variantSelectorOpen = selectorId;
  
  // Close selector when clicking outside
  const closeHandler = (e) => {
    const clickedInsideSelector = selector.contains(e.target);
    const clickedOnCardIcon = card.querySelector('img')?.contains(e.target);

    if (!clickedInsideSelector && !clickedOnCardIcon) {
      selector.remove();
      variantSelectorOpen = null;
      document.removeEventListener('click', closeHandler);
    }
  };
  document.addEventListener('click', closeHandler);
}

function selectVariant(cardId, category, variantId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const variant = items[category]?.variants?.[variantId];
  if (!variant) {
    console.warn("Invalid variant selection", { cardId, category, variantId });
    return;
  }

  const currentTipo = card.getAttribute("data") || card.dataset.item;
  const targetTipo = getTipoFromVariantSelection(category, variantId, currentTipo);

  if (targetTipo && targetTipo !== currentTipo) {
    const previousStats = {};
    card.querySelectorAll("input[data-stat]").forEach((input) => {
      const stat = input.getAttribute("data-stat");
      const val = parseInt(input.value, 10);
      if (stat && !Number.isNaN(val)) previousStats[stat] = val;
    });

    card.setAttribute("data", targetTipo);
    card.setAttribute("data-item", targetTipo);
    card.classList.remove(`item-${currentTipo}`);
    card.classList.add(`item-${targetTipo}`);

    renderCardStats(card, targetTipo, previousStats);
  }

  const variantName = getVariantName(category, variantId);
  
  // Update card data attributes
  card.setAttribute('data-variant-category', category);
  card.setAttribute('data-variant-id', variantId);
  
  // Update icon in card header
  const iconImg = card.querySelector('.cardHeader img');
  if (iconImg) {
    iconImg.src = variant.icon;
  }
  
  // Update name in card header
  const nameSpan = card.querySelector('.cardHeader b');
  if (nameSpan) {
    nameSpan.textContent = variantName;
  }
  
  // Close selector
  if (variantSelectorOpen) {
    const selector = document.getElementById(variantSelectorOpen);
    if (selector) {
      selector.remove();
    }
    variantSelectorOpen = null;
  }

  recalc();
}

function getTipoFromVariantSelection(category, variantId, fallbackTipo) {
  if (category !== "accessory") return fallbackTipo;

  // Accessory variants can represent necklace (colar) or ring (anel).
  if (variantId && variantId.includes("ring")) return "anel";
  return "colar";
}

function upgradeCardStatControls(card) {
  if (!card) return;

  const tipo = card.getAttribute('data') || card.dataset.item;
  const item = itens[tipo];
  if (!item) return;

  const previousStats = {};
  card.querySelectorAll('input[data-stat]').forEach((input) => {
    const stat = input.getAttribute('data-stat');
    const val = parseInt(input.value, 10);
    if (stat && !Number.isNaN(val)) previousStats[stat] = val;
  });

  renderCardStats(card, tipo, previousStats);
}

function upgradeAllCardStatControls() {
  document.querySelectorAll('.card').forEach((card) => upgradeCardStatControls(card));
}

function getItemStatKeys(item) {
  return Object.keys(item?.max || {});
}

function buildCrystalControlsHtml(cardId, stat, crystalGain, useSharedControl = false) {
  if (useSharedControl) {
    const sharedTitleDec = "Remover 1 cristal em ambos os stats (usa o ganho de cada stat)";
    const sharedTitleInc = "Adicionar 1 cristal em ambos os stats (usa o ganho de cada stat)";
    return `<div class="statBtnGroup statBtnGroupCrystal">
<button class="statAdjustBtn statAdjustCrystalBtn statAdjustCrystalDec" type="button" onclick="adjustCardByCrystal('${cardId}', -1)" title="${sharedTitleDec}" aria-label="${sharedTitleDec}"><span class="crystalMiniIcon" aria-hidden="true"></span></button>
<button class="statAdjustBtn statAdjustCrystalBtn statAdjustCrystalInc" type="button" onclick="adjustCardByCrystal('${cardId}', 1)" title="${sharedTitleInc}" aria-label="${sharedTitleInc}"><span class="crystalMiniIcon" aria-hidden="true"></span></button>
</div>`;
  }

  const crystalTitleDec = `Remover o equivalente a 1 cristal (${crystalGain} ${stat.toUpperCase()})`;
  const crystalTitleInc = `Adicionar o equivalente a 1 cristal (${crystalGain} ${stat.toUpperCase()})`;
  return `<div class="statBtnGroup statBtnGroupCrystal">
<button class="statAdjustBtn statAdjustCrystalBtn statAdjustCrystalDec" type="button" onclick="adjustStatByCrystal('${cardId}', '${stat}', -1)" title="${crystalTitleDec}" aria-label="${crystalTitleDec}"><span class="crystalMiniIcon" aria-hidden="true"></span></button>
<button class="statAdjustBtn statAdjustCrystalBtn statAdjustCrystalInc" type="button" onclick="adjustStatByCrystal('${cardId}', '${stat}', 1)" title="${crystalTitleInc}" aria-label="${crystalTitleInc}"><span class="crystalMiniIcon" aria-hidden="true"></span></button>
</div>`;
}

function renderCardStats(card, tipo, previousStats = {}) {
  const item = itens[tipo];
  if (!card || !item) return;

  const header = card.querySelector(".cardHeader");
  if (!header) return;

  while (header.nextSibling) {
    header.parentNode.removeChild(header.nextSibling);
  }

  let html = "";

  const statKeys = getItemStatKeys(item);
  const hasTwoStats = statKeys.length === 2;

  statKeys.forEach((stat, index) => {
    const prevVal = previousStats[stat];
    const hasPrev = typeof prevVal === "number" && !Number.isNaN(prevVal);
    const clamped = hasPrev
      ? Math.max(item.min[stat], Math.min(item.max[stat], prevVal))
      : "";

    const crystalGain = Number(item.gain?.[stat]) || 1;
    const showCrystalControls = !hasTwoStats || index === 0;
    const crystalControls = showCrystalControls
      ? buildCrystalControlsHtml(card.id, stat, crystalGain, hasTwoStats)
      : "";

    html += `
<div class="statRow">
<div class="statLabel">${stat.toUpperCase()}</div>
<div class="statBtnGroup statBtnGroupStat">
<button class="statAdjustBtn" type="button" onclick="adjustStat('${card.id}', '${stat}', -1)" title="-1 stat">-</button>
<button class="statAdjustBtn" type="button" onclick="adjustStat('${card.id}', '${stat}', 1)" title="+1 stat">+</button>
</div>
<input type="number"
class="statInput"
data-stat="${stat}"
data-card-id="${card.id}"
placeholder="${item.min[stat]}"
min="${item.min[stat]}"
max="${item.max[stat]}"
value="${clamped}"
oninput="recalc()"
onblur="validateStatInput(this)">
${crystalControls}
</div>

<div class="segmentBar" id="${card.id}_${stat}_bar"></div>
`;
  });

  html += `<div id="${card.id}_result"></div>`;
  header.insertAdjacentHTML("afterend", html);
}

// Helper to map item type to category
function getItemTypeCategory(itemType) {
  const typeMap = {
    chapeu: 'head',
    camisa: 'body',
    calca: 'legs',
    emblema: 'emblem',
    sabre: 'weapon',
    colar: 'accessory',
    anel: 'accessory'
  };
  return typeMap[itemType] || null;
}

function addItem(tipo, targetContainer = null, skipRecalc = false) {
  const item = itens[tipo];
  if (!item) {
    console.error(`Item type "${tipo}" not found in itens`);
    return;
  }
  const id = "item" + idCounter++;
  
  // Get variant category for this item type
  const variantCategory = getItemTypeCategory(tipo);
  
  // Default to first variant in category (if exists)
  let defaultVariantId = null;
  let defaultVariantIcon = item.icon;
  let defaultVariantName = item.nome;
  let variantGearHtml = '';

  if (variantCategory && items[variantCategory]?.variants) {
    try {
      defaultVariantId = Object.keys(items[variantCategory].variants)[0];
      defaultVariantIcon = items[variantCategory].variants[defaultVariantId].icon;
      defaultVariantName = getVariantName(variantCategory, defaultVariantId);
      variantGearHtml = `<button class="variantBtn" onclick="openVariantSelector('${id}', '${variantCategory}', event)" title="${t('selectVariant')}">&#9881;</button>`;
    } catch (e) {
      console.warn(`Could not load variant for ${tipo}:`, e);
    }
  }

  let html = `<div class="card item-${tipo}" id="${id}" data="${tipo}" data-item="${tipo}" data-variant-category="${variantCategory}" data-variant-id="${defaultVariantId}">

<div class="cardHeader">
<img src="${defaultVariantIcon}">
<b>${defaultVariantName}</b>
<div class="cardActions">${variantGearHtml}<button class="remove" onclick="removeItem('${id}')">X</button></div>
</div>
`;

  const statKeys = getItemStatKeys(item);
  const hasTwoStats = statKeys.length === 2;

  statKeys.forEach((stat, index) => {
    const crystalGain = Number(item.gain?.[stat]) || 1;
    const showCrystalControls = !hasTwoStats || index === 0;
    const crystalControls = showCrystalControls
      ? buildCrystalControlsHtml(id, stat, crystalGain, hasTwoStats)
      : "";

    html += `
<div class="statRow">
<div class="statLabel">${stat.toUpperCase()}</div>
<div class="statBtnGroup statBtnGroupStat">
<button class="statAdjustBtn" type="button" onclick="adjustStat('${id}', '${stat}', -1)" title="-1 stat">-</button>
<button class="statAdjustBtn" type="button" onclick="adjustStat('${id}', '${stat}', 1)" title="+1 stat">+</button>
</div>
<input type="number"
class="statInput"
data-stat="${stat}"
data-card-id="${id}"
placeholder="${item.min[stat]}"
min="${item.min[stat]}"
max="${item.max[stat]}"
oninput="recalc()"
onblur="validateStatInput(this)">
${crystalControls}
</div>

<div class="segmentBar" id="${id}_${stat}_bar"></div>
`;
  });

  html += `<div id="${id}_result"></div></div>`;

  ensureItemsLayout();
  const destination = targetContainer || getUngroupedItemsContainer();
  if (!destination) return;

  destination.insertAdjacentHTML("beforeend", html);
  initializeCardElement(document.getElementById(id));

  if (!skipRecalc) recalc();
  return id;
}

function addFullSet() {
  // Only add the items that make up the full set (exclude ring)
  const fullSetOrder = ["chapeu", "camisa", "calca", "emblema", "sabre", "colar"];

  fullSetOrder.forEach((tipo) => {
    try {
      addItem(tipo);
    } catch (error) {
      console.error("Failed to add item", tipo, error);
    }
  });
}

function removeItem(id) {
  document.getElementById(id).remove();
  recalc();
}

function validateStatInput(inputEl) {
  if (!inputEl) return;

  const card = inputEl.closest(".card");
  if (!card) return;

  const tipo = card.getAttribute("data") || card.dataset.item;
  const stat = inputEl.getAttribute("data-stat");
  const item = itens[tipo];

  if (!item || !stat || typeof item.min[stat] !== "number" || typeof item.max[stat] !== "number") {
    recalc();
    return;
  }

  const min = item.min[stat];
  const max = item.max[stat];

  let value = parseInt(inputEl.value, 10);
  if (Number.isNaN(value)) value = min;

  if (value < min) value = min;
  if (value > max) value = max;

  inputEl.value = value;
  recalc();
}

function adjustStat(cardId, stat, delta, skipRecalc = false) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const tipo = card.getAttribute("data") || card.dataset.item;
  const item = itens[tipo];
  if (!item || typeof item.min[stat] !== "number" || typeof item.max[stat] !== "number") return;

  const input = card.querySelector(`.statInput[data-stat="${stat}"]`) || card.querySelector(`input[data-stat="${stat}"]`);
  if (!input) return;

  if (!input.classList.contains('statInput')) {
    input.classList.add('statInput');
  }

  let currentValue = parseInt(input.value, 10);
  if (Number.isNaN(currentValue)) currentValue = item.min[stat];

  const newValue = currentValue + delta;
  const min = item.min[stat];
  const max = item.max[stat];

  if (newValue < min) {
    input.value = min;
  } else if (newValue > max) {
    input.value = max;
  } else {
    input.value = newValue;
  }

  if (!skipRecalc) recalc();
}

function adjustStatByCrystal(cardId, stat, crystalDelta) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const tipo = card.getAttribute("data") || card.dataset.item;
  const item = itens[tipo];
  if (!item) return;

  const crystalGain = Number(item.gain?.[stat]);
  const step = Number.isFinite(crystalGain) && crystalGain > 0 ? crystalGain : 1;

  adjustStat(cardId, stat, step * crystalDelta);
}

function adjustCardByCrystal(cardId, crystalDelta) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const tipo = card.getAttribute("data") || card.dataset.item;
  const item = itens[tipo];
  if (!item) return;

  const statKeys = getItemStatKeys(item);
  if (statKeys.length === 0) return;

  statKeys.forEach((stat) => {
    const crystalGain = Number(item.gain?.[stat]);
    const step = Number.isFinite(crystalGain) && crystalGain > 0 ? crystalGain : 1;
    adjustStat(cardId, stat, step * crystalDelta, true);
  });

  recalc();
}
