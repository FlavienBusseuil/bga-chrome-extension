// @flow
import { isMobile } from "is-mobile";

import type { TableId } from "../types/bga/Table";
import { setBadge } from "../utils/badge/setBadge";
import { sortTables, sortTournaments } from "../utils/init/sort";
import Configuration from "../config/configuration";

import { Error } from "./Error";
import { Loading } from "./Loading";
import { LoginButton } from "./LoginButton";
import { TablesView } from "./views/TablesView";
import { TournamentsView } from "./views/TournamentsView";
import { FriendsView } from "./views/FriendsView";
import { OptionsView } from "./views/OptionsView";

import { useState, useEffect, useErrorBoundary } from "preact/hooks";
import { useSyncedState } from "./hooks/useSyncedState";
import { updateBadgeAndIcon } from "../utils/updateBadgeAndIcon";
import { i18n } from "../utils/browser/i18n";
import { useFetch } from "./hooks/useFetch";
import { Tabs } from "./base/Tabs";
import { Tab } from "./base/Tab";
import { cn } from "./utils/cn";

async function handleAcceptOrDeclineInvite(tableId: TableId) {
	// TODO: https://github.com/FlavienBusseuil/bga-chrome-extension/projects/1
	// console.log(tableId);
}

type Props = {
	config: Configuration,
};

export function App({ config }: Props): React$Node {
	const [fetch, { error: fetchError, result }] = useFetch();
	const [childError, resetChildError] = useErrorBoundary();
	const [activeTab, setActiveTab] = useState < string > ("tables");
	const error = fetchError ?? childError;
	const motionSensitivityEnable = config.isMotionSensitivityEnable();
	const [hasConfigChange, setConfigChange] = useSyncedState("configChange", false);
	const [locale] = useSyncedState('locale', config.getLocale());

	useEffect(fetch, []);

	const _configChange = () => {
		if (config.isTrackingEnable()) {
			fetch();
		} else {
			updateBadgeAndIcon({ nbPendingInvites: 0, nbWaitingTables: 0, tracking: false, soundNotification: false });
		}
	};

	useEffect(() => {
		if (hasConfigChange) {
			_configChange();
			setConfigChange(false);
		}
	}, [hasConfigChange]);

	if (error) {
		setBadge({ color: "#dc2626", text: `x` });
		return (
			<Error
				errorMessage={i18n("something_wrong")}
				errorDetails={error.message ?? error}
			/>
		);
	}

	let sortedTables, sortedTournaments, getGroupTables, groups;

	if (result) {
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

		updateBadgeAndIcon({
			nbWaitingTables,
			nbPendingInvites,
			tracking: config.isTrackingEnable(),
			soundNotification: config.isTrackingEnable() && config.isSoundNotificationEnable()
		});

		getGroupTables = result.getGroupTables;
		groups = result.groups;
		sortedTables = sortTables(transformedTables);
		sortedTournaments = sortTournaments(transformedTournaments);
	} else {
		sortedTables = [];
		sortedTournaments = [];
		groups = [];
	}

	const getContent = () => {
		if (activeTab === "options") {
			return <OptionsView config={config} onChange={() => setConfigChange(true)} />;
		}

		if (result === null) {
			return <Loading />;
		}

		if (isMobile()) {
			if (activeTab === "tables") {
				return <TablesView
					className="w-full"
					tables={sortedTables}
					onAcceptInvite={handleAcceptOrDeclineInvite}
					onDeclineInvite={handleAcceptOrDeclineInvite}
					motionSensitivityEnable={motionSensitivityEnable}
				/>;
			}
			if (activeTab === "tournaments") {
				return <TournamentsView className="w-full" tournaments={sortedTournaments} />;
			}
			return <FriendsView className="w-full" getGroupTables={getGroupTables} groups={groups} motionSensitivityEnable={motionSensitivityEnable} />;
		}

		return (
			<div
				className={cn([
					"relative flex w-[300%] transition-all gap-0.5",
					activeTab === "tables" ? "left-[100%]" : activeTab === "tournaments" ? "left-[0%]" : "-left-[100%]",
				])}
			>
				<TablesView
					className={cn([
						"w-full",
						"transition-all",
						activeTab !== "tables" && "opacity-0",
						activeTab !== "tables" && "invisible",
					])}
					tables={sortedTables}
					onAcceptInvite={handleAcceptOrDeclineInvite}
					onDeclineInvite={handleAcceptOrDeclineInvite}
					motionSensitivityEnable={motionSensitivityEnable}
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
				<FriendsView
					className={cn([
						"w-full",
						"transition-all",
						activeTab !== "friends" && "opacity-0",
						activeTab !== "friends" && "invisible",
					])}
					getGroupTables={getGroupTables}
					groups={groups}
					motionSensitivityEnable={motionSensitivityEnable}
				/>
			</div>
		);
	}

	return (
		<>
			<Tabs className="mb-1" key={`tabs_${locale}`}>
				<Tab
					k="tables"
					fullWidth={true}
					isActive={activeTab === "tables"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="mr-1">🎲</span>
					{i18n("tables")} ({sortedTables.length})
				</Tab>
				<Tab
					k="tournaments"
					fullWidth={true}
					isActive={activeTab === "tournaments"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="mr-1">🏆</span>
					{i18n("tournaments")} (
					{sortedTournaments.length})
				</Tab>
				<Tab
					k="friends"
					fullWidth={true}
					isActive={activeTab === "friends"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="mr-1">🙋</span>
					{i18n("friends")}
				</Tab>
				<Tab
					k="options"
					fullWidth={isMobile()}
					isActive={activeTab === "options"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="mr-1">⚙</span>
					{i18n("options")}
				</Tab>
			</Tabs>

			{getContent()}
		</>
	);
}
