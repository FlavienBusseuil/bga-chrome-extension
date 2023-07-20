import React from "preact";
import { useState, useEffect } from "preact/hooks";

import Configuration from "../../../config/configuration";
import { darkStyleForGame, darkStyleGame, gamesWithCustomBackground } from "./darkStyleGame";
import { darkStyleBackground } from "./darkStyleBackground";
import { darkStyleChat } from "./darkStyleChat";
import { darkStyleGeneral } from "./darkStyleGeneral";
import { darkStyleCommon } from "./darkStyleCommon";

const themeStyleId = "cde-theme-style";

const setDarkStyle = (gameName: string, val: boolean) => {
  let styleComponent = document.getElementById(themeStyleId);

  if (!styleComponent) {
    styleComponent = document.createElement("style");
    styleComponent.id = themeStyleId;
    document.head.appendChild(styleComponent);
  }

  if (gameName === "general") {
    styleComponent.innerHTML = (val) ? `${darkStyleCommon}${darkStyleBackground}${darkStyleGeneral}${darkStyleChat}` : "";
  } else {
    const backgroundStyle = gamesWithCustomBackground.includes(gameName) ? "" : darkStyleBackground;
    const gameStyle = darkStyleForGame[gameName] || '';
    styleComponent.innerHTML = (val) ? `${darkStyleCommon}${backgroundStyle}${darkStyleGame}${darkStyleChat}${gameStyle}` : "";
  }
};

interface ModeIconProps {
  config: Configuration;
  gameName: string;
}

const ModeIcon = (props: ModeIconProps) => {
  const { config, gameName } = props;
  const [darkMode, setDarkMode] = useState(config.isDarkMode());

  useEffect(() => setDarkStyle(gameName, darkMode), [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    config.setDarkMode(!darkMode);
  };

  const getIcon = () => {
    const style = (gameName === "general") ? "font-size: 32px; color: #01c4ca; cursor: pointer;" : "font-size: 24px; cursor: pointer;"

    if (darkMode) {
      return <i class="fa fa-moon-o" style={style}></i>;
    }
    return <i class="fa fa-sun-o" style={style}></i>;
  };

  return (
    <span onClick={toggleDarkMode}>
      {getIcon()}
    </span>
  );
};

export default ModeIcon;