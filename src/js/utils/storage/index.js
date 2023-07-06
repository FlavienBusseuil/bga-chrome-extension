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
}