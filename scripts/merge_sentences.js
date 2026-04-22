// One-time script: merges the 4 per-language sentence files into
// data/sentences.json where each entry has all four language variants.
//
// Matching strategy:
//   - EN and ES are structurally identical (same count, same order).
//   - PL has only true sentences in the parsed output (false entries use
//     curly quotes that the old valRe missed — fixed here).
//   - PT has ~91 extra sentences and uses different ordering for GLA entries.
//   - Within the true-group and false-group separately we align by index
//     (sentence[i] in each file ≈ the same fact), padding with null when a
//     file runs shorter.

const fs   = require("fs");
const path = require("path");

// Fixed parser: also accepts curly „ quotes on the *value* field
// (needed for Polish false sentences, e.g. „jest": „fałsz").
function parseFile(text) {
  const results = [];
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  const nameRe = /^[„"](?:name|nombre)[”"]?\s*:\s*[„"](.+)/;
  const valRe  = /^[„"](?:is|es|jest)[”"]?\s*:\s*[„"]([^”"]+)/;

  let pendingName = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const nm = line.match(nameRe);
    if (nm) {
      let val = nm[1];
      val = val.replace(/[”"]+,?\s*$/, "");
      val = val.replace(/\\"/g, '"');
      val = val.replace(/[“”„‟]/g, '"');
      pendingName = val;
      continue;
    }

    const vm = line.match(valRe);
    if (vm && pendingName !== null) {
      const rawVal = vm[1].replace(/[”"]+,?\s*$/, "").trim();
      const isTrue =
        rawVal === "true" || rawVal === "verdadero" || rawVal === "prawda";
      results.push({ name: pendingName, isTrue });
      pendingName = null;
    }
  }

  return results;
}

const dataDir = path.join(__dirname, "..", "data");
const LANGS   = ["en", "pt", "es", "pl"];

const SOURCES = {
  en: "sentences_english.txt",
  pt: "sentences_portuguese.txt",
  es: "sentences_spanish.txt",
  pl: "sentences_polish.txt",
};

const parsed = {};
for (const lang of LANGS) {
  parsed[lang] = parseFile(
    fs.readFileSync(path.join(dataDir, SOURCES[lang]), "utf8")
  );
}

// Separate into true / false groups
const trueOf  = {};
const falseOf = {};
for (const lang of LANGS) {
  trueOf[lang]  = parsed[lang].filter(s =>  s.isTrue);
  falseOf[lang] = parsed[lang].filter(s => !s.isTrue);
}

// Merge one group: align by index, null when index exceeds a file's length
function mergeGroup(lists, isTrue) {
  const maxLen = Math.max(...LANGS.map(l => lists[l].length));
  const entries = [];
  for (let i = 0; i < maxLen; i++) {
    const entry = { is: isTrue };
    for (const lang of LANGS) {
      entry[lang] = i < lists[lang].length ? lists[lang][i].name : null;
    }
    entries.push(entry);
  }
  return entries;
}

const merged = [
  ...mergeGroup(trueOf,  true),
  ...mergeGroup(falseOf, false),
];

// Stats
console.log("Per-file stats (with fixed parser):");
for (const lang of LANGS) {
  const t = trueOf[lang].length;
  const f = falseOf[lang].length;
  console.log(`  ${lang}: total=${t + f}  true=${t}  false=${f}`);
}
console.log(`\nMerged entries: ${merged.length}`);
console.log(`  true : ${merged.filter(e => e.is).length}`);
console.log(`  false: ${merged.filter(e => !e.is).length}`);
for (const lang of LANGS) {
  const nulls = merged.filter(e => e[lang] === null).length;
  if (nulls) console.log(`  ${lang}: ${nulls} null entries (no translation at that position)`);
}

const outPath = path.join(dataDir, "sentences.json");
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf8");
console.log(`\nWrote ${outPath}`);
