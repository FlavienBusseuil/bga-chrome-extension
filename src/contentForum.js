import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleFunctions";

const initPage = () => {
  setDarkStyle("forum", config.isDarkMode());
};

const config = new Configuration();
config.init().then(initPage);