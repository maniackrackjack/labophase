// ============================================================
// Profiles - global profile system (modal-based)
// ============================================================

let suppressAutoSave = false;

// ------------------------------------------------------------
// App state helpers
// ------------------------------------------------------------

function getAppState() {
  return {
    version: 1,
    build: getBuildState(),
    characters: typeof getCharactersState === 'function' ? getCharactersState() : null,
    boats: typeof getBoatsState === 'function' ? getBoatsState() : null,
    islandChests: typeof getIslandChestsState === 'function' ? getIslandChestsState() : null,
  };
}

function isCombinedAppState(state) {
  return !!state && typeof state === 'object' && !Array.isArray(state)
    && (Object.prototype.hasOwnProperty.call(state, 'build')
      || Object.prototype.hasOwnProperty.call(state, 'characters')
      || Object.prototype.hasOwnProperty.call(state, 'boats')
      || Object.prototype.hasOwnProperty.call(state, 'islandChests'));
}

function applyAppState(state) {
  const buildState = isCombinedAppState(state) ? state.build : state;
  const charactersState = isCombinedAppState(state) ? state.characters : null;
  const boatsState = isCombinedAppState(state) ? state.boats : null;
  const islandChestsState = isCombinedAppState(state) ? state.islandChests : null;

  applyBuildState(buildState);

  if (typeof applyCharactersState === 'function') {
    if (charactersState) applyCharactersState(charactersState);
    else resetCharactersState();
  }

  if (typeof applyBoatsState === 'function') {
    if (boatsState) applyBoatsState(boatsState);
    else resetBoatsState();
  }

  if (typeof applyIslandChestsState === 'function') {
    if (islandChestsState) applyIslandChestsState(islandChestsState);
    else applyIslandChestsState(null);
  }
}

// ------------------------------------------------------------
// Auto-save (called on every change in any tab)
// ------------------------------------------------------------

function autoSaveBuild() {
  if (suppressAutoSave) return;
  const state = getAppState();
  saveBuildState(state);
}

function saveProfile() {
  const state = getAppState();
  saveBuildState(state);
  showToast(t('saveProfileSuccess'));
}

function saveBuildState(state) {
  const profiles = getProfilesStorage();
  const profileName = getCurrentProfileName();
  profiles[profileName] = profiles[profileName] || { buildState: null };
  profiles[profileName].buildState = state;
  setProfilesStorage(profiles);
}

function loadBuild() {
  const profile = getCurrentProfile();
  if (!profile) return;

  if (!profile.buildState) {
    clearBuild();
    return;
  }

  try {
    applyAppState(profile.buildState);
  } catch (err) {
    console.error('Failed to load saved build', err);
  }
}

// ------------------------------------------------------------
// Share / URL helpers
// ------------------------------------------------------------

function shareBuild() {
  const state = getAppState();
  const json = JSON.stringify(state);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const url = `${window.location.origin}${window.location.pathname}#build=${encoded}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(t('shareBuildCopied'));
    });
  } else {
    const reply = prompt(t('shareBuildPrompt'), url);
    if (reply !== null) showToast(t('shareBuildCopied'));
  }
}

function loadBuildFromUrl() {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#build=')) return false;

  const encoded = hash.replace('#build=', '');
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const state = JSON.parse(json);
    applyAppState(state);
    return true;
  } catch (err) {
    console.error('Failed to load build from URL', err);
    return false;
  }
}

// ------------------------------------------------------------
// Storage helpers
// ------------------------------------------------------------

function getProfilesStorage() {
  if (!storage) return {};
  const raw = storage.getItem('glacProfiles');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse profiles', err);
    return {};
  }
}

function setProfilesStorage(profiles) {
  if (!storage) return;
  storage.setItem('glacProfiles', JSON.stringify(profiles));
}

function getCurrentProfileName() {
  if (!storage) return 'default';
  return storage.getItem('glacCurrentProfile') || 'default';
}

function setCurrentProfileName(name) {
  if (!storage) return;
  storage.setItem('glacCurrentProfile', name);
}

function getCurrentProfile() {
  const profiles = getProfilesStorage();
  const name = getCurrentProfileName();
  if (!profiles[name]) {
    profiles[name] = { buildState: null };
    setProfilesStorage(profiles);
  }
  return profiles[name];
}

function setCurrentProfile(profileName) {
  const profiles = getProfilesStorage();
  if (!profiles[profileName]) {
    profiles[profileName] = { buildState: null };
  }
  setProfilesStorage(profiles);
  setCurrentProfileName(profileName);
}

// Stub kept for back-compat (boost.js may call this)
function updateProfileDropdown() {}

// ------------------------------------------------------------
// Profile Modal
// ------------------------------------------------------------

let _profileModalEl = null;
let _profileSubformMode = null; // 'create' | 'edit' | null
let _profileColorPickr = null;
const _profileColorFactory = window.ColorPickerFactory;

function _normalizeHexColor(value) {
  return _profileColorFactory.normalizeHexColor(value, '#8b6a30');
}

function _hexToRgb(hex) {
  return _profileColorFactory.hexToRgb(hex, '#8b6a30');
}

function _rgbToHex(r, g, b) {
  return _profileColorFactory.rgbToHex(r, g, b);
}

function _updateProfileLivePreview() {
  const name = (document.getElementById('profile-form-name')?.value || '').trim() || t('profileBtn');
  const emoji = (document.getElementById('profile-form-emoji')?.value || '').trim() || String.fromCodePoint(0x1F464);
  const color = _normalizeHexColor(document.getElementById('profile-form-color')?.value || '#8b6a30');

  const nameEl = document.getElementById('profile-live-preview-name');
  const emojiEl = document.getElementById('profile-live-preview-emoji');
  const colorEl = document.getElementById('profile-live-preview-color');

  if (nameEl) nameEl.textContent = name;
  if (emojiEl) emojiEl.textContent = emoji;
  if (colorEl) colorEl.style.background = color;
}

function _setProfileEmojiValue(emoji) {
  const value = (emoji || '').trim() || String.fromCodePoint(0x1F464);
  const input = document.getElementById('profile-form-emoji');
  const trigger = document.getElementById('profile-emoji-trigger');
  if (input) input.value = value;
  if (trigger) trigger.textContent = value;
  _updateProfileLivePreview();
}

function _setProfileColorValue(color, syncPickr = true) {
  const value = _normalizeHexColor(color);
  const input = document.getElementById('profile-form-color');
  const preview = document.getElementById('profile-color-preview');
  const hexInput = document.getElementById('profile-color-hex');
  const rInput = document.getElementById('profile-color-r');
  const gInput = document.getElementById('profile-color-g');
  const bInput = document.getElementById('profile-color-b');

  if (input) input.value = value;
  if (preview) preview.style.background = value;
  if (hexInput) hexInput.value = value;

  const rgb = _hexToRgb(value);
  if (rInput) rInput.value = String(rgb.r);
  if (gInput) gInput.value = String(rgb.g);
  if (bInput) bInput.value = String(rgb.b);

  if (syncPickr && _profileColorPickr && _profileColorPickr.getColor()?.toHEXA().toString().toLowerCase() !== value) {
    _profileColorPickr.setColor(value, true);
  }

  _updateProfileLivePreview();
}

function _setEmojiPopoverOpen(isOpen) {
  const popover = document.getElementById('profile-emoji-popover');
  const trigger = document.getElementById('profile-emoji-trigger');
  if (!popover || !trigger) return;
  popover.style.display = isOpen ? 'block' : 'none';
  trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function _applyEmojiPickerLocale() {
  const emojiPicker = document.getElementById('profile-emoji-picker');
  if (!emojiPicker) return;

  const activeLang = (typeof currentLang === 'string' && currentLang) ? currentLang : 'en';
  const localeMap = {
    pt: 'pt',
    en: 'en',
    es: 'es',
    pl: 'pl',
  };

  const locale = localeMap[activeLang] || 'en';
  emojiPicker.setAttribute('locale', locale);
}

function _initProfileVisualPickers() {
  const trigger = document.getElementById('profile-emoji-trigger');
  const popover = document.getElementById('profile-emoji-popover');
  const emojiPicker = document.getElementById('profile-emoji-picker');
  const colorInput = document.getElementById('profile-form-color');
  const colorPickrMount = document.getElementById('profile-color-pickr');
  const hexInput = document.getElementById('profile-color-hex');
  const rInput = document.getElementById('profile-color-r');
  const gInput = document.getElementById('profile-color-g');
  const bInput = document.getElementById('profile-color-b');
  const nameInput = document.getElementById('profile-form-name');
  if (!trigger || !popover || !emojiPicker || !colorInput || !colorPickrMount) return;

  if (trigger.dataset.boundProfilePicker !== '1') {
    trigger.dataset.boundProfilePicker = '1';
    trigger.addEventListener('click', function() {
      const isOpen = popover.style.display === 'block';
      _setEmojiPopoverOpen(!isOpen);
    });
  }

  if (emojiPicker.dataset.boundProfilePicker !== '1') {
    emojiPicker.dataset.boundProfilePicker = '1';
    emojiPicker.addEventListener('emoji-click', function(event) {
      const value = event?.detail?.unicode || String.fromCodePoint(0x1F464);
      _setProfileEmojiValue(value);
      _setEmojiPopoverOpen(false);
    });
  }

  if (!_profileColorPickr) {
    _profileColorPickr = _profileColorFactory.create({
      el: '#profile-color-pickr',
      theme: 'nano',
      defaultColor: '#8b6a30',
      inline: true,
      showAlways: false,
      swatches: ['#8b6a30', '#c97a27', '#bf3b2b', '#6f3bbf', '#2f5fb8', '#1f8a70', '#3d3d3d', '#f0c341'],
      onChange: (color) => _setProfileColorValue(color, false),
    });
  }

  const onRgbInput = function() {
    _setProfileColorValue(_rgbToHex(rInput?.value, gInput?.value, bInput?.value));
  };

  if (hexInput && hexInput.dataset.boundProfilePicker !== '1') {
    hexInput.dataset.boundProfilePicker = '1';
    hexInput.addEventListener('input', function() {
      const raw = String(hexInput.value || '').trim();
      if (!raw) return;
      if (/^#?[0-9a-fA-F]{3}$/.test(raw) || /^#?[0-9a-fA-F]{6}$/.test(raw)) {
        _setProfileColorValue(raw);
      }
    });
    hexInput.addEventListener('blur', function() {
      _setProfileColorValue(hexInput.value || '#8b6a30');
    });
  }

  [rInput, gInput, bInput].forEach((inputEl) => {
    if (!inputEl || inputEl.dataset.boundProfilePicker === '1') return;
    inputEl.dataset.boundProfilePicker = '1';
    inputEl.addEventListener('input', onRgbInput);
  });

  if (nameInput && nameInput.dataset.boundProfilePreview !== '1') {
    nameInput.dataset.boundProfilePreview = '1';
    nameInput.addEventListener('input', _updateProfileLivePreview);
  }

  if (document.body.dataset.boundProfilePickerOutside !== '1') {
    document.body.dataset.boundProfilePickerOutside = '1';
    document.addEventListener('click', function(e) {
      const emojiSelector = e.target.closest('.profile-emoji-selector');
      if (!emojiSelector) _setEmojiPopoverOpen(false);
    });
  }
}

function getProfileModalEl() {
  if (!_profileModalEl) {
    _profileModalEl = document.getElementById('profile-modal-overlay');
  }
  return _profileModalEl;
}

function openProfileModal() {
  const overlay = getProfileModalEl();
  if (!overlay) return;
  saveBuildState(getAppState());
  renderProfileList();
  hideProfileSubform();
  overlay.classList.add('is-open');
}

function closeProfileModal() {
  const overlay = getProfileModalEl();
  if (!overlay) return;
  overlay.classList.remove('is-open');
  _setEmojiPopoverOpen(false);
  _profileSubformMode = null;
}

function _renderProfileSidebarButton() {
  const btn = document.getElementById('profile-sidebar-btn');
  const iconEl = document.getElementById('profile-btn-icon');
  const titleEl = document.getElementById('profile-btn-title');
  const nameEl = document.getElementById('profile-btn-name');
  const colorEl = document.getElementById('profile-btn-color');
  if (!btn || !iconEl || !titleEl || !nameEl || !colorEl) return;

  const currentName = getCurrentProfileName();
  const profiles = getProfilesStorage();
  const profile = profiles[currentName] || {};

  const emoji = (typeof profile.emoji === 'string' && profile.emoji.trim())
    ? profile.emoji.trim()
    : String.fromCodePoint(0x1F464);
  const color = (typeof profile.color === 'string' && profile.color)
    ? _normalizeHexColor(profile.color)
    : '#6a4a20';

  iconEl.textContent = emoji;
  titleEl.textContent = t('profileBtn');
  nameEl.textContent = currentName || t('profileBtn');
  colorEl.style.background = color;

  btn.style.setProperty('border-color', color);
  btn.style.setProperty('box-shadow', `0 0 0 1px ${color}33`);
  btn.setAttribute('title', `${t('profileBtn')}: ${nameEl.textContent}`);
}

function renderProfileList() {
  const listEl = document.getElementById('profile-card-list');
  const emptyEl = document.getElementById('profile-empty-msg');
  if (!listEl) return;

  const profiles = getProfilesStorage();
  const names = Object.keys(profiles);
  const current = getCurrentProfileName();

  listEl.innerHTML = '';

  if (!names.length) {
    if (emptyEl) emptyEl.style.display = '';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  names.forEach((name) => {
    const prof = profiles[name] || {};
    const emoji = (typeof prof.emoji === 'string' && prof.emoji.trim()) ? prof.emoji.trim() : String.fromCodePoint(0x1F464);
    const color = (typeof prof.color === 'string' && prof.color) ? prof.color : '#6a4a20';
    const isActive = name === current;

    const card = document.createElement('div');
    card.className = 'profile-card' + (isActive ? ' is-active' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    card.dataset.profileName = name;

    const emojiDisplay = emoji;

    card.innerHTML =
      '<div class="profile-card-emoji">' + _escHtml(emojiDisplay) + '</div>' +
      '<div class="profile-card-info">' +
        '<div class="profile-card-name">' + _escHtml(name) + '</div>' +
        '<div class="profile-card-active-badge">' + _escHtml(t('profileActiveLabel')) + '</div>' +
      '</div>' +
      '<div class="profile-card-swatch" style="background:' + _escHtml(color) + '"></div>';

    card.addEventListener('click', () => _onProfileCardClick(name));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _onProfileCardClick(name); }
    });

    listEl.appendChild(card);
  });
}

function _onProfileCardClick(name) {
  saveBuildState(getAppState());
  setCurrentProfile(name);
  loadBuild();
  renderProfileList();
  _renderProfileSidebarButton();
  showToast(t('profileSelected').replace('{name}', name));
}

function showProfileSubform(mode) {
  _profileSubformMode = mode;
  const subform = document.getElementById('profile-subform');
  if (!subform) return;

  const titleEl = subform.querySelector('.profile-subform-title');
  const nameInput = subform.querySelector('#profile-form-name');
  const emojiInput = subform.querySelector('#profile-form-emoji');
  const colorInput = subform.querySelector('#profile-form-color');

  if (titleEl) titleEl.textContent = t(mode === 'create' ? 'profileCreateTitle' : 'profileEditTitle');

  const confirmBtn = document.getElementById('profile-form-confirm');
  const cancelBtn = document.getElementById('profile-form-cancel');
  if (confirmBtn) confirmBtn.textContent = t(mode === 'create' ? 'profileConfirm' : 'profileSaveChanges');
  if (cancelBtn) cancelBtn.textContent = t('profileCancel');

  if (mode === 'create') {
    if (nameInput) { nameInput.value = ''; nameInput.placeholder = t('profileNamePlaceholder'); }
    if (emojiInput) _setProfileEmojiValue(String.fromCodePoint(0x1F464));
    if (colorInput) _setProfileColorValue('#8b6a30');
    subform.querySelectorAll('.profile-form-row-emoji, .profile-form-row-color').forEach(function(el) { el.style.removeProperty('display'); });
  } else {
    const current = getCurrentProfileName();
    const profile = getProfilesStorage()[current] || {};
    if (nameInput) { nameInput.value = current; nameInput.placeholder = t('profileNamePlaceholder'); }
    if (emojiInput) _setProfileEmojiValue(profile.emoji || String.fromCodePoint(0x1F464));
    if (colorInput) _setProfileColorValue(profile.color || '#8b6a30');
    subform.querySelectorAll('.profile-form-row-emoji, .profile-form-row-color').forEach(function(el) { el.style.removeProperty('display'); });
  }

  subform.style.removeProperty('display');
  _updateProfileLivePreview();
  if (nameInput) { nameInput.focus(); nameInput.select(); }
}

function hideProfileSubform() {
  _profileSubformMode = null;
  const subform = document.getElementById('profile-subform');
  if (subform) subform.style.setProperty('display', 'none');
  _setEmojiPopoverOpen(false);
}

function _confirmProfileSubform() {
  const nameInput = document.getElementById('profile-form-name');
  const emojiInput = document.getElementById('profile-form-emoji');
  const colorInput = document.getElementById('profile-form-color');

  const name = (nameInput ? nameInput.value : '').trim();
  if (!name) return;

  const emoji = (emojiInput ? emojiInput.value : '').trim() || String.fromCodePoint(0x1F464);
  const color = (colorInput ? colorInput.value : '') || '#8b6a30';

  if (_profileSubformMode === 'create') {
    _doCreateProfile(name, emoji, color);
  } else if (_profileSubformMode === 'edit') {
    _doEditProfile(name, emoji, color);
  }
}

function _doCreateProfile(name, emoji, color) {
  const currentState = getAppState();
  saveBuildState(currentState);
  const profiles = getProfilesStorage();

  if (profiles[name]) {
    const overwrite = confirm(t('profileExistsConfirm').replace('{name}', name));
    if (!overwrite) return;
  }

  profiles[name] = { buildState: currentState, emoji: emoji, color: _normalizeHexColor(color) };
  setProfilesStorage(profiles);
  setCurrentProfileName(name);
  loadBuild();
  renderProfileList();
  _renderProfileSidebarButton();
  hideProfileSubform();
  _highlightSavedActiveProfile();
  showToast(t('profileCreated'));
}

function _highlightSavedActiveProfile() {
  const activeCard = document.querySelector('.profile-card.is-active');
  if (!activeCard) return;
  activeCard.classList.remove('just-saved');
  void activeCard.offsetWidth;
  activeCard.classList.add('just-saved');
}

function _doEditProfile(newName, emoji, color) {
  if (!newName) return;
  const oldName = getCurrentProfileName();
  const profiles = getProfilesStorage();
  const currentProfile = profiles[oldName] || { buildState: getAppState() };

  if (newName !== oldName && profiles[newName]) {
    const overwrite = confirm(t('profileExistsConfirm').replace('{name}', newName));
    if (!overwrite) return;
  }

  const nextProfile = {
    ...currentProfile,
    emoji: emoji || String.fromCodePoint(0x1F464),
    color: _normalizeHexColor(color),
  };

  if (newName !== oldName) {
    delete profiles[oldName];
  }

  profiles[newName] = nextProfile;
  setProfilesStorage(profiles);
  setCurrentProfileName(newName);

  renderProfileList();
  _renderProfileSidebarButton();
  hideProfileSubform();
  _highlightSavedActiveProfile();
  showToast(t('profileSavedSuccess'));
}

function _doDeleteProfile() {
  const name = getCurrentProfileName();
  if (!name) return;

  const confirmDel = confirm(t('profileDeleteConfirm').replace('{name}', name));
  if (!confirmDel) return;

  const profiles = getProfilesStorage();
  delete profiles[name];
  setProfilesStorage(profiles);

  const remaining = Object.keys(profiles);
  const next = remaining.length ? remaining[0] : 'default';
  setCurrentProfile(next);
  loadBuild();
  renderProfileList();
  _renderProfileSidebarButton();
  hideProfileSubform();
  showToast(t('profileDeleted'));
}

function _doExportProfile() {
  saveBuildState(getAppState());
  const name = getCurrentProfileName();
  const profiles = getProfilesStorage();
  const profile = profiles[name] || {};
  const data = JSON.stringify({ profileName: name, profile: profile }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name.replace(/[^a-z0-9_-]/gi, '_') + '_profile.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(t('exportBuildSuccess'));
}

function _doImportProfile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', function() {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const parsed = JSON.parse(e.target.result);
        var profileName, profileData;

        if (parsed.profileName && parsed.profile) {
          profileName = parsed.profileName;
          profileData = parsed.profile;
        } else if (parsed.build || parsed.version) {
          profileName = file.name.replace(/\.json$/i, '').replace(/_profile$/i, '') || 'imported';
          profileData = { buildState: parsed };
        } else {
          throw new Error('Unrecognized format');
        }

        saveBuildState(getAppState());
        const profiles = getProfilesStorage();
        profiles[profileName] = profileData;
        setProfilesStorage(profiles);
        setCurrentProfile(profileName);
        loadBuild();
        renderProfileList();
        _renderProfileSidebarButton();
        showToast(t('profileImportSuccess'));
      } catch (err) {
        console.error('Import failed', err);
        showToast(t('profileImportError'));
      }
    };
    reader.readAsText(file);
  });
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

function _doShareProfileLink() {
  saveBuildState(getAppState());
  const name = getCurrentProfileName();
  const profiles = getProfilesStorage();
  const profile = profiles[name] || {};
  const json = JSON.stringify({ profileName: name, profile: profile });
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const url = window.location.origin + window.location.pathname + '#profile=' + encoded;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() { showToast(t('profileShareCopied')); });
  } else {
    prompt(t('profileSharePrompt'), url);
    showToast(t('profileShareCopied'));
  }
}

function _doPasteProfileLink() {
  const link = prompt(t('profileSharePrompt'));
  if (!link) return;
  _applyProfileFromHash(link);
}

function _applyProfileFromHash(urlOrHash) {
  try {
    var hashPart;
    if (urlOrHash.includes('#profile=')) {
      hashPart = urlOrHash.split('#profile=')[1];
    } else {
      hashPart = urlOrHash.replace(/^#profile=/, '');
    }
    const json = decodeURIComponent(escape(atob(hashPart)));
    const parsed = JSON.parse(json);

    if (!parsed.profileName || !parsed.profile) throw new Error('Invalid profile data');

    saveBuildState(getAppState());
    const profiles = getProfilesStorage();
    profiles[parsed.profileName] = parsed.profile;
    setProfilesStorage(profiles);
    setCurrentProfile(parsed.profileName);
    loadBuild();
    renderProfileList();
    _renderProfileSidebarButton();
    showToast(t('profileImportSuccess'));
  } catch (err) {
    console.error('Failed to apply profile from link', err);
    showToast(t('profileImportError'));
  }
}

function _checkProfileInUrl() {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#profile=')) return false;
  _applyProfileFromHash(hash);
  return true;
}

// ------------------------------------------------------------
// Modal event binding (called once during initialization)
// ------------------------------------------------------------

function initProfileModal() {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;

  _profileModalEl = overlay;

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeProfileModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeProfileModal();
  });

  var closeBtn = overlay.querySelector('[data-profile-close]');
  if (closeBtn) closeBtn.addEventListener('click', closeProfileModal);

  var btnCreate = overlay.querySelector('[data-profile-action="create"]');
  if (btnCreate) btnCreate.addEventListener('click', function() { showProfileSubform('create'); });

  var btnDelete = overlay.querySelector('[data-profile-action="delete"]');
  if (btnDelete) btnDelete.addEventListener('click', _doDeleteProfile);

  var btnEdit = overlay.querySelector('[data-profile-action="edit"]');
  if (btnEdit) btnEdit.addEventListener('click', function() { showProfileSubform('edit'); });

  var btnExport = overlay.querySelector('[data-profile-action="export"]');
  if (btnExport) btnExport.addEventListener('click', _doExportProfile);

  var btnImport = overlay.querySelector('[data-profile-action="import"]');
  if (btnImport) btnImport.addEventListener('click', _doImportProfile);

  var btnShare = overlay.querySelector('[data-profile-action="share"]');
  if (btnShare) btnShare.addEventListener('click', _doShareProfileLink);

  var btnPaste = overlay.querySelector('[data-profile-action="paste"]');
  if (btnPaste) btnPaste.addEventListener('click', _doPasteProfileLink);

  var confirmBtn = document.getElementById('profile-form-confirm');
  if (confirmBtn) confirmBtn.addEventListener('click', _confirmProfileSubform);

  var cancelBtn = document.getElementById('profile-form-cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', hideProfileSubform);

  var nameInput = document.getElementById('profile-form-name');
  if (nameInput) {
    nameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); _confirmProfileSubform(); }
    });
  }

  _initProfileVisualPickers();
  _applyEmojiPickerLocale();
  _setProfileEmojiValue(String.fromCodePoint(0x1F464));
  _setProfileColorValue('#8b6a30');
  _updateProfileLivePreview();
  _renderProfileSidebarButton();

  _applyModalTranslations();
}

function _applyModalTranslations() {
  const overlay = document.getElementById('profile-modal-overlay');
  if (!overlay) return;

  var titleEl = overlay.querySelector('.profile-modal-title');
  if (titleEl) titleEl.textContent = t('profileModalTitle');

  var emptyEl = document.getElementById('profile-empty-msg');
  if (emptyEl) emptyEl.textContent = t('profileNoProfiles');

  var labelName = overlay.querySelector('[data-profile-label="name"]');
  if (labelName) labelName.textContent = t('profileNameLabel');

  var labelEmoji = overlay.querySelector('[data-profile-label="emoji"]');
  if (labelEmoji) labelEmoji.textContent = t('profileEmojiLabel');

  var labelColor = overlay.querySelector('[data-profile-label="color"]');
  if (labelColor) labelColor.textContent = t('profileColorLabel');

  var nameInput = document.getElementById('profile-form-name');
  if (nameInput) nameInput.placeholder = t('profileNamePlaceholder');

  _renderProfileSidebarButton();

  _applyEmojiPickerLocale();
}

// ------------------------------------------------------------
// Utilities
// ------------------------------------------------------------

function _escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
