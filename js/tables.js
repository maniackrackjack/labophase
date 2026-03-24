// ============================================================
// Tables — generate the item reference tables tab
// ============================================================

function gerarTabelas() {
  let html = "";

  for (let key in itens) {
    let item = itens[key];
    let recomendado = recomendados[key];
    let combos = combosValidos[key];

    let minStats = Object.values(item.min).join("/");
    let maxStats = Object.values(item.max).join("/");

    html += `
<div class="tableItem">

<img class="tableIcon" src="${item.icon}">

<div class="tableName">
${item.nome}
</div>

<div class="tableStats">

<span class="statMin">
${t("minimum")} : ${minStats}
</span>

<br>

<span class="statRec">
${t("recommended")} : ${recomendado}
</span>

<br>

<span class="statMax">
${t("maximum")} : ${maxStats}
</span>

</div>
`;

    html += buildRarityThresholdTable(key, item);

    if (combos) {
      html += `
<div class="comboTableTitle">${t("comboTableTitle")}</div>
<table class="comboTable">
<tbody>
`;

      combos.forEach((c) => {
        const comboStr = comboToRangeString(item, c);
        const { totalCrystals } = getComboInfo(item, c);
        const title = t("requiresCrystals").replace("{n}", totalCrystals);

        html += `
<tr title="${title}">
<td>
  <span class="comboRange">${comboStr}</span>
  <span class="comboReq">(${title})</span>
</td>
</tr>
`;
      });

      html += `
</tbody>
</table>
`;
    } else {
      html += `
<div class="singleStat">${t("singleStat")}</div>
`;
    }

    html += `</div>`;
  }

  tablesArea.innerHTML = html;
}
