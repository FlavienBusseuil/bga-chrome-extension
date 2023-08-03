import { getUrl } from "../../../utils/chrome";
import { isNumber } from "../../../utils/misc/isNumber";
import { darkStyleForGame, gamesWithCustomBackground } from "./darkStyleGame";

const themeStyleId = "ext-theme-style";
const cookieName = "ext_dark_theme";
const isDarkStyle = () => localStorage.getItem(cookieName) === "on";

const { cssList, mode } = (() => {
  if (window.location.host === "forum.boardgamearena.com") {
    return { mode: "forum", cssList: ["background.css", "forum.css"] };
  }

  const pageInfo = window.location.pathname.substring(1).split("/");
  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    return { mode: pageInfo[1], cssList: ["background.css", "common.css", "chat.css", "game.css"] };
  }

  return { mode: "general", cssList: ["background.css", "common.css", "chat.css", "general.css"] };
})();

const cssContents = {};

const getFile = async (file: string) => {
  const url = getUrl(`css/dark_theme/${file}`);
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
      styleComponent.innerHTML = `${cssContents["background.css"]}${cssContents["forum.css"]}`;
    } else if (mode === "general") {
      styleComponent.innerHTML = `${cssContents["background.css"]}${cssContents["common.css"]}${cssContents["chat.css"]}${cssContents["general.css"]}`;
    } else {
      const gameStyle = darkStyleForGame[mode] || "";
      const backStyle = gamesWithCustomBackground.includes(mode) ? "" : cssContents["background.css"];
      styleComponent.innerHTML = `${backStyle}${cssContents["common.css"]}${cssContents["chat.css"]}${cssContents["game.css"]}${gameStyle}`;
    }
  }
};

const _setLightStyle = (mode: string) => {
  if (styleComponent) {
    styleComponent.innerHTML = "";
  }
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