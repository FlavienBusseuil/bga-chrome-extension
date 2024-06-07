// @flow

import type { TransformedTable } from "../../types/TransformedTable";
import type { TransformedTournament } from "../../types/TransformedTournament";
import type { FetchResult } from "../../utils/init/fetch";

import { fetch } from "../../utils/init/fetch";

import { transformTables } from "../../utils/init/transformTables";
import { transformTournaments } from "../../utils/init/transformTournaments";

import { useState, useEffect, useErrorBoundary } from "preact/hooks";

type Result =
	| {
		isLoggedOut: true,
	}
	| {
		nbPendingInvites: number,
		nbWaitingTables: number,
		transformedTables: Array<TransformedTable>,
		transformedTournaments: Array<TransformedTournament>,
		getGroupTables: (groupId: string) => Promise<Array<TransformedTable>>,
		groups: string[]
	};
type Output = [() => void, { result: null | Result, error: ?Error }];

export function useFetch(): Output {
	const [result, setResult] = useState < null | Result > (null);
	const [error, setError] = useState <? Error > (null);

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
