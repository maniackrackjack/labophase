// ============================================================
// Groups — group management, serialization, build state
// ============================================================

let groupCounter = 0;
const _groupColorFactory = window.ColorPickerFactory;

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

function groupsDestroyColorPickers(group) {
  if (!group || !Array.isArray(group._groupPickrs)) return;
  group._groupPickrs.forEach((pickr) => {
    _groupColorFactory.destroy(pickr);
  });
  group._groupPickrs = [];
}

function groupsInitColorPickers(group) {
  if (!group) return;
  groupsDestroyColorPickers(group);

  const controls = [
    { input: ".groupColorBorder", mount: ".groupColorBorderPickr", cssVar: "--group-color", fallback: "#6a4a20" },
    { input: ".groupColorBg", mount: ".groupColorBgPickr", cssVar: "--group-bg-color", fallback: "#2a1a0e" },
    { input: ".groupColorTitle", mount: ".groupColorTitlePickr", cssVar: "--group-title-color", fallback: "#f0e0b0" },
    { input: ".groupColorHeader", mount: ".groupColorHeaderPickr", cssVar: "--group-header-color", fallback: "#1a1008" },
  ];

  controls.forEach((control) => {
    const input = group.querySelector(control.input);
    const mount = group.querySelector(control.mount);
    if (!input || !mount) return;

    const applyColor = (rawColor, shouldSave = true) => {
      const color = _groupColorFactory.normalizeHexColor(rawColor, control.fallback);
      input.value = color;
      mount.style.background = color;
      group.style.setProperty(control.cssVar, color);
      if (shouldSave) autoSaveBuild();
    };

    applyColor(input.value, false);

    const pickr = _groupColorFactory.create({
      el: mount,
      theme: "nano",
      defaultColor: input.value,
      inline: false,
      showAlways: false,
      swatches: ["#6a4a20", "#2a1a0e", "#f0e0b0", "#1a1008", "#c97a27", "#bf3b2b", "#2f5fb8", "#1f8a70"],
      onChange: (color) => applyColor(color, true),
    });

    if (!pickr) return;

    group._groupPickrs = group._groupPickrs || [];
    group._groupPickrs.push(pickr);
  });
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
  const title = (options.title || t("groupDefaultName")).trim() || t("groupDefaultName");
  const color = options.color || defaults.color;
  const bgColor = options.bgColor || defaults.bgColor;
  const titleColor = options.titleColor || defaults.titleColor;
  const headerColor = options.headerColor || defaults.headerColor;
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
  <span class="groupTitle" contenteditable="true">${title}</span>
  <span class="groupCrystalCount">${t("groupCrystals").replace("{n}", 0)}</span>
  <div class="groupColorPickers">
    <div class="groupColorControl" title="${t("groupColorBorder")}">
      <button class="groupColorPickr groupColorBorderPickr" type="button" aria-label="${t("groupColorBorder")}"></button>
      <input class="groupColor groupColorBorder" type="text" value="${color}">
    </div>
    <div class="groupColorControl" title="${t("groupColorBg")}">
      <button class="groupColorPickr groupColorBgPickr" type="button" aria-label="${t("groupColorBg")}"></button>
      <input class="groupColor groupColorBg" type="text" value="${bgColor}">
    </div>
    <div class="groupColorControl" title="${t("groupColorTitle")}">
      <button class="groupColorPickr groupColorTitlePickr" type="button" aria-label="${t("groupColorTitle")}"></button>
      <input class="groupColor groupColorTitle" type="text" value="${titleColor}">
    </div>
    <div class="groupColorControl" title="${t("groupColorHeader")}">
      <button class="groupColorPickr groupColorHeaderPickr" type="button" aria-label="${t("groupColorHeader")}"></button>
      <input class="groupColor groupColorHeader" type="text" value="${headerColor}">
    </div>
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
    const txt = titleEl.textContent.trim();
    titleEl.textContent = txt || t("groupDefaultName");
    autoSaveBuild();
  });

  groupsInitColorPickers(group);

  const minimizeBtn = group.querySelector(".minimizeBtn");
  minimizeBtn.addEventListener("click", () => {
    const isCollapsed = group.classList.toggle("collapsed");
    minimizeBtn.innerHTML = isCollapsed ? "&#9654;" : "&#9660;";
    autoSaveBuild();
  });

  const deleteBtn = group.querySelector(".groupDelete");
  deleteBtn.addEventListener("click", () => {
    groupsDestroyColorPickers(group);
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
