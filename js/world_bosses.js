// ============================================================
// World Bosses tabs â€” Shai-Hulud + Mihawk + Hiking Bear + Byakko + Bananawani + Plesiosaur + Aokiji
// ============================================================

const WB_REWARD_ITEM_LABELS = {
  exclusiveIcon: "wbRewardExclusiveIcon",
  kidNecklace: "wbRewardKidNecklace",
  kidCoat: "wbRewardKidCoat",
  kidPants: "wbRewardKidPants",
  kidEmblem: "wbRewardKidEmblem",
  kidGlasses: "wbRewardKidGlasses",
  awakeningStones: "wbRewardAwakeningStones",
  dynamicDiamondMedal: "wbRewardDynamicDiamondMedal",
  key: "wbRewardKey",
  berries: "wbRewardBerries",
  glStaminaPotion: "wbRewardGlStaminaPotion",
  valorMedals: "wbRewardValorMedals",
  shaiArtifacts: "wbRewardShaiArtifacts",
  mihawkArtifacts: "wbRewardMihawkArtifacts",
  hikingBearArtifacts: "wbRewardHikingBearArtifacts",
  byakkoArtifacts: "wbRewardByakkoArtifacts",
  bananawaniArtifacts: "wbRewardBananawaniArtifacts",
  plesiosaurArtifacts: "wbRewardPlesiosaurArtifacts",
  aokijiSword: "wbRewardAokijiSword",
  aokijiArtifacts: "wbRewardAokijiArtifacts",
};

const WB_BOSSES = {
  shai_hulud: {
    icon: "sprites/world_bosses/shai_hulud/shai_icon.png",
    dom: {
      tableWrap: "wb-table-wrap",
      tableToggle: "wb-table-toggle",
      skillGif: "wb-skill-gif",
      skillLabel: "wb-skill-label",
      skillDescription: "wb-skill-description",
      characters: "wb-characters",
      rewards: "wb-rewards",
    },
    skillsAll: [
      "wbShaiSkillBasicAttack",
      "wbShaiSkillTentacles",
      "wbShaiSkillAcidSpit",
      "wbShaiSkillSubmersion",
      "wbShaiSkillTornado",
      "wbShaiSkillHealCutRoar",
      "wbShaiSkillSandwormWaves",
    ],
    skillGifs: {
      wbShaiSkillBasicAttack: "sprites/world_bosses/shai_hulud/basic_attack_shai.gif",
      wbShaiSkillTentacles:   "sprites/world_bosses/shai_hulud/tentacle_shai.gif",
      wbShaiSkillAcidSpit:    "sprites/world_bosses/shai_hulud/spit_shai.gif",
      wbShaiSkillSubmersion:  "sprites/world_bosses/shai_hulud/mechanic_shai.gif",
      wbShaiSkillTornado:     "sprites/world_bosses/shai_hulud/tornado_shai.gif",
      wbShaiSkillHealCutRoar: "sprites/world_bosses/shai_hulud/heal_reduction_shai.gif",
      wbShaiSkillSandwormWaves: "sprites/world_bosses/shai_hulud/wave_shai.gif",
    },
    skillDescriptions: {
      wbShaiSkillBasicAttack:   "wbShaiDescBasicAttack",
      wbShaiSkillTentacles:     "wbShaiDescTentacles",
      wbShaiSkillAcidSpit:      "wbShaiDescAcidSpit",
      wbShaiSkillSubmersion:    "wbShaiDescSubmersion",
      wbShaiSkillTornado:       "wbShaiDescTornado",
      wbShaiSkillHealCutRoar:   "wbShaiDescHealCutRoar",
      wbShaiSkillSandwormWaves: "wbShaiDescSandwormWaves",
    },
    phases: [
      { phase: "Fase 1",  damage: "wbPhaseInitial", skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }] },
      { phase: "Fase 2",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillAcidSpit" }] },
      { phase: "Fase 3",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillSubmersion", note: "wbShaiNoteTotalSilence" }] },
      { phase: "Fase 4",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillAcidSpit" }, { name: "wbShaiSkillTornado" }, { name: "wbShaiSkillHealCutRoar" }] },
      { phase: "Fase 5",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillSubmersion", note: "wbShaiNoteTotalSilence" }] },
      { phase: "Fase 6",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillAcidSpit" }, { name: "wbShaiSkillSandwormWaves" }] },
      { phase: "Fase 7",  damage: "*",            skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillSubmersion", note: "wbShaiNoteTotalSilence" }] },
      { phase: "Fase 8",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillTornado", count: 2 }, { name: "wbShaiSkillAcidSpit", count: 2 }, { name: "wbShaiSkillHealCutRoar" }] },
      { phase: "Fase 9",  damage: "*",          skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillSubmersion", note: "wbShaiNoteTotalSilence" }] },
      { phase: "Fase 10", damage: "*",         skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillTentacles" }, { name: "wbShaiSkillTornado" }, { name: "wbShaiSkillAcidSpit" }, { name: "wbShaiSkillSandwormWaves" }, { name: "wbShaiSkillHealCutRoar" }] },
      { phase: "Fase 11", damage: "*",         skills: [{ name: "wbShaiSkillBasicAttack" }, { name: "wbShaiSkillSubmersion", note: "wbShaiNoteTotalSilence" }, { name: "wbShaiSkillTentacles" }] },
    ],
    characters: {
      tank: [
        { id: "rebecca",       label: "Rebecca" },
        { id: "crocodile",     label: "Crocodile" },
        { id: "bastille",      label: "Bastille" },
        { id: "smoker",        label: "Smoker" },
      ],
      dps: [
        { id: "enel",              label: "Enel" },
        { id: "marshall_teach",    label: "Teach" },
        { id: "vinsmoke_niji",     label: "Niji" },
        { id: "carrot",            label: "Carrot" },
        { id: "ryuma",             label: "Ryuma" },
        { id: "silvers_rayleigh",  label: "Rayleigh" },
        { id: "basil_hawkins",     label: "Basil" },
        { id: "margareth",         label: "Margareth" },
        { id: "nico_robin_ts",     label: "Robin TS" },
        { id: "van_augur",         label: "Van Augur" },
        { id: "trafalgar_law",     label: "Law" },
        { id: "monkey_garp",       label: "Garp" },
      ],
      support: [
        { id: "emporio_ivankov", label: "Ivankov" },
        { id: "scratchmen_apoo", label: "Apoo" },
        { id: "gecko_moria",     label: "Moria" },
        { id: "vinsmoke_reiju",  label: "Reiju" },
      ],
    },
    rewards: buildRewards("16.000.000", "15.500.000", "11.000.000", "7.500.000", "3.500.000", "1.500.000", "50.000", "shaiArtifacts", "sprites/world_bosses/shai_hulud/shai_icon.png"),
  },

  mihawk: {
    icon: "sprites/world_bosses/mihawk/mihawk_icon.png",
    dom: {
      tableWrap: "wb-table-wrap-mh",
      tableToggle: "wb-table-toggle-mh",
      skillGif: "wb-skill-gif-mh",
      skillLabel: "wb-skill-label-mh",
      skillDescription: "wb-skill-description-mh",
      characters: "wb-characters-mh",
      rewards: "wb-rewards-mh",
    },
    skillsAll: [
      "wbMihawkSkillTeleport",
      "wbMihawkSkillDash",
      "wbMihawkSkillWaves",
      "wbMihawkSkillGreenRectangle",
      "wbMihawkSkillKokutoArahoshi",
      "wbMihawkSkillSuihei",
      "wbMihawkSkillChiWoHauZangeki",
      "wbMihawkSkillKokutoIssen",
      "wbMihawkSkillBasicAttack",
    ],
    skillGifs: {
      wbMihawkSkillTeleport:         "sprites/world_bosses/mihawk/teleport_mihawk.gif",
      wbMihawkSkillDash:             "sprites/world_bosses/mihawk/dash_mihawk.gif",
      wbMihawkSkillWaves:            "sprites/world_bosses/mihawk/wave_mihawk.gif",
      wbMihawkSkillGreenRectangle:   "sprites/world_bosses/mihawk/green_rectangle_suihei_mihawk.gif",
      wbMihawkSkillKokutoArahoshi:   "sprites/world_bosses/mihawk/kokuto_arahoshi_mihawk.gif",
      wbMihawkSkillSuihei:           "sprites/world_bosses/mihawk/suihei_mihawk.gif",
      wbMihawkSkillChiWoHauZangeki:  "sprites/world_bosses/mihawk/zangeki_mihawk.gif",
      wbMihawkSkillKokutoIssen:      "sprites/world_bosses/mihawk/issen_mihawk.gif",
      wbMihawkSkillBasicAttack:      "sprites/world_bosses/mihawk/basic_attack_mihawk.gif",
    },
    skillDescriptions: {
      wbMihawkSkillBasicAttack:     "wbMihawkDescBasicAttack",
      wbMihawkSkillTeleport:        "wbMihawkDescTeleport",
      wbMihawkSkillDash:            "wbMihawkDescDash",
      wbMihawkSkillWaves:           "wbMihawkDescWaves",
      wbMihawkSkillGreenRectangle:  "wbMihawkDescGreenRectangle",
      wbMihawkSkillKokutoArahoshi:  "wbMihawkDescKokutoArahoshi",
      wbMihawkSkillSuihei:          "wbMihawkDescSuihei",
      wbMihawkSkillChiWoHauZangeki: "wbMihawkDescChiWoHauZangeki",
      wbMihawkSkillKokutoIssen:     "wbMihawkDescKokutoIssen",
    },
    phases: [
      { phase: "Fase 1",  damage: "wbPhaseInitial", skills: [{ name: "wbMihawkSkillTeleport" }] },
      { phase: "Fase 2",  damage: "*", skills: [{ name: "wbMihawkSkillDash", count: 2 }] },
      { phase: "Fase 3",  damage: "*", skills: [{ name: "wbMihawkSkillDash", count: 2 }, { name: "wbMihawkSkillWaves", note: "2" }] },
      { phase: "Fase 4",  damage: "*", skills: [{ name: "wbMihawkSkillTeleport" }, { name: "wbMihawkSkillWaves", note: "4" }] },
      { phase: "Fase 5",  damage: "*", skills: [{ name: "wbMihawkSkillGreenRectangle" }, { name: "wbMihawkSkillWaves", note: "4" }] },
      { phase: "Fase 6",  damage: "*", skills: [{ name: "wbMihawkSkillDash" }, { name: "wbMihawkSkillSuihei", note: "M2" }, { name: "wbMihawkSkillChiWoHauZangeki", note: "M3" }] },
      { phase: "Fase 7",  damage: "*", skills: [{ name: "wbMihawkSkillKokutoIssen", note: "M5" }, { name: "wbMihawkSkillDash" }, { name: "wbMihawkSkillSuihei", note: "M2" }, { name: "wbMihawkSkillChiWoHauZangeki", note: "M3" }] },
      { phase: "Fase 8",  damage: "*", skills: [{ name: "wbMihawkSkillDash" }, { name: "wbMihawkSkillSuihei", note: "M2" }, { name: "wbMihawkSkillChiWoHauZangeki", note: "M3" }] },
      { phase: "Fase 9",  damage: "*", skills: [{ name: "wbMihawkSkillGreenRectangle", count: 2 }, { name: "wbMihawkSkillDash" }, { name: "wbMihawkSkillSuihei", note: "M2" }, { name: "wbMihawkSkillChiWoHauZangeki", note: "M3" }] },
      { phase: "Fase 10", damage: "*", skills: [{ name: "wbMihawkSkillKokutoIssen", note: "M5" }, { name: "wbMihawkSkillDash" }, { name: "wbMihawkSkillSuihei", note: "M2" }, { name: "wbMihawkSkillChiWoHauZangeki", note: "M3" }] },
      { phase: "Fase 11", damage: "*", skills: [{  }] },
      { phase: "Fase 12", damage: "*", skills: [{  }] },
    ],
    characters: {
      tank: [
        { id: "jinbe",       label: "Jinbe" },
        { id: "eustass_kid", label: "Kid" },
        { id: "bastille",    label: "Bastille" },
      ],
      dps: [
        { id: "enel",          label: "Enel" },
        { id: "shanks",        label: "Shanks" },
        { id: "vinsmoke_niji", label: "Niji" },
        { id: "baby_5",        label: "Baby 5" },
        { id: "killer",        label: "Killer" },
        { id: "monkey_garp",   label: "Garp" },
        { id: "silvers_rayleigh", label: "Rayleigh" },
        { id: "margareth",     label: "Marguerite" },
      ],
      support: [
        { id: "emporio_ivankov", label: "Ivankov" },
        { id: "chopper",         label: "Chopper" },
        { id: "leo_mansherry",   label: "Leo" },
        { id: "gecko_moria",     label: "Moria" },
      ],
    },
    rewards: buildRewards("21.000.000", "19.000.000", "15.000.000", "9.000.000", "400.000", "200.000", "50.000", "mihawkArtifacts", "sprites/world_bosses/mihawk/mihawk_icon.png"),
  },

  hiking_bear: {
    icon: "sprites/world_bosses/hiking_bear/basic_attack_bear.gif",
    dom: {
      tableWrap: "hb-table-wrap",
      tableToggle: "hb-table-toggle",
      skillGif: "hb-skill-gif",
      skillLabel: "hb-skill-label",
      skillDescription: "hb-skill-description",
      characters: "hb-characters",
      rewards: "hb-rewards",
    },
    skillsAll: [
      "wbHikingSkillBasicAttack",
      "wbHikingSkillFrontalPickaxe",
      "wbHikingSkillBigSmash",
      "wbHikingSkillAntiRangedIce",
      "wbHikingSkillAntiRangedBarrier",
      "wbHikingSkillAvalanche",
    ],
    skillGifs: {
      wbHikingSkillBasicAttack:       "sprites/world_bosses/hiking_bear/basic_attack_bear.gif",
      wbHikingSkillFrontalPickaxe:    "sprites/world_bosses/hiking_bear/frontal_pickaxe_bear.gif",
      wbHikingSkillBigSmash:          "sprites/world_bosses/hiking_bear/big_smash_bear.gif",
      wbHikingSkillAntiRangedIce:     "sprites/world_bosses/hiking_bear/anti_ranged_bear.gif",
      wbHikingSkillAntiRangedBarrier: "sprites/world_bosses/hiking_bear/anti_ranged_barrier_bear.gif",
      wbHikingSkillAvalanche:         "sprites/world_bosses/hiking_bear/avalanche_bear.gif",
    },
    skillDescriptions: {
      wbHikingSkillBasicAttack:       "wbHikingDescBasicAttack",
      wbHikingSkillFrontalPickaxe:    "wbHikingDescFrontalPickaxe",
      wbHikingSkillBigSmash:          "wbHikingDescBigSmash",
      wbHikingSkillAntiRangedIce:     "wbHikingDescAntiRangedIce",
      wbHikingSkillAntiRangedBarrier: "wbHikingDescAntiRangedBarrier",
      wbHikingSkillAvalanche:         "wbHikingDescAvalanche",
    },
    phases: [
      { phase: "Fase 1", damage: "wbPhaseInitial", skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }] },
      { phase: "Fase 2", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }, { name: "wbHikingSkillBigSmash" }, { name: "wbHikingSkillAntiRangedIce" }] },
      { phase: "Fase 3", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillBigSmash" }, { name: "wbHikingSkillAntiRangedBarrier" }] },
      { phase: "Fase 4", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }, { name: "wbHikingSkillAntiRangedIce" }, { name: "wbHikingSkillAvalanche", note: "~60s" }] },
      { phase: "Fase 5", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }, { name: "wbHikingSkillBigSmash", note: "wbNoteAmplified" }, { name: "wbHikingSkillAntiRangedBarrier" }, { name: "wbHikingSkillAvalanche", note: "~50s" }] },
      { phase: "Fase 6", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }, { name: "wbHikingSkillBigSmash", note: "wbNoteAmplified" }, { name: "wbHikingSkillAntiRangedBarrier" }, { name: "wbHikingSkillAntiRangedIce" }] },
      { phase: "Fase 7", damage: "*",          skills: [{ name: "wbHikingSkillBasicAttack" }, { name: "wbHikingSkillFrontalPickaxe" }, { name: "wbHikingSkillBigSmash", note: "wbNoteAmplified" }, { name: "wbHikingSkillAntiRangedBarrier" }, { name: "wbHikingSkillAntiRangedIce" }, { name: "wbHikingSkillAvalanche" }] },
      { phase: "Fase 8", damage: "*",          skills: [{ }] },
      { phase: "Fase 9", damage: "*",          skills: [{ }] },
      { phase: "Fase 10", damage: "*",          skills: [{ }] },
      { phase: "Fase 11", damage: "*",          skills: [{ }] },
      { phase: "Fase 12", damage: "*",          skills: [{ }] },
    ],
    characters: {
      tank: [
        { id: "aokiji",   label: "Aokiji" },
        { id: "rebecca",  label: "Rebecca" },
        { id: "bastille", label: "Bastille" },
      ],
      dps: [
        { id: "enel",          label: "Enel" },
        { id: "portgas_ace",   label: "Ace" },
        { id: "trafalgar_law", label: "Law" },
        { id: "killer",        label: "Killer" },
        { id: "van_augur",     label: "Van Augur" },
        { id: "monkey_garp",   label: "Garp" },
        { id: "silvers_rayleigh", label: "Rayleigh" },
        { id: "margareth",     label: "Marguerite" },
      ],
      support: [
        { id: "emporio_ivankov", label: "Ivankov" },
        { id: "chopper",         label: "Chopper" },
        { id: "perona",          label: "Perona" },
        { id: "leo_mansherry",   label: "Leo" },
      ],
    },
    rewards: [
      {
        tier: "Top 1", damage: null, top1: true,
        items: [
          { itemKey: "exclusiveIcon",       count: 1,         icon: "sprites/world_bosses/hiking_bear/top_1_icon.gif" },
          { itemKey: "kidNecklace",         count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
          { itemKey: "kidCoat",             count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
          { itemKey: "kidPants",            count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
          { itemKey: "kidEmblem",           count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
          { itemKey: "kidGlasses",          count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
          { itemKey: "awakeningStones",     count: 8,         icon: "sprites/items/special/awakening_stone.png" },
          { itemKey: "dynamicDiamondMedal", count: 2,         icon: "sprites/items/special/dynamic_diamond_medal.gif" },
          { itemKey: "key",                 count: 1,         icon: "sprites/items/special/key.png" },
          { itemKey: "berries",             count: "100.000", icon: null },
          { itemKey: "glStaminaPotion",     count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
          { itemKey: "valorMedals",         count: 18,        icon: "sprites/items/special/valiance_medal.png" },
          { itemKey: "hikingBearArtifacts", count: 10,        icon: "sprites/world_bosses/hiking_bear/artifact.png" },
        ],
      },
      { tier: "Tier 1", damage: "29.000.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 8, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "30.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 18, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "hikingBearArtifacts", count: 10, icon: "sprites/world_bosses/hiking_bear/artifact.png" }] },
      { tier: "Tier 2", damage: "19.500.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 4, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "25.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 15, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "hikingBearArtifacts", count: 5, icon: "sprites/world_bosses/hiking_bear/artifact.png" }] },
      { tier: "Tier 3", damage: "15.500.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 2, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "20.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 10, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "hikingBearArtifacts", count: 1, icon: "sprites/world_bosses/hiking_bear/artifact.png" }] },
      { tier: "Tier 4", damage: "11.500.000",  items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "15.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 5, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 5", damage: "5.500.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "10.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 3, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 6", damage: "2.500.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "7.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
      { tier: "Tier 7", damage: "50.000",     items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "5.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
    ],
  },

  byakko: {
    icon: "sprites/world_bosses/byakko/basic_claw_byakko.gif",
    dom: {
      tableWrap: "bk-table-wrap",
      tableToggle: "bk-table-toggle",
      skillGif: "bk-skill-gif",
      skillLabel: "bk-skill-label",
      skillDescription: "bk-skill-description",
      characters: "bk-characters",
      rewards: "bk-rewards",
    },
    skillsAll: [
      "wbByakkoSkillBasicClaw",
      "wbByakkoSkillFrontalRoar",
      "wbByakkoSkillTwoTigerWaves",
      "wbByakkoSkillRapidClaws",
      "wbByakkoSkillSideClaw",
      "wbByakkoSkillBranches",
      "wbByakkoSkillThreeTigerWaves",
      "wbByakkoSkillHealCut",
    ],
    skillGifs: {
      wbByakkoSkillBasicClaw:       "sprites/world_bosses/byakko/basic_claw_byakko.gif",
      wbByakkoSkillFrontalRoar:     "sprites/world_bosses/byakko/frontal_roar_byakko.gif",
      wbByakkoSkillTwoTigerWaves:   "sprites/world_bosses/byakko/tiger_wave_byakko.gif",
      wbByakkoSkillRapidClaws:      "sprites/world_bosses/byakko/rapid_claw_byakko.gif",
      wbByakkoSkillSideClaw:        "sprites/world_bosses/byakko/instant_ko_claw_byakko.gif",
      wbByakkoSkillBranches:        "sprites/world_bosses/byakko/falling_branches_byakko.gif",
      wbByakkoSkillThreeTigerWaves: "sprites/world_bosses/byakko/tiger_wave_byakko.gif",
      wbByakkoSkillHealCut:         "sprites/world_bosses/byakko/heal_block_roar_byakko.gif",
    },
    skillDescriptions: {
      wbByakkoSkillBasicClaw:       "wbByakkoDescBasicClaw",
      wbByakkoSkillFrontalRoar:     "wbByakkoDescFrontalRoar",
      wbByakkoSkillTwoTigerWaves:   "wbByakkoDescTwoTigerWaves",
      wbByakkoSkillRapidClaws:      "wbByakkoDescRapidClaws",
      wbByakkoSkillSideClaw:        "wbByakkoDescSideClaw",
      wbByakkoSkillBranches:        "wbByakkoDescBranches",
      wbByakkoSkillThreeTigerWaves: "wbByakkoDescThreeTigerWaves",
      wbByakkoSkillHealCut:         "wbByakkoDescHealCut",
    },
    phases: [
      { phase: "Fase 1", damage: "wbPhaseInitial", tier: "Tier 7",  skills: [{ name: "wbByakkoSkillBasicClaw" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 2", damage: "~520k",                           skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillFrontalRoar" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 3", damage: "~1.5kk",                          skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillTwoTigerWaves" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 4", damage: "~2.54kk", tier: "Tier 6",  skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillRapidClaws" }, { name: "wbByakkoSkillFrontalRoar" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 5", damage: "~4.16kk",                          skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillSideClaw" }, { name: "wbByakkoSkillFrontalRoar" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 6", damage: "~5.725kk", tier: "Tier 5", skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillFrontalRoar" }, { name: "wbByakkoSkillTwoTigerWaves" }, { name: "wbByakkoSkillBranches" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 7", damage: "~7.84kk*",                         skills: [{ name: "wbByakkoSkillRapidClaws" }, { name: "wbByakkoSkillBranches" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 8", damage: "~10.24kk*", tier: "Tier 4*", skills: [{ name: "wbByakkoSkillRapidClaws" }, { name: "wbByakkoSkillSideClaw" }, { name: "wbByakkoSkillThreeTigerWaves" }, { name: "wbByakkoSkillBranches" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 9", damage: "~12.96kk*", tier: "Tier 3*", skills: [{ name: "wbByakkoSkillBasicClaw" }, { name: "wbByakkoSkillRapidClaws" }, { name: "wbByakkoSkillSideClaw" }, { name: "wbByakkoSkillFrontalRoar" }, { name: "wbByakkoSkillThreeTigerWaves" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 10", damage: "~16kk*", tier: "Tier 2*", skills: [{ name: "wbByakkoSkillBasicClaw" }, {name: "wbByakkoSkillHealCut"}] },
      { phase: "Fase 11", damage: "~19.36kk*", tier: "Tier 1*", skills: [{ name: "wbByakkoSkillBasicClaw" }, {name: "wbByakkoSkillSideClaw"}, {name: "wbByakkoSkillHealCut"}] },
    ],
    characters: {
      dps: [
        { id: "boa_hancock",   label: "Hancock" },
        { id: "enel",          label: "Enel" },
        { id: "carrot",        label: "Carrot" },
        { id: "baby_5",        label: "Baby 5" },
        { id: "vinsmoke_niji", label: "Niji" },
        { id: "tashigi",       label: "Tashigi" },
        { id: "monkey_garp",   label: "Garp" },
        { id: "silvers_rayleigh", label: "Rayleigh" },
        { id: "margareth",     label: "Marguerite" },
      ],
      support: [
        { id: "marco",          label: "Marco" },
        { id: "vinsmoke_reiju", label: "Reiju" },
        { id: "gecko_moria",    label: "Moria" },
      ],
    },
    rewards: [
      {
        tier: "Top 1", damage: null, top1: true,
        items: [
          { itemKey: "exclusiveIcon",       count: 1,         icon: "sprites/world_bosses/byakko/top_1_icon.gif" },
          { itemKey: "kidNecklace",         count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
          { itemKey: "kidCoat",             count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
          { itemKey: "kidPants",            count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
          { itemKey: "kidEmblem",           count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
          { itemKey: "kidGlasses",          count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
          { itemKey: "awakeningStones",     count: 8,         icon: "sprites/items/special/awakening_stone.png" },
          { itemKey: "dynamicDiamondMedal", count: 2,         icon: "sprites/items/special/dynamic_diamond_medal.gif" },
          { itemKey: "key",                 count: 1,         icon: "sprites/items/special/key.png" },
          { itemKey: "berries",             count: "100.000", icon: null },
          { itemKey: "glStaminaPotion",     count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
          { itemKey: "valorMedals",         count: 18,        icon: "sprites/items/special/valiance_medal.png" },
          { itemKey: "byakkoArtifacts",     count: 10,        icon: "sprites/world_bosses/byakko/artifact.png" },
        ],
      },
      { tier: "Tier 1", damage: "19.000.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 8, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "30.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 18, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "byakkoArtifacts", count: 10, icon: "sprites/world_bosses/byakko/artifact.png" }] },
      { tier: "Tier 2", damage: "14.500.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 4, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "25.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 15, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "byakkoArtifacts", count: 5, icon: "sprites/world_bosses/byakko/artifact.png" }] },
      { tier: "Tier 3", damage: "12.500.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 2, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "20.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 10, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "byakkoArtifacts", count: 1, icon: "sprites/world_bosses/byakko/artifact.png" }] },
      { tier: "Tier 4", damage: "9.000.000",  items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "15.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 5, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 5", damage: "5.000.000",  items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "10.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 3, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 6", damage: "2.500.000",  items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "7.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
      { tier: "Tier 7", damage: "50.000",     items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "5.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
    ],
  },

  bananawani: {
    icon: "sprites/world_bosses/bananawani/bite_bananawani.gif",
    dom: {
      tableWrap: "bw-table-wrap",
      tableToggle: "bw-table-toggle",
      skillGif: "bw-skill-gif",
      skillLabel: "bw-skill-label",
      skillDescription: "bw-skill-description",
      characters: "bw-characters",
      rewards: "bw-rewards",
    },
    skillsAll: [
      "wbBananawaniSkillBite",
      "wbBananawaniSkillAirBlow",
      "wbBananawaniSkillCharge",
      "wbBananawaniSkillCrocodile",
      "wbBananawaniSkillRocks",
      "wbBananawaniSkillPillars",
      "wbBananawaniSkillHealReduction",
      "wbBananawaniSkillFans",
    ],
    skillGifs: {
      wbBananawaniSkillBite:          "sprites/world_bosses/bananawani/bite_bananawani.gif",
      wbBananawaniSkillAirBlow:       "sprites/world_bosses/bananawani/air_blow_bananawani.gif",
      wbBananawaniSkillCharge:        "sprites/world_bosses/bananawani/charge_bananawani.gif",
      wbBananawaniSkillCrocodile:     "sprites/world_bosses/bananawani/crocodile_bananawani.gif",
      wbBananawaniSkillRocks:         "sprites/world_bosses/bananawani/rocks_bananawani.gif",
      wbBananawaniSkillPillars:       "sprites/world_bosses/bananawani/pillars_bananawani.gif",
      wbBananawaniSkillHealReduction: "sprites/world_bosses/bananawani/heal_reduction_bananawani.gif",
      wbBananawaniSkillFans:          "sprites/world_bosses/bananawani/fans_bananawani.gif",
    },
    skillDescriptions: {
      wbBananawaniSkillBite:          "wbBananawaniDescBite",
      wbBananawaniSkillAirBlow:       "wbBananawaniDescAirBlow",
      wbBananawaniSkillCharge:        "wbBananawaniDescCharge",
      wbBananawaniSkillCrocodile:     "wbBananawaniDescCrocodile",
      wbBananawaniSkillRocks:         "wbBananawaniDescRocks",
      wbBananawaniSkillPillars:       "wbBananawaniDescPillars",
      wbBananawaniSkillHealReduction: "wbBananawaniDescHealReduction",
      wbBananawaniSkillFans:          "wbBananawaniDescFans",
    },
    phases: [
      { phase: "Fase 1",  damage: "wbPhaseInitial", skills: [{ name: "wbBananawaniSkillBite" }] },
      { phase: "Fase 2",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillAirBlow" }] },
      { phase: "Fase 3",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillCharge" }] },
      { phase: "Fase 4",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillCrocodile" }, { name: "wbBananawaniSkillRocks" }] },
      { phase: "Fase 5",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillPillars" }, { name: "wbBananawaniSkillHealReduction" }] },
      { phase: "Fase 6",  damage: "*",          skills: [{ name: "wbBananawaniSkillCharge" }, { name: "wbBananawaniSkillAirBlow" }, { name: "wbBananawaniSkillRocks" }] },
      { phase: "Fase 7",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillCharge" }, { name: "wbBananawaniSkillCrocodile" }, { name: "wbBananawaniSkillPillars" }] },
      { phase: "Fase 8",  damage: "*",          skills: [{ name: "wbBananawaniSkillCharge" }, { name: "wbBananawaniSkillFans" }, { name: "wbBananawaniSkillRocks" }, { name: "wbBananawaniSkillHealReduction" }] },
      { phase: "Fase 9",  damage: "*",          skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillCharge" }, { name: "wbBananawaniSkillCrocodile" }, { name: "wbBananawaniSkillPillars" }, { name: "wbBananawaniSkillFans" }] },
      { phase: "Fase 10", damage: "*",         skills: [{ name: "wbBananawaniSkillBite" }, { name: "wbBananawaniSkillCharge" }, { name: "wbBananawaniSkillCrocodile" }, { name: "wbBananawaniSkillAirBlow" }, { name: "wbBananawaniSkillPillars" }, { name: "wbBananawaniSkillRocks" }, { name: "wbBananawaniSkillHealReduction" }, { name: "wbBananawaniSkillFans" }] },
    ],
    characters: {
      dps: [
        { id: "borsalino_kizaru", label: "Kizaru" },
        { id: "portgas_ace",      label: "Ace" },
        { id: "trafalgar_law",    label: "Law" },
        { id: "van_augur",        label: "Van Augur" },
        { id: "vinsmoke_niji",    label: "Niji" },
        { id: "monkey_garp",      label: "Garp" },
        { id: "silvers_rayleigh", label: "Rayleigh" },
        { id: "margareth",        label: "Marguerite" },
      ],
      support: [
        { id: "jewelry_bonney",  label: "Bonney" },
        { id: "scratchmen_apoo", label: "Apoo" },
        { id: "gecko_moria",     label: "Moria" },
        { id: "chopper",         label: "Chopper" },
      ],
    },
    rewards: [
      {
        tier: "Top 1", damage: null, top1: true,
        items: [
          { itemKey: "exclusiveIcon",       count: 1,         icon: "sprites/world_bosses/bananawani/top_1_icon.gif" },
          { itemKey: "awakeningStones",     count: 10,        icon: "sprites/items/special/awakening_stone.png" },
          { itemKey: "dynamicDiamondMedal", count: 3,         icon: "sprites/items/special/dynamic_diamond_medal.gif" },
          { itemKey: "key",                 count: 1,         icon: "sprites/items/special/key.png" },
          { itemKey: "berries",             count: "120.000", icon: null },
          { itemKey: "glStaminaPotion",     count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
          { itemKey: "valorMedals",         count: 20,        icon: "sprites/items/special/valiance_medal.png" },
          { itemKey: "bananawaniArtifacts", count: 12,        icon: "sprites/world_bosses/bananawani/artifact_banana.png" },
        ],
      },
      { tier: "Tier 1", damage: "18.000.000", items: [{ itemKey: "awakeningStones", count: 8,  icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "40.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 16, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "bananawaniArtifacts", count: 10, icon: "sprites/world_bosses/bananawani/artifact_banana.png" }] },
      { tier: "Tier 2", damage: "16.000.000", items: [{ itemKey: "awakeningStones", count: 6,  icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "30.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 14, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "bananawaniArtifacts", count: 8,  icon: "sprites/world_bosses/bananawani/artifact_banana.png" }] },
      { tier: "Tier 3", damage: "14.000.000", items: [{ itemKey: "awakeningStones", count: 4,  icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "24.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 10, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "bananawaniArtifacts", count: 5,  icon: "sprites/world_bosses/bananawani/artifact_banana.png" }] },
      { tier: "Tier 4", damage: "10.000.000", items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "18.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 7,  icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "bananawaniArtifacts", count: 3, icon: "sprites/world_bosses/bananawani/artifact_banana.png" }] },
      { tier: "Tier 5", damage: "6.000.000",  items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "12.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 4,  icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "bananawaniArtifacts", count: 1, icon: "sprites/world_bosses/bananawani/artifact_banana.png" }] },
      { tier: "Tier 6", damage: "2.000.000",  items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "8.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
      { tier: "Tier 7", damage: "50.000",     items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "5.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
    ],
  },

  plesiosaur: {
    icon: "sprites/world_bosses/plesiosaur/basic_attack_plesiosaur.gif",
    dom: {
      tableWrap: "pl-table-wrap",
      tableToggle: "pl-table-toggle",
      skillGif: "pl-skill-gif",
      skillLabel: "pl-skill-label",
      skillDescription: "pl-skill-description",
      characters: "pl-characters",
      rewards: "pl-rewards",
    },
    skillsAll: [
      "wbPlesiosaurSkillBasicAttack",
      "wbPlesiosaurSkillHealingCut",
      "wbPlesiosaurSkillBubbles2",
      "wbPlesiosaurSkillBubbles4",
      "wbPlesiosaurSkillWaves",
      "wbPlesiosaurSkillSubmersion",
      "wbPlesiosaurSkillAquaticEruptions",
    ],
    skillGifs: {
      wbPlesiosaurSkillBasicAttack:      "sprites/world_bosses/plesiosaur/basic_attack_plesiosaur.gif",
      wbPlesiosaurSkillHealingCut:       "sprites/world_bosses/plesiosaur/heal_reduction.gif",
      wbPlesiosaurSkillBubbles2:         "sprites/world_bosses/plesiosaur/bubbles_plesiosaur.gif",
      wbPlesiosaurSkillBubbles4:         "sprites/world_bosses/plesiosaur/bubbles_plesiosaur.gif",
      wbPlesiosaurSkillWaves:            "sprites/world_bosses/plesiosaur/wave_plesiosaur.gif",
      wbPlesiosaurSkillSubmersion:       "sprites/world_bosses/plesiosaur/submersion_plesiosaur.gif",
      wbPlesiosaurSkillAquaticEruptions: "sprites/world_bosses/plesiosaur/eruption_plesiosaur.gif",
    },
    skillDescriptions: {
      wbPlesiosaurSkillBasicAttack:      "wbPlesiosaurDescBasicAttack",
      wbPlesiosaurSkillHealingCut:       "wbPlesiosaurDescHealingCut",
      wbPlesiosaurSkillBubbles2:         "wbPlesiosaurDescBubbles2",
      wbPlesiosaurSkillBubbles4:         "wbPlesiosaurDescBubbles4",
      wbPlesiosaurSkillWaves:            "wbPlesiosaurDescWaves",
      wbPlesiosaurSkillSubmersion:       "wbPlesiosaurDescSubmersion",
      wbPlesiosaurSkillAquaticEruptions: "wbPlesiosaurDescAquaticEruptions",
    },
    phases: [
      { phase: "Fase 1", damage: "wbPhaseInitial", skills: [{ name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillBasicAttack" }] },
      { phase: "Fase 2", damage: "*",          skills: [{ name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillBasicAttack" }, { name: "wbPlesiosaurSkillBubbles2" }] },
      { phase: "Fase 3", damage: "*",          skills: [{ name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillBasicAttack" }, { name: "wbPlesiosaurSkillBubbles2" }, { name: "wbPlesiosaurSkillWaves", count: 1 }] },
      { phase: "Fase 4", damage: "*",          skills: [{ name: "wbPlesiosaurSkillSubmersion" }, { name: "wbPlesiosaurSkillWaves", count: 4 }, { name: "wbPlesiosaurSkillBasicAttack" }] },
      { phase: "Fase 5", damage: "*",          skills: [{ name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillBasicAttack" }, { name: "wbPlesiosaurSkillBubbles4" }] },
      { phase: "Fase 6", damage: "*",          skills: [{ name: "wbPlesiosaurSkillWaves", count: 4 }, { name: "wbPlesiosaurSkillAquaticEruptions" }, { name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillBasicAttack" }] },
      { phase: "Fase 7", damage: "*",          skills: [{ name: "wbPlesiosaurSkillHealingCut" }, { name: "wbPlesiosaurSkillAquaticEruptions" }, { name: "wbPlesiosaurSkillBubbles4" }, { name: "wbPlesiosaurSkillBasicAttack" }] },
      { phase: "Fase 8", damage: "*",          skills: [{ }] },
      { phase: "Fase 9", damage: "*",          skills: [{ }] },
    ],
    characters: {
      tank: [
        { id: "crocodile",      label: "Crocodile" },
        { id: "rebecca",        label: "Rebecca" },
        { id: "vinsmoke_yonji", label: "Yonji" },
      ],
      dps: [
        { id: "enel",          label: "Enel" },
        { id: "boa_hancock",   label: "Hancock" },
        { id: "koala",         label: "Koala" },
        { id: "baby_5",        label: "Baby 5" },
        { id: "vinsmoke_niji", label: "Niji" },
        { id: "monkey_garp",   label: "Garp" },
        { id: "silvers_rayleigh", label: "Rayleigh" },
        { id: "margareth",     label: "Marguerite" },
      ],
      support: [
        { id: "marco",           label: "Marco" },
        { id: "vinsmoke_reiju",  label: "Reiju" },
        { id: "scratchmen_apoo", label: "Apoo" },
        { id: "gecko_moria",     label: "Moria" },
      ],
    },
    rewards: [
      {
        tier: "Top 1", damage: null, top1: true,
        items: [
          { itemKey: "exclusiveIcon",       count: 1,         icon: "sprites/world_bosses/plesiosaur/top_1_icon.gif" },
          { itemKey: "kidNecklace",         count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
          { itemKey: "kidCoat",             count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
          { itemKey: "kidPants",            count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
          { itemKey: "kidEmblem",           count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
          { itemKey: "kidGlasses",          count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
          { itemKey: "awakeningStones",     count: 8,         icon: "sprites/items/special/awakening_stone.png" },
          { itemKey: "dynamicDiamondMedal", count: 2,         icon: "sprites/items/special/dynamic_diamond_medal.gif" },
          { itemKey: "key",                 count: 1,         icon: "sprites/items/special/key.png" },
          { itemKey: "berries",             count: "100.000", icon: null },
          { itemKey: "glStaminaPotion",     count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
          { itemKey: "valorMedals",         count: 18,        icon: "sprites/items/special/valiance_medal.png" },
          { itemKey: "plesiosaurArtifacts", count: 10,        icon: "sprites/world_bosses/plesiosaur/artifact_plesiosaur.png" },
        ],
      },
      { tier: "Tier 1", damage: "21.000.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 8, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "30.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 18, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "plesiosaurArtifacts", count: 10, icon: "sprites/world_bosses/plesiosaur/artifact_plesiosaur.png" }] },
      { tier: "Tier 2", damage: "19.000.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 4, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "25.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 15, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "plesiosaurArtifacts", count: 5, icon: "sprites/world_bosses/plesiosaur/artifact_plesiosaur.png" }] },
      { tier: "Tier 3", damage: "15.000.000", items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "awakeningStones", count: 2, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "20.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 10, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "plesiosaurArtifacts", count: 1, icon: "sprites/world_bosses/plesiosaur/artifact_plesiosaur.png" }] },
      { tier: "Tier 4", damage: "9.000.000",  items: [{ itemKey: "kidNecklace", count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" }, { itemKey: "kidCoat", count: 1, icon: "sprites/icons/body/kid_jacket.gif" }, { itemKey: "kidPants", count: 1, icon: "sprites/icons/legs/kid_pants.gif" }, { itemKey: "kidEmblem", count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" }, { itemKey: "kidGlasses", count: 1, icon: "sprites/icons/head/kid_glasses.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "15.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 5, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 5", damage: "400.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "10.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 3, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 6", damage: "200.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "7.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
      { tier: "Tier 7", damage: "50.000",     items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "5.000",  icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
    ],
  },

  aokiji: {
    icon: "sprites/world_bosses/aokiji/aokiji_icon.png",
    dom: {
      tableWrap: "ao-table-wrap",
      tableToggle: "ao-table-toggle",
      skillGif: "ao-skill-gif",
      skillLabel: "ao-skill-label",
      skillDescription: "ao-skill-description",
      characters: "ao-characters",
      rewards: "ao-rewards",
    },
    skillsAll: [
      "wbAokijiSkillIceSaber",
      "wbAokijiSkillIceBlockPartisan",
      "wbAokijiSkillAntiRangedIce",
      "wbAokijiSkillIceTime",
      "wbAokijiSkillFreezingStatus",
      "wbAokijiSkillIceBlockPartisanMechanic",
      "wbAokijiSkillIceAge",
      "wbAokijiSkillIceBlockPillars",
      "wbAokijiSkillIceBlockPheasantBeak",
    ],
    skillGifs: {
      wbAokijiSkillIceSaber: "sprites/world_bosses/aokiji/ice_saber.gif",
      wbAokijiSkillIceBlockPartisan: "sprites/world_bosses/aokiji/partisan.gif",
      wbAokijiSkillAntiRangedIce: "sprites/world_bosses/aokiji/anti_ranged.gif",
      wbAokijiSkillIceTime: "sprites/world_bosses/aokiji/ice_time.gif",
      wbAokijiSkillFreezingStatus: "sprites/world_bosses/aokiji/freezing_status.gif",
      wbAokijiSkillIceBlockPartisanMechanic: "sprites/world_bosses/aokiji/partisan_mechanic.gif",
      wbAokijiSkillIceAge: "sprites/world_bosses/aokiji/ice_age.gif",
      wbAokijiSkillIceBlockPillars: "sprites/world_bosses/aokiji/ice_block_pillars.gif",
      wbAokijiSkillIceBlockPheasantBeak: "sprites/world_bosses/aokiji/ice_block_pheasant_beak.gif",
    },
    skillDescriptions: {
      wbAokijiSkillIceSaber: "wbAokijiDescIceSaber",
      wbAokijiSkillIceBlockPartisan: "wbAokijiDescIceBlockPartisan",
      wbAokijiSkillAntiRangedIce: "wbAokijiDescAntiRangedIce",
      wbAokijiSkillIceTime: "wbAokijiDescIceTime",
      wbAokijiSkillFreezingStatus: "wbAokijiDescFreezingStatus",
      wbAokijiSkillIceBlockPartisanMechanic: "wbAokijiDescIceBlockPartisanMechanic",
      wbAokijiSkillIceAge: "wbAokijiDescIceAge",
      wbAokijiSkillIceBlockPillars: "wbAokijiDescIceBlockPillars",
      wbAokijiSkillIceBlockPheasantBeak: "wbAokijiDescIceBlockPheasantBeak",
    },
    phases: [
      { phase: "Fase 1", damage: "wbPhaseInitial", skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }] },
      { phase: "Fase 2", damage: "*",           skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }] },
      { phase: "Fase 3", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillIceTime" }, { name: "wbAokijiSkillFreezingStatus" }] },
      { phase: "Fase 4", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillIceBlockPartisanMechanic" }] },
      { phase: "Fase 5", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillIceTime" }, { name: "wbAokijiSkillIceAge" }] },
      { phase: "Fase 6", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillFreezingStatus" }, { name: "wbAokijiSkillIceBlockPillars" }, { name: "wbAokijiSkillIceBlockPheasantBeak" }] },
      { phase: "Fase 7", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillIceBlockPillars" }, { name: "wbAokijiSkillIceBlockPheasantBeak", note: "wbAokijiNoteRightSide" }] },
      { phase: "Fase 8", damage: "*",            skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillIceTime" }, { name: "wbAokijiSkillIceAge" }, { name: "wbAokijiSkillIceBlockPartisanMechanic" }, { name: "wbAokijiSkillIceBlockPheasantBeak", note: "wbAokijiNoteRightSide" }] },
      { phase: "Fase 9", damage: "*",          skills: [{ name: "wbAokijiSkillIceSaber" }, { name: "wbAokijiSkillIceBlockPartisan" }, { name: "wbAokijiSkillAntiRangedIce" }, { name: "wbAokijiSkillIceAge" }, { name: "wbAokijiSkillFreezingStatus" }, { name: "wbAokijiSkillIceBlockPillars" }, { name: "wbAokijiSkillIceBlockPheasantBeak", note: "wbAokijiNoteRightSide" }] },
    ],
    characters: {
      tank: [
        { id: "bartholomew_kuma", label: "Kuma" },
        { id: "rebecca",          label: "Rebecca" },
        { id: "bastille",         label: "Bastille" },
      ],
      dps: [
        { id: "dracule_mihawk",   label: "Mihawk" },
        { id: "vinsmoke_niji",    label: "Niji" },
        { id: "baby_5",           label: "Baby 5" },
        { id: "killer",           label: "Killer" },
        { id: "van_augur",        label: "Augur" },
        { id: "basil_hawkins",    label: "Hawkins" },
      ],
      support: [
        { id: "marco",            label: "Marco" },
        { id: "vinsmoke_reiju",   label: "Reiju" },
        { id: "scratchmen_apoo",  label: "Apoo" },
        { id: "gecko_moria",      label: "Moria" },
      ],
    },
    rewards: [
      {
        tier: "Top 1", damage: null, top1: true,
        items: [
          { itemKey: "exclusiveIcon",    count: 1,         icon: "sprites/world_bosses/aokiji/top_1_icon_aokiji.gif" },
          { itemKey: "aokijiSword",      count: 1,         icon: "sprites/items/equipment/weapon/aokiji_sword.gif" },
          { itemKey: "awakeningStones",  count: 8,         icon: "sprites/items/special/awakening_stone.png" },
          { itemKey: "dynamicDiamondMedal", count: 2,      icon: "sprites/items/special/dynamic_diamond_medal.gif" },
          { itemKey: "key",              count: 1,         icon: "sprites/items/special/key.png" },
          { itemKey: "berries",          count: "100.000", icon: null },
          { itemKey: "glStaminaPotion",  count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
          { itemKey: "valorMedals",      count: 18,        icon: "sprites/items/special/valiance_medal.png" },
          { itemKey: "aokijiArtifacts",  count: 10,        icon: "sprites/world_bosses/aokiji/artifact_aokiji.png" },
        ],
      },
      { tier: "Tier 1", damage: "23.500.000", items: [{ itemKey: "aokijiSword", count: 1, icon: "sprites/items/equipment/weapon/aokiji_sword.gif" }, { itemKey: "awakeningStones", count: 8, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 2, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "30.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 18, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "aokijiArtifacts", count: 10, icon: "sprites/world_bosses/aokiji/artifact_aokiji.png" }] },
      { tier: "Tier 2", damage: "19.750.000", items: [{ itemKey: "aokijiSword", count: 1, icon: "sprites/items/equipment/weapon/aokiji_sword.gif" }, { itemKey: "awakeningStones", count: 4, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "25.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 15, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "aokijiArtifacts", count: 5, icon: "sprites/world_bosses/aokiji/artifact_aokiji.png" }] },
      { tier: "Tier 3", damage: "16.000.000", items: [{ itemKey: "aokijiSword", count: 1, icon: "sprites/items/equipment/weapon/aokiji_sword.gif" }, { itemKey: "awakeningStones", count: 2, icon: "sprites/items/special/awakening_stone.png" }, { itemKey: "dynamicDiamondMedal", count: 1, icon: "sprites/items/special/dynamic_diamond_medal.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "20.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 10, icon: "sprites/items/special/valiance_medal.png" }, { itemKey: "aokijiArtifacts", count: 1, icon: "sprites/world_bosses/aokiji/artifact_aokiji.png" }] },
      { tier: "Tier 4", damage: "11.500.000",  items: [{ itemKey: "aokijiSword", count: 1, icon: "sprites/items/equipment/weapon/aokiji_sword.gif" }, { itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "15.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 5, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 5", damage: "8.000.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "10.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }, { itemKey: "valorMedals", count: 3, icon: "sprites/items/special/valiance_medal.png" }] },
      { tier: "Tier 6", damage: "4.000.000",    items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "7.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
      { tier: "Tier 7", damage: "50.000",     items: [{ itemKey: "key", count: 1, icon: "sprites/items/special/key.png" }, { itemKey: "berries", count: "5.000", icon: null }, { itemKey: "glStaminaPotion", count: 4, icon: "sprites/items/special/gl_stamina_potion.png" }] },
    ],
  },
};

// â”€â”€â”€ per-boss mutable state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const wbState = {
  shai_hulud:  { tableMode: "simple", activeSkill: "wbShaiSkillBasicAttack" },
  mihawk:      { tableMode: "simple", activeSkill: "wbMihawkSkillTeleport" },
  hiking_bear: { tableMode: "simple", activeSkill: "wbHikingSkillBasicAttack" },
  byakko:      { tableMode: "simple", activeSkill: "wbByakkoSkillBasicClaw" },
  bananawani:  { tableMode: "simple", activeSkill: "wbBananawaniSkillBite" },
  plesiosaur:  { tableMode: "simple", activeSkill: "wbPlesiosaurSkillBasicAttack" },
  aokiji:      { tableMode: "simple", activeSkill: "wbAokijiSkillIceSaber" },
};

let wbActiveBossId = "shai_hulud";

// â”€â”€â”€ reward builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildRewards(t1, t2, t3, t4, t5, t6, t7, artifactItemKey, bossIcon) {
  const baseItems = [
    { itemKey: "kidNecklace",  count: 1, icon: "sprites/icons/accessory/kid_necklace.gif" },
    { itemKey: "kidCoat",      count: 1, icon: "sprites/icons/body/kid_jacket.gif" },
    { itemKey: "kidPants",     count: 1, icon: "sprites/icons/legs/kid_pants.gif" },
    { itemKey: "kidEmblem",    count: 1, icon: "sprites/icons/emblem/kid_emblem.gif" },
    { itemKey: "kidGlasses",   count: 1, icon: "sprites/icons/head/kid_glasses.gif" },
  ];

  return [
    {
      tier: "Top 1", damage: null, top1: true,
      items: [
        { itemKey: "exclusiveIcon",       count: 1,         icon: bossIcon },
        ...baseItems,
        { itemKey: "awakeningStones",     count: 8,         icon: "sprites/items/special/awakening_stone.png" },
        { itemKey: "dynamicDiamondMedal", count: 2,         icon: "sprites/items/special/dynamic_diamond_medal.gif" },
        { itemKey: "key",                 count: 1,         icon: "sprites/items/special/key.png" },
        { itemKey: "berries",             count: "100.000", icon: null },
        { itemKey: "glStaminaPotion",     count: 4,         icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",         count: 18,        icon: "sprites/items/special/valiance_medal.png" },
        { itemKey: artifactItemKey,       count: 10,        icon: bossIcon },
      ],
    },
    {
      tier: "Tier 1", damage: t1,
      items: [
        ...baseItems,
        { itemKey: "awakeningStones",     count: 8,        icon: "sprites/items/special/awakening_stone.png" },
        { itemKey: "dynamicDiamondMedal", count: 2,        icon: "sprites/items/special/dynamic_diamond_medal.gif" },
        { itemKey: "key",                 count: 1,        icon: "sprites/items/special/key.png" },
        { itemKey: "berries",             count: "30.000", icon: null },
        { itemKey: "glStaminaPotion",     count: 4,        icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",         count: 18,       icon: "sprites/items/special/valiance_medal.png" },
        { itemKey: artifactItemKey,       count: 10,       icon: bossIcon },
      ],
    },
    {
      tier: "Tier 2", damage: t2,
      items: [
        ...baseItems,
        { itemKey: "awakeningStones",     count: 4,        icon: "sprites/items/special/awakening_stone.png" },
        { itemKey: "dynamicDiamondMedal", count: 1,        icon: "sprites/items/special/dynamic_diamond_medal.gif" },
        { itemKey: "key",                 count: 1,        icon: "sprites/items/special/key.png" },
        { itemKey: "berries",             count: "25.000", icon: null },
        { itemKey: "glStaminaPotion",     count: 4,        icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",         count: 15,       icon: "sprites/items/special/valiance_medal.png" },
        { itemKey: artifactItemKey,       count: 5,        icon: bossIcon },
      ],
    },
    {
      tier: "Tier 3", damage: t3,
      items: [
        ...baseItems,
        { itemKey: "awakeningStones",     count: 2,        icon: "sprites/items/special/awakening_stone.png" },
        { itemKey: "dynamicDiamondMedal", count: 1,        icon: "sprites/items/special/dynamic_diamond_medal.gif" },
        { itemKey: "key",                 count: 1,        icon: "sprites/items/special/key.png" },
        { itemKey: "berries",             count: "20.000", icon: null },
        { itemKey: "glStaminaPotion",     count: 4,        icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",         count: 10,       icon: "sprites/items/special/valiance_medal.png" },
        { itemKey: artifactItemKey,       count: 1,        icon: bossIcon },
      ],
    },
    {
      tier: "Tier 4", damage: t4,
      items: [
        ...baseItems,
        { itemKey: "key",             count: 1,        icon: "sprites/items/special/key.png" },
        { itemKey: "berries",         count: "15.000", icon: null },
        { itemKey: "glStaminaPotion", count: 4,        icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",     count: 5,        icon: "sprites/items/special/valiance_medal.png" },
      ],
    },
    {
      tier: "Tier 5", damage: t5,
      items: [
        { itemKey: "key",             count: 1,        icon: "sprites/items/special/key.png" },
        { itemKey: "berries",         count: "10.000", icon: null },
        { itemKey: "glStaminaPotion", count: 4,        icon: "sprites/items/special/gl_stamina_potion.png" },
        { itemKey: "valorMedals",     count: 3,        icon: "sprites/items/special/valiance_medal.png" },
      ],
    },
    {
      tier: "Tier 6", damage: t6,
      items: [
        { itemKey: "key",             count: 1,       icon: "sprites/items/special/key.png" },
        { itemKey: "berries",         count: "7.000", icon: null },
        { itemKey: "glStaminaPotion", count: 4,       icon: "sprites/items/special/gl_stamina_potion.png" },
      ],
    },
    {
      tier: "Tier 7", damage: t7,
      items: [
        { itemKey: "key",             count: 1,       icon: "sprites/items/special/key.png" },
        { itemKey: "berries",         count: "5.000", icon: null },
        { itemKey: "glStaminaPotion", count: 4,       icon: "sprites/items/special/gl_stamina_potion.png" },
      ],
    },
  ];
}

// â”€â”€â”€ init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function worldBossesInit(tabId = "shai_hulud") {
  const boss = WB_BOSSES[tabId];
  if (!boss) return;

  wbActiveBossId = tabId;
  const panel = document.getElementById(tabId);
  if (!panel) return;

  if (!panel.dataset.wbBound) {
    panel.dataset.wbBound = "1";
    wbBindEvents(tabId);
  }

  wbRenderAll(tabId);
}

function wbRenderAll(bossId = wbActiveBossId) {
  wbRenderHeaderTop1Icon(bossId);
  wbRenderTable(bossId);
  wbRenderSkillPreview(bossId);
  wbRenderCharacters(bossId);
  wbRenderRewards(bossId);
  wbBindIconClickListener(bossId);
  wbBindGifClickListener(bossId);
}

function wbGetTop1IconSrc(boss) {
  if (!boss || !Array.isArray(boss.rewards)) return null;
  const top1 = boss.rewards.find((row) => row && row.top1);
  if (!top1 || !Array.isArray(top1.items)) return null;
  const exclusiveIcon = top1.items.find((item) => item && item.itemKey === "exclusiveIcon" && item.icon);
  return exclusiveIcon ? exclusiveIcon.icon : null;
}

function wbRenderHeaderTop1Icon(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  const panel = document.getElementById(bossId);
  if (!boss || !panel) return;

  const header = panel.querySelector(".wb-boss-header");
  if (!header) return;

  const top1Src = wbGetTop1IconSrc(boss);
  const existing = header.querySelector(".wb-boss-top1-icon");
  if (!top1Src) {
    if (existing) existing.remove();
    return;
  }

  const titleText = (panel.querySelector(".wb-boss-title") || {}).textContent || "World Boss";
  const altText = `${titleText} Top 1`;

  if (existing) {
    existing.src = top1Src;
    existing.alt = altText;
    return;
  }

  const top1Img = document.createElement("img");
  top1Img.className = "wb-boss-top1-icon";
  top1Img.src = top1Src;
  top1Img.alt = altText;
  top1Img.loading = "lazy";
  top1Img.decoding = "async";
  header.appendChild(top1Img);
}

// â”€â”€â”€ i18n resolution â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// Strings starting with "wbXxx" are i18n keys; everything else is literal.
function wbResolveText(value) {
  if (!value) return "";
  if (typeof value !== "string") return String(value);
  if (/^wb[A-Z]/.test(value)) return t(value);
  return value;
}

// â”€â”€â”€ phase table â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbRenderTable(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  if (!boss) return;
  const wrap = document.getElementById(boss.dom.tableWrap);
  if (!wrap) return;

  wrap.innerHTML = wbState[bossId].tableMode === "simple"
    ? wbBuildSimpleTable(bossId)
    : wbBuildMatrixTable(bossId);
  wbBindTableSkillClicks(bossId);
}

function wbBuildSimpleTable(bossId) {
  const boss = WB_BOSSES[bossId];
  let html = `<table class="wb-table">
    <thead><tr>
      <th>${wbEscape(t("wbTablePhase"))}</th>
      <th>${wbEscape(t("wbTableApproxDamage"))}</th>
      <th>${wbEscape(t("wbTableSkills"))}</th>
      <th>${wbEscape(t("wbTableTier"))}</th>
    </tr></thead><tbody>`;

  for (const phase of boss.phases) {
    const skillsHtml = phase.skills.map((s) => {
      const prefix   = s.count && s.count > 1 ? `${s.count}&times; ` : "";
      const noteText = s.note ? wbResolveText(s.note) : "";
      const suffix   = noteText ? ` <span class="wb-note">(${wbEscape(noteText)})</span>` : "";
      const skillName  = wbResolveText(s.name);
      const activeClass = s.name === wbState[bossId].activeSkill ? " wb-skill-active" : "";
      return `<span class="wb-skill-link${activeClass}" data-skill="${wbEscape(s.name)}">${prefix}${wbEscape(skillName)}${suffix}</span>`;
    }).join(", ");

    const tierText = phase.tier ? wbResolveText(phase.tier) : "\u2014";

    html += `<tr>
      <td class="wb-phase-cell">${wbEscape(phase.phase)}</td>
      <td class="wb-damage-cell">${wbEscape(wbResolveText(phase.damage))}</td>
      <td class="wb-skills-cell">${skillsHtml}</td>
      <td class="wb-tier-cell">${wbEscape(tierText)}</td>
    </tr>`;
  }

  html += `</tbody></table>`;
  return html;
}

function wbBuildMatrixTable(bossId) {
  const boss   = WB_BOSSES[bossId];
  const skills = boss.skillsAll;

  let html = `<table class="wb-table wb-table-matrix">
    <thead><tr>
      <th>${wbEscape(t("wbTablePhase"))}</th>
      <th>${wbEscape(t("wbTableApproxDamage"))}</th>`;

  for (const skill of skills) {
    const activeClass = skill === wbState[bossId].activeSkill ? " wb-skill-active" : "";
    html += `<th class="wb-skill-col-header wb-skill-link${activeClass}" data-skill="${wbEscape(skill)}">${wbEscape(wbResolveText(skill))}</th>`;
  }
  html += `<th>${wbEscape(t("wbTableTier"))}</th></tr></thead><tbody>`;

  for (const phase of boss.phases) {
    html += `<tr>
      <td class="wb-phase-cell">${wbEscape(phase.phase)}</td>
      <td class="wb-damage-cell">${wbEscape(wbResolveText(phase.damage))}</td>`;

    for (const skill of skills) {
      const match = phase.skills.find((s) => s.name === skill);
      if (match) {
        const count = match.count || 1;
        const noteText = match.note ? wbResolveText(match.note) : "";
        const title    = noteText ? ` title="${wbEscape(noteText)}"` : "";
        const label    = count > 1 ? `&#10003; &times;${count}` : "&#10003;";
        const extraClass = count > 1 ? " wb-check-multi" : noteText ? " wb-check-special" : "";
        html += `<td class="wb-matrix-cell"><span class="wb-check${extraClass}"${title}>${label}</span></td>`;
      } else {
        html += `<td class="wb-matrix-cell wb-matrix-empty">&#8212;</td>`;
      }
    }

    const tierText = phase.tier ? wbResolveText(phase.tier) : "\u2014";
    html += `<td class="wb-tier-cell">${wbEscape(tierText)}</td></tr>`;
  }

  html += `</tbody></table>`;
  return html;
}

// â”€â”€â”€ skill preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbRenderSkillPreview(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  if (!boss) return;

  const img   = document.getElementById(boss.dom.skillGif);
  const label = document.getElementById(boss.dom.skillLabel);
  const desc  = document.getElementById(boss.dom.skillDescription);
  if (!img || !label) return;

  const activeSkill   = wbState[bossId].activeSkill;
  const gif           = boss.skillGifs[activeSkill] || boss.icon;
  const descKeyOrText = boss.skillDescriptions[activeSkill] || "";

  img.src           = gif;
  img.alt           = wbResolveText(activeSkill);
  label.textContent = wbResolveText(activeSkill);
  if (desc) desc.textContent = wbResolveText(descKeyOrText);
}

// â”€â”€â”€ characters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbRenderCharacters(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  if (!boss) return;
  const el = document.getElementById(boss.dom.characters);
  if (!el) return;

  const roles = [
    { key: "tank",    labelKey: "wbRoleTank" },
    { key: "dps",     labelKey: "wbRoleDps" },
    { key: "support", labelKey: "wbRoleSupport" },
  ];

  let html = "";
  for (const role of roles) {
    const chars = boss.characters[role.key] || [];
    html += `<div class="wb-char-group">
      <h5 class="wb-char-role-label wb-role-${wbEscape(role.key)}">${wbEscape(t(role.labelKey))}</h5>
      <div class="wb-char-list">`;
    for (const char of chars) {
      html += `<div class="wb-char-card">
        <img src="sprites/characters/${wbEscape(char.id)}.png" alt="${wbEscape(char.label)}" onerror="this.style.opacity=0.25" />
        <span class="wb-char-name">${wbEscape(char.label)}</span>
      </div>`;
    }
    html += `</div></div>`;
  }

  el.innerHTML = html;
}

// â”€â”€â”€ rewards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbRenderRewards(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  if (!boss) return;
  const el = document.getElementById(boss.dom.rewards);
  if (!el) return;

  let html = `<div class="wb-rewards-wrap">`;

  for (const row of boss.rewards) {
    const tierSlug   = row.top1 ? "top1" : row.tier.toLowerCase().replace(/\s+/g, "");
    const damageText = row.damage ? `\u2265 ${row.damage} dmg` : t("wbPartyBestDamage");

    const itemsHtml = row.items.map((item) => {
      const countText  = item.count !== 1 ? `${item.count}&times;` : "";
      const langKey    = WB_REWARD_ITEM_LABELS[item.itemKey];
      const itemLabel  = langKey ? t(langKey) : item.itemKey;
      const imgHtml    = item.icon
        ? `<img src="${wbEscape(item.icon)}" alt="${wbEscape(itemLabel)}" onerror="this.style.display='none'" />`
        : "";
      return `<div class="wb-reward-item">${imgHtml}<span class="wb-reward-item-count">${countText}</span><span class="wb-reward-item-name">${wbEscape(itemLabel)}</span></div>`;
    }).join("");

    html += `<div class="wb-reward-row wb-reward-${wbEscape(tierSlug)}">
      <div class="wb-reward-header">
        <span class="wb-tier-badge wb-tier-badge-${wbEscape(tierSlug)}">${wbEscape(row.tier)}</span>
        <span class="wb-damage-req">${wbEscape(damageText)}</span>
      </div>
      <div class="wb-reward-items">${itemsHtml}</div>
    </div>`;
  }

  html += `</div>`;
  el.innerHTML = html;
}

// â”€â”€â”€ events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbBindEvents(bossId) {
  const boss      = WB_BOSSES[bossId];
  const toggleBtn = document.getElementById(boss.dom.tableToggle);
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    wbState[bossId].tableMode = wbState[bossId].tableMode === "simple" ? "matrix" : "simple";
    toggleBtn.textContent = wbState[bossId].tableMode === "simple" ? t("wbModeSkills") : t("wbModeSimple");
    wbRenderTable(bossId);
  });
}

function wbBindTableSkillClicks(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  const wrap = document.getElementById(boss.dom.tableWrap);
  if (!wrap) return;

  wrap.querySelectorAll(".wb-skill-link").forEach((el) => {
    el.addEventListener("click", () => {
      const skill = el.dataset.skill;
      if (!skill || !boss.skillGifs[skill]) return;
      wbState[bossId].activeSkill = skill;
      wbRenderSkillPreview(bossId);
      wrap.querySelectorAll(".wb-skill-link").forEach((e) =>
        e.classList.toggle("wb-skill-active", e.dataset.skill === skill)
      );
    });
  });
}

// â”€â”€â”€ translations callback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Called by lang.js applyTranslations() on every language change.
// Re-renders every panel that has already been initialised so that
// skill names, descriptions, and reward item labels update live.

function worldBossesApplyTranslations() {
  Object.keys(WB_BOSSES).forEach((bossId) => {
    const boss      = WB_BOSSES[bossId];
    const panel     = document.getElementById(bossId);
    const toggleBtn = document.getElementById(boss.dom.tableToggle);

    if (toggleBtn) {
      toggleBtn.textContent = wbState[bossId].tableMode === "simple"
        ? t("wbModeSkills")
        : t("wbModeSimple");
    }

    // Re-render skills, descriptions and rewards for every already-opened panel
    if (panel && panel.dataset.wbBound) {
      wbRenderTable(bossId);
      wbRenderSkillPreview(bossId);
      wbRenderRewards(bossId);
    }
  });
}

// â”€â”€â”€ sidebar folder toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbToggleFolder(btn) {
  const submenu = document.getElementById("wb-folder-submenu");
  if (!submenu) return;
  const open = submenu.classList.toggle("wb-submenu-open");
  btn.classList.toggle("wb-folder-open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

// â”€â”€â”€ utils â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function wbEscape(str) {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}

// â”€â”€â”€ boss icon modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

let wbIconModalState = null;

function ensureBossIconModal() {
  if (document.getElementById("boss-icon-modal-overlay")) return;
  
  const overlay = document.createElement("div");
  overlay.id = "boss-icon-modal-overlay";
  overlay.className = "modal-overlay";
  
  const content = document.createElement("div");
  content.className = "modal-content";
  content.innerHTML = `
    <button class="modal-close" aria-label="Fechar modal">X</button>
    <img id="boss-icon-modal-img" class="modal-img" alt="Boss Icon" />
  `;
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeBossIconModal();
  });
  
  content.querySelector(".modal-close").addEventListener("click", closeBossIconModal);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeBossIconModal();
    }
  });
}

function openBossIconModal(imgSrc) {
  ensureBossIconModal();
  const overlay = document.getElementById("boss-icon-modal-overlay");
  const img = document.getElementById("boss-icon-modal-img");
  
  img.src = imgSrc;
  overlay.classList.add("is-open");
  wbIconModalState = { open: true, imgSrc };
}

function closeBossIconModal() {
  const overlay = document.getElementById("boss-icon-modal-overlay");
  if (overlay) {
    overlay.classList.remove("is-open");
  }
  wbIconModalState = { open: false };
}

function wbBindIconClickListener(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  const panel = document.getElementById(bossId);
  if (!panel) return;

  panel.querySelectorAll(".wb-boss-icon, .wb-boss-top1-icon").forEach((icon) => {
    icon.style.cursor = "pointer";
    icon.removeEventListener("click", wbHandleIconClick);
    icon.addEventListener("click", wbHandleIconClick);
  });
}

function wbHandleIconClick(e) {
  const imgSrc = e.currentTarget.src;
  openBossIconModal(imgSrc);
}

// â”€â”€â”€ ability gif modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

let wbGifModalState = null;

function ensureBossGifModal() {
  if (document.getElementById("boss-gif-modal-overlay")) return;
  
  const overlay = document.createElement("div");
  overlay.id = "boss-gif-modal-overlay";
  overlay.className = "modal-overlay";
  
  const content = document.createElement("div");
  content.className = "modal-content";
  content.innerHTML = `
    <button class="modal-close" aria-label="Fechar modal">X</button>
    <img id="boss-gif-modal-img" class="modal-img" alt="Skill GIF" />
    <div id="boss-gif-modal-text"></div>
  `;
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeBossGifModal();
  });
  
  content.querySelector(".modal-close").addEventListener("click", closeBossGifModal);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeBossGifModal();
    }
  });
}

function openBossGifModal(imgSrc, skillLabelKey, skillDescKey, bossId = wbActiveBossId) {
  ensureBossGifModal();
  const overlay = document.getElementById("boss-gif-modal-overlay");
  const img = document.getElementById("boss-gif-modal-img");
  const textDiv = document.getElementById("boss-gif-modal-text");
  
  img.src = imgSrc;
  
  const skillLabel = t(skillLabelKey) || skillLabelKey;
  const skillDesc = t(skillDescKey) || skillDescKey;
  
  textDiv.innerHTML = `
    <div class="modal-title">${wbEscape(skillLabel)}</div>
    <div class="modal-description">${wbEscape(skillDesc)}</div>
  `;
  
  overlay.classList.add("is-open");
  wbGifModalState = { open: true, imgSrc, skillLabelKey, skillDescKey };
}

function closeBossGifModal() {
  const overlay = document.getElementById("boss-gif-modal-overlay");
  if (overlay) {
    overlay.classList.remove("is-open");
  }
  wbGifModalState = { open: false };
}

function wbBindGifClickListener(bossId = wbActiveBossId) {
  const boss = WB_BOSSES[bossId];
  const panel = document.getElementById(bossId);
  if (!panel) return;
  
  const gif = panel.querySelector(".wb-skill-gif");
  if (!gif) return;
  
  gif.style.cursor = "pointer";
  gif.removeEventListener("click", wbHandleGifClick);
  gif.addEventListener("click", wbHandleGifClick);
}

function wbHandleGifClick(e) {
  const bossId = wbActiveBossId;
  const boss = WB_BOSSES[bossId];
  if (!boss) return;
  
  const gifSrc = e.currentTarget.src;
  let skillKey = null;
  
  // Find the skill key by matching against skillGifs
  for (const [key, src] of Object.entries(boss.skillGifs)) {
    if (src === gifSrc) {
      skillKey = key;
      break;
    }
  }
  
  // If not found in skillGifs, try matching with activeSkill
  if (!skillKey) {
    skillKey = wbState[bossId]?.activeSkill;
  }
  
  if (!skillKey) return;
  
  const skillGifSrc = boss.skillGifs[skillKey];
  const skillLabelKey = skillKey;
  const skillDescKey = boss.skillDescriptions[skillKey];
  
  if (skillGifSrc) {
    openBossGifModal(skillGifSrc, skillLabelKey, skillDescKey, bossId);
  }
}


