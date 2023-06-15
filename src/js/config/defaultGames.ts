import { Game } from "./Configuration";

const defaultGames: Partial<Game>[] = [
  {
    "name": "mycity",
    "position": "bottom",
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
    "playerPanel": "playerArea_{{player_id}}",
    "css": ".desktop_version #page-content { padding-left: 50px; } #player_board_config { background-color: rgb(218, 211, 193); }"
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
    "css": "#page-title { width: 100% !important } .desktop_version #page-content { padding-left: 50px; }"
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
];

export default defaultGames;