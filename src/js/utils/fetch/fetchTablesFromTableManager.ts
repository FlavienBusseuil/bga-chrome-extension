import type { QueryResult } from "../../types/bga/queries/Query";
import type { TableManagerQueryResultData, Table } from "../../types/bga/queries/TableManager";

import { bgaUrl } from "../constants";
import { resolveQuery } from "./resolveQuery";

export async function fetchTablesFromTableManager(status: string): Promise<Array<Table>> {
	const url = `${bgaUrl}/tablemanager/tablemanager/tableinfos.html?status=${status}`;
	const result = await resolveQuery<QueryResult<TableManagerQueryResultData>>(url);

	if (result.status === "0") {
		const { code, error } = result;
		throw new Error(`Fetching tables failed (${code}: ${error})`);
	}

	const { tables } = result.data;

	const list = Object.keys(tables).map((tableKey) => tables[tableKey] as Table);
	list.forEach(t => {
		if (!t.table_creator) {
			t.table_creator = Object.values(t.players).find(t => t.is_admin === "1")?.id ?? null;
		}
	});
	return list;
}
