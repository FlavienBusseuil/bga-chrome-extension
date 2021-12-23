// @flow

import { cn } from "./utils/cn";

function getIncatorClassnames({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isTurnBased,
	isWaitingCurrentPlayer,
}) {
	if (!isTurnBased) {
		return "bg-yellow-300 animate-pulse-0.25";
	}

	if (isWaitingCurrentPlayer) {
		return "bg-bgaGreen animate-pulse-0.5";
	}

	if (isInvitePendingForCurrentPlayer) {
		return "bg-bgaOrange animate-pulse-0.5";
	}

	if (isOpenForPlayers) {
		return "bg-bgaOrange";
	}

	return "bg-bgaBlue-lighter";
}

type Props = {
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
	isTurnBased: boolean,
	isWaitingCurrentPlayer: boolean,
};

export function TableIndicator({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isTurnBased,
	isWaitingCurrentPlayer,
}: Props): React$Element<"div"> {
	return (
		<div
			className={cn([
				"absolute",
				getIncatorClassnames({
					isInvitePendingForCurrentPlayer,
					isOpenForPlayers,
					isTurnBased,
					isWaitingCurrentPlayer,
				}),
				"h-full",
				"left-0",
				"right-0",
				"top-0",
				"transform",
				"w-2",
			])}
		/>
	);
}
