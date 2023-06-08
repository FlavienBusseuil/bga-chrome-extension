// @flow
import { useState } from "preact/hooks";
import fontColorContrast from "font-color-contrast";
import rgbHex from "rgb-hex";

import { Game } from "../../config/configuration";
import Avatar from "./Avatar";
import SideMenuItem from "./SideMenuItem";
import PlayerName from "./PlayerName";
import { Player } from "./player";

interface PlayerIconProps {
  player: Player,
  gameConfig: Game
}

const PlayerIcon = (props: PlayerIconProps) => {
  const [over, setOver] = useState(false);
  const { player, gameConfig } = props;

  const scrollToPlayer = () => {
    const id = gameConfig.playerPanel.replace('{{player_id}}', player.id);
    const element = document.getElementById(id);
    const titleBar = document.getElementById("page-title");
    const topBar = document.getElementById("topbar");
    let zoom = (document.getElementById('page-content')?.style).zoom || 1;
    let customZoom = 1;

    if (!Number(zoom)) {
      zoom = 1;
    }

    try {
      if (gameConfig.customZoomContainer) {
        customZoom = (getComputedStyle(document.getElementById(gameConfig.customZoomContainer))).zoom || 1;
      }
    }
    catch (error) {
      console.error('[bga extension] Error getting custom zoom', error);
    }

    if (!element || !topBar || !titleBar) {
      return;
    }

    const currentPos = window.scrollY;
    const minTop = topBar.getBoundingClientRect().height + 20;
    if (currentPos < minTop) {
      setTimeout(scrollToPlayer, 500);
    }

    window.scrollTo({
      behavior: 'smooth',
      top: (((element.getBoundingClientRect().top - titleBar.getBoundingClientRect().height) * customZoom) - (gameConfig.playerPanelOffset / customZoom)) * zoom - document.body.getBoundingClientRect().top,
    });
  };

  const getTextColor = (playerColor: string | undefined) => {
    if (playerColor) {
      try {
        return fontColorContrast(rgbHex(playerColor));
      } catch (error) { }
    }

    return '#000000';
  };

  return (
    <SideMenuItem onClick={scrollToPlayer}>
      <Avatar backColor={gameConfig.iconBackground} borderColor={gameConfig.iconBorder} shadowColor={gameConfig.iconShadow} onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)}>
        <img src={`${player.avatar}`} alt={player.name} />
      </Avatar>
      <PlayerName backColor={player.color} borderColor={gameConfig.iconBorder} shadowColor={gameConfig.iconShadow} textColor={getTextColor(player.color)} hover={over}>{player.name}</PlayerName>
    </SideMenuItem >
  );
};

export default PlayerIcon;