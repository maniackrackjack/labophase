const fs   = require("fs");
const path = require("path");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/sentences.json"), "utf8")
);

const LANGS = ["en", "pt", "es", "pl"];

for (const lang of LANGS) {
  const filled     = data.filter(e => e[lang] !== null && e[lang] !== undefined);
  const trueCount  = filled.filter(e => e.is).length;
  const falseCount = filled.filter(e => !e.is).length;
  console.log(`${lang}: total=${filled.length}  true=${trueCount}  false=${falseCount}`);
  if (filled.length > 0) {
    const first = filled.find(e => e[lang]);
    if (first) console.log(`  first: ${first[lang].slice(0, 80)}`);
    const falseSample = filled.find(e => !e.is && e[lang]);
    if (falseSample) console.log(`  false sample: ${falseSample[lang].slice(0, 80)}`);
  }
}

console.log(`\nTotal entries : ${data.length}`);
console.log(`  true entries : ${data.filter(e => e.is).length}`);
console.log(`  false entries: ${data.filter(e => !e.is).length}`);

for (const lang of LANGS) {
  const nulls = data.filter(e => e[lang] === null || e[lang] === undefined).length;
  if (nulls) console.log(`  ${lang}: ${nulls} entries with no translation at that position`);
}
