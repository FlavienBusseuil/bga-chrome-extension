import { castToString, type PlayerId } from "../../types/bga/Player";

import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";
import type { Table } from "../../types/bga/queries/TableManager";
import type { Group } from "../../types/bga/Group";

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
		isLoggedOut: false
		nbWaitingTables: number,
		nbPendingInvites: number,
		currentPlayerId: PlayerId,
		globalUserInfos: GlobalUserInfos,
		translations: Translations,
		tournaments: Array<Tournament>,
		tables: Array<Table>,
		getGroupTables: (groupId: string) => Promise<Array<Table>>,
		groups: Group[],
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
	const groups: Group[] = Object.keys(globalUserInfos.group_types)
		.filter(groupId => globalUserInfos.group_types[groupId] === "normal")
		.map(groupId => ({ id: groupId, name: globalUserInfos.group_names[groupId] || '' }))
		.filter(g => g.name && !g.name.endsWith("players"));

	groups.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

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

	const playersByGroups: Record<string, any> = {};

	const isTablePlayersMatching = (t: Table, players: string[]) => {
		return t.table_creator && players.includes(castToString(t.table_creator)) && !Object.keys(t.players).includes(currentPlayerId);
	};

	const isTableGroupsMatching = (t: Table) => {
		if (!t.filter_group) {
			return true;
		}
		if (t.filter_group_type === 'friend') {
			return t.admin_id && friends.includes(castToString(t.admin_id));
		}
		return groups.find(g => g.id === t.filter_group);
	};

	const getPlayersTables = async (players: string[]) => {
		const result = await Promise.all([
			fetchTablesFromTableManager({ requestToken, status: 'realtime_open' }),
			fetchTablesFromTableManager({ requestToken, status: 'async_open' })
		]);

		const list = [...result[0], ...result[1]];
		return list.filter(t => isTablePlayersMatching(t, players)).filter(isTableGroupsMatching);
	};

	const getGroupTables = async (groupId: string) => {
		let players = groupId === "0" ? friends : playersByGroups[groupId];

		if (!players) {
			players = await fetchGroupPlayers(+groupId);
			playersByGroups[groupId] = players;
		}

		return await getPlayersTables(players);
	};

	const nbPendingInvites = tables.reduce((total, table) => total + (table.players[currentPlayer.id]?.table_status === "expected" ? 1 : 0), 0);

	const tournaments = await fetchTournaments({ requestToken });

	return {
		isLoggedOut: false,
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
