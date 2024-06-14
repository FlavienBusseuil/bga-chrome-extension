import { getUrl } from "../utils/chrome";

export const gamesWithCustomBackground = [
  'abyss',
  'agricola',
  'altered',
  'arknova',
  'azul',
  'azulsummerpavilion',
  'battlespiritssaga',
  'beyondthesun',
  'carnegie',
  'cartographers',
  'catinthebox',
  'chromino',
  'concept',
  'conspiracy',
  'dobbleconnect',
  'dontgointhere',
  'draculahelsing',
  'draftandwriterecords',
  'earth',
  'eminentdomain',
  'emdomicrocosm',
  'equinox',
  'escapethecurseofthetemple',
  'evolution',
  'federation',
  'flowersmandalagame',
  'fromage',
  'gangsta',
  'giftoftulips',
  'goblinhood',
  'goldblivion',
  'gravitysuperstar',
  'grund',
  'itsawonderfulworld',
  'iwari',
  'jekyllvshide',
  'jumpdrive',
  'khiva',
  'kingoftokyo',
  'krosmasterblast',
  'lasvegan',
  'lielow',
  'lostexplorers',
  'maatatahay',
  'mantisfalls',
  'mastersofrenaissance',
  'memoir',
  'middleages',
  'mojo',
  'mrjack',
  'mycity',
  'mycityrb',
  'mythicbattlesragnarok',
  'newfrontiers',
  'nextstation',
  'nidavellir',
  'nimalia',
  'notalone',
  'nowboarding',
  'numberdrop',
  'ontour',
  'openseason',
  'oriflamme',
  'pandemic',
  'paxrenaissance',
  'pingimus',
  'pixies',
  'pocketcats',
  'pook',
  'quirkyquarks',
  'restinpeace',
  'romirami',
  'santorini',
  'secretmoon',
  'skull',
  'sobektwoplayers',
  'spacebase',
  'spaceempires',
  'spacestationphoenix',
  'splendor',
  'splendorduel',
  'stella',
  'starfluxx',
  'taluva',
  'thecrew',
  'tickettoride',
  'tickettorideeurope',
  'tikal',
  'talon',
  'tinyturbocars',
  'trailblazers',
  'trio',
  'tuned',
  'unrest',
  'wizardsgrimoire',
  'wonderfulkingdom',
  'wordtraveler'
];

export const gamesWithCustomPanel = [
  'dronesvsseagulls',
  'eminentdomain',
  'emdomicrocosm',
  'envelopesofcash',
  'fromage',
  'lumen',
  'mantisfalls',
  'maracaibo',
  'notalone',
  'nowboarding',
  'sevenwondersarchitects',
  'spacestationphoenix',
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
  romirami: {
    className: 'bx-background-dark',
    applyGeneralCss: true
  },
  draftandwriterecords: {
    className: 'bx-background-dark',
    applyGeneralCss: true
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
  azulsummerpavilion: ".player-name.color"
};

export const gamesWithCustomColors = {
  terramystica: ['#971923', '#278139', '#70421d', '#1a2126'],
  terranova: ['#971923', '#278139', '#70421d', '#1a2126'],
  nowboarding: ['#000000'],
  lumen: ['#1f3067'],
  nimalia: ['#0000ff', '#ff0000', '#ffa500', '#008000'],
  riverofgold: ['#000000', '#ff0000', '#008000', '#0000ff', '#ffffff'],
};

export const gamesWithCustomActions = {
  earth: {
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
      const manageBackground = () => {
        if (document.documentElement.classList.contains("smlb_background")) {
          document.documentElement.classList.add("custom_background");
        } else if (!document.documentElement.classList.contains("smlb_bga_background")) {
          setTimeout(manageBackground, 50);
        }
      };
      manageBackground();
    }
  },
  wingspan: {
    init: () => {
      const input1 = document.getElementById('preference_control_101') as any;
      const input2 = document.getElementById('preference_fontrol_101') as any;

      const manageBackground = () => {
        if (!document.documentElement.classList.contains("wsp_birdtray_default") && !document.documentElement.classList.contains("wsp_birdtray_largecards")) {
          setTimeout(manageBackground, 50);
        } else if (document.documentElement.classList.contains("wsp_background_paper")) {
          document.documentElement.classList.add("custom_background");
        } else {
          document.documentElement.classList.remove("custom_background");
        }
      };

      input1.addEventListener('change', () => setTimeout(manageBackground, 500));
      input2.addEventListener('change', () => setTimeout(manageBackground, 500));

      manageBackground();
    }
  },
};

const _darkStyleForGame = {};
const _styleForGame = {};

_darkStyleForGame['abyss'] = `
#krakenToken, #scourgeToken { filter: var(--highlight); }
.icon { filter: var(--highlight-min); }
.player-panel .player-name { text-shadow: none; }
#gameplay-options { background-color: #0e0e3f; }
.dijitTooltipContainer [style="color: blue"] { color: #6666ff !important; }
.dijitTooltipContainer [style*="background-color: blue;"] { background-color: #6666ff !important; }
.dijitTooltipContainer [style="color: purple"] { color: #cc00cc !important; }
.dijitTooltipContainer [style*="background-color: purple;"] { background-color: #cc00cc !important; }
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
.ffo-pref-background header, .ffo-pref-background body { background: none; }
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
.icon { filter: var(--highlight-min); }
.object-tooltip .label, .object-tooltip .title { color: #75b9d7; }
`;

_darkStyleForGame['ageofchampagne'] = `
body { background: none; }
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
#drafting_players { background-color: var(--dark-30); }
#drafting_players table { color: var(--light-80); }
.faction_supply, .player_collections { background-color: var(--dark-back); }
`;

_darkStyleForGame['agricola'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
.player-name > svg { filter: invert(0.7); }
#player_boards > div { background-color: #000000CC !important; }
.dijitTooltipContainer .action-header, .dijitTooltipContainer .action-desc { color: #000 !important; }
#logs .meeple-container, #player_boards .meeple-container, .harvest-icon { filter: var(--drop-shadow); }
.player-card .player-card-resizable .player-card-inner { color: #000; }
.player-board-wrapper .player-board-holder .player-board-name { background-color: var(--dark-back); }
.log.cancel .roundedbox { background-color: var(--dark-40) !important; }
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
`;

_darkStyleForGame['akeruption'] = `
#txtHand { color: #fff; }
`;

_darkStyleForGame['aknile'] = `
#playArea, #txtHand, #txtStorage { color: var(--light-80); }
`;

_darkStyleForGame['akropolis'] = `
.player-table .name-wrapper, #market #remaining-stacks { background: var(--dark-back); }
`;

_darkStyleForGame['alhambra'] = `
.alhambra-wrapper h3:before, #popin_moneyDialog:before { background: var(--dark-20); }
.alhambra-stat.stat-1 { color: #4d4dff; }
#popin_moneyDialog { color: #fff; }
.player-name[style="color: #000000"], .alhambra-block[style="color:#000000"] { text-shadow: var(--text-w-shadow); }
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
.tooltip-arrow { border-bottom: 10px solid var(--light-50); }
.tooltip-arrow:before { border-bottom: 10px solid var(--dark-20); }
.altered-tooltip .card-tooltip-frame { background: var(--dark-20); border: 1px solid var(--light-50); }
[data-popper-placement=top] .tooltip-arrow { border-top: 10px solid var(--light-50); }
[data-popper-placement=top] .tooltip-arrow:before { border-top: 10px solid var(--dark-20); }
[data-popper-placement=right] .tooltip-arrow { border-right: 10px solid var(--light-50); }
[data-popper-placement=right] .tooltip-arrow:before { border-right: 10px solid var(--dark-20); }
[data-popper-placement=left] .tooltip-arrow { border-left: 10px solid var(--light-50); }
[data-popper-placement=left] .tooltip-arrow:before { border-left: 10px solid var(--dark-20); }
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
`;

_darkStyleForGame['amyitis'] = `
#page-content { color: var(--light-80); }
`;

_darkStyleForGame['anachrony'] = `
.playeroverall { background: var(--dark-back); color: #fff; }
.anaicon { filter: var(--highlight-min) !important; }
`;

_darkStyleForGame['ancientknowledge'] = `
#popin_bgaHelpDialog { background: var(--dark-10); }
#help-popin .help-icon-line { background: hsla(0,0%,93%,0.1); }
.bga-help_button, .bga-help_unfolded-content { filter: invert(1); box-shadow: 3px 5px 5px 0 #fff; }
.icon-technology-writing:before { color: #b7827b; }
.player-table { background: var(--dark-back); }
#table-center .fold-button .fold-button-arrow { background: var(--dark-10); border-radius: 24px; }
.bga-cards_deck-counter.round { background: var(--dark-10); color: var(--light-80); }
.player-table .timeline .slot { background: hsla(0,0%,100%,.1); }
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['auntiemildred'] = `
.pb_icon { filter: invert(0.9); }
`;

_darkStyleForGame['apocalypseazcc'] = `
.bgae_panel .bgae_content .panel { background-color: var(--dark-back); opacity: 1; }
.counter_prefix, .counter_value, .counter_suffix { color: var(--light-80) !important; }
`;

_darkStyleForGame['applejack'] = `
#zoomplus, #zoomminus { color: var(--light-80); }
.aj_sprite { filter: var(--drop-shadow); }
.aj_playerBlock > div > h3 { background-color: var(--dark-20) !important; }
body { background: none; }
`;

_darkStyleForGame['architectsofthewestkingdom'] = `
.playeroveroverall { background-color: var(--dark-back); }
#logs .arcicon, #player_boards .arcicon { filter: var(--highlight-min); }
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

_darkStyleForGame['artthief'] = `
.card.log_card { filter: var(--highlight-min); }
`;

_darkStyleForGame['arknova'] = `
#overall-content:before { content: ""; background: #000000B0; position: absolute; width: 100%; height: 100%; }
.player-name > svg { filter: invert(0.7); }
.ark-log-card-name { color: #fffafb; }
#player_boards .arknova-icon, #logs .arknova-icon, #maintitlebar_content .arknova-icon { filter: var(--drop-shadow); }
.player-info .handCount-holder .scoringHandCount-holder { color: #000; }
.dijitTooltipContainer .arknova-icon { filter: var(--highlight); }
.dijitTooltipContainer .ark-card-bottom, .dijitTooltipContainer .arknova-bonus { color: #000; }
`;

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
`;

_darkStyleForGame['bagofchips'] = `
.player-table, #skin { background: var(--dark-back); color: var(--light-80); }
#bga-zoom-controls { filter: invert(0.7); }
#popin_bgaHelpDialog { background: var(--dark-10); }
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
body { background: none; }
`;

_darkStyleForGame['bang'] = `
.player-character-name, .player-character-powers { color: #000; }
.bang-player .bang-player-container { background-color: var(--dark-back); }
.player-role { filter: var(--highlight); }
.card-copy-color[data-color=C]:before, .card-copy-color[data-color=S]:before { text-shadow: var(--text-w-shadow); }
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
`;

_darkStyleForGame['battleforhill'] = `
body { background: none; }
#zoom_controls * { color: var(--light-80) !important; }
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

_darkStyleForGame['beammeup'] = `
.dijitTooltip .planetTooltip { background-color: transparent; }
`;

_darkStyleForGame['betta'] = `
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
.player_score span[style="color: #000;"] { color: #fff !important; }
#playertable { background: linear-gradient(0deg,#003300,#001a00); }
.card_list_info { background: var(--dark-10); color: #fff; }
`;

_darkStyleForGame['blockarena'] = `
.doubleempty { color: var(--light-80); }
`;

_darkStyleForGame['bloodrage'] = `
.br_board { text-shadow: var(--text-w-shadow); }
.br_board_button { text-shadow: none; filter: invert(1); }
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

_darkStyleForGame['botanik'] = `
body { background: none; }
#zoomplus, #zoomminus { filter: invert(0.9); }
`;

_darkStyleForGame['briscola'] = `
.table_color { background: var(--dark-back); }
.playertablename, .table_cell { color: #fff; }
.playertablename { text-shadow: none!important; }
#game_board { background-color: #004d00; }
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
body { background: none; }
`;

_darkStyleForGame['cacao'] = `
.player_score_value { color: #000; }
#jungle_display { background-color: var(--dark-back); border: 5px solid var(--dark-back); }
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
#bga-zoom-controls { filter: invert(0.7); }
.art-card { background-color: #fff; }
.player-area  .title { color: #000 !important; }
`;

_darkStyleForGame['capereurope'] = `
.tbp-cardSlot { box-shadow: 0 3px 1px #cc6600b3; }
`;

_darkStyleForGame['captainflip'] = `
.cf_title { background-color: var(--dark-back); }
.cf_boardrule, .cf_tooltip { background-color: var(--yellow-10); color: var(--light-80); }
.cf_tooltip_quote { color: var(--light-80); }
.cf_tooltip, .cf_boardrule { border: 3px solid var(--light-50); }
.cf_tooltip_endgame { color: var(--blue-10); }
.dijitTooltipContainer .cf_tooltip_endgame { color: var(--blue-50); }
.bg-firstplayer { filter: var(--drop-shadow); }
`;

_darkStyleForGame['caravan'] = `
.camel, .log .cube { filter: var(--highlight-min); }
`;

_darkStyleForGame['carcassonne'] = `
#player_boards .partisan { filter: var(--highlight-min); }
body { background: none !important; }
`;

_darkStyleForGame['carcassonnehuntersandgatherers'] = `
#player_boards .tribeMember, #player_boards .hut { filter: var(--highlight-min); }
body { background: none !important; }
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
`;

_darkStyleForGame['cartographers'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.jj-ui-hint-box { background-color: var(--dark-10); }
.car-score-track .car-score-track-season .car-score-track-season-cells { background-color: var(--dark-10); }
.car-score-track .car-score-track-season .fa6-hourglass { background-color: var(--dark-20); }
.car-score-track .car-score-track-season .car-score-track-season-cell,
.car-score-track .car-score-track-season .car-score-track-season-cells,
.car-score-track .car-score-track-season .fa6-hourglass { border-color: var(--light-50) !important; }
.car-sheet-coins-track { background-color: var(--orange-10); }
`;

_darkStyleForGame['castlesofcaleira'] = `
#zoom-controls, .coc_scroll_arrow { filter: invert(0.7); }
`;

_darkStyleForGame['castlesofburgundy'] = `
.cob_player_block { color: #000 !important; }
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
#replaylogs .cat_log_token, .log .cat_log_token, .tooltiptext .cat_log_token { filter: var(--drop-shadow); }
#cat_map_bg { background: none; background-color: var(--dark-back); }
.cat_img_knight, .cat_barbarians_ship { filter: invert(0.7); }
.cat_ck_param_line { border-bottom: 1px solid var(--light-80); }
#cat_mapcontrols { background: var(--dark-30); border: none; box-shadow: none; margin: 5px; filter: var(--drop-shadow); }
#cat_mapcontrols > * { filter: invert(0.7); }
#cat_devcards_ck { top: 6vh; }
.cat_cardcounter { background: #000; border: 2px solid #fff; color: #fff; }
.cat_panel_ck_citylevel { color: #000; }
.cat_metropolis { box-shadow: none; filter: var(--drop-shadow); margin-bottom: 5px; }
`;

_darkStyleForGame['catcafe'] = `
.ctc_psb_footprint, .ctc_log_shape { filter: var(--highlight); }
`;

_darkStyleForGame['catinthebox'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['caverna'] = `
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
.caverna_popin:not(#popin_showScores) h2, .cavernaBuilding_popin h2 { background-color: #404347; color: var(--light-80); }
`;

_darkStyleForGame['celestia'] = `
#captain_icon { filter: invert(0.7); }
`;

_darkStyleForGame['century'] = `
html.century_theme.spice #logs .log_replayable .roundedbox { background: #272a2f; }
.logitem.mcard_forlog { background-color: #040404; }
.mcard_forlog:after { border-left: 7px solid #040404; }
.logitem.gcard_forlog { background-color: #040404; color: #e59480; }
`;

_darkStyleForGame['cephalopod'] = `
.icon_placed_dice_000000, .icon_placed_dice_00a400 { filter: var(--drop-shadow); }
`;

_darkStyleForGame['chakra'] = `
.logIcon { filter: var(--drop-shadow) !important; }
`;

_darkStyleForGame['challengers'] = `
.cha-log-holder { background: var(--dark-20); color: var(--light-80); }
.cha-matchup-name-inner { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 8px; }
.cha-name-404040 { text-shadow: var(--text-w-shadow); }
.cha-name-0000dd { fill: #8080ff; color: #8080ff; }
.cha-img-tooltip-wrapper, .cha-match-tooltip-wrapper { background-color: var(--dark-30); }
.cha-tooltip-close-icon, .cha-set-icon { filter: invert(0.7); }
.cha-matchup-num-fans { color: #fff; }
.cha-name-79a394,.cha-name-ff5420, .cha-name-7468a5,.cha-name-404040, .cha-name-68bdf7,
.cha-name-a12b76, .cha-name-0000dd,.cha-name-f951a0 { background-color: transparent; }
`;

_darkStyleForGame['championsofmidgard'] = `
.playercountericon, .stockitem_unselectable, .playercountericonsmall { filter: var(--highlight-min); }
`;

_darkStyleForGame['cheeztricks'] = `
#overall-content[style*=cheeztricks]:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
.open_wrap.whiteblock:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; top:0px; left:0px; border-radius:10px; }
.open_wrap.whiteblock .playername > span { color: var(--light-80) !important; }
.open_wrap > b { display: block; position: relative; }
`;

_darkStyleForGame['chicagoexpress'] = `
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

_darkStyleForGame['citadels'] = `
.cit_toggle-zoom-out, .cit_toggle-zoom-in { background-image:none !important; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; display: inline-block; font: normal normal normal 14px/1 FontAwesome; font-size: inherit; text-rendering: auto; }
.cit_toggle-zoom-in:before { content:"\\f00e"; }
.cit_toggle-zoom-out:before { content:"\\f010"; }
.cit_text-ornament-left, .cit_text-ornament-right { filter: invert(0.7); }
#ebd-body { background: none; }
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
.card:before { position: absolute; width: 100%; height: 100%; border: 10px solid #000; box-sizing: border-box; border-radius: 8px; content: ""; }
`;

_darkStyleForGame['clansofcaledonia'] = `
.auction-bidding-item, .cc_counter { background: var(--dark-20); }
.token24 { filter: var(--highlight-min); }
`;

_darkStyleForGame['cloudcity'] = `
.clc_playertableicon { filter: invert(1); }
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
`;

_darkStyleForGame['codexnaturalis'] = `
#overall-content, body { background: none! important; }
.cn_player-board-first-player-token, .cn_icon { filter: var(--drop-shadow); }
#logs [style="color:blue;"] { color: #6666ff !important;
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
`;

_darkStyleForGame['commanderchess'] = `
#board { color: var(--light-80); }
#board:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
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

_darkStyleForGame['connectfour'] = `
#logs span[style="color:#ff0000; font-weight:bold; background-color:#bbbbbb"], #logs span[style="color:#ffff00; font-weight:bold; background-color:#bbbbbb"] { background-color: transparent !important; }
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
body { background: none; }
`;

_darkStyleForGame['cosmosempires'] = `
body { background: none; }
.coe-custom-background .timestamp { background-color: transparent; }
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
#overall-content[style*="background"]:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['crusadersthywillbedone'] = `
#CRUOptionsToggle { filter: invert(0.7); }
.cru-knightorder-name>div:first-child, .cru-knightorder-description { color: #aaa; }*
#CRUPlayerAreas, .cru-player-area { filter: invert(1); }
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

_darkStyleForGame['darkagent'] = `
.player_board_content [style^="color:black;"] { color: var(--light-80) !important; }
.pbname input { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['daybreak'] = `
.dbk-card-inner { background: var(--dark-20); color: var(--light-80); }
.dbk-card-inner .dbk-icon-arrow, .tooltiptext .dbk-icon-arrow { filter: invert(0.7); }
.dbk-card-mod { background: var(--dark-10); }
.dbk-tab, .dbk-tab:not(.dbk-tab-selected):hover, .dbk-tab.dbk-tab-selected { background-color: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['deus'] = `
.deus_player_display .deus_resource_indicator, .deus_log_resource { filter: var(--highlight-min); }
.deus_repeat_counter_section { background-color: var(--dark-40); }
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

_darkStyleForGame['doglover'] = `
#DOGFoodMode { filter: invert(1); }
#page-content { color: #fff; }
.DOG-watchdog { filter: var(--drop-shadow); }
`;

_darkStyleForGame['dogpark'] = `
#popin_bgaHelpDialog { background: var(--dark-10); }
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['dominoes'] = `
body { background: none !important; }
.map_zoom { filter: invert(1); }
`;

_darkStyleForGame['donuts'] = `
.ring_set { background-color: var(--dark-back); }
#boardback { filter: brightness(0.4); }
`;

_darkStyleForGame['downforce'] = `
.df-car-token-small { filter: var(--drop-shadow); }
`;

_darkStyleForGame['draculahelsing'] = `
.dh_board_title_graf { filter: var(--highlight); }
`;

_darkStyleForGame['draftandwriterecords'] = `
.bx-pill { background-color: var(--dark-40); color: var(--light-80); }
#dwr-area-goal-container-wrap, #dwr-area-pref { background-color: var(--dark-back); }
#dwr-area-pref-background { display: none; }
.bx-counter { background-color: var(--dark-10); border: 1px solid var(--light-50); color: var(--light-80); }
.bx-checkbox-switch i { background-color: var(--light-50); }
.bx-checkbox-switch input:checked+i { background-color: var(--dark-40); }
.bx-checkbox-switch i:before { background-color: var(--dark-10); }
.bx-checkbox-switch i:after { background-color: var(--light-50); }
.custom_popin { background: var(--dark-10); border: 2px solid var(--light-50); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
.dwr-card { border: 1px solid var(--dark-40); }
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

_darkStyleForGame['dungeonpetz'] = `
.side_title { text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000; }
`;

_darkStyleForGame['dungeonroll'] = `
.navigation>li { filter: invert(0.7); }
.navigation>li.selected { background-color: #7dff00; }
.dijitTooltipContainer .novice, .dijitTooltipContainer .master { color: #000; }
`;

_darkStyleForGame['dungeontwister'] = `
.tooltip_title { color: #000; text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['durak'] = `
.attacker_token, .defender_token { filter: var(--highlight-min); }
`;

_darkStyleForGame['earth'] = `
.ea-player-panel-pill { background-color: var(--dark-40); }
.ea-pill-counter { color: #fff; }
.ea-objective-button .ea-pill-counter { color: #fff !important; }
.bx-checkbox-switch, #ea-tableau-slider, #ea-fauna-slider { filter: grayscale(1); }
.ea-player-panel-pill div[class^="ea-icon"]:not([class="ea-icon-card-type-fauna"]) { filter: invert(1); }
#logs div[class^="ea-icon"], .bgabutton_gray div[class^="ea-icon"], #pagemaintitletext div[class^="ea-icon"] { filter: invert(1); }
.ea-mini-card, .ea-main-action-id-color { border: 2px solid var(--light-70); }
.player-name a { background-color: transparent !important; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
.ea-dialog-card-detail-grid .ea-dialog-card-detail-jumper .ea-dialog-card-detail-jump-selected { border-bottom: 1px solid #fff; border-top: 1px solid #fff; }
#ea-area-card-hand .ea-card-bottom, .ea-area-player-tableau .ea-card-bottom { background-color: var(--dark-10); }
.ea-card-bottom i { text-shadow: none; }
#ea-area-card-hand-container { background-color: var(--dark-back); }
.ea-counter { background-color: var(--dark-10); border: 1px solid var(--light-80); color: var(--light-80); }
.ea-objective-button { background-color: var(--dark-10); filter: var(--drop-shadow); }
.ea-dialog-objective-detail-player-name > span, .ea-objective-detail-progress > span { background-color: transparent !important; }
.ea-main-action-id-color-0.ea-main-action-id-color-0,.ea-main-action-id-color-0.ea-main-action-id-color-0:active { background: #44753d; }
.ea-main-action-id-color-0.ea-main-action-id-color-0:hover { background: #4e8646; }
.ea-main-action-id-color-1.ea-main-action-id-color-1,.ea-main-action-id-color-1.ea-main-action-id-color-1:active { background: #e26745; }
.ea-main-action-id-color-1.ea-main-action-id-color-1:hover { background: #e5795b; }
.ea-main-action-id-color-2.ea-main-action-id-color-2,.ea-main-action-id-color-2.ea-main-action-id-color-2:active { background: #87cdba; }
.ea-main-action-id-color-2.ea-main-action-id-color-2:hover { background: #99d5c4; }
.ea-main-action-id-color-3.ea-main-action-id-color-3,.ea-main-action-id-color-3.ea-main-action-id-color-3:active { background: #dcc84f; }
.ea-main-action-id-color-3.ea-main-action-id-color-3:hover { background: #e0cf64; }
`;

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

_darkStyleForGame['elawa'] = `
#bga-zoom-controls { filter: invert(0.7); }
.player-table, .player-table .hand-wrapper { background: var(--dark-back); }
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

_darkStyleForGame['eriantys'] = `
.logs_on_floating_panel .player-board { background-color: #b0d1e9; }
`;

_darkStyleForGame['eriantys'] = `
#cog-icon { fill: var(--light-80); }
#settings-arrow { border-color: transparent transparent transparent var(--light-80); }
#settings-arrow:hover { border-color: transparent transparent transparent var(--light-70); }
.svg-zoom { filter: invert(0.7); }
.inner_player_board span { text-shadow: none; }
.tower { filter: var(--highlight-min); }
#assistant_cards_myhand, #assistant_cards_played { background-color: var(--dark-back); color: var(--light-80); }
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
`;

_darkStyleForGame['evergreen'] = `
.eve_inline-block { color: #000; }
`;

_darkStyleForGame['evolution'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.shadow_smallicon { filter: var(--drop-shadow); }
`;

_darkStyleForGame['explodingkittens'] = `
.ek-player-area .ek-player-badges { background: var(--dark-back); }
.ek-player-area .ek-player-badges .ek-player-badge-player-hand-size .player-hand-card { filter: invert(0.7); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #000; }
#bga-zoom-controls { filter: invert(0.7); }
.board, .token { filter: var(--drop-shadow); }
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
`;

_darkStyleForGame['fairytrails'] = `
body { background: none !important; }
`;

_darkStyleForGame['faraway'] = `
.fa_zone_desc { color: rgba(255,255,255,.5); }
#fa_zone_info { color: #fff; }
`;

_darkStyleForGame['farkle'] = `
#accumulated_score_wrap, #score_meter, #score_chart { background-color: var(--dark-back); color: var(--light-80); }
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
.ffo-pref-background header, .ffo-pref-background body { background: none; }
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
#overall-content:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
#logs .log.notif_clearEndOfRound .roundedbox,#logs .log.notif_startExecutivePhaseStep .roundedbox { background: var(--dark-30); }
`;

_darkStyleForGame['festivibes'] = `
.card-stock .slot { background: var(--dark-back); }
.card-stock.event-slot .slot { background: var(--dark-20); }
.card-stock.event-slot .slot:nth-child(2n) { background: var(--dark-30); }
#settings-controls-container { background: var(--dark-10); }
`;

_darkStyleForGame['fifteendays'] = `
.pb_label { color: var(--light-80); }
`;

_darkStyleForGame['fika'] = `
#fika_show_card_list span { background-color: var(--dark-20); color: var(--light-80); text-shadow: none; }
.fika_slot:empty { background-color: var(--dark-30); }
.fika_greater { color: #fff; }
`;

_darkStyleForGame['fivethreefive'] = `
#overall-content[style*="background"] { background-color: var(--dark-10) !important; background-image: linear-gradient(45deg, var(--dark-10) 0%, var(--dark-40) 84%) !important; }
`;

_darkStyleForGame['flamingpyramids'] = `
.py_fire_mode, .py_curse_mode { filter: var(--highlight); }
#py_fire_mode_txt, #py_curse_mode_txt { color: #fff; }
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

_darkStyleForGame['forbiddenisland'] = `
.side_title_wrapper { background: var(--dark-20); }
.card_icon, .player_symbol, .treasure_figure { filter: var(--drop-shadow); }
[style="color: blue"] { color: #6666ff !important; }
`;

_darkStyleForGame['forestshuffle'] = `
.player_config_row > div:last-child > svg { filter: invert(0.7); }
.deckinfo { background: var(--dark-back); color: var(--light-80); }
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

_darkStyleForGame['fortheking'] = `
#pagesection_gameview { color: var(--light-80); }
#zoom-controls3 { filter: invert(0.7); }
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
#fr-game #fr-player-areas-wrapper #fr-player-areas .fr-player-area { background: var(--dark-back); }
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['fruitpicking'] = `
#market_board { color: #fff; }
.seed, .seed_log { filter: var(--highlight-min); }
`;

_darkStyleForGame['gaia'] = `
.whitebg { background-color: var(--dark-back); background-image: none; }
`;

_darkStyleForGame['gangsta'] = `
#twodecks > div { background: none !important; }
.team { filter: var(--highlight-min); }
.darkmode .current_player .whiteblock, .darkmode .opposing_player .whiteblock { background: var(--dark-back) !important; }
.dijitTooltipConnector { filter: none; }
`;

_darkStyleForGame['gardennation'] = `
.player-board .counters .icon { filter: var(--drop-shadow); }
#zoom-controls { filter: invert(0.7); }
#popin_gardennationHelpDialog { background-color: var(--dark-20); color: #fff; }
#help-popin h1 { color: #fff; }
.tooltip-important { color: #ff3333; }
.card.selected { box-shadow: 0 0 10px 10px #8a4252; }
`;

_darkStyleForGame['geekoutmasters'] = `
.counter { color: #fff; }
.counter_value[style^="color: rgb(0, 0, 0)"] { color: #fff !important; }
`;

_darkStyleForGame['germanwhist'] = `
.playertablename { text-shadow: none; }
[style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['getonboard'] = `
#zoom-controls { filter: invert(0.7); }
.player-table .name { background: #000; height: 36px; left: 60px; top: 97px; width: 137px; }
`;

_darkStyleForGame['getonboardparisrome'] = `
#zoom-controls { filter: invert(0.7); }
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
#overall-content { background-color: var(--dark-back); }
`;

_darkStyleForGame['ginkgopolis'] = `
body { background: none !important; }
#generalSupplyPanel { background: var(--dark-back); }
#increaseZoomButton, #decreaseZoomButton { filter: invert(0.7); }
.zoneWrapper { background: var(--dark-20); }
.vp_panel, .res_panel, .newHandTile_panel { background-color: var(--dark-20); border-color: var(--dark-40); }
.scrollmap_container.scrollmap_btns_right > .scrollmap_btns_divs_wrapper > .scrollmap_btns_flex { background: var(--dark-30); }
.scrollmap_form [ type="submit"] { background-color: var(--dark-0) !important; }
`;

_darkStyleForGame['gizmos'] = `
#logs .gzs_log_token, .dijitTooltipContainer .gzs_tooltip_token { filter: var(--drop-shadow); }
`;

_darkStyleForGame['glassroad'] = `
#board_legend_buildable, #board .tile_wrapper[data-buildable="1"]:before,#board_private_tiles .tile_wrapper[data-buildable="1"]:before, .gr_card_player_played_card:before { background: var(--dark-10); }
.playerboard, #board, .stockitem, .card_container, .tile_container { color: #000; }
#toggle_history_exandable:link { color: var(--light-80) !important; }
.gr_playing_order_item { background-color: var(--dark-back); border: 1px solid var(--light-50); }
.gr_card_current_player { border: 4px solid var(--yellow-10); }
.spectatorMode .spectator_playerboard_hand_zone { border: 1px solid var(--light-50); }
#bga-zoom-controls { filter: invert(0.8); }
.cc_counter { background: var(--dark-40); }
.token.handSize { filter: invert(0.9); }
`;

_darkStyleForGame['glow'] = `
#zoom-controls, .icon.footprint { filter: invert(0.7); }
.player-board #firstPlayerToken { filter: var(--highlight); }
#middle-band { background: #000; color: #fff; }
`;

_styleForGame['gravitysuperstar'] = `
.gsc_replay_token_zoom_5, .gsc_replay_token_zoom_10 { border-radius: 50%; }
`;

_darkStyleForGame['gravitysuperstar'] = `
#gsi_board_star_total { color: var(--light-80); }
.gsc_star_zoom_10 { filter: var(--highlight-min); }
`;

_darkStyleForGame['greatwesterntrail'] = `
#gwt_markets { color: #fff; }
.player-area { background: #00000066; padding: 1em; }
.player-area h2 { text-shadow: none !important; }
.player-board-button-wrapper { top: 0.5em; }
#gwt_boards_area { gap: 0.5em; }
.pref-group { background-color: #000; }
`;

_darkStyleForGame['grumblestone'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.mywhiteblock, .nums { color: var(--light-80); }
.posG { filter: var(--highlight); }
`;

_darkStyleForGame['grund'] = `
.castletile-box p { background: var(--dark-20); }
.player-box .block-title { background: var(--dark-10); }
.whiteblock, .castle { background: var(--dark-back) !important; }
`;

_darkStyleForGame['goblinhood'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#popin_bgaHelpDialog, .player-table h3 { background: var(--dark-20); }
.player-table, .player-table h3 { border-color: var(--light-50); }
#decks #discard:empty { outline: 1px solid var(--light-50); }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px var(--light-50); color: var(--light-80); }
#table-score .players-scores { background-color: var(--dark-20); color: var(--light-80); }
#table-score table tbody tr:nth-child(odd) { background-color: var(--dark-40); }
#table-score .players-scores .score-icon { color: #000; }
#table-score .players-scores .winner { background-color: var(--green-10); }
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

_darkStyleForGame['goldblivion'] = `
html.darkpanel #player_boards .player-board.gb-player-panel-passed { background-color: var(--dark-40) !important; }
#player_boards .player-name a, .gb-area-player-title .player-name { background-color: transparent !important; }
.gb-area-player, .gb-detail-list { background-color: #272a2fa6; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
div.player-name > a, span.player-name { background-color: transparent !important; }
`;

_darkStyleForGame['goldncrash'] = `
.player-info .hand-counter-wrapper svg { filter: invert(1); }
#goldncrash-main-container .goldncrash-player-board .columns-zone .column-holder .column-cards-holder { border: 1px dashed var(--light-80); }
`;

_darkStyleForGame['goldwest'] = `
.gw-miner { filter: var(--drop-shadow); }
`;

_darkStyleForGame['golf'] = `
#overall-content { background: none !important; }
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-20); color: #fff; }
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
`;

_darkStyleForGame['hanamikoji'] = `
div#overall-content:not([style^="back"]) { color: #fff; }
`;

_darkStyleForGame['handandfoot'] = `
.card_type_icon { background-color: #fff; }
`;

_darkStyleForGame['happycity'] = `
.hc_player_board { color: #000; }
`;

_darkStyleForGame['hearts'] = `
.table_color { background-color: var(--dark-20); color: var(--light-70); }
.table_cell [style="color:black"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['heat'] = `
#tables .player-table { background: var(--dark-back); }
#popin_bgaHelpDialog { background: var(--dark-20); }
#bga-zoom-controls { filter: invert(0.7); }
.player-board .icon { filter: var(--drop-shadow); }
html.darkpanel #player_boards .player-board.finished { background-color: var(--dark-40) !important; }
.player-board .order-counter { border: 2px solid var(--light-80); background-color: var(--dark-40); }
.player-board .order-counter.played { background-color: var(--dark-0); }
#help-popin .weather-card { box-shadow: none; }
`;

_darkStyleForGame['heatchampionship'] = `
#tables .player-table { background: var(--dark-back); }
#popin_bgaHelpDialog { background: var(--dark-20); }
#bga-zoom-controls { filter: invert(0.7); }
.player-board .icon { filter: var(--drop-shadow); }
html.darkpanel #player_boards .player-board.finished { background-color: var(--dark-40) !important; }
.player-board .order-counter { border: 2px solid var(--light-80); background-color: var(--dark-40); }
.player-board .order-counter.played { background-color: var(--dark-0); }
#help-popin .weather-card { box-shadow: none; }
#scorepad-image table tr td { text-shadow: none; }
#scorepad-image { color: #000; }
#championship-table #championship-circuits { background: var(--dark-10); color: #fff; }
 `;

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
.player-table { border: 3px solid var(--light-50); }
.player-table-card-wrapper .title { background-color: var(--dark-10); color: #fff; }
.title-faction[data-faction="1"] { color: var(--light-80); }
.title-faction[data-faction="3"] { color: #8080ff; }
.title-faction[data-faction="3"] { color: #ff3333; }
.dijitTooltipContainer strong[style="color: #030303;"] { color: var(--light-80) !important; }
.dijitTooltipContainer i[style^="color:blue;"] { color: var(--blue-50) !important; }
.bga-cards_deck-counter.round { background: var(--dark-10); box-shadow: 0 0 2px 1px #fff; color: var(--light-80); }
.cards-stack[data-empty=true] { background-color: var(--dark-back); }
#logs .card-name.faction-1, #maintitlebar_content .card-name.faction-1, #player_boards .card-name.faction-1,
#score-table .card-name.faction-1, .cardToolTip .card-name.faction-1, .player-table-card-wrapper .card-name.faction-1,
.title-faction .card-name.faction-1, .wg-card-gametext .card-name.faction-1, caption .card-name.faction-1 { text-shadow: var(--text-w-shadow); }
.bgabutton.disabled { background-color: var(--light-50) !important; }
#hiddenleaders-score { background-color: var(--dark-back); color: var(--light-80); box-shadow: 2px 2px 3px 3px var(--dark-10); }
#hiddenleaders-score table tr td { text-shadow: none; }
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
#popin_bgaHelpDialog { background: var(--dark-20); }
#help-popin .help-section { background: var(--dark-40); }
#help-popin h2 { background: #000; }
#help-popin h2 .icon, .bga-zoom-out-icon, .bga-zoom-in-icon { filter: invert(0.7); }
#player_boards span[id^="science-counter-"], #research-positions > div:first-child { text-shadow: var(--text-w-shadow); }
#player_boards .icon, #player_boards .resource-icon, #firstPlayerToken { filter: var(--drop-shadow); }
.player-table { background: var(--dark-back); }
`;

_darkStyleForGame['hund'] = `
.playertablename, .player-name, .player_score_value { text-shadow: none !important; }
`;

_darkStyleForGame['hydroracers'] = `
.hand_icon, .bag_icon { filter: invert(0.7); }
`;

_darkStyleForGame['iceandthesky'] = `
.loaded_font_1, .loaded_font_2 { text-shadow: none; }
`;

_darkStyleForGame['icecoldicehockey'] = `
.hv_indicator { color: #fff; }
#period { color: #ccccff; }
`;

_darkStyleForGame['illustori'] = `
body { background: none; }
.to_translate { color: #fff; }
.history_arrow { filter: invert(1); }
`;

_darkStyleForGame['incangold'] = `
#pagesection_gameview .whiteblock { background: var(--dark-10); }
#decksizetext { color: #fff; }
`;

_darkStyleForGame['innovation'] = `
.card_name { text-shadow: var(--text-w-shadow); }
#main_area .bgabutton { color: #000; }
.hand_container { background-color: transparent; }
.score_container, .achievement_container, #available_achievements_container, #available_special_achievements_container, #decks_and_title { color: #fff; }
.action_text, .echo_effect, .reference_card { color: #000; }
.display_container > div { background-color: var(--dark-back) !important; }
.dijitTooltipContainer .icon_help { width: 16px; height: 16px; }
`;

_darkStyleForGame['insert'] = `
.ring_set { background-color: transparent; }
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
#zoom-controls { filter: invert(0.7); }
.tooltip_card_text { background-color: #232a24; }
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
[style="border-color: rgb(255, 0, 0); box-shadow: rgb(255, 0, 0) 0px 0px 5px, rgb(255, 0, 0) 0px 0px 10px;"]
{ border-color: #ff3333 !important; box-shadow: #ff3333 0px 0px 5px, #ff3333 0px 0px 10px !important; }
[style="border-color: rgb(0, 128, 0); box-shadow: rgb(0, 128, 0) 0px 0px 5px, rgb(0, 128, 0) 0px 0px 10px;"]
{ border-color: #00cc00  !important; box-shadow: #00cc00 0px 0px 5px, #00cc00 0px 0px 10px !important; }
[style="border-color: rgb(0, 0, 255); box-shadow: rgb(0, 0, 255) 0px 0px 5px, rgb(0, 0, 255) 0px 0px 10px;"]
{ border-color: #6666ff !important; box-shadow: #6666ff 0px 0px 5px, #6666ff 0px 0px 10px !important; }
`;

_darkStyleForGame['iwari'] = `
.player-name { text-shadow: none; }
`;

_darkStyleForGame['jekyllvshide'] = `
span[style*="color:#161614"] { color: #868679 !important; }
`;

_darkStyleForGame['jumpdrive'] = `
.jdr-icon, .jdr-resource { filter: var(--highlight-min); }
.dijitTooltipContainer .jdr-card-income, .dijitTooltipContainer .jdr-card-special, .dijitTooltipContainer .jdr-card-vp { color: var(--light-80); }
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

_darkStyleForGame['kahuna'] = `
#round, #card_pool_wrapper { color: #fff; }
`;

_darkStyleForGame['keyflower'] = `
.player-name { text-shadow: none; }
.resource, .worker_mini { filter: var(--highlight-min); }
`;

_darkStyleForGame['khiva'] = `
.kv_board_path_title { background-color: var(--dark-20); padding: 0.2em 0.5em; border-radius: 4px; margin-left: -1em; }
`;

_darkStyleForGame['kingdombuilder'] = `
.player-panel .player-settlements .player-settlements-counter { color: #fff !important; }
`;

_darkStyleForGame['kingdomino'] = `
.player_view, #info { background: var(--dark-back); color: #fff; }
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
#active-expansions-button { background: #737373; }
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
.player-table { background: var(--dark-back); }
.player-crew-cards, #bga-zoom-controls { filter: invert(0.7); }
#popin_bgaHelpDialog { background: var(--dark-20); color: #fff; }
.bga-help_unfolded-content { background: var(--dark-20); }
.color-help-unfolded-content .label, .player-board.spectator-mode { color: #fff; }
.player-table .hand-wrapper { background: var(--dark-20); }
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
`;

_darkStyleForGame['lama'] = `
#deckCount { color: #fff; }
`;

_darkStyleForGame['lancaster'] = `
.board_castle_name { background: var(--dark-20); margin-top: 0.5em; padding: 0.3em 1em !important; border-radius: 8px; width: fit-content; }
`;

_darkStyleForGame['lasvegan'] = `
#overall-content { background: var(--dark-back); }
`;

_darkStyleForGame['legendraiders'] = `
#tiles_stack_counter { color: var(--light-100); }
`;

_darkStyleForGame['lettertycoon'] = `
.lettertycoon_area { background: var(--dark-back); }
.lettertycoon_area .to_translate, .lettertycoon_deck_info { color: #fff !important; }
`;

_darkStyleForGame['lewisclark'] = `
.player-name, .player_board_inner, .player_score { background-color: transparent; }
.resource { filter: var(--drop-shadow); }
.tooltipslide_overlay { background-color: var(--dark-30);  }
`;

_darkStyleForGame['lewisclarksecondedition'] = `
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

_darkStyleForGame['lineae'] = `
[style*="background-color: #ffffffcc;"] { background-color: var(--dark-back) !important; }
[style*="background-color: #edf2faff;"] { background-color: var(--dark-30) !important; color: var(--light-80); }
[style*="border: 2px dashed black;"] { border: 2px dashed var(--light-70) !important; }
[style*="border-left: 2px dashed black;"] { border-left: 2px dashed var(--light-70) !important; }
[style*="border-top: 2px dashed black;"] { border-top: 2px dashed var(--light-70) !important; }
.launched_rocket_div { filter: invert(0.7); }
`;

_darkStyleForGame['lineit'] = `
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

_styleForGame['linx'] = `
.scrollmap_form button { cursor: pointer; }
`;

_darkStyleForGame['linx'] = `
.scrollmap_form [ type="submit"] { background-color: var(--blue-70) !important; }
`;

_darkStyleForGame['liverpoolrummy'] = `
#handNumber { color: #fff !important; }
#redTarget, .prepbox, .prepjoker, .downWhite { color: var(--light-70) !important; }
html.darkpanel .player-board.playerBoardBuyer { background: #381e1e !important; }
html.darkpanel .player-board.playerWentDown { background: #1a3d22 !important; }
`;

_darkStyleForGame['livingforest'] = `
body { background: none; }
.icon_fragment { filter: invert(1); }
.lvf_playerboard_name { background: var(--dark-back); color: #fff; }
`;

_darkStyleForGame['locomomo'] = `
#ebd-body { background-image: inherit; background-size: auto; }
.loc_player-header { background-color: var(--dark-20); }
`;

_darkStyleForGame['logger'] = `
#board:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['lookatthestars'] = `
#cards #shapes .pile-wrapper .pile:empty { border: 1px dashed #ccc; }
#zoom-controls { filter: invert(0.7); }
#popin_lookatthestarsHelpDialog { background: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['looot'] = `
#back_layer:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
#player_boards .player-name a { background-color: transparent !important; }
.score_header { border-bottom: 1px solid var(--dark-40); }
.scrollmap_form [ type="submit"] { background-color: var(--blue-70); }
.scrollmap_container > .scrollmap_btns_flex { background-color: var(--dark-back); }
#scoretable { outline: 0.3em solid var(--dark-40); }
#scoretable .scorecell { background-color: var(--dark-30); border-left: 0.1em solid var(--dark-40); border-top: 0.1em solid var(--dark-40); }
#scoretable .scorecell.score.header.total { background-color: var(--dark-20); }
#scoretable .header, #scoretable .lheader { background-color: var(--dark-10); }
.player_name_holder { background: var(--dark-10) !important; }
.player_vikings_pool_counter { background: var(--dark-10); color: var(--light-80); }
`;

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: #fff !important; }
`;

_darkStyleForGame['lostexplorers'] = `
.lex_nameplate { background-color: var(--dark-20); }
#lex_validated_header_caption, #lex_discard_header_caption { background-color: var(--dark-20); color: var(--light-80); }
#logs [class*="lex_monument_"] { filter: invert(0.7); }
`;

_darkStyleForGame['lostseas'] = `
.ls_reorg { background-color: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-80); }
.ls_board { background-color: var(--dark-back); }
.ls_table { background-color: var(--dark-back) !important; }
`;

_darkStyleForGame['luckynumbers'] = `
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['ludo'] = `
.dice_table, .board_cell.safety_space { background: var(--dark-back); }
.dice_table td { color: var(--light-80); }
`;

_darkStyleForGame['lumen'] = `
#spectatorbox { background-color: var(--dark-20) !important; }
#zoom-wrapper #map-controls button { background-color: var(--light-70) !important; border-color: var(--dark-40); }
#zoom-wrapper #map-controls button.active { background-color: #fff !important; border-color: #4871b6; }
#popin_lumenHelpDialog { background-color: var(--dark-20); color: #fff; }
#help-popin h1 { color: #fff; }
.player-table .name-and-tiles>div, .player-table .name-and-tiles .name-wrapper { background: var(--dark-back); }
#scenario-name, #scenario-synopsis { background: var(--yellow-10); color: var(--light-80); }
#scenario-special-rules, #scenario-objectives { background: var(--dark-back); color: var(--light-80); }
#scenario-name .round { color: var(--light-50); }
.dijitTooltipContents #scenario-objectives, .dijitTooltipContents #scenario-special-rules { background: var(--yellow-10); }
`;

_darkStyleForGame['luxor'] = `
#popin_chooseLayout { background-color: #4b3901; }
#popin_chooseLayout_contents .layout-prompt { background-color: #7e5d01; }
#popin_chooseLayout_contents .layout-prompt:hover { background-color: #c59207; }
`;

_darkStyleForGame['maatatahay'] = `
#logs .sprite { filter: var(--highlight); }
.ma_tile.selected { box-shadow: 0 0 6px 6px var(--light-50); }
`;

_darkStyleForGame['machiavelli'] = `
font[color="blue"] { color: #8080ff !important; }
font[color="#000"] { text-shadow: var(--text-w-shadow); }
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
`;

_darkStyleForGame['marram'] = `
body { background: none; }
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
`;

_darkStyleForGame['mattock'] = `
.coordinate { color: var(--light-80); }
`;

_darkStyleForGame['mechadream'] = `
.mad_layout_selector_inner { background: #000; border: 1px solid #fff; }
.mad_layouticon { background-color: #fff; }
.mad_score_icon { filter: var(--highlight-min); }
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

_darkStyleForGame['metro'] = `
.mtr_hand_info_wrap { background-color: var(--dark-10); }
`;

_darkStyleForGame['metromaniab'] = `
.tunnels_count { color: #000; }
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
#player_board_config { background-color: var(--dark-20) !important; margin-bottom: 0.5em; }
.ma_header_buttons { filter: invert(1); }
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

_darkStyleForGame['minnesotawhist'] = `
#logs strong[style="color:black;"] { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['mindup'] = `
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

_darkStyleForGame['mojo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.mj_mini, .mj_deck_label { background-color: var(--dark-back); border: 1px solid var(--light-50); }
.mj_mini_title, .mj_deck_label { color: var(--light-80) !important; }
`;

_darkStyleForGame['monsterfactory'] = `
body { background: none; }
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

_darkStyleForGame['mow'] = `
#gamezone #playertables { background-color: #2a3d10; }
#gamezone #playertables .playertable { background-color: var(--dark-20); }
#direction-text { color: #fff; }
#direction-play-symbol { filter: invert(1); }
.counters .counter-icon.card, .counters .counter-icon.farmer-card { filter: var(--highlight-min); }
`;

_darkStyleForGame['mrjack'] = `
#character-ability { background: var(--dark-20); color: #fff; border: 1px solid #fff; }
`;

_darkStyleForGame['mrjackpocket'] = `
#goal-info-inner, .available-option-back, .available-option-front, .round, .tale { filter: var(--highlight); }
span[style="color: blue"] { color: #6666ff !important; }
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
.mtc_first-player-marker-content, .mtc_player-panel .mtc_tokens-container .mtc_meeple { filter: var(--drop-shadow); }
`;

_darkStyleForGame['mycity'] = `
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
.cty_campaign { color: #fff; }
.cty_campaign_list_active { background-color: #000; }
.cty_compass { background-color: #00000066; color: var(--light-80); }
.cty_board_player_name_rb { background-color: #2e251a; color: var(--light-80); }
`;

_darkStyleForGame['myshelfie'] = `
#settings-icon { filter: invert(1); }
#board-scale { filter: grayscale(1); }
#first_player_seat { filter: var(--drop-shadow); }
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

_styleForGame['newfrontiers'] = `
html.nft_background_space .logs_on_floating_panel .player-board { background-color: #333333 !important; }
.logs_on_floating_panel #goto_wrap { top: -5px; }
`;

_darkStyleForGame['newton'] = `
#player_boards hr { border: 1px solid var(--dark-40); }
.ntn-top-tooltip-area { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['newyorkzoo'] = `
#generalactions .control-image { filter: invert(1); }
.mini_counter { color: var(--yellow-10); }
`;

_darkStyleForGame['nextstation'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
`;

_darkStyleForGame['nextstationparis'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
`;

_darkStyleForGame['nextstationtokyo'] = `
#ebd-body:before { content: ""; background: var(--dark-back); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px }
.nex_scorepad { color: #000; }
`;

_darkStyleForGame['nicodemus'] = `
#zoom-wrapper #zoom-controls { filter: invert(0.7); }
.cube { filter: var(--drop-shadow); }
#popin_nicodemusHelpDialog { background: var(--dark-20); }
#help-popin h1 { color: #fff; }
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
`;

_darkStyleForGame['ninetynine'] = `
#decrev_player_name, .bgann_dealerindicator { color: #fff !important; }
.bgann_firstplayer { border: 2px dashed var(--light-80); }
.bgann_icon { filter: var(--highlight-min); }
.bgann_trump_black, .bgann_trump_none { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['noah'] = `
#zoom-controls { filter: invert(0.7); }
.table-counter-wrapper, #help-popin h1 { color: #fff; }
#popin_noahHelpDialog { background: #0b2e41; color: #fff; }
`;

_darkStyleForGame['noirkvi'] = `
.shiftArrow { filter: invert(0.7); }
`;

_darkStyleForGame['noneshallpass'] = `
#zoomin, #zoomout { background-color: transparent; box-shadow: none; filter: invert(0.7); }
[style="color: #0000aa;"], [style="color:#0000aa"] { color: #6666aa !important; }
[style="color: #000000;"], [style="color:#000000"] { text-shadow: var(--text-w-shadow) }
`;

_darkStyleForGame['notalone'] = `
.player-board { background: transparent !important; }
.player-board.selectable .player_board_inner { border-color: green !important; }
.player-board.selectable .player_board_inner:hover { border-color: lime !important; }
.placeCard .description, .placeCard h3, .huntCard p.phase, .huntCard p.description span, .huntCard h3 { color: #000; }
.player-name { text-shadow: none; }
`;

_darkStyleForGame['novaluna'] = `
body { background: none; }
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
`;

_styleForGame['numberdrop'] = `
#darkmode-switch { display: none; }
div.preference_choice:has(> div > div > select#preference_control_100) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_100) { display: none; }
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

_darkStyleForGame['ohseven'] = `
.o7-table-card-label { background-color: var(--dark-20); }
`;

_darkStyleForGame['offtherails'] = `
#jewel_bag, .otr_cart_button, .otr_cart_ready { filter: var(--drop-shadow); }
.otr_mission_counter_icon { filter: var(--highlight-min); }
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
.player_board_inner, #player_boards .player-name, .player_score { background-color: transparent; }
.roundedbox { background-color: var(--dark-10) !important; }
.tableau { background-color: var(--dark-back); }
#board_tribes .tribe { filter: var(--drop-shadow); }
`;

_darkStyleForGame['oxono'] = `
.black { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['painttheroses'] = `
#overall-content[style^="background"] { background-image: none !important; background-color: #1f6a6c !important; }
.dijitTooltipContainer [style="color:purple"] { color: #e600e5 !important; }
`;

_darkStyleForGame['palace'] = `
.whiteblockheading { background-color: #000; }
`;

_darkStyleForGame['pandemic'] = `
.player-board-pandemic__title, .player-name { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['papayoo'] = `
#pagesection_gameview .whiteblock { background: none; }
#playertables { background-color: #183422; }
.playertable { background-color: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['parisconnection'] = `
.pk-log-train1 { text-shadow: var(--text-w-shadow); }
.pk-log-train2 { color: #6666ff; }
.pk-log-train5 { color: #ff3333; }
.pk-icon-train { filter: var(--drop-shadow); }
`;

_darkStyleForGame['parks'] = `
.pks-token.pks-token-resource { color: #000; filter: var(--drop-shadow); }
`;

_darkStyleForGame['patchwork'] = `
.bgabutton .control-image { filter: invert(1); }
#miniboard_0000ff .empty_icon { background-color: #039fb0; border-color: #fff; }
#miniboard_ff0000 .empty_icon { background-color: #8d3f25; border-color: #fff; }
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
.pp_deck_counters_container { background-color: var(--dark-10); }
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

_darkStyleForGame['pescadonovo'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['phat'] = `
#targetTitle { color: var(--light-70); }
[style*="color: Blue;"] { color: #6666ff !important; }
`;

_darkStyleForGame['photosynthesis'] = `
.psy_toolbtn, .psy_overlay_button { color: #fff; background: var(--dark-20); box-shadow: none; filter: var(--drop-shadow); }
.psy_suncounter, .psy_token { color: #000; box-shadow: none; }
#psy_turnindicator { color: #fff; }
div[id^="psy_playerboard_"] .psy_playerboard_playername { background: var(--dark-20); text-shadow: none; }
#player_boards [style*="color: #787878;"] { color: #fff !important; }
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
`;

_darkStyleForGame['pinochle'] = `
#pagesection_gameview .whiteblock.playertable.declarer { background: #4d00004d; border: 1px solid var(--dark-back); }
`;

_darkStyleForGame['piratenkapern'] = `
.blue { background-color: #00004d; }
.red { background-color: #660000; color: #fff; }
`;

_darkStyleForGame['pixies'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
#popin_bgaHelpDialog { background: var(--dark-20); }
#help-popin h1 { color: #6aa046; }
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

_darkStyleForGame['pook'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.resizer { background: var(--dark-10); border-top: 1px dashed var(--dark-40); }
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

_styleForGame['praga'] = `
.ressourceImg[style="background-position:-100% -000%;"], .ressourceImg[style="background-position:-600% -000%;"], .ressourceImg[style="background-position:-700% -000%;"] { border-radius: 50%; }
.tileBack { color: #000; text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff; }
`;

_darkStyleForGame['praga'] = `
.ressourceImg, .cube_0, .cube_1, .cube_2, .cube_3 { filter: var(--drop-shadow); }
#turnLabel { color: var(--light-80); }
#zoomplus, #zoomminus { filter: invert(0.7); }
#uiPanelBtn { background-color: var(--dark-10) !important; }
#uiPanel>.uibtn { background-color: #b9b9b9 !important; }
#uiPanel>.uibtn.selected { background-color: var(--blue-70) !important; }
`;

_darkStyleForGame['president'] = `
.icon20, .iconBeggar, .iconCitizen, .iconPresident, .iconPeasant, .iconPrimeMinister { filter: invert(1); }
`;

_darkStyleForGame['puertorico'] = `
#buildings, #plantations { background: var(--dark-back); color: #fff; }
.tiles_label { color: #fff; }
.small_building_placeholder, .big_building_placeholder { background-color: #e6d49c; }
#player_boards .pr_icon_resource, #player_boards .pr_icon { filter: var(--drop-shadow); }
.buildingtt, .plantationtt { background-color: var(--dark-40); }
`;

_darkStyleForGame['pugsinmugs'] = `
.bigcard { box-shadow: 5px 5px 10px 2px #aaa; }
`;

_darkStyleForGame['qawale'] = `
.qaw_miniboard { border: 2px solid #897272; }
`;

_darkStyleForGame['quantum'] = `
#gambits, #commands, #deckWindow { background-color: var(--dark-back); color: var(--light-80); }
#mapName { color: #fff; }
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
`;

_darkStyleForGame['quibbles'] = `
.quibbles #quibbles-ui-row-2 .whiteblock { background-color: #471e48; }
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['quinque'] = `
body { background: none; }
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
`;

_darkStyleForGame['quirkyquarks'] = `
.QQ-Phase, .QQ-Round { color: #ebb073; background-color: transparent; }
`;

_darkStyleForGame['quoridor'] = `
.objective { filter: var(--highlight); }
`;

_darkStyleForGame['raceforthegalaxy'] = `
body { background: none; }
#vp_nbr_remain_img { filter: var(--highlight-min); }
.new_design a:link { color: var(--light-70); }
.player-board, .roundedbox,  .roundedbox .roundedbox_bottomleft, .roundedbox .roundedbox_bottommain, .roundedbox .roundedbox_bottomright,
.roundedbox .roundedbox_main, .roundedbox .roundedbox_topleft, .roundedbox .roundedbox_topmain, .roundedbox .roundedbox_topright { background-color: transparent; }
`;

_darkStyleForGame['railroadink'] = `
#infrastructure { color: #fff; }
#all-players h2 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['railwaysoftheworld'] = `
.mm_money, .mm_income, .mm_bond, .mm_engine, .mm_completed_links, .mm_consecutive_links, .mm_connected_cities, #zoom_plus, #zoom_minus { filter: invert(0.8); }
#cityNameShow, #majorLinesShow, #allOpCardsShow, #rulesShow { background-color: var(--dark-30) !important; }
#hideShowOpCards { padding:0.3em 0em; margin: 0.5em 0em; cursor: pointer; }
.all_cards_wrapper { background: var(--dark-back); color: #fff; }
.all_cards_wrapper > h3 { padding-left: 0.5em; }
.stockitem { color: #000; }
 `;

_darkStyleForGame['rainforest'] = `
 .playerPanel p { color: #fff; }
 .notif_species { filter: var(--highlight-min); }
 .jungleZoneBlock { background-color: #00000033; outline: 2px dashed #ffffff4d; }
 #rainForestContainer .playerSpeciesZone { border: 0.3vw dashed #898989; }
 #mainBoard:before { position: absolute; top:0px; left:0px; width: 100%; height: 100%; border: 1px solid var(--dark-10); box-sizing: border-box; content: ""; }
 `;

_darkStyleForGame['rallymandirt'] = `
 .timestamp { background-color: var(--dark-10); }
 `;

_darkStyleForGame['rallymangt'] = `
.warningCounterIcon { filter: invert(1); }
`;

_darkStyleForGame['rauha'] = `
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

_darkStyleForGame['regicide'] = `
.hand_card_icon.empty { filter: invert(1); }
html.darkpanel #player_boards .player-board.transparent { background-color: #272a2fcc !important; }
html.darkpanel #player_boards .player-board.highlight_panel { background-color: rgba(80,80,80,.6) !important; }
html.darkpanel #player_boards .player-board.unselectable_panel { background-color: rgba(255,0,0,.3) !important; }
html.darkpanel #player_boards .player-board.selected_panel { background-color: #0033004d !important; }
`;

_darkStyleForGame['resarcana'] = `
.res_emptydiscardpile { border: 1px dotted #aaa; }
.res_counterintext { color: #000; }
#res_roundnumber, .res_counterintext { color: var(--light-80); }
`;

_darkStyleForGame['restinpeace'] = `
#overall-content { background-color: var(--dark-back); }
#rip-game-holder-holder #zoom-panel { background-color: var(--dark-20); }
#zoom-in-btn, #zoom-out-btn { filter: invert(0.7); }
`;

_styleForGame['riftforce'] = `
h3 { padding: 0.2em; }
`;

_darkStyleForGame['riftforce'] = `
#backgroundGlobal { color: var(--light-80); }
.board-outline { outline-color: var(--light-50); }
.token-card-hand { filter: invert(0.7); }
.token-card-back { filter: var(--drop-shadow); }
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
.playername_wrapper_ff0000 .playername,.playername_wrapper_ff0000.playername { color: #ff3333!important; }
.playername_wrapper_008000 .playername,.playername_wrapper_008000.playername { color: #00cc00!important; }
.playername_wrapper_0000ff .playername,.playername_wrapper_0000ff.playername { color: #6666ff!important; }
div[style*="border-color: rgb(255, 0, 0)"] { border-color: #ff3333!important; }
div[style*="border-color: rgb(0, 128, 0)"] { border-color: #00cc00!important; }
div[style*="border-color: rgb(0, 0, 255)"] { border-color: #6666ff!important; }
`;

_darkStyleForGame['rivervalleyglassworks'] = `
.hand_selection_panel, .board_selection_panel { background-color: var(--dark-back); }
.board_name_panel, .board_name_panel_lower, .num_gems_panel { background-color: var(--dark-20); }
#bga-zoom-controls { filter: invert(0.7); }
.num_gems_text { color: var(--light-80) !important; }
`;

_darkStyleForGame['rollandbump'] = `
.rnb_cardsnb { color: #ddd; }
.rnb_player { background: var(--dark-back); }
.rnb_mininb { color: #fff; }
.rnb_nocard { border: 2px solid #fff; }
#rnb_rewards { color: #fff; }
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
body { background: none; }
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
.bx-pill { background-color: var(--dark-0); color: var(--light-80); }
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

_darkStyleForGame['sagani'] = `
body { background: none; }
.sag_goto, #sag-buttons { filter: invert(1); }
.sag_map-container { background: var(--dark-back); }
.sag_piece { filter:var(--drop-shadow); }
#zoomminus, #zoomplus, #recenter, #change-layout, #increase-height, #decrease-height { background-color: var(--light-80) !important; }
`;

_darkStyleForGame['sahwari'] = `
.playerCaravanZone { background-color: #3d3229; }
.playerCamelZone:not(:empty) { background-color: #2a0f09; }
.player_board_content .token { filter: var(--drop-shadow); }
`;

_darkStyleForGame['saintpetersburg'] = `
.stp_icon_ruble { filter: invert(1); }
`;

_darkStyleForGame['sakura'] = `
#player_boards .player-name { text-shadow: none !important; }
.placeholder_space { border: thin dashed var(--red-50); color: var(--light-80); }
`;

_darkStyleForGame['samarkand'] = `
.clothbag { filter: var(--drop-shadow); }
`;

_darkStyleForGame['santorini'] = `
.power-ext { color: #000; }
`;

_darkStyleForGame['sapiens'] = `
.player-name { text-shadow: none; }
#startplayer { filter: var(--highlight); }
`;

_darkStyleForGame['schnapsen'] = `
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-back); color: var(--light-80); }
`;

_darkStyleForGame['scriptoria'] = `
#availableLecterns { background-color: var(--dark-back); }
.pupitrePlayerContainer h2 { color: #fff; }
`;

_darkStyleForGame['seasaltpaper'] = `
#discard-pick, .player-table { background: var(--dark-back); }
.player-table .name-wrapper { background: var(--dark-20); }
#popin_seasaltpaperHelpDialog { background: var(--dark-10); color: #fff; }
#help-popin .help-section { background-color: #30919c; }
`;

_darkStyleForGame['seasons'] = `
#player_boards .icon_cristal { filter: invert(0.7); }
#player_boards .invocation_level, #player_boards .hand  { filter: invert(0.7); }
.cardtooltip .energy0, .cardtooltip .icon_active, .cardtooltip .icon_permanent { filter: var(--highlight); }
#settings-controls-container { background-color: var(--dark-20); background: var(--dark-20);}
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
.setup-piece { filter: var(--drop-shadow); }
.setup-tile-number[data-suit="10"], .setup-tile-suit[data-suit="10"] { text-shadow: var(--text-w-shadow); }
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
`;

_darkStyleForGame['seotda'] = `
.player-name { text-shadow: none !important; }
.playertablename { text-shadow: none; }
#community_card_wrap, #round_info_wrap { background-color: var(--dark-20); }
#hand_rank { background-color: var(--dark-back); }
.selected_card { outline: 4px dashed #fff; }
`;

_darkStyleForGame['sheepboombah'] = `
div[id^="playersection_"] > div { background-color: var(--dark-back); padding: 0.2em 1em; border-radius: 8px; box-sizing: border-box; }
`;

_darkStyleForGame['sherlockthirteen'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['shiftingstones'] = `
.doubleempty, .empty, #deck, #disc, #mycard { color: #fff !important; }
.box_wrap { padding: 16px 10px 0 10px; }
`;

_darkStyleForGame['shogi'] = `
.komadai { background-color: var(--dark-back); }
.shg_piece-count { background-color: var(--dark-10); border: 1px solid var(--light-70); color: var(--light-80); }
`;

_darkStyleForGame['siam'] = `
.counter_value { color: var(--light-80) !important; }
`;

_darkStyleForGame['simplicity'] = `
.player-teams .player-team-score .tile-meeple .tile-background { filter: var(--drop-shadow); }
#logs .scity-meeple .tile-background, #pagemaintitletext .scity-meeple .tile-background { filter: var(--highlight-min); }
.player-teams .player-team-score i { color: #fff; }
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
.player-played-card, .player-scored-card, .bga-zoom-out-icon, .bga-zoom-in-icon { filter: invert(0.7); }
.player-helmets { filter: var(--drop-shadow); }
#popin_bgaHelpDialog { background: var(--dark-20); }
.dijitTooltipContainer [style="color: darkred"] { color: #ff3333 !important; }
`;

_darkStyleForGame['skyteam'] = `
#popin_stWelcomeDialogId { background: var(--dark-20); }
#bga-zoom-controls { filter: invert(0.7); }
.st-victory-conditions.st-victory-conditions-row.pending { background: var(--dark-40) !important; }
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
body { background: none; }
#stacks { background-color: var(--dark-back); color: var(--light-80); }
#zoomin, #zoomout { filter: invert(0.7); }
`;

_darkStyleForGame['sobek'] = `
.whiteblock_title { text-shadow: none; background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
.fixed_player_title { height: 32px; }
`;

_darkStyleForGame['solarstorm'] = `
.ss-player-board__action-tokens__number { color: var(--light-80); }
.ss-dice-result-dialog { background: var(--dark-back); }
`;

_darkStyleForGame['solo'] = `
#howto2, #helptext2 { color: var(--light-80); }
`;

_darkStyleForGame['solowhist'] = `
.infotitle, .targetTitle, .handinfo { color: var(--light-70); }
`;

_darkStyleForGame['solstis'] = `
.st_zone { background-color: var(--dark-back); }
.st_header { background: var(--dark-30); margin-bottom: 0.2em; }
#st_layout_change a, #st_layout_change p { color: var(--light-80); }
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
`;

_darkStyleForGame['spellbook'] = `
.playername, .playername.pos0 { background-color: var(--dark-back); }
.anatcard { outline: 2px solid var(--light-50); }
`;

_darkStyleForGame['spiritsoftheforest'] = `
.pb_label { color: var(--dark-80); }
`;

_darkStyleForGame['splendorduel'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
.player-table { background: var(--dark-back); }
.token .card-sides .card-side { filter: var(--drop-shadow-min); }
.player-table .hand-wrapper, .privilege-zone:not(:empty) { background: var(--dark-10); }
#popin_bgaHelpDialog { background: var(--dark-10); }
`;

_darkStyleForGame['splito'] = `
#overall-content { background-image: none; }
#player-area-containers { background-color: var(--dark-back); }
.spl_player-icon { filter: invert(0.6); }
.spl_small-keyhole { filter: invert(0.7); }
`;

_darkStyleForGame['springcleaning'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['spyrium'] = `
#turn_no_wrap { color: var(--light-80); }
.market_cardplace { background-image: none; background-color: var(--dark-back); filter: var(--drop-shadow); display: inline-block; }
.worker { filter: var(--drop-shadow); }
`;

_darkStyleForGame['splashdown'] = `
body { background: none; }
.sd_playerinfo_icon, #resetzoom, #zoomplus, #zoomminus, #zoomfocus { filter: var(--highlight-min); }
#nav_container { background-color: var(--dark-20); color: var(--light-70); }
`;

_darkStyleForGame['splits'] = `
body { background: none !important; }
`;

_darkStyleForGame['spots'] = `
.dijitTooltipContainer .spt-then { filter: invert(1); }
`;

_darkStyleForGame['starfluxx'] = `
#flx-zoom-controls { background-color: var(--dark-20) !important; }
#flx-zoom-out, #flx-zoom-in { filter: invert(0.7); }
#pagesection_gameview .whiteblock { color: #000; }
.flx-table .flx-deck .flx-deck-wrap .flx-toggle, .flx-table .flx-deck .flx-deck-wrap .flx-card-count
{ color: #fff; background: var(--dark-back); }
`;

_darkStyleForGame['starshipmerchants'] = `
.spacewrap { color: var(--light-80); }
`;

_darkStyleForGame['steamrollers'] = `
.vls-scoreImage, .vls-good, .vls-personal_good { filter: var(--drop-shadow); }
.vls-firstPlayerToken { filter: var(--highlight-min); }
`;

_darkStyleForGame['steamworks'] = `
#SW_sort_options { color: var(--light-80); }
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
#sta_adjustZoom,#sta_zoomIn,#sta_zoomOut { filter: invert(0.7) !important; }
#sta_adjustZoom:hover,#sta_zoomIn:hover,#sta_zoomOut:hover { filter: invert(1) drop-shadow(0 0 3px #fff) !important; }
.inactive_area, .workerplace, .zone, #player_boards .sa_icon { filter: var(--drop-shadow); }
`;

_darkStyleForGame['stonks'] = `
#overall-content[style="background: rgb(119, 139, 108);"]:before
{ content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
#stock_board .playertablename { text-shadow: none; }
`;

_darkStyleForGame['strands'] = `
.strands-name-000000, .strands-num-1, .strands-num-2, .strands-num-3, .strands-num-4, .strands-num-5, .strands-num-6 { text-shadow: var(--text-w-shadow); }
.hex-alt-colors .hex-tile[data-hex="6"] { filter: contrast(0); }
`;

_darkStyleForGame['streets'] = `
[style*="color:#ffff00"], [style*="color: #ffff00"], [style*="color:#ffffff"], [style*="color: #ffffff"] { text-shadow:none!important; }
.tbp-ownerToken { filter: var(--highlight-min); }
#tbp-board-outer { background: var(--dark-back); }
`;

_darkStyleForGame['stupormundi'] = `
html.darkpanel #player_boards.player-board.stm_player_passed { background: var(--dark-40) !important; }
.stm_label_0000ff, .stm_label_00cc00, .stm_label_ffa500 { text-shadow: none; }
.stm_panel { background: var(--dark-20); }
#autorotate { filter: invert(1); }
`;

_darkStyleForGame['superfantasybrawl'] = `
.herocard, .actioncard .fluff, .actioncard .power { color: var(--dark-10); }
.showHero { background-color: var(--dark-20); }
`;

_darkStyleForGame['supermegaluckybox'] = `
.smlb_x_icon, .smlb_x_icon .smlb_pb_count { filter: invert(1); }
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
`;

_darkStyleForGame['takaraisland'] = `
.playernameholder { background-color: var(--dark-20); }
#playArea { background-image: none; background-color: var(--dark-back); }
`;

_darkStyleForGame['takenoko'] = `
#takenoko_actionbar { background-color: var(--dark-back); background-image: none; }
#take_zoom_icon { filter: invert(0.7); }
`;

_darkStyleForGame['takenokolor'] = `
.icon.ladybug, #firstPlayerToken { filter: var(--highlight); }
.log .icon.black { filter: invert(1); }
#popin_bgaHelpDialog { background: var(--dark-10); }
.rule-block { background: var(--dark-back); }
.rule-block .rule-title { border-bottom: 3px dotted var(--red-10); color: var(--red-10); }
#rules { color: var(--light-80); }
`;

_darkStyleForGame['talon'] = `
.TALONlogBattle, .TALONlogRound, .TALONlogPlayer { background-color: transparent; }
`;

_darkStyleForGame['tapas'] = `
.tap_log-tile { filter: var(--highlight-min); }
`;

_styleForGame['tapestry'] = `
.logs_on_floating_panel #player_board_config { background-color: rgb(218, 211, 193); }
`;

_darkStyleForGame['tapestry'] = `
#breadcrumbs { color: #fff; background: #1d2023; }
#player_board_config { background-color: #272a2f !important; }
.playerArea { background-color: #2d2d2d80; }
.tooltipcontainer .icon_VP { filter: var(--highlight-min); }
`;

_darkStyleForGame['targi'] = `
h3 > span[style="color:#0000ff; background-color: #;"] { color: #8080ff !important; background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
h3 > span[style="color:#ffffff; background-color: #bbbbbb;"] { background-color: var(--dark-20) !important; padding: 0.5em 1em; border-radius: 8px; }
.tar_ware_board { filter: var(--highlight-min); }
.card_txt { color: #000; }
.tar_meeple, .tar_tribu { filter: var(--drop-shadow); }
`;

_darkStyleForGame['tashkalar'] = `
#warp { filter: invert(1); }
.dimmedbutton div { background-color: #1d2023; }
.pieceschoice, .piecesicon, .piecesdiff, .upgradeddiff { filter: var(--drop-shadow); }
`;

_darkStyleForGame['teatime'] = `
#descriptionrounddiv { background-color: var(--dark-back); color: var(--light-80); }
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
:root { --color-mapping_ff0000: #ff3333; --color-mapping_0000ff: #6666ff; --color-mapping_008000: #00cc00; }
`;

_darkStyleForGame['terramystica'] = `
#player_boards .priest { background-image: none; }
#player_boards .ttpriestincome { color: var(--light-80) !important; }
.faction_selection_item, .player_faction { text-shadow: none; color: #fff; }
#logs .tmlogs_icon div[class^="trans_"] { border-radius: 12px; }
.control_box { background-color: #09092a; }
.priests_collection { filter: var(--highlight-min); }
.structure_marker { filter: none; }
#faction_selection, .faction_supply, .favors_collection { background-color: var(--dark-back); }
#faction_name_alchemists, #faction_name_darklings { color: #5d7689 !important; text-shadow: #222222 1px 0px 1px, #222222 0px -1px 1px, #222222 0px 1px 1px, #222222 -1px 0px 1px !important; }
#faction_name_halflings, #faction_name_cultists { color: #a2602a !important; }
#faction_name_chaosmagicians, #faction_name_giants { color: #c5202e !important; }
`;

_darkStyleForGame['terranova'] = `
#faction_selection, .faction_supply { background-color: var(--dark-back); }
#logs .tmlogs_icon div[class^="trans_"] { border-radius: 12px; }
`;

_darkStyleForGame['texasholdem'] = `
.dark-wood-horizontal-background body, .dark-wood-vertical-background body { background: none; }
.label { color: var(--light-70); }
`;

_darkStyleForGame['thattimeyoukilledme'] = `
#player_boards .tty-pawn-000000, .tty-log-entry.tty-log-move-pawn-000000, .tty-log-entry.tty-log-move-pawn-ffffff { filter: var(--highlight-min); }
.tty-rock-label { color: var(--light-80); }
.player-board { background-color: var(--dark-10); }
`;

_darkStyleForGame['thatslife'] = `
#player_stacks, #own_tiles_container { background-color: var(--dark-back); }
#own_tiles_0 { background-color: var(--dark-20); color: #fff; }
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
#logs span.card-value.#000 { text-shadow: var(--text-w-shadow); }
#logs span.card-value { padding-right: 0.2em; }
#logs span.logicon.#000 { filter: invert(1); }
.player-table .player-table-wrapper .player-table-name { background-color: var(--dark-20); }
.player-table, #discard-container #discard-wrapper, #hand-container, #thecrew-table>div#table-middle>div { background-color: var(--dark-back); }
.player-table.active { background-color: #4f555fbf; }
#thecrew-table>div#table-middle #cards-mat #card-mat-bottom div.mat-card-holder,
#thecrew-table>div#table-middle #cards-mat #card-mat-top div.mat-card-holder { border: 1px dashed #fff; }
#mission-overview #mission-overview-counter-wrapper { background: #22323f; color: var(--light-80); }
`;

_darkStyleForGame['thecrewdeepsea'] = `
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
#mission-overview #mission-overview-counter-wrapper { background: #22323f; color: var(--light-80); }
`;

_darkStyleForGame['thefoxintheforest'] = `
#overall-content:before { content: ""; background: #00000080; position: absolute; width: 100%; height: 100%; }
.playertablename.text_shadow { text-shadow: none; }
#odd_card_list, #trick_score_table { background: var(--dark-back); color: var(--light-80); }
.cardspace, .stockitem { color: #000; }
b[style="color:#5e3f85"] { color: #7b52ad !important; }
`;

_darkStyleForGame['thegreatamericanfoxhunt'] = `
[style^="background-color:#aea296;"] { background-color: #564d43 !important; }
[style^="background-color:#a8b23e;"] { background-color: #595e21 !important; }
[style^="background-color:#c04746;"] { background-color: #5f2121 !important; }
[style^="background-color:#f0de41;"] { background-color: #766b0a !important; }
[style^="background-color:#5663a7;"] { background-color: #2b3254 !important; }
[style^="background-color:#d150d3;"] { background-color: #651966 !important; }
.TGAFH-PlayerHand { filter: invert(1); color: #000000; }
.TGAFH-Turn { background-color: var(--orange-10); }
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
`;

_darkStyleForGame['throughtheagesnewstory'] = `
.firstplayernotice { color: #fff; }
.dijitTooltipContainer .imgtext, .tta_icon { filter: var(--drop-shadow); }
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
`;

_darkStyleForGame['thebuildersantiquity'] = `
#pagesection_gameview .whiteblock { color: #000; }
#universities { background: var(--dark-20); }
`;

_darkStyleForGame['thegnomesofzavandor'] = `
.gnomunculus { filter: invert(0.9); }
.alchemister { filter: var(--drop-shadow); }
.tooltip_card_text { background-color: #232a24; }
.helpertext { color: #000; }
`;

_darkStyleForGame['themotherroad'] = `
.car { filter: var(--drop-shadow); }
`;

_darkStyleForGame['thermopyles'] = `
#overall-content { color: var(--light-80); }
#persian_graveyard { background-color: var(--dark-back); opacity: 1;}
`;

_darkStyleForGame['thewolves'] = `
body { background: none; }
.wolves-status-icon svg path { fill: var(--dark-20); stroke: var(--light-80); }
.wolves-status-icon:after { background: var(--dark-0); box-shadow: 0 0 4px #fff, 0 1px 2px #000; color: var(--light-80);
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
`;

_darkStyleForGame['ticketgagnant'] = `
#moimeme { background-color: var(--dark-back); }
`;

_darkStyleForGame['tickettoride'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['tickettorideeurope'] = `
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['tictacmatch'] = `
.card--empty { box-shadow: inset 0 0 10px #d79781; }
#layout-control-card-size { filter: invert(0.7); }
`;

_darkStyleForGame['tigriseuphrates'] = `
.log .point, .mini_monument_lower { filter: var(--highlight-min); }
.player_leader_wheel, #hand_leaders .mini_leader { filter: var(--drop-shadow); }
`;

_darkStyleForGame['tiki'] = `
.bgae_panel .bgae_content .panel { background-color: var(--dark-back); }
`;

_darkStyleForGame['timemasters'] = `
.options { background-image:none; background-color: var(--dark-back); }
.options a, #spheres { color: #fff; }
`;

_darkStyleForGame['timelinetwist'] = `
body { background: none; }
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
#overall-content:before { content: ""; background: #000000bb; position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['tiwanaku'] = `
#page-content { background-image: none; }
#left-side-wrapper { background-color: transparent; }
.playerPawnsStack { background-color: var(--dark-back); }
.offering_icon { border: 1px solid #fff; border-radius: 20px; }
#externalBoard { margin-top: 1em; }
#failedCropWindow, #offeringWindow, #possibleActionsWindow, #selectCropWindow, #successCropWindow { background: var(--dark-back); color: var(--light-80); }
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
body { background: none; }
`;

_darkStyleForGame['tortugasixteensixtyseven'] = `
#tableEventCardsArea, .tortuga_tooltip_text_container, #myHandArea, #crowsNestVoteCardsContainer
{ background-color: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['trailblazers'] = `
.tb_tabs .tb_player { background-color: #13201b; }
`;

_darkStyleForGame['tranquility'] = `
.tqt_draw_count { filter: invert(1); }
`;

_darkStyleForGame['tranquilitytheascent'] = `
#overall-content { background: none !important; }
`;

_darkStyleForGame['trekkingtheworld'] = `
.riverCard { color: var(--dark-10); }
`;

_darkStyleForGame['triatri'] = `
#page-content { color: var(--light-80); }
.stockitem, .centertabletoken, .playertabletoken { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trickoftherails'] = `
#game_play_area_wrap { color: var(--light-80); }
.totr_railhouse { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trike'] = `
.player_stone_black, .player_stone_white, .text_stone_black, .text_stone_white { filter: var(--drop-shadow); }
`;

_darkStyleForGame['trio'] = `
.handPlayerName {
  background: var(--dark-20); padding: 0.3em 2em; border-radius: 8px; color: #fff;
  margin-top: 10px; width: auto; flex-grow: 0; height: 22px;
}
.playerLabelContainer { justify-content: space-between; }
.playerLabelContainer .bgabutton[style="display: none;"] { display: block !important; visibility: hidden; }
`;

_darkStyleForGame['troggu'] = `
#playertables, #playertables.three_players { background-color: var(--green-10); }
#turn_order, .three_players #turn_order { color: var(--green-30); }
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
#tuc-player-tableaus .tuc_header { background-color: #000 !important; }
.tuc_linenblock { background-color: var(--dark-back); }
.dijitTooltipContainer  .tuc_counter { color: var(--dark-10); }
`;

_darkStyleForGame['tumbleweed'] = `
.coord_label { color: var(--light-80); }
`;

_darkStyleForGame['turingmachine'] = `
#notepad { background: var(--dark-20); color: #fff }
#guessnb { background: var(--dark-20); color: #fff }
.selectable { background-color: #00000055; }
.anatooltip { color: var(--dark-10); }
`;

_darkStyleForGame['turncoats'] = `
text { fill: #fff; }
`;

_darkStyleForGame['twelvechips'] = `
#logs [style="color:#10555f;"] { color: #1e9bae !important; }
`;

_darkStyleForGame['twentyfourseven'] = `
#tf7_player { background-color: var(--dark-back); }
`;

_darkStyleForGame['twinpalms'] = `
.player_board_inner { color: #000; }
#overall-content { background-color: transparent; background-image: none; }
`;

_darkStyleForGame['twotenjack'] = `
.playertablename { text-shadow: none; }
.table_color { background-color: var(--dark-back); }
.table_cell, [style="color:black"] { color: var(--light-80) !important; }
`;

_darkStyleForGame['ultimaterailroads'] = `
.player-name, .player_board_inner, .player_score { background-color: transparent; }
`;

_darkStyleForGame['unconditionalsurrender'] = `
#pagemaintitletext { background: var(--dark-20) !important }
#pagemaintitletext * { background-color: transparent !important; }
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
.vlb_zone_title { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['valeofeternity'] = `
#ve_round { color: var(--light-80); }
.ve_header_phase, .ve_tooltip_cost { color: var(--light-70); }
.ve_zone, .ve_tooltip_title { text-shadow: var(--text-w-shadow); }
.ve_zone_market { background-color: var(--dark-back); }
`;

_darkStyleForGame['vault'] = `
.dieval { border: 1px solid var(--blue-70); }
`;

_darkStyleForGame['vaultdenofthieves'] = `
.doubleempty { color: var(--light-80); }
.dieval { border: 1px solid #9999ff; }
.Diamond { filter: var(--highlight-min); }
`;

_darkStyleForGame['vegetables'] = `
h3[style="color:BLACK"] { color: var(--light-80) !important; }
`;

_darkStyleForGame['vektorace'] = `
body { background: none !important; }
#map_container { background: var(--dark-20); border: 10px solid #000; }
.lapIcon, .standingsIcon { filter: var(--highlight); }
`;

_darkStyleForGame['veletas'] = `
.coord_label.luis { color: var(--light-70); }
`;

_darkStyleForGame['veronatwist'] = `
.container2 { color: var(--light-80); }
`;

_darkStyleForGame['viamagica'] = `
.vmg_portal_icon, .vmg_yellow_icon, .vmg_purple_icon, .vmg_green_icon, .vmg_blue_icon { filter: var(--highlight-min); }
#vmg_portalstockrow, .vmg_playerportalactiverow { background: var(--dark-20); }
.vmg_playerportaldonerow { background: var(--dark-40); }
#vmg_myportalactiverow { background-color: #00191a; }
#vmg_myportaldonerow { background-color: #040415; }
.vmg_card-tooltip-image:before { position: absolute; width: 100%; height: 100%; border: 5px solid #262626; box-sizing: border-box; content: ""; }
`;

_darkStyleForGame['vidrasso'] = `
.vid_table_currentplayer { outline: 2px dashed var(--light-50); }
`;

_darkStyleForGame['villagers'] = `
.vil_tooltip b, .vil_tooltip em { color: #aaa; }
`;

_darkStyleForGame['viticulture'] = `
#player_boards .cc_counter, .playerboard_row_header .cc_counter { color: #000; }
#turn_header { background-color: var(--dark-20); color: #fff; }
#pagesection_gameview #board-row .whiteblock { color: #000; }
#player_boards .player-board { background: var(--dark-20) !important; }
#player_boards .player-board.vit_passed, #player_boards .playerboard_row.vit_passed { background: var(--dark-40) !important; }
.expandabletoggle:active, .expandabletoggle:hover, .expandabletoggle:link, .expandabletoggle:visited { color: #fff!important; }
.player_last_turn { background-color: transparent !important; }
.token.component { filter: var(--drop-shadow); }
#player_boards .cc_counter, .playerboard_row_header .cc_counter { color: #fff; background: var(--dark-20); }
.label_boardLabels, .label_playerBoardLabels, .playerboard .building_slot, .playerBoardLabels { color: #000; }
.dijitTooltipContents .token.small { filter: var(--drop-shadow); }
.card.blueCard .name, .card.yellowCard .name, .card .description { color: #000; }
`;

_darkStyleForGame['volto'] = `
#board .title { color: var(--light-80); }
`;

_darkStyleForGame['vultureculture'] = `
#cards_on_table, #score_table, .other_hand { background-color: var(--dark-20); }
#my_hand { background-color: rgb(255 127 80 / 20%); }
#other_hands { border: 3px solid var(--dark-20); background-color: var(--dark-back); }
.heading {  background-color: transparent; color: #fff; }
`;

_darkStyleForGame['welcometo'] = `
#player_boards .houses-status > svg { filter: invert(1); }
#player_boards .houses-status > div, #player_boards .refusal-status > div { color: #fff; }
#layout-control-ratios-range, #layout-control-scoresheet-zoom-range { filter: invert(0.7); }
#plan-cards-container, #construction-cards-container { background: var(--dark-back); }
`;

_darkStyleForGame['welcometonewlasvegas'] = `
#page-content h3 { color: #fff; }
.modal-content { background-color: var(--dark-20); }
.close:focus,.close:hover { color: #fff; }
`;

_darkStyleForGame['wizard'] = `
.wizLogColor { color: #000; }
`;

_darkStyleForGame['warchest'] = `
#team_board_id { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['wastelandia'] = `
.panel-icon { filter: invert(0.7); }
#player_boards.whiteblock { background-image: none; background-color: var(--dark-40); }
.panel-cell.wastelandia-icon { filter: var(--drop-shadow); }
.wastelandia-icon { filter: invert(1); }
`;

_darkStyleForGame['watergate'] = `
#playerCardsInfo, #bottomHandArea, #topHandArea { color: var(--light-80); }
#handEditor, #handNixon { filter: invert(0.9); }
.card { border: 1px solid var(--light-80); }
`;

_darkStyleForGame['wazabi'] = `
#direction { filter: invert(0.7); }
.cards { color: #000; }
.card_place { background-color: var(--dark-20); }
`;

_styleForGame['wingspan'] = `
#cde-floating-menu-score > .fa-star { background-image: none !important; filter: none !important; left: 0px; }
#cde-floating-menu-score > .fa-star:before { content: "\\f005" !important; }
`;

_darkStyleForGame['wingspan'] = `
.wsp_background_paper body { background: none !important; }
.wsp_background_paper #overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
#spectatorbox { background-color: var(--dark-20) !important; }
.player_board_content, .wsp_playerboard_card_icon { color: #000; }
#feeder_outside, #feeder_outside > div { filter: invert(1); }
.wsp_tooltip_header span[style$="color: #666666"] { color: #ccc !important; }
#goal_current_round, #goal_title, #goal_forecast_option, .wsp_aviarycounter_turnsleft { color: var(--light-80); }
#goal_appendix { color: var(--light-70); }
#goal_forecast_option_checkbox, #birdtray_zoom { filter: invert(1); }
.wsp_playermat_opponent_label, .player_board_inner>.player-name, #player_board_inner_ffa500>.player-name,.wsp_player_ffa500>.wsp_playermat_opponent_label,
#player_board_inner_008000>.player-name,.wsp_player_008000>.wsp_playermat_opponent_label { text-shadow: 1px 0 2px #00000099,0 -1px 2px #00000099,0 1px 2px #00000099,-1px 0 2px #00000099 }
.player_board_content, .wsp_playerboard_card_icon, .player_score_value { color: var(--light-80); }
.fa-star:not(.rating_star) { filter: invert(1); }
`;

_darkStyleForGame['wizardsgrimoire'] = `
.i-mana-x { color: #6666ff; }
.player_small_board .hand-icon-wrapper .hand-icon { filter: invert(1); }
.wg-tooltip-card .wg-tooltip-left .wg-tooltip-header { border-bottom: 2px solid var(--light-70); }
.wg-title, .player-table .wg-health { background-color: var(--dark-20); }
.bga-cards_deck-counter.round { background: var(--dark-30); color: #fff; }
.wg-card-gametext { color: #000; }
.player_small_board .icon-wrapper>div { background: var(--dark-40); }
.player_small_board .icon-wrapper .hand { filter: invert(0.7); }
#wg-phase-selector { border: 2px solid var(--light-70); }
`;

_darkStyleForGame['wonderfulkingdom'] = `
#overall-content:before { content: ""; background: #000000A0; position: absolute; width: 100%; height: 100%; }
.wk_zone_title { color: var(--light-70); }
.wk_stock p, .wk_phase_round { color: var(--light-80); }
.wk_phase_phases .wk_phase_selected { background-color: var(--dark-40); border: 1px solid var(--light-50); color: var(--light-80); }
.wk_threat_tooltip_desc { background-color: var(--dark-back); }
.bg-ressource_7 { filter: invert(1); }
.wk_phase, .wk_zone_color_0 { background-color: var(--dark-back); }
.wk_phase_phases>div { color: var(--light-70); }
`;

_darkStyleForGame['wordtraveler'] = `
html { background-color: var(--dark-40); background-image: none; }
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
`;

_darkStyleForGame['yaniv'] = `
#playertable { background-color: var(--green-10); border: 5px solid var(--yellow-10); }
`;

_darkStyleForGame['yatzy'] = `
.PointLine > th, .PointLine > td { color: #fff; }
.PointLine > td.possibleCells { color: gray; }
`;

_darkStyleForGame['ynarosfallin'] = `
.firstplayer { filter: invert(1); }
#player_boards .crystal, #player_boards .boardblock .character, #player_boards .shadowdice, #player_boards .xp,
.shadowcardinhand, .shadowcard { filter: var(--drop-shadow-min); }
#popin_appendix { background-image: none; }
`;

_darkStyleForGame['yokai'] = `
body { background: none; }
#hints_wrap { color: #fff; }
`;

_darkStyleForGame['yokaiseptet'] = `
#overall-content { background: none !important; }
.playertablename { text-shadow: none; }
.tooltiptext [style="color:#000000;"] { color: #fff !important; }
`;

_darkStyleForGame['yokohama'] = `
#eog_triggers > div:first-child { background-color: var(--dark-20) !important; }
.mngt_button { color-scheme: dark; background-color: var(--dark-20); }
`;

_darkStyleForGame['zefiria'] = `
.doubleempty { color: #fff; }
.blueact { filter: invert(0.7); }
div[id^="plname"]:not(:empty) { background-color: var(--dark-back); border-radius: 8px; }
`;

_darkStyleForGame['zola'] = `
div#board:before { content: ""; background: var(--dark-back); position: absolute; width: 100%; height: 100%; }
`;

_darkStyleForGame['zuuli'] = `
.doubleempty { color: #fff; }
#inside-me > div[style*="background-color: white;"] { background: var(--dark-back) !important; }
.writes.lg { background: var(--dark-back); color: var(--light-80); }
#inside-me > div:first-child, #inside-me .writes.wh { background: var(--dark-20) !important; color: #fff; }
`;

export const darkStyleForGame = _darkStyleForGame;
export const styleForGame = _styleForGame;
