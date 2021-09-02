import { Component } from "./base/Component";

function getIncatorClassnames({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isWaitingCurrentPlayer,
}) {
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

export const TableIndicator = ({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isWaitingCurrentPlayer,
}) => {
	return Component("div", {
		className: `absolute ${getIncatorClassnames({
			isInvitePendingForCurrentPlayer,
			isOpenForPlayers,
			isWaitingCurrentPlayer,
		})} h-full left-0 right-0 top-0 transform w-2`,
	});
};
