import { getUrl } from "../utils/chrome";

export const gamesWithCustomBackground = [
  'abyss',
  'agricola',
  'azul',
  'beyondthesun',
  'carnegie',
  'chromino',
  'concept',
  'conspiracy',
  'draculahelsing',
  'dobbleconnect',
  'earth',
  'eminentdomain',
  'emdomicrocosm',
  'equinox',
  'gangsta',
  'goldblivion',
  'iwari',
  'jekyllvshide',
  'jumpdrive',
  'kingoftokyo',
  'lielow',
  'mantisfalls',
  'memoir',
  'mrjack',
  'mycity',
  'newfrontiers',
  'notalone',
  'nowboarding',
  'numberdrop',
  'ontour',
  'oriflamme',
  'pandemic',
  'pingimus',
  'quirkyquarks',
  'raceforthegalaxy',
  'santorini',
  'secretmoon',
  'skull',
  'sobektwoplayers',
  'spacebase',
  'spaceempires',
  'spacestationphoenix',
  'splendor',
  'stella',
  'starfluxx',
  'thecrew',
  'talon',
  'trio',
  'wizardsgrimoire'
];

export const gamesWithCustomPanel = [
  'eminentdomain',
  'emdomicrocosm',
  'envelopesofcash',
  'lumen',
  'mantisfalls',
  'notalone',
  'nowboarding',
  'sevenwondersarchitects',
  'spacestationphoenix',
  'tickettoride',
  'viticulture',
  'wingspan'
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
};

export const gamesWithCustomPlayerStyle = {
  almadi: '.playgroundContainer h2',
  butterfly: '.playerHand h3',
  colorflush: ".cfl_name",
  elawa: '.player-table .name-wrapper',
  homesteaders: '#main_container div[id^="player_name_"]',
  lineit: '.player-table .name-wrapper',
  mindup: '.player-table .name-wrapper',
  mue: '.mue_bidtablename',
  skatelegend: '.player-table .name-wrapper',
  tucano: '.tuc_header',
  wizardsgrimoire: '.wg-title',
  zuuli: '.writes.lg'
};

export const gamesWithCustomActions = {
  earth: {
    setDarkMode: (darkMode: boolean) => {
      try {
        const checkbox = document.getElementById("ea-dark-background-checkbox") as any;
        const checkboxContainer = checkbox.parentNode.parentNode as any;
        checkbox.checked = darkMode;
        checkboxContainer.style.display = (darkMode) ? "none" : "flex";
      } catch (error) { }
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

      const hardbackModeChange = (input) => {
        const button = document.getElementById('bga_extension_mode_icon')?.firstChild?.firstChild as any;

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

_darkStyleForGame['afterus'] = `
.icon { filter: var(--highlight-min); }
.object-tooltip .label, .object-tooltip .title { color: #75b9d7; }
`;

_darkStyleForGame['ageofchampagne'] = `
body { background: none; }
#player_boards .AOCsvg { filter: var(--highlight); }
#player_boards .AOCplayer-PP:after { color: #fff; }
.dijitTooltipContainer img:not([src$="ACQUIRING_A_VINEYARD.svg"]) { filter: invert(1); }
`;

_darkStyleForGame['ageofcivilization'] = `
.aoc_icon, .meeple  { filter: var(--highlight-min); }
.actbot, .actmain, .civbot, .civmain, .techtooltip, .civtitle { color: var(--dark-10); }
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['agricola'] = `
.player-name > svg { filter: invert(0.7); }
#player_boards > div { background-color: #000000CC !important; }
.dijitTooltipContainer .action-header, .dijitTooltipContainer .action-desc { color: #000 !important; }
.meeple-container { filter: var(--drop-shadow); }
.player-card .player-card-resizable .player-card-inner { color: #000; }
`;

_darkStyleForGame['akeruption'] = `
#txtHand { color: #fff; }
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

_darkStyleForGame['amerigo'] = `
#generalreserve { background: var(--dark-back); }
#generalreserve h3, .amg_playerreserve h3, .amg_playersupply h3 { font-weight: normal; color: #fff; }
.amg_playersection { background: var(--dark-20); }
.amg_playerreserve, .amg_playersupply { background: var(--dark-40); }
.amg_miniboard_counter { background: var(--dark-40); border-color: var(--dark-40);}
.amg_player_tabs a { background-color: #000; background-image: linear-gradient(180deg,#000,#444); text-shadow: none; color: #fff; }
.amg_player_tabs a:focus,.amg_player_tabs a:focus:after { background: #000; }
.amg_player_tabs a:after { background: #000; background-image: linear-gradient(180deg,#000,#444); }
.amg_player_tabs .amg_current a,.amg_player_tabs .amg_current a:after { background: #000; }
.amg_player_tabs a:hover,.amg_player_tabs a:hover:after { background: #000; }
.amg_playersubsection { background: var(--dark-0); }
.amg_player_order { color: #000; }
.amg_counter_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['anachrony'] = `
.playeroverall { background: var(--dark-back); color: #fff; }
.anaicon { filter: var(--highlight-min) !important; }
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
.player-name > svg { filter: invert(0.7); }
.ark-log-card-name { color: #fffafb; }
#player_boards .arknova-icon, #logs .arknova-icon, #maintitlebar_content .arknova-icon { filter: var(--drop-shadow); }
.dijitTooltipContainer .arknova-icon { filter: var(--highlight); }
.dijitTooltipContainer .ark-card-bottom, .dijitTooltipContainer .arknova-bonus { color: #000; }
`;

_darkStyleForGame['arnak'] = `
.hand-amt { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 8px; color: #fff; top: -40px; }
.hand-amt .player-name { background: transparent; }
.counter-wrap { background-color: var(--dark-30); }
.display-deck, .display-discard { background: #000; border: 3px solid #9e6464; }
.display-deck:hover { background: var(--dark-30); }
.display-deck:active { background: var(--dark-40); }
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
.table-cell { background: var(--dark-40); }
.fleetship { box-shadow: inset 0px 0px 2px 2px #fff; }
`;

_darkStyleForGame['beyondthesun'] = `
#player_boards .bts-icon-vp, #logs .bts-icon-vp, #player_boards .bts-icon-ore, #logs .bts-icon-ore { filter: invert(0.7); }
.bts-faction { text-shadow: var(--text-w-shadow); }
`;

_darkStyleForGame['bigtimesoccer'] = `
.nbr_yellowcards, .nbr_cards { color: var(--light-80); }
`;

_darkStyleForGame['blackjack'] = `
.player_score span[style="color: #000;"] { color: #fff !important; }
#playertable { background: linear-gradient(0deg,#003300,#001a00); }
.card_list_info { background: var(--dark-10); color: #fff; }
`;

_darkStyleForGame['bloodrage'] = `
.br_board { text-shadow: var(--text-w-shadow); }
.br_board_button { text-shadow: none; filter: invert(1); }
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

_darkStyleForGame['castlesofcaleira'] = `
#zoom-controls, .coc_scroll_arrow { filter: invert(0.7); }
`;

_darkStyleForGame['castlesofburgundy'] = `
.cob_player_block { color: #000 !important; }
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
#replaylogs .cat_log_token, .log .cat_log_token, .tooltiptext .cat_log_token { filter: var(--drop-shadow); }
#player_boards .cat_panel_sec_icons .cat_panel_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['catcafe'] = `
.ctc_psb_footprint, .ctc_log_shape { filter: var(--highlight); }
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

_darkStyleForGame['chakra'] = `
.logIcon { filter: var(--drop-shadow) !important; }
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

_darkStyleForGame['cityofthebigshoulders'] = `
.panel-token { filter: var(--highlight-min); }
#main_board, #available_companies, .owned_companies_area { color: var(--dark-10); }
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

_darkStyleForGame['conspiracy'] = `
.token { filter: var(--highlight-min); }
#logs [style="color: #770405"] { color: #ac0609 !important; }
#popin_conspiracyHelpDialog { background: var(--dark-20); color: var(--light-80); }
#help-popin h1 { color: #fff; }
`;

_darkStyleForGame['copenhagen'] = `
body { background: none; }
`;

_darkStyleForGame['coupcitystate'] = `
.playerhead { text-shadow: none; }
#myactions { color: #fff; }
.action { background: var(--dark-20); }
.action:hover, .action.pending, .placemat:hover, .placemat.selected { background: var(--dark-40); }
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

_darkStyleForGame['deus'] = `
.deus_player_display .deus_resource_indicator, .deus_log_resource { filter: var(--highlight-min); }
.deus_repeat_counter_section { background-color: var(--dark-40); }
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

_styleForGame['divideetimpera'] = `
.bgext_avatar svg.dei_hidden { display: block !important; }
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

_darkStyleForGame['downforce'] = `
.df-car-token-small { filter: var(--drop-shadow); }
`;

_darkStyleForGame['draculahelsing'] = `
.dh_board_title_graf { filter: var(--highlight); }
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

_darkStyleForGame['dragonwood'] = `
.sideheadbutton, .display_dice_button { background-color: #000; }
.roll_dice_button[style="background-color: rgb(0, 255, 0);"] { background-color: #006600 !important; }
.roll_dice_button { background-color: #006600; }
.ac_icon, .c_icon { filter: var(--highlight-min); }
.sidehead-tooltip, .summary-tooltip { color: var(--light-80); }
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
.ea-icon-sprout, .ea-icon-soil, .ea-icon-growth, .ea-icon-draw-from-deck, .ea-icon-compost-destroy, .ea-icon-card-type-tree, .ea-icon-card-type-herb,
.ea-icon-card-type-mushroom, .ea-icon-card-type-bush, .ea-icon-card-type-joker, .ea-icon-card-type-terrain, .ea-icon-card-type-event,
.ea-icon-habitat-sunny, .ea-icon-habitat-wet, .ea-icon-habitat-rocky, .ea-icon-habitat-cold { filter: invert(1); }
.ea-mini-card { border: 2px solid var(--light-70); }
.player-name a { background-color: transparent !important; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
.ea-dialog-card-detail-grid .ea-dialog-card-detail-jumper .ea-dialog-card-detail-jump-selected { border-bottom: 1px solid #fff; border-top: 1px solid #fff; }
#ea-area-card-hand .ea-card-bottom, .ea-area-player-tableau .ea-card-bottom { background-color: var(--dark-40); }
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

_darkStyleForGame['eminentdomain'] = `
.card_tooltipcontainer .tooltiptext { background-color: #000; }
`;

_darkStyleForGame['emdomicrocosm'] = `
.card_tooltipcontainer .tooltiptext { background-color: #000; }
`;

_darkStyleForGame['envelopesofcash'] = `
.eoc-diceDish { background-color: var(--dark-back); }
.dijitTooltipContents h4, .standard_popin h4 { var(--light-80); }
.dijitTooltipContents .eoc-icon-end, .dijitTooltipContents .eoc-icon-env, .dijitTooltipContents .eoc-icon-funds,
.dijitTooltipContents .eoc-icon-type1, .dijitTooltipContents .eoc-icon-type2, .dijitTooltipContents .eoc-icon-type3 { filter: none; }
`;

_styleForGame['equinox'] = `
#eqx-board-holder #eqx-grid .eqx-cell.eqx-cell-controller .playername { white-space: nowrap; }
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

_darkStyleForGame['euchre'] = `
.playertable.maker { background: #3f2128bf !important; }
.playertablename { text-shadow: none; }
`;

_darkStyleForGame['evergreen'] = `
.eve_inline-block { color: #000; }
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

_darkStyleForGame['feastforodin'] = `
.ffo-icon-eye { filter: invert(0.7); }
#ffo-modal #ffo-modal-content { background-color: #00000066; }
.ffo-player-board-main .ffo-player-name { background-color: #00000080; }
.ffo-player-name > span:first-child, .ffo-player-name > span:last-child { color: #fff !important; }
.ffo-icon { filter: var(--drop-shadow); }
table.ffo-score-table thead th { background-color: #000; color: #d0d2b4; }
table.ffo-score-table { background-color: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['flamingpyramids'] = `
.py_fire_mode, .py_curse_mode { filter: var(--highlight); }
#py_fire_mode_txt, #py_curse_mode_txt { color: #fff; }
`;

_darkStyleForGame['fleet'] = `
#flt_game_area { color: #fff; }
#playertables h3[style="color:#000000;"], #flt_game_area span[id^="playerbid_"] { color: #fff !important; }
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

_darkStyleForGame['fortytwo'] = `
#card_log_table { background-color: var(--dark-back); color: #fff; }
#pagesection_gameview .whiteblock.playertable.declarer { background: #004d004d; border: 1px solid var(--dark-back); }
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel { filter: invert(1); }
.#000 { text-shadow: var(--text-w-shadow); }
#score_table thead th, #score_table tfoot th, #score_table tfoot td, #score_table tbody tr:nth-of-type(2n)>* { background-color: var(--dark-20) !important; }
.black { text-shadow: var(--text-w-shadow); }
.blue { color: #6666ff !important; }
.red { color: #ff3333 !important; }
`;

_darkStyleForGame['fruitpicking'] = `
#market_board { color: #fff; }
.seed, .seed_log { filter: var(--highlight-min); }
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

_darkStyleForGame['ginkgopolis'] = `
body { background: none !important; }
#generalSupplyPanel { background: var(--dark-back); }
#increaseZoomButton, #decreaseZoomButton { filter: invert(0.7); }
.zoneWrapper { background: var(--dark-20); }
`;

_darkStyleForGame['gizmos'] = `
#logs .gzs_log_token, .dijitTooltipContainer .gzs_tooltip_token { filter: var(--drop-shadow); }
`;

_darkStyleForGame['glow'] = `
#zoom-controls, .icon.footprint { filter: invert(0.7); }
.player-board #firstPlayerToken { filter: var(--highlight); }
#middle-band { background: #000; color: #fff; }
`;

_darkStyleForGame['greatwesterntrail'] = `
#gwt_markets { color: #fff; }
.player-area { background: #00000066; padding: 1em; }
.player-area h2 { text-shadow: none !important; }
.player-board-button-wrapper { top: 0.5em; }
#gwt_boards_area { gap: 0.5em; }
.pref-group { background-color: #000; }
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

_darkStyleForGame['gogoa'] = `
.goa-tooltip-close-area { filter: invert(1); }
.goa-tooltip-active { background-color: var(--dark-back); }
`;

_darkStyleForGame['goldblivion'] = `
html.darkmode .player-board.gb-player-panel-passed { background-color: #404347 !important; }
html.darkmode #player_boards .player-name a, html.darkmode .gb-area-player-title .player-name { background-color: transparent !important; }
html.darkmode .gb-area-player, html.darkmode .gb-detail-list { background-color: #272a2fa6; }
.custom_popin { background: var(--dark-10); color: var(--light-80); }
.custom_popin_closeicon { color: #aaa !important; }
.notouch-device .custom_popin_closeicon:hover { color: #fff !important; }
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

_darkStyleForGame['hadara'] = `
.had_player_p_icon, .had_cards, .had_coins { filter: var(--drop-shadow-min); }
.had_player_p_icon_1, .had_player_p_icon_2, .had_player_p_icon_3, .had_player_p_icon_0 { filter: none; }
.dijitTooltipContainer:has( > div > div.had_colony_tile),
.dijitTooltipContainer:has( > div > div.had_colony_tile) > div,
.dijitTooltipContainer:has( > div > div.had_colony_tile) > div > div
{ background-color: transparent !important; border: none !important; box-shadow: none !important; }
.dijitTooltip:has( > div > div > div.had_colony_tile) > div:first-child { display: none; }
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

_darkStyleForGame['hearts'] = `
.table_color { background-color: var(--dark-20); color: var(--light-70); }
.table_cell [style="color:black"] { text-shadow: var(--text-w-shadow); }
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

_darkStyleForGame['hive'] = `
body { background: none !important; }
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

_darkStyleForGame['isleoftrainsallaboard'] = `
.passengersbag, .coaltype3, .oiltype3, .mypassengers, .mypassengersloaded { filter: drop-shadow(0.1vw 0.1vw 0.1vw #fff) !important; }
.mypassengerslog, .coaltype2, .oiltype2 { filter: var(--highlight-min); }
.board2 { color: #fff; }
#zoom-controls { filter: invert(0.7); }
.tooltip_card_text { background-color: #232a24; }
`;

_darkStyleForGame['itsawonderfulworld'] = `
.avatar_active { filter: none; }
.iww-resources, .player_score { color: #000; }
.iww-tab { background-color: var(--dark-20); color: var(--light-80); }
.iww-tab.iww-tab-selected, .iww-tab:not(.iww-tab-selected):hover { background-color: #000; color: #fff; }
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

_darkStyleForGame['kahuna'] = `
#round, #card_pool_wrapper { color: #fff; }
`;

_darkStyleForGame['keyflower'] = `
.player-name { text-shadow: none; }
.resource, .worker_mini { filter: var(--highlight-min); }
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

_darkStyleForGame['kingoftokyo'] = `
#active-expansions-button { background: #737373; }
`;

_darkStyleForGame['klaverjassen'] = `
.playerTables__roemScoredValue { color: #6666ff; }
.infobutton, .infotitle { color: #999999; }
table.tableScore td, .quickRefNote { color: #b3b3b3; }
`;

_darkStyleForGame['knarr'] = `
.player-table { background: var(--dark-back); }
.player-crew-cards, #bga-zoom-controls { filter: invert(0.7); }
#popin_bgaHelpDialog { background: var(--dark-20); color: #fff; }
.bga-help_unfolded-content { background: var(--dark-20); }
.color-help-unfolded-content .label, .player-board.spectator-mode { color: #fff; }
.player-table .hand-wrapper { background: var(--dark-20); }
`;

_darkStyleForGame['krosmasterarena'] = `
.pageheader { background-color: var(--dark-20); }
.minidieface { filter: invert(1); }
`;

_darkStyleForGame['lagranja'] = `
.playerFarm > div:first-child > span:first-child { background-color: transparent !important; }
.card, .drawDeck { color: #000; }
`;

_darkStyleForGame['lama'] = `
#deckCount { color: #fff; }
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

_darkStyleForGame['libertalia'] = `
.discarded { filter: invert(0.7); }
`;

_darkStyleForGame['lielow'] = `
.lielow-name-with-bg-000000  { text-shadow: var(--text-w-shadow); }
.lielow-name-with-bg-ffffff { background-color: transparent; }
`;

_darkStyleForGame['lineit'] = `
.player-table { background: var(--dark-back) !important; }
.name-wrapper { background: var(--dark-20) !important; }
.player-scored-card, .jackpot-icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['liverpoolrummy'] = `
#handNumber { color: #fff !important; }
#redTarget, .prepbox, .prepjoker, .downWhite { color: var(--light-70) !important; }
html.darkpanel .player-board.playerBoardBuyer { background: #381e1e !important; }
html.darkpanel .player-board.playerWentDown { background: #1a3d22 !important; }
`;

_darkStyleForGame['livingforest'] = `
.icon_fragment { filter: invert(1); }
.lvf_playerboard_name { background: var(--dark-back); color: #fff; }
`;

_darkStyleForGame['locomomo'] = `
#ebd-body { background-image: inherit; background-size: auto; }
.loc_player-header { background-color: var(--dark-20); }
`;

_darkStyleForGame['lookatthestars'] = `
#cards #shapes .pile-wrapper .pile:empty { border: 1px dashed #ccc; }
#zoom-controls { filter: invert(0.7); }
#popin_lookatthestarsHelpDialog { background: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: #fff !important; }
`;

_darkStyleForGame['lostseas'] = `
.ls_reorg { background-color: var(--dark-20); color: var(--light-80); border: 1px solid var(--light-80); }
.ls_board { background-color: var(--dark-back); }
.ls_table { background-color: var(--dark-back) !important; }
`;

_darkStyleForGame['luckynumbers'] = `
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['lumen'] = `
.player-board.spectator-mode * { background: var(--dark-20) !important; }
#spectatorbox { background-color: var(--dark-20) !important; }
#zoom-wrapper #map-controls button { background-color: var(--light-70) !important; border-color: var(--dark-40); }
#zoom-wrapper #map-controls button.active { background-color: #fff !important; border-color: #4871b6; }
#popin_lumenHelpDialog { background-color: var(--dark-20); color: #fff; }
#help-popin h1 { color: #fff; }
`;

_darkStyleForGame['luxor'] = `
#popin_chooseLayout { background-color: #4b3901; }
#popin_chooseLayout_contents .layout-prompt { background-color: #7e5d01; }
#popin_chooseLayout_contents .layout-prompt:hover { background-color: #c59207; }
`;

_darkStyleForGame['machiavelli'] = `
font[color="blue"] { color: #8080ff !important; }
font[color="#000"] { text-shadow: var(--text-w-shadow); }
font[color="red"] { color: #ff3333 !important; }
`;

_darkStyleForGame['madeira'] = `
.money, .pirates { filter: var(--highlight-min); }
`;

_darkStyleForGame['mantisfalls'] = `
a[style*="color: #000000"], h3[style*="color: #000000"]>span, span[style*="color:#000000"] { background-color: transparent; }
#event_header_label > span { background-color: transparent !important; }
`;

_darkStyleForGame['marcopolo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
.mp_playeraid { color: #000; }
.piece { filter: var(--drop-shadow); }
.piece.panel_hourglass { filter: var(--highlight); }
`;

_darkStyleForGame['marcopolotwo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
.mp_playeraid { color: #000; }
.piece { filter: var(--drop-shadow); }
.piece.panel_hourglass { filter: var(--highlight); }
`;

_darkStyleForGame['martiandice'] = `
.turn-order { text-shadow: none; }
`;

_darkStyleForGame['mascarade'] = `
.hbz_tooltiptext { color: var(--light-90); }
`;

_darkStyleForGame['mechadream'] = `
.mad_layout_selector_inner { background: #000; border: 1px solid #fff; }
.mad_layouticon { background-color: #fff; }
.mad_score_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['memoir'] = `
#clipboard-button { filter: invert(0.7); }
.card-text-container, .card-subtitle { color: #000; }
`;

_darkStyleForGame['microdojo'] = `
.doubleempty { color: #fff; }
[style="color: blue;"] { color: #6666ff !important; }
`;

_darkStyleForGame['mindup'] = `
.darkmode .spectator-mode * { background: transparent !important; }
#round-counter-row #round-counter-block { background: var(--dark-20); text-shadow: none; }
.player-table, .player-table .name-wrapper { background-color: var(--dark-20); }
#table-center .slot .player-block { background: var(--dark-20); }
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

_darkStyleForGame['mue'] = `
#mue_gametarget { color: #fff; }
.mue_discard_btn { color: var(--light-70); }
.mue_isinchiefteam { background-color: #141414e6; }
.mue_isinmyteam,.mue_isinviceteam { background-color: #001a00e6; }
.mue_isinotherteam { background-color: #290000e6; }
.mue_infotable { background-color: #330; color: white; }
.mue_infotablename { color: white !important; }
`;

_darkStyleForGame['mycity'] = `
.cty_header_extra { background-color: var(--dark-back); color: #fff; }
.cty_intro_header { filter: invert(1); }
.cty_header_extra h2, .cty_header_extra h3, .cty_header_extra h4 { color: #fff; }
.cty_intro { background-color: #000; color: #e87a9a; }
.cty_intro_rankings { border: 2px solid #e87a9a; }
.cty_intro_button { background-color: #e87a9a; border: 2px solid #e87a9a; }
.cty_intro_button:hover { background-color: #fff; color: #e87a9a; }
.cty_header_warning { background-color: var(--dark-20); color: #fff; }
.cty_extra_button a { color: #fff; }
.cty_extra_button a:hover { color: var(--violet-80); }
`;

_darkStyleForGame['myshelfie'] = `
#settings-icon { filter: invert(1); }
#board-scale { filter: grayscale(1); }
#first_player_seat { filter: var(--drop-shadow); }
`;

_darkStyleForGame['nextstationtokyo'] = `
#ebd-body { background-image: none !important; }
`;

_darkStyleForGame['nicodemus'] = `
#zoom-wrapper #zoom-controls { filter: invert(0.7); }
.cube { filter: var(--drop-shadow); }
#popin_nicodemusHelpDialog { background: var(--dark-20); }
#help-popin h1 { color: #fff; }
`;

_darkStyleForGame['nidavellir'] = `
#turn-counter-holder, #layout-mode { filter: invert(0.7); }
.card-class-ranks, .card-class-score, .rank { filter: invert(1); }
#player-boards > div { background: var(--dark-20); border-radius: 8px; }
.player-board-name { background-color: var(--dark-30) !important; }
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
`;

_darkStyleForGame['novaluna'] = `
.disc { color: #000; }
`;

/* for wiki */
_darkStyleForGame['nowboarding'] = `
.wikicontent [style^="background: #FFF8E1;"] { background: var(--yellow-10) !important; }
.wikicontent [style^="background: #E3F2FD;"] { background: var(--blue-10) !important; }
}
`;

_styleForGame['numberdrop'] = `
#darkmode-switch { display: none; }
div.preference_choice:has(> div > div > select#preference_control_100) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_100) { display: none; }
`;

_darkStyleForGame['obsession'] = `
#zoomIn, #zoomOut { filter: invert(1); }
#pagesection_gameview { color: #fff; }
#pagesection_gameview .playerName { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 0.5em; }
#themeCardReveal { background-color: var(--dark-20); }
[id^="playerDiscardContainer-"] { filter: none !important;  background-color: var(--dark-back) !important; }
`;

_styleForGame['ohseven'] = `
.o7-table-card-label { background-color: var(--dark-20); }
`;

_styleForGame['offtherails'] = `
#jewel_bag, .otr_cart_button, .otr_cart_ready { filter: var(--drop-shadow); }
.otr_mission_counter_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['ohhell'] = `
#table .table_player_name { background-color: var(--dark-20); }
.card_type_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['openfacechinesepoker'] = `
.name_shadow { text-shadow: none; }
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

_darkStyleForGame['parks'] = `
.pks-token.pks-token-resource { color: #000; filter: var(--drop-shadow); }
`;

_darkStyleForGame['patchwork'] = `
#player_boards .micon { filter: invert(1); }
`;

_darkStyleForGame['perfectwords'] = `
.note-line { color: #000; }
#o-aftertable { color: var(--light-80); }
#o-dbnogrid { background-color: var(--dark-back); color: #fff; }
.dbnogrid-cell-button:hover { background-color: #00000066; }
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

_darkStyleForGame['potionexplosion'] = `
.area_label, .player-name { text-shadow: none; }
.marble_pool { border: 1px dashed #fff; }
.potion, .stockitem { filter: var(--drop-shadow); }
.reward_icon, .help_icon, .starter_token { filter: var(--highlight-min); }
.potion_tooltip, .potion_tooltip_small { background-color: var(--dark-30); }
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

_darkStyleForGame['quirkyquarks'] = `
.QQ-Phase, .QQ-Round { color: #ebb073; background-color: transparent; }
`;

_darkStyleForGame['quoridor'] = `
.objective { filter: var(--highlight); }
`;

_darkStyleForGame['raceforthegalaxy'] = `
#vp_nbr_remain_img { filter: var(--highlight-min); }
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

_darkStyleForGame['regicide'] = `
.hand_card_icon.empty { filter: invert(1); }
.player-board.transparent { background-color: #272a2fcc !important; }
.player-board.highlight_panel { background-color: rgba(80,80,80,.6) !important; }
.player-board.unselectable_panel { background-color: rgba(255,0,0,.3) !important; }
.player-board.selected_panel { background-color: #0033004d !important; }
`;

_darkStyleForGame['resarcana'] = `
.res_emptydiscardpile { border: 1px dotted #aaa; }
.res_counterintext { color: #000; }
`;

_darkStyleForGame['riftvalleyreserve'] = `
.riftvalleyreserve-name-272c29 { text-shadow: var(--text-w-shadow); }
.rvr-icon-element[data-color="272c29"][data-type=stop] { background-color: #fff; border-radius: 18px; }
.rvr-icon-backpack, .rvr-tent-display { filter: var(--highlight-min); }
`;

_darkStyleForGame['rollandbump'] = `
.rnb_cardsnb { color: #ddd; }
.rnb_player { background: var(--dark-back); }
.rnb_mininb { color: #fff; }
.rnb_nocard { border: 2px solid #fff; }
#rnb_rewards { color: #fff; }
.rnb_boardcard, .rnb_logcard { filter: var(--highlight); }
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

_darkStyleForGame['russianrailroads'] = `
.player-name, .player_score { background-color: var(--dark-20); }
.nameslot { width: auto; }
.nameslot > h3 { background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
.meepleable, .industrymarker, .lock, .rail, .advantage, .ruble { filter: var(--highlight); }
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

_darkStyleForGame['santorini'] = `
.power-ext { color: #000; }
`;

_darkStyleForGame['sapiens'] = `
.player-name { text-shadow: none; }
#startplayer { filter: var(--highlight); }
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

_darkStyleForGame['setup'] = `
.setup-piece { filter: var(--drop-shadow); }
.setup-tile-number[data-suit="10"], .setup-tile-suit[data-suit="10"] { text-shadow: var(--text-w-shadow); }
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
.player-board { background: var(--dark-30) !important; }
.player-board.stw_activepl { background: var(--dark-40) !important; }
#centralaround.stw_emptypile { background: #80808099; }
.stw_log_icon { filter: var(--drop-shadow); }
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

_darkStyleForGame['shiftingstones'] = `
.doubleempty, .empty, #deck, #disc, #mycard { color: #fff !important; }
.box_wrap { padding: 16px 10px 0 10px; }
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
.player-board { background: linear-gradient(rgba(245,230,255,0.2),rgba(247,235,255,0.25),rgba(250,240,255,.3)); }
`;

_darkStyleForGame['spades'] = `
.card-name-color--1, .card-name-color--3 { text-shadow: var(--text-w-shadow); }
.bags_icon { filter: var(--drop-shadow); }
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

_darkStyleForGame['strands'] = `
.strands-name-000000, .strands-num-1, .strands-num-2, .strands-num-3, .strands-num-4, .strands-num-5, .strands-num-6 { text-shadow: var(--text-w-shadow); }
.hex-alt-colors .hex-tile[data-hex="6"] { filter: contrast(0); }
`;

_darkStyleForGame['streets'] = `
[style*="color:#ffff00"], [style*="color: #ffff00"], [style*="color:#ffffff"], [style*="color: #ffffff"] { text-shadow:none!important; }
.tbp-ownerToken { filter: var(--highlight-min); }
#tbp-board-outer { background: var(--dark-back); }
`;

_darkStyleForGame['superfantasybrawl'] = `
.herocard, .actioncard .fluff, .actioncard .power { color: var(--dark-10); }
.showHero { background-color: var(--dark-20); }
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

_darkStyleForGame['talon'] = `
.TALONlogBattle, .TALONlogRound, .TALONlogPlayer { background-color: transparent; }
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

_darkStyleForGame['teotihuacan'] = `
.cc_counter { background-color: #ffffff33; }
.token24 { filter: var(--drop-shadow); }
.enableButton { border: 1px solid var(--light-70); }
`;

_darkStyleForGame['terramystica'] = `
.tmlogs_icon div, .tm_panel_icon, .tm_panel_icon2 { filter: var(--highlight-min); }
.priests_collection { filter: var(--highlight); }
#player_boards .priest { background-image: none; }
.faction_selection_item, .player_faction { text-shadow: none; color: #fff; }
`;

_darkStyleForGame['thattimeyoukilledme'] = `
.tty-pawn-000000 { filter: var(--highlight-min); }
`;

_darkStyleForGame['thatslife'] = `
#player_stacks, #own_tiles_container { background-color: var(--dark-back); }
#own_tiles_0 { background-color: var(--dark-20); color: #fff; }
`;

_darkStyleForGame['theboss'] = `
.stockitem { filter: var(--highlight-min); }
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

_darkStyleForGame['theisleofcats'] = `
.tioc-player-panel-draft, .tioc-meeple{ filter: var(--drop-shadow); }
`;

_darkStyleForGame['thenumber'] = `
.tn-miniboard-digit { background: var(--dark-40); }
.tn-miniboard-digit-closed { background: #000; color: #000; }
`;

_darkStyleForGame['thirteenclues'] = `
#tcGameLogTable th { color: #05f; }
.tableWindow td { color: #8585ad; }
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

_darkStyleForGame['thirtyone'] = `
.closer { background-color: var(--dark-40) !important; }
.name_shadow { text-shadow: none; }
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

_darkStyleForGame['tictacmatch'] = `
.card--empty { box-shadow: inset 0 0 10px #d79781; }
#layout-control-card-size { filter: invert(0.7); }
`;

_darkStyleForGame['tigriseuphrates'] = `
.log .point, .mini_monument_lower { filter: var(--highlight-min); }
.player_leader_wheel, #hand_leaders .mini_leader { filter: var(--drop-shadow); }
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
#settings, #TED_zoom_plus, #TED_zoom_minus, .TED-inline-icon { filter: invert(1); }
span[style^="color: #444444;"] { color: #aaaaaa !important; }
.TED#bgaimagebutton_submenu_wrap { background-color: var(--dark-10); }
.bgaimagebutton-submenu-icon .sprite-icon-symbol-Move, .bgaimagebutton-submenu-icon .sprite-icon-symbol-Secure,
#board .sprite-icon-symbol-Moven .dijitTooltipContainer .tooltip-ability-icon  { filter: invert(0.7); }
#board .sprite-icon-symbol-Move:hoVer { filter: invert(1); }
`;

_darkStyleForGame['tiwanaku'] = `
#page-content { background-image: none; }
#left-side-wrapper { background-color: transparent; }
.playerPawnsStack { background-color: var(--dark-back); }
.offering_icon { border: 1px solid #fff; border-radius: 20px; }
#externalBoard { margin-top: 1em; }
#failedCropWindow, #offeringWindow, #possibleActionsWindow, #selectCropWindow, #successCropWindow {
  background: var(--dark-back); color: var(--light-80);
}
`;

_darkStyleForGame['tobago'] = `
#player_hand { color: #fff; }
`;

_darkStyleForGame['toc'] = `
#icon_first_player, #checkmark { filter: invert(1); }
.field { border-color: #c9ab69; }
`;

_darkStyleForGame['tokaido'] = `
body { background: none; }
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

_darkStyleForGame['trio'] = `
.handPlayerName {
  background: var(--dark-20); padding: 0.3em 2em; border-radius: 8px; color: #fff;
  margin-top: 10px; width: auto; flex-grow: 0; height: 22px;
}
.playerLabelContainer { justify-content: space-between; }
.playerLabelContainer .bgabutton[style="display: none;"] { display: block !important; visibility: hidden; }
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

_darkStyleForGame['ultimaterailroads'] = `
.player-name, .player_board_inner, .player_score { background-color: transparent; }
`;

_darkStyleForGame['uptown'] = `
.uptown_player_name {color: #000; }
`;

_darkStyleForGame['vaalbara'] = `
.vlb_zone_title { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['vault'] = `
.dieval { border: 1px solid var(--blue-70); }
`;

_darkStyleForGame['vektorace'] = `
body { background: none !important; }
#map_container { background: var(--dark-20); border: 10px solid #000; }
.lapIcon, .standingsIcon { filter: var(--highlight); }
`;

_darkStyleForGame['viamagica'] = `
.vmg_portal_icon, .vmg_yellow_icon, .vmg_purple_icon, .vmg_green_icon, .vmg_blue_icon { filter: var(--highlight-min); }
#vmg_portalstockrow, .vmg_playerportalactiverow { background: var(--dark-20); }
.vmg_playerportaldonerow { background: var(--dark-40); }
#vmg_myportalactiverow { background-color: #00191a; }
#vmg_myportaldonerow { background-color: #040415; }
.vmg_card-tooltip-image:before { position: absolute; width: 100%; height: 100%; border: 5px solid #262626; box-sizing: border-box; content: ""; }
`;

_darkStyleForGame['villagers'] = `
.vil_tooltip b, .vil_tooltip em { color: #aaa; }
`;

_darkStyleForGame['viticulture'] = `
#player_boards .cc_counter, .playerboard_row_header .cc_counter { color: #000; }
#turn_header { background-color: var(--dark-20); color: #fff; }
#pagesection_gameview #board-row .whiteblock { color: #000; }
.player-board { background: var(--dark-20) !important; }
.player-board.vit_passed,.playerboard_row.vit_passed { background: var(--dark-40) !important; }
.expandabletoggle:active, .expandabletoggle:hover, .expandabletoggle:link, .expandabletoggle:visited { color: #fff!important; }
.player_last_turn { background-color: transparent !important; }
.token.component { filter: var(--drop-shadow); }
#player_boards .cc_counter, .playerboard_row_header .cc_counter { color: #fff; background: var(--dark-20); }
.label_boardLabels, .label_playerBoardLabels, .playerboard .building_slot, .playerBoardLabels { color: #000; }
.dijitTooltipContents .token.small { filter: var(--drop-shadow); }
.card.blueCard .name, .card.yellowCard .name, .card .description { color: #000; }
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

_darkStyleForGame['wingspan'] = `
#spectatorbox { background-color: var(--dark-20) !important; }
.player_board_content, .wsp_playerboard_card_icon { color: #000; }
#feeder_outside, #feeder_outside > div { filter: invert(1); }
.wsp_tooltip_header span[style$="color: #666666"] { color: #ccc !important; }
`;

_darkStyleForGame['wizardsgrimoire'] = `
.i-mana-x { color: #6666ff; }
.player_small_board .hand-icon-wrapper .hand-icon { filter: invert(1); }
.wg-tooltip-card .wg-tooltip-left .wg-tooltip-header { border-bottom: 2px solid var(--light-70); }
.wg-title, .player-table .wg-health { background-color: var(--dark-20); }
.bga-cards_deck-counter.round { background: var(--dark-30); color: #fff; }
.wg-card-gametext { color: #000; }
`;

_darkStyleForGame['xiangqi'] = `
#top_files, #left_ranks { color: var(--light-80); }
#right_ranks, #bottom_ranks { color: var(--red-50); }
`;

_darkStyleForGame['yatzy'] = `
.PointLine > th, .PointLine > td { color: #fff; }
.PointLine > td.possibleCells { color: gray; }
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
div[id^="plname"]:not(:empty) { background-color: var(--dark-back); }
`;

_darkStyleForGame['zuuli'] = `
.doubleempty { color: #fff; }
#inside-me > div[style*="background-color: white;"] { background: var(--dark-back) !important; }
.writes.lg { background: var(--dark-back); color: var(--light-80); }
#inside-me > div:first-child, #inside-me .writes.wh { background: var(--dark-20) !important; color: #fff; }
`;

export const darkStyleForGame = _darkStyleForGame;
export const styleForGame = _styleForGame;