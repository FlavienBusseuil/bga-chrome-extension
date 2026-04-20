import type { QueryResult } from "../../types/bga/queries/Query";
import type { TournamentListQueryResultData, Tournament } from "../../types/bga/queries/TournamentList";

import { bgaUrl } from "../constants";
import { resolveQuery } from "./resolveQuery";

async function resolveQueryFromStatus(status: 'progress' | 'future'): Promise<QueryResult<TournamentListQueryResultData>> {
	const url = `${bgaUrl}/tournamentlist/tournamentlist/getTournaments.html?tournament_i_registered=1&gamecateg=2&status=${status}&full=true`;
	const result = await resolveQuery<QueryResult<TournamentListQueryResultData>>(url);

	if (result.status == '1' && status === 'future') {
		result.data.list.forEach((tournament) => {
			tournament.status = 'future';
		});
	}

	return result;
}

export async function fetchTournaments(): Promise<Array<Tournament>> {
	const results = await Promise.all([
		resolveQueryFromStatus("progress"),
		resolveQueryFromStatus("future"),
	]);

	return results
		.flat()
		.map((result) => {
			if (result.status === "0") {
				const { code, error } = result;
				throw new Error(`Fetching tournaments failed (${code}: ${error})`);
			}

			return result.data.list;
		})
		.flat();
}
