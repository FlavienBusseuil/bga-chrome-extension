// @flow
import { useState, useEffect } from "preact/hooks";

import { Game } from "../../config/configuration";
import SideMenuItem from "./SideMenuItem";
import PlayerIcon from "./PlayerIcon";
import Avatar from "./Avatar";
import { Player } from "./player";

import '../../../css/leftMenu.css';

const TopArrowIcon = () => {
  return (
    <svg width="32" height="32" viewBox="-60 0 640 540">
      <g transform="translate(0,-540.3622)">
        <path fill="#222222" stroke="#222222" strokeWidth={38.88000107} d="M 439.28228,860.51096 256.00063,677.22934 72.71772,860.51096 l 54.98539,54.9841 128.29752,-128.29752 128.29622,128.29752 z" />
      </g>
    </svg>
  );
};

const SandwichIcon = () => {
  return (
    <svg width="32" height="32" viewBox="-30 -50 160 180">
      <rect fill="#222222" width="100" height="20"></rect>
      <rect fill="#222222" y="30" width="100" height="20"></rect>
      <rect fill="#222222" y="60" width="100" height="20"></rect>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg width="32" height="32" viewBox="-40 -40 200 200">
      <g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z" />
      </g>
    </svg>
  );
};

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
    return () => {
      window.removeEventListener('resize', setMenuPosition);
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
      {visible && players.map((p) => <PlayerIcon key={`item_${p.id}`} player={p} gameConfig={gameConfig} />)}
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