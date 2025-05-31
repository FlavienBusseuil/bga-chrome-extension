import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";

let windowLoaded = false;
let configLoaded = false;

const sendForumLoaded = () => {
  if (windowLoaded && configLoaded) {
    // hack to avoid light theme flashing
    top!.postMessage({ key: 'bga_ext_forum_visible' }, 'https://boardgamearena.com/');
  }
};

window.addEventListener("load", () => {
  windowLoaded = true;
  sendForumLoaded();
})

const adjustDarkColors = () => {
  const hue = config.getDarkModeColor('forum');
  const saturation = config.getDarkModeSaturation('forum');

  changeDarkColors(hue, saturation);
};

const initPage = () => {
  document.documentElement.classList.add('bgaext_forum');
  setDarkStyle(config.isDarkMode(), config.getCustomCss());
  adjustDarkColors();

  if (config.isSolidBackground()) {
    document.documentElement.classList.add('bgaext_solid_back');
  }

  configLoaded = true;
  sendForumLoaded();
};

document.addEventListener('bga_ext_update_config', (data) => {
  const key = (data as CustomEvent).detail.key as string;

  if (key === 'dark') {
    adjustDarkColors();
  } else if (key === 'darkMode') {
    setDarkStyle(config.isDarkMode(), config.getCustomCss());
  }
});

const config = new Configuration();
config.init().then(initPage);