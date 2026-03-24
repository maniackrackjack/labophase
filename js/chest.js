// ============================================================
// Chest puzzle tab — 8 torches helper integrated with app tabs
// ============================================================

const CHEST_N = 8;

const CHEST_SPRITE_MODE_STORAGE_KEY = "glac_chest_sprite_mode";
const CHEST_SPRITES = {
  drakantos: {
    torchOn: "sprites/chestpuzzle/tocha_acesa.png",
    torchOff: "sprites/chestpuzzle/tocha_apagada.png",
    chestClosed: "sprites/chestpuzzle/bau.png",
    chestOpen: "sprites/chestpuzzle/bauaberto.png",
  },
  gla: {
    torchOn: "sprites/chestpuzzle/torch_on.gif",
    torchOff: "sprites/chestpuzzle/torch_off.png",
    chestClosed: "sprites/chestpuzzle/closed_relic.png",
    chestOpen: "sprites/chestpuzzle/open_relic.png",
  },
};

const chestStorage =
  typeof window !== "undefined" && window.localStorage ? window.localStorage : null;

const chestState = {
  initialized: false,
  setMode: false,
  spriteMode: "gla",
  values: Array(CHEST_N).fill(0),
  torchEls: [],
};

function chestGetSprites() {
  return CHEST_SPRITES[chestState.spriteMode] || CHEST_SPRITES.gla;
}

function chestUpdateSpriteToggleUI() {
  const drakantosBtn = document.getElementById("ch-sprite-drakantos");
  const glaBtn = document.getElementById("ch-sprite-gla");
  const isGla = chestState.spriteMode === "gla";

  if (drakantosBtn) {
    drakantosBtn.classList.toggle("is-active", !isGla);
    drakantosBtn.setAttribute("aria-pressed", String(!isGla));
  }
  if (glaBtn) {
    glaBtn.classList.toggle("is-active", isGla);
    glaBtn.setAttribute("aria-pressed", String(isGla));
  }
}

function chestApplySpriteMode(mode) {
  chestState.spriteMode = mode === "drakantos" ? "drakantos" : "gla";
  if (chestStorage) {
    chestStorage.setItem(CHEST_SPRITE_MODE_STORAGE_KEY, chestState.spriteMode);
  }

  chestUpdateSpriteToggleUI();

  for (let i = 0; i < CHEST_N; i++) {
    chestUpdateTorch(i);
  }
  chestCheckChest();

  const tabIcon = document.getElementById("ch-tab-icon");
  if (tabIcon) tabIcon.src = chestGetSprites().chestClosed;
}

function chestCreateTorches() {
  const area = document.getElementById("ch-area");
  if (!area || chestState.torchEls.length > 0) return;

  for (let i = 0; i < CHEST_N; i++) {

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ch-torch-btn";
    btn.setAttribute("aria-label", t("chestTorchLabel") + " " + (i + 1));
    btn.onclick = function () { chestHandleTorchClick(i); };

    const img = document.createElement("img");
    img.src = chestGetSprites().torchOff;
    img.className = "ch-tocha";
    img.alt = "";

    const num = document.createElement("span");
    num.className = "ch-numero";
    num.textContent = String(i + 1);

    btn.appendChild(img);
    btn.appendChild(num);
    chestState.torchEls.push(btn);
    area.appendChild(btn);
  }

  chestLayoutTorches();
}

function chestLayoutTorches() {
  const area = document.getElementById("ch-area");
  if (!area) return;

  const size = Math.min(area.clientWidth, area.clientHeight);
  if (size === 0) return; // tab is hidden — skip, will be called again when tab opens
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = Math.max(96, size * 0.38);

  chestState.torchEls.forEach(function (btn, i) {
    const angle = (2 * Math.PI * i) / CHEST_N - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
  });
}

function chestHandleTorchClick(index) {
  if (chestState.setMode) {
    chestState.values[index] ^= 1;
    chestUpdateTorch(index);
    chestCheckChest();
    return;
  }
  chestToggleByPuzzleRule(index);
}

function chestToggleByPuzzleRule(index) {
  const offsets = [-1, 0, 1];
  for (let k = 0; k < offsets.length; k++) {
    const idx = (index + offsets[k] + CHEST_N) % CHEST_N;
    chestState.values[idx] ^= 1;
    chestUpdateTorch(idx);
  }
  chestCheckChest();
}

function chestUpdateTorch(index) {
  const btn = chestState.torchEls[index];
  if (!btn) return;
  const img = btn.querySelector("img");
  if (!img) return;
  const sprites = chestGetSprites();
  img.src = chestState.values[index] ? sprites.torchOn : sprites.torchOff;
}

function chestAllOff(state) {
  return state.every(function (v) { return v === 0; });
}

function chestApplySequence(state, seq) {
  const next = state.slice();
  for (let i = 0; i < CHEST_N; i++) {
    if (!seq[i]) continue;
    const offsets = [-1, 0, 1];
    for (let k = 0; k < offsets.length; k++) {
      const idx = (i + offsets[k] + CHEST_N) % CHEST_N;
      next[idx] ^= 1;
    }
  }
  return next;
}

function chestFindSequence(state) {
  for (let bits = 0; bits < 1 << CHEST_N; bits++) {
    const seq = Array.from({ length: CHEST_N }, function (_, i) {
      return (bits >> i) & 1;
    });
    const next = chestApplySequence(state, seq);
    if (chestAllOff(next)) return seq;
  }
  return null;
}

function chestHighlight(indices) {
  chestState.torchEls.forEach(function (btn, i) {
    btn.classList.toggle("ch-destacada", indices.indexOf(i) !== -1);
  });
}

function chestToggleMode() {
  chestState.setMode = !chestState.setMode;
  const modeLabel = document.getElementById("ch-mode-label");
  if (modeLabel) {
    modeLabel.textContent = chestState.setMode ? t("chestModeSet") : t("chestModeSolve");
  }
}

function chestSolve() {
  const seq = chestFindSequence(chestState.values.slice());
  const result = document.getElementById("ch-result");
  const steps = document.getElementById("ch-steps");
  if (!result || !steps) return;

  steps.innerHTML = "";
  if (!seq) {
    result.textContent = t("chestNoSolution");
    chestHighlight([]);
    return;
  }

  const indices = seq
    .map(function (value, i) { return value ? i : -1; })
    .filter(function (i) { return i !== -1; });

  chestHighlight(indices);

  if (indices.length === 0) {
    result.textContent = t("chestAlreadySolved");
    return;
  }

  result.textContent = t("chestStepsTitle");
  indices.forEach(function (index, step) {
    const li = document.createElement("li");
    li.textContent =
      t("chestStep") + " " +
      (step + 1) + ": " +
      t("chestClickTorch") + " " +
      (index + 1);
    steps.appendChild(li);
  });
}

function chestReset() {
  for (let i = 0; i < CHEST_N; i++) {
    chestState.values[i] = 0;
    chestUpdateTorch(i);
  }
  chestHighlight([]);

  const result = document.getElementById("ch-result");
  const steps = document.getElementById("ch-steps");
  if (result) result.textContent = "";
  if (steps) steps.innerHTML = "";

  chestCheckChest();
}

function chestRandom() {
  chestReset();
  for (let i = 0; i < CHEST_N; i++) {
    if (Math.random() < 0.5) {
      chestToggleByPuzzleRule(i);
    }
  }
}

function chestCheckChest() {
  const chest = document.getElementById("ch-bau");
  if (!chest) return;
  const sprites = chestGetSprites();
  chest.style.backgroundImage = chestAllOff(chestState.values) ?
    "url('" + sprites.chestOpen + "')" :
    "url('" + sprites.chestClosed + "')";
}

function chestApplyTranslations() {
  const modeLabel = document.getElementById("ch-mode-label");
  if (modeLabel) {
    modeLabel.textContent = chestState.setMode ? t("chestModeSet") : t("chestModeSolve");
  }
  chestState.torchEls.forEach(function (btn, i) {
    btn.setAttribute("aria-label", t("chestTorchLabel") + " " + (i + 1));
  });
}

function chestInit() {
  if (chestState.initialized) {
    chestApplyTranslations();
    chestUpdateSpriteToggleUI();
    return;
  }

  if (chestStorage) {
    const savedMode = chestStorage.getItem(CHEST_SPRITE_MODE_STORAGE_KEY);
    if (savedMode && CHEST_SPRITES[savedMode]) {
      chestState.spriteMode = savedMode;
    }
  }

  chestCreateTorches();

  const modeBtn = document.getElementById("ch-mode-btn");
  const solveBtn = document.getElementById("ch-solve-btn");
  const resetBtn = document.getElementById("ch-reset-btn");
  const randomBtn = document.getElementById("ch-random-btn");
  const drakantosBtn = document.getElementById("ch-sprite-drakantos");
  const glaBtn = document.getElementById("ch-sprite-gla");

  if (modeBtn) modeBtn.onclick = chestToggleMode;
  if (solveBtn) solveBtn.onclick = chestSolve;
  if (resetBtn) resetBtn.onclick = chestReset;
  if (randomBtn) randomBtn.onclick = chestRandom;
  if (drakantosBtn) drakantosBtn.onclick = function () { chestApplySpriteMode("drakantos"); };
  if (glaBtn) glaBtn.onclick = function () { chestApplySpriteMode("gla"); };

  chestState.initialized = true;
  chestApplyTranslations();
  chestUpdateSpriteToggleUI();
  chestCheckChest();
  chestLayoutTorches();

  const tabIcon = document.getElementById("ch-tab-icon");
  if (tabIcon) tabIcon.src = chestGetSprites().chestClosed;

  window.addEventListener("resize", chestLayoutTorches);
}
