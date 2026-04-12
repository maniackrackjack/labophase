// ============================================================
// UI — tab switching, toast, build clear, recalc
// ============================================================

let calcSubTabActive = "calculator";

function switchCalcSubTab(subTab, btn) {
  const safeSubTab = subTab === "tables" ? "tables" : "calculator";
  calcSubTabActive = safeSubTab;

  document.querySelectorAll(".calc-subtab-btn").forEach((b) => {
    b.classList.toggle("active", b === btn || b.id === `calc-subtab-btn-${safeSubTab}`);
    b.setAttribute("aria-selected", b.classList.contains("active") ? "true" : "false");
  });

  document.querySelectorAll(".calc-subtab-panel").forEach((panel) => {
    const isActive = panel.id === `calc-subtab-${safeSubTab}`;
    if (isActive) {
      panel.style.display = "block";
      // Restart animation by removing and re-adding active
      panel.classList.remove("active");
      requestAnimationFrame(() => {
        panel.classList.add("active");
      });
    } else {
      panel.classList.remove("active");
      panel.style.display = "none";
    }
  });
}

function switchTab(tab, btn) {
  document
    .querySelectorAll(".tabBtn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".content .tabPanel").forEach((p) => {
    p.style.display = "none";
    p.classList.remove("tab-entering");
  });

  const activePanel = document.getElementById(tab);
  activePanel.style.display = "block";
  activePanel.classList.remove("tab-entering");
  requestAnimationFrame(() => {
    activePanel.classList.add("tab-entering");
  });

  if (tab === "calc") {
    switchCalcSubTab(calcSubTabActive, document.getElementById(`calc-subtab-btn-${calcSubTabActive}`));
  }

  // Re-layout torches after the chest panel becomes visible
  if (tab === "chest" && typeof chestLayoutTorches === "function") {
    requestAnimationFrame(chestLayoutTorches);
  }

  // Init World Bosses content when the tab becomes visible
  if (["shai_hulud","mihawk","hiking_bear","byakko","bananawani","plesiosaur","aokiji"].includes(tab) && typeof worldBossesInit === "function") {
    worldBossesInit(tab);
  }

  // Init Foxy Quiz when the tab becomes visible
  if (tab === "foxy_quiz" && typeof foxyQuizInit === "function") {
    foxyQuizInit();
  }

  // Init Tracker when the tab becomes visible
  if (tab === "tracker" && typeof trackerInit === "function") {
    trackerInit();
  }

  // Init Island Chests when the tab becomes visible
  if (tab === "island_chests" && typeof islandChestsInit === "function") {
    islandChestsInit();
  }
}

function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast.__timeout);
  toast.__timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function clearBuild() {
  ensureItemsLayout(true);
  if (typeof resetCharactersState === "function") resetCharactersState();
  if (typeof resetBoatsState === "function") resetBoatsState();
  recalc();
}

function recalc() {
  let total = 0;

  document.querySelectorAll(".card").forEach((card) => {
    try {
      let tipo = card.getAttribute("data") || card.dataset.item;
      let item = itens[tipo];

      if (!item) {
        console.warn("Unknown item type for card", card.id, tipo);
        return;
      }

      let cristais = 0;
      let stats = {};

      const statPercents = [];
      const thresholdRanks = [];

      for (let stat in item.max) {
        const input = card.querySelector(`[data-stat="${stat}"]`);
        const valRaw = input ? parseInt(input.value, 10) : NaN;

        let val = !isNaN(valRaw) ? valRaw : item.min[stat];
        if (!val) val = item.min[stat];

        stats[stat] = val;

        // For multi-stat items, rarity uses the average of each stat percent.
        const percent = getStatPercent(tipo, stat, val);
        statPercents.push(percent);

        // Secondary verification: validate rarity using explicit white/blue/purple/gold ranges.
        const thresholdRarity = getStatRarityFromThresholds(tipo, stat, val);
        thresholdRanks.push(getRarityRank(thresholdRarity));

        let falt = item.max[stat] - val;
        let need = Math.ceil(falt / item.gain[stat]);

        if (need > cristais) cristais = need;

        let totalCristais = Math.ceil(
          (item.max[stat] - item.min[stat]) / item.gain[stat],
        );

        let faltando = Math.ceil((item.max[stat] - val) / item.gain[stat]);

        if (faltando < 0) faltando = 0;
        if (faltando > totalCristais) faltando = totalCristais;

        let usados = totalCristais - faltando;

        desenharBarra(`${card.id}_${stat}_bar`, totalCristais, usados);
      }

      // Determine overall card rarity based on the average percentage of all stats.
      const averagePercent =
        statPercents.length > 0
          ? statPercents.reduce((sum, v) => sum + v, 0) / statPercents.length
          : 0;

      const percentRarity = getRarityFromPercent(averagePercent);

      // Second check for multi-stat/single-stat items based on explicit thresholds.
      // We average threshold ranks and apply a conservative floor when checks diverge.
      const thresholdAvgRank =
        thresholdRanks.length > 0
          ? thresholdRanks.reduce((sum, v) => sum + v, 0) / thresholdRanks.length
          : 0;
      const thresholdRarity = getRarityByRank(Math.floor(thresholdAvgRank));

      const rarity = getRarityByRank(
        Math.min(getRarityRank(percentRarity), getRarityRank(thresholdRarity)),
      );
      applyCardRarity(card, rarity);

      card.dataset.crystalsNeeded = cristais;
      total += cristais;

      let comb = statsCombinam(tipo, stats);

      let res = card.querySelector(`#${card.id}_result`);
      const comboRuleHint = t("comboRuleHint");

      const crystalsText = t("requiresCrystals").replace("{n}", cristais);
      let txt = crystalsText;

      if (comb === true)
        txt += `<br><span class="comboGood" title="${comboRuleHint}">${t("comboGood")}</span>`;

      if (comb === false)
        txt += `<br><span class="comboBad" title="${comboRuleHint}">${t("comboBad")}</span>`;

      if (res) res.innerHTML = txt;
    } catch (error) {
      console.error("Error recalculating card", card.id, error);
    }
  });

  const totalValueEl = document.getElementById("totalCrystalsValue");
  if (totalValueEl) totalValueEl.innerText = total;

  updateGroupCrystalCounts();

  autoSaveBuild();
}

// ============================================================
// Sidebar retract toggle
// ============================================================

function refreshSidebarCompactTooltips() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const isCompact = window.innerWidth > 980 && sidebar.classList.contains('collapsed');
  const buttons = sidebar.querySelectorAll('.tabBtn, .wb-folder-btn, .profile-sidebar-btn, .themePickerToggle');

  buttons.forEach((button) => {
    const labelEl = button.querySelector('.tab-label, .profile-btn-label, .themePickerActiveName');
    let label = labelEl ? labelEl.textContent.trim() : '';

    if (!label) {
      label = button.getAttribute('aria-label') || button.getAttribute('title') || '';
    }

    if (isCompact && label) {
      button.setAttribute('data-compact-tooltip', label);
      button.setAttribute('title', label);
      if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', label);
      }
    } else {
      button.removeAttribute('data-compact-tooltip');
      button.removeAttribute('title');
    }
  });
}

function initSidebarCompactTooltips() {
  if (document.body.dataset.sidebarCompactTipsBound === '1') return;
  document.body.dataset.sidebarCompactTipsBound = '1';

  window.addEventListener('resize', () => {
    refreshSidebarCompactTooltips();
  });
}

function toggleSidebar() {
  if (window.innerWidth <= 980) return; // only collapse on desktop
  var sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  refreshSidebarCompactTooltips();
  try {
    localStorage.setItem('glac_sidebar_collapsed', sidebar.classList.contains('collapsed') ? '1' : '0');
  } catch (e) {}
}

function initSidebarState() {
  initSidebarCompactTooltips();
  try {
    if (localStorage.getItem('glac_sidebar_collapsed') === '1' && window.innerWidth > 980) {
      var sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.add('collapsed');
    }
  } catch (e) {}
  refreshSidebarCompactTooltips();
}
