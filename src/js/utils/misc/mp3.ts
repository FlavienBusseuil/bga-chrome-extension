import { getFile } from 'easy-file-picker';

const localStorageKey = 'sound';

export const isSoundCustom = () => {
  return !!localStorage.getItem(localStorageKey);
};

export const removeCustomMp3 = async () => {
  localStorage.removeItem(localStorageKey);
};

export const uploadCustomMp3 = async (): Promise<boolean> => {
  const file = await getFile({ acceptedExtensions: ['audio/mp3'] });

  if (file) {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (event: any) => {
        const fileData = event.target.result;
        localStorage.setItem(localStorageKey, fileData);
        resolve(true);
      };

      reader.readAsDataURL(file);
    });
  }

  return false;
};

export const playMp3 = async () => {
  await setupOffscreenDocument("offscreen.html");
  await chrome.runtime.sendMessage({
    data: { source: localStorageKey, volume: 1.0 },
    target: "offscreen",
  });
};

let creating;
const setupOffscreenDocument = async (path: string) => {
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play a notification sound",
    });
    await creating;
    creating = null;
  }
};