import { waitForObj } from '../utils/misc/wait';
import { isFirefox } from "../utils/browser";

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
  'carsoncity',
  'cartographers',
  'castlecombo',
  'castlesofcaleira',
  'castleofmadkingludwig',
  'catannewenergies',
  'catinthebox',
  'caverna',
  'century',
  'chromino',
  'clashofdecks',
  'coatl',
  'codexnaturalis',
  'coffee',
  'coffeerush',
  'concept',
  'conspiracy',
  'cookiebattle',
  'craftingthecosmos',
  'darwinsjourney',
  'deadcells',
  'dedale',
  'dicycards',
  'dobbleconnect',
  'dogpark',
  'dontgointhere',
  'dontletitdie',
  'draculahelsing',
  'draftandwriterecords',
  'duckcover',
  'dungeonpetz',
  'dvonn',
  'earth',
  'earthabundance',
  'easypeasy',
  'ekko',
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
  'fliptoons',
  'flowersmandalagame',
  'forbiddenisland',
  'frenchtarot',
  'fromage',
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
  'kado',
  'khiva',
  'kikaibricolageheads',
  'kingoftokyo',
  'kiriaitheduel',
  'knarr',
  'krosmasterblast',
  'lasvegan',
  'lielow',
  'lineit',
  'livingforestduel',
  'locomomo',
  'lostexplorers',
  'lostseas',
  'lumen',
  'luz',
  'maatatahay',
  'mantisfalls',
  'mastersofrenaissance',
  'megajackpot',
  'memoir',
  'mesos',
  'mexica',
  'middleages',
  'mindup',
  'misty',
  'mojo',
  'monstertrick',
  'moonlight',
  'moonshine',
  'mountaingoats',
  'mrjack',
  'mycity',
  'mycityrb',
  'mythicbattlesragnarok',
  'newfrontiers',
  'nextstation',
  'newton',
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
  'pergola',
  'photosynthesis',
  'pingimus',
  'pixies',
  'planetunknown',
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
  'schottentotten',
  'skyteam',
  'skull',
  'skullking',
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
  'super',
  'symbiose',
  'takenokolor',
  'talon',
  'taluva',
  'tapestry',
  'tekken',
  'thecrew',
  'thecrewdeepsea',
  'thehanginggardens',
  'theninesonsofthedragon',
  'theyellowhouse',
  'tickettoride',
  'tickettorideeurope',
  'tikal',
  'tinyturbocars',
  'towerup',
  'toybattle',
  'trailblazers',
  'trektwelve',
  'trio',
  'tucano',
  'tuned',
  'turingmachine',
  'twelvechips',
  'twilightimperium',
  'twinkletwinkle',
  'ultimaterailroads',
  'unrest',
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
  'lumen',
  'mantisfalls',
  'maracaibo',
  'mesos',
  'notalone',
  'nowboarding',
  'scythe',
  'spacestationphoenix',
  'stonespinearchitects',
  'tickettoride',
  'tickettorideeurope',
  'twinpalms',
  'viticulture'
];

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
  challengers: ['challengers-pref-background-dark'],
  cuttle: ['theme_cuttlefish'],
  festival: ['black-background', 'dark-wood-background'],
  gemsofiridescia: ['goi_thematicBackground'],
  nirds: ['spicy'],
  orapamine: ['orp_pref-thematicBackground-blue', 'orp_pref-thematicBackground-red'],
  rollintotown: ['rt-pref-background-dark'],
  setup: ['setup-pref-background-dark'],
  supermegaluckybox: ['smlb_background'],
  texasholdem: ['dark-wood-vertical-background', 'dark-wood-horizontal-background'],
  thewhitecastle: ['custom-background'],
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
  ink: ['#player-table-{{player_id}} .name-wrapper'],
  laserreflection: ['#lrf_container_{{player_id}} .lrf_progress-bar'],
  lorenzo: ['#obrPlayerboardId_{{player_id}} .obr_playerboard_name'],
  nirds: ['#player_table_{{player_id}} .title'],
  qwinto: ['#qwinto-player-board-background-{{player_id}} .qwinto_name_tag'],
  thegreatamericanfoxhunt: ['#TGAFH_player_89123556'],
  treos: ['#gamezone-{{player_id}} .player-board-name'],
};

export const playersBorder: { [gameName: GameName]: string[] } = {
  arboretum: ['#player-table-{{player_id}}', '#player-table-{{player_id}} h3'],
  bagofchips: ['#player-table-{{player_id}}'],
  bang: ['#bang-player-{{player_id}} .bang-player-container[style^="border: 2px"]'],
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
  itsawonderfulworld: ['#iww-player{{player_id}}'],
  jumpdrive: ['#jdr-tableau-{{player_id}}'],
  letsgotojapan: ['#playerhandtitle_{{player_id}}', '#playerhand_{{player_id}}', '#nameplayer_{{player_id}}'],
  lorenzo: ['#obrPlayerboardId_{{player_id}}'],
  nirds: ['#player_table_{{player_id}}'],
  pioneerdaysproject: ['#playerbox-{{player_id}}'],
  piratas: ['#playmat_{{player_id}}'],
  pixies: ['#player-table-{{player_id}}'],
  qwinto: ['#qwinto-player-board-background-{{player_id}}'],
  refuge: ['#player-table-{{player_id}}'],
  riverofgold: ['#rog_player_delivered_resizable-{{player_id}}'],
  rumbleplanet: ['#player-table-{{player_id}}'],
  skatelegend: ['#player-table-{{player_id}}'],
  treos: ['#gamezone-{{player_id}}'],
  theguildofmerchantexplorers: ['#tab_header_board_{{player_id}}'],
  upordown: ['#player-table-{{player_id}}'],
  verdant: ['#house_{{player_id}}'],
  welcometothemoon: ['#score-sheet-{{player_id}}', '#score-sheet-{{player_id}} .player-name'],
  wizardsgrimoire: ['.wg-title.ext_player_{{player_id}}', '#player-table-{{player_id}}-health', '#player-table-{{player_id}} .player-table'],
};

export const playersTextColor: { [gameName: GameName]: string[] } = {
  upordown: ['#player-table-{{player_id}} .player-table-name'],
};

export const gamesWithCustomColors: { [gameName: GameName]: string[] } = {
  ageofinnovation: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  altay: ['#000000', '#ebb41b', '#e12129', '#00a7d2', '#47a34b'],
  cosmoctopus: ['#20134b'],
  deadcells: ['#3c733a', '#ab3237', '#5c5aa5', '#c97014'],
  deliverance: ['#8b4513', '#ee0000', '#ffd700', '#007f00'],
  fiftyfirststate: ['#ff0000', '#0000ff', '#ffa500'],
  harmonies: ['#ff0000', '#008000', '#ffa500', '#0000ff'],
  imperialsettlers: ['#0000ff', '#ff0000', '#ffa500'],
  insidejob: ['#0000ff', '#ff0000', '#ffa500', '#773300', '#008000'],
  livingforestduel: ['#302879', '#32693b'],
  lumen: ['#1f3067'],
  nimalia: ['#0000ff', '#ff0000', '#ffa500', '#008000'],
  nowboarding: ['#000000'],
  pandemic: ['#252525'],
  parklife: ['#333333'],
  resist: ['#782520'],
  riverofgold: ['#000000', '#ff0000', '#008000', '#0000ff', '#ffffff'],
  siam: ['#0000ff', '#ffa500'],
  superstore: ['#2d5787', '#613d31', '#f36c45', '#8b4e6e'],
  tactile: ['#f10000', '#0f87da', '#f3ac11', '#6ab524'],
  thefoxintheforest: ['#5e3f85'],
  terraformingmars: ['#ff0000', '#0000ff', '#008000', '#ffa500'],
  terramystica: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  terranova: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  verdant: ['#2d3691']
};

const getDefaultBackgroundStyle = (src: HTMLElement) => {
  const backStyle = getComputedStyle(src).background;
  return (backStyle.indexOf('back-main_games') > 0 || backStyle.indexOf('none') > 0) ? undefined : backStyle;
};

const copyDefaultBackgroundStyle = (overlay: HTMLElement, attempt: number) => {
  const backStyle = getDefaultBackgroundStyle(document.documentElement) || getDefaultBackgroundStyle(document.body) || getDefaultBackgroundStyle(document.querySelector('#overall-content') || document.body);

  if (backStyle) {
    overlay.style.background = backStyle;
  } else if (attempt < 20) {
    setTimeout(() => copyDefaultBackgroundStyle(overlay, attempt + 1), 100);
  }
};

const getCssPath = (file: string) => {
  const links = document.querySelectorAll('link[rel="stylesheet"]');

  for (const link of links) {
    const href = link.getAttribute('href');

    if (href && href.endsWith(file)) {
      const cssUrl = (link as any).href as string;
      return cssUrl.replace(file, '');
    }
  }

  return '';
};

const addInvertOverlay = (className: string, copyDefaultStyle: boolean) => {
  waitForObj('#overall-content').then(overallContent => {
    const overlay = document.createElement("DIV");
    overlay.style.position = 'absolute';
    overlay.style.top = '0px';
    overlay.style.left = '0px';
    overlay.style.width = '100%';
    overlay.style.height = '100%';

    if (!copyDefaultStyle) {
      overlay.className = `bgaext_overlay ${className}`;
      overlay.style.filter = 'invert(1)';
    } else if (isFirefox) {
      overlay.className = `bgaext_overlay_ff`;
      overlay.style.backgroundColor = 'var(--dark-40)';
    } else {
      overlay.className = `bgaext_overlay ${className}`;
      overlay.style.filter = 'invert(1)';
      copyDefaultBackgroundStyle(overlay, 0);
    }

    overallContent.insertBefore(overlay, overallContent.firstChild);
  });
};

type CustomActions = { init: () => void, setDarkMode?: (darkMode: boolean) => void, isDarkMode?: () => boolean };
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
  coffeerush: {
    init: () => addInvertOverlay('', true)
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
  towerup: {
    init: () => addInvertOverlay('', true)
  },
  scratchandcatch: {
    init: () => addInvertOverlay('', true)
  },
  thehanginggardens: {
    init: () => addInvertOverlay('', true)
  },
  bunnyboom: {
    init: () => addInvertOverlay('', true)
  },
  toybattle: {
    init: () => addInvertOverlay('', true)
  },
  monstertrick: {
    init: () => addInvertOverlay('', true)
  },
  ink: {
    init: () => addInvertOverlay('', true)
  },
  luz: {
    init: () => addInvertOverlay('', true)
  },
  verso: {
    init: () => addInvertOverlay('', true)
  },
  fliptoons: {
    init: () => addInvertOverlay('', true)
  },
  pergola: {
    init: () => addInvertOverlay('', true)
  },
  wanderingtowers: {
    init: () => addInvertOverlay('', true)
  },
  newton: {
    init: () => {
      waitForObj('#ntn_draft_masters_area').then(() => {
        const imgUrl = `${getCssPath('newton.css')}img/tiles_sprites.png`;
        console.debug(`[bga extension] Newton sprites background path is '${imgUrl}'`);
        document.body.style.setProperty("--quick-action-back", `url(${imgUrl})`);
      });
    }
  },
  beyond: {
    init: () => {
      waitForObj('#byd-game-area').then(() => {
        const cssPath = getCssPath('beyond.css');
        console.debug(`[bga extension] Beyond css path is '${cssPath}'`);
        document.body.style.setProperty("--playmat1", `url(${cssPath}img/BYD_Playmat.jpg)`);
        document.body.style.setProperty("--playmat2", `url(${cssPath}img/BYD_Playmat2.jpg)`);
      });
    }
  }
};