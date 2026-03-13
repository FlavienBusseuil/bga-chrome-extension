import { bgaUrl } from "../constants";
import { fetchRequestToken } from "./fetchRequestToken";

export async function fetchGroupPlayers(groupId: number): Promise<string[]> {
  // force refresh of request token because we get no error with getMembersData.html if the token is invalid
  const requestToken = await fetchRequestToken(true);

  let result: string[] = [];
  let offset = 0;
  let finished = false;

  do {
    const { count, members } = await fetchGroupPlayersOffset(requestToken, groupId, offset);
    result = [...result, ...members];

    finished = result.length >= count;

    offset += 100;
  } while (!finished);

  return result;
}

async function fetchGroupPlayersOffset(requestToken: string, groupId: number, offset: number): Promise<{ count: number; members: string[] }> {
  const url = `${bgaUrl}/group/group/getMembersData.html`;
  const rawBody = `id=${groupId}&limit=100&offset=${offset}&search=&role_filter=members`;

  return fetch(url, {
    method: "POST",
    headers: {
      'x-request-token': requestToken,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: rawBody,
  })
    .then((response) => response.json())
    .then((json) => ({ count: json.data.membersCount, members: json.data.members.map((m: any) => m.id) }));
}
