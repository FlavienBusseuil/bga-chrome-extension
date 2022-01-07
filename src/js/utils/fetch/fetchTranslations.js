// @flow

import type { LanguageKey } from "../../types/bga/Language";
import type { Translations } from "../../types/bga/Translations";

import { bgaExtensionUrlSignature } from "../constants";

type Props = {
	assetsUrl: string,
	jsBundleVersion: string,
	lang: LanguageKey,
};

async function fetchGlobalTranslations({
	assetsUrl,
	jsBundleVersion,
}): Promise<Translations> {
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

async function fetchLocalizedTranslations({
	assetsUrl,
	jsBundleVersion,
	lang,
}): Promise<Translations> {
	return fetch(
		`${assetsUrl}js/modules/nls/${lang}/lang_mainsite-${jsBundleVersion}.js?${bgaExtensionUrlSignature}`,
	)
		.then(response => response.text())
		.then(text => {
			const [, translations] =
				text
					// Remove \ followed with a linebreak
					.replace(/\\\n/gm, "")
					// Remove tabulation
					.replace(/\t/gm, "\\t")
					// Match the json part of the document under 'root' property
					.match(/define\(.*({[.*\S\s]*})*\)/) ?? [];

			return JSON.parse(translations);
		});
}

export async function fetchTranslations({
	assetsUrl,
	jsBundleVersion,
	lang,
}: Props): Promise<Translations> {
	const [global, local] = await Promise.all([
		fetchGlobalTranslations({ assetsUrl, jsBundleVersion }),
		fetchLocalizedTranslations({ assetsUrl, jsBundleVersion, lang }),
	]);

	for (const key in local) {
		if (local[key] === "") {
			local[key] = global[key];
		}
	}

	return local;
}
