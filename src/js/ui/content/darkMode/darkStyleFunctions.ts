import { isNumber } from "../../../utils/misc/isNumber";
import { waitForObj } from "../../../utils/misc/wait";
import { darkStyleForGame, gamesWithCustomActions, gamesWithCustomBackground, gamesWithCustomDarkMode, gamesWithCustomPanel, gamesWithCustomPlayerStyle, playersBackground, styleForGame } from "../../../config/darkThemeGames";
import { PlayerData, getPlayersData, getPlayersPossibleColors } from "../players";
import { cookieName, createStyle, getFile } from "./darkStyleCommonFunctions";

const isDarkStyle = (mode: string) => {
  const customActions = gamesWithCustomActions[mode];
  return customActions && customActions.isDarkMode ? customActions.isDarkMode() : localStorage.getItem(cookieName) === "on";
}

const { cssList, mode } = (() => {
  const pageInfo = window.location.pathname.substring(1).split("/");
  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    return { mode: pageInfo[1], cssList: ["dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  if (pageInfo[0] === "tutorial") {
    const mode = window.location.search.substring(1).split('&').find(p => p.startsWith('game'))?.split('=')[1] || 'general';
    return { mode, cssList: ["dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  if (pageInfo[0] === "archive") {
    return { mode: "archive", cssList: ["dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  return { mode: "general", cssList: ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/general.css"] };
})();

const cssContents = {};
let styleComponent;

Promise.all(cssList.map(getFile)).then(fileContents => {
  fileContents.forEach(({ file, content }) => cssContents[file] = content);

  styleComponent = createStyle();
  _setDarkStyleIfActivated();
});

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : hex;
};

const getDarkColorsStyle = (playersData: PlayerData[]) => {
  const getDeclaration = (color: string) => {
    return `[style*=";color:${color}"], [style*=";color: ${color}"], [style*="; color:${color}"], [style*="; color: ${color}"], [style^="color:${color}"], [style^="color: ${color}"]`
  }

  const getDeclarations = (color: string) => {
    const colorRgb = hexToRgb(color);
    const colorUp = color.toUpperCase();

    const declaration = [getDeclaration(color), getDeclaration(colorRgb)];
    if (color !== colorUp) {
      declaration.push(getDeclaration(colorUp))
    }

    return declaration.join(', ');
  };

  const colorsMapFiltered = playersData.filter(p => p.darkColor);
  const mappingStyle = colorsMapFiltered.length ? colorsMapFiltered.map(p => {
    return `${getDeclarations(p.color)} { color: ${p.darkColor} !important; }`;
  }).join(" ") : "";

  const colorsToEnlightFiltered = playersData.filter(p => p.darkEnlight);
  const enlightStyle = colorsToEnlightFiltered.length
    ? `${colorsToEnlightFiltered.map((p) => getDeclarations(p.color)).join(', ')} { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white !important; }`
    : "";

  const playerColorsCss = playersData.map(p => {
    if (p.darkEnlight) {
      return `.ext_player_${p.id} { color: ${p.color} !important; text-shadow: var(--text-w-shadow); }`;
    }
    return `.ext_player_${p.id} { color: ${p.darkColor || p.color} !important; }`;
  }).join(" ");

  return `${mappingStyle} ${enlightStyle} ${playerColorsCss}`;
};

const _checkContent = (elt: any, text: string) => {
  const toSearch = text.toLowerCase();

  if (elt.innerText.trim().toLowerCase().startsWith(toSearch)) {
    return true;
  }

  const beforeText = getComputedStyle(elt, ':before').getPropertyValue('content') || '';
  if (beforeText.trim().replace('"', '').toLowerCase().startsWith(toSearch)) {
    return true;
  }

  return false;
};

const _setPlayersColor = (query: string, playersData: PlayerData[]) => {
  const elements = document.querySelectorAll(query);

  let ok = false;
  elements.forEach((elt: any) => {
    const data = playersData.find(p => _checkContent(elt, p.name));
    if (data) {
      elt.classList.add(`ext_player_${data.id}`);
      ok = true;
    }
  });

  if (!ok) {
    setTimeout(() => _setPlayersColor(query, playersData), 100);
    return;
  }
};

const _setDarkStyleIfActivated = () => {
  try {
    const customActions = gamesWithCustomActions[mode];
    customActions && customActions.init && customActions.init();

    if (isDarkStyle(mode)) {
      _setDarkStyle(mode);
    } else {
      _setLightStyle(mode);
    }
    initClassObserver(mode);
  }
  catch (error) {
    setTimeout(_setDarkStyleIfActivated, 100);
  }
};

const _setDarkStyleForGame = (gameName: string) => {
  const applyGeneralCss = !gamesWithCustomDarkMode[gameName] || gamesWithCustomDarkMode[gameName].applyGeneralCss;
  const classToAdd = gamesWithCustomDarkMode[gameName]?.className;

  if (applyGeneralCss) {
    const gameStyle = styleForGame[gameName] || "";
    const gameDarkStyle = darkStyleForGame[gameName] || "";
    const backStyle = gamesWithCustomBackground.includes(gameName) ? "" : cssContents["dark_theme/background.css"];

    const completeStyle = `${backStyle}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/game.css"]}${gameDarkStyle}${gameStyle}`;
    styleComponent.innerHTML = completeStyle;

    if (!gamesWithCustomPanel.includes(gameName)) {
      document.documentElement.classList.add("darkpanel");
    }

    getPlayersData().then(playersData => {
      console.debug("[bga extension] players data", playersData);

      const possibleColors = [...playersData, ...getPlayersPossibleColors(gameName)];
      const colorsStyle = getDarkColorsStyle(possibleColors);
      const backStyle = playersBackground[gameName] ? playersBackground[gameName].map((rule: string) => {
        return playersData.filter(d => d.darkColor && d.darkColor !== d.color).map(d => {
          const ruleName = rule.replace('{{player_id}}', d.id.toString());
          return `${ruleName} { background-color: ${d.darkColor}!important; }`
        });
      }).flat().join(' ') : '';
      styleComponent.innerHTML = `${completeStyle}${colorsStyle}${backStyle}`;

      if (gamesWithCustomPlayerStyle[gameName]) {
        _setPlayersColor(gamesWithCustomPlayerStyle[gameName], playersData);
      }
    });
  } else {
    styleComponent.innerHTML = styleForGame[gameName] || "";
  }

  if (classToAdd) {
    document.documentElement.classList.add(classToAdd)
  }
};

const _setDarkStyle = (mode: string) => {
  console.log("[bga extension] set dark mode");

  if (styleComponent) {
    if (mode === "archive") {
      styleComponent.innerHTML = "";

      waitForObj('[href*="table="]', 5).then((elt: any) => {
        const gameName = elt.href.substring(elt.href.lastIndexOf('/') + 1).split('?')[0];
        _setDarkStyleForGame(gameName);
      });
    } else if (mode === "general") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/general.css"]}`;
    } else {
      _setDarkStyleForGame(mode);
    }
  }

  document.documentElement.classList.add("darkmode");
};

const _setLightStyle = (mode: string) => {
  console.log("[bga extension] set light mode");

  if (styleComponent) {
    if (mode === "archive") {
      styleComponent.innerHTML = "";
      return;
    }

    if (mode === "general") {
      styleComponent.innerHTML = cssContents["light_theme/general.css"];
    } else {
      styleComponent.innerHTML = styleForGame[mode] || "";
      if (gamesWithCustomDarkMode[mode]) {
        document.documentElement.classList.remove(gamesWithCustomDarkMode[mode].className);
      }
    }
  }

  document.documentElement.classList.remove("darkmode");
  document.documentElement.classList.remove("darkpanel");
};

export const setDarkStyle = (mode: string, val: boolean) => {
  if (isDarkStyle(mode) === val) {
    return;
  }

  localStorage.setItem(cookieName, val ? "on" : "off");

  if (val) {
    _setDarkStyle(mode);
  } else {
    _setLightStyle(mode);
  }
};

const initClassObserver = (mode: string) => {
  if (mode === "general") {
    return;
  }

  // ensure that the "darkmode" class is well placed for games that used to manage their own dark mode like "Concept"
  // if the game try to remove the class "darkmode", it put it back immediately
  const observer = new MutationObserver(() => {
    const customDarkClass = gamesWithCustomDarkMode[mode]?.className;

    if (isDarkStyle(mode)) {
      if (!document.documentElement.classList.contains("darkmode")) {
        document.documentElement.classList.add("darkmode");
      }
      if (customDarkClass && !document.documentElement.classList.contains(customDarkClass)) {
        document.documentElement.classList.add(customDarkClass);
      }
    } else {
      if (document.documentElement.classList.contains("darkmode")) {
        document.documentElement.classList.remove("darkmode");
      }
      if (customDarkClass && document.documentElement.classList.contains(customDarkClass)) {
        document.documentElement.classList.remove(customDarkClass);
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  return observer;
};