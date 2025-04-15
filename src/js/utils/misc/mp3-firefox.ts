import { getFile } from 'easy-file-picker';

const localStorageKey = 'sound';

export const isSoundCustom = () => {
  return !!localStorage.getItem(localStorageKey);
};

export const removeCustomMp3 = async () => {
  localStorage.removeItem(localStorageKey);
};

export const uploadCustomMp3 = async () => {
  // Opening the file selection closes the popup context due to Firefox bug
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1292701
  const isCalledFromPopup = window.location.pathname.includes('popup');
  if (isCalledFromPopup) {
    // TODO: Support setting custom sound from extesions options page
    // browser.runtime.openOptionsPage();
    window.console.error('[bga extension] Unsupported call of upload custom mp3 from popup context!');
    return;
  }

  const file = await getFile({ acceptedExtensions: ['audio/mp3'] });
  if (file) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const fileData = event.target.result;
      localStorage.setItem(localStorageKey, fileData);
    };

    reader.readAsDataURL(file);
  }
};

export const playMp3 = async () => {
  try {
    const customSound = localStorage.getItem(localStorageKey);
    const audio = new Audio(customSound || 'sound/myturn.mp3');
    audio.volume = 1.0;
    await audio.play();
  } catch (error) {
    console.error('[bga extension] Error playing MP3:', error);
  }
};