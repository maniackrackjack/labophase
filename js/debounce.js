// ============================================================
// Debounce helpers — small global utilities for high-frequency events
// ============================================================

(function (g) {
  // Trailing-edge debounce: fires `fn` after `wait` ms of inactivity.
  // Returns a function with `.cancel()` to drop the pending call.
  function debounce(fn, wait) {
    let t = null;
    function debounced() {
      const args = arguments;
      const self = this;
      if (t !== null) clearTimeout(t);
      t = setTimeout(function () {
        t = null;
        fn.apply(self, args);
      }, wait);
    }
    debounced.cancel = function () {
      if (t !== null) {
        clearTimeout(t);
        t = null;
      }
    };
    return debounced;
  }

  // requestAnimationFrame coalescer: collapses bursts of calls to a
  // single rAF tick (good for resize/scroll where we want to keep
  // visual sync but avoid 60+ executions per second).
  function rafThrottle(fn) {
    let pending = false;
    let lastArgs = null;
    let lastSelf = null;
    return function () {
      lastArgs = arguments;
      lastSelf = this;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        fn.apply(lastSelf, lastArgs);
      });
    };
  }

  g.debounce = g.debounce || debounce;
  g.rafThrottle = g.rafThrottle || rafThrottle;
})(typeof window !== "undefined" ? window : globalThis);
