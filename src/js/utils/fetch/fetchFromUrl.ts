import type { FetchOptions } from "../../types/FetchOptions";

export async function fetchFromUrl<D>(
    url: string,
    options?: Partial<FetchOptions>
): Promise<D> {
    const headers: Record<string, string> = {};

    if (options?.requestToken) {
        headers["x-request-token"] = options.requestToken;
    }

    return fetch(url, { headers })
        .catch((error) => {
            throw new Error(
                `Fetching ${url} failed. Please try again. (${error})`
            );
        })
        .then((response) => response.json());
}
