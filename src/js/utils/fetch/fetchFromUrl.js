// @flow

import type {
	QueryFailedResult,
	QuerySucceededResult,
} from "../../types/bga/queries/Query";

export async function fetchFromUrl<D>(url: string): Promise<D> {
	return fetch(url)
		.catch(error => {
			throw new Error(
				`Fetching ${url} failed. Please try again. (${error})`,
			);
		})
		.then(response => response.json());
}
