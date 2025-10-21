import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";

let windowLoaded = false;
let configLoaded = false;
let cssCounter = 0;

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
    const isDarkMode = config.isDarkMode();
    setDarkStyle(isDarkMode, config.getCustomCss());

    if (!isDarkMode) {
      // refresh of the CSS to load the background image that was previously blocked
      const link = Array.from(document.querySelectorAll("link")).find(l => l.href.indexOf('stylesheet.css') > 0)
      if (link) {
        setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 100);
        setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 1000);
      }
    }
  }
});

const config = new Configuration();
config.init().then(initPage);