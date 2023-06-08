export const storageGet = async () => {
  return await chrome.storage.sync.get();
}