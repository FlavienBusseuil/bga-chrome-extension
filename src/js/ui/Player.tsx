import { useContext, useState } from "preact/hooks";
import { i18n } from "../utils/browser/i18n";
import { CompactContext } from "./PlayerList";
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
	// In compact mode, the name is shown by the floating label of the list (data-label, data-state)
	const compact = useContext(CompactContext);

	return (
		<li
			className={cn(["player", isActivePlayer && "player--active", isInvitePending && "player--pending"])}
			title={compact ? undefined : name}
			data-label={name}
			data-state={isActivePlayer ? "active" : isInvitePending ? "pending" : undefined}
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

// A single chip for all the free seats of a table
export function EmptySeats({ count }: { count: number }) {
	if (count <= 0) {
		return null;
	}

	const label = i18n(count === 1 ? "empty_seat" : "empty_seats").replace("$count$", `${count}`);
	// The short label is shown in compact mode, the full one in the floating label of the list
	return (
		<li className="player player--seat" data-label={label} data-state="seat">
			<span className="player-seat-label">+ {label}</span>
			<span className="player-seat-count">+{count}</span>
		</li>
	);
}
