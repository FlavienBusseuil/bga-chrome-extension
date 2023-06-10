import { render } from "preact";
import SideMenu from './SideMenu';

let playersData;

export const initLeftMenu = (gameConfig, leftMenuEnable) => {
  const elements = document.querySelectorAll("div.player-name");

  if (elements && elements.length) {
    const playersIdList = Object.values(elements).filter(d => d.id).map(d => parseInt(d.id.substring(12), 10)).filter(id => !isNaN(id));

    playersData = playersIdList.map(id => {
      const userLink = document.getElementById(`player_name_${id}`).childNodes[1];

      return {
        id,
        name: userLink.innerText,
        avatar: document.getElementById(`avatar_${id}`).src,
        color: userLink.style.color,
      };
    });

    buildLeftMenuCss(gameConfig, leftMenuEnable);
    buildLeftMenu(gameConfig, leftMenuEnable);
  } else {
    setTimeout(() => initLeftMenu(gameConfig, leftMenuEnable), 100);
  }
};

export const buildLeftMenu = (gameConfig, enable) => {
  const menuContainerId = 'bga_extension_sidebar';

  if (enable) {
    const container = document.createElement('div');
    container.id = menuContainerId;
    container.style.position = 'fixed';
    container.style.left = gameConfig.left;
    container.style.userSelect = 'none';
    container.style.zIndex = 5;
    document.body.appendChild(container);

    render(<SideMenu players={playersData} panel={gameConfig.playerPanel} gameConfig={gameConfig} />, container);
    return;
  }

  const container = document.getElementById(menuContainerId);
  if (container) {
    container.parentNode.removeChild(container);
  }
};

export const buildLeftMenuCss = (gameConfig, enable) => {
  const menuStyleId = 'cde-left-menu-style';

  if (!enable) {
    const style = document.getElementById(menuStyleId);
    if (style) {
      style.parentNode.removeChild(style);
    }
  } else if (gameConfig.css) {
    const style = document.createElement('style');
    style.id = menuStyleId;
    style.innerHTML = gameConfig.css;
    document.head.appendChild(style);
  }
};