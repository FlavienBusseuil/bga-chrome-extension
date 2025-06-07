interface PlayerNameProps {
	isActivePlayer: boolean;
	isInvitePending: boolean;
}

function getPlayerNamePrefixText({ isActivePlayer, isInvitePending }: PlayerNameProps) {
	if (isActivePlayer) {
		return "⏳";
	}

	if (isInvitePending) {
		return "📨";
	}

	return "";
}

function getPlayerNameColorClassname({ isActivePlayer }: PlayerNameProps) {
	if (isActivePlayer) {
		return "text-bgaGreen";
	}

	return "text-bgaBlue-lighter";
}

interface Props {
	playerName: null | string;
	isActivePlayer?: boolean;
	isInvitePending?: boolean;
};

export function Player({
	playerName,
	isActivePlayer = false,
	isInvitePending = false,
}: Props) {
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
