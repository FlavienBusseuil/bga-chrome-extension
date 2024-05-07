// @flow

import { cn } from "./utils/cn";

function getIndicatorClassnames({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isTurnBased,
	isWaitingCurrentPlayer,
	motionSensitivityEnable
}) {
	if (!isTurnBased) {
		return motionSensitivityEnable ? "bg-yellow-300" : "bg-yellow-300 animate-pulse-0.25";
	}

	if (isWaitingCurrentPlayer) {
		return motionSensitivityEnable ? "bg-bgaGreen" : "bg-bgaGreen animate-pulse-0.5";
	}

	if (isInvitePendingForCurrentPlayer) {
		return motionSensitivityEnable ? "bg-bgaOrange" : "bg-bgaOrange animate-pulse-0.5";
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
	motionSensitivityEnable: boolean
};

export function TableIndicator({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isTurnBased,
	isWaitingCurrentPlayer,
	motionSensitivityEnable
}: Props): React$Element<"div"> {
	return (
		<div
			className={cn([
				"absolute",
				getIndicatorClassnames({
					isInvitePendingForCurrentPlayer,
					isOpenForPlayers,
					isTurnBased,
					isWaitingCurrentPlayer,
					motionSensitivityEnable
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
