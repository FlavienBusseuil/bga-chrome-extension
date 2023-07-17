import React, { render } from "preact";
import ModeIcon from "./ModeIcon";

const getContainer = (gameName) => {
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

const initDarkMode = (config, gameName) => {
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
    container.parentNode.insertBefore(darkElt, container);

    if (gameName === "general") {
      const sepElt = document.createElement('div');
      sepElt.className = "ml-1 tablet:ml-6";
      container.parentNode.insertBefore(sepElt, container);
    }

    render(
      <ModeIcon
        config={config}
        gameName={gameName}
      />,
      darkElt,
    );
  }
};

export { initDarkMode };