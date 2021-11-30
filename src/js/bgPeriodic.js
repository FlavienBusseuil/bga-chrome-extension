// @flow
import { fetchActivityForPlayer } from "./utils/fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetch/fetchCurrentPlayer";
import { fetchTablesFromTableManager } from "./utils/fetch/fetchTablesFromTableManager";
import { setBadge } from "./utils/badge/setBadge";
import { updateBadge } from "./utils/updateBadge";
import { castToString } from "./types/bga/Player";

export async function bgPeriodic() {
	try {
		// Fetch current player info
		const { token: playerToken, id: playerId } = await fetchCurrentPlayer();

		if (!playerId) {
			setBadge({ text: "-", color: "#757575" });
			return;
		}

		// Fetch number of waiting tables
		const { nbWaitingTables } = await fetchActivityForPlayer({
			playerToken,
			playerId,
		});

		const tables = await fetchTablesFromTableManager();
		const nbPendingInvites = tables.reduce(
			(total, table) =>
				total +
				(table.players[castToString(playerId)].table_status ===
				"expected"
					? 1
					: 0),
			0,
		);

		updateBadge({ nbPendingInvites, nbWaitingTables });
	} catch (error) {
		console.error(error);
		setBadge({ text: "x", color: "#dc2626" });
	}
}
