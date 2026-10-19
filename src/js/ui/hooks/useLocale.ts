import { useEffect, useState } from "preact/hooks";

import { setI18nLocale } from "../../utils/browser/i18n";
import { useSyncedState } from "./useSyncedState";

// Locale shared between the popup, the side panel and the options page.
// Returns the locale once its labels are loaded, so it can be used as a key to re-render translated components.
export function useLocale(initialLocale: string) {
	const [locale] = useSyncedState('locale', initialLocale);
	const [loadedLocale, setLoadedLocale] = useState(locale);

	useEffect(() => {
		let active = true;
		setI18nLocale(locale).then(() => active && setLoadedLocale(locale));
		return () => {
			active = false;
		};
	}, [locale]);

	return loadedLocale;
}
