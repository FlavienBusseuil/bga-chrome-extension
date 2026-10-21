import { ComponentChildren, createContext } from "preact";
import { cn } from "./utils/cn";

type Props = {
	compact: boolean;
	children: ComponentChildren;
};

// The players know if the list is compact: their name is then shown by the floating label, not by a native tooltip
export const CompactContext = createContext(false);

// A single floating label for the whole popup, below the hovered player. It is added to the body: a card hides its
// overflow, and it doesn't catch the mouse, so that the next players stay reachable.
let label: HTMLDivElement | null = null;

const getLabel = () => {
	if (!label) {
		label = document.createElement("div");
		label.className = "player-label";
		label.setAttribute("role", "tooltip");
		document.body.append(label);
		// The lists scroll: the label would stay at its place
		window.addEventListener("scroll", hideLabel, { capture: true, passive: true });
	}
	return label;
};

const showLabel = (player: HTMLElement) => {
	const text = player.dataset.label;
	if (!text) {
		return;
	}

	const element = getLabel();
	element.textContent = text;
	element.dataset.state = player.dataset.state ?? "";

	// Centered below the player, kept inside the popup
	const rect = player.getBoundingClientRect();
	const width = element.offsetWidth;
	const maxLeft = document.documentElement.clientWidth - width - 4;
	element.style.left = `${Math.max(4, Math.min(rect.left + rect.width / 2 - width / 2, maxLeft))}px`;
	element.style.top = `${rect.bottom + 6}px`;
	element.classList.add("player-label--visible");
};

const hideLabel = () => {
	label?.classList.remove("player-label--visible");
};

// In compact mode, only the avatars of the players are shown: the name of a player is shown on mouse over
export function PlayerList({ compact, children }: Props) {
	const onMouseOver = (event: MouseEvent) => {
		const player = (event.target as Element).closest<HTMLElement>(".player");
		if (player) {
			showLabel(player);
		}
	};

	return (
		<CompactContext.Provider value={compact}>
			<ul
				className={cn(["player-list", compact && "player-list--compact"])}
				onMouseOver={compact ? onMouseOver : undefined}
				onMouseLeave={compact ? hideLabel : undefined}
			>
				{children}
			</ul>
		</CompactContext.Provider>
	);
}
