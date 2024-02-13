// @flow

import type { FetchOptions } from "../../types/FetchOptions";
import type { QueryResult } from "../../types/bga/queries/Query";
import type {
	TournamentListQueryResultData,
	Tournament,
} from "../../types/bga/queries/TournamentList";

import { bgaUrl } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { resolveQuery } from "./resolveQuery";

async function resolveQueryFromStatus(
	status: string,
	{ requestToken }: FetchOptions,
) {
	const url = `${bgaUrl}/tournamentlist/tournamentlist/getTournaments.html?tournament_i_registered=1&status=${status}&full=true`;

	return resolveQuery<QueryResult<TournamentListQueryResultData>>({
		fromMock: { path: "tournamentList", key: status },
		fromUrl: { url, requestToken },
	});
}

export async function fetchTournaments({
	requestToken,
}: FetchOptions): Promise<Array<Tournament>> {
	const results = await Promise.all([
		resolveQueryFromStatus("progress", { requestToken }),
		resolveQueryFromStatus("future", { requestToken }),
	]);

	return results
		.flat()
		.map((result) => {
			if (result.status === "0") {
				const { code, error } = result;
				throw new Error(
					`Fetching tournamens failed (${code}: ${error})`,
				);
			}

			return result.data.list;
		})
		.flat();
}
