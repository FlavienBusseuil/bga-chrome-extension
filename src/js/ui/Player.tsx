import { useState } from "preact/hooks";
import { i18n } from "../utils/browser/i18n";
import { cn } from "./utils/cn";

function getInitials(name: string) {
	return name.split(/\s+/).map((word) => word[0] ?? "").join("").slice(0, 2).toUpperCase();
}

// Stable color per player name for the initials fallback
function getHue(name: string) {
	return [...name].reduce((hue, char) => (hue * 31 + char.charCodeAt(0)) % 360, 7);
}

interface Props {
	playerName: null | string;
	avatarUrl?: null | string;
	isActivePlayer?: boolean;
	isInvitePending?: boolean;
};

export function Player({
	playerName,
	avatarUrl = null,
	isActivePlayer = false,
	isInvitePending = false,
}: Props) {
	// Not every avatar seems to exist in 50px: retry with the 32px version before falling back to initials
	const sources = avatarUrl ? [...new Set([avatarUrl, avatarUrl.replace("_50.jpg", "_32.jpg")])] : [];
	const [sourceIndex, setSourceIndex] = useState(0);
	const name = playerName ?? "";
	const src = sources[sourceIndex];

	return (
		<li
			className={cn(["player", isActivePlayer && "player--active", isInvitePending && "player--pending"])}
			title={name}
		>
			{src ? (
				<img className="player-avatar" src={src} alt="" onError={() => setSourceIndex(sourceIndex + 1)} />
			) : (
				<span className="player-avatar player-avatar--initials" style={{ backgroundColor: `hsl(${getHue(name)} 45% 45%)` }}>
					{getInitials(name)}
				</span>
			)}
			<span className="player-name">{name}</span>
		</li>
	);
}

export function EmptySeat() {
	return <li className="player player--seat">+ {i18n("empty_seat")}</li>;
}
