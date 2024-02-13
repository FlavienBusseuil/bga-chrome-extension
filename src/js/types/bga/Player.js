// @flow

export opaque type PlayerId = string;

export type PlayerTableStatus = "play" | "playasync" | "expected";

export function castToPlayerId(playerId: string): PlayerId {
	return playerId;
}

export function castToString(playerId: PlayerId): string {
	return playerId;
}
