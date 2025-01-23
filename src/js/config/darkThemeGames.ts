import { getUrl } from "../utils/chrome";
import { waitForObj } from '../utils/misc/wait';

const purpleButton = 'background: linear-gradient(#9a0bb7, #782489) !important; border: 1px solid #00334d !important; color:#fff !important;';
const purpleButtonOver = 'background: linear-gradient(#c406ea, #782489) !important; color:#fff !important;';
const greenButton = 'background: linear-gradient(#0bb76c, #24895d) !important; border: 1px solid #004d05 !important; color:#fff !important;';
const greenButtonOver = 'background: linear-gradient(#06ea87, #24895d) !important; color:#fff !important;';
const yellowButton = 'background: linear-gradient(#b6b70b, #898924) !important; border: 1px solid #00334d !important; color:#fff !important;';
const yellowButtonOver = 'background: linear-gradient(#eaea06, #898924) !important; color:#fff !important;';
const blueButton = 'background: linear-gradient(180deg, #0ba9b7, #248189) !important; color:#fff !important;';
const blueButtonOver = 'background: linear-gradient(180deg, #06d7ea, #248189) !important; color:#fff !important;';
const redButton = 'background: linear-gradient(180deg, #b70b0b, #892424) !important; border: 1px solid #6a2f2f; color:#fff !important;';
const redButtonOver = 'background: linear-gradient(180deg, #ea0606, #892424) !important; color:#fff !important;';
const orangeButton = 'background: linear-gradient(180deg, #db661f, #84461f) !important; border: 1px solid #69452e; color:#fff !important;';
const orangeButtonOver = 'background: linear-gradient(180deg, #ff8e47, #84461f) !important; color:#fff !important;';
const pinkButton = 'background: linear-gradient(180deg, #db1f9c, #841f62) !important; border: 1px solid #69452e; color:#fff !important;';
const pinkButtonOver = 'background: linear-gradient(180deg, #ff47c2, #841f62) !important; color:#fff !important;';
const disabledButton = 'background: #787878 !important; border-color: var(--light-50) !important; color:#fff !important; cursor: not-allowed;';

export const gamesWithCustomBackground = [
  'afterus',
  'agestofrobinhood',
  'agricola',
  'altered',
  'ancientknowledge',
  'aniversus',
  'architectsofamytis',
  'arctic',
  'arknova',
  'arknovamw',
  'azul',
  'azulsummerpavilion',
  'bamboozle',
  'battlespiritssaga',
  'beerbread',
  'betta',
  'beyondthesun',
  'bigmonster',
  'bloodrage',
  'bossquest',
  'bunnyboom',
  'bunnykingdom',
  'cannonades',
  'canvas',
  'captainflip',
  'capybarancapybara',
  'carnegie',
  'cartographers',
  'castlecombo',
  'castlesofcaleira',
  'catinthebox',
  'caverna',
  'century',
  'chromino',
  'clashofdecks',
  'codexnaturalis',
  'concept',
  'conspiracy',
  'darwinsjourney',
  'deadcells',
  'dedale',
  'dicycards',
  'dobbleconnect',
  'dogpark',
  'dontgointhere',
  'draculahelsing',
  'draftandwriterecords',
  'duckcover',
  'dungeonpetz',
  'dvonn',
  'earth',
  'earthabundance',
  'eminentdomain',
  'emdomicrocosm',
  'equinox',
  'elawa',
  'eriantys',
  'escapethecurseofthetemple',
  'evolution',
  'expeditions',
  'explodingkittens',
  'faraway',
  'federation',
  'fifteendays',
  'finca',
  'flowersmandalagame',
  'forbiddenisland',
  'fromage',
  'gangofdice',
  'gangsta',
  'gardennation',
  'giftoftulips',
  'girafferaffe',
  'gnomehollow',
  'goblinhood',
  'goldblivion',
  'goldncrash',
  'gravitysuperstar',
  'greatsplit',
  'grund',
  'happycity',
  'harmonies',
  'heat',
  'heatchampionship',
  'insidejob',
  'itsawonderfulworld',
  'iwari',
  'jekyllvshide',
  'jumpdrive',
  'kado',
  'khiva',
  'kingoftokyo',
  'kiriaitheduel',
  'knarr',
  'krosmasterblast',
  'lasvegan',
  'lielow',
  'lineit',
  'locomomo',
  'lostexplorers',
  'lostseas',
  'lumen',
  'maatatahay',
  'mantisfalls',
  'mastersofrenaissance',
  'megajackpot',
  'memoir',
  'mexica',
  'middleages',
  'mindup',
  'mojo',
  'mountaingoats',
  'mrjack',
  'mycity',
  'mycityrb',
  'mythicbattlesragnarok',
  'newfrontiers',
  'nextstation',
  'nicodemus',
  'nidavellir',
  'nimalia',
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
  'photosynthesis',
  'pingimus',
  'pixies',
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
  'rollandbump',
  'romirami',
  'rumbleplanet',
  'safariwitness',
  'santorini',
  'scythe',
  'seasaltpaper',
  'seasons',
  'secretmoon',
  'skyteam',
  'skull',
  'similo',
  'smallworld',
  'sobektwoplayers',
  'solstis',
  'spacebase',
  'spaceempires',
  'spacestationphoenix',
  'spiritsoftheforest',
  'splendor',
  'splendorexpansions',
  'splendorduel',
  'stalkexchange',
  'stella',
  'starfluxx',
  'stonespinearchitects',
  'taluva',
  'tapestry',
  'thecrew',
  'thecrewdeepsea',
  'tickettoride',
  'tickettorideeurope',
  'tikal',
  'takenokolor',
  'talon',
  'theyellowhouse',
  'tinyturbocars',
  'trailblazers',
  'trektwelve',
  'trio',
  'tucano',
  'tuned',
  'turingmachine',
  'twelvechips',
  'twinkletwinkle',
  'ultimaterailroads',
  'unrest',
  'vaalbara',
  'wizardsgrimoire',
  'wonderfulkingdom',
  'wordtraveler',
  'zenith'
];

export const gamesWithCustomPanel = [
  'dronesvsseagulls',
  'eminentdomain',
  'emdomicrocosm',
  'envelopesofcash',
  'festival',
  'fromage',
  'gnomehollow',
  'lumen',
  'mantisfalls',
  'maracaibo',
  'notalone',
  'nowboarding',
  'scythe',
  'sevenwondersarchitects',
  'spacestationphoenix',
  'stonespinearchitects',
  'tickettoride',
  'tickettorideeurope',
  'twinpalms',
  'viticulture'
];

export const gamesWithCustomDarkMode = {
  hardback: {
    className: 'dark',
    applyGeneralCss: false
  },
  earth: {
    className: 'ea-background-dark',
    applyGeneralCss: true
  },
  earthabundance: {
    className: 'ea-background-dark',
    applyGeneralCss: true
  },
  romirami: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  },
  draftandwriterecords: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  },
  twilightimperium: {
    className: 'dark',
    applyGeneralCss: false
  },
};

export const gamesWithCustomPlayerStyle = {
  almadi: '.playgroundContainer h2',
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
  theguildofmerchantexplorers: '.tab_header, .player_board .player_nametag'
};

export const playersBackground = {
  golems: ['#pl{{player_id}}_label'],
  laserreflection: ['#lrf_container_{{player_id}} .lrf_progress-bar'],
  thegreatamericanfoxhunt: ['#TGAFH_player_89123556'],
  treos: ['#gamezone-{{player_id}} .player-board-name'],
};

export const playersBorder = {
  bagofchips: ['#player-table-{{player_id}}'],
  bang: ['#bang-player-{{player_id}} .bang-player-container[style^="border: 2px"]'],
  castlecombo: ['#player-table-{{player_id}}'],
  daybreak: ['#dbk-hand{{player_id}}'],
  elawa: ['#player-table-{{player_id}}'],
  flowers: ['#flw_playZone_{{player_id}}'],
  gemsofiridescia: ['#goi_playerZoneContainer\\:{{player_id}}'],
  heat: ['#player-table-{{player_id}}'],
  heatchampionship: ['#player-table-{{player_id}}'],
  itsawonderfulworld: ['#iww-player{{player_id}}'],
  jumpdrive: ['#jdr-tableau-{{player_id}}'],
  letsgotojapan: ['#playerhandtitle_{{player_id}}', '#playerhand_{{player_id}}', '#nameplayer_{{player_id}}'],
  pixies: ['#player-table-{{player_id}}'],
  refuge: ['#player-table-{{player_id}}'],
  riverofgold: ['#rog_player_delivered_resizable-{{player_id}}'],
  rumbleplanet: ['#player-table-{{player_id}}'],
  skatelegend: ['#player-table-{{player_id}}'],
  treos: ['#gamezone-{{player_id}}'],
  theguildofmerchantexplorers: ['#tab_header_board_{{player_id}}'],
  wizardsgrimoire: ['.wg-title.ext_player_{{player_id}}', '#player-table-{{player_id}}-health', '#player-table-{{player_id}} .player-table'],
};

export const gamesWithCustomColors = {
  ageofinnovation: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  cosmoctopus: ['#20134b'],
  deadcells: ['#3c733a', '#ab3237', '#5c5aa5', '#c97014'],
  deliverance: ['#8b4513', '#ee0000', '#ffd700', '#007f00'],
  harmonies: ['#ff0000', '#008000', '#ffa500', '#0000ff'],
  insidejob: ['#0000ff', '#ff0000', '#ffa500', '#773300', '#008000'],
  lumen: ['#1f3067'],
  nimalia: ['#0000ff', '#ff0000', '#ffa500', '#008000'],
  nowboarding: ['#000000'],
  pandemic: ['#252525'],
  parklife: ['#333333'],
  resist: ['#782520'],
  riverofgold: ['#000000', '#ff0000', '#008000', '#0000ff', '#ffffff'],
  superstore: ['#2d5787', '#613d31', '#f36c45', '#8b4e6e'],
  thefoxintheforest: ['#5e3f85'],
  terraformingmars: ['#ff0000', '#0000ff', '#008000', '#ffa500'],
  terramystica: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  terranova: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
};

export const gamesWithRecommandedConfig = {
  abyss: { color: 226, sat: 16 },
  agricola: { color: 100, sat: 12 },
  architectsofamytis: { color: 16, sat: 10 },
  arknova: { color: 33, sat: 15 },
  arknovamw: { color: 33, sat: 15 },
  bauer: { color: 0, sat: 15 },
  beerbread: { color: 25, sat: 22 },
  betta: { color: 180, sat: 20 },
  beyondthesun: { color: 197, sat: 35 },
  bigmonster: { color: 241, sat: 32 },
  carnegie: { color: 169, sat: 10 },
  cartographers: { color: 20, sat: 15 },
  captainflip: { color: 193, sat: 39 },
  capybarancapybara: { color: 97, sat: 15 },
  castlecombo: { color: 190, sat: 23 },
  catan: { color: 210, sat: 16 },
  century: { color: 25, sat: 16 },
  challengers: { color: 100, sat: 16 },
  conspiracy: { color: 226, sat: 16 },
  cosmosempires: { color: 233, sat: 27 },
  dedale: { color: 25, sat: 16 },
  dicedveggies: { color: 25, sat: 16 },
  dicycards: { color: 146, sat: 15 },
  dobro: { color: 216, sat: 25 },
  earth: { color: 130, sat: 20 },
  enemyanemone: { color: 220, sat: 32 },
  expeditions: { color: 200, sat: 32 },
  feastforodin: { color: 13, sat: 6 },
  festival: { color: 14, sat: 15 },
  finca: { color: 220, sat: 32 },
  forbiddenisland: { color: 216, sat: 20 },
  gardennation: { color: 110, sat: 22 },
  girafferaffe: { color: 7, sat: 9 },
  gnomehollow: { color: 116, sat: 12 },
  goldblivion: { color: 135, sat: 15 },
  happycity: { color: 219, sat: 25 },
  harmonies: { color: 16, sat: 15 },
  harvest: { color: 128, sat: 22 },
  insidejob: { color: 105, sat: 10 },
  kado: { color: 30, sat: 15 },
  locomomo: { color: 91, sat: 14 },
  lielow: { color: 13, sat: 15 },
  lineit: { color: 250, sat: 28 },
  lostseas: { color: 195, sat: 22 },
  lostexplorers: { color: 25, sat: 22 },
  mycity: { color: 25, sat: 22 },
  mycityrb: { color: 25, sat: 22 },
  nimalia: { color: 220, sat: 30 },
  noah: { color: 220, sat: 22 },
  oriflamme: { color: 202, sat: 55 },
  origin: { color: 110, sat: 15 },
  pacifica: { color: 180, sat: 22 },
  paxrenaissance: { color: 25, sat: 15 },
  pescadonovo: { color: 110, sat: 4 },
  pixies: { color: 95, sat: 15 },
  powervacuum: { color: 0, sat: 15 },
  regicide: { color: 165, sat: 15 },
  rumbleplanet: { color: 175, sat: 15 },
  similo: { color: 115, sat: 10 },
  scythe: { color: 28, sat: 12 },
  seasaltpaper: { color: 225, sat: 28 },
  seasons: { color: 0, sat: 10 },
  splendor: { color: 220, sat: 22 },
  splendorexpansions: { color: 220, sat: 22 },
  survive: { color: 225, sat: 28 },
  tapestry: { color: 220, sat: 22 },
  thefoxintheforest: { color: 0, sat: 8 },
  theyellowhouse: { color: 0, sat: 8 },
  trailblazers: { color: 130, sat: 22 },
  tucano: { color: 138, sat: 15 },
  turingmachine: { color: 120, sat: 15 },
  twelvechips: { color: 164, sat: 15 },
  ultimaterailroads: { color: 8, sat: 15 },
};

const manageBackground = (defBackClass: string, otherBackClasses: string[]) => {
  const defBackFound = document.documentElement.classList.contains(defBackClass);
  const otherBackFound = otherBackClasses.find(c => document.documentElement.classList.contains(c));

  if (!defBackFound && !otherBackFound) {
    setTimeout(() => manageBackground(defBackClass, otherBackClasses), 50);
  } else if (defBackFound) {
    document.documentElement.classList.remove("bgaext_cust_back");
  } else {
    document.documentElement.classList.add("bgaext_cust_back");
  }
};

const addInvertOverlay = (className: string, copyDefaultStyle: boolean) => {
  waitForObj('#overall-content', 5).then(overallContent => {
    const overlay = document.createElement("DIV");
    overlay.className = `bgaext_overlay ${className}`;
    overlay.style.position = 'absolute';
    overlay.style.top = '0px';
    overlay.style.left = '0px';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.filter = 'invert(1)';
    if (copyDefaultStyle) {
      let htmlStyle = getComputedStyle(document.documentElement).background;
      if (htmlStyle.indexOf('back-main_games') > 0) {
        htmlStyle = getComputedStyle(document.body).background;
      }
      overlay.style.background = htmlStyle;
    }
    overallContent.insertBefore(overlay, overallContent.firstChild);
  });
};

export const gamesWithCustomActions = {
  earth: {
    init: () => {
      const checkbox = document.getElementById("ea-dark-background-checkbox") as any;
      const checkboxContainer = checkbox.parentNode.parentNode as any;
      checkboxContainer.style.display = "none";
    }
  },
  earthabundance: {
    init: () => {
      const checkbox = document.getElementById("ea-dark-background-checkbox") as any;
      const checkboxContainer = checkbox.parentNode.parentNode as any;
      checkboxContainer.style.display = "none";
    }
  },
  dronesvsseagulls: {
    init: () => {
      document.getElementById("tokens_wrap")?.classList.remove("whiteblock");
    }
  },
  hardback: {
    setDarkMode: (darkMode: boolean) => {
      const input = document.getElementById('preference_control_101') as any;
      input.value = (darkMode) ? "2" : "1";
      input.dispatchEvent(new Event("change"));
    },
    isDarkMode: () => {
      const input = document.getElementById('preference_control_101') as any;
      return input.value == "2";
    },
    init: () => {
      const input1 = document.getElementById('preference_control_101') as any;
      const input2 = document.getElementById('preference_fontrol_101') as any;

      const hardbackModeChange = (input: any) => {
        const button = document.getElementById('bga_extension_dark_mode_icon')?.firstChild?.firstChild as any;

        if (button) {
          if (input.value === "2" || (input.value === "0" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            button.classList.remove('fa-sun-o');
            button.classList.add('fa-moon-o');
          } else {
            button.classList.add('fa-sun-o');
            button.classList.remove('fa-moon-o');
          }
        }
      };

      input1.addEventListener('change', () => hardbackModeChange(input1));
      input2.addEventListener('change', () => hardbackModeChange(input2));
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
  supermegaluckybox: {
    init: () => {
      manageBackground("smlb_bga_background", ["smlb_background"]);
    }
  },
  wingspan: {
    init: () => {
      const input1 = document.getElementById('preference_control_101') as any;
      const input2 = document.getElementById('preference_fontrol_101') as any;
      const wingManageBackground = () => {
        if (!document.documentElement.classList.contains("wsp_birdtray_default") && !document.documentElement.classList.contains("wsp_birdtray_largecards")) {
          setTimeout(wingManageBackground, 50);
        } else if (document.documentElement.classList.contains("wsp_background_paper")) {
          document.documentElement.classList.add("bgaext_cust_back");
        } else {
          document.documentElement.classList.remove("bgaext_cust_back");
        }
      };

      input1.addEventListener('change', () => setTimeout(wingManageBackground, 500));
      input2.addEventListener('change', () => setTimeout(wingManageBackground, 500));
      wingManageBackground();
    }
  },
  festival: {
    init: () => {
      const festManageBackground = () => manageBackground("no-custom-background", ["black-background", "dark-wood-background"]);
      const input = document.getElementById('fes-background2') as any;

      input.addEventListener('change', () => setTimeout(festManageBackground, 1));
      festManageBackground();
    }
  },
  barrage: {
    init: () => {
      const input = document.getElementById('setting-background') as any;
      const barrageManageBackground = () => {
        const back = document.body.dataset.background;
        if (back == undefined) {
          setTimeout(manageBackground, 50);
        } else if (back === "2") {
          document.documentElement.classList.remove("bgaext_cust_back");
        } else {
          document.documentElement.classList.add("bgaext_cust_back");
        }
      };

      input.addEventListener('change', () => setTimeout(barrageManageBackground, 1));
      barrageManageBackground();
    }
  },
  challengers: {
    init: () => {
      manageBackground("challengers-pref-background-normal", ["challengers-pref-background-dark"]);
    }
  },
  rollintotown: {
    init: () => {
      const input1 = document.getElementById('preference_control_101') as any;
      const input2 = document.getElementById('preference_fontrol_101') as any;
      const rollManageBackground = () => manageBackground("rt-pref-background-normal", ["rt-pref-background-dark"]);

      input1.addEventListener('change', () => setTimeout(rollManageBackground, 500));
      input2.addEventListener('change', () => setTimeout(rollManageBackground, 500));
      rollManageBackground();
    }
  },
  setup: {
    init: () => {
      const input1 = document.getElementById('preference_control_103') as any;
      const input2 = document.getElementById('preference_fontrol_103') as any;
      const setupManageBackground = () => manageBackground("setup-pref-background-normal", ["setup-pref-background-dark"]);

      input1.addEventListener('change', () => setTimeout(setupManageBackground, 500));
      input2.addEventListener('change', () => setTimeout(setupManageBackground, 500));
      setupManageBackground();
    }
  },
  texasholdem: {
    init: () => {
      manageBackground("", ["dark-wood-vertical-background", "dark-wood-horizontal-background"]);
    }
  },
  spiritsoftheforest: {
    init: () => addInvertOverlay('spiritsoftheforest_background', false)
  },
  bamboozle: {
    init: () => addInvertOverlay('', true)
  },
  fifteendays: {
    init: () => addInvertOverlay('fifteendays_background', false)
  },
  tapestry: {
    init: () => addInvertOverlay('', true)
  },
  superstore: {
    init: () => addInvertOverlay('player-board ext-overlay', false)
  },
  pandaspin: {
    init: () => addInvertOverlay('', true)
  },
  ratsofwistar: {
    init: () => addInvertOverlay('', true)
  },
  gemsofiridescia: {
    init: () => {
      manageBackground('', ['goi_thematicBackground']);
    }
  },
  bunnyboom: {
    init: () => addInvertOverlay('', true)
  },
};

const _darkStyleForGame = {};
const _styleForGame = {};

_darkStyleForGame['abyss'] = `
.playmat_on body { background: none !important; background-color: #081020 !important; }
#krakenToken, #scourgeToken { filter: var(--highlight); }
.icon { filter: var(--highlight-min); }
.icon-key { filter: var(--highlight); }
.icon-lord { border-radius: 50%; }
.player-panel .player-name { text-shadow: none; }
#gameplay-options { background-color: #0e0e3f; }
.dijitTooltipContainer [style="color: blue"], #logs [style="color:blue"] { color: #6666ff !important; }
.dijitTooltipContainer [style*="background-color: blue;"] { background-color: #6666ff !important; }
.dijitTooltipContainer [style="color: purple"], #logs [style="color:purple"] { color: #cc00cc !important; }
.dijitTooltipContainer [style*="background-color: purple;"] { background-color: #cc00cc !important; }
.abs-tooltip-leviathan table td, .abs-tooltip-leviathan table th { border: 1px solid var(--light-50); }
#conspiracy-help-button { color: #000; }
`;

_styleForGame['affonorwegians'] = `
#ffo-action-board-holder { padding-left: 16px; }
.ffo-card.ffo-card-weapon-bow { background-position: 33.5% 0 }
.ffo-card.ffo-card-weapon-snare { background-position: 44.9% 0; }
.ffo-card.ffo-card-weapon-spear { background-position: 56.15% 0 }
.ffo-card.ffo-card-weapon-sword { background-position: 67.4% 0 }
`;

_darkStyleForGame['affonorwegians'] = `
.ffo-pref-background #overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.ffo-pref-background header, .ffo-pref-background body { background: none !important; }
.player-name .ffo-icon-eye { filter: invert(0.8); }
#ffo-modal #ffo-modal-content { background-color: var(--dark-back); border: 1px solid var(--dark-40); }
#feast-for-odin .ffo-tab { background-color: var(--dark-10); }
#feast-for-odin .ffo-tab:hover { background-color: var(--dark-30); }
.ffo-num-vp-token { background-color: var(--dark-10); color: var(--light-80); }
.ffo-player-board-main .ffo-player-name { background-color: var(--dark-back) !important; }
.ffo-player-board-main .ffo-player-name span:first-child, .ffo-player-board-main .ffo-player-name span:last-child { color: var(--light-80) !important; }
.ffo-main-resources .ffo-good, #logs .ffo-good.ffo-icon { filter: var(--drop-shadow-min); }
table.ffo-score-table thead th { background-color: var(--dark-30); color: var(--light-80); }
table.ffo-score-table { background-color: var(--dark-40); color: var(--light-80); }
table.ffo-score-table tr[style="border-top: 1px solid black"], table.ffo-score-table tr[style="border-top: 3px double black"] { border-color: var(--light-50) !important; }
`;

_darkStyleForGame['afterus'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.icon { filter: var(--highlight-min); }
.object-tooltip .label, .object-tooltip .title { color: #75b9d7; }
`;

_darkStyleForGame['ageofchampagne'] = `
body { background: none !important; }
#player_boards .AOCsvg { filter: var(--highlight); }
#player_boards .AOCplayer-PP:after { color: #fff; }
.dijitTooltipContainer img:not([src$="ACQUIRING_A_VINEYARD.svg"]) { filter: invert(1); }
#logs img[style="height:30px;vertical-align:middle;margin:0 10px;"] { filter: invert(1); }
`;

_darkStyleForGame['ageofcivilization'] = `
.aoc_icon, .meeple  { filter: var(--highlight-min); }
.actbot, .actmain, .civbot, .civmain, .techtooltip, .civtitle { color: var(--dark-10); }
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['ageofinnovation'] = `
#game_board:before, #cult_board:before { content: ""; background: #0000001a; position: absolute; width: 100%; height: 100%; }
#drafting_players { background-color: var(--dark-30); }
#drafting_players table { color: var(--light-80); }
.faction_supply, .player_collections { background-color: var(--dark-back); }
.player_faction { color: var(--light-80); text-shadow: none; }
.control_box { background-color: var(--dark-10); }
.fp_container { text-shadow: 3px 0 3px var(--blue-50), 0 -3px 3px var(--blue-50), 0 3px 3px var(--blue-50), -3px 0 3px var(--blue-50); }
.fp_container_passed { text-shadow: 3px 0 3px #555, 0 -3px 3px #555, 0 3px 3px #555, -3px 0 3px #555 !important; }
`;

_darkStyleForGame['agestofrobinhood'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
#overall-content { color: var(--light-80); }
#information_button .information_modal_icon { filter: invert(0.7); }
#popin_settings_modal, #popin_information_modal { background-color: #62411e; }
#popin_settings_modal h2, #popin_information_modal h2 { background: #433423; color: #fff; }
#popin_settings_modal_close, #popin_information_modal_close { background-color: #62411e !important; }
#setting_modal_content, #information_modal_content { color: var(--light-80); }
.information_modal #information_modal_content .gest_arrow { filter: grayscale(1) invert(1); }
.gest_plots_and_deeds_container:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; border-radius: 4px; }
.gest_plots_and_deeds_container { border: 1px solid var(--light-50); }
.gest_plots_and_deeds_container[data-side=robinHood] { background-color: #39382d; }
.gest_plots_and_deeds_container[data-side=sheriff] { background-color: #333333; }
#info_panel #gest_ballad_info { border-bottom: 1px solid var(--light-50); }
`;

_darkStyleForGame['agricola'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
.player-name > svg { filter: invert(0.7); }
#player_boards > div { background-color: #000000CC !important; }
.dijitTooltipContainer .action-header, .dijitTooltipContainer .action-desc { color: #000 !important; }
#logs .meeple-container, #player_boards .meeple-container, .harvest-icon { filter: var(--drop-shadow); }
.player-card .player-card-resizable .player-card-inner { filter: brightness(0.9); color: #000; }
.player-board-wrapper .player-board-holder .player-board-name { background-color: var(--dark-back); }
#logs .log.cancel .roundedbox { background-color: var(--dark-40) !important; }
#logs .log.notif_startNewTurn .roundedbox { background: var(--dark-0); }
#popin_showExchanges:before, #popin_showHelpsheet:before, #popin_showSeedPrompt:before, #popin_showTour:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-radius: 16px; }
#popin_showExchanges h2, #popin_showHelpsheet h2, #popin_showSeedPrompt h2, #popin_showTour h2 { position: relative; color: var(--light-80); background: var(--dark-20); }
#popin_showExchanges #popin_showExchanges_contents, #popin_showHelpsheet #popin_showHelpsheet_contents, #popin_showTour_contents { position: relative; }
#popin_showExchanges #popin_showExchanges_contents #exchanges-discard-header h3 { color: var(--light-80); background: var(--dark-20); }
#popin_showExchanges #popin_showExchanges_contents #exchanges-reserve { background: var(--dark-30); color: var(--light-80); }
#popin_showExchanges #popin_showExchanges_contents #exchanges-dialog-footer { background-color: var(--dark-20); border-top: 1px solid var(--dark-40); }
#popin_showExchanges #popin_showExchanges_contents #exchanges-container #exchanges-grid button.exchange-desc { background-color: var(--dark-20); }
#popin_showExchanges #popin_showExchanges_contents #exchanges-container #exchanges-grid button.exchange-desc:hover { background-color: var(--dark-0); }
#popin_showExchanges #popin_showExchanges_contents #exchanges-container #exchanges-grid button.exchange-desc:not(:disabled) .meeple-arrow { filter: invert(0.7); }
#popin_showScores { background-color: var(--dark-20); }
#popin_showScores #popin_showScores_contents table tbody tr:nth-child(odd) { background-color: var(--dark-40); }
#popin_showScores_contents { color: var(--light-80); }
#popin_showScores #popin_showScores_contents table tbody tr td .scoring-entry i, #popin_showScores #popin_showScores_contents table tbody tr td .scoring-subentry i { color: var(--light-70); }
#popin_showExchanges #popin_showExchanges_contents, #popin_showHelpsheet #popin_showHelpsheet_contents, #popin_showTour_contents, #popin_showHand .agricola_popin_closeicon { z-index: 1; }
.resources-bar-holder .agricola-player-pannel:before, #popin_showHand_contents:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; border-radius: 8px; top:0px; left: 0px; }
.resources-bar-holder .agricola-player-pannel { border:none; color: var(--light-80); }
.player-board-wrapper .player-board-holder .resources-bar-holder.active .player-board-name { background-color: var(--dark-20); }
#draft-wrapper .draft-title h4 { background: var(--dark-back); color: var(--light-80); border: 1px solid var(--dark-40); }
#draft-wrapper #draft-container, #draft-wrapper #hand-container, #alternative-hand-wrapper #hand-container, #player-boards.player-boards-right #player-boards-left-column #hand-container { background: var(--dark-back); border: 1px solid var(--dark-40); }
.player-board-wrapper .player-board-holder { border: 1px dashed var(--light-50); }
#add-board { border: 1px dashed var(--light-50); border-left: none; }
#left-board, #central-board { filter: contrast(1.1) opacity(0.9); }
#btnUndoLastStep { ${yellowButton} }
#btnUndoLastStep:hover { ${yellowButtonOver} }
`;

_darkStyleForGame['akeruption'] = `
#txtHand { color: #fff; }
`;

_darkStyleForGame['aknile'] = `
#playArea, #txtHand, #txtStorage { color: var(--light-80); }
`;

_darkStyleForGame['akropolis'] = `
.player-table .name-wrapper, #market #remaining-stacks { background: var(--dark-back); }
#athena-contruction-spaces .athena-contruction-space .construction-card .desc { overflow: hidden; }
`;

_darkStyleForGame['alakablast'] = `
.main { color: var(--light-80); }
.help-cards-button { filter: invert(1); }
.discard-table { background-color: var(--dark-30); }
`;

_darkStyleForGame['alhambra'] = `
.alhambra-wrapper h3:before, #popin_moneyDialog:before { background: var(--dark-20); }
.alhambra-stat.stat-1 { color: #4d4dff; }
#popin_moneyDialog { color: #fff; }
.player-name[style="color: #000000"], .alhambra-block[style="color:#000000"] { text-shadow: var(--text-w-shadow); }
#board-wrapper, #player-aid-wrapper, .building-tile { filter: brightness(0.9); }
.alhambra-wrapper:before, #player-stock:before { background-image: none; background-color: var(--dark-40); }
.alhambra-stats .alhambra-stat.stat-1, .buildingtype.buildingtype_1, .moneytype.moneytype_3 { color: var(--blue-50); }
.alhambra-stats .alhambra-stat.stat-2, .buildingtype.buildingtype_2 { color: var(--red-30); }
.alhambra-stats .alhambra-stat.stat-6, .buildingtype.buildingtype_6 { color: var(--violet-80); }
#scoring_panel .round_scoring { background-color: var(--dark-20); }
`;

_darkStyleForGame['almadi'] = `
#deckHeader { color: #fff; }
#charactersDeckZone, #playerHandZone { background-color: var(--dark-back); color: #fff; }
.character { box-shadow: none; filter: var(--drop-shadow); }
.playgroundContainer { background-color: var(--dark-back); }
.jars-icone, .mosaic-icone, .objective-icone, .ruby-icone, .stall-icone { filter: var(--drop-shadow); }
.helper_container { background-color: var(--dark-20); color: #fff; }
.helperLine { background-color: var(--dark-30); }
.helper_container table, td, tr { background-color: #000; border: 1px solid #fff; }
.helperHeader div, .helperIcone { filter: var(--highlight-min); }
`;

_darkStyleForGame['altered'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.tooltip-arrow { border-bottom: 10px solid var(--light-50); }
.tooltip-arrow:before { border-bottom: 10px solid var(--dark-20); }
.altered-tooltip .card-tooltip-frame { background: var(--dark-20); border: 1px solid var(--light-50); }
[data-popper-placement=top] .tooltip-arrow { border-top: 10px solid var(--light-50); }
[data-popper-placement=top] .tooltip-arrow:before { border-top: 10px solid var(--dark-20); }
[data-popper-placement=right] .tooltip-arrow { border-right: 10px solid var(--light-50); }
[data-popper-placement=right] .tooltip-arrow:before { border-right: 10px solid var(--dark-20); }
[data-popper-placement=left] .tooltip-arrow { border-left: 10px solid var(--light-50); }
[data-popper-placement=left] .tooltip-arrow:before { border-left: 10px solid var(--dark-20); }
#logs .log.notif_newPhase .roundedbox, .chatwindowlogs_zone .log.notif_newPhase.roundedbox { background: var(--dark-10); }
#altered-board-overlay #altered-overlay-content .action-button.bgabutton_blue, #btnConfirmChoice, #btnSupportAbility { ${yellowButton} }
#altered-board-overlay #altered-overlay-content .action-button.bgabutton_blue:hover, #btnConfirmChoice:hover, #btnSupportAbility:hover { ${yellowButtonOver} }
#altered-main-container #altered-board-resizable #altered-board, #overlay-deck-container { filter: brightness(0.9); }
`;

_darkStyleForGame['amalfi'] = `
.playerIcons_line_4, .playerIcons_line_5 { background-color: var(--dark-10); }
.playerResourceBlock p { text-shadow: 2px 0 2px #00000099, 0 -2px 2px #00000099, 0 2px 2px #00000099, -2px 0 2px #00000099; }
.amf_tooltip_header > span[style*="color: #666666"] { color: #999999 !important; }
`;

_darkStyleForGame['amazonas'] = `
#turncounter { color: var(--light-80); }
.gold, .silver { border-radius: 50%; }
`;

_darkStyleForGame['amerigo'] = `
#generalreserve { background: var(--dark-back); }
#generalreserve h3, .amg_playerreserve h3, .amg_playersupply h3 { font-weight: normal; color: #fff; }
.amg_playersection { background: var(--dark-20); }
.amg_playerreserve, .amg_playersupply { background: var(--dark-40); }
.amg_miniboard_counter { background: var(--dark-40); border-color: var(--dark-40);}
.amg_miniboard_subgroup .amg_token24.amg_chest { filter: var(--highlight-min); }
.amg_player_tabs a { background-color: #000; background-image: linear-gradient(180deg,#000,#444); text-shadow: none; color: #fff; }
.amg_player_tabs a:focus,.amg_player_tabs a:focus:after { background: #000; }
.amg_player_tabs a:after { background: #000; background-image: linear-gradient(180deg,#000,#444); }
.amg_player_tabs .amg_current a,.amg_player_tabs .amg_current a:after { background: #000; }
.amg_player_tabs a:hover,.amg_player_tabs a:hover:after { background: #000; }
.amg_playersubsection { background: var(--dark-0); }
.amg_player_order { color: #000; }
.amg_counter_icon { filter: var(--highlight-min); }
.amg_token24.amg_vp { filter: grayscale(1) invert(1); }
.amg-gear { filter: invert(0.7); }
#amg_overlay { background: var(--dark-back); }
#token_look { background-color: var(--dark-20); }
.amg_look_zone { background-color: #ffffff1a; box-shadow: 0 3px 8px #7b7b7b; }
.amg_look_zone_title { color: var(--light-80); }
@media (hover: hover) and (pointer: fine) { .amg_clickable:hover, .amg_selected:hover, .amg_silentclickable:hover { fill: #272a2f40; background-color: #272a2f40; } }
#goldpicker { border: 1px solid var(--light-50); }
#goldadd { cursor: pointer; ${blueButton} }
#goldadd:hover { ${blueButtonOver} }
#goldremove { cursor: pointer; ${orangeButton} }
#goldremove:hover { ${orangeButtonOver} }
#goldadd.amg_buttondisabled, #goldremove.amg_buttondisabled { background: var(--dark-40) !important; cursor: default; }
.scorenumber { text-shadow: 1px 0 1px #000, 0 -1px 1px #000, 0 1px 1px #000, -1px 0 1px #000; }
#amg_scoring_zone { background-color: var(--dark-10); }
`;

_darkStyleForGame['amyitis'] = `
#page-content { color: var(--light-80); }
`;

_darkStyleForGame['anachrony'] = `
.playeroverall { background: var(--dark-back); color: #fff; }
.anaicon { filter: var(--highlight-min) !important; }
`;

_styleForGame['ancientknowledge'] = `
#help-dialog-content { overflow-x: hidden; }
`;

_darkStyleForGame['ancientknowledge'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.bga-help_button, .bga-help_unfolded-content { filter: invert(1); box-shadow: 3px 5px 5px 0 #fff; }
.icon-technology-writing:before { color: #b7827b; }
.player-table, #help-popin .help-icon-line { background: var(--dark-back); }
#table-center .fold-button .fold-button-arrow { background: var(--dark-10); border-radius: 24px; }
.bga-cards_deck-counter.round { background: var(--dark-10); color: var(--light-80); }
.player-table .timeline .slot { background: hsla(0,0%,100%,.1); }
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['aniversus'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.element_token { border-radius: 50%; }
.player-name { text-shadow: none !important; }
.tooltip_ability_left, .tooltip_ability_right { background-color: var(--dark-20); border-radius: 8px; }
.notetextred { color: #ff6666; }
.li-item.type { color: var(--blue-50); }
.action-inline-image, .element_action_token, .element_draw_token, .element_hand_token { filter: var(--highlight); }
`;

_darkStyleForGame['auntiemildred'] = `
.pb_icon { filter: invert(0.9); }
`;

_darkStyleForGame['apocalypseazcc'] = `
.bgae_panel .bgae_content .panel { background-color: var(--dark-back); opacity: 1; }
.counter_prefix, .counter_value, .counter_suffix { color: var(--light-80) !important; }
`;

_darkStyleForGame['applejack'] = `
body { background: none !important; }
#zoomplus, #zoomminus, #zoomcenter { color: var(--light-80); }
.aj_sprite { filter: var(--drop-shadow); }
.aj_playerBlock > div > h3 { background-color: var(--dark-20) !important; }
#player_boards .plPanelSpan { color: #000; }
`;

_darkStyleForGame['architectsofamytis'] = `
#actUndo-btn { ${redButton} }
#actUndo-btn:hover { ${redButtonOver} }
.aoa-tiles-counter { background-color: var(--dark-10); border-color: var(--light-80); color: var(--light-80); }
.aoa-pawn[data-color="000000"] { border: 1px solid #fff; border-radius: 50%; }
`;

_darkStyleForGame['architectsofthewestkingdom'] = `
.playeroveroverall { background-color: var(--dark-back); }
#logs .arcicon, #player_boards .arcicon { filter: var(--highlight-min); }
`;

_darkStyleForGame['arctic'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#pagemaintitletext .arc_picto_wrapper, .dijitTooltip .arc_picto_wrapper { filter: invert(1) grayscale(1) brightness(5); }
.darkmode  #page-title, .arc_whiteblock, .player-board:not(#controls3d_wrap) { background-color: var(--dark-back) !important; }
#maingameview_menufooter { background: var(--dark-10) !important; }
.stockitem_unselectable[style*="border: 1px solid rgb(255, 0, 0);"] { border: 1px solid #ff3333 !important; box-shadow: #ff3333 7px 7px 7px 0px !important; }
.stockitem_unselectable[style*="border: 1px solid rgb(0, 128, 0);"] { border: 1px solid #090 !important; box-shadow: #090 7px 7px 7px 0px !important; }
.stockitem_unselectable[style*="border: 1px solid rgb(0, 0, 255);"] { border: 1px solid #6666ff !important; box-shadow: #6666ff 7px 7px 7px 0px !important; }
.stockitem_unselectable[style*="border: 1px solid rgb(255, 165, 0));"] { border: 1px solid #805300 !important; box-shadow: #805300 7px 7px 7px 0px !important; }
.arc_unavailable:before { background-color: #00000099; }
`;

_darkStyleForGame['arcticscavengers'] = `
.scv-pile-count { color: #fff; }
.dijitTooltipContents,.standard_popin { filter: none; color: var(--light-80); }
.dijitTooltipContents .scv-icon, .standard_popin .scv-icon, .scv-card-stats .scv-card-stat.scv-card-stat-add .scv-card-stat-value { filter: none; }
.dijitTooltipContents h3:before, .standard_popin h3:before { background-color: #fff; border: 2px solid #fff; color: #000; }
`;

_darkStyleForGame['artdecko'] = `
.adk-marketRating { color: #fff; }
.player_board_inner .adk-icon-ribbon, .player_board_inner .player_score_value { color: #000; }
[style="color:#bdbcbc"],[style="color: #bdbcbc"] { color: ##999999!important; }
.adk-values .adk-value { background-color: var(--dark-20); }
.adk-values .adk-value span { color: #fff; }
`;

_darkStyleForGame['arknova'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left:0px; }
.zoo-map-board-background:before, #association-board:before, #workers-reserves:before, #studbooks:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left:0px; }
.zoo-map-board-background, #association-board, #workers-reserves { position: relative; }
.player-board-cards, .player-board-action-cards, #base-projects-holder, #projects-holder { background: var(--dark-20) !important; }
.player-board-cards .player-board-inPlay-animals, .player-board-cards .player-board-inPlay-sponsors,
#association-board-resizable #association-board-container #base-projects-holder .project-holder, #association-board-resizable #association-board-container #projects-holder .project-holder { background: var(--dark-40); }
.player-name > svg { filter: invert(0.8); }
.ark-log-card-name { color: #fffafb; }
.dijitTooltipContainer .arknova-icon, .dijitTooltipContainer .arknovamw-icon { filter: var(--highlight); }
.dijitTooltipContainer .ark-card-bottom, .dijitTooltipContainer .arknova-bonus,
.ark-card .ark-card-wrapper .ark-card-middle .ark-card-title-wrapper .ark-card-subtitle,
.ark-card .ark-card-wrapper .ark-card-middle .ark-card-number, .player-info .handCount-holder .scoringHandCount-holder { color: #000; }
#logs .log.cancel .roundedbox { background-color: #000 !important; }
.player-board-cards .player-board-hand, .player-board-cards .player-board-scoring-hand { background: var(--dark-back); }
.ark-card.zoo-card, .arknova-meeple, .arknova-icon, .building-container, .upgradeNeeded-marker, .zoo-map-association, .zoo-map-bonus-spaces, #reputation-track { filter: brightness(0.95); }
.bgabutton_red { ${redButton} }
.bgabutton_red:hover { ${redButtonOver} }
#btnUndoLastStep { ${orangeButton} }
#btnUndoLastStep:hover { ${orangeButtonOver} }
#btnConfirmChoice { ${yellowButton} }
#btnConfirmChoice:hover { ${yellowButtonOver} }
#floating-hand-wrapper #floating-hand-button-container #floating-hand-button, #floating-hand-wrapper #floating-hand-button-container #floating-scoring-hand-button { background-color: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-50); }
#xtoken-modifier-container { border: 1px solid var(--light-50); }
.ark-card.unselectable { filter: grayscale(80%) !important; }
.ark-card.selectedToDiscard, .ark-card.selectedToMap10, #pagesubtitle #building-selector .building-container.unplacable { filter: grayscale(1) !important; }
#xtoken-modifier-container #xtoken-modifier-minus, #xtoken-modifier-container #xtoken-modifier-plus { background: var(--blue-70); }
.action-cards-summary>div .summary-action-card[data-status="1"] .icon-container .arknova-icon { box-shadow: 0 0 1px 1px #000, 0 0 3px 3px var(--red-30); }
#player_config #round-counter-wrapper #break-counter-wrapper #break-counter-icon { background: var(--dark-40); }
#player_config #round-counter-wrapper #break-counter-wrapper #break-counter-icon:before { border-right: 10px solid var(--dark-40); }
#player_config #round-counter-wrapper #break-counter-wrapper .arknova-icon { filter: var(--highlight-min); }
#arknovamw-draft, #arknova-draft { background: var(--dark-20); }
#arknovamw-draft #arknovamw-draft-picked:not(:empty), #arknova-draft #arknova-draft-picked:not(:empty) { background: #0d2c07; }
#logs .arknova-icon, #logs .arknovamw-icon,
#maintitlebar_content .arknova-icon, #maintitlebar_content .arknovamw-icon,
#gameaction_status_wrap .arknova-icon, #gameaction_status_wrap .arknovamw-icon,
#animation-break .arknova-icon, #animation-break .arknovamw-icon { filter: var(--highlight-min); }
#player_boards .arknova-icon, #player_boards .arknovamw-icon { color: var(--light-80); filter: var(--drop-shadow-min); }
[data-panel-rows="1"] .arknovamw-icon.icon-conservation, [data-panel-rows="1"] .arknovamw-icon.icon-appeal, [data-panel-rows="1"] .arknova-icon.icon-conservation, [data-panel-rows="1"] .arknova-icon.icon-appeal { color: #000 !important; }
[data-panel-rows="2"] .player-info .xtoken-holder .player-xtoken, [data-panel-rows="2"] .player-info .handCount-holder .player-handCount { filter: var(--highlight-min); }
[data-panel-rows="2"] .player-info .handCount-holder.tooMuch .player-handCount { filter: none; }
[data-panel-rows="2"] .player-info>.icon-money { border: none; }
.action-cards-summary, .icons-summary { border-top: 1px solid #a3806e; }
.action-cards-summary>div .summary-action-card:not([data-number="0"]):before, .action-cards-summary>div .summary-action-card:not([data-number="0"]):before { z-index: 1; }
`;

_darkStyleForGame['arknovamw'] = _darkStyleForGame['arknova'];

_darkStyleForGame['armadora'] = `
.power { filter: var(--drop-shadow); }
.miniwarrior { position: relative; margin-right: 3px; }
.miniwarrior:before { position: absolute; width: 100%; height: 100%; border: 1px solid #fff; box-sizing: border-box; content: ""; }
.boardblock { display: flex; flex-flow: row; gap: 0.3em; }
`;

_darkStyleForGame['arnak'] = `
.hand-amt { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 8px; color: #fff; top: -40px; }
.hand-amt .player-name { background: transparent; }
.counter-wrap { background-color: var(--dark-30); }
.display-deck, .display-discard { background: #000; border: 3px solid #9e6464; }
.display-deck:hover { background: var(--dark-30); }
.display-deck:active { background: var(--dark-40); }
html.darkpanel #player_boards .player-board.player-board.passed {  background-color: var(--dark-0) !important }
button.layout-button { background: var(--dark-10); border: 1px solid var(--light-70); cursor: pointer; }
button.layout-button.layout-selected { background: #246175; }
.card, .arnak-board, .idol { filter: brightness(0.9); }
`;

_darkStyleForGame['artthief'] = `
.card.log_card { filter: var(--highlight-min); }
`;

_darkStyleForGame['assyria'] = `
#logs .icons { filter: var(--highlight-min); }
`;

_darkStyleForGame['astra'] = `
.tbp-icon.tbp-icon-bag, .tbp-icon.tbp-icon-dust, .tbp-icon.tbp-icon-telescope, .tbp-icon.tbp-icon-wisdom { filter: var(--drop-shadow); }
.player_board_inner .player_score_value { filter: invert(1); }
.tbp-startPlayer { filter: var(--highlight); }
#page-title .bgabutton_boon, .tbp-boon { background: #faf7ef; }
.tooltiptext .tbp-icon-vp { filter: invert(0.9); }
`;

_darkStyleForGame['aurum'] = `
.game-content { color: var(--light-80); }
#bga-zoom-controls { filter: invert(0.8); }
.aurumwhiteblock { background-color: var(--dark-back); }
.trick-title-background { background-color: var(--dark-20); }
`;

_darkStyleForGame['automobiles'] = `
#AMBDisplayOptionsToggle { filter: invert(0.7); }
.amb-rank-icon, .amb-inner-icon { filter: var(--highlight-min); }
.amb-lap .amb-icon .amb-inner-icon { filter: var(--drop-shadow); }
.amb-card-tooltip-header-area { color: #000; }
.amb-card-tooltip-label { color: #bfbfbf; }
.amb-card-tooltip-noundo { color: #ff3333; }
`;

_darkStyleForGame['aves'] = `
#deck_size { color: var(--light-80); }
`;

_darkStyleForGame['azul'] = `
html:not(.background2) #overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
html:not(.background2) #bga-zoom-controls { filter: invert(1); }
.player-table-wrapper .player-hand { background: var(--dark-back); box-shadow: 0 0 5px 5px #000000dd; }
.player-table-wrapper .player-table:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.player-table-wrapper .player-table:not(.variant) .wall { background: #ada9a9b0; box-shadow: none; }
#factories .factory, .tile { filter:brightness(0.9); }
`;

_darkStyleForGame['azulsummerpavilion'] = `
#overall-content:before { content: ""; background: #000000B0; position: absolute; width: 100%; height: 100%; }
#bga-zoom-controls button { filter: invert(0.7); }
#page-title #summary { background: var(--dark-10); }
#page-title #summary:after, #page-title #summary:before { border-top: 32px solid var(--dark-10); }
#zoom-notice { color: var(--light-80); background: var(--dark-20); }
#zoom-notice .arrow-right { border-left: 12px solid var(--dark-20); }
.tile-count { background: var(--dark-10); }
.player-table-wrapper .player-hand { background: var(--dark-back); box-shadow: 0 0 5px 5px hsl(0deg 0% 0.13% / 86.7%); }
.player-name-wrapper { display: none !important; }
.player-name-wrapper.shift { display: flex !important; }
.player-table-wrapper .player-name-box { background: var(--dark-20); }
`;

_darkStyleForGame['babet'] = `
.btnDesactive { background-color: var(--dark-40); }
`;

_darkStyleForGame['babydinosaurrescue'] = `
.card { color: #000; }
.selected_card { box-shadow: none; filter: var(--highlight-max); }
[style^="color:#462213"] { color: #c86237 !important; }
[style^="color:#4b3d2f"] { color: #9d8062 !important; }
[style^="color:#7d7847"] { color: #a39c5c !important; }
[style^="color:#5f79b6"] { color: #738abf !important; }
[style^="color:#8b4513"] { color: #e06f1f !important; }
[style^="color:#0000ff"] { color: #6666ff !important; }
`;

_darkStyleForGame['bacon'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.playertablename, .player-name, #round_wrap b { font-weight: normal; }
#combination_table td[style*="color:red;"] { color: var(--red-50) !important; }
`;

_darkStyleForGame['bagofchips'] = `
.player-table, #skin { background: var(--dark-back); color: var(--light-80); }
#bga-zoom-controls { filter: invert(0.8); }
`;

_darkStyleForGame['bahamataxi'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
[style="color: rgb(0, 0, 0);"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['balloonpop'] = `
.containermerow { color: var(--light-80); }
.container { background-color: var(--dark-back); }
`;

_darkStyleForGame['bamboozle'] = `
#zoom-out, #zoom-in { filter: invert(1) grayscale(1) var(--highlight-min); }
.ba_piles_log, .ba_tokens_log { filter: var(--highlight); }
`;

_darkStyleForGame['bandido'] = `
.cp_board_hand, #resize { filter: invert(1); }
body { background: none !important; }
`;

_darkStyleForGame['bang'] = `
.player-character-name, .player-character-powers { color: #000; }
.bang-player .bang-player-container, div#hand, div#board #table #table-container { background-color: var(--dark-back); }
.card-copy-color[data-color=C]:before, .card-copy-color[data-color=S]:before { text-shadow: var(--text-w-shadow); }
.bang_popin { background: var(--dark-20); }
.bang_popin h2 { color: var(--light-70); }
.bang_popin #dialog-title-container { background-color: var(--dark-40); color: var(--light-80); }
div#board #table #table-container { color: var(--light-80); }
div.bang-card .card-front .card-name { color: #000; }
div#xIcon svg { fill: var(--light-80); }
.bang-player .bang-player-container { border: 1px solid var(--light-50); }
.bang-player .bang-player-container .player-info .player-distance { background: var(--dark-10); border: 1px solid #fff; color: #fff; }
.bang-player .bang-player-container .player-info .player-distance:before { background-image: linear-gradient(var(--light-80) 1px, transparent 0), linear-gradient(90deg, var(--light-80) 1px, transparent 0); }
.bang-player .bang-player-container .player-info .player-star, .player-role { filter: var(--highlight-min); }
.player-info, div#hand div#role-container div#role-card { filter: brightness(0.9); }
`;

_darkStyleForGame['baolakiswahili'] = `
#gamelog_key, #phase_label { color: var(--light-70); }
.blk_gamelog_box { background-color: #342618; }
.blk_auto_preference_box { background-color: #0e0e3f; }
.blk_seed_area { border-color: #fff; }
`;

_darkStyleForGame['barbu'] = `
.icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['barenpark'] = `
.bp-player-area-container, .bp-supply-board-overlap { background: var(--dark-back) !important; }
.bp-supply-board-view-button, .bp-player-panel-columns { filter: invert(1); }
.bp-player-panel-zoom { filter: grayscale(1); }
`;

_darkStyleForGame['barrage'] = `
html.darkpanel .player-board { background: var(--dark-30) !important; }
.player_panel_content .company-panel-wheel-container .company-summary-wheel .summary-wheel-inner:before { background: var(--dark-20); }
.barrage-tech-tile .tech-tile-fixed-size .tech-tile-image { filter: var(--drop-shadow); }
[data-company="2"] { filter: var(--highlight-min); }
#go-to-top { border: 1px solid var(--light-50); border-radius: 6px; }
`;

_darkStyleForGame['batalladecoronas'] = `
#boc_supply-dice { color: var(--light-80); }
`;

_darkStyleForGame['battleforhill'] = `
body { background: none !important; }
#zoom_controls * { color: var(--light-80) !important; }
.counter-icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['battleoflits'] = `
.licount, .tscount { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
`;

_darkStyleForGame['battleship'] = `
#board { background: var(--dark-20); color: #fff; }
.fleetship { box-shadow: inset 0px 0px 2px 2px var(--light-50); }
.table-cell { border: 0.5px solid var(--light-50); }
.grid-body { background-color: var(--dark-40); }
`;

_darkStyleForGame['bauer'] = `
.playerscore { background-color: var(--dark-30); }
`;

_darkStyleForGame['beammeup'] = `
.dijitTooltip .planetTooltip { background-color: transparent; }
`;

_darkStyleForGame['beerbread'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.a_board svg { filter: invert(0.8); }
#help-mode-switch .label { background-color: var(--dark-40); border: 1px solid var(--light-50); box-sizing: content-box; }
.bb_icon_text { color: #000; text-shadow: var(--text-w-shadow); }
#player_boards .tooltip-icons { filter: var(--drop-shadow-min); }
`;

_darkStyleForGame['belladonebluff'] = `
.game-content { color: var(--light-80); }
`;

_darkStyleForGame['betta'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#bta_table>h2, .bta_h2 { background-color: var(--dark-back); color: var(--blue-70); }
#bta_rewards>div { border-right: 1px solid var(--blue-80); }
#bta_rewards div { color: var(--blue-80); }
#bta_rewards>div>div:first-child { border-bottom: 1px solid var(--blue-80); }
`;

_darkStyleForGame['beyondthesun'] = `
#player_boards .bts-icon-vp, #logs .bts-icon-vp, #player_boards .bts-icon-ore, #logs .bts-icon-ore { filter: invert(0.7); }
.bts-faction { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['bids'] = `
#circle { background: var(--dark-30); }
.greybackground { background: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['bigmonster'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.bm_flex-container, .scrollerClass {  background-color: var(--dark-back); }
.tab { background: var(--dark-20); }
.tab:before { border-color: transparent var(--dark-back) transparent transparent; }
.tab:after { border-color: transparent transparent transparent var(--dark-back); }
.scrollmap_player_info .tab, #bm_title_myhand { color: var(--light-80); }
#bm_title_myhand svg, .bm_settings svg, #general_center_btn, #help-icon { filter: invert(0.9); }
`;

_darkStyleForGame['bigtimesoccer'] = `
.nbr_yellowcards, .nbr_cards { color: var(--light-80); }
`;

_darkStyleForGame['biomos'] = `
.player_score_token, .player_score_token3 { background: #00000080; }
.player_biome_nb { color: var(--light-80); }
.player_board_reserve { background-color: var(--dark-20); color: var(--light-80); }
#text { color: var(--light-70) !important; }
.playerposition_1, .playerposition_2, .playerposition_3, .playerposition_4 { background-color: var(--dark-back); }
`;

_darkStyleForGame['biyi'] = `
.preference_control { background: var(--dark-40) !important; }
`;

_darkStyleForGame['blackjack'] = `
.player_score span[style="color: #000;"], .player_score span[style="color: black;"] { color: #fff !important; }
#playertable { background: linear-gradient(0deg,#003300,#001a00); }
.card_list_info { background: var(--dark-10); color: #fff; }
.secret_chip { background: var(--dark-20); filter: var(--highlight-min); }
.first_player_token { color: #000; }
`;

_darkStyleForGame['blockarena'] = `
.doubleempty { color: var(--light-80); }
`;

_darkStyleForGame['bloodyinn'] = `
#available_burials h1, #available_burials h3, #discard h1, #overall_stats_board h3 { color: var(--light-80)!important; }
#bell { filter: invert(1); }
.room_ff0000 { border: 4px solid #ff6565; }
.room_008000 { border: 4px solid #54aa54; }
.room_0000ff { border: 4px solid #6565ff; }
.room_ffa500 { border: 4px solid #ffc965; }
.color_ff0000 { color: #ff6565 !important; }
.color_008000 { color: #54aa54 !important; }
.color_0000ff { color: #6565ff !important; }
.color_ffa500 { color: #ffc965 !important; }
.room_white { border: 4px solid var(--light-70); }
.log, .cadaver_icon, .check, .hand_icon { filter: var(--highlight-min); }
.franc { border-radius: 50%; filter: var(--highlight-min); }
#undo_btn { ${redButton} }
#undo_btn:hover { ${redButtonOver} }
.whiteblock { background: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['bloodrage'] = `
.br_board { text-shadow: var(--text-w-shadow); }
.br_board_button { text-shadow: none; filter: invert(1); }
`;

_darkStyleForGame['blot'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-name, .playertablename { text-shadow: none !important; }
`;

_darkStyleForGame['bohnanza'] = `
.give_want_arrow { filter: invert(0.7); }
.bean_count_label { color: var(--light-80); text-shadow: none; filter: var(--drop-shadow); }
.bean_field_block > div:first-child > div:first-child { background: var(--dark-20) !important; }
[style*="background-color:#bbbbbb"] { background-color: transparent !important; }
.farm_icon { filter: var(--drop-shadow); }
`;

_darkStyleForGame['bombay'] = `
.player_board_image { filter: var(--drop-shadow); }
.notif_palace_black { filter: var(--highlight-min); }
`;

_darkStyleForGame['bonsai'] = `
#bon_opponents .bon_player { background-color: var(--dark-back); color: var(--light-80); }
#bon_solo-panel { background: var(--dark-back); }
.bon_solo-obj { color: var(--light-80); }
`;

_darkStyleForGame['boomerangaustralia'] = `
.bg-arrow-left, .bg-arrow-right { background-color: #021f31e8; color: #fff; }

.box-name { background-color: #0a0700e6; }
.score-box { color: #000; }
`;

_darkStyleForGame['boomerangeurope'] = `
.bg-arrow-left, .bg-arrow-right { background-color: #021f31e8; color: #fff; }
.score-box { color: #000; }
`;

_darkStyleForGame['boomerangusa'] = `
.bg-arrow-left, .bg-arrow-right { background-color: #021f31e8; color: #fff; }
.box-name, .score-box { color: #000; }
`;

_styleForGame['boreal'] = `
.Plateau-input, .Cartes-input { display: flex; flex-flow: row nowrap; justify-content: space-between; width: 100%; padding-top: 5px; }
.player_config_row .slider { margin: 0px 0px 5px 0px; }
`;

_darkStyleForGame['boreal'] = `
.pyramid { background-color: var(--dark-back); color: var(--light-80); }
.pyramid .reserve:before { background-color: #000; }
.player_config_row > div:not(#help-mode-switch) svg { filter: invert(0.7); }
`;

_darkStyleForGame['bossquest'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.playerTable { background: var(--dark-back); background-image: none; margin-bottom: 0.5em; }
`;

_darkStyleForGame['botanicus'] = `
#player_boards .player-name a { background-color: transparent !important; }
#botanicus-game-holder .garden-board-holder .garden-board .player-name-holder { background-color: var(--dark-10); }
#botanicus-board, .garden-board-holder { filter: brightness(0.9); }
`;

_darkStyleForGame['botanik'] = `
body { background: none !important; }
#zoomplus, #zoomminus { filter: invert(0.9); }
`;

_darkStyleForGame['bouncers'] = `
.bgabnc_points_card { background-color: var(--dark-10); }
.bgabnc_activeplayer { outline: 2px dashed var(--light-50); }
`;

_darkStyleForGame['briscola'] = `
.table_color { background: var(--dark-back); }
.playertablename, .table_cell { color: #fff; }
.playertablename { text-shadow: none!important; }
#game_board { background-color: #004d00; }
`;

_darkStyleForGame['bunnyboom'] = `
.darkmode .bgaext_overlay { opacity: 0.8; }
.bb_zoom_icon { filter: var(--highlight); }
.flippable-front { filter: brightness(0.9); }
.aal-popup-overlay .aal-popup-content { background: var(--dark-20); color: var(--light-80); }
.bb_log_level2 { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['bunnykingdom'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.player-board { background-color: var(--dark-20); }
.BK-horizontal-splitter { background-color: var(--dark-10); border-color: var(--dark-40) var(--dark-20) var(--dark-20) var(--dark-40); }
.BK-scores>div { background-color: var(--dark-10); }
.ATB-score-section-heading, .ATB-player-score-breakdown { color: var(--light-80); }
.ATB-score-item, .ATB-score-points { color: var(--light-70); }
.ATB-score-description-details { color: var(--light-50); }
.BK-player-color-353938 { color: #7a8481; }
.BK-player-color-EF3B29 { color: #f05242; }
.BK-player-color-F4BA14 { color: #f6cb4e; text-shadow: none; }
.BK-player-color-714FA3 { color: #7757a7; }
.BK-options-section-heading { border-color: var(--light-50); }
.BK-show-territory-tooltips #BKTerritoryInfoPanel.atb-visible { background-color: var(--dark-10); color: var(--light-80); }
#BKTerritoryInfoLava { color: #f05242; }
.BK-player-direction.atb-visible { color: var(--light-70); }
`;

_styleForGame['burglebros'] = `
.tooltip_container { width: auto; }
`;

_darkStyleForGame['burglebros'] = `
#popin_tile_distribution_contents { color: #000; }
`;

_darkStyleForGame['butterfly'] = `
.playerHand div:not(.captures), #drawDiscard > div:not(#drawWrap)  { background-color: var(--dark-20) !important; }
.captures, #draw { margin-top: 0px !important; }
#drawWrap { background-color: transparent !important; }
#commonArea { color: #fff; }
.Bee, .Bfly, .Crick, .Dfly, .Flower, .Lbug, .Wasp { filter: var(--drop-shadow); }
`;

_darkStyleForGame['buttons'] = `
.player-name { text-shadow: none; }
`;

_darkStyleForGame['caboodle'] = `
body { background: none !important; }
`;

_darkStyleForGame['cacao'] = `
.player_score_value { color: #000; }
#jungle_display { background-color: var(--dark-back); border: 5px solid var(--dark-back); }
`;

_darkStyleForGame['cairocorridor'] = `
html[style="--hover_color: #ff8888;"] { --hover_color: #993333 !important; }
html[style="--hover_color: #888888;"] { --hover_color: #339966 !important; }
.pentagon { stroke: var(--light-50); fill: var(--dark-20); }
a[style="color: #000000"] { color: #54aa54 !important; text-shadow: none!important; }
polygon[style^="fill:#ff8888;"] { fill: #993333 !important; }
polygon[style^="fill:#ff0000;"] { fill: #4d1919 !important; }
polygon[style^="fill:#888888;"] { fill: #339966 !important; }
polygon[style^="fill:#000000;"] { fill: #194d33 !important; }
polygon[style^="fill:#fce57e;"] { fill: #4d4419 !important; }
`;

_darkStyleForGame['capybarancapybara'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#overall-content { color: var(--light-80); }
.cb_zone { background-color: var(--dark-back); }
.cb_hand { background-color: var(--dark-10); border: 2px solid var(--light-50); }
.cb_panel_pumpkin { background-color: var(--dark-40); }
`;

_darkStyleForGame['canasta'] = `
.cardspace { color: #000; }
.meld_card_counter_wrap { background-color: var(--dark-back); }
.team_board_wrap { background-color: var(--green-30); }
.card_1, .card_2 { filter: var(--drop-shadow) brightness(0.9); box-shadow: none; } }
`;

_darkStyleForGame['cannonades'] = `
#overall-content:before { content: ""; background: #000000C0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.c-title { background-color: var(--dark-10); }
#decks .deck[data-empty=true] { border: 1px solid var(--light-50); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px var(--light-50); color: var(--light-80); }
`;

_darkStyleForGame['cantstop'] = `
.diceactions, .dicechoice_plus { color: #fff; }
`;

_darkStyleForGame['cantstopexpress'] = `
h5 { color: #fff; }
.pad { filter: invert(0.8) grayscale(1); }
.containermepad > h1 { background: var(--dark-20); margin-top: 0.5em; padding: 0.3em 1em !important; border-radius: 8px; }
`;

_darkStyleForGame['canvas'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.art-card { background-color: #fff; }
.player-area  .title { color: #000 !important; }
`;

_darkStyleForGame['capereurope'] = `
.tbp-cardSlot { box-shadow: 0 3px 1px #cc6600b3; }
`;

_darkStyleForGame['captainflip'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.cf_title { background-color: var(--dark-30); }
.cf_boardrule, .cf_tooltip { background-color: var(--orange-10); color: var(--light-80); }
.cf_tooltip_quote { color: var(--light-80); }
.cf_tooltip, .cf_boardrule { border: 3px solid var(--light-50); }
.cf_tooltip_endgame { color: var(--blue-50); }
.bg-firstplayer { filter: var(--drop-shadow); }
`;

_darkStyleForGame['caravan'] = `
.camel, .log .cube { filter: var(--highlight-min); }
`;

_darkStyleForGame['carcassonne'] = `
#player_boards .partisan { filter: var(--highlight-min); }
body { background: none !important; }
.handtile, #map_container .tile_art, #tile_in_title .tile_art { filter: brightness(0.9); }
.icon_wrapper { filter: invert(1); border: 1px solid var(--light-50); }
`;

_darkStyleForGame['carcassonnehuntersandgatherers'] = `
#player_boards .tribeMember, #player_boards .hut { filter: var(--highlight-min); }
body { background: none !important; }
.handtile, #map_container .tile_art, #tile_in_title .tile_art { filter: brightness(0.9); }
`;

_styleForGame['carnegie'] = `
#cde-floating-menu-score > .fa-star { background-image: none !important; }
#cde-floating-menu-score > .fa-star:before { content: "\\f005" !important; }
.logs_on_floating_panel .player-board { background-color: #97a09b; }
`;

_darkStyleForGame['carnegie'] = `
.cng_firstplayer { filter: var(--highlight); }
.cng_token,  .player_score > i { filter: var(--drop-shadow); }
.cng_playerboard_counter { filter: invert(1); }
#pagemaintitletext > span { background-color: transparent !important; }
#timeline_block, #deptboard, .cng_company_block { background-color: #0a292980; color: #fff; }
.cng_company_label { background: var(--dark-20); color: #fff; border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
.cng_companyboard_counter { color: var(--light-70); text-shadow: none; }
`;

_darkStyleForGame['carrara'] = `
#player_boards .stockitem, .first_player_tile, #objects > div { filter: var(--highlight); }
.box_wrap { filter: brightness(0.9); }
`;

_styleForGame['cartographers'] = `
#car-scoring-card-scale { padding-top: 0.5em; }
`;

_darkStyleForGame['cartographers'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.jj-ui-hint-box { background-color: var(--dark-10); }
.car-score-track .car-score-track-season .car-score-track-season-cells { background-color: var(--dark-10); }
.car-score-track .car-score-track-season .fa6-hourglass { background-color: var(--dark-20); }
.car-score-track .car-score-track-season .car-score-track-season-cell,
.car-score-track .car-score-track-season .car-score-track-season-cells,
.car-score-track .car-score-track-season .fa6-hourglass { border-color: var(--light-50) !important; }
.car-sheet-coins-track { background-color: #383b1b40; }
#undoAll, #undoLast { ${yellowButton} }
#undoAll:hover, #undoLast:hover { ${yellowButtonOver} }
#jj-preferences-panel #jj-preferences-panel-content .jj-preferences-panel-category-label { background: var(--dark-back); }
.car-explore-card-art:before, .car-sheet:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
.car-title-font { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; white-space: nowrap; }
.car-sheet .car-sheet-player-name-wrapper .car-sheet-player-name { filter: none; }
.car-sheet .car-sheet-grid-tile-controls .tile-controls-button { background: var(--dark-10); border: 1px solid var(--light-70); color: var(--light-80); }
.car-sheet .car-sheet-grid-tile-controls[data-invalid=true] .tile-controls-circle { border: 4px dotted var(--red-30); }
#car-season-scoring-wrapper #car-season-scoring { background-image: none; }
`;

_darkStyleForGame['castlecombo'] = `
#overall-content { background: #18414e; }
.player-table { background: var(--dark-back); }
.player-table .name-wrapper .name { text-shadow: none; }
#popin_bgaHelpDialog .block { background: var(--dark-20); }
.bga-help_popin-button { background: #30839c; }
.discount-counter .discount-counter-value { color: #000; }
#notice { background: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['castlesofcaleira'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#zoom-controls, .coc_scroll_arrow, .coc_hand_icon { filter: invert(0.7); }
`;

_styleForGame['castlesofburgundy'] = `
.additionalSection_title { cursor: pointer; }
`;

_darkStyleForGame['castlesofburgundy'] = `
.cob_player_block { color: #000 !important; }
#zoomLevelValue { background-color: transparent; }
.cob_player_board:before, #main_board:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_darkStyleForGame['catan'] = `
#ebd-body { background: #005a81; }
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
#replaylogs .cat_log_token, .log .cat_log_token, .tooltiptext .cat_log_token { filter: var(--drop-shadow); }
#cat_map_bg { background: none; }
.cat_img_knight, .cat_barbarians_ship { filter: invert(0.7); }
.cat_ck_param_line { border-bottom: 1px solid var(--light-80); }
#cat_mapcontrols { background: var(--dark-30); border: none; box-shadow: none; margin: 5px; filter: var(--drop-shadow); }
#cat_mapcontrols > * { filter: invert(0.7); }
#cat_devcards_ck { top: 6vh; }
.cat_cardcounter { background: #000; border: 2px solid #fff; color: #fff; }
.cat_panel_ck_citylevel { color: #000; }
.cat_metropolis { box-shadow: none; filter: var(--drop-shadow); margin-bottom: 5px; }
html.darkpanel #player_boards .player-board.cat_activepl { background: var(--dark-30)!important; }
#cat_tradeawarenessconfig, .cat_tradeawareness { background: var(--dark-back); border: 1px solid var(--light-50); }
#cat_tradeawareness_currentconf { background: var(--dark-back); }
#cat_trade_player_wantandoffer, .cat_playertradeoffer { background: linear-gradient(180deg, #1e3148, #1c2e4a); }
.cat_playertrade_caption, .cat_playerboard_resource_info, .cat_offerplname, .cat_tradeoffer_preview, .cat_tradeoffer_messageline { color: var(--light-80); }
.cat_arrows_ltr, .cat_arrows_rtl { filter: var(--highlight-min); }
.cat_resource_counter { background-color: var(--dark-10); border-color: var(--light-80); color: var(--light-80); }
.cat_playertradeoffer.cat_red { border: 2px solid var(--red-30); }
.cat_playertradeoffer.cat_orange { border: 2px solid #f79f50; }
.cat_playertradeoffer.cat_blue { border: 2px solid #31b1e6; }
.cat_playertradeoffer.cat_brown { border: 2px solid #a0665e; }
.cat_playertradeoffer.cat_pink { border: 2px solid #e63aec; }
.cat_playertradeoffer.cat_purple { border: 2px solid #9b3feb; }
.cat_nameintext.cat_red { color: var(--red-30); }
.cat_nameintext.cat_orange { color: #f79f50; }
.cat_nameintext.cat_blue { color: #31b1e6; }
.cat_nameintext.cat_brown { color: #a0665e; }
.cat_nameintext.cat_pink { color: #e63aec; }
.cat_nameintext.cat_green { color: #6ac055; }
.bgabutton_orange { ${redButton} }
.bgabutton_orange:hover { ${redButtonOver} }
#cat_playertrade_button_update { ${greenButton}; border-color: var(--light-80) !important; text-shadow: -1px -1px #0004, 1px 1px #0004, -1px 1px #0004, 1px -1px #0004 !important; }
#cat_playertrade_button_update:hover { ${greenButtonOver} }
.cat_button_deal { text-shadow: -1px -1px #0004, 1px 1px #0004, -1px 1px #0004, 1px -1px #0004 !important; }
.cat_button_deal:not(.cat_button_reject_all) { ${greenButton}; border-color: var(--light-80) !important; }
.cat_button_deal:not(.cat_button_reject_all):hover { ${greenButtonOver} }
.cat_button_deal.cat_button_retract, #cat_playertrade_button_cancelupdate { ${redButton}; border-color: var(--light-80) !important; }
.cat_button_deal.cat_button_retract:hover, #cat_playertrade_button_cancelupdate:hover { ${redButtonOver} }
.cat_button_deal.cat_button_match { ${blueButton}; border-color: var(--light-80) !important; }
.cat_button_deal.cat_button_match:hover { ${blueButtonOver} }
.cat_playertradeoffer.cat_notactionable { background: #333; }
.cat_alert { color: var(--red-30); }
.cat_matched { color: var(--green-50); }
.cat_traderate { color: var(--light-80); }
`;

_darkStyleForGame['catcafe'] = `
.ctc_psb_footprint, .ctc_log_shape { filter: var(--highlight); }
`;

_darkStyleForGame['catinthebox'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['caverna'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#central-board .turn-action-container .turn-number, #show-expedition { filter: invert(1); }
#player_config #round-counter-wrapper { background-color: #000; }
.caverna-meeple { filter: var(--highlight-min); }
#floating-building-boards-wrapper[data-open=bonus] #floating-building-buttons .building-board-button[data-id=bonus],
#floating-building-boards-wrapper[data-open=dwellings] #floating-building-buttons .building-board-button[data-id=dwellings],
#floating-building-boards-wrapper[data-open=food] #floating-building-buttons .building-board-button[data-id=food],
#floating-building-boards-wrapper[data-open=materials] #floating-building-buttons .building-board-button[data-id=materials]
{ background: #000; color: #e6e7e9; }
.action-header, .building-title, .building-desc { color: #000; }
.caverna-building[data-type=StartDwelling] .building-resizable { box-shadow: none; }
.caverna-building[data-type=StartDwelling] .building-resizable > div { color: #fff !important; }
.player-board-wrapper .player-board-holder .resources-bar-holder .player-board-name { background-color: var(--dark-20); }
.player-board-wrapper .player-board-holder .resources-bar-holder { background: var(--dark-30); border-top-left-radius: 8px; border-top-right-radius: 8px; }
.cavernaBuilding_popin, .caverna_popin:not(#popin_showScores) { background-image: none; }
.caverna_popin:not(#popin_showScores) h2, .cavernaBuilding_popin h2 { background-color: #404347; color: var(--light-80); }
#popin_showTour.caverna_popin #tour-slider-container .slide .bubble { background: var(--dark-10); border: 2px solid var(--light-50); }
#popin_showTour.caverna_popin #tour-slide-footer { background-color: var(--dark-10); }
#popin_showTour.caverna_popin #tour-slider-container .slide .tour-remark { background: var(--dark-back); }
#popin_showRuby.caverna_popin, #popin_showExpedition.caverna_popin, #popin_showScores.caverna_popin { background: var(--dark-10); color: var(--light-80); }
#popin_showScores.caverna_popin #popin_showScores_contents table tbody tr { background-color: var(--dark-20); color: var(--light-80); }
#popin_showScores.caverna_popin #popin_showScores_contents table tbody tr:nth-child(odd) { background-color: var(--dark-40); }
#popin_showScores.caverna_popin #popin_showScores_contents table tbody tr td .scoring-entry i,#popin_showScores.caverna_popin #popin_showScores_contents table tbody tr td .scoring-subentry i { color: var(--light-50); }
#popin_showScores.caverna_popin #popin_showScores_contents table tbody tr td .scoring-subentries { border: none; }
#players-scores * { border-color: var(--light-50) !important; }
`;

_darkStyleForGame['celestia'] = `
#captain_icon { filter: invert(0.7); }
`;

_darkStyleForGame['century'] = `
html.century_theme.spice { background-color: #2d1f06; }
html.century_theme.spice #logs .log_replayable .roundedbox { background: var(--dark-20); }
.logitem.mcard_forlog { background-color: #040404; }
.mcard_forlog:after { border-left: 7px solid #040404; }
.logitem.gcard_forlog { background-color: #040404; color: #e59480; }
.tableau:before { text-shadow: none; }
`;

_darkStyleForGame['cephalopod'] = `
.icon_placed_dice_000000, .icon_placed_dice_00a400 { filter: var(--drop-shadow); }
`;

_darkStyleForGame['chakra'] = `
.logIcon { filter: var(--drop-shadow) !important; }
`;

_darkStyleForGame['challengers'] = `
.challengers-pref-background-dark #overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.cha-log-holder { background: var(--dark-20); color: var(--light-80); }
.cha-matchup-name-inner, .cha-player-name { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 8px; }
.cha-name-404040 { text-shadow: var(--text-w-shadow); }
.cha-name-0000dd { fill: #8080ff; color: #8080ff; }
.cha-img-tooltip-wrapper, .cha-match-tooltip-wrapper { background-color: var(--dark-30); }
.cha-tooltip-close-icon, .cha-set-icon { filter: invert(0.7); }
.cha-matchup-num-fans { color: var(--light-80); }
.cha-name-79a394, .cha-name-ff5420, .cha-name-7468a5, .cha-name-404040, .cha-name-68bdf7,
.cha-name-a12b76, .cha-name-0000dd, .cha-name-f951a0 { background-color: transparent; }
.cha-name-79a394.cha-player-name, .cha-name-ff5420.cha-player-name, .cha-name-7468a5.cha-player-name, .cha-name-404040.cha-player-name, .cha-name-68bdf7.cha-player-name,
.cha-name-a12b76.cha-player-name, .cha-name-0000dd.cha-player-name, .cha-name-f951a0.cha-player-name { background-color: var(--dark-20); }
.phase-log-message { background-color: var(--dark-30); color: #fff; }
.timestamp { color: var(--light-80) !important; }
#cha-matchup-round-number { background: var(--dark-back); border: 1px solid var(--light-70); }
#cha-svg-round-number { filter: invert(0.9); }
#cha-deck-title, .cha-top-bar-label { stroke: var(--light-80); fill: var(--light-80); }
.cha-top-bar-label { background-color: #a7a7a74d; }
.cha-game-card, .cha-tournament-card { filter: brightness(0.9); }
.cha-landscape .cha-log-holder { background: var(--dark-back); color: var(--light-80); border: 1px solid var(--light-70); }
.cha-park:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.cha-park-holder:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-radius:6px; border: 1px solid var(--light-70); }
.cha-park-holder>.cha-power-holder, .cha-park-holder>.cha-bench-counter { background-color: var(--dark-back); fill: var(--light-80); }
.cha-landscape .cha-bench-loss,.cha-landscape .cha-deck-loss { outline: 10px solid #600; }
`;

_darkStyleForGame['championsofmidgard'] = `
.playercountericon, .stockitem_unselectable, .playercountericonsmall { filter: var(--highlight-min); }
`;

_darkStyleForGame['cheeztricks'] = `
#overall-content[style*=cheeztricks]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
.open_wrap.whiteblock:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; top:0px; left:0px; border-radius:10px; }
.open_wrap.whiteblock .playername > span { color: var(--light-80) !important; }
.open_wrap > b { display: block; position: relative; }
`;

_darkStyleForGame['chemicaloverload'] = `
.player_board_content .player-board-wrapper .counters .counter-wrapper { background: var(--dark-40); border: 1px solid var(--light-50); }
.player_board_content .player-board-wrapper .action-button.bgabutton { background: var(--green-30); }
.player-table h3 { background-color: var(--dark-20); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
.help-marker .fa { color: #000 !important; text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['chicagoexpress'] = `
#grid-container:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; padding-top: 100%; }
#ce-end-game-tracker { background: rgb(39 42 47 / 90%); color: #fff; }
#initial-auction { background-color: var(--yellow-10); }
.ce-auction-next-player { filter: invert(1); }
.ce-charter-small * { text-shadow: none !important; }
.ce-charter-small .ce-charter.ce-charter-1 { background-color: #5b2020cc; }
.ce-charter-small .ce-charter.ce-charter-2 { background-color: #203a5bcc; }
.ce-charter-small .ce-charter.ce-charter-3 { background-color: #155b30cc; }
.ce-charter-small .ce-charter.ce-charter-4 { background-color: #697000cc; }
.ce-log-company2 { color: #6666ff; }
`;

_darkStyleForGame['chimerastation'] = `
.chs_text-tooltip, .chs_tooltip-text { color: var(--light-80); }
.chs_c_icon { filter: var(--highlight-min); }
#chs_brains_supply, #chs_claws_supply, #chs_leaves_supply, #chs_tentacles_supply { filter: var(--drop-shadow); }
`;

_darkStyleForGame['chocolatefactory'] = `
.playerMat { background-color: var(--dark-30); color: var(--light-80); border: 3px solid var(--dark-10); }
.playerChocolateFactoryNameWrapper { background-color: var(--dark-10); border-left: 3px solid var(--dark-10); border-right: 3px solid var(--dark-10); border-top: 3px solid var(--dark-10); }
.playerChocolateFactoryName { background-color: var(--dark-10) !important; }
#logs .chocolate { filter: var(--drop-shadow); }
.rightOfFactory > div:last-child { background: #777; border-radius: 8px; }
`;

_darkStyleForGame['chromino'] = `
#btn_user_prefs { filter: invert(1); }
.block-user-pref-radio label { background-color: #111; }
#map_container { background-image: url(${getUrl('img/dark_theme/background.jpg')}); }
.tile.icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['cinco'] = `
.playertablename { color: #fff !important; }
`;

_darkStyleForGame['circleoflifesavannah'] = `
.nextCard { border: 1px dotted var(--light-50); }
#nextCard > div { color: #c43a08 !important; }
#nextCard > div > span, #circleoflife_play_zone > div[style*="color:grey"] { color: var(--light-50) !important; }
`;

_darkStyleForGame['citadels'] = `
#ebd-body { background: none; }
.cit_toggle-zoom-out, .cit_toggle-zoom-in { background-image:none !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; display: inline-block; font: normal normal normal 14px/1 FontAwesome; font-size: inherit; text-rendering: auto; }
.cit_toggle-zoom-in:before { content:"\\f00e"; }
.cit_toggle-zoom-out:before { content:"\\f010"; }
.cit_text-ornament-left, .cit_text-ornament-right { filter: invert(0.7); }
.cit_toggle-min-view-btn { border: 1px solid var(--light-50); color: var(--light-80); }
`;

_darkStyleForGame['cityofthebigshoulders'] = `
.panel-token { filter: var(--highlight-min); }
#main_board, #available_companies, .owned_companies_area { color: var(--dark-10); }
`;

_darkStyleForGame['claim'] = `
#faction_table, .playertablename { text-shadow: none; }
.faction_token_1, .faction_token_2 { filter: var(--highlight); }
`;

_darkStyleForGame['clashofdecks'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.hand, .placeholder { background-color: var(--dark-back); }
`;

_darkStyleForGame['clansofcaledonia'] = `
.auction-bidding-item, .cc_counter { background: var(--dark-20); }
.token24 { filter: var(--highlight-min); }
.tiles.fog { opacity: .5; filter: invert(1); }
#actions_overview, #imported-goods { color: #000; }
.active_turn { background: var(--dark-40); }
table.formResources { background: var(--dark-back); border: 1px solid var(--dark-40); border-collapse: collapse; }
table.formResources td { padding: 0.2em; }
`;

_darkStyleForGame['cloudcity'] = `
.clc_playertableicon { filter: invert(1); }
#popin_startDialogId { background: var(--blue-10); }
#popin_startDialogId_title, .golden_title { background-image: none; background-color: var(--yellow-10); }
`;

_darkStyleForGame['coalbaron'] = `
#coalbaron-main-container .coalbaron-board .player-board-fixed-size .board-elevator .player-name { background: var(--dark-20); }
#coalbaron-main-container #coalbaron-board .board-space,
#coalbaron-main-container #coalbaron-board .board-space#bank_1 .space-workers-container,
#coalbaron-main-container #coalbaron-board .board-space#canteen .space-workers-container { background: var(--dark-back); }
#coalbaron-main-container #coalbaron-board .board-space#factory_1 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_2 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_3 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_4 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_5 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_6 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_7 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_8 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#order_1 .space-workers-container,
#coalbaron-main-container #coalbaron-board .board-space#order_2 .space-workers-container,
#coalbaron-main-container #coalbaron-board .board-space#order_3 .space-workers-container,
#coalbaron-main-container #coalbaron-board .board-space#order_4 .space-workers-container { border-bottom: 1px solid var(--light-50); }
#coalbaron-main-container #coalbaron-board .board-space#factory_5 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_6 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_7 .space-tile-container,
#coalbaron-main-container #coalbaron-board .board-space#factory_8 .space-tile-container { border-top: 1px solid var(--light-50); }
#player_config #round-counter-wrapper { background: var(--dark-10); font-weight: normal; color: var(--light-80); }
#coalbaron-main-container .coalbaron-board { background-color: #3d2b0f; }
.coalbaron-meeple.icon-worker { filter: var(--highlight); }
`;

_darkStyleForGame['codexnaturalis'] = `
#overall-content, #overall-content > * { filter: invert(1); }
.cn_player-board-first-player-token, .cn_icon { filter: var(--drop-shadow); }
.cn_placement { background-color: #80808066; }
#logs [style="color:blue;"] { color: #6666ff !important; }
#logs [style="color:purple;"] { color: #e600e5!important; }
#logs [style="color:green;"] { color: #00e600!important; }
#logs [style="color:red;"] { color: #f33!important; }
`;

_darkStyleForGame['coinage'] = `
#local_prefs_container { color: var(--light-80); }
#cng_action_text, #cng_action_table td { background-color: var(--dark-30); }
#cng_action_table { background-color: var(--dark-40); border: 1px solid var(--dark-40); }
`;

_darkStyleForGame['coinche'] = `
.currentBidInfo__player, .bid-value { color: var(--light-80); }
#logs .card-color-icon, .currentBidInfo .card-color-icon { filter: var(--drop-shadow); }
.cardStyleSelect__option:hover { background: var(--dark-30); }
`;

_darkStyleForGame['coins'] = `
.card_table { background-image: none; background-color: var(--dark-back); }
`;

_darkStyleForGame['colorado'] = `
.player-infos .icons { filter: var(--highlight); }
.player-infos .counter:before, .color, #caller { filter: var(--highlight-min); }
.board .name { background-color: var(--dark-20); }
`;

_darkStyleForGame['coloretto'] = `
#coloretto_warning { background: var(--dark-20); color: #fff; }
#round_status, #deck_count { color: #fff; }
`;

_darkStyleForGame['colorflush'] = `
.cfl_name { text-shadow: none; }
`;

_darkStyleForGame['coltexpress'] = `
.bullets { filter: var(--highlight-min); }
.lootvalue { color: #000; }
#logs [style*=";color:#ffffff"] { background: none !important; }
#logs [style*=";color:#3b3232"] { text-shadow: var(--text-w-shadow); }
#backgroundPicture:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['commanderchess'] = `
#board { color: var(--light-80); }
#board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['concept'] = `
#word-timer { filter: invert(1); }
h2#word-display[data-lvl="2"] { text-shadow: var(--text-w-shadow); }
div.preference_choice:has(> div > div > select#preference_control_100) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_100) { display: none; }
`;

_styleForGame['concept'] = `
#darkmode-switch { display: none; }
`;

_darkStyleForGame['confusinglands'] = `
.selectcard:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%;  }
.selectcard { border: 2px solid #90961d; }
#selectcardpopdown, #hide { background-color: #5f6819; color: #fff; }
`;

_darkStyleForGame['connectfour'] = `
#logs span[style="color:#ff0000; font-weight:bold; background-color:#bbbbbb"], #logs span[style="color:#ffff00; font-weight:bold; background-color:#bbbbbb"] { background-color: transparent !important; }
`;

_darkStyleForGame['connectsix'] = `
.new_layout { filter: grayscale(1) invert(1); }
.gmk_intersection, .gmk_stone { border-radius: 50%; }
`;

_darkStyleForGame['consonar'] = `
#page-content { color: var(--light-80); }
`;

_darkStyleForGame['conspiracy'] = `
.token { filter: var(--highlight-min); }
#logs [style="color: #770405"] { color: #ac0609 !important; }
#popin_conspiracyHelpDialog { background: var(--dark-20); color: var(--light-80); }
#help-popin h1 { color: #fff; }
#help-popin #alliance { color: var(--yellow-10); }
#help-popin #alliance .example-wrapper .example { margin-top: 1em; }
`;

_darkStyleForGame['copenhagen'] = `
body { background: none !important; }
`;

_darkStyleForGame['cosmoctopus'] = `
.csm-resize { background: var(--dark-20); border: 1px solid var(--light-50); color: var(--light-80); }
.csm-icon-portal { filter: var(--highlight-min); }
#csm-floatingHand { background-color: var(--dark-20); box-shadow: 0 0 8px #888; }
#csm-floatingHand .csm-toggle { background: var(--dark-20); color: var(--light-80); box-shadow: 0 -1px 2px #888; }
.csm-deck, .csm-discard { background-color: #fff3; box-shadow: 0 0 3px 3px #fff3; }
`;

_darkStyleForGame['cosmosempires'] = `
body { background: none !important; }
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.coe-custom-background .timestamp { background-color: transparent; }
.coe-custom-background #seemorelogs { background-image: none; }
`;

_darkStyleForGame['coupcitystate'] = `
#myactions { color: #fff; }
.playerhead { text-shadow: none; background-color: var(--dark-back); padding: 0.1em 0.3em; border-radius: 4px; }
.placemat[style="color: #000000"] .playerhead { text-shadow: var(--text-w-shadow); }
.placemat.eliminated { border-color: var(--light-50); }
.action { background: var(--dark-20); }
.action:hover, .action.pending, .placemat:hover, .placemat.selected { background: var(--dark-40); }
#circle { background: var(--dark-back); }
#deck { text-shadow: none; color: var(--light-80); }
.character-name, .faction-name { border: 1px solid var(--light-50); padding-top: 0.2em; margin-bottom: 0.2em; }
.balloon { background: var(--dark-10); color: var(--light-80); border: 1px solid var(--light-50); }
.balloon:before { border: none; border-right: 1px solid var(--light-50); border-bottom: 1px solid var(--light-50); background-color: var(--dark-10); bottom: -7px; height: 12px; width: 12px; z-index: -1; transform: rotate(45deg); }
`;

_darkStyleForGame['coupell'] = `
#letter_distribution, #rank_table { background: var(--dark-back); color: var(--light-80); }
#turns_number_label { color: var(--light-80); }
`;

_darkStyleForGame['cradletograve'] = `
#overall-content[style="background: linear-gradient(90deg, rgb(204, 204, 204) 0%, rgb(238, 238, 238) 25%, rgb(238, 238, 238) 75%, rgb(204, 204, 204) 100%);"]
{ background: linear-gradient(90deg, var(--dark-0) 0%, var(--dark-20) 25%, var(--dark-20) 75%, var(--dark-0) 100%) !important; }
#pagesection_gameview .whiteblock { color: #000; }
`;

_darkStyleForGame['crazyfarmers'] = `
#game_play_area .cards {  background-color: #32280166; }
`;

_darkStyleForGame['cribbage'] = `
.club, .spade { text-shadow: var(--text-w-shadow); }
#cutCardSpace { color: #fff; }
.playertablename { background-color: var(--dark-back); padding: 0.3em 1em; border-radius: 8px; }
`;

_darkStyleForGame['crimezoom'] = `
#tab-bar li { background-color: var(--dark-back); }
#tab-bar li.active,#tab-bar li:hover, #main-content { background-color: var(--dark-20); color: #fff; }
p.epilogue-paragraph { background-color: var(--dark-10); color: var(--light-70); }
`;

_darkStyleForGame['crisps'] = `
#overall-content[style*="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['crusadersthywillbedone'] = `
#CRUOptionsToggle { filter: invert(0.7); }
.cru-knightorder-name>div:first-child, .cru-knightorder-description { color: #aaa; }*
#CRUPlayerAreas, .cru-player-area { filter: invert(1); }
.cru-context { border: 1px solid var(--light-50); color: var(--light-80); }
#logs .log.cancel .roundedbox { background-color: var(--dark-30) !important; }
`;

_darkStyleForGame['cubirds'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
#zoomin_left, #zoomin_right, #zoomout_left, #zoomout_right { background-color: transparent; box-shadow: none; filter: invert(0.7); }
`;

_darkStyleForGame['cubosaurs'] = `
.cbsr_playerarea_container { background: var(--dark-back); }
.name-content { background: linear-gradient(0deg,var(--dark-20),#000); }
.container-vm { color: #ff5d5d; text-shadow: none; background: var(--dark-20); }
.cbsr_dna_count { color: #6666ff; }
`;

_darkStyleForGame['cucco'] = `
.playertablename { color: #fff; }
.whiteboard { background-color: var(--dark-20); color: var(--light-70); }
`;

_darkStyleForGame['cucumber'] = `
#card_log_table { background-color: var(--dark-back); color: var(--light-80); }
#card_log_table [style="color:black"] { text-shadow: var(--text-w-shadow); }
.playertablename, .player-name { text-shadow: none !important; }
`;

_darkStyleForGame['danceofmuses'] = `
[style="color: blue;"] { color: #6666ff !important; }
`;

_darkStyleForGame['darkagent'] = `
.player_board_content [style^="color:black;"] { color: var(--light-80) !important; }
.pbname input { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['darwinsjourney'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.darwin-focus-panel { background-color: var(--dark-10); }
#darwin-help-header, #darwin-move-history-header, .darwin-help-table tr:nth-child(odd), .darwin-move-history-table tr:nth-child(odd) { background-color: var(--dark-20); }
.darwin-help-table tr:nth-child(2n), .darwin-move-history-table tr:nth-child(2n) { background-color: var(--dark-30); }
.darwin-goals-panel, .darwin-navigation-panel { background-color: var(--dark-40); }
input:checked+.darwin-slider { background-color: var(--blue-70); }
`;

_darkStyleForGame['daybreak'] = `
.dbk-card-inner:not(.dbk-card-crisis-back) { background: var(--dark-20); color: var(--light-80); }
.dbk-card-crisis-back { filter: brightness(0.9); }
.dbk-card-inner .dbk-icon-arrow, .dbk-card-inner .dbk-icon-player, .tooltiptext .dbk-icon-arrow, .tooltiptext .dbk-icon-player { filter: invert(0.8); }
.dbk-card-mod { background: var(--dark-10); }
.dbk-tab, .dbk-tab:not(.dbk-tab-selected):hover, .dbk-tab.dbk-tab-selected { background-color: var(--dark-20); color: var(--light-80); }
.dbk-voteBlock { background-color: var(--dark-10); }
.dbk-card-crisis>.dbk-card-inner .dbk-icon-crisisType { border-radius: 5px; border: 1px solid var(--light-50); }
.dbk-card-qr { color: #000; }
#logs .dbk-icon-carbon { filter: var(--drop-shadow-min); }
`;

_darkStyleForGame['deadcells'] = `
.dc_beheaded-board-player-name-container { background: var(--dark-10); }
.dc_damage-icon, .dc_scroll-icon, .dc_vial-icon, .dc_card-back-icon, .dc_potion-icon, .dc_equipment-icon { filter: var(--highlight-min); }
.dc_damage-icon.dc_icon-grayscale { filter: grayscale(1) opacity(.3) var(--highlight-min); }
`;

_darkStyleForGame['dedale'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.dd_zoom_btn { filter: invert(0.8); }
.dd_message { color: var(--light-80); }
`;

_darkStyleForGame['deliverance'] = `
.color8b4513 { color: #aa7854!important; }
.coloree0000 { color: #f24545!important; }
.colorffd700 { color: #ffe665!important; }
.color007f00 { color: #65ff65!important; }
`;

_darkStyleForGame['deus'] = `
.deus_player_display .deus_resource_indicator, .deus_log_resource { filter: var(--highlight-min); }
.deus_repeat_counter_section { background-color: var(--dark-40); }
`;

_darkStyleForGame['diamonds'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000aa; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.playertablename { text-shadow: none; }
#logs [style^="color:#0000dd;"] { color: var(--blue-80) !important; }
#logs [style^="color:#800080;"] { color: var(--violet-80) !important; }
#logs [style^="color:#800000;"] { color: var(--red-50) !important; }
`;

_darkStyleForGame['diams'] = `
#page-content { color: var(--light-80); }
`;

_darkStyleForGame['diceathlon'] = `
.doubleempty { color: #fff; }
.medal { filter: var(--drop-shadow) !important; }
`;

_darkStyleForGame['diceforge'] = `
#nb-turns-container { color: #fff; }
.action-bar { border: 1px solid rgb(255 255 255 / 20%); }
.header-action { background-color: rgba(255,255,255,.1); }
.cards-pile { box-shadow: 0 0 2px 0 #9f9393; }
`;

_darkStyleForGame['dicedtomatoes'] = `
#available_dice .title, .rolled_dice_container .title, .dice_hand_container .title { color: #fff; }
#available_dice, .rolled_dice_container, .dice_hand_container { background-color: var(--dark-back); }
.whiteboard { background-color: #000; }
.dc_black { text-shadow: var(--text-w-shadow); }
.log_dice { filter: var(--drop-shadow); }
`;

_darkStyleForGame['dicedveggies'] = `
#overall-content:before { content: ""; background: #00000090; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.popup { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['dickory'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.playertablename { text-shadow: none; }
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"] { ${greenButton}}
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"]:hover { ${greenButtonOver}}
#clock_arrow { filter: invert(1); }
`;

_darkStyleForGame['dicycards'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.dc_zone { background-color: var(--dark-back); }
.dc_zone_nobg { background-color: transparent; }
#dc_gameover { background-color: var(--yellow-10); color: var(--light-80); }
`;

_darkStyleForGame['digupadventure'] = `
.duaplayername { background: var(--dark-back); }
.txtcard { color: #000; }
.discardoverall { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['dingosdreams'] = `
.play_grid { background-color: var(--dark-back); }
.player_name { text-shadow: none !important; }
.player_match, .player_score_value { color: #fff; text-shadow: none; }
.arrow_faded { color: #33140a99; }
.tooltip_body { color: var(--light-80); }
`;

_darkStyleForGame['dinnerinparis'] = `
h3 { color: #fff; }
.resource { filter: var(--drop-shadow); }
.responsive-layer .game-table .restaurant-pile .item-counter { background: #000; }
.responsive-layer .modal-container { background-color: var(--dark-back); }
.responsive-layer .modal { background-color: var(--dark-10); color: var(--light-80); }
.responsive-layer .btn-close { filter: invert(1); }
.game-player-panel .panel-item.item-majority-ranking .item-value { background: #000; }
`;

_darkStyleForGame['dinogenics'] = `
#visitor_panel_active .visitor-title, #visitor_panel_upcoming .visitor-title { color: var(--light-100); }
#visitor_panel_active .empty-visitors, #visitor_panel_upcoming .empty-visitors { color: var(--light-50); }
#visitor_panel_active .player-number,#visitor_panel_upcoming .player-number { color: var(--light-80); }
body.dinogenics-game #player_boards .dgx_cp_board .dgx-sprite.dnaback, body.dinogenics-game #player_boards .dgx_cp_board .dgx-sprite.ednaback, body.dinogenics-game #player_boards .dgx_cp_board .dgx-sprite.manipback { filter: var(--highlight-min); }
body.dinogenics-game #player_hand { background: var(--dark-back); }
.dgx-tooltip-info { border: 1px solid var(--blue-80); color: var(--blue-80); }
#main_board, .player_island { filter: brightness(0.9); }
`;

_darkStyleForGame['dinosaurteaparty'] = `
.guess_text { color: #000; }
.dinosaurtooltip_text [style^="color: #0c5a93;"] { color: #1392ec !important; }
`;

_darkStyleForGame['distilled'] = `
.dwhiteblock, .iconCanvas, #distillerChoice > div:first-child { background-color: #00000080 !important;  }
.invisiblePantryWrap, .pantryWrap { background-color: #000000cc; border-top: 1px solid var(--dark-40); }
.pantryWrapTop, #pagesection_gameview .whiteblock { background-color: #000000cc; }
.pantryExpanded .pantry2, div[id^=display][id$=wrapper] { background-color: #ffffff1a !important; }
.playerContainer { color: var(--light-80); }
svg[id^="eye_"] { filter: invert(1); }
`;

_darkStyleForGame['divercite'] = `
.quantity { color: var(--light-80); }
`;

_styleForGame['divideetimpera'] = `
.bgext_avatar svg.dei_hidden { display: block !important; }
`;

_darkStyleForGame['divideetimpera'] = `
#zoomplus, #zoomminus { background-image:none !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; display: inline-block; font: normal normal normal 14px/1 FontAwesome; font-size: inherit; text-rendering: auto; }
#zoomplus:before { content:"\\f00e"; }
#zoomminus:before { content:"\\f010"; }
`;

_darkStyleForGame['dobble'] = `
#game_play_area div[id^="player_name_"], .pile-description div:not(.dbl_sleep) { background-color: var(--dark-20); }
`;

_darkStyleForGame['dobbleconnect'] = `
.dc_boardscore { filter: var(--highlight-max); }
.dc-hand-bg { background-color: var(--dark-back); }
`;

_darkStyleForGame['dobro'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#pagesection_gameview .whiteblock { color: #000; }
#round_wrap, #myhand_wrap, #player_boards .hand_wrap, #player_boards .captured_wrap, #player_boards .hand_wrap span, #player_boards .captured_wrap span { text-shadow: none !important; color: var(--light-80) !important; }
.player-name { text-shadow: none !important; }
`;

_darkStyleForGame['doglover'] = `
#DOGFoodMode { filter: invert(1); }
#page-content { color: #fff; }
.DOG-watchdog { filter: var(--drop-shadow); }
`;

_darkStyleForGame['dogpark'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#bga-zoom-controls { filter: invert(0.8); }
.label-wrapper h2, .dp-help-button-wrapper .dp-help-button { background-color: var(--dark-20); color: var(--light-80); }
.dp-dial.side-front .side-front-overlay { border-radius: 50%; }
.bga-help_popin-button { background: #2b2d25; }
`;

_darkStyleForGame['dominoes'] = `
body { background: none !important; }
.map_zoom { filter: invert(1); }
`;

_darkStyleForGame['donuts'] = `
.ring_set { background-color: var(--dark-back); }
#boardback { filter: brightness(0.4); }
`;

_darkStyleForGame['dotsandboxes'] = `
#boardbkg, #boardbkg > * { filter: invert(1); }
:root { --emp-side-col: #333; --fil-side-col: grey; }
`;

_darkStyleForGame['downforce'] = `
.df-car-token-small { filter: var(--drop-shadow); }
`;

_darkStyleForGame['draculahelsing'] = `
.dh_board_title_graf { filter: var(--highlight); }
`;

_styleForGame['draftandwriterecords'] = `
#dwr-area-pref-background { display: none; }
`;

_darkStyleForGame['draftandwriterecords'] = `
.bx-pill { background-color: var(--dark-40); color: var(--light-80); }
#dwr-area-goal-container-wrap, #dwr-area-pref { background-color: var(--dark-back); }
.bx-counter { background-color: var(--dark-10); border: 1px solid var(--light-50); color: var(--light-80); }
.bx-checkbox-switch i { background-color: var(--light-50); }
.bx-checkbox-switch i:before { background-color: var(--dark-40); }
.bx-checkbox-switch i:after { transform: translate3d(4px, 3px, 0); background-color: #fff; height: 20px; width: 20px; }
.bx-checkbox-switch input:checked+i { background-color: var(--blue-70); }
.bx-checkbox-switch input:checked+i:after { transform: translate3d(22px, 3px, 0); }
.custom_popin { background: var(--dark-10); border: 2px solid var(--light-50); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
.dwr-card { border: 1px solid var(--dark-40); }
.dwr-section-type { color: #000; }
.dwr-icon { filter: var(--highlight); }
`;

_darkStyleForGame['draftcider'] = `
#btnwraps { color: var(--light-80); }
`;

_darkStyleForGame['draftosaurus'] = `
.player-label { background: var(--dark-10) }
#logs .die { filter: invert(1); }
.dino-number { color: #000; }
`;

_darkStyleForGame['dragonbridge'] = `
#nestCardCountContainer, #nestCounterContainer, #phases_wrap { color: #fff; }
.cardCountIcon, .nestCounterIcon, .deckCounterIcon { filter: var(--highlight-min); }
`;

_darkStyleForGame['dragoncastle'] = `
.playerTable > div:first-child { background: var(--dark-20) !important; }
`;

_darkStyleForGame['dragonheart'] = `
#ship_stack_count { color: #fff; }
`;

_darkStyleForGame['dragonline'] = `
#hand_title { left: 60px; }
`;

_darkStyleForGame['dragonwood'] = `
.sideheadbutton, .display_dice_button { background-color: #000; }
.roll_dice_button[style="background-color: rgb(0, 255, 0);"] { background-color: #006600 !important; }
.roll_dice_button { background-color: #006600; }
.ac_icon, .c_icon { filter: var(--highlight-min); }
.sidehead-tooltip, .summary-tooltip { color: var(--light-80); }
`;

_darkStyleForGame['dronesvsseagulls'] = `
#spectatorbox, div.spectator-mode { background-color: var(--dark-20); }
#pagesection_gameview .whiteblock { background: inherit; }
`;

_darkStyleForGame['duckcover'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.dc_board_name { background-color: var(--dark-20); }
.roundedbox { background-color: var(--dark-10) !important; }
#round-container-id, #discard-title-id, .title { color: #ffff80; }
.dc_captain_card { box-shadow: inset 0 0 20px 10px #ffff80; }
.dc_card_selected,.dc_target_inside:hover { outline: 3px solid #ffff80; }
.dc_target_outside:hover { outline: 3px dashed #ffff80; }
.eye:hover { filter: invert(1); }
`;

_darkStyleForGame['dungeonpetz'] = `
.outer_wrapper { position: relative; border-width: 0px; background: #fad9a7; }
#overall-content:before, #outer_wrapper:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left:0px; }
.side_title { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
`;

_darkStyleForGame['dungeonroll'] = `
.navigation>li { filter: invert(0.7); }
.navigation>li.selected { background-color: #7dff00; }
.dijitTooltipContainer .novice, .dijitTooltipContainer .master { color: #000; }
`;

_darkStyleForGame['dungeonrummy'] = `
#overall-content[style^="background-image"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }#overall-content { color: #fff; }
.cardspace { filter: brightness(0.9); }
#misfit_line { background: var(--dark-back); }
#toggle_trash_compress { color: var(--blue-10); }
.bgabutton_blue[style="background: green; border-color: green;"] { ${greenButton} }
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"]:hover { ${greenButtonOver} }
.bgabutton_blue[style="background: darkgoldenrod; border-color: darkgoldenrod;"] { ${yellowButton} }
.bgabutton_blue:not(.disabled)[style="background: darkgoldenrod; border-color: darkgoldenrod;"]:hover { ${yellowButtonOver} }
`;

_darkStyleForGame['dungeontwister'] = `
.tooltip_title { color: #000; text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['durak'] = `
.attacker_token, .defender_token { filter: var(--highlight-min); }
`;

_darkStyleForGame['dvonn'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#gipf-move-history-header { background-color: var(--dark-20); color: var(--light-80); border-top: 1px solid var(--light-50); }
.gipf-move-history-table tr:nth-child(odd) { background-color: var(--dark-30); color: var(--light-80); }
.gipf-move-history-table tr:nth-child(2n) { background-color: var(--dark-40); color: var(--light-80); }
#gipf-move-history-content, #gipf-move-history-header, .gipf-move-history-slidecontainer { border-left: 1px solid var(--light-50); border-right: 1px solid var(--light-50); }
#gipf-move-history-expand-collapse { background-color: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-50); border-top: none; }
#gipf-move-history-expand-collapse:hover { color: #fff; }
#gipf-move-history-content { border-bottom: 1px solid var(--light-50); }
.gipf-move-history-slidecontainer { background-color:var(--dark-20); }
.gipf-move-history-slider { background-color: var(--dark-40); }
.dvonn-piece-black, .dvonn-player-pieces-black { filter: var(--highlight-min); }
.gipf-button-panel { background-color: var(--dark-20); border: 1px solid var(--light-50); color: var(--light-80); }
.gipf-settings-panel { background-color:var(--dark-20); border: 1px solid var(--light-50); }
#gipf-settings-label { color: var(--light-80); }
`;

_darkStyleForGame['earth'] = `
.ea-player-panel-pill { background-color: var(--dark-40); }
.ea-pill-counter { color: #fff; }
.ea-objective-button .ea-pill-counter { color: #fff !important; }
.bx-checkbox-switch i { background-color: var(--light-50); }
.bx-checkbox-switch i:before { background-color: var(--dark-40); }
.bx-checkbox-switch i:after { transform: translate3d(4px, 3px, 0); background-color: #fff; height: 20px; width: 20px; }
.bx-checkbox-switch input:checked+i { background-color: var(--blue-70); }
.bx-checkbox-switch input:checked+i:after { transform: translate3d(22px, 3px, 0); }
.ea-player-panel-pill div[class^="ea-icon"]:not([class="ea-icon-card-type-fauna"]) { filter: invert(1); }
#logs div[class^="ea-icon"], .bgabutton_gray div[class^="ea-icon"], #pagemaintitletext div[class^="ea-icon"] { filter: invert(1); }
.ea-mini-card, .ea-main-action-id-color { border: 2px solid var(--light-70); }
.player-name a { background-color: transparent !important; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
.ea-dialog-card-detail-grid .ea-dialog-card-detail-jumper .ea-dialog-card-detail-jump-selected { border-bottom: 1px solid #fff; border-top: 1px solid #fff; }
#ea-area-card-hand .ea-card-bottom, .ea-area-player-tableau .ea-card-bottom, .ea-hand-float #ea-area-card-hand .ea-card-bottom { background-color: var(--dark-10); }
.ea-card-bottom i { text-shadow: none; }
#ea-area-card-hand-container, #ea-area-card-hand-container.ea-hand-float { background-color: var(--dark-back); }
.ea-counter { background-color: var(--dark-10); border: 1px solid var(--light-80); color: var(--light-80); }
.ea-objective-button { background-color: var(--dark-10); filter: var(--drop-shadow); }
.ea-dialog-objective-detail-player-name > span, .ea-objective-detail-progress > span { background-color: transparent !important; }
a.ea-main-action-id-color-0.ea-main-action-id-color-0, a.ea-main-action-id-color-0.ea-main-action-id-color-0:active { ${greenButton} }
a.ea-main-action-id-color-0.ea-main-action-id-color-0:not(.disabled):hover { ${greenButtonOver} }
a.ea-main-action-id-color-1.ea-main-action-id-color-1, a.ea-main-action-id-color-1.ea-main-action-id-color-1:active { ${orangeButton} }
a.ea-main-action-id-color-1.ea-main-action-id-color-1:not(.disabled):hover { ${orangeButtonOver} }
a.ea-main-action-id-color-2.ea-main-action-id-color-2, a.ea-main-action-id-color-2.ea-main-action-id-color-2:active { color: #fff!important; }
a.ea-main-action-id-color-3.ea-main-action-id-color-3, a.ea-main-action-id-color-3.ea-main-action-id-color-3:active { ${yellowButton} }
a.ea-main-action-id-color-3.ea-main-action-id-color-3:not(.disabled):hover { ${yellowButtonOver} }
a.ea-main-action-id-color-1.ea-main-action-id-color-1 div[class^=ea-icon], a.ea-main-action-id-color-2.ea-main-action-id-color-2 div[class^=ea-icon],
a.ea-main-action-id-color-3.ea-main-action-id-color-3 div[class^=ea-icon], a.ea-main-action-id-color-4.ea-main-action-id-color-4 div[class^=ea-icon], .bx-top-button-invalid div[class^=ea-icon] { filter: invert(1); }
.bx-top-button-invalid { ${disabledButton} }
.bgabutton_red { ${redButton} }
.bgabutton_red:hover { ${redButtonOver} }
#ea-area-card-hand-config, #ea-area-card-hand-config-control, .ea-hand-float #ea-area-card-hand-config, .ea-hand-float #ea-area-card-hand-config-control { background-color: var(--dark-40); }
#ea-area-card-hand-config-controller, .ea-hand-float #ea-area-card-hand-config-controller { color: var(--light-80); }
.ea-card-help { background-color: var(--blue-70); }
#ea-shortcut-area { background-color: var(--dark-back); color: var(--light-80); }
#ea-scorepad-container { background-color: var(--dark-back); }
#ea-scorepad { background: var(--dark-30); color: var(--light-80); }
#ea-scorepad-table .ea-scorepad-icon-container { color: #000; }
#ea-scorepad-table * { border-color: var(--light-50) !important; }
`;

_darkStyleForGame['earthabundance'] = _darkStyleForGame['earth'];

_darkStyleForGame['ecarte'] = `
.playertablename { text-shadow: none; }
#pagesection_gameview .playertable.whiteblock.vulnerable { background: #4d000080; }
`;

_darkStyleForGame['eck'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
.card_back.empty, .trick_card_margin.empty { outline: 2px dotted var(--light-50); }
`;

_darkStyleForGame['eightmastersrevenge'] = `
#didyouknow { color: var(--light-80); }
`;

_darkStyleForGame['ekonos'] = `
.player-name > a, .ekonos-scoreboard-label { color: #fff !important; }
`;

_darkStyleForGame['ekko'] = `
.ek_mini { background-color: var(--dark-back); }
.ek_mini_selected { border: 2px solid var(--red-30); }
.ek_deck_label p { color: var(--light-80) !important; }
`;

_darkStyleForGame['elawa'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#bga-zoom-controls { filter: invert(0.7); }
.player-table, .player-table .hand-wrapper { background: var(--dark-back); }
.player-table h3 { background: var(--dark-20); }
.center-spot-counter { background: var(--dark-10); box-shadow: 0 0 3px 1px #fff; color: var(--light-80); }
.bga-help_popin-button { background: #6a552f; }
`;

_darkStyleForGame['elgrande'] = `
.eg_panel .cab, .log .cab, .selectMoveContainer .cab { filter: var(--highlight-min); }
`;

_styleForGame['eminentdomain'] = `
.logs_on_floating_panel #player-board { background-color: #3c4249; }
`;

_darkStyleForGame['eminentdomain'] = `
.card_tooltipcontainer .tooltiptext { background-color: #000; }
`;

_darkStyleForGame['emdomicrocosm'] = `
.card_tooltipcontainer .tooltiptext { background-color: #000; }
`;

_darkStyleForGame['enemyanemone'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['envelopesofcash'] = `
.eoc-diceDish { background-color: var(--dark-back); }
.dijitTooltipContents h4, .standard_popin h4 { var(--light-80); }
.dijitTooltipContents .eoc-icon-end, .dijitTooltipContents .eoc-icon-env, .dijitTooltipContents .eoc-icon-funds,
.dijitTooltipContents .eoc-icon-type1, .dijitTooltipContents .eoc-icon-type2, .dijitTooltipContents .eoc-icon-type3 { filter: none; }
#pagemaintitletext span[style*="color:#000000"] { text-shadow: var(--text-w-shadow); }
`;

_styleForGame['equinox'] = `
#eqx-board-holder #eqx-grid .eqx-cell.eqx-cell-controller .playername { white-space: nowrap; }
`;

_styleForGame['eriantys'] = `
.logs_on_floating_panel .player-board { background-color: #b0d1e9; }
`;

_darkStyleForGame['eriantys'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#cog-icon { fill: var(--light-80); }
#settings-arrow { border-color: transparent transparent transparent var(--light-80); }
#settings-arrow:hover { border-color: transparent transparent transparent var(--light-70); }
.svg-zoom { filter: invert(0.7); }
.inner_player_board span { text-shadow: none; }
.tower { filter: var(--highlight-min); }
#assistant_cards_myhand, #assistant_cards_played { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['eternitium'] = `
.playerBoard:before, #playmat_container:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-radius: 8px;}
#playmat_container, #playmat_container > * { position: relative; }
.etmTooltipEffect, .etmTooltipName { color: var(--light-80); }
.etmTooltipStatus { color: var(--light-50); }
#playerHand { background-color: var(--dark-back); }
`;

_styleForGame['ethnos'] = `
.player_board { box-sizing: border-box; }
`;

_darkStyleForGame['ethnos'] = `
.player_name_000000 { text-shadow: var(--text-w-shadow); }
.board_color_000000 { border-color: var(--light-50); }
.my_expandable { border: 1px dotted var(--light-80); }
`;

_darkStyleForGame['euchre'] = `
.playertable.maker { background: #3f2128bf !important; }
.playertablename { text-shadow: none; }
.card { filter: var(--drop-shadow) brightness(0.9); box-shadow: none; }
.bgabutton_blue[style="background: darkgoldenrod; border-color: darkgoldenrod;"] { ${yellowButton} }
.bgabutton_blue[style="background: darkgoldenrod; border-color: darkgoldenrod;"]:not(.disabled):hover { ${yellowButtonOver} }
`;

_darkStyleForGame['evergreen'] = `
.eve_recap { background: var(--dark-40); color: var(--light-80); }
.bgabutton .eve_action-icon { filter: invert(1) hue-rotate(128deg) saturate(5); }
.eve_biome-power-icon { filter: invert(1) drop-shadow(0 0 .2px red); }
.eve_biome-icon { filter: drop-shadow(0 1px 0 #fff); }
`;

_darkStyleForGame['evolution'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.shadow_smallicon { filter: var(--drop-shadow); }
`;

_darkStyleForGame['expeditions'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.arrow.blue { background-color: var(--blue-50); }
`;

_darkStyleForGame['explodingkittens'] = `
.ek-player-area .ek-player-badges { background: var(--dark-back); }
.ek-player-area .ek-player-badges .ek-player-badge-player-hand-size .player-hand-card { filter: invert(0.7); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff;  color: var(--light-80); }
#bga-zoom-controls { filter: invert(0.7); }
.board, .token { filter: var(--drop-shadow); }
#popin_ekWelcomeDialogId_contents td.active-player-count, #popin_ekWelcomeDialogId_contents th.active-player-count { background-color: var(--green-30); border: 1px solid #696969; }
#pagesection_gameview .whiteblock, #table-decision, #neutralized_game_panel { background: var(--dark-30); }
legend { color: var(--light-80); }
`;

_darkStyleForGame['expressions'] = `
#harmony_wrap { background: var(--dark-40); }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['factum'] = `
.storytextarea[readonly] { background-color: var(--dark-10); }
.badge { filter: invert(0.7); }
html.darkpanel #player_boards .player-board.team_storyteller { background-color: var(--dark-20) !important; }
html.darkpanel #player_boards .player-board.team_storyteller_captain { background-color: var(--dark-10) !important; }
html.darkpanel #player_boards .player-board.team_judge { background-color: var(--dark-30) !important; }
html.darkpanel #player_boards .player-board.team_judge_captain { background-color: var(--dark-40) !important; }
`;

_darkStyleForGame['faifo'] = `
.game-table { background-image: none; background-color: var(--dark-back); }
.game-table [style*="color:black"] { color: var(--light-80) !important; }
.bg-light { background-image: none; background-color: var(--dark-20); }
.player-board-info-row { background-color: var(--orange-30); }
`;

_darkStyleForGame['fairytrails'] = `
body { background: none !important; }
`;

_darkStyleForGame['faraway'] = `
body { background: var(--dark-40); }
.fa_zone_desc { color: rgba(255,255,255,.5); }
#fa_zone_info { color: #fff; }
.fa_zone[style^="background-color: rgba(0, 0, 0, 0.1);"] { background: var(--dark-20)!important; }
.fa_region_score { background-color: var(--dark-10); border-color: var(--light-80); color: var(--light-80); }
.fa_card_back, .fa_card_front { filter: brightness(0.9); }
`;

_darkStyleForGame['farkle'] = `
#accumulated_score_wrap, #score_meter, #score_chart { background-color: var(--dark-back); color: var(--light-80); }
#btnContinueTurn[style="background: gray; border: 1px solid gray;"] { ${disabledButton} }
`;

_darkStyleForGame['farmclub'] = `
.fc_animal { filter: var(--highlight-min); }
`;

_styleForGame['feastforodin'] = `
#ffo-action-board-holder { padding-left: 16px; }
.ffo-card.ffo-card-weapon-bow { background-position: 33.5% 0 }
.ffo-card.ffo-card-weapon-snare { background-position: 44.9% 0; }
.ffo-card.ffo-card-weapon-spear { background-position: 56.15% 0 }
.ffo-card.ffo-card-weapon-sword { background-position: 67.4% 0 }
`;

_darkStyleForGame['feastforodin'] = `
.ffo-pref-background #overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.ffo-pref-background header, .ffo-pref-background body { background: none !important; }
.player-name .ffo-icon-eye { filter: invert(0.8); }
#ffo-modal #ffo-modal-content { background-color: var(--dark-back); border: 1px solid var(--dark-40); }
#feast-for-odin .ffo-tab { background-color: var(--dark-10); }
#feast-for-odin .ffo-tab:hover { background-color: var(--dark-30); }
.ffo-num-vp-token { background-color: var(--dark-10); color: var(--light-80); }
.ffo-player-board-main .ffo-player-name { background-color: var(--dark-back) !important; }
.ffo-player-board-main .ffo-player-name span:first-child, .ffo-player-board-main .ffo-player-name span:last-child { color: var(--light-80) !important; }
.ffo-main-resources .ffo-good, #logs .ffo-good.ffo-icon, #logs .ffo-icon.ffo-icon-d12 { filter: var(--drop-shadow-min); }
table.ffo-score-table thead th { background-color: var(--dark-30); color: var(--light-80); }
table.ffo-score-table { background-color: var(--dark-40); color: var(--light-80); }
table.ffo-score-table tr[style="border-top: 1px solid black"], table.ffo-score-table tr[style="border-top: 3px double black"] { border-color: var(--light-50) !important; }
`;

_darkStyleForGame['federation'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#logs .log.notif_clearEndOfRound .roundedbox,#logs .log.notif_startExecutivePhaseStep .roundedbox { background: var(--dark-30); }
#player_config #round-counter-wrapper { background: var(--dark-10); color: var(--light-80); }
#player_config #round-phase { background: var(--dark-30); color: var(--light-80); }
#federation-main-container #federation-left-column #left-column-selectors .display-selector { background: var(--blue-10); color: var(--light-80); border: 1px solid var(--light-50); }
#federation-main-container #federation-left-column #left-column-selectors .display-selector.active { background: var(--blue-70); }
`;

_darkStyleForGame['festival'] = `
html:not(.no-custom-background) #overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.floating-objectives #fes-objective-crowd-pleaser-row, #fes-objective-crowd-pleaser-row-pin-button { background: var(--dark-back); border: 1px solid var(--light-50); }
#fes-objective-crowd-pleaser-row-pin-button { box-sizing: border-box; color: var(--light-80); }
.jj-preferences-panel-category-label { display: none; }
.jj-preferences-panel-preference-wrapper { padding: 0.5em 0em; }
`;

_darkStyleForGame['festivibes'] = `
.card-stock .slot { background: var(--dark-back); }
.card-stock.event-slot .slot { background: var(--dark-20); }
.card-stock.event-slot .slot:nth-child(2n) { background: var(--dark-30); }
#settings-controls-container { background: var(--dark-10); }
`;

_darkStyleForGame['fibonachos'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000aa; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-name, .playertablename { text-shadow: none !important; font-weight: normal; }
`;

_darkStyleForGame['fifteendays'] = `
.pb_label { color: var(--light-80); }
`;

_darkStyleForGame['fika'] = `
#fika_show_card_list span { background-color: var(--dark-20); color: var(--light-80); text-shadow: none; }
.fika_slot:empty { background-color: var(--dark-30); }
.fika_greater { color: var(--light-80); }
.fika_card, .fika_log_card  { filter: brightness(0.9); }
`;

_darkStyleForGame['finca'] = `
#overall-content:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.fi_playerInfo.small .fi_food_count { color: #000; }
.fi_food.sprite-w_a .fi_food_count,.fi_food.sprite-w_i .fi_food_count { color: #fff; }
.fi_playerInfo.small .fi_request_playerInfo { background-color: var(--dark-40); }
.fi_players .fi_playerInfo { background-color: var(--dark-back); }
.fi_food_storage  { background-color: var(--dark-back); }
.fi_game_container .fi_main_board .fi_board_img:after { background-color: transparent; }
.log .timestamp { color: var(--light-80) !important; }
.fi_food, .fi_playerInfo .fi_request_playerInfo .fi_requestIcon { filter: var(--highlight-min); }
`;

_darkStyleForGame['fivethreefive'] = `
#overall-content[style*="background"] { background-color: var(--dark-10) !important; background-image: linear-gradient(45deg, var(--dark-10) 0%, var(--dark-40) 84%) !important; }
`;

_darkStyleForGame['fivetribes'] = `
#ft_player_hand, .ft_player_djinns { background-color: var(--dark-back); }
.ft_rsrc_card, .ft_tile { filter: brightness(0.9); }
.ft_counter.ft_slot_counter { z-index: 1; }
.ft_notselectable { filter: grayscale(.3); opacity: .6; }
:not(.disabled) { #ft_btn_undo, #ft_btn_score { ${greenButton} }
#ft_btn_undo:hover, #ft_btn_score:hover { ${greenButtonOver} }
#ft_btn_skip { ${purpleButton} }
#ft_btn_skip:hover { ${purpleButtonOver} } }
.ft_selectable, .ft_selected, .ft_turnselected { outline-color: #29a329 !important; }
.ft_activatable { outline-color: var(--blue-50) !important; }
`;

_darkStyleForGame['flamingpyramids'] = `
.py_fire_mode, .py_curse_mode { filter: var(--highlight); }
#py_fire_mode_txt, #py_curse_mode_txt { color: #fff; }
`;

_darkStyleForGame['fled'] = `
.fled_pile, .fled_inventory-slot { border: .1rem dotted var(--light-50); }
.fled_pile label { color: var(--light-50); }
.fled_inventory-slot:before { opacity: .2; }
.fled_board-button { background-color: var(--dark-10); border: .1em solid var(--light-80); color: var(--light-80); box-shadow: .2em .2em .2em rgb(255 255 255 / 20%); }
`;

_darkStyleForGame['fleet'] = `
#flt_game_area { color: #fff; }
#playertables h3[style="color:#000000;"], #flt_game_area span[id^="playerbid_"] { color: #fff !important; }
`;

_darkStyleForGame['flipfreighters'] = `
#ffg_showScoreDialogContent table tbody tr:nth-of-type(odd) { background-color: var(--dark-10); }
#ffg_showScoreDialogContent table tbody tr.ffg_highlight { background-color: var(--yellow-10); }
.ffg_board_title h1 span { background-color: var(--dark-0); }
#ffg_user_settings { outline-color: var(--light-50); }
#ffg_icon_settings, #ffg_round_label { color: var(--light-70); }
#ffg_showScoreDialogContent table tbody tr.ffg_highlight .ffg_player_col>.playername { text-shadow: 1px 0 1px #000,0 1px 1px #000,-1px 0 1px #000,0 -1px 1px #000; }
`;

_darkStyleForGame['flowers'] = `
.deckCounter { color: var(--light-80); }
.possibleMove { background-color: var(--dark-back); border: 1px solid var(--light-50); }
.scoreButterfly { filter: var(--highlight); }
`;

_darkStyleForGame['flowersmandalagame'] = `
.player_config_row svg, #board .flower .hint svg { filter: invert(0.7); }
#board .flower .flower-heart .stack-container .flo-label { filter: drop-shadow(1px 1px 2px black) drop-shadow(1px 1px 2px black); }
#board .flower .hint { background-color: var(--dark-40); border: 1px solid var(--dark-0); color: var(--light-80); }
`;

_darkStyleForGame['fluxx'] = `
#pagesection_gameview .whiteblock { color: #000; }
#flx-zoom-controls { background-color: var(--dark-20) !important; }
#flx-zoom-out, #flx-zoom-in { filter: invert(0.7); }
`;

_darkStyleForGame['forage'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }#overall-content { color: #fff; }
`;

_darkStyleForGame['forbiddenisland'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.side_title_wrapper { background: var(--dark-20); }
.card_icon, .player_symbol, .treasure_figure { filter: var(--drop-shadow); }
[style="color: blue"] { color: #6666ff !important; }
`;

_darkStyleForGame['forestshuffle'] = `
.player_config_row > div:last-child > svg { filter: invert(0.7); }
.deckinfo { background: var(--dark-back); color: var(--light-80); }
.player_config_row { border-bottom: 1px solid var(--light-50); }
#pin svg { filter: invert(0.8); }
.mobile_version #cards:not(.changed), body:not(.mobile_version) #cards.changed, .mobile_version #cards:not(.changed) #pin, body:not(.mobile_version) #cards.changed #pin { background-color: var(--dark-20); }
`;

_darkStyleForGame['foreverhome'] = `
#bga-zoom-wrapper #bga-zoom-controls { filter: invert(0.7); }
.fh-player-no-badge { background-color: var(--dark-20); border: 1px solid var(--light-50); color: var(--light-80); }
`;

_darkStyleForGame['forks'] = `
#forks_surface { color: #fff; }
`;

_darkStyleForGame['formulad'] = `
.FD-lap-no-icon { filter: invert(1); }
.FD-player-rank { filter: grayscale(1) invert(1); color: #000; }
#FDStatusBar { background-color: var(--dark-10) !important; color: var(--light-80); }
.tundra .dijitMenu, .tundra .dijitMenuBar { background-color: var(--dark-10); border: 1px solid var(--dark-40); color: #fff; }
.tundra .dijitMenuSeparatorTop { border-bottom: 1px solid var(--dark-40); }
.tundra .dijitMenuSeparatorBottom { border-top: 1px solid var(--dark-40); }
.tundra .dijitComboBoxMenu .dijitMenuItemHover, .tundra .dijitMenuItemSelected,.tundra .dijitMenuPassive .dijitMenuItemHover { background-color: var(--dark-30); }
.dijitMenuArrowCell { filter: invert(1); }
`;

_darkStyleForGame['fornorthwood'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.card>.card_text { color: #000; }
span[style*="color:#3c3c3c;"] { color: #999999 !important; }
#fief_move_left, #fief_move_right { background-color: var(--dark-back); color: var(--light-70); }
.visiting_space.currently_visiting { background: var(--dark-10); }
.visiting_space.currently_visiting:after { filter: saturate(3); }
`;

_darkStyleForGame['fortytwo'] = `
#card_log_table { background-color: var(--dark-back); color: #fff; }
#pagesection_gameview .whiteblock.playertable.declarer { background: #004d004d; border: 1px solid var(--dark-back); }
`;

_darkStyleForGame['fourcolorcards'] = `
#card_style_btn, #discard_btn, #ref_btn { color: var(--light-50); }
#card_style_btn:hover,#discard_btn:hover,#ref_btn:hover { color: var(--light-70); }
#overall-content { color: var(--light-80); }
#fcc_deck { background-color: #393714; }
#fcc_last_played_card { background-color: var(--dark-back); }
#fcc_deck_count { z-index: 1; }
.fcc_player_ground.player { background-color: var(--dark-30); }
.fcc_player_ground { background-color: var(--dark-40); }
.fcc_card_group { background-color: var(--dark-10); }
`;

_darkStyleForGame['fourgardens'] = `
body { background: none !important; }
.res_info_icon { filter: var(--highlight-min); }
#score_bar, #score_content { background-color: var(--dark-10); background-image: none; }
`;

_darkStyleForGame['fractal'] = `
div[class^="icon_placed_tiles"] { filter: var(--drop-shadow); }
`;

_darkStyleForGame['framework'] = `
body { background: none !important; }
#offer-row #available-tiles { background-color: var(--dark-back); }
.player-tab { background-color: var(--dark-back); border-left: 2px solid var(--dark-back); border-right: 2px solid var(--dark-back); }
#player-tabs, .player-table { border: 2px solid var(--dark-back); }
.player-tab-active { background-color: var(--dark-10); }
.fa6, #frm_drawbag > img { filter: invert(0.7); }
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel { filter: invert(1); }
.#000 { text-shadow: var(--text-w-shadow); }
#score_table thead th, #score_table tfoot th, #score_table tfoot td, #score_table tbody tr:nth-of-type(2n)>* { background-color: var(--dark-20) !important; }
.black { text-shadow: var(--text-w-shadow); }
.blue { color: #6666ff !important; }
.red { color: #ff3333 !important; }
`;

_darkStyleForGame['fromage'] = `
#overall-content:before, .player-board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-board { border-radius: 0 0 0 0; }
.fr-player-panel-row .resource-badge { background: var(--dark-30); border-color: var(--light-50); }
#fr-main-board-toggle-view-button { border-color: var(--light-50); }
#player_boards .fr-cheese-art { filter: var(--drop-shadow-min); }
#fr-game #fr-player-areas-wrapper #fr-player-areas-switcher .fr-player-areas-switch { background-color: #424c57; color: var(--light-80); }
#fr-game #fr-player-areas-wrapper #fr-player-areas .fr-player-area { background: var(--dark-back); }
#bga-zoom-controls { filter: invert(0.7); }
.fr-player-board { filter: brightness(0.9); }
`;

_darkStyleForGame['fruitpicking'] = `
#market_board { color: #fff; }
.seed, .seed_log { filter: var(--highlight-min); }
`;

_darkStyleForGame['gaia'] = `
.whitebg { background-color: var(--dark-back); background-image: none; }
#movedown, #moveleft, #moveright, #movetop { filter: invert(0.7); }
`;

_darkStyleForGame['gammelogic'] = `
.resume[style$="background-color: rgba(255, 255, 255, 0.5);"] { background-color: var(--dark-back)!important; }
#carddiv:before, #fonddiv_jungle:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_darkStyleForGame['gangofdice'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#god_round h2 { background: var(--dark-back); color: var(--light-80); }
#god_card_invite, #god_card_help { background: var(--dark-back); color: #fcc; }
`;

_darkStyleForGame['gangsta'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#twodecks > div { background: none !important; }
.team { filter: var(--highlight-min); }
.darkmode .current_player .whiteblock, .darkmode .opposing_player .whiteblock { background-color: var(--dark-back) !important; }
.dijitTooltipConnector { filter: none; }
`;

_darkStyleForGame['gardennation'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-board .counters .icon { filter: var(--drop-shadow); }
#bga-zoom-controls { filter: invert(0.8); }
#popin_gardennationHelpDialog { background-color: var(--dark-20); color: #fff; }
#help-popin h1 { color: #fff; }
.tooltip-important { color: #ff3333; }
.card.selected { box-shadow: 0 0 10px 10px #8a4252; }
#last-round { background-color: var(--red-10); }
`;

_darkStyleForGame['geekoutmasters'] = `
.counter, .write1, .write2 { color: #fff; }
.counter_value[style^="color: rgb(0, 0, 0)"] { color: #fff !important; }
`;

_darkStyleForGame['gemsofiridescia'] = `
.goi_thematicBackground #overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#bga-zoom-controls { filter: invert(0.8); }
.goi_cardContent { color: #000; }
`;

_darkStyleForGame['germanwhist'] = `
.playertablename { text-shadow: none; }
[style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['getonboard'] = `
#bga-zoom-controls { filter: invert(0.8); }
.player-table .name { background: #000; height: 36px; left: 60px; top: 97px; width: 137px; }
`;

_darkStyleForGame['getonboardparisrome'] = `
#bga-zoom-controls { filter: invert(0.8); }
.player-board .personal-objective-wrapper .arrow { filter: invert(0.7); }
.first-player-token { filter: var(--highlight); }
`;

_darkStyleForGame['ghostathome'] = `
.ghostathome-name-000000, [style="color: rgb(0, 0, 0); background-color: rgba(255, 255, 255, 0.376);"] { text-shadow: var(--text-w-shadow); }
.ghostathome-name-0000ff, [style="color: rgb(0, 0, 255); background-color: rgba(0, 0, 0, 0.125);"] { color: #8080ff !important; }
.ghostathome-deck, .ghostathome-player-label { background-color: var(--dark-20) !important; }
#hand-label, #deck-label { color: #fff; }
#zoom-holder { filter: invert(0.7); }
`;

_darkStyleForGame['giftoftulips'] = `
#overall-content { background-color: #000000A0; }
#pagesection_gameview .whiteblock.delft_border { background: #dcdcdcbf; }
.delft_border, .delft_border > * { filter: invert(1); }
`;

_darkStyleForGame['ginkgopolis'] = `
body { background: none !important; }
#generalSupplyPanel { background: var(--dark-back); }
#increaseZoomButton, #decreaseZoomButton { filter: invert(0.7); }
.zoneWrapper { background: var(--dark-20); }
.vp_panel, .res_panel, .newHandTile_panel { background-color: var(--dark-20); border-color: var(--dark-40); }
`;

_darkStyleForGame['girafferaffe'] = `
#overall-content:before { content: ""; background: #000000B0; position: absolute; width: 100%; height: 100%; }
#gr_redraw_title { color: #d17061; }
.gr_zone_bg { background-color: var(--dark-back); }
.gr_sorthand a { color: var(--light-80); }
`;

_darkStyleForGame['gizmos'] = `
#logs .gzs_log_token, .dijitTooltipContainer .gzs_tooltip_token { filter: var(--drop-shadow); }
#gizmos_board .end_banner, #gzs_end_banner, #logs .end_banner, .log .end_banner { background: var(--red-10); border: 2px solid var(--yellow-10); }
#gizmos_board .card, #gizmos_board .deck, .dijitTooltip .card { box-shadow: 5px 5px 5px #555; }
#gizmos_board .gizmos_container .player_name { text-shadow: none; background: var(--dark-back); }
#gizmos_board .gizmos_container .active_player .player_name { box-shadow: -7px -7px 8px var(--green-30), -7px 7px 8px var(--green-30), 7px -7px 8px var(--green-30), 7px 7px 8px var(--green-30); }
#button_cancel, #button_cancelPick, #button_pass { ${purpleButton} }
#button_cancel:hover, #button_cancelPick:hover, #button_pass:hover { ${purpleButtonOver}}
#player_boards .counter_pair:not(.count_0) .counter_token { filter: var(--drop-shadow); }
`;

_darkStyleForGame['glassroad'] = `
#board_legend_buildable, #board .tile_wrapper[data-buildable="1"]:before,#board_private_tiles .tile_wrapper[data-buildable="1"]:before, .gr_card_player_played_card:before { background: var(--dark-10); }
.playerboard, #board, .stockitem, .card_container, .tile_container, .card { color: #000; }
#toggle_history_exandable:link { color: var(--light-80) !important; }
.gr_playing_order_item { background-color: var(--dark-back); border: 1px solid var(--light-50); }
.gr_card_current_player { border: 4px solid var(--yellow-10); }
.spectatorMode .spectator_playerboard_hand_zone { border: 1px solid var(--light-50); }
#bga-zoom-controls { filter: invert(0.8); }
.cc_counter { background: var(--dark-40); }
.token.handSize { filter: invert(0.9); }
#gr_playing_order .bgabutton, .gr_help_wrapper a.bgabutton { border: 1px solid var(--light-50) !important; color: var(--light-50) !important; background: transparent !important; }
#gr_playing_order .bgabutton:hover, .gr_help_wrapper a.bgabutton:hover { border: 1px solid var(--light-80) !important; color: var(--light-80) !important; }
.stock_active_slot .inner_element, .tile_wrapper.active_slot:not(.selected) { border-color: var(--blue-50); }
.stock_active_slot .inner_element:hover { border-color: var(--blue-70); }
#button_undo { ${redButton} }
#button_undo:hover { ${redButtonOver} }
.qty-field .value-wrapper { background: var(--dark-10); border: none; }
#action-panel-errors .action-panel-error { background-color: var(--red-10); }
`;

_darkStyleForGame['glow'] = `
#zoom-controls, .icon.footprint { filter: invert(0.7); }
.player-board #firstPlayerToken { filter: var(--highlight); }
#middle-band { background: #000; color: #fff; }
#popin_glowHelpDialog { background: var(--dark-10); }
#help-popin h1 { color: var(--light-50); }
`;

_darkStyleForGame['gnomehollow'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-board { background-color: var(--dark-back); }
.count_mushroom { color: #000; }
.gh_pan .gh_logo { filter: var(--highlight-min); }
.sprite { filter: brightness(0.9); }
.drop-shadow { filter: brightness(0.9) drop-shadow(3px 2px 1px rgba(0, 0, 0, .8)); }
.aal-popup-overlay .aal-popup-content { background: var(--dark-10); color: var(--light-80); }
`;

_styleForGame['gravitysuperstar'] = `
.gsc_replay_token_zoom_5, .gsc_replay_token_zoom_10 { border-radius: 50%; }
`;

_darkStyleForGame['gravitysuperstar'] = `
#gsi_board_star_total { color: var(--light-80); }
.gsc_star_zoom_10 { filter: var(--highlight-min); }
`;

_darkStyleForGame['greasyspoon'] = `
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"] { ${greenButton}}
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"]:hover { ${greenButtonOver}}
`;

_darkStyleForGame['greatsplit'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.log, .roundedbox { background-image: none; }
.player_board_inner .player-name a { text-shadow: none; }
`;

_darkStyleForGame['greatwesterntrail'] = `
#gwt_markets { color: #fff; }
.player-area { background: #00000066; padding: 1em; }
.player-area h2 { text-shadow: none !important; }
.player-board-button-wrapper { top: 0.5em; }
#gwt_boards_area { gap: 0.5em; }
.pref-group { background-color: #000; }
.slider { background-color: #404347; border: 1px solid #8d8d8d; }
.slider:before { bottom: 3px; }
input:checked+.slider, #gwt_layout_wrapper input[type=radio]:checked+label, .block-user-pref-radio input[type=radio]:checked+label { background-color: var(--blue-70); }
#gwt_layout_wrapper label, .block-user-pref-radio label { background-color: var(--light-50); }
.fixed-player-board .me.white .player-board-and-tiles:not(.no-fixed), .fixed-player-cards .me.white .player-cards:not(.no-fixed), .shadow-white { box-shadow: 0 0 10px 1px #999; }
.fixed-player-cards .me .player-cards:not(.no-fixed), .fixed-player-board .player-board-and-tiles:not(.no-fixed) { background-color: var(--dark-back); }
.fixed-player-cards .me .player-cards:not(.no-fixed) .player-cards-button, .fixed-player-board .player-board-and-tiles:not(.no-fixed) .player-board-button  { background-color: var(--dark-20); border: 1px solid var(--dark-40); box-shadow: 0 2px 3px 1px var(--dark-40); }
#gwt_deck_info { background-color: var(--dark-10); color: var(--light-80); }
.gwt-sprite-exchange-token { filter: var(--highlight-min); }
#gwt_undo_button { border: 1px solid var(--light-50); }
#gwt_undo_button:hover { border: 1px solid var(--light-70); }
.fixed-player-board.fixed-player-cards .me { background-color: transparent; }
`;

_darkStyleForGame['grovesolitaire'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000C0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#overall-content { color: var(--light-80); }
#deck_counter { color: #000; }
`;

_darkStyleForGame['grumblestone'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.mywhiteblock, .nums { color: var(--light-80); }
.posG { filter: var(--highlight); }
`;

_darkStyleForGame['grund'] = `
#overall-content:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; }
.castletile-box p { background: var(--dark-20); }
.player-box .block-title { background: var(--dark-10); }
.whiteblock, .castle { background: var(--dark-back) !important; }
`;

_darkStyleForGame['goblinhood'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.player-table h3 { background: var(--dark-20); }
.player-table, .player-table h3 { border-color: var(--light-50); }
#decks #discard:empty { outline: 1px solid var(--light-50); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px var(--light-50); color: var(--light-80); }
#table-score .players-scores { background-color: var(--dark-20); color: var(--light-80); }
#table-score table tbody tr:nth-child(odd) { background-color: var(--dark-40); }
#table-score .players-scores .score-icon { color: #000; }
#table-score .players-scores .winner { background-color: var(--green-30); }
`;

_darkStyleForGame['gofish'] = `
.playertable_ff0000 { background-color: #1a000080 !important; background-image: none !important; }
.playertable_008000 { background-color: #001a0080 !important; background-image: none !important; }
.playertable_0000ff { background-color: #00001a80 !important; background-image: none !important; }
.playertable_f07f16 { background-color: #180c0280 !important; background-image: none !important; }
.playertable_982fff { background-color: #0d001a80 !important; background-image: none !important; }
.playertable_72c3b1 { background-color: #08121080 !important; background-image: none !important; }
#player_boards .white_text_shadow { text-shadow: none; }
`;

_styleForGame['gogoa'] = `
.logs_on_floating_panel #page-title { width: 100% !important }
`;

_darkStyleForGame['gogoa'] = `
.goa-tooltip-close-area { filter: invert(1); }
.goa-tooltip-active { background-color: var(--dark-back); }
`;

_darkStyleForGame['golems'] = `
.column_placeholder_gemdust { border: 1px dashed var(--light-70); }
.player_area_golems, .player_area_hand { border-top: 1px dotted var(--light-70); }
.player_area_resources { border-top: 3px solid var(--light-70); }
.column_placeholder_blue, .column_placeholder_yellow, .column_placeholder_red, .column_placeholder_green, .column_placeholder_gemdust { border: 1px dashed #99cfff; }
.counter_resource { color: #66b8ff; }
.panel_gems, .panel_resource, .panel_hand, .golem_icon { filter: var(--highlight-min); }
.panel_resource.gem_dust { filter: var(--highlight); }
.first_player { filter: invert(1); }
.player_label { color: #000; }
`;

_darkStyleForGame['goldblivion'] = `
html.darkpanel #player_boards .player-board.gb-player-panel-passed { background-color: var(--dark-40) !important; }
#player_boards .player-name a, .gb-area-player-title .player-name { background-color: transparent !important; }
.gb-area-player, .gb-detail-list { background-color: #272a2fa6; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
div.player-name > a, span.player-name { background-color: transparent !important; }
.bx-checkbox-switch i { background-color: var(--light-50); }
.bx-checkbox-switch i:before { background-color: var(--dark-40); }
.bx-checkbox-switch i:after { transform: translate3d(4px, 3px, 0); background-color: #fff; height: 20px; width: 20px; }
.bx-checkbox-switch input:checked+i { background-color: var(--blue-70); }
.bx-checkbox-switch input:checked+i:after { transform: translate3d(22px, 3px, 0); }
.bx-pill { background-color: var(--dark-40); color: var(--light-80); }
.gb-card-position { background-color: var(--dark-10); }
.gb-component-help { background-color: var(--blue-70); }
`;

_darkStyleForGame['goldncrash'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.player-info .hand-counter-wrapper svg { filter: invert(1); }
#goldncrash-main-container .goldncrash-player-board .columns-zone .column-holder .column-cards-holder { border: 1px dashed var(--light-80); }
.goldncrash-card .card-inner { filter: brightness(0.9); }
#popin_showSettings h2, .goldncrash_discard_popin h2, .goldncrash_popin_cards h2, .goldncrash_treasure_popin h2 { background: #4e3b27; color: var(--light-80); }
#popin_showSettings, .goldncrash_discard_popin, .goldncrash_popin_cards, .goldncrash_treasure_popin { background-color: #62411e; }
`;

_darkStyleForGame['goldwest'] = `
.gw-miner { filter: var(--drop-shadow); }
#gw-board, .stockitem, .gw-player-board { filter: brightness(0.9); }
.gw-player-board-resource-group { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['golf'] = `
#overall-content { background: none !important; }
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['golfie'] = `
#spectator-notification .spectator-banner, #display-all-scores-button, #bottom-retract-scores-button { background-color: var(--dark-10); color: var(--light-80); }
.gaming-section .score-board .player-score .header { color: var(--light-80); background-color: var(--dark-40); }
.gaming-section .score-board .player-score .content { color: var(--light-80); background-color: var(--dark-20); }
.gaming-section .score-board .player-score .header .playerIdentification { background-color: var(--dark-10); }
.gaming-section .score-board .player-score .content.content-turn-malus1, .gaming-section .score-board .player-score .content.content-turn-malus2 { background-color: var(--red-10); }
.gaming-section .score-board .player-score .content.content-turn-bonus1, .gaming-section .score-board .player-score .content.content-turn-bonus2 { background-color: var(--blue-50); }
.gaming-section .score-board .player-score .setScore { background-color: var(--yellow-10); }
.gaming-section .score-board .player-score .finalScore { background-color: var(--orange-30); }
.gaming-section .score-board .player-score>* { border: 1px solid var(--light-50); }
.statistiques-container__cards .number { background-color: var(--dark-20); color: var(--light-80); }
.players_panel_value, #logs [style*="background-color: #b2bb97"] { background-color: var(--green-30) !important; }
.players_panel_value.panel_combos, #logs [style*="background-color: #c1e1ff"] { background-color: var(--blue-10) !important; }
.players_panel_value.panel_lost_ball, #logs [style*="background-color: #ffc2b6"] { background-color: var(--red-10) !important; }
.players_panel_value.panel_total, #logs [style*="background-color: #fae5b7"] { background-color: var(--yellow-10) !important; }
.custom-tooltip-button { background-color: var(--dark-10)!important; border: .15rem solid var(--light-70); cursor: pointer;}
.decks-remaining-number { background-color: var(--dark-10); border: .2rem dashed var(--light-70); color: var(--light-70); }
.board-container .discard-section { background-color: var(--dark-20); border: .2rem dashed var(--light-70); }
.animation-control-title { color: var(--light-80); }
.animation-control-container .control-panel { background-color: var(--dark-10); }
.animation-control-container .control-panel__field { background-color: var(--dark-20); color: var(--light-80); }
#top-retract-scores-button { background-color: var(--blue-70); }
#top-retract-scores-button:hover { background-color: var(--blue-80); color:#fff; }
.cp_board__character-logo { filter: drop-shadow(2px 3px 2px var(--light-50)); }
`;

_darkStyleForGame['gomoku'] = `
.coord_label { color: #fff; }
`;

_darkStyleForGame['gonutsfordonuts'] = `
.gnfd_tooltip-text { color: #fff; }
.gnfd_tooltip-score { border: 1px solid #fff; border-radius: 12px; }
`;

_darkStyleForGame['goodcopbadcop'] = `
#board_area div[class^="player_name"] { background: var(--dark-30); border-radius: 8px; text-align: center; padding: 0.3em 0.5em; }
#board_area div[style^="color:#{PLAYER"] { display: none; }
#equipment_reference_header { color: #fff; }
.large_equipment_name, .large_equipment_effect { color: #000; }
`;

_darkStyleForGame['gostop'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#player_boards td.table_bordered { color: #000; }
`;

_darkStyleForGame['gosux'] = `
#gsxCardlist_container { background-color: var(--dark-20); color: var(--light-80); }
#gsxCardlist_container.visible { border: 1px solid var(--light-70); }
#gsxCardlist_header.clanChoose { background-color: var(--dark-40); }
#gosuxContainer { color: var(--light-80); }
.gsxCardSlot { outline: 2px dashed var(--light-70); }
.gsx_counter_none { opacity: .5; }
.gsx_keyword_text { filter: drop-shadow(1px 1px 1px black); }
`;

_darkStyleForGame['guildes'] = `
.round_infos { color: var(--light-80); }
`;

_darkStyleForGame['guile'] = `
.board { color: var(--light-80); }
`;

_darkStyleForGame['hacktrick'] = `
#turnControl, .textlabel, .counter * { color: var(--light-80) !important; }
.bgae_panel .bgae_content .panel { background-color: #000; }
`;

_darkStyleForGame['hadara'] = `
.had_player_p_icon, .had_cards, .had_coins { filter: var(--drop-shadow-min); }
.had_player_p_icon_1, .had_player_p_icon_2, .had_player_p_icon_3, .had_player_p_icon_0 { filter: none; }
.dijitTooltipContainer:has( > div > div.had_colony_tile),
.dijitTooltipContainer:has( > div > div.had_colony_tile) > div,
.dijitTooltipContainer:has( > div > div.had_colony_tile) > div > div
{ background-color: transparent !important; border: none !important; box-shadow: none !important; }
.dijitTooltip:has( > div > div > div.had_colony_tile) > div:first-child { display: none; }
.player-board { background-color: var(--dark-10); }
.had_game_board_player_name { background: var(--dark-back); }
`;

_darkStyleForGame['hadrianswall'] = `
.playercard { color: #000; }
.arcicon { filter: var(--drop-shadow) !important; }
.hwcard  .hwtext { color: #000; }
.discard, .hwturns .score { background-color: var(--dark-back); color: var(--light-80); }
.discard {  box-sizing: border-box; }
`;

_darkStyleForGame['haggis'] = `
.playertable_ff0000 { background-color: #800000cc !important; }
.playertable_008000 { background-color: #006600cc !important; }
.playertable_0000ff { background-color: #000080cc !important; }
`;

_darkStyleForGame['haiclue'] = `
.word { background: var(--dark-20); border: 1px solid #aaa; box-shadow: 2px 2px 2px rgba(255,255,255,.5); color: #fff; }
#clue_builder_container h3, .clue_container h3 { color: #fff; text-shadow: none; }
#clue_builder .word:hover { color: #222; }
.word_remove { color: #fff; }
.word_add { color: #ffffff66; }
.guess, .player_word div { background: var(--dark-back); }
`;

_darkStyleForGame['hanabi'] = `
.bgagame-hanabi #hanabi_prefs .bgabutton_gray { background: var(--dark-10); color: var(--light-80); }
.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover { background: var(--dark-30); }
.active_element.playerhand .playername { background-color: var(--red-10); }
.active_element.playerhand .playername span { color: var(--light-80); }
#clue_box { background-color: var(--dark-10); color: var(--light-80); }
.notouch-device .clue_option:hover { background-color: var(--dark-30); }
`;

_darkStyleForGame['hanamikoji'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
div#overall-content:not([style^="back"]) { color: #fff; }
`;

_darkStyleForGame['handandfoot'] = `
.card_type_icon { background-color: #fff; }
`;

_darkStyleForGame['happycity'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.card_holder { border: 4px dashed var(--light-50); }
.hc_player_board { color: #000; }
`;

_darkStyleForGame['harmonies'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.counters, #central-board-counter-wrapper { color: var(--light-80); }
.card-stock .slot { background: hsl(0deg 0% 11.5% / 40%); outline: 1px solid hsl(0deg 0% 54.37% / 40%); }
#generalactions .show-player-tableau a { color: var(--light-80); }
.active-zone .border { background: linear-gradient(90deg, #4e453b99 20%, #4e453b99 40%, #00000033 50%, #00000033 55%, #51493e10 70%, #4e453b99); background-size: 200% auto; }
.player-table .player-name { text-shadow: none; background: var(--dark-20); height: 20px; padding: 0.2em 0.5em; border-radius: 6px; }
.show-player-tableau, #generalactions { filter: invert(0.9); }
#player-help-visible-wrapper .player-help-visible { position: relative; filter: brightness(0.9); }
.card .card-sides .card-side { filter: brightness(0.9); }
.player-board[data-player-color=ff0000]:before { background-color: #800000; }
.player-board[data-player-color="008000"]:before { background-color: #060; }
.player-board[data-player-color="0000ff"]:before { background-color: #000080; }
.player-board[data-player-color=ffa500]:before { background-color: #996300; }
`;

_darkStyleForGame['harvest'] = `
.player-name a b, .player-name a[style] { text-shadow: none; }
.hrv-board-left-inner, .hrv-board-center-inner, .hrv-board-right-inner, .hrv-farmBoard { filter: saturate(0.7); z-index: 1; }
#hrv-board-left-marketLg, #hrv-board-left-marketSm { filter: saturate(0.7); z-index: 2; }
.hrv-character, .hrv-sunrise { filter: saturate(0.7); }
.hrv-icon-worker { z-index: 3; }
#hrv-buttonUndo { ${redButton} }
#hrv-buttonUndo:hover { ${redButtonOver} }
`;

_darkStyleForGame['hearts'] = `
.table_color { background-color: var(--dark-20); color: var(--light-70); }
.table_cell [style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['heat'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.player-table .player-board:before, #legend-table #legend-board:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
#tables .player-table, .player-table .hand-wrapper { background: var(--dark-back); }
#bga-zoom-controls { filter: invert(0.9); }
.player-board .icon { filter: var(--drop-shadow); }
html.darkpanel #player_boards .player-board.finished { background-color: var(--dark-40) !important; }
.player-board .order-counter { border: 2px solid var(--light-80); background-color: var(--dark-40); }
.player-board .order-counter.played { background-color: var(--dark-0); }
#help-popin .weather-card { box-shadow: none; }
#table-center #circuit, .card { filter: brightness(0.9); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
#leave-text { background: var(--dark-10); color: var(--light-80); }
.scorepad-image, .scorepad-image > * { filter: invert(1); }
.scorepad-image table tr td { text-shadow: none; }
`;

_darkStyleForGame['heatchampionship'] = _darkStyleForGame['heat'];

_darkStyleForGame['heckinhounds'] = `
.playertablename, .loaded_font_1 { text-shadow: none; }
.table_bordered { border: 3px ridge var(--dark-10); }
#round_wrap { color: var(--light-80); }
#overall-content.background_loaded { background-color: #173336; }
.playertable { border: thick outset #20435e; }
`;

_darkStyleForGame['hens'] = `
#page-content { color: var(--light-80); }
`;

_darkStyleForGame['herd'] = `
#board, #board > *, .die { filter: invert(1); }
`;

_darkStyleForGame['herrlof'] = `
.player_board_inner img[id^="tricks_icon"] { filter: var(--drop-shadow); }
`;

_darkStyleForGame['hex'] = `
.hex_menu_toggle_icon { filter: var(--highlight-min); }
.hex_menu_content { background: var(--dark-back); color: #fff; }
`;

_darkStyleForGame['hiddenleaders'] = `
.card-icon.icon-1, .card-icon.icon-2, .card-icon.icon-3, .card-icon.icon-4, .card-icon.icon-5, .card-icon.icon-6, .card-icon.icon-7, .card-icon.icon-10 { filter: invert(1); }
.player-head { background: var(--dark-back); padding: 0.1em 1em; }
.player-table-card-wrapper { background: var(--dark-back); border: 1px solid var(--light-50); }
.player-table { border: 2px solid var(--light-70); }
.player-table-card-wrapper .title { background-color: var(--dark-10); color: var(--light-70); z-index: 0; }
.player-table-card-wrapper .card-icon.icon { z-index: 1; }
.title-faction[data-faction="1"] { color: var(--light-80); }
.title-faction[data-faction="3"] { color: #8080ff; }
.title-faction[data-faction="3"] { color: #ff3333; }
.dijitTooltipContainer strong[style="color: #030303;"] { color: var(--light-80) !important; }
.dijitTooltipContainer i[style^="color:blue;"] { color: var(--blue-50) !important; }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
.cards-stack[data-empty=true] { background-color: var(--dark-back); }
#logs .card-name.faction-1, #maintitlebar_content .card-name.faction-1, #player_boards .card-name.faction-1,
#score-table .card-name.faction-1, .cardToolTip .card-name.faction-1, .player-table-card-wrapper .card-name.faction-1,
.title-faction .card-name.faction-1, .wg-card-gametext .card-name.faction-1, caption .card-name.faction-1,
.hiddenleaders_popin .hiddenleaders_popin_contents .helper-classes .helper-classes-row .helper-classes-column[data-class="1"] strong { text-shadow: var(--text-w-shadow); }
#hiddenleaders-score { background-color: var(--dark-back); color: var(--light-80); box-shadow: 2px 2px 3px 3px var(--dark-10); }
#hiddenleaders-score table tr td { text-shadow: none; }
.card-icon, .hiddenleaders_popin .hiddenleaders_popin_contents .helper-classes .helper-classes-row .helper-classes-symbol { filter: var(--highlight-min); }
#tabs-container .hd-tab { background: var(--dark-20); color: var(--light-80); }
.hiddenleaders_popin, .hiddenleaders_popin .hiddenleaders_popin_contents .helper-classes .helper-classes-row { background-color: var(--dark-20); color: var(--light-80); }
i[style*="color:blue"] { color:  var(--blue-50)!important; }
#board, .card .card-sides .card-side.herocard-front { filter: brightness(0.9); }
`;

_darkStyleForGame['highseason'] = `
#player_boards .eye, #titre { filter: invert(1); }
#player_board_compteur { background-color: var(--dark-10); }
#compteur { color: var(--light-80); }
.titlename { background-color: var(--dark-back); }
`;

_darkStyleForGame['hive'] = `
body { background: none !important; }
`;

_darkStyleForGame['hoarders'] = `
.vls-nut-counter { color: #000; }
`;

_darkStyleForGame['homesteaders'] = `
#top_texts { color: #fff; }
.log_train, .log_bid, .log_trade { filter: var(--highlight-min); }
.border_blue { border-color: #6666ff; }
.border_red { border-color: #ff3333; }
.tt_break span, .tt_dot span { background-color: #373737 ; }
`;

_darkStyleForGame['humanity'] = `
.player-board.spectator-mode * { color: #fff; }
.year { background: #000; color: #fff; }
#help-popin .help-section { background: var(--dark-40); }
#help-popin h2 { background: #000; }
#help-popin h2 .icon, .bga-zoom-out-icon, .bga-zoom-in-icon { filter: invert(0.7); }
#player_boards span[id^="science-counter-"], #research-positions > div:first-child { text-shadow: var(--text-w-shadow); }
#player_boards .icon, #player_boards .resource-icon, #firstPlayerToken { filter: var(--drop-shadow); }
.player-table { background: var(--dark-back); }
`;

_darkStyleForGame['hund'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.playertablename, .player-name, .player_score_value { text-shadow: none !important; }
`;

_darkStyleForGame['hydroracers'] = `
.hand_icon, .bag_icon { filter: invert(0.7); }
`;

_darkStyleForGame['iceandthesky'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.loaded_font_1, .loaded_font_2, .card_icon { text-shadow: none; }
`;

_darkStyleForGame['icecoldicehockey'] = `
.hv_indicator { color: #fff; }
#period { color: #ccccff; }
`;

_darkStyleForGame['illustori'] = `
body { background: none !important; }
.to_translate { color: #fff; }
.history_arrow { filter: invert(1); }
`;

_darkStyleForGame['imhotep'] = `
#status_bar { background: var(--orange-30); color: var(--light-80); }
#ships-wrapper, #table_sections_wrapper { overflow: hidden; filter: brightness(0.9); }
.cube-black.cube-small { filter: var(--highlight-min); }
`;

_darkStyleForGame['incangold'] = `
#pagesection_gameview .whiteblock { background: var(--dark-10); }
#decksizetext { color: #fff; }
`;

_darkStyleForGame['innovation'] = `
.card_name { text-shadow: var(--text-w-shadow); }
#main_area .bgabutton { color: #000; }
.hand_container, .achievement_container, .forecast_container, .safe_container, .score_container { background-color: transparent; }
.score_container, .achievement_container, #available_achievements_container, #available_special_achievements_container,
#available_standard_achievements_container, #decks_and_title, #junk_container { color: var(--light-80); }
.action_text, .echo_effect, .reference_card { color: #000; }
.display_container > div { background-color: var(--dark-back) !important; }
.dijitTooltipContainer .icon_help { width: 16px; height: 16px; }
.recto.S.card_back_text { color: #000; }
`;

_darkStyleForGame['innovationalpha'] = _darkStyleForGame['innovation'];

_darkStyleForGame['inori'] = `
#ino-board:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
#ino-rune-tile-stack-size, .ino_player-token-stack-size, .ino_supply-stack-size { color: #000; }
#ino-zoom-action-bar-plus svg, #ino-zoom-action-bar-minus svg { filter: invert(0.8);  }
.ino_empty-favor-token-supply, .ino_empty-rune-tile-stack { filter: drop-shadow(0 0 .1rem #fff) drop-shadow(0 0 .1rem #fff) grayscale(1) opacity(.5) !important; }
#ino-option-accordeon, #ino-options { color: var(--violet-80); }
.ino_meeple { filter: var(--highlight-min); }
.ino_card { filter: brightness(0.9); }
`;

_darkStyleForGame['insidejob'] = `
html { background: #1d4944; }
#settings-controls-container { background-color: var(--dark-20); background: var(--dark-20);}
#central-zone .player-info, .card-stock .slot { background-color: var(--dark-back); }
#central-zone .player-info .player-name { text-shadow: none; }
.bga-help_popin-button { background: var(--dark-30); color: #6dc5bb; }
.player-board[data-player-color="ff0000"]:before { background-color: #ff3333; }
.player-board[data-player-color="0000ff"]:before { background-color: #6666ff; }
`;

_darkStyleForGame['inventors'] = `
.playerzonewrap { background-color: var(--dark-back); }
`;

_darkStyleForGame['inverteddice'] = `
#page-content, .doubleempty { color: var(--light-80); }
#grend td[id^=num] { color: #000; }
#grend td { border-color: var(--light-80) !important; }
#result { background-color: var(--dark-back); border: 3px solid #178217; color: #178217; }
.ReRoll { filter: invert(1); }
#helpline > td { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['isleoftrainsallaboard'] = `
.passengersbag, .coaltype3, .oiltype3, .mypassengers, .mypassengersloaded { filter: drop-shadow(0.1vw 0.1vw 0.1vw #fff) !important; }
.mypassengerslog, .coaltype2, .oiltype2 { filter: var(--highlight-min); }
.board2 { color: #fff; }
#zoom-controls { filter: invert(0.8); }
.tooltip_card_text { background-color: #232a24; }
.cardboard, .mycardtooltip, .cardback, .boardcard, .boardcardother, .ticketcard, .destinationcard, .mycard, .mycarddeployed, .myboardcarddeployed, .mysecondarycarddeployed { filter: drop-shadow(.1vw .1vw .1vw #573404) brightness(0.9); }
`;

_darkStyleForGame['itsawonderfulworld'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.player-board:not(#iww-info):not(#spectatorbox):before { filter: grayscale(1); }
#player_boards .player-name { text-shadow: none; background-color: var(--dark-back); }
.avatar_active { filter: none; }
.iww-resources, .player_score { color: #000; }
.iww-tab { background-color: var(--dark-20); color: var(--light-80); }
.iww-tab.iww-tab-selected, .iww-tab:not(.iww-tab-selected):hover { background-color: #000; color: #fff; }
.doubletime_infos { color: #000; }
`;

_darkStyleForGame['iwari'] = `
#overall-content:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; }
.player-name { text-shadow: none; }
`;

_darkStyleForGame['jaipur'] = `
#jpr_board { filter: brightness(0.9); }
`;

_darkStyleForGame['jekyllvshide'] = `
span[style*="color:#161614"] { color: #868679 !important; }
`;

_darkStyleForGame['jumpdrive'] = `
.jdr-icon, .jdr-resource { filter: var(--highlight-min); }
.dijitTooltipContainer .jdr-card-income, .dijitTooltipContainer .jdr-card-special, .dijitTooltipContainer .jdr-card-vp { color: var(--light-80); }
.jdr-goalMarker { background: var(--orange-30); }
`;

_darkStyleForGame['justone'] = `
#overall-content, #left-side-wrapper { background: inherit !important; }
#card-mystery-header, #card-guess-header { color: #fff; }
.left-name, .right-name { background: var(--dark-20); border-radius: 8px; padding: 0.3em 0.5em; }
`;

_darkStyleForGame['k2'] = `
#k2_right_column .whiteblock h3 { color: #fff; }
.climber_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['kabaleo'] = `
.base, .mini_piece { filter: var(--drop-shadow); }
`;

_darkStyleForGame['kado'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.kd_header_round { color: var(--light-70); }
.kd_zone_bg_other { background-color: var(--dark-back); }
.kd_zone_gifter .kd_zone_bg_other { background-color: var(--dark-40); }
.kd_invite_icon > div { filter: var(--drop-shadow); }
.bgabutton_gray { background: #000; }
.notouch-device .bgabutton_gray:hover { background: var(--dark-10); }
#kd_banner { background-color: var(--dark-10) !important; color: var(--light-80); }
`;

_darkStyleForGame['kahuna'] = `
#round, #card_pool_wrapper { color: #fff; }
`;

_darkStyleForGame['kami'] = `
#playerTables:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['kamon'] = `
.black { text-shadow: var(--text-w-shadow); }
.black_hex { filter: var(--highlight-min); }
`;

_darkStyleForGame['karvi'] = `
#game_play_area { color: #fff; }
#karvi-tab-holder .tab { background-color: var(--dark-20); border: 2px solid var(--light-50); border-left: 0; }
#karvi-tab-holder .tab:hover, html.game_elements_tabs #karvi-tab-holder .tab.selected { background-color: var(--dark-40); }
#player_boards .player-panel-icon, .notif-icon { filter: var(--highlight-min); }
#karvi-game-holder .cards-holder .card-row-section { border-bottom: 1px solid var(--light-50); }
`;

_darkStyleForGame['keyflower'] = `
.player-name { text-shadow: none; }
.resource, .worker_mini { filter: var(--highlight-min); }
`;

_darkStyleForGame['khiva'] = `
body { filter: brightness(0.7); }
.kv_board_path_title { background-color: var(--dark-20); padding: 0.2em 0.5em; border-radius: 4px; margin-left: -1em; }
`;

_darkStyleForGame['kingdombuilder'] = `
.player-panel .player-settlements .player-settlements-counter { color: #fff !important; }
.dijitTooltip .tile-prompt { background-color: var(--dark-10)!important; border: 1px solid var(--light-50); }
#popin_chooseTile { background-color: var(--dark-0); }
#popin_chooseTile_contents .tile-prompt { background-color: var(--dark-10); }
#popin_chooseTile_contents .tile-prompt:hover { background-color: var(--dark-30); }
`;

_darkStyleForGame['kingdomino'] = `
body { background: none !important; }
.player_view, #info { background: var(--dark-back); color: #fff; }
#kingdom_label { background-color: var(--dark-20); margin: 0px; padding: 10px; }
div[style*="border-color: #0000ff"] { border-color: #6565ff !important; }
div[style*="border-color: #008000"] { border-color: #54aa54 !important; }
div[style*="border-color: #ff1493"] { border-color: #ff65b8 !important; }
div[style*="border-color: #ffa500"] { border-color: #ffc965 !important; }
.square:before { background: var(--dark-back); }
#kingdom:before { background: #272a2f66; }
#castle, .domino-background { filter: brightness(0.9); }
`;

_darkStyleForGame['kingsguild'] = `
#player_boards .resource, #logs .resource, #player_boards .cellcount, #player_boards .sigil { filter: var(--highlight-min); }
.tooltipLine { border-bottom: 2px solid var(--light-80); }
.actioncustombutton { background: #4d671999 !important; }
.actioncustombutton:hover { background: #4d6719 !important; color: #fff !important; }
`;

_darkStyleForGame['kingofthepitch'] = `
#overall-content, .player_info, .PH_cube_number, .PH_dice_number { color: var(--light-80); }
`;

_darkStyleForGame['kingoftokyo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#active-expansions-button { background: #737373; }
.kot-card .bottom, .kot-curse-card .bottom, .kot-evolution .bottom, .kot-tile .bottom,
.kot-card .bottom > *, .kot-curse-card .bottom > *, .kot-evolution .bottom, .kot-tile .bottom > * { filter: invert(1); }
.kot-card .description-wrapper, .kot-curse-card .description-wrapper, .kot-evolution .description-wrapper, .kot-tile .description-wrapper { color: var(--light-80); }
.dice-icon { filter: var(--highlight-min); }
#zoom-wrapper #zoom-controls { filter: invert(0.8); }
#monster-pick .monster-group { background: var(--dark-back); }
#popin_showActivatedExpansions { background: var(--dark-10); }
#popin_showActivatedExpansions h2 { color: var(--light-80); }
.card, .monster-figure, .monster-board { filter: brightness(0.9); }
`;

_darkStyleForGame['klaverjassen'] = `
.playerTables__roemScoredValue { color: #6666ff; }
.infobutton, .infotitle { color: #999999; }
table.tableScore td, .quickRefNote { color: #b3b3b3; }
`;

_darkStyleForGame['kmakici'] = `
.grid-discard { color: var(--light-80); }
.grid-player-chip, .grid-player-hand  { background-color: var(--dark-back); color: var(--light-80); }
#party_room { background-color: #103f56cc; color: var(--light-80); }
details summary { background: var(--dark-10); color: var(--light-80); }
`;

_darkStyleForGame['knarr'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
.player-crew-cards, #bga-zoom-controls { filter: invert(0.8); }
 .bga-help_popin-button, .bga-help_unfolded-content { background: var(--dark-20); }
.color-help-unfolded-content .label, .player-board.spectator-mode { color: #fff; }
.player-table .hand-wrapper { background: var(--dark-20); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
#table-center .bga-cards_deck-counter#discard-counter { background-color: var(--dark-40); }
[style="--player-color: #1e2c36;"] { --player-color:#5b86a4!important; }
[style="--player-color: #7c5654;"] { --player-color:#7c5654!important; }
`;

_darkStyleForGame['knister'] = `
.knister_playerheader { background-color: var(--dark-back); }
.knister_playersheet { filter: brightness(0.9); }
`;

_darkStyleForGame['knockoutwhist'] = `
#pagesection_gameview .whiteblock.warning { background: #4d000080; }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['krosmasterarena'] = `
.pageheader { background-color: var(--dark-20); }
.minidieface { filter: invert(1); }
`;

_darkStyleForGame['ladyandthetiger'] = `
.dijitTooltipContainer [style*="color: black;"] { color: var(--light-80) !important; }
.dijitTooltipContainer [style*="color: blue;"] { color: #6666ff !important; }
.dijitTooltipContainer .ltdr_trait { filter: var(--highlight); }
`;

_darkStyleForGame['ladyschoice'] = `
#overall-content { color: var(--light-80); }
`;

_darkStyleForGame['lagranja'] = `
.playerFarm > div:first-child > span:first-child { background-color: transparent !important; }
.card, .drawDeck { color: #000; }
.board, .drawDeck, .playerMat, .card { filter: brightness(0.75); }
`;

_darkStyleForGame['lama'] = `
#deckCount { color: #fff; }
`;

_darkStyleForGame['lamarcheducrabe'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#freed_crabs { color: var(--light-80); }
`;

_darkStyleForGame['lancaster'] = `
.board_castle_name { background: var(--dark-20); margin-top: 0.5em; padding: 0.3em 1em !important; border-radius: 8px; width: fit-content; }
#board_main_img, #board_law_img, #board_law img, .board_castle_img, .board_castle_container img { filter: brightness(0.9); }
`;

_darkStyleForGame['laserreflection'] = `
.lrf_progress-bar__text { color: #000; }
`;

_darkStyleForGame['lasvegan'] = `
#overall-content { background: var(--dark-back); }
`;

_darkStyleForGame['legendraiders'] = `
#tiles_stack_counter { color: var(--light-100); }
`;

_darkStyleForGame['lepidoptery'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.board_background:before{ content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.playertablename { text-shadow: none; }
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"] { ${greenButton}}
.bgabutton_blue:not(.disabled)[style="background: green; border-color: green;"]:hover { ${greenButtonOver}}
`;

_darkStyleForGame['lettertycoon'] = `
.lettertycoon_area { background: var(--dark-back); }
.lettertycoon_area .to_translate, .lettertycoon_deck_info { color: #fff !important; }
`;

_darkStyleForGame['letsgotojapan'] = `
.nameplayer, .playerhandtitle, .playerhand { background-color: var(--dark-back); }
.passingr, #mask_hand { filter: invert(1); }
.infotoolt, .traintoolt, .cardpasstoolt, .cardtoolt { outline: 2px solid var(--light-80); }
.infotexttoolt { color: var(--light-80); }
.cardbleu { background-color: #32839a80; }
.cardrose { background-color: #50162c80; }
.cardjaune { background-color: #aa782280; }
.cardpass { background-color: #338a9980; }
.eye:hover { filter: invert(1); }
`;

_darkStyleForGame['lewisclark'] = `
.player-name, .player_board_inner, .player_score { background-color: transparent; }
.resource { filter: var(--drop-shadow); }
.tooltipslide_overlay { background-color: var(--dark-30);  }
`;

_darkStyleForGame['libertalia'] = `
.discarded { filter: invert(0.7); }
`;

_darkStyleForGame['lielow'] = `
.lielow-name-with-bg-000000  { text-shadow: var(--text-w-shadow); }
.lielow-name-with-bg-ffffff { background-color: transparent; }
`;

_darkStyleForGame['lifeline'] = `
#board, #coords > * { filter: invert(1); }
`;

_darkStyleForGame['lineae'] = `
[style*="background-color: #ffffffcc;"] { background-color: var(--dark-back) !important; }
[style*="background-color: #edf2faff;"] { background-color: var(--dark-30) !important; color: var(--light-80); }
[style*="border: 2px dashed black;"] { border: 2px dashed var(--light-70) !important; }
[style*="border-left: 2px dashed black;"] { border-left: 2px dashed var(--light-70) !important; }
[style*="border-top: 2px dashed black;"] { border-top: 2px dashed var(--light-70) !important; }
.launched_rocket_div { filter: invert(0.7); }
`;

_darkStyleForGame['lineit'] = `
#overall-content:before { content: ""; background: #00000030; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back) !important; }
.name-wrapper { background: var(--dark-20) !important; }
.player-scored-card, .jackpot-icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['linesofaction'] = `
.bgae_panel .bgae_content .panel { background-color: var(--dark-back); opacity: 1; }
`;

_darkStyleForGame['linkage'] = `
#board, #stock { background-color: var(--dark-back); color: var(--light-80); }
#colourGroupsCounter { background-color: var(--dark-20) !important; color: var(--light-80) !important; }
`;

_darkStyleForGame['littlefactory'] = `
#board { filter: brightness(0.9); }
.card.cardplayer { filter: brightness(0.9) drop-shadow(.1vw .1vw .1vw #000); }
`;

_darkStyleForGame['liverpoolrummy'] = `
#handNumber { color: #fff !important; }
#redTarget, .prepbox, .prepjoker, .downWhite { color: var(--light-70) !important; }
html.darkpanel .player-board.playerBoardBuyer { background: #381e1e !important; }
html.darkpanel .player-board.playerWentDown { background: #1a3d22 !important; }
`;

_darkStyleForGame['livingforest'] = `
body { background: none !important; }
.icon_fragment { filter: invert(1); }
.lvf_playerboard_name { background: var(--dark-back); color: #fff; }
`;

_darkStyleForGame['locomomo'] = `
#overall-content:before { content: ""; background: #00000090; position: absolute; width: 100%; height: 100%; }
.loc_player-header { background-color: var(--dark-20); }
.loc_first-player { filter: var(--highlight-min); }
`;

_darkStyleForGame['logger'] = `
#board:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['lookatthestars'] = `
#cards #shapes .pile-wrapper .pile:empty { border: 1px dashed #ccc; }
#zoom-controls { filter: invert(0.7); }
#popin_lookatthestarsHelpDialog { background: var(--dark-20); color: #fff; }
#lookatthestars-help-button { background: var(--dark-30); color: var(--light-80); }
`;

_darkStyleForGame['looot'] = `
#back_layer:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#player_boards .player-name a { background-color: transparent !important; }
.score_header { border-bottom: 1px solid var(--dark-40); }
#scoretable { outline: 0.3em solid var(--dark-40); }
#scoretable .scorecell { background-color: var(--dark-30); border-left: 0.1em solid var(--dark-40); border-top: 0.1em solid var(--dark-40); }
#scoretable .scorecell.score.header.total { background-color: var(--dark-20); }
#scoretable .header, #scoretable .lheader { background-color: var(--dark-10); }
.player_name_holder { background: var(--dark-10) !important; }
.player_vikings_pool_counter { background: var(--dark-10); color: var(--light-80); }
.map_hex_holder, .player_board { filter: brightness(0.9); }
`;

_darkStyleForGame['lorenzo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.obr_select_bonus_tiles { filter: var(--drop-shadow); }
.obr_player_res_counter, .player_score_value { color: #9d7748; }
.obr_drafting_wrapper { background-color: var(--dark-back); color: var(--light-80); }
#obrTowerCardHelpWrapperId, #obrExcoMalusHelpWrapperId { background-color: var(--dark-back); }
.obr_tower_card_help_inline_wrapper, .obr_exco_malus_help_inline_wrapper { background-color: var(--dark-10); border: 2px solid var(--light-50); color: var(--light-80); }
#page-title .obr-dice { filter: var(--highlight-min); }
`;

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: #fff !important; }
`;

_darkStyleForGame['lostexplorers'] = `
.lex_nameplate { background-color: var(--dark-20); }
#lex_validated_header_caption, #lex_discard_header_caption { background-color: var(--dark-20); color: var(--light-80); }
#logs [class*="lex_monument_"] { filter: invert(0.7); }
.lex_playerboard { background: var(--dark-back); }
`;

_darkStyleForGame['lostseas'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.ls_reorg { background-color: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-80); }
.ls_board { background-color: var(--dark-back); }
.ls_table { background-color: var(--dark-back) !important; }
`;

_darkStyleForGame['loveletter'] = `
#ll_background:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#explanation_card_content, #explanation_card_content2 { background: var(--dark-20); margin-left: 0px; margin-right: 0px; padding: 10px; color: var(--light-80); }
.playertable_center .playertablecard { background-color: var(--dark-30); }
.cardtitle { color: #000; }
.player_sycophant { color: var(--light-80); }
`;

_darkStyleForGame['luckynumbers'] = `
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['ludo'] = `
.dice_table, .board_cell.safety_space { background: var(--dark-back); }
.dice_table td { color: var(--light-80); }
#game_board { filter: brightness(0.9); }
`;

_darkStyleForGame['lumen'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#spectatorbox { background-color: var(--dark-20) !important; }
#zoom-wrapper #map-controls button { background-color: var(--light-70) !important; border-color: var(--dark-40); }
#zoom-wrapper #map-controls button.active { background-color: #fff !important; border-color: #4871b6; }
#popin_lumenHelpDialog { background-color: var(--dark-20); color: #fff; }
#help-popin h1 { color: #fff; }
#help-popin .help-section { background: var(--dark-30); color: var(--light-80); }
.player-table .name-and-tiles>div, .player-table .name-and-tiles .name-wrapper { background: var(--dark-back); }
#scenario-name, #scenario-synopsis { background: var(--yellow-10); color: var(--light-80); }
#scenario-special-rules, #scenario-objectives { background: var(--dark-back); color: var(--light-80); }
#scenario-name .round { color: var(--light-50); }
.dijitTooltipContents #scenario-objectives, .dijitTooltipContents #scenario-special-rules { background: var(--yellow-10); }
#map, .player-table { filter: brightness(0.9); }
.player-board .counters { background: var(--dark-back); color: var(--light-80); }
.player-board#overall_player_board_0 { background: var(--dark-20); }
`;

_darkStyleForGame['lunar'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.playertablename { text-shadow: none; }
#trick_score_table { background: var(--dark-back); border: 1px solid var(--light-50); color: var(--light-80); }
.table_cell_content[style="color:green"] { color: #009e0a !important; }
.table_cell_content[style="color:red"] { color: #ff3333 !important; }
.table_cell_content[style="color:darkgoldenrod"] { color: #f2b926 !important; }
`;

_darkStyleForGame['lure'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#lure_wrap { color: var(--light-80); }
`;

_darkStyleForGame['luxor'] = `
#popin_chooseLayout { background-color: #4b3901; }
#popin_chooseLayout_contents .layout-prompt { background-color: #7e5d01; }
#popin_chooseLayout_contents .layout-prompt:hover { background-color: #c59207; }
`;

_darkStyleForGame['maatatahay'] = `
#logs .sprite { filter: var(--highlight); }
.ma_tile.selected { box-shadow: 0 0 6px 6px var(--dark-30); }
`;

_darkStyleForGame['machiavelli'] = `
font[color="blue"] { color: #8080ff !important; }
font[color="#000"], font[color="black"]  { text-shadow: var(--text-w-shadow); }
font[color="red"] { color: #ff3333 !important; }
`;

_darkStyleForGame['madeira'] = `
.money, .pirates { filter: var(--highlight-min); }
`;

_darkStyleForGame['mandala'] = `
#mdl_decks_area .mdl_decks_inner { color: var(--light-80); }
#mdl_decks_area .mdl_decks_inner .mdl_card_counter, #mdl_playmat .mdl_cup_counter { background-color: var(--dark-10); border: 1px solid var(--light-80); color: var(--light-80); }
#mdl_playmat { position: relative; }
#mdl_playmat:before { content: ""; background: #272a2f66; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: 1px solid var(--dark-40); box-sizing: border-box; }
#mdl_playmat .player-name { background-color: var(--dark-20); border-radius: 4px; }
`;

_darkStyleForGame['mantisfalls'] = `
a[style*="color: #000000"], h3[style*="color: #000000"]>span, span[style*="color:#000000"] { background-color: transparent; }
#event_header_label > span { background-color: transparent !important; }
`;

_darkStyleForGame['maracaibo'] = `
#mcb-tabContents { background-color: var(--dark-back); }
.mcb-closable.whiteblock { background: var(--dark-10) !important; }
`;

_darkStyleForGame['marcopolo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
.mp_playeraid { color: #000; }
.piece { filter: var(--drop-shadow); }
.piece.panel_hourglass { filter: var(--highlight); }
#transparent_figure { filter: grayscale(1) invert(1) !important; }
#board, .goal_card, .character, .parchment, .piece.contract_back, .mp_playeraid { filter: brightness(0.9); }
`;

_styleForGame['marcopolotwo'] = `
#cde-floating-menu-score > .fa-star { background-image: none !important; }
#cde-floating-menu-score > .fa-star:before { content: "\\f005" !important; }
`;

_darkStyleForGame['marcopolotwo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
.mp_playeraid { color: #000; }
.piece { filter: var(--drop-shadow); }
.piece.panel_hourglass { filter: var(--highlight); }
#transparent_figure { filter: grayscale(1) invert(1) !important; }
#board, .goal_card, .character, .parchment, .piece.contract_back, .city_card, .offer_tile { filter: brightness(0.9); }
#popin_gameSummaryDialog_contents p { color: var(--light-80); }
`;

_darkStyleForGame['marrakech'] = `
#board { filter: brightness(0.9); }
`;

_darkStyleForGame['marram'] = `
body { background: none !important; }
`;

_darkStyleForGame['martiandice'] = `
.turn-order { text-shadow: none; }
`;

_darkStyleForGame['mascarade'] = `
.hbz_tooltiptext { color: var(--light-90); }
`;

_darkStyleForGame['mastersofrenaissance'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#development_cards_grid, #market_grid { background-color: var(--dark-back); color: var(--light-80); }
#boards>div>div:last-child { background-color: var(--dark-back); }
#arrow_cont { border-top: 1px solid var(--light-50); }
.board { filter: brightness(0.9); }
[style*="--color:#0000ff"] { --color:#6666ff!important; }
[style*="--color:#008000"] { --color:#009e0a!important; }
[style*="--color:#ff0000"] { --color:#ff3333!important; }
`;

_darkStyleForGame['mattock'] = `
.coordinate { color: var(--light-80); }
`;

_darkStyleForGame['mechadream'] = `
.mad_layout_selector_inner { background: #000; border: 1px solid #fff; }
.mad_layouticon { background-color: #fff; }
.mad_score_icon { filter: var(--highlight-min); }
#mad_bg { background: none; }
.mad_playerboard_nameholder { background-color: var(--dark-20); border: 2px solid var(--light-50); }
`;

_styleForGame['megajackpot'] = `
.icon.inline.money { border-radius: 50%; }
`;

_darkStyleForGame['megajackpot'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player_cards { background-color: var(--dark-30); background-image: none; }
.playercard_counter { color: var(--light-80); }
.player_board .player_name { background-color: var(--dark-20); background-image: none; }
[style="--plcolor:#ff0000;"] { --plcolor:#ff3333!important; }
[style="--plcolor:#008000;"] { --plcolor:#009e0a!important; }
[style="--plcolor:#0000ff;"] { --plcolor:#6666ff!important; }
`;

_darkStyleForGame['megalomania'] = `
#PlayerTables { border: none; }
#PlayerTables.tableRed { background: linear-gradient(135deg,#331400,#260d13 50%,#331400); }
#PlayerTables.tableGreen { background: linear-gradient(135deg,hsl(158 96% 10% / 1),#013220 37%,#013220 63%,#013220 85%,#013220); }
#PlayerTables.tableBlue { background: linear-gradient(135deg,#121921,#172436 50%,#121921); }
.PlayerTable .PlayerTableTrickWon .PlayerTableTrickWonIcon { filter: invert(0.7); }
.red { background-color: var(--red-10); }
.yellow { background: var(--yellow-10); }
.blue { background: var(--blue-10); }
.black { background: var(--dark-10); }
#score { background: none; height: 460px; }
#score * { color: var(--light-80); }
#score td, #score th, .block-description { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['memoir'] = `
#clipboard-button { filter: invert(0.7); }
.card-text-container, .card-subtitle { color: #000; }
`;

_darkStyleForGame['meridians'] = `
#board, #board > * { filter: invert(1); }
.meridians_black_stone, .meridians_white_stone { border-radius: 50%; }
`;

_darkStyleForGame['metro'] = `
.mtr_hand_info_wrap { background-color: var(--dark-10); }
`;

_darkStyleForGame['metromaniab'] = `
.tunnels_count { color: #000; }
`;

_darkStyleForGame['mexica'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#mex_supply { background-color: var(--dark-back); color: var(--light-80); }
#mex_board { filter: brightness(0.9); }
#bga-zoom-wrapper #bga-zoom-controls { filter: invert(0.8); }
#mex_undo_button { ${redButton} }
#mex_undo_button:hover { ${redButtonOver} }
.head_warning { background-color: var(--orange-30); color: var(--light-80); }
.mex_temple:hover .mex_temple_level { background-color: var(--dark-back); }
`;

_darkStyleForGame['microdojo'] = `
.doubleempty { color: #fff; }
[style="color: blue;"] { color: #6666ff !important; }
`;

_darkStyleForGame['micromidgard'] = `
.doubleempty { color: var(--light-80); }
.myicon, .gold, .mead { filter: var(--drop-shadow-min); border-radius: 50%; }
[style="color: blue;"], [style="font-weight:bold;color:blue;"] { color: #6666ff !important; }
[style="color: red;"], [style="font-weight:bold;color:red;"] { color: #ff3333 !important; }
`;

_darkStyleForGame['middleages'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#overall-content { color: var(--light-80); }
#zone_market { background-color: var(--dark-back); }
.ma_zone_nobg { margin-top: 1px; }
.ma_zone_player_1, .ma_zone_playername_1 span { background-color: #684c5c; }
.ma_zone_player_2, .ma_zone_playername_2 span { background-color: #5c5250; }
.ma_zone_player_3, .ma_zone_playername_3 span { background-color: #56604f; }
.ma_zone_player_4, .ma_zone_playername_4 span { background-color: #726745; }
.ma_zone_player_5, .ma_zone_playername_5 span { background-color: #405b68; }
#player_board_config { background-color: var(--dark-40) !important; margin-bottom: 0.5em; }
.ma_header_buttons { filter: invert(1); }
.ma_popup_cards { background-color: var(--dark-20); }
#ma_event_title { color: var(--light-70); }
.ma_lineinfo_event { border: 1px solid var(--light-50); }
`;

_styleForGame['middleages'] = `
.logs_on_floating_panel #player_board_config { background-color: #ebd5bd; margin-bottom: 0.5em; }
.ma_token.ma_item.mf_init_no_anim { z-index: 1001; }
`;

_darkStyleForGame['mighty'] = `
.playertablename { text-shadow: none; }
#pagesection_gameview .playertable.whiteblock.declarer { background-color: #00004d99; }
#pagesection_gameview .playertable.whiteblock.friend { background-color: #004d0099; }
span[style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['mijnlieff'] = `
.mijnlieff_square.mijnlieff_legal { box-shadow: inset 0 0 10px #b2d0e6; }
`;

_darkStyleForGame['mindcycling'] = `
#mcy-country-select-content, #mcy-team-select-dialog { background-color: var(--dark-40); color: var(--light-80); }
.mcy-player-panel-award-container { box-shadow: inset 0 0 10px 2px rgb(255 255 255 / 50%); }
#mcy-board, #mcy-info-card { filter: brightness(0.9); }
`;

_darkStyleForGame['minnesotawhist'] = `
#logs strong[style="color:black;"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['mindup'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.darkmode .spectator-mode * { background: transparent !important; }
#round-counter-row #round-counter-block { background: var(--dark-20); text-shadow: none; }
.player-table, .player-table .name-wrapper { background-color: var(--dark-20); }
#table-center .slot .player-block { background: var(--dark-20); }
`;

_darkStyleForGame['minirogue'] = `
.mnr-card { color: #000; }
`;

_styleForGame['mlem'] = `
.logs_on_floating_panel #btn-box { display: none; }
.logs_on_floating_panel #right-side.pinned { position: static; }
`;

_darkStyleForGame['mlem'] = `
#btn-box { background-color: var(--dark-20); }
#pin-board-btn { filter: invert(0.7); }
`;

_darkStyleForGame['modx'] = `
#board { filter: invert(1); }
#board > div { filter: invert(1); }
#game_play_area { color: var(--light-80); }
.mdx_possibleMove { background-color: #000; }
`;

_darkStyleForGame['mojo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.mj_mini, .mj_deck_label { background-color: var(--dark-back); border: 1px solid var(--light-50); }
.mj_mini_title, .mj_deck_label { color: var(--light-80) !important; }
`;

_darkStyleForGame['monsterfactory'] = `
body { background: none !important; }
#page-content { color: #fff; }
.scrollerClass { border-color: var(--dark-20); background-color: var(--dark-back); }
.otherPlayerPossibleMove,.possibleMove { filter: invert(0.7); }
#popup { border-style: solid; border-width: 1px; background-color: var(--dark-40); }
`;

_darkStyleForGame['moonriver'] = `
.duaplayername { background-color: var(--dark-20); border: 1px solid #888; border-bottom: none; }
.player_table { border-color: #888; }
`;

_darkStyleForGame['morocco'] = `
.cube, .pieceC, .pieceT, .pieceRP, .StartPlayer { filter: var(--drop-shadow); }
`;

_darkStyleForGame['mountaingoats'] = `
.mountain_space { filter: drop-shadow(2px 2px 2px rgb(24, 24, 24)) brightness(0.9); }
.big_mountain_board { filter: brightness(0.9); }
`;

_darkStyleForGame['mow'] = `
#gamezone #playertables { background-color: #2a3d10; }
#gamezone #playertables .playertable { background-color: var(--dark-20); }
#direction-text { color: #fff; }
#direction-play-symbol { filter: invert(1); }
.counters .counter-icon.card, .counters .counter-icon.farmer-card { filter: var(--highlight-min); }
.stockitem, #gamezone #playertables .row .rowIndicatorWrapper #rowIndicator #rowIndicatorBackground { filter: brightness(0.9); }
`;

_darkStyleForGame['mrjack'] = `
#character-ability { background: var(--dark-20); color: #fff; border: 1px solid #fff; }
`;

_darkStyleForGame['mrjackpocket'] = `
#goal-info-inner, .available-option-back, .available-option-front, .round, .tale { filter: var(--highlight); }
span[style="color: blue"] { color: #6666ff !important; }
.tooltip-text { color: var(--light-80); }
`;

_darkStyleForGame['mue'] = `
#mue_gametarget { color: #fff; }
.mue_discard_btn { color: var(--light-70); }
.mue_isinchiefteam { background-color: #141414e6; }
.mue_isinmyteam,.mue_isinviceteam { background-color: #001a00e6; }
.mue_isinotherteam { background-color: #290000e6; }
.mue_infotable { background-color: #330; color: white; }
.mue_infotablename { color: white !important; }
`;

_darkStyleForGame['murusgallicus'] = `
#board { background-image: none; border: 2px solid var(--dark-40); filter: var(--drop-shadow); background: var(--dark-10); }
.coordinate { color: var(--light-80); }
.square { box-shadow: inset 0 0 0 1px var(--dark-40); }
.lastmove { background-color: var(--dark-40); }
`;

_darkStyleForGame['mutantcrops'] = `
#resource-supply .mtc_resource-quantity, .mtc_player-panel .mtc_tokens-container .mtc_token, .mtc_player-panel .mtc_round-information { color: #eb8b47; }
div#player-crops div.mtc_player-crops { background-color: var(--dark-20); border: 2px solid var(--dark-10); box-shadow: 5px 5px 5px var(--dark-0); }
div#player-crops div.mtc_player-crops .mtc_player-name { background-color: var(--dark-20); border: 2px solid var(--dark-10); border-bottom: none; }
.mtc_player-panel .mtc_tokens-container .mtc_meeple { filter: var(--drop-shadow); }
.mtc_first-player-marker-content { filter: invert(1); }
#display-preferences button { background: linear-gradient(0deg, #342a19, #4e3418 50%); color: #cc6333; }
#display-preferences button:hover { background: linear-gradient(0deg, #342a19, #4e3418); }
div#deck-display { background-color: var(--dark-20); border: 2px solid var(--light-50); box-shadow: none; color: #cc6333; }
#crops-deck, .mtc_crop, .mtc_field, .mtc_farmer-card { filter: brightness(0.9); }
`;

_darkStyleForGame['mycity'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.cty_header_extra { background-color: var(--dark-back); color: #fff; }
.cty_intro_header { filter: invert(1); }
.cty_header_extra h2, .cty_header_extra h3, .cty_header_extra h4 { color: #fff; }
.cty_intro { background-color: #000; color: var(--light-80); }
.cty_intro_rankings { border: 2px solid var(--light-80); }
.cty_intro_button { background-color: #6d122c; border: 2px solid #6d122c; }
.cty_intro_button:hover { background-color: #2c0712; color: var(--light-80); }
.cty_header_warning, #cty_header_warning { background-color: var(--dark-20); color: #fff; }
.cty_extra_button a { color: #fff; }
.cty_extra_button a:hover { color: var(--violet-80); }
.crt_header_button { background-color: var(--dark-20); border: 3px solid var(--light-50); color: var(--light-80); }
.crt_header_button:hover { border: 3px solid var(--light-80); }
.player_board_episodedone { background-color: var(--dark-back); border: 2px solid var(--red-10); color: var(--red-10); }
`;

_darkStyleForGame['mycityrb'] = `
.cty_header_extra { background-color: var(--dark-back); color: #fff; }
.cty_intro_header { filter: invert(1); }
.cty_header_extra h2, .cty_header_extra h3, .cty_header_extra h4 { color: #fff; }
.cty_intro { background-color: #000; color: var(--light-80); }
.cty_intro_rankings { border: 2px solid var(--light-80); }
.cty_intro_button { background-color: #6d122c; border: 2px solid #6d122c; }
.cty_intro_button:hover { background-color: #2c0712; color: var(--light-80); }
#cty_header_warning { background-color: var(--dark-20); color: #fff; }
.cty_player_pass_slot_graf { border: 2px solid var(--light-80); }
#overall-content:before { content: ""; background: #00000066; position: absolute; width: 100%; height: 100%; }
.cty_proba { background: #00000066; color: var(--light-80); }
.cty_campaign { position: relative; color: #fff; }
.cty_campaign_list_active { background-color: #000; }
.cty_compass {  position: relative; background-color: #00000066; color: var(--light-80); }
.cty_board_player_name_rb { background-color: #2e251a; color: var(--light-80); }
.bg-icon_compass, .bg-icon_compass_done { filter: var(--highlight-min); }
.crt_header_button { background-color: var(--dark-20); border: 3px solid var(--light-50); color: var(--light-80); }
.crt_header_button:hover { border: 3px solid var(--light-80); }
.player_board_episodedone { background-color: var(--dark-back); border: 2px solid var(--red-10); color: var(--red-10); }
`;

_darkStyleForGame['myshelfie'] = `
#settings-icon { filter: invert(1); }
#board-scale { filter: grayscale(1); }
#first_player_seat { filter: var(--drop-shadow); }
#main_area, .shelf-area { filter: brightness(0.9); }
.shelf-name { background-color: var(--dark-20); }
`;

_darkStyleForGame['mythicbattlesragnarok'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.whiteonboard { background-color: var(--dark-back); border: 3px solid var(--light-50); }
#textecategoryhero { color: var(--light-50); }
.side, .card, .dashboard { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['nachopile'] = `
#game_play_area { color: var(--light-80); }
.nachosmall, .smallnacho { filter: var(--highlight-min); }
`;

_darkStyleForGame['nainjaune'] = `
.card, .stock_card_border { filter: brightness(0.9); }
`;

_darkStyleForGame['naishi'] = `
#pagemaintitletext span[style*="background-color:#bbbbbb"] { background-color: transparent !important; }
.black_token { filter: var(--highlight-min); }
#overall-content { color: var(--light-80); }
.mountain { background-color: transparent; }
.horseman { color: #4778b8; }
`;

_darkStyleForGame['nanatoridori'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#overall-content { color: var(--light-80); }
.nana_hand { color: #000; }
`;

_darkStyleForGame['nangaparbat'] = `
.np_miniboard>.imgtext { filter: var(--highlight-min); }
`;

_darkStyleForGame['nap'] = `
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['nautilus'] = `
.whiteblock { background-color: var(--dark-40); background-image: none; border-radius: 8px; }
.dijitTooltipContainer [style="color:#09558D"] { color: #0e84d8 !important; }
.dijitTooltipContainer [style="color:#B3311A"] { color: #ff3333 !important; }
.dijitTooltipContainer [style="color:#09558D"] { color: #0f92f0 !important; }
.dijitTooltipContainer [style="color:#8F156F"] { color: #de21ac !important; }
.dijitTooltipContainer [style="color:#4D572D"] { color: #a0b168 !important; }
.dijitTooltipContainer [style="color:#000000"] { color: #fff !important; }
`;

_darkStyleForGame['neom'] = `
#neom-hand { background-color: var(--dark-back); }
.neom-cityboard-playername { filter: none; background-color: var(--dark-20); padding: 0.2em; border-radius: 8px; text-shadow: none; }
.neom-income .neom-income-icon, .dijitTooltip .neom-svg-road { filter: invert(1); }
.neom-income-text { color: var(--light-80); }
`;

_darkStyleForGame['neutreeko'] = `
#board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; left:0px; top:0px; }
`;

_styleForGame['newfrontiers'] = `
html.nft_background_space .logs_on_floating_panel .player-board { background-color: #333333 !important; }
.logs_on_floating_panel #goto_wrap { top: -5px; }
`;

_darkStyleForGame['newton'] = `
#player_boards hr { border: 1px solid var(--dark-40); }
.ntn-top-tooltip-area { background-color: var(--dark-back); color: var(--light-80); }
.ntn_top_carousel_button:hover { background-color: var(--dark-10); }
.ntn_top_carousel_button_content.ntn_top_carousel_button_content_text { color: #a85757; }
#ntn_shop_area { background-color: var(--dark-20); }
.player_summary_row .fa.fa-chevron-down, .player_summary_row .fa.fa-chevron-up { color: var(--red-10); }
`;

_darkStyleForGame['newyorkzoo'] = `
#generalactions .control-image { filter: invert(1); }
.mini_counter { color: var(--yellow-10); }
`;

_darkStyleForGame['nextstation'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
#nex_mainboard, .nex_scorepad { filter: brightness(0.9); }
`;

_darkStyleForGame['nextstationparis'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
#nex_mainboard, .nex_scorepad { filter: brightness(0.9); }
`;

_darkStyleForGame['nextstationtokyo'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
#nex_mainboard, .nex_scorepad { filter: brightness(0.9); }
`;

_darkStyleForGame['niagara'] = `
#board { filter: brightness(0.9); }
`;

_darkStyleForGame['nibble'] = `
.nib_board, .nib_counter .nib_disc, .card-stock.slot-stock, .nib_separators { filter: brightness(0.8); }
#bga-zoom-controls { filter: invert(0.8); }
.nib_collectionTitle { background-color: var(--dark-20); }
`;

_darkStyleForGame['nicodemus'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left:0px; }
#zoom-wrapper #zoom-controls { filter: invert(0.7); }
.cube { filter: var(--drop-shadow); }
#popin_nicodemusHelpDialog, #popin_nicodemusDiscardedDialog { background: var(--dark-20); }
#help-popin h1, #discarded-popin h1 { color: #fff; }
`;

_darkStyleForGame['nidavellir'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#turn-counter-holder, #layout-mode { filter: invert(0.7); }
.card-class-ranks, .card-class-score, .rank { filter: invert(1); }
#player-boards > div { background: var(--dark-20); border-radius: 8px; }
.player-board-name { background-color: var(--dark-30) !important; }
#nidavellir-board #player-boards .nidavellir-player-board .command-zone-container .hero-line { border-top: 1px dashed #fdfdfd66; }
`;

_styleForGame['nimalia'] = `
.game_interface #soundControls { left: 78px; }
`;

_darkStyleForGame['nimalia'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#settings-controls-container { background: linear-gradient(180deg,var(--dark-20),var(--dark-20)); }
.game_interface #soundControls { left: 94px !important; }
#goals-wrapper, .player-table, .card .card-sides .card-side { filter: brightness(0.9); }
#score #table-wrapper { background-color: var(--dark-20); }
#score #table-wrapper table tr td.player-name { text-shadow: none; }
`;

_darkStyleForGame['ninetynine'] = `
#decrev_player_name, .bgann_dealerindicator { color: #fff !important; }
.bgann_firstplayer { border: 2px dashed var(--light-80); }
.bgann_icon { filter: var(--highlight-min); }
.bgann_trump_black, .bgann_trump_none { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['ninjan'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.dijitTooltipContainer .tooltip-wrapper { background: transparent; }
.dijitTooltipContainer .tooltip-wrapper .suits-container .suit-row:after { background-color: #da3d25; }
.log-arrow { text-shadow: var(--text-w-shadow); }
.a-card { filter: brightness(0.9); }
`;

_darkStyleForGame['noah'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#zoom-controls { filter: invert(0.7); }
.table-counter-wrapper, #help-popin h1 { color: #fff; }
#popin_noahHelpDialog { background: #0b2e41; color: #fff; }
#table #center-board { filter: brightness(0.9); }
#table .ferry-spot.active { background-color: #00000055; }
@keyframes glow { 0% { box-shadow: 0 0 10px 10px #00000055 } to { box-shadow: 0 0 20px 20px #00000055 } }
#noah-help-button { background: var(--dark-20); box-shadow: 3px 5px 5px 0 #00000055; color: var(--light-80); }
`;

_darkStyleForGame['noirkvi'] = `
.shiftArrow { filter: invert(0.7); }
`;

_darkStyleForGame['noneshallpass'] = `
#zoomin, #zoomout { background-color: transparent; box-shadow: none; filter: invert(0.7); }
[style="color: #0000aa;"], [style="color:#0000aa"] { color: #6666aa !important; }
[style="color: #000000;"], [style="color:#000000"] { text-shadow: var(--text-w-shadow) }
`;

_darkStyleForGame['norsemen'] = `
#nor-option-accordeon, #nor-options { color: #d04949; }
.nor_icon-Normandy { filter: var(--highlight-min); }
.nor_icon-1vp, .nor_icon-2vp, .nor_icon-silverCoin1, .nor_icon-silverCoin2, .nor_icon-silverCoin3 { border-radius: 50%; }
`;

_darkStyleForGame['notalone'] = `
.player-board { background: transparent !important; }
.player-board.selectable .player_board_inner { border-color: green !important; }
.player-board.selectable .player_board_inner:hover { border-color: lime !important; }
.placeCard .description, .placeCard h3, .huntCard p.phase, .huntCard p.description span, .huntCard h3 { color: #000; }
.player-name { text-shadow: none; }
`;

_darkStyleForGame['novaluna'] = `
body { background: none !important; }
.disc { color: #000; }
.disc_3 { color: #fff; }
.player_map { background-color: var(--dark-back); }
`;

_darkStyleForGame['nowboarding'] = `
.wikicontent [style^="background: #FFF8E1;"] { background: var(--yellow-10) !important; }
.wikicontent [style^="background: #E3F2FD;"] { background: var(--blue-10) !important; }
#chatbar .chatwindowlogs_zone .roundedboxinner .msgtime { color: #777; }
#chatbar .chatwindow .chatlog.ownchatlog .playername, #chatbar .chatwindow .chatlog.sameauthor .playername,
#chatbar .chatwindow .chatwindowtype_privatechat .playername { display: none !important; }
.load_previous_message { background: #00000080; }
#nbchat .chatbarbelowinput { background: var(--dark-40); }
.player-board .player-name a { text-shadow: 1px 1px #000 !important; }
#nbprogress { background: var(--dark-20); }
`;

_styleForGame['numberdrop'] = `
#darkmode-switch { display: none; }
div.preference_choice:has(> div > div > select#preference_control_100) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_100) { display: none; }
`;

_styleForGame['nylonppong'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_darkStyleForGame['oasis'] = `
.cards-counter.counter { filter: invert(0.7); }
.title { background-color: var(--dark-20); padding: 0.2em 0.5em; top: -20px; border-radius: 8px; }
`;

_darkStyleForGame['obsession'] = `
#zoomIn, #zoomOut { filter: invert(1); }
#pagesection_gameview { color: #fff; }
#pagesection_gameview .playerName { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 0.5em; }
#themeCardReveal { background-color: var(--dark-20); }
[id^="playerDiscardContainer-"] { filter: none !important;  background-color: var(--dark-back) !important; }
`;

_darkStyleForGame['odicey'] = `
#odi_bluePort:before, #odi_redPort:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.odi_port { outline: var(--diceBorder) solid var(--dark-10); }
#odi_mainboard, #dice_pit { filter: brightness(0.9); }
`;

_darkStyleForGame['odin'] = `
.background-container { filter: brightness(0.6); }
.log-arrow.log-arrow-right { color: var(--light-80) !important; }
.a-card.game-area-card { filter: brightness(0.9); }
.table-container .table-owner-name-container { background-color: var(--dark-back); color: var(--light-80); }
.table-container .table-owner-name-container .table-owner-player-name { text-shadow: none; }
.odn-yellow-button { ${orangeButton} }
.odn-yellow-button:hover { ${orangeButtonOver} }
`;

_darkStyleForGame['ohseven'] = `
.o7-table-card-label { background-color: var(--dark-20); }
`;

_darkStyleForGame['offtherails'] = `
#jewel_bag, .otr_cart_button, .otr_cart_ready { filter: var(--drop-shadow); }
.otr_mission_counter_icon { filter: var(--highlight-min); }
#board, #mission_stock { filter: brightness(0.9); }
`;

_darkStyleForGame['ofknightsandninjas'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.playertable, #myhand_wrap, #okan_selection_wrap, .okan_pile_wrap{ background: var(--dark-back); }
#playertables { color: var(--light-70); }
`;

_darkStyleForGame['ohhell'] = `
#table .table_player_name { background-color: var(--dark-20); }
.card_type_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['okanagan'] = `
#player_boards .tokencontainer { filter: var(--drop-shadow); }
.exchangeImg { filter: invert(1); }
.Help_info { background-color: var(--dark-10); }
#buttontableelement, .buttonswapview { filter: invert(0.8); }
`;

_darkStyleForGame['onda'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['oneohone'] = `
.ooo_playerName { background-color: var(--dark-20); }
`;

_darkStyleForGame['openfacechinesepoker'] = `
.name_shadow { text-shadow: none; }
#pagesection_gameview .whiteblock.playertable { position: relative; }
#pagesection_gameview .whiteblock.playertable:before { content: ""; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; }
#pagesection_gameview .whiteblock.playertable_ff0000:before { background: #ff000026; }
#pagesection_gameview .whiteblock.playertable_008000:before { background: #00800026; }
#pagesection_gameview .whiteblock.playertable_0000ff:before { background: #0000ff26; }
#pagesection_gameview .whiteblock.playertable_982fff:before { background: #982fff26; }
.stock_card_border { filter: var(--drop-shadow) brightness(0.9); box-shadow: none; }
`;

_darkStyleForGame['openseason'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.playerPersonnalZone_playerName span { text-shadow: 2px 2px 15px #000, 0 0 25px #000, 0 0 30px #000; }
.handCardZone { background-color: var(--dark-back); outline: var(--cardBorder) dashed var(--light-50); }
#zoomControler { filter: invert(0.7); }
`;

_darkStyleForGame['oriflamme'] = `
.orf-tip-stack, .orf-tip-card { color: #000; }
`;

_darkStyleForGame['origin'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.player_board_inner, #player_boards .player-name, .player_score { background-color: transparent; }
.roundedbox { background-color: var(--dark-10) !important; }
#board_tribes .tribe { filter: var(--drop-shadow); }
`;

_darkStyleForGame['orleans'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#orl-main-reserve-craftsman, #orl-main-reserve-trader, #orl-main-reserve-scholar, .orl-follower-art.small { border: 1px solid var(--light-50); border-radius: 50%; box-sizing: border-box; }
#popin_orl-player-aid-dialog_close i { border-radius: 50%; background: var(--dark-20); height: 30px; }
#popin_orl-scoresheet-dialog #orl-scoresheet { color: #000; }
#orl-main-game-panel #orl-main-game-panel-buttons { background: var(--dark-10); }
#jj-preferences-panel { background-color: var(--dark-20); }
#jj-preferences-panel #jj-preferences-panel-content .jj-preferences-panel-category-label, #orl-main-game-panel #orl-round-counter-wrapper { background: var(--dark-0); }
#orl-main-place-tiles-wrapper h1 { color: var(--light-80); }
.orl-trading-station .card-side { filter: drop-shadow(1px 1px 1px #8e8e8e); }
.orl-player-area-tab-content { background: var(--dark-back); }
.jj-tab-manager-tab span[style*="text-shadow: none;"] { text-shadow: none!important; }
.jj-ui-hint-box { background-color: var(--dark-40); }
.orl-additional-board.orl-additional-board-player, .card, .jj-tab-manager .jj-tab-manager-tabs { filter: brightness(0.9); }
#undoAll,#undoLast,.bgabutton_yellow { ${yellowButton} }
#undoAll:hover,#undoLast:hover,.bgabutton_yellow:hover { ${yellowButtonOver} }
.bgabutton.selected { ${greenButton} }
.bgabutton.selected:hover { ${greenButtonOver} }
.token { filter: var(--drop-shadow); }
`;

_darkStyleForGame['oxono'] = `
.black { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['pacifica'] = `
#overall-content:before, .playerscore:before, .center:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.center, .center > * { position: relative; }
.score { color: var(--light-80); }
`;

_darkStyleForGame['painttheroses'] = `
#overall-content[style^="background"] { background-image: none !important; background-color: #1f6a6c !important; }
.dijitTooltipContainer [style="color:purple"] { color: #e600e5 !important; }
panel_card_space.empty { border: 2px dotted var(--light-50); }
`;

_darkStyleForGame['palace'] = `
.whiteblockheading { background-color: #000; }
#backdrop { background-color: #030; }
`;

_darkStyleForGame['pandaspin'] = `
#overall-content { background: var(--dark-40); } /* for archive replay */
.player_board_config { z-index:1; color: var(--light-80); }
.ps_deck_icon { filter: var(--highlight-min); }
.ps_zone { background-color: var(--dark-back); color: var(--light-80); }
.ps_zone_play p { background-color: var(--dark-10) !important; }
.ps_help .ps_help_content { color: var(--light-80); }
.ps_popup_content { background-color: var(--dark-30); border: 1px solid var(--dark-40); }
.ps_card_back, .ps_card_front { filter: brightness(0.9); }
`;

_darkStyleForGame['pandemic'] = `
.player-board-pandemic__title, .player-name { text-shadow: var(--text-w-shadow); }
.pdm-whiteblock { background-color: var(--dark-back); }
#o-archives h3, .pdm-hand h3 { background-color: var(--dark-20); color: var(--light-80); }
#player_boards .player-name, #player_boards .player-board-pandemic__title { text-shadow: none; }
.bg-token_cube_4 { filter: var(--highlight-min); }
`;

_darkStyleForGame['papayoo'] = `
#pagesection_gameview .whiteblock { background: none; }
#playertables { background-color: #183422; }
.playertable { background-color: var(--dark-20); color: #fff; }
.player-board { background-color: var(--dark-20); }
`;

_darkStyleForGame['parisconnection'] = `
.pk-log-train1 { text-shadow: var(--text-w-shadow); }
.pk-log-train2 { color: #6666ff; }
.pk-log-train5 { color: #ff3333; }
.pk-log-city-1, .pk-log-city-2, .pk-log-city-3, .pk-log-city-4 { color: #000; }
.pk-icon-train { filter: var(--drop-shadow); }
`;

_darkStyleForGame['parklife'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_darkStyleForGame['parks'] = `
.pks-token.pks-token-resource { color: #000; filter: var(--drop-shadow); }
`;

_darkStyleForGame['patchwork'] = `
.bgabutton .control-image { filter: invert(1); }
#miniboard_0000ff .empty_icon { background-color: #039fb0; border-color: #fff; }
#miniboard_ff0000 .empty_icon { background-color: #8d3f25; border-color: #fff; }
.time_icon { filter: invert(0.9); }
.market .patch { filter: drop-shadow(2px 2px 2px black) brightness(0.9); }
.pboard, .scoreboard, .pbutton { filter: brightness(0.9); }
`;

_darkStyleForGame['pathofcivilization'] = `
.counter-sub:not(.symbol) { background: var(--dark-10); border: 1px solid var(--light-50); }
.counter-sub.symbol { color: var(--light-80); text-shadow: none; }
.player-table { background: var(--dark-back); }
#bga-zoom-controls { filter: invert(0.7); }
.battle-card .name, .challenge-card .name { background: var(--orange-30); color: var(--light-80); }
.leader-card .card-sides .card-side.front .name, .wonder-card .card-sides .card-side.front .name { background: var(--dark-20); color: var(--light-80); }
.dijitTooltipContainer [style="color: #000000"] { color: var(--light-80)!important; }
.dijitTooltipContainer strong { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
`;

_darkStyleForGame['paxpamir'] = `
#pp_supply { background-color: var(--dark-20); color: var(--light-80) }
#pp_discard_pile { border: 4px dashed #fff; }
.pp_discarded_card { border: 1px solid #fff; }
.pp_deck_counters_container { background-color: var(--dark-10); border-color: var(--light-70); }
.pp_log_token.pp_log_token_rupee, .pp_log_token.pp_region_icon { filter: var(--highlight-min); }
.pp_icon_count { border-color: var(--light-70); background-color: var(--dark-10); color: var(--light-80); }
.pp_player_hand { background-color: var(--dark-back); color: var(--light-80); }
#pp_map, #pp_market_board { filter: brightness(0.9); }
#afghan_button { ${greenButton} }
#afghan_button:hover { ${greenButtonOver} }
#british_button { ${pinkButton} }
#british_button:hover { ${pinkButtonOver} }
#russian_button { ${yellowButton} }
#russian_button:hover { ${yellowButtonOver} }
.pp_player_tableau:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['paxrenaissance'] = `
#pr_open_hands_button .pr_icon, #pr_information_button .pr_icon { filter: invert(0.7); }
.pr_player_tableau:before { background-color: var(--dark-back); }
.pr_player_tableau_title { background: var(--dark-back); padding: 0.2em 0.5em; color: var(--light-80); border-radius: 8px; }
#pr_market_east_deck_container .pr_deck_counter, #pr_market_west_deck_container .pr_deck_counter { background-color: var(--dark-20); color: var(--light-80); }
.pr_open_hands_modal_player_container, .pr_open_hands_modal h2, .pr_open_hands_modal_cards_container .pr_card,
#pr_information_modal_content, #popin_settings_modal > h2, #popin_settings_modal_contents { position: relative; }
.pr_open_hands_modal_player_container:before, #popin_information_modal_contents:before, #popin_settings_modal:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.pr_open_hands_modal .pr_open_hands_modal_closeicon, #popin_information_modal_close, .pr_settings_modal_closeicon { z-index: 1; }
.pr_open_hands_modal_player_container .playername, #player_boards .player-name a { text-shadow: 1px 0 0 #000,0 1px 0 #000,-1px 0 0 #000,0 -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000; }
#popin_information_modal_contents, #popin_settings_modal { color: var(--light-80); }
.pr_settings_modal h2 { background-color: var(--dark-20); }
.pr_information_modal #pr_information_modal_content #pr_battleTable .pr_header,
.pr_information_modal #pr_information_modal_content #pr_oneShots .pr_header, .pr_information_modal #pr_information_modal_content #pr_operations .pr_header,
.pr_information_modal #pr_information_modal_content #pr_battleTable .pr_cell.pr_light_background,
.pr_information_modal #pr_information_modal_content #pr_oneShots .pr_cell.pr_light_background,
.pr_information_modal #pr_information_modal_content #pr_operations .pr_cell.pr_light_background { background-color: var(--dark-back); }
.pr_header, .pr_cell { border-color: var(--light-50) !important; }
`;

_darkStyleForGame['pedro'] = `
.playerdealer { background-color: var(--dark-40); }
.playertable.activePlayer { border: 7px solid #000; }
.standardDeck .suit.clubs, .fourColorDeck .suit.spades, .standardDeck .suit.spades { text-shadow: var(--text-w-shadow); }
.fourColorDeck .suit.diamonds { color: #6666ff; }
`;

_darkStyleForGame['penaltychallenge'] = `
#boardimage { filter: brightness(0.9); }
`;

_darkStyleForGame['pentaquest'] = `
.card .card-sides .card-side, .penta-army-pic { filter: brightness(0.9); }
`;

_darkStyleForGame['pente'] = `
.coord_label { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['perfectwords'] = `
.note-line { color: #000; }
#o-aftertable { color: var(--light-80); }
#o-dbnogrid { background-color: var(--dark-back); color: #fff; }
.dbnogrid-cell-button:hover { background-color: #00000066; }
`;

_darkStyleForGame['perikles'] = `
.prk_player_tiles { background-color: var(--dark-30); border-top: 4px groove var(--dark-40); }
#deadpool { background-color: var(--dark-40); }
.prk_permission_box[style="background-color: #E53738;"] { background-color: var(--red-10) !important; }
.prk_permission_box[style="background-color: #FFF;"] { background-color: var(--light-70) !important; }
.prk_permission_box[style="background-color: #E5A137;"] { background-color: var(--orange-30) !important; }
.dijitTooltipContainer  [style="background-color: #DAE3EA;"] { background-color: var(--dark-20) !important; }
.prk_location_vp_text {  background-color: var(--dark-30); }
.dijitTooltipContainer h2 { color: #000; }
.dijitTooltipContainer hr { display: none; }
`;

_darkStyleForGame['personanongrata'] = `
.prs_publicArea .prs_areaTitle { background-color: var(--dark-10); color: var(--light-80); }
.prs_corporationIcon { filter: var(--highlight-min); }
`;

_darkStyleForGame['pescadonovo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['phat'] = `
#targetTitle { color: var(--light-70); }
[style*="color: Blue;"] { color: #6666ff !important; }
#playertables { background-color: var(--green-30); }
#turn_order { color: var(--green-50); }
#logs [style="color:black;"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['photosynthesis'] = `
.psy_toolbtn, .psy_overlay_button { color: #fff; background: var(--dark-20); box-shadow: none; filter: var(--drop-shadow); }
.psy_suncounter, .psy_token { color: #000; box-shadow: none; }
#psy_turnindicator { color: #fff; }
#player_boards [style*="color: #787878;"] { color: #fff !important; }
#psy_mainboard, .psy_playermainboard { filter: brightness(0.9); }
`;

_darkStyleForGame['pi'] = `
.whiteblock h3, .whiteblock h4, .whiteblock h5 { color: #fff; text-shadow: none; }
.token, .sp_marker { filter: var(--drop-shadow); }
`;

_darkStyleForGame['piepmatz'] = `
#feeder_deck_count { text-shadow: none !important; }
span[style^="background-color:white"] { background-color: var(--dark-back) !important; color: var(--light-80); }
`;

_darkStyleForGame['piereighteen'] = `
.score_star { filter: var(--drop-shadow); text-shadow: none; }
`;

_darkStyleForGame['pingimus'] = `
.player-name { text-shadow: none; }
.vote label span { background: var(--dark-20); border: 3px solid var(--dark-10); color: var(--light-80); }
.vote label input:checked+span { background: var(--dark-40); }
#pingimus_canvas, #pictures img { filter: invert(0.9); }
#canvas_container { box-shadow: 3px 3px 3px #50505080; }
#pictures h3 { background: var(--dark-20); color: var(--light-80); }
.guess.finished { background: var(--green-30); }
.scoring_task { background: var(--dark-back); }
.task_head { background: var(--dark-10); box-shadow: 1px 1px 1px #50505080; color: var(--light-80); }
.scoring_player { background: var(--dark-0); }
.guesses_head, .votes_head { color: var(--light-80); }
.scoring_vote { background: var(--dark-10); }
`;

_darkStyleForGame['pinochle'] = `
#pagesection_gameview .whiteblock.playertable.declarer { background: #4d00004d; border: 1px solid var(--dark-back); }
`;

_darkStyleForGame['pipeline'] = `
.ppln_upgradeFlipToken { filter: brightness(0.8); border-radius: 50%; }
.ppln_valuationCard { background-color: #360; color: var(--light-80); }
.ppln_valuationTitle { background-color: var(--dark-back); }
`;

_darkStyleForGame['piratesofmaracaibo'] = `
.pom-tab { background-color: var(--dark-20); color: var(--light-80); }
.pom-tab.pom-tab-selected, .pom-tab:not(.pom-tab-selected):hover { background-color: #000; color: #fff; }
#pom-tabContents { background-color: var(--dark-back); }
.pom-tabContent-tabTitle { background: #000; color: var(--light-80); border: 1px solid var(--dark-40); }
.pom-diceDish { background-color: var(--dark-back); }
.pom-resize { background: var(--dark-20); border: 1px solid var(--dark-40); color: var(--light-70); }
.pom-resize:hover { background: #000; }
#pom-buttonUndo { ${redButton} }
#pom-buttonUndo:hover { ${redButtonOver} }
.pom-playerName { text-shadow: none; }
.pom-round { background: #000; color: var(--light-50); }
.pom-explore, .pom-figurehead, .pom-card { filter: brightness(0.9); }
`;

_darkStyleForGame['piratenkapern'] = `
.blue { background-color: #00004d; }
.red { background-color: #660000; color: #fff; }
`;

_darkStyleForGame['pixies'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
.bga-help_popin-button { background: #3d5c28; }
#help-popin h1 { color: #6aa046; }
.round-result td, .round-result th:not(.empty) { background: var(--dark-20); color: var(--light-80); }
.round-result th.name, .round-result th.sum { background: #162112; }
.round-result th.type { background: #21311b; }
`;

_darkStyleForGame['planetunknown'] = `
#susan-container #susan-exterior { background: var(--dark-0); }
#susan-container #susan-interior { background: var(--dark-20); }
#susan-container .susan-space .susan-counter { background: var(--dark-0); color: var(--light-80); border-color: var(--light-80); }
#popin_chooseCard, #popin_showScores, #popin_showSettings, #popin_showSusan, .planetunknown_popin_cards { background-color: #62411e; }
#popin_chooseCard h2, #popin_showScores h2, #popin_showSettings h2, #popin_showSusan h2, .planetunknown_popin_cards h2 { background: #433423; color: var(--light-80); }
#decks-info .civ-deck-counter-wrapper { box-shadow: none; filter: var(--drop-shadow); }
#popin_showScores #popin_showScores_contents table thead tr#scores-planets { background: #433423; color: var(--light-80); }
#popin_showScores #popin_showScores_contents table thead tr th, #popin_showScores #popin_showScores_contents table tbody tr td { color: var(--light-80); }
#popin_showScores #popin_showScores_contents table tbody tr:nth-child(odd) { background: #433423; }
#popin_showScores #popin_showScores_contents table thead tr#scores-names, #popin_showScores #popin_showScores_contents table tbody tr#scores-row-total { background-color: var(--dark-40); }
`;

_darkStyleForGame['pocketcats'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['pokerdice'] = `
#rank_chart { background-color: var(--dark-back); color: var(--light-80); }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['pond'] = `
#game_play_area_wrap { filter: brightness(0.9); }
`;

_darkStyleForGame['pontedeldiavolo'] = `
#game_play_area_wrap { filter: brightness(0.9); }
`;

_darkStyleForGame['pook'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.resizer { background: var(--dark-10); border-top: 1px dashed var(--dark-40); }
.card-sides { filter: brightness(0.9); }
`;

_darkStyleForGame['potionexplosion'] = `
.area_label, .player-name { text-shadow: none; }
.marble_pool { border: 1px dashed var(--light-50); }
.potion, .stockitem { filter: var(--drop-shadow); }
.reward_icon, .help_icon, .starter_token { filter: var(--highlight-min); }
.potion_tooltip, .potion_tooltip_small { background-color: var(--dark-30); }
.potion_tooltip_small, .active { border: 3px solid var(--light-50); }
.cupboard, .discard { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['potionsofazerland'] = `
.poa_PopinContainer.displayDiceResult, .poa_PopinContainer.displayOrderPriorityChoice, .poa_PopinContainer.displayRessourceChoice { background: var(--dark-10); border: 1px solid var(--light-50); color: var(--light-80); }
.poa_tooltip_status { color: var(--light-50); }
.playerName { background: linear-gradient(90deg, #00000000, #00000000 30%, #000000e6 50%, #00000000 70%, #00000000); }
`;

_darkStyleForGame['powervacuum'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_styleForGame['praga'] = `
.ressourceImg[style="background-position:-100% -000%;"], .ressourceImg[style="background-position:-600% -000%;"], .ressourceImg[style="background-position:-700% -000%;"] { border-radius: 50%; }
`;

_darkStyleForGame['praga'] = `
.ressourceImg, .cube_0, .cube_1, .cube_2, .cube_3 { filter: var(--drop-shadow); }
#turnLabel { color: var(--light-80); }
#zoomplus, #zoomminus { filter: invert(0.7); }
#uiPanelBtn { background-color: var(--dark-10) !important; }
#uiPanel>.uibtn { background-color: #b9b9b9 !important; }
#uiPanel>.uibtn.selected { background-color: var(--blue-70) !important; }
.tileBack { color: #000; text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['president'] = `
.icon20, .iconBeggar, .iconCitizen, .iconPresident, .iconPeasant, .iconPrimeMinister { filter: invert(1); }
#game_board { background: var(--green-30); }
`;

_darkStyleForGame['puertorico'] = `
#buildings, #plantations { background: var(--dark-back); color: #fff; }
.tiles_label { color: #fff; }
.small_building_placeholder, .big_building_placeholder { background-color: #e6d49c; }
#player_boards .pr_icon_resource, #player_boards .pr_icon { filter: var(--drop-shadow); }
.buildingtt, .plantationtt { background-color: var(--dark-40); }
.player_name { background-color: var(--dark-20); }
`;

_darkStyleForGame['pugsinmugs'] = `
.bigcard { box-shadow: 5px 5px 10px 2px #aaa; }
`;

_darkStyleForGame['pyramidoft'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.py_header_round, .py_header_turns { color: var(--light-80); }
.py_zone { background-color: var(--dark-back); }
.py_zone_name.playername { background: var(--dark-20); border-radius: 8px; }
.py_zone_name.playername[style="color:#444;"] { color: var(--light-70)!important; }
.py_zone_nobg { background-color: transparent; }
.py_panel_gem { background-color: var(--dark-0); }
`;

_darkStyleForGame['qango'] = `
#board { filter: brightness(0.9); }
`;

_darkStyleForGame['qawale'] = `
.qaw_miniboard { border: 2px solid #897272; }
`;

_darkStyleForGame['quadratacanada'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#day, #lastTurn { border: 2px solid rgb(255 255 255 / 50%); }
#day { background-color: var(--dark-back); }
#lastTurn { background-color: var(--violet-60); }
.tooltipMultiplicationTable { color: #000; }
.fa6-mobile-screen { color: var(--light-80); }
div.board, div.taxiBoard, div.destination, .trophy { filter: brightness(0.9); }
.bgaimagebutton { border: 2px solid #bdbdbd; }
div.destination { border: 2px solid rgb(255 255 255 / 50%); }
div.destination.stockitem_selected { border: 6px solid rgb(255 255 255 / 75%) !important; box-shadow: 1px 1px 7px 3px rgb(255 255 255 / 75%); }
.math_result, .taxi_math_value { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['quantum'] = `
#gambits, #commands, #deckWindow { background-color: var(--dark-back); color: var(--light-80); }
#mapName { color: #fff; }
`;

_darkStyleForGame['quartermastergeneraleastfront'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.QGEFplayer .QGEFpieceContainer { filter: var(--highlight-min); }
.QGEFflag { border: 1px solid #000; }
#QGEFregionName { color: var(--light-80); }
`;

_darkStyleForGame['quartzdice'] = `
.crystal { filter: var(--highlight-min); }
.quartz-table .quartz-mining-cart .quartz-mining-cart-title span { background-color: var(--dark-20); }
.quartz-dice-stock-content .quartz-dice-stock-block { border: 2px solid var(--blue-70); }
.quartz-dice-stock-content .quartz-dice-stock-block .quartz-dice-stock-block-icon { background: var(--blue-70); }
.quartz-select-crystal input { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['quattuorreges'] = `
#qtr-board { filter: brightness(0.9); }
`;

_darkStyleForGame['quato'] = `
#round_wrap { text-shadow: none; }
.cardspace { color: #000; }
#overall-content[style="background: linear-gradient(90deg, rgb(224, 80, 32) 0%, rgb(255, 144, 96) 25%, rgb(255, 144, 96) 75%, rgb(224, 80, 32) 100%);"]:before
{ content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['quetzal'] = `
.custom-player-area .player-meeple-recap { filter: var(--highlight-min); }
.player-area { background-color: var(--dark-back); color:#fff; }
.player-meeple-zone-wrapper { background-color: var(--dark-20); }
.meeple { filter: var(--drop-shadow); }
#board { filter: brightness(0.9); }
`;

_darkStyleForGame['quibbles'] = `
.quibbles #quibbles-ui-row-2 .whiteblock { background-color: #471e48; }
#bga-zoom-controls { filter: invert(0.7); }
.card-sides { filter: brightness(0.9); }
`;

_darkStyleForGame['quinque'] = `
body { background: none !important; }
.qq_possibleTarget { background-color: #000; }
`;

_darkStyleForGame['quintus'] = `
.qts_playerbid, #handcounter { color: var(--light-80) !important; }
.qts_playertable_Q { background-color: #330000 !important; }
.qts_playertable_A { background-color: #003300 !important; }
.qts_playertable_B { background-color: #332f00 !important; }
.qts_nilicon_0, .qts_nilicon_00, .qts_trumpsuiticon_0 { filter: invert(0.7); }
.qts_trumpsuiticon_none, .qts_trumpsuiticon_1, .qts_trumpsuiticon_2, .qts_trumpsuiticon_3, .qts_trumpsuiticon_4,
.qts_textsuiticon_spade, .qts_textsuiticon_heart, .qts_textsuiticon_club, .qts_textsuiticon_diamond { filter: var(--drop-shadow); }
.qts_bidicon { filter: invert(1); }
`;

_darkStyleForGame['quirkyquarks'] = `
.QQ-Phase, .QQ-Round { color: #ebb073; background-color: transparent; }
`;

_darkStyleForGame['quoridor'] = `
.objective { filter: var(--highlight); }
`;

_darkStyleForGame['raceforthegalaxy'] = `
body { background: none !important; }
#vp_nbr_remain_img { filter: var(--highlight-min); }
.new_design a:link { color: var(--light-70); }
.player-board, .roundedbox,  .roundedbox .roundedbox_bottomleft, .roundedbox .roundedbox_bottommain, .roundedbox .roundedbox_bottomright,
.roundedbox .roundedbox_main, .roundedbox .roundedbox_topleft, .roundedbox .roundedbox_topmain, .roundedbox .roundedbox_topright { background-color: transparent; }
.vp_chip, .tableaucount { filter: var(--highlight-min); }
.nextCardToPlay { border: 2px solid var(--red-30); }
`;

_darkStyleForGame['railroadink'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#infrastructure { color: #fff; }
#all-players h2 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
.banner { filter: brightness(0.5); }
html.red-edition #page-title { background-color: var(--dark-10)!important; }
.player-sheet-wrapper, #dice { filter: brightness(0.9); }
`;

_darkStyleForGame['railroadinkchallenge'] = `
#overall-content:before, #page-title:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#overall-content { color: var(--light-80); }
`;

_darkStyleForGame['railwaysoftheworld'] = `
.mm_money, .mm_income, .mm_bond, .mm_engine, .mm_completed_links, .mm_consecutive_links, .mm_connected_cities, #zoom_plus, #zoom_minus { filter: invert(1); }
#cityNameShow, #majorLinesShow, #allOpCardsShow, #rulesShow { background-color: var(--dark-30) !important; }
#hideShowOpCards { padding:0.3em 0em; margin: 0.5em 0em; cursor: pointer; }
.all_cards_wrapper { background: var(--dark-back); color: #fff; }
.all_cards_wrapper > h3 { padding-left: 0.5em; }
.stockitem { color: #000; }
#gs_ecm_count_icon { filter: var(--highlight); }
#ROTWboard { filter: brightness(0.9); }
`;

_darkStyleForGame['rainforest'] = `
.playerPanel p { color: #fff; }
.notif_species { filter: var(--highlight-min); }
.jungleZoneBlock { background-color: #00000033; outline: 2px dashed #ffffff4d; }
#rainForestContainer .playerSpeciesZone { border: 0.3vw dashed #898989; }
#mainBoard:before { position: absolute; top:0px; left:0px; width: 100%; height: 100%; border: 1px solid var(--dark-10); box-sizing: border-box; content: ""; background: #00000040; }
.largePlayerBoard, .notif_tile { filter: brightness(0.9); }
.tile { filter: drop-shadow(.1vw .1vw .1vw black) brightness(0.9); }
`;

_darkStyleForGame['rallymandirt'] = `
body { background: none!important; }
.timestamp { background-color: var(--dark-10); }
#notification_panel_wrapper, #notification_banner { background-color: var(--dark-20); color: var(--light-80); }
notification_element_total { border-top: 1px solid var(--light-50); }
#map_container, #carskins img, #current-car-skins img { filter: brightness(0.9); }
.notification_element_total { border-top: 1px solid var(--light-50); }
#dice-panel .dice { border-radius: 25px; }
`;

_darkStyleForGame['rallymangt'] = `
.warningCounterIcon { filter: invert(1); }
`;

_darkStyleForGame['ratjack'] = `
.rat_playerName { text-shadow: var(--text-w-shadow); }
#tokenStock { background-color: var(--dark-back); }
#rat_discard, .rat_playerArea { border-color: var(--light-70); }
#rat_discard:before, #deckCount, #discardCount { color: var(--light-70); }
`;

_darkStyleForGame['ratsofwistar'] = `
#overall-content { background: var(--dark-40); } /* for archive replay */
#row-map-board-background-single #row-map-board-background-single-background, .row_row_boards_container .row_player_board_background { filter: brightness(0.9); }
:root { --tooltip-text-color: var(--light-color); --board-default-background: var(--dark-back); --action-notification-background: var(--dark-10); --accent-color-1: #000000ad; --accent-color-1-notransparency: var(--dark-20); --highlighted-element-text-color: var(--light-80); --highlight-color: #007f80; --beige-background: var(--dark-back); }
.row_player_board_overlay_doors:has(div), .row_player_board_overlay_skilltoken:has(div), .row_player_board_overlay_tents:has(div) { background-color: var(--dark-back); color: var(--light-80); }
.row_action_list_entry .row_action_list_entry_text { color: var(--light-80); }
`;

_darkStyleForGame['rauha'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#round-counter-wrapper { color: #fff !important; }
#player_config #round-counter-wrapper { background: var(--dark-20); font-weight: normal; }
#player_config #round-phase { background: var(--dark-30); color: #fff; }
g.fa-group { color: #000; }
.rauha-board .player-name { background: var(--dark-20); border: none; font-weight: normal; }
`;

_darkStyleForGame['reflectionsinthelookingglass'] = `
.entireTableClass, .handclass, .layoutdeckclass, .mirrorclass { background: var(--dark-back); }
#zoomControls { filter: invert(0.7); }
`;

_darkStyleForGame['refuge'] = `
.mode_3d #game_play_area_background, html { background: #3b4442; }
#table-center #board:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.tooltip-tile-name { border-bottom: 1px solid #8469c9; color: #8469c9; }
.card-side, .round-marker { filter: brightness(0.9); }
#bga-zoom-controls { filter: invert(0.9); }
#table-center #board #route { background: var(--dark-back); }
.player-table, .player-table .bag .hand-wrapper { background: var(--dark-back); border: 1px solid var(--light-50); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px var(--light-70); color: var(--light-80); }
.player-table .name-wrapper { background-color: var(--dark-20) !important; }
#table-center #board .round-counter-wrapper>div { background: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['regicide'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#overall-content { color: var(--light-80); }
#castle_deck, #discard_pile, #tavern_deck { color: #000; }
.hand_card_icon.empty { filter: invert(1); }
html.darkpanel #player_boards .player-board.transparent { background-color: #272a2fcc !important; }
html.darkpanel #player_boards .player-board.highlight_panel { background-color: rgba(80,80,80,.6) !important; }
html.darkpanel #player_boards .player-board.unselectable_panel { background-color: rgba(255,0,0,.3) !important; }
html.darkpanel #player_boards .player-board.selected_panel { background-color: #0033004d !important; }
`;

_darkStyleForGame['resarcana'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.res_emptydiscardpile { border: 1px dotted #aaa; }
.res_counterintext { color: #000; }
#res_roundnumber, .res_counterintext { color: var(--light-80); }
.res_viewinside { filter: invert(0.7); }
.res_fulldiscardpile { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['resist'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.maquis_hidden_effect_zone, .maquis_revealed_effect_zone, .mission_data_zone, .enemy_effect_zone { background: var(--dark-10); }
.mission_name_zone { background-color: #4e3318; }
.bgabutton_blue:not(.disabled)[style="background: saddlebrown; border-color: saddlebrown;"] { ${yellowButton}}
.bgabutton_blue:not(.disabled)[style="background: saddlebrown; border-color: saddlebrown;"]:hover { ${yellowButtonOver}}
.bgabutton_blue:not(.disabled)[style="background: rebeccapurple; border-color: rebeccapurple;"] { ${purpleButton}}
.bgabutton_blue:not(.disabled)[style="background: rebeccapurple; border-color: rebeccapurple;"]:hover { ${purpleButtonOver}}
`;

_darkStyleForGame['restinpeace'] = `
#overall-content { background-color: var(--dark-back); }
#rip-game-holder-holder #zoom-panel { background-color: var(--dark-20); }
#zoom-in-btn, #zoom-out-btn { filter: invert(0.7); }
.playmat_on #rip-game-holder #opponent-cards .card-stack, .playmat_on #rip-game-holder #player-cards .card-stack { background: linear-gradient(180deg, hsl(0deg 0% 0% / 40%), hsl(0deg 0% 0% / 0%) 50%); }
.rip-tooltip { background: var(--dark-10); box-shadow: 0 5px 10px #555; color: var(--light-80); }
`;

_darkStyleForGame['revive'] = `
#selection, #supply { background-color: var(--dark-back); }
#zoomminus, #zoomplus { filter: invert(0.9); }
.res { filter: var(--highlight-min); }
.card { filter: brightness(0.9); }
`;

_styleForGame['riftforce'] = `
h3 { padding: 0.2em; }
`;

_darkStyleForGame['riftforce'] = `
#backgroundGlobal { color: var(--light-80); }
.board-outline { outline-color: var(--light-50); }
.token-card-hand { filter: invert(0.7); }
.token-card-back { filter: var(--drop-shadow); }
.rft-guild-text, .rft-tooltip-text { color: #000; }
`;

_styleForGame['riftvalleyreserve'] = `
.logs_on_floating_panel #page-title { width: 100% !important }
`;

_darkStyleForGame['riftvalleyreserve'] = `
.riftvalleyreserve-name-272c29 { text-shadow: var(--text-w-shadow); }
.rvr-icon-element[data-color="272c29"][data-type=stop] { background-color: #fff; border-radius: 18px; }
.rvr-icon-backpack, .rvr-tent-display { filter: var(--highlight-min); }
`;

_darkStyleForGame['riverofgold'] = `
.rog_player_delivered_resizable, .rog_player_hand_resizable { background-color: var(--dark-back); color: var(--light-80); }
.playername_wrapper_ffffff .playername, .playername_wrapper_ffffff.playername { background-color: transparent !important; }
#logs .rog_icon_influence, #player_boards .rog_icon_influence { filter: var(--highlight-min); }
#player_boards .player-name { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000}
#player_config #pin-panel-switch .label { background-color: #697061; }
.logs_on_floating_panel #player_config #pin-panel-switch { visibility: hidden; }
#player_config #help-mode-switch .checkbox:checked+.label, #player_config #pin-panel-switch .checkbox:checked+.label { background-color: var(--blue-70); }
#player_config #turn_counter_wrapper { background: var(--dark-10); color: var(--light-80); font-weight: normal; }
.playername_wrapper_ff0000 .playername,.playername_wrapper_ff0000.playername { color: #ff6565!important; }
.playername_wrapper_008000 .playername,.playername_wrapper_008000.playername { color: #54aa54!important; }
.playername_wrapper_0000ff .playername,.playername_wrapper_0000ff.playername { color: #6565ff!important; }
.rog_tooltip table, .rog_tooltip table th { border: 1px solid #ffffff33; }
.rog_tooltip table td { border: 1px solid #ffffff33; }
`;

_darkStyleForGame['rivervalleyglassworks'] = `
.hand_selection_panel, .board_selection_panel { background-color: var(--dark-back); }
.board_name_panel, .board_name_panel_lower, .num_gems_panel { background-color: var(--dark-20); }
#bga-zoom-controls { filter: invert(0.7); }
.num_gems_text { color: var(--light-80) !important; }
`;

_darkStyleForGame['roadtothreehoundred'] = `
.rt300_playerheader { background-color: #2c641b; }
.rt300_metropad:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
[style="--player-color: #ff0000"] .rt300_plname { color: #ff3333; }
[style="--player-color: #008000"] .rt300_plname { color: #009e0a; }
[style="--player-color: #0000ff"] .rt300_plname { color: #6666ff; }
`;

_darkStyleForGame['rollandbump'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.rnb_cardsnb { color: #ddd; }
.rnb_player { background: var(--dark-back); }
.rnb_mininb { color: #fff; }
.rnb_nocard { border: 2px solid #fff; }
#rnb_rewards { color: #fff; }
#rnb_rewards * { border-color: var(--light-50)!important; }
.rnb_boardcard, .rnb_logcard { filter: var(--highlight); }
`;

_darkStyleForGame['rolledwest'] = `
.board { color: #000; }
`;

_darkStyleForGame['rollforthegalaxy'] = `
.imgtext { filter: var(--highlight-min); }
.tile_title { color: #000; }
`;

_darkStyleForGame['rollingpins'] = `
.doubleempty { color: #fff; }
.freeballs, .turnnum { filter: var(--highlight-min); box-shadow: none; }
`;

_darkStyleForGame['rollintotown'] = `
.rt-board:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-radius: 8px;}
.rt-die { filter: brightness(0.9); }
`;

_darkStyleForGame['rolltothetopjourneys'] = `
.dice_area_active, .dice_area_inactive { background-color: var(--dark-back); color: #fff; }
.first_player { filter: var(--highlight-min); }
`;

_styleForGame['romirami'] = `
#rr-area-pref-background { display: none !important; }
`;

_darkStyleForGame['romirami'] = `
div.player-name > a, span.player-name { background-color: transparent !important; }
#rr-area-player-container .rr-area-player, #rr-area-pref { background-color: var(--dark-back); color: var(--light-80); }
.bx-counter { color: var(--light-80); background-color: var(--dark-10); border: 1px solid var(--light-80); }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.bx-pill { background-color: var(--dark-40); color: var(--light-80); }
.bx-checkbox-switch i { background-color: var(--light-50); }
.bx-checkbox-switch i:before { background-color: var(--dark-40); }
.bx-checkbox-switch i:after { transform: translate3d(4px, 3px, 0); background-color: #fff; height: 20px; width: 20px; }
.bx-checkbox-switch input:checked+i { background-color: var(--blue-70); }
.bx-checkbox-switch input:checked+i:after { transform: translate3d(22px, 3px, 0); }
.rr-card { filter: brightness(0.9); }
`;

_darkStyleForGame['roppyakken'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
`;

_darkStyleForGame['rttaironage'] = `
#end_game_banner { position: relative; z-index: 2; background-color: var(--red-10); border: 3px solid var(--red-30); color: var(--light-80); }
.rtta_pBoard { background-color: var(--dark-30); }
.rtta_player_score { background-color: var(--dark-40); }
.player_mat:before { content: ""; background: #00000080; position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; }
.rtta_scoreCard { background-color: #000; color: var(--light-80); border: 7px solid var(--dark-back); }
#infoIcon { background-color: var(--dark-10); border: 2px solid var(--light-50); color: var(--light-80); }
.sc_dice_grid, .sc_dice_grid > div, #sc_ports_pop, #sc_ports_pop > div, #sc_ports_urn, #sc_ports_urn > div, #sc_provinces, #sc_provinces > div,
#sc_monument_0, #sc_monument_0 > div, #sc_monument_1, #sc_monument_1 > div, #sc_monument_2, #sc_monument_2 > div, #sc_monument_3, #sc_monument_3 > div, #sc_monument_4, #sc_monument_4 > div,
.sc_urn, .sc_dev_title_costs, .population, .star, .sc_disaster, .sc_sizer_wrapper { filter: invert(1); }
.sc_monument_score_prime { border: 1px solid #fff; }
.sc_urn[style="background-color: rgb(255, 0, 0);"], .sc_disaster[style="background-color: rgb(255, 0, 0);"] { background-color: rgb(0, 255, 255) !important; }
.sc_urn[style="background-color: rgb(0, 0, 255);"], .sc_disaster[style="background-color: rgb(0, 0, 255);"] { background-color: rgb(255, 255, 0) !important; }
.sc_urn[style="background-color: rgb(0, 128, 0);"], .sc_disaster[style="background-color: rgb(0, 128, 0);"] { background-color: rgb(255, 128, 255) !important; }
.sc_urn[style="background-color: #ffa500;"], .sc_disaster[style="background-color: #ffa500;"] { background-color: #005aff !important; }
`;

_darkStyleForGame['rumbleplanet'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#map:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-table { background: var(--dark-40); overflow: hidden; }
.player-table .name-wrapper .name { text-shadow: none; }
#table-center .hex-element.tile, #table-center .hex-element.player, .heroic-weapon-card .card-sides .card-side.front { filter: brightness(0.9); }
.dijitTooltipContainer .icon { filter: invert(0.9); }
#pagemaintitletext .icon.pm { filter: invert(1); }
.player-table .hand-wrapper { background: var(--dark-back); }
.player-table .block-with-text .block-label { color: var(--light-80); text-shadow: none; }
#logs .die-icon { filter: var(--highlight); }
`;

_darkStyleForGame['russianrailroads'] = `
.player-name, .player_score { background-color: var(--dark-20); }
.nameslot { width: auto; }
.nameslot > h3 { background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
.meepleable, .industrymarker, .lock, .rail, .advantage, .ruble { filter: var(--highlight); }
.scoring_marker { color: #000; }
.player_board_content { background-color: var(--dark-20); }
`;

_darkStyleForGame['saboteur'] = `
.saboteur_cell.default_cell_bg:empty { filter: invert(1); }
`;

_darkStyleForGame['safariwitness'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.container_right_top, .abilities_detail, .container_box .container_left .container_left_bottom { background: var(--dark-20); border: 2px solid var(--dark-40); color: var(--light-80); }
.clue_Area .title .img, .abilities_detail .title .img, .container_left_bottom .big_title .img { filter: invert(1); }
.container_box .container_left { margin-right: 0.5em; }
.abilities_detail .abilities_list li { border-top: 1px solid var(--light-50); }
.abilities_detail .abilities_list li .detail { border-left: 1px solid var(--light-50); }
`;

_darkStyleForGame['sagani'] = `
body { background: none !important; }
.sag_goto, #sag-buttons { filter: invert(1); }
.sag_map-container { background: var(--dark-back); }
.sag_piece { filter:var(--drop-shadow); }
#zoomminus, #zoomplus, #recenter, #change-layout, #increase-height, #decrease-height { background-color: var(--light-80) !important; }
`;

_darkStyleForGame['sahwari'] = `
.playerCaravanZone { background-color: #3d3229; }
.playerCamelZone:not(:empty) { background-color: #2a0f09; }
.player_board_content .token { filter: var(--drop-shadow); }
.playerCaravanZone { background-color: var(--dark-40); }
`;

_darkStyleForGame['sail'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#map_move_left, #map_move_right { background-color: var(--dark-back); color: var(--light-80); }
.first_player_token { filter: var(--highlight); }
`;

_darkStyleForGame['saintpetersburg'] = `
.stp_icon_ruble { filter: invert(1); }
`;

_darkStyleForGame['sakura'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#player_boards .player-name { text-shadow: none !important; }
.placeholder_space { border: thin dashed var(--red-50); color: var(--light-80); }
`;

_darkStyleForGame['samarkand'] = `
.clothbag { filter: var(--drop-shadow); }
.board { filter: brightness(0.9); }
`;

_darkStyleForGame['santorini'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#scene-container canvas { filter: brightness(0.5); }
.power-container .mini-card { filter: brightness(0.9); }
.power-ext { color: #000; }
`;

_darkStyleForGame['sapiens'] = `
.player-name { text-shadow: none; }
#startplayer { filter: var(--highlight); }
.deck_holder .tile, .stockTile, .player_board, .token_pool .token { filter: brightness(0.9); }
`;

_darkStyleForGame['schnapsen'] = `
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-back); color: var(--light-80); }
span[style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['schroedingerscats'] = `
#info_box { background-color: var(--violet-60); border: 2px solid var(--violet-80); }
`;

_darkStyleForGame['scriptoria'] = `
#availableLecterns { background-color: var(--dark-back); }
.pupitrePlayerContainer h2 { color: #fff; }
`;

_darkStyleForGame['scythe'] = `
#page-title, .current_player_is_active #page-title, .gamestate_gameEnd #page-title { background: #b32041 !important; background-clip: content-box !important; }
#pagemaintitletext span[style*="color:#e50028;"] { text-shadow: var(--text-w-shadow) !important; }
#popin_showScores table th { background: var(--dark-20); color: var(--light-80); border-bottom: 1px solid #919191; }
#popin_showScores td[style="color:#111111"] { text-shadow: var(--text-w-shadow); }
#popin_showScores table tbody tr td:first-of-type { background: var(--dark-20); }
#popin_showScores table td { background: var(--dark-30); color: var(--light-80); }
#popin_showScores table tbody tr td:last-of-type { background: var(--dark-20); }
#popin_showScores .icon-container { filter: var(--highlight-min); }
#popin_auction h2, #popin_showFaction h2, #popin_showScores h2, #popin_showSettings h2, #popin_showTour h2 { background: var(--dark-20); color: var(--light-80); }
.faction-infos .player-mat-holder { color: #000; }
.objective-card .objective-card-inner .objective-text { color: #000; }
span.factionname { background-color: rgba(0, 0, 0, 0) !important; }
`;

_darkStyleForGame['seasaltpaper'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#discard-pick, .player-table { background: var(--dark-back); }
.player-table { border: 2px solid var(--dark-40); }
.player-table .name-wrapper { background: var(--dark-10); }
#popin_seasaltpaperHelpDialog { background: var(--dark-10); color: #fff; }
#help-popin .help-section { background-color: #18494e; }
#cards-points-tooltip { color: var(--light-80); }
#table-center #deck-and-discards .discard-stack { background-color: var(--dark-back); }
#seasaltpaper-help-button { background: #1f4b7a; }
[style="color: darkred;"] { color: #bf4040!important; }
#table-center, html.expansion #table-center { background: var(--dark-20); border: 2px solid var(--dark-40); }
#table-center #pick, html.expansion #table-center #pick { background-color: var(--dark-30); }
#table-center #pick:before, html.expansion #table-center #pick:before  { border-color: var(--dark-30) transparent; }
#table-center #pick[data-visible=true], html.expansion #table-center #pick[data-visible=true] { background-color: var(--dark-40); }
#table-center #pick[data-visible=true]:before, html.expansion #table-center #pick[data-visible=true]:before  { border-color: var(--dark-40) transparent; }
`;

_darkStyleForGame['seasons'] = `
#overall-content:before { content: ""; background: #0009; position: absolute; width: 100%; height: 100%; }
#player_boards .icon_cristal, #player_boards .invocation_level, #player_boards .hand, #logs .energy0 { filter: invert(0.9); }
.cardtooltip .energy0, .cardtooltip .icon_active, .cardtooltip .icon_permanent { filter: var(--highlight); }
#settings-controls-container { background-color: var(--dark-20); background: var(--dark-20);}
desktop_version .tableau, .transmutation_bar { filter: brightness(0.9); }
`;

_darkStyleForGame['sechsnimmt'] = `
.card_played { background: none var(--dark-40); }
`;

_darkStyleForGame['seikatsu'] = `
.table_bordered { border: 3px ridge #999; }
.flower_line_icon, .rotate_icon { filter: var(--drop-shadow); }
#flower_score_table { background: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['sergeantmajor'] = `
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['setup'] = `
.setup-pref-background-dark #overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.setup-piece { filter: var(--drop-shadow); }
.setup-tile-number[data-suit="10"], .setup-tile-suit[data-suit="10"] { text-shadow: var(--text-w-shadow); }
#setup-board-wrapper { filter: brightness(0.9); }
`;

_darkStyleForGame['sevenknightsbewitched'] = `
body { background: none !important; }
.mur-placeholder:before { color: var(--light-80); }
#mur-deployment .mur-placeholder { outline: 4px dotted var(--yellow-10); }
.mur-player-name { background-color: var(--dark-back); padding: 0.2em 0.5em; border-radius: 4px; }
`;

_darkStyleForGame['sevenwonders'] = `
.player_board_wrap { background: #00000090; }
span.tcoin { color: var(--light-80); }
#discard_count, #trees h3 { color: var(--light-80); }
.cardinfos [style*="color:#723216"] { color: #e28d69 !important; }
.cardinfos [style*="color:#0276b1"] { color: #03a9fc !important; }
.cardinfos [style*="color:#d6040f"] { color: #fc6970 !important; }
`;

_darkStyleForGame['sevenwondersarchitects'] = `
body { background: none !important; }
html.darkpanel #player_boards .player-board { background: var(--dark-30) !important; }
html.darkpanel #player_boards .player-board.stw_activepl { background: var(--dark-40) !important; }
#centralaround.stw_emptypile { background: #80808099; }
.stw_log_icon { filter: var(--drop-shadow); }
.player-board { background-color: var(--dark-10); }
.stw_activepl { background-color: var(--dark-20); }
.choiceitem { background: var(--dark-40); }
`;

_darkStyleForGame['sevenwondersduel'] = `
.card_outline.science_progress, .card_outline:empty, .progress_token_outline { box-shadow: inset 0 0 calc(var(--scale)*4px) calc(var(--scale)*1px) #ffffff80; }
.end_game_player_name, #game_play_area .whiteblock h3, .science_progress { text-shadow: none; }
.end_game_blue { color: #002f4dab; }
.end_game_green, .end_game_progresstokens { color: #00b35cab; }
.end_game_purple { color: #9c82b0ab; }
.end_game_military { color: #db2433ab; }
.mythology_token, .mythology_token_outline, .offering_token, .offering_token_outline { filter: invert(1); }
.offering_token_tooltip span[style="color: #58585a"] { color: #aaa !important; }
.cardinfos [style$="color: #db5824"] { color: #702c12 !important; }
.cardinfos [style$="color: #41499a"] { color: #6f76c3 !important; }
.cardinfos [style$="color: #702c12"] { color: #db5824 !important; }
.cardinfos [style$="color: #b7110e"] { color: #ef2d2a !important; }
.cardinfos [style$="color: #000000"] { color: #fff !important; }
.cardinfos [style$="color: #0275aa"] { color: #1cb5fd !important; }
.cardinfos [style$="color: #58585a"] { color: #aaa !important; }
.cardinfos [style$="color: #027234"] { color: #03c95c !important; }
#mythology_decks_container>div:nth-of-type(4) h3 span { color: #aaa; }
.swd_title { color: #000; }
.wonder, #board_container, .list_of_cards, .building_header_small, .draftpool, .progress_token { filter: brightness(0.9); }
`;

_darkStyleForGame['seotda'] = `
.player-name { text-shadow: none !important; }
.playertablename { text-shadow: none; }
#community_card_wrap, #round_info_wrap { background-color: var(--dark-20); }
#hand_rank { background-color: var(--dark-back); }
.selected_card { outline: 4px dashed #fff; }
`;

_darkStyleForGame['sheepboombah'] = `
div[id^="playersection_"] > div:first-child { background-color: var(--dark-back); padding: 0.2em 1em; border-radius: 8px; box-sizing: border-box; }
.sbb_icon_0, .sbb_icon_1, .sbb_icon_2, .sbb_icon_3 { border-radius: 50%; }
.sbb_playerboard, #sbb_field { filter: brightness(0.9); }
`;

_darkStyleForGame['sherlockthirteen'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#clue_sheet { filter: invert(0.9); box-shadow: 2px 2px 4px #fff; color: var(--light-80); }
#clue_sheet > * { filter: invert(1); }
.clue_table_cell { color: var(--light-80) !important; }
`;

_darkStyleForGame['shiftingstones'] = `
.doubleempty, .empty, #deck, #disc, #mycard { color: #fff !important; }
.box_wrap { padding: 16px 10px 0 10px; }
`;

_darkStyleForGame['shogi'] = `
.komadai { background-color: var(--dark-back); }
.shg_piece-count { background-color: var(--dark-10); border: 1px solid var(--light-70); color: var(--light-80); }
`;

_darkStyleForGame['shogun'] = `
#scrollmap-controls > * { filter: invert(1); }
#pagesection_gameview .whiteblock.player-name-wrap { background: var(--dark-20); }
`;

_darkStyleForGame['shutthebox'] = `
.playertable { background: var(--dark-back); }
.playertablename span[style^="color:black;"] { color: var(--light-80) !important; text-shadow: none; }
.box_wrap, .dice_wrap { background: var(--green-10); }
`;

_darkStyleForGame['siam'] = `
#table:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
.mines, .yours { position: relative; }
.tokens { filter: brightness(0.9); }
`;

_darkStyleForGame['signorie'] = `
.thething { filter: brightness(0.9); }
`;

_darkStyleForGame['similo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['simplicity'] = `
.player-teams .player-team-score .tile-meeple .tile-background , #logs .scity-meeple .tile-background, #pagemaintitletext .scity-meeple .tile-background { filter: var(--highlight-min); }
.player-teams .player-team-score i { color: var(--light-80); }
#popin_showOverview #popin_showOverview_contents table thead { background: #0000004d; }
#popin_showOverview #popin_showOverview_contents { background: #066036db; color: var(--light-80); }
`;

_darkStyleForGame['sixtyone'] = `
.sxt_dice_area { background-color: var(--dark-20); border: 3px solid #396138; }
.sxt_dice_area_wanted_color { background-color: #193418; }
.sxt_player_name { background-color: var(--dark-20); }
`;

_darkStyleForGame['skat'] = `
.card_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['skatelegend'] = `
#round-counter-row #round-counter-block, .player-table { background: var(--dark-back); }
.player-played-card, .player-scored-card, .bga-zoom-out-icon, .bga-zoom-in-icon { filter: invert(0.8); }
.player-helmets { filter: var(--drop-shadow); }
.dijitTooltipContainer [style="color: darkred"] { color: #ff3333 !important; }
.card .card-sides .card-side.front { filter: brightness(0.9); }
`;

_darkStyleForGame['skyteam'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#popin_stWelcomeDialogId { background: var(--dark-20); }
.st-victory-conditions.st-victory-conditions-row.pending { background: var(--dark-40) !important; }
#st-communication-wrapper #st-communication-info.green, .st-victory-conditions .st-victory-conditions-row.success, html.darkpanel #player_boards .player-board.st-victory-conditions, .st-end-game-info-box { background: var(--green-30) !important; }
#st-communication-wrapper #st-communication-info.red, .st-victory-conditions .st-victory-conditions-row.failed, .st-end-game-info-box.failure { background: var(--red-10) !important; }
.st-victory-conditions .st-victory-conditions-row.pending { background: var(--dark-40) !important; }
.st-victory-conditions .st-victory-conditions-row .st-victory-conditions-row-letter span { color: var(--green-30); }
.st-victory-conditions.failure .st-victory-conditions-row-letter span, #st-final-round-notice p, #st-real-time-wrapper p  { color: var(--red-10); }
.st-special-ability .fa-check-circle.co-pilot { stroke: var(--orange-30); }
#st-real-time-wrapper .st-real-time-base-timer .st-real-time-base-timer-remaining.green { stroke: var(--green-30); }
#st-real-time-wrapper .st-real-time-base-timer .st-real-time-base-timer-remaining.warning { stroke: var(--orange-30); }
#st-real-time-wrapper .st-real-time-base-timer .st-real-time-base-timer-remaining.alert { stroke: var(--red-10); }
.st-action-space-help { background-color: var(--dark-0); color: #fff; }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
.bga-help_popin-button { background: var(--blue-70); }
#st-flight-log-button, #st-system-buttons #jj-preferences-panel { background: var(--dark-20); }
#popin_st-flight-log-dialog, #popin_st-flight-log-dialog #popin_st-flight-log-dialog_contents { background: var(--dark-10); }
#popin_st-flight-log-dialog #popin_st-flight-log-dialog_contents .st-flight-log-row .st-flight-status[data-type=unplayed] { background-color: var(--dark-30); }
#popin_st-flight-log-dialog #popin_st-flight-log-dialog_contents .st-flight-log-row .st-flight-status[data-type=failure] { background-color: var(--orange-30); }
#popin_st-flight-log-dialog #popin_st-flight-log-dialog_contents .st-flight-log-row .st-flight-status[data-type=success] { background-color: var(--green-30); }
#jj-preferences-panel #jj-preferences-panel-content .jj-preferences-panel-category-label { background: var(--dark-0); }
`;

_darkStyleForGame['slide'] = `
#sld_midzone { background: #04040466; }
#popin_score_dlg_title { font-weight: normal; }
#scoretable .scorecell { border-color: var(--light-50); }
#scoretable { outline-color: var(--light-50); }
#scoretable .header, #scoretable .lheader { background-color: var(--dark-20); }
#scoretable .scorecell.score.header.total { background-color: var(--dark-40); }
#scoretable .vtext { color: var(--light-80); }
`;

_darkStyleForGame['smallislands'] = `
body { background: none !important; }
#stacks { background-color: var(--dark-back); color: var(--light-80); }
#zoomin, #zoomout { filter: invert(0.8); }
.TileOnBoard, .stockitem { filter: brightness(0.9); }
.boat_disabled { filter: contrast(.5); }
`;

_darkStyleForGame['smallworld'] = `
.sw_popup_content { background-color: #272a2ff2; border: 2px solid var(--light-50); color: var(--light-80); }
.sw_board { filter: brightness(0.9); }
.sw_combo_infos { color: var(--light-70); }
`;

_darkStyleForGame['sobek'] = `
.whiteblock_title { text-shadow: none; background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
.fixed_player_title { height: 32px; }
#score_track { filter: brightness(0.9); }
`;

_darkStyleForGame['sobektwoplayers'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#right-side-buttons { position: relative; }
#sbk-game-holder #sbk-board-holder { filter: brightness(0.9); }
#sbk-game-holder #sbk-board-holder #deck-holder { background-color: var(--dark-back); color: var(--light-80); }
#sbk-game-holder #sbk-board-holder #deck-holder .sprite-tile { filter: var(--drop-shadow); }
`;

_darkStyleForGame['solarstorm'] = `
.ss-player-board__action-tokens__number { color: var(--light-80); }
.ss-dice-result-dialog { background: var(--dark-back); }
`;

_darkStyleForGame['solo'] = `
#howto2, #helptext2 { color: var(--light-80); }
`;

_darkStyleForGame['solowhist'] = `
#playertables { background-color: var(--green-30); }
#turn_order { color: var(--green-50); }
.infotitle, .targetTitle, .handinfo { color: var(--light-70); }
`;

_darkStyleForGame['solstis'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.st_zone { background-color: var(--dark-back); }
.st_header { background: var(--dark-30); margin-bottom: 0.2em; }
#st_layout_change a, #st_layout_change p { color: var(--light-80); }
.st_label { background-color: var(--dark-10); color: var(--light-80); }
.st_card_alphabg .st_card_back, .st_card_alphabg .st_card_front { filter: brightness(0.9); }
`;

_darkStyleForGame['soulaween'] = `
#help_panel pre { background-color: var(--dark-back); color: #fff; }
`;

_darkStyleForGame['spacebase'] = `
.whitebkg { background-color: var(--dark-back); }
.cardToolTip { background-color: transparent !important; }
.cardToolTip [style*="color:blue"] { color: #6666ff !important; }
.cardToolTip [style*="color:red"] { color: #ff3333 !important; }
#logs .icon-small { filter: var(--highlight-min); }
.startCardWrap { box-shadow: 0 0 0 2px #000, 0 0 10px 13px var(--yellow-10); }
.cardImg, .stockCard { filter: brightness(0.9); }
`;

_darkStyleForGame['spaceempires'] = `
#pagemaintitletext { background: none !important; }
#right-side-second-part { background: transparent !important; }
#logs .log .roundedbox { background: rgba(0,0,0,.5); color: #fff; }
`;

_darkStyleForGame['spacestationphoenix'] = `
#player_boards .player-board { background: linear-gradient(rgba(245,230,255,0.2),rgba(247,235,255,0.25),rgba(250,240,255,.3)); }
`;

_darkStyleForGame['spades'] = `
.card-name-color--1, .card-name-color--3 { text-shadow: var(--text-w-shadow); }
.bags_icon { filter: var(--drop-shadow); }
`;

_darkStyleForGame['sparts'] = `
.cardontable { border-radius: 8px; }
.black, .s1, .s3 { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['spellbook'] = `
.playername, .playername.pos0 { background-color: var(--dark-back); }
.anatcard { outline: 2px solid var(--light-50); }
.aide, .card { filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, .7)) brightness(0.9); }
`;

_darkStyleForGame['spiritsoftheforest'] = `
.pb_label { color: var(--dark-80); }
`;

_darkStyleForGame['splendor'] = `
#overall-content:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
.player-name>a { background-color: var(--dark-10); border: 2px solid var(--dark-40); }
.spl_coinpile_counter { background-color: var(--dark-10); border: 1px solid var(--light-70); color: var(--light-80); }
.spl_log_gem, .spl_log_coin { border-radius: 50%; }
.spl_cardcount { border-color: var(--light-70)!important; }
.spl_cardcount.spl_coloreditem.type_C { background: radial-gradient(ellipse, var(--light-50) 30%, var(--dark-10)); }
.spl_slider_round { background-color: #888; }
input:checked+.spl_slider_round { background-color: var(--blue-70); }
`;

_darkStyleForGame['splendorexpansions'] = _darkStyleForGame['splendor'];

_darkStyleForGame['splendorduel'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
.token .card-sides .card-side { filter: var(--drop-shadow-min); }
.player-table .hand-wrapper, .privilege-zone:not(:empty) { background: var(--dark-10); }
.bga-help_popin-button { background-color: #394260; }
`;

_darkStyleForGame['spiteandmalice'] = `
.card_1, .card_2 { filter: var(--drop-shadow) brightness(0.9); box-shadow: none; }
`;

_darkStyleForGame['splito'] = `
#overall-content { background-image: none; }
#player-area-containers { background-color: var(--dark-back); }
.spl_player-icon { filter: invert(0.8); }
.spl_small-keyhole { filter: invert(0.8); }
`;

_darkStyleForGame['splitter'] = `
.splitter_playerheader { background-color: var(--dark-20); }
.splitter_playersheet:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['springcleaning'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
.card { filter: brightness(0.9); }
`;

_darkStyleForGame['spyrium'] = `
#turn_no_wrap { color: var(--light-80); }
.market_cardplace { background-image: none; background-color: var(--dark-back); filter: var(--drop-shadow); display: inline-block; }
.worker { filter: var(--drop-shadow); }
`;

_darkStyleForGame['splashdown'] = `
body { background: none !important; }
.sd_playerinfo_icon, #resetzoom, #zoomplus, #zoomminus, #zoomfocus { filter: var(--highlight-min); }
#nav_container { background-color: var(--dark-20); color: var(--light-70); }
`;

_darkStyleForGame['splits'] = `
body { background: none !important; }
`;

_darkStyleForGame['spots'] = `
.dijitTooltipContainer .spt-then { filter: invert(1); }
.spt-card, .spt-trick { filter: brightness(0.9); }
`;

_darkStyleForGame['stalkexchange'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.se_player_flowers { background-color: var(--dark-back); }
.se_zoom_icon { filter: invert(0.9); }
.se_player_name .ml-6 { color: var(--light-80)!important; }
#se_btn_undo { ${redButton} }
#se_btn_undo:hover { ${redButtonOver} }
`;

_darkStyleForGame['starfluxx'] = `
#flx-zoom-controls { background-color: var(--dark-20) !important; }
#flx-zoom-out, #flx-zoom-in { filter: invert(0.7); }
#pagesection_gameview .whiteblock { color: #000; }
.flx-table .flx-deck .flx-deck-wrap .flx-toggle, .flx-table .flx-deck .flx-deck-wrap .flx-card-count { color: #fff; background: var(--dark-back); }
`;

_darkStyleForGame['starshipmerchants'] = `
.spacewrap { color: var(--light-80); }
`;

_darkStyleForGame['steamrollers'] = `
.vls-scoreImage, .vls-good, .vls-personal_good { filter: var(--drop-shadow); }
.vls-firstPlayerToken { filter: var(--highlight-min); }
#boardBackground, .vls-playerMap, .vls-action-tile, .vls-action-tile-owner { filter: brightness(0.9); }
`;

_darkStyleForGame['steamworks'] = `
#SW_sort_options { color: var(--light-80); }
`;

_darkStyleForGame['stella'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['sticktocolours'] = `
.hand_size_count, .icon_dealer, .icon_handsize { color: var(--light-80); }
`;

_darkStyleForGame['stirfryeighteen'] = `
#table_setup, #nbr_cards { color: #fff; }
`;

_darkStyleForGame['stockpile'] = `
#zoom-out, #zoom-in { filter: invert(0.7); }
#card_marketback_val { color: #fff; }
.containerbackground { background-color: var(--dark-20); }
.portfolioval { color: #fff; }
.titleicon { filter: var(--drop-shadow); }
.tooltip_card_wrap { color: var(--dark-10); }
`;

_darkStyleForGame['stoneage'] = `
.sta_boardBuildingCounter, .sta_boardCardCounter { color: #fff; }
#sta_adjustZoom,#sta_zoomIn,#sta_zoomOut { filter: invert(0.8) !important; }
#sta_adjustZoom:hover,#sta_zoomIn:hover,#sta_zoomOut:hover { filter: invert(1) drop-shadow(0 0 3px #fff) !important; }
#player_boards .sa_icon { filter: var(--drop-shadow); }
#diceboard { background-color: var(--dark-back); color: var(--light-80); border: 2px solid var(--dark-10); }
#sta_finalScore table, #sta_finalScore table * { border-color: var(--light-50) !important; }
.sta_auto_play_preference_box { background-color: #00224d; }
`;

_darkStyleForGame['stonespinearchitects'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.bgabutton b[style*="background-color: white;"]  { background-color: var(--dark-20)!important; }
#sa-scoresheet, #sa-scoresheet>* { filter: invert(1); }
#jj-preferences-panel #jj-preferences-panel-content .jj-preferences-panel-category-label { background: var(--dark-10); }
#sa-game #sa-player-areas .sa-player-area .sa-player-area-dungeon-wrapper .sa-dungeon-chamber-card-stock .sa-dungeon-chamber-card-stock-slot { background-color: var(--dark-back); }
#sa-game #sa-player-areas .sa-player-area .sa-player-area-title { text-shadow: none; }
#sa-game #sa-challenge-card-board:before, #sa-game #sa-market-card-board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-radius: 10px; }
.player-board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
.sa-description-font { color: #000; }
.sa-token-art.game-log, .sa-icon-art.game-log { filter: var(--drop-shadow); }
#undoAll { ${yellowButton} }
#undoAll:hover { ${yellowButtonOver} }
`;

_darkStyleForGame['stonks'] = `
#overall-content[style="background: rgb(119, 139, 108);"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['strands'] = `
.strands-name-000000, .strands-num-1, .strands-num-2, .strands-num-3, .strands-num-4, .strands-num-5, .strands-num-6 { text-shadow: var(--text-w-shadow); }
.hex-alt-colors .hex-tile[data-hex="6"] { filter: contrast(0); }
`;

_darkStyleForGame['strawberrysunset'] = `
.sss-tableau-outer { background-color: var(--dark-back); }
.sss-tableau-title { background: var(--dark-10); color: var(--light-80); }
`;

_darkStyleForGame['streets'] = `
[style*="color:#ffff00"], [style*="color: #ffff00"], [style*="color:#ffffff"], [style*="color: #ffffff"] { text-shadow:none!important; }
.tbp-ownerToken { filter: var(--highlight-min); }
#tbp-board-outer { background: var(--dark-back); }
.tbp-endGameBanner { background-color: var(--red-10); }
`;

_darkStyleForGame['stupormundi'] = `
html.darkpanel #player_boards.player-board.stm_player_passed { background: var(--dark-40) !important; }
.stm_label_0000ff, .stm_label_00cc00, .stm_label_ffa500 { text-shadow: none; }
.stm_panel { background: var(--dark-20); }
#autorotate { filter: invert(1); }
.stm_action_card_empty { box-shadow: inset 0 0 50px #55555599; }
.stm_icon_rotate_arrow { background-color: #fff; opacity: .5; }
.stm_icon_rotate_arrow:hover { opacity: .7; }
`;

_darkStyleForGame['superfantasybrawl'] = `
.herocard, .actioncard .fluff, .actioncard .power { color: var(--dark-10); }
.showHero { background-color: var(--dark-20); }
.midSizeDialog .description { color: #000; }
`;

_darkStyleForGame['supermegaluckybox'] = `
.smlb_x_icon, .smlb_x_icon .smlb_pb_count { filter: invert(1); }
`;

_darkStyleForGame['superstore'] = `
.player-board.ext-overlay { background-attachment: fixed;  background-position: 50%; background-size: cover; }
.carousel-title[style="color: rgb(45, 87, 135);"] { color: #5c7da2!important; }
.carousel-title[style="color: rgb(97, 61, 49);"] { color: #a96a55!important; }
.carousel-title[style="color: rgb(243, 108, 69);"] { color: #f36d46!important; }
.carousel-title[style="color: rgb(139, 78, 110);"] { color: #9a6480!important; }
.carousel-content-container[style="border-color: rgb(45, 87, 135);"] { border-color: #5c7da2!important; }
.carousel-content-container[style="border-color: rgb(97, 61, 49);"] { border-color: #a96a55!important; }
.carousel-content-container[style="border-color: rgb(243, 108, 69);"] { border-color: #f36d46!important; }
.carousel-content-container[style="border-color: rgb(139, 78, 110);"] { border-color: #9a6480!important; }
#carousel .carousel-header button { background-color: var(--dark-0); }
#carousel .carousel-header button:hover { background-color: var(--dark-10); }
.player-board .counter, .player-board .player_showcursor, .player-board .player_table_status { color: #8383af; }
.money-counter span { color: #090; }
.balloon-help-button { color: var(--light-80); }
`;

_darkStyleForGame['survive'] = `
#overall-content:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
.over_contents { background: var(--dark-back); outline: 1px solid var(--light-50); }
.over_title { background: var(--dark-10); color: var(--light-80); z-index: 1; }
.token, .token_gfx, .hand_symbol { filter: var(--highlight-min); }
.supply_zone:after { background-color: var(--dark-10); border: 1px solid var(--light-80); color: var(--light-80); }
#game_board { filter: brightness(0.9); }
.bgabutton_orange { ${yellowButton} }
.bgabutton_orange:hover { ${yellowButtonOver} }
`;

_darkStyleForGame['sushigo'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
.tooltip_card_text { background-color: var(--dark-20); }
.tooltip_card_text table { background-color: var(--dark-40); }
`;

_darkStyleForGame['sushigoparty'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
#sushigoparty_menu_wrapper { background: var(--dark-back); color: #fff; }
#sushigoparty_menu_wrapper>h1>span { color: var(--light-80); }
.tooltip_card_text { background-color: var(--dark-20); }
.tooltip_card_text table { background-color: var(--dark-40); }
.select_predef_menu { background: var(--dark-10); color: var(--light-80); }
.block_title, .block_title2 { background: var(--dark-back); }
`;

_darkStyleForGame['tablut'] = `
#board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.border { color: var(--light-80); }
`;

_darkStyleForGame['takaraisland'] = `
.playernameholder { background-color: var(--dark-20); }
#playArea { background-image: none; background-color: var(--dark-back); }
`;

_darkStyleForGame['takenoko'] = `
body { background: none!important; }
#takenoko_actionbar { background-color: var(--dark-back); background-image: none; }
#take_zoom_icon { filter: invert(0.7); }
`;

_darkStyleForGame['takenokolor'] = `
#overall-content { background: #12353b; }
.icon.ladybug, #firstPlayerToken { filter: var(--highlight); }
.log .icon.black, #page-title .icon.black { filter: invert(1); }
.rule-block { background: var(--dark-20); }
.rule-block .rules-bonus-grid { background: var(--dark-30); }
.rule-block .rule-title { border-bottom: 3px dotted var(--red-10); color: var(--red-10); }
#rules { color: var(--light-80); }
div[id^=player-table][id$=sheet]:before { content: ""; background: #00000050; position: absolute; width: 100%; height: 100%; }
div[style*="--color: #de6393"] { --color: #7e1b41!important; }
div[style*="--color: #2eb7d7"] { --color: #186d81!important; }
div[style*="--color: #fdc300"] { --color: #997500!important; }
div[style*="--color: #68b32e"] { --color: #467a1f!important; }
.player-table .name { background-color: var(--dark-20); text-shadow: none; }
.bga-dice_line-stock.selectable .bga-dice_die6.takenokolor-die.selectable:before { background: var(--dark-back); box-shadow: 0 0 5px 5px #000; }
`;

_darkStyleForGame['talon'] = `
.TALONlogBattle, .TALONlogRound, .TALONlogPlayer { background-color: transparent; }
`;

_darkStyleForGame['tanghulu'] = `
#main_board, .player_board { filter: brightness(0.9); }
`;

_darkStyleForGame['tapas'] = `
.tap_log-tile { filter: var(--highlight-min); }
#tap_board { filter: brightness(0.9); }
`;

_styleForGame['tapestry'] = `
.logs_on_floating_panel #player_board_config { background-color: rgb(218, 211, 193); }
`;

_darkStyleForGame['tapestry'] = `
#breadcrumbs { color: #fff; background: #1d2023; }
#player_board_config { background-color: #272a2f !important; position: relative; }
.playerArea { background-color: #2d2d2d80; }
.tooltipcontainer .icon_VP { filter: var(--highlight-min); }
.bgabutton { box-shadow: 0 1px 0 #555 !important; }
#player_config_row :hover { opacity: 0.9; }
.playerBoard, .player_extra { filter: brightness(0.9); }
.undomarker { background-color: var(--dark-0); color: var(--light-80); }
#allcards a { color: var(--light-80); }
.track_color_1 { color: var(--blue-50); }
.track_color_2 { color: var(--green-50); }
.track_color_3 { color: var(--red-50); }
`;

_darkStyleForGame['targi'] = `
h3 > span[style="color:#0000ff; background-color: #;"] { color: #8080ff !important; background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
h3 > span[style="color:#ffffff; background-color: #bbbbbb;"] { background-color: var(--dark-20) !important; padding: 0.5em 1em; border-radius: 8px; }
.tar_ware_board { filter: var(--highlight-min); }
.card_txt { color: #000; }
.tar_meeple, .tar_tribu { filter: var(--drop-shadow); }
.emptyCard { filter: brightness(0.9); }
`;

_darkStyleForGame['tashkalar'] = `
#warp { filter: invert(1); }
.dimmedbutton div { background-color: #1d2023; }
.pieceschoice, .piecesicon, .piecesdiff, .upgradeddiff { filter: var(--drop-shadow); }
.highform, .stockitem { filter: brightness(0.9); }
`;

_darkStyleForGame['teatime'] = `
#descriptionrounddiv { background-color: var(--dark-back); color: var(--light-80); }
.hand_square, .square { background-color: #000; }
.square { opacity: .4; }
`;

_darkStyleForGame['teotihuacan'] = `
.cc_counter { background-color: #ffffff33; }
.token24 { filter: var(--drop-shadow); }
.enableButton { border: 1px solid var(--light-70); }
`;

_darkStyleForGame['terraformingmars'] = `
.groupline { text-shadow: none; }
.log .token_img { color: #000; }
#settings-controls-container .row-data:not(.custom_pref_pp) .row-label { color: var(--light-80); }
#settings-controls-container-prefs:before, .localsettings_header { background-color: var(--orange-30); }
.tooltiptitle { background-color: var(--dark-back); }
.tooltipcontainer, .tundra .dijitTooltipContainer { background: var(--dark-20); }
#popin_score_dlg:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
#popin_score_dlg_title { position: relative; }
.scoretable .scorecell { background-color: var(--dark-40); }
.scoretable .header { background-color: var(--dark-30);  }
.mcompact .player_area, .hand_area .location { background: var(--dark-back); }
.mcompact .tt_intertitle { background: var(--dark-40); }
.mcompact .card_tooltipcontainer[data-card-type="1"] .tt_intertitle { background: #356818; }
.mcompact .card_tooltipcontainer[data-card-type="2"] .tt_intertitle { background: #184268; }
.mcompact .card_tooltipcontainer[data-card-type="3"] .tt_intertitle { background: #682118; }
.mcompact .card_tooltipcontainer[data-card-type="4"] .tt_intertitle { background: #5d1868; }
.mcompact .player_area_name { background: linear-gradient(0deg,var(--dark-40) 0,var(--dark-30) 1%,var(--dark-10) 26%,var(--dark-20) 48%,var(--dark-30) 75%,var(--dark-40)); border: 0.3vh solid var(--dark-30); }
.mcompact .viewcards_button { background: var(--dark-0); }
.mfull #ebd-body .tooltipcontainer { background-image: none; }
.mfull .tooltiptitle { box-sizing: border-box; }
.mfull .playerboard_side_gear:after { color: var(--dark-10); }
.tracker_passed { color: var(--light-50); }
.player_tags { color: var(--light-80); }
.card.corp, .card, .playerboard_own { color: #000; }
.corp_logo { filter: var(--drop-shadow-min); }
#player_boards .hand_symbol { filter: invert(1); }
#ebd-body[data-localsetting_handplace=floating] #hand_area { background-color: var(--dark-40); }
.handy:after { color: var(--light-70); }
.hand_sorter { background-color: var(--dark-40); color: var(--light-70); border: 1px solid var(--light-50); }
.hand_sorter .hs_button { border: 1px solid var(--light-70); }
.hand_sorter .hs_button[data-direction=increase], .hand_sorter .hs_button[data-direction=decrease] { background-color: var(--yellow-10); }
:root { --color-mapping_ff0000: #ff6565; --color-mapping_0000ff: #6565ff; --color-mapping_008000: #54aa54; --color-mapping_ffa500: #ffc965; }
.tooltipcontainer .invalid_prereq .tt_section.tt_prereq .card_tt_effect { color: #ff3333; }
.plcolor_ff0000 { --plcolor: #ff6565; }
.plcolor_0000ff { --plcolor: #6565ff; }
.plcolor_008000 { --plcolor: #54aa54; }
.plcolor_ffa500 { --plcolor: #ffc965; }
a#localsettings_restore span { white-space: break-spaces; }
#localsettings_restore { margin: 8px; }
.stack_dd_buttons.open { background: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-50); }
.log .movestamp { color: var(--light-80); }
.log:hover .movestamp { color: var(--blue-80); }
#button_undo { ${redButton} }
#button_undo:hover { ${redButtonOver} }
.bgabutton_orange { ${orangeButton} }
.bgabutton_orange:hover { ${orangeButtonOver} }
.bgabutton_targetcolor { ${blueButton} }
.bgabutton_targetcolor:hover { ${blueButtonOver} }
.bgabutton_purple { ${purpleButton} }
.bgabutton_purple:hover { ${purpleButtonOver} }
.bgabutton.disabled:hover { background: #4d4d4d; color: #f66; }
.card { filter: brightness(0.9); }
`;

_darkStyleForGame['terramystica'] = `
#player_boards .priest { background-image: none; }
#player_boards .ttpriestincome { color: var(--light-80) !important; }
.faction_selection_item, .player_faction { text-shadow: none; color: #fff; }
#logs .tmlogs_icon div[class^="trans_"] { border-radius: 12px; }
.control_box { background-color: var(--dark-20); }
.priests_collection { filter: var(--highlight-min); }
.structure_marker { filter: var(--drop-shadow); }
#faction_selection, .faction_supply, .favors_collection { background-color: var(--dark-back); }
#faction_name_alchemists, #faction_name_darklings { color: #5d7689 !important; text-shadow: #222222 1px 0px 1px, #222222 0px -1px 1px, #222222 0px 1px 1px, #222222 -1px 0px 1px !important; }
#faction_name_halflings, #faction_name_cultists { color: #a2602a !important; }
#faction_name_chaosmagicians, #faction_name_giants { color: #c5202e !important; }
`;

_darkStyleForGame['terranova'] = `
#game_board:before, .faction_board:before { content: ""; background: #0000001a; position: absolute; width: 100%; height: 100%; }
#faction_selection, .faction_supply { background-color: var(--dark-back); }
#logs .tmlogs_icon div[class^="trans_"] { border-radius: 12px; }
.control_box { background-color: var(--dark-20); }
.faction_selection_item, .player_faction { color: var(--light-80); text-shadow: none; }
#actions_overview { filter: brightness(0.9); }
`;

_darkStyleForGame['texasholdem'] = `
.dark-wood-horizontal-background body, .dark-wood-vertical-background body { background: none !important; }
.label { color: var(--light-70); }
`;

_darkStyleForGame['thattimeyoukilledme'] = `
#player_boards .tty-pawn-000000, .tty-log-entry.tty-log-move-pawn-000000, .tty-log-entry.tty-log-move-pawn-ffffff { filter: var(--highlight-min); }
.tty-rock-label { color: var(--light-80); }
.player-board { background-color: var(--dark-10); }
.tty-hat-000000 { filter: var(--highlight-min); }
`;

_darkStyleForGame['thatslife'] = `
#player_stacks, #own_tiles_container { background-color: var(--dark-back); }
#own_tiles_0 { background-color: var(--dark-20); color: #fff; }
#board:before { content: ""; background: #00000030; position: absolute; width: 100%; height: 100%; border-radius: 8px; }
.die { filter: brightness(0.9); }
.main_box { border: 1px solid var(--light-50); }
`;

_darkStyleForGame['theittybittycardgame'] = `
.theittybittycardgame-component-name { color: var(--light-80); }
`;

_darkStyleForGame['theboss'] = `
.stockitem { filter: var(--highlight-min); }
`;

_darkStyleForGame['thebrambles'] = `
.to_translate { font-weight: normal !important; text-shadow: none !important; }
#player_boards .player-name { text-shadow: none !important; }
.cardspace { color: #000; }
.card.empty, .card_back.empty { outline: 2px dotted var(--light-50); }
`;

_darkStyleForGame['thecrew'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
#logs span.card-value.#000 { text-shadow: var(--text-w-shadow); }
#logs span.card-value { padding-right: 0.2em; }
#logs span.logicon.#000 { filter: invert(1); }
.player-table .player-table-wrapper .player-table-name { background-color: var(--dark-20); }
.player-table, #discard-container #discard-wrapper, #hand-container, #thecrew-table>div#table-middle>div { background-color: var(--dark-back); }
.player-table.active { background-color: #4f555fbf; }
#thecrew-table>div#table-middle #cards-mat #card-mat-bottom div.mat-card-holder,
#thecrew-table>div#table-middle #cards-mat #card-mat-top div.mat-card-holder { border: 1px dashed #fff; }
#mission-overview #mission-overview-counter-wrapper { background: #22323f; color: var(--light-80); }
.book { --book-background: var(--dark-30); }
.book .open-book { color: var(--light-80); }
.book .open-book .chapter-title:after, .book .open-book .chapter-title:before { border-color: #fff; }
#mission-status #mission-counter-wrapper span#mission-counter.special-rule:before { background: var(--orange-30); }
#thecrew-table>div#table-middle #mission-status #distress { filter: var(--drop-shadow); }
#thecrew-table>div#table-middle #mission-status { background-color: var(--dark-10); border: 1px solid var(--light-50); }
#thecrew-table>div#table-middle>div { border: 1px solid var(--light-50); }
#logs span.card-value.blue, .card-description span.card-value.blue, .chatwindowtype_tablelog span.card-value.blue { color: var(--blue-70); }
#logs span.card-value.green, .card-description span.card-value.green, .chatwindowtype_tablelog span.card-value.green { color: var(--green-50); }
`;

_darkStyleForGame['thecrewdeepsea'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
#logs .notif_startNewMission > div { color: #000 !important; }
#logs span.card-value.#000 { text-shadow: var(--text-w-shadow); }
#logs span.logicon.#000 { background-color: #fff; }
.dijitTooltipContents .logicon { filter: var(--highlight-min); }
.player-table .player-table-name { background-color: var(--dark-20); }
.player-table, #thecrewdeepsea-table>div#table-middle>div,
#discard-container #discard-wrapper, #hand-container { background-color: var(--dark-back); }
.player-table.active { background-color: #4f555fbf; }
#thecrewdeepsea-table>div#table-middle #cards-mat #card-mat-bottom div.mat-card-holder,
#thecrewdeepsea-table>div#table-middle #cards-mat #card-mat-top div.mat-card-holder { border: 1px dashed #fff; }
#mission-overview #mission-overview-counter-wrapper { background: var(--dark-40); color: var(--light-80); }
div#end-panel { color: var(--light-80); }
#logs .log.notif_startNewMission .roundedbox { background: var(--dark-40); }
#logs .notif_startNewMission > div { color: var(--light-80) !important; }
#logs span.card-value.black, #mission-progress span.card-value.black, .card-description span.card-value.black, .chatwindowtype_tablelog span.card-value.black, .task span.card-value.black { text-shadow: var(--text-w-shadow); }
#logs span.logicon.black, #mission-progress span.logicon.black, .card-description span.logicon.black, .chatwindowtype_tablelog span.logicon.black, .task span.logicon.black { filter: var(--highlight-min); }
.book { --book-background: var(--dark-30); --book-cover-color: var(--dark-0); border: 1px solid var(--light-50); }
.book .open-book { color: var(--light-80); }
.book .open-book .chapter-title:after, .book .open-book .chapter-title:before { border-color: #fff; }
`;

_darkStyleForGame['thefoxintheforest'] = `
#overall-content[style^="background"]:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.playertablename.text_shadow { text-shadow: none; }
#odd_card_list, #trick_score_table { background: var(--dark-back); color: var(--light-80); }
.cardspace, .stockitem { color: #000; }
b[style="color:#5e3f85"] { color: #7b52ad !important; }
`;

_darkStyleForGame['thefoxintheforestduet'] = `
#overall-content[style^="background"]:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#info_board { color: var(--light-80); }
#card_list, #revealed_card_list { background: var(--dark-back); color: var(--light-80); }
.card { color: #000; }
`;

_darkStyleForGame['thegreatamericanfoxhunt'] = `
.TGAFH-PlayerHand { filter: invert(1); color: #000000; }
.TGAFH-Turn { background-color: var(--orange-10); }
`;

_darkStyleForGame['theguildofmerchantexplorers'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.card.investigate .cardtitle, .card.objective .objective_text { color: #000; }
#tabbed #gme_tabcontrol .tab_header { background: #000; }
#tabbed #gme_tabcontrol .tab_header.shown { background: #000; filter: var(--drop-shadow); }
.player_board .player_nametag { background: var(--dark-10); }
.bgabutton_orange { ${orangeButton} }
.bgabutton_orange:hover { ${orangeButtonOver} }
`;

_darkStyleForGame['theisleofcats'] = `
.tioc-player-panel-draft, .tioc-meeple{ filter: var(--drop-shadow); }
`;

_darkStyleForGame['thelast'] = `
#overall-content { background-image: none !important; }
.player-name, .playertablename { font-weight: normal; }
`;

_darkStyleForGame['thenumber'] = `
.tn-miniboard-digit { background: var(--dark-40); }
.tn-miniboard-digit-closed { background: #000; color: #000; }
`;

_darkStyleForGame['theshipwreckarcana'] = `
.hand_text { color: var(--light-80); }
.hand_token_space { background-color: var(--dark-back); }
#bga-zoom-controls { filter: invert(0.7); }
.suggestion_area { background-color: var(--dark-back); color: var(--light-80); }
.card_space, .hours_card, .card_back, #deck_next_card_space { filter: brightness(0.9); }
`;

_darkStyleForGame['thewaytojuliet'] = `
#board:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; top:0px; left:0px; }
.card { filter: brightness(0.9); }
`;

_darkStyleForGame['theyellowhouse'] = `
body { background-color: #442908; }
.yh_preview { background-color: var(--dark-back); }
.yh_sidetitle span { background-color: var(--dark-back); color: var(--light-80); }
.yh_item { color: var(--light-80); }
.bgabutton_blue[style="background: rgb(151, 91, 147); border-color: rgba(0, 0, 0, 0.5);"] { ${purpleButton} }
.bgabutton_blue[style="background: rgb(151, 91, 147); border-color: rgba(0, 0, 0, 0.5);"]:not(.disabled):hover { ${purpleButtonOver} }
.bgabutton_blue[style="background: rgb(213, 69, 76); border-color: rgba(0, 0, 0, 0.5);"] { ${redButton} }
.bgabutton_blue[style="background: rgb(213, 69, 76); border-color: rgba(0, 0, 0, 0.5);"]:not(.disabled):hover { ${redButtonOver} }
.bgabutton_blue[style="background: rgb(241, 180, 29); border-color: rgba(0, 0, 0, 0.5);"] { ${yellowButton} }
.bgabutton_blue[style="background: rgb(241, 180, 29); border-color: rgba(0, 0, 0, 0.5);"]:not(.disabled):hover { ${yellowButtonOver} }
.bgabutton_blue[style="background: rgb(59, 145, 77); border-color: rgba(0, 0, 0, 0.5);"] { ${greenButton} }
.bgabutton_blue[style="background: rgb(59, 145, 77); border-color: rgba(0, 0, 0, 0.5);"]:not(.disabled):hover { ${greenButtonOver} }
.yh_popup_content { background-color: var(--dark-20); border-color: var(--light-50); color: var(--light-80); }
`;

_darkStyleForGame['thirteenclues'] = `
#tcGameLogTable th { color: #05f; }
.tableWindow td { color: #8585ad; }
`;

_darkStyleForGame['threethousandscoundrels'] = `
.tech_icon { filter: invert(0.7); }
.leader_and_hand .player-name { background: var(--dark-back); padding: 0.3em 0.5em; border-radius: 6px; }
#hand { background-color: var(--dark-back); }
.scoundrel, .strategy_card { color: #000; }
#popin_choose-color { background-color: var(--dark-20); }
#popin_choose-color h2 { color: var(--light-80); }
#color_lines_wrapper .color_line { background-color: var(--dark-30); }
#color_lines_wrapper .color_line .arrows { filter: invert(0.7); }
`;

_darkStyleForGame['throughtheages'] = `
.firstplayernotice { color: #fff; }
.dijitTooltipContainer .imgtext, .tta_icon { filter: var(--drop-shadow); }
.workerpool_wrapper { background-color: var(--orange-10); border: 2px solid var(--orange-30); }
`;

_darkStyleForGame['throughtheagesnewstory'] = `
.firstplayernotice { color: #fff; }
.dijitTooltipContainer .imgtext, .tta_icon { filter: var(--drop-shadow); }
.workerpool_wrapper { background-color: var(--orange-10); border: 2px solid var(--orange-30); }
`;

_darkStyleForGame['tulipandrose'] = `
#info_container { background-color: var(--dark-10); color: var(--light-80); }
.tnr_highlight { border: 5px solid var(--red-10); }
`;

_darkStyleForGame['tuned'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#tuned-button-panel, #tuned-button-panel2 { background-color: var(--dark-40); }
`;

_darkStyleForGame['turnthetide'] = `
#rule_6p { background: #665700; color: #fff; }
.playercards { background: var(--dark-back); }
#tide_wrap { color: #fff; }
`;

_darkStyleForGame['thurnandtaxis'] = `
#help div div { filter: invert(1); }
#help h3, .gameAreaContainer h3, #carriages h3 { color: #c0c1d5; }
`;

_darkStyleForGame['thebuilders'] = `
#pagesection_gameview .whiteblock { color: #000; }
#avbuildings .stockitem, #builders .stockitem { box-shadow: 5px 5px 5px 0 #555; }
`;

_darkStyleForGame['thebuildersantiquity'] = `
#pagesection_gameview .whiteblock { color: #000; }
#universities { background: var(--dark-20); }
#builderdeck, #loans .stockitem, #prisoners .stockitem, #tools .stockitem, #universities .stockitem { box-shadow: 5px 5px 5px 0 #555; }
`;

_darkStyleForGame['thegnomesofzavandor'] = `
.gnomunculus { filter: invert(0.9); }
.alchemister, .emeromobile1, .emeromobile2, .emeromobile3, .emeromobile4, .emeromobile5 { filter: var(--drop-shadow); }
.tooltip_card_text { background-color: #232a24; }
#container1 .helpertext { background: var(--dark-10); color: var(--light-80); border: 2px solid #000; height: 32px; margin-top: -10px; box-sizing: border-box; cursor: pointer; }
#helper .helpertext { background: var(--dark-30); box-sizing: border-box; border-style: solid; border-width: 1px 2px; border-color: #000; margin-top: -2px; }
#helper .helpertext:nth-child(odd) { background: var(--dark-20); }
#helper .helpertext:first-child { background: var(--dark-10); border-top-width: 2px; }
#helper .helpertext:last-child { border-bottom-width: 2px; }
`;

_darkStyleForGame['themotherroad'] = `
.car { filter: var(--drop-shadow); }
`;

_darkStyleForGame['thermopyles'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#overall-content { color: var(--light-80); }
#persian_graveyard { background-color: var(--dark-back); opacity: 1;}
.table_bordered.hand_wrap { filter: var(--drop-shadow-min); }
`;

_darkStyleForGame['thewolves'] = `
body { background: none !important; }
.wolves-status-icon svg path { fill: var(--dark-20); stroke: var(--light-80); }
.wolves-status-icon:after { background: var(--dark-0); box-shadow: 0 0 4px #fff, 0 1px 2px #000; color: var(--light-80);
#wolves-game { filter: brightness(0.9); }
`;

_darkStyleForGame['thirtyone'] = `
.closer { background-color: var(--dark-40) !important; }
.name_shadow { text-shadow: none; }
`;

_darkStyleForGame['tholos'] = `
.quantity { color: #5b7fa4; }
`;

_darkStyleForGame['throneandthegrail'] = `
span[style^="color:#3a371e"] { text-shadow: var(--text-w-shadow) !important; }
.player_can_take_cards, .player_cannot_take_cards { background-color: transparent; }
.sprite-first_player_marker { border-radius: 48px; }
`;

_darkStyleForGame['tichu'] = `
#pagesection_gameview .whiteblock .playertablename[style="color:#000000"] { text-shadow: var(--text-w-shadow); }
#currentTrickDiv { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 6px; color: #fff; }
#pagesection_gameview .whiteblock.lastComboPlayer { background-color: rgb(183 183 87 / 70%); }
#pagesection_gameview .whiteblock.disabled:not(.lastComboPlayer) { background-color: hsla(0,0%,45%,.7); }
.grandtichublack, .tichublack, .grandtichucolor, .tichucolor { filter: var(--drop-shadow); }
#buttons { background: var(--dark-back); color: #fff; }
#game_play_area { background: var(--dark-back); }
#card-last-played-area .last-played-container { background: var(--dark-40); }
.last-played-player .last-played-icons .count { color: #fff; }
.player_board_inner { background-color: transparent !important; }
.icon.hand, .icon.star { filter: var(--drop-shadow); }
.playertablename { padding-left: 0.1em; }
tichu-status { filter: invert(1); }
`;

_darkStyleForGame['ticketgagnant'] = `
#piste:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
#moimeme { background-color: var(--dark-back); }
.card, .pari {  filter: brightness(0.9) drop-shadow(1px 1px 1px black); }
`;

_darkStyleForGame['tickettoride'] = `
#overall-content:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
#map { filter: brightness(0.8); }
.train-car-card, #train-car-deck .hidden-pile .deck-level, #train-car-deck #destination-deck-hidden-pile, .stockitem, .train-car-card { filter: brightness(0.9); }
.player-board:before { opacity: 0.6; }
`;

_darkStyleForGame['tickettorideeurope'] = _darkStyleForGame['tickettoride'];

_darkStyleForGame['tictacmatch'] = `
.card--empty { box-shadow: inset 0 0 10px #d79781; }
#layout-control-card-size { filter: invert(0.7); }
`;

_darkStyleForGame['tienlen'] = `
span[style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['tigriseuphrates'] = `
.log .point, .mini_monument_lower { filter: var(--highlight-min); }
.player_leader_wheel, #hand_leaders .mini_leader { filter: var(--drop-shadow); }
.player-board { background-color: var(--dark-20); }
.show_overlay #overlay:before { content: ""; background: #00000020; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['tikal'] = `
#tkl_side_area .tkl_panel_counter { background-color: var(--dark-10); border: 2px solid var(--light-50); color: var(--light-80); }
#tkl_board { filter: brightness(0.9); }
`;

_darkStyleForGame['tiki'] = `
.bgae_panel .bgae_content .panel { background-color: var(--dark-back); }
`;

_darkStyleForGame['timemasters'] = `
.options { background-image:none; background-color: var(--dark-back); }
.options a, #spheres { color: #fff; }
`;

_darkStyleForGame['timelinetwist'] = `
body { background: none !important; }
.tlt_zoom-button-icon { filter: invert(0.7); }
`;

_darkStyleForGame['tinyepicdefenders'] = `
#settings, #TED_zoom_plus, #TED_zoom_minus, .TED-inline-icon, .TED .tooltip-ability-icon { filter: invert(1); }
span[style^="color: #444444;"] { color: #aaaaaa !important; }
.TED#bgaimagebutton_submenu_wrap { background-color: var(--dark-10); }
.bgaimagebutton-submenu-icon .sprite-icon-symbol-Move, .bgaimagebutton-submenu-icon .sprite-icon-symbol-Secure,
#board .sprite-icon-symbol-Moven .dijitTooltipContainer .tooltip-ability-icon  { filter: invert(0.7); }
#board .sprite-icon-symbol-Move:hoVer { filter: invert(1); }
`;

_darkStyleForGame['tinyfarms'] = `
.playerBoardContainer>div:first-child { background-color: var(--dark-back) !important; }
#zoomControls { filter: invert(0.7); }
#popin_gameScoringAid_contents>div:first-child { background-color: #283b12 !important; }
.barnContainer>div:first-child { color: var(--light-80); text-shadow: none !important; }
`;

_darkStyleForGame['tinyturbocars'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#logs .ttc_car[style="background-position-x:-300%"] { filter: var(--highlight-min); }
`;

_darkStyleForGame['tiwanaku'] = `
#page-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#left-side-wrapper { background-color: transparent; }
.playerPawnsStack { background-color: var(--dark-back); }
.offering_icon { border: 1px solid #fff; border-radius: 20px; }
#externalBoard { margin-top: 1em; }
#failedCropWindow, #offeringWindow, #possibleActionsWindow, #selectCropWindow, #successCropWindow { background: var(--dark-back); color: var(--light-80); }
#externalBoard { filter: brightness(0.9); }
`;

_darkStyleForGame['tobago'] = `
#player_hand { color: #fff; }
`;

_darkStyleForGame['toc'] = `
#icon_first_player, #checkmark { filter: invert(1); }
.field { border-color: #c9ab69; }
`;

_darkStyleForGame['toepen'] = `
.playertablename { text-shadow: none; }
#pagesection_gameview .playertable.whiteblock.warning { background: #4d000080; }
`;

_darkStyleForGame['toeshambo'] = `
.slot { border: 1px dashed #fff; }
`;

_darkStyleForGame['tokaido'] = `
body { background: none !important; }
`;

_darkStyleForGame['tortugasixteensixtyseven'] = `
#tableEventCardsArea, .tortuga_tooltip_text_container, #myHandArea, #crowsNestVoteCardsContainer { background-color: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['trailblazers'] = `
.tb_tabs .tb_player { background-color: #13201b; }
`;

_darkStyleForGame['tranquility'] = `
.tqt_draw_count { filter: invert(1); }
#tqt_discardpile, .tqt_placement { background: var(--dark-back); }
.tqt_numbercard { filter: brightness(0.9); }
`;

_darkStyleForGame['tranquilitytheascent'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.card, .log_card, card_outer { filter: brightness(0.9); }
`;

_darkStyleForGame['trekkingtheworld'] = `
.riverCard { color: var(--dark-10); }
.postcard, #vp3deckvalue, #vp5deckvalue { color: #000; }
`;

_darkStyleForGame['trektwelve'] = `
#overall-content:before, .overallboard:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.board { filter: brightness(0.9); }
`;

_darkStyleForGame['trellis'] = `
#logs .trl_vine_color, #logs .trl_tile_actual_tile { filter: var(--highlight-min); }
`;

_darkStyleForGame['treos'] = `
.text-container { color: #000; }
.player_config_row svg { filter: invert(0.7); }
#decks-inner .minideck-row .minideck .deckinfo { background: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['triatri'] = `
#page-content { color: var(--light-80); }
.stockitem, .centertabletoken, .playertabletoken { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trickoftherails'] = `
#game_play_area_wrap, #discard_shares_header { color: var(--light-80); }
.totr_railhouse { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trike'] = `
.player_stone_black, .player_stone_white, .text_stone_black, .text_stone_white { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trio'] = `
.playerLabelContainer { justify-content: space-between; }
.playerLabelContainer .bgabutton[style="display: none;"] { display: block !important; visibility: hidden; }
#central_table, .playerArea { background: var(--dark-back) !important; }
`;

_darkStyleForGame['troggu'] = `
#playertables, #playertables.three_players, #playertables.four_players { background-color: var(--green-30); }
#turn_order, .three_players #turn_order { color: var(--green-50); }
`;

_darkStyleForGame['troyes'] = `
.t_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['troyesdice'] = `
.counter_icon.influence_icon, .log_resource_icon.influence_icon, .counter_icon.denier_icon,
.counter_icon.deniers_icon, .log_resource_icon.denier_icon, .log_resource_icon.deniers_icon,
.counter_icon.knowledge_icon, .log_resource_icon.knowledge_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['tucano'] = `
#overall-content:before { content: ""; background: #000000B0; position: absolute; width: 100%; height: 100%; }
#tuc-player-tableaus .tuc_header { background-color: #000 !important; }
.tuc_linenblock { background-color: var(--dark-back); }
.dijitTooltipContainer  .tuc_counter { color: var(--dark-10); }
`;

_darkStyleForGame['tumbleweed'] = `
#background, #background > * { filter: invert(1); )}
.coord_label { color: var(--light-80); }
`;

_darkStyleForGame['turingmachine'] = `
html { background: #004d24 !important; }
#gamemode { color: var(--light-80); }
#notepad, #guessnb  { background: var(--dark-20); color: #fff; }
.selectable { background-color: #00000055; text-shadow: -1px -1px #0006, 1px 1px #0006, -1px 1px #0006, 1px -1px #0006; }
.anatooltip { color: var(--dark-10); }
.txtdown { color: #000; }
.notepad-right-column .check_id, .notepad-right-column .check_hash { background-color: #1a6537bf; }
.blue { background-color: #56b3db; }
.yellow { background-color: #ffbd10; }
.purple { background-color: #846cb1; }
.notepad { color: var(--light-80); background-color: var(--dark-20); }
`;

_darkStyleForGame['turncoats'] = `
#game_map, #game_map > * { filter: invert(1); )}
.track { border: 2px solid var(--light-80); }
text { fill: var(--light-80); }
circle { stroke: var(--light-50); }
`;

_darkStyleForGame['twelvechips'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#logs [style="color:#10555f;"] { color: #1e9bae !important; }
.tc_zone { background-color: var(--dark-30); }
.tc_zone_bg { background-color: var(--dark-40); }
.tc_zone_name, .tc_zone_score { color: var(--light-80); }
.tc_slot { border: 3px dashed var(--light-50); }
`;

_darkStyleForGame['twentyfourseven'] = `
#tf7_player { background-color: var(--dark-back); }
`;

_darkStyleForGame['twinkletwinkle'] = `
.tile_button_confirm, .tile_button_rotate { color: var(--light-80); }
`;

_darkStyleForGame['twinpalms'] = `
#overall-content:before, .player-board:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; top:0px; left: 0px; }
.player-board:before { border-radius: 8px; }
.player_board_inner { color: #000; }
`;

_darkStyleForGame['twotenjack'] = `
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-back); }
.table_cell, [style="color:black"] { color: var(--light-80) !important; }
`;

_darkStyleForGame['ultimaterailroads'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#thething:before { filter: brightness(0.5); }
.player-name, .player_board_inner, .player_score { background-color: transparent; }
`;

_darkStyleForGame['umbrella'] = `
.um_board p { background-color: var(--dark-20); }
#um_label_left, #um_toggle_only_board { color: var(--light-80); }
.bg-point { filter: var(--drop-shadow); }
.um_board, .um_inter { filter: brightness(0.9); }
.um_popup_content { background-color: var(--dark-20); }
`;

_darkStyleForGame['unconditionalsurrender'] = `
#pagemaintitletext { background: var(--dark-20) !important }
#pagemaintitletext * { background-color: transparent !important; }
.USElog_phase { background-color: var(--orange-30); }
[style="background-color:#e7cca5;font-weight:bold;"] { color: #000; }
`;

_darkStyleForGame['undergrove'] = `
body { background: none !important; }
.icone_n, .icone_p, .icone_k, .icone_c,
.iconeracine_6c4740, .iconeracine_708975,
.iconesemi_6c4740, .iconesemi_708975,
.iconearbre_6c4740, .iconearbre_708975,
.icone_activation_b, .icone_activation_p,
.icone_activation_g, .icone_activation_y,
#firstplayer { filter: var(--drop-shadow); }
.zoom { filter: invert(0.7); }
#goals, #playerhand { background: var(--dark-back); color: #517b5b; outline: 4px solid #517b5b; }
#carbontrack { outline: 4px solid #517b5b; }
`;

_darkStyleForGame['unrest'] = `
div[style="background-color: rgba(255, 255, 255, 0.2);"], #right-side { background-color: var(--dark-back) !important; }
`;

_darkStyleForGame['uptown'] = `
.uptown_player_name {color: #000; }
`;

_darkStyleForGame['vaalbara'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.vlb_zone_title { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['valeofeternity'] = `
#ve_round { color: var(--light-80); }
.ve_header_phase, .ve_tooltip_cost { color: var(--light-70); }
.ve_zone, .ve_tooltip_title { text-shadow: var(--text-w-shadow); }
.ve_zone_market, .ve_placeholder { background-color: var(--dark-back); }
 `;

_darkStyleForGame['vault'] = `
.dieval { border: 1px solid var(--blue-70); }
.doubleempty { color: var(--light-80); }
.Diamond { border-radius: 50%; }
`;

_darkStyleForGame['vaultdenofthieves'] = _darkStyleForGame['vault'];

_darkStyleForGame['vegetables'] = `
h3[style="color:BLACK"] { color: var(--light-80) !important; }
`;

_darkStyleForGame['veggiegarden'] = `
#playArea:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; border-radius: 8px; }
#hand .card, #table .card, .fence, .field { filter: brightness(0.9); }
`;

_darkStyleForGame['vektorace'] = `
body { background: none !important; }
#map_container { background: var(--dark-20); border: 10px solid #000; }
.lapIcon, .standingsIcon { filter: var(--highlight); }
`;

_darkStyleForGame['veletas'] = `
.coord_label.luis { color: var(--light-70); }
#board { filter: brightness(0.9); background-color: var(--light-70); }
`;

_darkStyleForGame['veronatwist'] = `
.board:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; border-radius: 8px; }
.container2 { color: var(--light-80); }
.character { filter: drop-shadow(.2vw .4vw .6vw black) brightness(0.9); }
#QF, #QN, #SP {  filter: brightness(0.9); }
`;

_darkStyleForGame['viamagica'] = `
.vmg_portal_icon, .vmg_yellow_icon, .vmg_purple_icon, .vmg_green_icon, .vmg_blue_icon { filter: var(--highlight-min); }
#vmg_portalstockrow, .vmg_playerportalactiverow { background: var(--dark-20); }
.vmg_playerportaldonerow { background: var(--dark-40); }
#vmg_myportalactiverow { background-color: #00191a; }
#vmg_myportaldonerow { background-color: #040415; }
.vmg_card-tooltip-image:before { position: absolute; width: 100%; height: 100%; border: 5px solid #262626; box-sizing: border-box; content: ""; }
#vmg_tokenhelpimage, .vmg_refcard-tooltip-image, .stockitem { filter: brightness(0.9); }
`;

_darkStyleForGame['vidrasso'] = `
.vid_table_currentplayer { outline: 2px dashed var(--light-50); }
`;

_darkStyleForGame['villagers'] = `
.vil_tooltip b, .vil_tooltip em { color: #aaa; }
.vil_marketphase, .vil_villager { filter: brightness(0.9); }
`;

_darkStyleForGame['viticulture'] = `
#player_boards .cc_counter, .playerboard_row_header .cc_counter, #pagesection_gameview #board-row .whiteblock { color: #000; }
#player_boards .player-board { background: var(--dark-20) !important; }
#player_boards .player-board.vit_passed, #player_boards .playerboard_row.vit_passed { background: var(--dark-40) !important; }
.expandabletoggle:active, .expandabletoggle:hover, .expandabletoggle:link, .expandabletoggle:visited { color: #fff!important; }
.player_last_turn { background-color: transparent !important; }
.token.component { filter: var(--drop-shadow); }
#player_boards .cc_counter, .playerboard_row_header .cc_counter, .deck_count, #turn_header { color: var(--light-80); background: var(--dark-20); }
.label_boardLabels, .label_playerBoardLabels, .playerboard .building_slot, .playerBoardLabels { color: #000; }
.dijitTooltipContents .token.small { filter: var(--drop-shadow); }
.card.blueCard .name, .card.yellowCard .name, .card .description { color: #000; }
.mamaPapaCard { color: #000; }
.stock_active_slot .inner_element { border-color: var(--blue-50); }
.stock_active_slot .inner_element:hover { border-color: var(--blue-70); }
`;

_darkStyleForGame['volto'] = `
#board .title { color: var(--light-80); }
`;

_darkStyleForGame['vultureculture'] = `
#cards_on_table, #score_table, .other_hand { background-color: var(--dark-20); }
#my_hand { background-color: rgb(255 127 80 / 20%); }
#other_hands { border: 3px solid var(--dark-20); background-color: var(--dark-back); }
.heading { background-color: transparent; color: #fff; }
`;

_darkStyleForGame['warchest'] = `
#player_board_id:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; border-radius: 4px; }
#team_board_id { background-color: var(--dark-20) !important; }
.board_font { color: var(--light-80); }
.unit, .unit_popup { filter: brightness(0.9); }
`;

_darkStyleForGame['wastelandia'] = `
.panel-icon { filter: invert(0.7); }
#player_boards.whiteblock { background-image: none; background-color: var(--dark-40); }
.panel-cell.wastelandia-icon { filter: var(--drop-shadow); }
.wastelandia-icon { filter: invert(1); }
#optional-challenge-text { background-color: var(--dark-40); background-image: url(../img/layout/rounded_b.png); }
`;

_darkStyleForGame['watergate'] = `
#board:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; border-radius: 4px; }
#playerCardsInfo, #bottomHandArea, #topHandArea { color: var(--light-80); }
#handEditor, #handNixon { filter: invert(0.9); }
.card { border: 1px solid var(--light-80); }
.player-card { background: var(--dark-back); }
`;

_darkStyleForGame['wazabi'] = `
#direction { filter: invert(0.7); }
.cards { color: #000; }
.card_place { background-color: var(--dark-20); }
`;

_darkStyleForGame['welcometo'] = `
#player_boards .houses-status > svg { filter: invert(1); }
#player_boards .houses-status > div, #player_boards .refusal-status > div { color: #fff; }
#plan-cards-container, #construction-cards-container { background: var(--dark-back); }
#layout-controls-container[data-mode="0"] #layout-control-0, #layout-controls-container[data-mode="1"] #layout-control-1 { ${blueButton} }
#layout-controls-container[data-mode="0"] #layout-control-0:hover, #layout-controls-container[data-mode="1"] #layout-control-1:hover { ${blueButtonOver} }
#layout-controls-container #layout-control-merged-switch input[type=radio]:checked+label svg { color: var(--blue-80); }
`;

_darkStyleForGame['welcometonewlasvegas'] = `
#page-content h3 { color: #fff; }
.modal-content { background-color: var(--dark-20); }
.close:focus,.close:hover { color: #fff; }
.player_sheets_wrap, .stockitem { filter: brightness(0.9); }
`;

_darkStyleForGame['werewolves'] = `
#lgc_background_image:before { content: ""; background: #00000060; position: absolute; width: 100%; height: 100%; }
.tooltip_character { border-radius: 16px; }
.tooltip_character_text { background-color: var(--dark-10); }
.pc_playername { background-color: var(--dark-10); }
.notouch-device .pc_spot:hover .pc_playername { background-color: var(--dark-30); }
`;

_styleForGame['wingspan'] = `
#cde-floating-menu-score > .fa-star { background-image: none !important; filter: none !important; left: 0px; }
#cde-floating-menu-score > .fa-star:before { content: "\\f005" !important; }
`;

_darkStyleForGame['wingspan'] = `
.wsp_background_paper body { background: none !important; }
.wsp_background_paper #overall-content:before { content: ""; background: #000000b3; position: absolute; width: 100%; height: 100%; }
#spectatorbox { background-color: var(--dark-20) !important; }
.player_board_content, .wsp_playerboard_card_icon { color: #000; }
.wsp_tooltip_header span[style$="color: #666666"] { color: #ccc !important; }
#goal_current_round, #goal_title, #goal_forecast_option, .wsp_aviarycounter_turnsleft,
.player_board_content, .wsp_playerboard_card_icon, .player_score_value, #discard_label, #birdtray_label, .wsp_scoresheet_text { color: var(--light-80); }
#goal_appendix { color: var(--light-70); }
.wsp_playermat_opponent_label, .player_board_inner>.player-name, #player_board_inner_ffa500>.player-name,.wsp_player_ffa500>.wsp_playermat_opponent_label,
#player_board_inner_008000>.player-name,.wsp_player_008000>.wsp_playermat_opponent_label { text-shadow: 1px 0 2px #00000099,0 -1px 2px #00000099,0 1px 2px #00000099,-1px 0 2px #00000099 }
.wsp_birdtray_largecards #tray_img { background-color: var(--dark-10); }
#goal_board_img, .wsp_card_ontray, .wsp_playermat_img, .wsp_tooltip_bird_img, .wsp_card_aviary, #bird_discard,
#bird_draw, #bonus_discard, #bonus_draw, #logs .wsp_card_notif, .wsp_tooltip_bonus_img, .wsp_dice { filter: brightness(0.9); }
#wsp_show_underlay { background-color: #000; }
#goal_forecast_option_checkbox, #birdtray_zoom, .fa-star:not(.rating_star), #feeder_outside, .wsp_scoresheet_img, .wsp_scoresheet_img > * { filter: invert(1); }
#feeder_outside > div { filter: brightness(0.9) invert(1); }
.wsp_scoresheet_img { box-shadow: 1px 1px 8px #fff; }
.wsp_scoresheet_name, .wsp_scoresheet_ffa500, .wsp_scoresheet_008000 { text-shadow: none; }
.wsp_scoresheet_counter { color: var(--light-80); text-shadow: none; }
`;

_darkStyleForGame['wizard'] = `
.wizLogColor { color: #000; }
.wizPrefDeckFantasy .wizLogColor1 { background-color: var(--orange-30); }
.wizPrefDeckFantasy .wizLogColor2 { background-color: var(--green-30); }
.wizPrefDeckFantasy .wizLogColor3 { background-color: var(--red-30); }
.wizPrefDeckFantasy .wizLogColor4 { background-color: var(--blue-10); }
.wizPrefDeckStandard .wizLogColor1, .wizPrefDeckMedieval .wizLogColor1, .wizPrefDeckStandard .wizLogColor3, .wizPrefDeckMedieval .wizLogColor1 { color: var(--red-30); }
.wizPrefDeckStandard .wizLogColor2, .wizPrefDeckStandard .wizLogColor4, .wizPrefDeckMedieval .wizLogColor2 { text-shadow: var(--text-w-shadow); }
.wizPrefDeckMedieval .wizLogColor3 { color: var(--violet-80); }
.wizPrefDeckMedieval .wizLogColor4 { color: var(--green-30); }
.card .card-sides .card-side, #wizTrumpSelectionColor, #wizScorePad { filter: brightness(0.9); }
`;

_darkStyleForGame['wizardsgrimoire'] = `
.i-mana-x { color: #6666ff; }
.player_small_board .hand-icon-wrapper .hand-icon { filter: invert(1); }
.wg-tooltip-card .wg-tooltip-left .wg-tooltip-header { border-bottom: 2px solid var(--light-70); }
.wg-title, .player-table .wg-health { background-color: var(--dark-20); }
.bga-cards_deck-counter.round { background: var(--dark-30); color: #fff; }
.wg-card-gametext { color: #000; }
.player_small_board .icon-wrapper>div, .player_small_board .icon-wrapper>div.game-info { background: var(--dark-40); }
.player_small_board .icon-wrapper .hand { filter: invert(0.7); }
#wg-phase-selector { border: 2px solid var(--light-70); }
.player_small_board .icon-wrapper>div.choice { background-color: var(--green-30); }
.player_small_board .icon-wrapper>div.attacker { background-color: var(--red-30); }
`;

_darkStyleForGame['wonderfulkingdom'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.wk_zone_title { color: var(--light-70); }
.wk_stock p, .wk_phase_round { color: var(--light-80); }
.wk_phase_phases .wk_phase_selected { background-color: var(--dark-40); border: 1px solid var(--light-50); color: var(--light-80); }
.wk_threat_tooltip_desc, .wk_phase, .wk_zone_color_0, .wk_frozen { background-color: var(--dark-back); }
.bg-ressource_7 { filter: invert(1); }
.wk_phase_phases>div { color: var(--light-70); }
`;

_darkStyleForGame['wordtraveler'] = `
html { background-color: var(--dark-40); background-image: none; }
#wot-disclaimer { color: var(--light-80); }
`;

_darkStyleForGame['xanadu'] = `
#deck_remaining { color: var(--light-80); }
.whiteblock.xdu_building_area { position: relative; }
.whiteblock.xdu_building_area:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; }
.whiteblock.xdu_building_area > h3 { position: relative; display: block; }
`;

_darkStyleForGame['xiangqi'] = `
#top_files, #left_ranks { color: var(--light-80); }
#right_ranks, #bottom_ranks { color: var(--red-50); }
#board { filter: brightness(0.9); }
`;

_darkStyleForGame['yaniv'] = `
#playertable { background-color: var(--green-30); border: 5px solid var(--yellow-10); }
`;

_darkStyleForGame['yatzy'] = `
#scoring_chart { color: var(--light-80); }
#scoring_chart, #scoring_chart td, #scoring_chart th { border: 1px solid var(--light-50); }
.possible_cell { color: var(--light-50); }
.possible_cell:hover { background-color: #055a0566; }
.PointLine > th, .PointLine > td { color: #fff; }
.PointLine > td.possibleCells { color: gray; }
`;

_darkStyleForGame['yinyang'] = `
div#grid-container, .domino, .domino .domino-arrow { background-color: var(--dark-40); border-color: var(--light-70); }
div#yinyang-mask .square { border-bottom: 1px solid var(--red-30); }
div#yinyang-grid { border: 2px solid var(--light-70); }
div#yinyang-grid div.square, .domino div.square, .domino .domino-cause, .domino .domino-effect { border-color: var(--light-70) !important; }
`;

_darkStyleForGame['ynarosfallin'] = `
.firstplayer { filter: invert(1); }
#player_boards .crystal, #player_boards .boardblock .character, #player_boards .shadowdice, #player_boards .xp,
.shadowcardinhand, .shadowcard { filter: var(--drop-shadow-min); }
#popin_appendix { background-image: none; }
#container_game { filter: brightness(0.9); }
`;

_darkStyleForGame['yokai'] = `
body { background: none !important; }
#hints_wrap { color: #fff; }
#deck { border: 1px solid var(--light-70); }
.Hint, .Yokai { filter: brightness(0.9); }
`;

_darkStyleForGame['yokaiseptet'] = `
#overall-content { background: none !important; }
.playertablename { text-shadow: none; }
.tooltiptext [style="color:#000000;"] { color: #fff !important; }
b[style="color:#000000;"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['yokohama'] = `
#eog_triggers > div:first-child { background-color: var(--dark-10) !important; }
.mngt_button { color-scheme: dark; background-color: var(--dark-20); }
`;

_darkStyleForGame['yspahan'] = `
#mainboard:before, .player_board:before { content: ""; background: #00000040; position: absolute; width: 100%; height: 100%; }
#caravan, #building_costs_table, #deckspace { filter: brightness(0.9); }
`;

_darkStyleForGame['zefiria'] = `
.doubleempty { color: #fff; }
.blueact { filter: invert(0.7); }
div[id^="plname"]:not(:empty) { background-color: var(--dark-back); border-radius: 8px; }
`;

_darkStyleForGame['zenith'] = `
.zn_panel { background-color: var(--dark-back); border: 5px solid var(--dark-10); color: var(--light-80); }*
.bg-hand { filter: invert(0.9); }
#zn_board_diplo img, #zn_board_planet img, .zn_tech { filter: brightness(0.9); }
.bgabutton_blue[style="background-color: rgb(222, 106, 86); color: rgb(0, 0, 0); text-shadow: none;"] { ${redButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(222, 106, 86); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${redButtonOver} }
.bgabutton_blue[style="background-color: rgb(225, 195, 207); color: rgb(0, 0, 0); text-shadow: none;"] { ${pinkButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(225, 195, 207); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${pinkButtonOver} }
.bgabutton_blue[style="background-color: rgb(195, 157, 217); color: rgb(0, 0, 0); text-shadow: none;"] { ${purpleButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(195, 157, 217); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${purpleButtonOver} }
.bgabutton_blue[style="background-color: rgb(254, 232, 147); color: rgb(0, 0, 0); text-shadow: none;"] { ${yellowButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(254, 232, 147); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${yellowButtonOver} }
.bgabutton_blue[style="background-color: rgb(214, 197, 134); color: rgb(0, 0, 0); text-shadow: none;"] { ${orangeButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(214, 197, 134); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${orangeButtonOver} }
.bgabutton_blue[style="background-color: rgb(151, 193, 175); color: rgb(0, 0, 0); text-shadow: none;"] { ${greenButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(151, 193, 175); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${greenButtonOver} }
.bgabutton_blue[style="background-color: rgb(75, 157, 217); color: rgb(0, 0, 0); text-shadow: none;"] { ${blueButton} }
.notouch-device .bgabutton_blue[style="background-color: rgb(75, 157, 217); color: rgb(0, 0, 0); text-shadow: none;"]:not(disabled):hover { ${blueButtonOver} }
`;

_darkStyleForGame['zola'] = `
div#board:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['zookeepers'] = `
.zkp_card { filter: brightness(0.9); }
#bga-zoom-controls { filter: invert(0.8); }
`;

_darkStyleForGame['zooloretto'] = `
div[id^="board_"], .wagon { filter: brightness(0.9); }
.playeraid { filter: brightness(0.7); }
`;

_darkStyleForGame['zuuli'] = `
.doubleempty { color: #fff; }
#inside-me > div[style*="background-color: white;"] { background: var(--dark-back) !important; }
.writes.lg { background: var(--dark-back); color: var(--light-80); }
#inside-me > div:first-child, #inside-me .writes.wh { background: var(--dark-20) !important; color: #fff; }
`;

export const darkStyleForGame = _darkStyleForGame;
export const styleForGame = _styleForGame;
