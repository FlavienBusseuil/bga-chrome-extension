import { bgaUrl } from "../constants";
import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import { resolveQuery } from "./resolveQuery";
import type { PlayerId } from "../../types/bga/Player";
import type { Token } from "../../types/bga/Token";

interface CurrentPlayer {
    id: PlayerId;
    name: string;
    token: Token;
}

export async function fetchCurrentPlayer(): Promise<CurrentPlayer> {
    const { id, n: name, s: token } = await resolveQuery<MyWhoQueryResultData>(`${bgaUrl}/my?who`);
    return { id, name, token };
}
