import { bgPeriodic } from "./js/bgPeriodic";
import Configuration from "./js/config/configuration";
import { addChangeListener, getUrl } from "./js/utils/chrome";

const config = new Configuration();
let darkModeConfigured = undefined;

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(bgPeriodic);
chrome.alarms.create("bgPeriodic", { delayInMinutes: 0, periodInMinutes: 1 });

const setUrlFilters = (isDarkMode) => {
  if (darkModeConfigured !== isDarkMode) {
    darkModeConfigured = isDarkMode;

    if (darkModeConfigured) {
      console.log("[bga extension] Add filters to prevent default backgrounds");

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3],
        addRules: [{
          id: 1,
          action: { type: "block" },
          condition: { urlFilter: "https://x.boardgamearena.net/data/themereleases/*/img/layout/back-main.jpg" },
        },
        {
          id: 2,
          action: { type: "redirect", "redirect": { "extensionPath": "/img/dark_theme/background/bgadark.jpg" } },
          condition: { urlFilter: "https://forum.boardgamearena.com/styles/prosilver/theme/images/bga/back-main.jpg" },
        },
        {
          id: 3,
          action: { type: "redirect", "redirect": { "regexSubstitution": `chrome-extension://${chrome.runtime.id}/img/dark_theme/forum/smilies/\\1.gif` } },
          condition: { regexFilter: "^https://forum.boardgamearena.com/images/smilies/(.*).gif" },
        }]
      });
    } else {
      console.log("[bga extension] Remove filters");

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2, 3]
      });
    }
  }
};

config.init().then(() => {
  setUrlFilters(config.isDarkMode());
});
addChangeListener((changes) => {
  if (changes.darkMode) {
    setUrlFilters(changes.darkMode.newValue);
  }
});
