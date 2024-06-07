// @flow
import { bgaUrl } from "../constants";

export async function fetchGroupPlayers(groupId: number): Promise<string[]> {
  return fetch(`${bgaUrl}/group?id=${groupId}&section=members`)
    .then((response) => response.text())
    .then((text) => {
      return [...text.matchAll(/"\/player\?id=(\d*)"/g) ?? []].map(elt => elt[1]);
    });
}
