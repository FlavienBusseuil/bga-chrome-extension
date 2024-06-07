// @flow
import type { PlayerId } from "../../types/bga/Player";

import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";
import type { Table } from "../../types/bga/queries/TableManager";

import { fetchActivityForPlayer } from "../fetch/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "../fetch/fetchCurrentPlayer";
import { fetchGlobalInfo } from "../fetch/fetchGlobalInfo";
import { fetchGroupPlayers } from "../fetch/fetchGroupPlayers";
import { fetchTranslations } from "../fetch/fetchTranslations";
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
		getGroupsTables: (groupId: string) => Promise<Array<Table>>,
		groups: string[],
	}
	| { isLoggedOut: true };

type Output = Promise<FetchResult>;

export async function fetch(): Output {
	// Fetch global info
	const { globalUserInfos, assetsUrl, jsBundleVersion } = await fetchGlobalInfo();
	const { lang } = globalUserInfos;

	const requestToken = await fetchRequestToken();

	// Fetch current player info
	const currentPlayer = await fetchCurrentPlayer({ requestToken });
	const { token: currentPlayerToken, id: currentPlayerId } = currentPlayer;

	// No user logged
	if (!currentPlayerToken || !currentPlayerId) {
		return { isLoggedOut: true };
	}

	const friends = Object.keys(globalUserInfos.friends);
	const groups = Object.keys(globalUserInfos.group_types)
		.filter(groupId => globalUserInfos.group_types[groupId] === "normal")
		.map(groupId => ({ id: groupId, name: globalUserInfos.group_names[groupId] }))
		.filter(g => !g.name.endsWith("players"));

	groups.sort((a, b) => a.name.localeCompare(b.name));

	// Fetch number of waiting tables, global translation, friends and tables
	const [activityForPlayer, translations, tables] = await Promise.all([
		fetchActivityForPlayer(
			{
				playerToken: currentPlayerToken,
				playerId: currentPlayerId,
			},
			{ requestToken },
		),
		fetchTranslations({
			assetsUrl,
			jsBundleVersion,
			lang,
		}),
		fetchTablesFromTableManager({ requestToken, status: 'play' })
	])

	const { nbWaitingTables } = activityForPlayer;

	const playersByGroups = {};

	const getPlayersTables = async (players: string[]) => {
		const result = await Promise.all([
			fetchTablesFromTableManager({ requestToken, status: 'realtime_open' }),
			fetchTablesFromTableManager({ requestToken, status: 'async_open' })
		]);

		const list = [...result[0], ...result[1]];
		return list.filter(t => players.includes(t.table_creator) && !Object.keys(t.players).includes(currentPlayerId));
	};

	const getGroupTables = async (groupId: string) => {
		let players = groupId === "0" ? friends : playersByGroups[groupId];

		if (!players) {
			players = await fetchGroupPlayers(groupId);
			playersByGroups[groupId] = players;
		}

		return await getPlayersTables(players);
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
		getGroupTables,
		groups,
	};
}
