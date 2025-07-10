import type { PlayerId, PlayerTableStatus } from "../Player";
import type { TableId, TableStatus, BasicTableOptions } from "../Table";
import type { GameId } from "../Game";
import type { BooleanString } from "../BooleanString";
import type { NumberString } from "../NumberString";
import type { DateString } from "../DateString";

export type TableOrder = number[];
export type Suggestion = never;

interface Player {
  id: PlayerId;
  table_status: PlayerTableStatus;
  fullname?: string;
  avatar: string;
  rank: number;
  rank_victory: NumberString;
  arena_points: NumberString;
  table_order: NumberString;
  is_admin: BooleanString;
  is_premium: BooleanString;
  is_beginner: BooleanString;
  ranksummary: number;
}

interface LevelFilter {
  log: string;
  args: never[] | Record<string, unknown>;
}

export interface Table {
  admin_id?: PlayerId;
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
  game_player_number: string;
  game_premium: BooleanString;
  game_status: "public";
  gameserver: NumberString;
  gamestart: DateString | null;
  has_tournament: BooleanString;
  tournament_id	: NumberString | null;
  id: TableId;
  level_filter_r: string;
  level_filter: LevelFilter;
  max_player: NumberString;
  min_player: string;
  options: BasicTableOptions;
  player_display: PlayerId[];
  players: Record<string, Player>;
  presentation: string;
  reputation_filter_r: string;
  reputation_filter: string;
  sandbox: BooleanString;
  scheduled: DateString;
  status: TableStatus;
  table_creator: PlayerId | null;
  think_limit: null;
  unranked: BooleanString;
}

export interface TableManagerQueryResultData {
  tableorder: TableOrder;
  tables: Record<string, Table>;
  suggestions: Suggestion[];
}
