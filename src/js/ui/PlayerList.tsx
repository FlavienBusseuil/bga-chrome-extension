import { Player } from "./Player";

type Props = {
	children: Array<typeof Player>,
};

export function PlayerList({ children }: Props) {
	return <ul className="grid gap-x-2 grid-cols-4">{children}</ul>;
}
