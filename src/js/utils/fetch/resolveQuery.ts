import type { RequestToken } from "../../types/RequestToken";
import type {
    QueryResultData,
    QueryFailedResult
} from "../../types/bga/queries/Query";
import type { MockResolver } from "./resolveFromMock";

import { isDataMocked } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { fetchRequestToken } from "./fetchRequestToken";
import { resolveFromMock } from "./resolveFromMock";

interface QueryInput {
    fromMock: MockResolver;
    fromUrl: {
        url: string;
        requestToken: RequestToken;
    };
}

interface ResolveQueryInput extends QueryInput {
    isRetrying?: boolean;
    onRefreshRequestToken?: ((requestToken: RequestToken) => void) | undefined;
}

function isQueryFailedResult(result: QueryResultData): result is QueryFailedResult {
    return 'error' in result && 'code' in result;
}

async function runQuery<T extends QueryResultData>({
    fromMock,
    fromUrl: { url, requestToken },
}: QueryInput): Promise<T> {
    if (isDataMocked) {
        return resolveFromMock<T>(fromMock);
    }

    return fetchFromUrl<T>(url, { requestToken });
}

export async function resolveQuery<T extends QueryResultData>({
    fromMock,
    fromUrl: { url, requestToken },
    isRetrying = false,
    onRefreshRequestToken,
}: ResolveQueryInput): Promise<T> {
    const result = await runQuery<T>({
        fromMock,
        fromUrl: { url, requestToken },
    });

    if (isQueryFailedResult(result) && result.code === 806) {
        if (isRetrying) {
            throw new Error(result.error);
        }

        const newRequestToken = await fetchRequestToken();
        if (onRefreshRequestToken) {
            onRefreshRequestToken(newRequestToken);
        }

        return resolveQuery<T>({
            fromMock,
            fromUrl: { url, requestToken: newRequestToken },
            isRetrying: true,
            onRefreshRequestToken,
        });
    }

    return result;
}
