// ============================================================
// World Bosses tab — Shai-Hulud
// ============================================================

// ─── data ────────────────────────────────────────────────────

const WB_SHAI_HULUD_SKILLS_ALL = [
  "Ataque Básico",
  "Tentáculos",
  "Cuspe Ácido",
  "Submersão",
  "Tornado",
  "Rugido de Corta-cura",
  "Waves de Sandworms",
];

const WB_SHAI_HULUD_SKILL_GIFS = {
  "Ataque Básico":       "sprites/world_bosses/shai_hulud/basic_attack_shai.gif",
  "Tentáculos":          "sprites/world_bosses/shai_hulud/tentacle_shai.gif",
  "Cuspe Ácido":         "sprites/world_bosses/shai_hulud/spit_shai.gif",
  "Submersão":           "sprites/world_bosses/shai_hulud/mechanic_shai.gif",
  "Tornado":             "sprites/world_bosses/shai_hulud/tornado_shai.gif",
  "Rugido de Corta-cura":"sprites/world_bosses/shai_hulud/heal_reduction_shai.gif",
  "Waves de Sandworms":  "sprites/world_bosses/shai_hulud/wave_shai.gif",
};

const WB_SHAI_HULUD_SKILL_DESCRIPTIONS = {
  "Ataque Básico": "Shai-Hulud avança diferindo poderosa mordida em seu alvo. É importante sempre alguém levar um ataque básico de tempos em tempos do Boss, pois caso ele fique sem bater em ninguém, ele ganhará um SUPER BÔNUS de armadura, tornando praticamente impossível causar danos.",
  "Tentáculos": "Shai-Hulud invoca tentáculos aleatoriamente perto de todos os jogadores vivos. Eles sozinhos não causam muitos danos, mas cuidado para não deixar acumular, pois pode ser perigoso.",
  "Cuspe Ácido": "Shai-Hulud cospe um ácido em um alvo aleatório dentre os jogadores vivos. É muito similar ao cuspe flamejante do Weekly Boss Sanshoo, localizado em Alabasta East. Tome cuidado, pois cada passo em cima desse ácido te causará muito dano.",
  "Submersão": "Shai-Hulud entra na terra e fica atento aos passos de seus alvos. Apenas UM membro do grupo irá escutar um barulho grotesco, esse poderá sair andando e caso não saia, será engolido pela minhoca. Esse ataque causa IK (morte instantânea) então tome MUITO cuidado para NÃO andar se você não for o escolhido, pois se ANDAR, já era! É de extrema importância que todos os membros do grupo se AFASTEM quando chegar nessa parte.",
  "Tornado": "Shai-Hulud lança um tornado que persegue seu alvo, causando dano e repelindo quem atingir. É interessante quem estiver sendo agrado pelo Tornado fugir pelos cantos do mapa e o grupo evitar atrapalhar o mesmo.",
  "Waves de Sandworms": "Shai-Hulud invoca Sandworms para ajudar em seu embate. Tome muito cuidado para não ser pego pelo empurrão dos Sandworms e ser jogado em cima do Cuspe Ácido, essa combinação pode ser fatal.",
  "Rugido de Corta-cura": "Shai-Hulud ruge em fúria perante suas presas, impedindo qualquer tipo de cura durante os próximos 25 segundos. Fique atento a essa habilidade, pois o boss também a utiliza quando troca seu padrão de ataque.",
};

const WB_SHAI_HULUD_PHASES = [
  { phase: "Fase 1",  damage: "Fase inicial",  skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }] },
  { phase: "Fase 2",  damage: "1.2KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Cuspe Ácido" }] },
  { phase: "Fase 3",  damage: "2.3KK",         skills: [{ name: "Ataque Básico" }, { name: "Submersão", note: "SILÊNCIO TOTAL" }] },
  { phase: "Fase 4",  damage: "3.5KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Cuspe Ácido" }, { name: "Tornado" }, { name: "Rugido de Corta-cura" }] },
  { phase: "Fase 5",  damage: "4.6KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Submersão", note: "SILÊNCIO TOTAL" }] },
  { phase: "Fase 6",  damage: "5.8KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Cuspe Ácido" }, { name: "Waves de Sandworms" }] },
  { phase: "Fase 7",  damage: "7KK",           skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Submersão", note: "SILÊNCIO TOTAL" }] },
  { phase: "Fase 8",  damage: "8.2KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Tornado", count: 2 }, { name: "Cuspe Ácido", count: 2 }, { name: "Rugido de Corta-cura" }] },
  { phase: "Fase 9",  damage: "9.3KK",         skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Submersão", note: "SILÊNCIO TOTAL" }] },
  { phase: "Fase 10", damage: "10.5KK",        skills: [{ name: "Ataque Básico" }, { name: "Tentáculos" }, { name: "Tornado" }, { name: "Cuspe Ácido" }, { name: "Waves de Sandworms" }, { name: "Rugido de Corta-cura" }] },
  { phase: "Fase 11", damage: "11.8KK",        skills: [{ name: "Ataque Básico" }, { name: "Submersão", note: "SILÊNCIO TOTAL" }, { name: "Tentáculos" }] },
];

const WB_SHAI_HULUD_CHARACTERS = {
  tank: [
    { id: "rebecca",       label: "Rebecca" },
    { id: "crocodile",     label: "Crocodile" },
    { id: "bastille",      label: "Bastille" },
    { id: "smoker",        label: "Smoker" },
  ],
  dps: [
    { id: "enel",                label: "Enel" },
    { id: "marshall_teach",      label: "Teach" },
    { id: "vinsmoke_niji",       label: "Niji" },
    { id: "carrot",              label: "Carrot" },
    { id: "ryuma",               label: "Ryuma" },
    { id: "silvers_rayleigh",    label: "Rayleigh" },
    { id: "basil_hawkins",       label: "Basil" },
    { id: "margareth",           label: "Margareth" },
    { id: "nico_robin_ts",       label: "Robin TS" },
    { id: "van_augur",           label: "Van Augur" },
    { id: "trafalgar_law",       label: "Law" },
  ],
  suporte: [
    { id: "emporio_ivankov",  label: "Ivankov" },
    { id: "scratchmen_apoo",  label: "Apoo" },
    { id: "gecko_moria",      label: "Moria" },
    { id: "vinsmoke_reiju",   label: "Reiju" },
  ],
};

const WB_SHAI_HULUD_REWARDS = [
  {
    tier: "Top 1", damage: null, top1: true,
    items: [
      { label: "Ícone Exclusivo",         count: 1,         icon: "sprites/world_bosses/shai_hulud/shai_icon.png" },
      { label: "Kid Necklace",            count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
      { label: "Kid Coat",                count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
      { label: "Kid Pants",               count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
      { label: "Kid Emblem",              count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
      { label: "Kid Glasses",             count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
      { label: "Pedras do Despertar",     count: 8,         icon: "sprites/icons/divine_crystal.gif" },
      { label: "Med. Din. Diamante",      count: 2,         icon: "sprites/dynamic_diamond_medal.gif" },
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "100.000", icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 18,        icon: "sprites/valor_medal.png" },
      { label: "Artefatos do Shai-Hulud", count: 10,        icon: "sprites/world_bosses/shai_hulud/shai_icon.png" },
    ],
  },
  {
    tier: "Tier 1", damage: "16.000.000",
    items: [
      { label: "Kid Necklace",            count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
      { label: "Kid Coat",                count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
      { label: "Kid Pants",               count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
      { label: "Kid Emblem",              count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
      { label: "Kid Glasses",             count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
      { label: "Pedras do Despertar",     count: 8,         icon: "sprites/icons/divine_crystal.gif" },
      { label: "Med. Din. Diamante",      count: 2,         icon: "sprites/dynamic_diamond_medal.gif" },
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "30.000",  icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 18,        icon: "sprites/valor_medal.png" },
      { label: "Artefatos do Shai-Hulud", count: 10,        icon: "sprites/world_bosses/shai_hulud/shai_icon.png" },
    ],
  },
  {
    tier: "Tier 2", damage: "15.500.000",
    items: [
      { label: "Kid Necklace",            count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
      { label: "Kid Coat",                count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
      { label: "Kid Pants",               count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
      { label: "Kid Emblem",              count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
      { label: "Kid Glasses",             count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
      { label: "Pedras do Despertar",     count: 4,         icon: "sprites/icons/divine_crystal.gif" },
      { label: "Med. Din. Diamante",      count: 1,         icon: "sprites/dynamic_diamond_medal.gif" },
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "25.000",  icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 15,        icon: "sprites/valor_medal.png" },
      { label: "Artefatos do Shai-Hulud", count: 5,         icon: "sprites/world_bosses/shai_hulud/shai_icon.png" },
    ],
  },
  {
    tier: "Tier 3", damage: "11.000.000",
    items: [
      { label: "Kid Necklace",            count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
      { label: "Kid Coat",                count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
      { label: "Kid Pants",               count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
      { label: "Kid Emblem",              count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
      { label: "Kid Glasses",             count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
      { label: "Pedras do Despertar",     count: 2,         icon: "sprites/icons/divine_crystal.gif" },
      { label: "Med. Din. Diamante",      count: 1,         icon: "sprites/dynamic_diamond_medal.gif" },
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "20.000",  icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 10,        icon: "sprites/valor_medal.png" },
      { label: "Artefatos do Shai-Hulud", count: 1,         icon: "sprites/world_bosses/shai_hulud/shai_icon.png" },
    ],
  },
  {
    tier: "Tier 4", damage: "7.500.000",
    items: [
      { label: "Kid Necklace",            count: 1,         icon: "sprites/icons/accessory/kid_necklace.gif" },
      { label: "Kid Coat",                count: 1,         icon: "sprites/icons/body/kid_jacket.gif" },
      { label: "Kid Pants",               count: 1,         icon: "sprites/icons/legs/kid_pants.gif" },
      { label: "Kid Emblem",              count: 1,         icon: "sprites/icons/emblem/kid_emblem.gif" },
      { label: "Kid Glasses",             count: 1,         icon: "sprites/icons/head/kid_glasses.gif" },
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "15.000",  icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 5,         icon: "sprites/valor_medal.png" },
    ],
  },
  {
    tier: "Tier 5", damage: "3.500.000",
    items: [
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "10.000",  icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
      { label: "Medalhas de Valentia",    count: 3,         icon: "sprites/valor_medal.png" },
    ],
  },
  {
    tier: "Tier 6", damage: "1.500.000",
    items: [
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "7.000",   icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
    ],
  },
  {
    tier: "Tier 7", damage: "50.000",
    items: [
      { label: "Chave",                   count: 1,         icon: "sprites/key.png" },
      { label: "Berries",                 count: "5.000",   icon: null },
      { label: "Pot. Stamina da GL",      count: 4,         icon: "sprites/gl_stamina_pot.png" },
    ],
  },
];

// ─── state ───────────────────────────────────────────────────

let wbTableMode   = "simple";  // "simple" | "matrix"
let wbActiveSkill = WB_SHAI_HULUD_SKILLS_ALL[0];

// ─── init ────────────────────────────────────────────────────

function worldBossesInit() {
  const panel = document.getElementById("shai_hulud");
  if (!panel || panel.dataset.wbBound) return;
  panel.dataset.wbBound = "1";

  wbRenderAll();
  wbBindEvents();
}

function wbRenderAll() {
  wbRenderTable();
  wbRenderSkillPreview();
  wbRenderCharacters();
  wbRenderRewards();
}

// ─── phase table ─────────────────────────────────────────────

function wbRenderTable() {
  const wrap = document.getElementById("wb-table-wrap");
  if (!wrap) return;
  wrap.innerHTML = wbTableMode === "simple" ? wbBuildSimpleTable() : wbBuildMatrixTable();
  wbBindTableSkillClicks();
}

function wbBuildSimpleTable() {
  let html = `<table class="wb-table">
    <thead><tr>
      <th>Fase</th>
      <th>Dano Aproximado</th>
      <th>Habilidades</th>
      <th>Tier</th>
    </tr></thead><tbody>`;

  for (const phase of WB_SHAI_HULUD_PHASES) {
    const skillsHtml = phase.skills.map(s => {
      const prefix = s.count && s.count > 1 ? `${s.count}&times; ` : "";
      const suffix = s.note ? ` <span class="wb-note">(${wbEscape(s.note)})</span>` : "";
      const activeClass = s.name === wbActiveSkill ? " wb-skill-active" : "";
      return `<span class="wb-skill-link${activeClass}" data-skill="${wbEscape(s.name)}">${prefix}${wbEscape(s.name)}${suffix}</span>`;
    }).join(", ");

    html += `<tr>
      <td class="wb-phase-cell">${wbEscape(phase.phase)}</td>
      <td class="wb-damage-cell">${wbEscape(phase.damage)}</td>
      <td class="wb-skills-cell">${skillsHtml}</td>
      <td class="wb-tier-cell">—</td>
    </tr>`;
  }

  html += `</tbody></table>`;
  return html;
}

function wbBuildMatrixTable() {
  const skills = WB_SHAI_HULUD_SKILLS_ALL;

  let html = `<table class="wb-table wb-table-matrix">
    <thead><tr>
      <th>Fase</th>
      <th>Dano Aproximado</th>`;

  for (const skill of skills) {
    const activeClass = skill === wbActiveSkill ? " wb-skill-active" : "";
    html += `<th class="wb-skill-col-header wb-skill-link${activeClass}" data-skill="${wbEscape(skill)}">${wbEscape(skill)}</th>`;
  }
  html += `<th>Tier</th></tr></thead><tbody>`;

  for (const phase of WB_SHAI_HULUD_PHASES) {
    html += `<tr>
      <td class="wb-phase-cell">${wbEscape(phase.phase)}</td>
      <td class="wb-damage-cell">${wbEscape(phase.damage)}</td>`;

    for (const skill of skills) {
      const match = phase.skills.find(s => s.name === skill);
      if (match) {
        const count = match.count || 1;
        const note  = match.note  || "";
        const title = note ? ` title="${wbEscape(note)}"` : "";
        const label = count > 1 ? `✓ ×${count}` : "✓";
        const extraClass = count > 1 ? " wb-check-multi" : note ? " wb-check-special" : "";
        html += `<td class="wb-matrix-cell"><span class="wb-check${extraClass}"${title}>${label}</span></td>`;
      } else {
        html += `<td class="wb-matrix-cell wb-matrix-empty">—</td>`;
      }
    }

    html += `<td class="wb-tier-cell">—</td></tr>`;
  }

  html += `</tbody></table>`;
  return html;
}

// ─── skill preview ───────────────────────────────────────────

function wbRenderSkillPreview() {
  const img       = document.getElementById("wb-skill-gif");
  const label     = document.getElementById("wb-skill-label");
  const desc      = document.getElementById("wb-skill-description");
  if (!img || !label) return;

  const gif = WB_SHAI_HULUD_SKILL_GIFS[wbActiveSkill] || "";
  img.src       = gif;
  img.alt       = wbActiveSkill;
  label.textContent = wbActiveSkill;
  if (desc) {
    desc.textContent = WB_SHAI_HULUD_SKILL_DESCRIPTIONS[wbActiveSkill] || "";
  }
}

// ─── characters ──────────────────────────────────────────────

function wbRenderCharacters() {
  const el = document.getElementById("wb-characters");
  if (!el) return;

  const roles = [
    { key: "tank",    label: "Tank" },
    { key: "dps",     label: "DPS" },
    { key: "suporte", label: "Suporte" },
  ];

  let html = "";
  for (const role of roles) {
    const chars = WB_SHAI_HULUD_CHARACTERS[role.key] || [];
    html += `<div class="wb-char-group">
      <h5 class="wb-char-role-label wb-role-${wbEscape(role.key)}">${wbEscape(role.label)}</h5>
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

// ─── rewards ─────────────────────────────────────────────────

function wbRenderRewards() {
  const el = document.getElementById("wb-rewards");
  if (!el) return;

  let html = `<div class="wb-rewards-wrap">`;

  for (const row of WB_SHAI_HULUD_REWARDS) {
    const tierSlug   = row.top1 ? "top1" : row.tier.toLowerCase().replace(/\s+/g, "");
    const damageText = row.damage ? `≥ ${row.damage} dmg` : "Maior dano da party";

    const itemsHtml = row.items.map(item => {
      const countText = (item.count !== 1) ? `${item.count}×` : "";
      const imgHtml   = item.icon
        ? `<img src="${wbEscape(item.icon)}" alt="${wbEscape(item.label)}" onerror="this.style.display='none'" />`
        : "";
      return `<div class="wb-reward-item">${imgHtml}<span class="wb-reward-item-count">${countText}</span><span class="wb-reward-item-name">${wbEscape(item.label)}</span></div>`;
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

// ─── events ──────────────────────────────────────────────────

function wbBindEvents() {
  const toggleBtn = document.getElementById("wb-table-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      wbTableMode = wbTableMode === "simple" ? "matrix" : "simple";
      toggleBtn.textContent = wbTableMode === "simple" ? "Modo Habilidades" : "Modo Simples";
      wbRenderTable();
    });
  }
}

function wbBindTableSkillClicks() {
  const wrap = document.getElementById("wb-table-wrap");
  if (!wrap) return;

  wrap.querySelectorAll(".wb-skill-link").forEach(el => {
    el.addEventListener("click", () => {
      const skill = el.dataset.skill;
      if (!skill || !WB_SHAI_HULUD_SKILL_GIFS[skill]) return;
      wbActiveSkill = skill;
      wbRenderSkillPreview();
      wrap.querySelectorAll(".wb-skill-link").forEach(e =>
        e.classList.toggle("wb-skill-active", e.dataset.skill === skill)
      );
    });
  });
}

// ─── sidebar folder toggle ───────────────────────────────────

function wbToggleFolder(btn) {
  const submenu = document.getElementById("wb-folder-submenu");
  if (!submenu) return;
  const open = submenu.classList.toggle("wb-submenu-open");
  btn.classList.toggle("wb-folder-open", open);
  btn.setAttribute("aria-expanded", open ? "true" : "false");
}

// ─── utils ───────────────────────────────────────────────────

function wbEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
