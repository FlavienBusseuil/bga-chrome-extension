// @flow

import type { MyBgaRbtQueryResultData } from "../../../types/bga/queries/MyBgaRbt";

import { castToNumberString } from "../../../types/bga/NumberString";
import { castToPlayerId } from "../../../types/bga/Player";
import { castToToken } from "../../../types/bga/Token";

export const presentation: { [string]: MyBgaRbtQueryResultData } = {
	"84278471": {
		t: castToNumberString("3"),
		n: castToNumberString("0"),
		m: castToNumberString("0"),
	},
};
