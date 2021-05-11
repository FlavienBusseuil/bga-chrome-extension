import { fetchActivityForPlayer } from "./utils/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetchCurrentPlayer";

chrome.action.setBadgeBackgroundColor({ color: "#4871b6" });

async function updateBadge() {
  // Fetch current player info
  const { token: playerToken, id: playerId } = await fetchCurrentPlayer();

  // Fetch number of waiting tables
  const { nbWaitingTables } = await fetchActivityForPlayer({
    playerToken,
    playerId,
  });

  chrome.action.setBadgeText({ text: `${nbWaitingTables}` });
}

// Set alarm to run update every minute
chrome.alarms.onAlarm.addListener(updateBadge);
chrome.alarms.create("updateBadge", { delayInMinutes: 0, periodInMinutes: 1 });
