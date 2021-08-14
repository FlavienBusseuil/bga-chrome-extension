import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchActivityForPlayer({ playerId, playerToken }) {
  return fetch(
    `${bgaUrl}/my?bgarbt&id=${playerId}&s=${playerToken}&${bgaExtensionUrlSignature}`
  )
    .then((response) => response.json())
    .then(({ t, ...rest }) => ({ nbWaitingTables: Number(t), ...rest }));
}
