// @flow

import type { DateString } from "../DateString";
import type { GameId } from "../Game";
import type { NumberString } from "../NumberString";
import type { TournamentId } from "../Tournament";

export type Tournament = {
	id: TournamentId,
	// championship_id: "59669",
	name: string,
	championship_name: string,
	date: DateString,
	// prestige: "218",
	status: "progress" | "future" | "finished",
	game_id: GameId,
	game_name: string,
	// registration_type: "open",
	// type: "swissSystemV2",
	registered: NumberString,
	max_players: NumberString,
	// tgroup: "11141739",
	// avatar: "000000",
	// scoring: "-0.00000000007502384119902173",
	// time_profile: "21",
	// playing_hours: "0",
	// player_status: "active",
	game_max_duration: NumberString,
	players_per_match: NumberString,
	players_per_match_min: NumberString,
	avatar_image: string,
	// icon_class: 0,
	// status_details: "Ce tournoi est en cours",
	// game_max_duration_formatted: "15 jours",
	// type_formatted: "Syst\u00e8me suisse",
};

export type TournamentListQueryResultData = Array<Tournament>;
