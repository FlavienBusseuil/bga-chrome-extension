export const storageGet = async (): Promise<Record<string, any>> => {
	return await chrome.storage.sync.get();
};

export const storageSet = async (val: Record<string, any>): Promise<void> => {
	return await chrome.storage.sync.set(val);
};

export const storageClear = async (): Promise<void> => {
	await chrome.storage.sync.clear();
};

export const addChangeListener = (
	func: (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => void
): void => {
	chrome.storage.onChanged.addListener(func);
};

export const getUrl = (localUrl: string): string => {
	return chrome.runtime.getURL(localUrl);
};
export const isFirefox: boolean = getUrl('').startsWith('moz-extension://');

export const localStorageGet = async (): Promise<Record<string, any>> => {
	return await chrome.storage.local.get();
};

export const localStorageSet = async (val: Record<string, any>): Promise<void> => {
	return await chrome.storage.local.set(val);
};

export const localStorageClear = async (): Promise<void> => {
	return await chrome.storage.local.clear();
};

export const getExtensionVersion = () => chrome.runtime.getManifest().version;

const cleanPath = (path: string) => (path.startsWith('/')) ? path.substring(1) : path;
const resources = new Set(chrome.runtime.getManifest().web_accessible_resources?.filter(r => typeof r !== 'string').map(r => r.resources.map(cleanPath)).flat() || []);

export const checkIfResourcePathExists = (path: string): boolean => resources.has(cleanPath(path));