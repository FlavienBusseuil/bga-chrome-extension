

const localStorageKey = 'sound';

export const isSoundCustom = () => {
  return !!localStorage.getItem(localStorageKey);
};

export const removeCustomMp3 = async () => {
  localStorage.removeItem(localStorageKey);
};

export const uploadCustomMp3 = async () => {
  /* FIXME: input.click() causes addon popup to be closed, causing onchange callback to never be called

  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/mp3';
    input.style.cssText = 'position: fixed; top: 0; left: 0; opacity: 0; z-index: 1000;';
    document.body.appendChild(input);

    return new Promise((resolve) => {
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        document.body.removeChild(input);

        if (file) {
          const reader = new FileReader();
          reader.onload = (readerEvent) => {
            const fileData = readerEvent.target?.result;
            if (fileData) {
              localStorage.setItem(localStorageKey, fileData as string);
              resolve(true);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      input.click();
    });
  } catch (error) {
    console.error('[bga extension] Error uploading MP3:', error);
  }

  */
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