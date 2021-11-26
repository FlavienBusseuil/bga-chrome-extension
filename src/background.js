import { updateBadge } from "./js/updateBadge";

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(updateBadge);
chrome.alarms.create("updateBadge", { delayInMinutes: 0, periodInMinutes: 1 });
