// @flow
import type { FetchOptions } from "../../types/FetchOptions";

import { resolveQuery } from "./resolveQuery";

import { bgaUrl } from "../constants";

type Props = {
  playerToken: Token,
};

export async function fetchFriends({ requestToken }: FetchOptions): Promise<Array<String>> {
  const url = `${bgaUrl}/community/community/friends.html`;

  const result = await resolveQuery < QueryResult < any >> ({
    fromUrl: { url, requestToken },
  });

  return result.data.friends.map(f => f.id);
}
