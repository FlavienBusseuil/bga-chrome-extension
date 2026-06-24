import type { LanguageKey } from "../Language";

export interface TablePlayerInfos {
    myturn: string | null;
}

export interface TableInfos {
    players: Record<string, TablePlayerInfos>;
}

export interface GlobalUserInfos {
    table_infos: {
        tables: Record<string, TableInfos>
    };
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
}

export type GameInProgressQueryResultData = {
    tables: string[];
    globalUserInfos: GlobalUserInfos;
};
