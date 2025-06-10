import type { BooleanString } from "./BooleanString";

export type TableId = string & { readonly __brand: unique symbol };;

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
} & Record<string, string>;

export function castToTableId(tableId: string): TableId {
	return tableId as TableId;
}

export function castToString(tableId: TableId): string {
	return tableId;
}
