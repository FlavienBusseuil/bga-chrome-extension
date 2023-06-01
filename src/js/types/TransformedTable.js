// @flow

import type { PlayerId } from "./bga/Player";
import type { TableId } from "./bga/Table";

export type TransformedTable = {
	acceptInviteLink: string,
	declineInviteLink: string,
	gameName: string,
	gameStart: null | Date,
	hasArenaMode: boolean,
	hasTrainingMode: boolean,
	isOpenForPlayers: boolean,
	isPartOfTournament: boolean,
	isTurnBased: boolean,
	link: string,
	nbMaxPlayers: number,
	players: Array<{
		playerId: PlayerId,
		playerName: null | string,
		isActivePlayer: boolean,
		isCurrentPlayer: boolean,
		isInvitePending: boolean,
	}>,
	tableCreatorName: null | string,
	tableId: TableId,
	tableImg: string,
};
