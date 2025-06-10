import { bgaUrl } from "../constants";
import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import { resolveQuery } from "./resolveQuery";
import type { PlayerId } from "../../types/bga/Player";
import type { Token } from "../../types/bga/Token";
import type { FetchOptions } from "../../types/FetchOptions";
import type { RequestToken } from "../../types/RequestToken";

interface Input extends FetchOptions {
    onRefreshRequestToken?: (requestToken: RequestToken) => void;
}

interface CurrentPlayer {
    id: PlayerId;
    name: string;
    token: Token;
}

export async function fetchCurrentPlayer({
    requestToken,
    onRefreshRequestToken,
}: Input): Promise<CurrentPlayer> {
    const {
        id,
        n: name,
        s: token,
    } = await resolveQuery<MyWhoQueryResultData>({
        fromMock: { path: "myWho" },
        fromUrl: {
            url: `${bgaUrl}/my?who`,
            requestToken,
        },
        onRefreshRequestToken,
    });

    return {
        id,
        name,
        token,
    };
}
