import type { PlayerId } from "../../types/bga/Player";

import type { Translations } from "../../types/bga/Translations";
import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";

import type { Table } from "../../types/bga/queries/TableManager";

import { castToString as castPlayerIdToString } from "../../types/bga/Player";
import { castToString as castTableIdToString } from "../../types/bga/Table";
import {
	castToString as castNumberStringToString,
	castToNumber,
} from "../../types/bga/NumberString";
import { bgaAvatarUrl, bgaGameMediaUrl, bgaUrl } from "../constants";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "../isPlayerActiveOnTableFromGlobalUserInfos";
import type { TransformedTable } from "../../types/TransformedTable";
import { castToDate } from "../../types/bga/DateString";
import { castToBoolean } from "../../types/bga/BooleanString";

type InputTransformTable = {
	currentPlayerId: PlayerId,
	globalUserInfos: GlobalUserInfos,
	table: Table,
	translations: Translations,
};

export function getTableCreatorName({ tableCreatorPlayerId, players }: { tableCreatorPlayerId: PlayerId | null, players: Table['players'] }): null | string {
	if (!tableCreatorPlayerId) {
		return null;
	}

	// It seems that sometime players may not have a fullname attribut [issues/18]
	// So we fall back on tableCreatorPlayerId
	return (
		players[castPlayerIdToString(tableCreatorPlayerId)]?.fullname ??
		castPlayerIdToString(tableCreatorPlayerId)
	);
}

// Uploaded avatar: https://x.boardgamearena.net/data/avatar/0/85/85147/85147159_50.jpg?h=a6a52d8b50
// Avatar picked in BGA's default gallery (avatar = "_def_2085"): https://x.boardgamearena.net/data/avatar/defaults/default-2085_92.jpg
export function getAvatarUrl(playerId: PlayerId, avatarHash: string | undefined, size = 50): null | string {
	if (!avatarHash) {
		return null;
	}

	// 92px is the only size seen so far for default avatars
	if (avatarHash.startsWith("_def_")) {
		return `${bgaAvatarUrl}defaults/default-${avatarHash.slice("_def_".length)}_92.jpg`;
	}

	const id = Number(castPlayerIdToString(playerId));
	const folder = [Math.floor(id / 1e9), Math.floor(id / 1e6), Math.floor(id / 1e3)].join("/");
	return `${bgaAvatarUrl}${folder}/${id}_${size}.jpg?h=${avatarHash}`;
}

export function transformTable({
	currentPlayerId,
	globalUserInfos,
	translations,
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
		tournament_id: tournamentId,
	} = table;

	return {
		// It seems that sometime some translations doesn't exists for some game [issues/22]
		// So we fall back on gameNameKey
		gameName: translations[`${gameNameKey}_displayed`] ?? gameNameKey,
		gameStart: gameStart ? castToDate(gameStart) : null,
		hasArenaMode: options["201"] === "2",
		hasTrainingMode: options["201"] === "1",
		isOpenForPlayers: ["asyncopen", "open"].includes(status),
		isTurnBased: ["asyncplay", "asyncopen", "asyncinit"].includes(status),
		isPartOfTournament: castToBoolean(has_tournament),
		tournamentLink: `${bgaUrl}/tournament?id=${tournamentId}`,
		link: `${bgaUrl}/${castNumberStringToString(
			gameServer,
		)}/${gameNameKey}?table=${castTableIdToString(tableId)}`,
		nbMaxPlayers: castToNumber(nbMaxPlayers),
		tableCreatorName: getTableCreatorName({
			tableCreatorPlayerId,
			players,
		}),
		tableId,
		tableImg: `${bgaGameMediaUrl}${gameNameKey}/icon/default.png`,
		// Prefix of the localized box image used by BGA, e.g. .../limit/box/fr_75.png
		tableBoxImg: `${bgaGameMediaUrl}${gameNameKey}/box/`,
		players: Object.keys(players).map((playerKey) => {
			const player = players[playerKey];

			const playerId = player!.id;
			const playerName = player!.fullname ?? null;
			const avatarUrl = getAvatarUrl(playerId, player!.avatar);
			const isCurrentPlayer = currentPlayerId === playerId;
			const isActivePlayer = isPlayerActiveOnTableFromGlobalUserInfos({
				playerId,
				tableId,
				globalUserInfos,
			});
			const isInvitePending = player!.table_status === "expected";

			// Player
			return {
				playerId,
				playerName,
				avatarUrl,
				isActivePlayer,
				isCurrentPlayer,
				isInvitePending,
			};
		}),
	};
}

type Input = {
	currentPlayerId: PlayerId,
	globalUserInfos: GlobalUserInfos,
	tables: Array<Table>,
	translations: Translations,
};

export function transformTables({
	currentPlayerId,
	globalUserInfos,
	tables,
	translations,
}: Input): Array<TransformedTable> {
	return tables.map((table) =>
		transformTable({
			currentPlayerId,
			globalUserInfos,
			table,
			translations,
		}),
	);
}
