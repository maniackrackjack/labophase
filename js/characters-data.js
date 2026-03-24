// ============================================================
// Characters data - parsed from CSV + sprite aliases
// ============================================================

const CHARACTER_SPRITE_IDS = [
  "akainu",
  "alvida",
  "aokiji",
  "arlong",
  "baby_5",
  "bartholomew_kuma",
  "bartolomeo",
  "basil_hawkins",
  "bastille",
  "bellamy",
  "bepo",
  "blueno",
  "boa_hancock",
  "borsalino_kizaru",
  "brook",
  "brook_ts",
  "bucchi_sham",
  "buggy",
  "cabaji",
  "capone_bege",
  "carrot",
  "chew",
  "chopper",
  "chopper_ts",
  "crocodile",
  "daddy_masterson",
  "dalmatian",
  "doflamingo",
  "don_krieg",
  "dracule_mihawk",
  "emporio_ivankov",
  "enel",
  "eric",
  "eustass_kid",
  "franky",
  "franky_ts",
  "gecko_moria",
  "gedatsu",
  "gin",
  "hatchan",
  "hina",
  "jabra",
  "jango",
  "jesus_burgess",
  "jewelry_bonney",
  "jinbe",
  "kaku",
  "kalifa",
  "killer",
  "koala",
  "kuro",
  "kuroobi",
  "leo_mansherry",
  "marco",
  "margareth",
  "marshall_teach",
  "miss_doublefinger",
  "miss_goldenweek",
  "mohji",
  "monkey_garp",
  "monkey_luffy",
  "monkey_luffy_ts",
  "morgan",
  "mr_1",
  "mr_2",
  "mr_3",
  "mr_4",
  "mr_5",
  "nami",
  "nami_ts",
  "nico_robin",
  "nico_robin_ts",
  "ohm",
  "pearl",
  "perona",
  "portgas_ace",
  "rebecca",
  "rob_lucci",
  "roronoa_zoro",
  "roronoa_zoro_ts",
  "ryuma",
  "sabo",
  "satori",
  "scratchmen_apoo",
  "shanks",
  "shura",
  "silvers_rayleigh",
  "smoker",
  "tashigi",
  "trafalgar_law",
  "urouge",
  "usopp",
  "usopp_ts",
  "uta",
  "van_augur",
  "vinsmoke_ichiji",
  "vinsmoke_niji",
  "vinsmoke_reiju",
  "vinsmoke_sanji",
  "vinsmoke_sanji_ts",
  "vinsmoke_yonji",
  "vivi",
  "wapol",
  "x_drake"
];

const CHARACTERS_CSV = `Character,TierStart,TierMax
Ace (Portgas D. Ace / Fire Fist Ace),Diamond,Diamond
Akainu (Sakazuki / Red Dog),Diamond,Diamond
Alvida (Iron Mace Alvida),Bronze,Silver
Aokiji (Kuzan / Blue Pheasant),Diamond,Diamond
Jinbe (Jimbei / Knight of the Sea),Diamond,Diamond
Arlong (Arlong the Saw),Silver,Gold
Baby 5,Gold,Diamond
Bartomolomeo (Barto),Gold,Diamond
Bastille,Gold,Diamond
Bellamy (Bellamy the Hyena),Gold,Diamond
Bepo,Silver,Gold
Blueno,Gold,Diamond
Kuma (Bartholomew Kuma / Tyrant),Diamond,Diamond
Brook (Soul King),Gold,Gold
Brook TS (Soul King / Timeskip),Diamond,Diamond
Buchi & Sham (Nyaban Brothers),Bronze,Silver
Buggy (Buggy the Clown),Silver,Diamond
Burgess (Jesus Burgess / Champion),Gold,Diamond
Cabaji (Cabaji the Acrobat),Bronze,Silver
Teach (Marshall / Black Beard / Barba Negra / Kurohige),Diamond,Diamond
Carrot,Gold,Diamond
Chew, Bronze,Silver
Chopper (Tony Tony Chopper / Cotton Candy Lover),Gold,Gold
Chopper TS (Monster Point Chopper / Timeskip),Diamond,Diamond
Crocodile (Sir Crocodile / Mr. 0),Gold,Diamond
Daddy (Daddy Masterson),Silver,Gold
Dalmatian,Gold,Diamond
DoFlamingo (Doflamingo / Joker),Diamond,Diamond
Don Krieg (Admiral Krieg),Silver,Gold
Apoo (Scratchmen Apoo / Roar of the Sea),Gold,Diamond
Enel (Eneru / God Enel),Diamond,Diamond
Eric (Eric the Whirlwind),Bronze,Silver
Franky (Cyborg Franky),Gold,Gold
Franky TS (General Franky / Timeskip),Diamond,Diamond
Garp (Monkey D. Garp / Hero of the Marines),Diamond,Diamond
Gedatsu,Silver,Gold
Gin (Gin the Demon Man),Bronze,Silver
Hancock (Boa Hancock / Pirate Empress),Diamond,Diamond
Hatchan (Hachi),Bronze,Silver
Bonney (Jewelry Bonney / Big Eater),Gold,Diamond
Hina (Black Cage Hina),Gold,Diamond
Ichiji (Vinsmoke Ichiji / Sparking Red),Gold,Diamond
Ivankov (Emporio Ivankov / Iva),Diamond,Diamond
Jabra,Gold,Diamond
Jango (Jango the Hypnotist),Bronze,Silver
Capone Bege (Gang Bege),Gold,Diamond
Kaku,Gold,Diamond
Kalifa,Gold,Diamond
Drake (X Drake / Red Flag),Gold,Diamond
Hawkins (Basil Hawkins / Magician),Gold,Diamond
Kizaru (Borsalino / Yellow Monkey),Diamond,Diamond
Koala,Gold,Diamond
Kid (Eustass Kid / Captain Kid),Gold,Diamond
Kuro (Captain Kuro),Silver,Gold
Kuroobi, Bronze,Silver
Killer (Massacre Soldier),Gold,Diamond
Leo (Leo the Tontatta),Gold,Diamond
Lucci (Rob Lucci),Gold,Diamond
Luffy (Monkey D. Luffy / Straw Hat),Gold,Gold
Luffy TS (Straw Hat / Timeskip),Diamond,Diamond
Magellan (Chief Warden Magellan),Diamond,Diamond
Marco (Marco the Phoenix),Diamond,Diamond
Marguerite,Gold,Diamond
Mihawk (Dracule Mihawk / Hawk Eyes),Diamond,Diamond
Miss DoubleFinger (Zala / Paula),Silver,Gold
Miss Goldenweek (Marianne),Bronze,Silver
Mohji (Mohji the Beast Tamer),Bronze,Silver
Morgan (Axe-Hand Morgan),Bronze,Silver
Moria (Gecko Moria),Gold,Diamond
Mr. 1 (Daz Bonez),Silver,Gold
Mr. 2 (Bon Kurei / Bentham / Bon Clay),Silver,Gold
Mr. 3 (Galdino),Silver,Gold
Mr. 4 (Babe & Drophy),Bronze,Silver
Mr. 5 (Gem & Mikita),Bronze,Silver
Nami (Cat Burglar Nami),Gold,Gold
Nami TS (Cat Burglar / Timeskip),Diamond,Diamond
Niji (Vinsmoke Niji / Sparking Blue),Gold,Diamond
Ohm,Silver,Gold
Pearl (Pearl the Iron Wall),Bronze,Silver
Perona (Ghost Princess),Gold,Diamond
Law (Trafalgar Law / Surgeon of Death),Gold,Diamond
Rebecca,Gold,Diamond
Reiju (Vinsmoke Reiju / Poison Pink),Gold,Diamond
Robin (Nico Robin / Devil Child),Gold,Gold
Robin TS (Devil Child / Timeskip),Diamond,Diamond
Ryuma (Shimotsuki Ryuma),Gold,Diamond
Sabo (Flame Emperor),Diamond,Diamond
Sanji (Black Leg Sanji),Gold,Gold
Sanji TS (Black Leg / Timeskip),Diamond,Diamond
Satori,Silver,Gold
Shanks (Red-Haired Shanks),Diamond,Diamond
Shura,Silver,Gold
Smoker (White Hunter Smoker),Gold,Diamond
Tashigi,Silver,Diamond
Rayleigh (Silvers Rayleigh / Dark King),Diamond,Diamond
Urouge (Mad Monk Urouge),Gold,Diamond
Usopp (God Usopp / Sogeking),Gold,Gold
Usopp TS (God Usopp / Timeskip),Diamond,Diamond
Uta (Diva Uta),Diamond,Diamond
Van Augur (Supersonic Van Augur),Gold,Diamond
Vivi (Nefertari Vivi),Silver,Diamond
Wapol (King Wapol),Silver,Gold
Yonji (Vinsmoke Yonji / Winch Green),Gold,Diamond
Zoro (Roronoa Zoro / Pirate Hunter),Gold,Gold
Zoro TS (Pirate Hunter / Timeskip),Diamond,Diamond`;

const CHARACTER_NAME_TO_SPRITE_ID = {
  ace: "portgas_ace",
  bartomolomeo: "bartolomeo",
  kuma: "bartholomew_kuma",
  buchi_sham: "bucchi_sham",
  burgess: "jesus_burgess",
  teach: "marshall_teach",
  daddy: "daddy_masterson",
  apoo: "scratchmen_apoo",
  garp: "monkey_garp",
  hancock: "boa_hancock",
  bonney: "jewelry_bonney",
  ichiji: "vinsmoke_ichiji",
  ivankov: "emporio_ivankov",
  drake: "x_drake",
  hawkins: "basil_hawkins",
  kizaru: "borsalino_kizaru",
  kid: "eustass_kid",
  leo: "leo_mansherry",
  lucci: "rob_lucci",
  luffy: "monkey_luffy",
  luffy_ts: "monkey_luffy_ts",
  marguerite: "margareth",
  mihawk: "dracule_mihawk",
  moria: "gecko_moria",
  niji: "vinsmoke_niji",
  law: "trafalgar_law",
  reiju: "vinsmoke_reiju",
  robin: "nico_robin",
  robin_ts: "nico_robin_ts",
  sanji: "vinsmoke_sanji",
  sanji_ts: "vinsmoke_sanji_ts",
  rayleigh: "silvers_rayleigh",
  yonji: "vinsmoke_yonji",
  zoro: "roronoa_zoro",
  zoro_ts: "roronoa_zoro_ts"
};

const CHARACTER_OVERRIDES = {
  // ─── A ───────────────────────────────────────────────────────────────
  akainu: { aliases: ["cao vermelho", "red dog", "sakazuki", "perro rojo", "czerwony pies"] },
  aokiji: { aliases: ["faisao azul", "blue pheasant", "kuzan", "faisan azul", "niebieski bazant"] },
  arlong: { aliases: ["a serra", "arlong a serra", "the saw", "la sierra", "pilarz"] },

  // ─── B ───────────────────────────────────────────────────────────────
  bartolomeo: { name: "Bartolomeo", aliases: ["barto"] },
  bartholomew_kuma: { name: "Kuma", aliases: ["tirano", "tyrant", "tirano es", "tyran"] },
  basil_hawkins: { aliases: ["mago", "magician", "el mago", "mag magik"] },
  bellamy: { aliases: ["a hiena", "bellamy a hiena", "the hyena", "la hiena", "hiena"] },
  boa_hancock: { name: "Hancock", aliases: ["imperatriz dos piratas", "pirate empress", "emperatriz pirata", "cesarzowa piratow"] },
  borsalino_kizaru: { name: "Kizaru", aliases: ["macaco amarelo", "yellow monkey", "mono amarillo", "zolta malpa"] },
  brook: { aliases: ["rei das almas", "soul king", "rey de las almas", "krol dusz"] },
  brook_ts: { aliases: ["rei das almas", "soul king", "brook timeskip", "rey de las almas", "krol dusz"] },
  bucchi_sham: { name: "Buchi & Sham", aliases: ["buchi", "sham", "buchi sham", "buchi e sham"] },
  buggy: { aliases: ["o palhaco", "buggy o palhaco", "the clown", "el payaso", "klaun"] },

  // ─── C ───────────────────────────────────────────────────────────────
  chopper: { aliases: ["amante do algodao doce", "cotton candy lover", "amante del algodon de azucar", "milosnik waty cukrowej"] },
  chopper_ts: { aliases: ["chopper timeskip", "ponto monstro", "monster point", "punto monstruo", "punkt potwora"] },

  // ─── D ───────────────────────────────────────────────────────────────
  don_krieg: { aliases: ["almirante krieg", "admiral krieg", "almirante es"] },
  dracule_mihawk: { name: "Mihawk", aliases: ["olhos de falcao", "hawk eyes", "ojos de halcon", "sokolie oczy"] },

  // ─── E ───────────────────────────────────────────────────────────────
  emporio_ivankov: { name: "Ivankov", aliases: ["iva"] },
  enel: { aliases: ["deus enel", "god enel", "eneru", "dios enel", "bog enel"] },
  eric: { aliases: ["o redemoinho", "the whirlwind", "el torbellino", "wicher"] },
  eustass_kid: { name: "Kid", aliases: ["capitao kid", "captain kid", "capitan kid"] },

  // ─── G ───────────────────────────────────────────────────────────────
  gecko_moria: { name: "Moria" },
  gin: { aliases: ["o homem demonio", "the demon man", "el hombre demonio", "mezczyzna demon"] },

  // ─── H ───────────────────────────────────────────────────────────────
  hina: { aliases: ["gaiola negra", "black cage", "jaula negra", "czarna klatka"] },

  // ─── J ───────────────────────────────────────────────────────────────
  jango: { aliases: ["o hipnotizador", "the hypnotist", "el hipnotizador", "hipnotyzer"] },
  jesus_burgess: { name: "Burgess", aliases: ["campeao", "champion", "campeon", "mistrz"] },
  jewelry_bonney: { name: "Bonney", aliases: ["grande comilona", "big eater", "gran comedora", "wielka zjadaczka"] },
  jinbe: { aliases: ["cavaleiro do mar", "knight of the sea", "jimbei", "caballero del mar", "rycerz morza"] },

  // ─── K ───────────────────────────────────────────────────────────────
  killer: { aliases: ["soldado do massacre", "massacre soldier", "soldado de la masacre", "zolnierz masakry"] },
  kuro: { aliases: ["capitao kuro", "captain kuro", "capitan kuro"] },

  // ─── L ───────────────────────────────────────────────────────────────
  leo_mansherry: { name: "Leo" },

  // ─── Ma ──────────────────────────────────────────────────────────────
  marco: { aliases: ["a fenix", "marco a fenix", "the phoenix", "el fenix", "feniks"] },
  margareth: { name: "Marguerite" },
  marshall_teach: { name: "Teach", aliases: ["marshal teach", "marshall teach", "black beard", "blackbeard", "barba negra", "kurohige", "marshall", "barbanegra", "czarna broda"] },
  mohji: { aliases: ["o domador de feras", "the beast tamer", "el domador de bestias", "poskramiacz bestii"] },
  monkey_garp: { name: "Garp", aliases: ["heroi dos marujos", "hero of the marines", "heroe de los marines", "bohater marines"] },
  monkey_luffy: { name: "Luffy", aliases: ["chapeu de palha", "straw hat", "sombrero de paja", "slomiany kapelusz"] },
  monkey_luffy_ts: { name: "Luffy TS", aliases: ["luffy timeskip", "chapeu de palha", "straw hat", "sombrero de paja", "slomiany kapelusz"] },
  morgan: { aliases: ["mao de machado", "axe hand morgan", "mano de hacha", "rekamorgan"] },

  // ─── N ───────────────────────────────────────────────────────────────
  nami: { aliases: ["ladra de gatos", "cat burglar", "ladrona de gatos", "kotoburglar", "zlodziejka kotow"] },
  nami_ts: { aliases: ["nami timeskip", "ladra de gatos", "cat burglar", "ladrona de gatos", "zlodziejka kotow"] },
  nico_robin: { name: "Robin", aliases: ["filha do diabo", "devil child", "hija del diablo", "dziecko diabla"] },
  nico_robin_ts: { name: "Robin TS", aliases: ["robin timeskip", "filha do diabo", "devil child", "hija del diablo", "dziecko diabla"] },

  // ─── P ───────────────────────────────────────────────────────────────
  pearl: { aliases: ["a parede de ferro", "the iron wall", "la pared de hierro", "zelazna sciana"] },
  perona: { aliases: ["princesa fantasma", "ghost princess", "princesa fantasma es", "upiorni ksiezniczka"] },
  portgas_ace: { name: "Ace", aliases: ["punho de fogo", "fire fist", "punio de fuego", "ognista piesc"] },

  // ─── R ───────────────────────────────────────────────────────────────
  rob_lucci: { name: "Lucci" },
  roronoa_zoro: { name: "Zoro", aliases: ["cacador de piratas", "pirate hunter", "cazador de piratas", "lowca piratow"] },
  roronoa_zoro_ts: { name: "Zoro TS", aliases: ["zoro timeskip", "cacador de piratas", "pirate hunter", "cazador de piratas", "lowca piratow"] },

  // ─── S ───────────────────────────────────────────────────────────────
  sabo: { aliases: ["imperador das chamas", "flame emperor", "emperador de las llamas", "cesarz plomieni"] },
  scratchmen_apoo: { name: "Apoo", aliases: ["rugido do mar", "roar of the sea", "rugido del mar", "ryk morza"] },
  shanks: { aliases: ["ruivo", "red-haired shanks", "red haired shanks", "shanks el pelirrojo", "rude shanks"] },
  silvers_rayleigh: { name: "Rayleigh", aliases: ["rei das trevas", "dark king", "rey de las sombras", "mroczny krol"] },
  smoker: { aliases: ["cacador branco", "white hunter", "cazador blanco", "bialy lowca"] },

  // ─── T ───────────────────────────────────────────────────────────────
  trafalgar_law: { name: "Law", aliases: ["cirurgiao da morte", "surgeon of death", "cirujano de la muerte", "chirurg smierci"] },

  // ─── U ───────────────────────────────────────────────────────────────
  urouge: { aliases: ["monge louco", "mad monk", "monje loco", "szalony mnich"] },
  usopp: { aliases: ["deus usopp", "god usopp", "rei dos atiradores", "dios usopp", "bog usopp"] },
  usopp_ts: { aliases: ["usopp timeskip", "deus usopp", "god usopp", "dios usopp", "bog usopp"] },
  uta: { aliases: ["diva uta"] },

  // ─── V ───────────────────────────────────────────────────────────────
  van_augur: { aliases: ["supersonico", "supersonic", "supersonico es", "naddzwiekowy"] },
  vinsmoke_ichiji: { name: "Ichiji", aliases: ["sparking red", "vermelho eletrico", "rojo electrico", "iskrzacy czerwony"] },
  vinsmoke_niji: { name: "Niji", aliases: ["sparking blue", "azul eletrico", "azul electrico", "iskrzacy niebieski"] },
  vinsmoke_reiju: { name: "Reiju", aliases: ["poison pink", "rosa venenosa", "rosa venenosa es", "trujacy roz"] },
  vinsmoke_sanji: { name: "Sanji", aliases: ["perna negra", "black leg", "pierna negra", "czarna noga"] },
  vinsmoke_sanji_ts: { name: "Sanji TS", aliases: ["sanji timeskip", "perna negra", "black leg", "pierna negra", "czarna noga"] },
  vinsmoke_yonji: { name: "Yonji", aliases: ["winch green", "verde do guincho", "verde del guinche", "zielony wyciag"] },
  vivi: { aliases: ["princesa vivi", "nefertari", "princesa vivi es"] },

  // ─── W ───────────────────────────────────────────────────────────────
  wapol: { aliases: ["rei wapol", "king wapol", "rey wapol", "krol wapol"] },

  // ─── X ───────────────────────────────────────────────────────────────
  x_drake: { name: "Drake", aliases: ["x drake", "bandeira vermelha", "red flag", "bandera roja", "czerwona flaga"] }
};

const CHARACTER_TIER_ORDER = ["bronze", "silver", "gold", "diamond"];

function normalizeCharacterKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function parseCharactersCsv(csvText) {
  return String(csvText || "")
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [character, tierStart, tierMax] = line.split(",");
      return {
        character: (character || "").trim(),
        tierStart: normalizeCharacterTier(tierStart),
        tierMax: normalizeCharacterTier(tierMax)
      };
    });
}

function normalizeCharacterTier(value) {
  const key = normalizeCharacterKey(value);
  if (key === "silver") return "silver";
  if (key === "gold") return "gold";
  if (key === "diamond") return "diamond";
  return "bronze";
}

function extractCharacterBaseName(name) {
  return String(name || "")
    .replace(/\s*\([^)]*\)\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCharacterAliases(fullName, baseName) {
  const aliasSet = new Set();
  const normalizedBase = String(baseName || "").trim();
  if (normalizedBase) aliasSet.add(normalizedBase);

  const parentheticalMatches = String(fullName || "").match(/\(([^)]*)\)/g) || [];
  parentheticalMatches.forEach((chunk) => {
    chunk
      .replace(/[()]/g, "")
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => aliasSet.add(part));
  });

  if (/\bTS\b/i.test(fullName)) {
    aliasSet.add(String(fullName).replace(/\bTS\b/i, "Timeskip").replace(/\s+/g, " ").trim());
    aliasSet.add(normalizedBase.replace(/\bTS\b/i, "").replace(/\s+/g, " ").trim());
  }

  return Array.from(aliasSet).filter(Boolean);
}

function mapCharacterNameToSpriteId(name) {
  const normalized = normalizeCharacterKey(extractCharacterBaseName(name));
  if (CHARACTER_NAME_TO_SPRITE_ID[normalized]) return CHARACTER_NAME_TO_SPRITE_ID[normalized];
  return CHARACTER_SPRITE_IDS.includes(normalized) ? normalized : "";
}

function buildCharactersData() {
  const rows = parseCharactersCsv(CHARACTERS_CSV);
  const rowBySpriteId = new Map();

  rows.forEach((row) => {
    const spriteId = mapCharacterNameToSpriteId(row.character);
    if (!spriteId) return;
    rowBySpriteId.set(spriteId, row);
  });

  return CHARACTER_SPRITE_IDS.map((spriteId) => {
    const row = rowBySpriteId.get(spriteId) || null;
    const override = CHARACTER_OVERRIDES[spriteId] || {};
    const baseName = override.name || (row ? extractCharacterBaseName(row.character) : prettifyCharacterSpriteId(spriteId));
    const aliases = new Set([
      ...extractCharacterAliases(row ? row.character : baseName, baseName),
      ...(override.aliases || []),
      spriteId.replace(/_/g, " ")
    ]);

    return {
      id: spriteId,
      name: baseName,
      sprite: `sprites/characters/${spriteId}.png`,
      role: override.role || "",
      tierStart: row?.tierStart || override.tierStart || "bronze",
      tierMax: row?.tierMax || override.tierMax || "diamond",
      aliases: Array.from(aliases).filter(Boolean)
    };
  });
}

function prettifyCharacterSpriteId(spriteId) {
  return String(spriteId || "")
    .split("_")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ""))
    .join(" ")
    .replace(/\bTs\b/g, "TS");
}

const CHARACTERS_DATA = buildCharactersData();
