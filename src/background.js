import { bgPeriodic } from "./js/bgPeriodic";
import Configuration from "./js/config/configuration";
import { addChangeListener } from "./js/utils/chrome";

const config = new Configuration();
let darkModeConfigured = undefined;
let redirectConfigured = undefined;

const setDarkModeUrlFilters = (isDarkMode) => {
  if (darkModeConfigured !== isDarkMode) {
    darkModeConfigured = isDarkMode;

    if (darkModeConfigured) {
      console.log("[bga extension] Add filters for dark mode");
      // rule 1 : prevent display default background just before dark background in dark mode
      // (could not be replaced because the whole page is NOT reloaded each time we change from dark to light)
      // rule 2 : replace forum default background in dark mode
      // (could be replaced because the whole page is reloaded each time we change from dark to light)
      // rule 3 : replace forum's smileys in dark mode

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3],
        addRules: [{
          id: 1,
          action: { type: "block" },
          condition: { urlFilter: "https://*.boardgamearena.net/data/themereleases/*/img/layout/back-main.jpg" },
        },
        {
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
      console.log("[bga extension] Remove filters for dark mode");

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
      });
    }
  }
};

const setLobbyUrlFilters = (isRedirectEnable) => {
  if (redirectConfigured !== isRedirectEnable) {
    redirectConfigured = isRedirectEnable;

    if (redirectConfigured) {
      console.log("[bga extension] Add filters to redirect to classic lobby");
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [4],
        addRules: [{
          id: 4,
          action: { type: "redirect", "redirect": { "regexSubstitution": "https://boardgamearena.com/table?table=\\2&nr=true" } },
          condition: {
            regexFilter: "^https://boardgamearena.com/gamepanel?game=([a-z]*)&table=([0-9]*)",
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

config.init().then(() => {
  // Set alarm to run update every minute
  chrome.alarms.onAlarm.addListener((evt) => {
    if (evt.name === "bgPeriodic") {
      bgPeriodic(config);
    }
  });
  chrome.alarms.create("bgPeriodic", { delayInMinutes: 0, periodInMinutes: 1 });

  // hack to be sure that the background script will not be terminated after 30 seconds inactivity on FF
  const now = new Date().getTime();
  chrome.alarms.create("keepAlive0", { delayInMinutes: 0, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive1", { when: now + 20000, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive2", { when: now + 40000, periodInMinutes: 1 });

  setDarkModeUrlFilters(config.isDarkMode());
  setLobbyUrlFilters(config.isLobbyRedirectionEnable());
});

addChangeListener((changes) => {
  if (changes.darkMode) {
    setDarkModeUrlFilters(changes.darkMode.newValue);
  }
  if (changes.lobbyRedirect) {
    setLobbyUrlFilters(changes.lobbyRedirect.newValue);
  }
});
