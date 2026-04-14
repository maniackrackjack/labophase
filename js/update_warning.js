(function initUpdateWarningModal() {
  const overlay = document.getElementById("update-warning-overlay");
  const titleEl = document.getElementById("update-warning-title");
  const textBox = document.getElementById("update-warning-text");
  const bodyEl = document.getElementById("update-warning-body");
  const hintEl = document.getElementById("update-warning-hint");
  const reopenBtn = document.getElementById("update-warning-reopen");

  if (!overlay || !titleEl || !textBox || !bodyEl || !hintEl || !reopenBtn) return;

  function getActiveLanguage() {
    const htmlLang = (document.documentElement.getAttribute("lang") || "").trim().toLowerCase();
    if (htmlLang) return htmlLang;

    try {
      const stored = (window.localStorage && localStorage.getItem("lang")) || "";
      if (stored) return String(stored).trim().toLowerCase();
    } catch (_err) {
      // Ignore storage access errors.
    }

    return "en";
  }

  function getWarningContent() {
    const active = getActiveLanguage();
    const all = typeof UPDATE_WARNING_CONTENT === "object" && UPDATE_WARNING_CONTENT ? UPDATE_WARNING_CONTENT : null;
    if (!all) {
      return {
        title: "⚠️ Important notice",
        body: "Warning content file not found.",
        hint: "Click outside the text to close.",
        reopenTitle: "Show warning again"
      };
    }
    return all[active] || all.en || all.pt || Object.values(all)[0];
  }

  function applyWarningContent() {
    const content = getWarningContent();
    titleEl.textContent = content.title || "⚠️ Important notice";
    bodyEl.textContent = content.body || "";
    hintEl.textContent = content.hint || "Click outside the text to close.";

    const reopenTitle = content.reopenTitle || "Show warning again";
    reopenBtn.title = reopenTitle;
    reopenBtn.setAttribute("aria-label", reopenTitle);
  }

  window.updateWarningApplyTranslations = applyWarningContent;
  applyWarningContent();

  function showWarning() {
    overlay.hidden = false;
    reopenBtn.hidden = true;
  }

  function hideWarning() {
    overlay.hidden = true;
    reopenBtn.hidden = false;
  }

  textBox.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });

  textBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  overlay.addEventListener("pointerdown", () => {
    hideWarning();
  });

  overlay.addEventListener("click", () => {
    hideWarning();
  });

  reopenBtn.addEventListener("click", () => {
    showWarning();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      hideWarning();
    }
  });

  showWarning();
})();
