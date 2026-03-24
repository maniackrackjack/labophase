// ============================================================
// Combos — crystal needs, combo math, segment bar drawing
// ============================================================

function getCrystalNeeds(item, values) {
  const statsArr = Object.keys(item.max);
  return statsArr.map((stat, idx) => {
    const val = values[idx];
    const falt = item.max[stat] - val;
    return Math.ceil(falt / item.gain[stat]);
  });
}

function getComboInfo(item, combo) {
  const values = combo.split("/").map((v) => parseInt(v, 10));
  const needs = getCrystalNeeds(item, values);
  return { values, needs, totalCrystals: Math.max(...needs) };
}

function getStatRangeForNeed(item, stat, need) {
  const max = item.max[stat];
  const gain = item.gain[stat];

  const min = max - need * gain;
  const maxVal = max - (need - 1) * gain - 1;

  return { min, max: maxVal };
}

function formatRange(min, max) {
  return min === max ? `${min}` : `${min}–${max}`;
}

function comboToRangeString(item, combo) {
  const { needs } = getComboInfo(item, combo);
  const stats = Object.keys(item.max);

  const parts = stats.map((stat, idx) => {
    const { min, max } = getStatRangeForNeed(item, stat, needs[idx]);
    return formatRange(min, max);
  });

  return parts.join("/");
}

function normalizeCombo(combo) {
  if (typeof combo !== "string") return combo;

  return combo.split("/").map((part) => {
    // Accept formats like "394–408" and "394-408" or simple "394"
    const match = part.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  });
}

function statsCombinam(tipo, stats) {
  const lista = combosValidos[tipo];
  const item = itens[tipo];

  if (!lista || !item) return null;

  const currentNeeds = getCrystalNeeds(item, Object.values(stats));

  return lista.some((combo) => {
    const comboNeeds = getCrystalNeeds(item, normalizeCombo(combo));
    return comboNeeds.every((n, i) => n === currentNeeds[i]);
  });
}

function desenharBarra(barId, totalCristais, usados) {
  let bar = document.getElementById(barId);

  if (!bar) return;

  let html = "";

  for (let i = 0; i < totalCristais; i++) {
    if (i < usados) html += `<div class="crystal active"></div>`;
    else html += `<div class="crystal"></div>`;
  }

  bar.innerHTML = html;
}
