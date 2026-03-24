// ============================================================
// XP Calculator — level XP and potion conversion by tier
// ============================================================

const XP_LEVEL_MAX = 140;

const XP_TIERS = {
  bronze: { multiplier: 3, icon: "sprites/xp/bronze_tier.png", nameKey: "xpTierBronze" },
  silver: { multiplier: 2, icon: "sprites/xp/silver_tier.png", nameKey: "xpTierSilver" },
  gold: { multiplier: 1, icon: "sprites/xp/gold_tier.png", nameKey: "xpTierGold" },
  diamond: { multiplier: 0.5, icon: "sprites/xp/diamond_tier.png", nameKey: "xpTierDiamond" }
};

const XP_POTS = {
  small: { baseXp: 1000, icon: "sprites/xp/small_xp_pot.png", nameKey: "xpPotSmall" },
  medium: { baseXp: 10000, icon: "sprites/xp/medium_xp_pot.png", nameKey: "xpPotMedium" },
  large: { baseXp: 100000, icon: "sprites/xp/large_xp_pot.png", nameKey: "xpPotLarge" }
};

function xpTotal(level) {
  return (50 * (level - 1) ** 3 - 150 * (level - 1) ** 2 + 400 * (level - 1)) / 3;
}

function xpLevel(level) {
  return 50 * level ** 2 - 150 * level + 200;
}

function xpGetSelectedTierKey() {
  const host = document.getElementById("xp-tier-stars");
  if (!host) return "bronze";
  return host.dataset.selectedTier || "bronze";
}

function xpSetSelectedTier(tierKey) {
  const host = document.getElementById("xp-tier-stars");
  if (!host || !XP_TIERS[tierKey]) return;
  host.dataset.selectedTier = tierKey;

  host.querySelectorAll(".xp-star-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tier === tierKey);
  });
}

function xpBuildTierStars() {
  const host = document.getElementById("xp-tier-stars");
  if (!host) return;

  host.innerHTML = "";
  Object.entries(XP_TIERS).forEach(([key, tier]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "xp-star-btn";
    btn.dataset.tier = key;
    btn.title = xpT(tier.nameKey);
    btn.innerHTML = `<img src="${tier.icon}" alt="${xpT(tier.nameKey)}" />`;
    btn.addEventListener("click", () => {
      xpSetSelectedTier(key);
      xpRecalc();
    });
    host.appendChild(btn);
  });

  xpSetSelectedTier(xpGetSelectedTierKey());
}

function xpCalculate({ levelAtual, porcentagemAtual, levelDesejado, tierMultiplier }) {
  if (
    !Number.isFinite(levelAtual) ||
    !Number.isFinite(levelDesejado) ||
    !Number.isFinite(porcentagemAtual) ||
    levelAtual <= 0 ||
    levelAtual > XP_LEVEL_MAX ||
    levelDesejado > XP_LEVEL_MAX ||
    levelDesejado <= levelAtual ||
    porcentagemAtual < 0 ||
    porcentagemAtual > 100 ||
    !Number.isFinite(tierMultiplier) ||
    tierMultiplier <= 0
  ) {
    return { error: xpT("xpErrorInvalid") };
  }

  const xpAtual = xpTotal(levelAtual) + (xpLevel(levelAtual) * porcentagemAtual) / 100;
  const xpDesejada = xpTotal(levelDesejado);
  const xpFaltante = Math.max(0, xpDesejada - xpAtual);

  const smallValue = XP_POTS.small.baseXp * tierMultiplier;
  const smallNeededRaw = Math.ceil(xpFaltante / smallValue);

  const large = Math.floor(smallNeededRaw / 100);
  const remAfterLarge = smallNeededRaw % 100;
  const medium = Math.floor(remAfterLarge / 10);
  const small = remAfterLarge % 10;

  return {
    xpFaltante,
    pots: { large, medium, small }
  };
}

function xpRenderResult(result) {
  const list = document.getElementById("xp-result-list");
  const note = document.getElementById("xp-result-note");
  if (!list || !note) return;

  list.innerHTML = "";

  if (result.error) {
    note.className = "xp-error";
    note.textContent = result.error;
    return;
  }

  note.className = "xp-note";
  note.textContent = `${xpT("xpMissingXp")}: ${xpFormat(result.xpFaltante)}`;

  const order = [
    ["large", XP_POTS.large],
    ["medium", XP_POTS.medium],
    ["small", XP_POTS.small]
  ];

  let shown = 0;
  order.forEach(([key, meta]) => {
    const amount = result.pots[key] || 0;
    if (amount <= 0) return;
    shown += 1;

    const line = document.createElement("div");
    line.className = "xp-pot-line";
    line.innerHTML = `
      <img src="${meta.icon}" alt="${xpT(meta.nameKey)}" />
      <span>${xpT(meta.nameKey)}: <strong>${xpFormat(amount)}</strong></span>
    `;
    list.appendChild(line);
  });

  if (shown === 0) {
    const done = document.createElement("div");
    done.className = "xp-note";
    done.textContent = xpT("xpNoPotsNeeded");
    list.appendChild(done);
  }
}

function xpRecalc() {
  const levelAtual = Number(document.getElementById("xp-level-current")?.value || 0);
  const porcentagemAtual = Number(document.getElementById("xp-percent-current")?.value || 0);
  const levelDesejado = Number(document.getElementById("xp-level-target")?.value || 0);

  const tierKey = xpGetSelectedTierKey();
  const tier = XP_TIERS[tierKey] || XP_TIERS.bronze;

  const result = xpCalculate({
    levelAtual,
    porcentagemAtual,
    levelDesejado,
    tierMultiplier: tier.multiplier
  });

  xpRenderResult(result);
}

function xpFormat(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
}

function xpT(key) {
  if (typeof t === "function") return t(key);
  return key;
}

function xpInit() {
  const panel = document.getElementById("xp");
  if (!panel) return;

  xpBuildTierStars();

  ["xp-level-current", "xp-percent-current", "xp-level-target"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.dataset.boundXp === "1") return;
    el.dataset.boundXp = "1";
    el.addEventListener("input", xpRecalc);
    el.addEventListener("change", xpRecalc);
  });

  const clearBtn = document.getElementById("xp-clear-btn");
  if (clearBtn && clearBtn.dataset.boundXp !== "1") {
    clearBtn.dataset.boundXp = "1";
    clearBtn.addEventListener("click", () => {
      const lvl = document.getElementById("xp-level-current");
      const pct = document.getElementById("xp-percent-current");
      const tgt = document.getElementById("xp-level-target");
      if (lvl) lvl.value = "1";
      if (pct) pct.value = "0";
      if (tgt) tgt.value = "2";
      xpSetSelectedTier("bronze");
      xpRecalc();
    });
  }

  xpRecalc();
}
