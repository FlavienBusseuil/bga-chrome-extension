// @flow

import type { QueryResult } from "../../types/bga/queries/Query";
import type {
	TournamentListQueryResultData,
	Tournament,
} from "../../types/bga/queries/TournamentList";

import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { resolveQuery } from "./resolveQuery";

async function resolveQueryFromStatus(status: string) {
	return resolveQuery<QueryResult<TournamentListQueryResultData>>({
		fromMock: { path: "tournamentList", key: status },
		fromUrl: `${bgaUrl}/tournamentlist/tournamentlist/getTournaments.html?tournament_i_registered=1&status=${status}&${bgaExtensionUrlSignature}&full=true`,
	});
}

export async function fetchTournaments(): Promise<Array<Tournament>> {
	const results = await Promise.all([
		resolveQueryFromStatus("progress"),
		resolveQueryFromStatus("future"),
	]);

	return results
		.flat()
		.map(result => {
			if (result.status === 0) {
				const { code, error } = result;
				throw new Error(
					`Fetching tournamens failed (${code}: ${error})`,
				);
			}

			return result.data;
		})
		.flat();
}
