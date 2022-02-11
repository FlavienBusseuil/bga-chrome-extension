// @flow

export opaque type TournamentId = string;

export function castToTournamentId(string: string): TournamentId {
	return string;
}

export function castToString(tournamentId: TournamentId): string {
	return tournamentId;
}
