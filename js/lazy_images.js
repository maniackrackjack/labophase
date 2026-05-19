// ============================================================
// Lazy image bootstrapper
// Applies loading="lazy" + decoding="async" to every image except
// those in the always-visible sidebar (logo + tab icons). Runs once
// on initial DOM, then watches for JS-generated images and patches
// them as they appear.
// ============================================================

(function () {
  const SKIP_SELECTOR = ".sidebar img, .mobile-menu-toggle img";

  function patchImg(img) {
    if (!img || img.dataset.lazyPatched === "1") return;
    if (img.matches(SKIP_SELECTOR)) return;
    img.dataset.lazyPatched = "1";
    if (!img.hasAttribute("loading"))  img.setAttribute("loading",  "lazy");
    if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
  }

  function patchAll(root) {
    if (!root) return;
    if (root.nodeType === 1 && root.tagName === "IMG") {
      patchImg(root);
      return;
    }
    if (root.querySelectorAll) {
      root.querySelectorAll("img").forEach(patchImg);
    }
  }

  function init() {
    patchAll(document.body);

    if (typeof MutationObserver !== "function") return;

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        for (const node of r.addedNodes) {
          if (node.nodeType === 1) patchAll(node);
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
