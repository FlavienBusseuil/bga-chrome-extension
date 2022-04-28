// @flow
import { fetchActivityForPlayer } from "./utils/fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetch/fetchCurrentPlayer";
import { fetchTablesFromTableManager } from "./utils/fetch/fetchTablesFromTableManager";
import { setBadge } from "./utils/badge/setBadge";
import { updateBadgeAndIcon } from "./utils/updateBadgeAndIcon";
import { castToString } from "./types/bga/Player";
import { fetchRequestToken } from "./utils/fetch/fetchRequestToken";

export async function bgPeriodic() {
	try {
		const requestToken = await fetchRequestToken();

		// Fetch current player info
		const { token: playerToken, id: playerId } = await fetchCurrentPlayer({
			requestToken,
		});

		if (!playerId) {
			setBadge({ text: "-", color: "#757575" });
			return;
		}

		// Fetch number of waiting tables
		const { nbWaitingTables } = await fetchActivityForPlayer(
			{
				playerToken,
				playerId,
			},
			{ requestToken },
		);

		const tables = await fetchTablesFromTableManager({ requestToken });
		const nbPendingInvites = tables.reduce(
			(total, table) =>
				total +
				(table.players[castToString(playerId)].table_status ===
				"expected"
					? 1
					: 0),
			0,
		);

		updateBadgeAndIcon({ nbPendingInvites, nbWaitingTables });
	} catch (error) {
		console.error(error);
		setBadge({ text: "x", color: "#dc2626" });
	}
}
