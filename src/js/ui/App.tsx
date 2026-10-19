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

import { useState, useEffect, useErrorBoundary, useMemo } from "preact/hooks";
import { useSyncedState } from "./hooks/useSyncedState";
import { useLocale } from "./hooks/useLocale";
import { requestBadgeAndIconUpdate } from "../utils/updateBadgeAndIcon";
import { i18n } from "../utils/browser/i18n";
import { isMobile } from "../utils/browser";
import { cn } from "./utils/cn";
import { isFirefox } from "../utils/browser";
import { useFetch } from "./hooks/useFetch";
import { Tabs } from "./base/Tabs";
import { Tab } from "./base/Tab";
import { TransformedTable } from "../types/TransformedTable";
import { TransformedTournament } from "../types/TransformedTournament";

// @ts-ignore
async function handleAcceptOrDeclineInvite(tableId: TableId) {
	// TODO: https://github.com/FlavienBusseuil/bga-chrome-extension/projects/1
	// console.log(tableId);
}

type Props = {
	config: Configuration,
};

export const App = ({ config }: Props) => {
	const [fetch, { error: fetchError, result }] = useFetch();
	const [childError] = useErrorBoundary();
	const [activeTab, setActiveTab] = useState<string>("tables");
	const error = fetchError ?? childError;
	const motionSensitivityEnable = config.isMotionSensitivityEnable();
	const closePopupOnClick = config.shouldClosePopupOnClick(!isFirefox);
	const focusOnNewTab = isFirefox ? config.shouldFocusOnNewTab() : undefined;
	const [hasConfigChange, setConfigChange] = useSyncedState("configChange", false);
	const locale = useLocale(config.getLocale());
	// Sorted during the render: with an effect, the first render after loading would show empty lists
	const sortedTables = useMemo<TransformedTable[]>(
		() => result && !result.isLoggedOut ? sortTables(result.transformedTables) : [],
		[result],
	);
	const sortedTournaments = useMemo<TransformedTournament[]>(
		() => result && !result.isLoggedOut ? sortTournaments(result.transformedTournaments) : [],
		[result],
	);

	useEffect(fetch, []);

	useEffect(() => {
		if (result && !result.isLoggedOut) {
			const { nbWaitingTables, nbPendingInvites } = result;

			requestBadgeAndIconUpdate({
				nbWaitingTables,
				nbPendingInvites,
				tracking: config.isTrackingEnable(),
				soundNotification: config.isTrackingEnable() && config.isSoundNotificationEnable()
			});
		}
	}, [result]);

	const _configChange = () => {
		if (config.isTrackingEnable()) {
			fetch();
		} else {
			requestBadgeAndIconUpdate({ nbPendingInvites: 0, nbWaitingTables: 0, tracking: false, soundNotification: false });
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

	if (result?.isLoggedOut) {
		setBadge({ color: "#757575", text: `-` });
		return <LoginButton />;
	}

	const getContent = () => {
		if (activeTab === "options") {
			return <OptionsView config={config} onChange={() => setConfigChange(true)} />;
		}

		if (result === null) {
			return <Loading />;
		}

		if (isMobile) {
			if (activeTab === "tables") {
				return <TablesView
					className="view-slide"
					tables={sortedTables}
					onAcceptInvite={handleAcceptOrDeclineInvite}
					onDeclineInvite={handleAcceptOrDeclineInvite}
					motionSensitivityEnable={motionSensitivityEnable}
					closePopupOnClick={closePopupOnClick}
					focusOnNewTab={focusOnNewTab}
				/>;
			}
			if (activeTab === "tournaments") {
				return <TournamentsView config={config} className="view-slide" tournaments={sortedTournaments} closePopupOnClick={closePopupOnClick} focusOnNewTab={focusOnNewTab} />;
			}
			return <FriendsView className="view-slide" getGroupTables={result.getGroupTables} groups={result.groups} motionSensitivityEnable={motionSensitivityEnable} closePopupOnClick={closePopupOnClick} focusOnNewTab={focusOnNewTab} />;
		}

		return (
			<div
				className={cn([
					"views-slider",
					activeTab === "tables" ? "views-slider--tables" : activeTab === "tournaments" ? "views-slider--tournaments" : "views-slider--friends",
				])}
			>
				<TablesView
					className={cn([
						"view-slide",
						activeTab !== "tables" && "view-slide--hidden",
					])}
					tables={sortedTables}
					onAcceptInvite={handleAcceptOrDeclineInvite}
					onDeclineInvite={handleAcceptOrDeclineInvite}
					motionSensitivityEnable={motionSensitivityEnable}
					closePopupOnClick={closePopupOnClick}
					focusOnNewTab={focusOnNewTab}
				/>
				<TournamentsView
					config={config}
					className={cn([
						"view-slide",
						activeTab !== "tournaments" && "view-slide--hidden",
					])}
					tournaments={sortedTournaments}
					closePopupOnClick={closePopupOnClick}
					focusOnNewTab={focusOnNewTab}
				/>
				<FriendsView
					className={cn([
						"view-slide",
						activeTab !== "friends" && "view-slide--hidden",
					])}
					getGroupTables={result.getGroupTables}
					groups={result.groups}
					motionSensitivityEnable={motionSensitivityEnable}
					closePopupOnClick={closePopupOnClick}
					focusOnNewTab={focusOnNewTab}
				/>
			</div>
		);
	}

	return (
		<>
			<Tabs key={`tabs_${locale}`}>
				<Tab
					k="tables"
					fullWidth={true}
					isActive={activeTab === "tables"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="icon-prefix">🎲</span>
					{i18n("tables")} ({sortedTables.length})
				</Tab>
				<Tab
					k="tournaments"
					fullWidth={true}
					isActive={activeTab === "tournaments"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="icon-prefix">🏆</span>
					{i18n("tournaments")} (
					{sortedTournaments.length})
				</Tab>
				<Tab
					k="friends"
					fullWidth={true}
					isActive={activeTab === "friends"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="icon-prefix">🙋</span>
					{i18n("friends")}
				</Tab>
				<Tab
					k="options"
					fullWidth={isMobile}
					isActive={activeTab === "options"}
					onClick={(k) => setActiveTab(k)}
				>
					<span className="icon-prefix">⚙</span>
					{i18n("options")}
				</Tab>
			</Tabs>

			{getContent()}
		</>
	);
}
