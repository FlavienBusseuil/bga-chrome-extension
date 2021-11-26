// @flow
import type { PlayerId } from "../../types/bga/Player";

import type { Token } from "../../types/bga/Token";

import type { MyBgaRbtQueryResultData } from "../../types/bga/queries/MyBgaRbt";

import { castToString as castPlayerIdToString } from "../../types/bga/Player";
import { castToString as castTokenToString } from "../../types/bga/Token";
import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { resolveQuery } from "./resolveQuery";

export async function fetchActivityForPlayer({
	playerId,
	playerToken,
}: {
	playerId: PlayerId,
	playerToken: Token,
}): Promise<{ nbWaitingTables: number }> {
	const { t } = await resolveQuery<MyBgaRbtQueryResultData>({
		fromMock: { path: "myBgaRbt", key: castPlayerIdToString(playerId) },
		fromUrl: `${bgaUrl}/my?bgarbt&id=${castPlayerIdToString(
			playerId,
		)}&s=${castTokenToString(playerToken)}&${bgaExtensionUrlSignature}`,
	});

	return { nbWaitingTables: Number(t) };
}
