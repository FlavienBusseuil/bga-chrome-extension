// @flow

import type { QuerySucceededResult } from "../../../types/bga/queries/Query";
import type { TournamentListQueryResultData } from "../../../types/bga/queries/TournamentList";

import { castToDateString } from "../../../types/bga/DateString";
import { castToGameId } from "../../../types/bga/Game";
import {
	castToNumber,
	castToNumberString,
} from "../../../types/bga/NumberString";
import { castToPlayerId } from "../../../types/bga/Player";
import { castToTableId } from "../../../types/bga/Table";
import { castToTournamentId } from "../../../types/bga/Tournament";

// Mock Tournaments query results
// https://boardgamearena.com/tournamentlist/tournamentlist/getTournaments.html?tournament_i_registered=1&progress

// Basic example with a mix of async and sync tables
export const progress: QuerySucceededResult<TournamentListQueryResultData> = {
	status: "1",
	data: [
		{
			id: castToTournamentId("117157"),
			// championship_id: "59669",
			name: "xxx1",
			championship_name: "Clash of wizards",
			date: castToDateString("1642104000"),
			// prestige: "218",
			status: "progress",
			game_id: castToGameId("1474"),
			game_name: "clashofdecks",
			// registration_type: "open",
			// type: "swissSystemV2",
			registered: castToNumberString("19"),
			max_players: castToNumberString("32"),
			// tgroup: "11141739",
			// avatar: "000000",
			// scoring: "-0.00000000007502384119902173",
			// time_profile: "21",
			// playing_hours: "0",
			// player_status: "active",
			game_max_duration: castToNumberString("1296000"),
			players_per_match: castToNumberString("2"),
			players_per_match_min: castToNumberString("2"),
			avatar_image:
				"https://x.boardgamearena.net/data/grouparms/noimage_tournament_50.png",
			// icon_class: 0,
			// status_details: "Ce tournoi est en cours",
			// game_max_duration_formatted: "15 jours",
			// type_formatted: "Syst\u00e8me suisse",
		},
	],
};

// Basic example with a mix of async and sync tables
export const future: QuerySucceededResult<TournamentListQueryResultData> = {
	status: "1",
	data: [
		{
			id: castToTournamentId("117157"),
			// championship_id: "59669",
			name: "Round 2",
			championship_name: "Super Tournament",
			date: castToDateString("1642104000"),
			// prestige: "218",
			status: "progress",
			game_id: castToGameId("1148"),
			game_name: "kingdomino",
			// registration_type: "open",
			// type: "swissSystemV2",
			registered: castToNumberString("32"),
			max_players: castToNumberString("32"),
			// tgroup: "11141739",
			// avatar: "000000",
			// scoring: "-0.00000000007502384119902173",
			// time_profile: "21",
			// playing_hours: "0",
			// player_status: "active",
			game_max_duration: castToNumberString("1296000"),
			players_per_match: castToNumberString("2"),
			players_per_match_min: castToNumberString("2"),
			avatar_image:
				"https://x.boardgamearena.net/data/grouparms/noimage_tournament_50.png",
			// icon_class: 0,
			// status_details: "Ce tournoi est en cours",
			// game_max_duration_formatted: "15 jours",
			// type_formatted: "Syst\u00e8me suisse",
		},
	],
};

export const presentation: {
	[string]: QuerySucceededResult<TournamentListQueryResultData>,
} = {
	progress,
	future,
};
