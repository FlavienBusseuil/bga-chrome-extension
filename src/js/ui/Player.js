import { Component } from "./base/Component";

function getPlayerNamePrefixText({ isActivePlayer, isInvitePending }) {
	if (isActivePlayer) {
		return "⏳";
	}

	if (isInvitePending) {
		return "📨";
	}

	return "";
}

function getPlayerNameColorClassname({ isActivePlayer, isInvitePending }) {
	if (isActivePlayer) {
		return "text-bgaGreen";
	}

	return "text-bgaBlue-lighter";
}

export const Player = ({
	playerName,
	isActivePlayer = false,
	isInvitePending = false,
}) => {
	const hasPrefix = isActivePlayer || isInvitePending;

	return Component("li", {
		className: `${getPlayerNameColorClassname({
			isActivePlayer,
			isInvitePending,
		})} font-bold`,
		children: [
			hasPrefix &&
				Component("span", {
					className: "mr-1",
					innerText: getPlayerNamePrefixText({
						isActivePlayer,
						isInvitePending,
					}),
				}),
			Component("span", { innerText: `${playerName}` }),
		].filter(Boolean),
	});
};
