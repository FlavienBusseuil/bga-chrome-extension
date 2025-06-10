export type TournamentId = string & { readonly __brand: unique symbol };;

export function castToTournamentId(string: string): TournamentId {
	return string as TournamentId;
}

export function castToString(tournamentId: TournamentId): string {
	return tournamentId;
}
