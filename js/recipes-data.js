// ============================================================
// Recipes Data — static data (replaces fetch from JSON files)
// Works with file:// protocol (no fetch needed)
// ============================================================

const RECIPE_ITEMS_LIST = [
  { id: 1,  labelKey: "item.premium_raw_beef",  value: 200, sprite: "sprites/items/premium_raw_beef.png" },
  { id: 2,  labelKey: "item.raw_lobster",        value: 370, sprite: "sprites/items/raw_lobster.png" },
  { id: 3,  labelKey: "item.raw_shrimp",         value: 300, sprite: "sprites/items/raw_shrimp.png" },
  { id: 4,  labelKey: "item.raw_rabbit_meat",    value: 186, sprite: "sprites/items/raw_rabbit_meat.png" },
  { id: 5,  labelKey: "item.raw_fish",           value: 50,  sprite: "sprites/items/raw_fish.png" },
  { id: 6,  labelKey: "item.tuna",               value: 86,  sprite: "sprites/items/tuna.png" },
  { id: 7,  labelKey: "item.oyster",             value: 360, sprite: "sprites/items/oyster.png" },
  { id: 8,  labelKey: "item.bacon",              value: 10,  sprite: "sprites/items/bacon.png" },
  { id: 9,  labelKey: "item.egg",                value: 10,  sprite: "sprites/items/egg.png" },
  { id: 10, labelKey: "item.butter",             value: 40,  sprite: "sprites/items/butter.png" },
  { id: 11, labelKey: "item.green_leaves",       value: 15,  sprite: "sprites/items/green_leaves.png" },
  { id: 12, labelKey: "item.lettuce",            value: 20,  sprite: "sprites/items/lettuce.png" },
  { id: 13, labelKey: "item.tomatoes",           value: 10,  sprite: "sprites/items/tomatoes.png" },
  { id: 14, labelKey: "item.lemon",              value: 10,  sprite: "sprites/items/lemon.png" },
  { id: 15, labelKey: "item.water",              value: 5,   sprite: "sprites/items/water.png" },
  { id: 16, labelKey: "item.white_wine",         value: 700, sprite: "sprites/items/white_wine.png" },
  { id: 17, labelKey: "item.mushroom",           value: 20,  sprite: "sprites/items/mushroom.png" },
  { id: 18, labelKey: "item.white_truffle",      value: 250, sprite: "sprites/items/white_truffle.png" },
  { id: 19, labelKey: "item.salt",               value: 10,  sprite: "sprites/items/salt.png" },
  { id: 20, labelKey: "item.pepper",             value: 15,  sprite: "sprites/items/pepper.png" },
  { id: 21, labelKey: "item.rice",               value: 10,  sprite: "sprites/items/rice.png" },
  { id: 22, labelKey: "item.garlic",             value: 10,  sprite: "sprites/items/garlic.png" },
  { id: 23, labelKey: "item.potato",             value: 10,  sprite: "sprites/items/potato.png" },
  { id: 24, labelKey: "item.olive_oil",          value: 15,  sprite: "sprites/items/olive_oil.png" },
  { id: 25, labelKey: "item.onion",              value: 10,  sprite: "sprites/items/onion.png" },
  { id: 26, labelKey: "item.heavy_cream",        value: 20,  sprite: "sprites/items/heavy_cream.png" },
  { id: 27, labelKey: "item.pasta",              value: 10,  sprite: "sprites/items/pasta.png" },
  { id: 28, labelKey: "item.cheese",             value: 15,  sprite: "sprites/items/cheese.png" },
  { id: 29, labelKey: "item.crab_meat",          value: 400, sprite: "sprites/items/crab_meat.png" },
  { id: 30, labelKey: "item.raw_octopus",        value: 500, sprite: "sprites/items/raw_octopus.png" },
  { id: 31, labelKey: "item.chicken",            value: 300, sprite: "sprites/items/chicken.png" },
  { id: 32, labelKey: "item.raw_lamb_meat",      value: 650, sprite: "sprites/items/raw_lamb_meat.png" },
];

const RECIPE_ITEMS_BY_ID = {};
RECIPE_ITEMS_LIST.forEach(function(it) { RECIPE_ITEMS_BY_ID[it.id] = it; });

const RECIPES_LIST = [
  {
    labelKey: "recipe.steak_and_egg_skillet",
    sprite: "sprites/recipes/steak_and_egg_skillet.png",
    level: 70, cooldown: 300,
    ingredients: [
      { id: 1, quantity: 3 }, { id: 9, quantity: 2 }, { id: 11, quantity: 1 },
      { id: 19, quantity: 4 }, { id: 20, quantity: 2 }, { id: 24, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.italian_salad",
    sprite: "sprites/recipes/italian_salad.png",
    level: 70, cooldown: 180,
    ingredients: [
      { id: 11, quantity: 1 }, { id: 12, quantity: 5 }, { id: 13, quantity: 3 },
      { id: 18, quantity: 5 }, { id: 19, quantity: 1 }, { id: 23, quantity: 2 }, { id: 24, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.meat_medallion",
    sprite: "sprites/recipes/meat_medallion.png",
    level: 80, cooldown: 300,
    ingredients: [
      { id: 1, quantity: 3 }, { id: 8, quantity: 8 }, { id: 11, quantity: 1 },
      { id: 14, quantity: 2 }, { id: 15, quantity: 4 }, { id: 19, quantity: 2 },
      { id: 22, quantity: 1 }, { id: 23, quantity: 4 }, { id: 24, quantity: 3 }
    ]
  },
  {
    labelKey: "recipe.gourmet_meat_skewer",
    sprite: "sprites/recipes/gourmet_meat_skewer.png",
    level: 80, cooldown: 180,
    ingredients: [
      { id: 1, quantity: 4 }, { id: 8, quantity: 5 }, { id: 11, quantity: 3 },
      { id: 16, quantity: 1 }, { id: 19, quantity: 2 }, { id: 20, quantity: 3 },
      { id: 24, quantity: 3 }, { id: 25, quantity: 4 }
    ]
  },
  {
    labelKey: "recipe.rabbit_curry",
    sprite: "sprites/recipes/rabbit_curry.png",
    level: 90, cooldown: 300,
    ingredients: [
      { id: 4, quantity: 5 }, { id: 9, quantity: 1 }, { id: 13, quantity: 2 },
      { id: 19, quantity: 2 }, { id: 20, quantity: 2 }, { id: 22, quantity: 1 },
      { id: 24, quantity: 2 }, { id: 25, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.shrimp_scampi",
    sprite: "sprites/recipes/shrimp_scampi.png",
    level: 90, cooldown: 180,
    ingredients: [
      { id: 3, quantity: 4 }, { id: 10, quantity: 1 }, { id: 11, quantity: 2 },
      { id: 14, quantity: 2 }, { id: 16, quantity: 1 }, { id: 18, quantity: 1 },
      { id: 19, quantity: 1 }, { id: 20, quantity: 2 }, { id: 22, quantity: 4 }, { id: 24, quantity: 3 }
    ]
  },
  {
    labelKey: "recipe.oyster_stew",
    sprite: "sprites/recipes/oyster_stew.png",
    level: 100, cooldown: 300,
    ingredients: [
      { id: 7, quantity: 3 }, { id: 10, quantity: 2 }, { id: 19, quantity: 2 },
      { id: 20, quantity: 2 }, { id: 22, quantity: 1 }, { id: 25, quantity: 1 }, { id: 26, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.seafood_paella",
    sprite: "sprites/recipes/seafood_paella.png",
    level: 100, cooldown: 180,
    ingredients: [
      { id: 2, quantity: 3 }, { id: 3, quantity: 5 }, { id: 5, quantity: 1 },
      { id: 11, quantity: 1 }, { id: 13, quantity: 1 }, { id: 15, quantity: 3 },
      { id: 19, quantity: 1 }, { id: 20, quantity: 1 }, { id: 21, quantity: 2 }, { id: 24, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.grilled_tuna",
    sprite: "sprites/recipes/grilled_tuna.png",
    level: 110, cooldown: 300,
    ingredients: [
      { id: 6, quantity: 5 }, { id: 10, quantity: 2 }, { id: 11, quantity: 2 },
      { id: 12, quantity: 4 }, { id: 14, quantity: 2 }, { id: 16, quantity: 1 },
      { id: 20, quantity: 2 }, { id: 22, quantity: 2 }, { id: 24, quantity: 2 }
    ]
  },
  {
    labelKey: "recipe.wagyu_beef",
    sprite: "sprites/recipes/wagyu_beef.png",
    level: 110, cooldown: 180,
    ingredients: [
      { id: 1, quantity: 6 }, { id: 11, quantity: 4 }, { id: 14, quantity: 2 },
      { id: 16, quantity: 1 }, { id: 17, quantity: 5 }, { id: 18, quantity: 2 },
      { id: 19, quantity: 4 }, { id: 20, quantity: 3 }, { id: 22, quantity: 2 },
      { id: 24, quantity: 6 }, { id: 25, quantity: 3 }
    ]
  },
  {
    labelKey: "recipe.octopus_skewer",
    sprite: "sprites/recipes/octopus_skewer.png",
    level: 120, cooldown: 300,
    ingredients: [
      { id: 19, quantity: 4 }, { id: 20, quantity: 1 }, { id: 22, quantity: 2 },
      { id: 24, quantity: 2 }, { id: 25, quantity: 1 }, { id: 30, quantity: 3 }
    ]
  },
  {
    labelKey: "recipe.crab_soup",
    sprite: "sprites/recipes/crab_soup.png",
    level: 120, cooldown: 180,
    ingredients: [
      { id: 11, quantity: 3 }, { id: 13, quantity: 6 }, { id: 15, quantity: 9 },
      { id: 18, quantity: 2 }, { id: 19, quantity: 2 }, { id: 20, quantity: 4 },
      { id: 25, quantity: 3 }, { id: 27, quantity: 13 }, { id: 28, quantity: 3 }, { id: 29, quantity: 4 }
    ]
  },
  {
    labelKey: "recipe.lamb_meat",
    sprite: "sprites/recipes/lamb_meat.png",
    level: 130, cooldown: 300,
    ingredients: [
      { id: 11, quantity: 2 }, { id: 14, quantity: 1 }, { id: 16, quantity: 1 },
      { id: 17, quantity: 2 }, { id: 18, quantity: 1 }, { id: 19, quantity: 2 },
      { id: 20, quantity: 1 }, { id: 22, quantity: 2 }, { id: 24, quantity: 3 },
      { id: 25, quantity: 2 }, { id: 32, quantity: 1 }
    ]
  },
  {
    labelKey: "recipe.grilled_octopus",
    sprite: "sprites/recipes/grilled_octopus.png",
    level: 130, cooldown: 180,
    ingredients: [
      { id: 11, quantity: 3 }, { id: 13, quantity: 6 }, { id: 18, quantity: 1 },
      { id: 19, quantity: 4 }, { id: 22, quantity: 2 }, { id: 24, quantity: 2 },
      { id: 25, quantity: 2 }, { id: 26, quantity: 3 }, { id: 28, quantity: 3 }, { id: 30, quantity: 5 }
    ]
  },
  {
    labelKey: "recipe.teriyaki_chicken",
    sprite: "sprites/recipes/teriyaki_chicken.png",
    level: 140, cooldown: 300,
    ingredients: [
      { id: 11, quantity: 3 }, { id: 13, quantity: 3 }, { id: 18, quantity: 3 },
      { id: 19, quantity: 2 }, { id: 20, quantity: 1 }, { id: 22, quantity: 3 },
      { id: 24, quantity: 6 }, { id: 26, quantity: 3 }, { id: 31, quantity: 5 }
    ]
  },
  {
    labelKey: "recipe.shrimp_paella",
    sprite: "sprites/recipes/shrimp_paella.png",
    level: 140, cooldown: 180,
    ingredients: [
      { id: 3, quantity: 8 }, { id: 11, quantity: 1 }, { id: 13, quantity: 1 },
      { id: 15, quantity: 3 }, { id: 18, quantity: 3 }, { id: 19, quantity: 1 },
      { id: 20, quantity: 1 }, { id: 21, quantity: 2 }, { id: 24, quantity: 1 }
    ]
  },
];
