import { fetchActivityForPlayer } from "./utils/fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetch/fetchCurrentPlayer";
import { fetchTablesFromTableManager } from "./utils/fetch/fetchTablesFromTableManager";
import { setBadge } from "./utils/badge/setBadge";
import { updateBadgeAndIcon } from "./utils/updateBadgeAndIcon";
import { castToString } from "./types/bga/Player";

import type Configuration from "./config/configuration";

export async function bgPeriodic(config: Configuration) {
	try {
		if (config.isTrackingEnable()) {
			console.debug("[bga extension] Track opened tables and player state");

			// Fetch current player info
			const { token: playerToken, id: playerId } = await fetchCurrentPlayer();

			if (!playerId) {
				setBadge({ text: "-", color: "#757575" });
				return;
			}

			// Fetch number of waiting tables
			const { nbWaitingTables } = await fetchActivityForPlayer(playerId, playerToken);

			const tables = await fetchTablesFromTableManager('play');
			const nbPendingInvites = tables.reduce((total, table) => total + (table.players[castToString(playerId)]!.table_status === "expected" ? 1 : 0), 0,);

			updateBadgeAndIcon({ nbPendingInvites, nbWaitingTables, tracking: true, soundNotification: config.isSoundNotificationEnable() });
		} else {
			updateBadgeAndIcon({ nbPendingInvites: 0, nbWaitingTables: 0, tracking: false, soundNotification: false });
		}
	} catch (error) {
		console.error(error);
		setBadge({ text: "x", color: "#dc2626" });
	}
}
