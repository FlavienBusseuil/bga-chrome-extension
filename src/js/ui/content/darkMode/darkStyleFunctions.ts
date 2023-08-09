import { getUrl } from "../../../utils/chrome";
import { isNumber } from "../../../utils/misc/isNumber";
import { darkStyleForGame, gamesWithCustomBackground } from "../../../config/darkThemeGames";

const themeStyleId = "ext-theme-style";
const cookieName = "ext_dark_theme";
const isDarkStyle = () => localStorage.getItem(cookieName) === "on";

const { cssList, mode } = (() => {
  if (window.location.host === "forum.boardgamearena.com") {
    return { mode: "forum", cssList: ["dark_theme/background.css", "dark_theme/forum.css"] };
  }

  const pageInfo = window.location.pathname.substring(1).split("/");
  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    return { mode: pageInfo[1], cssList: ["dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/game.css"] };
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

  if (isDarkStyle()) {
    _setDarkStyle(mode);
  }
});

const _setDarkStyle = (mode: string) => {
  if (styleComponent) {
    if (mode === "forum") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/forum.css"]}`;
    } else if (mode === "general") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/general.css"]}`;
    } else {
      const gameStyle = darkStyleForGame[mode] || "";
      const backStyle = gamesWithCustomBackground.includes(mode) ? "" : cssContents["dark_theme/background.css"];
      styleComponent.innerHTML = `${backStyle}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/game.css"]}${gameStyle}`;
    }
  }

  document.body.classList.add("dark_mode");
};

const _setLightStyle = (mode: string) => {
  if (styleComponent) {
    if (mode === "general") {
      styleComponent.innerHTML = cssContents["light_theme/background.css"];
    } else {
      styleComponent.innerHTML = "";
    }
  }

  document.body.classList.remove("dark_mode");
};

export const setDarkStyle = (mode: string, val: boolean) => {
  if (isDarkStyle() === val) {
    return;
  }

  localStorage.setItem(cookieName, val ? "on" : "off");

  if (val) {
    _setDarkStyle(mode);
  } else {
    _setLightStyle(mode);
  }
};