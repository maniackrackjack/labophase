// ============================================================
// Groups — group management, serialization, build state
// ============================================================

let groupCounter = 0;

function groupsEscapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function groupsNormalizeHexColor(value, fallback) {
  const raw = String(value || "").trim();
  if (!raw) return fallback;

  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`.toLowerCase();
  }

  return fallback;
}

function groupsSanitizeTitle(value) {
  const txt = String(value || "").replace(/[\r\n\t]/g, " ").trim();
  return txt.slice(0, 80);
}

function groupsResolveThemeColor(variableName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  if (!value) return fallback;

  if (value.startsWith("#")) {
    if (value.length === 4) {
      const r = value[1];
      const g = value[2];
      const b = value[3];
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return value.slice(0, 7);
  }

  const match = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!match) return fallback;

  const toHex = (channel) => Number(channel).toString(16).padStart(2, "0");
  return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
}

function getDefaultGroupThemeColors() {
  return {
    color: groupsResolveThemeColor("--border-accent", "#6a4a20"),
    bgColor: groupsResolveThemeColor("--bg-panel", "#2a1a0e"),
    titleColor: groupsResolveThemeColor("--text-panel", "#f0e0b0"),
    headerColor: groupsResolveThemeColor("--bg-surface-1", "#1a1008")
  };
}

function updateGroupCrystalCounts() {
  const groupsArea = getGroupsArea();
  if (!groupsArea) return;

  groupsArea.querySelectorAll(":scope > .itemGroup").forEach((group) => {
    const sum = Array.from(group.querySelectorAll(":scope .groupItems > .card")).reduce((acc, card) => {
      const val = parseInt(card.dataset.crystalsNeeded || "0", 10);
      return acc + (Number.isNaN(val) ? 0 : val);
    }, 0);

    const countEl = group.querySelector(".groupCrystalCount");
    if (countEl) countEl.textContent = t("groupCrystals").replace("{n}", sum);
  });
}

function createGroup(options = {}) {
  ensureItemsLayout();

  const groupsArea = getGroupsArea();
  const ungrouped = getUngroupedItemsContainer();
  if (!groupsArea || !ungrouped) return null;

  const defaults = getDefaultGroupThemeColors();
  const id = options.id || `group_${Date.now()}_${groupCounter++}`;
  const title = groupsSanitizeTitle(options.title || t("groupDefaultName")) || t("groupDefaultName");
  const color = groupsNormalizeHexColor(options.color, defaults.color);
  const bgColor = groupsNormalizeHexColor(options.bgColor, defaults.bgColor);
  const titleColor = groupsNormalizeHexColor(options.titleColor, defaults.titleColor);
  const headerColor = groupsNormalizeHexColor(options.headerColor, defaults.headerColor);
  const collapsed = options.collapsed || false;

  const group = document.createElement("section");
  group.className = "itemGroup" + (collapsed ? " collapsed" : "");
  group.dataset.groupId = id;
  group.style.setProperty("--group-color", color);
  group.style.setProperty("--group-bg-color", bgColor);
  group.style.setProperty("--group-title-color", titleColor);
  group.style.setProperty("--group-header-color", headerColor);

  group.innerHTML = `
<div class="groupHeader">
  <button class="groupDragHandle" type="button" draggable="true" title="${t("dragGroup")}">&#x2630;</button>
  <button class="minimizeBtn" type="button" title="${t("minimizeGroup")}">${collapsed ? "&#9654;" : "&#9660;"}</button>
  <span class="groupTitle" contenteditable="true">${groupsEscapeHtml(title)}</span>
  <span class="groupCrystalCount">${t("groupCrystals").replace("{n}", 0)}</span>
  <div class="groupColorPickers">
    <input class="groupColor groupColorBorder" type="color" value="${color}" title="${t("groupColorBorder")}">
    <input class="groupColor groupColorBg" type="color" value="${bgColor}" title="${t("groupColorBg")}">
    <input class="groupColor groupColorTitle" type="color" value="${titleColor}" title="${t("groupColorTitle")}">
    <input class="groupColor groupColorHeader" type="color" value="${headerColor}" title="${t("groupColorHeader")}">
  </div>
  <button class="groupDelete" type="button" title="${t("deleteGroup")}">X</button>
</div>
<div class="groupItems dndContainer"></div>
`;

  bindGroupsAreaDnd(groupsArea);

  const itemsContainer = group.querySelector(".groupItems");
  bindDropContainer(itemsContainer);

  const dragHandle = group.querySelector(".groupDragHandle");
  dragHandle.addEventListener("dragstart", onGroupDragStart);
  dragHandle.addEventListener("dragend", onGroupDragEnd);

  const titleEl = group.querySelector(".groupTitle");
  titleEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleEl.blur();
    }
  });
  titleEl.addEventListener("blur", () => {
    const txt = groupsSanitizeTitle(titleEl.textContent);
    titleEl.textContent = txt || t("groupDefaultName");
    autoSaveBuild();
  });

  const borderColorInput = group.querySelector(".groupColorBorder");
  borderColorInput.addEventListener("input", () => {
    group.style.setProperty("--group-color", borderColorInput.value);
    autoSaveBuild();
  });

  const bgColorInput = group.querySelector(".groupColorBg");
  bgColorInput.addEventListener("input", () => {
    group.style.setProperty("--group-bg-color", bgColorInput.value);
    autoSaveBuild();
  });

  const titleColorInput = group.querySelector(".groupColorTitle");
  titleColorInput.addEventListener("input", () => {
    group.style.setProperty("--group-title-color", titleColorInput.value);
    autoSaveBuild();
  });

  const headerColorInput = group.querySelector(".groupColorHeader");
  headerColorInput.addEventListener("input", () => {
    group.style.setProperty("--group-header-color", headerColorInput.value);
    autoSaveBuild();
  });

  const minimizeBtn = group.querySelector(".minimizeBtn");
  minimizeBtn.addEventListener("click", () => {
    const isCollapsed = group.classList.toggle("collapsed");
    minimizeBtn.innerHTML = isCollapsed ? "&#9654;" : "&#9660;";
    autoSaveBuild();
  });

  const deleteBtn = group.querySelector(".groupDelete");
  deleteBtn.addEventListener("click", () => {
    itemsContainer.querySelectorAll(":scope > .card").forEach((card) => {
      ungrouped.appendChild(card);
    });
    group.remove();
    autoSaveBuild();
    recalc();
  });

  groupsArea.appendChild(group);

  if (Array.isArray(options.items)) {
    options.items.forEach((itemState) => addItemFromState(itemState, itemsContainer, true));
  }

  updateGroupCrystalCounts();
  autoSaveBuild();
  return group;
}

function createGroupFromUI() {
  createGroup();
}

function serializeCard(card) {
  const tipo = card.getAttribute("data") || card.dataset.item;
  if (!tipo || !itens[tipo]) return null;

  const item = itens[tipo];
  const stats = {};

  Object.keys(item.max).forEach((stat) => {
    const input = card.querySelector(`input[data-stat="${stat}"]`);
    if (!input) return;
    const raw = parseInt(input.value, 10);
    stats[stat] = Number.isNaN(raw) ? item.min[stat] : raw;
  });

  return {
    tipo,
    variantCategory: card.getAttribute("data-variant-category"),
    variantId: card.getAttribute("data-variant-id"),
    stats,
  };
}

function addItemFromState(itemState, targetContainer, skipRecalc = true) {
  const cardId = addItem(itemState.tipo, targetContainer, true);
  if (!cardId) return;

  if (itemState.variantCategory && itemState.variantId) {
    selectVariant(cardId, itemState.variantCategory, itemState.variantId);
  }

  const card = document.getElementById(cardId);
  if (!card) return;

  if (itemState.stats) {
    Object.entries(itemState.stats).forEach(([stat, val]) => {
      const input = card.querySelector(`input[data-stat="${stat}"]`);
      if (input) input.value = val;
    });
  }

  if (!skipRecalc) recalc();
}

function getBuildState() {
  ensureItemsLayout();

  const ungrouped = getUngroupedItemsContainer();
  const groupsArea = getGroupsArea();

  const ungroupedItems = ungrouped
    ? Array.from(ungrouped.querySelectorAll(":scope > .card"))
        .map(serializeCard)
        .filter(Boolean)
    : [];

  const groups = groupsArea
    ? Array.from(groupsArea.querySelectorAll(":scope > .itemGroup")).map((group) => {
        const titleEl = group.querySelector(".groupTitle");
        const borderColorInput = group.querySelector(".groupColorBorder");
        const bgColorInput = group.querySelector(".groupColorBg");
        const titleColorInput = group.querySelector(".groupColorTitle");
        const headerColorInput = group.querySelector(".groupColorHeader");
        const groupItems = Array.from(group.querySelectorAll(":scope .groupItems > .card"))
          .map(serializeCard)
          .filter(Boolean);

        return {
          id: group.dataset.groupId,
          title: titleEl ? titleEl.textContent.trim() : t("groupDefaultName"),
          color: borderColorInput ? borderColorInput.value : "#6a4a20",
          bgColor: bgColorInput ? bgColorInput.value : "#2a1a0e",
          titleColor: titleColorInput ? titleColorInput.value : "#f0e0b0",
          headerColor: headerColorInput ? headerColorInput.value : "#1a1008",
          collapsed: group.classList.contains("collapsed"),
          items: groupItems,
        };
      })
    : [];

  return {
    version: 2,
    ungrouped: ungroupedItems,
    groups,
  };
}

function applyBuildState(state) {
  const prevSuppress = suppressAutoSave;
  suppressAutoSave = true;

  try {
    clearBuild();

    ensureItemsLayout();
    const ungrouped = getUngroupedItemsContainer();

    // Backward compatibility: old builds were plain arrays of cards.
    if (Array.isArray(state)) {
      state.forEach((itemState) => addItemFromState(itemState, ungrouped, true));
    } else if (state && typeof state === "object") {
      const ungroupedItems = Array.isArray(state.ungrouped) ? state.ungrouped : [];
      const groups = Array.isArray(state.groups) ? state.groups : [];

      groups.forEach((groupState) => {
        createGroup({
          id: groupState.id,
          title: groupState.title,
          color: groupState.color,
          bgColor: groupState.bgColor,
          titleColor: groupState.titleColor,
          headerColor: groupState.headerColor,
          collapsed: groupState.collapsed,
          items: Array.isArray(groupState.items) ? groupState.items : [],
        });
      });

      ungroupedItems.forEach((itemState) => addItemFromState(itemState, ungrouped, true));
    }
  } finally {
    suppressAutoSave = prevSuppress;
  }

  recalc();
}
