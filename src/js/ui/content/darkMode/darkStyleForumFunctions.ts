import { getDarkStyle, createStyle, getFile, DarkStyle, saveDarkStyle } from "./darkStyleCommonFunctions";

const cssList = ["dark_theme/background.css", "dark_theme/forum.css", "dark_theme/icons.css", "native_theme/general.css"];
const cssContents: Record<string, string> = {};
let customCssCode = '';
let styleComponent: HTMLStyleElement;

Promise.all(cssList.map(file => getFile(file))).then(fileContents => {
  fileContents.forEach(({ file, content }) => cssContents[file] = content);

  styleComponent = createStyle();
  _setDarkStyleIfActivated();
});

const _setDarkStyleIfActivated = () => {
  try {
    if (getDarkStyle() === 'on' || getDarkStyle() === 'native') {
      _setDarkStyle();
    } else {
      _setNativeStyle();
    }
  }
  catch (error) {
    setTimeout(_setDarkStyleIfActivated, 100);
  }
};

const _setDarkStyle = () => {
  console.log("[bga extension - forum] Set dark mode");

  if (styleComponent) {
    styleComponent.textContent = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/forum.css"]}${customCssCode}`;
  }

  document.documentElement.classList.add("bgaext_dark");
};

const _setNativeStyle = () => {
  console.log("[bga extension - forum] Set native mode");

  if (styleComponent) {
    styleComponent.textContent = `${cssContents["native_theme/general.css"]}${customCssCode}`;
  }

  document.documentElement.classList.remove("bgaext_dark");
};

export const setDarkStyle = (val: DarkStyle, customCss: string) => {
  customCssCode = customCss;

  saveDarkStyle(val);

  if (val === 'on') {
    _setDarkStyle();
  } else {
    _setNativeStyle();
  }
};