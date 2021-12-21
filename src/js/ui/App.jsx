// @flow

import type { TableId } from "../types/bga/Table";

import { setBadge } from "../utils/badge/setBadge";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { LoginButton } from "./LoginButton";
import { TablesView } from "./views/TablesView";
import { transformTables } from "../utils/init/transformTables";
import { sort } from "../utils/init/sort";

import { useState, useEffect, useErrorBoundary } from "preact/hooks";
import { updateBadgeAndIcon } from "../utils/updateBadgeAndIcon";
import { useFetch } from "./hooks/useFetch";

async function handleAcceptOrDeclineInvite(tableId: TableId) {
	// TODO: https://github.com/FlavienBusseuil/bga-chrome-extension/projects/1
	// console.log(tableId);
}

export function App(): React$Node {
	const [fetch, { error: fetchError, result }] = useFetch();
	const [childError, resetChildError] = useErrorBoundary();
	const error = fetchError ?? childError;

	useEffect(() => {
		fetch();
	}, []);

	if (error) {
		setBadge({ color: "#dc2626", text: `x` });
		return (
			<Error
				errorMessage={chrome.i18n.getMessage("something_wrong")}
				errorDetails={error.message ?? error}
			/>
		);
	}

	if (result === null) {
		return <Loading />;
	}

	if (result.isLoggedOut) {
		setBadge({ color: "#757575", text: `-` });
		return <LoginButton />;
	}

	const { nbWaitingTables, nbPendingInvites, transformedTables } = result;
	const sortedTables = sort(transformedTables);
	updateBadgeAndIcon({ nbWaitingTables, nbPendingInvites });

	return (
		<TablesView
			{...{
				tables: sortedTables,
				onAcceptInvite: handleAcceptOrDeclineInvite,
				onDeclineInvite: handleAcceptOrDeclineInvite,
			}}
		/>
	);
}
