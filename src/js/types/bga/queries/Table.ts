import type { TournamentId } from "../Tournament";
import type { PlayerId, PlayerTableStatus } from "../Player";
import type { TableId, TableStatus } from "../Table";
import type { GameId } from "../Game";
import type { BooleanString } from "../BooleanString";
import type { JoinedLanguages, Languages } from "../Language";
import type { NumberString } from "../NumberString";
import type { DateString } from "../DateString";
import type { Country, CountryCode } from "../Country";

interface Award {
	id: NumberString;
	player: PlayerId;
	game: GameId;
	type_id: NumberString;
	date: DateString;
	defending: BooleanString;
	linked_tournament: TournamentId | null;
	prestige: NumberString;
	tgroup: null;
	tournament_name: string | null;
	championship_name: string | null;
	season: string | null;
	group_avatar: null;
	name: string;
	nametr: string;
	namearg: number;
	prestigeclass: 0;
}

interface Player {
	id: PlayerId;
	table_status: PlayerTableStatus;
	awards?: Award[];
	arena_points: NumberString;
	avatar?: string;
	fullname: string;
	rank: number;
	rank_victory: NumberString;
	table_order: NumberString;
	is_admin: BooleanString;
	is_premium: BooleanString;
	is_beginner: BooleanString;
	is_confirmed: BooleanString;
	status: "online" | "offline";
	device: "desktop" | "mobile";
	decision: null;
	player_country: CountryCode;
	gender: BooleanString;
	grade: NumberString;
	played: NumberString;
	realPlayed: NumberString;
	prestige: number | NumberString;
	th_name: null;
	thumb_up: NumberString;
	thumb_down: NumberString;
	recent_games: NumberString;
	recent_leave: NumberString;
	recent_clock: NumberString;
	karma: NumberString;
	karma_alert: "no";
	victory: NumberString;
	hit: number;
	ip: string;
	languages_fluent: null;
	languages_normal: JoinedLanguages;
	ranksummary: number;
	country: Country;
	languages: Languages;
	freeaccount: boolean;
	premiumaccount: boolean;
	rank_no: NumberString | null;
}

interface LevelFilterArgs {
	[key: string]: unknown;
}

interface LevelFilterLabel {
	log: string;
	args: never[] | LevelFilterArgs;
}

interface LevelFilterDetails {
	Beginners: boolean;
	Apprentices: boolean;
	"Average players": boolean;
	"Good players": boolean;
	"Strong players": boolean;
	Experts: boolean;
	Masters: boolean;
}

interface LevelFilter {
	label: LevelFilterLabel;
	details: LevelFilterDetails;
}

interface Tournament {
	id: TournamentId;
	championship_name: string;
	tournament_name: string;
}

interface ReputationFilterDetails {
	opinion: number;
	leave: number;
	clock: number;
	karma: number;
}

interface ReputationFilter {
	label: string;
	details: ReputationFilterDetails;
}

export interface TableInfo {
	admin_id: PlayerId;
	cancelled: BooleanString;
	current_player_nbr: number;
	current_present_player_nbr: number;
	filter_group_name: string | null;
	filter_group_type: "friend" | null;
	filter_group_visibility: "public" | null;
	filter_group: string | null;
	filter_lang: string | null;
	game_expansion_premium: BooleanString;
	game_id: GameId;
	game_max_players: NumberString;
	game_min_players: NumberString;
	game_name: string;
	game_player_number: Record<string, number>;
	game_premium: BooleanString;
	game_status: "public";
	gameserver: string;
	gamestart: string | null;
	gameversion: string;
	id: TableId;
	level_filter_r: string;
	level_filter: LevelFilter;
	max_player: NumberString;
	min_player: string;
	options: Record<string, { name: string } & Record<string, unknown>>;
	player_display: PlayerId[];
	players: Record<string, Player>;
	presentation: string;
	reputation_filter_r: string;
	reputation_filter: ReputationFilter;
	sandbox: BooleanString;
	scheduled: string;
	status: TableStatus;
	table_creator: PlayerId | null;
	unranked: BooleanString;
	tournament?: Tournament;
	[key: string]: unknown | undefined;
}

export type TableQueryResultData = TableInfo;
