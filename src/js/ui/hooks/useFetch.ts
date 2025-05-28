import type { TransformedTable } from "../../types/TransformedTable";
import type { TransformedTournament } from "../../types/TransformedTournament";
import type { Group } from "../../types/bga/Group";

import { fetch } from "../../utils/init/fetch";

import { transformTables } from "../../utils/init/transformTables";
import { transformTournaments } from "../../utils/init/transformTournaments";

import { useState } from "preact/hooks";

type Result =
	| {
		isLoggedOut: true,
	}
	| {
		isLoggedOut: false,
		nbPendingInvites: number,
		nbWaitingTables: number,
		transformedTables: Array<TransformedTable>,
		transformedTournaments: Array<TransformedTournament>,
		getGroupTables: (groupId: string) => Promise<Array<TransformedTable>>,
		groups: Group[]
	};
type Output = [() => void, { result: Result | null, error: Error | null }];

export function useFetch(): Output {
	const [result, setResult] = useState<null | Result>(null);
	const [error, setError] = useState<Error | null>(null);

	const handleFetch = () => {
		fetch()
			.catch(setError)
			.then((response) => {
				if (response) {
					if (response.isLoggedOut) {
						setResult({ isLoggedOut: response.isLoggedOut });
						return;
					}

					const {
						nbWaitingTables,
						nbPendingInvites,
						tournaments,
						getGroupTables,
						groups,
						...rest
					} = response;
					const transformedTables = transformTables(rest);
					const transformedTournaments = transformTournaments({
						tournaments,
					});

					setResult({
						isLoggedOut: false,
						nbPendingInvites,
						nbWaitingTables,
						transformedTables,
						transformedTournaments,
						getGroupTables: async (groupId: string) => {
							rest.tables = await getGroupTables(groupId);

							const openedTables = transformTables(rest);
							const availableTables = openedTables.filter(t => t.nbMaxPlayers > t.players.length);

							availableTables.sort((a, b) => a.gameName.localeCompare(b.gameName));
							return availableTables;
						},
						groups,
					});
				}
			});
	};

	return [handleFetch, { result, error }];
}
