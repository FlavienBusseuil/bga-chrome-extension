// @flow

import type { TableId } from "../types/bga/Table";

import { setBadge } from "../utils/badge/setBadge";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { LoginButton } from "./LoginButton";
import { TablesView } from "./views/TablesView";
import { transformTables } from "../utils/init/transformTables";
import { sortTables, sortTournaments } from "../utils/init/sort";

import { useState, useEffect, useErrorBoundary } from "preact/hooks";
import { updateBadgeAndIcon } from "../utils/updateBadgeAndIcon";
import { useFetch } from "./hooks/useFetch";
import { Tabs } from "./base/Tabs";
import { Tab } from "./base/Tab";
import { cn } from "./utils/cn";
import { TournamentsView } from "./views/TournamentsView";

async function handleAcceptOrDeclineInvite(tableId: TableId) {
	// TODO: https://github.com/FlavienBusseuil/bga-chrome-extension/projects/1
	// console.log(tableId);
}

export function App(): React$Node {
	const [fetch, { error: fetchError, result }] = useFetch();
	const [childError, resetChildError] = useErrorBoundary();
	const [activeTab, setActiveTab] = useState<string>("tables");
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

	const {
		nbWaitingTables,
		nbPendingInvites,
		transformedTables,
		transformedTournaments,
	} = result;
	const sortedTables = sortTables(transformedTables);
	updateBadgeAndIcon({ nbWaitingTables, nbPendingInvites });

	const sortedTournaments = sortTournaments(transformedTournaments);

	return (
		<>
			<Tabs className="mb-1">
				<Tab
					k="tables"
					isActive={activeTab === "tables"}
					onClick={k => setActiveTab(k)}
				>
					<span className="mr-2">🎲</span>
					{chrome.i18n.getMessage("tables")} ({sortedTables.length})
				</Tab>
				<Tab
					k="tournaments"
					isActive={activeTab === "tournaments"}
					onClick={k => setActiveTab(k)}
				>
					<span className="mr-2">🏆</span>
					{chrome.i18n.getMessage("tournaments")} (
					{sortedTournaments.length})
				</Tab>
			</Tabs>

			<div
				className={cn([
					"relative flex w-[200%] transition-all gap-0.5",
					activeTab === "tables" ? "left-[50%]" : "-left-[50%]",
				])}
			>
				<TablesView
					className={cn([
						"w-full",
						"transition-all",
						activeTab !== "tables" && "opacity-0",
						activeTab !== "tables" && "invisible",
					])}
					{...{
						tables: sortedTables,
						onAcceptInvite: handleAcceptOrDeclineInvite,
						onDeclineInvite: handleAcceptOrDeclineInvite,
					}}
				/>
				<TournamentsView
					className={cn([
						"w-full",
						"transition-all",
						activeTab !== "tournaments" && "opacity-0",
						activeTab !== "tournaments" && "invisible",
					])}
					tournaments={sortedTournaments}
				/>
			</div>
		</>
	);
}
