// @flow

import type { MyWhoQueryResultData } from "../../../types/bga/queries/MyWho";

import { castToPlayerId } from "../../../types/bga/Player";
import { castToToken } from "../../../types/bga/Token";

export const presentation: MyWhoQueryResultData = {
	id: castToPlayerId("84278471"),
	n: "anotherFlav",
	s: castToToken(`${Math.random()}`),
};
