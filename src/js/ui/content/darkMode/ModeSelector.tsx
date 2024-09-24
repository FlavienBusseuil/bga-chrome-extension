import React from "preact";
import { useState, useEffect } from "preact/hooks";

import Configuration from "../../../config/configuration";
import { gamesWithCustomActions, gamesWithRecommandedConfig } from "../../../config/darkThemeGames";
import { setDarkStyle } from "./darkStyleFunctions";
import { changeDarkColors } from "./darkColors";

import "../../../../css/darkModeSelector.css";
import "../../../../css/modeSelector.css";

interface ModeSelectorProps {
  config: Configuration;
  gameName: string;
}

let timer = 0;
let paletteContainer: any;
let paletteCursor: any;
let saturationCursor: any;
let cssCounter = 0;

const isDarkMode = (config: Configuration, gameName: string) => {
  const customActions = gamesWithCustomActions[gameName];

  if (customActions && customActions.isDarkMode) {
    try {
      return customActions.isDarkMode();
    }
    catch (error) { }
  }

  return config.isDarkMode();
}

const HUE_STEP = 16;
const SAT_STEP = 4;

const ModeSelector = (props: ModeSelectorProps) => {
  const { config, gameName } = props;
  const recommandedConfig = gamesWithRecommandedConfig[gameName];
  const [darkMode, setDarkMode] = useState(isDarkMode(config, gameName));
  const [darkColorHue, setDarkColorHue] = useState(config.getDarkModeColor(gameName, recommandedConfig?.color));
  const [darkColorSaturation, setDarkColorSaturation] = useState(config.getDarkModeSaturation(gameName, recommandedConfig?.sat));
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [paletteCursorMoving, setPaletteCursorMoving] = useState(false);
  const [saturationCursorMoving, setSaturationCursorMoving] = useState(false);

  useEffect(() => setDarkStyle(gameName, darkMode), [gameName, darkMode]);

  useEffect(() => {
    if (darkColorHue === recommandedConfig?.color && darkColorSaturation === recommandedConfig?.sat) {
      config.clearDarkModeColor(gameName);
    } else {
      config.setDarkModeColor(gameName, darkColorHue, darkColorSaturation, Boolean(recommandedConfig));
    }
    changeDarkColors(darkColorHue, darkColorSaturation);
  }, [darkColorHue, darkColorSaturation]);

  useEffect(() => {
    if (paletteVisible) {
      setPaletteCursorPosition();
      setSaturationCursorPosition();
    }
  }, [paletteVisible, darkColorHue, darkColorSaturation]);

  useEffect(() => {
    if (paletteVisible && paletteCursorMoving) {
      document.addEventListener('mousemove', paletteCursorMove);
    }
    if (paletteVisible && saturationCursorMoving) {
      document.addEventListener('mousemove', saturationCursorMove);
    }
    document.addEventListener('mouseup', cursorMouseUp);
    return () => {
      document.removeEventListener('mousemove', paletteCursorMove);
      document.removeEventListener('mousemove', saturationCursorMove);
      document.removeEventListener('mouseup', cursorMouseUp);
    };
  });

  const setPaletteCursorPosition = () => {
    paletteCursor = document.getElementById("bgaext_palette_cursor");

    if (paletteCursor) {
      const cursPos = darkColorHue < 0 ? (512 + 16) : (darkColorHue * 2) + 16;

      paletteCursor.style.left = `${cursPos}px`;
      paletteCursor.style.display = "block";
    }
  };

  const setSaturationCursorPosition = () => {
    saturationCursor = document.getElementById("bgaext_saturation_cursor");

    if (saturationCursor) {
      const cursPos = (darkColorSaturation - 4) * SAT_STEP + 16;

      saturationCursor.style.left = `${cursPos}px`;
      saturationCursor.style.display = "block";
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);
    config.setDarkMode(newDarkMode);

    if (!newDarkMode) {
      setPaletteVisible(false);
    }

    const customActions = gamesWithCustomActions[gameName];
    customActions && customActions.setDarkMode && customActions.setDarkMode(newDarkMode);

    if (window.location.pathname.startsWith("/forum")) {
      location.reload();
    } else if (!newDarkMode) {
      // refresh of the CSS to load the background image that was previously blocked
      const cssName = gameName === 'general' ? 'common.css' : 'gameserver.css';
      const link = Array.from(document.querySelectorAll("link")).find(l => l.href.indexOf(cssName) > 0)
      if (link) {
        setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 1000);
      }
    }
  };

  const paletteCursorMove = (evt: MouseEvent) => {
    const leftEdge = paletteContainer.getBoundingClientRect().left;
    const maxPos = 33 * 16;
    const pos = Math.min(Math.max(evt.clientX - leftEdge - 10, 16), maxPos) - 16;
    const hue = pos > 510 ? - 1 : Math.round(pos / 2);

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => setDarkColorHue(hue), 200);

    paletteCursor.style.left = `${pos + 16}px`;
  };

  const saturationCursorMove = (evt: MouseEvent) => {
    const leftEdge = paletteContainer.getBoundingClientRect().left;
    const maxPos = 33 * 16;
    const pos = Math.min(Math.max(evt.clientX - leftEdge - 10, 16), maxPos) - 16;

    const sat = Math.round(pos / SAT_STEP) + 4;

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => setDarkColorSaturation(sat), 200);

    saturationCursor.style.left = `${pos + 16}px`;
  };

  const paletteClick = (evt: MouseEvent) => {
    paletteCursorMoveDown();
    paletteCursorMove(evt);
    cursorMouseUp();
  };

  const saturationClick = (evt: MouseEvent) => {
    saturationCursorMoveDown();
    saturationCursorMove(evt);
    cursorMouseUp();
  };

  const paletteCursorMoveDown = () => {
    paletteContainer = document.getElementById("bgaext_palette_container") as any;
    paletteCursor = document.getElementById("bgaext_palette_cursor") as any;
    setPaletteCursorMoving(true);
  };

  const saturationCursorMoveDown = () => {
    paletteContainer = document.getElementById("bgaext_palette_container") as any;
    saturationCursor = document.getElementById("bgaext_saturation_cursor") as any;
    setSaturationCursorMoving(true);
  };

  const cursorMouseUp = () => {
    setPaletteCursorMoving(false);
    setSaturationCursorMoving(false);
  }

  const togglePaletteVisible = () => {
    setPaletteVisible(!paletteVisible);
  };

  const getIcon = () => {
    const style = (gameName === "general") ? "font-size: 32px; color: #01c4ca; cursor: pointer;" : "font-size: 24px; cursor: pointer;"

    if (darkMode) {
      return (
        <span onClick={toggleDarkMode}>
          <i class="fa fa-moon-o" style={style}></i>
        </span>
      );
    }

    return (
      <span onClick={toggleDarkMode}>
        <i class="fa fa-sun-o" style={style}></i>
      </span>
    );
  };

  const getMenuIcon = () => {
    if (!darkMode) {
      return <></>;
    }

    const style = (gameName === "general") ? "font-size: 32px; color: #01c4ca; cursor: pointer; padding-right: 0.3em;" : "font-size: 24px; cursor: pointer; padding-right: 0.3em;"
    const icon = paletteVisible ? <i class="fa fa-caret-up" style={style}></i> : <i class="fa fa-caret-down" style={style}></i>;

    return (
      <span onClick={togglePaletteVisible}>
        {icon}
      </span>
    );
  };

  const getCells = () => {
    const result: preact.JSX.Element[] = [];
    const max = (512 / HUE_STEP) / 2;

    for (let i = 0; i < max; i++) {
      const startColor = `hsl(${i * HUE_STEP}, 50%, 50%)`;
      const endColor = `hsl(${(i + 1) * HUE_STEP}, 50%, 50%)`;
      const color = `linear-gradient(90deg, ${startColor}, ${endColor}`
      result.push(
        <div
          key={`color_${i}`}
          className="bgaext_palette_cell"
          style={{ background: color, width: HUE_STEP * 2 }}
          onClick={paletteClick}
          draggable={false}
          onDragStart={() => false}
        />
      );
    }

    result.push(
      <div
        key="color_black"
        className="bgaext_palette_cell"
        style={{ background: "#272a2f" }}
        onClick={() => setDarkColorHue(-1)}
        draggable={false}
        onDragStart={() => false}
      />
    );

    return result;
  };

  const getCursor = () => {
    return (
      <div id="bgaext_palette_cursor" draggable={false} onMouseDown={paletteCursorMoveDown} onDragStart={() => false} />
    );
  };

  const getSaturationCursor = () => {
    return (
      <div id="bgaext_saturation_cursor" draggable={false} onMouseDown={saturationCursorMoveDown} onDragStart={() => false} />
    );
  };

  const reset = () => {
    if (gameName === "general") {
      setDarkColorHue(-1);
      setDarkColorSaturation(15);
    } else {
      setDarkColorHue(config.getDarkModeColor("general"));
      setDarkColorSaturation(config.getDarkModeSaturation("general"));
    }
  };

  const setRecommanded = () => {
    if (recommandedConfig) {
      setDarkColorHue(recommandedConfig.color);
      setDarkColorSaturation(recommandedConfig.sat);
    }
  };

  const getPalette = () => {
    const color1 = `hsl(${darkColorHue}, 4%, 35%)`;
    const color2 = `hsl(${darkColorHue}, 124%, 35%)`;
    const saturationStyle = `background: linear-gradient(90deg, ${color1}, ${color2})`;

    if (paletteVisible && darkMode) {
      let titleText: string, resetLinkText: string;

      if (gameName === "general") {
        titleText = chrome.i18n.getMessage("darkColorConfigurationMain");
        resetLinkText = chrome.i18n.getMessage("darkColorResetMain");
      } else {
        titleText = chrome.i18n.getMessage("darkColorConfigurationGame");
        resetLinkText = chrome.i18n.getMessage("darkColorResetGame");
      }

      return (
        <div id="bgaext_palette_container" draggable={false} onDragStart={() => false}>
          <h2 class="bgaext_palette_title">{titleText}</h2>
          <div class="bgaext_closeicon" onClick={togglePaletteVisible}><i class="fa fa-times-circle" aria-hidden="true"></i></div>
          <div className="bgaext_palette" draggable={false} onDragStart={() => false}>
            {getCells()}
            {getCursor()}
          </div>
          {darkColorHue >= 0 && <div className="bgaext_saturation_selector" style={saturationStyle} onClick={saturationClick} draggable={false} onDragStart={() => false}>
            {getSaturationCursor()}
          </div>}
          <div className="bgaext_palette_bottom">
            {recommandedConfig && <a href="#" className="bgaext_link" onClick={setRecommanded}>{chrome.i18n.getMessage("darkColorRecommanded")}</a>}
            {!recommandedConfig && <span></span>}
            <a href="#" className="bgaext_link" onClick={reset}>{resetLinkText}</a>
          </div>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <span className="bgaext_darkmode">
        {getMenuIcon()}
        {getIcon()}
      </span>
      {getPalette()}
    </>
  );
};

export default ModeSelector;