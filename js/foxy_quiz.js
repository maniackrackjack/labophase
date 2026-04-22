// ============================================================
// Foxy Quiz — sentence true/false search
// ============================================================

const FOXY_QUIZ_FILE = "data/sentences.json";

let foxyQuizSentences = [];
let foxyQuizLoaded    = false;
let foxyQuizBound     = false;
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

  if (typeof trackerGetSharedFoxyQuizWeeklyChecked === "function") {
    return { resetKey, checked: !!trackerGetSharedFoxyQuizWeeklyChecked() };
  }

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
  if (typeof trackerSetSharedFoxyQuizWeeklyChecked === "function") {
    trackerSetSharedFoxyQuizWeeklyChecked(!!checked);
    return;
  }

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

function foxyQuizUpdateWeeklyVisualState(checked) {
  const wrap = document.querySelector(".foxy-quiz-weekly-wrap");
  if (!wrap) return;
  wrap.classList.toggle("is-checked", !!checked);
}

function foxyQuizSyncWeeklyCheckbox() {
  const checkbox = document.getElementById("foxy-quiz-weekly-checkbox");
  if (!checkbox) return;
  const state = foxyQuizLoadWeeklyState();
  checkbox.checked = !!state.checked;
  foxyQuizUpdateWeeklyVisualState(checkbox.checked);

  if (typeof trackerSetSharedFoxyQuizWeeklyChecked === "function") {
    trackerSetSharedFoxyQuizWeeklyChecked(checkbox.checked, { silent: true });
  } else {
    // Persist normalized state in case key rolled over this week.
    foxyQuizSaveWeeklyState(checkbox.checked);
  }
}

async function foxyQuizLoadSentences() {
  try {
    const resp = await fetch(FOXY_QUIZ_FILE);
    if (!resp.ok) throw new Error("HTTP " + resp.status + " loading " + FOXY_QUIZ_FILE);
    foxyQuizSentences = await resp.json();
    foxyQuizLoaded = true;
  } catch (err) {
    foxyQuizSentences = [];
    foxyQuizLoaded = false;
    console.error("Foxy Quiz: could not load sentences:", err);
  }
}

// Returns the display text for a sentence in the active language,
// falling back through other languages if the entry has no translation.
function foxyQuizGetText(s) {
  const lang = (typeof currentLang !== "undefined" ? currentLang : null) || "en";
  return s[lang] || s.en || s.pt || s.es || s.pl || "";
}

function foxyQuizEscapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Normalize string by removing accents (é->e, á->a, etc)
function foxyQuizNormalizeString(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function foxyQuizFilter(query) {
  if (!query || !query.trim()) return null;
  const normalizedQuery = foxyQuizNormalizeString(query);
  const terms = normalizedQuery.split(/\s+/);
  return foxyQuizSentences.filter((s) => {
    const text = foxyQuizGetText(s);
    return terms.every((term) => foxyQuizNormalizeString(text).includes(term));
  });
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
      const cls     = s.is ? "is-true" : "is-false";
      const iconSrc = s.is ? "sprites/ui/foxy_quiz/true_icon.png" : "sprites/ui/foxy_quiz/false_icon.png";
      const iconAlt = foxyQuizEscapeHtml(t(s.is ? "foxyQuizTrue" : "foxyQuizFalse"));
      const text    = foxyQuizGetText(s);
      return (
        `<div class="foxy-quiz-sentence ${cls}">` +
        `<img class="foxy-quiz-icon" src="${iconSrc}" alt="${iconAlt}" title="${iconAlt}">` +
        `<span class="foxy-quiz-text">${foxyQuizEscapeHtml(text)}</span>` +
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

  // Language changed: re-render with the new active language.
  // No file reload needed — all languages are in the single sentences.json.
  foxyQuizUpdateResults();
}

async function foxyQuizInit() {
  if (!foxyQuizLoaded) {
    await foxyQuizLoadSentences();
  }

  if (!foxyQuizBound) {
    foxyQuizBound = true;
    const input  = document.getElementById("foxy-quiz-input");
    const weekly = document.getElementById("foxy-quiz-weekly-checkbox");
    if (input) {
      input.addEventListener("input", foxyQuizUpdateResults);
    }
    if (weekly) {
      weekly.addEventListener("change", () => {
        foxyQuizSaveWeeklyState(weekly.checked);
        foxyQuizUpdateWeeklyVisualState(weekly.checked);
      });
    }
  }

  foxyQuizSyncWeeklyCheckbox();
  foxyQuizApplyTranslations();
  foxyQuizUpdateResults();
}
