import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchTableInfo({ tableId }) {
  return fetch(
    `${bgaUrl}/table/table/tableinfos.html?id=${tableId}&${bgaExtensionUrlSignature}`
  )
    .then((response) => response.json())
    .then((json) => json.data);
}
