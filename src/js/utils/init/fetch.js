// @flow
import type { PlayerId } from "../../types/bga/Player";

import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";
import type { Table } from "../../types/bga/queries/TableManager";

import { fetchActivityForPlayer } from "../fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "../fetch/fetchCurrentPlayer";
import { fetchGlobalInfo } from "../fetch/fetchGlobalInfo";
import { fetchGlobalTranslations } from "../fetch/fetchGlobalTranslations";
import { fetchTablesFromTableManager } from "../fetch/fetchTablesFromTableManager";
import type { Translations } from "../../types/bga/Translations";

export type FetchResult =
	| {
			nbWaitingTables: number,
			nbPendingInvites: number,
			currentPlayerId: PlayerId,
			globalUserInfos: GlobalUserInfos,
			translations: Translations,
			assetsUrl: string,
			tables: Array<Table>,
	  }
	| { isLoggedOut: true };

type Output = Promise<FetchResult>;

export async function fetch(): Output {
	// Fetch global info
	const {
		globalUserInfos,
		assetsUrl,
		jsBundleVersion,
	} = await fetchGlobalInfo();

	// Fetch current player info
	const currentPlayer = await fetchCurrentPlayer();
	const { token: currentPlayerToken, id: currentPlayerId } = currentPlayer;

	// No user logged
	if (!currentPlayerToken || !currentPlayerId) {
		return { isLoggedOut: true };
	}

	// Fetch number of waiting tables
	const { nbWaitingTables } = await fetchActivityForPlayer({
		playerToken: currentPlayerToken,
		playerId: currentPlayerId,
	});

	// Fetch global translations
	const translations = await fetchGlobalTranslations({
		assetsUrl,
		jsBundleVersion,
	});

	const tables = await fetchTablesFromTableManager();

	const nbPendingInvites = tables.reduce(
		(total, table) =>
			total +
			(table.players[String(currentPlayer.id)].table_status === "expected"
				? 1
				: 0),
		0,
	);

	return {
		nbWaitingTables,
		nbPendingInvites,
		currentPlayerId,
		globalUserInfos,
		translations,
		assetsUrl,
		tables,
	};
}
