import type { DateString } from "../DateString";
import type { GameId } from "../Game";
import type { NumberString } from "../NumberString";
import type { TournamentId } from "../Tournament";

export interface Tournament {
  id: TournamentId;
  name: string;
  championship_name: string;
  date: DateString;
  status: "progress" | "future" | "finished";
  game_id: GameId;
  game_name: string;
  registered: NumberString;
  max_players: NumberString;
  player_status: string;
  game_max_duration: NumberString;
  players_per_match: NumberString;
  players_per_match_min: NumberString;
  avatar_image: string;
}

export interface TournamentListQueryResultData {
  total: number;
  list: Tournament[];
}
