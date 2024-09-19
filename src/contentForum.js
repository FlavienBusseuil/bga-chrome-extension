import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";

window.addEventListener("load", () => {
  // hack to avoid light theme flashing
  top.postMessage({ key: 'bga_ext_forum_visible' }, 'https://boardgamearena.com/');
});

const adjustDarkColors = () => {
  const hue = config.getDarkModeColor('forum');
  const saturation = config.getDarkModeSaturation('forum');

  changeDarkColors(hue, saturation);
};

const initPage = () => {
  document.documentElement.classList.add('bgaext_forum');
  setDarkStyle(config.isDarkMode(), config.getCustomCss());
  adjustDarkColors();
};

document.addEventListener('bga_ext_update_config', (data) => {
  console.log('bga_ext_update_config', data);
  if (['darkModeColor', 'darkModeSat'].includes(data.detail.key)) {
    adjustDarkColors();
  }
});

const config = new Configuration();
config.init().then(initPage);