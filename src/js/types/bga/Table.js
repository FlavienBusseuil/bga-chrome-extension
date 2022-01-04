// @flow

import type { BooleanString } from "./BooleanString";

export opaque type TableId = string;

export type TableStatus =
	| "asyncinit"
	| "asyncopen"
	| "asyncplay"
	| "play"
	| "tournamentopen"
	| "finished"
	| "archive";

export type BasicTableOptions = {
	"201": BooleanString,
	[string]: string,
};

export function castToTableId(tableId: string): TableId {
	return tableId;
}

export function castToString(tableId: TableId): string {
	return tableId;
}
