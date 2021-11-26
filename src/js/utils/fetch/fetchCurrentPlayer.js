// @flow
import { fetchFromUrl } from "../fetch/fetchFromUrl";
import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import { resolveQuery } from "./resolveQuery";
import type { PlayerId } from "../../types/bga/Player";
import type { Token } from "../../types/bga/Token";

export async function fetchCurrentPlayer(): Promise<{
	id: PlayerId,
	name: string,
	token: Token,
}> {
	const { id, n: name, s: token } = await resolveQuery<MyWhoQueryResultData>({
		fromMock: { path: "myWho" },
		fromUrl: `${bgaUrl}/my?who&${bgaExtensionUrlSignature}`,
	});

	return {
		id,
		name,
		token,
	};
}
