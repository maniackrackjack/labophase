const itens = {
  chapeu: {
    nome: "Chapéu",
    icon: "sprites/icons/head/pirate_explorer_hat.gif",
    min: { vit: 44, def: 390 },
    max: { vit: 59, def: 499 },
    gain: { vit: 1, def: 15 },
  },
  camisa: {
    nome: "Camisa",
    icon: "sprites/icons/body/pirate_explorer_shirt.gif",
    min: { vit: 56, def: 1900 },
    max: { vit: 73, def: 2460 },
    gain: { vit: 1, def: 40 },
  },
  calca: {
    nome: "Calça",
    icon: "sprites/icons/legs/pirate_explorer_pants.gif",
    min: { vit: 10, def: 1560 },
    max: { vit: 14, def: 1996 },
    gain: { vit: 1, def: 30 },
  },
  sabre: {
    nome: "Sabre",
    icon: "sprites/icons/weapon/pirate_explorer_saber.gif",
    min: { atk: 7380 },
    max: { atk: 8600 },
    gain: { atk: 80 },
  },
  colar: {
    nome: "Colar",
    icon: "sprites/icons/accessory/pirate_explorer_necklace.gif",
    min: { atk: 4690 },
    max: { atk: 5400 },
    gain: { atk: 30 },
  },
  emblema: {
    nome: "Emblema",
    icon: "sprites/icons/emblem/pirate_explorer_emblem.gif",
    min: { pen: 2390 },
    max: { pen: 2755 },
    gain: { pen: 35 },
  },
  anel: {
    nome: "Anel",
    icon: "sprites/icons/accessory/pirate_explorer_ring.gif",
    min: { atk: 1500, crit: 125 },
    max: { atk: 1650, crit: 135 },
    gain: { atk: 30, crit: 1 },
  },
};

const recomendados = {
  chapeu: "58/484",
  camisa: "72/2420",
  calca: "13/1966",
  sabre: "8520",
  colar: "5370",
  emblema: "2720",
  anel: "1620/134",
};

const combosValidos = {
  chapeu: [
    "52/394",
    "53/409",
    "54/424",
    "55/439",
    "56/454",
    "57/469",
    "58/484",
  ],
  camisa: [
    "59/1900",
    "60/1940",
    "61/1980",
    "62/2020",
    "63/2060",
    "64/2100",
    "65/2140",
    "66/2180",
    "67/2220",
    "68/2260",
    "69/2300",
    "70/2340",
    "71/2380",
    "72/2420",
  ],
  calca: [
    "10/1876",
    "11/1906",
    "12/1936",
    "13/1966"
  ],
  anel: [
    "1500/130",
    "1530/131",
    "1560/132",
    "1590/133",
    "1620/134"
  ],
};
