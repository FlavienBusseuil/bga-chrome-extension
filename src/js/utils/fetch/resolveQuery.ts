import type { RequestToken } from "../../types/RequestToken";
import type { QueryResultData, QueryFailedResult } from "../../types/bga/queries/Query";
import { fetchFromUrl } from "./fetchFromUrl";
import { fetchRequestToken } from "./fetchRequestToken";

function isQueryFailedResult(result: QueryResultData): result is QueryFailedResult {
    return 'error' in result && 'code' in result;
}

async function runQuery<T extends QueryResultData>(url: string, requestToken: RequestToken): Promise<T> {
    return fetchFromUrl<T>(url, requestToken);
}

export async function resolveQuery<T extends QueryResultData>(url: string, isRetrying?: boolean): Promise<T> {
    const requestToken = await fetchRequestToken(isRetrying);
    const result = await runQuery<T>(url, requestToken);

    if (isQueryFailedResult(result) && result.code === 806) {
        if (isRetrying) {
            throw new Error(result.error);
        }

        return resolveQuery<T>(url, true);
    }

    return result;
}
