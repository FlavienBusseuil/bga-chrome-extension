// @flow

import type { PlayerId } from "../../types/bga/Player";

import type { TableId } from "../../types/bga/Table";
import type { Translations } from "../../types/bga/Translations";
import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";

import type { Table } from "../../types/bga/queries/TableManager";

import { castToString as castPlayerIdToString } from "../../types/bga/Player";
import { castToString as castTableIdToString } from "../../types/bga/Table";
import {
	castToString as castNumberStringToString,
	castToNumber,
} from "../../types/bga/NumberString";
import { bgaUrl } from "../constants";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "../isPlayerActiveOnTableFromGlobalUserInfos";
import type { TransformedTable } from "../../types/TransformedTable";
import { castToDate } from "../../types/bga/DateString";
import { castToBoolean } from "../../types/bga/BooleanString";

type InputTransformTable = {
	assetsUrl: string,
	currentPlayerId: PlayerId,
	globalUserInfos: GlobalUserInfos,
	table: Table,
	translations: Translations,
};

function getTableCreatorName({ tableCreatorPlayerId, players }): null | string {
	if (!tableCreatorPlayerId) {
		return null;
	}

	// It seems that sometime players may not have a fullname attribut [issues/18]
	// So we fall back on tableCreatorPlayerId
	return (
		players[castPlayerIdToString(tableCreatorPlayerId)].fullname ??
		castPlayerIdToString(tableCreatorPlayerId)
	);
}

export function transformTable({
	currentPlayerId,
	globalUserInfos,
	translations,
	assetsUrl,
	table,
}: InputTransformTable): TransformedTable {
	const {
		id: tableId,
		players,
		game_name: gameNameKey,
		gamestart: gameStart,
		gameserver: gameServer,
		options,
		table_creator: tableCreatorPlayerId,
		status,
		max_player: nbMaxPlayers,
		has_tournament,
	} = table;

	return {
		acceptInviteLink: `${bgaUrl}/table/table/joingame.html?table=${castTableIdToString(
			tableId,
		)}`,
		declineInviteLink: `${bgaUrl}/table/table/refuseInvitation.html?table=${castTableIdToString(
			tableId,
		)}`,
		// It seems that sometime some translations doesn't exists for some game [issues/22]
		// So we fall back on gameNameKey
		gameName: translations[`${gameNameKey}_displayed`] ?? gameNameKey,
		gameStart: gameStart ? castToDate(gameStart) : null,
		hasArenaMode: castToBoolean(options["201"]),
		isOpenForPlayers: status === "asyncopen",
		isTurnBased: ["asyncplay", "asyncopen", "asyncinit"].includes(status),
		isPartOfTournament: castToBoolean(has_tournament),
		link: `${bgaUrl}/${castNumberStringToString(
			gameServer,
		)}/${gameNameKey}?table=${castTableIdToString(tableId)}`,
		nbMaxPlayers: castToNumber(nbMaxPlayers),
		tableCreatorName: getTableCreatorName({
			tableCreatorPlayerId,
			players,
		}),
		tableId,
		tableImg: `${assetsUrl}games/${gameNameKey}/current/img/game_icon.png`,
		players: Object.keys(players).map(playerKey => {
			const {
				fullname: playerName = null,
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

type Input = {
	assetsUrl: string,
	currentPlayerId: PlayerId,
	globalUserInfos: GlobalUserInfos,
	tables: Array<Table>,
	translations: Translations,
};

export function transformTables({
	assetsUrl,
	currentPlayerId,
	globalUserInfos,
	tables,
	translations,
}: Input): Array<TransformedTable> {
	return tables.map(table =>
		transformTable({
			assetsUrl,
			currentPlayerId,
			globalUserInfos,
			table,
			translations,
		}),
	);
}
