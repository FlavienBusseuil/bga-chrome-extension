// @flow

import type { FetchOptions } from "../../types/FetchOptions";
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

type TableInput = {
	tableId: TableId,
};

export async function fetchTableInfo(
	{ tableId }: TableInput,
	{ requestToken }: FetchOptions,
): Promise<TableInfo> {
	const url: string = `${bgaUrl}/table/table/tableinfos.html?id=${castToString(
		tableId,
	)}&${bgaExtensionUrlSignature}`;

	const result = await resolveQuery<QueryResult<TableQueryResultData>>({
		fromMock: { path: "table", key: castToString(tableId) },
		fromUrl: { url, requestToken },
	});

	if (result.status === 0) {
		const { code, error } = result;
		throw new Error(`Fetching table info failed (${code}: ${error})`);
	}

	return result.data;
}
