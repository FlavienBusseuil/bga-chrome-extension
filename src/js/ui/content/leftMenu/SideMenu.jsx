// @flow
import { useState, useEffect } from "preact/hooks";

import { Game } from "../../../config/configuration";
import SideMenuItem from "./SideMenuItem";
import PlayerIcon from "./PlayerIcon";
import CloseIcon from "./icons/CloseIcon";
import TopArrowIcon from "./icons/TopArrowIcon";
import SandwichIcon from "./icons/SandwichIcon";
import Avatar from "./Avatar";
import { Player } from "./player";

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
    element && topBar && console.log(element.getBoundingClientRect().top + " " + document.body.getBoundingClientRect().top + " " + topBar.getBoundingClientRect().height);
    element && topBar && window.scrollTo({
      behavior: 'smooth',
      top: topBar.getBoundingClientRect().height + 2,
    });
  };

  const toggleMenu = () => setVisible(!visible);
  const containerStyle = { display: 'flex', flexFlow: 'column', gap: '0.8em' };

  const getButtonsOrder = () => {
    const toSort = players.map(p => {
      const id = gameConfig.playerPanel.replace('{{player_id}}', p.id);
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

    toSort.sort((a, b) => a.pos < b.pos ? - 1 : 1);
    setButtonsOrder(toSort.map(a => a.id).join('|'))
  };

  const getButtons = () => {
    const elements = {};

    players.forEach(p => {
      elements[gameConfig.playerPanel.replace('{{player_id}}', p.id)] = <PlayerIcon key={`item_${p.id}`} player={p} gameConfig={gameConfig} />;
    });

    if (gameConfig.boardPanel) {
      const fakePlayer = {
        fake: true,
        id: gameConfig.boardPanel,
        name: chrome.i18n.getMessage('sideMenuMainBoard'),
        avatar: 'board',
        color: '#ffffff'
      }

      elements[gameConfig.boardPanel] = <PlayerIcon key={gameConfig.boardPanel} player={fakePlayer} gameConfig={gameConfig} />;
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