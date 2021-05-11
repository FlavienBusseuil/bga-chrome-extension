import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchGlobalInfo({
  fetchAssetsUrl,
  fetchGlobalUserInfos,
  fetchJsBundleVersion,
}) {
  return fetch(`${bgaUrl}/gameinprogress?${bgaExtensionUrlSignature}`)
    .then((response) => response.text())
    .then((text) => ({
      assetsUrl: fetchAssetsUrl
        ? text.match(/g_themeurl\s?=\s?'(.*)'/)[1]
        : null,
      globalUserInfos: fetchGlobalUserInfos
        ? JSON.parse(text.match(/globalUserInfos\s?=\s?({.*})/)[1])
        : null,
      jsBundleVersion: fetchJsBundleVersion
        ? text.match(/jsbundlesversion='(.*)';/)[1]
        : null,
    }));
}
