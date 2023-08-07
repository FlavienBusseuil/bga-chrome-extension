export const gamesWithCustomBackground = [
  'abyss',
  'agricola',
  'conspiracy',
  'earth',
  'kingoftokyo',
  'memoir',
  'pandemic',
  'raceforthegalaxy',
  'spacebase',
  'splendor'
];

const _darkStyleForGame = {};

_darkStyleForGame['agricola'] = `
#player_boards > div { background-color: #000000CC !important; }
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

_darkStyleForGame['burglebros'] = `
.floor_container.whiteblock { color: white; }
`;

_darkStyleForGame['carcassonne'] = `
.partisan_000000 { filter: invert(0.2) !important; }
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
`;

_darkStyleForGame['century'] = `
html.century_theme.spice #logs .log_replayable .roundedbox { background: #272a2f; }
.logitem.mcard_forlog { background-color: #040404; }
.mcard_forlog:after { border-left: 7px solid #040404; }
.logitem.gcard_forlog { background-color: #040404; color: #e59480; }
`;

_darkStyleForGame['cribbage'] = `
.club, .spade { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#cutCardSpace { color: white; }
`;

_darkStyleForGame['challengers'] = `
.cha-log-holder { background: var(--dark-20); color: var(--light-80); }
`;

_darkStyleForGame['diceforge'] = `
#pagesection_gameview .whiteblock, #nb-turns-container { color: white; }
`;

_darkStyleForGame['earth'] = `
.ea-player-panel-pill .ea-pill-counter { color: #343134; }
.ea-objective-button .ea-pill-counter { color: white !important; }
.bx-checkbox-switch, #ea-tableau-slider, #ea-fauna-slider { filter: grayscale(1); }
.ea-icon-sprout, .ea-icon-soil, .ea-icon-growth { filter: invert(1); }
`;

_darkStyleForGame['evergreen'] = `
.eve_inline-block { color: black; }
#pagesection_gameview .whiteblock { color: white; }
#pagesection_gameview h5 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['feastforodin'] = `
.ffo-icon-eye { filter: invert(0.7); }
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel { filter: invert(1); }
.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
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

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: white !important; }
`;

_darkStyleForGame['memoir'] = `
#clipboard-button { filter: invert(0.7); }
`;

_darkStyleForGame['novaluna'] = `
.disc { color: black; }
`;

_darkStyleForGame['pandemic'] = `
.player-board-pandemic__title, .player-name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['piratenkapern'] = `
#pagesection_gameview .whiteblock { color: white; }
`;

_darkStyleForGame['potionexplosion'] = `
.area_label, .player-name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['railroadink'] = `
#infrastructure { color: white; }
#all-players h2 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['saboteur'] = `
#pagesection_gameview .whiteblock { color: white; }
`;

_darkStyleForGame['sagani'] = `
#pagesection_gameview .whiteblock { color: white; }
.sag_goto { filter: invert(1); }
`;

_darkStyleForGame['saintpetersburg'] = `
.stp_icon_ruble { filter: invert(1); }
#pagesection_gameview .whiteblock h3 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['sevenwonders'] = `
.player_board_wrap { background: #00000090; }
span.tcoin { color: var(--light-80); }
#discard_count, #trees h3 { color: var(--light-80); }
`;

_darkStyleForGame['sevenwondersarchitects'] = `
.stw_name { color: white; }
`;

_darkStyleForGame['solo'] = `
#howto2, #helptext2 { color: var(--light-80); }
`;

_darkStyleForGame['takenoko'] = `
#pagesection_gameview .whiteblock { color: white; }
`;

_darkStyleForGame['tapestry'] = `
#breadcrumbs { color: white; background: #1d2023; }
#player_board_config { background-color: #272a2f !important; }
#settings-controls-container .row-data .row-label { color: white; }
#player_config #player_config_row { filter: invert(1); }
.playerArea { background-color: #2d2d2d80; }
`;

_darkStyleForGame['thecrewdeepsea'] = `
#help-mode-switch > label { filter: invert(0.7); }
#logs .notif_startNewMission > div { color: black !important; }
#logs span.card-value.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#logs span.logicon.black { background-color: white; }
`;

_darkStyleForGame['tichu'] = `
#pagesection_gameview .whiteblock { color: white; }
#pagesection_gameview .whiteblock .playertablename[style="color:#000000"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['toc'] = `
#icon_first_player { filter: invert(1); }
#pagesection_gameview .whiteblock { color: white; }
.field { border-color: #c9ab69; }
`;

_darkStyleForGame['welcometo'] = `
.houses-status { filter: invert(1); }
`;

_darkStyleForGame['wizard'] = `
.wizLogColor { color: black; }
`;

export const darkStyleForGame = _darkStyleForGame;