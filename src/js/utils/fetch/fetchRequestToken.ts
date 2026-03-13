import type { RequestToken } from "../../types/RequestToken";

import type { QueryResult } from "../../types/bga/queries/Query";

import { bgaExtensionSignature, bgaUrl } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";

let cachedRequestToken: RequestToken | undefined;

export async function fetchRequestToken(force: boolean = false): Promise<RequestToken> {
	if (!force && cachedRequestToken) {
		return cachedRequestToken;
	}

	const url = `${bgaUrl}/account/account/getRequestToken.html?${bgaExtensionSignature}`;
	const result = await fetchFromUrl<QueryResult<{ request_token: RequestToken }>>(url);

	if (result.status === "0") {
		const { code, error } = result;
		throw new Error(`Fetching request token failed (${code}: ${error})`);
	}

	cachedRequestToken = result.data.request_token;
	return result.data.request_token;
}
