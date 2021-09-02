import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchGlobalInfo({
	shouldFetchAssetsUrl,
	shouldFetchGlobalUserInfos,
	shouldFetchJsBundleVersion,
}) {
	return fetch(`${bgaUrl}/gameinprogress?${bgaExtensionUrlSignature}`)
		.then(response => response.text())
		.then(text => ({
			assetsUrl: shouldFetchAssetsUrl
				? text.match(/g_themeurl\s?=\s?'(.*)'/)[1]
				: null,
			globalUserInfos: shouldFetchGlobalUserInfos
				? JSON.parse(text.match(/globalUserInfos\s?=\s?({.*})/)[1])
				: null,
			jsBundleVersion: shouldFetchJsBundleVersion
				? text.match(/jsbundlesversion='(.*)';/)[1]
				: null,
		}));
}
