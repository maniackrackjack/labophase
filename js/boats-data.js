// ============================================================
// Boats Data - derived from boat_items.json and refinery-artillery, ships.txt
// ============================================================

const BOAT_ITEMS_LIST = [
  {
    id: 1,
    labelKey: "item.low-grade_cotton",
    value: 5,
    sprite: "sprites/boats/items/low_grade_cotton.png"
  },
  {
    id: 2,
    labelKey: "item.wood_log",
    value: 10,
    sprite: "sprites/boats/items/wood_log.png"
  },
  {
    id: 3,
    labelKey: "item.copper_ore",
    value: 15,
    sprite: "sprites/boats/items/copper_ore.png"
  },
  {
    id: 4,
    labelKey: "item.gun_powder",
    value: 30,
    sprite: "sprites/boats/items/gun_powder.png"
  },
  {
    id: 5,
    labelKey: "item.cotton",
    value: 75,
    sprite: "sprites/boats/items/cotton.png"
  },
  {
    id: 6,
    labelKey: "item.oak_log",
    value: 100,
    sprite: "sprites/boats/items/oak_log.png"
  },
  {
    id: 7,
    labelKey: "item.iron_ore",
    value: 150,
    sprite: "sprites/boats/items/iron_ore.png"
  },
  {
    id: 8,
    labelKey: "item.expert_gun_powder",
    value: 300,
    sprite: "sprites/boats/items/expert_gun_powder.png"
  },
  {
    id: 9,
    labelKey: "item.advanced_cotton",
    value: 110,
    sprite: "sprites/boats/items/advanced_cotton.png"
  },
  {
    id: 10,
    labelKey: "item.mahogany_log",
    value: 150,
    sprite: "sprites/boats/items/mahogany_log.png"
  },
  {
    id: 11,
    labelKey: "item.steel_ore",
    value: 225,
    sprite: "sprites/boats/items/steel_ore.png"
  },
  {
    id: 12,
    labelKey: "item.superior_gun_powder",
    value: 450,
    sprite: "sprites/boats/items/superior_gun_powder.png"
  },
  {
    id: 13,
    labelKey: "item.professional_cotton",
    value: 160,
    sprite: "sprites/boats/items/professional_cotton.png"
  },
  {
    id: 14,
    labelKey: "item.adam_log",
    value: 200,
    sprite: "sprites/boats/items/adam_log.png"
  },
  {
    id: 15,
    labelKey: "item.titanium_ore",
    value: 300,
    sprite: "sprites/boats/items/titanium_ore.png"
  },
  {
    id: 16,
    labelKey: "item.refined_gun_powder",
    value: 650,
    sprite: "sprites/boats/items/refined_gun_powder.png"
  },
  {
    id: 17,
    labelKey: "item.cola",
    value: 200,
    sprite: "sprites/boats/items/cola.png"
  },
  {
    id: 18,
    labelKey: "item.gun_barrel",
    value: 350,
    sprite: "sprites/boats/items/gun_barrel.png"
  },
  {
    id: 19,
    labelKey: "item.cannon_ball",
    value: 750,
    sprite: "sprites/boats/items/cannon_ball.png"
  },
  {
    id: 20,
    labelKey: "item.big_cola",
    value: 300,
    sprite: "sprites/boats/items/big_cola.png"
  },
  {
    id: 21,
    labelKey: "item.steel_cannon_ball",
    value: 1125,
    sprite: "sprites/boats/items/steel_cannon_ball.png"
  },
  {
    id: 22,
    labelKey: "item.battery",
    value: 500,
    sprite: "sprites/boats/items/battery.png"
  },
  {
    id: 23,
    labelKey: "item.flammable_liquid",
    value: 500,
    sprite: "sprites/boats/items/flammable_liquid.png"
  },
  {
    id: 24,
    labelKey: "item.air_tank",
    value: 500,
    sprite: "sprites/boats/items/air_tank.png"
  },
  {
    id: 25,
    labelKey: "item.oil_can",
    value: 500,
    sprite: "sprites/boats/items/oil_can.png"
  },
  {
    id: 26,
    labelKey: "item.poison_mushroom",
    value: 500,
    sprite: "sprites/boats/items/poison_mushroom.png"
  },
  {
    id: 27,
    labelKey: "item.superior_gun_barrel",
    value: 525,
    sprite: "sprites/boats/items/superior_gun_barrel.png"
  },
  {
    id: 28,
    labelKey: "item.blueprint",
    value: 5000,
    sprite: "sprites/boats/items/blueprint.png"
  },
  {
    id: 29,
    labelKey: "item.expert_oil_can",
    value: 700,
    sprite: "sprites/boats/items/expert_oil_can.png"
  },
  {
    id: 30,
    labelKey: "item.expert_gun_barrel",
    value: 725,
    sprite: "sprites/boats/items/expert_gun_barrel.png"
  },
  {
    id: 31,
    labelKey: "item.alkaline_battery",
    value: 700,
    sprite: "sprites/boats/items/alkaline_battery.png"
  }
];

const BOAT_REFINERY_LINES = [
  "1 wood planks = 10 wood log",
  "1 copper ingot = 8 copper ore",
  "1 low-grade cloth = 16 low-grade cotton",
  "1 low-grade rope = 2 low-grade cloth",
  "1 copper nail = 1 copper ingot",
  "1 oak planks = 10 oak log",
  "1 iron ingot = 8 iron ore",
  "1 cloth = 16 cotton",
  "1 rope = 2 cloth",
  "1 iron nail = 1 iron ingot",
  "1 mahogany planks = 10 mahogany log",
  "1 steel ingot = 8 steel ore",
  "1 advanced cloth = 16 advanced cotton",
  "1 advanced rope = 2 advanced rope",
  "1 steel nail = 1 steel ingot",
  "1 adam planks = 10 adam log",
  "1 titanium ingot = 9 titanium ore",
  "1 professional cloth = 16 professional cotton",
  "1 professional rope = 2 professional cloth",
  "1 titanium nail = 1 titanium ingot"
];

const BOAT_ARSENAL_LINES = [
  "ship upgrade kit = 1 cannon, 1 sail, 1 hull",
  "Cannon = 2 mahogany plank, 1 advanced rope, 2 steel ingot, 2 steel nail, 25 superior gun powder, 4 steel cannon ball",
  "Sail = 30 mahogany log, 6 advanced cloth, 2 advanced rope, 2 steel nail, 5 big cola",
  "Hull = 11 mahogany planks, 3 steel ingot, 4 steel nail",
  "Fire Cannon = 30 flammable liquid, 1 cannon",
  "Acid Cannon = 30 poison mushroom, 1 cannon",
  "Shotgun = 1 adam plank, 2 titanium ingot, 2 titanium nail, 1 professional rope, 15 refined gun powder, 10 big cola",
  "Chain Shot = 1 adam plank, 2 titanium ingot, 2 titanium nail, 1 professional rope, 15 refined gun powder, 3 steel cannon ball",
  "Ram = 7 adam plank, 3 titanium ingot, 2 titanium nail, 9 big cola",
  "Machine gun = 1 adam plank, 1 titanium ingot, 20 refined gun powder, 18 expert gun barrel",
  "Speed UP = 2 adam plank, 2 titanium nail, 4 professional cloth, 1 professional rope, 20 big cola",
  "Heavy Cannon = 2 adam plank, 2 titanium ingot, 1 professional rope, 15 refined gun powder, 8 steel cannon ball",
  "Explosive Barrel = 1 adam plank, 20 refined gun powder, 2 titanium nail, 2 professional rope",
  "Oil Barrel = 1 adam plank, 25 expert oil can, 2 titanium nail, 1 professional rope",
  "Speed Burst = 2 adam plank, 1 titanium nail, 2 professional cloth, 2 professional cloth, 30 big cola",
  "Armor UP = 10 adam plank, 2 titanium ingot, 2 titanium nail",
  "Poison Bomb = 25 poison mushroom, 2 titanium ingot, 2 titanium nail, 15 expert gun barrel",
  "Flamethrower = 25 flammable liquid, 2 adam plank, 2 titanium ingot, 2 titanium nail, 5 expert gun barrel, 8 refined gun powder",
  "Bombardier = 4 titanium ingot, 3 titanium nail, 6 expert gun barrel, 20 refined gun powder",
  "Bubble = 4 adam plank, 25 air tank, 2 professional cloth, 2 professional rope",
  "Sonar = 18 alkaline battery, 4 adam plank, 3 titanium nail, 3 professional cloth",
  "Smoke bomb = 4 titanium ingot, 3 titanium nail, 4 refined gun powder, 12 expert gun barrel",
  "Call reinforcement = 1 blueprint, 4 adam plank, 8 adam log, 2 professional rope, 2 professional cloth, 6 big cola, 5 refined gun powder, 2 expert gun barrel, 2 steel cannon ball",
  "Dive = 7 adam plank, 25 air tank, 2 professional rope",
  "Coup do Burst = 25 air tank, 2 adam plank, 1 titanium nail, 1 professional cloth, 1 professional rope, 30 big cola",
  "Mortar = 2 adam plank, 3 titanium ingot, 1 professional rope, 15 refined gun powder, 8 steel cannon ball",
  "Reflect = 3 adam plank, 30 air tank, 2 professional cloth, 2 professional rope"
];

const BOAT_SHIPS_LINES = [
  "blanco = 5 white ink",
  "ashes = 2 white ink, 2 black ink",
  "quartz = 5 purple ink",
  "topaz = 5 yellow ink",
  "ruby = 5 red ink",
  "sapphite = 5 blue ink",
  "emerald = 5 green ink",
  "pure = 15 white ink, 3 black ink",
  "classic = 14 black ink, 2 white ink",
  "exotic = 16 yellow ink, 15 purple ink, 9 white ink",
  "venomous = 17 purple ink, 12 blue ink",
  "cursed = 45 black ink, 20 white ink",
  "turquoise = 26 blue ink, 18 green ink",
  "vermillion = 24 red ink, 17 yellow ink",
  "carmesin = 16 red ink, 10 white ink, 10 black ink",
  "burly wood = 20 black ink, 20 yellow ink, 15 red ink",
  "chartreuse = 25 green ink, 10 black ink",
  "pinky = 30 purple ink, 20 white ink",
  "holy = 20 yellow ink, 15 black ink, 5 white ink"
];

const BOAT_RECIPES_RAW = [
  "Refinery",
  "",
  ...BOAT_REFINERY_LINES,
  "",
  "Arsenal",
  "",
  ...BOAT_ARSENAL_LINES,
  "",
  "ships",
  "",
  ...BOAT_SHIPS_LINES
].join("\n");

const BOAT_ARSENAL_ICON_ORDER = [
  "ship_upgrade_kit",
  "cannon",
  "sail",
  "hull",
  "fire_cannon",
  "acid_cannon",
  "shotgun",
  "chain_shot",
  "ram",
  "machine_gun",
  "speed_up",
  "heavy_cannon",
  "explosive_barrel",
  "oil_barrel",
  "speed_burst",
  "armor_up",
  "poison_bomb",
  "flamethrower",
  "bombardier",
  "bubble",
  "sonar",
  "smoke_bomb",
  "call_reinforcement",
  "dive",
  "coup_do_burst",
  "mortar",
  "reflect"
];

const BOAT_SKIN_ICON_ORDER = [
  "blanco",
  "ashes",
  "quartz",
  "topaz",
  "ruby",
  "sapphire",
  "emerald",
  "pure",
  "classic",
  "exotic",
  "venomous",
  "cursed",
  "turquoise",
  "vermillion",
  "carmesin",
  "burly_wood",
  "chartreuse",
  "pinky",
  "holy"
];
