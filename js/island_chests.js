// ============================================================
// Island Chests — per-character chest tracker
// ============================================================

const ISLAND_CHEST_DATA = [
  {
    nome: "East Blue",
    baus: [
      { id: 0, global: true,  stamina: false, loot: "golden_bracelet: 4, repair_kit_2: 2" },
      { id: 1, global: true,  stamina: true,  loot: "golden_chalice: 2, eb_stamina_potion: 2" },
      { id: 2, global: true,  stamina: false, loot: "golden_chalice: 2, repair_kit_2: 2" },
      { id: 3, global: true,  stamina: false, loot: "oak_log: 9, iron_ore: 6, cotton: 12, repair_kit_1: 1" },
      { id: 4, global: true,  stamina: false, loot: "wood_log: 40, copper_ore: 25, low_grade_cotton: 80, gun_powder: 13" },
      { id: 5, global: true,  stamina: false, loot: "golden_chalice: 1, wood_log: 20, copper_ore: 8, repair_kit_1: 1" },
      { id: 6, global: true,  stamina: false, loot: "golden_bracelet: 2, low_grade_cotton: 25, gun_powder: 4" },
      { id: 7, global: true,  stamina: false, loot: "expert_gun_powder: 5, golden_crown: 1, medium_xp_potion: 2" },
      { id: 8, global: true,  stamina: true,  loot: "eb_stamina_potion: 2, small_xp_potion: 2" },
      { id: 9, global: true,  stamina: false, loot: "golden_bracelet: 2, repair_kit_1: 2, small_xp_potion: 1" },
      { id: 10, global: true, stamina: false, loot: "berry: 20000" }
    ]
  },
  {
    nome: "Foosha Village",
    baus: [
      { id: 0, global: false, stamina: false, loot: "onigiri: 5" },
      { id: 1, global: false, stamina: false, loot: "bandit_bandana: 1; small_xp_potion: 1; berry: 15" },
      { id: 2, global: false, stamina: false, loot: "banana: 5" },
      { id: 3, global: false, stamina: false, loot: "leg_of_meat: 2; berry: 10" },
      { id: 4, global: false, stamina: false, loot: "berry: 22" },
      { id: 5, global: true,  stamina: false, loot: "key: 10" }
    ]
  },
  {
    nome: "Shells Town",
    baus: [
      { id: 0, global: false, stamina: false, loot: "berry: 50, small_xp_potion: 1" },
      { id: 1, global: false, stamina: false, loot: "golden_bracelet: 4, small_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "old_necklace: 1, small_xp_potion: 2" },
      { id: 3, global: false, stamina: false, loot: "apple: 4, berry: 20" },
      { id: 4, global: false, stamina: false, loot: "golden_crown: 3" },
      { id: 5, global: false, stamina: true,  loot: "eb_stamina_potion: 2" }
    ]
  },
  {
    nome: "Samui Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "bandage: 3, small_xp_potion: 2" },
      { id: 1, global: false, stamina: false, loot: "berry: 120, small_xp_potion: 2" },
      { id: 2, global: false, stamina: false, loot: "berry: 80, small_xp_potion: 2" },
      { id: 3, global: false, stamina: true,  loot: "eb_stamina_potion: 2, small_xp_potion: 2" }
    ]
  },
  {
    nome: "Orange Town",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_chalice: 1, berry: 80, small_xp_potion: 3" },
      { id: 1, global: false, stamina: false, loot: "golden_bracelet: 4, small_xp_potion: 2" },
      { id: 2, global: false, stamina: false, loot: "bandage: 2, piece_of_meat: 3, small_xp_potion: 2" },
      { id: 3, global: false, stamina: false, loot: "old_saber: 1, old_flintlock: 1, berry: 50, small_xp_potion: 2" }
    ]
  },
  {
    nome: "Syrup Village",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_chalice: 1, small_xp_potion: 5" },
      { id: 1, global: false, stamina: false, loot: "pear: 5, small_xp_potion: 5" },
      { id: 2, global: false, stamina: false, loot: "golden_chalice: 1, golden_bracelet: 6, small_xp_potion: 5" },
      { id: 3, global: false, stamina: false, loot: "lesser_band_aid: 1, small_xp_potion: 5" },
      { id: 4, global: false, stamina: false, loot: "black_cat_shirt: 1, banana: 5, small_xp_potion: 8" },
      { id: 5, global: false, stamina: true,  loot: "eb_stamina_potion: 2" }
    ]
  },
  {
    nome: "Island of Rare Animals",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_chalice: 1, golden_bracelet: 2, medium_xp_potion: 1" },
      { id: 1, global: false, stamina: false, loot: "golden_chalice: 2, medium_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "medium_xp_potion: 1, golden_bracelet: 6, golden_chalice: 2" },
      { id: 3, global: false, stamina: true,  loot: "eb_stamina_potion: 2" }
    ]
  },
  {
    nome: "Baratie",
    baus: [
      { id: 0, global: false, stamina: false, loot: "berry: 50, raw_fish: 10, medium_xp_potion: 1" },
      { id: 1, global: false, stamina: false, loot: "golden_chalice: 2, medium_xp_potion: 1" }
    ]
  },
  {
    nome: "Cocoyasi Village",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 3, medium_xp_potion: 2, small_xp_potion: 4" },
      { id: 1, global: false, stamina: false, loot: "medium_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "medium_xp_potion: 3, berry: 50" },
      { id: 3, global: false, stamina: false, loot: "medium_xp_potion: 1" },
      { id: 4, global: false, stamina: false, loot: "golden_bracelet: 12, medium_xp_potion: 1, small_xp_potion: 2" },
      { id: 5, global: false, stamina: false, loot: "pouch_of_jewels: 1, medium_xp_potion: 1, small_xp_potion: 2" },
      { id: 6, global: false, stamina: false, loot: "band_aid: 2, medium_xp_potion: 1, small_xp_potion: 2" },
      { id: 7, global: false, stamina: false, loot: "key: 1" },
      { id: 8, global: false, stamina: false, loot: "band_aid: 3, medium_xp_potion: 1, small_xp_potion: 2" },
      { id: 9, global: false, stamina: true,  loot: "eb_stamina_potion: 2" }
    ]
  },
  {
    nome: "Loguetown",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_crown: 1, pouch_of_jewels: 1, medium_xp_potion: 2" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 1, golden_bracelet: 2, medium_xp_potion: 2" },
      { id: 2, global: false, stamina: false, loot: "recruit_cap: 1, recruit_shirt: 1, recruit_pants: 1, rifle: 1, medium_xp_potion: 2" },
      { id: 3, global: false, stamina: false, loot: "golden_bracelet: 8, medium_xp_potion: 2" },
      { id: 4, global: false, stamina: true,  loot: "eb_stamina_potion: 2" },
      { id: 5, global: false, stamina: true,  loot: "eb_stamina_potion: 3" }
    ]
  },
  {
    nome: "Kumo Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "spider_talisman: 1, medium_xp_potion: 2" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 1, golden_chalice: 1, medium_xp_potion: 2" },
      { id: 2, global: false, stamina: false, loot: "pouch_of_jewels: 1, medium_xp_potion: 2" }
    ]
  },
  {
    nome: "Grand Line",
    baus: [
      { id: 0,  global: true, stamina: false, loot: "refined_gun_powder: 22, titanium_ingot: 5, big_xp_potion: 2, repair_kit_6: 2" },
      { id: 1,  global: true, stamina: false, loot: "adam_planks: 7, professional_cloth: 5, big_xp_potion: 2" },
      { id: 2,  global: true, stamina: false, loot: "titanium_ingot: 11, big_xp_potion: 2" },
      { id: 3,  global: true, stamina: false, loot: "mahogany_planks: 14, medium_xp_potion: 2" },
      { id: 4,  global: true, stamina: false, loot: "professional_cloth: 11, big_xp_potion: 2" },
      { id: 5,  global: true, stamina: false, loot: "steel_ingot: 11, medium_xp_potion: 2" },
      { id: 6,  global: true, stamina: false, loot: "refined_gun_powder: 44, repair_kit_6: 2" },
      { id: 7,  global: true, stamina: false, loot: "adam_planks: 14, repair_kit_6: 2" },
      { id: 8,  global: true, stamina: false, loot: "advanced_cloth: 11, medium_xp_potion: 2" },
      { id: 9,  global: true, stamina: false, loot: "mahogany_planks: 3, steel_ingot: 3, advanced_cloth: 3, superior_gun_powder: 11, medium_xp_potion: 2" },
      { id: 10, global: true, stamina: false, loot: "expert_gun_powder: 45, medium_xp_potion: 2" },
      { id: 11, global: true, stamina: false, loot: "superior_gun_powder: 44, medium_xp_potion: 2" },
      { id: 12, global: true, stamina: false, loot: "cloth: 11, medium_xp_potion: 2" },
      { id: 13, global: true, stamina: false, loot: "iron_ingot: 11, medium_xp_potion: 2" },
      { id: 14, global: true, stamina: false, loot: "oak_planks: 14, medium_xp_potion: 2" },
      { id: 15, global: true, stamina: false, loot: "oak_planks: 3, iron_ingot: 3, cloth: 3, expert_gun_powder: 11, medium_xp_potion: 2" }
    ]
  },
  {
    nome: "Gunkan Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_chalice: 6, golden_bracelet: 6" },
      { id: 1, global: false, stamina: false, loot: "medium_xp_potion: 3" },
      { id: 2, global: false, stamina: false, loot: "golden_crown: 3, golden_chalice: 2, medium_xp_potion: 2" }
    ]
  },
  {
    nome: "Lost Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 2, golden_chalice: 2, golden_bracelet: 5" },
      { id: 1, global: false, stamina: false, loot: "medium_xp_potion: 3" }
    ]
  },
  {
    nome: "Whisky Peak",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 5, golden_bracelet: 12, medium_xp_potion: 4" },
      { id: 1, global: false, stamina: false, loot: "medium_xp_potion: 5" },
      { id: 2, global: false, stamina: false, loot: "golden_crown: 3, berry: 200, medium_xp_potion: 5" },
      { id: 3, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Little Garden",
    baus: [
      { id: 0, global: false, stamina: false, loot: "medium_xp_potion: 6" },
      { id: 1, global: false, stamina: false, loot: "golden_crown: 5, pouch_of_jewels: 1, big_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "pouch_of_jewels: 6, medium_xp_potion: 6" },
      { id: 3, global: false, stamina: false, loot: "golden_chalice: 11" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Jaya",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 6, medium_xp_potion: 5" },
      { id: 1, global: false, stamina: false, loot: "golden_crown: 3, medium_xp_potion: 4" },
      { id: 2, global: false, stamina: false, loot: "golden_bracelet: 1, golden_crown: 4, big_xp_potion: 1" },
      { id: 3, global: false, stamina: false, loot: "golden_crown: 4, big_xp_potion: 1" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "G-7 Marine Base",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_chalice: 4, golden_crown: 1, medium_xp_potion: 5" },
      { id: 1, global: false, stamina: false, loot: "big_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "marine_coat: 1, golden_crown: 2, medium_xp_potion: 5" },
      { id: 3, global: true,  stamina: false, loot: "key: 2, berry: 20000" }
    ]
  },
  {
    nome: "Drum Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "big_xp_potion: 2, berry: 6000" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 6, medium_xp_potion: 4" },
      { id: 2, global: false, stamina: false, loot: "golden_bracelet: 70, medium_xp_potion: 7" },
      { id: 3, global: false, stamina: false, loot: "golden_crown: 3, golden_chalice: 20, big_xp_potion: 2" },
      { id: 4, global: false, stamina: false, loot: "big_xp_potion: 1" },
      { id: 5, global: true,  stamina: false, loot: "key: 2" },
      { id: 6, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Nanimonai Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "medium_xp_potion: 4" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 10" }
    ]
  },
  {
    nome: "Nige Hashiru",
    baus: [
      { id: 0, global: false, stamina: false, loot: "sake: 8, medium_xp_potion: 4" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 25, big_xp_potion: 1" },
      { id: 2, global: false, stamina: true,  loot: "gl_stamina_potion: 1, medium_xp_potion: 4" }
    ]
  },
  {
    nome: "Alubarna",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_bracelet: 16, medium_xp_potion: 5" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 2, golden_chalice: 5, medium_xp_potion: 5" },
      { id: 2, global: false, stamina: false, loot: "big_xp_potion: 1" },
      { id: 3, global: false, stamina: false, loot: "golden_crown: 10" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Rainbase",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 2, medium_xp_potion: 6" },
      { id: 1, global: false, stamina: false, loot: "golden_crown: 1, pouch_of_jewels: 3, golden_chalice: 5, medium_xp_potion: 5" },
      { id: 2, global: false, stamina: false, loot: "golden_crown: 3, pouch_of_jewels: 10, medium_xp_potion: 6" },
      { id: 3, global: false, stamina: false, loot: "heart_shaped_ruby: 1, golden_crown: 4, umbrella: 40, big_xp_potion: 1" },
      { id: 4, global: false, stamina: false, loot: "big_xp_potion: 2" },
      { id: 5, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Skypiea",
    baus: [
      { id: 0, global: false, stamina: false, loot: "medium_xp_potion: 5, pouch_of_jewels: 4, golden_bracelet: 10" },
      { id: 1, global: false, stamina: false, loot: "medium_xp_potion: 5, pouch_of_jewels: 2, golden_chalice: 5" },
      { id: 2, global: false, stamina: false, loot: "big_xp_potion: 1" },
      { id: 3, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Water 7",
    baus: [
      { id: 0, global: false, stamina: false, loot: "big_xp_potion: 1, pouch_of_jewels: 4, golden_crown: 1, golden_vase: 1" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 6, golden_crown: 3, medium_xp_potion: 5" },
      { id: 2, global: false, stamina: false, loot: "big_xp_potion: 1, golden_cross: 1, pouch_of_jewels: 4, golden_crown: 3" },
      { id: 3, global: false, stamina: false, loot: "golden_vase: 1, medium_xp_potion: 7" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1, pouch_of_jewels: 4, golden_vase: 1" }
    ]
  },
  {
    nome: "Enies Lobby",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_chalice: 6, golden_crown: 2, medium_xp_potion: 5" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_chalice: 6, golden_crown: 2, medium_xp_potion: 5" },
      { id: 2, global: false, stamina: true,  loot: "gl_stamina_potion: 1, medium_xp_potion: 5" }
    ]
  },
  {
    nome: "Amazon Lily",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_cross: 1, pouch_of_jewels: 3, golden_chalice: 6" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_chalice: 5, golden_crown: 2, medium_xp_potion: 6" },
      { id: 2, global: false, stamina: false, loot: "medium_xp_potion: 6, pouch_of_jewels: 3, golden_crown: 3, golden_vase: 1" },
      { id: 3, global: false, stamina: false, loot: "big_xp_potion: 2" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Kuraigana Island",
    baus: [
      { id: 0, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_chalice: 6, golden_crown: 3, medium_xp_potion: 6" },
      { id: 1, global: false, stamina: false, loot: "golden_cross: 1, pouch_of_jewels: 4, golden_chalice: 6" },
      { id: 2, global: false, stamina: false, loot: "medium_xp_potion: 6, pouch_of_jewels: 4, golden_crown: 3, golden_vase: 1" },
      { id: 3, global: false, stamina: false, loot: "big_xp_potion: 3" },
      { id: 4, global: false, stamina: true,  loot: "gl_stamina_potion: 1" }
    ]
  },
  {
    nome: "Sabaody Archipelago",
    baus: [
      { id: 0, global: false, stamina: false, loot: "golden_cross: 1, golden_crown: 3, pouch_of_jewels: 2" },
      { id: 1, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_crown: 2, golden_vase: 1, big_xp_potion: 1" },
      { id: 2, global: false, stamina: false, loot: "pouch_of_jewels: 4, golden_chalice: 6, golden_crown: 4, medium_xp_potion: 11" },
      { id: 3, global: false, stamina: false, loot: "big_xp_potion: 1, golden_vase: 1, pouch_of_jewels: 4" },
      { id: 4, global: false, stamina: false, loot: "big_xp_potion: 3, golden_crown: 2, golden_vase: 1, golden_chalice: 5" },
      { id: 5, global: false, stamina: true,  loot: "gl_stamina_potion: 1, big_xp_potion: 2" }
    ]
  }
];

const ISLAND_CHEST_ITEM_PRICES = {
  adam_planks: 400,
  advanced_cloth: 352,
  apple: 4,
  banana: 1,
  band_aid: 200,
  bandage: 40,
  bandit_bandana: 10,
  black_cat_shirt: 360,
  cloth: 240,
  copper_ore: 3,
  cotton: 12,
  expert_gun_powder: 60,
  golden_bracelet: 25,
  golden_chalice: 150,
  golden_cross: 10000,
  golden_crown: 1000,
  golden_vase: 5000,
  gun_powder: 6,
  heart_shaped_ruby: 2000,
  iron_ingot: 240,
  iron_ore: 30,
  leg_of_meat: 2,
  lesser_band_aid: 70,
  low_grade_cotton: 1,
  mahogany_planks: 300,
  marine_coat: 2250,
  oak_log: 20,
  oak_planks: 200,
  old_flintlock: 20,
  old_necklace: 40,
  old_saber: 20,
  pear: 8,
  piece_of_meat: 5,
  pouch_of_jewels: 400,
  professional_cloth: 512,
  raw_fish: 10,
  recruit_cap: 40,
  recruit_pants: 40,
  recruit_shirt: 80,
  refined_gun_powder: 130,
  repair_kit_1: 10,
  repair_kit_2: 40,
  repair_kit_3: 80,
  repair_kit_6: 260,
  rifle: 80,
  spider_talisman: 2250,
  steel_ingot: 360,
  superior_gun_powder: 99,
  titanium_ingot: 540,
  umbrella: 50,
  wood_log: 2
};

// Backward-compatible alias used by tooltip/render helpers.
const IC_ITEM_VALUES = ISLAND_CHEST_ITEM_PRICES;

const IC_ISLAND_BANNERS_PATH = "sprites/island_banners";
const IC_CHEST_SPRITE_DEFAULT = "sprites/ui/chests/chest.png";
const IC_CHEST_SPRITE_CHECKED = "sprites/ui/chests/checked_chest.png";

const IC_ITEM_SPRITE_CATEGORY = {
  adam_planks: "materials",
  advanced_cloth: "materials",
  cloth: "materials",
  copper_ore: "materials",
  cotton: "materials",
  expert_gun_powder: "materials",
  gun_powder: "materials",
  iron_ingot: "materials",
  iron_ore: "materials",
  low_grade_cotton: "materials",
  mahogany_planks: "materials",
  oak_log: "materials",
  oak_planks: "materials",
  professional_cloth: "materials",
  refined_gun_powder: "materials",
  steel_ingot: "materials",
  superior_gun_powder: "materials",
  titanium_ingot: "materials",
  wood_log: "materials",
  old_saber: "weapons",
  old_flintlock: "weapons",
  rifle: "weapons",
  bandit_bandana: "equipment",
  black_cat_shirt: "equipment",
  marine_coat: "equipment",
  recruit_cap: "equipment",
  recruit_pants: "equipment",
  recruit_shirt: "equipment",
  umbrella: "equipment",
  apple: "consumables",
  banana: "consumables",
  bandage: "consumables",
  band_aid: "consumables",
  lesser_band_aid: "consumables",
  leg_of_meat: "consumables",
  onigiri: "consumables",
  pear: "consumables",
  piece_of_meat: "consumables",
  raw_fish: "consumables",
  sake: "consumables",
  small_xp_potion: "consumables",
  medium_xp_potion: "consumables",
  big_xp_potion: "consumables",
  eb_stamina_potion: "consumables",
  gl_stamina_potion: "consumables",
  berry: "treasures",
  golden_bracelet: "treasures",
  golden_chalice: "treasures",
  golden_cross: "treasures",
  golden_crown: "treasures",
  golden_vase: "treasures",
  heart_shaped_ruby: "treasures",
  old_necklace: "treasures",
  pouch_of_jewels: "treasures",
  spider_talisman: "treasures",
  key: "utility",
  repair_kit_1: "utility",
  repair_kit_2: "utility",
  repair_kit_6: "utility"
};

function icGetItemSpritePath(itemName) {
  const category = IC_ITEM_SPRITE_CATEGORY[itemName] || "utility";
  return `sprites/chests/${category}/${itemName}.png`;
}

// Island name → banner filename slug
const IC_ISLAND_BANNER_SLUG = {
  "East Blue":              "east_blue",
  "Foosha Village":         "foosha_village",
  "Shells Town":            "shells_town",
  "Samui Island":           "samui_island",
  "Orange Town":            "orange_town",
  "Syrup Village":          "syrup_village",
  "Island of Rare Animals": "island_of_rare_animals",
  "Baratie":                "baratie",
  "Cocoyasi Village":       "cocoyasi_village",
  "Loguetown":              "loguetown",
  "Kumo Island":            "kumo_island",
  "Grand Line":             "grand_line",
  "Gunkan Island":          "gunkan_island",
  "Lost Island":            "lost_island",
  "Whisky Peak":            "whisky_peak",
  "Little Garden":          "little_garden",
  "Jaya":                   "jaya",
  "G-7 Marine Base":        "g7_marine_base",
  "Drum Island":            "drum_island",
  "Nanimonai Island":       "nanimonai",
  "Nige Hashiru":           "nige_hashiru",
  "Alubarna":               "alubarna",
  "Rainbase":               "rainbase",
  "Skypiea":                "skypiea",
  "Water 7":                "water_7",
  "Enies Lobby":            "enies_lobby",
  "Amazon Lily":            "amazon_lily",
  "Kuraigana Island":       "kuraigana",
  "Sabaody Archipelago":    "sabaody"
};

// ---- State ----
const IC_LS_KEY = "labophase.island_chests";

// state.checked[charId][islandName][chestId] = true
// state.globalChecked[islandName][chestId] = true
let icState = { checked: {}, globalChecked: {} };
let icSelectedIsland = null;
let icStaminaOnly = false;
let icStaminaFilter = "both"; // "both" | "eb" | "gl"
let icCharacterFilter = []; // array of character IDs to show, empty = show all
let icCharacterFilterActive = false;
let icInitialized = false;

function icLoadState() {
  try {
    const raw = localStorage.getItem(IC_LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      icState = {
        checked: parsed.checked || {},
        globalChecked: parsed.globalChecked || {}
      };
    }
  } catch (_) {
    icState = { checked: {}, globalChecked: {} };
  }
}

function icSaveState() {
  try {
    localStorage.setItem(IC_LS_KEY, JSON.stringify(icState));
  } catch (_) {}
}

// ---- Loot parsing ----
function icParseLoot(lootStr) {
  if (!lootStr || !lootStr.trim()) return [];
  const items = [];
  // Support both comma and semicolon separators
  const parts = lootStr.split(/[,;]/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.lastIndexOf(":");
    if (colonIdx === -1) continue;
    const name = trimmed.slice(0, colonIdx).trim();
    const qty = parseInt(trimmed.slice(colonIdx + 1).trim(), 10) || 0;
    if (name) items.push({ name, qty });
  }
  return items;
}

function icCalcChestBerries(lootItems) {
  let total = 0;
  for (const { name, qty } of lootItems) {
    if (name === "berry") {
      total += qty;
    } else {
      total += (ISLAND_CHEST_ITEM_PRICES[name] || 0) * qty;
    }
  }
  return total;
}

// ---- Filter helpers ----
function icChestMatchesFilter(bau) {
  if (!icStaminaOnly) return true;
  if (!bau.stamina) return false;
  if (icStaminaFilter === "both") return true;
  const items = icParseLoot(bau.loot);
  const hasEB = items.some(i => i.name === "eb_stamina_potion");
  const hasGL = items.some(i => i.name === "gl_stamina_potion");
  if (icStaminaFilter === "eb") return hasEB;
  if (icStaminaFilter === "gl") return hasGL;
  return true;
}

// ---- Checked accessors ----
function icIsCharChecked(charId, islandName, chestId) {
  return !!(icState.checked[charId] &&
            icState.checked[charId][islandName] &&
            icState.checked[charId][islandName][chestId]);
}

function icSetCharChecked(charId, islandName, chestId, value) {
  if (!icState.checked[charId]) icState.checked[charId] = {};
  if (!icState.checked[charId][islandName]) icState.checked[charId][islandName] = {};
  if (value) {
    icState.checked[charId][islandName][chestId] = true;
  } else {
    delete icState.checked[charId][islandName][chestId];
  }
}

function icIsGlobalChecked(islandName, chestId) {
  return !!(icState.globalChecked[islandName] &&
            icState.globalChecked[islandName][chestId]);
}

function icSetGlobalChecked(islandName, chestId, value) {
  if (!icState.globalChecked[islandName]) icState.globalChecked[islandName] = {};
  if (value) {
    icState.globalChecked[islandName][chestId] = true;
  } else {
    delete icState.globalChecked[islandName][chestId];
  }
}

// ---- Berry total remaining ----
function icCalcTotalRemainingBerries() {
  let total = 0;
  for (const island of ISLAND_CHEST_DATA) {
    for (const bau of island.baus) {
      if (!icChestMatchesFilter(bau)) continue;
      const berries = icCalcChestBerries(icParseLoot(bau.loot));
      if (berries === 0) continue;

      if (bau.global) {
        if (!icIsGlobalChecked(island.nome, bau.id)) {
          total += berries;
        }
      } else {
        // Count per-character
        for (const char of CHARACTERS_DATA) {
          if (!icIsCharChecked(char.id, island.nome, bau.id)) {
            total += berries;
          }
        }
      }
    }
  }
  return total;
}

// ---- Berry total remaining for a single island ----
function icCalcIslandRemainingBerries(islandName) {
  const island = ISLAND_CHEST_DATA.find(i => i.nome === islandName);
  if (!island) return 0;
  let total = 0;
  for (const bau of island.baus) {
    if (!icChestMatchesFilter(bau)) continue;
    const berries = icCalcChestBerries(icParseLoot(bau.loot));
    if (berries === 0) continue;
    if (bau.global) {
      if (!icIsGlobalChecked(island.nome, bau.id)) total += berries;
    } else {
      for (const char of CHARACTERS_DATA) {
        if (!icIsCharChecked(char.id, island.nome, bau.id)) total += berries;
      }
    }
  }
  return total;
}

// ---- Stamina progress for a single island ----
function icCalcIslandStaminaProgress(islandName) {
  const island = ISLAND_CHEST_DATA.find(i => i.nome === islandName);
  if (!island) return { ebTotal: 0, ebDone: 0, glTotal: 0, glDone: 0 };
  let ebTotal = 0, ebDone = 0, glTotal = 0, glDone = 0;
  for (const bau of island.baus) {
    if (!bau.stamina) continue;
    const items = icParseLoot(bau.loot);
    const hasEB = items.some(i => i.name === "eb_stamina_potion");
    const hasGL = items.some(i => i.name === "gl_stamina_potion");
    if (bau.global) {
      const checked = icIsGlobalChecked(island.nome, bau.id);
      if (hasEB) { ebTotal += 1; if (checked) ebDone += 1; }
      if (hasGL) { glTotal += 1; if (checked) glDone += 1; }
    } else {
      for (const char of CHARACTERS_DATA) {
        const checked = icIsCharChecked(char.id, island.nome, bau.id);
        if (hasEB) { ebTotal += 1; if (checked) ebDone += 1; }
        if (hasGL) { glTotal += 1; if (checked) glDone += 1; }
      }
    }
  }
  return { ebTotal, ebDone, glTotal, glDone };
}

// ---- Stamina progress ----
function icCalcStaminaProgress() {
  let ebTotal = 0, ebDone = 0;
  let glTotal = 0, glDone = 0;

  for (const island of ISLAND_CHEST_DATA) {
    for (const bau of island.baus) {
      if (!bau.stamina) continue;
      const items = icParseLoot(bau.loot);
      const hasEB = items.some(i => i.name === "eb_stamina_potion");
      const hasGL = items.some(i => i.name === "gl_stamina_potion");

      if (bau.global) {
        const checked = icIsGlobalChecked(island.nome, bau.id);
        if (hasEB) { ebTotal += 1; if (checked) ebDone += 1; }
        if (hasGL) { glTotal += 1; if (checked) glDone += 1; }
      } else {
        for (const char of CHARACTERS_DATA) {
          const checked = icIsCharChecked(char.id, island.nome, bau.id);
          if (hasEB) { ebTotal += 1; if (checked) ebDone += 1; }
          if (hasGL) { glTotal += 1; if (checked) glDone += 1; }
        }
      }
    }
  }
  return { ebTotal, ebDone, glTotal, glDone };
}

// ---- Render helpers ----
function icFormatBerries(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

// ---- Get item display name and value for tooltips ----
function icGetItemTooltip(itemName, qty) {
  let displayName = icGetItemDisplayName(itemName);
  const value = IC_ITEM_VALUES[itemName] || 0;
  return displayName + (qty ? `: ${qty}` : "") + (value ? ` (฿${value})` : "");
}

// ---- Format item name from snake_case to Title Case ----
function icFormatItemName(itemName) {
  return itemName
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ---- Get item display name (try items.js first, fallback to formatted name) ----
function icGetItemDisplayName(itemName) {
  // Try to find item in items.js global
  if (typeof items !== "undefined" && items[itemName]) {
    return items[itemName].name || icFormatItemName(itemName);
  }
  return icFormatItemName(itemName);
}

function icBuildChestCard(bau, islandName, isGlobal, charId) {
  const lootItems = icParseLoot(bau.loot);
  const berries = icCalcChestBerries(lootItems);
  const isChecked = isGlobal
    ? icIsGlobalChecked(islandName, bau.id)
    : icIsCharChecked(charId, islandName, bau.id);

  const chestSrc = isChecked ? IC_CHEST_SPRITE_CHECKED : IC_CHEST_SPRITE_DEFAULT;

  const chestImgHtml = `<img class="ic-chest-sprite${isChecked ? " ic-chest-checked" : ""}" src="${chestSrc}" alt="chest" loading="lazy">`;

  // Items row displayed to the right of the chest
  const itemsHtml = lootItems.map(({ name, qty }) => {
    const spritePath = icGetItemSpritePath(name);
    const tooltip = icGetItemTooltip(name, qty);
    return `<div class="ic-loot-item" title="${tooltip}">
      <img src="${spritePath}" alt="${name}" loading="lazy" onerror="this.style.display='none'">
      <span class="ic-loot-qty">${qty}</span>
    </div>`;
  }).join("");

  const berriesHtml = berries > 0
    ? `<div class="ic-chest-berries" title="Berries: ${berries}">฿${icFormatBerries(berries)}</div>`
    : "";

  const dataAttrs = isGlobal
    ? `data-global="true" data-island="${encodeURIComponent(islandName)}" data-chest-id="${bau.id}"`
    : `data-global="false" data-island="${encodeURIComponent(islandName)}" data-chest-id="${bau.id}" data-char-id="${charId}"`;

  return `<div class="ic-chest-card${isChecked ? " ic-chest-card-checked" : ""}" ${dataAttrs} role="checkbox" aria-checked="${isChecked}" tabindex="0">
    <div class="ic-chest-top">
      ${chestImgHtml}
      <div class="ic-loot-row">${itemsHtml}</div>
    </div>
    ${berriesHtml}
  </div>`;
}

// ---- Update stats display only (without re-rendering island) ----
function icUpdateStats() {
  const totalEl = document.getElementById("ic-total-berries");
  const remaining = icCalcTotalRemainingBerries();
  if (totalEl) totalEl.textContent = `฿${icFormatBerries(remaining)}`;

  const { ebTotal, ebDone, glTotal, glDone } = icCalcStaminaProgress();
  const ebBar = document.getElementById("ic-eb-progress-bar");
  const ebLabel = document.getElementById("ic-eb-progress-label");
  if (ebBar) ebBar.style.width = ebTotal > 0 ? `${(ebDone / ebTotal) * 100}%` : "0%";
  if (ebLabel) ebLabel.textContent = `${ebDone} ${t("islandChestsOf")} ${ebTotal}`;

  const glBar = document.getElementById("ic-gl-progress-bar");
  const glLabel = document.getElementById("ic-gl-progress-label");
  if (glBar) glBar.style.width = glTotal > 0 ? `${(glDone / glTotal) * 100}%` : "0%";
  if (glLabel) glLabel.textContent = `${glDone} ${t("islandChestsOf")} ${glTotal}`;

  // Island-specific stats row
  const islandStatsRow = document.getElementById("ic-island-stats-row");
  if (islandStatsRow) {
    const showIslandStats = !icStaminaOnly && !!icSelectedIsland;
    islandStatsRow.style.display = showIslandStats ? "flex" : "none";
    if (showIslandStats) {
      const islandBerries = icCalcIslandRemainingBerries(icSelectedIsland);
      const islandBerriesEl = document.getElementById("ic-island-berries");
      if (islandBerriesEl) islandBerriesEl.textContent = `฿${icFormatBerries(islandBerries)}`;

      const { ebTotal: iebTotal, ebDone: iebDone, glTotal: iglTotal, glDone: iglDone } = icCalcIslandStaminaProgress(icSelectedIsland);
      const iEbBar = document.getElementById("ic-island-eb-bar");
      const iEbLabel = document.getElementById("ic-island-eb-label");
      if (iEbBar) iEbBar.style.width = iebTotal > 0 ? `${(iebDone / iebTotal) * 100}%` : "0%";
      if (iEbLabel) iEbLabel.textContent = `${iebDone} ${t("islandChestsOf")} ${iebTotal}`;

      const iGlBar = document.getElementById("ic-island-gl-bar");
      const iGlLabel = document.getElementById("ic-island-gl-label");
      if (iGlBar) iGlBar.style.width = iglTotal > 0 ? `${(iglDone / iglTotal) * 100}%` : "0%";
      if (iGlLabel) iGlLabel.textContent = `${iglDone} ${t("islandChestsOf")} ${iglTotal}`;
    }
  }
}

// ---- Render all stamina chests across all islands (stamina-only mode) ----
function icRenderAllStaminaChests() {
  const container = document.getElementById("ic-chests-container");
  if (!container) return;

  // Collect islands that have matching chests
  const islandData = [];
  for (const island of ISLAND_CHEST_DATA) {
    const matched = island.baus.filter(b => icChestMatchesFilter(b));
    if (matched.length === 0) continue;
    islandData.push({
      island,
      globalBaus:  matched.filter(b =>  b.global),
      perCharBaus: matched.filter(b => !b.global)
    });
  }

  if (islandData.length === 0) {
    container.innerHTML = `<p class="ic-empty-msg">${t("islandChestsNoIslandSelected")}</p>`;
    return;
  }

  let html = `<div class="ic-stamina-all-wrap">`;

  // ---- Unique chests (global) — grouped by island ----
  const withGlobal = islandData.filter(d => d.globalBaus.length > 0);
  if (withGlobal.length > 0) {
    html += `<div class="ic-section">
      <h3 class="ic-section-title">${t("islandChestsGlobal")}</h3>
      <div class="ic-stamina-global-row">`;
    for (const { island, globalBaus } of withGlobal) {
      const slug = IC_ISLAND_BANNER_SLUG[island.nome] || island.nome.toLowerCase().replace(/ /g, "_");
      html += `<div class="ic-stamina-global-group">
        <div class="ic-stamina-global-label">
          <img class="ic-stamina-banner-sm" src="${IC_ISLAND_BANNERS_PATH}/${slug}.png" alt="${island.nome}">
          <span>${island.nome}</span>
        </div>
        <div class="ic-global-row">`;
      for (const bau of globalBaus) html += icBuildChestCard(bau, island.nome, true, null);
      html += `</div></div>`;
    }
    html += `</div></div>`;
  }

  // ---- Per-character: single wide table, islands as column groups ----
  const withPerChar = islandData.filter(d => d.perCharBaus.length > 0);
  if (withPerChar.length > 0) {
    html += `<div class="ic-section">
      <h3 class="ic-section-title">${t("islandChestsPerChar")}</h3>
      <div class="ic-char-table-wrap ic-drag-scroll">
        <table class="ic-char-table ic-stamina-table">
          <thead>
            <tr class="ic-stamina-island-row">
              <th class="ic-char-col-header" rowspan="2"></th>`;

    for (const { island, perCharBaus } of withPerChar) {
      const slug = IC_ISLAND_BANNER_SLUG[island.nome] || island.nome.toLowerCase().replace(/ /g, "_");
      html += `<th class="ic-stamina-island-th ic-group-start" colspan="${perCharBaus.length}">
        <img class="ic-stamina-banner-sm" src="${IC_ISLAND_BANNERS_PATH}/${slug}.png" alt="${island.nome}">
        <span class="ic-stamina-island-label">${island.nome}</span>
      </th>`;
    }

    html += `</tr><tr class="ic-stamina-chest-row">`;

    for (const { island, perCharBaus } of withPerChar) {
      for (let i = 0; i < perCharBaus.length; i++) {
        const bau = perCharBaus[i];
        const lootItems = icParseLoot(bau.loot);
        const berries = icCalcChestBerries(lootItems);
        const berriesStr = berries > 0 ? `฿${icFormatBerries(berries)}` : "";
        html += `<th class="ic-chest-col-header${i === 0 ? " ic-group-start" : ""}"><div class="ic-header-chest-items">`;
        for (const { name, qty } of lootItems) {
          const tooltip = icGetItemTooltip(name, qty);
          html += `<div class="ic-loot-item ic-loot-item-sm" title="${tooltip}">
            <img src="${icGetItemSpritePath(name)}" alt="${name}" loading="lazy" onerror="this.style.display='none'">
            <div class="ic-item-header-info">
              <span class="ic-loot-qty">${qty}</span>
            </div>
          </div>`;
        }
        html += `</div>`;
        if (berriesStr) html += `<div class="ic-header-berries" title="Berries: ${berries}">${berriesStr}</div>`;
        html += `</th>`;
      }
    }

    html += `</tr></thead><tbody>`;

    // Filter characters based on icCharacterFilter
    const displayedChars = icCharacterFilterActive
      ? CHARACTERS_DATA.filter(c => icCharacterFilter.includes(c.id))
      : CHARACTERS_DATA;

    for (const char of displayedChars) {
      html += `<tr>
        <td class="ic-char-name-cell">
          <div class="ic-char-avatar">
            <img src="${char.sprite}" alt="${char.name}" loading="lazy" onerror="this.src='sprites/characters/monkey_luffy.png'">
            <span class="ic-char-label">${char.name}</span>
          </div>
        </td>`;
      for (const { island, perCharBaus } of withPerChar) {
        for (let i = 0; i < perCharBaus.length; i++) {
          const bau = perCharBaus[i];
          const isChecked = icIsCharChecked(char.id, island.nome, bau.id);
          const chestSrc = isChecked ? IC_CHEST_SPRITE_CHECKED : IC_CHEST_SPRITE_DEFAULT;
          const dataAttrs = `data-global="false" data-island="${encodeURIComponent(island.nome)}" data-chest-id="${bau.id}" data-char-id="${char.id}"`;
          html += `<td class="ic-chest-cell${i === 0 ? " ic-group-start" : ""}">
            <div class="ic-chest-card-sm${isChecked ? " ic-chest-card-checked" : ""}" ${dataAttrs} role="checkbox" aria-checked="${isChecked}" tabindex="0">
              <img class="ic-chest-sprite-sm${isChecked ? " ic-chest-checked" : ""}" src="${chestSrc}" alt="chest" loading="lazy">
            </div>
          </td>`;
        }
      }
      html += `</tr>`;
    }

    html += `</tbody></table></div></div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
  icAttachChestEvents(container);
}

// ---- Render the chests area ----
function icRenderIslandChests() {
  if (icStaminaOnly) {
    icRenderAllStaminaChests();
    return;
  }
  const container = document.getElementById("ic-chests-container");
  if (!container || !icSelectedIsland) return;

  const island = ISLAND_CHEST_DATA.find(i => i.nome === icSelectedIsland);
  if (!island) { container.innerHTML = ""; return; }

  const globalBaus = island.baus.filter(b => b.global && icChestMatchesFilter(b));
  const perCharBaus = island.baus.filter(b => !b.global && icChestMatchesFilter(b));

  let html = "";

  // Global chests section
  if (globalBaus.length > 0) {
    html += `<div class="ic-section">
      <h3 class="ic-section-title">${t("islandChestsGlobal")}</h3>
      <div class="ic-global-row">`;
    for (const bau of globalBaus) {
      html += icBuildChestCard(bau, island.nome, true, null);
    }
    html += `</div></div>`;
  }

  // Per-character section
  if (perCharBaus.length > 0) {
    html += `<div class="ic-section">
      <h3 class="ic-section-title">${t("islandChestsPerChar")}</h3>
      <div class="ic-char-table-wrap">
        <table class="ic-char-table">
          <thead>
            <tr>
              <th class="ic-char-col-header"></th>`;
    for (const bau of perCharBaus) {
      const lootItems = icParseLoot(bau.loot);
      const berries = icCalcChestBerries(lootItems);
      const berriesStr = berries > 0 ? `฿${icFormatBerries(berries)}` : "";
      html += `<th class="ic-chest-col-header">
        <div class="ic-header-chest-items">`;
      for (const { name, qty } of lootItems) {
        const tooltip = icGetItemTooltip(name, qty);
        html += `<div class="ic-loot-item ic-loot-item-sm" title="${tooltip}">
          <img src="${icGetItemSpritePath(name)}" alt="${name}" loading="lazy" onerror="this.style.display='none'">
          <div class="ic-item-header-info">
            <span class="ic-loot-qty">${qty}</span>
          </div>
        </div>`;
      }
      html += `</div>`;
      if (berriesStr) html += `<div class="ic-header-berries" title="Berries: ${berries}">${berriesStr}</div>`;
      html += `</th>`;
    }
    html += `</tr></thead><tbody>`;

    // Filter characters based on icCharacterFilter
    const displayedChars = icCharacterFilterActive
      ? CHARACTERS_DATA.filter(c => icCharacterFilter.includes(c.id))
      : CHARACTERS_DATA;

    for (const char of displayedChars) {
      html += `<tr>
        <td class="ic-char-name-cell">
          <div class="ic-char-avatar">
            <img src="${char.sprite}" alt="${char.name}" loading="lazy" onerror="this.src='sprites/characters/monkey_luffy.png'">
            <span class="ic-char-label">${char.name}</span>
          </div>
        </td>`;
      for (const bau of perCharBaus) {
        const isChecked = icIsCharChecked(char.id, island.nome, bau.id);
        const chestSrc = isChecked ? IC_CHEST_SPRITE_CHECKED : IC_CHEST_SPRITE_DEFAULT;
        const dataAttrs = `data-global="false" data-island="${encodeURIComponent(island.nome)}" data-chest-id="${bau.id}" data-char-id="${char.id}"`;
        html += `<td class="ic-chest-cell">
          <div class="ic-chest-card-sm${isChecked ? " ic-chest-card-checked" : ""}" ${dataAttrs} role="checkbox" aria-checked="${isChecked}" tabindex="0">
            <img class="ic-chest-sprite-sm${isChecked ? " ic-chest-checked" : ""}" src="${chestSrc}" alt="chest" loading="lazy">
          </div>
        </td>`;
      }
      html += `</tr>`;
    }

    html += `</tbody></table></div></div>`;
  }

  if (html === "") {
    html = `<p class="ic-empty-msg">${t("islandChestsNoIslandSelected")}</p>`;
  }

  container.innerHTML = html;
  icAttachChestEvents(container);
}

function icAttachChestEvents(container) {
  icAttachDragScroll(container);
  container.querySelectorAll("[data-chest-id]").forEach(el => {
    el.addEventListener("click", icHandleChestToggle);
    el.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        icHandleChestToggle.call(el, e);
      }
    });
  });
}

function icAttachDragScroll(container) {
  container.querySelectorAll(".ic-drag-scroll").forEach((wrap) => {
    if (wrap.dataset.dragReady === "1") return;
    wrap.dataset.dragReady = "1";

    // Threshold in px before we commit to a drag (avoids eating normal clicks)
    const DRAG_THRESHOLD = 8;

    let active = false;   // pointerdown in progress
    let dragging = false; // threshold exceeded — real drag
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;

    wrap.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      active = true;
      dragging = false;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = wrap.scrollLeft;
      startTop  = wrap.scrollTop;
      // No setPointerCapture — pointer events must still reach chest children
    });

    wrap.addEventListener("pointermove", (e) => {
      if (!active) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragging && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        dragging = true;
        wrap.classList.add("ic-dragging");
      }
      if (dragging) {
        wrap.scrollLeft = startLeft - dx;
        wrap.scrollTop  = startTop  - dy;
        e.preventDefault();
      }
    });

    function endDrag() {
      if (!active) return;
      active = false;
      if (dragging) {
        wrap.classList.remove("ic-dragging");
        // Suppress exactly the one synthetic click that fires after a drag
        wrap.addEventListener("click", stopOneClick, { capture: true, once: true });
      }
      dragging = false;
    }

    function stopOneClick(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    wrap.addEventListener("pointerup",     endDrag);
    wrap.addEventListener("pointercancel", endDrag);
    wrap.addEventListener("pointerleave",  endDrag);
  });
}

function icHandleChestToggle(e) {
  const el = e.currentTarget || e.target.closest("[data-chest-id]") || this;
  const isGlobal = el.dataset.global === "true";
  const islandName = decodeURIComponent(el.dataset.island);
  const chestId = parseInt(el.dataset.chestId, 10);
  const charId = el.dataset.charId || null;

  if (isGlobal) {
    const newVal = !icIsGlobalChecked(islandName, chestId);
    icSetGlobalChecked(islandName, chestId, newVal);
  } else {
    const newVal = !icIsCharChecked(charId, islandName, chestId);
    icSetCharChecked(charId, islandName, chestId, newVal);
  }

  icSaveState();

  // Update just this element's visual state
  const newChecked = isGlobal
    ? icIsGlobalChecked(islandName, chestId)
    : icIsCharChecked(charId, islandName, chestId);

  el.setAttribute("aria-checked", newChecked);
  el.classList.toggle("ic-chest-card-checked", newChecked);
  el.classList.toggle("ic-chest-card-sm-checked", newChecked);

  const img = el.querySelector("img.ic-chest-sprite, img.ic-chest-sprite-sm");
  if (img) {
    img.src = newChecked ? IC_CHEST_SPRITE_CHECKED : IC_CHEST_SPRITE_DEFAULT;
    img.classList.toggle("ic-chest-checked", newChecked);
  }

  icUpdateStats();
}

// ---- Render island list sidebar ----
// ---- Click handler for island buttons ----
function icSelectIsland(islandNameEncoded) {
  if (!islandNameEncoded) return;
  icSelectedIsland = decodeURIComponent(islandNameEncoded);
  // Clear character filter when selecting an island
  icCharacterFilter = [];
  icCharacterFilterActive = false;
  const searchInput = document.getElementById("ic-char-search");
  if (searchInput) searchInput.value = "";
  // Render everything
  icRenderIslandList();
  icRenderIslandChests();
  icUpdateStats();
}

function icRenderIslandList() {
  const list = document.getElementById("ic-island-list");
  if (!list) return;

  list.innerHTML = ISLAND_CHEST_DATA.map(island => {
    const slug = IC_ISLAND_BANNER_SLUG[island.nome] || island.nome.toLowerCase().replace(/ /g, "_");
    const isActive = island.nome === icSelectedIsland;
    return `<button class="ic-island-btn${isActive ? " active" : ""}" data-island="${encodeURIComponent(island.nome)}" title="${island.nome}">
      <img class="ic-island-banner" src="${IC_ISLAND_BANNERS_PATH}/${slug}.png" alt="${island.nome}" loading="lazy">
    </button>`;
  }).join("");

  list.querySelectorAll(".ic-island-btn").forEach((btn) => {
    btn.onclick = () => icSelectIsland(btn.dataset.island || "");
  });
}

function icBindUiControls() {
  const searchInput = document.getElementById("ic-char-search");
  if (searchInput) {
    searchInput.oninput = (e) => {
      icSetCharacterFilter(e.target.value);
    };
  }

  const staminaToggle = document.getElementById("ic-stamina-only-toggle");
  if (staminaToggle) {
    staminaToggle.onclick = () => {
      icSetStaminaOnly(!icStaminaOnly);
    };
  }

  const staminaFilterGroup = document.getElementById("ic-stamina-filter-group");
  if (staminaFilterGroup) {
    staminaFilterGroup.onclick = (e) => {
      const btn = e.target.closest(".ic-filter-btn");
      if (!btn) return;
      icSetStaminaFilter(btn.dataset.filter);
    };
  }

  const resetIslandBtn = document.getElementById("ic-reset-island-btn");
  if (resetIslandBtn) {
    resetIslandBtn.onclick = icResetIsland;
  }

  const resetAllBtn = document.getElementById("ic-reset-all-btn");
  if (resetAllBtn) {
    resetAllBtn.onclick = icResetAll;
  }
}

// ---- Filter controls ----
function icSetStaminaOnly(val) {
  icStaminaOnly = val;
  // Clear character filter when switching modes
  icCharacterFilter = [];
  icCharacterFilterActive = false;
  const searchInput = document.getElementById("ic-char-search");
  if (searchInput) searchInput.value = "";
  
  const toggle = document.getElementById("ic-stamina-only-toggle");
  if (toggle) toggle.classList.toggle("active", val);
  
  const filterGroup = document.getElementById("ic-stamina-filter-group");
  if (filterGroup) filterGroup.style.display = val ? "flex" : "none";
  
  const layout = document.querySelector(".ic-layout");
  if (layout) layout.classList.toggle("ic-stamina-mode", val);
  
  icRenderIslandChests();
  icUpdateStats();
}

function icSetStaminaFilter(val) {
  icStaminaFilter = val;
  document.querySelectorAll(".ic-filter-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === val);
  });
  icRenderIslandChests();
  icUpdateStats();
}

// ---- Reset ----
function icResetIsland() {
  if (!icSelectedIsland) return;
  const island = ISLAND_CHEST_DATA.find(i => i.nome === icSelectedIsland);
  if (!island) return;

  // Clear global
  if (icState.globalChecked[icSelectedIsland]) {
    delete icState.globalChecked[icSelectedIsland];
  }
  // Clear per-char
  for (const charId of Object.keys(icState.checked)) {
    if (icState.checked[charId][icSelectedIsland]) {
      delete icState.checked[charId][icSelectedIsland];
    }
  }
  icSaveState();
  icRenderIslandChests();
  icUpdateStats();
}

function icResetAll() {
  icState = { checked: {}, globalChecked: {} };
  icSaveState();
  icRenderIslandChests();
  icUpdateStats();
}

// ---- Set character filter from search input ----
function icSetCharacterFilter(searchStr) {
  const searchInput = document.getElementById("ic-char-search");
  const raw = (searchStr || "").trim();
  
  if (!raw) {
    icCharacterFilter = [];
    icCharacterFilterActive = false;
    if (searchInput) {
      searchInput.value = "";
    }
  } else {
    const names = raw.split(",").map(name => name.trim().toLowerCase()).filter(Boolean);
    icCharacterFilter = CHARACTERS_DATA
      .filter(c => names.some(name => c.name.toLowerCase().includes(name)))
      .map(c => c.id);
    icCharacterFilterActive = true;
    if (searchInput) {
      searchInput.value = raw;
    }
  }
  
  icRenderIslandChests();
  icUpdateStats();
}

// ---- Language change hook ----
function islandChestsApplyTranslations() {
  if (!icInitialized) return;
  icRenderIslandList();
  icRenderIslandChests();
  icUpdateStats();
}

// ---- Main init ----
function islandChestsInit() {
  if (icInitialized) {
    icRenderIslandList();
    icBindUiControls();
    icRenderIslandChests();
    icUpdateStats();
    return;
  }
  icInitialized = true;
  icLoadState();

  // Build the header section (title + controls + stats)
  // Auto-select an island with per-character chests so the table is visible immediately
  if (!icSelectedIsland && ISLAND_CHEST_DATA.length > 0) {
    const defaultIsland = ISLAND_CHEST_DATA.find((island) => island.baus.some((b) => !b.global));
    icSelectedIsland = (defaultIsland || ISLAND_CHEST_DATA[0]).nome;
  }

  const header = document.getElementById("ic-header");
  if (header) {
    header.innerHTML = `
      <div class="ic-header-row">
        <div class="ic-controls">
          <input type="text" id="ic-char-search" class="ic-char-search" placeholder="${t("islandChestsSearchChars")}" title="${t("islandChestsSearchCharsHint")}" value="">
          <button id="ic-stamina-only-toggle" class="ic-filter-toggle-btn${icStaminaOnly ? " active" : ""}">
            <span data-lang="islandChestsStaminaOnly">${t("islandChestsStaminaOnly")}</span>
          </button>
          <div id="ic-stamina-filter-group" class="ic-filter-group" style="display:${icStaminaOnly ? "flex" : "none"}">
            <button class="ic-filter-btn${icStaminaFilter === "both" ? " active" : ""}" data-filter="both" data-lang="islandChestsFilterBoth">${t("islandChestsFilterBoth")}</button>
            <button class="ic-filter-btn${icStaminaFilter === "eb" ? " active" : ""}" data-filter="eb" data-lang="islandChestsFilterEbOnly">${t("islandChestsFilterEbOnly")}</button>
            <button class="ic-filter-btn${icStaminaFilter === "gl" ? " active" : ""}" data-filter="gl" data-lang="islandChestsFilterGlOnly">${t("islandChestsFilterGlOnly")}</button>
          </div>
        </div>
        <div class="ic-actions">
          <button id="ic-reset-island-btn" class="ic-action-btn" data-lang="islandChestsResetIsland">${t("islandChestsResetIsland")}</button>
          <button id="ic-reset-all-btn" class="ic-action-btn ic-action-btn-danger" data-lang="islandChestsResetAll">${t("islandChestsResetAll")}</button>
        </div>
      </div>
      <div class="ic-stats-row">
        <div class="ic-stat-block">
          <span class="ic-stat-label"><span data-lang="islandChestsTotalBerries">${t("islandChestsTotalBerries")}</span>:</span>
          <span id="ic-total-berries" class="ic-stat-value">฿0</span>
        </div>
        <div class="ic-progress-block">
          <span class="ic-stat-label"><span data-lang="islandChestsEbStamina">${t("islandChestsEbStamina")}</span>:</span>
          <div class="ic-progress-bar-wrap">
            <div class="ic-progress-bar ic-eb-bar">
              <div id="ic-eb-progress-bar" class="ic-progress-fill"></div>
            </div>
            <span id="ic-eb-progress-label" class="ic-progress-label">0 ${t("islandChestsOf")} 0</span>
          </div>
        </div>
        <div class="ic-progress-block">
          <span class="ic-stat-label"><span data-lang="islandChestsGlStamina">${t("islandChestsGlStamina")}</span>:</span>
          <div class="ic-progress-bar-wrap">
            <div class="ic-progress-bar ic-gl-bar">
              <div id="ic-gl-progress-bar" class="ic-progress-fill"></div>
            </div>
            <span id="ic-gl-progress-label" class="ic-progress-label">0 ${t("islandChestsOf")} 0</span>
          </div>
        </div>
      </div>
      <div id="ic-island-stats-row" class="ic-stats-row ic-island-stats-row" style="display:${!icStaminaOnly && !!icSelectedIsland ? 'flex' : 'none'}">
        <div class="ic-stat-block">
          <span class="ic-stat-label ic-island-label-prefix"><span data-lang="islandChestsIslandLabel">${t("islandChestsIslandLabel")}</span> — <span data-lang="islandChestsTotalBerries">${t("islandChestsTotalBerries")}</span>:</span>
          <span id="ic-island-berries" class="ic-stat-value">฿0</span>
        </div>
        <div class="ic-progress-block">
          <span class="ic-stat-label"><span data-lang="islandChestsEbStamina">${t("islandChestsEbStamina")}</span>:</span>
          <div class="ic-progress-bar-wrap">
            <div class="ic-progress-bar ic-eb-bar">
              <div id="ic-island-eb-bar" class="ic-progress-fill"></div>
            </div>
            <span id="ic-island-eb-label" class="ic-progress-label">0 ${t("islandChestsOf")} 0</span>
          </div>
        </div>
        <div class="ic-progress-block">
          <span class="ic-stat-label"><span data-lang="islandChestsGlStamina">${t("islandChestsGlStamina")}</span>:</span>
          <div class="ic-progress-bar-wrap">
            <div class="ic-progress-bar ic-gl-bar">
              <div id="ic-island-gl-bar" class="ic-progress-fill"></div>
            </div>
            <span id="ic-island-gl-label" class="ic-progress-label">0 ${t("islandChestsOf")} 0</span>
          </div>
        </div>
      </div>`;
  }

  icRenderIslandList();
  icBindUiControls();
  icRenderIslandChests();
  icUpdateStats();
}
