export function sort(tables) {
	return tables.sort(
		(
			{
				isOpenForPlayers: isOpenForPlayers1,
				gameName: gameName1,
				players: players1,
			},
			{
				isOpenForPlayers: isOpenForPlayers2,
				gameName: gameName2,
				players: players2,
			},
		) => {
			const isWaitingCurrentPlayer1 = players1.some(
				({ isCurrentPlayer, isActivePlayer }) =>
					isCurrentPlayer && isActivePlayer,
			);
			const isWaitingCurrentPlayer2 = players2.some(
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

			return (
				// Sort by: active tables for current player
				isWaitingCurrentPlayer2 - isWaitingCurrentPlayer1 ||
				// pending invites for current player
				isInvitePendingForCurrentPlayer2 -
					isInvitePendingForCurrentPlayer1 ||
				// open tables
				isOpenForPlayers2 - isOpenForPlayers1 ||
				// game names
				gameName1.localeCompare(gameName2)
			);
		},
	);
}
