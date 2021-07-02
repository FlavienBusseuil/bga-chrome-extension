import { fetchActivityForPlayer } from "./utils/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetchCurrentPlayer";

async function updateBadge() {
  try {
    // Fetch current player info
    const { token: playerToken, id: playerId } = await fetchCurrentPlayer();

    if (!playerId) {
      // Set badge
      chrome.action.setBadgeBackgroundColor({ color: "#757575" });
      chrome.action.setBadgeText({ text: `-` });
      return;
    }

    // Fetch number of waiting tables
    const { nbWaitingTables } = await fetchActivityForPlayer({
      playerToken,
      playerId,
    });

    chrome.action.setBadgeBackgroundColor({ color: "#4871b6" });
    chrome.action.setBadgeText({ text: `${nbWaitingTables}` });
  } catch (error) {
    console.error(error);
    // Set badge
    chrome.action.setBadgeBackgroundColor({ color: "#dc2626" });
    chrome.action.setBadgeText({ text: `x` });
  }
}

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(updateBadge);
chrome.alarms.create("updateBadge", { delayInMinutes: 0, periodInMinutes: 1 });
