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
		return "player--active";
	}

	return "";
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
		<li className={`player ${playerNameColorClassname}`}>
			{hasPrefix && (
				<span className="icon-prefix">
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
