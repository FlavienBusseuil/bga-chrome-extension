import { bgPeriodic } from "./js/bgPeriodic";

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(bgPeriodic);
chrome.alarms.create("bgPeriodic", { delayInMinutes: 0, periodInMinutes: 1 });
