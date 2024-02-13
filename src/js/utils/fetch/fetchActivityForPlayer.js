// @flow
import type { FetchOptions } from "../../types/FetchOptions";
import type { PlayerId } from "../../types/bga/Player";

import type { Token } from "../../types/bga/Token";

import type { MyBgaRbtQueryResultData } from "../../types/bga/queries/MyBgaRbt";

import { castToString as castPlayerIdToString } from "../../types/bga/Player";
import { castToString as castTokenToString } from "../../types/bga/Token";
import { bgaUrl } from "../constants";
import { resolveQuery } from "./resolveQuery";

type PlayerInput = {
	playerId: PlayerId,
	playerToken: Token,
};

export async function fetchActivityForPlayer(
	{ playerId, playerToken }: PlayerInput,
	{ requestToken }: FetchOptions,
): Promise<{ nbWaitingTables: number }> {
	const url = `${bgaUrl}/my?bgarbt&id=${castPlayerIdToString(
		playerId,
	)}&s=${castTokenToString(playerToken)}`;
	const { t } = await resolveQuery<MyBgaRbtQueryResultData>({
		fromMock: { path: "myBgaRbt", key: castPlayerIdToString(playerId) },
		fromUrl: {
			url,
			requestToken,
		},
	});

	return { nbWaitingTables: Number(t) };
}
