import { ComponentChildren } from "preact";

type Props = {
	children: ComponentChildren;
};

export function PlayerList({ children }: Props) {
	return <ul className="player-list">{children}</ul>;
}
