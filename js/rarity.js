// ============================================================
// Rarity — thresholds, stat classification, card coloring
// ============================================================

const rarityThresholds = {
  // Keep both generic min/max and tier ranges for secondary validation.
  chapeu: {
    vit: { min: 44, max: 59, whiteMin: 44, whiteMax: 52, blueMin: 53, blueMax: 57, purpleMin: 58, purpleMax: 58, goldMin: 59, goldMax: 59 },
    def: { min: 390, max: 499, whiteMin: 390, whiteMax: 455, blueMin: 456, blueMax: 488, purpleMin: 489, purpleMax: 498, goldMin: 499, goldMax: 499 },
  },
  camisa: {
    vit: { min: 56, max: 73, whiteMin: 56, whiteMax: 66, blueMin: 67, blueMax: 71, purpleMin: 72, purpleMax: 72, goldMin: 73, goldMax: 73 },
    def: { min: 1900, max: 2460, whiteMin: 1900, whiteMax: 2235, blueMin: 2236, blueMax: 2403, purpleMin: 2404, purpleMax: 2459, goldMin: 2460, goldMax: 2460 },
  },
  calca: {
    // Tuned so percent-based classification matches desired behavior: 12 -> rare, 13 -> epic.
    vit: { min: 10, max: 13.3333333333, whiteMin: 10, whiteMax: 11, blueMin: 12, blueMax: 12, purpleMin: 13, purpleMax: 13, goldMin: 14, goldMax: 14 },
    def: { min: 1560, max: 1996, whiteMin: 1560, whiteMax: 1821, blueMin: 1822, blueMax: 1952, purpleMin: 1953, purpleMax: 1995, goldMin: 1996, goldMax: 1996 },
  },
  sabre: {
    atk: { min: 7380, max: 8600, whiteMin: 7380, whiteMax: 8111, blueMin: 8112, blueMax: 8477, purpleMin: 8478, purpleMax: 8599, goldMin: 8600, goldMax: 8600 },
  },
  colar: {
    atk: { min: 4690, max: 5400, whiteMin: 4690, whiteMax: 5115, blueMin: 5116, blueMax: 5328, purpleMin: 5329, purpleMax: 5399, goldMin: 5400, goldMax: 5400 },
  },
  emblema: {
    pen: { min: 2390, max: 2755, whiteMin: 2390, whiteMax: 2608, blueMin: 2609, blueMax: 2718, purpleMin: 2719, purpleMax: 2754, goldMin: 2755, goldMax: 2755 },
  },
  anel: {
    crit: { min: 125, max: 135, whiteMin: 125, whiteMax: 130, blueMin: 131, blueMax: 133, purpleMin: 134, purpleMax: 134, goldMin: 135, goldMax: 135 },
    atk: { min: 1500, max: 1650, whiteMin: 1500, whiteMax: 1589, blueMin: 1590, blueMax: 1634, purpleMin: 1635, purpleMax: 1649, goldMin: 1650, goldMax: 1650 },
  },
};

function getStatPercent(tipo, stat, value) {
  const rangeFromConfig = rarityThresholds[tipo]?.[stat];
  const fallbackItem = itens[tipo];
  const min = rangeFromConfig?.min ?? fallbackItem?.min?.[stat];
  const max = rangeFromConfig?.max ?? fallbackItem?.max?.[stat];

  if (typeof min !== "number" || typeof max !== "number" || max <= min) {
    return 0;
  }

  const percent = (value - min) / (max - min);
  return Math.max(0, Math.min(1, percent));
}

function getStatRarityFromThresholds(tipo, stat, value) {
  const t = rarityThresholds[tipo]?.[stat];
  if (!t) return "common";

  if (value >= t.goldMin && value <= t.goldMax) return "legendary";
  if (value >= t.purpleMin && value <= t.purpleMax) return "epic";
  if (value >= t.blueMin && value <= t.blueMax) return "rare";
  if (value >= t.whiteMin && value <= t.whiteMax) return "common";
  return "common";
}

function getRarityFromPercent(avgPercent) {
  // <60% = common, 60-<90 = rare, 90-<100 = epic, 100% = legendary
  if (avgPercent >= 1) return "legendary";
  if (avgPercent >= 0.9) return "epic";
  if (avgPercent >= 0.6) return "rare";
  return "common";
}

function getRarityRank(rarity) {
  const map = { common: 0, rare: 1, epic: 2, legendary: 3 };
  return map[rarity] ?? 0;
}

function getRarityByRank(rank) {
  const list = ["common", "rare", "epic", "legendary"];
  return list[Math.max(0, Math.min(3, rank))];
}

function buildRarityThresholdTable(itemKey, item) {
  const statThresholds = rarityThresholds[itemKey];
  if (!statThresholds || !item) return "";

  const stats = Object.keys(item.max)
    .filter((stat) => !!statThresholds[stat])
    .slice(0, 2);

  if (stats.length === 0) return "";

  const rows = [
    { key: "white", label: t("rarityWhite") },
    { key: "blue", label: t("rarityBlue") },
    { key: "purple", label: t("rarityPurple") },
    { key: "gold", label: t("rarityGold") },
  ];

  let html = `
<div class="rarityThresholds">
  <div class="rarityTitle">${t("rarityThresholdsTitle")}</div>
  <table class="rarityTable">
    <thead>
      <tr>
        <th>${t("rarityLabel")}</th>
`;

  stats.forEach((stat) => {
    html += `        <th>${stat.toUpperCase()}</th>\n`;
  });

  html += `
      </tr>
    </thead>
    <tbody>
`;

  rows.forEach((row) => {
    html += `      <tr class="rarityRow rarity-${row.key}">\n`;
    html += `        <td class="rarityName">${row.label}</td>\n`;

    stats.forEach((stat) => {
      const thresholds = statThresholds[stat];
      const min = thresholds?.[`${row.key}Min`];
      const max = thresholds?.[`${row.key}Max`];
      const valueText =
        typeof min === "number" && typeof max === "number"
          ? min === max
            ? `${min}`
            : `${min}-${max}`
          : "-";

      html += `        <td class="rarityValue">${valueText}</td>\n`;
    });

    html += "      </tr>\n";
  });

  html += `
    </tbody>
  </table>
</div>
`;

  return html;
}

function applyCardRarity(card, rarity) {
  if (!card) return;
  card.classList.remove("rarity-common", "rarity-rare", "rarity-epic", "rarity-legendary");
  card.classList.add(`rarity-${rarity}`);
}
