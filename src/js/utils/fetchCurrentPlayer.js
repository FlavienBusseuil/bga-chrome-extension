import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchCurrentPlayer() {
	return fetch(`${bgaUrl}/my?who&${bgaExtensionUrlSignature}`)
		.then(response => response.json())
		.then(({ id, n: name, s: token, ...rest }) => ({
			id,
			name,
			token,
			...rest,
		}));
}
