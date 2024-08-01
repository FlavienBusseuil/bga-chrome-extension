import equal from "fast-deep-equal";
import defaultGames from "./sideMenuGames";
import { addChangeListener, localStorageGet, localStorageSet, storageGet, storageSet } from "../utils/chrome";

export interface Game {
	name: string;
	position: "top" | "bottom" | "auto";
	top?: string;
	bottom?: string;
	left: string;
	boardPanel?: string;
	boardPanelOffset?: number;
	boardPanelText?: string;
	myPanel?: string;
	playerPanel: string;
	playerPanelOffset: number;
	bottomPanel?: string;
	bottomPanelOffset?: number;
	iconBackground: string;
	iconBackgroundDark: string;
	iconBorder: string;
	iconColor: string;
	iconShadow: string;
	customZoomContainer?: string;
	css?: string;
}

export interface DarkModeConfig {
	name: string;
	color: number;
	sat: number;
}

export interface Template {
	name: string;
	text: string;
	game: string;
}

interface CustomConfig {
	clientId: string;
	games: Game[];
	dark: DarkModeConfig[];
	disabled: string[];
	hidden: string[];
	floating: string[];
	onlineMessages?: boolean;
	floatingRightMenu?: boolean;
	devTemplates?: Template[];
	hideGeneralChat?: boolean;
	darkMode?: boolean;
	darkModeColor?: number;
	darkModeSat?: number;
	trackTables?: boolean;
	motionSensitivity?: boolean;
	home?: HomeConfig;
	inProgress?: InProgressConfig;
	lobbyRedirect?: boolean;
};

export interface HomeConfig {
	header: boolean;
	latestNews: boolean;
	smallFeed: boolean;
	fewFeeds: boolean;
	status: boolean;
	tournaments: boolean;
	tournamentsBelow: boolean;
	recentGames: boolean;
	popularGames: boolean;
	recommandedGames: boolean;
};

export interface InProgressConfig {
	emptySections: boolean;
	playAgain: boolean;
	discover: boolean;
	more: boolean;
};

interface LocalConfig {
	css: string;
};

class Configuration {
	_defConfig: { games: Game[] };
	_customConfig: CustomConfig;
	_localConfig: LocalConfig;
	_config: { games: Game[] };

	constructor() {
		this._defConfig = {
			games: defaultGames.map((game) => {
				return {
					iconBackground: "#ebd5bd",
					iconBackgroundDark: "#b9b9b9",
					iconBorder: "transparent",
					iconColor: "#222222",
					iconShadow: "#000000",
					position: "top",
					top: "75px",
					bottom: "auto",
					boardPanelOffset: 5,
					playerPanelOffset: 5,
					bottomPanelOffset: 5,
					left: "0.5em",
					css: "#game_play_area { padding-left: 50px; }",
					...game,
				};
			}) as Game[],
		};
		this._customConfig = {
			clientId: "",
			games: [],
			dark: [],
			disabled: [],
			floating: [],
			hidden: [],
		};
		this._config = { games: [] };
	}

	async init() {
		const [syncStorage, localStorage] = await Promise.all([storageGet(), localStorageGet()]);

		this._customConfig = syncStorage;
		this._localConfig = localStorage;

		console.log("[bga extension] config", syncStorage);

		if (!this._customConfig.clientId) {
			this._customConfig.clientId = self.crypto.randomUUID();
			storageSet({ clientId: this._customConfig.clientId });
		}
		if (!this._customConfig.games) {
			this._customConfig.games = [];
		}
		if (!this._customConfig.dark) {
			this._customConfig.dark = [];
		}
		if (!this._customConfig.disabled) {
			this._customConfig.disabled = [];
		}
		if (!this._customConfig.hidden) {
			this._customConfig.hidden = [];
		}
		if (!this._customConfig.floating) {
			this._customConfig.floating = [];
		}
		this._merge();

		addChangeListener((changes: any) => {
			try {
				for (let [key, { newValue }] of Object.entries(changes) as any) {
					this._customConfig[key] = newValue;
					document.dispatchEvent(new CustomEvent('bga_ext_update_config', { detail: { key } }));
				}
			} catch (error) { } // not a big deal
		});
	}

	private _sendAnalytics(context: string) {
		const endpoint = "https://www.google-analytics.com/mp/collect";
		const measurementId = "G-ZDKRET609Q";
		const apiSecret = "4TThk978Rse1u4xipIDEnw";

		const contextConfig = this._customConfig.dark.find(d => d.name === context);
		fetch(`${endpoint}?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
			method: 'POST',
			body: JSON.stringify({
				client_id: this._customConfig.clientId,
				events: [
					{
						name: `${context}_${this._customConfig.darkMode ? "dark" : "light"}`,
						params: {
							dark_mode_color: this._customConfig.darkMode ? contextConfig?.color || this._customConfig.darkModeColor : -1,
							dark_mode_sat: this._customConfig.darkMode ? contextConfig?.sat || this._customConfig.darkModeSat : -1,
						},
					},
				],
			}),
		});
	}

	private _merge() {
		const customNames = this._customConfig.games.map((g) => g.name);
		const defGames = this._defConfig.games.filter(
			(g) => !customNames.includes(g.name),
		);

		this._config.games = [...defGames, ...this._customConfig.games];
	}

	isEmpty() {
		return (
			this._customConfig.floatingRightMenu === undefined &&
			this._customConfig.devTemplates === undefined &&
			this._customConfig.onlineMessages === undefined &&
			!this._customConfig.disabled.length &&
			!this._customConfig.games.length &&
			!this._customConfig.floating.length
		);
	}

	import(customConfig: CustomConfig) {
		this._customConfig = customConfig;
		storageSet(customConfig);
	}

	getGameConfig(game: string): Game | undefined {
		this._sendAnalytics(game);
		return this._config.games.find((c: any) => c.name === game);
	}

	getGamesList(): Game[] {
		return this._config.games.sort((a, b) => a.name.localeCompare(b.name));
	}

	saveGame(name: string, game: Game) {
		const defGame = this._defConfig.games.find((g) => g.name === name);

		if (defGame && equal(game, defGame)) {
			return this.resetGame(name);
		}

		this._customConfig.games = [
			...this._customConfig.games.filter((g) => g.name !== name),
			game,
		];
		storageSet({ games: this._customConfig.games });
		this._merge();
		return this.getGamesList();
	}

	resetGame(name: string) {
		this._customConfig.games = this._customConfig.games.filter(
			(g) => g.name !== name,
		);
		storageSet({ games: this._customConfig.games });
		this._merge();
		return this.getGamesList();
	}

	isDefault(name: string) {
		const defGame = this._defConfig.games.find((g) => g.name === name);
		return !!defGame;
	}

	isCustomized(name: string) {
		const custGame = this._customConfig.games.find((g) => g.name === name);
		return !!custGame;
	}

	isTrackingEnable() {
		return this._customConfig.trackTables === undefined || this._customConfig.trackTables;
	}

	setTrackingEnable(val: boolean) {
		this._customConfig.trackTables = val;
		storageSet({ trackTables: val });
	}

	getHomeConfig() {
		return {
			header: true,
			latestNews: true,
			smallFeed: true,
			fewFeeds: true,
			status: true,
			tournaments: true,
			tournamentsBelow: true,
			recentGames: true,
			popularGames: true,
			recommandedGames: true,
			events: true,
			...(this._customConfig.home || {})
		};
	}

	setHomeConfig(val: HomeConfig) {
		this._customConfig.home = val;
		storageSet({ home: val });
	}

	getInProgressConfig() {
		return {
			emptySections: true,
			playAgain: true,
			discover: true,
			more: true,
			...(this._customConfig.inProgress || {})
		}
	}

	setInProgressConfig(val: InProgressConfig) {
		this._customConfig.inProgress = val;
		storageSet({ inProgress: val });
	}

	isMotionSensitivityEnable() {
		return Boolean(this._customConfig.motionSensitivity);
	}

	setMotionSensitivityEnable(val: boolean) {
		this._customConfig.motionSensitivity = val;
		storageSet({ motionSensitivity: val });
	}

	isLobbyRedirectionEnable() {
		return Boolean(this._customConfig.lobbyRedirect);
	}

	setLobbyRedirectionEnable(val: boolean) {
		this._customConfig.lobbyRedirect = val;
		storageSet({ lobbyRedirect: val });
	}

	setLeftMenuEnabled(name: string, enable: boolean) {
		this._customConfig.disabled = this._customConfig.disabled.filter(
			(n) => n !== name,
		);

		if (!enable) {
			this._customConfig.disabled.push(name);
		}

		storageSet({ disabled: this._customConfig.disabled });
	}

	isLeftMenuEnabled(name: string) {
		return !this._customConfig.disabled.includes(name);
	}

	setGameFloatingMenu(name: string, enable: boolean) {
		this._customConfig.floating = this._customConfig.floating.filter(
			(n) => n !== name,
		);

		if (enable) {
			this._customConfig.floating.push(name);
		}

		storageSet({ floating: this._customConfig.floating });
	}

	isGameFloatingMenu(name: string) {
		return this._customConfig.floating.includes(name);
	}

	setOnlineMessagesEnabled(enable: boolean) {
		this._customConfig.onlineMessages = enable;
		storageSet({ onlineMessages: enable });
	}

	isOnlineMessagesEnabled() {
		return this._customConfig.onlineMessages || false;
	}

	setGlobalFloatingMenu(enable: boolean) {
		this._customConfig.floatingRightMenu = enable;
		storageSet({ floatingRightMenu: enable });
	}

	isGlobalFloatingMenu() {
		return this._customConfig.floatingRightMenu === true;
	}

	listTemplates() {
		return [...(this._customConfig.devTemplates || [])];
	}

	saveTemplates(templates: Template[]) {
		this._customConfig.devTemplates = [...templates];
		storageSet({ devTemplates: this._customConfig.devTemplates });
		return this.listTemplates();
	}

	addTemplate(template: Template) {
		this._customConfig.devTemplates = [
			...(this._customConfig.devTemplates || []),
			template,
		];
		storageSet({ devTemplates: this._customConfig.devTemplates });
		return this.listTemplates();
	}

	updateTemplate(oldName: string, oldGame: string, template: Template) {
		if (this._customConfig.devTemplates) {
			const oldTemplate = this._customConfig.devTemplates.find(
				(t) => t.name === oldName && t.game === oldGame,
			);

			if (oldTemplate) {
				oldTemplate.game = template.game;
				oldTemplate.name = template.name;
				oldTemplate.text = template.text;

				storageSet({ devTemplates: this._customConfig.devTemplates });
			}
		}

		return this.listTemplates();
	}

	removeTemplate(template: Template) {
		if (this._customConfig.devTemplates) {
			this._customConfig.devTemplates =
				this._customConfig.devTemplates.filter(
					(t) => t.name !== template.name || t.game !== template.game,
				);
			storageSet({ devTemplates: this._customConfig.devTemplates });
		}
		return this.listTemplates();
	}

	hideGame(name: string) {
		this._customConfig.hidden = [
			...this._customConfig.hidden.filter((g) => g !== name),
			name,
		];
		storageSet({ hidden: this._customConfig.hidden });
		return this.getHiddenGames();
	}

	displayGame(name: string) {
		this._customConfig.hidden = [
			...this._customConfig.hidden.filter((g) => g !== name),
		];
		storageSet({ hidden: this._customConfig.hidden });
		return this.getHiddenGames();
	}

	getHiddenGames() {
		return this._customConfig.hidden.sort();
	}

	getHiddenGamesStyle(page: string) {
		switch (page) {
			case "gamelist":
				return this._customConfig.hidden
					.map(
						(name) =>
							`div:has(> a[href="/gamepanel?game=${name}"]), div.bga-game-browser-carousel__block:has(> div > a[href="/gamepanel?game=${name}"]) { display: none; }`,
					)
					.join(" ");
			case "lobby":
				return this._customConfig.hidden
					.map(
						(name) =>
							`div:has(> a[href="/gamepanel?game=${name}"]), div.game_box_wrap:has(> div > div > div > a[href="/gamepanel?game=${name}"]) { display: none; }`,
					)
					.join(" ");
			default:
				return this._customConfig.hidden
					.map(
						(name) =>
							`div: has(> a[href = "/gamepanel?game=${name}"]) { display: none; }`,
					)
					.join(" ");
		}
	}

	isGeneralChatHidden() {
		return !!this._customConfig.hideGeneralChat;
	}

	setGeneralChatHidden(val: boolean) {
		this._customConfig.hideGeneralChat = val;
		storageSet({ hideGeneralChat: val });
	}

	toggleGeneralChatHidden() {
		this.setGeneralChatHidden(!this._customConfig.hideGeneralChat);
	}

	getChatStyle() {
		if (this._customConfig.hideGeneralChat) {
			return '#bga_extension_chat_icon { color: #c4c4c4; } #chatwindow_general { display: none !important; }';
		}
		return '#bga_extension_chat_icon { color: #01c4ca; } #chatwindow_general { display: inline-block !important; }';
	}

	isDarkMode() {
		return !!this._customConfig.darkMode;
	}

	setDarkMode(val: boolean) {
		this._customConfig.darkMode = val;
		storageSet({ darkMode: val });
	}

	getDarkModeColor(gameName: string) {
		const mainValue = this._customConfig.darkModeColor === undefined ? -1 : this._customConfig.darkModeColor;

		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		const result = this._customConfig.dark.find(d => d.name === gameName)?.color;
		return result === undefined ? mainValue : result;
	}

	getDarkModeSaturation(gameName) {
		const mainValue = this._customConfig.darkModeSat || 15;
		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		return this._customConfig.dark.find(d => d.name === gameName)?.sat || mainValue;
	}

	setDarkModeColor(gameName: string, darkModeColor: number, darkModeSat: number) {
		if (gameName === "general" || gameName === "forum") {
			this._customConfig.darkModeColor = darkModeColor;
			this._customConfig.darkModeSat = darkModeSat;
			storageSet({ darkModeColor, darkModeSat });
		} else {
			if (this._customConfig.darkModeColor === darkModeColor && this._customConfig.darkModeSat === darkModeSat) {
				// default config
				this._customConfig.dark = this._customConfig.dark.filter(d => d.name !== gameName);
			} else {
				this._customConfig.dark = [
					...this._customConfig.dark.filter(d => d.name !== gameName),
					{ name: gameName, color: darkModeColor, sat: darkModeSat }
				];
			}

			storageSet({ dark: this._customConfig.dark });
		}
	}

	isCssCustomized() {
		return !!this._localConfig.css;
	}

	getCustomCss() {
		return this._localConfig.css || "";
	}

	setCustomCss(code: string) {
		this._localConfig.css = code;
		return localStorageSet({ css: code });
	}

	getAllCss() {
		const home = this.getHomeConfig();
		const inProgress = this.getInProgressConfig();
		const cssList: string[] = [];
		let columns = 3;

		// If we want to display events, display the recent games section
		if (home.events && document.querySelector('.bga-advent-calendar')) {
			home.recentGames = true;
		}

		if (this._localConfig.css) {
			cssList.push(this._localConfig.css);
		}
		if (!home.header) {
			cssList.push('.bgaext_welcome .bga-homepage-header { display: none; }');
		}
		if (!home.latestNews) {
			cssList.push('.bgaext_welcome div:has(>.bga-homepage__out-grid-title) { display: none; }');
		}
		if (!home.recentGames && !home.popularGames && !home.recommandedGames) {
			cssList.push('.bgaext_welcome .bga-homepage__content { display: flex; }');
			cssList.push('.bgaext_welcome .bga-homepage__games-section { display: none; }');
			columns = 0;
		} else {
			if (!home.recentGames) {
				cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href="/gamelist?isRecent"]) { display: none; }');
				--columns;
			}
			if (!home.popularGames) {
				cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href="/gamelist?isPopular"]) { display: none; }');
				--columns;
			}
			if (!home.recommandedGames) {
				cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href="/gamelist?isSuggested"]) { display: none; }');
				--columns;
			}
		}
		if (!home.tournamentsBelow) {
			cssList.push('.bgaext_welcome div:has(>.bga-homepage__newsfeed) { flex-flow: row; }');
			cssList.push('.bgaext_welcome div:has(>.bga-homepage__newsfeed) > div:last-child { flex-grow: 1; min-width: 450px; }');

			cssList.push('.bgaext_welcome .bga-homepage__newsfeed { flex-shrink: 10; }');
			cssList.push('.bgaext_welcome .bga-homepage__content { gap: 2em !important; }');

			if (columns === 0) {
				cssList.push('.bgaext_welcome .bga-homepage__content { flex-flow: column; }');
			}
		}

		if (columns === 0 && (home.tournamentsBelow || !home.tournaments)) {
			cssList.push('.bgaext_welcome .bga-homepage__newsfeed { width: 100%; }');
		}

		if (!home.smallFeed) {
			cssList.push(`.bgaext_welcome .bga-homepage__content { grid-template-columns: minmax(0, ${300 * columns}px) minmax(0, 100%) !important; }`);
		} else if (!home.tournamentsBelow) {
			cssList.push(`.bgaext_welcome .bga-homepage__content { grid-template-columns: minmax(0, 40%) minmax(0, 60%) !important; }`);
		}

		/*
		cssList.push(`.bgaext_welcome .bga-homepage__content { display: grid; grid-template-columns: [col1] ${300 * columns}px [col2] auto !important; grid-template-rows: [row1] auto [row2] auto !important; }`);
		cssList.push('.bgaext_welcome .bga-homepage__games-section { display: grid; grid-column-start: 1 !important; grid-column-end: 1 !important; grid-row-start: 1 !important; grid-row-end: 1 !important; }');
		cssList.push('.bgaext_welcome .bga-homepage__partner-events-section { display: grid; grid-column-start: 1 !important; grid-column-end: 1 !important; grid-row-start: 2 !important; grid-row-end: 2 !important; }');
		cssList.push('.bgaext_welcome .bga-homepage__newsfeed-torunaments-section { display: grid; grid-column-start: 2 !important; grid-column-end: 2 !important; grid-row-start: 1 !important; grid-row-end: 1 !important; }');
		*/
		//cssList.push('.bgaext_welcome .bga-homepage__content .bga-homepage__games-section > .homepage-section:last-child { display: none; }');


		if (!home.fewFeeds || !home.tournaments || !home.tournamentsBelow) {
			cssList.push(`.bgaext_welcome .post.bga-hover-for-list { display: block !important; }`);
		}

		if (!home.smallFeed || !home.tournamentsBelow) {
			cssList.push('.bgaext_welcome .bga-homepage__partner-events-section { display: none; }');
		}

		if (!home.status) {
			cssList.push(`.bgaext_welcome .bga-homepage__service-status-section { display: none; }`);
		}
		if (!home.tournaments) {
			cssList.push('.bgaext_welcome div:has(>.homepage-section>.homepage-section__title>[href="/tournamentlist"]) { display: none; }');
			cssList.push('.bgaext_welcome div:has(>.bga-homepage__newsfeed-controls-wrapper) { display: none; }');
		}
		if (columns < 3) {
			cssList.push(`.bgaext_welcome .bga-homepage__games-section .grid-cols-3 { grid-template-columns: repeat(${columns}, minmax(0, 1fr)); }`);

			if (columns === 1) {
				cssList.push('.bgaext_welcome .bga-homepage__discover-section { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }');
				cssList.push('.bgaext_welcome .bga-homepage__discover-section>div:last-child { display: none; }');
			}
		}

		if (!inProgress.emptySections) {
			cssList.push('.bgaext_gameinprogress .bga-player-progress-list__section:has(>div.relative>div.relative>div.relative>div.flex.items-center) { display: none; }');
		}
		if (!inProgress.playAgain) {
			cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(1), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(2), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(3) { display: none; }');
		}
		if (!inProgress.discover) {
			cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(4), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(5), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(6) { display: none; }');
		}
		if (!inProgress.more) {
			cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(7), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(8), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(9) { display: none; }');
		}

		return cssList.join('\n');
	}
}

export default Configuration;
