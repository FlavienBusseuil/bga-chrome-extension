import { bgPeriodic } from "./js/bgPeriodic";
import Configuration from "./js/config/configuration";
import { addChangeListener } from "./js/utils/browser";

const config = new Configuration();
let redirectConfigured = false;
let newsfeedRedirectConfigured = false;
let solidBackground = false;
let darkMode = false;
let preventBack = false;

const setBackgroundFilters = () => {
  const newPreventBack = solidBackground || darkMode;

  if (preventBack !== newPreventBack) {
    preventBack = newPreventBack;

    if (preventBack) {
      console.log("[bga extension] Add filters to prevent default website background");
      // rule 1 : prevent display of default background in main site
      // rule 2 : prevent display of default background in forum
      // rule 3 : prevent display of default background in games

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3],
        addRules: [{
          id: 1,
          action: { type: "block" },
          condition: { urlFilter: "https://*.boardgamearena.net/data/themereleases/*/img/layout/back-main.jpg" },
        }, {
          id: 2,
          action: { type: "block" },
          condition: { urlFilter: "https://forum.boardgamearena.com/styles/prosilver/theme/images/bga/back-main.jpg" },
        }, {
          id: 3,
          action: { type: "block" },
          condition: { urlFilter: "https://*.boardgamearena.net/data/themereleases/*/img/layout/back-main_games.jpg" },
        }]
      });
    } else {
      console.log("[bga extension] Remove filters to prevent default website background");

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
      });
    }
  }
};

const setLobbyUrlFilters = (isRedirectEnable: boolean) => {
  if (redirectConfigured !== isRedirectEnable) {
    redirectConfigured = isRedirectEnable;

    if (redirectConfigured) {
      console.log("[bga extension] Add filters to redirect to classic lobby");
      // rule 4 : redirect to classic lobby

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [4],
        addRules: [{
          id: 4,
          action: { type: "redirect", "redirect": { "regexSubstitution": "https://boardgamearena.com/table?table=\\2&nr=true" } },
          condition: {
            regexFilter: "^https://boardgamearena\\.com/gamepanel\\?game=([a-z]*)&table=([0-9]*)",
            resourceTypes: ["main_frame"]
          },
        }]
      });
    } else {
      console.log("[bga extension] Remove filters to redirect to classic lobby");
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [4]
      });
    }
  }
};

const setNewsfeedFilters = (isRedirectEnable: boolean) => {
  if (newsfeedRedirectConfigured !== isRedirectEnable) {
    newsfeedRedirectConfigured = isRedirectEnable;

    if (newsfeedRedirectConfigured) {
      console.log("[bga extension] Add filters to remove social messages from newsfeed");
      // rule 5 & 6  : remove social messages from newsfeed

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [5, 6],
        addRules: [{
          id: 5,
          action: { type: "redirect", "redirect": { "regexSubstitution": "https://boardgamearena.com/message/board?type=player&id=\\1&social=true&per_page=30&dojo.preventCache=\\3" } },
          condition: {
            regexFilter: "^https://boardgamearena\\.com/message/board\\?type=player&id=([0-9]*)&social=true&per_page=([0-9]*)&dojo.preventCache=([0-9]*)"
          },
        }, {
          id: 6,
          action: { type: "redirect", "redirect": { "regexSubstitution": "https://boardgamearena.com/message/board?type=player&id=\\1&social=true&page=\\2&per_page=30&from_time=\\4&from_id=\\5&dojo.preventCache=\\6" } },
          condition: {
            regexFilter: "^https://boardgamearena\\.com/message/board\\?type=player&id=([0-9]*)&social=true&page=([0-9]*)&per_page=([0-9]*)&from_time=([0-9]*)&from_id=([0-9]*)&dojo.preventCache=([0-9]*)"
          }
        }]
      });
    } else {
      console.log("[bga extension] Remove filters to remove social messages from newsfeed");
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [5, 6]
      });
    }
  }
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("[bga extension] Service worker installed");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[bga extension] Service worker started");
});

config.init().then(() => {
  // Set alarm to run update every minute
  chrome.alarms.onAlarm.addListener((evt) => {
    if (evt.name === "bgPeriodic") {
      bgPeriodic(config);
    }
  });
  chrome.alarms.create("bgPeriodic", { delayInMinutes: 1, periodInMinutes: 1 });
  bgPeriodic(config);

  // hack to be sure that the background script will not be terminated after 30 seconds inactivity on FF
  const now = new Date().getTime();
  chrome.alarms.create("keepAlive0", { delayInMinutes: 0, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive1", { when: now + 20000, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive2", { when: now + 40000, periodInMinutes: 1 });

  darkMode = config.isDarkMode();
  solidBackground = config.isSolidBackground();

  setBackgroundFilters();
  setLobbyUrlFilters(config.isLobbyRedirectionEnable());
  setNewsfeedFilters(config.areSocialMessagesHidden());
});

addChangeListener((changes) => {
  console.log("[bga extension] Changes detected", changes);

  if (changes.darkMode) {
    darkMode = changes.darkMode.newValue as boolean;
    setBackgroundFilters();
  } else if (changes.solidBack) {
    solidBackground = changes.solidBack.newValue as boolean;
    setBackgroundFilters();
  } else if (changes.hideSocialMessages) {
    setNewsfeedFilters(changes.hideSocialMessages.newValue as boolean);
  } else if (changes.lobbyRedirect) {
    setLobbyUrlFilters(changes.lobbyRedirect.newValue as boolean);
  }
});
