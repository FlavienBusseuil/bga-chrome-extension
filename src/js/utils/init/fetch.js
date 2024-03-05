// @flow
import type { PlayerId } from "../../types/bga/Player";

import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";
import type { Table } from "../../types/bga/queries/TableManager";

import { fetchActivityForPlayer } from "../fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "../fetch/fetchCurrentPlayer";
import { fetchGlobalInfo } from "../fetch/fetchGlobalInfo";
import { fetchTranslations } from "../fetch/fetchTranslations";
import { fetchFriends } from "../fetch/fetchFriends";
import { fetchTablesFromTableManager } from "../fetch/fetchTablesFromTableManager";
import type { Translations } from "../../types/bga/Translations";
import { fetchTournaments } from "../fetch/fetchTournaments";
import type { Tournament } from "../../types/bga/queries/TournamentList";
import { fetchRequestToken } from "../fetch/fetchRequestToken";

export type FetchResult =
	| {
		nbWaitingTables: number,
		nbPendingInvites: number,
		currentPlayerId: PlayerId,
		globalUserInfos: GlobalUserInfos,
		translations: Translations,
		tournaments: Array<Tournament>,
		tables: Array<Table>,
		getFriendsTables: () => Promise<Array<Table>>,
	}
	| { isLoggedOut: true };

type Output = Promise<FetchResult>;

export async function fetch(): Output {
	// Fetch global info
	const { globalUserInfos, assetsUrl, jsBundleVersion } =
		await fetchGlobalInfo();
	const { lang } = globalUserInfos;

	const requestToken = await fetchRequestToken();

	// Fetch current player info
	const currentPlayer = await fetchCurrentPlayer({ requestToken });
	const { token: currentPlayerToken, id: currentPlayerId } = currentPlayer;

	// No user logged
	if (!currentPlayerToken || !currentPlayerId) {
		return { isLoggedOut: true };
	}

	// Fetch number of waiting tables
	const { nbWaitingTables } = await fetchActivityForPlayer(
		{
			playerToken: currentPlayerToken,
			playerId: currentPlayerId,
		},
		{ requestToken },
	);

	// Fetch global translations
	const translations = await fetchTranslations({
		assetsUrl,
		jsBundleVersion,
		lang,
	});

	const friends = await fetchFriends({ requestToken });

	const tables = await fetchTablesFromTableManager({ requestToken, status: 'play' });

	const getFriendsTables = async () => {
		const result = await Promise.all([
			fetchTablesFromTableManager({ requestToken, status: 'realtime_open' }),
			fetchTablesFromTableManager({ requestToken, status: 'async_open' })
		]);

		const list = [...result[0], ...result[1]];
		return list.filter(t => friends.includes(t.table_creator));
	};

	const nbPendingInvites = tables.reduce(
		(total, table) =>
			total +
			(table.players[String(currentPlayer.id)].table_status === "expected"
				? 1
				: 0),
		0,
	);

	const tournaments = await fetchTournaments({ requestToken });

	return {
		nbWaitingTables,
		nbPendingInvites,
		currentPlayerId,
		globalUserInfos,
		tournaments,
		translations,
		tables,
		getFriendsTables,
	};
}
