import type { PlayerId } from "../../types/bga/Player";
import type { Token } from "../../types/bga/Token";
import type { MyBgaRbtQueryResultData } from "../../types/bga/queries/MyBgaRbt";
import { castToString as castPlayerIdToString } from "../../types/bga/Player";
import { castToString as castTokenToString } from "../../types/bga/Token";
import { bgaUrl } from "../constants";
import { resolveQuery } from "./resolveQuery";

export async function fetchActivityForPlayer(playerId: PlayerId, playerToken: Token): Promise<{ nbWaitingTables: number }> {
	const url = `${bgaUrl}/my?bgarbt&id=${castPlayerIdToString(playerId)}&s=${castTokenToString(playerToken)}`;
	const { t } = await resolveQuery<MyBgaRbtQueryResultData>(url);
	return { nbWaitingTables: Number(t) };
}
