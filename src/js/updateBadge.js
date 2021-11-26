import { fetchActivityForPlayer } from "./utils/fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetch/fetchCurrentPlayer";
import { fetchTablesFromTableManager } from "./utils/fetch/fetchTablesFromTableManager";

export async function updateBadge() {
	try {
		// Fetch current player info
		const { token: playerToken, id: playerId } = await fetchCurrentPlayer();

		if (!playerId) {
			// Set badge
			chrome.action.setBadgeBackgroundColor({ color: "#757575" });
			chrome.action.setBadgeText({ text: `-` });
			return;
		}

		// Fetch number of waiting tables
		const { nbWaitingTables } = await fetchActivityForPlayer({
			playerToken,
			playerId,
		});
		console.log(nbWaitingTables);

		const tables = await fetchTablesFromTableManager();
		const nbPendingInvites = Object.keys(tables).reduce(
			(total, tableKey) =>
				total +
				(tables[tableKey].players[playerId].table_status === "expected"
					? 1
					: 0),
			0,
		);

		chrome.action.setBadgeBackgroundColor({ color: "#4871b6" });
		chrome.action.setBadgeText({
			text: `${nbWaitingTables + nbPendingInvites}`,
		});
	} catch (error) {
		console.error(error);
		// Set badge
		chrome.action.setBadgeBackgroundColor({ color: "#dc2626" });
		chrome.action.setBadgeText({ text: `x` });
	}
}
