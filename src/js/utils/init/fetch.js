// @flow
import type { PlayerId } from "../../types/bga/Player";

import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";
import type { Table } from "../../types/bga/queries/TableManager";

import { castToString } from "../../types/bga/Table";
import { fetchActivityForPlayer } from "../fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "../fetch/fetchCurrentPlayer";
import { fetchGlobalInfo } from "../fetch/fetchGlobalInfo";
import { fetchGlobalTranslations } from "../fetch/fetchGlobalTranslations";
import { fetchTablesFromTableManager } from "../fetch/fetchTablesFromTableManager";
import type { Translations } from "../../types/bga/Translations";

type Output = Promise<
	| {
			nbWaitingTables: number,
			currentPlayerId: PlayerId,
			globalUserInfos: GlobalUserInfos,
			translations: Translations,
			assetsUrl: string,
			tables: Array<Table>,
	  }
	| { isLoggedOut: true },
>;

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

	return {
		nbWaitingTables,
		currentPlayerId,
		globalUserInfos,
		translations,
		assetsUrl,
		tables,
	};
}
