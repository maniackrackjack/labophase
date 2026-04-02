// ============================================================
// Foxy Quiz — sentence true/false search
// ============================================================

const FOXY_QUIZ_FILES = {
  pt: "data/sentences_portuguese.txt",
  en: "data/sentences_english.txt",
  es: "data/sentences_spanish.txt",
  pl: "data/sentences_polish.txt"
};

let foxyQuizSentences = [];
let foxyQuizLoadedLang = null;
let foxyQuizBound = false;
const FOXY_QUIZ_WEEKLY_KEY = "labophase.foxyQuiz.weekly";

function foxyQuizGetWeeklyResetKey(now = new Date()) {
  const ref = new Date(now);
  const day = ref.getDay(); // 0=Sun ... 5=Fri
  const daysSinceFriday = (day - 5 + 7) % 7;
  const lastFriday = new Date(ref);
  lastFriday.setDate(ref.getDate() - daysSinceFriday);
  lastFriday.setHours(0, 1, 0, 0);

  // Before Friday 00:01, stay on previous week's key.
  if (ref < lastFriday) {
    lastFriday.setDate(lastFriday.getDate() - 7);
  }

  const y = lastFriday.getFullYear();
  const m = String(lastFriday.getMonth() + 1).padStart(2, "0");
  const d = String(lastFriday.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function foxyQuizLoadWeeklyState() {
  const resetKey = foxyQuizGetWeeklyResetKey();
  try {
    const raw = window.localStorage ? localStorage.getItem(FOXY_QUIZ_WEEKLY_KEY) : "";
    if (!raw) return { resetKey, checked: false };
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.resetKey !== resetKey) {
      return { resetKey, checked: false };
    }
    return { resetKey, checked: !!parsed.checked };
  } catch (_err) {
    return { resetKey, checked: false };
  }
}

function foxyQuizSaveWeeklyState(checked) {
  const state = {
    resetKey: foxyQuizGetWeeklyResetKey(),
    checked: !!checked
  };
  try {
    if (window.localStorage) {
      localStorage.setItem(FOXY_QUIZ_WEEKLY_KEY, JSON.stringify(state));
    }
  } catch (_err) {
    // Ignore storage failures.
  }
}

function foxyQuizSyncWeeklyCheckbox() {
  const checkbox = document.getElementById("foxy-quiz-weekly-checkbox");
  if (!checkbox) return;
  const state = foxyQuizLoadWeeklyState();
  checkbox.checked = !!state.checked;
  // Persist normalized state in case key rolled over this week.
  foxyQuizSaveWeeklyState(checkbox.checked);
}

// Robust line-by-line parser that handles:
//  - Truncated JSON (missing closing bracket)
//  - Missing commas between properties (Spanish)
//  - Curly/typographic quote delimiters with inner straight quotes (Polish)
//  - All field-name variants across languages: name/nombre, is/es/jest
function foxyQuizParseText(text) {
  const results = [];
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  // Matches: "name"/"nombre"/„name" : "value...  (value goes to end of line)
  // Opening key quote: straight " or „ (U+201E)
  // Closing key quote: straight " or " (U+201D), optional for curly-quote files
  const nameRe = /^[\u201e"](?:name|nombre)[\u201d"]?\s*:\s*[\u201e"](.+)/;
  // Matches: "is"/"es"/"jest" : "VALUE"
  const valRe  = /^"(?:is|es|jest)"\s*:\s*"([^"]+)"/;

  let pendingName = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const nameMatch = line.match(nameRe);
    if (nameMatch) {
      let val = nameMatch[1];
      // Strip trailing closing delimiter (curly " U+201D or straight ") plus optional comma
      val = val.replace(/[\u201d"]+,?\s*$/, "");
      // Unescape JSON-escaped quotes that appear in well-formed files
      val = val.replace(/\\"/g, '"');
      // Convert any remaining curly/typographic quotes (e.g. inner „skill name") to straight
      val = val.replace(/[\u201c\u201d\u201e\u201f]/g, '"');
      pendingName = val;
      continue;
    }

    const valMatch = line.match(valRe);
    if (valMatch && pendingName !== null) {
      const rawVal = valMatch[1];
      const isTrue = rawVal === "true" || rawVal === "verdadero" || rawVal === "prawda";
      results.push({ name: pendingName, isTrue });
      pendingName = null;
    }
  }

  return results;
}

async function foxyQuizLoadSentences(lang) {
  const file = FOXY_QUIZ_FILES[lang] || FOXY_QUIZ_FILES.en;
  try {
    const resp = await fetch(file);
    if (!resp.ok) throw new Error("HTTP " + resp.status + " loading " + file);
    const text = await resp.text();
    foxyQuizSentences = foxyQuizParseText(text);
    foxyQuizLoadedLang = lang;
  } catch (err) {
    foxyQuizSentences = [];
    foxyQuizLoadedLang = lang;
    console.error("Foxy Quiz: could not load sentences:", err);
  }
}

function foxyQuizEscapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function foxyQuizFilter(query) {
  if (!query || !query.trim()) return null;
  const terms = query.trim().toLowerCase().split(/\s+/);
  return foxyQuizSentences.filter((s) =>
    terms.every((term) => s.name.toLowerCase().includes(term))
  );
}

function foxyQuizRender(filtered) {
  const container = document.getElementById("foxy-quiz-results");
  if (!container) return;

  // null means no query — show nothing
  if (filtered === null) {
    container.innerHTML = "";
    return;
  }

  if (filtered.length === 0) {
    container.innerHTML =
      `<div class="foxy-quiz-empty">${foxyQuizEscapeHtml(t("foxyQuizNoResults"))}</div>`;
    return;
  }

  container.innerHTML = filtered
    .map((s) => {
      const cls = s.isTrue ? "is-true" : "is-false";
      const iconSrc = s.isTrue ? "sprites/ui/foxy_quiz/true_icon.png" : "sprites/ui/foxy_quiz/false_icon.png";
      const iconAlt = foxyQuizEscapeHtml(t(s.isTrue ? "foxyQuizTrue" : "foxyQuizFalse"));
      return (
        `<div class="foxy-quiz-sentence ${cls}">` +
        `<img class="foxy-quiz-icon" src="${iconSrc}" alt="${iconAlt}" title="${iconAlt}">` +
        `<span class="foxy-quiz-text">${foxyQuizEscapeHtml(s.name)}</span>` +
        `</div>`
      );
    })
    .join("");
}

function foxyQuizUpdateResults() {
  const input = document.getElementById("foxy-quiz-input");
  const query = input ? input.value : "";
  foxyQuizRender(foxyQuizFilter(query));
}

function foxyQuizApplyTranslations() {
  const input = document.getElementById("foxy-quiz-input");
  if (input) {
    input.placeholder = t("foxyQuizSearchPlaceholder");
    input.title = t("foxyQuizTooltip");
  }

  // If the language changed while the quiz was loaded, reload sentences
  const activeLang = (typeof currentLang !== "undefined" ? currentLang : null) || "en";
  if (foxyQuizLoadedLang && foxyQuizLoadedLang !== activeLang) {
    foxyQuizLoadSentences(activeLang).then(() => foxyQuizUpdateResults());
  }
}

async function foxyQuizInit() {
  const activeLang = (typeof currentLang !== "undefined" ? currentLang : null) || "en";

  if (foxyQuizLoadedLang !== activeLang) {
    await foxyQuizLoadSentences(activeLang);
  }

  if (!foxyQuizBound) {
    foxyQuizBound = true;
    const input = document.getElementById("foxy-quiz-input");
    const weekly = document.getElementById("foxy-quiz-weekly-checkbox");
    if (input) {
      input.addEventListener("input", foxyQuizUpdateResults);
    }
    if (weekly) {
      weekly.addEventListener("change", () => {
        foxyQuizSaveWeeklyState(weekly.checked);
      });
    }
  }

  foxyQuizSyncWeeklyCheckbox();
  foxyQuizApplyTranslations();
  foxyQuizUpdateResults();
}
