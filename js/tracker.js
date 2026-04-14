// ============================================================
// Tracker tab - Boss Rush, Marineford, Foxy events, One Man Army
// ============================================================

const TRACKER_BOSS_RUSH_MODIFIERS = [
  { id: "boss_low_hp_buff", textKey: "trackerBrModifier1" },
  { id: "boss_critical_chance", textKey: "trackerBrModifier2" },
  { id: "players_attack_reduced", textKey: "trackerBrModifier3" },
  { id: "boss_extra_damage", textKey: "trackerBrModifier4" },
  { id: "boss_damage_reduction", textKey: "trackerBrModifier5" },
  { id: "players_less_max_hp", textKey: "trackerBrModifier6" },
  { id: "boss_more_max_hp", textKey: "trackerBrModifier7" },
  { id: "longer_cooldowns", textKey: "trackerBrModifier8" },
  { id: "boss_heal", textKey: "trackerBrModifier9" },
  { id: "boss_reflect", textKey: "trackerBrModifier10" },
  { id: "boss_speed_up", textKey: "trackerBrModifier11" },
  { id: "players_speed_down", textKey: "trackerBrModifier12" },
  { id: "players_no_armor", textKey: "trackerBrModifier13" },
  { id: "boss_unstoppable", textKey: "trackerBrModifier14" }
];

const TRACKER_BOSS_RUSH_MAINS = [
  { id: "capone", nameKey: "trackerEnemyCapone", icon: "sprites/characters/capone_bege.png" },
  { id: "drake", nameKey: "trackerEnemyDrake", icon: "sprites/characters/x_drake.png" },
  { id: "hawkins", nameKey: "trackerEnemyHawkins", icon: "sprites/characters/basil_hawkins.png" },
  { id: "kid", nameKey: "trackerEnemyKid", icon: "sprites/characters/eustass_kid.png" },
  { id: "killer", nameKey: "trackerEnemyKiller", icon: "sprites/characters/killer.png" },
  { id: "law", nameKey: "trackerEnemyLaw", icon: "sprites/characters/trafalgar_law.png" },
  { id: "urouge", nameKey: "trackerEnemyUrouge", icon: "sprites/characters/urouge.png" }
];

const TRACKER_BOSS_RUSH_SUPPORTS = [
  { id: "apoo", nameKey: "trackerEnemyApoo", icon: "sprites/characters/scratchmen_apoo.png" },
  { id: "bonney", nameKey: "trackerEnemyBonney", icon: "sprites/characters/jewelry_bonney.png" }
];

const TRACKER_MARINEFORD_CATEGORIES = [
  {
    id: "bosses",
    titleKey: "trackerMarinefordBosses",
    entries: [
      { id: "bastille", name: "Bastille", icon: "sprites/characters/bastille.png" },
      { id: "brannew", name: "Brannew", icon: "sprites/tracker/marineford/brannew_boss.png" },
      { id: "dalmatian", name: "Dalmatian", icon: "sprites/characters/dalmatian.png" },
      { id: "hina", name: "Hina", icon: "sprites/characters/hina.png" },
      { id: "jango", name: "Jango", icon: "sprites/characters/jango.png" },
      { id: "moria", name: "Moria", icon: "sprites/characters/gecko_moria.png" },
      { id: "smoker", name: "Smoker", icon: "sprites/characters/smoker.png" },
      { id: "tashigi", name: "Tashigi", icon: "sprites/characters/tashigi.png" }
    ]
  },
  {
    id: "superbosses",
    titleKey: "trackerMarinefordSuperbosses",
    entries: [
      { id: "aokiji", name: "Aokiji", icon: "sprites/characters/aokiji.png" },
      { id: "doflamingo", name: "Doflamingo", icon: "sprites/characters/doflamingo.png" },
      { id: "kizaru", name: "Kizaru", icon: "sprites/characters/borsalino_kizaru.png" },
      { id: "mihawk", name: "Mihawk", icon: "sprites/characters/dracule_mihawk.png" }
    ]
  },
  {
    id: "helpers",
    titleKey: "trackerMarinefordHelpers",
    entries: [
      { id: "buggy", name: "Buggy", icon: "sprites/characters/buggy.png" },
      { id: "crocodile", name: "Crocodile", icon: "sprites/characters/crocodile.png" },
      { id: "hancock", name: "Hancock", icon: "sprites/characters/boa_hancock.png" },
      { id: "ivankov", name: "Ivankov", icon: "sprites/characters/emporio_ivankov.png" },
      { id: "jinbe", name: "Jinbe", icon: "sprites/characters/jinbe.png" },
      { id: "marco", name: "Marco", icon: "sprites/characters/marco.png" }
    ]
  }
];

const TRACKER_MARINEFORD_WAVES_BY_CATEGORY = {
  bosses: [10, 16, 24, 34, 38, 43, 48, 53],
  superbosses: [30, 45],
  helpers: [8, 17, 27, 35, 42, 50, 59]
};

// Kills tracker: bosses + superbosses + Akainu (exclusive to this tracker), sorted alphabetically within groups
const TRACKER_MF_KILLS = [
  { id: "bastille", name: "Bastille", icon: "sprites/characters/bastille.png", group: "bosses" },
  { id: "brannew", name: "Brannew", icon: "sprites/tracker/marineford/brannew_boss.png", group: "bosses" },
  { id: "dalmatian", name: "Dalmatian", icon: "sprites/characters/dalmatian.png", group: "bosses" },
  { id: "hina", name: "Hina", icon: "sprites/characters/hina.png", group: "bosses" },
  { id: "jango", name: "Jango", icon: "sprites/characters/jango.png", group: "bosses" },
  { id: "moria", name: "Moria", icon: "sprites/characters/gecko_moria.png", group: "bosses" },
  { id: "smoker", name: "Smoker", icon: "sprites/characters/smoker.png", group: "bosses" },
  { id: "tashigi", name: "Tashigi", icon: "sprites/characters/tashigi.png", group: "bosses" },
  { id: "aokiji", name: "Aokiji", icon: "sprites/characters/aokiji.png", group: "superbosses" },
  { id: "doflamingo", name: "Doflamingo", icon: "sprites/characters/doflamingo.png", group: "superbosses" },
  { id: "kizaru", name: "Kizaru", icon: "sprites/characters/borsalino_kizaru.png", group: "superbosses" },
  { id: "mihawk", name: "Mihawk", icon: "sprites/characters/dracule_mihawk.png", group: "superbosses" },
  { id: "akainu", name: "Akainu", icon: "sprites/characters/akainu.png", group: "akainu" }
];

const TRACKER_FOXY_EVENTS = [
  { id: "foxyQuiz", nameKey: "trackerFoxyQuiz", icon: "sprites/tracker/foxy_events/foxy_quiz.png" },
  { id: "foxyCount", nameKey: "trackerFoxyCount", icon: "sprites/tracker/foxy_events/foxy_count.png" },
  { id: "foxyMemory", nameKey: "trackerFoxyMemory", icon: "sprites/tracker/foxy_events/foxy_memory.png" },
  { id: "foxyRace", nameKey: "trackerFoxyRace", icon: "sprites/tracker/foxy_events/foxy_race.png" },
  { id: "foxyRaceShip", nameKey: "trackerFoxyRaceShip", icon: "sprites/tracker/foxy_events/foxy_race_ship.png" },
  { id: "deathmatch", nameKey: "trackerFoxyDeathmatch", icon: "sprites/tracker/foxy_events/foxy_deathmatch.png" }
];

let trackerSubTabActive = "boss_rush";
let trackerState = null;
let trackerBound = false;
let trackerBossRushUsage = { mainsUsed: new Set(), supportsUsed: new Set() };
let trackerOmaHideDone = false;
let trackerOmaHideNotDone = false;
let trackerCelebrationReady = false;
let trackerCelebrationState = {
  modifiers: false,
  marinefordConquest: false
};

function trackerGetFireworkColors() {
  const root = document.documentElement;
  if (!root || typeof getComputedStyle !== "function") {
    return ["#5f1414", "#d0ab17", "#1fb84f", "#8ad04a"];
  }

  const styles = getComputedStyle(root);
  const colors = [
    styles.getPropertyValue("--text-title").trim(),
    styles.getPropertyValue("--input-focus").trim(),
    styles.getPropertyValue("--text-main").trim(),
    styles.getPropertyValue("--text-tab-active").trim()
  ].filter(Boolean);

  return colors.length ? colors : ["#5f1414", "#d0ab17", "#1fb84f", "#8ad04a"];
}

function trackerFireworks() {
  if (typeof confetti !== "function") return;

  const duration = 2000;
  const end = Date.now() + duration;
  const colors = trackerGetFireworkColors();

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function trackerHandleCompletionCelebration(key, isComplete) {
  const completeNow = !!isComplete;
  const wasComplete = !!trackerCelebrationState[key];

  if (!trackerCelebrationReady) {
    trackerCelebrationState[key] = completeNow;
    return;
  }

  if (completeNow && !wasComplete) {
    trackerFireworks();
  }
  trackerCelebrationState[key] = completeNow;
}

function trackerGetWeeklyResetKey() {
  if (typeof foxyQuizGetWeeklyResetKey === "function") {
    return foxyQuizGetWeeklyResetKey();
  }

  const ref = new Date();
  const day = ref.getDay();
  const daysSinceFriday = (day - 5 + 7) % 7;
  const lastFriday = new Date(ref);
  lastFriday.setDate(ref.getDate() - daysSinceFriday);
  lastFriday.setHours(0, 1, 0, 0);

  if (ref < lastFriday) {
    lastFriday.setDate(lastFriday.getDate() - 7);
  }

  const y = lastFriday.getFullYear();
  const m = String(lastFriday.getMonth() + 1).padStart(2, "0");
  const d = String(lastFriday.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function trackerMixHexColor(fromHex, toHex, t) {
  const clampedT = Math.max(0, Math.min(1, t));
  const from = fromHex.replace("#", "");
  const to = toHex.replace("#", "");

  const r1 = parseInt(from.slice(0, 2), 16);
  const g1 = parseInt(from.slice(2, 4), 16);
  const b1 = parseInt(from.slice(4, 6), 16);

  const r2 = parseInt(to.slice(0, 2), 16);
  const g2 = parseInt(to.slice(2, 4), 16);
  const b2 = parseInt(to.slice(4, 6), 16);

  const r = Math.round(r1 + (r2 - r1) * clampedT).toString(16).padStart(2, "0");
  const g = Math.round(g1 + (g2 - g1) * clampedT).toString(16).padStart(2, "0");
  const b = Math.round(b1 + (b2 - b1) * clampedT).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

function trackerGetProgressColor(percent) {
  const p = Math.max(0, Math.min(100, percent));

  // Dark red -> yellow -> strong green
  if (p <= 50) {
    return trackerMixHexColor("#5f1414", "#d0ab17", p / 50);
  }
  return trackerMixHexColor("#d0ab17", "#1fb84f", (p - 50) / 50);
}

function trackerCreateDefaultModifiers() {
  const modifiers = {};
  TRACKER_BOSS_RUSH_MODIFIERS.forEach((modifier) => {
    modifiers[modifier.id] = false;
  });
  return modifiers;
}

function trackerCreateDefaultMarineford() {
  return {
    resetKey: trackerGetWeeklyResetKey(),
    bosses: {},
    superbosses: {},
    helpers: {},
    kills: {}
  };
}

function trackerCreateDefaultFoxyEvents() {
  const events = {};
  TRACKER_FOXY_EVENTS.forEach((eventItem) => {
    events[eventItem.id] = false;
  });
  return events;
}

function trackerCreateDefaultState() {
  return {
    version: 1,
    activeSubTab: "boss_rush",
    bossRush: {
      modifiers: trackerCreateDefaultModifiers(),
      waves: {
        resetKey: trackerGetWeeklyResetKey(),
        entries: []
      }
    },
    marineford: trackerCreateDefaultMarineford(),
    foxy: {
      resetKey: trackerGetWeeklyResetKey(),
      events: trackerCreateDefaultFoxyEvents()
    },
    oneManArmy: {
      completed: {}
    }
  };
}

function trackerNormalizeWaveEntry(raw) {
  const mode = raw && raw.mode === "duo" ? "duo" : "solo";
  const main = raw && typeof raw.main === "string" ? raw.main : "";
  const support = raw && typeof raw.support === "string" ? raw.support : "";
  return { mode, main, support };
}

function trackerNormalizeState(raw) {
  const defaults = trackerCreateDefaultState();
  const state = raw && typeof raw === "object" ? raw : {};

  const normalized = {
    version: 1,
    activeSubTab: ["boss_rush", "marineford", "foxy", "one_man_army"].includes(state.activeSubTab)
      ? state.activeSubTab
      : defaults.activeSubTab,
    bossRush: {
      modifiers: { ...defaults.bossRush.modifiers },
      waves: {
        resetKey: defaults.bossRush.waves.resetKey,
        entries: []
      }
    },
    marineford: trackerCreateDefaultMarineford(),
    foxy: {
      resetKey: defaults.foxy.resetKey,
      events: trackerCreateDefaultFoxyEvents()
    },
    oneManArmy: {
      completed: {}
    }
  };

  const rawModifiers = state.bossRush && state.bossRush.modifiers && typeof state.bossRush.modifiers === "object"
    ? state.bossRush.modifiers
    : {};
  Object.keys(normalized.bossRush.modifiers).forEach((modifierId) => {
    normalized.bossRush.modifiers[modifierId] = !!rawModifiers[modifierId];
  });

  const rawWaves = state.bossRush && state.bossRush.waves && typeof state.bossRush.waves === "object"
    ? state.bossRush.waves
    : {};
  normalized.bossRush.waves.resetKey = typeof rawWaves.resetKey === "string"
    ? rawWaves.resetKey
    : defaults.bossRush.waves.resetKey;
  normalized.bossRush.waves.entries = Array.isArray(rawWaves.entries)
    ? rawWaves.entries.map(trackerNormalizeWaveEntry)
    : [];

  const rawMarineford = state.marineford && typeof state.marineford === "object" ? state.marineford : {};
  normalized.marineford.resetKey = typeof rawMarineford.resetKey === "string"
    ? rawMarineford.resetKey
    : defaults.marineford.resetKey;
  ["bosses", "superbosses", "helpers"].forEach((categoryId) => {
    const map = rawMarineford[categoryId] && typeof rawMarineford[categoryId] === "object" ? rawMarineford[categoryId] : {};
    normalized.marineford[categoryId] = {};
    Object.keys(map).forEach((key) => {
      normalized.marineford[categoryId][key] = !!map[key];
    });
  });

  const rawKills = rawMarineford.kills && typeof rawMarineford.kills === "object" ? rawMarineford.kills : {};
  normalized.marineford.kills = {};
  TRACKER_MF_KILLS.forEach((entry) => {
    normalized.marineford.kills[entry.id] = !!rawKills[entry.id];
  });

  const rawFoxy = state.foxy && typeof state.foxy === "object" ? state.foxy : {};
  normalized.foxy.resetKey = typeof rawFoxy.resetKey === "string" ? rawFoxy.resetKey : defaults.foxy.resetKey;
  const rawEvents = rawFoxy.events && typeof rawFoxy.events === "object" ? rawFoxy.events : {};
  Object.keys(normalized.foxy.events).forEach((eventId) => {
    normalized.foxy.events[eventId] = !!rawEvents[eventId];
  });

  const rawOma = state.oneManArmy && state.oneManArmy.completed && typeof state.oneManArmy.completed === "object"
    ? state.oneManArmy.completed
    : {};
  Object.keys(rawOma).forEach((characterId) => {
    normalized.oneManArmy.completed[characterId] = !!rawOma[characterId];
  });

  return normalized;
}

function trackerEnsureState() {
  trackerState = trackerNormalizeState(trackerState);
  trackerApplyWeeklyResets();
  trackerNormalizeBossRushWaves();
}

function trackerApplyWeeklyResets() {
  const resetKey = trackerGetWeeklyResetKey();

  if (!trackerState) return;

  if (trackerState.bossRush && trackerState.bossRush.waves && trackerState.bossRush.waves.resetKey !== resetKey) {
    trackerState.bossRush.waves.resetKey = resetKey;
    trackerState.bossRush.waves.entries = [];
  }

  if (trackerState.foxy && trackerState.foxy.resetKey !== resetKey) {
    trackerState.foxy.resetKey = resetKey;
    Object.keys(trackerState.foxy.events).forEach((eventId) => {
      trackerState.foxy.events[eventId] = false;
    });
  }

  if (trackerState.marineford && trackerState.marineford.resetKey !== resetKey) {
    trackerState.marineford.resetKey = resetKey;
    ["bosses", "superbosses", "helpers"].forEach((categoryId) => {
      trackerState.marineford[categoryId] = {};
    });
  }
}

function trackerNormalizeBossRushWaves() {
  if (!trackerState || !trackerState.bossRush || !trackerState.bossRush.waves) return;
  const entries = trackerState.bossRush.waves.entries;
  const FORCED_DUO_WAVE_INDEX = 6;

  // Always maintain exactly 7 wave entries (one per main boss)
  while (entries.length < 7) {
    entries.push({ mode: "solo", main: "", support: "" });
  }
  if (entries.length > 7) {
    entries.splice(7);
  }

  const mainsSeen = new Set();
  const supportsSeen = new Set();

  entries.forEach((entry) => {
    const isValidMain = TRACKER_BOSS_RUSH_MAINS.some((candidate) => candidate.id === entry.main);
    if (!isValidMain || mainsSeen.has(entry.main)) {
      entry.main = "";
    }
    if (entry.main) mainsSeen.add(entry.main);

    if (entry.mode !== "duo") {
      entry.mode = "solo";
      entry.support = "";
      return;
    }

    const isValidSupport = TRACKER_BOSS_RUSH_SUPPORTS.some((candidate) => candidate.id === entry.support);
    if (!isValidSupport || supportsSeen.has(entry.support)) {
      entry.support = "";
    }

    if (entry.support) supportsSeen.add(entry.support);
  });

  // Wave 7 is always duo; do not auto-assign a default support.
  const forcedDuoEntry = entries[FORCED_DUO_WAVE_INDEX];
  if (forcedDuoEntry) {
    forcedDuoEntry.mode = "duo";

    const supportsUsedByOthers = new Set();
    entries.forEach((entry, index) => {
      if (index === FORCED_DUO_WAVE_INDEX) return;
      if (entry.mode === "duo" && entry.support) supportsUsedByOthers.add(entry.support);
    });

    // Clear support only if it is now taken by another wave; never auto-assign.
    if (forcedDuoEntry.support && supportsUsedByOthers.has(forcedDuoEntry.support)) {
      forcedDuoEntry.support = "";
    }
  }

  trackerRecomputeBossRushUsage();

  entries.forEach((entry, idx) => {
    if (entry.mode !== "duo") return;
    // Wave 7 is permanently duo — skip auto-fill and auto-demote for it.
    if (idx === FORCED_DUO_WAVE_INDEX) return;

    const availableSupports = trackerGetAvailableSupportsForWave(entry, entries);
    if (!entry.support && availableSupports.length === 1) {
      entry.support = availableSupports[0].id;
      trackerRecomputeBossRushUsage();
    }

    if (!entry.support && availableSupports.length === 0) {
      entry.mode = "solo";
    }
  });

  trackerRecomputeBossRushUsage();
}

function trackerGetAvailableMainsForWave(targetEntry, entries) {
  const usedByOthers = new Set();
  entries.forEach((entry) => {
    if (entry === targetEntry) return;
    if (entry.main) usedByOthers.add(entry.main);
  });
  return TRACKER_BOSS_RUSH_MAINS.filter((enemy) => !usedByOthers.has(enemy.id) || enemy.id === targetEntry.main);
}

function trackerGetAvailableSupportsForWave(targetEntry, entries) {
  const usedByOthers = new Set();
  entries.forEach((entry) => {
    if (entry === targetEntry) return;
    if (entry.mode === "duo" && entry.support) usedByOthers.add(entry.support);
  });
  return TRACKER_BOSS_RUSH_SUPPORTS.filter((enemy) => !usedByOthers.has(enemy.id) || enemy.id === targetEntry.support);
}

function trackerGetAllSupportAvailability(entries) {
  const used = new Set();
  entries.forEach((entry) => {
    if (entry.mode === "duo" && entry.support) used.add(entry.support);
  });
  return TRACKER_BOSS_RUSH_SUPPORTS.filter((candidate) => !used.has(candidate.id));
}

function trackerSaveStateAndRender() {
  trackerNormalizeBossRushWaves();
  trackerRender();
  if (typeof autoSaveBuild === "function") autoSaveBuild();
}

function trackerGetSubTabElements() {
  return document.querySelectorAll(".tracker-subtab-btn");
}

function switchTrackerSubTab(subTab, btn) {
  const safeSubTab = ["boss_rush", "marineford", "foxy", "one_man_army"].includes(subTab)
    ? subTab
    : "boss_rush";

  trackerSubTabActive = safeSubTab;
  if (trackerState) trackerState.activeSubTab = safeSubTab;

  trackerGetSubTabElements().forEach((button) => {
    const isActive = button === btn || button.id === `tracker-subtab-btn-${safeSubTab.replaceAll("_", "-")}`;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  document.querySelectorAll(".tracker-subtab-panel").forEach((panel) => {
    const isActive = panel.id === `tracker-subtab-${safeSubTab.replaceAll("_", "-")}`;
    panel.style.display = isActive ? "block" : "none";
    panel.classList.toggle("active", isActive);
  });

  if (typeof autoSaveBuild === "function") autoSaveBuild();
}

function trackerInit() {
  const panel = document.getElementById("tracker");
  if (!panel) return;

  trackerEnsureState();

  if (!trackerBound) {
    trackerBound = true;

    const clearWavesBtn = document.getElementById("tracker-br-clear-waves");
    const wavesEl = document.getElementById("tracker-br-waves-list");
    const omaSearch = document.getElementById("tracker-oma-search");
    const omaHideDoneBtn = document.getElementById("tracker-oma-hide-done");
    const omaHideNotDoneBtn = document.getElementById("tracker-oma-hide-not-done");

    if (clearWavesBtn) {
      clearWavesBtn.addEventListener("click", () => {
        trackerState.bossRush.waves.entries = [];
        trackerSaveStateAndRender();
      });
    }

    if (wavesEl) {
      wavesEl.addEventListener("change", (e) => {
        if (!trackerState) return;
        const entries = trackerState.bossRush.waves.entries;

        const toggleInput = e.target.closest(".tracker-br-mode-input");
        if (toggleInput) {
          const idx = Number(toggleInput.getAttribute("data-tracker-mode-toggle"));
          const entryItem = entries[idx];
          if (!entryItem) return;
          if (idx === 6 && !toggleInput.checked) {
            // Wave 7 is fixed as duo.
            toggleInput.checked = true;
            entryItem.mode = "duo";
            trackerSaveStateAndRender();
            return;
          }
          if (toggleInput.checked) {
            const supportsUsedByOthers = new Set();
            entries.forEach((e2, i) => {
              if (i === idx) return;
              if (e2.mode === "duo" && e2.support) supportsUsedByOthers.add(e2.support);
            });
            const allUsed = TRACKER_BOSS_RUSH_SUPPORTS.every((s) => supportsUsedByOthers.has(s.id));
            if (allUsed) {
              toggleInput.checked = false;
              return;
            }
            entryItem.mode = "duo";
          } else {
            entryItem.mode = "solo";
            entryItem.support = "";
          }
          trackerSaveStateAndRender();
          return;
        }
      });

      wavesEl.addEventListener("click", (e) => {
        if (!trackerState) return;
        const entries = trackerState.bossRush.waves.entries;

        const enemyBtn = e.target.closest("[data-enemy-id]");
        if (enemyBtn) {
          if (enemyBtn.hasAttribute("disabled")) return;
          const cardEl = enemyBtn.closest("[data-tracker-wave-index]");
          if (!cardEl) return;
          const idx = Number(cardEl.getAttribute("data-tracker-wave-index"));
          const entryItem = entries[idx];
          if (!entryItem) return;
          const enemyId = enemyBtn.getAttribute("data-enemy-id");
          entryItem.main = entryItem.main === enemyId ? "" : enemyId;
          trackerSaveStateAndRender();
          return;
        }

        const supportBtn = e.target.closest("[data-support-id]");
        if (supportBtn) {
          if (supportBtn.hasAttribute("disabled")) return;
          const cardEl = supportBtn.closest("[data-tracker-wave-index]");
          if (!cardEl) return;
          const idx = Number(cardEl.getAttribute("data-tracker-wave-index"));
          const entryItem = entries[idx];
          if (!entryItem) return;
          const supportId = supportBtn.getAttribute("data-support-id");
          if (idx === 6 && entryItem.support === supportId) {
            // Wave 7 cannot end up without a support.
            return;
          }
          entryItem.support = entryItem.support === supportId ? "" : supportId;
          trackerSaveStateAndRender();
          return;
        }
      });
    }

    if (omaSearch) {
      omaSearch.addEventListener("input", () => trackerRenderOneManArmy());
    }

    if (omaHideDoneBtn) {
      omaHideDoneBtn.addEventListener("click", () => {
        trackerOmaHideDone = !trackerOmaHideDone;
        omaHideDoneBtn.classList.toggle("active", trackerOmaHideDone);
        trackerRenderOneManArmy();
      });
    }

    if (omaHideNotDoneBtn) {
      omaHideNotDoneBtn.addEventListener("click", () => {
        trackerOmaHideNotDone = !trackerOmaHideNotDone;
        omaHideNotDoneBtn.classList.toggle("active", trackerOmaHideNotDone);
        trackerRenderOneManArmy();
      });
    }
  }

  trackerSubTabActive = trackerState.activeSubTab || "boss_rush";
  trackerCelebrationReady = false;
  trackerRender();
  trackerCelebrationReady = true;
}

function trackerRender() {
  trackerEnsureState();

  trackerRenderBossRush();
  trackerRenderMarineford();
  trackerRenderFoxyEvents();
  trackerRenderOneManArmy();

  switchTrackerSubTab(trackerSubTabActive, document.getElementById(`tracker-subtab-btn-${trackerSubTabActive.replaceAll("_", "-")}`));
}

function trackerRenderBossRush() {
  const listEl = document.getElementById("tracker-br-modifiers-list");
  const progressEl = document.getElementById("tracker-br-modifiers-progress");
  const barEl = document.getElementById("tracker-br-modifiers-progressbar");
  const wavesEl = document.getElementById("tracker-br-waves-list");
  if (!listEl || !progressEl || !barEl || !wavesEl) return;

  const modifiers = trackerState.bossRush.modifiers;
  const checkedCount = TRACKER_BOSS_RUSH_MODIFIERS.reduce((total, modifier) => total + (modifiers[modifier.id] ? 1 : 0), 0);
  const totalCount = TRACKER_BOSS_RUSH_MODIFIERS.length;

  progressEl.textContent = `${checkedCount} / ${totalCount}`;
  const percent = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  trackerHandleCompletionCelebration("modifiers", totalCount > 0 && checkedCount === totalCount);
  const fill = barEl.querySelector("span");
  if (fill) {
    fill.style.width = `${percent.toFixed(2)}%`;
    fill.style.background = trackerGetProgressColor(percent);
  }

  listEl.innerHTML = TRACKER_BOSS_RUSH_MODIFIERS.map((modifier) => {
    const isChecked = !!modifiers[modifier.id];
    const checkedAttr = isChecked ? "checked" : "";
    const checkedClass = isChecked ? " is-checked" : "";
    const showSkull = modifier.id === "players_no_armor" || modifier.id === "boss_unstoppable";
    const skullHtml = showSkull ? '<span class="emoji-filter" aria-hidden="true">☠</span>' : "";
    return `
      <label class="tracker-checkbox-item${checkedClass}">
        <input type="checkbox" data-tracker-br-modifier="${modifier.id}" ${checkedAttr}>
        <span>${skullHtml}${trackerEscapeHtml(t(modifier.textKey))}</span>
      </label>
    `;
  }).join("");

  listEl.querySelectorAll("[data-tracker-br-modifier]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const modifierId = checkbox.getAttribute("data-tracker-br-modifier");
      if (!Object.prototype.hasOwnProperty.call(trackerState.bossRush.modifiers, modifierId)) return;
      trackerState.bossRush.modifiers[modifierId] = !!checkbox.checked;
      trackerSaveStateAndRender();
    });
  });

  const entries = trackerState.bossRush.waves.entries;

  wavesEl.innerHTML = entries.map((entry, index) => {
    const mainObj = TRACKER_BOSS_RUSH_MAINS.find((m) => m.id === entry.main) || null;
    const supportObj = entry.mode === "duo" ? (TRACKER_BOSS_RUSH_SUPPORTS.find((s) => s.id === entry.support) || null) : null;

    const mainsUsedByOthers = new Set();
    const supportsUsedByOthers = new Set();
    entries.forEach((e, i) => {
      if (i === index) return;
      if (e.main) mainsUsedByOthers.add(e.main);
      if (e.mode === "duo" && e.support) supportsUsedByOthers.add(e.support);
    });

    const allSupportsUsed = TRACKER_BOSS_RUSH_SUPPORTS.every((s) => supportsUsedByOthers.has(s.id));
    const isForcedDuoWave = index === 6;
    const canDuo = isForcedDuoWave || entry.mode === "duo" || !allSupportsUsed;

    const mainSlot = mainObj
      ? `<img src="${mainObj.icon}" alt="${trackerEscapeHtml(t(mainObj.nameKey))}" class="tracker-br-boss-icon" />`
      : `<span class="tracker-br-boss-placeholder">?</span>`;
    const supportSlot = supportObj
      ? `<img src="${supportObj.icon}" alt="${trackerEscapeHtml(t(supportObj.nameKey))}" class="tracker-br-boss-icon tracker-br-support-icon" />`
      : (entry.mode === "duo" ? `<span class="tracker-br-boss-placeholder tracker-br-support-icon">?</span>` : "");
    const bossDisplayHtml = mainSlot + supportSlot;

    const mainBtns = TRACKER_BOSS_RUSH_MAINS.map((enemy) => {
      const isSelected = enemy.id === entry.main;
      const isUsedByOther = mainsUsedByOthers.has(enemy.id);
      const disabledAttr = (isUsedByOther && !isSelected) ? " disabled" : "";
      const cls = isSelected ? " selected" : (isUsedByOther ? " used" : "");
      return `<button type="button" class="tracker-br-enemy-btn${cls}" data-enemy-id="${enemy.id}" aria-label="${trackerEscapeHtml(t(enemy.nameKey))}"${disabledAttr}><img src="${enemy.icon}" alt="" /></button>`;
    }).join("");

    const supportBtns = TRACKER_BOSS_RUSH_SUPPORTS.map((enemy) => {
      const isSelected = enemy.id === entry.support;
      const isUsedByOther = supportsUsedByOthers.has(enemy.id);
      const disabledAttr = (isUsedByOther && !isSelected) ? " disabled" : "";
      const cls = isSelected ? " selected" : (isUsedByOther ? " used" : "");
      return `<button type="button" class="tracker-br-enemy-btn${cls}" data-support-id="${enemy.id}" aria-label="${trackerEscapeHtml(t(enemy.nameKey))}"${disabledAttr}><img src="${enemy.icon}" alt="" /></button>`;
    }).join("");

    return `
      <article class="tracker-br-card" data-tracker-wave-index="${index}">
        <div class="tracker-br-card-header">
          <span class="tracker-br-wave-label">${trackerEscapeHtml(t("trackerWaveLabel"))} ${index + 1}</span>
          <label class="tracker-br-mode-toggle${!canDuo && entry.mode !== 'duo' ? ' is-disabled' : ''}" title="${trackerEscapeHtml(t(entry.mode === 'duo' ? 'trackerModeDuo' : 'trackerModeSolo'))}">
            <input type="checkbox" class="tracker-br-mode-input" data-tracker-mode-toggle="${index}" ${entry.mode === 'duo' ? 'checked' : ''} ${isForcedDuoWave ? 'disabled' : ''} ${!canDuo && entry.mode !== 'duo' ? 'disabled' : ''}>
            <span class="tracker-br-mode-slider">
              <span class="tracker-br-mode-label-solo">${trackerEscapeHtml(t('trackerModeSolo'))}</span>
              <span class="tracker-br-mode-label-duo">${trackerEscapeHtml(t('trackerModeDuo'))}</span>
            </span>
          </label>
        </div>
        <div class="tracker-br-boss-display">${bossDisplayHtml}</div>
        <div class="tracker-br-enemies-row">${mainBtns}</div>
        <div class="tracker-br-supports-row"${entry.mode !== "duo" ? ' style="display:none"' : ""}>${supportBtns}</div>
      </article>
    `;
  }).join("");

  // listeners handled by delegated handler in trackerInit
}

function trackerRecomputeBossRushUsage() {
  const mainsUsed = new Set();
  const supportsUsed = new Set();
  const entries = trackerState && trackerState.bossRush && trackerState.bossRush.waves
    ? trackerState.bossRush.waves.entries
    : [];

  entries.forEach((entry) => {
    if (entry.main) mainsUsed.add(entry.main);
    if (entry.mode === "duo" && entry.support) supportsUsed.add(entry.support);
  });

  trackerBossRushUsage = { mainsUsed, supportsUsed };
  return trackerBossRushUsage;
}

function recomputeUsage() {
  return trackerRecomputeBossRushUsage();
}

function renderBossRush() {
  trackerNormalizeBossRushWaves();
  trackerRenderBossRush();
}

function trackerRenderMarinefordKills() {
  const container = document.getElementById("tracker-mf-kills");
  if (!container) return;

  const kills = trackerState.marineford.kills;
  const killedCount = TRACKER_MF_KILLS.reduce((acc, e) => acc + (kills[e.id] ? 1 : 0), 0);
  const total = TRACKER_MF_KILLS.length;
  const percent = total > 0 ? (killedCount / total) * 100 : 0;
  trackerHandleCompletionCelebration("marinefordConquest", total > 0 && killedCount === total);
  const progressColor = trackerGetProgressColor(percent);

  const progressHtml = `
    <div class="tracker-mf-kills-progress-row">
      <span class="tracker-mf-kills-progress-label">${trackerEscapeHtml(t("trackerMfKillsTitle"))}</span>
      <div class="tracker-mf-head-actions">
        <span class="tracker-progress-count">${killedCount} / ${total}</span>
        <button type="button" class="tracker-clear-btn" data-tracker-mf-clear-kills>${trackerEscapeHtml(t("clear"))}</button>
      </div>
    </div>
    <div class="tracker-progressbar"><span style="width:${percent.toFixed(2)}%;background:${progressColor}"></span></div>
  `;

  const renderKillBtn = (entry) => {
    const killed = !!kills[entry.id];
    return `<button type="button" class="tracker-mf-kill-btn${killed ? " is-killed" : ""}" data-mf-kill-id="${entry.id}" title="${trackerEscapeHtml(entry.name)}"><img src="${entry.icon}" alt="${trackerEscapeHtml(entry.name)}"></button>`;
  };

  const bossKillBtns = TRACKER_MF_KILLS.filter((e) => e.group === "bosses").map(renderKillBtn).join("");
  const superbossKillBtns = TRACKER_MF_KILLS.filter((e) => e.group === "superbosses").map(renderKillBtn).join("");
  const akainuKillBtn = TRACKER_MF_KILLS.filter((e) => e.group === "akainu").map(renderKillBtn).join("");
  const iconsHtml =
    bossKillBtns +
    `<span class="tracker-mf-kills-sep" aria-hidden="true">|</span>` +
    superbossKillBtns +
    `<span class="tracker-mf-kills-sep" aria-hidden="true">|</span>` +
    akainuKillBtn;

  container.innerHTML = progressHtml + `<div class="tracker-mf-kills-grid">${iconsHtml}</div>`;

  container.querySelectorAll("[data-mf-kill-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-mf-kill-id");
      trackerState.marineford.kills[id] = !trackerState.marineford.kills[id];
      trackerRenderMarinefordKills();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  });

  const clearBtn = container.querySelector("[data-tracker-mf-clear-kills]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      trackerState.marineford.kills = {};
      trackerRenderMarinefordKills();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  }
}

function trackerRenderMarineford() {
  trackerRenderMarinefordKills();

  const container = document.getElementById("tracker-mf-sections");
  if (!container) return;

  container.innerHTML = TRACKER_MARINEFORD_CATEGORIES.map((category) => {
    const categoryWaves = TRACKER_MARINEFORD_WAVES_BY_CATEGORY[category.id] || [];
    const SUPERBOSS_LIMIT = 2;

    // Build wave→characterId occupancy map for this category
    const waveOccupied = {};
    category.entries.forEach((entry) => {
      categoryWaves.forEach((wave) => {
        const key = trackerMarinefordKey(entry.id, wave);
        const legacyKey = `${wave}_${entry.id}`;
        if (trackerState.marineford[category.id][key] || trackerState.marineford[category.id][legacyKey]) {
          waveOccupied[wave] = entry.id;
        }
      });
    });

    // Count how many superbosses have at least one wave checked
    const checkedSuperbossCount = category.id === "superbosses"
      ? category.entries.filter((entry) => categoryWaves.some((wave) => waveOccupied[wave] === entry.id)).length
      : 0;

    const rows = category.entries.map((entry) => {
      const hasChecked = categoryWaves.some((wave) => waveOccupied[wave] === entry.id);
      const isLockedOut = category.id === "superbosses" && !hasChecked && checkedSuperbossCount >= SUPERBOSS_LIMIT;

      const cardClass = ["tracker-mf-entry", hasChecked ? "is-checked" : "", isLockedOut ? "is-dimmed" : ""].filter(Boolean).join(" ");

      const waveChecks = categoryWaves.map((wave) => {
        const key = trackerMarinefordKey(entry.id, wave);
        const legacyKey = `${wave}_${entry.id}`;
        const checked = !!trackerState.marineford[category.id][key] || !!trackerState.marineford[category.id][legacyKey];
        const occupiedByOther = waveOccupied[wave] && waveOccupied[wave] !== entry.id;
        const disabled = occupiedByOther || (isLockedOut && !checked);
        return `
          <label class="tracker-mf-wave-check${checked ? " is-checked" : ""}${disabled ? " is-disabled" : ""}">
            <input
              type="checkbox"
              data-tracker-mf-category="${category.id}"
              data-tracker-mf-key="${key}"
              data-tracker-mf-id="${entry.id}"
              data-tracker-mf-wave="${wave}"
              ${checked ? "checked" : ""}
              ${disabled ? "disabled" : ""}
            >
            <span>${trackerEscapeHtml(t("trackerWaveShort"))} ${wave}</span>
          </label>
        `;
      }).join("");

      return `
        <article class="${cardClass}">
          <div class="tracker-mf-entry-head">
            <img src="${entry.icon}" alt="${trackerEscapeHtml(entry.name)}" class="tracker-foxy-banner">
            <span class="tracker-mf-name">${trackerEscapeHtml(entry.name)}</span>
          </div>
          <div class="tracker-mf-waves-grid">${waveChecks}</div>
        </article>
      `;
    }).join("");

    return `
      <section class="tracker-box">
        <div class="tracker-box-head">
          <h4>${trackerEscapeHtml(t(category.titleKey))}</h4>
          <button type="button" class="tracker-clear-btn" data-tracker-mf-clear-category="${category.id}">${trackerEscapeHtml(t("clear"))}</button>
        </div>
        <div class="tracker-checkbox-list">${rows}</div>
      </section>
    `;
  }).join("");

  container.querySelectorAll("[data-tracker-mf-key]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const categoryId = checkbox.getAttribute("data-tracker-mf-category");
      const key = checkbox.getAttribute("data-tracker-mf-key");
      const characterId = checkbox.getAttribute("data-tracker-mf-id");
      const wave = checkbox.getAttribute("data-tracker-mf-wave");
      if (!trackerState.marineford[categoryId]) return;
      // Single-wave exclusivity: if checking, clear all other waves for this character first
      if (checkbox.checked && characterId) {
        const categoryWaves = TRACKER_MARINEFORD_WAVES_BY_CATEGORY[categoryId] || [];
        categoryWaves.forEach((w) => {
          const otherKey = trackerMarinefordKey(characterId, w);
          const otherLegacy = `${w}_${characterId}`;
          if (otherKey !== key) {
            delete trackerState.marineford[categoryId][otherKey];
            delete trackerState.marineford[categoryId][otherLegacy];
          }
        });
      }
      trackerState.marineford[categoryId][key] = !!checkbox.checked;
      if (characterId && wave) {
        const legacyKey = `${wave}_${characterId}`;
        if (legacyKey !== key && Object.prototype.hasOwnProperty.call(trackerState.marineford[categoryId], legacyKey)) {
          delete trackerState.marineford[categoryId][legacyKey];
        }
      }
      trackerRenderMarineford();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  });

  container.querySelectorAll("[data-tracker-mf-clear-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoryId = btn.getAttribute("data-tracker-mf-clear-category");
      if (!categoryId || !trackerState.marineford[categoryId]) return;
      trackerState.marineford[categoryId] = {};
      trackerRenderMarineford();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  });
}

function trackerMarinefordKey(id, wave) {
  return `${id}_${wave}`;
}

function trackerRenderFoxyEvents() {
  const container = document.getElementById("tracker-foxy-events");
  if (!container) return;

  container.innerHTML = TRACKER_FOXY_EVENTS.map((eventItem) => {
    const checked = eventItem.id === "foxyQuiz"
      ? trackerGetSharedFoxyQuizWeeklyChecked()
      : !!trackerState.foxy.events[eventItem.id];
    const checkedClass = checked ? " is-checked" : "";

    return `
      <label class="tracker-foxy-item tracker-foxy-item-icon${checkedClass}" title="${trackerEscapeHtml(t(eventItem.nameKey))}">
        <input type="checkbox" data-tracker-foxy-event="${eventItem.id}" ${checked ? "checked" : ""}>
        <img src="${eventItem.icon}" alt="${trackerEscapeHtml(t(eventItem.nameKey))}" class="tracker-foxy-banner tracker-foxy-banner-natural">
      </label>
    `;
  }).join("");

  container.querySelectorAll("[data-tracker-foxy-event]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const eventId = checkbox.getAttribute("data-tracker-foxy-event");
      if (eventId === "foxyQuiz") {
        trackerSetSharedFoxyQuizWeeklyChecked(!!checkbox.checked);
        trackerRenderFoxyEvents();
        return;
      }

      if (!Object.prototype.hasOwnProperty.call(trackerState.foxy.events, eventId)) return;
      trackerState.foxy.events[eventId] = !!checkbox.checked;
      trackerRenderFoxyEvents();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  });
}

function trackerGetUnlockedCharactersForOma() {
  if (!Array.isArray(CHARACTERS_DATA)) return [];

  const unlockedMap = typeof getCharactersState === "function"
    ? (getCharactersState()?.characters || {})
    : {};

  return CHARACTERS_DATA
    .filter((character) => unlockedMap[character.id] && unlockedMap[character.id].active)
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function trackerRenderOneManArmy() {
  const listEl = document.getElementById("tracker-oma-list");
  const progressEl = document.getElementById("tracker-oma-progress");
  const searchEl = document.getElementById("tracker-oma-search");
  if (!listEl || !progressEl) return;

  const unlockedChars = trackerGetUnlockedCharactersForOma();
  const query = (searchEl?.value || "").trim().toLowerCase();

  const visible = unlockedChars.filter((character) => {
    const isDone = !!trackerState.oneManArmy.completed[character.id];
    if (trackerOmaHideDone && isDone) return false;
    if (trackerOmaHideNotDone && !isDone) return false;

    if (!query) return true;
    return String(character.name || "").toLowerCase().includes(query)
      || String(character.id || "").toLowerCase().includes(query);
  });

  const doneCount = unlockedChars.reduce((total, character) => total + (trackerState.oneManArmy.completed[character.id] ? 1 : 0), 0);
  progressEl.textContent = `${doneCount} / ${unlockedChars.length}`;

  if (!unlockedChars.length) {
    listEl.innerHTML = `<div class="tracker-empty">${trackerEscapeHtml(t("trackerOmaNoUnlocked"))}</div>`;
    return;
  }

  if (!visible.length) {
    listEl.innerHTML = `<div class="tracker-empty">${trackerEscapeHtml(t("trackerNoResults"))}</div>`;
    return;
  }

  listEl.innerHTML = visible.map((character) => {
    const done = !!trackerState.oneManArmy.completed[character.id];
    const sprite = character.sprite || "";
    const imageHtml = sprite
      ? `<img src="${sprite}" alt="${trackerEscapeHtml(character.name)}">`
      : "";

    return `
      <label class="tracker-oma-item ${done ? "is-done" : ""}">
        <input type="checkbox" data-tracker-oma="${character.id}" ${done ? "checked" : ""}>
        ${imageHtml}
        <span>${trackerEscapeHtml(character.name)}</span>
      </label>
    `;
  }).join("");

  listEl.querySelectorAll("[data-tracker-oma]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const characterId = checkbox.getAttribute("data-tracker-oma");
      trackerState.oneManArmy.completed[characterId] = !!checkbox.checked;
      trackerRenderOneManArmy();
      if (typeof autoSaveBuild === "function") autoSaveBuild();
    });
  });
}

function trackerEscapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function trackerApplyTranslations() {
  const search = document.getElementById("tracker-oma-search");
  if (search) search.placeholder = t("trackerOmaSearchPlaceholder");
  trackerRender();
}

function getTrackerState() {
  trackerEnsureState();
  return JSON.parse(JSON.stringify(trackerState));
}

function applyTrackerState(state) {
  trackerState = trackerNormalizeState(state);
  trackerSubTabActive = trackerState.activeSubTab || "boss_rush";
  trackerCelebrationReady = false;
  trackerRender();
  trackerCelebrationReady = true;
}

function resetTrackerState() {
  trackerState = trackerCreateDefaultState();
  trackerSubTabActive = trackerState.activeSubTab;
  trackerRender();
}

function trackerGetSharedFoxyQuizWeeklyChecked() {
  trackerEnsureState();
  return !!trackerState.foxy.events.foxyQuiz;
}

function trackerSetSharedFoxyQuizWeeklyChecked(checked, options = {}) {
  trackerEnsureState();
  trackerState.foxy.events.foxyQuiz = !!checked;

  if (!options.silent && typeof autoSaveBuild === "function") {
    autoSaveBuild();
  }

  const checkbox = document.getElementById("foxy-quiz-weekly-checkbox");
  if (checkbox && checkbox.checked !== !!checked) {
    checkbox.checked = !!checked;
  }
}
