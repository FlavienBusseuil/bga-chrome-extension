export const storageGet = async () => {
	return await chrome.storage.sync.get();
};

export const storageSet = async (val) => {
	return await chrome.storage.sync.set(val);
};

export const storageClear = async () => {
	await chrome.storage.sync.clear();
};

export const addChangeListener = (func) => {
	chrome.storage.onChanged.addListener(func);
};

export const getUrl = (localUrl) => {
	return chrome.runtime.getURL(localUrl);
};

export const localStorageGet = async () => {
	return await chrome.storage.local.get();
};

export const localStorageSet = async (val) => {
	return await chrome.storage.local.set(val);
};

export const localStorageClear = async () => {
	return await chrome.storage.local.clear();
};

export const i18n = (key) => {
	return chrome.i18n.getMessage(key);
};

export const getExtensionVersion = () => chrome.runtime.getManifest().version;