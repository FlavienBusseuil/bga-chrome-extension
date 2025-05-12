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

// TODO: Use separate i18n library, so the used language can be changed independently of the browser language
export const i18n = (key: string): string => {
	return browser.i18n.getMessage(key);
};

export const getExtensionVersion = () => browser.runtime.getManifest().version;

const cleanPath = (path: string) => (path.startsWith('/')) ? path.substring(1) : path;
const resources = new Set(browser.runtime.getManifest().web_accessible_resources?.filter(r => typeof r !== 'string').map(r => r.resources.map(cleanPath)).flat() || []);

export const checkIfResourcePathExists = (path: string): boolean => {
	return resources.has(cleanPath(path));
};