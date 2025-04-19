import { cookieName, createStyle, getFile } from "./darkStyleCommonFunctions";

const cssList = ["dark_theme/background.css", "dark_theme/forum.css", "dark_theme/icons.css", "light_theme/general.css"];
const cssContents: Record<string, string> = {};
let customCssCode = '';
let styleComponent: HTMLStyleElement;

Promise.all(cssList.map(getFile)).then(fileContents => {
  fileContents.forEach(({ file, content }) => cssContents[file] = content);

  styleComponent = createStyle();
  _setDarkStyleIfActivated();
});

const isDarkStyle = () => {
  return localStorage.getItem(cookieName) === "on";
}

const _setDarkStyleIfActivated = () => {
  try {
    if (isDarkStyle()) {
      _setDarkStyle();
    } else {
      _setLightStyle();
    }
  }
  catch (error) {
    setTimeout(_setDarkStyleIfActivated, 100);
  }
};

const _setDarkStyle = () => {
  console.log("[bga extension - forum] Set dark mode");

  if (styleComponent) {
    styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/forum.css"]}${customCssCode}`;
  }

  document.documentElement.classList.add("darkmode");
};

const _setLightStyle = () => {
  console.log("[bga extension - forum] Set light mode");

  if (styleComponent) {
    styleComponent.innerHTML = `${cssContents["light_theme/general.css"]}${customCssCode}`;;
  }

  document.documentElement.classList.remove("darkmode");
};

export const setDarkStyle = (val: boolean, customCss: string) => {
  customCssCode = customCss;

  if (isDarkStyle() === val) {
    return;
  }

  localStorage.setItem(cookieName, val ? "on" : "off");

  if (val) {
    _setDarkStyle();
  } else {
    _setLightStyle();
  }
};