import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";

const initPage = () => {
  document.documentElement.classList.add('bgaext_forum');
  setDarkStyle(config.isDarkMode(), config.getCustomCss());
};

const config = new Configuration();
config.init().then(initPage);