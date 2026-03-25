// ============================================================
// Characters tab - collection tracker with filters and saved state
// ============================================================

const CHARACTER_LEVEL_CAP = 140;
const CHARACTER_STAR_CAP = 5;

const CHARACTER_TIER_ICONS = {
  bronze: "sprites/xp/bronze_tier.png",
  silver: "sprites/xp/silver_tier.png",
  gold: "sprites/xp/gold_tier.png",
  diamond: "sprites/xp/diamond_tier.png"
};

// QUICK GUIDE - GROUPS
// 1) Add/remove group members by editing only this object.
// 2) Key = group id used in search/filter text.
// 3) Value = array of character sprite ids.
// Example add member:
//   chapeu_de_palha: ["monkey_luffy", "nami", "usopp"]
// Example remove member:
//   remove "x_drake" from supernova list below.
// Example add new group:
//   bounties: ["monkey_luffy", "zoro", "sanji"]
const CHARACTER_GROUPS_CONFIG = {
  tank: [
    "aokiji", "bartholomew_kuma", "bastille", "crocodile", "eustass_kid", "franky_ts", "jesus_burgess", "jinbe", "kuroobi", "mr_1", "ohm",
    "pearl", "rebecca", "smoker", "urouge", "vinsmoke_yonji", "wapol"
  ],
  bruiser: [
   "marshall_teach", "shanks", "basil_hawkins", "dalmatian", "franky", "hina", "monkey_luffy", "roronoa_zoro", "vinsmoke_ichiji", "x_drake", "arlong",
   "miss_doublefinger", "bucchi_sham", "mohji", "morgan", "mr_4"
  ],
  dps: [
   "silvers_rayleigh", "monkey_garp", "boa_hancock", "borsalino_kizaru", "doflamingo", "dracule_mihawk", "enel", "monkey_luffy_ts", "nami_ts",
   "portgas_ace", "robin_ts", "roronoa_zoro_ts", "sabo", "akainu", "usopp_ts", "uta", "vinsmoke_sanji_ts", "jabra", "kaku", "rob_lucci", "blueno",
   "margareth", "baby_5", "bartolomeo", "bellamy", "capone_bege", "carrot", "killer", "koala", "nami", "robin", "ryuma", "trafalgar_law", "usopp",
   "van_augur", "vinsmoke_niji", "vinsmoke_sanji", "gedatsu", "shura", "bepo", "mr_2", "buggy", "daddy_masterson", "don_krieg", "kuro", "tashigi",
   "cabaji", "chew", "eric", "gin", "mr_5"
  ],
  support: [
    "alvida", "brook", "brook_ts", "chopper", "chopper_ts", "emporio_ivankov", "gecko_moria", "hatchan", "jango", "jewelry_bonney", "kalifa",
    "leo_mansherry", "marco", "miss_goldenweek", "mr_3", "perona", "satori", "scratchmen_apoo", "vinsmoke_reiju", "vivi"
  ],
  fighter: [
    "monkey_garp", "boa_hancock", "chopper_ts", "emporio_ivankov", "jinbe", "marco", "monkey_luffy_ts", "sabo", "akainu", "vinsmoke_sanji_ts", "rob_lucci", "blueno", "bellamy", "jewelry_bonney", "chopper", "hina", "jesus_burgess", "koala", "monkey_luffy", "smoker", "urouge", "vinsmoke_ichiji", "vinsmoke_sanji", "vinsmoke_yonji", "x_drake", "gedatsu", "arlong", "bepo", "mr_2", "alvida", "gin", "kuroobi", "pearl"
  ],
  shooter: [
    "borsalino_kizaru", "doflamingo", "enel", "franky_ts", "portgas_ace", "usopp_ts", "kaku", "margareth", "baby_5", "capone_bege", "franky", "eustass_kid", "scratchmen_apoo", "usopp", "van_augur", "vinsmoke_niji", "satori", "buggy", "daddy_masterson", "don_krieg", "wapol", "chew", "eric", "gin", "jango", "mr_4", "mr_5"
  ],
  slasher: [
    "silvers_rayleigh", "aokiji", "brook_ts", "dracule_mihawk", "roronoa_zoro_ts", "shanks", "jabra", "kaku", "baby_5", "bastille", "brook", "carrot", "dalmatian", "gecko_moria", "killer", "rebecca", "roronoa_zoro", "ryuma", "trafalgar_law", "ohm", "shura", "mr_1", "miss_doublefinger", "kuro", "tashigi", "vivi", "bucchi_sham", "cabaji", "eric", "hatchan", "morgan"
  ],
  specialist: [
    "aokiji", "bartholomew_kuma", "borsalino_kizaru", "doflamingo", "enel", "marshall_teach", "marco", "nami_ts", "portgas_ace", "robin_ts", "sabo", "akainu", "uta", "kalifa", "bartolomeo", "basil_hawkins", "carrot", "crocodile", "leo_mansherry", "nami", "perona", "robin", "trafalgar_law", "vinsmoke_reiju", "satori", "mr_3", "miss_goldenweek", "mohji", "pearl"
  ],
  marinheiro: [
    "akainu", "aokiji", "bastille", "borsalino_kizaru", "dalmatian", "daddy_masterson", "hina", "monkey_garp", "smoker", "tashigi"
  ],
  supernova: [
    "eustass_kid", "killer", "scratchmen_apoo", "basil_hawkins", "x_drake", "jewelry_bonney", "capone_bege", "trafalgar_law", "urouge", "monkey_luffy", "roronoa_zoro"
  ],
  fruta_do_diabo: [
    "akainu", "aokiji", "baby_5", "bartholomew_kuma", "boa_hancock", "brook", "brook_ts", "buggy", "crocodile", "doflamingo",
    "eustass_kid", "gecko_moria", "jewelry_bonney", "kaku", "kalifa", "marshall_teach", "miss_doublefinger", "miss_goldenweek", "nico_robin",
    "nico_robin_ts", "perona", "portgas_ace", "rob_lucci", "sabo", "smoker", "trafalgar_law", "uta", "vinsmoke_reiju", "x_drake"
  ],
  shichibukai: [
    "bartholomew_kuma", "boa_hancock", "buggy", "crocodile", "dracule_mihawk", "gecko_moria", "jinbe", "trafalgar_law", "doflamingo"
  ],
  realeza: [
    "nefertari_vivi", "vivi", "rebecca", "leo_mansherry"
  ],
  chapeu_de_palha: [
    "monkey_luffy", "monkey_luffy_ts", "roronoa_zoro", "roronoa_zoro_ts", "nami", "nami_ts", "usopp", "usopp_ts", "vinsmoke_sanji", "vinsmoke_sanji_ts",
    "nico_robin", "nico_robin_ts", "franky", "franky_ts", "brook", "brook_ts", "chopper", "chopper_ts", "jinbe"
  ]
};

const CHARACTER_MECHANICS_CONFIG = {
  reducao_ataque: [
    "boa_hancock", "smoker", "jewelry_bonney", "leo_mansherry", "roronoa_zoro_ts", "borsalino_kizaru", "nami_ts", "nico_robin_ts", "rebecca", "hina",
    "nico_robin", "gecko_moria", "monkey_luffy", "x_drake", "uta", "chopper_ts", "bartholomew_kuma", "mashall_teach", "perona", "silvers_rayleigh", "buggy", "mr_2"
  ],
  ataque_invul: [
    "kaku", "leo_mansherry", "doflamingo", "smoker", "borsalino_kizaru", "boa_hancock", "ryuma", "trafalgar_law", "jinbe", "margareth", "gecko_moria",
    "dracule_mihawk", "enel", "vinsmoke_niji", "dalmatian", "marco", "buggy", "akainu"
  ],
  buff_ataque: [
    "jewelry_bonney", "tashigi", "leo_mansherry", "basil_hawkins", "gecko_moria", "mr_2"
  ],
  quebra_def: [
    "jewelry_bonney", "brook_ts", "hina", "trafalgar_law", "nami_ts", "rebecca", "basil_hawkins", "gecko_moria", "boa_hancock", "dracule_mihawk",
    "bartolomeo", "chopper", "cabaji"
  ],
  cria_ponte: [
    "aokiji", "brook_ts", "doflamingo", "nico_robin_ts", "bartolomeo", "basil_hawkins", "crocodile", "hina", "eustass_kid", "leo_mansherry", "nico_robin", "mr_3"
  ],
  quebra_parede: [
    "silvers_rayleigh", "monkey_garp", "aokiji", "bartholomew_kuma", "borsalino_kizaru", "chopper_ts", "doflamingo", "dracule_mihawk", "emporio_ivankov", "franky_ts",
    "jinbe", "monkey_luffy_ts", "nico_robin_ts", "roronoa_zoro_ts", "sabo", "akainu", "shanks", "usopp_ts", "uta", "vinsmoke_sanji_ts", "kalifa", "jabra", "kaku",
    "rob_lucci", "blueno", "margareth", "bartolomeo", "bastille", "bellamy", "capone_bege", "chopper", "crocodile", "dalmatian", "franky", "hina", "jesus_burgess",
    "eustass_kid", "monkey_luffy", "nami", "perona", "nico_robin", "roronoa_zoro", "trafalgar_law", "urouge", "usopp", "van_augur", "vinsmoke_ichiji", "vinsmoke_sanji",
    "vinsmoke_yonji", "x_drake", "arlong", "buggy", "wapol", "chew", "kuroobi"
  ]
};

// QUICK GUIDE - SKINS
// 1) Add skins by character id. Keep "base" as first option.
// 2) If sprite is omitted, base sprite is used automatically.
// 3) labelKey supports i18n; label is a fixed text fallback.
// Example:
//   monkey_luffy: [
//     { id: "base", labelKey: "charactersSkinBase" },
//     { id: "wano", label: "Wano", sprite: "sprites/characters/monkey_luffy_wano.png" }
//   ]
const CHARACTER_SKIN_CATALOG = {
  monkey_luffy: [
    { id: "base", labelKey: "charactersSkinBase" },
    { id: "kid_luffy", label: "Kid Luffy", sprite: "sprites/skins_characters/kid_luffy.png" }
  ],
  default: [{ id: "base", labelKey: "charactersSkinBase" }]
};

// Group aliases — add alternative search terms for each group id
const CHARACTER_GROUP_ALIASES = {
  tank: ["tank", "defender"],
  bruiser: ["bruiser", "lutador"],
  dps: ["dps", "damage"],
  support: ["support", "suporte"],
  fighter: ["fighter", "melee"],
  shooter: ["shooter", "ranged", "atirador"],
  slasher: ["slasher", "cortador"],
  specialist: ["specialist", "especialista"],
  marinheiro: ["marinha", "navy", "marine", "marines"],
  chapeu_de_palha: ["chapeu de palha", "mugiwara", "straw hat", "strawhats"],
  fruta_do_diabo: ["fruta do diabo", "devil fruit", "logia", "paramecia", "zoan"],
  shichibukai: ["sichibukai", "warlord", "warlords"],
  supernova: ["supernovas", "worst generation"],
  reducao_ataque: ["reducao de ataque", "debuff ataque"],
  ataque_invul: ["ataque com invul", "invul"],
  buff_ataque: ["buff de ataque", "buff ataque"],
  quebra_def: ["quebra def", "quebra defesa"],
  cria_ponte: ["cria ponte", "ponte"],
  quebra_parede: ["quebra parede", "wall break"]
};

let characterCollectionState = {};
let characterMenuOpenId = "";
let selectedRoleFilters = new Set();
let selectedTierFilters = new Set();
let selectedGroupFilters = new Set();

function charactersDebounce(fn, delay = 120) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function charactersInit() {
  const panel = document.getElementById("characters");
  if (!panel) return;

  characterCollectionState = buildDefaultCharacterCollectionState();
  bindCharactersEvents();
  charactersApplyTranslations();
  charactersRender();
}

function buildDefaultCharacterCollectionState() {
  const state = {};
  CHARACTERS_DATA.forEach((character) => {
    state[character.id] = createDefaultCharacterState(character);
  });
  return state;
}

function createDefaultCharacterState(character) {
  const skins = getCharacterSkinOptions(character);
  const skinsUnlocked = {};
  skins.forEach((skin, index) => {
    skinsUnlocked[skin.id] = index === 0;
  });

  return {
    active: false,
    level: 1,
    stars: 1,
    tier: character.tierStart,
    skinsUnlocked
  };
}

function bindCharactersEvents() {
  const search = document.getElementById("characters-search");
  const maxLevelFilter = document.getElementById("characters-max-level-filter");
  const sortFilter = document.getElementById("characters-sort-filter");
  const debouncedRender = charactersDebounce(() => charactersRender());

  [search, maxLevelFilter, sortFilter].forEach((element) => {
    if (!element || element.dataset.charactersBound === "1") return;
    element.dataset.charactersBound = "1";
    const eventName = element.tagName === "SELECT" ? "change" : "input";
    element.addEventListener(eventName, () => {
      if (eventName === "input") debouncedRender();
      else charactersRender();
    });
  });

  if (!document.body.dataset.charactersFilterTogglesBound) {
    document.body.dataset.charactersFilterTogglesBound = "1";
    document.addEventListener("click", (event) => {
      const roleBtn = event.target.closest("[data-characters-role-toggle]");
      if (roleBtn) {
        const role = roleBtn.getAttribute("data-characters-role-toggle");
        if (selectedRoleFilters.has(role)) selectedRoleFilters.delete(role);
        else selectedRoleFilters.add(role);
        roleBtn.classList.toggle("is-active");
        charactersRender();
        return;
      }
      const tierBtn = event.target.closest("[data-characters-tier-toggle]");
      if (tierBtn) {
        const tier = tierBtn.getAttribute("data-characters-tier-toggle");
        if (selectedTierFilters.has(tier)) selectedTierFilters.delete(tier);
        else selectedTierFilters.add(tier);
        tierBtn.classList.toggle("is-active");
        charactersRender();
        return;
      }
      const groupBtn = event.target.closest("[data-characters-group-toggle]");
      if (groupBtn) {
        const groupId = groupBtn.getAttribute("data-characters-group-toggle");
        if (selectedGroupFilters.has(groupId)) selectedGroupFilters.delete(groupId);
        else selectedGroupFilters.add(groupId);
        groupBtn.classList.toggle("is-active");
        charactersRender();
      }
    });
  }

  if (!document.body.dataset.charactersMenuBound) {
    document.body.dataset.charactersMenuBound = "1";
    document.addEventListener("click", (event) => {
      if (!characterMenuOpenId) return;
      const menu = document.querySelector(`.characters-card[data-character-id="${characterMenuOpenId}"] .characters-card-menu`);
      const button = document.querySelector(`.characters-card[data-character-id="${characterMenuOpenId}"] .characters-card-menu-toggle`);
      const insideMenu = menu && menu.contains(event.target);
      const clickedToggle = button && button.contains(event.target);
      if (!insideMenu && !clickedToggle) {
        characterMenuOpenId = "";
        charactersRender();
      }
    });
  }
}

function charactersApplyTranslations() {
  const search = document.getElementById("characters-search");
  if (search) search.placeholder = t("charactersSearchPlaceholder");
  charactersRender();
}

function charactersRender() {
  const grid = document.getElementById("characters-grid");
  const summary = document.getElementById("characters-summary");
  if (!grid || !summary) return;

  const query = normalizeCharacterKey(document.getElementById("characters-search")?.value || "");
  const maxLevelFilter = document.getElementById("characters-max-level-filter")?.value || "all";
  const sortFilter = document.getElementById("characters-sort-filter")?.value || "name_az";

  const visible = CHARACTERS_DATA.filter((character) => {
    const characterState = getCharacterState(character.id, character);
    return charactersMatchesFilters(character, characterState, query, selectedRoleFilters, selectedTierFilters, selectedGroupFilters, maxLevelFilter);
  });
  const sortedVisible = sortCharacters(visible, sortFilter);

  const unlockedCount = CHARACTERS_DATA.reduce((count, character) => count + (getCharacterState(character.id, character).active ? 1 : 0), 0);
  const levelsCount = CHARACTERS_DATA.reduce((sum, character) => {
    const state = getCharacterState(character.id, character);
    return sum + (state.active ? clampCharacterNumber(state.level, 1, CHARACTER_LEVEL_CAP) : 0);
  }, 0);
  const starsPointsCount = CHARACTERS_DATA.reduce((sum, character) => {
    const state = getCharacterState(character.id, character);
    return sum + (state.active ? getCharacterStarPoints(state.stars, state.tier) : 0);
  }, 0);

  summary.textContent = t("charactersSummary")
    .replace("{unlocked}", String(unlockedCount))
    .replace("{total}", String(CHARACTERS_DATA.length))
    .replace("{levels}", String(levelsCount))
    .replace("{starsPoints}", String(starsPointsCount));

  if (!sortedVisible.length) {
    grid.innerHTML = `<div class="characters-empty">${escapeCharactersHtml(t("charactersNoResults"))}</div>`;
    return;
  }

  grid.innerHTML = sortedVisible.map((character) => renderCharacterCard(character, getCharacterState(character.id, character))).join("");
  bindCharacterCardEvents();
}

function sortCharacters(list, sortFilter) {
  const sorted = [...list];

  // Diamond → Gold → Silver → Bronze (descending tier rank), then A-Z within each tier.
  const tierRank = (character) => CHARACTER_TIER_ORDER.indexOf((character.tierMax || "bronze").toLowerCase());

  if (sortFilter === "level_desc") {
    sorted.sort((a, b) => getCharacterState(b.id, b).level - getCharacterState(a.id, a).level || a.name.localeCompare(b.name));
    return sorted;
  }

  if (sortFilter === "level_asc") {
    sorted.sort((a, b) => getCharacterState(a.id, a).level - getCharacterState(b.id, b).level || a.name.localeCompare(b.name));
    return sorted;
  }

  // Default: name_az — tier group first (highest first), then alphabetical within group.
  sorted.sort((a, b) => tierRank(b) - tierRank(a) || a.name.localeCompare(b.name));
  return sorted;
}

function getCharacterStarPoints(stars, tier) {
  const tierBonusMap = {
    bronze: 0,
    silver: 1,
    gold: 2,
    diamond: 3
  };
  const safeTier = normalizeCharacterTier(tier);
  return clampCharacterNumber(stars, 1, CHARACTER_STAR_CAP) + (tierBonusMap[safeTier] || 0);
}

function getCharacterState(characterId, characterMeta) {
  if (!characterCollectionState[characterId]) {
    characterCollectionState[characterId] = createDefaultCharacterState(characterMeta);
  }
  return characterCollectionState[characterId];
}

function charactersMatchesFilters(character, state, query, roleFilters, tierFilters, groupFilters, maxLevelFilter) {
  const inferredRole = getCharacterRole(character);
  const groups = inferCharacterGroups(character);
  const mechanics = inferCharacterMechanics(character);

  if (roleFilters.size > 0 && !roleFilters.has(inferredRole)) return false;
  if (tierFilters.size > 0 && !tierFilters.has(state.tier)) return false;
  if (groupFilters.size > 0 && ![...groups, ...mechanics].some((groupId) => groupFilters.has(groupId))) return false;

  if (maxLevelFilter === "maxed" && state.level < CHARACTER_LEVEL_CAP) return false;
  if (maxLevelFilter === "not_maxed" && state.level >= CHARACTER_LEVEL_CAP) return false;

  if (!query) return true;

  const groupAliasTerms = [...groups, ...mechanics].flatMap((g) => CHARACTER_GROUP_ALIASES[g] || []);
  const haystack = [
    character.name,
    inferredRole,
    state.tier,
    character.id,
    ...character.aliases,
    ...groups,
    ...mechanics,
    ...groupAliasTerms
  ]
    .map((value) => normalizeCharacterKey(value))
    .join(" ");

  return haystack.includes(query);
}

function getCharacterRole(character) {
  const id = character?.id;
  if (!id) return "";

  if (Array.isArray(CHARACTER_GROUPS_CONFIG.melee) && CHARACTER_GROUPS_CONFIG.melee.includes(id)) return "Melee";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.ranged) && CHARACTER_GROUPS_CONFIG.ranged.includes(id)) return "Ranged";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.tank) && CHARACTER_GROUPS_CONFIG.tank.includes(id)) return "Tank";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.support) && CHARACTER_GROUPS_CONFIG.support.includes(id)) return "Support";

  if (Array.isArray(CHARACTER_GROUPS_CONFIG.fighter) && CHARACTER_GROUPS_CONFIG.fighter.includes(id)) return "Melee";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.bruiser) && CHARACTER_GROUPS_CONFIG.bruiser.includes(id)) return "Melee";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.slasher) && CHARACTER_GROUPS_CONFIG.slasher.includes(id)) return "Melee";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.shooter) && CHARACTER_GROUPS_CONFIG.shooter.includes(id)) return "Ranged";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.dps) && CHARACTER_GROUPS_CONFIG.dps.includes(id)) return "Ranged";
  if (Array.isArray(CHARACTER_GROUPS_CONFIG.specialist) && CHARACTER_GROUPS_CONFIG.specialist.includes(id)) return "Ranged";

  return "";
}

function inferCharacterMechanics(character) {
  const id = character.id;
  const mechanics = [];

  Object.entries(CHARACTER_MECHANICS_CONFIG).forEach(([groupId, members]) => {
    if (Array.isArray(members) && members.includes(id)) mechanics.push(groupId);
  });

  return mechanics;
}

function inferCharacterGroups(character) {
  const id = character.id;
  const groups = [];

  Object.entries(CHARACTER_GROUPS_CONFIG).forEach(([groupId, members]) => {
    if (Array.isArray(members) && members.includes(id)) groups.push(groupId);
  });

  return groups;
}

function renderCharacterCard(character, state) {
  const groups = inferCharacterGroups(character);
  const tierOptions = buildTierOptions(character, state.tier);
  const starsValue = clampCharacterNumber(state.stars, 1, CHARACTER_STAR_CAP);
  const levelValue = clampCharacterNumber(state.level, 1, CHARACTER_LEVEL_CAP);
  const skinOptions = getCharacterSkinOptions(character);
  const selectedSkin = getCurrentCharacterSkinId(character, state);
  const role = getCharacterRole(character);
  const roleLabel = role ? t(`charactersRole${role}`) : "-";
  const groupLabel = groups.length ? groups.map(formatCharacterGroupLabel).join(", ") : t("charactersNoFactions");
  const cardClasses = ["characters-card"];
  const spriteSrc = getCharacterSpriteFromSkin(character, selectedSkin);

  if (state.active) cardClasses.push("is-active");
  else cardClasses.push("is-inactive");

  if (characterMenuOpenId === character.id) cardClasses.push("menu-open");

  return `
    <article class="${cardClasses.join(" ")}" data-character-id="${character.id}">
      <button class="characters-card-main" type="button" data-character-toggle="${character.id}">
        <span class="characters-card-status">${state.active ? t("charactersActive") : t("charactersInactive")}</span>
        <span class="characters-card-sprite-wrap">
          ${renderCharacterStarsOverlay(starsValue, state.tier)}
          <img class="characters-card-sprite" src="${spriteSrc}" alt="${escapeCharactersHtml(character.name)}" />
        </span>
        <span class="characters-card-name">${escapeCharactersHtml(character.name)}</span>
        <span class="characters-card-meta">${escapeCharactersHtml(roleLabel)} | Lv ${levelValue} | ${escapeCharactersHtml(t(getTierLangKey(state.tier)))}</span>
      </button>
      <button class="characters-card-menu-toggle" type="button" data-character-menu-toggle="${character.id}" title="${escapeCharactersHtml(t("charactersOpenMenu"))}" aria-label="${escapeCharactersHtml(t("charactersOpenMenu"))}">⚙</button>
      <div class="characters-card-menu">
        <label>
          <span>${escapeCharactersHtml(t("charactersLevel"))}</span>
          <input data-character-level="${character.id}" type="number" min="1" max="140" step="1" value="${levelValue}" />
        </label>
        <label>
          <span>${escapeCharactersHtml(t("charactersStars"))}</span>
          ${renderCharacterStarsSelector(character.id, starsValue, state.tier)}
        </label>
        <label>
          <span>${escapeCharactersHtml(t("charactersTier"))}</span>
          <select data-character-tier="${character.id}">
            ${tierOptions}
          </select>
        </label>
        <label>
          <span>${escapeCharactersHtml(t("charactersSkin"))}</span>
          ${renderCharacterSkinUnlocks(character, state, skinOptions)}
        </label>
        <div class="characters-card-groups"><strong>${escapeCharactersHtml(t("charactersFactions"))}:</strong> ${escapeCharactersHtml(groupLabel)}</div>
      </div>
    </article>
  `;
}

function buildTierOptions(character, selectedTier) {
  const startIndex = CHARACTER_TIER_ORDER.indexOf(character.tierStart);
  const maxIndex = CHARACTER_TIER_ORDER.indexOf(character.tierMax);
  return CHARACTER_TIER_ORDER.slice(Math.max(0, startIndex), Math.max(startIndex, maxIndex) + 1)
    .map((tier) => `<option value="${tier}"${tier === selectedTier ? " selected" : ""}>${escapeCharactersHtml(t(getTierLangKey(tier)))}</option>`)
    .join("");
}

function renderCharacterStarsSelector(characterId, selectedStars, tier) {
  const icon = getTierIconByTier(tier);
  const selected = clampCharacterNumber(selectedStars, 1, CHARACTER_STAR_CAP);
  const buttons = [];

  for (let starCount = 1; starCount <= CHARACTER_STAR_CAP; starCount++) {
    const isActive = starCount <= selected;
    buttons.push(`
      <button
        type="button"
        class="characters-stars-btn${isActive ? " is-active" : ""}"
        data-character-stars-set="${characterId}"
        data-stars-value="${starCount}"
        aria-label="${escapeCharactersHtml(t("charactersSetStars")).replace("{n}", String(starCount))}"
        title="${escapeCharactersHtml(t("charactersSetStars")).replace("{n}", String(starCount))}"
      >
        <img src="${icon}" alt="" />
      </button>
    `);
  }

  return `<div class="characters-stars-picker">${buttons.join("")}</div>`;
}

function renderCharacterStarsOverlay(stars, tier) {
  const total = clampCharacterNumber(stars, 1, CHARACTER_STAR_CAP);
  const largeIndex = getLargeStarIndex(total);
  const icon = getTierIconByTier(tier);

  const starsHtml = [];
  for (let index = 0; index < total; index++) {
    const cls = index === largeIndex ? "characters-tier-star is-large" : "characters-tier-star";
    starsHtml.push(`<img class="${cls}" src="${icon}" alt="" />`);
  }

  return `<span class="characters-card-stars">${starsHtml.join("")}</span>`;
}

function getLargeStarIndex(totalStars) {
  if (totalStars >= 3) return 2;
  return -1;
}

function getTierIconByTier(tier) {
  return CHARACTER_TIER_ICONS[normalizeCharacterTier(tier)] || CHARACTER_TIER_ICONS.bronze;
}

function getCharacterSkinOptions(character) {
  const own = CHARACTER_SKIN_CATALOG[character.id];
  if (Array.isArray(own) && own.length) return own;
  return CHARACTER_SKIN_CATALOG.default;
}

function normalizeCharacterSkinsUnlocked(rawState, skinOptions) {
  const fallback = {};
  skinOptions.forEach((skin, index) => {
    fallback[skin.id] = index === 0;
  });

  if (!rawState || typeof rawState !== "object") return fallback;

  // Backward compatibility with previous single skin selection state
  if (typeof rawState.skin === "string") {
    const requested = String(rawState.skin).trim();
    if (requested && Object.prototype.hasOwnProperty.call(fallback, requested)) {
      fallback[requested] = true;
    }
  }

  if (rawState.skinsUnlocked && typeof rawState.skinsUnlocked === "object") {
    Object.keys(rawState.skinsUnlocked).forEach((skinId) => {
      if (Object.prototype.hasOwnProperty.call(fallback, skinId)) {
        fallback[skinId] = !!rawState.skinsUnlocked[skinId] || fallback[skinId];
      }
    });
  }

  return fallback;
}

function getSkinLabel(skin) {
  if (skin.label) return skin.label;
  if (skin.labelKey) return t(skin.labelKey);
  return skin.id;
}

function getCharacterSpriteFromSkin(character, skinId) {
  const options = getCharacterSkinOptions(character);
  const current = options.find((skin) => skin.id === skinId) || options[0];
  return current?.sprite || character.sprite;
}

function getCurrentCharacterSkinId(character, state) {
  const options = getCharacterSkinOptions(character);
  const unlocked = normalizeCharacterSkinsUnlocked(state, options);
  const unlockedSkins = options.filter((skin) => unlocked[skin.id]);
  const selected = unlockedSkins.find((skin) => skin.id !== "base") || unlockedSkins[0] || options[0];
  return selected?.id || "base";
}

function renderCharacterSkinUnlocks(character, state, skinOptions) {
  const unlocked = normalizeCharacterSkinsUnlocked(state, skinOptions);
  const buttons = skinOptions
    .filter((skin) => skin.id !== "base")
    .map((skin) => {
      const isUnlocked = !!unlocked[skin.id];
      const actionKey = isUnlocked ? "charactersSkinLock" : "charactersSkinUnlock";
      return `
        <button
          type="button"
          class="characters-skin-btn${isUnlocked ? " is-unlocked" : " is-locked"}"
          data-character-skin-toggle="${character.id}"
          data-skin-id="${skin.id}"
          title="${escapeCharactersHtml(t(actionKey))}"
        >
          <span>${escapeCharactersHtml(getSkinLabel(skin))}</span>
          <strong>${escapeCharactersHtml(t(isUnlocked ? "charactersSkinUnlocked" : "charactersSkinLocked"))}</strong>
        </button>
      `;
    });

  if (!buttons.length) {
    return `<div class="characters-skin-empty">${escapeCharactersHtml(t("charactersNoExtraSkins"))}</div>`;
  }

  return `<div class="characters-skin-list">${buttons.join("")}</div>`;
}

function formatCharacterGroupLabel(groupId) {
  const roleGroupMap = {
    melee: "charactersRoleMelee",
    ranged: "charactersRoleRanged",
    tank: "charactersRoleTank",
    support: "charactersRoleSupport"
  };

  if (roleGroupMap[groupId]) return t(roleGroupMap[groupId]);

  const mechanicsLabelMap = {
    reducao_ataque: "charactersMechanicAttackReduction",
    ataque_invul: "charactersMechanicAttackInvul",
    buff_ataque: "charactersMechanicAttackBuff",
    quebra_def: "charactersMechanicDefenseBreak",
    cria_ponte: "charactersMechanicBridgeCreate",
    quebra_parede: "charactersMechanicWallBreak"
  };

  if (mechanicsLabelMap[groupId]) return t(mechanicsLabelMap[groupId]);

  return String(groupId || "")
    .split("_")
    .join(" ");
}

function getTierLangKey(tier) {
  if (tier === "silver") return "xpTierSilver";
  if (tier === "gold") return "xpTierGold";
  if (tier === "diamond") return "xpTierDiamond";
  return "xpTierBronze";
}

function bindCharacterCardEvents() {
  document.querySelectorAll("[data-character-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const characterId = button.getAttribute("data-character-toggle");
      const state = characterCollectionState[characterId];
      if (!state) return;
      state.active = !state.active;
      autoSaveBuild();
      charactersRender();
    });
  });

  document.querySelectorAll("[data-character-menu-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const characterId = button.getAttribute("data-character-menu-toggle");
      characterMenuOpenId = characterMenuOpenId === characterId ? "" : characterId;
      charactersRender();
      if (characterMenuOpenId) {
        const card = document.querySelector(`.characters-card[data-character-id="${characterMenuOpenId}"]`);
        if (card) {
          const rect = card.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          card.classList.toggle("menu-open-up", spaceBelow < 320);
        }
      }
    });
  });

  document.querySelectorAll("[data-character-level]").forEach((input) => {
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("change", () => {
      const characterId = input.getAttribute("data-character-level");
      const state = characterCollectionState[characterId];
      if (!state) return;
      state.level = clampCharacterNumber(input.value, 1, CHARACTER_LEVEL_CAP);
      autoSaveBuild();
      charactersRender();
    });
  });

  document.querySelectorAll("[data-character-stars-set]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const characterId = button.getAttribute("data-character-stars-set");
      const state = characterCollectionState[characterId];
      if (!state) return;
      state.stars = clampCharacterNumber(button.getAttribute("data-stars-value"), 1, CHARACTER_STAR_CAP);
      autoSaveBuild();
      charactersRender();
    });
  });

  document.querySelectorAll("[data-character-tier]").forEach((select) => {
    select.addEventListener("click", (event) => event.stopPropagation());
    select.addEventListener("change", () => {
      const characterId = select.getAttribute("data-character-tier");
      const character = CHARACTERS_DATA.find((entry) => entry.id === characterId);
      const state = characterCollectionState[characterId];
      if (!state || !character) return;
      state.tier = clampCharacterTier(select.value, character);
      autoSaveBuild();
      charactersRender();
    });
  });

  document.querySelectorAll("[data-character-skin-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const characterId = button.getAttribute("data-character-skin-toggle");
      const skinId = button.getAttribute("data-skin-id");
      const character = CHARACTERS_DATA.find((entry) => entry.id === characterId);
      const state = characterCollectionState[characterId];
      if (!state || !character) return;
      const skinOptions = getCharacterSkinOptions(character);
      const normalized = normalizeCharacterSkinsUnlocked(state, skinOptions);
      if (!Object.prototype.hasOwnProperty.call(normalized, skinId)) return;
      if (skinId === "base") return;
      normalized[skinId] = !normalized[skinId];
      state.skinsUnlocked = normalized;
      autoSaveBuild();
      charactersRender();
    });
  });
}

function clampCharacterTier(value, character) {
  const requested = normalizeCharacterTier(value);
  const startIndex = CHARACTER_TIER_ORDER.indexOf(character.tierStart);
  const maxIndex = CHARACTER_TIER_ORDER.indexOf(character.tierMax);
  const requestedIndex = CHARACTER_TIER_ORDER.indexOf(requested);
  const clampedIndex = Math.max(startIndex, Math.min(maxIndex, requestedIndex));
  return CHARACTER_TIER_ORDER[clampedIndex] || character.tierStart;
}

function clampCharacterNumber(value, min, max) {
  const numeric = Math.floor(Number(value) || min);
  return Math.max(min, Math.min(max, numeric));
}

function escapeCharactersHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getCharactersState() {
  const characters = {};
  CHARACTERS_DATA.forEach((character) => {
    const state = getCharacterState(character.id, character);
    const skinOptions = getCharacterSkinOptions(character);
    const normalizedSkins = normalizeCharacterSkinsUnlocked(state, skinOptions);
    characters[character.id] = {
      active: !!state.active,
      level: clampCharacterNumber(state.level, 1, CHARACTER_LEVEL_CAP),
      stars: clampCharacterNumber(state.stars, 1, CHARACTER_STAR_CAP),
      tier: clampCharacterTier(state.tier, character),
      skinsUnlocked: normalizedSkins
    };
  });

  return {
    version: 1,
    characters
  };
}

function applyCharactersState(state) {
  if (!Array.isArray(CHARACTERS_DATA) || !CHARACTERS_DATA.length) return;

  characterCollectionState = buildDefaultCharacterCollectionState();

  const characterMap = state && typeof state === "object" ? state.characters || state : {};
  Object.keys(characterMap || {}).forEach((characterId) => {
    const character = CHARACTERS_DATA.find((entry) => entry.id === characterId);
    if (!character) return;

    const raw = characterMap[characterId] || {};
    const skinOptions = getCharacterSkinOptions(character);
    characterCollectionState[characterId] = {
      active: !!raw.active,
      level: clampCharacterNumber(raw.level, 1, CHARACTER_LEVEL_CAP),
      stars: clampCharacterNumber(raw.stars, 1, CHARACTER_STAR_CAP),
      tier: clampCharacterTier(raw.tier || character.tierStart, character),
      skinsUnlocked: normalizeCharacterSkinsUnlocked(raw, skinOptions)
    };
  });

  characterMenuOpenId = "";
  charactersRender();
}

function resetCharactersState() {
  characterCollectionState = buildDefaultCharacterCollectionState();
  characterMenuOpenId = "";
  charactersRender();
}