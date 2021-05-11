import { bgaExtensionUrlSignature } from "./constants";

export async function fetchGlobalTranslations({ assetsUrl, jsBundleVersion }) {
  return fetch(
    `${assetsUrl}/js/modules/nls/lang_mainsite-${jsBundleVersion}.js?${bgaExtensionUrlSignature}`
  )
    .then((response) => response.text())
    .then((text) =>
      JSON.parse(
        text
          // Remove \ followed with a linebreak
          .replaceAll(/\\\n/gm, "")
          // Match the json part of the document under 'root' property
          .match(/define\({.*root:.*({[.*\S\s]*})[.*\S\s]*}\)/)[1]
      )
    );
}
