import { getUrl } from "../../../utils/chrome";
import { isNumber } from "../../../utils/misc/isNumber";
import { darkStyleForGame, gamesWithCustomActions, gamesWithCustomBackground, gamesWithCustomDarkMode, gamesWithCustomPanel, gamesWithCustomPlayerStyle, styleForGame } from "../../../config/darkThemeGames";
import { PlayerData, getPlayersData } from "../players";

const themeStyleId = "ext-theme-style";
const cookieName = "ext_dark_theme";

const isDarkStyle = (mode: string) => {
  const customActions = gamesWithCustomActions[mode];
  return customActions ? customActions.isDarkMode() : localStorage.getItem(cookieName) === "on";
}

const { cssList, mode } = (() => {
  if (window.location.host === "forum.boardgamearena.com") {
    return { mode: "forum", cssList: ["dark_theme/background.css", "dark_theme/forum.css"] };
  }

  const pageInfo = window.location.pathname.substring(1).split("/");
  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    return { mode: pageInfo[1], cssList: ["dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/game.css"] };
  }

  if (pageInfo[0] === "archive" || pageInfo[0] === "tutorial") {
    return { mode: "archive", cssList: [] };
  }

  return { mode: "general", cssList: ["light_theme/background.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/general.css"] };
})();

const cssContents = {};

const getFile = async (file: string) => {
  const url = getUrl(`css/${file}`);
  const response = await fetch(url);
  const content = await response.text();
  return { file, content };
};

let styleComponent;
const createStyle = () => {
  styleComponent = document.createElement("style");
  styleComponent.id = themeStyleId;
  document.head.appendChild(styleComponent);
};

Promise.all(cssList.map(getFile)).then(fileContents => {
  fileContents.forEach(({ file, content }) => cssContents[file] = content);

  createStyle();
  _setDarkStyleIfActivated();
});

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : hex;
};

const colorsMap = [
  { light: "#0000ff", dark: "#8080ff" },
  { light: "#982fff", dark: "#bf80ff" },
  { light: "#1863a5", dark: "#8fc2ef" },
  { light: "#0000dd", dark: "#8080ff" },
  { light: "#442df0", dark: "#9588f7" },
  { light: "#2a05df", dark: "#5837fb" },
  { light: "#ff0000", dark: "#ff3333" },
  { light: "#800000", dark: "#cc0000" },
  { light: "#1a355e", dark: "#3771c8" },
  { light: "#4e186f", dark: "#932ed1" },
  { light: "#325089", dark: "#446ebb" },
  { light: "#044396", dark: "#066ff9" },
  { light: "#003377", dark: "#006eff" },
  { light: "#0000aa", dark: "#006eaa" },
  { light: "#773300", dark: "#b34d00" },
  { light: "#5D0075", dark: "#8f00b3" },
  { light: "#6c3161", dark: "#9e478e" },
  { light: "#483d8b", dark: "#7c71c1" },
  { light: "#2b4d9c", dark: "#4b72ce" },
  { light: "#4c1b5b", dark: "#732989" },
];

const colorsToEnlight = [
  '#000000', '#101820', '#123888', '#1e2e3d', '#404040', '#272c29', '#3d1303', '#2d2926', '#3b3232', '#010203', '#1a2126', '#302c2b', '#321500'
];

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

  const colorsMapFiltered = colorsMap.filter(c => playersData.find(p => p.color === c.light));
  const mappingStyle = colorsMapFiltered.length ? colorsMapFiltered.map(c => {
    return `${getDeclarations(c.light)} { color: ${c.dark} !important; }`;
  }).join(" ") : "";

  const colorsToEnlightFiltered = colorsToEnlight.filter(c => playersData.find(p => p.color === c));
  const enlightStyle = colorsToEnlightFiltered.length
    ? `${colorsToEnlightFiltered.map(getDeclarations).join(', ')} { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white !important; }`
    : "";

  return `${mappingStyle} ${enlightStyle}`;
};

const _setPlayersColor = (query: string, playersData: PlayerData[]) => {
  const elements = document.querySelectorAll(query);

  if (!elements.length) {
    setTimeout(() => _setPlayersColor(query, playersData), 100);
    return;
  }

  elements.forEach((elt: any) => {
    const data = playersData.find(p => p.name === elt.innerText);
    if (data) {
      elt.style.color = data.color;
    }
  });
};

const _setDarkStyleIfActivated = () => {
  try {
    const customActions = gamesWithCustomActions[mode];
    customActions && customActions.init();

    if (isDarkStyle(mode)) {
      _setDarkStyle(mode);
    }
    initClassObserver(mode);
  }
  catch (error) {
    setTimeout(_setDarkStyleIfActivated, 100);
  }
};

const _setDarkStyle = (mode: string) => {
  console.log("[bga extension] Set dark mode");

  if (styleComponent) {
    if (mode === "archive") {
      styleComponent.innerHTML = "";
      return;
    }

    if (mode === "forum") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/forum.css"]}`;
    } else if (mode === "general") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/general.css"]}`;
    } else if (gamesWithCustomDarkMode[mode]) {
      styleComponent.innerHTML = styleForGame[mode] || "";
      document.documentElement.classList.add(gamesWithCustomDarkMode[mode]);
    } else {
      getPlayersData().then(playersData => {
        const gameStyle = styleForGame[mode] || "";
        const gameDarkStyle = darkStyleForGame[mode] || "";
        const backStyle = gamesWithCustomBackground.includes(mode) ? "" : cssContents["dark_theme/background.css"];
        const colorsStyle = getDarkColorsStyle(playersData);
        styleComponent.innerHTML = `${backStyle}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/game.css"]}${gameDarkStyle}${gameStyle}${colorsStyle}`;

        if (!gamesWithCustomPanel.includes(mode)) {
          document.documentElement.classList.add("darkpanel");
        }

        if (gamesWithCustomPlayerStyle[mode]) {
          _setPlayersColor(gamesWithCustomPlayerStyle[mode], playersData);
        }
      });
    }
  }

  document.documentElement.classList.add("darkmode");
};

const _setLightStyle = (mode: string) => {
  console.log("[bga extension] Set light mode");

  if (styleComponent) {
    if (mode === "archive") {
      styleComponent.innerHTML = "";
      return;
    }

    if (mode === "general") {
      styleComponent.innerHTML = cssContents["light_theme/background.css"];
    } else if (mode === "forum") {
      styleComponent.innerHTML = "";
    } else if (gamesWithCustomDarkMode[mode]) {
      document.documentElement.classList.remove(gamesWithCustomDarkMode[mode]);
    } else {
      styleComponent.innerHTML = styleForGame[mode] || "";
    }
  }

  document.documentElement.classList.remove("dark");
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
  if (mode === "general" || mode === "forum") {
    return;
  }

  // ensure that the "darkmode" class is well placed for games that used to manage their own dark mode like "Concept"
  // if the game try to remove the class "darkmode", it put it back immediately
  const observer = new MutationObserver(() => {
    const customDarkClass = gamesWithCustomDarkMode[mode];

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