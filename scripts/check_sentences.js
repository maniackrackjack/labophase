const fs = require("fs");
function parseText(text) {
  const results = [];
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const nameRe = /^[\u201e"](?:name|nombre)[\u201d"]?\s*:\s*[\u201e"](.+)/;
  const valRe  = /^"(?:is|es|jest)"\s*:\s*"([^"]+)"/;
  let pendingName = null;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const nm = line.match(nameRe);
    if (nm) {
      let val = nm[1].replace(/[\u201d"]+,?\s*$/, "").replace(/\\"/g, '"').replace(/[\u201c\u201d\u201e\u201f]/g, '"');
      pendingName = val;
      continue;
    }
    const vm = line.match(valRe);
    if (vm && pendingName !== null) {
      const rawVal = vm[1];
      const isTrue = rawVal === "true" || rawVal === "verdadero" || rawVal === "prawda";
      results.push({ name: pendingName, isTrue });
      pendingName = null;
    }
  }
  return results;
}

const files = {
  en: "data/sentences_english.txt",
  pt: "data/sentences_portuguese.txt",
  es: "data/sentences_spanish.txt",
  pl: "data/sentences_polish.txt"
};
for (const [lang, path] of Object.entries(files)) {
  const raw = fs.readFileSync(path, "utf8");
  const arr = parseText(raw);
  const trueCount  = arr.filter(x => x.isTrue).length;
  const falseCount = arr.filter(x => !x.isTrue).length;
  console.log(lang, "total:", arr.length, "  true:", trueCount, "  false:", falseCount);
  if (arr.length > 0) {
    console.log("  first:", arr[0].name.slice(0, 80));
    const falseSample = arr.find(x => !x.isTrue);
    if (falseSample) console.log("  false sample:", falseSample.name.slice(0, 80));
  }
}
