// ============================================================
// Profiles — save/load, share, import/export, profile CRUD
// ============================================================

let suppressAutoSave = false;

function profilesIsPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function profilesSanitizeString(value, maxLen = 120) {
  return String(value || '').replace(/[\r\n\t]/g, ' ').trim().slice(0, maxLen);
}

function profilesNormalizeHexColor(value, fallback) {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`.toLowerCase();
  }
  return fallback;
}

function profilesSanitizeCardState(item) {
  if (!profilesIsPlainObject(item)) return null;

  const tipo = profilesSanitizeString(item.tipo, 80);
  if (!tipo) return null;

  const out = { tipo };

  const variantCategory = profilesSanitizeString(item.variantCategory, 60);
  const variantId = profilesSanitizeString(item.variantId, 80);
  if (variantCategory && variantId) {
    out.variantCategory = variantCategory;
    out.variantId = variantId;
  }

  if (profilesIsPlainObject(item.stats)) {
    const stats = {};
    Object.entries(item.stats).forEach(([k, v]) => {
      const key = profilesSanitizeString(k, 40);
      if (!key) return;
      const n = Number(v);
      if (Number.isFinite(n)) {
        stats[key] = n;
      }
    });
    if (Object.keys(stats).length) out.stats = stats;
  }

  return out;
}

function profilesSanitizeBuildState(input) {
  // Backward compatibility: legacy build was plain cards array.
  if (Array.isArray(input)) {
    return input.map(profilesSanitizeCardState).filter(Boolean).slice(0, 500);
  }

  if (!profilesIsPlainObject(input)) return null;

  const safeBuild = {
    version: Number.isFinite(Number(input.version)) ? Number(input.version) : 2,
    ungrouped: [],
    groups: [],
  };

  const ungrouped = Array.isArray(input.ungrouped) ? input.ungrouped : [];
  safeBuild.ungrouped = ungrouped
    .map(profilesSanitizeCardState)
    .filter(Boolean)
    .slice(0, 500);

  const groups = Array.isArray(input.groups) ? input.groups : [];
  safeBuild.groups = groups
    .map((group, idx) => {
      if (!profilesIsPlainObject(group)) return null;

      const items = Array.isArray(group.items) ? group.items.map(profilesSanitizeCardState).filter(Boolean).slice(0, 200) : [];
      const fallbackId = `group_safe_${idx}`;

      return {
        id: profilesSanitizeString(group.id, 120) || fallbackId,
        title: profilesSanitizeString(group.title, 80) || 'Group',
        color: profilesNormalizeHexColor(group.color, '#6a4a20'),
        bgColor: profilesNormalizeHexColor(group.bgColor, '#2a1a0e'),
        titleColor: profilesNormalizeHexColor(group.titleColor, '#f0e0b0'),
        headerColor: profilesNormalizeHexColor(group.headerColor, '#1a1008'),
        collapsed: !!group.collapsed,
        items,
      };
    })
    .filter(Boolean)
    .slice(0, 80);

  return safeBuild;
}

function profilesSanitizeAppState(input) {
  if (!profilesIsPlainObject(input)) {
    return profilesSanitizeBuildState(input);
  }

  if (!isCombinedAppState(input)) {
    return profilesSanitizeBuildState(input);
  }

  const out = {
    version: Number.isFinite(Number(input.version)) ? Number(input.version) : 1,
    build: profilesSanitizeBuildState(input.build),
    characters: null,
    boats: null,
  };

  // Keep characters/boats only when they are plain objects to avoid applying malformed payloads.
  if (profilesIsPlainObject(input.characters)) out.characters = input.characters;
  if (profilesIsPlainObject(input.boats)) out.boats = input.boats;

  return out;
}

function getAppState() {
  return {
    version: 1,
    build: getBuildState(),
    characters: typeof getCharactersState === 'function' ? getCharactersState() : null,
    boats: typeof getBoatsState === 'function' ? getBoatsState() : null,
  };
}

function isCombinedAppState(state) {
  return !!state && typeof state === 'object' && !Array.isArray(state)
    && (Object.prototype.hasOwnProperty.call(state, 'build') || Object.prototype.hasOwnProperty.call(state, 'characters') || Object.prototype.hasOwnProperty.call(state, 'boats'));
}

function applyAppState(state) {
  const buildState = isCombinedAppState(state) ? state.build : state;
  const charactersState = isCombinedAppState(state) ? state.characters : null;
  const boatsState = isCombinedAppState(state) ? state.boats : null;

  applyBuildState(buildState);

  if (typeof applyCharactersState === 'function') {
    if (charactersState) applyCharactersState(charactersState);
    else resetCharactersState();
  }

  if (typeof applyBoatsState === 'function') {
    if (boatsState) applyBoatsState(boatsState);
    else resetBoatsState();
  }
}

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
    const safeState = profilesSanitizeAppState(profile.buildState);
    if (!safeState) throw new Error('Invalid profile state shape');
    applyAppState(safeState);
  } catch (err) {
    console.error('Failed to load saved build', err);
  }
}

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
    const safeState = profilesSanitizeAppState(state);
    if (!safeState) throw new Error('Invalid URL build payload');
    applyAppState(safeState);
    return true;
  } catch (err) {
    console.error('Failed to load build from URL', err);
    return false;
  }
}

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

function updateProfileDropdown() {
  const select = document.getElementById('profileSelect');
  if (!select) return;

  // Ensure there is always a current profile object
  getCurrentProfile();

  const profiles = getProfilesStorage();
  const names = Object.keys(profiles);

  const placeholder = select.querySelector('option');
  select.innerHTML = '';
  if (placeholder) select.appendChild(placeholder);

  if (names.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = t('noProfiles');
    select.appendChild(opt);
    return;
  }

  names.forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  const current = getCurrentProfileName();
  if (current) select.value = current;

  if (typeof boostPopulateProfileSelect === 'function') {
    boostPopulateProfileSelect();
  }
}

function createProfile() {
  const name = prompt(t('profileNamePrompt'))?.trim();
  if (!name) return;

  // Save current build before switching
  saveBuildState(getAppState());

  const profiles = getProfilesStorage();
  if (profiles[name]) {
    const overwrite = confirm(t('profileExistsConfirm').replace('{name}', name));
    if (!overwrite) return;

    // True overwrite: reset existing profile data before selecting it.
    profiles[name] = { buildState: null };
    setProfilesStorage(profiles);
  }

  setCurrentProfile(name);
  updateProfileDropdown();
  loadBuild();
  showToast(t('profileCreated'));
}

function deleteProfile() {
  const name = getCurrentProfileName();
  if (!name) return;

  const confirmDelete = confirm(t('profileDeleteConfirm').replace('{name}', name));
  if (!confirmDelete) return;

  const profiles = getProfilesStorage();
  delete profiles[name];
  setProfilesStorage(profiles);

  const remaining = Object.keys(profiles);
  const next = remaining.length ? remaining[0] : 'default';
  setCurrentProfile(next);
  updateProfileDropdown();
  loadBuild();
  showToast(t('profileDeleted'));
}

function switchProfile() {
  const select = document.getElementById('profileSelect');
  if (!select) return;
  const name = select.value;
  if (!name) return;

  // Save current build before switching
  saveBuildState(getAppState());

  setCurrentProfile(name);
  loadBuild();

  if (typeof boostPopulateProfileSelect === 'function') {
    boostPopulateProfileSelect();
  }
}
