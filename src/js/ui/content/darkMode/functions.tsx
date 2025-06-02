import { render } from "preact";
import ModeSelector from "./ModeSelector";
import type Configuration from "../../../config/configuration";
const getContainer = (gameName: string) => {
  if (gameName === "general") {
    const friendsElt = document.querySelector('.bga-friends-icon');

    if (!friendsElt) {
      return undefined;
    }

    return friendsElt.parentNode;
  }

  const soundIcon = document.querySelector('.upperrightmenu_item');

  if (!soundIcon) {
    return undefined;
  }

  return soundIcon;
};

const initDarkMode = (config: Configuration, gameName: string) => {
  const darkModeIconId = 'bga_extension_dark_mode_icon';

  if (!document.getElementById(darkModeIconId)) {
    const container = getContainer(gameName);

    if (!container) {
      setTimeout(() => initDarkMode(config, gameName), 100);
      return;
    }

    const darkElt = document.createElement('div');
    darkElt.id = darkModeIconId;
    darkElt.className = "upperrightmenu_item";
    container.parentNode!.insertBefore(darkElt, container);

    if (gameName === "general") {
      const sepElt = document.createElement('div');
      sepElt.className = "ml-1 tablet:ml-6";
      container.parentNode!.insertBefore(sepElt, container);
    }
    render(<ModeSelector config={config} gameName={gameName} />, darkElt);
  }
};

export { initDarkMode };