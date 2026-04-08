// ============================================================
// Profiles — save/load, share, import/export, profile CRUD
// ============================================================

let suppressAutoSave = false;

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
    && (Object.prototype.hasOwnProperty.call(state, 'build') || Object.prototype.hasOwnProperty.call(state, 'characters') || Object.prototype.hasOwnProperty.call(state, 'boats') || Object.prototype.hasOwnProperty.call(state, 'islandChests'));
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
