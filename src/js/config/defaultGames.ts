import { Game } from "./Configuration";

const defaultGames: Partial<Game>[] = [
  {
    "name": "mycity",
    "position": "top",
    "playerPanel": "cty_board_{{player_id}}",
    "playerPanelOffset": -10,
    "iconShadow": "#ffffff"
  },
  {
    "name": "abyss",
    "position": "bottom",
    "playerPanel": "player-panel-{{player_id}}",
    "iconShadow": "#ffffff",
    "css": ".desktop_version #centered-table { margin-left: 46px; }"
  },
  {
    "name": "conspiracy",
    "position": "bottom",
    "positionBottom": "140px",
    "left": "12px",
    "playerPanel": "player-table-{{player_id}}",
    "iconShadow": "#ffffff",
    "css": ".show-playermat-button { visibility: hidden; }"
  },
  {
    "name": "thurnandtaxis",
    "playerPanel": "miniboard_{{player_id}}",
    "css": "#thurntaxis_board, .desktop_version #page-title { margin-left: 55px; }"
  },
  {
    "name": "seasons",
    "position": "bottom",
    "playerPanel": "anchor_player_{{player_id}}",
    "css": ".desktop_version .tableau { margin-left: 46px; } .anchor-up { display: none; } .show-player-tableau { visibility: hidden; }"
  },
  {
    "name": "azul",
    "position": "bottom",
    "playerPanel": "player-hand-{{player_id}}",
    "iconShadow": "#000000"
  },
  {
    "name": "wingspan",
    "positionTop": "150px",
    "playerPanel": "aviary_{{player_id}}",
    "css": ".desktop_version #wsp_opponent_board_area { padding-left: 40px; }"
  },
  {
    "name": "architectsofthewestkingdom",
    "playerPanel": "player{{player_id}}",
    "css": ".desktop_version #page-title { margin-left: 52px; } .desktop_version #pagesection_gameview { padding-left: 52px; }"
  },
  {
    "name": "amerigo",
    "playerPanel": "playersection_{{player_id}}",
    "css": "#playersections { padding-left: 50px; }"
  },
  {
    "name": "agricola",
    "positionTop": "150px",
    "left": "6px",
    "playerPanel": "player-board-resizable-{{player_id}}",
    "css": ".desktop_version #position-wrapper { padding-left: 52px; }"
  },
  {
    "name": "akropolis",
    "position": "top",
    "positionTop": "40vh",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#jump-controls { display: none; }"
  },
  {
    "name": "villagers",
    "playerPanel": "vil_village_{{player_id}}",
    "playerPanelOffset": 0,
    "css": ".desktop_version #villages { margin-left: 50px; }"
  },
  {
    "name": "spots",
    "playerPanel": "spt-cards{{player_id}}",
    "css": ".desktop_version #spt-gameArea { margin-left: 25px; }"
  },
  {
    "name": "astra",
    "playerPanel": "tbp-playerCards-{{player_id}}",
    "css": ".desktop_version #tbp { margin-left: 50px; }"
  },
  {
    "name": "earth",
    "position": "top",
    "positionTop": "40vh",
    "boardPanel": "ea-area-common",
    "boardPanelOffset": 5,
    "playerPanel": "ea-area-player-{{player_id}}",
    "playerPanelOffset": 0,
    "iconShadow": "#ffffff",
    "css": "#ea-shortcut-area { visibility: hidden; }"
  },
  {
    "name": "gizmos",
    "playerPanel": "gizmo_track_{{player_id}}",
    "css": ".desktop_version #gizmos_board { margin-left: 50px; }"
  },
  {
    "name": "potionexplosion",
    "playerPanel": "playerArea_{{player_id}}",
    "css": ".desktop_version #game_play_area { margin-left: 50px; }"
  },
  {
    "name": "spacebase",
    "playerPanel": "playerTable_{{player_id}}",
    "playerPanelOffset": 45,
    "iconShadow": "#ffffff",
    "css": ".desktop_version #game_play_area { margin-left: 50px; }"
  },
  {
    "name": "raceforthegalaxy",
    "playerPanel": "tableau_panel_{{player_id}}",
    "iconBackground": "#a3adb7",
    "iconShadow": "#ffffff",
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "greatwesterntrail",
    "positionTop": "150px",
    "left": "6px",
    "playerPanel": "player_area_{{player_id}}",
    "css": ".desktop_version #game_play_area_wrap { padding-left: 50px; }"
  },
  {
    "name": "throughtheagesnewstory",
    "playerPanel": "player_tableau_wrap_{{player_id}}",
    "playerPanelOffset": 45,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "throughtheages",
    "playerPanel": "player_tableau_{{player_id}}",
    "playerPanelOffset": 45,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "getonboard",
    "position": "top",
    "positionTop": "40vh",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#jump-controls { display: none; }"
  },
  {
    "name": "lumen",
    "playerPanel": "player-table-{{player_id}}",
    "css": ".desktop_version #page-content { padding-left: 50px; }"
  },
  {
    "name": "gardennation",
    "playerPanel": "player-table-{{player_id}}",
    "css": ".desktop_version #page-content { padding-left: 50px; }"
  },
  {
    "name": "tapestry",
    "positionTop": "90px",
    "playerPanel": "playerArea_{{player_id}}",
    "bottomPanel": "game_wrapper_bottom",
    "bottomPanelOffset": 5,
    "css": ".desktop_version #page-content { padding-left: 50px; }",
    "menuCss": "#player_board_config { background-color: rgb(218, 211, 193); }"
  },
  {
    "name": "resarcana",
    "playerPanel": "player_area_{{player_id}}",
    "css": ".desktop_version #page-content { padding-left: 50px; }"
  },
  {
    "name": "innovation",
    "playerPanel": "player_{{player_id}}",
    "css": ".desktop_version .player { margin-left: 50px; }"
  },
  {
    "name": "railroadink",
    "playerPanel": "player-area-{{player_id}}",
    "css": ".desktop_version #all-players { padding-left: 50px; }"
  },
  {
    "name": "viticulture",
    "playerPanel": "playerboard_row_{{player_id}}",
    "css": ".desktop_version #vit_game { padding-left: 50px; }"
  },
  {
    "name": "hadara",
    "playerPanel": "game_board_{{player_id}}",
    "playerPanelOffset": 10,
    "customZoomContainer": "pagesection_gameview",
    "css": ".desktop_version #page-content { padding-left: 50px; }"
  },
  {
    "name": "gogoa",
    "playerPanel": "goa-holder-{{player_id}}",
    "css": ".desktop_version #page-content { padding-left: 50px; }",
    "menuCss": "#page-title { width: 100% !important }"
  },
  {
    "name": "anachrony",
    "playerPanel": "player{{player_id}}",
    "css": "div.playeroverall > div:last-child { display: none; } .desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "crypt",
    "playerPanel": "player-area-{{player_id}}",
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "evergreen",
    "playerPanel": "grid-{{player_id}}",
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "getonboardparisrome",
    "playerPanel": "player-table-{{player_id}}",
    "playerPanelOffset": 10,
    "css": "#jump-controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "oasis",
    "playerPanel": "board_{{player_id}}",
    "playerPanelOffset": 10,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "vaalbara",
    "playerPanel": ".vlb_zone_title > h2 > span:last-child",
    "playerPanelOffset": 0,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "ultimaterailroads",
    "playerPanel": ".nameslot > h3",
    "playerPanelOffset": 20,
    "css": ".button_top { display: none; } .desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "russianrailroads",
    "positionTop": "100px",
    "playerPanel": ".nameslot > h3",
    "playerPanelOffset": 20,
    "css": ".button_top { display: none; }"
  },
  {
    "name": "saintpetersburg",
    "playerPanel": "stp_playertable_{{player_id}}_wrap",
    "playerPanelOffset": 10,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "obsession",
    "boardPanel": "builderMarket",
    "boardPanelOffset": 5,
    "playerPanel": "playerArea-{{player_id}}",
    "playerPanelOffset": 10,
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "beyondthesun",
    "playerPanel": "bts-playerArea{{player_id}}",
    "iconBackground": "#a4bdd5",
    "iconShadow": "#ffffff",
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "elawa",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#bga-jump-to_controls { display: none; } .desktop_version #tables { padding-left: 45px; }"
  },
  {
    "name": "locomomo",
    "playerPanel": "loc_player-board-{{player_id}}",
    "css": ".desktop_version #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "caverna",
    "position": "top",
    "playerPanel": "resources-bar-holder-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; } #position-wrapper { padding-left: 10px; }"
  },
  {
    "name": "marcopolo",
    "playerPanel": "playerMat-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "nidavellir",
    "position": "top",
    "playerPanel": ".player-board-name",
    "iconShadow": "#ffffff",
    "css": "#game_play_area { border-left: 50px solid #1e1e20; padding-left: 2px; } #tabs-container { min-width: 200px; overflow: hidden; } @media (min-width: 850px) { #tabs-container { margin-right: 0px !important; } }"
  },
  {
    "name": "bloodrage",
    "position": "top",
    "playerPanel": ".br-clan-wrapper > h2",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "parks",
    "position": "top",
    "boardPanel": "pks-board",
    "boardPanelOffset": 5,
    "playerPanel": "pks-playerBoard{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "rollforthegalaxy",
    "position": "top",
    "playerPanel": "tableau_panel_{{player_id}}",
    "css": ".tableau_panel, #roll_infos { padding-left: 50px; }"
  },
  {
    "name": "sushigo",
    "position": "top",
    "playerPanel": "row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "sushigoparty",
    "position": "top",
    "playerPanel": "row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "barenpark",
    "position": "top",
    "playerPanel": "bp-player-area-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "clansofcaledonia",
    "position": "top",
    "playerPanel": "playerboard_row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "clansofcaledonia",
    "position": "top",
    "playerPanel": "playerboard_row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "tokaido",
    "position": "top",
    "playerPanel": "#tkd_game_area > #collections > div > h3",
    "playerPanelOffset": 20,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "myshelfie",
    "position": "top",
    "playerPanel": "shelf_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "carnegie",
    "position": "top",
    "playerPanel": "company_block_{{player_id}}",
    "iconShadow": "#ffffff",
    "css": ".cng_topbutton { display: none; } #game_play_area { padding-left: 50px; }",
    "menuCss": "#cde-floating-menu-score > .fa-star { background-image: none; } #cde-floating-menu-score > .fa-star:before { content: \"\\f005\" !important; }",
  },
];

export default defaultGames;