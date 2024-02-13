// @flow

import type { TournamentId } from "../Tournament";
import type { QuerySucceededResult } from "./Query";
import type { PlayerId, PlayerTableStatus } from "../Player";
import type { TableId, TableStatus, BasicTableOptions } from "../Table";
import type { GameId } from "../Game";
import type { BooleanString } from "../BooleanString";
import type { LanguageCode, JoinedLanguages, Languages } from "../Language";
import type { NumberString } from "../NumberString";
import type { DateString } from "../DateString";
import type { Country, CountryCode } from "../Country";

type Player = {
	id: PlayerId,
	table_status: PlayerTableStatus,
	awards?: Array<{
		id: NumberString, // AwardId
		player: PlayerId,
		game: GameId,
		type_id: NumberString, // ?
		date: DateString,
		defending: BooleanString,
		linked_tournament: null | TournamentId,
		prestige: NumberString,
		tgroup: null, // ?
		tournament_name: null | string,
		championship_name: null | string,
		season: null | string, // ?
		group_avatar: null, // ?
		name: string,
		nametr: string,
		namearg: number, // ?
		prestigeclass: 0, // ?
	}>,
	arena_points: NumberString,
	avatar?: string,
	fullname: string,
	rank: number,
	rank_victory: NumberString,
	table_order: NumberString,
	is_admin: BooleanString,
	is_premium: BooleanString,
	is_beginner: BooleanString,
	is_confirmed: BooleanString,
	status: "online" | "offline",
	device: "desktop" | "mobile",
	decision: null,
	player_country: CountryCode,
	gender: BooleanString,
	grade: NumberString,
	played: NumberString, // ?
	realPlayed: NumberString, // ?
	prestige: number | NumberString,
	th_name: null,
	thumb_up: NumberString,
	thumb_down: NumberString,
	recent_games: NumberString,
	recent_leave: NumberString,
	recent_clock: NumberString,
	karma: NumberString,
	karma_alert: "no",
	victory: NumberString,
	hit: number,
	ip: string,
	languages_fluent: null,
	languages_normal: JoinedLanguages,
	ranksummary: number,
	country: Country,
	languages: Languages,
	freeaccount: boolean,
	premiumaccount: boolean,
	rank_no: null | NumberString,
};

type LevelFilter = {
	label: { log: string, args: Array<empty> | { ... } },
	details: {
		Beginners: boolean,
		Apprentices: boolean,
		"Average players": boolean,
		"Good players": boolean,
		"Strong players": boolean,
		Experts: boolean,
		Masters: boolean,
	},
};

type Tournament = {
	id: TournamentId,
	championship_name: string,
	tournament_name: string,
};

export type TableInfo = {
	admin_id: PlayerId,
	cancelled: BooleanString,
	current_player_nbr: number,
	current_present_player_nbr: number,
	filter_group_name: ?string,
	filter_group_type: ?"friend",
	filter_group_visibility: ?"public",
	filter_group: null | string,
	filter_lang: null | string,
	game_expansion_premium: BooleanString,
	game_id: GameId,
	game_max_players: NumberString,
	game_min_players: NumberString,
	game_name: string,
	game_player_number: { [string]: number },
	game_premium: BooleanString,
	game_status: "public",
	gameserver: string,
	gamestart: null | string,
	gameversion: string,
	id: TableId,
	level_filter_r: string,
	level_filter: LevelFilter,
	max_player: NumberString,
	min_player: string,
	options: { [string]: { name: string, ... } },
	player_display: Array<PlayerId>,
	players: { [string]: Player },
	presentation: string,
	reputation_filter_r: string,
	reputation_filter: {
		label: string,
		details: {
			opinion: number,
			leave: number,
			clock: number,
			karma: number,
		},
	},
	sandbox: BooleanString,
	scheduled: string, // ?
	status: TableStatus,
	table_creator: ?PlayerId,
	unranked: BooleanString,
	tournament?: Tournament,
	...
};

export type TableQueryResultData = TableInfo;
