import React from "preact";
import { useEffect, useState, useMemo } from "preact/hooks";

import Configuration, { Game } from "../../config/configuration";
import Switch from "../base/Switch";
import { updateBadgeAndIcon } from "../../utils/updateBadgeAndIcon";

import "../../../css/options.css";
import "../../../css/switch.css";
import { isSoundCustom, playMp3, removeCustomMp3, uploadCustomMp3 } from "../../utils/misc/mp3";

const Options = (props: { config: Configuration }) => {
	const { config } = props;
	const [list, setList] = useState(config.getGamesList());
	const [selected, setSelected] = useState(list[0]);
	const [changed, setChanged] = useState(false);
	const [text, setText] = useState("");
	const [css, setCss] = useState(config.getCustomCss());
	const [tabSelected, setTabSelected] = useState("misc");
	const [hiddenGames, setHiddenGames] = useState(config.getHiddenGames());
	const [hiddenPlayers, setHiddenPlayers] = useState<string[]>(config.getMutedPlayers());
	const [muteWarning, setMuteWarning] = useState(config.isMuteWarning());
	const [onlineMessages, setOnlineMessages] = useState(config.isOnlineMessagesEnabled());
	const [eloHidden, setEloHidden] = useState(config.isEloHidden());
	const [tracking, setTracking] = useState(config.isTrackingEnable());
	const [soundNotification, setSoundNotification] = useState(config.isSoundNotificationEnable());
	const [customSoundFile, setCustomSoundFile] = useState(isSoundCustom());
	const [redirect, setRedirect] = useState(config.isLobbyRedirectionEnable());
	const [autoOpen, setAutoOpen] = useState(config.isAutoOpenEnable());
	const [solidBackground, setSolidBackground] = useState(config.isSolidBackground());
	const [homeConfig, setHomeConfig] = useState(config.getHomeConfig());
	const [inProgressConfig, setInProgressConfig] = useState(config.getInProgressConfig());
	const [motionSensitivity, setMotionSensitivity] = useState(config.isMotionSensitivityEnable());
	const isFirefox = window.navigator.userAgent.toLowerCase().includes('firefox');

	const serialize = (game: Game) => {
		return JSON.stringify(
			game,
			[
				"name",
				"position",
				"top",
				"bottom",
				"left",
				"boardPanel",
				"boardPanelOffset",
				"boardPanelText",
				"myPanel",
				"playerPanel",
				"playerPanelOffset",
				"bottomPanel",
				"bottomPanelOffset",
				"iconBackground",
				"iconBackgroundDark",
				"iconBorder",
				"iconBorderDark",
				"iconColor",
				"iconColorDark",
				"iconShadow",
				"iconShadowDark",
				"css",
			],
			2,
		);
	};

	useEffect(() => setText(serialize(selected)), [selected]);
	useEffect(() => setChanged(serialize(selected) !== text), [selected, text]);
	useEffect(() => {
		const newSelected = list.find((g) => g.name === selected.name);
		if (newSelected) {
			setSelected({ ...newSelected });
		} else {
			setSelected(list[0]);
		}
	}, [list, selected.name]);

	const reset = () => {
		setList(config.resetGame(selected.name));
	};

	const save = () => {
		try {
			const game = JSON.parse(text);
			setList(config.saveGame(selected.name, game));
			setSelected(game);
		}
		catch (error) {
			window.location.reload();
		}
	};

	const duplicate = () => {
		const newGame = { ...selected, name: `${selected.name}_copy` };
		setList(config.saveGame(newGame.name, newGame));
		setSelected(newGame);
	};

	const isCustomized = config.isCustomized(selected.name);
	const isDefault = config.isDefault(selected.name);
	const couldReset = changed || (isCustomized && isDefault);
	const couldDelete = isCustomized && !isDefault;

	const updateOnlineMessages = (val: boolean) => {
		setOnlineMessages(val);
		config.setOnlineMessagesEnabled(val)
	};

	const updateEloHidden = (val: boolean) => {
		setEloHidden(!val);
		config.setEloHidden(!val)
	};

	const updateMuteWarning = (val: boolean) => {
		setMuteWarning(val);
		config.setMuteWarning(val)
	};

	const updateTracking = (val: boolean) => {
		setTracking(val);
		config.setTrackingEnable(val);

		updateBadgeAndIcon({ nbPendingInvites: 0, nbWaitingTables: 0, tracking: val, soundNotification: false });
	};

	const updateSoundNotification = (val: boolean) => {
		setSoundNotification(val);
		config.setSoundNotificationEnable(val)
	};

	const updateSoundCustom = (val: boolean) => {
		setCustomSoundFile(val);

		if (!val) {
			removeCustomMp3();
		}
	}

	const updateHomeConfig = (param: string, val: boolean) => {
		const newHomeConfig = { ...homeConfig, [param]: val };
		setHomeConfig(newHomeConfig);
		config.setHomeConfig(newHomeConfig);
	};

	const updateInProgressConfig = (param: string, val: boolean) => {
		const newInProgressConfig = { ...inProgressConfig, [param]: val };
		setInProgressConfig(newInProgressConfig);
		config.setInProgressConfig(newInProgressConfig);
	};

	const updateFlashing = (val: boolean) => {
		setMotionSensitivity(!val);
		config.setMotionSensitivityEnable(!val);
	};

	const updateRedirect = (val: boolean) => {
		setRedirect(val);
		config.setLobbyRedirectionEnable(val);
	};

	const updateAutoOpen = (val: boolean) => {
		setAutoOpen(val);
		config.setAutoOpenEnable(val);
	};

	const updateSolidBackground = (val: boolean) => {
		setSolidBackground(val);
		config.setSolidBackground(val);
	};

	const getHomeSwitch = (param: string, message: string) => {
		return (
			<Switch
				checked={homeConfig[param]}
				textOn={chrome.i18n.getMessage(`${message}On`)}
				textOff={chrome.i18n.getMessage(`${message}Off`)}
				onChange={(val) => updateHomeConfig(param, val)}
			/>
		);
	};

	const getInProgressSwitch = (param: string, message: string) => {
		return (
			<Switch
				checked={inProgressConfig[param]}
				textOn={chrome.i18n.getMessage(`${message}On`)}
				textOff={chrome.i18n.getMessage(`${message}Off`)}
				onChange={(val) => updateInProgressConfig(param, val)}
			/>
		);
	};

	const getMiscConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionMiscTitle")}
				</div>
				<div className="bgext_misc_container">
					<Switch
						checked={tracking}
						textOn={chrome.i18n.getMessage("optionsTrackingOn")}
						textOff={chrome.i18n.getMessage("optionsTrackingOff")}
						onChange={updateTracking}
					/>
					{!isFirefox && <Switch
						checked={soundNotification && tracking}
						textOn={chrome.i18n.getMessage("optionsNotificationSoundOn")}
						textOff={chrome.i18n.getMessage("optionsNotificationSoundOff")}
						onChange={updateSoundNotification}
						disabled={!tracking}
					/>}
					{!isFirefox && <div className="row_fullwidth">
						<Switch
							checked={soundNotification && tracking && customSoundFile}
							textOn={chrome.i18n.getMessage("optionsNotificationCustomSoundOn")}
							textOff={chrome.i18n.getMessage("optionsNotificationCustomSoundOff")}
							onChange={updateSoundCustom}
							disabled={!tracking || !soundNotification}
						/>
						{tracking && soundNotification && <div>
							{customSoundFile && <button onClick={uploadCustomMp3}>{chrome.i18n.getMessage("uploadMp3")}</button>}
							<button onClick={playMp3}>{chrome.i18n.getMessage("play")}</button>
						</div>}
					</div>}
					<Switch
						checked={!motionSensitivity}
						textOn={chrome.i18n.getMessage("optionsFlashingOn")}
						textOff={chrome.i18n.getMessage("optionsFlashingOff")}
						onChange={updateFlashing}
					/>
					<Switch
						checked={redirect}
						textOn={chrome.i18n.getMessage("optionsLobbyRedirectOn")}
						textOff={chrome.i18n.getMessage("optionsLobbyRedirectOff")}
						onChange={updateRedirect}
					/>
					<Switch
						checked={autoOpen}
						textOn={chrome.i18n.getMessage("optionsAutoOpenOn")}
						textOff={chrome.i18n.getMessage("optionsAutoOpenOff")}
						onChange={updateAutoOpen}
					/>
					<Switch
						checked={solidBackground}
						textOn={chrome.i18n.getMessage("optionsSolidBackgroundOn")}
						textOff={chrome.i18n.getMessage("optionsSolidBackgroundOff")}
						onChange={updateSolidBackground}
					/>
				</div>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionGamesTitle")}
				</div>
				<div className="bgext_misc_container">
					<Switch
						checked={onlineMessages}
						textOn={chrome.i18n.getMessage("optionFriendsActivityOn")}
						textOff={chrome.i18n.getMessage("optionFriendsActivityOff")}
						onChange={updateOnlineMessages}
					/>
					<Switch
						checked={!eloHidden}
						textOn={chrome.i18n.getMessage("optionEloHiddenOff")}
						textOff={chrome.i18n.getMessage("optionEloHiddenOn")}
						onChange={updateEloHidden}
					/>
				</div>
			</>
		);
	}

	const getDisplayConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionsHome")}
				</div>
				<div className="bgext_home_container">
					<div>
						{getHomeSwitch('header', 'optionsHomeHeader')}
						{getHomeSwitch('latestNews', 'optionsHomeLatest')}
						{getHomeSwitch('smallFeed', 'optionsHomeNewsSmall')}
						<Switch
							checked={homeConfig.fewFeeds && homeConfig.tournaments && homeConfig.tournamentsBelow}
							textOn={chrome.i18n.getMessage("optionsHomeNewsShort")}
							textOff={chrome.i18n.getMessage("optionsHomeNewsTall")}
							onChange={(val) => updateHomeConfig('fewFeeds', val)}
							disabled={!homeConfig.tournaments || !homeConfig.tournamentsBelow}
						/>
						{getHomeSwitch('tournaments', 'tournaments')}

						<Switch
							checked={homeConfig.events || homeConfig.recentGames}
							textOn={chrome.i18n.getMessage("optionsHomeEventsOn")}
							textOff={chrome.i18n.getMessage("optionsHomeEventsOff")}
							onChange={(val) => updateHomeConfig('events', val)}
							disabled={homeConfig.recentGames}
						/>

					</div>
					<div>
						{getHomeSwitch('recentGames', 'optionsRecentColumn')}
						{getHomeSwitch('popularGames', 'optionsPopularColumn')}
						{getHomeSwitch('recommandedGames', 'optionsRecommendedColumn')}
						{getHomeSwitch('classicGames', 'optionsClassicGames')}
						{getHomeSwitch('status', 'optionsStatus')}
						{homeConfig.tournaments && getHomeSwitch('tournamentsBelow', 'tournamentsBelow')}
					</div>
				</div>

				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionsInProgress")}
				</div>
				<div className="bgext_home_container">
					<div>
						{getInProgressSwitch('emptySections', 'optionsInProgressEmpty')}
						{getInProgressSwitch('discover', 'optionsInProgressDiscover')}
					</div>
					<div>
						{getInProgressSwitch('playAgain', 'optionsInProgressReplay')}
						{getInProgressSwitch('more', 'optionsInProgressMore')}
					</div>
				</div>
			</>
		);
	};

	const getHiddenConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionHiddenTitle")}
				</div>
				<div className="bgext_hidden_games_container">
					{!hiddenGames.length && (
						<span>
							{chrome.i18n.getMessage("optionNoHiddenGames")}
						</span>
					)}
					{hiddenGames.length > 0 && hiddenGames.map((game, index) => (
						<div
							className="bgext_hidden_game"
							key={`game_${index}`}
						>
							{game}
							<div className="bgext_hidden_game_close" onClick={() => setHiddenGames(config.displayGame(game))} >🗙</div>
						</div>
					))}
				</div>
				{hiddenGames.length > 0 && <div className="bgext_options_warning">
					{chrome.i18n.getMessage("optionHiddenGamesWarning")}
				</div>}
			</>
		);
	};

	const getMutedConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionMutedTab")}
				</div>
				<div className="bgext_hidden_games_container">
					{!hiddenPlayers.length && (
						<span>
							{chrome.i18n.getMessage("optionNoMutedPlayer")}
						</span>
					)}
					{hiddenPlayers.length > 0 && hiddenPlayers.map((name, index) => (
						<div
							className="bgext_hidden_game"
							key={`hidden_player_${index}`}
						>
							{name}
							<div className="bgext_hidden_game_close" onClick={() => setHiddenPlayers(config.unmutePlayer(name))} >🗙</div>
						</div>
					))}
				</div>
				{hiddenPlayers.length > 0 && <div className="bgext_options_warning">
					{chrome.i18n.getMessage("optionMutedWarning")}
				</div>}
				<div className="bgext_hidden_games_container">
					<Switch
						checked={muteWarning}
						textOn={chrome.i18n.getMessage("muteWarningOn")}
						textOff={chrome.i18n.getMessage("muteWarningOff")}
						onChange={updateMuteWarning}
					/>
				</div>
			</>
		);
	};

	const getNavigationConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionNavigationTitle")}
				</div>
				<div className="bgext_options_container">
					<div className="bgext_options_gamelist_container">
						<div className="bgext_options_gamelist">
							{list.map((g, i) => {
								const className =
									selected.name === g.name
										? "bgext_options_gameitem_selected"
										: "bgext_options_gameitem";
								return (
									<div
										className={className}
										key={`game_${i}`}
										onClick={() => setSelected(g)}
									>
										{g.name}
									</div>
								);
							})}
						</div>
					</div>
					<div className="bgext_options_col_container">
						<div className="bgext_options_gameconfig_container">
							<textarea
								id="game_config"
								className="bgext_options_input"
								value={text}
								onChange={(evt) => setText((evt.target as any).value)}
								onKeyUp={() => setText((document.getElementById("game_config") as any).value)}
							/>
						</div>
						<div className="bgext_options_row_container">
							<button
								style={{ width: "100px" }}
								onClick={duplicate}
							>
								{chrome.i18n.getMessage("optionDuplicate")}
							</button>
							<button
								disabled={!couldReset}
								style={{ width: "100px" }}
								onClick={reset}
							>
								{chrome.i18n.getMessage("optionReset")}
							</button>
							<button
								disabled={!couldDelete}
								style={{ width: "100px" }}
								onClick={reset}
							>
								{chrome.i18n.getMessage("optionDelete")}
							</button>
							<button
								disabled={!changed}
								style={{ width: "100px" }}
								onClick={save}
							>
								{chrome.i18n.getMessage("optionSave")}
							</button>
						</div>
					</div>
				</div>
				<div className="bgext_options_warning">
					{chrome.i18n.getMessage("optionNavigationWarning")}
				</div>
			</>
		);
	};

	const getCssConfiguration = () => {
		return (
			<>
				<div className="bgext_options_title">
					{chrome.i18n.getMessage("optionCssTitle")}
				</div>
				<div className="bgext_css_container">
					<textarea
						id="css_config"
						className="bgext_options_input"
						value={css}
						onChange={(evt) => setCss((evt.target as any).value)}
						onKeyUp={() => setCss((document.getElementById("css_config") as any).value)}
					/>
				</div>
				<div className="bgext_css_buttons">
					<button
						style={{ width: "100px" }}
						onClick={() => config.setCustomCss(css).catch(_ => window.location.reload())}
					>
						{chrome.i18n.getMessage("optionSave")}
					</button>
				</div>
			</>
		);
	};

	const getTab = (tabId: string, tabText: string) => {
		return (
			<div
				id={`bgext_options_tab_${tabId}`}
				className={
					tabSelected === tabId
						? "bgext_link_selected"
						: "bgext_link"
				}
				href="#"
				selected={tabSelected === tabId}
				onClick={() => setTabSelected(tabId)}
			>
				{tabText}
			</div>
		);
	};

	try {
		return (
			<div className="bgext_options_main">
				<div className="bgext_options_config_area">
					<div className="bgext_links_area">
						{getTab("misc", chrome.i18n.getMessage("optionMisc"))}
						{getTab("display", chrome.i18n.getMessage("optionDisplay"))}
						{getTab("hidden", chrome.i18n.getMessage("optionHiddenTab"))}
						{getTab("muted", chrome.i18n.getMessage("optionMutedTab"))}
						{getTab("navigation", chrome.i18n.getMessage("optionNavigationTab"))}
						{getTab("css", chrome.i18n.getMessage("optionCssTab"))}
					</div>
					{tabSelected === "misc" && getMiscConfiguration()}
					{tabSelected === "display" && getDisplayConfiguration()}
					{tabSelected === "hidden" && getHiddenConfiguration()}
					{tabSelected === "muted" && getMutedConfiguration()}
					{tabSelected === "navigation" && getNavigationConfiguration()}
					{tabSelected === "css" && getCssConfiguration()}
				</div>
			</div>
		);
	}
	catch (error) {
		window.location.reload();
		return <></>;
	}
};

export default Options;
