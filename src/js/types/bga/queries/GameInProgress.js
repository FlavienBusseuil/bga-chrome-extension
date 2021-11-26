// @flow

import type { PlayerId } from "../Player";

export type GlobalUserInfos = {
	async_status: {
		[tableId: string]: {
			actives?: Array<PlayerId>,
		},
	},
};

export type GameInProgress = string;
