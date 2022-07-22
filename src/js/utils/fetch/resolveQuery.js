// @flow

import type { RequestToken } from "../../types/RequestToken";
import type { MyBgaRbtQueryResultData } from "../../types/bga/queries/MyBgaRbt";
import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import type {
	Query,
	QueryResult,
	QuerySucceededResult,
} from "../../types/bga/queries/Query";

import type { TableQueryResultData } from "../../types/bga/queries/Table";

import type { TableManagerQueryResultData } from "../../types/bga/queries/TableManager";
import type { TournamentListQueryResultData } from "../../types/bga/queries/TournamentList";
import type { MockResolver } from "./resolveFromMock";

import { isDataMocked } from "../constants";
import { fetchFromUrl } from "../fetch/fetchFromUrl";
import { fetchRequestToken } from "./fetchRequestToken";
import { resolveFromMock } from "./resolveFromMock";

type Input = {
	fromMock: MockResolver,
	fromUrl: { url: string, requestToken: RequestToken },
};

function runQuery<T: Query>({
	fromMock,
	fromUrl: { url, requestToken },
}: Input): Promise<T> {
	if (isDataMocked) {
		return resolveFromMock<T>(fromMock);
	}

	return fetchFromUrl<T>(url, { requestToken });
}

export async function resolveQuery<T: Query>({
	fromMock,
	fromUrl: { url, requestToken },
	isRetrying = false,
	onRefreshRequestToken,
}: {
	...Input,
	isRetrying?: boolean,
	onRefreshRequestToken?: (requestToken: RequestToken) => void,
}): Promise<T> {
	const result = await runQuery<T>({
		fromMock,
		fromUrl: { url, requestToken },
	});

	// Session problem
	if (result.code && result.code === 806) {
		if (isRetrying) {
			throw new Error(result.error);
		}

		// Retry strategy
		const newRequestToken = await fetchRequestToken();
		if (onRefreshRequestToken) {
			onRefreshRequestToken(newRequestToken);
		}

		return resolveQuery({
			fromMock,
			fromUrl: { url, requestToken: newRequestToken },
			isRetrying: true,
		});
	}

	return result;
}
