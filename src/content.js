import Configuration from './js/config/configuration';
import { isNumber } from './js/utils/misc/isNumber';
import { addLocationChangeListener } from './js/utils/misc/addLocationChangeListener';
import { buildMainCss, initlogObserver, initLeftMenu, setFloatingRightMenu, initDevelopperUI, buildOptions, initGameLobby, initGameListObserver } from './js/ui/content/functions';

const pageInfo = window.location.pathname.substring(1).split('/');
const config = new Configuration();

buildMainCss();

const manageLocationChange = (pathname) => {
  console.log('[bga extension] load path', pathname);

  const pageInfo = pathname.substring(1).split('/');

  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    const gameName = pageInfo[1];
    const gameConfig = config.getGameConfig(gameName);

    setTimeout(() => initlogObserver(config), 1000);
    if (config.isGlobalFloatingMenu() || config.isGameFloatingMenu(gameName)) {
      setFloatingRightMenu(gameConfig, true);
    }

    buildOptions(config, gameName, gameConfig);

    if (!gameConfig) {
      console.log(`[bga extension] No configuration found for game ${gameName}`);
      return;
    }

    initLeftMenu(gameConfig, config.isLeftMenuEnabled(gameName));
  } else if (pageInfo[0].startsWith('gamelist')) {
    initGameListObserver(config);
  } else if (pageInfo[0].startsWith('lobby')) {
    initGameLobby(config);
  } else if (pageInfo[0].startsWith('bug')) {
    initDevelopperUI(config);
  }
};

const initPage = () => {
  config.isEmpty() && document.dispatchEvent(new CustomEvent('bga_ext_get_config', {}));

  addLocationChangeListener(manageLocationChange);
  manageLocationChange(window.location.pathname);
};

config.init().then(initPage);

document.addEventListener('bga_ext_set_config', function (e) {
  const jsonData = e.detail;
  console.log('[bga extension] import data from deprecated extension', jsonData);
  config.import(JSON.parse(jsonData));
  !config.isEmpty() && location.reload();
});