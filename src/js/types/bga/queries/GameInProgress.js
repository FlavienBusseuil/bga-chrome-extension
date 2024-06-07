// @flow

import type { LanguageKey } from "../Language";
import type { PlayerId } from "../Player";

export type GlobalUserInfos = {
	async_status: {
		[tableId: string]: {
			actives?: Array<PlayerId>,
		},
	},
	friends: {
		[userId: string]: number
	},
	group_types: {
		[groupId: string]: string
	},
	group_names: {
		[groupId: string]: string
	},
	lang: LanguageKey,
	...
};

export type GameInProgress = string;
