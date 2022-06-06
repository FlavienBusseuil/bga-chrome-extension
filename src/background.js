const { bgPeriodic } = importScripts(location.origin + "/js/bgPeriodic.js");

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(bgPeriodic);
chrome.alarms.create("bgPeriodic", { delayInMinutes: 0, periodInMinutes: 1 });
