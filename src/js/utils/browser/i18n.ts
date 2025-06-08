import { getUrl } from '../browser';

class I18N {
	curLocale: string;
	labels: Record<string, string> | undefined;

	constructor() {
		this.curLocale = '';
		this.labels = undefined;
	}

	private async getLabels(locale: string): Promise<Record<string, string> | undefined> {
		const path = `/locales/${locale}.json`;
		const url = getUrl(path);

		try {
			const response = await fetch(url);
			const content = await response.json();
			return content;
		}
		catch (error) {
			console.error('[bga extension] Error setting locale', { error, url });
			return undefined;
		}
	}

	async setLocale(locale: string) {
		if (this.curLocale !== locale) {
			this.labels = await this.getLabels(locale);
			this.curLocale = locale;
		}
	}

	getMessage(key: string) {
		if (this.labels) {
			return this.labels[key] || chrome.i18n.getMessage(key);
		}
		return chrome.i18n.getMessage(key);
	}
}

const i18Instance = new I18N();

export const i18n = (key: string): string => i18Instance.getMessage(key);
export const setI18nLocale = async (locale: string) => i18Instance.setLocale(locale);
export const getI18nDefaultLocale = () => chrome.i18n.getMessage('current_locale');
