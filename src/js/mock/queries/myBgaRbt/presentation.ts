import type { MyBgaRbtQueryResultData } from "../../../types/bga/queries/MyBgaRbt";

import { castToNumberString } from "../../../types/bga/NumberString";
import { castToPlayerId, PlayerId } from "../../../types/bga/Player";

export const presentation: { [playerId: PlayerId]: MyBgaRbtQueryResultData } = {
	[castToPlayerId("84278471")]: {
		t: castToNumberString("3"),
		n: castToNumberString("0"),
		m: castToNumberString("0"),
	},
};
