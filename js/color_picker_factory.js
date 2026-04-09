// ============================================================
// Color Picker Factory - reusable Pickr wrapper
// ============================================================

(function initColorPickerFactory(globalScope) {
  function normalizeHexColor(value, fallback) {
    const fb = fallback || '#6a4a20';
    const raw = String(value || '').trim();
    if (!raw) return fb;

    const normalized = raw.startsWith('#') ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(normalized)) return normalized.toLowerCase();
    if (/^#[0-9a-fA-F]{3}$/.test(normalized)) {
      return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`.toLowerCase();
    }
    return fb;
  }

  function clampChannel(value) {
    return Math.max(0, Math.min(255, Number(value) || 0));
  }

  function hexToRgb(hex, fallback) {
    const value = normalizeHexColor(hex, fallback || '#6a4a20');
    return {
      r: parseInt(value.slice(1, 3), 16),
      g: parseInt(value.slice(3, 5), 16),
      b: parseInt(value.slice(5, 7), 16),
    };
  }

  function rgbToHex(r, g, b) {
    return `#${clampChannel(r).toString(16).padStart(2, '0')}${clampChannel(g).toString(16).padStart(2, '0')}${clampChannel(b).toString(16).padStart(2, '0')}`;
  }

  function createColorPicker(options) {
    if (!options || !options.el || !globalScope.Pickr) return null;

    const theme = options.theme || 'nano';
    const defaultColor = normalizeHexColor(options.defaultColor, '#6a4a20');
    const swatches = Array.isArray(options.swatches) ? options.swatches : [];

    const picker = globalScope.Pickr.create({
      el: options.el,
      theme,
      default: defaultColor,
      inline: !!options.inline,
      showAlways: !!options.showAlways,
      swatches,
      components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          save: false,
          cancel: false,
        },
      },
    });

    if (typeof options.onChange === 'function') {
      picker.on('change', (color) => {
        if (!color) return;
        options.onChange(normalizeHexColor(color.toHEXA().toString(), defaultColor));
      });
    }

    return picker;
  }

  function destroyColorPicker(picker) {
    if (!picker) return;
    try { picker.destroyAndRemove(); } catch (_err) {}
  }

  globalScope.ColorPickerFactory = {
    create: createColorPicker,
    destroy: destroyColorPicker,
    normalizeHexColor,
    hexToRgb,
    rgbToHex,
  };
})(window);
