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
	  };
type Output = [() => void, { result: null | Result, error: ?Error }];

export function useFetch(): Output {
	const [result, setResult] = useState<null | Result>(null);
	const [error, setError] = useState<?Error>(null);

	const handleFetch = () => {
		fetch()
			.catch(setError)
			.then(response => {
				if (response) {
					if (response.isLoggedOut) {
						setResult({ isLoggedOut: response.isLoggedOut });
						return;
					}

					const {
						nbWaitingTables,
						nbPendingInvites,
						tournaments,
						...rest
					} = response;
					const transformedTables = transformTables(rest);
					const transformedTournaments = transformTournaments({
						assetsUrl: rest.assetsUrl,
						tournaments,
					});
					setResult({
						nbPendingInvites,
						nbWaitingTables,
						transformedTables,
						transformedTournaments,
					});
				}
			});
	};

	return [handleFetch, { result, error }];
}
