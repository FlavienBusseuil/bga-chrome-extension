// @flow
import { useState, useEffect } from "preact/hooks";

import { Game } from "../../../config/configuration";
import SideMenuItem from "./SideMenuItem";
import PlayerIcon from "./PlayerIcon";
import CloseIcon from "./icons/CloseIcon";
import TopArrowIcon from "./icons/TopArrowIcon";
import SandwichIcon from "./icons/SandwichIcon";
import Avatar from "./Avatar";
import { Player, getPlayerPanelId } from "./player";

import '../../../../css/leftMenu.css';

interface SideMenuProps {
  players: [Player],
  panel: string,
  gameConfig: Game,
}

const SideMenu = (props: SideMenuProps) => {
  const { players, gameConfig } = props;
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState(gameConfig.position === 'bottom' ? 'bottom' : 'top');
  const [zoomVisible, setZoomVisible] = useState(false);
  const [buttonsOrder, setButtonsOrder] = useState('');

  const setMenuPosition = () => {
    if (gameConfig.position === 'auto') {
      const isMobile = document.body.classList.contains('mobile_version');
      setPosition(isMobile ? 'bottom' : 'top');
    }

    const isZoomVisible = document.getElementById('globalaction_zoom_wrap')?.style.display === 'inline-block';
    setZoomVisible(isZoomVisible);
  };

  useEffect(() => {
    setMenuPosition();
    window.addEventListener('resize', setMenuPosition);
    const timer = setInterval(getButtonsOrder, 1000);
    getButtonsOrder();
    return () => {
      window.removeEventListener('resize', setMenuPosition);
      clearInterval(timer);
    };
  });

  useEffect(() => {
    const barContainer = document.getElementById('bga_extension_sidebar');

    if (barContainer) {
      if (position === 'top') {
        barContainer.style.top = gameConfig.positionTop || '150px';
        barContainer.style.bottom = '';
      } else if (gameConfig.positionBottom === 'auto') {
        barContainer.style.top = '';
        barContainer.style.bottom = zoomVisible ? '70px' : '10px';
      } else {
        barContainer.style.top = '';
        barContainer.style.bottom = gameConfig.positionBottom || '70px';
      }
    }
  }, [position, zoomVisible, gameConfig.positionTop, gameConfig.positionBottom]);

  const scrollToTop = () => {
    const element = document.getElementById("page-content");
    const topBar = document.getElementById("topbar");

    element && topBar && window.scrollTo({
      behavior: 'smooth',
      top: topBar.getBoundingClientRect().height + 2,
    });
  };

  const toggleMenu = () => setVisible(!visible);
  const containerStyle = { display: 'flex', flexFlow: 'column', gap: '0.8em' };

  const checkPlayerPanels = () => {
    if (gameConfig.playerPanel.indexOf('{{') < 0) {
      const panels = Array.from(document.querySelectorAll(gameConfig.playerPanel));
      players.forEach((p, index) => {
        const playerPanel = panels.find(panel => panel.innerHTML === p.name);
        if (playerPanel) {
          if (!playerPanel.id) {
            playerPanel.id = `bgaext_panel_${index}`;
          }
        }
      });
    }
  };

  const getButtonsOrder = () => {
    checkPlayerPanels();

    const toSort = players.map((p, index) => {
      const id = getPlayerPanelId(gameConfig, p, index);
      const element = document.getElementById(id);
      return {
        id,
        pos: element?.getBoundingClientRect().top || 0,
      }
    });

    if (gameConfig.boardPanel) {
      toSort.push({
        id: gameConfig.boardPanel,
        pos: document.getElementById(gameConfig.boardPanel)?.getBoundingClientRect().top || 0
      });
    }

    toSort.sort((a, b) => a.pos === b.pos ? 0 : (a.pos < b.pos ? -1 : 1));
    setButtonsOrder(toSort.map(a => a.id).join('|'))
  };

  const getButtons = () => {
    const elements = {};

    players.forEach((p, index) => {
      const id = getPlayerPanelId(gameConfig, p, index);
      elements[id] = <PlayerIcon key={`item_${p.id}`} player={p} index={index} gameConfig={gameConfig} />;
    });

    if (gameConfig.boardPanel) {
      const fakePlayer = {
        fake: true,
        id: gameConfig.boardPanel,
        name: chrome.i18n.getMessage('sideMenuMainBoard'),
        avatar: 'board',
        color: '#ffffff'
      }

      elements[gameConfig.boardPanel] = <PlayerIcon key={gameConfig.boardPanel} player={fakePlayer} index={-1} gameConfig={gameConfig} />;
    }

    return buttonsOrder.split('|').map(id => elements[id]);
  };

  return (
    <div style={containerStyle}>
      {position === 'top' && <SideMenuItem onClick={toggleMenu}>
        <Avatar backColor={gameConfig.iconBackground} borderColor={gameConfig.iconBorder} shadowColor={gameConfig.iconShadow}>
          {visible && <CloseIcon />}
          {!visible && <SandwichIcon />}
        </Avatar>
      </SideMenuItem>}
      {visible && <SideMenuItem onClick={scrollToTop}>
        <Avatar backColor={gameConfig.iconBackground} borderColor={gameConfig.iconBorder} shadowColor={gameConfig.iconShadow}>
          <TopArrowIcon />
        </Avatar>
      </SideMenuItem>}
      {visible && getButtons()}
      {position === 'bottom' && <SideMenuItem onClick={toggleMenu}>
        <Avatar backColor={gameConfig.iconBackground} borderColor={gameConfig.iconBorder} shadowColor={gameConfig.iconShadow}>
          {visible && <CloseIcon />}
          {!visible && <SandwichIcon />}
        </Avatar>
      </SideMenuItem>}
    </div>
  );
};

export default SideMenu;