// ============================================================
// DnD — drag-and-drop infrastructure for cards and groups
// ============================================================

let draggedCard = null;
let dragPlaceholder = null;
let draggedGroup = null;
let groupPlaceholder = null;

// Initialize DOM references (scripts loaded at end of body, so DOM is ready)
const itemsArea = document.getElementById('itemsArea');
const tablesArea = document.getElementById('tablesArea');

function ensureDragPlaceholder() {
  if (dragPlaceholder) return;
  dragPlaceholder = document.createElement("div");
  dragPlaceholder.className = "cardPlaceholder";
}

function ensureGroupPlaceholder() {
  if (groupPlaceholder) return;
  groupPlaceholder = document.createElement("div");
  groupPlaceholder.className = "groupPlaceholder";
}

function getUngroupedItemsContainer() {
  return document.getElementById("ungroupedItems");
}

function getGroupsArea() {
  return document.getElementById("groupsArea");
}

function ensureItemsLayout(reset = false) {
  if (!itemsArea) return;

  if (!reset && getUngroupedItemsContainer() && getGroupsArea()) {
    return;
  }

  const previousCards = reset
    ? []
    : Array.from(itemsArea.querySelectorAll(":scope > .card"));

  itemsArea.innerHTML = `
<div id="ungroupedItems" class="itemsUngrouped dndContainer"></div>
<div id="groupsArea" class="groupsArea"></div>
`;

  const ungrouped = getUngroupedItemsContainer();
  const groupsArea = getGroupsArea();
  if (ungrouped) {
    bindDropContainer(ungrouped);
    previousCards.forEach((card) => {
      ungrouped.appendChild(card);
      initializeCardElement(card);
    });
  }

  if (groupsArea) bindGroupsAreaDnd(groupsArea);
}

function getGroupDropTargetAfter(groupsArea, clientY) {
  const groups = [...groupsArea.querySelectorAll(":scope > .itemGroup:not(.draggingGroup)")];
  let closest = { offset: Number.NEGATIVE_INFINITY, el: null };

  groups.forEach((group) => {
    const box = group.getBoundingClientRect();
    const offset = clientY - (box.top + box.height / 2);
    if (offset < 0 && offset > closest.offset) {
      closest = { offset, el: group };
    }
  });

  return closest.el;
}

function getDropTargetAfter(container, clientX, clientY) {
  // Grid-aware 2D drop target detection.
  // Returns the card to insert BEFORE, or null to append at end.
  const cards = [...container.querySelectorAll(".card:not(.dragging)")];
  if (!cards.length) return null;

  const ROW_TOLERANCE = 12; // px slop to treat cards as "same row"
  const sameRow = [];
  const below = [];

  for (const card of cards) {
    const box = card.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const rowDiff = cy - clientY;

    if (Math.abs(rowDiff) <= box.height / 2 + ROW_TOLERANCE) {
      // Same row – only cards to the right of cursor
      if (cx > clientX) sameRow.push({ card, cx, rowDiff: Math.abs(rowDiff) });
    } else if (rowDiff > 0) {
      // Rows below cursor
      below.push({ card, cx, cy, rowDiff });
    }
  }

  if (sameRow.length) {
    // Leftmost card to the right in the same row
    sameRow.sort((a, b) => a.cx - b.cx);
    return sameRow[0].card;
  }

  if (below.length) {
    // First card of the topmost row below, left-to-right
    below.sort((a, b) => a.rowDiff - b.rowDiff || a.cx - b.cx);
    return below[0].card;
  }

  return null; // append at end
}

function animateCardsFlip(container, snapshot) {
  // FLIP animation: cards smoothly slide to their new grid positions
  container.querySelectorAll(".card:not(.dragging)").forEach((card) => {
    const old = snapshot.get(card);
    if (!old) return;
    const now = card.getBoundingClientRect();
    const dx = old.left - now.left;
    const dy = old.top - now.top;
    if (dx === 0 && dy === 0) return;

    card.style.transition = "none";
    card.style.transform = `translate(${dx}px, ${dy}px)`;
    // Force reflow so the browser sees the start state
    card.getBoundingClientRect(); // eslint-disable-line no-unused-expressions
    card.style.transition = "transform 0.18s ease";
    card.style.transform = "";
  });
}

function animateGroupsFlip(groupsArea, snapshot) {
  // FLIP animation for group blocks while reordering
  groupsArea.querySelectorAll(":scope > .itemGroup:not(.draggingGroup)").forEach((group) => {
    const old = snapshot.get(group);
    if (!old) return;
    const now = group.getBoundingClientRect();
    const dx = old.left - now.left;
    const dy = old.top - now.top;
    if (dx === 0 && dy === 0) return;

    group.style.transition = "none";
    group.style.transform = `translate(${dx}px, ${dy}px)`;
    group.getBoundingClientRect(); // force reflow
    group.style.transition = "transform 0.18s ease";
    group.style.transform = "";
  });
}

function clearDragHighlights() {
  document
    .querySelectorAll(".dndContainer.dragOver")
    .forEach((el) => el.classList.remove("dragOver"));

  document
    .querySelectorAll(".groupsArea.groupDragOver")
    .forEach((el) => el.classList.remove("groupDragOver"));
}

function onCardDragStart(e) {
  draggedCard = e.currentTarget;
  if (!draggedCard) return;

  ensureDragPlaceholder();

  draggedCard.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", draggedCard.id);
}

function onCardDragEnd() {
  if (draggedCard) draggedCard.classList.remove("dragging");
  if (dragPlaceholder?.parentNode) dragPlaceholder.parentNode.removeChild(dragPlaceholder);

  clearDragHighlights();

  // Clean up any FLIP animation styles left on cards
  document.querySelectorAll(".card").forEach((c) => {
    c.style.transition = "";
    c.style.transform = "";
  });

  updateGroupCrystalCounts();
  draggedCard = null;
  autoSaveBuild();
}

function onGroupDragStart(e) {
  const handle = e.currentTarget;
  const group = handle.closest(".itemGroup");
  if (!group) return;

  draggedGroup = group;
  ensureGroupPlaceholder();

  draggedGroup.classList.add("draggingGroup");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", draggedGroup.dataset.groupId || "group");
}

function onGroupDragEnd() {
  if (draggedGroup) draggedGroup.classList.remove("draggingGroup");
  if (groupPlaceholder?.parentNode) groupPlaceholder.parentNode.removeChild(groupPlaceholder);

  clearDragHighlights();

  document.querySelectorAll(".itemGroup").forEach((group) => {
    group.style.transition = "";
    group.style.transform = "";
  });

  draggedGroup = null;
  autoSaveBuild();
}

function onGroupsAreaDragOver(e) {
  if (!draggedGroup) return;

  e.preventDefault();
  const groupsArea = e.currentTarget;
  groupsArea.classList.add("groupDragOver");

  const after = getGroupDropTargetAfter(groupsArea, e.clientY);
  if (!groupPlaceholder) ensureGroupPlaceholder();

  const curNext = groupPlaceholder.nextSibling;
  const willChange =
    groupPlaceholder.parentNode !== groupsArea ||
    (after ? curNext !== after : curNext !== null);

  if (willChange) {
    const snapshot = new Map();
    groupsArea.querySelectorAll(":scope > .itemGroup:not(.draggingGroup)").forEach((group) => {
      snapshot.set(group, group.getBoundingClientRect());
    });

    if (!after) groupsArea.appendChild(groupPlaceholder);
    else groupsArea.insertBefore(groupPlaceholder, after);

    animateGroupsFlip(groupsArea, snapshot);
  }
}

function onGroupsAreaDrop(e) {
  if (!draggedGroup) return;

  e.preventDefault();
  const groupsArea = e.currentTarget;

  if (groupPlaceholder?.parentNode === groupsArea) {
    groupsArea.insertBefore(draggedGroup, groupPlaceholder);
  } else {
    groupsArea.appendChild(draggedGroup);
  }

  groupsArea.classList.remove("groupDragOver");
}

function onGroupsAreaDragLeave(e) {
  const groupsArea = e.currentTarget;
  const next = e.relatedTarget;
  if (next && groupsArea.contains(next)) return;
  groupsArea.classList.remove("groupDragOver");
}

function bindGroupsAreaDnd(groupsArea) {
  if (!groupsArea || groupsArea.dataset.groupDndBound === "1") return;

  groupsArea.dataset.groupDndBound = "1";
  groupsArea.addEventListener("dragover", onGroupsAreaDragOver);
  groupsArea.addEventListener("drop", onGroupsAreaDrop);
  groupsArea.addEventListener("dragleave", onGroupsAreaDragLeave);
}

function onDropContainerDragOver(e) {
  if (!draggedCard) return;

  e.preventDefault();
  const container = e.currentTarget;
  container.classList.add("dragOver");

  const after = getDropTargetAfter(container, e.clientX, e.clientY);
  if (!dragPlaceholder) ensureDragPlaceholder();

  // Only move placeholder (and run FLIP) when position actually changes
  const curNext = dragPlaceholder.nextSibling;
  const willChange =
    dragPlaceholder.parentNode !== container ||
    (after ? curNext !== after : curNext !== null);

  if (willChange) {
    // Snapshot positions before DOM mutation for FLIP animation
    const snapshot = new Map();
    container.querySelectorAll(".card:not(.dragging)").forEach((c) => {
      snapshot.set(c, c.getBoundingClientRect());
    });

    if (!after) container.appendChild(dragPlaceholder);
    else container.insertBefore(dragPlaceholder, after);

    animateCardsFlip(container, snapshot);
  }
}

function onDropContainerDrop(e) {
  if (!draggedCard) return;

  e.preventDefault();
  const container = e.currentTarget;

  if (dragPlaceholder?.parentNode === container) {
    container.insertBefore(draggedCard, dragPlaceholder);
  } else {
    container.appendChild(draggedCard);
  }

  container.classList.remove("dragOver");
  updateGroupCrystalCounts();
}

function onDropContainerDragLeave(e) {
  const container = e.currentTarget;
  const next = e.relatedTarget;
  if (next && container.contains(next)) return;
  container.classList.remove("dragOver");
}

function bindDropContainer(container) {
  if (!container || container.dataset.dndBound === "1") return;

  container.dataset.dndBound = "1";
  container.addEventListener("dragover", onDropContainerDragOver);
  container.addEventListener("drop", onDropContainerDrop);
  container.addEventListener("dragleave", onDropContainerDragLeave);
}

function initializeCardElement(card) {
  if (!card) return;

  card.setAttribute("draggable", "true");
  card.classList.add("draggableCard");

  if (card.dataset.dragBound === "1") return;
  card.dataset.dragBound = "1";

  card.addEventListener("dragstart", onCardDragStart);
  card.addEventListener("dragend", onCardDragEnd);
}
