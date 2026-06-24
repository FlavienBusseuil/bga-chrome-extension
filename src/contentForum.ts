import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleForumFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";

let windowLoaded = false;
let configLoaded = false;
let cssCounter = 0;

const sendForumLoaded = () => {
  if (windowLoaded && configLoaded) {
    // hack to avoid light theme flashing
    chrome.runtime.sendMessage({ to: 'MAIN_PAGE', payload: { key: 'bga_ext_forum_visible' } });
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

const getDarkStyle = () => {
  const darkMode = config.isDarkMode();
  const nativeDarkMode = config.isDarkModeNative();

  if (darkMode && nativeDarkMode) {
    return 'native';
  }
  if (darkMode) {
    return 'on';
  }
  return 'off';
};

const initPage = () => {
  document.documentElement.classList.add('bgaext_forum');

  const darkStyle = getDarkStyle();
  setDarkStyle(darkStyle, config.getCustomCss());
  adjustDarkColors();

  if (config.isSolidBackground()) {
    document.documentElement.classList.add('bgaext_solid_back');
  }

  configLoaded = true;
  sendForumLoaded();

  let _manageHtmlTagTimeout: any = 0;

  const observer = new MutationObserver(() => {
    if (_manageHtmlTagTimeout) {
      clearTimeout(_manageHtmlTagTimeout);
    }
    _manageHtmlTagTimeout = setTimeout(_manageHtmlTag, 100);
  });
  observer.observe(document.documentElement, { attributes: true });
};

const _manageHtmlTag = () => {
  const style = getDarkStyle();

  if (style === 'native') {
    localStorage.setItem('bga-theme', 'dark');
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
  } else {
    localStorage.setItem('bga-theme', 'light');
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }
};

document.addEventListener('bga_ext_update_config', (data) => {
  const key = (data as CustomEvent).detail.key as string;

  switch (key) {
    case 'darkModeColor':
    case 'darkModeSat':
      adjustDarkColors();
      break;
    case 'darkMode':
    case 'darkModeNative':
      const darkStyle = getDarkStyle();
      setDarkStyle(darkStyle, config.getCustomCss());

      if (darkStyle !== 'on') {
        // refresh of the CSS to load the background image that was previously blocked
        const link = Array.from(document.querySelectorAll("link")).find(l => l.href.indexOf('stylesheet.css') > 0)
        if (link) {
          setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 100);
          setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 1000);
        }
      }
      break;
  }
});

const config = new Configuration();
config.init().then(initPage);