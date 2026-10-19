import { bgPeriodic } from "./js/bgPeriodic";
import Configuration from "./js/config/configuration";
import { addChangeListener } from "./js/utils/browser";
import { updateBadgeAndIcon } from "./js/utils/updateBadgeAndIcon";

// Firefox WebExtensions API type support
declare global {
  const browser: any;
}

const config = new Configuration();
let initialization: Promise<void> | null = null;

// The side panel state is kept in session storage: globals are lost when the service worker is stopped
const setSidePanelOpen = (open: boolean) => chrome.storage.session.set({ sidePanelOpen: open });
const isSidePanelOpen = async () => !!(await chrome.storage.session.get("sidePanelOpen")).sidePanelOpen;

const setBackgroundFilters = () => {
  // The rules for blocking default backgrounds are no longer needed now that BGA has its own native dark mode
  console.log("[bga extension] Remove filters to prevent default website background");
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2, 3]
  });
};

const setLobbyUrlFilters = (isRedirectEnable: boolean) => {
  if (isRedirectEnable) {
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
};

const setNewsfeedFilters = (isRedirectEnable: boolean) => {
  if (isRedirectEnable) {
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
};

const setSidePanelMenu = () => {
  chrome.contextMenus.removeAll(() => {
    if (config.isSidePanelMenuVisible()) {
      chrome.contextMenus.create({
        id: "bgaext-sidepanel-menu",
        title: "BGA Extension Side Panel",
        contexts: ["all"],
        documentUrlPatterns: ["https://boardgamearena.com/*"]
      });
    }
  });
};

const init = () => {
  if (!initialization) {
    // Retry on next event if the initialisation failed
    initialization = doInit().catch((error) => {
      console.error("[bga extension] Background script initialisation failed", error);
      initialization = null;
    });
  }
  return initialization;
};

const doInit = async () => {
  console.log("[bga extension] Background script initialisation");

  await config.init();

  // set alarm to run update every minute
  chrome.alarms.create("bgPeriodic", { delayInMinutes: 1, periodInMinutes: 1 });
  bgPeriodic(config);

  // hack to be sure that the background script will not be terminated after 30 seconds inactivity on FF
  const now = new Date().getTime();
  chrome.alarms.create("keepAlive0", { delayInMinutes: 0, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive1", { when: now + 20000, periodInMinutes: 1 });
  chrome.alarms.create("keepAlive2", { when: now + 40000, periodInMinutes: 1 });

  setBackgroundFilters();
  setLobbyUrlFilters(config.isLobbyRedirectionEnable());
  setNewsfeedFilters(config.areSocialMessagesHidden());
  setSidePanelMenu();
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("[bga extension] Service worker installed");
  init();
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[bga extension] Service worker started");
  init();
});

const sendSidePanelStatusToAllTabs = async (status: string) => {
  const tabs = await chrome.tabs.query({});

  for (const tab of tabs) {
    try {
      if (tab.id) {
        await sendSidePanelStatus(tab.id, status);
      }
    } catch (e) {
      // no content script => ignore
    }
  }
};

const sendSidePanelStatus = async (tabId: number, status: string) => {
  await chrome.tabs.sendMessage(tabId, { to: 'MAIN_PAGE', payload: { key: status } });
  console.log(`[bga extension] Event ${status} sent to page ${tabId}`);
};

if (chrome.sidePanel) {
  chrome.sidePanel.onOpened.addListener(() => {
    setSidePanelOpen(true);
    sendSidePanelStatusToAllTabs('bga_ext_sidepanel_opened');
    console.log("[bga extension] Side panel opened");
  });

  chrome.sidePanel.onClosed.addListener(() => {
    setSidePanelOpen(false);
    sendSidePanelStatusToAllTabs('bga_ext_sidepanel_closed');
    console.log("[bga extension] Side panel closed");
  });
}

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender) => {
  if (message.type === 'openSidePanel' && sender.tab?.id) {
    chrome.sidePanel.open({ tabId: sender.tab.id });
    return;
  }

  if (message.type === 'checkSidePanel' && sender.tab?.id) {
    const tabId = sender.tab.id;
    isSidePanelOpen()
      .then((open) => sendSidePanelStatus(tabId, open ? 'bga_ext_sidepanel_opened' : 'bga_ext_sidepanel_closed'))
      .catch(() => { /* no content script => ignore */ });
    return;
  }

  // The popup and the side panel delegate the badge update, so it is never done twice at the same time (double sound)
  if (message.type === 'updateBadgeAndIcon') {
    updateBadgeAndIcon(message.data);
    return;
  }

  if (['MAIN_PAGE', 'MELODICE'].includes(message.to) && sender.tab?.id) {
    chrome.tabs.sendMessage(sender.tab.id, message);
  }
});

chrome.contextMenus.onClicked.addListener((info: any, tab: any) => {
  if (info.menuItemId === "bgaext-sidepanel-menu") {
    if (typeof browser !== "undefined" && browser.sidebarAction) {
      browser.sidebarAction.open();
    } else {
      chrome.sidePanel.open({ windowId: tab.windowId });
    }
  }
});

chrome.alarms.onAlarm.addListener((evt) => {
  init();

  console.debug(`[bga extension] Alarm ${evt.name}. Configuration initialized:${config.initialized}`);

  if (evt.name === "bgPeriodic" && config.initialized) {
    bgPeriodic(config);
  }
});

addChangeListener((changes) => {
  console.log("[bga extension] Changes detected", changes);

  init();

  if (changes.hideSocialMessages) {
    setNewsfeedFilters(changes.hideSocialMessages.newValue as boolean);
  }
  if (changes.lobbyRedirect) {
    setLobbyUrlFilters(changes.lobbyRedirect.newValue as boolean);
  }
  if (changes.sidePanelMenu) {
    setSidePanelMenu();
  }
});