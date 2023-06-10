import Configuration from './js/config/configuration';
import { isNumber } from './js/utils/misc/isNumber';
import { buildMainCss, initlogObserver, initLeftMenu, setFloatingRightMenu, initDevelopperUI, buildOptions } from './js/ui/content/functions';

const pageInfo = window.location.pathname.substring(1).split('/');
let gameConfig;

if (pageInfo[0].startsWith('bug')) {
  buildMainCss();
  initDevelopperUI();
} else if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
  const gameName = pageInfo[1];
  const config = new Configuration();

  buildMainCss();

  config.init().then(() => {
    gameConfig = config.getGameConfig(gameName);

    setTimeout(() => initlogObserver(config), 1000);
    if (config.isGlobalFloatingMenu() || config.isGameFloatingMenu(gameName)) {
      setFloatingRightMenu(true);
    }

    buildOptions(config, gameName, gameConfig);

    if (!gameConfig) {
      console.log(`[bga extension] No configuration found for game ${gameName}`);
      return;
    }

    initLeftMenu(gameConfig, config.isLeftMenuEnabled(gameName));
  });
};