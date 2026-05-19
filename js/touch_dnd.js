// ============================================================
// Touch-to-Drag shim
// Synthesises HTML5 DragEvents from touch input so the existing
// drag-and-drop handlers (dnd.js, groups.js, wanted.js, tierlist.js)
// work on phones and tablets.
//
// Activation model: long-press (~220ms) without moving — this keeps
// vertical scroll responsive when the user just wants to scroll past
// a draggable card.
// ============================================================

(function () {
  const HOLD_MS = 220;
  const HOLD_SLOP = 8;
  let state = null;

  function isTouchCapable() {
    return ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
  }
  if (!isTouchCapable()) return;

  function findDraggable(el) {
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.getAttribute && el.getAttribute("draggable") === "true") return el;
      el = el.parentNode;
    }
    return null;
  }

  function makeDataTransfer() {
    const store = new Map();
    return {
      effectAllowed: "move",
      dropEffect: "move",
      types: [],
      files: [],
      items: [],
      setData(type, val) {
        store.set(String(type), String(val));
        this.types = Array.from(store.keys());
      },
      getData(type) {
        return store.has(String(type)) ? store.get(String(type)) : "";
      },
      clearData(type) {
        if (type) store.delete(String(type));
        else store.clear();
        this.types = Array.from(store.keys());
      },
      setDragImage() {}
    };
  }

  function dispatch(target, type, x, y, related) {
    if (!target) return null;
    const ev = new Event(type, { bubbles: true, cancelable: true });
    try {
      Object.defineProperty(ev, "clientX",  { value: x, configurable: true });
      Object.defineProperty(ev, "clientY",  { value: y, configurable: true });
      Object.defineProperty(ev, "pageX",    { value: x + window.scrollX, configurable: true });
      Object.defineProperty(ev, "pageY",    { value: y + window.scrollY, configurable: true });
      Object.defineProperty(ev, "screenX",  { value: x, configurable: true });
      Object.defineProperty(ev, "screenY",  { value: y, configurable: true });
      Object.defineProperty(ev, "button",   { value: 0, configurable: true });
      Object.defineProperty(ev, "buttons",  { value: 1, configurable: true });
      Object.defineProperty(ev, "dataTransfer", { value: state ? state.dataTransfer : null, configurable: true });
      if (related) {
        Object.defineProperty(ev, "relatedTarget", { value: related, configurable: true });
      }
    } catch (_) {}
    target.dispatchEvent(ev);
    return ev;
  }

  function cleanupGhost() {
    if (state && state.ghost && state.ghost.parentNode) {
      state.ghost.parentNode.removeChild(state.ghost);
    }
    if (state) state.ghost = null;
  }

  function startDrag() {
    if (!state) return;
    const src = state.source;
    const rect = src.getBoundingClientRect();

    const ghost = src.cloneNode(true);
    ghost.style.position = "fixed";
    ghost.style.left = rect.left + "px";
    ghost.style.top  = rect.top  + "px";
    ghost.style.width  = rect.width  + "px";
    ghost.style.height = rect.height + "px";
    ghost.style.margin = "0";
    ghost.style.pointerEvents = "none";
    ghost.style.opacity = "0.88";
    ghost.style.zIndex = "9999";
    ghost.style.transform = "scale(1.04)";
    ghost.style.transition = "transform 0.1s ease";
    ghost.style.boxShadow = "0 12px 28px rgba(0,0,0,0.55)";
    ghost.classList.add("touch-drag-ghost");
    document.body.appendChild(ghost);
    state.ghost = ghost;
    state.ghostOffsetX = state.x - rect.left;
    state.ghostOffsetY = state.y - rect.top;

    state.dragging = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(15); } catch (_) {}
    }

    dispatch(src, "dragstart", state.x, state.y);
  }

  function moveGhost(x, y) {
    if (!state || !state.ghost) return;
    state.ghost.style.left = (x - state.ghostOffsetX) + "px";
    state.ghost.style.top  = (y - state.ghostOffsetY) + "px";
  }

  function elementAt(x, y) {
    if (!state) return null;
    const ghost = state.ghost;
    let prevDisplay = null;
    if (ghost) {
      prevDisplay = ghost.style.display;
      ghost.style.display = "none";
    }
    const el = document.elementFromPoint(x, y);
    if (ghost) ghost.style.display = prevDisplay || "";
    return el;
  }

  function onTouchStart(e) {
    if (state) return;
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];

    const source = findDraggable(e.target);
    if (!source) return;

    // Ignore touches that start on interactive controls inside the card —
    // those need to receive the tap without becoming a drag.
    // Exception: if the draggable element ITSELF is the interactive control
    // (e.g. .groupDragHandle is a <button draggable="true">), we still drag.
    const interactive = e.target.closest && e.target.closest("input, select, textarea, a, button, [role='button']");
    if (interactive && interactive !== source && source.contains(interactive)) {
      return;
    }

    state = {
      source,
      x: touch.clientX,
      y: touch.clientY,
      startX: touch.clientX,
      startY: touch.clientY,
      dragging: false,
      dataTransfer: makeDataTransfer(),
      lastOver: null,
      ghost: null,
      ghostOffsetX: 0,
      ghostOffsetY: 0,
      holdTimer: null
    };

    state.holdTimer = setTimeout(() => {
      if (!state || state.dragging) return;
      startDrag();
    }, HOLD_MS);
  }

  function onTouchMove(e) {
    if (!state) return;
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    state.x = t.clientX;
    state.y = t.clientY;

    if (!state.dragging) {
      const dx = state.x - state.startX;
      const dy = state.y - state.startY;
      if (Math.abs(dx) > HOLD_SLOP || Math.abs(dy) > HOLD_SLOP) {
        // User started scrolling before the long-press fired — abort drag
        clearTimeout(state.holdTimer);
        state = null;
      }
      return;
    }

    e.preventDefault();
    moveGhost(state.x, state.y);

    const under = elementAt(state.x, state.y);
    if (!under) return;

    if (state.lastOver && state.lastOver !== under) {
      dispatch(state.lastOver, "dragleave", state.x, state.y, under);
    }
    if (state.lastOver !== under) {
      dispatch(under, "dragenter", state.x, state.y, state.lastOver);
    }
    state.lastOver = under;
    dispatch(under, "dragover", state.x, state.y);
  }

  function onTouchEnd() {
    if (!state) return;
    clearTimeout(state.holdTimer);

    if (state.dragging) {
      const dropTarget = elementAt(state.x, state.y);
      cleanupGhost();
      if (dropTarget) {
        dispatch(dropTarget, "drop", state.x, state.y);
      }
      dispatch(state.source, "dragend", state.x, state.y);
    }
    state = null;
  }

  function onTouchCancel() {
    if (!state) return;
    clearTimeout(state.holdTimer);
    if (state.dragging) {
      cleanupGhost();
      dispatch(state.source, "dragend", state.x, state.y);
    }
    state = null;
  }

  document.addEventListener("touchstart",  onTouchStart,  { passive: true });
  document.addEventListener("touchmove",   onTouchMove,   { passive: false });
  document.addEventListener("touchend",    onTouchEnd);
  document.addEventListener("touchcancel", onTouchCancel);
})();
