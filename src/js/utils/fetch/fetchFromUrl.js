// @flow

import type { FetchOptions } from "../../types/FetchOptions";
import type {
	QueryFailedResult,
	QuerySucceededResult,
} from "../../types/bga/queries/Query";

export async function fetchFromUrl<D>(
	url: string,
	options: ?$Shape<FetchOptions>,
): Promise<D> {
	const headers = {};
	if (options && options.requestToken !== undefined) {
		headers["x-request-token"] = options.requestToken;
	}

	return fetch(url, { headers })
		.catch((error) => {
			throw new Error(
				`Fetching ${url} failed. Please try again. (${error})`,
			);
		})
		.then((response) => response.json());
}
