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
  'earth',
  'gangsta',
  'jumpdrive',
  'kingoftokyo',
  'lielow',
  'memoir',
  'newfrontiers',
  'notalone',
  'nowboarding',
  'pandemic',
  'patchwork',
  'raceforthegalaxy',
  'santorini',
  'skull',
  'spacebase',
  'splendor',
  'stella',
  'thecrew',
  'wizardsgrimoire'
];

export const gamesWithCustomPanel = [
  'notalone',
  'nowboarding',
  'sevenwondersarchitects',
  'tickettoride',
  'viticulture',
  'wingspan'
];

export const gamesWithCustomDarkMode = {
  hardback: 'dark',
};

export const gamesWithCustomActions = {
  newfrontiers: {
    setDarkMode: (darkMode: string) => {
      const input = document.getElementById('preference_control_101') as any;
      input.value = (darkMode) ? "1" : "2";
      input.dispatchEvent(new Event("change"));
    },
    isDarkMode: () => {
      const input = document.getElementById('preference_control_101') as any;
      return input.value == "1";
    }
  }
};

const _darkStyleForGame = {};
const _styleForGame = {};

_darkStyleForGame['abyss'] = `
#krakenToken, #scourgeToken { filter: var(--highlight); }
.icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['afterus'] = `
.icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['ageofchampagne'] = `
body { background: none; }
#player_boards .AOCsvg { filter: var(--highlight); }
#player_boards .AOCplayer-PP:after { color: #fff; }
`;

_darkStyleForGame['agricola'] = `
#player_boards > div { background-color: #000000CC !important; }
`;

_darkStyleForGame['akropolis'] = `
.player-table .name-wrapper { background: var(--dark-back); }
`;

_darkStyleForGame['amerigo'] = `
#generalreserve { background: var(--dark-back); }
#generalreserve h3, .amg_playerreserve h3, .amg_playersupply h3 { font-weight: normal; color: white; }
.amg_playersection { background: var(--dark-20); }
.amg_playerreserve, .amg_playersupply { background: var(--dark-40); }
.amg_miniboard_counter { background: var(--dark-40); border-color: var(--dark-40);}
.amg_player_tabs a { background-color: #000; background-image: linear-gradient(180deg,#000,#444); text-shadow: none; color: white; }
.amg_player_tabs a:focus,.amg_player_tabs a:focus:after { background: #000; }
.amg_player_tabs a:after { background: #000; background-image: linear-gradient(180deg,#000,#444); }
.amg_player_tabs .amg_current a,.amg_player_tabs .amg_current a:after { background: #000; }
.amg_player_tabs a:hover,.amg_player_tabs a:hover:after { background: #000; }
.amg_playersubsection { background: var(--dark-0); }
.amg_player_order { color: black; }
.amg_counter_icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['anachrony'] = `
.playeroverall { background: var(--dark-back); color: white; }
.anaicon { filter: var(--highlight-min) !important; }
`;

_darkStyleForGame['applejack'] = `
#zoomplus, #zoomminus { color: var(--light-80); }
.aj_sprite { filter: var(--highlight); }
.aj_playerBlock > div > h3 { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['architectsofthewestkingdom'] = `
.playeroveroverall { background-color: var(--dark-back); }
#logs .arcicon, #player_boards .arcicon { filter: var(--highlight-min); }
`;

_darkStyleForGame['arknova'] = `
.player-name > svg, .slider, #help-mode-switch { filter: invert(0.7); }
`;

_darkStyleForGame['arnak'] = `
.hand-amt { background: var(--dark-20); padding: 0.3em 0.5em; border-radius: 8px; color: white; top: -40px; }
.hand-amt .player-name { background: transparent; }
`;

_darkStyleForGame['bandido'] = `
.cp_board_hand, #resize { filter: invert(1); }
body { background: none; }
`;

_darkStyleForGame['barenpark'] = `
.bp-player-area-container, .bp-supply-board-overlap { background: var(--dark-back) !important; }
.bp-supply-board-view-button, .bp-player-panel-columns { filter: invert(1); }
.bp-player-panel-zoom { filter: grayscale(1); }
`;

_darkStyleForGame['barrage'] = `
html.darkpanel .player-board { background: var(--dark-30) !important; }
`;

_darkStyleForGame['beyondthesun'] = `
#player_boards .bts-icon-vp, #logs .bts-icon-vp, #player_boards .bts-icon-ore, #logs .bts-icon-ore { filter: invert(0.7); }
.bts-faction { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['bloodrage'] = `
.br_board { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.br_board_button { text-shadow: none; filter: invert(1); }
`;

_darkStyleForGame['cantstop'] = `
.diceactions, .dicechoice_plus { color: white; }
`;

_darkStyleForGame['canvas'] = `
#bga-zoom-controls { filter: invert(0.7); }
`;

_darkStyleForGame['cantstopexpress'] = `
h5 { color: white; }
.pad { filter: invert(0.8) grayscale(1); }
.containermepad > h1 { background: var(--dark-20); margin-top: 0.5em; padding: 0.3em 1em !important; border-radius: 8px; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
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
 .cng_token,  .player_score > i { filter: var(--highlight-min); }
 .cng_playerboard_counter { filter: invert(1); }
 #pagemaintitletext > span { background-color: transparent !important; }
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score { filter: invert(1) !important; }
`;

_darkStyleForGame['caverna'] = `
#central-board .turn-action-container .turn-number, #help-mode-switch > label, #show-expedition { filter: invert(1); }
#player_config #round-counter-wrapper { background-color: black; }
.caverna-meeple { filter: var(--highlight-min); }
#floating-building-boards-wrapper[data-open=bonus] #floating-building-buttons .building-board-button[data-id=bonus],
#floating-building-boards-wrapper[data-open=dwellings] #floating-building-buttons .building-board-button[data-id=dwellings],
#floating-building-boards-wrapper[data-open=food] #floating-building-buttons .building-board-button[data-id=food],
#floating-building-boards-wrapper[data-open=materials] #floating-building-buttons .building-board-button[data-id=materials]
{ background: #000; color: #e6e7e9; }
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
.cha-name-404040 { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['chromino'] = `
#btn_user_prefs { filter: invert(1); }
.block-user-pref-radio label { background-color: #111; }
#map_container { background-image: url(${getUrl('img/dark_theme/background.jpg')}); }
.tile.icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['clansofcaledonia'] = `
.auction-bidding-item, .cc_counter { background: var(--dark-20); }
.token24 { filter: var(--highlight-min); }
`;

_darkStyleForGame['coinche'] = `
.currentBidInfo__player, .bid-value { color: var(--light-80); }
.card-color-icon { filter: grayscale(1) invert(1); }
`;

_darkStyleForGame['coloretto'] = `
#coloretto_warning { background: var(--dark-20); color: white; }
#round_status, #deck_count { color: white; }
`;

_darkStyleForGame['coltexpress'] = `
.bullets { filter: var(--highlight-min); }
`;

_darkStyleForGame['concept'] = `
#word-timer { filter: invert(1); }
h2#word-display[data-lvl="2"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
div.preference_choice:has(> div > div > select#preference_control_100) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_100) { display: none; }
`;

_styleForGame['concept'] = `
#darkmode-switch { display: none; }
`;

_darkStyleForGame['connectfour'] = `
#logs span[style="color:#ff0000; font-weight:bold; background-color:#bbbbbb"], #logs span[style="color:#ffff00; font-weight:bold; background-color:#bbbbbb"] { background-color: transparent !important; }
`;

_darkStyleForGame['cribbage'] = `
.club, .spade { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#cutCardSpace { color: white; }
`;

_darkStyleForGame['cubirds'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
#zoomin_left, #zoomin_right, #zoomout_left, #zoomout_right { background-color: transparent; box-shadow: none; filter: invert(0.7); }
`;

_darkStyleForGame['diceforge'] = `
#nb-turns-container { color: white; }
.action-bar { border: 1px solid rgb(255 255 255 / 20%); }
.header-action { background-color: rgba(255,255,255,.1); }
.cards-pile { box-shadow: 0 0 2px 0 #9f9393; }
`;

_darkStyleForGame['dobble'] = `
#game_play_area div[id^="player_name_"], .pile-description div:not(.dbl_sleep) { background-color: var(--dark-20); }
`;

_darkStyleForGame['doglover'] = `
#DOGFoodMode { filter: invert(1); }
#page-content { color: white; }
.DOG-watchdog { filter: var(--highlight-max); }
`;

_darkStyleForGame['downforce'] = `
.df-car-token-small { filter: var(--highlight); }
`;

_darkStyleForGame['draftosaurus'] = `
.player-label { background: var(--dark-10) }
#logs .die { filter: invert(1); }
.dino-number { color: black; }
`;

_darkStyleForGame['dungeonroll'] = `
.navigation>li { filter: invert(0.7); }
.navigation>li.selected { background-color: #7dff00; }
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
`;

_darkStyleForGame['feastforodin'] = `
.ffo-icon-eye { filter: invert(0.7); }
#ffo-modal #ffo-modal-content { background-color: #00000066; }
.ffo-player-board-main .ffo-player-name { background-color: #00000080; }
.ffo-player-name > span:first-child, .ffo-player-name > span:last-child { color: white !important; }
`;

_darkStyleForGame['fluxx'] = `
#pagesection_gameview .whiteblock { color: black; }
#flx-zoom-controls { background-color: var(--dark-20) !important; }
#flx-zoom-out, #flx-zoom-in { filter: invert(0.7); }
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel { filter: invert(1); }
.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['gangsta'] = `
#twodecks > div { background: none !important; }
.team { filter: var(--highlight-min); }
`;

_darkStyleForGame['ghostathome'] = `
.ghostathome-name-000000, [style="color: rgb(0, 0, 0); background-color: rgba(255, 255, 255, 0.376);"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.ghostathome-name-0000ff, [style="color: rgb(0, 0, 255); background-color: rgba(0, 0, 0, 0.125);"] { color: #8080ff !important; }
.ghostathome-deck, .ghostathome-player-label { background-color: var(--dark-20) !important; }
#hand-label, #deck-label { color: white; }
`;

_darkStyleForGame['greatwesterntrail'] = `
#gwt_markets { color: white; }
.player-area { background: #00000066; padding: 1em; }
.player-board-button-wrapper { top: 0.5em; }
#gwt_boards_area { gap: 0.5em; }
`;

_darkStyleForGame['goodcopbadcop'] = `
#board_area div[class^="player_name"] { background: var(--dark-30); border-radius: 8px; text-align: center; padding: 0.3em 0.5em; }
#board_area div[style^="color:#{PLAYER"] { display: none; }
`;

_darkStyleForGame['hadara'] = `
.had_player_p_icon, .had_coins { filter: var(--highlight-min); }
`;

_darkStyleForGame['haiclue'] = `
.word { background: var(--dark-20); border: 1px solid #aaa; box-shadow: 2px 2px 2px rgba(255,255,255,.5); color: white; }
`;

_darkStyleForGame['hanabi'] = `
.bgagame-hanabi #hanabi_prefs .bgabutton_gray { background: var(--dark-10); color: var(--light-80); }
.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover { background: var(--dark-30); }
`;

_darkStyleForGame['handandfoot'] = `
.card_type_icon { background-color: white; }
`;

_styleForGame['hardback'] = `
div.preference_choice:has(> div > div > select#preference_control_101) { display: none; }
div.preference_choice:has(> div > div > select#preference_fontrol_101) { display: none; }
`;

_darkStyleForGame['hive'] = `
body { background: none !important; }
`;

_darkStyleForGame['incangold'] = `
#pagesection_gameview .whiteblock { background: var(--dark-10); }
#decksizetext { color: white; }
`;

_darkStyleForGame['innovation'] = `
.card_name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#main_area .bgabutton { color: black; }
.hand_container { background-color: transparent; }
.score_container, .achievement_container, #available_achievements_container, #available_special_achievements_container, #decks_and_title { color: white; }
`;

_darkStyleForGame['itsawonderfulworld'] = `
.avatar_active { filter: none; }
.iww-resources, .player_score { color: black; }
`;

_darkStyleForGame['jumpdrive'] = `
.jdr-icon, .jdr-resource { filter: var(--highlight-min); }
`;

_darkStyleForGame['justone'] = `
#overall-content, #left-side-wrapper { background: inherit !important; }
#card-mystery-header, #card-guess-header { color: white; }
.left-name, .right-name { background: var(--dark-20); border-radius: 8px; padding: 0.3em 0.5em; }
`;

_darkStyleForGame['kingdombuilder'] = `
.player-panel .player-settlements .player-settlements-counter { color: white !important; }
`;

_darkStyleForGame['kingoftokyo'] = `
#active-expansions-button { background: #737373; }
`;

_darkStyleForGame['lagranja'] = `
.playerFarm > div:first-child > span:first-child { background-color: transparent !important; }
`;

_darkStyleForGame['lama'] = `
#deckCount { color: white; }
`;

_darkStyleForGame['lettertycoon'] = `
.lettertycoon_area { background: var(--dark-back); }
.lettertycoon_area .to_translate, .lettertycoon_deck_info { color: white !important; }
`;

_darkStyleForGame['locomomo'] = `
#ebd-body { background-image: inherit; background-size: auto; }
.loc_player-header { background-color: var(--dark-back); }
`;

_darkStyleForGame['lielow'] = `
.lielow-name-with-bg-000000  { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.lielow-name-with-bg-ffffff { background-color: transparent; }
`;

_darkStyleForGame['lineit'] = `
.player-table { background: var(--dark-back) !important; }
.name-wrapper { background: var(--dark-20) !important; }
.player-scored-card, .jackpot-icon { filter: var(--highlight-min); }
`;

_darkStyleForGame['livingforest'] = `
.icon_fragment { filter: invert(1); }
`;

_darkStyleForGame['lostcities'] = `
#round_count, #deck_count { color: white !important; }
`;

_darkStyleForGame['luckynumbers'] = `
.playertable { background-color: var(--dark-back); }
`;

_darkStyleForGame['machiavelli'] = `
font[color="blue"] { color: #8080ff !important; }
font[color="black"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
font[color="red"] { color: #ff3333 !important; }
`;

_darkStyleForGame['marcopolo'] = `
.piece { filter: var(--highlight); }
.small_piece { filter: var(--highlight-min); }
`;

_darkStyleForGame['marcopolotwo'] = `
#characterSelectionDescription { background-color: var(--dark-20) !important; }
.piece { filter: var(--highlight); }
.small_piece { filter: var(--highlight-min); }
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

_darkStyleForGame['nextstationtokyo'] = `
#ebd-body { background-image: none !important; }
`;

_darkStyleForGame['nidavellir'] = `
#turn-counter-holder, #layout-mode { filter: invert(0.7); }
.card-class-ranks, .card-class-score, .rank { filter: invert(1); }
#player-boards > div { background: var(--dark-20); border-radius: 8px; }
.player-board-name { background-color: var(--dark-30) !important; }
`;

_darkStyleForGame['noneshallpass'] = `
#zoomin, #zoomout { background-color: transparent; box-shadow: none; filter: invert(0.7); }
`;

_darkStyleForGame['notalone'] = `
.player-board { background: transparent !important; }
.player-board.selectable .player_board_inner { border-color: green !important; }
.player-board.selectable .player_board_inner:hover { border-color: lime !important; }
`;

_darkStyleForGame['novaluna'] = `
.disc { color: black; }
`;

_darkStyleForGame['obsession'] = `
#zoomIn, #zoomOut { filter: invert(1); }
#pagesection_gameview { color: white; }
#pagesection_gameview .playerName { background: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; margin-bottom: 0.5em; }
`;

_darkStyleForGame['ohhell'] = `
#table .table_player_name { background-color: var(--dark-20); }
`;

_darkStyleForGame['painttheroses'] = `
#overall-content[style^="background"] { background-image: none !important; background-color: #1f6a6c !important; }
`;

_darkStyleForGame['pandemic'] = `
.player-board-pandemic__title, .player-name { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
`;

_darkStyleForGame['papayoo'] = `
#pagesection_gameview .whiteblock { background: none; }
`;

_darkStyleForGame['patchwork'] = `
#player_boards .micon { filter: invert(1); }
`;

_darkStyleForGame['potionexplosion'] = `
.area_label, .player-name { text-shadow: none; }
`;

_darkStyleForGame['president'] = `
.icon20, .iconBeggar, .iconCitizen, .iconPresident, .iconPeasant, .iconPrimeMinister { filter: invert(1); }
`;

_darkStyleForGame['puertorico'] = `
#buildings, #plantations { background: var(--dark-back); color: white; }
.tiles_label { color: white; }
.small_building_placeholder, .big_building_placeholder { background-color: #e6d49c; }
`;

_darkStyleForGame['pugsinmugs'] = `
.bigcard { box-shadow: 5px 5px 10px 2px #aaa; }
`;

_darkStyleForGame['qawale'] = `
.qaw_miniboard { border: 2px solid #897272; }
`;

_darkStyleForGame['quoridor'] = `
.objective { filter: var(--highlight); }
`;

_darkStyleForGame['railroadink'] = `
#infrastructure { color: white; }
#all-players h2 { background: var(--dark-20); padding-left: 1em; border-radius: 8px; }
`;

_darkStyleForGame['railwaysoftheworld'] = `
:root { color-scheme: dark; }
.mm_money, .mm_income, .mm_bond, .mm_engine, .mm_completed_links, .mm_consecutive_links, .mm_connected_cities, #zoom_plus, #zoom_minus { filter: invert(1); }
#cityNameShow, #majorLinesShow, #allOpCardsShow, #rulesShow { background-color: var(--dark-30) !important; }
#hideShowOpCards { padding:0.3em 0em; margin: 0.5em 0em; cursor: pointer; }
.all_cards_wrapper { background: var(--dark-back); color: white; }
.all_cards_wrapper > h3 { padding-left: 0.5em; }
.stockitem { color: black; }
 `;

_darkStyleForGame['rainforest'] = `
 .playerPanel p { color: white; }
 .notif_species { filter: var(--highlight-min); }
 `;

_darkStyleForGame['rallymangt'] = `
.warningCounterIcon { filter: invert(1); }
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
`;

_darkStyleForGame['riftvalleyreserve'] = `
.riftvalleyreserve-name-272c29 { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
.rvr-icon-element[data-color="272c29"][data-type=stop] { background-color: white; border-radius: 18px; }
`;

_darkStyleForGame['rollandbump'] = `
.rnb_cardsnb { color: #ddd; }
.rnb_player { background: var(--dark-back); }
.rnb_mininb { color: white; }
.rnb_nocard { border: 2px solid white; }
#rnb_rewards { color: white; }
.rnb_boardcard, .rnb_logcard { filter: var(--highlight); }
`;

_darkStyleForGame['rollforthegalaxy'] = `
.imgtext { filter: var(--highlight-min); }
.tile_title { color: black; }
`;

_darkStyleForGame['russianrailroads'] = `
.player-name, .player_score { background-color: var(--dark-20); }
.nameslot { width: auto; }
.nameslot > h3 { background-color: var(--dark-20); padding: 0.5em 1em; border-radius: 8px; }
`;

_darkStyleForGame['saboteur'] = `
.saboteur_cell.default_cell_bg:empty { filter: invert(1); }
`;

_darkStyleForGame['sagani'] = `
body { background: none; }
.sag_goto, #sag-buttons { filter: invert(1); }
.sag_map-container { background: var(--dark-back); }
.sag_piece { filter: var(--highlight); }
`;

_darkStyleForGame['saintpetersburg'] = `
.stp_icon_ruble { filter: invert(1); }
`;

_darkStyleForGame['seasons'] = `
#player_boards .icon_cristal { filter: invert(0.7); }
#player_boards .invocation_level, #player_boards .hand, #help-mode-switch  { filter: invert(0.7); }
`;

_darkStyleForGame['sechsnimmt'] = `
.card_played { background: none var(--dark-40); }
`;

_darkStyleForGame['sevenwonders'] = `
.player_board_wrap { background: #00000090; }
span.tcoin { color: var(--light-80); }
#discard_count, #trees h3 { color: var(--light-80); }
`;

_darkStyleForGame['sevenwondersarchitects'] = `
body { background: none !important; }
.player-board { background: var(--dark-30) !important; }
.player-board.stw_activepl { background: var(--dark-40) !important; }
#centralaround.stw_emptypile { background: #80808099; }
`;

_darkStyleForGame['sevenwondersduel'] = `
select { color-scheme: dark; }
.card_outline.science_progress, .card_outline:empty, .progress_token_outline { box-shadow: inset 0 0 calc(var(--scale)*4px) calc(var(--scale)*1px) #ffffff80; }
.end_game_player_name, #game_play_area .whiteblock h3, .science_progress { text-shadow: none; }
.end_game_blue { color: #002f4dab; }
.end_game_green, .end_game_progresstokens { color: #00b35cab; }
.end_game_purple { color: #9c82b0ab; }
.end_game_military { color: #db2433ab; }
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

_darkStyleForGame['stoneage'] = `
.sta_boardBuildingCounter, .sta_boardCardCounter { color: white; }
#sta_adjustZoom,#sta_zoomIn,#sta_zoomOut { filter: invert(0.7) !important; }
#sta_adjustZoom:hover,#sta_zoomIn:hover,#sta_zoomOut:hover { filter: invert(1) drop-shadow(0 0 3px #fff) !important; }
`;

_darkStyleForGame['sushigo'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
`;

_darkStyleForGame['sushigoparty'] = `
.block_title { background-image: none; background-color: var(--dark-20); }
#sushigoparty_menu_wrapper { background: var(--dark-back); color: white; }
#sushigoparty_menu_wrapper>h1>span { color: var(--light-80); }
`;

_darkStyleForGame['takenoko'] = `
#takenoko_actionbar { background-color: var(--dark-back); background-image: none; }
#take_zoom_icon { filter: invert(0.7); }
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
.tar_ware_board { filter: var(--highlight-min); }
`;

_darkStyleForGame['thecrew'] = `
#logs span.card-value.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#logs span.card-value { padding-right: 0.2em; }
#logs span.logicon.black { filter: invert(1); }
`;

_darkStyleForGame['thecrewdeepsea'] = `
#help-mode-switch > label { filter: invert(0.7); }
#logs .notif_startNewMission > div { color: black !important; }
#logs span.card-value.black { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#logs span.logicon.black { background-color: white; }
`;

_darkStyleForGame['thirteenclues'] = `
#tcGameLogTable th { color: #05f; }
.tableWindow td { color: #8585ad; }
`;

_darkStyleForGame['throughtheages'] = `
.firstplayernotice { color: white; }
`;

_darkStyleForGame['throughtheagesnewstory'] = `
.firstplayernotice { color: white; }
`;

_darkStyleForGame['thurnandtaxis'] = `
#help div div { filter: invert(1); }
#help h3, .gameAreaContainer h3, #carriages h3 { color: #c0c1d5; }
`;

_darkStyleForGame['teotihuacan'] = `
.cc_counter { background-color: #ffffff33; }
.token24 { filter: var(--highlight-min); }
`;

_darkStyleForGame['tichu'] = `
#pagesection_gameview .whiteblock .playertablename[style="color:#000000"] { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; }
#currentTrickDiv { background: var(--dark-back); padding: 0.3em 0.5em; border-radius: 6px; }
#pagesection_gameview .whiteblock.lastComboPlayer { background-color: rgb(183 183 87 / 70%); }
#pagesection_gameview .whiteblock.disabled:not(.lastComboPlayer) { background-color: hsla(0,0%,45%,.7); }
.grandtichublack, .tichublack { filter: var(--highlight-max); }
#buttons { background: var(--dark-back); color: white; }
`;

_darkStyleForGame['timelinetwist'] = `
.tlt_zoom-button-icon { filter: invert(0.7); }
`;

_darkStyleForGame['toc'] = `
#icon_first_player, #checkmark { filter: invert(1); }
.field { border-color: #c9ab69; }
`;

_darkStyleForGame['tranquility'] = `
.tqt_draw_count { filter: invert(1); }
`;

_darkStyleForGame['ultimaterailroads'] = `
.player-name, .player_board_inner, .player_score { background-color: transparent; }
`;

_darkStyleForGame['viticulture'] = `
#player_boards .cc_counter, .playerboard_row_header .cc_counter { color: black; }
#turn_header { background-color: var(--dark-20); color: white; }
#pagesection_gameview #board-row .whiteblock { color: black; }
.player-board { background: var(--dark-20) !important; }
.player-board.vit_passed,.playerboard_row.vit_passed { background: var(--dark-40) !important; }
.expandabletoggle:active, .expandabletoggle:hover, .expandabletoggle:link, .expandabletoggle:visited { color: #fff!important; }
.player_last_turn { background-color: transparent !important; }
`;

_darkStyleForGame['welcometo'] = `
#player_boards .houses-status > svg { filter: invert(1); }
#player_boards .houses-status > div, #player_boards .refusal-status > div { color: white; }
#plan-cards-container, #construction-cards-container { background: var(--dark-back); }
`;

_darkStyleForGame['welcometonewlasvegas'] = `
#page-content h3 { color: white; }
`;

_darkStyleForGame['wizard'] = `
.wizLogColor { color: black; }
`;

_darkStyleForGame['warchest'] = `
#team_board_id { background-color: var(--dark-20) !important; }
`;

_darkStyleForGame['wingspan'] = `
#spectatorbox { background-color: var(--dark-20) !important; }
.player_board_content, .wsp_playerboard_card_icon { color: black; }
#feeder_outside, #feeder_outside > div { filter: invert(1); }
`;

_darkStyleForGame['wizardsgrimoire'] = `
#pagesection_gameview .whiteblock, .player-table .wg-health { color: black; }
.i-mana-x { filter: var(--highlight); }
.player_small_board .hand-icon-wrapper .hand-icon { filter: invert(1); }
`;

_darkStyleForGame['yatzy'] = `
.PointLine > th, .PointLine > td { color: white; }
.PointLine > td.possibleCells { color: gray; }
`;

_darkStyleForGame['yokohama'] = `
#eog_triggers > div:first-child { background-color: var(--dark-20) !important; }
.mngt_button { color-scheme: dark; background-color: var(--dark-20); }
`;

export const darkStyleForGame = _darkStyleForGame;
export const styleForGame = _styleForGame;