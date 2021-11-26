// @flow

import type { TableId } from "../../types/bga/Table";
import type { QueryResult } from "../../types/bga/queries/Query";
import type {
	TableInfo,
	TableQueryResultData,
} from "../../types/bga/queries/Table";

import { castToString } from "../../types/bga/Table";
import { bgaUrl, bgaExtensionUrlSignature } from "../constants";
import { fetchFromUrl } from "./fetchFromUrl";
import { resolveQuery } from "./resolveQuery";

export async function fetchTableInfo({
	tableId,
}: {
	tableId: TableId,
}): Promise<TableInfo> {
	const result = await resolveQuery<QueryResult<TableQueryResultData>>({
		fromMock: { path: "table", key: castToString(tableId) },
		fromUrl: `${bgaUrl}/table/table/tableinfos.html?id=${castToString(
			tableId,
		)}&${bgaExtensionUrlSignature}`,
	});

	if (result.status === 0) {
		const { code, error } = result;
		throw new Error(`Fetching table info failed (${code}: ${error})`);
	}

	return result.data;
}
