import { Game } from "./Configuration";

const defaultGames: Partial<Game>[] = [
  {
    "name": "mycity",
    "playerPanel": "cty_board_{{player_id}}",
    "playerPanelOffset": -10,
    "css": " "
  },
  {
    "name": "abyss",
    "iconBackground": "#7ab1c5",
    "playerPanel": "player-panel-{{player_id}}",
    "css": ".desktop_version #centered-table { margin-left: 46px; }"
  },
  {
    "name": "conspiracy",
    "position": "bottom",
    "bottom": "140px",
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
    "iconShadow": "#000000",
    "css": " "
  },
  {
    "name": "wingspan",
    "position": "auto",
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
    "playerPanel": "player-board-resizable-{{player_id}}",
    "css": "#position-wrapper { padding-left: 52px; }"
  },
  {
    "name": "akropolis",
    "top": "100px",
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
    "top": "40vh",
    "boardPanel": "ea-area-common",
    "playerPanel": "ea-area-player-{{player_id}}",
    "playerPanelOffset": 0,
    "iconShadow": "#ffffff",
    "css": "#ea-shortcut-area { visibility: hidden; }"
  },
  {
    "name": "gizmos",
    "playerPanel": "gizmo_track_{{player_id}}",
    "css": "#gizmos_board { margin-left: 50px; }"
  },
  {
    "name": "potionexplosion",
    "playerPanel": "playerArea_{{player_id}}",
    "css": "#game_play_area { margin-left: 50px; }"
  },
  {
    "name": "spacebase",
    "playerPanel": "playerTable_{{player_id}}",
    "playerPanelOffset": 45,
    "iconBackground": "#b9b5b8",
    "iconShadow": "#ffffff",
    "css": "#game_play_area { margin-left: 50px; }"
  },
  {
    "name": "raceforthegalaxy",
    "playerPanel": "tableau_panel_{{player_id}}",
    "iconBackground": "#a3adb7",
    "iconShadow": "#ffffff",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "greatwesterntrail",
    "top": "100px",
    "playerPanel": "player_area_{{player_id}}",
    "css": "#game_play_area_wrap { padding-left: 50px; }"
  },
  {
    "name": "throughtheagesnewstory",
    "playerPanel": "player_tableau_wrap_{{player_id}}",
    "playerPanelOffset": 45,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "throughtheages",
    "playerPanel": "player_tableau_{{player_id}}",
    "playerPanelOffset": 45,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "getonboard",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#jump-controls { display: none; }"
  },
  {
    "name": "lumen",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#page-content { padding-left: 50px; }"
  },
  {
    "name": "gardennation",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#page-content { padding-left: 50px; }"
  },
  {
    "name": "tapestry",
    "top": "90px",
    "playerPanel": "playerArea_{{player_id}}",
    "bottomPanel": "game_wrapper_bottom",
    "css": "#page-content { padding-left: 50px; }",
    "menuCss": "#player_board_config { background-color: rgb(218, 211, 193); }"
  },
  {
    "name": "resarcana",
    "playerPanel": "player_area_{{player_id}}",
    "css": "#page-content { padding-left: 50px; }"
  },
  {
    "name": "innovation",
    "playerPanel": "player_{{player_id}}",
    "css": ".player { margin-left: 50px; }"
  },
  {
    "name": "railroadink",
    "iconBackground": "#bfdef9",
    "playerPanel": "player-area-{{player_id}}",
    "css": "#all-players { padding-left: 50px; }"
  },
  {
    "name": "viticulture",
    "playerPanel": "playerboard_row_{{player_id}}",
    "css": "#vit_game { padding-left: 50px; }"
  },
  {
    "name": "hadara",
    "playerPanel": "game_board_{{player_id}}",
    "playerPanelOffset": 10,
    "customZoomContainer": "pagesection_gameview",
    "css": "#page-content { padding-left: 50px; }"
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
    "css": "div.playeroverall > div:last-child { display: none; } #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "crypt",
    "playerPanel": "player-area-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "evergreen",
    "iconBackground": "#ffffff",
    "playerPanel": "grid-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "getonboardparisrome",
    "iconBackground": "#ffffff",
    "playerPanel": "player-table-{{player_id}}",
    "playerPanelOffset": 10,
    "css": "#jump-controls { display: none; } #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "oasis",
    "playerPanel": "board_{{player_id}}",
    "playerPanelOffset": 10,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "vaalbara",
    "iconBackground": "#ffffff",
    "playerPanel": ".vlb_zone_title > h2 > span:last-child",
    "playerPanelOffset": 0,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "ultimaterailroads",
    "iconBackground": "#e5d6d1",
    "playerPanel": ".nameslot > h3",
    "playerPanelOffset": 20,
    "bottomPanel": "limbo",
    "bottomPanelOffset": 10,
    "css": ".button_top { display: none; } #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "russianrailroads",
    "top": "100px",
    "playerPanel": ".nameslot > h3",
    "playerPanelOffset": 20,
    "bottomPanel": "limbo",
    "bottomPanelOffset": 10,
    "css": ".button_top { display: none; }"
  },
  {
    "name": "saintpetersburg",
    "playerPanel": "stp_playertable_{{player_id}}_wrap",
    "playerPanelOffset": 10,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "obsession",
    "boardPanel": "builderMarket",
    "playerPanel": "playerArea-{{player_id}}",
    "playerPanelOffset": 10,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "beyondthesun",
    "playerPanel": "bts-playerArea{{player_id}}",
    "iconBackground": "#a4bdd5",
    "iconShadow": "#ffffff",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "elawa",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#bga-jump-to_controls { display: none; } #tables { padding-left: 45px; }"
  },
  {
    "name": "locomomo",
    "iconBackground": "#a3c268",
    "playerPanel": "loc_player-board-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "caverna",
    "top": "90px",
    "iconBackground": "#c7cccd",
    "playerPanel": "resources-bar-holder-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; } #position-wrapper { padding-left: 10px; }"
  },
  {
    "name": "marcopolo",
    "playerPanel": "playerMat-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "marcopolotwo",
    "playerPanel": "playerMat-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "nidavellir",
    "iconBackground": "#cfd1d0",
    "iconShadow": "transparent",
    "playerPanel": ".player-board-name",
    "css": "#game_play_area { border-left: 50px solid #1e1e20; padding-left: 2px; } #tabs-container { min-width: 200px; overflow: hidden; } @media (min-width: 850px) { #tabs-container { margin-right: 0px !important; } }"
  },
  {
    "name": "bloodrage",
    "iconShadow": "#ffffff",
    "playerPanel": ".br-clan-wrapper > h2",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "parks",
    "boardPanel": "pks-board",
    "playerPanel": "pks-playerBoard{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "rollforthegalaxy",
    "playerPanel": "tableau_panel_{{player_id}}",
    "css": ".tableau_panel, #roll_infos { padding-left: 50px; }"
  },
  {
    "name": "sushigo",
    "playerPanel": "row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "sushigoparty",
    "playerPanel": "row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "barenpark",
    "playerPanel": "bp-player-area-{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "clansofcaledonia",
    "playerPanel": "playerboard_row_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "tokaido",
    "playerPanel": "#tkd_game_area > #collections > div > h3",
    "playerPanelOffset": 20,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "myshelfie",
    "playerPanel": "shelf_{{player_id}}",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "carnegie",
    "playerPanel": "company_block_{{player_id}}",
    "iconBackground": "#97a09b",
    "iconShadow": "transparent",
    "css": ".cng_topbutton { display: none; } #game_play_area { padding-left: 50px; }",
    "menuCss": "#cde-floating-menu-score > .fa-star { background-image: none; } #cde-floating-menu-score > .fa-star:before { content: \"\\f005\" !important; } .player-board { background-color: #97a09b; }",
  },
  {
    "name": "dicehospital",
    "playerPanel": "dhi-board_{{player_id}}",
    "css": " "
  },
  {
    "name": "dicehospitaler",
    "playerPanel": "sheet_{{player_id}}",
    "boardPanel": "game",
    "css": " "
  },
  {
    "name": "sagani",
    "playerPanel": "map-container-{{player_id}}",
    "bottomPanel": "sag-intermezzo-spaces",
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "hardback",
    "playerPanel": "area_{{player_id}}",
    "playerPanelOffset": -70,
    "css": "#game_play_area { padding-left: 50px; }"
  },
  {
    "name": "rollandbump",
    "iconBackground": "#d7d0cd",
    "playerPanel": "#rnb_players > div > h2 > span",
    "playerPanelOffset": 15,
    "bottomPanel": "rnb_rewards",
    "css": "#game_play_area { padding-left: 40px; }",
  },
  {
    "name": "lagranja",
    "playerPanel": "playerContainer-{{player_id}}",
  },
  {
    "name": "draftosaurus",
    "playerPanel": "board-{{player_id}}",
    "playerPanelOffset": 35,
  },
  {
    "name": "rauha",
    "iconBackground": "#e7e1da",
    "playerPanel": "board-{{player_id}}",
  },
  {
    "name": "lostseas",
    "iconBackground": "#8ddefc",
    "playerPanel": "ls_playertitle_{{player_index_1}}",
    "playerPanelOffset": 50,
  },
  {
    "name": "gonutsfordonuts",
    "playerPanel": ".gnfd_playertable > .gnfd_playertablename",
    "playerPanelOffset": 10,
  },
  {
    "name": "oriflamme",
    "iconBackground": "#8aafc5",
    "playerPanel": "discard-{{player_id}}",
    "playerPanelOffset": 45,
    "css": "#game_play_area { padding-left: 35px; }",
  },
  {
    "name": "happycity",
    "iconBackground": "#b1dcf5",
    "playerPanel": "playerArea_{{player_id}}",
  },
  {
    "name": "doglover",
    "playerPanel": ".DOG-player-name",
    "css": " "
  },
  {
    "name": "automobiles",
    "top": "40vh",
    "left": "1em",
    "iconBorder": "#ffffff",
    "playerPanel": "AMBPlayArea_{{player_id}}",
    "css": "#AMBOtherPlayersLayout { padding-left: 65px; }"
  },
  {
    "name": "viamagica",
    "iconBackground": "#e6e6fa",
    "playerPanelOffset": 15,
    "playerPanel": "vmg_playername_{{player_id}}",
    "css": "#game_play_area { padding-left: 40px; }"
  },
  {
    "name": "trektwelve",
    "playerPanel": "board_{{player_id}}",
    "iconBackground": "#efd6a1",
    "css": "#upback { display: none; }",
    "menuCss": "#upback { display: none; }"
  },
  {
    "name": "troyesdice",
    "playerPanel": "td_player_board_{{player_id}}",
    "iconBackground": "#eddac5",
    "playerPanelOffset": 10
  },
  {
    "name": "kingsguild",
    "playerPanel": "playerboardwrap_{{player_id}}",
    "playerPanelOffset": -5
  },
  {
    "name": "cubosaurs",
    "playerPanel": "cbsr_playername_{{player_id}}",
  },
  {
    "name": "newfrontiers",
    "iconBackground": "#afafaf",
    "iconBorder": "#000000",
    "iconShadow": "#ffffff",
    "playerPanel": "empire_{{player_id}}",
    "boardPanel": "smalldev",
    "boardPanelText": "#choose_action_label > span",
    "css": ".nft_topbutton { display: none; }",
    "menuCss": "html.nft_background_space .player-board { background-color: #333333 !important; } #goto_wrap { top: -5px; } "
  },
  {
    "name": "jumpdrive",
    "iconBackground": "#888888",
    "iconBorder": "#000000",
    "iconShadow": "#ffffff",
    "playerPanel": "jdr-tableau-{{player_id}}",
  },
  {
    "name": "cityofthebigshoulders",
    "playerPanel": "player_{{player_id}}",
    "bottomPanel": "available_shares_wrapper"
  },
  {
    "name": "thebuilders",
    "playerPanel": "playercoinicon_{{player_id}}",
    "playerPanelOffset": 20
  },
  {
    "name": "thebuildersantiquity",
    "playerPanel": "playercoinicon_{{player_id}}",
    "playerPanelOffset": 20
  },
  {
    "name": "ageofcivilization",
    "playerPanel": "playertable_{{player_id}}",
    "boardPanel": "my_expandable",
    "boardPanelText": "#specttechtitle",
  },
  {
    "name": "crusadersthywillbedone",
    "playerPanel": "CRUPlayerTWBDBoard_{{player_id}}",
    "playerPanelOffset": 100
  },
  {
    "name": "numberdrop",
    "playerPanel": "sheet-{{player_id}}",
    "iconBackground": "#ffffff"
  },
  {
    "name": "eminentdomain",
    "iconBackground": "#dadada",
    "iconBorder": "#000000",
    "iconShadow": "#ffffff",
    "playerPanel": ".side_title > span",
    "playerPanelOffset": 20,
    "menuCss": "#player-board { background-color: #3c4249; }"
  },
  {
    "name": "glow",
    "iconBackground": "#ffffff",
    "playerPanel": "player-table-{{player_id}}",
  },
  {
    "name": "lookatthestars",
    "iconBackground": "#ffffff",
    "playerPanel": "player-table-{{player_id}}",
    "css": "#jump-controls { display: none; } #game_play_area { padding-left: 50px; }"
  },
  {
    "name": "dungeonpetz",
    "boardPanel": "progress_board",
    "playerPanel": ".player-board-dp > .shopping-cart-wrapper > .side_title",
    "playerPanelOffset": 20,
    "bottomPanel": "happyland"
  },
  {
    "name": "myfirstcastlepanic",
    "iconBackground": "#edd9c1",
    "playerPanel": "playername_{{player_index_1}}",
    "playerPanelOffset": 15,
    "css": "#game_play_area { padding-left: 30px; }"
  },
  {
    "name": "eriantys",
    "iconBackground": "#ffffff",
    "playerPanel": "school_{{player_id}}",
    "css": "#players_school { max-height: initial !important; } #game_play_area { padding-left: 50px; }",
    "menuCss": ".player-board { background-color: #b0d1e9; }"
  },
  {
    "name": "theisleofcats",
    "playerPanel": "tioc-player-board-{{player_id}}",
  },
  {
    "name": "tucano",
    "iconBackground": "#a5cdbf",
    "playerPanel": "player-{{player_id}}-tableau",
    "playerPanelOffset": 30
  },
  {
    "name": "steamworks",
    "boardPanel": "supply_sources",
    "playerPanel": "areaForPlayer_{{player_id}}",
  },
  {
    "name": "nippon",
    "playerPanel": "player_space_{{player_id}}",
    "bottomPanel": "sideboard_anchor",
  },
  {
    "name": "rainforest",
    "playerPanel": "playerPanel_{{player_id}}",
  },
  {
    "name": "homesteaders",
    "playerPanel": ".boardheader",
    "playerPanelOffset": 30,
    "bottomPanel": "bottom",
  },
  {
    "name": "chocolatefactory",
    "playerPanel": "playerMat_{{player_id}}",
    "playerPanelOffset": 50,
  },
  {
    "name": "dicedtomatoes",
    "top": "140px",
    "playerPanel": "player_mat_{{player_id}}",
  },
];

export default defaultGames;