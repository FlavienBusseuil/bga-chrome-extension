// @flow

import type { TransformedTable } from "../../types/TransformedTable";
import type { FetchResult } from "../../utils/init/fetch";

import { fetch } from "../../utils/init/fetch";

import { transformTables } from "../../utils/init/transformTables";

import { useState, useEffect, useErrorBoundary } from "preact/hooks";

type Result =
	| {
			isLoggedOut: true,
	  }
	| {
			nbPendingInvites: number,
			nbWaitingTables: number,
			transformedTables: Array<TransformedTable>,
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
						...rest
					} = response;
					const transformedTables = transformTables(rest);
					setResult({
						nbPendingInvites,
						nbWaitingTables,
						transformedTables,
					});
				}
			});
	};

	return [handleFetch, { result, error }];
}
