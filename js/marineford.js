// ============================================================
// Marineford tab
// ============================================================

const MF_GENERAL_SECTIONS = [
  {
    icon: '📋',
    title: 'mfGenSec1Title',
    rules: ['mfGenSec1Rule1', 'mfGenSec1Rule2', 'mfGenSec1Rule3', 'mfGenSec1Rule4'],
  },
  {
    icon: '⚔️',
    title: 'mfGenSec2Title',
    rules: ['mfGenSec2Rule1', 'mfGenSec2Rule2', 'mfGenSec2Rule3', 'mfGenSec2Rule4'],
  },
  {
    icon: '🤖',
    title: 'mfGenSec3Title',
    rules: ['mfGenSec3Rule1', 'mfGenSec3Rule2', 'mfGenSec3Rule3', 'mfGenSec3Rule4', 'mfGenSec3Rule5'],
  },
  {
    icon: '🔀',
    title: 'mfGenSec4Title',
    rules: ['mfGenSec4Rule1', 'mfGenSec4Rule2', 'mfGenSec4Rule3', 'mfGenSec4Rule4', 'mfGenSec4Rule5'],
  },
  {
    icon: '⚠️',
    title: 'mfGenSec5Title',
    rules: ['mfGenSec5Rule1'],
  },
];

const MF_BOSSES = {
  bastille: {
    title: 'Bastille',
    skills: [
      {
        name: 'Initial Wave',
        size: 'mfBastilleInitialWaveSize',
        cd: 'mfBastilleInitialWaveCd',
        desc: 'mfBastilleInitialWaveDesc',
        imgs: [],
        video: 'sprites/marineford/bastille/bastille_initial_wave.mp4',
      },
      {
        name: 'Strawberry',
        size: 'mfBastilleStrawberrySize',
        cd: '—',
        desc: 'mfBastilleStrawberryDesc',
        imgs: [
          'sprites/marineford/bastille/strawberry_starter_area.png',
          'sprites/marineford/bastille/strawberry_area.png',
        ],
        video: 'sprites/marineford/bastille/bastille_strawberry.mp4',
      },
      {
        name: 'Zanbato Slash',
        size: 'mfBastilleZanbatoSlashSize',
        cd: '—',
        desc: 'mfBastilleZanbatoSlashDesc',
        imgs: ['sprites/marineford/bastille/zanbato_slash.png'],
        video: 'sprites/marineford/bastille/bastille_zanbato_slash.mp4',
      },
      {
        name: 'Birukatta',
        size: '6×3',
        cd: '—',
        desc: 'mfBastilleBirukattaDesc',
        imgs: ['sprites/marineford/bastille/birukatta.png'],
        video: 'sprites/marineford/bastille/birukatta.mp4',
      },
      {
        name: 'Furaingusodo',
        size: '3×3 → 2×7 → 4×9',
        cd: '—',
        desc: 'mfBastilleFuraingusodoDesc',
        imgs: ['sprites/marineford/bastille/furaingusodo.png'],
        video: 'sprites/marineford/bastille/bastille_furaingusodo.mp4',
      },
      {
        name: 'Brute Force',
        size: 'mfBastilleBruteForceSize',
        cd: '—',
        desc: 'mfBastilleBruteForceDesc',
        imgs: ['sprites/marineford/bastille/brute_force.png'],
        video: 'sprites/marineford/bastille/bastille_brute_force.mp4',
      },
      {
        name: 'Bomb Rain',
        size: 'mfBastilleBombRainSize',
        cd: 'mfBastilleBombRainCd',
        desc: 'mfBastilleBombRainDesc',
        imgs: ['sprites/marineford/bastille/bomb_rain.png'],
        video: 'sprites/marineford/bastille/bastille_bomb_rain.mp4',
      },
    ],
  },

  brannew: {
    title: 'Brannew',
    skills: [
      {
        name: 'Initial Gatling Gun',
        size: '3×3',
        cd: 'mfBrannewInitialGatlingCd',
        desc: 'mfBrannewInitialGatlingDesc',
        imgs: [],
        video: 'sprites/marineford/brannew/brannew_initial_gatling_gun.mp4',
      },
      {
        name: 'Area Jump',
        size: '5×5',
        cd: '—',
        desc: 'mfBrannewAreaJumpDesc',
        imgs: ['sprites/marineford/brannew/area_jump.png'],
        video: 'sprites/marineford/brannew/brannew_area_jump.mp4',
      },
      {
        name: 'Target Gatling Gun',
        size: 'mfBrannewTargetGatlingSize',
        cd: '—',
        desc: 'mfBrannewTargetGatlingDesc',
        imgs: [],
        video: 'sprites/marineford/brannew/brannew_target_gatling_gun.mp4',
      },
      {
        name: 'Onigumo',
        size: 'mfBrannewOnigumoSize',
        cd: '—',
        desc: 'mfBrannewOnigumoDesc',
        imgs: ['sprites/marineford/brannew/onigumo.png'],
        video: 'sprites/marineford/brannew/brannew_onigumo.mp4',
      },
      {
        name: 'Hold',
        size: 'mfBrannewHoldSize',
        cd: 'mfBrannewHoldCd',
        desc: 'mfBrannewHoldDesc',
        imgs: [],
        video: 'sprites/marineford/brannew/brannew_hold.mp4',
      },
      {
        name: '2 Punches, 1 Smash',
        size: 'mfBrannewSmashSize',
        cd: '—',
        desc: 'mfBrannewSmashDesc',
        imgs: ['sprites/marineford/brannew/2_punches_1_smash.png'],
        video: 'sprites/marineford/brannew/brannew_2_punches_1_smash.mp4',
      },
    ],
  },

  dalmatian: {
    title: 'Dalmatian',
    skills: [
      {
        name: 'Armed Shigan',
        size: '6×3',
        cd: '—',
        desc: 'mfDalmatianArmedShiganDesc',
        imgs: ['sprites/marineford/dalmatian/dalmatian_armed_shigan.png'],
        video: 'sprites/marineford/dalmatian/dalmatian_armed_shigan.mp4',
      },
      {
        name: 'Dog Claws',
        size: '6×3',
        cd: '—',
        desc: 'mfDalmatianDogClawsDesc',
        imgs: ['sprites/marineford/dalmatian/dalmatian_dog_claws.png'],
        video: 'sprites/marineford/dalmatian/dalmatian_dog_claws.mp4',
      },
      {
        name: 'Carnage',
        size: '5×5',
        cd: '8s',
        desc: 'mfDalmatianCarnageDesc',
        imgs: ['sprites/marineford/dalmatian/dalmatian_carnage.png'],
        video: 'sprites/marineford/dalmatian/dalmatian_carnage.mp4',
      },
      {
        name: 'Ulted Armed Shigan',
        size: '6×3',
        cd: '—',
        desc: 'mfDalmatianUltedShiganDesc',
        imgs: ['sprites/marineford/dalmatian/dalmatian_ulted_armed_shigan.png'],
        video: 'sprites/marineford/dalmatian/dalmatian_ulted_armed_shigan.mp4',
      },
      {
        name: 'Aerial Claws',
        size: '8×5',
        cd: '—',
        desc: 'mfDalmatianAerialClawsDesc',
        imgs: ['sprites/marineford/dalmatian/dalmatian_aerial_claws.png'],
        video: 'sprites/marineford/dalmatian/dalmatian_aerial_claws.mp4',
      },
    ],
  },

  hina: {
    title: 'Hina',
    skills: [
      {
        name: 'Initial Wave',
        size: 'mfHinaInitialWaveSize',
        cd: 'mfHinaInitialWaveCd',
        desc: 'mfHinaInitialWaveDesc',
        imgs: [],
        video: 'sprites/marineford/hina/hina_initial_wave.mp4',
      },
      {
        name: 'Anti Ranged (com Aggro)',
        size: '1×1',
        cd: '—',
        desc: 'mfHinaAntiRangedAggroDesc',
        imgs: [],
        video: 'sprites/marineford/hina/hina_anti_ranged_aggro.mp4',
      },
      {
        name: 'Anti Ranged',
        size: '3×3',
        cd: '—',
        desc: 'mfHinaAntiRangedDesc',
        imgs: ['sprites/marineford/hina/hina_anti_ranged.png'],
        video: 'sprites/marineford/hina/hina_anti_ranged.mp4',
      },
      {
        name: 'Awase Baori',
        size: '5×3',
        cd: '—',
        desc: 'mfHinaAwasebaoriDesc',
        imgs: ['sprites/marineford/hina/hina_awase_baori.png'],
        video: 'sprites/marineford/hina/hina_awase_baori.mp4',
      },
      {
        name: 'Cage',
        size: 'mfHinaCageSize',
        cd: '—',
        desc: 'mfHinaCageDesc',
        imgs: [],
        video: 'sprites/marineford/hina/hina_cage.mp4',
      },
      {
        name: 'Rankyaku',
        size: 'mfHinaRankyakuSize',
        cd: '—',
        desc: 'mfHinaRankyakuDesc',
        imgs: ['sprites/marineford/hina/hina_rankyaku.png'],
        video: 'sprites/marineford/hina/hina_rankyaku.mp4',
      },
      {
        name: 'Kuroori Supaiku',
        size: 'mfHinaKurooriSize',
        cd: '—',
        desc: 'mfHinaKurooriDesc',
        imgs: [],
        video: 'sprites/marineford/hina/hina_kuroori_supaiku.mp4',
      },
      {
        name: 'Bigger Cage',
        size: 'mfHinaBiggerCageSize',
        cd: '—',
        desc: 'mfHinaBiggerCageDesc',
        imgs: [],
        video: 'sprites/marineford/hina/hina_bigger_cage.mp4',
      },
    ],
  },

  jango: {
    title: 'Jango',
    skills: [
      {
        name: 'Initial Wave',
        size: 'mfJangoInitialWaveSize',
        cd: 'mfJangoInitialWaveCd',
        desc: 'mfJangoInitialWaveDesc',
        imgs: [],
        video: 'sprites/marineford/jango/jango_initial_wave.mp4',
      },
      {
        name: 'Kira Chakram',
        size: '5×5',
        cd: '—',
        desc: 'mfJangoKiraChakramDesc',
        imgs: ['sprites/marineford/jango/jango_kira_chakram.png'],
        video: 'sprites/marineford/jango/jango_kira_chakram.mp4',
      },
      {
        name: 'Anti Ranged',
        size: '5×3',
        cd: '—',
        desc: 'mfJangoAntiRangedDesc',
        imgs: ['sprites/marineford/jango/jango_anti_ranged.png'],
        video: 'sprites/marineford/jango/jango_anti_ranged.mp4',
      },
      {
        name: 'Thriller (Debuff)',
        size: 'mfJangoThrillerSize',
        cd: '—',
        desc: 'mfJangoThrillerDesc',
        imgs: ['sprites/marineford/jango/jango_thriller.png'],
        video: 'sprites/marineford/jango/jango_thriller.mp4',
      },
      {
        name: '1, 2, Jango',
        size: 'mfJango12JangoSize',
        cd: '—',
        desc: 'mfJango12JangoDesc',
        imgs: ['sprites/marineford/jango/jango_1_2_jango.png'],
        video: 'sprites/marineford/jango/jango_1_2_jango.mp4',
      },
    ],
  },

  moria: {
    title: 'Moria',
    skills: [
      {
        name: 'Kaiten No Hasami',
        size: '7×7',
        cd: '—',
        desc: 'mfMoriaKaitenDesc',
        imgs: ['sprites/marineford/moria/moria_kaiten_no_hasami.png'],
        video: 'sprites/marineford/moria/moria_kaiten_no_hasami.mp4',
      },
      {
        name: 'Tsuno Tokage (Doppelman)',
        size: 'mfMoriaTsunoDoppelSize',
        cd: '—',
        desc: 'mfMoriaTsunoDoppelDesc',
        imgs: ['sprites/marineford/moria/moria_tsuno_tokage_doppelman.png'],
        video: 'sprites/marineford/moria/moria_tsuno_tokage_doppelman.mp4',
      },
      {
        name: 'Hasami Giri',
        size: '~9×5',
        cd: '—',
        desc: 'mfMoriaHasamiGiriDesc',
        imgs: ['sprites/marineford/moria/moria_hasami_giri.png'],
        video: 'sprites/marineford/moria/moria_hasami_giri.mp4',
      },
      {
        name: 'Real Form',
        size: '1×1',
        cd: 'mfMoriaRealFormCd',
        desc: 'mfMoriaRealFormDesc',
        imgs: [],
        video: 'sprites/marineford/moria/moria_real_form.mp4',
      },
      {
        name: 'Brick Bat',
        size: '3×1 → 5×1 → 7×1 → 9×1',
        cd: '—',
        desc: 'mfMoriaBrickBatDesc',
        imgs: ['sprites/marineford/moria/moria_brick_bat.png'],
        video: 'sprites/marineford/moria/moria_brick_bat.mp4',
      },
      {
        name: 'Brick Bat Circles',
        size: '5×5',
        cd: '—',
        desc: 'mfMoriaBrickBatCirclesDesc',
        imgs: ['sprites/marineford/moria/moria_brick_bat_circles.png'],
        video: 'sprites/marineford/moria/moria_brick_bat_circles.mp4',
      },
      {
        name: 'Tsuno Tokage (Real Form) + Kage Wo Yokose',
        size: 'mfMoriaTsunoKageSize',
        cd: '—',
        desc: 'mfMoriaTsunoKageDesc',
        imgs: [
          'sprites/marineford/moria/moria_tsuno_tokage_real_form.png',
          'sprites/marineford/moria/moria_kage_wo_yokose.png',
        ],
        video: 'sprites/marineford/moria/moria_tsuno_tokage_kage_wo_yokose.mp4',
      },
    ],
  },

  smoker: {
    title: 'Smoker',
    skills: [
      {
        name: 'White Conceal',
        size: '5×5',
        cd: '—',
        desc: 'mfSmokerWhiteConcealDesc',
        imgs: ['sprites/marineford/smoker/smoker_white_conceal.png'],
        video: 'sprites/marineford/smoker/smoker_white_conceal.mp4',
      },
      {
        name: 'Wave',
        size: '2 Elite Marines',
        cd: '1 min',
        desc: 'mfSmokerWaveDesc',
        imgs: [],
        video: 'sprites/marineford/smoker/smoker_wave.mp4',
      },
      {
        name: 'White Vine',
        size: '5×5',
        cd: '—',
        desc: 'mfSmokerWhiteVineDesc',
        imgs: ['sprites/marineford/smoker/smoker_white_vine.png'],
        video: 'sprites/marineford/smoker/smoker_white_vine.mp4',
      },
      {
        name: 'White Blow',
        size: '4×3',
        cd: '—',
        desc: 'mfSmokerWhiteBlowDesc',
        imgs: ['sprites/marineford/smoker/smoker_white_blow.png'],
        video: 'sprites/marineford/smoker/smoker_white_blow.mp4',
      },
      {
        name: 'White Strike',
        size: '5×5',
        cd: '—',
        desc: 'mfSmokerWhiteStrikeDesc',
        imgs: ['sprites/marineford/smoker/smoker_white_strike.png'],
        video: 'sprites/marineford/smoker/smoker_white_strike.mp4',
      },
      {
        name: 'White Out',
        size: '4×3',
        cd: '—',
        desc: 'mfSmokerWhiteOutDesc',
        imgs: ['sprites/marineford/smoker/smoker_white_out.png'],
        video: 'sprites/marineford/smoker/smoker_white_out.mp4',
      },
    ],
  },

  tashigi: {
    title: 'Tashigi',
    skills: [
      {
        name: 'Senbon Sakura',
        size: '9×9',
        cd: 'mfTashigiSenbonCd',
        desc: 'mfTashigiSenbonDesc',
        imgs: ['sprites/marineford/tashigi/tashigi_senbon_sakura.png'],
        video: 'sprites/marineford/tashigi/tashigi_senbon_sakura.mp4',
      },
      {
        name: 'Kiri Shigure',
        size: '6×3',
        cd: '—',
        desc: 'mfTashigiKiriShigureDesc',
        imgs: ['sprites/marineford/tashigi/tashigi_kiri_shigure.png'],
        video: 'sprites/marineford/tashigi/tashigi_kiri_shigure.mp4',
      },
      {
        name: 'Wave',
        size: '9 Marines',
        cd: '145s',
        desc: 'mfTashigiWaveDesc',
        imgs: [],
        video: 'sprites/marineford/tashigi/tashigi_wave.mp4',
      },
      {
        name: 'Senbon Sakura (Normal)',
        size: '4×3',
        cd: '—',
        desc: 'mfTashigiSenbonNormalDesc',
        imgs: ['sprites/marineford/tashigi/tashigi_senbon_sakura_area.png'],
        video: 'sprites/marineford/tashigi/tashigi_senbon_sakura_area.mp4',
      },
      {
        name: 'Usugasumi',
        size: '6×3',
        cd: '—',
        desc: 'mfTashigiUsugasumiDesc',
        imgs: [],
        video: 'sprites/marineford/tashigi/tashigi_usugasumi.mp4',
      },
    ],
  },

  aokiji: {
    title: 'Aokiji',
    skills: [
      {
        name: 'Initial Skill',
        size: 'mfAokijiInitialSize',
        cd: 'mfAokijiInitialCd',
        desc: 'mfAokijiInitialDesc',
        imgs: [],
        video: 'sprites/marineford/aokiji/aokiji_beginning.mp4',
      },
      {
        name: 'Ice Saber',
        size: '3×3',
        cd: '9s',
        desc: 'mfAokijiIceSaberDesc',
        imgs: ['sprites/marineford/aokiji/aokiji_ice_saber.png'],
        video: 'sprites/marineford/aokiji/aokiji_ice_saber.mp4',
      },
      {
        name: 'Ice Age',
        size: '11×11',
        cd: '50s',
        desc: 'mfAokijiIceAgeDesc',
        imgs: ['sprites/marineford/aokiji/aokiji_ice_age.png'],
        video: 'sprites/marineford/aokiji/aokiji_ice_age.mp4',
      },
      {
        name: 'Ice Block: Partisan',
        size: 'mfAokijiPartisanSize',
        cd: '12s',
        desc: 'mfAokijiPartisanDesc',
        imgs: ['sprites/marineford/aokiji/aokiji_ice_block_partisan.png'],
        video: 'sprites/marineford/aokiji/aokiji_ice_block_partisan.mp4',
      },
      {
        name: 'Ice Time',
        size: '5×5',
        cd: '70s',
        desc: 'mfAokijiIceTimeDesc',
        imgs: ['sprites/marineford/aokiji/aokiji_ice_time.png'],
        video: 'sprites/marineford/aokiji/aokiji_ice_time.mp4',
      },
      {
        name: 'Anti Ranged',
        size: '~5×5',
        cd: '7s',
        desc: 'mfAokijiAntiRangedDesc',
        imgs: ['sprites/marineford/aokiji/aokiji_anti_ranged.png'],
        video: 'sprites/marineford/aokiji/aokiji_anti_ranged.mp4',
      },
      {
        name: 'Anti Ranged (Aggroed)',
        size: '1×1',
        cd: '0s',
        desc: 'mfAokijiAntiRangedAggroDesc',
        imgs: [],
        video: 'sprites/marineford/aokiji/aokiji_anti_ranged_aggroed.mp4',
      },
      {
        name: 'Mechanic',
        size: 'mfAokijiMechanicSize',
        cd: '90s',
        desc: 'mfAokijiMechanicDesc',
        imgs: [],
        video: 'sprites/marineford/aokiji/aokiji_mechanic.mp4',
      },
    ],
  },

  doflamingo: {
    title: 'Doflamingo',
    skills: [
      {
        name: 'Initial Wave',
        size: '—',
        cd: 'mfDoflamingoInitialCd',
        desc: 'mfDoflamingoInitialDesc',
        imgs: [],
        video: 'sprites/marineford/doflamingo/doflamingo_initial_wave.mp4',
      },
      {
        name: 'Overheat',
        size: '6×3',
        cd: '—',
        desc: 'mfDoflamingoOverheatDesc',
        imgs: ['sprites/marineford/doflamingo/doflamingo_overheat.png'],
        video: 'sprites/marineford/doflamingo/doflamingo_overheat.mp4',
      },
      {
        name: 'Fulbright',
        size: '3×3',
        cd: '—',
        desc: 'mfDoflamingoFulbrightDesc',
        imgs: ['sprites/marineford/doflamingo/doflamingo_fulbright.png'],
        video: 'sprites/marineford/doflamingo/doflamingo_fulbright.mp4',
      },
      {
        name: 'Awakening',
        size: 'mfDoflamingoAwakeningSize',
        cd: '—',
        desc: 'mfDoflamingoAwakeningDesc',
        imgs: [],
        video: 'sprites/marineford/doflamingo/doflamingo_awakening.mp4',
      },
      {
        name: 'Mechanic',
        size: 'mfDoflamingoMechanicSize',
        cd: '—',
        desc: 'mfDoflamingoMechanicDesc',
        imgs: ['sprites/marineford/doflamingo/doflamingo_mechanic.png'],
        video: 'sprites/marineford/doflamingo/doflamingo_mechanic.mp4',
      },
      {
        name: 'Clone + Cage',
        size: 'mfDoflamingoCloneCageSize',
        cd: '—',
        desc: 'mfDoflamingoCloneCageDesc',
        imgs: [],
        video: 'sprites/marineford/doflamingo/doflamingo_clone_cage.mp4',
      },
    ],
  },

  kizaru: {
    title: 'Kizaru',
    skills: [
      {
        name: 'Initial Skill',
        size: 'mfKizaruInitialSize',
        cd: 'mfKizaruInitialCd',
        desc: 'mfKizaruInitialDesc',
        imgs: [],
        video: 'sprites/marineford/kizaru/kizaru_initial_skill.mp4',
      },
      {
        name: 'Lightspeed Kick',
        size: '6×3',
        cd: '—',
        desc: 'mfKizaruLightspeedKickDesc',
        imgs: ['sprites/marineford/kizaru/kizaru_lightspeed_kick.png'],
        video: 'sprites/marineford/kizaru/kizaru_lightspeed_kick.mp4',
      },
      {
        name: 'Lightspeed Strike',
        size: '5×5',
        cd: '—',
        desc: 'mfKizaruLightspeedStrikeDesc',
        imgs: [
          'sprites/marineford/kizaru/kizaru_lightspeed_strike.png',
          'sprites/marineford/kizaru/kizaru_lightspeed_strike_effect.png',
        ],
        video: 'sprites/marineford/kizaru/kizaru_lightspeed_strike.mp4',
      },
      {
        name: 'Yasakani no Magatama',
        size: 'mfKizaruYasakaniSize',
        cd: '—',
        desc: 'mfKizaruYasakaniDesc',
        imgs: [],
        video: 'sprites/marineford/kizaru/kizaru_yasakani_no_magatama.mp4',
      },
      {
        name: 'Yata no Kagami',
        size: '7×5',
        cd: '—',
        desc: 'mfKizaruYataDesc',
        imgs: ['sprites/marineford/kizaru/kizaru_yata_no_kagami.png'],
        video: 'sprites/marineford/kizaru/kizaru_yata_no_kagami.mp4',
      },
      {
        name: 'Yasakani no Magatama (Meio)',
        size: 'mfKizaruYasakaniMidSize',
        cd: '—',
        desc: 'mfKizaruYasakaniMidDesc',
        imgs: [],
        video: 'sprites/marineford/kizaru/kizaru_yasakani_no_magatama_middle.mp4',
      },
      {
        name: 'Laser + Hold',
        size: 'mfKizaruLaserHoldSize',
        cd: '—',
        desc: 'mfKizaruLaserHoldDesc',
        imgs: ['sprites/marineford/kizaru/kizaru_laser_hold.png'],
        video: 'sprites/marineford/kizaru/kizaru_laser_hold.mp4',
      },
    ],
  },

  mihawk: {
    title: 'Mihawk',
    skills: [
      {
        name: 'Initial Wave',
        size: 'mfMihawkInitialWaveSize',
        cd: 'mfMihawkInitialWaveCd',
        desc: 'mfMihawkInitialWaveDesc',
        imgs: [],
        video: 'sprites/marineford/mihawk/mihawk_initial_wave.mp4',
      },
      {
        name: 'Suihei + Tornado',
        size: '9×3 + 7×7',
        cd: '—',
        desc: 'mfMihawkSuiheiTornadoDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_suihei_tornado.png'],
        video: 'sprites/marineford/mihawk/mihawk_suihei_tornado.mp4',
      },
      {
        name: 'Suihei',
        size: '3×3',
        cd: '—',
        desc: 'mfMihawkSuiheiDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_suihei.png'],
        video: 'sprites/marineford/mihawk/mihawk_suihei.mp4',
      },
      {
        name: 'Chi wo Hau Zangeki',
        size: '9×3',
        cd: '—',
        desc: 'mfMihawkChiWoHauDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_chi_wo_hau_zangeki.png'],
        video: 'sprites/marineford/mihawk/mihawk_chi_wo_hau_zangeki.mp4',
      },
      {
        name: 'Anti Ranged Aggroed',
        size: '1',
        cd: 'mfMihawkAntiRangedCd',
        desc: 'mfMihawkAntiRangedDesc',
        imgs: [],
        video: 'sprites/marineford/mihawk/mihawk_anti_ranged_aggroed.mp4',
      },
      {
        name: 'Kokuto Kogetsu',
        size: '5×5',
        cd: '—',
        desc: 'mfMihawkKokutoDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_kokuto_kogetsu.png'],
        video: 'sprites/marineford/mihawk/mihawk_kokuto_kogetsu.mp4',
      },
      {
        name: 'Mechanic',
        size: 'mfMihawkMechanicSize',
        cd: '—',
        desc: 'mfMihawkMechanicDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_mechanic.png'],
        video: 'sprites/marineford/mihawk/mihawk_mechanic.mp4',
      },
      {
        name: 'Kobuto Arahoshi',
        size: '11×11',
        cd: 'mfMihawkKobutoArahoshiCd',
        desc: 'mfMihawkKobutoArahoshiDesc',
        imgs: ['sprites/marineford/mihawk/mihawk_kobuto_arahoshi.png'],
        video: 'sprites/marineford/mihawk/mihawk_kobuto_arahoshi.mp4',
      },
    ],
  },

  akainu: {
    title: 'Akainu',
    skills: [
      {
        name: 'Initial Skill',
        size: 'mfAkainuInitialSize',
        cd: 'mfAkainuInitialCd',
        desc: 'mfAkainuInitialDesc',
        imgs: [],
        video: 'sprites/marineford/akainu/akainu_initial_skill.mp4',
      },
      {
        name: 'Anti Ranged',
        size: '3×3',
        cd: '—',
        desc: 'mfAkainuAntiRangedDesc',
        imgs: ['sprites/marineford/akainu/akainu_anti_ranged.png'],
        video: 'sprites/marineford/akainu/akainu_anti_ranged.mp4',
      },
      {
        name: 'Meigo',
        size: '7×7',
        cd: '—',
        desc: 'mfAkainuMeigoDesc',
        imgs: ['sprites/marineford/akainu/akainu_meigo.png'],
        video: 'sprites/marineford/akainu/akainu_meigo.mp4',
      },
      {
        name: 'Kazan Ken',
        size: '4×3',
        cd: '—',
        desc: 'mfAkainuKazanKenDesc',
        imgs: ['sprites/marineford/akainu/akainu_kazan_ken.png'],
        video: 'sprites/marineford/akainu/akainu_kazan_ken.mp4',
      },
      {
        name: 'Kazan Bakuhatsu',
        size: 'mfAkainuKazanBakuhatsuSize',
        cd: '—',
        desc: 'mfAkainuKazanBakuhatsuDesc',
        imgs: ['sprites/marineford/akainu/akainu_kazan_bakuhatsu.png'],
        video: 'sprites/marineford/akainu/akainu_kazan_bakuhatsu.mp4',
      },
      {
        name: 'Dai Funka',
        size: '6×3',
        cd: '—',
        desc: 'mfAkainuDaiFunkaDesc',
        imgs: ['sprites/marineford/akainu/akainu_dai_funka.png'],
        video: 'sprites/marineford/akainu/akainu_dai_funka.mp4',
      },
      {
        name: 'Ryuusei Kazan',
        size: 'mfAkainuRyuuseiKazanSize',
        cd: '—',
        desc: 'mfAkainuRyuuseiKazanDesc',
        imgs: [],
        video: 'sprites/marineford/akainu/akainu_ryuusei_kazan.mp4',
      },
      {
        name: 'Inugami Guren',
        size: '6×3 → 5×5',
        cd: '—',
        desc: 'mfAkainuInugamiGurenDesc',
        imgs: ['sprites/marineford/akainu/akainu_inugami_guren.png'],
        video: 'sprites/marineford/akainu/akainu_inugami_guren.mp4',
      },
      {
        name: 'Volcanoes',
        size: 'mfAkainuVolcanoesSize',
        cd: 'mfAkainuVolcanoesCd',
        desc: 'mfAkainuVolcanoesDesc',
        imgs: [],
        video: 'sprites/marineford/akainu/akainu_volcanoes.mp4',
      },
    ],
  },
};

// ─── boss icons ─────────────────────────────────────────────

const MF_BOSS_ICONS = {
  bastille:   'sprites/characters/bastille.png',
  brannew:    'sprites/tracker/marineford/brannew_boss.png',
  dalmatian:  'sprites/characters/dalmatian.png',
  hina:       'sprites/characters/hina.png',
  jango:      'sprites/characters/jango.png',
  moria:      'sprites/characters/gecko_moria.png',
  smoker:     'sprites/characters/smoker.png',
  tashigi:    'sprites/characters/tashigi.png',
  aokiji:     'sprites/characters/aokiji.png',
  doflamingo: 'sprites/characters/doflamingo.png',
  kizaru:     'sprites/characters/borsalino_kizaru.png',
  mihawk:     'sprites/characters/dracule_mihawk.png',
  akainu:     'sprites/characters/akainu.png',
};

// ─── media modal ─────────────────────────────────────────────

function ensureMfMediaModal() {
  if (document.getElementById('mf-media-modal-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'mf-media-modal-overlay';
  overlay.className = 'modal-overlay';

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.innerHTML = `
    <button class="modal-close" aria-label="Fechar">✕</button>
    <img id="mf-media-modal-img" class="modal-img" alt="" style="display:none">
    <video id="mf-media-modal-video" class="mf-modal-video" controls style="display:none">
      <source id="mf-media-modal-video-src" type="video/mp4">
    </video>
    <div id="mf-media-modal-info" class="mf-modal-info">
      <h4 id="mf-media-modal-name" class="mf-modal-skill-name"></h4>
      <div id="mf-media-modal-meta" class="mf-modal-skill-meta"></div>
      <p id="mf-media-modal-desc" class="mf-modal-skill-desc"></p>
    </div>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => { if (e.target === overlay) closeMfMediaModal(); });
  content.querySelector('.modal-close').addEventListener('click', closeMfMediaModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMfMediaModal();
  });
}

function openMfMediaModal(type, src, skillName, skillSize, skillCd, skillDesc) {
  ensureMfMediaModal();
  const overlay = document.getElementById('mf-media-modal-overlay');
  const img = document.getElementById('mf-media-modal-img');
  const video = document.getElementById('mf-media-modal-video');
  const videoSrc = document.getElementById('mf-media-modal-video-src');

  if (type === 'img') {
    img.src = src;
    img.style.display = 'block';
    video.pause();
    video.style.display = 'none';
  } else {
    videoSrc.src = src;
    video.load();
    video.style.display = 'block';
    img.style.display = 'none';
    img.src = '';
  }

  const nameEl = document.getElementById('mf-media-modal-name');
  const metaEl = document.getElementById('mf-media-modal-meta');
  const descEl = document.getElementById('mf-media-modal-desc');
  nameEl.textContent = skillName || '';
  metaEl.innerHTML = `<span class="mf-skill-meta-tag"><strong>${mfEsc(t('mfSkillSize'))}:</strong> ${mfEsc(skillSize || '—')}</span>` +
    `<span class="mf-skill-meta-tag"><strong>CD:</strong> ${mfEsc(skillCd || '—')}</span>`;
  descEl.textContent = skillDesc || '';

  overlay.classList.add('is-open');
}

function closeMfMediaModal() {
  const overlay = document.getElementById('mf-media-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  const video = document.getElementById('mf-media-modal-video');
  if (video) { video.pause(); video.currentTime = 0; }
}

// ─── init ───────────────────────────────────────────────────

function marinefordInit(tabId) {
  if (!tabId) return;
  const panel = document.getElementById(tabId);
  if (!panel || panel.dataset.mfRendered) return;
  panel.dataset.mfRendered = '1';

  const bossKey = tabId.replace('mf_', '');
  if (bossKey === 'general') {
    mfRenderGeneral();
  } else {
    mfRenderBoss(bossKey);
  }
}

// ─── credits ────────────────────────────────────────────────

function mfInjectCredits(panel) {
  const header = panel && panel.querySelector('.mf-boss-header');
  if (!header || header.querySelector('.mf-credits')) return;
  const span = document.createElement('span');
  span.className = 'wanted-credits mf-credits';
  span.textContent = typeof t === 'function' ? t('mfCredits') : 'Credits to RedEllen for the videos and Images';
  header.appendChild(span);
}

// ─── general concepts ────────────────────────────────────────

function mfRenderGeneral() {
  const el = document.getElementById('mf-general-content');
  if (!el) return;
  mfInjectCredits(el.closest('.mf-panel'));

  let html = '';
  for (const section of MF_GENERAL_SECTIONS) {
    html += `<div class="mf-general-section">
      <div class="mf-general-section-head">
        <span class="mf-general-section-icon">${section.icon}</span>
        <h4 class="mf-general-section-title">${mfEsc(t(section.title))}</h4>
      </div>
      <ul class="mf-general-rules">`;
    for (const ruleKey of section.rules) {
      html += `<li class="mf-general-rule">${mfEsc(t(ruleKey))}</li>`;
    }
    html += `</ul></div>`;
  }
  el.innerHTML = html;
}

// ─── boss skills ─────────────────────────────────────────────

function mfRenderBoss(bossKey) {
  const boss = MF_BOSSES[bossKey];
  if (!boss) return;

  const panel = document.getElementById(`mf_${bossKey}`);
  const iconSrc = MF_BOSS_ICONS[bossKey];
  if (iconSrc) {
    const header = panel && panel.querySelector('.mf-boss-header');
    if (header && !header.querySelector('.mf-boss-icon')) {
      const img = document.createElement('img');
      img.className = 'mf-boss-icon';
      img.src = iconSrc;
      img.alt = boss.title;
      header.insertBefore(img, header.firstChild);
    }
  }
  mfInjectCredits(panel);

  const el = document.getElementById(`mf-skills-${mfEsc(bossKey)}`);
  if (!el) return;

  let html = '';
  for (const skill of boss.skills) {
    html += mfBuildSkillCard(skill, bossKey);
  }
  el.innerHTML = html;
}

function mfDeriveMediaLabel(src, bossKey) {
  const base = src.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
  const stripped = base.startsWith(bossKey + '_') ? base.slice(bossKey.length + 1) : base;
  return stripped.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Area';
}

function mfGallerySwitch(btn, idx) {
  const media = btn.closest('.mf-skill-media');
  media.querySelectorAll('.mf-media-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  media.querySelectorAll('.mf-media-item').forEach((item, i) => item.classList.toggle('active', i === idx));
}

function mfBuildSkillCard(skill, bossKey) {
  const hasMedia = skill.imgs.length > 0 || !!skill.video;
  const sizeLabel = t('mfSkillSize');

  let mediaHtml = '';
  if (hasMedia) {
    const items = [
      ...skill.imgs.map(src => ({ type: 'img', src, label: mfDeriveMediaLabel(src, bossKey) })),
      ...(skill.video ? [{ type: 'video', src: skill.video, label: 'Video' }] : []),
    ];

    const tabsHtml = items.map((item, i) =>
      `<button class="mf-media-tab-btn${i === 0 ? ' active' : ''}" onclick="mfGallerySwitch(this,${i})">${mfEsc(item.label)}</button>`
    ).join('');

    const skillAttrs = `data-mf-name="${mfEsc(skill.name)}"` +
      ` data-mf-size="${mfEsc(t(skill.size))}"` +
      ` data-mf-cd="${mfEsc(t(skill.cd))}"` +
      ` data-mf-desc="${mfEsc(t(skill.desc))}"`;
    const modalCall = `openMfMediaModal(this.dataset.mfType,this.dataset.mfSrc,this.dataset.mfName,this.dataset.mfSize,this.dataset.mfCd,this.dataset.mfDesc)`;

    const itemsHtml = items.map((item, i) => {
      const inner = item.type === 'img'
        ? `<img class="mf-skill-img" src="${mfEsc(item.src)}" alt="${mfEsc(skill.name)}" loading="lazy"` +
          ` data-mf-type="img" data-mf-src="${mfEsc(item.src)}" ${skillAttrs} onclick="${modalCall}">`
        : `<div class="mf-video-thumb" data-mf-type="video" data-mf-src="${mfEsc(item.src)}" ${skillAttrs}` +
          ` onclick="${modalCall}">` +
          `<video class="mf-skill-video" preload="none"><source src="${mfEsc(item.src)}" type="video/mp4"></video>` +
          `<div class="mf-video-play-btn">▶</div></div>`;
      return `<div class="mf-media-item${i === 0 ? ' active' : ''}">${inner}</div>`;
    }).join('');

    mediaHtml = `<div class="mf-skill-media">` +
      `<div class="mf-media-tab-bar">${tabsHtml}</div>` +
      `<div class="mf-media-viewport">${itemsHtml}</div>` +
      `</div>`;
  }

  return `<div class="mf-skill-card">
  <div class="mf-skill-body">
    <div class="mf-skill-info">
      <h4 class="mf-skill-name">${mfEsc(skill.name)}</h4>
      <div class="mf-skill-meta">
        <span class="mf-skill-meta-tag"><strong>${mfEsc(sizeLabel)}:</strong> ${mfEsc(t(skill.size))}</span>
        <span class="mf-skill-meta-tag"><strong>CD:</strong> ${mfEsc(t(skill.cd))}</span>
      </div>
      <p class="mf-skill-desc">${mfEsc(t(skill.desc))}</p>
    </div>
    ${mediaHtml}
  </div>
</div>`;
}

// ─── sidebar folder toggle ───────────────────────────────────

function mfToggleFolder(btn) {
  const submenu = document.getElementById('mf-folder-submenu');
  if (!submenu) return;
  const open = submenu.classList.toggle('wb-submenu-open');
  btn.classList.toggle('wb-folder-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// ─── utils ───────────────────────────────────────────────────

function mfEsc(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}
