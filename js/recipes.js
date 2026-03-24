// ============================================================
// Recipes — full recipes tab logic
// Converted from ES modules to global scripts (file:// safe)
// All globals prefixed with "recipes" to avoid collisions
// ============================================================

let recipesSelectedRecipe = null;

// ---- i18n helpers ----
// tr() does dot-notation lookup into recipesLang[currentLang]
// (recipesLang is defined in lang.js)
function tr(dotKey, params) {
  const keys = dotKey.split('.');
  let val = recipesLang[currentLang];
  for (let i = 0; i < keys.length; i++) {
    if (val && val[keys[i]] !== undefined) {
      val = val[keys[i]];
    } else {
      val = null;
      break;
    }
  }
  if (!val || typeof val !== 'string') return '[' + dotKey + ']';
  if (params) {
    Object.keys(params).forEach(function(p) {
      val = val.replace(new RegExp('\\{' + p + '\\}', 'g'), params[p]);
    });
  }
  return val;
}

function recipesBerryFormat(value) {
  const localeMap = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', pl: 'pl-PL' };
  const formatter = new Intl.NumberFormat(localeMap[currentLang] || 'en-US');
  return 'Ƀ ' + formatter.format(Number(value) || 0);
}

// ---- Calculator ----

function recipesValidateQty(qty) {
  if (qty === null || qty === undefined || isNaN(qty)) return true;
  return qty >= 1 && qty <= 100;
}

function recipesCalcTime(quantity) {
  const totalMinutes = quantity * 5;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? hours + 'h ' + minutes + 'min' : minutes + 'min';
}

function recipesCalcBagSlots(recipe, quantity) {
  let totalSlots = 0;
  recipe.ingredients.forEach(function(ing) {
    totalSlots += Math.ceil((ing.quantity * quantity) / 100);
  });
  return totalSlots;
}

function recipesCalcProduction(recipe, quantity, sellPrice) {
  if (!recipe || !recipesValidateQty(quantity)) return null;

  let unitCost = 0;
  recipe.ingredients.forEach(function(ing) {
    const item = RECIPE_ITEMS_BY_ID[ing.id];
    if (item) unitCost += item.value * ing.quantity;
  });

  const totalCost = unitCost * quantity;
  const fee = Math.round(sellPrice * quantity * 0.03);
  const profit = Math.round(sellPrice * quantity - totalCost - fee);

  return {
    unitCost: recipesBerryFormat(unitCost),
    totalCost: recipesBerryFormat(totalCost),
    fee: recipesBerryFormat(fee),
    profit: recipesBerryFormat(profit),
    profitValue: profit,
    productionTime: recipesCalcTime(quantity),
    bagSlots: recipesCalcBagSlots(recipe, quantity)
  };
}

// ---- UI builders ----

function recipesBuildList() {
  const container = document.getElementById('r-recipe-list-container');
  if (!container) return;
  container.innerHTML = '';

  RECIPES_LIST.forEach(function(recipe) {
    const item = document.createElement('div');
    item.className = 'r-recipe-item';
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', tr(recipe.labelKey));
    item.addEventListener('click', function() { recipesSelectRecipe(recipe); });
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') recipesSelectRecipe(recipe);
    });

    const img = document.createElement('img');
    img.src = recipe.sprite;
    img.alt = tr(recipe.labelKey);
    img.width = 48;
    img.height = 48;
    img.style.borderRadius = '6px';

    const textBox = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'r-recipe-name';
    name.textContent = tr(recipe.labelKey);

    const meta = document.createElement('div');
    meta.className = 'r-recipe-meta';
    meta.textContent = tr('ui.levelLabel') + ' ' + recipe.level + ' — ' + recipe.cooldown + tr('ui.secondsSuffix');

    textBox.appendChild(name);
    textBox.appendChild(meta);
    item.appendChild(img);
    item.appendChild(textBox);
    container.appendChild(item);
  });
}

function recipesSelectRecipe(recipe) {
  recipesSelectedRecipe = recipe;
  recipesUpdateDetails();
  recipesUpdateIngredients(1);
  recipesHighlightSelected();
  recipesUpdatePanel();

  // Keep qty field empty (calculates with 1 internally)
  const qtyEl = document.getElementById('r-qty');
  if (qtyEl) qtyEl.value = '';
}

function recipesUpdateDetails() {
  if (!recipesSelectedRecipe) return;

  const nameEl = document.getElementById('r-recipe-name');
  if (nameEl) {
    nameEl.innerHTML =
      '<img src="' + recipesSelectedRecipe.sprite +
      '" alt="' + tr(recipesSelectedRecipe.labelKey) +
      '" class="r-recipe-icon"> ' +
      tr(recipesSelectedRecipe.labelKey);
  }

  const levelEl = document.getElementById('r-recipe-level');
  if (levelEl) levelEl.textContent = tr('ui.levelLabel') + ' ' + recipesSelectedRecipe.level;

  const cooldownEl = document.getElementById('r-recipe-cooldown');
  if (cooldownEl) cooldownEl.textContent = recipesSelectedRecipe.cooldown + tr('ui.secondsSuffix');
}

function recipesUpdateIngredients(quantity) {
  const ingList = document.getElementById('r-ingredients-list');
  if (!ingList || !recipesSelectedRecipe) return;
  ingList.innerHTML = '';

  recipesSelectedRecipe.ingredients.forEach(function(ing) {
    const itemData = RECIPE_ITEMS_BY_ID[ing.id];
    if (!itemData) return;

    const row = document.createElement('div');
    row.className = 'r-ingredient';

    const img = document.createElement('img');
    img.src = itemData.sprite;
    img.alt = tr(itemData.labelKey);
    img.width = 32;
    img.height = 32;

    const name = document.createElement('span');
    name.className = 'r-ingredient-name';
    name.textContent = tr(itemData.labelKey);

    const qtyValContainer = document.createElement('div');
    qtyValContainer.className = 'r-ingredient-meta';

    const qtySpan = document.createElement('div');
    qtySpan.className = 'r-ingredient-qty';
    qtySpan.textContent = '× ' + (ing.quantity * quantity);

    const valSpan = document.createElement('div');
    valSpan.className = 'r-ingredient-value';
    valSpan.textContent = recipesBerryFormat(itemData.value * ing.quantity * quantity);

    qtyValContainer.appendChild(qtySpan);
    qtyValContainer.appendChild(valSpan);

    row.appendChild(img);
    row.appendChild(name);
    row.appendChild(qtyValContainer);
    ingList.appendChild(row);
  });
}

function recipesHighlightSelected() {
  document.querySelectorAll('.r-recipe-item').forEach(function(el) {
    el.classList.remove('selected');
  });

  if (!recipesSelectedRecipe) return;

  const selectedName = tr(recipesSelectedRecipe.labelKey);
  document.querySelectorAll('.r-recipe-item').forEach(function(el) {
    if (el.querySelector('.r-recipe-name')?.textContent === selectedName) {
      el.classList.add('selected');
      const container = document.getElementById('r-recipe-list-container');
      if (container) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        const cTop = container.scrollTop;
        const cBottom = cTop + container.offsetHeight;
        if (top < cTop || bottom > cBottom) {
          container.scrollTo({ top: top - 10, behavior: 'smooth' });
        }
      }
    }
  });
}

function recipesUpdatePanel() {
  const qtyEl = document.getElementById('r-qty');
  let qty = parseInt(qtyEl?.value, 10);
  if (isNaN(qty) || qty < 1) qty = 1;
  else if (qty > 100) qty = 100;

  const sellPriceEl = document.getElementById('r-sell-price');
  let sellPrice = parseInt(sellPriceEl?.value || '0', 10);
  if (isNaN(sellPrice) || sellPrice < 0) sellPrice = 0;

  recipesUpdateIngredients(qty);

  if (!recipesSelectedRecipe) return;

  const result = recipesCalcProduction(recipesSelectedRecipe, qty, sellPrice);
  if (!result) return;

  const set = function(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('r-unit-cost', result.unitCost);
  set('r-total-cost', result.totalCost);
  set('r-fee', result.fee);
  set('r-prod-time', result.productionTime);
  set('r-bag-slots', result.bagSlots);

  const profitEl = document.getElementById('r-profit');
  if (profitEl) {
    profitEl.textContent = result.profit;
    profitEl.className = result.profitValue >= 0 ? 'r-profit' : 'r-loss';
  }
}

// ---- i18n for recipes tab elements ----

function recipesApplyTranslations() {
  // Update data-lang-recipes elements
  document.querySelectorAll('[data-lang-recipes]').forEach(function(el) {
    const key = el.getAttribute('data-lang-recipes');
    el.textContent = tr(key);
  });

  // Rebuild the recipe list with updated language
  recipesBuildList();
  if (recipesSelectedRecipe) {
    recipesUpdateDetails();
    const qtyEl = document.getElementById('r-qty');
    const qty = parseInt(qtyEl?.value || '1', 10);
    recipesUpdateIngredients(isNaN(qty) || qty < 1 ? 1 : qty);
  }
}

// ---- Event listeners ----

function recipesDebounce(fn, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay || 300);
  };
}

function recipesSetupListeners() {
  const debouncedUpdate = recipesDebounce(recipesUpdatePanel, 300);

  const qtyEl = document.getElementById('r-qty');
  if (qtyEl) {
    qtyEl.addEventListener('input', function(e) {
      const value = e.target.value;
      if (value === '') {
        e.target.classList.remove('r-invalid');
        debouncedUpdate();
        return;
      }
      const qty = parseInt(value, 10);
      if (!recipesValidateQty(qty)) {
        e.target.classList.add('r-invalid');
      } else {
        e.target.classList.remove('r-invalid');
        debouncedUpdate();
      }
    });
  }

  const sellPriceEl = document.getElementById('r-sell-price');
  if (sellPriceEl) {
    sellPriceEl.addEventListener('input', function(e) {
      const val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 0) {
        e.target.classList.add('r-invalid');
      } else {
        e.target.classList.remove('r-invalid');
        debouncedUpdate();
      }
    });
  }
}

// ---- Init ----

function recipesInit() {
  recipesBuildList();
  recipesSetupListeners();
  recipesApplyTranslations();
}
