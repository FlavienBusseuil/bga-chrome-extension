// @flow

import type { FetchOptions } from "../../types/FetchOptions";
import type { QueryResult } from "../../types/bga/queries/Query";
import type {
	TableManagerQueryResultData,
	Table,
} from "../../types/bga/queries/TableManager";

import { bgaUrl } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { resolveQuery } from "./resolveQuery";

export async function fetchTablesFromTableManager({
	requestToken,
}: FetchOptions): Promise<Array<Table>> {
	const url = `${bgaUrl}/tablemanager/tablemanager/tableinfos.html?status=play`;

	const result = await resolveQuery<QueryResult<TableManagerQueryResultData>>(
		{
			fromMock: { path: "tableManager" },
			fromUrl: {
				url,
				requestToken,
			},
		},
	);

	if (result.status === "0") {
		const { code, error } = result;
		throw new Error(`Fetching tables failed (${code}: ${error})`);
	}

	const { tables } = result.data;

	return Object.keys(tables).map(tableKey => tables[tableKey]);
}
