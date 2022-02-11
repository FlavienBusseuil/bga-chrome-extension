// @flow

import type { DateString } from "./bga/DateString";
import type { GameId } from "./bga/Game";
import type { NumberString } from "./bga/NumberString";
import type { TournamentId } from "./bga/Tournament";

export type TransformedTournament = {
	id: TournamentId,
	name: string,
	championshipName: string,
	date: Date,
	status: "progress" | "future" | "finished",
	gameId: GameId,
	gameName: string,
	registered: NumberString,
	maxPlayers: NumberString,
	gameMaxDuration: NumberString,
	gameImg: string,
	playersPerMatch: NumberString,
	playersPerMatchMin: NumberString,
	avatarImage: string,
	link: string,
};
