import type { PlayerId } from "../Player";
import type { Token } from "../Token";

export interface MyWhoQueryResultData {
	id: PlayerId,
	n: string,
	s: Token,
};
