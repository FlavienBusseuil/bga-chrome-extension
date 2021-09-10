import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "../isPlayerActiveOnTableFromGlobalUserInfos";

export function transformTable({
	currentPlayerId,
	globalUserInfos,
	translations,
	assetsUrl,
	table,
	tableInfos,
}) {
	const {
		id: tableId,
		players,
		game_name: gameNameKey,
		gameserver: gameServer,
		table_creator: tableCreatorPlayerId,
	} = table;
	const {
		gameversion: gameVersion,
		status,
		max_player: nbMaxPlayers,
	} = tableInfos;

	return {
		acceptInviteLink: `${bgaUrl}/table/table/joingame.html?table=${tableId}&${bgaExtensionUrlSignature}`,
		declineInviteLink: `${bgaUrl}/table/table/refuseInvitation.html?table=${tableId}&${bgaExtensionUrlSignature}`,
		// It seems that sometime some translations doesn't exists for some game [issues/22]
		// So we fall back on gameNameKey
		gameName: translations[`${gameNameKey}_displayed`] ?? gameNameKey,
		isOpenForPlayers: status === "asyncopen",
		link: `${bgaUrl}/${gameServer}/${gameNameKey}?table=${tableId}`,
		nbMaxPlayers,
		// It seems that sometime players may not have a fullname attribut [issues/18]
		// So we fall back on tableCreatorPlayerId
		tableCreatorName:
			players[tableCreatorPlayerId]?.fullname || tableCreatorPlayerId,
		tableId,
		tableImg: `${assetsUrl}games/${gameNameKey}/${gameVersion}/img/game_icon.png`,
		players: Object.keys(players).map(playerKey => {
			const {
				fullname: playerName,
				id: playerId,
				table_status,
			} = players[playerKey];
			const isCurrentPlayer = currentPlayerId === playerId;
			const isActivePlayer = isPlayerActiveOnTableFromGlobalUserInfos({
				playerId,
				tableId,
				globalUserInfos,
			});
			const isInvitePending = table_status === "expected";

			// Player
			return {
				playerId,
				playerName,
				isActivePlayer,
				isCurrentPlayer,
				isInvitePending,
			};
		}),
	};
}

export function transformTables({
	currentPlayerId,
	globalUserInfos,
	translations,
	assetsUrl,
	tables,
	tablesInfos,
}) {
	return tables.map(table =>
		transformTable({
			currentPlayerId,
			globalUserInfos,
			translations,
			assetsUrl,
			table,
			tableInfos: tablesInfos[table.id],
		}),
	);
}
