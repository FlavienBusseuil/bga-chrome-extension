// @flow

import type { NumberString } from "../NumberString";

export type MyBgaRbtQueryResultData = {
	t: NumberString, // nb wainting tables
	n: NumberString, // nb unread notifications
	m: NumberString, // nb unread messages
};
