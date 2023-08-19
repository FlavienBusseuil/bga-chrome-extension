import { getUrl } from "../utils/chrome";

export const gamesWithCustomBackground = [
  'abyss',
  'agricola',
  'beyondthesun',
  'chromino',
  'conspiracy',
  'earth',
  'kingoftokyo',
  'memoir',
  'pandemic',
  'raceforthegalaxy',
  'skull',
  'spacebase',
  'splendor',
  'stella'
];

const _darkStyleForGame = {};

_darkStyleForGame['agricola'] = `
#player_boards > div { background-color: #000000CC !important; }
`;

_darkStyleForGame['anachrony'] = `
.pname { background: var(--dark-20); padding: 0.3em 1em; border-radius: 8px; margin-bottom: -0.1em; }
`;

_darkStyleForGame['applejack'] = `
#zoomplus, #zoomminus { color: white; }
`;

_darkStyleForGame['arknova'] = `
.player-name > svg, .slider, #help-mode-switch { filter: invert(0.7); }
`;

_darkStyleForGame['arnak'] = `
.hand-amt { background: hsla(0,0%,100%,.5); }
.hand-amt .player-name { background: transparent; }
`;

_darkStyleForGame['bandido'] = `
.cp_board_hand, #resize { filter: invert(1); }
`;

_darkStyleForGame['barenpark'] = `
.bp-player-area-title > h3 { background: var(--dark-20); padding: 0.3em 1em; border-radius: 8px; }
`;

_darkStyleForGame['beyondthesun'] = `
#player_boards .bts-icon, #logs .bts-icon { filter: invert(0.7); }
.bts-faction { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['bloodrage'] = `
.br_board { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.br_board_button { text-shadow: none; filter: invert(1); }
`;

_darkStyleForGame['cantstop'] = `
.diceactions, .dicechoice_plus { color: white; }
`;

_darkStyleForGame['cantstopexpress'] = `
h5 { color: white; }
.pad { filter: invert(0.8) grayscale(1); }
.containermepad > h1 { background: var(--dark-20); margin-top: 0.5em; padding: 0.3em 1em !important; border-radius: 8px; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['carcassonne'] = `
.partisan_000000 { filter: invert(0.2) !important; }
`;

_darkStyleForGame['carnegie'] = `
 .cng_firstplayer, .cng_playerboard_counter { filter: invert(1); }
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
`;

_darkStyleForGame['caverna'] = `
#central-board .turn-action-container .turn-number, #help-mode-switch > label, #show-expedition { filter: invert(1); }
#player_config #round-counter-wrapper { background-color: black; }
`;

_darkStyleForGame['century'] = `
html.century_theme.spice #logs .log_replayable .roundedbox { background: #272a2f; }
.logitem.mcard_forlog { background-color: #040404; }
.mcard_forlog:after { border-left: 7px solid #040404; }
.logitem.gcard_forlog { background-color: #040404; color: #e59480; }
`;

_darkStyleForGame['challengers'] = `
.cha-log-holder { background: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['chromino'] = `
#btn_user_prefs { filter: invert(1); }
.block-user-pref-radio label { background-color: #111; }
#map_container { background-image: url(${getUrl('img/dark_theme/background.jpg')}); }
`;

_darkStyleForGame['clansofcaledonia'] = `
.auction-bidding-item, .cc_counter { background: var(--dark-20); }
.playerboard_row > h3 > span:first-child { background: var(--dark-20); padding: 0.3em 1em; border-radius: 8px; }
`;

_darkStyleForGame['connectfour'] = `
#logs span[style="color:#ff0000; font-weight:bold; background-color:#bbbbbb"], #logs span[style="color:#ffff00; font-weight:bold; background-color:#bbbbbb"] { background-color: transparent !important; }
`;

_darkStyleForGame['cribbage'] = `
.club, .spade { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#cutCardSpace { color: white; }
`;

_darkStyleForGame['diceforge'] = `
#nb-turns-container { color: white; }
`;

_darkStyleForGame['dicehospital'] = `
.dhc-board_panel > h3 { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 1em; }
`;

_darkStyleForGame['earth'] = `
.ea-player-panel-pill .ea-pill-counter { color: #343134; }
.ea-objective-button .ea-pill-counter { color: white !important; }
.bx-checkbox-switch, #ea-tableau-slider, #ea-fauna-slider { filter: grayscale(1); }
.ea-icon-sprout, .ea-icon-soil, .ea-icon-growth { filter: invert(1); }
`;

_darkStyleForGame['ekonos'] = `
.player-name > a, .ekonos-scoreboard-label { color: white !important; }
`;

_darkStyleForGame['evergreen'] = `
.eve_inline-block { color: black; }
#pagesection_gameview h5 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['feastforodin'] = `
.ffo-icon-eye { filter: invert(0.7); }
`;

_darkStyleForGame['forsale'] = `
.player_bid_zone > div:first-child { background: var(--dark-20); padding: 0.3em 1em; border-radius: 8px; }
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel { filter: invert(1); }
.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['ghostathome'] = `
.ghostathome-name-000000, [style="color: rgb(0, 0, 0); background-color: rgba(255, 255, 255, 0.376);"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.ghostathome-name-0000ff, [style="color: rgb(0, 0, 255); background-color: rgba(0, 0, 0, 0.125);"] { color: #8080ff !important; }
.ghostathome-deck, .ghostathome-player-label { background-color: var(--dark-20) !important; }
#hand-label, #deck-label { color: white; }
`;

_darkStyleForGame['greatwesterntrail'] = `
#gwt_markets { color: white }
.player-area { background: #00000066; padding: 1em; }
.player-board-button-wrapper { top: 0.5em; }
`;

_darkStyleForGame['hanabi'] = `
.bgagame-hanabi #hanabi_prefs .bgabutton_gray { background: var(--dark-10); color: var(--light-80); }
.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover { background: var(--dark-30); }
`;

_darkStyleForGame['handandfoot'] = `
.card_type_icon { background-color: white; }
`;

_darkStyleForGame['incangold'] = `
#pagesection_gameview .whiteblock { background: var(--dark-10); }
#decksizetext { color: white; }
`;

_darkStyleForGame['innovation'] = `
.card_name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#main_area .bgabutton { color: black; }
#main_area .player_name { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
.score_container, .achievement_container, #available_achievements_container, #available_special_achievements_container { color: white; }
`;

_darkStyleForGame['itsawonderfulworld'] = `
.avatar_active { filter: none; }
.iww-resources, .player_score { color: black; }
`;

_darkStyleForGame['justone'] = `
#overall-content, #left-side-wrapper { background: inherit !important; }
`;

_darkStyleForGame['kingdombuilder'] = `
.player-panel .player-settlements .player-settlements-counter { color: white !important; }
`;

_darkStyleForGame['kingoftokyo'] = `
#active-expansions-button { background: #737373; }
`;

_darkStyleForGame['locomomo'] = `
#ebd-body { background-image: inherit; }
`;

_darkStyleForGame['lielow'] = `
.lielow-name-with-bg-000000  { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.lielow-name-with-bg-ffffff { background-color: transparent; }
`;

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: white !important; }
`;

_darkStyleForGame['marcopolotwo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
#pagesection_gameview .whiteblock > div:first-child { padding: 0.5em 0em 1em 0em; }
#pagesection_gameview .whiteblock > div:first-child > span:first-child { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 0.5em; }
`;

_darkStyleForGame['martiandice'] = `
.turn-order { text-shadow: none; }
`;

_darkStyleForGame['memoir'] = `
#clipboard-button { filter: invert(0.7); }
`;

_darkStyleForGame['myshelfie'] = `
#settings-icon { filter: invert(1); }
#board-scale { filter: grayscale(1); }
select { color-scheme: dark; }
`;

_darkStyleForGame['nidavellir'] = `
#turn-counter-holder, #layout-mode { filter: invert(0.7); }
.card-class-ranks, .card-class-score, .rank { filter: invert(1); }
#player-boards > div { background: var(--dark-20); border-radius: 8px; }
.player-board-name { background-color: var(--dark-30) !important; }
`;

_darkStyleForGame['novaluna'] = `
.disc { color: black; }
`;

_darkStyleForGame['obsession'] = `
#zoomIn, #zoomOut { filter: invert(1); }
#pagesection_gameview { color: white; }
#pagesection_gameview .playerName { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 0.5em; }
`;

_darkStyleForGame['pandemic'] = `
.player-board-pandemic__title, .player-name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['potionexplosion'] = `
.area_label, .player-name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['railroadink'] = `
#infrastructure { color: white; }
#all-players h2 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['rallymangt'] = `
.warningCounterIcon { filter: invert(1); }
`;

_darkStyleForGame['regicide'] = `
.hand_card_icon.empty { filter: invert(1); }
`;

_darkStyleForGame['riftvalleyreserve'] = `
.riftvalleyreserve-name-272c29 { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.rvr-icon-element[data-color="272c29"][data-type=stop] { background-color: white; border-radius: 18px; }
`;

_darkStyleForGame['sagani'] = `
.sag_goto { filter: invert(1); }
`;

_darkStyleForGame['saintpetersburg'] = `
.stp_icon_ruble { filter: invert(1); }
#pagesection_gameview .whiteblock h3 { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
`;

_darkStyleForGame['sevenwonders'] = `
.player_board_wrap { background: #00000090; }
span.tcoin { color: var(--light-80); }
#discard_count, #trees h3 { color: var(--light-80); }
`;

_darkStyleForGame['sevenwondersarchitects'] = `
.stw_name { color: white; }
`;

_darkStyleForGame['shiftingstones'] = `
.doubleempty, .empty, #deck, #disc, #mycard { color: white !important; }
`;

_darkStyleForGame['solo'] = `
#howto2, #helptext2 { color: var(--light-80); }
`;

_darkStyleForGame['spades'] = `
.card-name-color--1, .card-name-color--3 { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['strands'] = `
.strands-name-000000, .strands-num-1, .strands-num-2, .strands-num-3, .strands-num-4, .strands-num-5, .strands-num-6 { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.hex-alt-colors .hex-tile[data-hex="6"] { filter: contrast(0); }
`;

_darkStyleForGame['sushigo'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
`;

_darkStyleForGame['sushigoparty'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
`;

_darkStyleForGame['tapestry'] = `
#breadcrumbs { color: white; background: #1d2023; }
#player_board_config { background-color: #272a2f !important; }
#settings-controls-container .row-data .row-label { color: white; }
#player_config #player_config_row { filter: invert(1); }
.playerArea { background-color: #2d2d2d80; }
`;

_darkStyleForGame['targi'] = `
h3 > span[style="color:#0000ff; background-color: #;"] { color: #8080ff !important; background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
h3 > span[style="color:#ffffff; background-color: #bbbbbb;"] { background-color: var(--dark-20) !important; padding: 0.5em 1em; border-radius: 8px; }
`;

_darkStyleForGame['thecrewdeepsea'] = `
#help-mode-switch > label { filter: invert(0.7); }
#logs .notif_startNewMission > div { color: black !important; }
#logs span.card-value.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#logs span.logicon.black { background-color: white; }
`;

_darkStyleForGame['tichu'] = `
#pagesection_gameview .whiteblock .playertablename[style="color:#000000"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['toc'] = `
#icon_first_player { filter: invert(1); }
.field { border-color: #c9ab69; }
`;

_darkStyleForGame['tzolkin'] = `
#pagesection_gameview .whiteblock h3 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['welcometo'] = `
.houses-status { filter: invert(1); }
`;

_darkStyleForGame['wizard'] = `
.wizLogColor { color: black; }
`;

_darkStyleForGame['warchest'] = `
#team_board_id { background-color: var(--dark-20) !important; }
`;

export const darkStyleForGame = _darkStyleForGame;