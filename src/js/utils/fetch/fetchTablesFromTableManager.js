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

interface Props extends FetchOptions {
	status: String;
};

export async function fetchTablesFromTableManager({
	requestToken, status
}: Props): Promise<Array<Table>> {
	const url = `${bgaUrl}/tablemanager/tablemanager/tableinfos.html?status=${status}`;

	const result = await resolveQuery < QueryResult < TableManagerQueryResultData >> (
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

	const list = Object.keys(tables).map((tableKey) => tables[tableKey]);
	list.forEach(t => {
		if (!t.table_creator) {
			t.table_creator = Object.values(t.players).find(t => t.is_admin === "1")?.id;
		}
	})
	return list;
}
