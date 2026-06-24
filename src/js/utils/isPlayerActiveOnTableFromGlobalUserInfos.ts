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
	try {
		const tableInfos = globalUserInfos.table_infos?.tables[tableId];

		if (tableInfos) {
			const playerInfo = tableInfos.players[playerId];

			if (playerInfo?.myturn === '1') {
				return true;
			}
		}
	}
	catch (error) {
		console.error("Exception occured in isPlayerActiveOnTableFromGlobalUserInfos", error);
	}

	return false;
}
