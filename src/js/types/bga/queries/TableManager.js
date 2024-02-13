// @flow

import type { QuerySucceededResult } from "./Query";
import type { PlayerId, PlayerTableStatus } from "../Player";
import type { TableId, TableStatus, BasicTableOptions } from "../Table";
import type { GameId } from "../Game";
import type { BooleanString } from "../BooleanString";
import type { NumberString } from "../NumberString";
import type { DateString } from "../DateString";

export type TableOrder = Array<number>;
export type Suggestion = empty;

type Player = {
	id: PlayerId,
	table_status: PlayerTableStatus,
	fullname?: string,
	avatar: string,
	rank: number,
	rank_victory: NumberString,
	arena_points: NumberString,
	table_order: NumberString,
	is_admin: BooleanString,
	is_premium: BooleanString,
	is_beginner: BooleanString,
	ranksummary: number,
};

type LevelFilter = { log: string, args: Array<empty> | { ... } };

export type Table = {
	admin_id?: PlayerId,
	cancelled: BooleanString,
	current_player_nbr: number,
	current_present_player_nbr: number,
	filter_group_name: null | string,
	filter_group_type: null | "friend",
	filter_group_visibility: null | "public",
	filter_group: null | string,
	filter_lang: null | string,
	game_expansion_premium: BooleanString,
	game_id: GameId,
	game_max_players: NumberString,
	game_min_players: NumberString,
	game_name: string,
	game_player_number: string,
	game_premium: BooleanString,
	game_status: "public",
	gameserver: NumberString,
	gamestart: ?DateString,
	has_tournament: BooleanString,
	id: TableId,
	level_filter_r: string,
	level_filter: LevelFilter,
	max_player: NumberString,
	min_player: string,
	options: BasicTableOptions,
	player_display: Array<PlayerId>,
	players: { [string]: Player },
	presentation: string,
	reputation_filter_r: string,
	reputation_filter: string,
	sandbox: BooleanString,
	scheduled: DateString, // ?
	status: TableStatus,
	table_creator: null | PlayerId,
	think_limit: null,
	unranked: BooleanString,
	...
};

export type TableManagerQueryResultData = {
	tableorder: TableOrder,
	tables: { [string]: Table },
	suggestions: Array<Suggestion>,
};
