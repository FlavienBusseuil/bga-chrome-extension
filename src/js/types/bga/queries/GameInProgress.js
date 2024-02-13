// @flow

import type { LanguageKey } from "../Language";
import type { PlayerId } from "../Player";

export type GlobalUserInfos = {
	async_status: {
		[tableId: string]: {
			actives?: Array<PlayerId>,
		},
	},
	lang: LanguageKey,
	...
};

export type GameInProgress = string;
