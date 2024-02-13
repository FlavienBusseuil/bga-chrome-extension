// @flow

import type { PlayerId } from "../types/bga/Player";
import type { TableId } from "../types/bga/Table";
import type { GlobalUserInfos } from "../types/bga/queries/GameInProgress";

type Input = {
	playerId: PlayerId,
	tableId: TableId,
	globalUserInfos: GlobalUserInfos,
};

export function isPlayerActiveOnTableFromGlobalUserInfos({
	playerId,
	tableId,
	globalUserInfos,
}: Input): boolean {
	return !!globalUserInfos.async_status[String(tableId)]?.actives?.find(
		(id) => id === playerId,
	);
}
