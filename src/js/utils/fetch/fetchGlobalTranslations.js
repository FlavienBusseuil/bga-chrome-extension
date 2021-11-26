// @flow

import type { Translations } from "../../types/bga/Translations";

import { bgaExtensionUrlSignature } from "../constants";

type Props = {
	assetsUrl: string,
	jsBundleVersion: string,
};

export async function fetchGlobalTranslations({
	assetsUrl,
	jsBundleVersion,
}: Props): Promise<Translations> {
	return fetch(
		`${assetsUrl}/js/modules/nls/lang_mainsite-${jsBundleVersion}.js?${bgaExtensionUrlSignature}`,
	)
		.then(response => response.text())
		.then(text => {
			const [, translations] =
				text
					// Remove \ followed with a linebreak
					.replace(/\\\n/gm, "")
					// Match the json part of the document under 'root' property
					.match(/define\({.*root:.*({[.*\S\s]*})[.*\S\s]*}\)/) ?? [];

			return JSON.parse(translations);
		});
}
