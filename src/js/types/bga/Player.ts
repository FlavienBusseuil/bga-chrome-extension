export type PlayerId = string & { readonly __brand: unique symbol };;

export type PlayerTableStatus = "play" | "playasync" | "expected";

export function castToPlayerId(playerId: string): PlayerId {
	return playerId as PlayerId;
}

export function castToString(playerId: PlayerId): string {
	return playerId;
}
