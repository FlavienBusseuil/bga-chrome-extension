// @flow

import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import type { QueryResult } from "../../types/bga/queries/Query";

import type { TableQueryResultData } from "../../types/bga/queries/Table";

import type { MockResolver } from "./resolveFromMock";

import { isDataMocked } from "../constants";
import { fetchFromUrl } from "../fetch/fetchFromUrl";
import { resolveFromMock } from "./resolveFromMock";

export async function resolveQuery<T>({
	fromMock,
	fromUrl,
}: {
	fromMock: MockResolver,
	fromUrl: string,
}): Promise<T> {
	if (isDataMocked) {
		// $FlowFixMe[incompatible-return] ?
		return resolveFromMock(fromMock);
	}

	return fetchFromUrl<T>(fromUrl);
}
