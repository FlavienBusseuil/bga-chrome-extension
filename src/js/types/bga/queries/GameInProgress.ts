import type { LanguageKey } from "../Language";
import type { PlayerId } from "../Player";

export interface AsyncStatus {
    actives?: PlayerId[];
}

export interface GlobalUserInfos {
    async_status: Record<string, AsyncStatus>;
    friends: Record<string, number>;
    group_types: Record<string, string>;
    group_names: Record<string, string>;
    lang: LanguageKey;
    user_id: string;
    user_name: string;
    avatar: string;
    banner: string;
    premium: number;
    beginner: number;
    connected_friends: PlayerId[];
}

export type GameInProgressQueryResultData = {
    tables: string[];
    globalUserInfos: GlobalUserInfos;
};
