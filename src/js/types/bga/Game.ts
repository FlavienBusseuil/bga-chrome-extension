export type GameId = string & { readonly __brand: unique symbol };;

export function castToGameId(gameId: string): GameId {
	return gameId as GameId;
}
