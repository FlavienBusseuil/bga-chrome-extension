import React from "preact";
import { useState, useEffect } from "preact/hooks";

import Configuration from "../../../config/configuration";
import { setDarkStyle } from "./darkStyleFunctions";

interface ModeSelectorProps {
  config: Configuration;
  gameName: string;
}

const ModeSelector = (props: ModeSelectorProps) => {
  const { config, gameName } = props;
  const [darkMode, setDarkMode] = useState(config.isDarkMode());

  useEffect(() => setDarkStyle(gameName, darkMode), [gameName, darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    config.setDarkMode(!darkMode);

    if (window.location.pathname.startsWith("/forum")) {
      location.reload();
    }
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

export default ModeSelector;