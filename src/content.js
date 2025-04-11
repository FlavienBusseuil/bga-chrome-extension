import { isMobile } from "is-mobile";

import Configuration from './js/config/configuration';
import { isNumber } from './js/utils/misc/isNumber';
import { waitForObj } from './js/utils/misc/wait';
import { addLocationChangeListener } from './js/utils/misc/addLocationChangeListener';
import {
  buildMainCss,
  initLogObserver,
  initChatObserver,
  initTitleObserver,
  stopTitleObserver,
  initLeftMenu,
  setFloatingRightMenu,
  initDevelopperUI,
  buildOptions,
  initGameListObserver,
  initChatIcon,
  setChatStyle,
  setEloStyle,
  initDarkMode,
  refreshMutedPlayers,
  displayInformationPopup
} from './js/ui/content/functions';
import { gamesWithTwoTeams } from "./js/config/darkThemeGames";
import { initGamePanelObserver } from "./js/ui/content/gamePanel/ongoingGamesCount.ts";

const config = new Configuration();
let currentObserver = null;
let pageType = undefined;
let chatbardock = undefined;

if (localStorage.getItem('ext_dark_theme') === 'on') {
  // hack to avoid light theme flashing
  const s = document.createElement('style');
  s.innerHTML = "* { visibility: hidden; }"
  document.documentElement.appendChild(s);
  window.addEventListener("load", () => {
    if (window.navigator.userAgent.toLowerCase().includes('firefox')) {
      setTimeout(() => { s.remove(); }, 500);
    } else {
      s.remove();
    }
  });
}

const autoHideChat = (e) => {
  if (chatbardock) {
    const clientRect = chatbardock.getBoundingClientRect();
    const minX = clientRect.x - 100;
    const maxX = clientRect.x + clientRect.width + 100;
    const minY = clientRect.y - 50;

    if (e.clientX > minX && e.clientX < maxX && e.clientY > minY) {
      chatbardock.classList.remove('bgaext_hidden');
    } else {
      chatbardock.classList.add('bgaext_hidden');
    }
  } else {
    chatbardock = document.querySelector('#chatbardock');
  }
};

const initObserver = (page) => {
  if (page === 'game') {
    currentObserver = initLogObserver(config);
  } else if (page === 'gamepanel') {
    currentObserver = initGamePanelObserver();
  } else {
    currentObserver = initGameListObserver(config, page);
  }

  if (!currentObserver) {
    setTimeout(() => initObserver(page), 500);
  } else {
    initChatObserver(config);

    if (!config.isAnimatedTitle()) {
      initTitleObserver();
    }

    if (page === 'game' && config.isChatBarAutoHide()) {
      document.querySelector('body').addEventListener('mousemove', autoHideChat);
    }
  }
};

const manageLocationChange = (pathname) => {
  console.log('[bga extension] load path', pathname);

  const pageInfo = pathname.substring(1).split('.')[0].split('/');

  if (window.location.hostname === 'studio.boardgamearena.com') {
    const pageName = pageInfo[0] || 'welcomestudio';
    setHtmlClass(pageName);
    initChatIcon(config);
    initDarkMode(config, 'general');
    return 'studio';
  }

  if (pathname === '/gamepanel' && config.isLobbyRedirectionEnable()) {
    const params = window.location.search.substring(1).split('&');
    const gameParam = params.find(p => p.startsWith('game'));
    const tableParam = params.find(p => p.startsWith('table'));

    if (gameParam && tableParam) {
      const redirectUrl = `https://boardgamearena.com/table?${tableParam}&nr=true`;
      window.location.replace(redirectUrl);
      return 'general';
    }
  }

  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }

  if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
    initObserver('game');

    const gameName = pageInfo[1];
    const gameConfig = config.getGameConfig(gameName);

    if (!isMobile() && (config.isGlobalFloatingMenu() || config.isGameFloatingMenu(gameName))) {
      setFloatingRightMenu(config, true);
    }

    buildOptions(config, gameName, gameConfig);

    if (gameConfig) {
      gamesWithTwoTeams.includes()
      initLeftMenu(config, gameConfig, config.isLeftMenuEnabled(gameName), gamesWithTwoTeams.includes(gameName));
    } else {
      console.debug(`[bga extension] no configuration found for game ${gameName}`);
    }

    initDarkMode(config, gameName);
    setHtmlGameClass();

    return 'game';
  }

  // This is not a game page : load the home page management script
  if (!document.getElementById('ext_homepage')) {
    waitForObj('head', 10).then(() => {
      console.debug("[bga extension] load home page management script");
      const script = document.createElement('script');
      script.id = 'ext_homepage';
      script.src = `${chrome.runtime.getURL('/js/homepage.js')}?&time=${new Date().getTime()}`;
      document.head.appendChild(script);
    });
  }

  const pageName = pageInfo[0] || 'welcome';
  if (pageName === 'blank') {
    return 'blank';
  }

  if (pageName === 'welcome') {
    // send home display configuration to the home page management script
    waitForObj('body', 10).then(sendHomeConfiguration);

    // reload css if the advent calendar is displayed
    waitForObj('.bga-advent-calendar', 10).then(() => buildMainCss(config.getAllCss())).catch(() => { });
  }

  if (pageName === 'tutorial') {
    const gameName = window.location.search.substring(1).split('&').find(p => p.startsWith('game'))?.split('=')[1];
    initDarkMode(config, gameName);
    setHtmlGameClass();
    return 'general';
  }

  if (pageName === 'archive') {
    waitForObj('[href*="table="]', 5).then((elt) => {
      const gameName = elt.href.substring(elt.href.lastIndexOf('/') + 1).split('?')[0];
      initDarkMode(config, gameName);
      setHtmlGameClass();
    });
    return 'general';
  }

  initChatIcon(config);
  initDarkMode(config, 'general');

  setHtmlClass(pageName);

  if (pageName.startsWith('gamelist')) {
    initObserver('gamelist');
  } else if (pageName.startsWith('lobby')) {
    initObserver('lobby');
  } else if (pageName.startsWith('gamepanel')) {
    initObserver('gamepanel');
  } else if (pageName.startsWith('bug')) {
    initObserver('other');
    initDevelopperUI(config);
  } else {
    initObserver('other');
  }
  return 'general';
};

const setHtmlClass = (mode) => {
  const oldClasses = Array.from(document.documentElement.classList).filter(c => c.startsWith('bgaext'));

  oldClasses.map(oldClass => {
    document.documentElement.classList.remove(oldClass);
  })

  document.documentElement.classList.add(`bgaext_${mode}`);

  if (config.isSolidBackground()) {
    document.documentElement.classList.add('bgaext_solid_back');
  }
  if (config.chatDarkIcons()) {
    document.documentElement.classList.add('bgaext_chat_dark_icons');
  }
};

const setHtmlGameClass = () => {
  document.documentElement.classList.add('bgaext_game');

  if (config.isSolidBackground()) {
    document.documentElement.classList.add('bgaext_solid_back');
  }

  if (config.chatDarkIcons()) {
    document.documentElement.classList.add('bgaext_chat_dark_icons');
  }
};

const sendHomeConfiguration = () => {
  const homeConfig = { ...config.getHomeConfig(), ...config.getAdvancedHomeConfig() };
  if (!homeConfig.advanced) {
    homeConfig.html = "";
  }
  const detail = JSON.stringify(homeConfig);
  console.debug('[bga extension] send home configuration', detail);
  document.body.dispatchEvent(new CustomEvent('bga_ext_send_homepage_config', { detail }));
};

const setTableAccessMaxLevel = (tableId, maxLevel) => {
  console.debug(`[bga extension] Search my level for table ${tableId}. Is it ${maxLevel}?`);
  const key = new Date().getTime();
  const levels = [0, 1, 2, 3, 4, 5, 6].map(l => `level${l}=${maxLevel > l}`).join('&');
  const endPoint = `/table/table/changeTableAccessLevel.html?table=${tableId}&${levels}&dojo.preventCache=${key}`;
  const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'changeTableAccessLevel', data: { tableId, level: maxLevel }, errorResult: { data: 'ko' } });
  document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
};

const setTableAccessLevels = (tableId, minLevel, maxLevel) => {
  const key = new Date().getTime();
  const levels = [0, 1, 2, 3, 4, 5, 6].map(l => `level${l}=${l >= minLevel && l <= maxLevel}`).join('&');
  const endPoint = `/table/table/changeTableAccessLevel.html?table=${tableId}&${levels}&dojo.preventCache=${key}`;
  const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'changeTableAccessLevel', data: { tableId, level: -1 }, errorResult: { data: 'ko' } });
  document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
};

const setTableAccessReputation = (tableId, karma) => {
  console.debug(`[bga extension] Set karma restriction value to ${karma} for table ${tableId}`);
  const key = new Date().getTime();
  const endPoint = `/table/table/changeTableAccessReputation.html?table=${tableId}&karma=${karma}&dojo.preventCache=${key}`;
  const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'changeTableAccessReputation', data: { tableId } });
  document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
};

const setTableOpened = (tableId) => {
  console.debug(`[bga extension] Open table ${tableId}`);
  const key = new Date().getTime();
  const endPoint = `/table/table/openTableNow.html?table=${tableId}&dojo.preventCache=${key}`;
  const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'openTableNow' });
  document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
};

const initPage = () => {
  config.isEmpty() && document.dispatchEvent(new CustomEvent('bga_ext_get_config', {}));
  addLocationChangeListener(manageLocationChange);
  pageType = manageLocationChange(window.location.pathname);

  switch (pageType) {
    case 'game':
      buildMainCss(config.getGameCss());
      break;
    case 'studio':
      buildMainCss(config.geStudioCss());
      break;
    default:
      buildMainCss(config.getAllCss());
      break;
  }

  waitForObj('head', 10).then(() => {
    console.debug('[bga extension] bga api script loading...');
    const script = document.createElement('script');
    script.id = 'ext_bga_api';
    script.src = `${chrome.runtime.getURL('/js/bgaApi.js')}?&time=${new Date().getTime()}`;
    document.head.appendChild(script);

    setEloStyle(config);
  });

  waitForObj('body', 10).then(() => {
    if (pageType === 'general') {
      setTimeout(displayInformationPopup, 2000);
    }

    document.body.addEventListener('bga_ext_api_result', (data) => {
      const evtDetail = JSON.parse(data.detail);

      console.debug(`[bga extension] Event ${evtDetail.type} received`, evtDetail);

      if (evtDetail.type === 'createnew') {
        const tableId = evtDetail.response.data.table;
        const karmaRestriction = config.getKarmaRestriction();

        if (karmaRestriction > 0) {
          setTableAccessReputation(tableId, 3);
        } else if (config.isBetterPlayerRestriction() || config.getLevelPlayerRestriction()) {
          setTableAccessMaxLevel(tableId, 6);
        } else if (config.isAutoOpenEnable()) {
          setTableOpened(tableId);
        }
      } else if (evtDetail.type === 'changeTableAccessReputation') {
        if (config.isBetterPlayerRestriction() || config.getLevelPlayerRestriction()) {
          setTableAccessMaxLevel(evtDetail.data.tableId, 6);
        } else if (config.isAutoOpenEnable()) {
          setTableOpened(evtDetail.data.tableId);
        }
      } else if (evtDetail.type === 'changeTableAccessLevel') {
        if (evtDetail.response.data === 'ok') {
          if (evtDetail.data.level > 0) {
            setTableAccessMaxLevel(evtDetail.data.tableId, evtDetail.data.level - 1);
          } else if (config.isAutoOpenEnable()) {
            setTableOpened(evtDetail.data.tableId);
          }
        } else {
          const levelPlayerRestriction = config.getLevelPlayerRestriction();
          const myLevel = evtDetail.data.level;

          if (levelPlayerRestriction) {
            const minLevel = Math.max(myLevel - levelPlayerRestriction, 0);
            const maxLevel = Math.min(myLevel + levelPlayerRestriction, 6);

            console.debug(`[bga extension] My level is ${myLevel}. Set authorized levels between ${minLevel} and ${maxLevel}`);
            setTableAccessLevels(evtDetail.data.tableId, minLevel, maxLevel);
          } else if (config.isAutoOpenEnable()) {
            console.debug(`[bga extension] My level is ${myLevel}. Players with higher level are not allowed`);
            setTableOpened(evtDetail.data.tableId);
          }
        }
      }
    });

    document.body.addEventListener('bga_ext_get_homepage_config', sendHomeConfiguration);
  });
};

config.init().then(initPage);

document.addEventListener('bga_ext_update_config', (data) => {
  console.debug('[bga extension] configuration updated', data);
  if (data.detail.key === 'hideGeneralChat') {
    setChatStyle(config);
  } else if (data.detail.key === 'hideElo') {
    setEloStyle(config);
  } else if (data.detail.key === 'muted') {
    refreshMutedPlayers(config);
  } else if (data.detail.key === 'solidBack') {
    location.reload();
  } else if (data.detail.key === 'inProgress' || data.detail.key === 'hideChatUserNames') {
    if (pageType === 'general') {
      buildMainCss(config.getAllCss());
    }
  } else if (data.detail.key === 'home') {
    localStorage.removeItem('bga-homepage-newsfeed-slots');
    localStorage.removeItem('bga-homepageNewsSeen');

    if (pageType === 'general') {
      buildMainCss(config.getAllCss());
    }
    if (document.documentElement.classList.contains("bgaext_welcome")) {
      sendHomeConfiguration();
    }
  } else if (data.detail.key === 'hideSocialMessages') {
    if (document.documentElement.classList.contains("bgaext_welcome") || document.documentElement.classList.contains("bgaext_player")) {
      location.reload();
    }
  } else if (data.detail.key === 'animatedTitle') {
    if (config.isAnimatedTitle()) {
      stopTitleObserver();
    } else {
      initTitleObserver();
    }
  } else if (['hideLogTimestamp', 'chatBarAutoHide'].includes(data.detail.key)) {
    if (pageType === 'game') {
      buildMainCss(config.getGameCss());

      if (config.isChatBarAutoHide()) {
        document.querySelector('body').addEventListener('mousemove', autoHideChat);
      } else {
        document.querySelector('body').removeEventListener('mousemove', autoHideChat);
      }
    }
  } else if (data.detail.key === 'chatLightIcons') {
    if (config.chatDarkIcons()) {
      document.documentElement.classList.add('bgaext_chat_dark_icons');
    } else {
      document.documentElement.classList.remove('bgaext_chat_dark_icons');
    }
  }
});

window.addEventListener('message', (evt) => {
  if (evt.origin === 'https://forum.boardgamearena.com' && evt.data.key === 'bga_ext_forum_visible') {
    // hack to avoid light theme flashing
    console.debug('[bga extension] forum displayed');
    document.documentElement.classList.add('bgaext_forum_visible');
  }
}, false);
