// @flow

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

type Props = {
	playerName: null | string,
	isActivePlayer?: boolean,
	isInvitePending?: boolean,
};

export function Player({
	playerName,
	isActivePlayer = false,
	isInvitePending = false,
}: Props): React$Element<"li"> {
	const hasPrefix = isActivePlayer || isInvitePending;

	const playerNameColorClassname = getPlayerNameColorClassname({
		isActivePlayer,
		isInvitePending,
	});
	return (
		<li className={`${playerNameColorClassname} font-bold`}>
			{hasPrefix && (
				<span className="mr-1">
					{getPlayerNamePrefixText({
						isActivePlayer,
						isInvitePending,
					})}
				</span>
			)}
			{<span>{playerName}</span>}
		</li>
	);
}
