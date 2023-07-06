// @flow
import type { GlobalUserInfos } from "../../types/bga/queries/GameInProgress";

import { presentation } from "../../mock/queries/gameInProgress/presentation";
import { bgaUrl, isDataMocked } from "../constants";

export async function fetchGlobalInfo(): Promise<{
	assetsUrl: string,
	globalUserInfos: GlobalUserInfos,
	jsBundleVersion: string,
}> {
	return fetch(`${bgaUrl}/gameinprogress`)
		.then((response) => response.text())
		.then((text) => {
			const [, assetsUrl] = text.match(/g_themeurl\s?=\s?'(.*)'/) ?? [];
			const [, globalUserInfos] =
				(isDataMocked ? presentation : text).match(
					/globalUserInfos\s?=\s?({.*})/,
				) ?? [];
			const [, jsBundleVersion] =
				text.match(/jsbundlesversion='(.*)';/) ?? [];

			return {
				assetsUrl,
				globalUserInfos: JSON.parse(globalUserInfos),
				jsBundleVersion,
			};
		});
}
