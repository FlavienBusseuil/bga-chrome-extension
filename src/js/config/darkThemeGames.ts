import { waitForObj } from '../utils/misc/wait';

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
  'beerbread',
  'betta',
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
  'carnegie',
  'cartographers',
  'castlecombo',
  'castlesofcaleira',
  'catinthebox',
  'caverna',
  'century',
  'chromino',
  'clashofdecks',
  'coatl',
  'codexnaturalis',
  'coffee',
  'concept',
  'conspiracy',
  'craftingthecosmos',
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
  'easypeasy',
  'ekko',
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
  'flipseven',
  'flowersmandalagame',
  'forbiddenisland',
  'fromage',
  'gangofdice',
  'gangsta',
  'gardennation',
  'gardenrush',
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
  'jurassicsnack',
  'kado',
  'khiva',
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
  'maatatahay',
  'mantisfalls',
  'mastersofrenaissance',
  'megajackpot',
  'memoir',
  'mesos',
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
  'super',
  'symbiose',
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
  'towerup',
  'toybattle',
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
  'verdant',
  'wizardscup',
  'wizardsgrimoire',
  'wonderfulkingdom',
  'wordtraveler',
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
  'aiye',
  'apiary',
  'coatl',
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
  'mesos',
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
  },
  twilightimperium: {
    className: 'dark',
    applyGeneralCss: false
  },
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
  golems: ['#pl{{player_id}}_label'],
  laserreflection: ['#lrf_container_{{player_id}} .lrf_progress-bar'],
  lorenzo: ['#obrPlayerboardId_{{player_id}} .obr_playerboard_name'],
  nirds: ['#player_table_{{player_id}} .title'],
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
  flowers: ['#flw_playZone_{{player_id}}'],
  gemsofiridescia: ['#goi_playerZoneContainer\\:{{player_id}}'],
  heat: ['#player-table-{{player_id}}'],
  heatchampionship: ['#player-table-{{player_id}}'],
  itsawonderfulworld: ['#iww-player{{player_id}}'],
  jumpdrive: ['#jdr-tableau-{{player_id}}'],
  letsgotojapan: ['#playerhandtitle_{{player_id}}', '#playerhand_{{player_id}}', '#nameplayer_{{player_id}}'],
  lorenzo: ['#obrPlayerboardId_{{player_id}}'],
  nirds: ['#player_table_{{player_id}}'],
  pioneerdaysproject: ['#playerbox-{{player_id}}'],
  piratas: ['#playmat_{{player_id}}'],
  pixies: ['#player-table-{{player_id}}'],
  refuge: ['#player-table-{{player_id}}'],
  riverofgold: ['#rog_player_delivered_resizable-{{player_id}}'],
  rumbleplanet: ['#player-table-{{player_id}}'],
  skatelegend: ['#player-table-{{player_id}}'],
  treos: ['#gamezone-{{player_id}}'],
  theguildofmerchantexplorers: ['#tab_header_board_{{player_id}}'],
  verdant: ['#house_{{player_id}}'],
  welcometothemoon: ['#score-sheet-{{player_id}}', '#score-sheet-{{player_id}} .player-name'],
  wizardsgrimoire: ['.wg-title.ext_player_{{player_id}}', '#player-table-{{player_id}}-health', '#player-table-{{player_id}} .player-table'],
};

export const gamesWithCustomColors: { [gameName: GameName]: string[] } = {
  ageofinnovation: ['#971923', '#278139', '#70421d', '#1a2126', '#f9ae18', '#1d7ddb'],
  altay: ['#000000', '#ebb41b', '#e12129', '#00a7d2', '#47a34b'],
  cosmoctopus: ['#20134b'],
  deadcells: ['#3c733a', '#ab3237', '#5c5aa5', '#c97014'],
  deliverance: ['#8b4513', '#ee0000', '#ffd700', '#007f00'],
  fiftyfirststate: ['#ff0000', '#0000ff', '#ffa500'],
  harmonies: ['#ff0000', '#008000', '#ffa500', '#0000ff'],
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

const manageBackground = (defBackClass: string, otherBackClasses: string[]) => {
  const defBackFound = defBackClass ? document.documentElement.classList.contains(defBackClass) : true;
  const otherBackFound = otherBackClasses.find(c => document.documentElement.classList.contains(c));

  if (!defBackFound && !otherBackFound) {
    console.debug("[bga extension] Manage background : no class found");
    setTimeout(() => manageBackground(defBackClass, otherBackClasses), 50);
  } else if (otherBackFound) {
    console.debug("[bga extension] Manage background : cust class found");
    document.documentElement.classList.add("bgaext_cust_back");
  } else {
    console.debug("[bga extension] Manage background : def class found");
    document.documentElement.classList.remove("bgaext_cust_back");
  }
};

const getDefaultBackgroundStyle = (src: HTMLElement) => {
  const backStyle = getComputedStyle(src).background;
  return (backStyle.indexOf('back-main_games') > 0 || backStyle.indexOf('none') > 0) ? undefined : backStyle;
};

const copyDefaultBackgroundStyle = (overlay: HTMLElement, attempt: number) => {
  const backStyle = getDefaultBackgroundStyle(document.documentElement) || getDefaultBackgroundStyle(document.body);

  if (backStyle) {
    overlay.style.background = backStyle;
  } else if (attempt < 20) {
    setTimeout(() => copyDefaultBackgroundStyle(overlay, attempt + 1), 100);
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
      waitForObj('#fes-background2', 5).then((input) => {
        const festManageBackground = () => manageBackground("no-custom-background", ["black-background", "dark-wood-background"]);
        input.addEventListener('change', () => setTimeout(festManageBackground, 100));
        festManageBackground();
      });
    }
  },
  apiary: {
    init: () => {
      waitForObj('#preference_control_102', 5).then((input) => {
        const apiaryManageBackground = () => manageBackground("no-custom-background", ["custom-background"]);

        input.addEventListener('change', () => setTimeout(apiaryManageBackground, 100));
        document.getElementById('preference_fontrol_102')?.addEventListener('change', () => setTimeout(apiaryManageBackground, 100));
        apiaryManageBackground();
      });
    }
  },
  thewhitecastle: {
    init: () => {
      waitForObj('#preference_control_102', 5).then((input) => {
        const whitecastleManageBackground = () => manageBackground("no-custom-background", ["custom-background"]);

        input.addEventListener('change', () => setTimeout(whitecastleManageBackground, 100));
        document.getElementById('preference_fontrol_102')?.addEventListener('change', () => setTimeout(whitecastleManageBackground, 100));
        whitecastleManageBackground();
      });
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

      input.addEventListener('change', () => setTimeout(barrageManageBackground, 100));
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
      const manageTexasBackground = () => {
        if (document.documentElement.classList.contains('dark-wood-vertical-background') || document.documentElement.classList.contains('dark-wood-horizontal-background')) {
          document.documentElement.classList.add("bgaext_cust_back");
        } else {
          document.documentElement.classList.remove("bgaext_cust_back");
        }
      };
      setTimeout(manageTexasBackground, 500);
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
  towerup: {
    init: () => addInvertOverlay('', true)
  },
  scratchandcatch: {
    init: () => addInvertOverlay('', true)
  },
  thehanginggardens: {
    init: () => addInvertOverlay('', true)
  },
  gemsofiridescia: {
    init: () => {
      const manageGemsBackground = () => {
        if (document.documentElement.classList.contains('goi_thematicBackground')) {
          document.documentElement.classList.add("bgaext_cust_back");
        } else {
          document.documentElement.classList.remove("bgaext_cust_back");
        }
      };
      setTimeout(manageGemsBackground, 500);
    }
  },
  bunnyboom: {
    init: () => addInvertOverlay('', true)
  },
  toybattle: {
    init: () => addInvertOverlay('', true)
  },
  cuttle: {
    init: () => {
      const input1 = document.getElementById('preference_control_100') as any;
      const input2 = document.getElementById('preference_fontrol_100') as any;
      const setupManageBackground = () => manageBackground("theme_bga", ["theme_cuttlefish"]);

      input1.addEventListener('change', () => setTimeout(setupManageBackground, 500));
      input2.addEventListener('change', () => setTimeout(setupManageBackground, 500));
      setupManageBackground();
    }
  },
  nirds: {
    init: () => {
      const input1 = document.getElementById('background-choice') as any;
      const nirdsManageBackground = () => {
        if (document.documentElement.classList.contains('spicy')) {
          document.documentElement.classList.add("bgaext_cust_back");
        } else {
          document.documentElement.classList.remove("bgaext_cust_back");
        }
      };

      input1.addEventListener('click', () => {
        setTimeout(nirdsManageBackground, 50);
      });
      nirdsManageBackground();
    }
  },
  orapamine: {
    init: () => {
      waitForObj('#orp_board', 5).then(() => {
        const input1 = document.getElementById('preference_control_100') as any;
        const input2 = document.getElementById('preference_fontrol_100') as any;
        const setupManageBackground = () => manageBackground("", ["orp_pref-thematicBackground-blue", "orp_pref-thematicBackground-red"]);

        input1.addEventListener('change', () => setTimeout(setupManageBackground, 500));
        input2.addEventListener('change', () => setTimeout(setupManageBackground, 500));
        setTimeout(setupManageBackground, 500);
      });
    }
  },
};