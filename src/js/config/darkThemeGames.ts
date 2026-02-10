import { getColorForDarkMode } from "../utils/misc/colors";
import { waitForObj } from '../utils/misc/wait';

export const gamesWithCustomBackground = [
  'aero',
  'afterus',
  'agestofrobinhood',
  'agricola',
  'altered',
  'ancientknowledge',
  'aniversus',
  'aquarius',
  'aquatica',
  'architectsofamytis',
  'arctic',
  'arknova',
  'arknovamw',
  'asteria',
  'azul',
  'azulduel',
  'azulsummerpavilion',
  'bamboozle',
  'battlespiritssaga',
  'bebop',
  'beerbread',
  'betta',
  'beyond',
  'beyondthesun',
  'bigmonster',
  'bloodrage',
  'bossquest',
  'bootydice',
  'bunnyboom',
  'bunnykingdom',
  'cafe',
  'cakemaster',
  'cannonades',
  'canvas',
  'captainflip',
  'capybarancapybara',
  'cardia',
  'carnegie',
  'carnuta',
  'carsoncity',
  'cartographers',
  'castlecombo',
  'castlesofcaleira',
  'castleofmadkingludwig',
  'catannewenergies',
  'cathood',
  'catinthebox',
  'caverna',
  'century',
  'chromino',
  'citadels',
  'cities',
  'clashofdecks',
  'coatl',
  'codexnaturalis',
  'coffee',
  'coffeerush',
  'concept',
  'congkak',
  'conspiracy',
  'cookiebattle',
  'craftingthecosmos',
  'crashandgrab',
  'crybaby',
  'darwinsjourney',
  'deadcells',
  'deadcellsnewcontent', /* tempo */
  'dedale',
  'dewan',
  'dicycards',
  'dobbleconnect',
  'dogpark',
  'dontgointhere',
  'dontletitdie',
  'dozito',
  'draculahelsing',
  'draftandwriterecords',
  'drolesdezebres',
  'duckcover',
  'dungeonpetz',
  'dvonn',
  'earth',
  'earthabundance',
  'easypeasy',
  'ekko',
  'elongo',
  'eminentdomain',
  'emdomicrocosm',
  'equinox',
  'elawa',
  'eriantys',
  'escapethecurseofthetemple',
  'evolution',
  'exhibitiontwentiethcentury',
  'expeditions',
  'explodingkittens',
  'faraway',
  'fateoffellowship',
  'fauxraccords',
  'federation',
  'fifteendays',
  'finca',
  'flipseven',
  'flowersmandalagame',
  'forbiddenisland',
  'foxonthetree',
  'frenchtarot',
  'fromage',
  'galacticcruise',
  'gangofdice',
  'gangsta',
  'gardennation',
  'gardenrush',
  'gatsby',
  'giftoftulips',
  'girafferaffe',
  'gnomehollow',
  'goblinhood',
  'goldblivion',
  'goldncrash',
  'goodfortune',
  'gravitysuperstar',
  'greatsplit',
  'grund',
  'happycity',
  'harmonies',
  'heat',
  'heatchampionship',
  'heythatsmyfish',
  'ink',
  'insidejob',
  'itsawonderfulworld',
  'iwari',
  'iye',
  'jekyllvshide',
  'jumpdrive',
  'jurassicsnack',
  'justone',
  'kado',
  'khiva',
  'kikaibricolageheads',
  'kingoftokyo',
  'kiriaitheduel',
  'knarr',
  'krosmasterblast',
  'lasvegan',
  'legions',
  'lielow',
  'lineit',
  'livingforestduel',
  'locomomo',
  'lostexplorers',
  'lostseas',
  'lumen',
  'luz',
  'maatatahay',
  'malabares',
  'mantisfalls',
  'mapmasters',
  'massiveverse',
  'mastersofrenaissance',
  'matchsticktycoon',
  'megajackpot',
  'memoir',
  'mesos',
  'mexica',
  'miams',
  'middleages',
  'mindup',
  'misty',
  'mojo',
  'mollyhouse',
  'moonlight',
  'monstersmash',
  'monstertrick',
  'moonlight',
  'moonshine',
  'mountaingoats',
  'moversandshakers',
  'mrjack',
  'mycity',
  'mycityrb',
  'mystlingacademy',
  'mythicbattlesragnarok',
  'nature',
  'newfrontiers',
  'nextstation',
  'newton',
  'nicodemus',
  'nidavellir',
  'nimalia',
  'nirds',
  'noah',
  'norsemen',
  'notalone',
  'nowboarding',
  'numberdrop',
  'ofknightsandninjas',
  'ontour',
  'openseason',
  'oriflamme',
  'origin',
  'orleans',
  'pandaspin',
  'pandemic',
  'paxrenaissance',
  'pergola',
  'pilipili',
  'photosynthesis',
  'pingimus',
  'pinacoladice',
  'piratesunderfire',
  'pisanki',
  'pixies',
  'planetunknown',
  'pleasedontburnmyvillage',
  'pocketcats',
  'pook',
  'pyramidoft',
  'qo',
  'quadratacanada',
  'quartermastergeneraleastfront',
  'quirkyquarks',
  'restinpeace',
  'raceforthegalaxy',
  'railroadink',
  'railroadinkchallenge',
  'ratsofwistar',
  'rauha',
  'refuge',
  'resarcana',
  'riverrats',
  'rollandbump',
  'rollthroughtheagesthebronzeage',
  'romirami',
  'rumblenation',
  'rumbleplanet',
  'safariwitness',
  'santorini',
  'scratchandcatch',
  'scythe',
  'seasaltpaper',
  'seasons',
  'secretmoon',
  'seventhseacityoffivesails',
  'sevenwondersdice',
  'schottentotten',
  'shock',
  'skarabrae',
  'skirmishbattlefordraconia',
  'skyteam',
  'skull',
  'skullking',
  'similo',
  'smallworld',
  'sobektwoplayers',
  'solstis',
  'spacebase',
  'spaceempires',
  'spacelab',
  'spacestationphoenix',
  'spiritsoftheforest',
  'splendor',
  'splendorexpansions',
  'splendorduel',
  'spyworld',
  'stalkexchange',
  'stella',
  'starfluxx',
  'stonespinearchitects',
  'super',
  'symbiose',
  'tacta',
  'tagteam',
  'takenokolor',
  'talon',
  'taluva',
  'tapestry',
  'tekken',
  'thecrew',
  'thecrewdeepsea',
  'thedwarfking',
  'thegamemakers',
  'thehanginggardens',
  'thekingofthewoods',
  'theninesonsofthedragon',
  'theyellowhouse',
  'tickettoride',
  'tickettorideeurope',
  'tickettoridemaps',
  'tikal',
  'tinyturbocars',
  'towerup',
  'toybattle',
  'trailblazers',
  'trektwelve',
  'trickarus',
  'trio',
  'tsukurutenten',
  'tucano',
  'tuned',
  'turingmachine',
  'twelvechips',
  'twilightimperium',
  'twinkletwinkle',
  'ultimaterailroads',
  'ubongo',
  'unrest',
  'upordown',
  'vaalbara',
  'verdant',
  'verso',
  'vivacatrina',
  'wanderingtowers',
  'wizardscup',
  'wizardsgrimoire',
  'wonderfulkingdom',
  'wordtraveler',
  'yaxha',
  'zenith'
];

export const gamesWithTwoTeams = [
  'belote',
  'contractbridge',
  'fivehundred',
  'kaiser',
  'whist',
];

export const gamesWithCustomPanel = [
  'ahoy',
  'aiye',
  'apiary',
  'asteria',
  'azure',
  'cardia',
  'coatl',
  'dronesvsseagulls',
  'eminentdomain',
  'emdomicrocosm',
  'envelopesofcash',
  'festival',
  'fromage',
  'galacticera',
  'gnomehollow',
  'lesderniersdroides',
  'lumen',
  'mantisfalls',
  'maracaibo',
  'mesos',
  'mystlingacademy',
  'notalone',
  'nowboarding',
  'scythe',
  'seventhseacityoffivesails',
  'spacestationphoenix',
  'stonespinearchitects',
  'tickettoride',
  'tickettorideeurope',
  'tickettoridemaps',
  'twinpalms',
  'viticulture'
];

export const gamesWithOverlay: Record<string, string> = {
  agestofrobinhood: '',
  ancientknowledge: '',
  azulsummerpavilion: '',
  bamboozle: '',
  bunnyboom: '',
  bootydice: '',
  carnuta: '',
  cartographers: '',
  citadels: '',
  coffeerush: '',
  congkak: '',
  crybaby: '',
  drolesdezebres: '',
  fifteendays: 'fifteendays_background',
  ghostsgalore: '',
  goodfortune: '',
  ink: '',
  iye: '',
  legions: '',
  luz: '',
  malabares: '',
  mollyhouse: '',
  monstertrick: '',
  moversandshakers: '',
  nirds: '',
  pandaspin: '',
  pergola: '',
  pilipili: '',
  pinacoladice: '',
  piratesunderfire: '',
  postcards: '',
  ratsofwistar: '',
  reforest: '',
  scratchandcatch: '',
  sevenwondersdice: '',
  spiritsoftheforest: 'spiritsoftheforest_background',
  superstore: 'player-board ext-overlay',
  tacta: '',
  tapestry: '',
  thehanginggardens: '',
  toybattle: '',
  towerup: '',
  tsukurutenten: '',
  verso: '',
  wanderingtowers: '',
};

type GameName = string;
interface GamesWithCustomDarkMode {
  [gameName: GameName]: {
    className: string;
    applyGeneralCss: boolean;
  };
}

export const gamesWithCustomDarkMode: GamesWithCustomDarkMode = {
  cakemaster: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  },
  draftandwriterecords: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  },
  earth: {
    className: 'ea-background-dark',
    applyGeneralCss: true
  },
  earthabundance: {
    className: 'ea-background-dark',
    applyGeneralCss: true
  },
  hardback: {
    className: 'dark',
    applyGeneralCss: false
  },
  romirami: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  }
};

interface GamesWithCustomBackground {
  [gameName: GameName]: string[];
}

export const gamesWithConditionalCustomBackground: GamesWithCustomBackground = {
  apiary: ['custom-background'],
  azure: ['azr_pref-themedBg'],
  challengers: ['challengers-pref-background-dark'],
  challengersbeachcup: ['challengers-pref-background-dark'],
  cuttle: ['theme_cuttlefish'],
  festival: ['black-background', 'dark-wood-background'],
  fliptoons: ['custom-background'],
  gemsofiridescia: ['goi_thematicBackground'],
  ghostsgalore: ['custom_theme'],
  limit: ['vgincLib_thematic_background_on'],
  nirds: ['spicy'],
  orapamine: ['orp_pref-thematicBackground-blue', 'orp_pref-thematicBackground-red'],
  popcorn: ['pop-game-bg'],
  reforest: ['custom-background'],
  rollintotown: ['rt-pref-background-dark'],
  screampark: ['scp_pref-themedBg'],
  setup: ['setup-pref-background-dark'],
  shogi: ['shg_theme1', 'shg_theme2'],
  supermegaluckybox: ['smlb_background'],
  texasholdem: ['dark-wood-vertical-background', 'dark-wood-horizontal-background'],
  thewhitecastle: ['custom-background'],
  thirteenleaves: ['classic_theme_disabled'],
  wingspan: ['wsp_background_paper'],
};

export const gamesWithCustomPlayerStyle: { [gameName: GameName]: string } = {
  almadi: '.playgroundContainer h2',
  arboretum: '.player-table h3.title',
  butterfly: '.playerHand h3',
  colorflush: ".cfl_name",
  elawa: '.player-table .name-wrapper',
  heat: '.player-table .name-wrapper',
  heatchampionship: '.player-table .name-wrapper',
  homesteaders: '#main_container div[id^="player_name_"]',
  lineit: '.player-table .name-wrapper',
  mindup: '.player-table .name-wrapper',
  mue: '.mue_bidtablename',
  skatelegend: '.player-table .name-wrapper',
  stupormundi: '.stm_playermat_label',
  tucano: '.tuc_header',
  wizardsgrimoire: '.wg-title',
  zuuli: '.writes.lg',
  bagofchips: '#tables .name-wrapper',
  framework: '#player-tabs > .player-tab > span',
  terraformingmars: '.mfull .playerboard_side_name, .mcompact .player_area_name',
  biomos: '#playersboard div[id^="playerposition_"]',
  wonderfulkingdom: '.wk_zone_playername',
  goblinhood: '.player-table > h3',
  azulsummerpavilion: '.player-name.color',
  chemicaloverload: '.player-table > h3',
  cannonades: '.player-table .c-title',
  takenokolor: '.player-table .name',
  myshelfie: '.shelf-name',
  knister: '.knister_plname',
  splitter: '.splitter_plname',
  quartzdice: '.quartz-mining-cart-title > span',
  theguildofmerchantexplorers: '.tab_header, .player_board .player_nametag',
  aquatica: '.player-table-board h3',
  elpasogwt: '.player-board-name',
  piratas: '#playmats .playmat h3'
};

export const playersBackground: { [gameName: GameName]: string[] } = {
  forestshuffledartmoor: ['#title_{{player_id}}'],
  golems: ['#pl{{player_id}}_label'],
  goodfortune: ['#mf_playertitle_{{player_index_1}}'],
  ink: ['#player-table-{{player_id}} .name-wrapper'],
  laserreflection: ['#lrf_container_{{player_id}} .lrf_progress-bar'],
  lorenzo: ['#obrPlayerboardId_{{player_id}} .obr_playerboard_name'],
  nirds: ['#player_table_{{player_id}} .title'],
  qwinto: ['#qwinto-player-board-background-{{player_id}} .qwinto_name_tag'],
  reefgardens: ['#playerBoard[data-p-id="{{player_id}}"] #title', '#playerBoard[data-p-id="{{player_id}}"] #shells'],
  reforest: ['#re-player-area-{{player_id}} .re-player-area-name'],
  spirited: ['#sp-player-area-{{player_id}} .sp-player-area-name-spacer'],
  thegreatamericanfoxhunt: ['#TGAFH_player_{{player_id}}'],
  treos: ['#gamezone-{{player_id}} .player-board-name'],
};

export const playersBorder: { [gameName: GameName]: string[] } = {
  arboretum: ['#player-table-{{player_id}}', '#player-table-{{player_id}} h3'],
  azulsummerpavilion: ['#player-table-wrapper-{{player_id}} .player-name-box', '#player-table-wrapper-{{player_id}} .player-table'],
  bagofchips: ['#player-table-{{player_id}}'],
  bang: ['#bang-player-{{player_id}} .bang-player-container[style^="border: 2px"]'],
  bootydice: ['#tuto_pp{{player_index_1}}'],
  castlecombo: ['#player-table-{{player_id}}'],
  classifiedinformation: ['#player-guard-{{player_id}}'],
  daybreak: ['#dbk-hand{{player_id}}'],
  elawa: ['#player-table-{{player_id}}'],
  elpasogwt: ['#gamezone-{{player_id}}'],
  fled: ['#fled_player-area-{{player_id}}'],
  flowers: ['#flw_playZone_{{player_id}}'],
  forestshuffledartmoor: ['#FSDtable_{{player_id}}'],
  gemsofiridescia: ['#goi_playerZoneContainer\\:{{player_id}}'],
  heat: ['#player-table-{{player_id}}'],
  heatchampionship: ['#player-table-{{player_id}}'],
  ink: ['#player-table-{{player_id}}'],
  irishgauge: ['#player-table-{{player_id}}', '#player-table-{{player_id}} .player-table-name'],
  itsawonderfulworld: ['#iww-player{{player_id}}'],
  jumpdrive: ['#jdr-tableau-{{player_id}}'],
  kingdomino: ['.player_view[style*="border-color: #{{player_color}}"]'],
  lesderniersdroides: ['#nameZone{{player_id}}'],
  letsgotojapan: ['#playerhandtitle_{{player_id}}', '#playerhand_{{player_id}}', '#nameplayer_{{player_id}}'],
  lorenzo: ['#obrPlayerboardId_{{player_id}}'],
  mapmasters: ['#house_{{player_id}}', '#hand_grid_{{player_id}}'],
  nirds: ['#player_table_{{player_id}}'],
  pioneerdaysproject: ['#playerbox-{{player_id}}'],
  piratas: ['#playmat_{{player_id}}'],
  pixies: ['#player-table-{{player_id}}'],
  pleasedontburnmyvillage: ['.tableau-container[data-player-id="{{player_id}}"]'],
  qwinto: ['#qwinto-player-board-background-{{player_id}}'],
  refuge: ['#player-table-{{player_id}}'],
  riverofgold: ['#rog_player_delivered_resizable-{{player_id}}'],
  rumbleplanet: ['#player-table-{{player_id}}'],
  screampark: ['#scp_playerZone-{{player_id}}'],
  skatelegend: ['#player-table-{{player_id}}'],
  symbiose: ['[style*="border-top: 2px solid #{{player_color}};"]'],
  treos: ['#gamezone-{{player_id}}'],
  theguildofmerchantexplorers: ['#tab_header_board_{{player_id}}'],
  thirteenleaves: ['#overall_player_board_{{player_id}}'],
  upordown: ['#player-table-{{player_id}}'],
  verdant: ['#house_{{player_id}}'],
  welcometothemoon: ['#score-sheet-{{player_id}}', '#score-sheet-{{player_id}} .player-name'],
  wizardsgrimoire: ['.wg-title.ext_player_{{player_id}}', '#player-table-{{player_id}}-health', '#player-table-{{player_id}} .player-table'],
  yaxha: ['#pyramid-container-{{player_id}} .player-name-text .text-container'],
};

export const playersOutline: { [gameName: GameName]: string[] } = {
  crybaby: ['div[style^="outline: {{player_color_rgb}}"]', 'div[style^="outline-color: {{player_color_rgb}};"]'],
  goodfortune: ['#mf_zone_player_{{player_index_1}}'],
  pilipili: ['div[style^="outline-color: {{player_color_rgb}};"]', 'div[style^="outline: {{player_color_rgb}} solid 4px;"]'],
  spirited: ['#sp-player-area-{{player_id}} .sp-road-slot', '#sp-player-area-{{player_id}} .sp-player-area-wonders', '#sp-player-area-{{player_id}} .sp-player-area-camp>.slot'],
};

export const playersTextColor: { [gameName: GameName]: string[] } = {
  arboretum: ['#player-table-{{player_id}} h3.title'],
  azulsummerpavilion: ['#player-name-shift-{{player_id}}'],
  babydinosaurrescue: ['[style^="color:#{{player_color}}"]'],
  dontletitdie: ['[style="--color: #{{player_color}}"]', '[style*="--player-color: #{{player_color}}"]'],
  irishgauge: ['#player-table-{{player_id}} .player-table-name'],
  knarr: ['#player-table-{{player_id}}-name'],
  legions: ['#player-table-{{player_id}} .name-wrapper .name'],
  mastersofrenaissance: ['.name[id="{{player_id}}"]'],
  pleasedontburnmyvillage: ['.tableau-container[data-player-id="{{player_id}}"] .player-tableau-title'],
  roadtothreehoundred: ['#rt300_plname_{{player_id}}'],
  rowdypartners: ['[style="--player-color: #{{player_color}};"]'],
  sevenwondersdice: ['.bga-score-sheet_player-name[style="--player-color: #{{player_color}};"]'],
  skarabrae: ['.tableau[style="--player-color: #{{player_color}}"]:after', '.bga-score-sheet_player-name[style="--player-color: #{{player_color}};"]'],
  upordown: ['#player-table-{{player_id}} .player-table-name'],
};

export const gamesWithCustomColors: { [gameName: GameName]: string[] } = {
  ageofinnovation: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  altay: ['#000000', '#ebb41b', '#e12129', '#00a7d2', '#47a34b'],
  cairocorridor: ['#000000'],
  cosmoctopus: ['#20134b'],
  deadcells: ['#3c733a', '#ab3237', '#5c5aa5', '#c97014'],
  deadcellsnewcontent: ['#3c733a', '#ab3237', '#5c5aa5', '#c97014'], /* tempo */
  deliverance: ['#8b4513', '#ee0000', '#ffd700', '#007f00'],
  fiftyfirststate: ['#ff0000', '#0000ff', '#ffa500'],
  harmonies: ['#ff0000', '#008000', '#ffa500', '#0000ff'],
  imperialsettlers: ['#0000ff', '#ff0000', '#ffa500'],
  insidejob: ['#0000ff', '#ff0000', '#ffa500', '#773300', '#008000'],
  legions: ['#770405', '#097138', '#011d4d', "#522886"], /* factions text in tooltips */
  livingforestduel: ['#302879', '#32693b'],
  lumen: ['#1f3067'],
  moonlight: ['#0d383a'],
  nimalia: ['#0000ff', '#ff0000', '#ffa500', '#008000'],
  nowboarding: ['#000000'],
  pandemic: ['#252525'],
  parklife: ['#333333'],
  resist: ['#782520'],
  riverofgold: ['#000000', '#ff0000', '#008000', '#0000ff', '#ffffff'],
  siam: ['#0000ff', '#ffa500'],
  superstore: ['#2d5787', '#613d31', '#f36c45', '#8b4e6e'],
  symbiose: ['#024573'],
  tactile: ['#f10000', '#0f87da', '#f3ac11', '#6ab524'],
  thefoxintheforest: ['#5e3f85'],
  terraformingmars: ['#ff0000', '#0000ff', '#008000', '#ffa500'],
  terramystica: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  terranova: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  verdant: ['#2d3691']
};

type CustomActions = { init: (cssPath: string) => void, setDarkMode?: (darkMode: boolean) => void, isDarkMode?: () => boolean };
type GamesWithCustomActions = { [key: string]: CustomActions };
export const gamesWithCustomActions: GamesWithCustomActions = {
  earth: {
    init: () => {
      waitForObj('#ea-dark-background-checkbox').then((checkbox) => {
        if (checkbox.parentNode) {
          const checkboxContainer = checkbox.parentNode.parentNode as any;
          checkboxContainer.style.display = "none";
        }
      });
    }
  },
  earthabundance: {
    init: () => {
      waitForObj('#ea-dark-background-checkbox').then((checkbox) => {
        if (checkbox.parentNode) {
          const checkboxContainer = checkbox.parentNode.parentNode as any;
          checkboxContainer.style.display = "none";
        }
      });
    }
  },
  dronesvsseagulls: {
    init: () => {
      waitForObj('#tokens_wrap', 2000).then((elt) => {
        elt.classList.remove("whiteblock");
      });
    }
  },
  hardback: {
    setDarkMode: (darkMode: boolean) => {
      const input = document.getElementById('preference_control_101') as any;
      const newValue = (darkMode) ? "2" : "1";

      if (input.value !== newValue) {
        input.value = newValue;
        input.dispatchEvent(new Event("change"));
      }
    },
    isDarkMode: () => {
      const input = document.getElementById('preference_control_101') as any;
      return input.value == "2";
    },
    init: () => {
      const hardbackModeChange = (input: any) => {
        const button = document.getElementById('bga_extension_dark_mode_icon')?.firstChild?.firstChild as any;

        if (button) {
          if (input.value === "2" || (input.value === "0" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            (window as any).setDarkStyle(true);
          } else {
            (window as any).setDarkStyle(false);
          }
        }
      };

      Promise.all([
        waitForObj('#preference_control_101'),
        waitForObj('#preference_fontrol_101')
      ]).then(([input1, input2]) => {
        input1.addEventListener('change', () => hardbackModeChange(input1));
        input2.addEventListener('change', () => hardbackModeChange(input2));
      });
    }
  },
  hydroracers: {
    init: () => {
      document.querySelectorAll(".playerBoard .whiteblock.cockpit").forEach(elt => elt.classList.remove("whiteblock"));
    }
  },
  newfrontiers: {
    setDarkMode: (darkMode: boolean) => {
      const input = document.getElementById('preference_control_101') as any;
      input.value = (darkMode) ? "1" : "2";
      input.dispatchEvent(new Event("change"));
    },
    isDarkMode: () => {
      const input = document.getElementById('preference_control_101') as any;
      return input.value == "1";
    },
    init: () => { }
  },
  barrage: {
    init: () => {
      waitForObj('#setting-background').then((input) => {
        const barrageManageBackground = () => {
          const back = document.body.dataset.background;
          if (back === undefined) {
            setTimeout(barrageManageBackground, 50);
          } else if (back === "2") {
            document.documentElement.classList.remove("bgaext_cust_back");
          } else {
            document.documentElement.classList.add("bgaext_cust_back");
          }
        };

        input.addEventListener('change', () => setTimeout(barrageManageBackground, 100));
        barrageManageBackground();
      });
    }
  },
  newton: {
    init: (cssPath: string) => {
      const imgUrl = `${cssPath}img/tiles_sprites.png`;
      document.body.style.setProperty("--quick-action-back", `url(${imgUrl})`);
    }
  },
  beyond: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--playmat1", `url(${cssPath}img/BYD_Playmat.jpg)`);
      document.body.style.setProperty("--playmat2", `url(${cssPath}img/BYD_Playmat2.jpg)`);
    }
  },
  lesderniersdroides: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--actionIcons", `url(${cssPath}img/LDD_Cards_Icons.png)`);
      document.body.style.setProperty("--playmat", `url(${cssPath}img/background.jpg)`);
    }
  },
  formulad: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--gears", `url(${cssPath}img/gears.svg)`);
    }
  },
  reforest: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--gameBack", `url(${cssPath}img/re-background-light.jpg)`);
    }
  },
  postcards: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--gameBack", `url(${cssPath}img/background.jpg)`);
    }
  },
  ghostsgalore: {
    init: (cssPath: string) => {
      document.body.style.setProperty("--gameBack", `url(${cssPath}img/bg.jpg)`);
    }
  },
  minirogue: {
    init: () => {
      const fixSpans = () => {
        document.querySelectorAll('span.mnr-i:not([data-type])').forEach((el) => {
          const t = el.textContent.trim();
          if (t && el.getAttribute('data-type') !== t) el.setAttribute('data-type', t);
        });
      }
      waitForObj('#logs').then((container) => {
        const observer = new MutationObserver(fixSpans);

        observer.observe(container, {
          childList: true,
          subtree: true
        })
      });
    }
  },
  pleasedontburnmyvillage: {
    init: () => {
      waitForObj('.background-container').then(() => {
        const color = document.documentElement.style.getPropertyValue('--player-color');
        const darkColor = getColorForDarkMode(color);
        document.documentElement.style.setProperty('--player-color', darkColor.color);
      });
    }
  }
};