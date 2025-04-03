import { Game } from "./configuration";

const defaultGames: Partial<Game>[] = [
	{
		name: "mycity",
		iconBackground: "#d8ba7f",
		iconBackgroundDark: "#302317",
		iconColorDark: "#eee",
		iconShadowDark: "#777",
		playerPanel: "cty_board_{{player_id}}",
		playerPanelOffset: -10,
		css: " ",
	},
	{
		name: "mycityrb",
		iconBackground: "#d8ba7f",
		iconBackgroundDark: "#302317",
		iconColorDark: "#eee",
		iconShadowDark: "#777",
		playerPanel: "cty_board_{{player_id}}",
		bottomPanel: "cty_proba",
		css: " ",
	},
	{
		name: "abyss",
		iconBackground: "#36697c",
		iconBackgroundDark: "#36697c",
		iconColor: "#eee",
		iconColorDark: "#eee",
		playerPanel: "player-panel-{{player_id}}",
		css: ".desktop_version #centered-table { margin-left: 46px; }",
	},
	{
		name: "conspiracy",
		position: "bottom",
		bottom: "140px",
		left: "12px",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#36697c",
		iconBackgroundDark: "#36697c",
		iconColor: "#eee",
		iconColorDark: "#eee",
		iconShadow: "#000",
		iconShadowDark: "#000",
		css: ".show-playermat-button { visibility: hidden; }",
	},
	{
		name: "thurnandtaxis",
		playerPanel: "miniboard_{{player_id}}",
		css: "#thurntaxis_board, .desktop_version #page-title { margin-left: 55px; }",
	},
	{
		name: "seasons",
		position: "bottom",
		playerPanel: "anchor_player_{{player_id}}",
		css: ".desktop_version .tableau { margin-left: 46px; } .anchor-up { display: none; } .show-player-tableau { visibility: hidden; }",
	},
	{
		name: "azul",
		position: "bottom",
		playerPanel: "player-hand-{{player_id}}",
		iconBackground: "#36697c",
		iconBackgroundDark: "#36697c",
		iconColor: "#eee",
		iconColorDark: "#eee",
		iconShadow: "#000",
		iconShadowDark: "#000",
		css: " ",
	},
	{
		name: "wingspan",
		position: "auto",
		playerPanel: "aviary_{{player_id}}",
		iconBackground: "#fff",
		css: ".desktop_version #wsp_opponent_board_area { padding-left: 40px; }",
	},
	{
		name: "architectsofthewestkingdom",
		playerPanel: "player{{player_id}}",
		css: ".desktop_version #page-title { margin-left: 52px; } .desktop_version #pagesection_gameview { padding-left: 52px; }",
	},
	{
		name: "amerigo",
		playerPanel: "playersection_{{player_id}}",
		boardPanel: "tower_storageboard",
	},
	{
		name: "agricola",
		playerPanel: "player-board-resizable-{{player_id}}",
		css: "#position-wrapper { padding-left: 52px; }",
		iconBackground: "#87c147",
		iconBackgroundDark: "#28621d"
	},
	{
		name: "akropolis",
		top: "100px",
		playerPanel: "player-table-{{player_id}}",
		css: "#jump-controls { display: none; }",
	},
	{
		name: "villagers",
		playerPanel: "vil_village_{{player_id}}",
		css: ".desktop_version #villages { margin-left: 50px; }",
	},
	{
		name: "spots",
		playerPanel: "spt-cards{{player_id}}",
		css: ".desktop_version #spt-gameArea { margin-left: 25px; }",
	},
	{
		name: "astra",
		playerPanel: "tbp-playerCards-{{player_id}}",
		css: ".desktop_version #tbp { margin-left: 50px; }",
	},
	{
		name: "earth",
		top: "40vh",
		boardPanel: "ea-area-common",
		playerPanel: "ea-area-player-{{player_id}}",
		css: "#ea-shortcut-area { visibility: hidden; } .ea-player-panel-row:has(>.bx-checkbox-switch>#ea-shortcuts-checkbox) { display: none; }",
	},
	{
		name: "earthabundance",
		top: "40vh",
		boardPanel: "ea-area-common",
		playerPanel: "ea-area-player-{{player_id}}",
		css: "#ea-shortcut-area { visibility: hidden; } .ea-player-panel-row:has(>.bx-checkbox-switch>#ea-shortcuts-checkbox) { display: none; }",
	},
	{
		name: "gizmos",
		playerPanel: "gizmo_track_{{player_id}}",
	},
	{
		name: "potionexplosion",
		playerPanel: "playerArea_{{player_id}}",
		bottomPanel: "bottom_panel",
		css: ".desktop_version #game_play_area { margin-left: 50px; }",
	},
	{
		name: "spacebase",
		playerPanel: "playerTable_{{player_id}}",
		playerPanelOffset: 45,
		iconColor: "#eee",
		iconBackground: "#2a0620",
		iconBackgroundDark: "#2a0620",
		iconShadow: "#918e8e",
		iconShadowDark: "#918e8e",
		css: ".desktop_version #game_play_area { margin-left: 50px; }",
	},
	{
		name: "raceforthegalaxy",
		playerPanel: "tableau_panel_{{player_id}}",
		iconBackground: "#a3adb7",
	},
	{
		name: "greatwesterntrail",
		top: "100px",
		playerPanel: "player_area_{{player_id}}",
		css: ".desktop_version #game_play_area_wrap { padding-left: 50px; }",
	},
	{
		name: "throughtheagesnewstory",
		playerPanel: "player_tableau_wrap_{{player_id}}",
		playerPanelOffset: 45,
		bottomPanel: "common_tactics",
		bottomPanelOffset: 45,
	},
	{
		name: "throughtheages",
		playerPanel: "player_tableau_{{player_id}}",
		playerPanelOffset: 45,
	},
	{
		name: "getonboard",
		playerPanel: "player-table-{{player_id}}",
		css: "#jump-controls { display: none; }",
	},
	{
		name: "lumen",
		playerPanel: "player-table-{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "gardennation",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#919544",
		iconBackgroundDark: "#5f651a",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "tapestry",
		top: "90px",
		playerPanel: "playerArea_{{player_id}}",
		iconBackgroundDark: "#56648f",
		bottomPanel: "game_wrapper_bottom",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "resarcana",
		playerPanel: "player_area_{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "innovation",
		playerPanel: "player_{{player_id}}",
		css: ".desktop_version .player { margin-left: 50px; }",
	},
	{
		name: "railroadink",
		iconBackground: "#bfdef9",
		iconBackgroundDark: "#415c71",
		playerPanel: "player-area-{{player_id}}",
		css: ".desktop_version #all-players { padding-left: 50px; }",
	},
	{
		name: "viticulture",
		playerPanel: "playerboard_row_{{player_id}}",
		css: " ",
	},
	{
		name: "hadara",
		playerPanel: "game_board_{{player_id}}",
		playerPanelOffset: 10,
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "gogoa",
		playerPanel: "goa-holder-{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	{
		name: "anachrony",
		playerPanel: "player{{player_id}}",
		css: "div.playeroverall > div:last-child { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "crypt",
		playerPanel: "player-area-{{player_id}}",
	},
	{
		name: "evergreen",
		iconBackground: "#ffffff",
		playerPanel: "grid-{{player_id}}",
	},
	{
		name: "getonboardparisrome",
		iconBackground: "#ffffff",
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 10,
		css: "#jump-controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "oasis",
		playerPanel: "board_{{player_id}}",
		playerPanelOffset: 10,
	},
	{
		name: "vaalbara",
		iconBackground: "#ffffff",
		iconBackgroundDark: "#3c5f77",
		playerPanel: ".vlb_zone_title > h2 > span:last-child",
	},
	{
		name: "ultimaterailroads",
		iconBackground: "#e5d6d1",
		iconBackgroundDark: "#b5552b",
		playerPanel: ".nameslot > h3",
		playerPanelOffset: 20,
		bottomPanel: "limbo",
		bottomPanelOffset: 10,
		css: ".button_top { display: none; }",
	},
	{
		name: "russianrailroads",
		top: "100px",
		playerPanel: ".nameslot > h3",
		playerPanelOffset: 20,
		bottomPanel: "limbo",
		bottomPanelOffset: 10,
		css: ".button_top { display: none; }",
	},
	{
		name: "saintpetersburg",
		playerPanel: "stp_playertable_{{player_id}}_wrap",
		playerPanelOffset: 10,
	},
	{
		name: "obsession",
		boardPanel: "builderMarket",
		playerPanel: "playerArea-{{player_id}}",
		playerPanelOffset: 10,
	},
	{
		name: "beyondthesun",
		playerPanel: "bts-playerArea{{player_id}}",
		iconColor: "#eee",
		iconBackground: "#40678c",
		iconBackgroundDark: "#40678c",
	},
	{
		name: "elawa",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #tables { padding-left: 45px; }",
		iconBackgroundDark: "#6a552f"
	},
	{
		name: "locomomo",
		iconBackground: "#a3c268",
		iconBackgroundDark: "#566534",
		playerPanel: "loc_player-board-{{player_id}}",
	},
	{
		name: "caverna",
		top: "90px",
		iconBackground: "#c7cccd",
		playerPanel: "resources-bar-holder-{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } #position-wrapper { padding-left: 10px; }",
	},
	{
		name: "marcopolo",
		playerPanel: "playerMat-{{player_id}}",
	},
	{
		name: "marcopolotwo",
		playerPanel: "playerMat-{{player_id}}",
	},
	{
		name: "bloodrage",
		playerPanel: ".br-clan-wrapper > h2",
	},
	{
		name: "parks",
		boardPanel: "pks-board",
		playerPanel: "pks-playerBoard{{player_id}}",
	},
	{
		name: "rollforthegalaxy",
		playerPanel: "tableau_panel_{{player_id}}",
		css: ".desktop_version .tableau_panel, .desktop_version #roll_infos { padding-left: 50px; }",
	},
	{
		name: "sushigo",
		playerPanel: "row_{{player_id}}",
	},
	{
		name: "sushigoparty",
		playerPanel: "row_{{player_id}}",
	},
	{
		name: "barenpark",
		playerPanel: "bp-player-area-{{player_id}}",
	},
	{
		name: "clansofcaledonia",
		playerPanel: "playerboard_row_{{player_id}}",
	},
	{
		name: "tokaido",
		playerPanel: "#tkd_game_area > #collections > div > h3",
		playerPanelOffset: 20,
	},
	{
		name: "myshelfie",
		playerPanel: "shelf_{{player_id}}",
	},
	{
		name: "carnegie",
		playerPanel: "company_block_{{player_id}}",
		iconBackground: "#97a09b",
		iconShadow: "transparent",
		css: ".cng_topbutton { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "dicehospital",
		playerPanel: "dhi-player_{{player_id}}",
		css: " ",
	},
	{
		name: "dicehospitaler",
		playerPanel: "sheet_{{player_id}}",
		boardPanel: "game",
		css: " ",
	},
	{
		name: "sagani",
		playerPanel: "map-container-{{player_id}}",
		bottomPanel: "sag-intermezzo-spaces",
	},
	{
		name: "hardback",
		playerPanel: "area_{{player_id}}",
	},
	{
		name: "rollandbump",
		iconBackground: "#d7d0cd",
		playerPanel: "#rnb_players > div > h2 > span",
		playerPanelOffset: 15,
		bottomPanel: "rnb_rewards",
		css: ".desktop_version #game_play_area { padding-left: 40px; }",
	},
	{
		name: "lagranja",
		playerPanel: "playerContainer-{{player_id}}",
	},
	{
		name: "draftosaurus",
		playerPanel: "board-{{player_id}}",
		playerPanelOffset: 35,
	},
	{
		name: "rauha",
		iconBackground: "#e7e1da",
		playerPanel: "board-{{player_id}}",
	},
	{
		name: "lostseas",
		iconBackground: "#8ddefc",
		iconBackgroundDark: "#325a67",
		playerPanel: "#ls_main .ls_playertitle",
		playerPanelOffset: 50,
	},
	{
		name: "gonutsfordonuts",
		playerPanel: ".gnfd_playertable > .gnfd_playertablename",
		playerPanelOffset: 10,
	},
	{
		name: "oriflamme",
		iconColor: "#eee",
		iconBackground: "#084864",
		iconBackgroundDark: "#084864",
		playerPanel: "discard-{{player_id}}",
		playerPanelOffset: 45,
		css: ".desktop_version #game_play_area { padding-left: 35px; }",
	},
	{
		name: "happycity",
		iconBackground: "#b1dcf5",
		iconBackgroundDark: "#084864",
		playerPanel: "playerArea_{{player_id}}",
	},
	{
		name: "doglover",
		playerPanel: ".DOG-player-name",
		css: " ",
	},
	{
		name: "automobiles",
		top: "40vh",
		left: "1em",
		iconBackground: "#ffffff",
		iconBackgroundDark: "#272a2f",
		iconShadowDark: "#eee",
		iconColorDark: "#eee",
		playerPanel: "AMBPlayArea_{{player_id}}",
		css: ".desktop_version #AMBOtherPlayersLayout { padding-left: 65px; }",
	},
	{
		name: "viamagica",
		iconBackground: "#e6e6fa",
		playerPanelOffset: 15,
		playerPanel: "vmg_playername_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 40px; }",
	},
	{
		name: "trektwelve",
		playerPanel: "board_{{player_id}}",
		iconBackground: "#efd6a1",
		iconBackgroundDark: "#75593e",
		css: "#upback, .show-sheet-button { display: none; }",
	},
	{
		name: "troyesdice",
		playerPanel: "td_player_board_{{player_id}}",
		playerPanelOffset: 10,
	},
	{
		name: "kingsguild",
		playerPanel: "playerboardwrap_{{player_id}}",
		playerPanelOffset: -5,
	},
	{
		name: "cubosaurs",
		playerPanel: "cbsr_playername_{{player_id}}",
	},
	{
		name: "newfrontiers",
		iconColorDark: "#000",
		iconBackground: "#afafaf",
		iconBackgroundDark: "#afafaf",
		iconBorder: "#000",
		iconBorderDark: "#000",
		iconShadow: "#666",
		iconShadowDark: "#666",
		playerPanel: "empire_{{player_id}}",
		boardPanel: "smalldev",
		boardPanelText: "#choose_action_label > span",
		css: ".nft_topbutton { display: none; }",
	},
	{
		name: "jumpdrive",
		iconBackground: "#afafaf",
		iconBorder: "#000",
		iconShadow: "#666",
		playerPanel: "jdr-tableau-{{player_id}}",
	},
	{
		name: "cityofthebigshoulders",
		playerPanel: "player_{{player_id}}",
		boardPanel: "available_companies_wrapper",
		bottomPanel: "board_bottom"
	},
	{
		name: "thebuilders",
		playerPanel: "playercoinicon_{{player_id}}",
		playerPanelOffset: 20,
	},
	{
		name: "thebuildersantiquity",
		playerPanel: "playercoinicon_{{player_id}}",
		playerPanelOffset: 20,
	},
	{
		name: "ageofcivilization",
		playerPanel: "playertable_{{player_id}}",
		boardPanel: "rivers",
	},
	{
		name: "crusadersthywillbedone",
		playerPanel: "CRUPlayerTWBDBoard_{{player_id}}",
		playerPanelOffset: 100,
	},
	{
		name: "numberdrop",
		playerPanel: "sheet-{{player_id}}",
		iconBackground: "#ffffff",
	},
	{
		name: "eminentdomain",
		iconBackground: "#dadada",
		iconBorder: "#000000",
		iconShadow: "#666",
		playerPanel: ".side_title > span",
		playerPanelOffset: 20,
		bottomPanel: "common_space",
	},
	{
		name: "glow",
		iconBackground: "#fff",
		playerPanel: "player-table-{{player_id}}",
	},
	{
		name: "lookatthestars",
		iconBackground: "#fff",
		playerPanel: "player-table-{{player_id}}",
		css: "#jump-controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "dungeonpetz",
		boardPanel: "progress_board",
		playerPanel: ".player-board-dp > .shopping-cart-wrapper > .side_title",
		playerPanelOffset: 20,
		bottomPanel: "happyland",
	},
	{
		name: "myfirstcastlepanic",
		playerPanel: "playername_{{player_index_1}}",
		playerPanelOffset: 15,
		css: ".desktop_version #game_play_area { padding-left: 30px; }",
	},
	{
		name: "eriantys",
		iconBackground: "#ffffff",
		playerPanel: "school_{{player_id}}",
		css: "#players_school { max-height: initial !important; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "theisleofcats",
		playerPanel: "tioc-player-board-{{player_id}}",
	},
	{
		name: "tucano",
		iconBackground: "#a5cdbf",
		iconBackgroundDark: "#326755",
		playerPanel: "player-{{player_id}}-tableau",
		playerPanelOffset: 30,
	},
	{
		name: "steamworks",
		boardPanel: "supply_sources",
		playerPanel: "areaForPlayer_{{player_id}}",
	},
	{
		name: "nippon",
		playerPanel: "player_space_{{player_id}}",
		bottomPanel: "sideboard_anchor",
	},
	{
		name: "rainforest",
		playerPanel: "playerPanel_{{player_id}}",
	},
	{
		name: "homesteaders",
		playerPanel: ".boardheader",
		playerPanelOffset: 30,
		bottomPanel: "bottom",
	},
	{
		name: "chocolatefactory",
		playerPanel: "playerMat_{{player_id}}",
		playerPanelOffset: 50,
	},
	{
		name: "dicedtomatoes",
		top: "140px",
		playerPanel: "player_mat_{{player_id}}",
	},
	{
		name: "bunnykingdom",
		top: "160px",
		iconBackground: "#d3f8fc",
		playerPanel: ".BK-player-tableux-name",
		playerPanelOffset: 60,
	},
	{
		name: "isleoftrainsallaboard",
		myPanel: "#mycards_name",
		playerPanel: ".container1 > .board5 > .board6",
		playerPanelOffset: 20,
		css: "#zoom-controls { right: 0px; justify-content: flex-end; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "alhambra",
		playerPanel: "alhambra-wrapper-{{player_id}}",
	},
	{
		name: "applejack",
		playerPanel: "wrapper_player_{{player_id}}",
	},
	{
		name: "rollintotown",
		playerPanel: "rt-holder-{{player_id}}",
	},
	{
		name: "riftvalleyreserve",
		playerPanel: "rvr-map-index-{{player_index}}",
		playerPanelOffset: 20,
	},
	{
		name: "afterus",
		playerPanel: "player-table-{{player_id}}-deck",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "cantstopexpress",
		playerPanel: ".containermepad",
	},
	{
		name: "livingforest",
		playerPanel: "lvf_playerboard_{{player_id}}",
	},
	{
		name: "pandemic",
		myPanel: "#pdm-myhand",
		playerPanel: "#o-otherhands .pdm-hand",
	},
	{
		name: "canvas",
		boardPanel: "canvas-board",
		boardPanelText: "#bga-jump-to_canvas-board > span",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "forbiddenisland",
		playerPanel: "player_adventurer_{{player_id}}",
		bottomPanel: "flood_deck_area",
		iconBackground: "#69b7fc",
		iconBackgroundDark: "#02357e"
	},
	{
		name: "forestshuffle",
		playerPanel: "FOStable_{{player_id}}",
		position: "bottom"
	},
	{
		name: "ontour",
		playerPanel: "player_name_{{player_id}}",
	},
	{
		name: "knarr",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#dfeaeb",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "legendraiders",
		playerPanel: "pl{{player_id}}_area",
	},
	{
		name: "sixtyone",
		playerPanel: "sxt_player_area_{{player_id}}",
	},
	{
		name: "mindup",
		playerPanel: "player-table-{{player_id}}",
	},
	{
		name: "seasaltpaper",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#778ea9",
		iconBackgroundDark: "#1f4b7a"
	},
	{
		name: "goldblivion",
		iconBackground: "#537955",
		iconBackgroundDark: "#415846",
		playerPanel: "gb-area-player-{{player_id}}",
		bottomPanel: "gb-discarded-help",
		css: "#gb-shortcut-area { display: none; } .desktop_version #gb-area-full { padding-left: 50px; }",
	},
	{
		name: "colorado",
		playerPanel: "board_{{player_id}}",
		boardPanel: "main_board"
	},
	{
		name: "zuuli",
		playerPanel: "div[id^=\"inside\"]",
		myPanel: "#inside-me",
		top: "140px",
	},
	{
		name: "rolltothetopjourneys",
		playerPanel: "player_map_{{player_id}}",
	},
	{
		name: "quibbles",
		iconBackground: "#99639c",
		playerPanel: "player-area-{{player_id}}",
		bottomPanel: "quibbles-ui-row-1"
	},
	{
		name: "farmclub",
		playerPanel: "player-board-wrapper-{{player_id}}",
	},
	{
		name: "ginkgopolis",
		playerPanel: "#visiblePlayerBoards > .whiteblock",
	},
	{
		name: "catcafe",
		playerPanel: "ctc_player_board_{{player_id}}",
	},
	{
		name: "zooloretto",
		playerPanel: "playercards_{{player_index_1}}",
		bottomPanel: "playeraid",
	},
	{
		name: "sapiens",
		playerPanel: "playerArea_{{player_id}}",
	},
	{
		name: "thenumber",
		playerPanel: ".tn_player_board",
	},
	{
		name: "uptown",
		playerPanel: ".uptown_player_area ",
		myPanel: "#uptown_mytiles_wrap",
	},
	{
		name: "dragoncastle",
		playerPanel: ".playerTable",
	},
	{
		name: "sahwari",
		playerPanel: "leaderBoardZone_{{player_id}}",
	},
	{
		name: "quetzal",
		playerPanel: "player-area-{{player_id}}",
	},
	{
		name: "boomerangaustralia",
		playerPanel: "playertable_{{player_id}}",
	},
	{
		name: "boomerangeurope",
		playerPanel: "playertable_{{player_id}}",
	},
	{
		name: "boomerangusa",
		playerPanel: "playertable_{{player_id}}",
	},
	{
		name: "scriptoria",
		playerPanel: ".pupitrePlayerContainer",
		myPanel: "#pupitreCurrentPlayer",
		css: "#zoneboard { position: relative; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "mechadream",
		playerPanel: "mad_playerboard_{{player_id}}",
	},
	{
		name: "dicesummoners",
		playerPanel: "#pagesection_gameview .playertable.whiteblock",
		boardPanel: "community_basic",
		bottomPanel: "community_spell",
	},
	{
		name: "carrara",
		playerPanel: "player_board_wrap_{{player_id}}",
	},
	{
		name: "fleet",
		playerPanel: "playertable_{{player_id}}_wrap",
		bottomPanel: "auction_bottom"
	},
	{
		name: "faraway",
		playerPanel: ".fa_zone.fa_zone_title",
	},
	{
		name: "humanity",
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "research-board",
		boardPanelText: "#bga-jump-to_board-1 > span",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "skatelegend",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "almadi",
		myPanel: "#playgroundCurrentPlayer",
		playerPanel: ".playgroundContainer",
	},
	{
		name: "castlesofburgundy",
		playerPanel: "player_block_{{player_id}}",
		boardPanel: "help_noTooltip_wrap",
		boardPanelText: "#help_noTooltip_title > span",
		bottomPanel: "discardedTiles_display_wrap",
	},
	{
		name: "patchwork",
		playerPanel: "#central > .tableau",
		boardPanel: "mainboard",
	},
	{
		name: "gangsta",
		playerPanel: "playertitle_{{player_id}}",
	},
	{
		name: "railwaysoftheworld",
		playerPanel: "rotw_playertable_{{player_id}}_wrap",
		boardPanel: "hideShowOpCards",
	},
	{
		name: "wizardsgrimoire",
		playerPanel: "player-table-{{player_id}}",
	},
	{
		name: "deus",
		playerPanel: "deus_playerboard_{{player_id}}",
		bottomPanel: "deus_common_components"
	},
	{
		name: "envelopesofcash",
		position: "bottom",
		playerPanel: "eoc-played{{player_id}}-outer",
		boardPanel: "eoc-map-container",
		boardPanelText: "#eoc-nav0",
		css: "#eoc-nav { display: none; }",
	},
	{
		name: "quirkyquarks",
		position: "bottom",
		playerPanel: "QQ-questsZone-{{player_id}}",
		css: " "
	},
	{
		name: "goldwest",
		playerPanel: ".whiteblock:has(>.gw-player-board-wrap-wrap)",
	},
	{
		name: "moonriver",
		playerPanel: "player_table_{{player_id}}",
		playerPanelOffset: 25,
	},
	{
		name: "divideetimpera",
		playerPanel: "hand-{{player_id}}",
		playerPanelOffset: 35,
		boardPanel: "mission-board"
	},
	{
		name: "mantisfalls",
		playerPanel: "tableau_{{player_id}}",
		boardPanel: "tableau_actions",
		boardPanelText: "#tableau_actions > h3 > span"
	},
	{
		name: "chimerastation",
		playerPanel: "chs_playername_{{player_index_1}}",
		boardPanel: "chs_perks_wrap",
		boardPanelText: "#chs_perks_header > span"
	},
	{
		name: "nangaparbat",
		playerPanel: "np_playerboard_{{player_id}}_wrap",
	},
	{
		name: "dontgointhere",
		playerPanel: "dgit_player_{{player_id}}_header",
	},
	{
		name: "bigmonster",
		playerPanel: "{{player_id}}_scrollmap_wrapper",
		iconBackground: "#a9a7d7",
		iconBackgroundDark: "#352970"
	},
	{
		name: "khronos",
		playerPanel: "board_{{player_index_1}}",
		bottomPanel: "turn_slider"
	},
	{
		name: "tanghulu",
		playerPanel: "pl{{player_id}}_area",
	},
	{
		name: "cosmosempires",
		playerPanel: "player_{{player_id}}_container",
		iconBackground: "#aaabad",
		iconBackgroundDark: "#36384a"
	},
	{
		name: "fortheking",
		playerPanel: ".container1 .mycards .playernameclass",
		playerPanelOffset: 25,
		boardPanel: "centercard",
		boardPanelOffset: 50
	},
	{
		name: "balloonpop",
		playerPanel: "pad_{{player_id}}",
		playerPanelOffset: 60,
	},
	{
		name: "onceuponaforest",
		playerPanel: "playertable_{{player_id}}",
	},
	{
		name: "nautilus",
		playerPanel: "#player_domains_wrap, #opponent_domains_wrap",
		bottomPanel: "special_cards_discarded_wrap",
	},
	{
		name: "tinyfarms",
		playerPanel: "playerBoard_{{player_id}}",
		playerPanelOffset: 30,
	},
	{
		name: "fifteendays",
		playerPanel: "playerarea_{{player_id}}",
	},
	{
		name: "spiritsoftheforest",
		playerPanel: "playerarea_{{player_id}}",
		iconBackgroundDark: "#554171"
	},
	{
		name: "heat",
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "legend-table",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "heatchampionship",
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "legend-table",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "hydroracers",
		playerPanel: "j_{{player_id}}",
	},
	{
		name: "florenzacardgame",
		playerPanel: "board-florenza-player-{{player_id}}-card-container",
		playerPanelOffset: 45
	},
	{
		name: "rolledwest",
		playerPanel: "#other_players_board .whiteblock",
		myPanel: "#personal_info_wrapper"
	},
	{
		name: "heckinhounds",
		playerPanel: "playertable_{{player_id}}",
		iconBackground: "#4babb4",
		iconBackgroundDark: "#446501",
		css: " "
	},
	{
		name: "krakenup",
		playerPanel: ".playertablename",
		playerPanelOffset: 20
	},
	{
		name: "wastelandia",
		playerPanel: "player-mat-wrap-{{player_id}}",
		bottomPanel: "baddies-content-large"
	},
	{
		name: "hadrianswall",
		playerPanel: "player_{{player_id}}"
	},
	{
		name: "stupormundi",
		playerPanel: "playermat_{{player_id}}"
	},
	{
		name: "praga",
		playerPanel: "playerboard_{{player_id}}",
		position: "bottom",
		css: ".desktop_version #game_play_area { padding-left: 50px; } #uiPanel { position: fixed; top: 65px; margin-left: 7px !important; } #uiPanelBtn { display: none; } #uiPanel>.uibtn { background-color: #ebd5bd; margin-left: 0px; border-radius: 50%; width: 40px; height: 40px; box-shadow: rgb(0, 0, 0) 0px 0px 10px 0px; } #uiPanel { background-color: transparent; } #uiPanel>.uibtn:after { left: 4px; top: 4px; width: 32px; height: 32px; border-radius: 50%; } #uiPanel { height: 350px; }"
	},
	{
		name: "mutantcrops",
		playerPanel: "player-crops-{{player_id}}",
		playerPanelOffset: 40,
	},
	{
		name: "paxpamir",
		playerPanel: "player_tableau_{{player_id}}"
	},
	{
		name: "romirami",
		playerPanel: "rr-area-player-{{player_id}}",
		css: "#rr-shortcut-area, #rr-area-pref-shortcut { display: none !important; }",
	},
	{
		name: "bagofchips",
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "skin",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "thewolves",
		playerPanel: "wolves-player-container-{{player_id}}",
		boardPanel: "wolves-calendar"
	},
	{
		name: "terraformingmars",
		playerPanel: "#players_area .player_area",
		boardPanel: "main_board",
		bottomPanel: "allcards",
		css: "#bga_extension_sidebar { z-index: 999 !important; } .desktop_version #game_play_area { padding-left: 50px; } #ebd-body[data-localsetting_handplace=floating] #hand_area_buttons #hand_area_button_pop { background-color: #ebd5bd; } .darkmode #ebd-body[data-localsetting_handplace=floating] #hand_area_buttons #hand_area_button_pop { background-color: #b9b9b9; }"
	},
	{
		name: "ancientknowledge",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "captainflip",
		playerPanel: ".cf_title",
		bottomPanel: "o-help",
		iconBackground: "#87c0cc",
		iconBackgroundDark: "#07515f"
	},
	{
		name: "mastersofrenaissance",
		playerPanel: "{{player_id}}"
	},
	{
		name: "citadels",
		playerPanel: "city-{{player_id}}-container"
	},
	{
		name: "wordtraveler",
		playerPanel: "wot-word-cards-{{player_id}}-container"
	},
	{
		name: "starshipmerchants",
		playerPanel: "disp_{{player_id}}"
	},
	{
		name: "foreverhome",
		playerPanel: "player-table-{{player_id}}"
	},
	{
		name: "valeofeternity",
		playerPanel: "zone_title_{{player_index_1}}"
	},
	{
		name: "threethousandscoundrels",
		playerPanel: "leader_{{player_id}}",
		boardPanel: "board",
		css: ".desktop_version #game_play_area, #day_number { padding-left: 50px; }"
	},
	{
		name: "supermegaluckybox",
		playerPanel: ".smlb_playertable"
	},
	{
		name: "bohnanza",
		playerPanel: ".bean_field_block",
		boardPanel: "container_posted_offers",
		boardPanelText: "#container_posted_offers .to_translate:first-child",
		bottomPanel: "container_deck_of_cards"
	},
	{
		name: "championsofmidgard",
		playerPanel: "playerboard_p{{player_id}}",
		boardPanel: "availablelongboats",
		boardPanelText: "#availablelongboats .to_translate:first-child",
	},
	{
		name: "boreal",
		playerPanel: "pyramid_{{player_id}}",
		position: "bottom",
		css: "#board { left: -50px; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "amalfi",
		playerPanel: "playerZone_{{player_id}}",
		css: "#mainBoard { left: -50px; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "wonderfulkingdom",
		playerPanel: ".wk_zone_playername",
	},
	{
		name: "cheeztricks",
		playerPanel: "open_wrap_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 30px; }",
	},
	{
		name: "openseason",
		playerPanel: "playerZone_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } .keyhole { display: none; }",
	},
	{
		name: "pixies",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#5e8e3e",
		iconBackgroundDark: "#3d5c28",
	},
	{
		name: "rivervalleyglassworks",
		playerPanel: ".player_board_panel",
	},
	{
		name: "solstis",
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackground: "#4fb9e5",
		iconBackgroundDark: "#156584",
		css: " "
	},
	{
		name: "splendorduel",
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "cards-wrapper",
		boardPanelText: "#bga-jump-to_table-cards .bga-jump-to_label",
		css: "#bga-jump-to_controls { display: none; }",
		iconBackground: "#c4aec5",
		iconBackgroundDark: "#394260"
	},
	{
		name: "evolution",
		playerPanel: "species_wrap_{{player_id}}",
		css: ".eye_panelicon, .up_arrow { display: none; } .desktop_version #game_play_area { padding-left: 50px; }"
	},
	{
		name: "hiddenleaders",
		playerPanel: "player-head-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; } #tabs-container { margin-left: -60px; }",
		position: "bottom"
	},
	{
		name: "paxrenaissance",
		playerPanel: "pr_player_tableau_{{player_id}}",
		iconBackground: "#a78d59",
		iconBackgroundDark: "#5d493c"
	},
	{
		name: "neom",
		playerPanel: "neom-cityboard-{{player_id}}-goods",
	},
	{
		name: "newton",
		playerPanel: "player_game_board_{{player_id}}",
		boardPanel: "ntn_top_boards",
		playerPanelOffset: 20,
		css: ".default_to_carousel_view_on #bga_extension_sidebar { display: none; } .default_to_carousel_view_off .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "looot",
		playerPanel: "player_board_{{player_id}}",
		iconBackground: "#7a99b8",
		iconBackgroundDark: "#364c63",
	},
	{
		name: "glassroad",
		playerPanel: "playerboard_row_{{player_id}}",
		boardPanel: "board-row",
		bottomPanel: "history_section"
	},
	{
		name: "spellbook",
		playerPanel: "playername_{{player_id}}",
	},
	{
		name: "lancaster",
		playerPanel: "board_castle_name_p{{player_id}}",
	},
	{
		name: "flowers",
		playerPanel: "flw_playZone_{{player_id}}",
	},
	{
		name: "grund",
		playerPanel: "playerbox-{{player_id}}",
	},
	{
		name: "coalbaron",
		playerPanel: "board-{{player_id}}",
	},
	{
		name: "takenokolor",
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "rules-wrapper",
		iconBackground: "#93d4df",
		iconBackgroundDark: "#246975",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "draftandwriterecords",
		playerPanel: "dwr-area-player-{{player_id}}",
		bottomPanel: "dwr-area-pref",
		css: "#dwr-shortcut-area, #dwr-area-pref-shortcuts { display: none; }",
	},
	{
		name: "ethnos",
		playerPanel: "player_cardboard_{{player_id}}",
	},
	{
		name: "fourgardens",
		playerPanel: "player_zone_{{player_id}}",
	},
	{
		name: "middleages",
		playerPanel: "zone_playername_{{player_index_1}}",
	},
	{
		name: "azulsummerpavilion",
		playerPanel: "player-hand-{{player_id}}",
		playerPanelOffset: 40
	},
	{
		name: "pathofcivilization",
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "technology-board",
		boardPanelText: "#bga-jump-to_technology-board > span",
		css: "#bga-jump-to_controls { display: none; }",
	},
	{
		name: "batalladecoronas",
		playerPanel: "boc_castleWrapper:{{player_id}}",
	},
	{
		name: "festival",
		playerPanel: "fes-player-area-{{player_id}}",
		iconBackgroundDark: "#5f483a",
		iconShadow: "#666",
	},
	{
		name: "cosmoctopus",
		playerPanel: "csm-player{{player_id}}-cards-title",
		boardPanel: "csm-main"
	},
	{
		name: "harmonies",
		playerPanel: "player-table-{{player_id}}",
		iconBackgroundDark: "#817765"
	},
	{
		name: "chemicaloverload",
		playerPanel: "player-table-{{player_id}}-board",
	},
	{
		name: "cannonades",
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 15
	},
	{
		name: "botanicus",
		playerPanel: "botanicus-garden-board-holder-{{player_id}}",
		css: "#botanicus-tab-holder { display: none; }",
	},
	{
		name: "zookeepers",
		playerPanel: "zkp_playmat_container:{{player_id}}",
	},
	{
		name: "bonsai",
		playerPanel: "bon_player-{{player_id}}",
	},
	{
		name: "castlecombo",
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#a4d3e3",
		iconBackgroundDark: "#30839c"
	},
	{
		name: "dinogenics",
		playerPanel: ".opp_container",
		boardPanel: "main_board"
	},
	{
		name: "golems",
		playerPanel: "pl{{player_id}}_area"
	},
	{
		name: "fled",
		playerPanel: "fled_player-area-{{player_id}}",
		boardPanel: "fled_board-container",
		css: ".fled_sticky { position: initial; } #fled_player-areas { padding-top: 2em; }"
	},
	{
		name: "personanongrata",
		playerPanel: "prs_playerArea${{player_id}}",
		bottomPanel: "prs_publicArea"
	},
	{
		name: "capybarancapybara",
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackground: "#adb791",
		iconBackgroundDark: "#505544"
	},
	{
		name: "girafferaffe",
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackgroundDark: "#524d47",
		css: " "
	},
	{
		name: "refuge",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "rumbleplanet",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls { display: none; }",
		iconBackgroundDark: "#415b59"
	},
	{
		name: "stonespinearchitects",
		playerPanel: "sa-player-area-{{player_id}}",
	},
	{
		name: "lorenzo",
		playerPanel: "obrPlayerboardId_{{player_id}}",
	},
	{
		name: "bloodyinn",
		playerPanel: ".playertablename",
		boardPanel: "available_burials",
		boardPanelText: "#available_burials > h1",
		bottomPanel: "discard",
		css: "#bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	{
		name: "tulipandrose",
		playerPanel: "hand_{{player_id}}_block",
	},
	{
		name: "codexnaturalis",
		playerPanel: "map-player-name-{{player_id}}",
	},
	{
		name: "deliverance",
		playerPanel: "angel_area_{{player_color}}",
		boardPanel: "dlv_darkness_board_wrapper",
		boardPanelText: "#bga-jump-to_dlv_darkness_board > span",
		bottomPanel: "dlv_demons",
		css: "#bga-jump-to_controls { display: none; }"
	},
	{
		name: "revive",
		playerPanel: "player_{{player_id}}"
	},
	{
		name: "potionsofazerland",
		playerPanel: "playerBoard_{{player_id}}",
		boardPanel: "poa_mainBoard"
	},
	{
		name: "quadratacanada",
		playerPanel: "playertable_{{player_index_1}}"
	},
	{
		name: "deadcells",
		playerPanel: "dc-beheaded-{{player_id}}-board",
		boardPanel: "dc-annexe-combat-board-wrapper",
		boardPanelText: "#dc-scroll-to-annexe-board",
		bottomPanel: "dc-mutation-board",
		css: "#dc-scroll-to-boards { display: none; }"
	},
	{
		name: "elpasogwt",
		playerPanel: "gamezone-{{player_id}}",
		boardPanel: "secondary-boards"
	},
	{
		name: "fiftyfirststate",
		playerPanel: "faction_{{player_id}}",
	},
	{
		name: "monsterhex",
		playerPanel: "mon-player-{{player_id}}",
	},
	{
		name: "pioneerdaysproject",
		playerPanel: "playerbox-{{player_id}}",
	},
	{
		name: "thewhitecastle",
		playerPanel: "twc-player-area-{{player_id}}",
	},
	{
		name: "craftingthecosmos",
		playerPanel: ".ctc_board-section",
	},
	{
		name: "aquatica",
		playerPanel: "player-table-{{player_id}}",
	},
	{
		name: "bunnydrops",
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 50
	},
	{
		name: "cakemaster",
		playerPanel: ".cm-area-player",
		bottomPanel: "cm-area-player-aid-container",
		css: "#cm-button-to-top { display:none; } .desktop_version #game_play_area { margin-left: 50px; }"
	},
	{
		name: "piratas",
		playerPanel: "playmat_{{player_id}}",
		bottomPanel: "discard_wrap"
	},
	{
		name: "queenofscots",
		playerPanel: "player-table-{{player_id}}"
	},
	{
		name: "mesos",
		playerPanel: "player-board-{{player_id}}",
		playerPanelOffset: 20,
		iconBackground: "#bf1135",
		iconColor: "#eee",
		iconBackgroundDark: "#952c15",
		iconColorDark: "#eee",
	},
];

export default defaultGames;