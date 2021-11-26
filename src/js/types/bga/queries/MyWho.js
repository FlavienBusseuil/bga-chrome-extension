// @flow

import type { PlayerId } from "../Player";
import type { Token } from "../Token";

export type MyWhoQueryResultData = {
	id: PlayerId,
	n: string,
	s: Token,
};
