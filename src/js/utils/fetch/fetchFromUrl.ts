export async function fetchFromUrl<D>(url: string, requestToken?: string): Promise<D> {
    const headers: Record<string, string> = {};

    if (requestToken) {
        headers["x-request-token"] = requestToken;
    }

    return fetch(url, { headers })
        .catch((error) => {
            throw new Error(
                `Fetching ${url} failed. Please try again. (${error})`
            );
        })
        .then((response) => response.json());
}
