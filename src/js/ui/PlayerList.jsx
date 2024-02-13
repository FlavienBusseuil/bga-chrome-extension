// @flow

import { Player } from "./Player";

type Props = {
	children: Array<React$Element<typeof Player>>,
};

export function PlayerList({ children }: Props): React$Element<"ul"> {
	return <ul className="grid gap-x-2 grid-cols-3">{children}</ul>;
}
