(function initUpdateWarningModal() {
  const overlay = document.getElementById("update-warning-overlay");
  const titleEl = document.getElementById("update-warning-title");
  const textBox = document.getElementById("update-warning-text");
  const bodyEl = document.getElementById("update-warning-body");
  const hintEl = document.getElementById("update-warning-hint");
  const reopenBtn = document.getElementById("update-warning-reopen");
  const dontShowCb = document.getElementById("update-warning-dont-show-cb");
  const dontShowLabel = document.getElementById("update-warning-dont-show-label");

  if (!overlay || !titleEl || !textBox || !bodyEl || !hintEl || !reopenBtn) return;

  const LS_KEY = "update_warning_dismissed";

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
        reopenTitle: "Show warning again",
        dontShowLabel: "Don't show again"
      };
    }
    return all[active] || all.en || all.pt || Object.values(all)[0];
  }

  function getContentFingerprint(content) {
    return (content.body || "").slice(0, 60);
  }

  function isDismissed(content) {
    try {
      return window.localStorage && localStorage.getItem(LS_KEY) === getContentFingerprint(content);
    } catch (_err) {
      return false;
    }
  }

  function saveDismissed(content) {
    try {
      if (window.localStorage) localStorage.setItem(LS_KEY, getContentFingerprint(content));
    } catch (_err) {
      // Ignore storage access errors.
    }
  }

  function clearDismissed() {
    try {
      if (window.localStorage) localStorage.removeItem(LS_KEY);
    } catch (_err) {
      // Ignore storage access errors.
    }
  }

  function applyWarningContent() {
    const content = getWarningContent();
    titleEl.textContent = content.title || "⚠️ Important notice";
    bodyEl.textContent = content.body || "";
    hintEl.textContent = content.hint || "Click outside the text to close.";

    if (dontShowLabel) dontShowLabel.textContent = content.dontShowLabel || "Don't show again";

    const reopenTitle = content.reopenTitle || "Show warning again";
    reopenBtn.title = reopenTitle;
    reopenBtn.setAttribute("aria-label", reopenTitle);
  }

  window.updateWarningApplyTranslations = applyWarningContent;
  applyWarningContent();

  function showWarning() {
    if (dontShowCb) dontShowCb.checked = false;
    overlay.hidden = false;
    reopenBtn.hidden = true;
  }

  function hideWarning() {
    if (dontShowCb && dontShowCb.checked) {
      saveDismissed(getWarningContent());
    }
    overlay.hidden = true;
    reopenBtn.hidden = false;
  }

  textBox.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });

  textBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  if (dontShowCb && dontShowCb.closest("label")) {
    const dontShowLabelEl = dontShowCb.closest("label");
    dontShowLabelEl.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
    dontShowLabelEl.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  overlay.addEventListener("pointerdown", () => {
    hideWarning();
  });

  overlay.addEventListener("click", () => {
    hideWarning();
  });

  reopenBtn.addEventListener("click", () => {
    clearDismissed();
    showWarning();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      hideWarning();
    }
  });

  if (!isDismissed(getWarningContent())) {
    showWarning();
  }
})();
