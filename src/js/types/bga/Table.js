// @flow

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
	[string]: string,
};

export function castToTableId(tableId: string): TableId {
	return tableId;
}

export function castToString(tableId: TableId): string {
	return tableId;
}
