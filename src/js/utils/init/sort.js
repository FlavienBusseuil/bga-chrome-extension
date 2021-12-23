// @flow

import type { TransformedTable } from "../../types/TransformedTable";

const order = {
	before: -1,
	equal: 0,
	after: 1,
};

type Order = -1 | 0 | 1;

function getOrderFromPriority(
	hasPriority1: boolean,
	hasPriority2: boolean,
): Order {
	if (hasPriority1 && !hasPriority2) {
		return order.before;
	}

	if (!hasPriority1 && hasPriority2) {
		return order.after;
	}

	return order.equal;
}

function getChronologicalOrderFromDate(date1: Date, date2: Date): Order {
	if (date1 < date2) {
		return order.before;
	}

	if (date1 > date2) {
		return order.after;
	}

	return order.equal;
}

export function sort(tables: Array<TransformedTable>): Array<TransformedTable> {
	return tables.sort(
		(
			{
				isOpenForPlayers: isOpenForPlayers1,
				isTurnBased: isTurnBased1,
				gameName: gameName1,
				gameStart: gameStart1,
				players: players1,
			},
			{
				isOpenForPlayers: isOpenForPlayers2,
				isTurnBased: isTurnBased2,
				gameName: gameName2,
				gameStart: gameStart2,
				players: players2,
			},
		) => {
			const isWaitingCurrentPlayerOnTable1 = players1.some(
				({ isCurrentPlayer, isActivePlayer }) =>
					isCurrentPlayer && isActivePlayer,
			);
			const isWaitingCurrentPlayerOnTable2 = players2.some(
				({ isCurrentPlayer, isActivePlayer }) =>
					isCurrentPlayer && isActivePlayer,
			);

			const isInvitePendingForCurrentPlayer1 = players1.some(
				({ isCurrentPlayer, isInvitePending }) =>
					isCurrentPlayer && isInvitePending,
			);
			const isInvitePendingForCurrentPlayer2 = players2.some(
				({ isCurrentPlayer, isInvitePending }) =>
					isCurrentPlayer && isInvitePending,
			);

			const realtimeTableOneOrder: Order = getOrderFromPriority(
				!isTurnBased1,
				!isTurnBased2,
			);
			const waitingCurrentPlayerOnTableOneOrder: Order = getOrderFromPriority(
				isWaitingCurrentPlayerOnTable1,
				isWaitingCurrentPlayerOnTable2,
			);
			const invitePendingForCurrentPlayerOnTableOneOrder: Order = getOrderFromPriority(
				isInvitePendingForCurrentPlayer1,
				isInvitePendingForCurrentPlayer2,
			);
			const openForPlayersOnTableOneOrder: Order = getOrderFromPriority(
				isOpenForPlayers1,
				isOpenForPlayers2,
			);
			const gameStartOnTableOneOrder: Order = getChronologicalOrderFromDate(
				gameStart1 ?? new Date(0),
				gameStart2 ?? new Date(0),
			);

			return (
				// Sort by:
				// realtime tables
				realtimeTableOneOrder ||
				// active tables for current player
				waitingCurrentPlayerOnTableOneOrder ||
				// pending invites for current player
				invitePendingForCurrentPlayerOnTableOneOrder ||
				// open tables
				openForPlayersOnTableOneOrder ||
				// start date
				gameStartOnTableOneOrder ||
				// game names
				gameName1.localeCompare(gameName2)
			);
		},
	);
}
