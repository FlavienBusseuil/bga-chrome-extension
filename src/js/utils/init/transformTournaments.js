// @flow
import type { TournamentId } from "../../types/bga/Tournament";
import type { Tournament } from "../../types/bga/queries/TournamentList";
import type { TransformedTournament } from "../../types/TransformedTournament";
import { bgaUrl } from "../constants";
import { castToString } from "../../types/bga/Tournament";
import { castToDate } from "../../types/bga/DateString";

function transformTournament({
	assetsUrl,
	tournament: {
		id,
		championship_name,
		date,
		game_id,
		game_name,
		max_players,
		game_max_duration,
		players_per_match,
		players_per_match_min,
		avatar_image,
		...rest
	},
}: {
	assetsUrl: string,
	tournament: Tournament,
}): TransformedTournament {
	return {
		id,
		championshipName: championship_name,
		date: castToDate(date),
		gameId: game_id,
		gameName: game_name,
		maxPlayers: max_players,
		gameMaxDuration: game_max_duration,
		playersPerMatch: players_per_match,
		playersPerMatchMin: players_per_match_min,
		avatarImage: avatar_image,
		gameImg: `${assetsUrl}games/${game_name}/current/img/game_icon.png`,
		link: `${bgaUrl}/tournament?id=${castToString(id)}`,
		...rest,
	};
}

type Input = {
	assetsUrl: string,
	tournaments: Array<Tournament>,
};

export function transformTournaments({
	assetsUrl,
	tournaments,
}: Input): Array<TransformedTournament> {
	return tournaments.map(tournament =>
		transformTournament({ assetsUrl, tournament }),
	);
}
