export const storageSet = async (val) => {
  return await chrome.storage.sync.set(val);
}