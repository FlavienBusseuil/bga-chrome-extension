import browser from 'webextension-polyfill';
import type { Storage } from 'webextension-polyfill';

export const isFirefox: boolean = browser.runtime.getURL('').startsWith('moz-extension://');

export const storageGet = async (): Promise<Record<string, any>> => {
	return await browser.storage.sync.get();
};

export const storageSet = async (val: Record<string, any>): Promise<void> => {
	return await browser.storage.sync.set(val);
};

export const storageClear = async (): Promise<void> => {
	await browser.storage.sync.clear();
};

export const addChangeListener = (
	func: (changes: Record<string, Storage.StorageChange>, areaName: string) => void
): void => {
	browser.storage.onChanged.addListener(func);
};

export const getUrl = (localUrl: string): string => {
	return browser.runtime.getURL(localUrl);
};

export const localStorageGet = async (): Promise<Record<string, any>> => {
	return await browser.storage.local.get();
};

export const localStorageSet = async (val: Record<string, any>): Promise<void> => {
	return await browser.storage.local.set(val);
};

export const localStorageClear = async (): Promise<void> => {
	return await browser.storage.local.clear();
};

class I18N {
	curLocale: string;
	labels: Record<string, string> | undefined;

	constructor() {
		this.curLocale = '';
		this.labels = undefined;
	}

	private async getLabels(locale: string): Promise<Record<string, string> | undefined> {
		const path = `/custom_locales/${locale}.locale`;
		const url = getUrl(path);

		try {
			const response = await fetch(url);
			const content = await response.text();
			return JSON.parse(content);
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
			return this.labels[key] || browser.i18n.getMessage(key);
		}
		return browser.i18n.getMessage(key);
	}
}

const i18Instance = new I18N();

export const i18n = (key: string): string => i18Instance.getMessage(key);
export const setI18nLocale = async (locale: string) => i18Instance.setLocale(locale);
export const getI18nDefaultLocale = () => browser.i18n.getMessage('current_locale');

export const getExtensionVersion = () => browser.runtime.getManifest().version;

const cleanPath = (path: string) => (path.startsWith('/')) ? path.substring(1) : path;
const resources = new Set(browser.runtime.getManifest().web_accessible_resources?.filter(r => typeof r !== 'string').map(r => r.resources.map(cleanPath)).flat() || []);

export const checkIfResourcePathExists = (path: string): boolean => resources.has(cleanPath(path));