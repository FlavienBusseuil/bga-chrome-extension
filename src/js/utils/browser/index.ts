import { isMobile as detectMobile } from "is-mobile";

export const isMobile = detectMobile({ featureDetect: true, tablet: true });

// Last known value (as JSON) of each synced key: writing an unchanged value is skipped.
// The sync storage is limited (120 writes per minute) and many settings are saved again without being changed.
const syncedValues = new Map<string, string>();

const rememberSyncedValues = (values: Record<string, any>) => {
	Object.entries(values).forEach(([key, value]) => {
		if (value === undefined) {
			syncedValues.delete(key);
		} else {
			syncedValues.set(key, JSON.stringify(value));
		}
	});
};

chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName === "sync") {
		rememberSyncedValues(Object.fromEntries(Object.entries(changes).map(([key, { newValue }]) => [key, newValue])));
	}
});

export const storageGet = async (): Promise<Record<string, any>> => {
	const values = await chrome.storage.sync.get();
	rememberSyncedValues(values);
	return values;
};

export const storageSet = async (val: Record<string, any>): Promise<void> => {
	const changes = Object.fromEntries(Object.entries(val).filter(([key, value]) => syncedValues.get(key) !== JSON.stringify(value)));

	if (!Object.keys(changes).length) {
		return;
	}

	rememberSyncedValues(changes);

	try {
		await chrome.storage.sync.set(changes);
	} catch (error) {
		// not saved (quota...): it must be written again next time
		Object.keys(changes).forEach(key => syncedValues.delete(key));
		console.error("[bga extension] Unable to save the configuration", { keys: Object.keys(changes), error });
		throw error;
	}
};

export const storageClear = async (): Promise<void> => {
	syncedValues.clear();
	await chrome.storage.sync.clear();
};

export const addChangeListener = (
	func: (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => void
): void => {
	chrome.storage.onChanged.addListener((changes, areaName) => {
		// session storage only holds the background script state, not the configuration
		if (areaName !== "session") {
			func(changes, areaName);
		}
	});
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
const resourcePatterns = [...resources]
	.filter(resource => resource.includes('*'))
	.map(resource => new RegExp(`^${resource.split('*').map(part => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')}$`));

// The files of a folder declared with patterns are listed in "<folder>/_index.json" (see scripts/finalizeGamesBuild.js)
const folderIndexes = new Map<string, Promise<string[] | null>>();

const getFolderIndex = (folder: string): Promise<string[] | null> => {
	if (!folderIndexes.has(folder)) {
		folderIndexes.set(folder, fetch(getUrl(`/${folder}_index.json`))
			.then(response => response.ok ? response.json() : null)
			.catch(() => null));
	}
	return folderIndexes.get(folder)!;
};

export const checkIfResourcePathExists = async (path: string): Promise<boolean> => {
	const resource = cleanPath(path);
	if (resources.has(resource)) {
		return true;
	}
	if (!resourcePatterns.some(pattern => pattern.test(resource))) {
		return false;
	}

	const separator = resource.lastIndexOf('/') + 1;
	const index = await getFolderIndex(resource.substring(0, separator));
	// Without index, the pattern is the only information available
	return index === null || index.includes(resource.substring(separator));
};