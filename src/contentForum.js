import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";

const initPage = () => {
  setDarkStyle(config.isDarkMode());
};

const config = new Configuration();
config.init().then(initPage);