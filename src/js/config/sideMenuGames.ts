import type { Game } from "./models";

const defaultGames: Record<string, Partial<Game>> = {
	abrachadabra: {
		playerPanel: "playertable_{{player_id}}",
	},
	abyss: {
		iconBackground: "#36697c",
		iconBackgroundDark: "#36697c",
		iconColor: "#eee",
		iconColorDark: "#eee",
		playerPanel: "player-panel-{{player_id}}",
		css: ".desktop_version #centered-table { margin-left: 46px; }",
	},
	afterus: {
		playerPanel: "player-table-{{player_id}}-deck",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	ageofcivilization: {
		playerPanel: "playertable_{{player_id}}",
		boardPanel: "rivers",
	},
	agricola: {
		playerPanel: "player-board-resizable-{{player_id}}",
		css: "#position-wrapper { padding-left: 52px; }",
		iconBackground: "#87c147",
		iconBackgroundDark: "#28621d"
	},
	aiye: {
		playerPanel: "aiye-player-area-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	akropolis: {
		top: "100px",
		playerPanel: "player-table-{{player_id}}",
		css: ".bga-jump-to_controls { display: none; }",
	},
	alhambra: {
		playerPanel: "alhambra-wrapper-{{player_id}}",
	},
	almadi: {
		myPanel: "#playgroundCurrentPlayer",
		playerPanel: ".playgroundContainer",
	},
	altay: {
		playerPanel: "ALTAYplayerArea-{{player_id}}",
	},
	amalfi: {
		playerPanel: "playerZone_{{player_id}}",
		css: "#mainBoard { left: -50px; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	amerigo: {
		playerPanel: "playersection_{{player_id}}",
		boardPanel: "tower_storageboard",
	},
	anachrony: {
		playerPanel: "player{{player_id}}",
		css: "div.playeroverall > div:last-child { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	ancientknowledge: {
		playerPanel: "player-table-{{player_id}}",
		iconBackgroundDark: "#644f5c",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	apiary: {
		playerPanel: "ap-player-area-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }"
	},
	applejack: {
		playerPanel: "wrapper_player_{{player_id}}",
	},
	aquatica: {
		playerPanel: "player-table-{{player_id}}",
	},
	arabella: {
		playerPanel: ".abl-player-board",
		boardPanel: ".abl-game-board",
		boardPanelText: "#game_play_area [data-tab-id=\"board\"] .abl-tab-bar-label",
		css: ".abl-tab-bar { display: none!important; }"
	},
	architectsofthewestkingdom: {
		playerPanel: "player{{player_id}}",
		css: ".desktop_version #page-title { margin-left: 52px; } .desktop_version #pagesection_gameview { padding-left: 52px; }",
	},
	arigato: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls, .vgincLib_layout_slider #bga_extension_sidebar { display: none; }"
	},
	astra: {
		playerPanel: "tbp-playerCards-{{player_id}}",
		css: ".desktop_version #tbp { margin-left: 50px; }",
	},
	automobiles: {
		top: "40vh",
		left: "1em",
		iconBackground: "#ffffff",
		iconBackgroundDark: "#272a2f",
		iconShadowDark: "#eee",
		iconColorDark: "#eee",
		playerPanel: "AMBPlayArea_{{player_id}}",
		css: ".desktop_version #AMBOtherPlayersLayout { padding-left: 65px; }",
	},
	azul: {
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
	azulqueensgarden: {
		playerPanel: "player-table-{{player_id}}",
		css: " ",
	},
	azulsummerpavilion: {
		playerPanel: "player-hand-{{player_id}}",
		playerPanelOffset: 20,
		iconBackgroundDark: "#663f24"
	},
	bagofchips: {
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "skin",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	balloonpop: {
		playerPanel: "pad_{{player_id}}",
		playerPanelOffset: 60,
	},
	barenpark: {
		playerPanel: "bp-player-area-{{player_id}}",
	},
	batalladecoronas: {
		playerPanel: "boc_castleWrapper:{{player_id}}",
	},
	beyond: {
		playerPanel: "byd-player-{{player_id}}",
		css: `#byd-players-area { padding-left: 50px; } [style*="transform: scale(0.6)"] #byd-players-area { padding-left: 83px; } [style*="transform: scale(0.8)"] #byd-players-area { padding-left: 63px; } [style*="transform: scale(1.2)"] #byd-players-area { padding-left: 42px; }`
	},
	beyondthesun: {
		playerPanel: "bts-playerArea{{player_id}}",
		iconColor: "#eee",
		iconBackground: "#40678c",
		iconBackgroundDark: "#40678c",
	},
	bigmonster: {
		playerPanel: "{{player_id}}_scrollmap_wrapper",
		iconBackground: "#a9a7d7",
		iconBackgroundDark: "#352970"
	},
	biome: {
		playerPanel: "player-table-{{player_id}}"
	},
	biomesofnilgiris: {
		playerPanel: "player_{{player_id}}",
		boardPanel: "playerHandWrapper",
		boardPanelText: "#playerHandWrapper>div:first-child"
	},
	bloodrage: {
		playerPanel: ".br-clan-wrapper > h2",
	},
	bloodyinn: {
		playerPanel: ".playertablename",
		boardPanel: "available_burials",
		boardPanelText: "#available_burials > h1",
		bottomPanel: "discard",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	bohnanza: {
		playerPanel: ".bean_field_block",
		boardPanel: "container_posted_offers",
		boardPanelText: "#container_posted_offers .to_translate:first-child",
		bottomPanel: "container_deck_of_cards"
	},
	bonsai: {
		playerPanel: "bon_player-{{player_id}}",
	},
	boomerangaustralia: {
		playerPanel: "playertable_{{player_id}}",
	},
	boomerangeurope: {
		playerPanel: "playertable_{{player_id}}",
	},
	boomerangusa: {
		playerPanel: "playertable_{{player_id}}",
	},
	boreal: {
		playerPanel: "pyramid_{{player_id}}",
		position: "bottom",
		css: "#board { left: -50px; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	botanicus: {
		playerPanel: "botanicus-garden-board-holder-{{player_id}}",
		css: "#botanicus-tab-holder { display: none; }",
	},
	bunnydrops: {
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 50
	},
	bunnykingdom: {
		top: "160px",
		iconBackground: "#d3f8fc",
		playerPanel: ".BK-player-tableux-name",
		playerPanelOffset: 60,
	},
	cakemaster: {
		playerPanel: ".cm-area-player",
		bottomPanel: "cm-area-player-aid-container",
		css: "#cm-button-to-top { display:none; } .desktop_version #game_play_area { margin-left: 50px; }"
	},
	cannonades: {
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 15
	},
	canvas: {
		boardPanel: "canvas-board",
		boardPanelText: "#bga-jump-to_canvas-board > span",
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	captainflip: {
		playerPanel: ".cf_title",
		bottomPanel: "o-help",
		iconBackground: "#87c0cc",
		iconBackgroundDark: "#07515f"
	},
	capybarancapybara: {
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackground: "#adb791",
		iconBackgroundDark: "#505544"
	},
	carnegie: {
		playerPanel: "company_block_{{player_id}}",
		iconBackground: "#97a09b",
		iconShadow: "transparent",
		css: ".cng_topbutton { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	carnuta: {
		playerPanel: "playercontent_{{player_id}}",
	},
	carrara: {
		playerPanel: "player_board_wrap_{{player_id}}",
	},
	castlecombo: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#a4d3e3",
		iconBackgroundDark: "#30839c"
	},
	castleofmadkingludwig: {
		playerPanel: ".ca_hand .ca_label .name",
		boardPanel: "tab_1",
		css: ".desktop_version #game_play_area { padding-left: 50px; } .ca_tabs .sprite-bc_icon { display: none; }"
	},
	castlesofburgundy: {
		playerPanel: "player_block_{{player_id}}",
		boardPanel: "help_noTooltip_wrap",
		boardPanelText: "#help_noTooltip_title > span",
		bottomPanel: "discardedTiles_display_wrap",
	},
	catcafe: {
		playerPanel: "ctc_player_board_{{player_id}}",
	},
	catslebuilders: {
		playerPanel: "cln-player-{{player_id}}",
		iconBackground: "#ee8f77",
		iconBackgroundDark: "#9c4630",
		css: " "
	},
	caverna: {
		top: "90px",
		iconBackground: "#c7cccd",
		playerPanel: "resources-bar-holder-{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } #position-wrapper { padding-left: 10px; }",
	},
	championsofmidgard: {
		playerPanel: "playerboard_p{{player_id}}",
		boardPanel: "availablelongboats",
		boardPanelText: "#availablelongboats .to_translate:first-child",
	},
	cheeztricks: {
		playerPanel: "open_wrap_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 30px; }",
	},
	chemicaloverload: {
		playerPanel: "player-table-{{player_id}}-board",
	},
	chimerastation: {
		playerPanel: "chs_playername_{{player_index_1}}",
		boardPanel: "chs_perks_wrap",
		boardPanelText: "#chs_perks_header > span"
	},
	chocolatefactory: {
		playerPanel: "playerMat_{{player_id}}",
		playerPanelOffset: 50,
	},
	circadia: {
		playerPanel: ".player_area",
		css: ".bga-jump-to_controls { display: none; }",
	},
	citadels: {
		playerPanel: "city-{{player_id}}-container"
	},
	cities: {
		playerPanel: "player-container-{{player_id}}",
		iconBackground: "#dcebef",
		iconBackgroundDark: "#303c55",
		iconBorderDark: "#7c8fb6",
		position: "bottom"
	},
	cityofthebigshoulders: {
		playerPanel: "player_{{player_id}}",
		boardPanel: "available_companies_wrapper",
		bottomPanel: "board_bottom"
	},
	clansofcaledonia: {
		playerPanel: "playerboard_row_{{player_id}}",
	},
	coalbaron: {
		playerPanel: "board-{{player_id}}",
	},
	coatl: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	codexnaturalis: {
		playerPanel: "map-player-name-{{player_id}}",
	},
	coffeerush: {
		playerPanel: "player_zone_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 0px; }",
		iconBackgroundDark: "#4b3621",
		iconBorderDark: "#fff",
	},
	collect: {
		playerPanel: ".mf_playerboard .playername",
		css: " "
	},
	colorado: {
		playerPanel: "board_{{player_id}}",
		boardPanel: "main_board"
	},
	concordia: {
		playerPanel: "player-table-{{player_id}}",
		css: "#cia_playersBoard { margin-left: 50px; }",
		position: "bottom",
		iconBorderDark: "#ccc",
	},
	conspiracy: {
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
	cosmoctopus: {
		playerPanel: "csm-player{{player_id}}-cards-title",
		boardPanel: "csm-main"
	},
	cosmosempires: {
		playerPanel: "player_{{player_id}}_container",
		iconBackground: "#aaabad",
		iconBackgroundDark: "#36384a"
	},
	craftingthecosmos: {
		playerPanel: ".ctc_board-section",
	},
	crusadersthywillbedone: {
		playerPanel: "CRUPlayerTWBDBoard_{{player_id}}",
		playerPanelOffset: 100,
	},
	crypt: {
		playerPanel: "player-area-{{player_id}}",
	},
	cubosaurs: {
		playerPanel: "cbsr_playername_{{player_id}}",
	},
	deadcells: {
		playerPanel: "dc-beheaded-{{player_id}}-board",
		boardPanel: "dc-annexe-combat-board-wrapper",
		boardPanelText: "#dc-scroll-to-annexe-board",
		bottomPanel: "dc-mutation-board",
		css: "#dc-scroll-to-boards { display: none; }"
	},
	deadcellsnewcontent: { /* tempo */
		playerPanel: "dc-beheaded-{{player_id}}-board",
		boardPanel: "dc-annexe-combat-board-wrapper",
		boardPanelText: "#dc-scroll-to-annexe-board",
		bottomPanel: "dc-mutation-board",
		css: "#dc-scroll-to-boards { display: none; }"
	},
	deliverance: {
		playerPanel: "angel_area_{{player_color}}",
		boardPanel: "dlv_darkness_board_wrapper",
		boardPanelText: "#bga-jump-to_dlv_darkness_board > span",
		bottomPanel: "dlv_demons",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }"
	},
	deus: {
		playerPanel: "deus_playerboard_{{player_id}}",
		bottomPanel: "deus_common_components"
	},
	dewan: {
		playerPanel: ".mf_zone_player",
		boardPanel: "mf_zone_board_0",
	},
	dicedtomatoes: {
		top: "140px",
		playerPanel: "player_mat_{{player_id}}",
	},
	dicehospital: {
		playerPanel: "dhi-player_{{player_id}}",
		css: " ",
	},
	dicehospitaler: {
		playerPanel: "sheet_{{player_id}}",
		boardPanel: "game",
		css: " ",
	},
	dicesummoners: {
		playerPanel: "#pagesection_gameview .playertable.whiteblock",
		boardPanel: "community_basic",
		bottomPanel: "community_spell",
	},
	diggingfordinos: {
		playerPanel: "player-table-{{player_id}}",
		iconBackgroundDark: "#744625",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	dinogenics: {
		playerPanel: ".opp_container",
		boardPanel: "main_board"
	},
	divideetimpera: {
		playerPanel: "hand-{{player_id}}",
		playerPanelOffset: 35,
		boardPanel: "mission-board"
	},
	doglover: {
		playerPanel: ".DOG-player-name",
		css: " ",
	},
	dontgointhere: {
		playerPanel: "dgit_player_{{player_id}}_header",
	},
	draftandwriterecords: {
		playerPanel: "dwr-area-player-{{player_id}}",
		bottomPanel: "dwr-area-pref",
		css: "#dwr-shortcut-area, #dwr-area-pref-shortcuts { display: none; }",
	},
	draftosaurus: {
		playerPanel: "board-{{player_id}}",
		playerPanelOffset: 35,
	},
	dragoncastle: {
		playerPanel: ".playerTable",
	},
	drako: {
		playerPanel: ".drako-player-area .drako-player-table-label",
		playerPanelOffset: 10
	},
	dungeonpetz: {
		boardPanel: "progress_board",
		playerPanel: ".player-board-dp > .shopping-cart-wrapper > .side_title",
		playerPanelOffset: 20,
		bottomPanel: "happyland",
	},
	earth: {
		top: "40vh",
		boardPanel: "ea-area-common",
		playerPanel: "ea-area-player-{{player_id}}",
		iconBackgroundDark: "#293d2c",
		css: "#ea-shortcut-area { visibility: hidden; } .ea-player-panel-row:has(>.bx-checkbox-switch>#ea-shortcuts-checkbox) { display: none; }",
	},
	earthabundance: {
		top: "40vh",
		boardPanel: "ea-area-common",
		playerPanel: "ea-area-player-{{player_id}}",
		css: "#ea-shortcut-area { visibility: hidden; } .ea-player-panel-row:has(>.bx-checkbox-switch>#ea-shortcuts-checkbox) { display: none; }",
	},
	elawa: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #tables { padding-left: 45px; }",
		iconBackgroundDark: "#6a552f"
	},
	elpasogwt: {
		playerPanel: "gamezone-{{player_id}}",
		boardPanel: "secondary-boards"
	},
	emberleaf: {
		playerPanel: "ebl-player-stats-{{player_id}}",
	},
	eminentdomain: {
		iconBackground: "#dadada",
		iconBorder: "#000000",
		iconShadow: "#666",
		playerPanel: ".side_title > span",
		playerPanelOffset: 20,
		bottomPanel: "common_space",
	},
	envelopesofcash: {
		position: "bottom",
		playerPanel: "eoc-played{{player_id}}-outer",
		boardPanel: "eoc-map-container",
		boardPanelText: "#eoc-nav0",
		css: "#eoc-nav { display: none; }",
	},
	eriantys: {
		iconBackground: "#ffffff",
		playerPanel: "school_{{player_id}}",
		css: "#players_school { max-height: initial !important; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	ethnos: {
		playerPanel: "player_cardboard_{{player_id}}",
	},
	evergreen: {
		iconBackground: "#ffffff",
		playerPanel: "grid-{{player_id}}",
	},
	evolution: {
		playerPanel: "species_wrap_{{player_id}}",
		css: ".eye_panelicon, .up_arrow { display: none; } .desktop_version #game_play_area { padding-left: 50px; }"
	},
	exhibitiontwentiethcentury: {
		playerPanel: "etc-player-area-{{player_id}}",
	},
	expeditionsnineteentwenty: {
		playerPanel: "ex-player-area-{{player_id}}",
		boardPanel: "ex-base-camp",
		boardPanelText: "Base camp",
		css: ".bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
		position: "bottom",
	},
	faraway: {
		playerPanel: ".o-table .mf_zone_title"
	},
	farmclub: {
		playerPanel: "player-board-wrapper-{{player_id}}",
	},
	fateoffellowship: {
		playerPanel: ".playername.fo_zone_title",
	},
	festival: {
		playerPanel: "fes-player-area-{{player_id}}",
		iconBackgroundDark: "#5f483a",
		iconShadow: "#666",
	},
	fifteendays: {
		playerPanel: "playerarea_{{player_id}}",
	},
	fiftyfirststate: {
		playerPanel: "faction_{{player_id}}",
	},
	firstgiants: {
		playerPanel: "playerboard_{{player_id}}",
		iconBackgroundDark: "#8f663d",
	},
	fled: {
		playerPanel: "fled_player-area-{{player_id}}",
		boardPanel: "fled_board-container",
		css: ".fled_sticky { position: initial; } #fled_player-areas { padding-top: 2em; }"
	},
	fleet: {
		playerPanel: "playertable_{{player_id}}_wrap",
		bottomPanel: "auction_bottom"
	},
	florenzacardgame: {
		playerPanel: "board-florenza-player-{{player_id}}-card-container",
		playerPanelOffset: 45
	},
	flowers: {
		playerPanel: "flw_playZone_{{player_id}}",
	},
	forbiddenisland: {
		playerPanel: "player_adventurer_{{player_id}}",
		bottomPanel: "flood_deck_area",
		iconBackground: "#69b7fc",
		iconBackgroundDark: "#02357e"
	},
	forestshuffle: {
		playerPanel: "FOStable_{{player_id}}",
		position: "bottom"
	},
	forestshuffledartmoor: {
		playerPanel: "FSDtable_{{player_id}}",
		playerPanelOffset: 20,
		position: "bottom"
	},
	forestshufflesmokymountains: {
		playerPanel: "FSSMtable_{{player_id}}",
		playerPanelOffset: 20,
		position: "bottom"
	},
	foreverhome: {
		playerPanel: "player-table-{{player_id}}"
	},
	fortheking: {
		playerPanel: ".container1 .mycards .playernameclass",
		playerPanelOffset: 25,
		boardPanel: "centercard",
		boardPanelOffset: 50
	},
	fourgardens: {
		playerPanel: "player_zone_{{player_id}}",
	},
	frostedblooms: {
		playerPanel: "player_area_wrapper player_name",
		playerPanelOffset: 10,
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	galacticcruise: {
		playerPanel: "#players_area > div",
		iconBackgroundDark: "#4b3621",
		iconBorderDark: "#c19971",
		css: " ",
		position: "bottom"
	},
	gangsta: {
		playerPanel: "playertitle_{{player_id}}",
	},
	gardennation: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#919544",
		iconBackgroundDark: "#5f651a",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	getonboard: {
		playerPanel: "player-table-{{player_id}}",
		css: "#jump-controls, .bga-jump-to_controls { display: none; }",
	},
	getonboardparisrome: {
		iconBackground: "#ffffff",
		playerPanel: "player-table-{{player_id}}",
		playerPanelOffset: 10,
		css: "#jump-controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	ginkgopolis: {
		playerPanel: "#visiblePlayerBoards > .whiteblock",
	},
	girafferaffe: {
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackgroundDark: "#524d47",
		css: " "
	},
	gizmos: {
		playerPanel: "gizmo_track_{{player_id}}",
	},
	glassroad: {
		playerPanel: "playerboard_row_{{player_id}}",
		boardPanel: "board-row",
		bottomPanel: "history_section"
	},
	glow: {
		iconBackground: "#fff",
		playerPanel: "player-table-{{player_id}}",
	},
	goa: {
		playerPanel: "goa_player_table-{{player_id}}",
		playerPanelOffset: 25,
		iconBackgroundDark: "#8f663d",
		css: " "
	},
	gogoa: {
		playerPanel: "goa-holder-{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	goldblivion: {
		iconBackground: "#537955",
		iconBackgroundDark: "#415846",
		iconColor: "#eee",
		playerPanel: "gb-area-player-{{player_id}}",
		bottomPanel: "gb-discarded-help",
		css: "#gb-shortcut-area { display: none; } .desktop_version #gb-area-full { padding-left: 50px; }",
	},
	goldwest: {
		playerPanel: ".whiteblock:has(>.gw-player-board-wrap-wrap)",
	},
	golems: {
		playerPanel: "pl{{player_id}}_area"
	},
	gonutsfordonuts: {
		playerPanel: ".gnfd_playertable > .gnfd_playertablename",
		playerPanelOffset: 10,
	},
	gotwhatitbakes: {
		playerPanel: ".player_board .player_name_txt > div",
		playerPanelOffset: 70
	},
	greatwesterntrail: {
		top: "100px",
		playerPanel: "player_area_{{player_id}}",
		css: ".desktop_version #game_play_area_wrap { padding-left: 50px; }",
	},
	grund: {
		playerPanel: "playerbox-{{player_id}}",
	},
	gunsen: {
		playerPanel: "tsn-player-board-wrapper-{{player_id}}",
		css: " "
	},
	habitats: {
		playerPanel: "habitats-player-preserve-{{player_id}}",
	},
	hacienda: {
		playerPanel: ".mf_zone_player .playername",
	},
	hadara: {
		playerPanel: "game_board_{{player_id}}",
		playerPanelOffset: 10,
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	hadrianswall: {
		playerPanel: "player_{{player_id}}"
	},
	happycity: {
		iconBackground: "#b1dcf5",
		iconBackgroundDark: "#084864",
		playerPanel: "playerArea_{{player_id}}",
	},
	hardback: {
		playerPanel: "area_{{player_id}}",
	},
	harmonies: {
		playerPanel: "player-table-{{player_id}}",
		iconBackgroundDark: "#817765"
	},
	heat: {
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "legend-table",
		iconBackgroundDark: "#663d00",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	heatchampionship: {
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "legend-table",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	heckinhounds: {
		playerPanel: "playertable_{{player_id}}",
		iconBackground: "#4babb4",
		iconBackgroundDark: "#446501",
		css: " "
	},
	hiddenleaders: {
		playerPanel: "player-head-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; } #tabs-container { margin-left: -60px; }",
		position: "bottom"
	},
	homesteaders: {
		playerPanel: ".boardheader",
		playerPanelOffset: 30,
		bottomPanel: "bottom",
	},
	humanity: {
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "research-board",
		boardPanelText: "#bga-jump-to_board-1 > span",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	hydroracers: {
		playerPanel: "j_{{player_id}}",
	},
	imperialsettlers: {
		playerPanel: "faction_{{player_id}}",
	},
	ink: {
		playerPanel: "player-table-{{player_id}}",
	},
	innovation: {
		playerPanel: "player_{{player_id}}",
		position: "bottom",
		css: " ",
	},
	isleoftrainsallaboard: {
		myPanel: "#mycards_name",
		playerPanel: ".container1 > .board5 > .board6",
		playerPanelOffset: 20,
		css: "#zoom-controls { right: 0px; justify-content: flex-end; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	journey: {
		playerPanel: "playerArea_{{player_id}}",
		iconBackground: "#d6c1a9",
		iconBackgroundDark: "#785934",
		playerPanelOffset: 15
	},
	jumpdrive: {
		iconBackground: "#afafaf",
		iconBorder: "#000",
		iconShadow: "#666",
		playerPanel: "jdr-tableau-{{player_id}}",
	},
	khronos: {
		playerPanel: "board_{{player_index_1}}",
		bottomPanel: "turn_slider"
	},
	kingsguild: {
		playerPanel: "playerboardwrap_{{player_id}}",
		playerPanelOffset: -5,
	},
	knarr: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#dfeaeb",
		css: ".bga-jump-to_controls { display: none; }",
	},
	kokeshi: {
		playerPanel: "kokeshi-artisan-board-{{player_id}}",
	},
	krakenup: {
		playerPanel: ".playertablename",
		playerPanelOffset: 20
	},
	lafamiglia: {
		playerPanel: "laf-family-mat-{{player_index_1}}-container",
		boardPanel: "laf-gameboard",
		boardPanelText: "#laf-scroll-to-hq",
		css: "#laf-scroll-to-boards { display: none; }",
	},
	lagranja: {
		playerPanel: "playerContainer-{{player_id}}",
	},
	lancaster: {
		playerPanel: "board_castle_name_p{{player_id}}",
	},
	legendraiders: {
		playerPanel: "pl{{player_id}}_area",
	},
	lesderniersdroides: {
		playerPanel: "nameCardCollection{{player_id}}",
		css: '.goUp { display: none; } .desktop_version #game_play_area { padding-left: 50px; }',
		boardPanel: "trashCollectionText",
		boardPanelText: "#trashCollectionText",
		bottomPanel: "cardListTitle"
	},
	lestoitsdeparis: {
		playerPanel: "playerBoard_{{player_id}}"
	},
	limit: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	livingforest: {
		playerPanel: "lvf_playerboard_{{player_id}}",
	},
	locomomo: {
		iconBackground: "#a3c268",
		iconBackgroundDark: "#566534",
		playerPanel: "loc_player-board-{{player_id}}",
	},
	lookatthestars: {
		iconBackground: "#fff",
		playerPanel: "player-table-{{player_id}}",
		css: "#jump-controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	looot: {
		playerPanel: "player_board_{{player_id}}",
		iconBackground: "#7a99b8",
		iconBackgroundDark: "#364c63",
	},
	lorenzo: {
		playerPanel: "obrPlayerboardId_{{player_id}}",
		iconBackgroundDark: "#766a56"
	},
	lostseas: {
		iconBackground: "#8ddefc",
		iconBackgroundDark: "#325a67",
		playerPanel: "#ls_main .ls_playertitle",
		playerPanelOffset: 50,
	},
	lumen: {
		playerPanel: "player-table-{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	luthier: {
		playerPanel: "playerBoard_{{player_id}}",
		css: " "
	},
	mantisfalls: {
		playerPanel: "tableau_{{player_id}}",
		boardPanel: "tableau_actions",
		boardPanelText: "#tableau_actions > h3 > span"
	},
	mapmasters: {
		playerPanel: "house_{{player_id}}",
		iconBackground: "#93daf0",
		iconBackgroundDark: "#0f5a70",
		iconBorderDark: "#8e8e8e",
		css: " "
	},
	marcopolo: {
		playerPanel: "playerMat-{{player_id}}",
	},
	marcopolotwo: {
		playerPanel: "playerMat-{{player_id}}",
	},
	mastersofrenaissance: {
		playerPanel: "{{player_id}}"
	},
	mechadream: {
		playerPanel: "mad_playerboard_{{player_id}}",
	},
	mesos: {
		playerPanel: "player-board-{{player_id}}",
		playerPanelOffset: 20,
		iconBackground: "#bf1135",
		iconColor: "#eee",
		iconBackgroundDark: "#952c15",
		iconColorDark: "#eee",
	},
	middleages: {
		playerPanel: "zone_playername_{{player_index_1}}",
	},
	mindup: {
		playerPanel: "player-table-{{player_id}}",
	},
	monsterhex: {
		playerPanel: "mon-player-{{player_id}}",
	},
	moonriver: {
		playerPanel: "player_table_{{player_id}}",
		playerPanelOffset: 25,
	},
	moversandshakers: {
		playerPanel: "playermat_{{player_id}}",
		iconBackgroundDark: "#584927",
		iconBorderDark: "#8e763e",
		css: " "
	},
	mutantcrops: {
		playerPanel: "player-crops-{{player_id}}",
		playerPanelOffset: 40,
	},
	mycity: {
		iconBackground: "#d8ba7f",
		iconBackgroundDark: "#302317",
		iconColorDark: "#eee",
		iconShadowDark: "#777",
		playerPanel: "cty_board_{{player_id}}",
		playerPanelOffset: -10,
		css: " ",
	},
	mycityrb: {
		iconBackground: "#d8ba7f",
		iconBackgroundDark: "#302317",
		iconColorDark: "#eee",
		iconShadowDark: "#777",
		playerPanel: "cty_board_{{player_id}}",
		bottomPanel: "cty_proba",
		css: " ",
	},
	myfirstcastlepanic: {
		playerPanel: "playername_{{player_index_1}}",
		playerPanelOffset: 15,
		css: ".desktop_version #game_play_area { padding-left: 30px; }",
	},
	myshelfie: {
		playerPanel: "shelf_{{player_id}}",
	},
	myshelfiedice: {
		playerPanel: ".names",
	},
	nangaparbat: {
		playerPanel: "np_playerboard_{{player_id}}_wrap",
	},
	nature: {
		playerPanel: ".na_player_area",
		iconBackgroundDark: "#4b3621",
		iconBorderDark: "#c19971",
		css: " "
	},
	nautilus: {
		playerPanel: "#player_domains_wrap, #opponent_domains_wrap",
		bottomPanel: "special_cards_discarded_wrap",
	},
	nemesisretaliation: {
		playerPanel: "player-board-{{player_id}}",
		position: "bottom",
		iconBackground: "#41584a",
		iconBackgroundDark: "#41584a",
		iconColor: "#eee",
		playerPanelOffset: 30,
		css: "#quick-access { display: none; }",
	},
	neom: {
		playerPanel: "neom-cityboard-{{player_id}}-goods",
	},
	newfrontiers: {
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
	newton: {
		playerPanel: "player_game_board_{{player_id}}",
		boardPanel: "ntn_top_boards",
		playerPanelOffset: 20,
		css: ".default_to_carousel_view_on #bga_extension_sidebar { display: none; } .default_to_carousel_view_off .desktop_version #game_play_area { padding-left: 50px; }",
	},
	nippon: {
		playerPanel: "player_space_{{player_id}}",
		bottomPanel: "sideboard_anchor",
	},
	niwashi: {
		playerPanel: ".mf_playerboard .playername",
		playerPanelOffset: 20
	},
	numberdrop: {
		playerPanel: "sheet-{{player_id}}",
		iconBackground: "#ffffff",
	},
	oasis: {
		playerPanel: "board_{{player_id}}",
		playerPanelOffset: 10,
	},
	obsession: {
		boardPanel: "builderMarket",
		playerPanel: "playerArea-{{player_id}}",
		playerPanelOffset: 10,
	},
	odeon: {
		playerPanel: ".mf_playerboard .playername",
		playerPanelOffset: 20
	},
	onceuponaforest: {
		playerPanel: "playertable_{{player_id}}",
	},
	ontour: {
		playerPanel: "player_name_{{player_id}}",
	},
	openseason: {
		playerPanel: "playerZone_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } .keyhole { display: none; }",
	},
	oriflamme: {
		iconColor: "#eee",
		iconBackground: "#084864",
		iconBackgroundDark: "#084864",
		playerPanel: "discard-{{player_id}}",
		playerPanelOffset: 45,
		css: ".desktop_version #game_play_area { padding-left: 35px; }",
	},
	paladins: {
		playerPanel: "player-table-{{player_id}}"
	},
	pandemic: {
		myPanel: "#pdm-myhand",
		playerPanel: "#o-otherhands .pdm-hand",
	},
	parks: {
		boardPanel: "pks-board",
		playerPanel: "pks-inv{{player_id}}",
	},
	patchwork: {
		playerPanel: "#central > .tableau",
		boardPanel: "mainboard",
	},
	pathofcivilization: {
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "technology-board",
		boardPanelText: "#bga-jump-to_technology-board > span",
		css: ".bga-jump-to_controls { display: none; }",
	},
	paxpamir: {
		playerPanel: "player_tableau_{{player_id}}"
	},
	paxrenaissance: {
		playerPanel: "pr_player_tableau_{{player_id}}",
		iconBackground: "#a78d59",
		iconBackgroundDark: "#5d493c"
	},
	pergola: {
		playerPanel: "pgl-player-area-{{player_id}}",
	},
	personanongrata: {
		playerPanel: "prs_playerArea${{player_id}}",
		bottomPanel: "prs_publicArea"
	},
	piles: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#ffe433",
		iconBackgroundDark: "#005e99",
		css: "#bga-jump-to_controls { display: none; }",
	},
	pioneerdaysproject: {
		playerPanel: "playerbox-{{player_id}}",
	},
	piratas: {
		playerPanel: "playmat_{{player_id}}",
		bottomPanel: "discard_wrap"
	},
	pixies: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#5e8e3e",
		iconBackgroundDark: "#3d5c28",
	},
	pointcity: {
		playerPanel: "player_table_{{player_id}}",
		position: "bottom"
	},
	pointsalad: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#d3f591",
		iconBackgroundDark: "#360",
		css: ".bga-jump-to_controls { display: none; }"
	},
	popcorn: {
		playerPanel: "pop-player-{{player_id}}",
	},
	postcards: {
		playerPanel: ".player_area",
		iconBorderDark: "#beaca7",
		iconBackgroundDark: "#3b2f2b",
		boardPanel: "postcards_5",
		css: " "
	},
	potionexplosion: {
		playerPanel: "playerArea_{{player_id}}",
		bottomPanel: "bottom_panel",
		css: ".desktop_version #game_play_area { margin-left: 50px; }",
	},
	potionsofazerland: {
		playerPanel: "playerBoard_{{player_id}}",
		boardPanel: "poa_mainBoard"
	},
	praga: {
		playerPanel: "playerboard_{{player_id}}",
		position: "bottom",
		css: ".desktop_version #game_play_area { padding-left: 50px; } #uiPanel { position: fixed; top: 65px; margin-left: 7px !important; } #uiPanelBtn { display: none; } #uiPanel>.uibtn { background-color: #ebd5bd; margin-left: 0px; border-radius: 50%; width: 40px; height: 40px; box-shadow: rgb(0, 0, 0) 0px 0px 10px 0px; } #uiPanel { background-color: transparent; } #uiPanel>.uibtn:after { left: 4px; top: 4px; width: 32px; height: 32px; border-radius: 50%; } #uiPanel { height: 350px; }"
	},
	pyramis: {
		playerPanel: "player-table-{{player_id}}",
		css: " "
	},
	quadratacanada: {
		playerPanel: "playertable_{{player_index_1}}"
	},
	queenofscots: {
		playerPanel: "player-table-{{player_id}}"
	},
	quetzal: {
		playerPanel: "player-area-{{player_id}}",
	},
	quibbles: {
		iconBackground: "#99639c",
		playerPanel: "player-area-{{player_id}}",
		bottomPanel: "quibbles-ui-row-1"
	},
	quiltable: {
		playerPanel: "player-table-{{player_id}}",
	},
	quirkyquarks: {
		position: "bottom",
		playerPanel: "QQ-questsZone-{{player_id}}",
		css: " "
	},
	raceforthegalaxy: {
		playerPanel: "tableau_panel_{{player_id}}",
		iconBackground: "#a3adb7",
	},
	railroadink: {
		iconBackground: "#bfdef9",
		iconBackgroundDark: "#415c71",
		playerPanel: "player-area-{{player_id}}",
		css: ".desktop_version #all-players { padding-left: 50px; }",
	},
	railwaysoftheworld: {
		playerPanel: "rotw_playertable_{{player_id}}_wrap",
		boardPanel: "hideShowOpCards",
	},
	rainforest: {
		playerPanel: "playerZone_{{player_id}}",
	},
	rauha: {
		iconBackground: "#e7e1da",
		playerPanel: "board-{{player_id}}",
	},
	reforest: {
		playerPanel: "re-player-area-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	refuge: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	relativespace: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	resarcana: {
		playerPanel: "player_area_{{player_id}}",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	revive: {
		playerPanel: "player_{{player_id}}"
	},
	riftvalleyreserve: {
		playerPanel: "rvr-map-index-{{player_index}}",
		playerPanelOffset: 20,
	},
	rivervalleyglassworks: {
		playerPanel: ".player_board_panel",
	},
	rollandbump: {
		iconBackground: "#d7d0cd",
		playerPanel: "#rnb_players > div > h2 > span",
		playerPanelOffset: 15,
		bottomPanel: "rnb_rewards",
		css: " ",
	},
	rolledwest: {
		playerPanel: "#other_players_board .whiteblock",
		myPanel: "#personal_info_wrapper"
	},
	rollforthegalaxy: {
		playerPanel: "tableau_panel_{{player_id}}",
		css: ".desktop_version .tableau_panel, .desktop_version #roll_infos { padding-left: 50px; }",
	},
	rollintotown: {
		playerPanel: "rt-holder-{{player_id}}",
	},
	rolltothetopjourneys: {
		playerPanel: "player_map_{{player_id}}",
	},
	romirami: {
		playerPanel: "rr-area-player-{{player_id}}",
		css: "#rr-shortcut-area, #rr-area-pref-shortcut { display: none !important; }",
	},
	rumbleplanet: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
		iconBackgroundDark: "#415b59"
	},
	russianrailroads: {
		top: "100px",
		playerPanel: ".nameslot > h3",
		playerPanelOffset: 20,
		bottomPanel: "limbo",
		bottomPanelOffset: 10,
		css: ".button_top { display: none; }",
	},
	sagani: {
		playerPanel: "map-container-{{player_id}}",
		bottomPanel: "sag-intermezzo-spaces",
	},
	sahwari: {
		playerPanel: "leaderBoardZone_{{player_id}}",
	},
	saintpetersburg: {
		playerPanel: "stp_playertable_{{player_id}}_wrap",
		playerPanelOffset: 10,
	},
	sapiens: {
		playerPanel: "playerArea_{{player_id}}",
	},
	screampark: {
		playerPanel: "scp_playerZone-{{player_id}}",
	},
	scriptoria: {
		playerPanel: ".pupitrePlayerContainer",
		myPanel: "#pupitreCurrentPlayer",
		css: "#zoneboard { position: relative; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	seasaltpaper: {
		playerPanel: "player-table-{{player_id}}",
		iconBackground: "#778ea9",
		iconBackgroundDark: "#1f4b7a"
	},
	seashells: {
		playerPanel: "player-table-{{player_id}}",
		iconBackgroundDark: "#007399",
		iconBackground: "#3cf",
	},
	seasons: {
		position: "bottom",
		playerPanel: "anchor_player_{{player_id}}",
		iconBackgroundDark: "#725325",
		css: ".desktop_version .tableau { margin-left: 46px; } .anchor-up { display: none; } .show-player-tableau { visibility: hidden; }",
	},
	sixtyone: {
		playerPanel: "sxt_player_area_{{player_id}}",
	},
	skarabrae: {
		playerPanel: "tableau_{{player_color}}",
		iconBackground: "#d7e8ee",
		iconBorderDark: "#989a9a",
		css: " "
	},
	skatelegend: {
		playerPanel: "player-table-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
	},
	soixantedeuxsoleilsdete: {
		playerPanel: "player-table-{{player_id}}"
	},
	solstis: {
		playerPanel: "zone_playername_{{player_index_1}}",
		iconBackground: "#4fb9e5",
		iconBackgroundDark: "#156584",
		css: " "
	},
	soothsayers: {
		playerPanel: "player-board-{{player_id}}",
		boardPanel: "market-area",
		boardPanelText: "#market-area .market-header h3",
		css: " "
	},
	spacebase: {
		playerPanel: "playerTable_{{player_id}}",
		playerPanelOffset: 45,
		iconColor: "#eee",
		iconBackground: "#2a0620",
		iconBackgroundDark: "#2a0620",
		iconShadow: "#918e8e",
		iconShadowDark: "#918e8e",
		css: ".desktop_version #game_play_area { margin-left: 50px; }",
	},
	spacelab: {
		playerPanel: "player-table-{{player_id}}",
	},
	spellbook: {
		playerPanel: "playername_{{player_id}}",
	},
	spirited: {
		playerPanel: "sp-player-area-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
		iconBackgroundDark: "#53481d",
	},
	spiritsoftheforest: {
		playerPanel: "playerarea_{{player_id}}",
		iconBackgroundDark: "#4b5046"
	},
	splendorduel: {
		playerPanel: "player-table-{{player_id}}",
		boardPanel: "cards-wrapper",
		boardPanelText: "#bga-jump-to_table-cards .bga-jump-to_label",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
		iconBackground: "#c4aec5",
		iconBackgroundDark: "#394260"
	},
	spookytower: {
		playerPanel: "player_board_{{player_id}}",
		iconBackgroundDark: "var(--dark-40)",
		iconBackground: "#60c2cb",
		iconColor: "#fff",
	},
	spots: {
		playerPanel: "spt-cards{{player_id}}",
		css: ".desktop_version #spt-gameArea { margin-left: 25px; }",
	},
	spyworld: {
		playerPanel: ".mf_playerboard .playername",
		boardPanel: ".mf_item_main_lair"
	},
	stabletimes: {
		playerPanel: "playername-{{player_id}}",
	},
	starshipmerchants: {
		playerPanel: "disp_{{player_id}}"
	},
	steamworks: {
		boardPanel: "supply_sources",
		playerPanel: "areaForPlayer_{{player_id}}",
	},
	stonespinearchitects: {
		playerPanel: "sa-player-area-{{player_id}}",
	},
	stupormundi: {
		playerPanel: "playermat_{{player_id}}"
	},
	super: {
		playerPanel: "table-{{player_id}}",
		playerPanelOffset: 20,
		iconColor: "#eee",
		iconBackground: "#785e8b",
		iconBackgroundDark: "#4b3858"
	},
	supermegaluckybox: {
		playerPanel: ".smlb_playertable"
	},
	sushigo: {
		playerPanel: "row_{{player_id}}",
	},
	sushigoparty: {
		playerPanel: "row_{{player_id}}",
	},
	tactile: {
		playerPanel: "tableau_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } .desktop_version .store, .desktop_version .board { margin-left: 50px; }"
	},
	takenokolor: {
		playerPanel: "player-table-{{player_id}}",
		bottomPanel: "rules-wrapper",
		iconBackground: "#93d4df",
		iconBackgroundDark: "#246975",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	tanghulu: {
		playerPanel: "pl{{player_id}}_area",
	},
	tapestry: {
		top: "90px",
		playerPanel: "playerArea_{{player_id}}",
		iconBackgroundDark: "#504527",
		bottomPanel: "game_wrapper_bottom",
		css: ".desktop_version #page-content { padding-left: 50px; }",
	},
	terraformingmars: {
		playerPanel: "#players_area .player_area",
		boardPanel: "main_board",
		bottomPanel: "allcards",
		css: "#bga_extension_sidebar { z-index: 999 !important; } .desktop_version #game_play_area { padding-left: 50px; } #ebd-body[data-localsetting_handplace=floating] #hand_area_buttons #hand_area_button_pop { background-color: #ebd5bd; } .bgaext_dark #ebd-body[data-localsetting_handplace=floating] #hand_area_buttons #hand_area_button_pop { background-color: #b9b9b9; }"
	},
	terraformingmarsthedicegame: {
		playerPanel: ".tm_playerBoard .tm_name",
		boardPanel: ".sprite.sprite-board",
		playerPanelOffset: 20
	},
	thebuilders: {
		playerPanel: "playercoinicon_{{player_id}}",
		playerPanelOffset: 20,
	},
	thebuildersantiquity: {
		playerPanel: "playercoinicon_{{player_id}}",
		playerPanelOffset: 20,
	},
	theisleofcats: {
		playerPanel: "tioc-player-board-{{player_id}}",
	},
	theisleofcatsduel: {
		playerPanel: "tioc-player-board-{{player_id}}",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; }",
	},
	thekingofthewoods: {
		playerPanel: ".player-area",
	},
	thelittleflowershop: {
		playerPanel: "player_board_{{player_id}}"
	},
	thenumber: {
		playerPanel: ".tn_player_board",
	},
	theoracleofdelphi: {
		playerPanel: ".delphi-opp-name",
		iconBackground: "#416071",
		iconColor: "#eee",
		iconBackgroundDark: "#416071",
	},
	thewhitecastle: {
		playerPanel: "twc-player-area-{{player_id}}",
	},
	thewolves: {
		playerPanel: "wolves-player-container-{{player_id}}",
		boardPanel: "wolves-calendar"
	},
	threethousandscoundrels: {
		playerPanel: "leader_{{player_id}}",
		boardPanel: "board",
		css: ".desktop_version #game_play_area, #day_number { padding-left: 50px; }"
	},
	throughtheages: {
		playerPanel: "player_tableau_{{player_id}}",
		playerPanelOffset: 45,
	},
	throughtheagesnewstory: {
		playerPanel: "player_tableau_wrap_{{player_id}}",
		playerPanelOffset: 45,
		bottomPanel: "common_tactics",
		bottomPanelOffset: 45,
	},
	thurnandtaxis: {
		playerPanel: "miniboard_{{player_id}}",
		css: "#thurntaxis_board, .desktop_version #page-title { margin-left: 55px; }",
	},
	tinyfarms: {
		playerPanel: "playerBoard_{{player_id}}",
		playerPanelOffset: 30,
	},
	tipperary: {
		playerPanel: "player-board-{{player_id}}",
	},
	tokaido: {
		playerPanel: "#tkd_game_area > #collections > div > h3",
		playerPanelOffset: 20,
	},
	trektwelve: {
		playerPanel: "board_{{player_id}}",
		iconBackground: "#efd6a1",
		iconBackgroundDark: "#75593e",
		css: "#upback, .show-sheet-button { display: none; }",
	},
	trok: {
		playerPanel: "mf_zone_player_{{player_index_1}}",
		css: " "
	},
	troyesdice: {
		playerPanel: "td_player_board_{{player_id}}",
		playerPanelOffset: 10,
	},
	tucano: {
		iconBackground: "#a5cdbf",
		iconBackgroundDark: "#326755",
		playerPanel: "player-{{player_id}}-tableau",
		playerPanelOffset: 30,
	},
	tulipandrose: {
		playerPanel: "hand_{{player_id}}_block",
	},
	ultimaterailroads: {
		iconBackground: "#e5d6d1",
		iconBackgroundDark: "#b5552b",
		playerPanel: ".nameslot > h3",
		playerPanelOffset: 20,
		bottomPanel: "limbo",
		bottomPanelOffset: 10,
		css: ".button_top { display: none; }",
	},
	uptown: {
		playerPanel: ".uptown_player_area ",
		myPanel: "#uptown_mytiles_wrap",
	},
	vaalbara: {
		iconBackground: "#ffffff",
		iconBackgroundDark: "#3c5f77",
		playerPanel: ".vlb_zone_title > h2 > span:last-child",
	},
	valeofeternity: {
		playerPanel: "zone_title_{{player_index_1}}"
	},
	viamagica: {
		iconBackground: "#e6e6fa",
		playerPanelOffset: 15,
		playerPanel: "vmg_playername_{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 40px; }",
	},
	villagers: {
		playerPanel: "vil_village_{{player_id}}",
		css: ".desktop_version #villages { margin-left: 50px; }",
	},
	viticulture: {
		playerPanel: "playerboard_row_{{player_id}}",
		css: " ",
	},
	vivacatrina: {
		playerPanel: ".mf_playerpanel",
		iconBackground: "#5d493c",
		iconBackgroundDark: "#5d493c",
		iconColor: "#eee"
	},
	wastelandia: {
		playerPanel: "player-mat-wrap-{{player_id}}",
		bottomPanel: "baddies-content-large"
	},
	widgetsndigits: {
		playerPanel: "wnd-player-panel-{{player_id}}",
		css: ".desktop_version #game_play_area { padding-left: 50px; } .desktop_version .wnd-player-boards-row { margin-left: 50px; } .desktop_version .wnd-player-boards-row { width: calc(100% - 50px) !important; }"
	},
	wingspan: {
		position: "auto",
		playerPanel: "aviary_{{player_id}}",
		iconBackground: "#fff",
		css: ".desktop_version #wsp_opponent_board_area { padding-left: 40px; }",
	},
	wizardsgrimoire: {
		playerPanel: "player-table-{{player_id}}",
	},
	wonderfulkingdom: {
		playerPanel: ".wk_zone_playername",
	},
	wondrouscreatures: {
		playerPanel: "wc-player-area-{{player_id}}",
		boardPanel: "wc-display-area-wrapper",
		boardPanelText: "#bga-jump-to_wc-wilderness-area .bga-jump-to_label",
		css: "#bga-jump-to_controls, .bga-jump-to_controls { display: none; } .desktop_version #game_play_area { padding-left: 50px; }",
		iconBackgroundDark: "#1e3448",
		iconShadowDark: "#777",
	},
	wordtraveler: {
		playerPanel: "wot-word-cards-{{player_id}}-container"
	},
	yro: {
		playerPanel: "playerHand_{{player_id}}",
		iconBackground: "#f5ddf3",
		iconBackgroundDark: "#6f5b71",
		css: " "
	},
	zookeepers: {
		playerPanel: "zkp_playmat_container:{{player_id}}",
	},
	zuuli: {
		playerPanel: "div[id^=\"inside\"]",
		myPanel: "#inside-me",
		top: "140px",
	},
};

export default defaultGames;