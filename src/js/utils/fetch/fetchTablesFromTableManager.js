// @flow

import type { QueryResult } from "../../types/bga/queries/Query";
import type {
	TableManagerQueryResultData,
	Table,
} from "../../types/bga/queries/TableManager";

import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { resolveQuery } from "./resolveQuery";

export async function fetchTablesFromTableManager(): Promise<Array<Table>> {
	const result = await resolveQuery<QueryResult<TableManagerQueryResultData>>(
		{
			fromMock: { path: "tableManager" },
			fromUrl: `${bgaUrl}/tablemanager/tablemanager/tableinfos.html?status=play&${bgaExtensionUrlSignature}`,
		},
	);

	if (result.status === 0) {
		const { code, error } = result;
		throw new Error(`Fetching tables failed (${code}: ${error})`);
	}

	const { tables } = result.data;

	return Object.keys(tables).map(tableKey => tables[tableKey]);
}
