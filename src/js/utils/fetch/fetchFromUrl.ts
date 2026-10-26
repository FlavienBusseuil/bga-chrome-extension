// A request that doesn't answer must not block the popup or the background script
const REQUEST_TIMEOUT = 15000;

export async function fetchFromUrl<D>(url: string, requestToken?: string): Promise<D> {
    const headers: Record<string, string> = {};

    if (requestToken) {
        headers["x-request-token"] = requestToken;
    }

    let response: Response;
    try {
        response = await fetch(url, { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
    } catch (error) {
        throw new Error(`Fetching ${url} failed. Please try again. (${error})`);
    }

    // An error page (BGA unavailable, maintenance...) is not JSON: give a clear error
    if (!response.ok) {
        throw new Error(`Fetching ${url} failed (HTTP ${response.status}). Please try again.`);
    }

    return parseJsonResponse(url, response);
}

// During incidents, BGA may answer HTTP 200 with a body which is not valid JSON (PHP warnings added to the JSON...)
export async function parseJsonResponse<D>(url: string, response: Response): Promise<D> {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error(`[bga extension] Invalid response from ${url}`, { error, response: text.substring(0, 500) });
        throw new Error(`Fetching ${url} failed (invalid response, BGA may be unavailable). Please try again.`);
    }
}
