import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";

window.addEventListener("load", () => {
  // hack to avoid light theme flashing
  top.postMessage({ key: 'bga_ext_forum_visible' }, 'https://boardgamearena.com/');
});

const adjustDarkColors = () => {
  const hue = config.getDarkModeColor('forum');
  const saturation = config.getDarkModeSaturation('forum');

  if (hue < 0) {
    document.body.style.removeProperty("--dark-10");
    document.body.style.removeProperty("--dark-20");
    document.body.style.removeProperty("--dark-30");
    document.body.style.removeProperty("--dark-40");
    document.body.style.removeProperty("--dark-back");
    document.body.style.removeProperty("--dark-popup-back");
  } else {
    document.body.style.setProperty("--dark-10", `hsl(${hue}, ${saturation}%, 13%)`);
    document.body.style.setProperty("--dark-20", `hsl(${hue}, ${saturation}%, 17%)`);
    document.body.style.setProperty("--dark-30", `hsl(${hue}, ${saturation - 4}%, 22%)`);
    document.body.style.setProperty("--dark-40", `hsl(${hue}, ${saturation - 4}%, 26%)`);
    document.body.style.setProperty("--dark-back", `hsl(${hue}, ${saturation}%, 15%, 0.75)`);
    document.body.style.setProperty("--dark-popup-back", `hsl(${hue}, ${saturation - 4}%, 22%)`);
  }
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