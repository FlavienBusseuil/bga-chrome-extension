import equal from "fast-deep-equal";
import defaultGames from "./sideMenuGames";
import { addChangeListener, localStorageClear, localStorageGet, localStorageSet, storageClear, storageGet, storageSet } from "../utils/chrome";
import { ADVANCED_HOME_STYLE, COLORFUL_TABLES, DEF_HOME_HTML } from "./configuration.constants";

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
	iconBorderDark: string;
	iconColor: string;
	iconColorDark: string;
	iconShadow: string;
	iconShadowDark: string;
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
	hiddenOn?: boolean;
	hidden: string[];
	muted: string[];
	muteWarning?: boolean;
	floating: string[];
	onlineMessages?: boolean;
	floatingRightMenu?: boolean;
	devTemplates?: Template[];
	hideGeneralChat?: boolean;
	hideElo?: boolean;
	darkMode?: boolean;
	darkModeColor?: number;
	darkModeSat?: number;
	trackTables?: boolean;
	soundNotification?: boolean;
	motionSensitivity?: boolean;
	home?: HomeConfig;
	inProgress?: InProgressConfig;
	lobbyRedirect?: boolean;
	fastCreate?: boolean;
	autoOpen?: boolean;
	karmaRestriction?: number;
	betterPlayerRestriction?: boolean;
	levelPlayerRestriction?: number;
	solidBack?: boolean;
	hideSocialMessages?: boolean;
	chatBarAutoHide?: boolean;
	hideChatUserNames?: boolean;
	chatLightIcons?: boolean;
	animatedTitle?: boolean;
	hideLogTimestamp?: boolean;
}

export interface HomeConfig {
	header: boolean;
	footer: boolean;
	latestNews: boolean;
	howToPlay: boolean;
	smallFeed: boolean;
	fewFeeds: boolean;
	status: boolean;
	tournaments: boolean;
	tournamentsBelow: boolean;
	recentGames: boolean;
	popularGames: boolean;
	recommandedGames: boolean;
	classicGames: boolean;
	events: boolean;
}

export interface AdvancedHomeConfig {
	advanced: boolean;
	html: string;
}

export interface InProgressConfig {
	emptySections: boolean;
	playAgain: boolean;
	discover: boolean;
	more: boolean;
	colorfulTables: boolean;
}

interface LocalConfig {
	css: string;
	home?: AdvancedHomeConfig;
}

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
					iconBackgroundDark: "#666",
					iconBorder: "transparent",
					iconBorderDark: "transparent",
					iconColor: "#222",
					iconColorDark: "#eee",
					iconShadow: "#000",
					iconShadowDark: "#000",
					position: "top",
					top: "75px",
					bottom: "auto",
					boardPanelOffset: 5,
					playerPanelOffset: 5,
					bottomPanelOffset: 5,
					left: "0.5em",
					css: ".desktop_version #game_play_area { padding-left: 50px; }",
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
			muted: []
		};
		this._config = { games: [] };
	}

	_init() {
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
		if (!this._customConfig.muted) {
			this._customConfig.muted = [];
		}
		if (!this._customConfig.floating) {
			this._customConfig.floating = [];
		}
		if (this._customConfig.hideChatUserNames === undefined) {
			this._customConfig.hideChatUserNames = true;
		}
		this._merge();
	}

	async init() {
		const [syncStorage, localStorage] = await Promise.all([storageGet(), localStorageGet()]);

		this._customConfig = syncStorage;
		this._localConfig = localStorage;

		console.debug("[bga extension] config", syncStorage);

		if (!this._customConfig.clientId) {
			this._customConfig.clientId = self.crypto.randomUUID();
			storageSet({ clientId: this._customConfig.clientId });
		}

		this._init();

		addChangeListener((changes: any, namespace: string) => {
			try {
				for (let [key, { newValue }] of Object.entries(changes) as any) {
					if (namespace === "local") {
						this._localConfig[key] = newValue;
					} else {
						this._customConfig[key] = newValue;
					}
					document && document.dispatchEvent(new CustomEvent('bga_ext_update_config', { detail: { key } }));
				}
			} catch (error) { } // not a big deal
		});

		// Return explicitly to ensure everything is done
		return true;
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
		return Boolean(this._customConfig.trackTables);
	}

	setTrackingEnable(val: boolean) {
		this._customConfig.trackTables = val;
		storageSet({ trackTables: val });
	}

	isSoundNotificationEnable() {
		return Boolean(this._customConfig.soundNotification);
	}

	setSoundNotificationEnable(val: boolean) {
		this._customConfig.soundNotification = val;
		storageSet({ soundNotification: val });
	}

	getHomeConfig() {
		const homeConfig = this._customConfig.home || {} as any;

		return {
			header: true,
			footer: true,
			latestNews: true,
			howToPlay: homeConfig?.howToPlay === undefined && homeConfig?.latestNews !== undefined ? homeConfig.latestNews : true,
			smallFeed: true,
			fewFeeds: true,
			status: true,
			tournaments: true,
			tournamentsBelow: true,
			recentGames: true,
			popularGames: true,
			recommandedGames: true,
			classicGames: true,
			events: true,
			...homeConfig
		};
	}

	setHomeConfig(val: HomeConfig) {
		this._customConfig.home = val;
		storageSet({ home: val });
	}

	getAdvancedHomeConfig() {
		const homeConfig = this._localConfig.home || {} as any;

		return {
			advanced: false,
			html: DEF_HOME_HTML,
			...homeConfig
		};
	}

	setAdvancedHomeConfig(val: AdvancedHomeConfig) {
		this._localConfig.home = val;
		localStorageSet({ home: val });
	}

	getInProgressConfig() {
		return {
			emptySections: true,
			playAgain: true,
			discover: true,
			more: true,
			colorfulTables: false,
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

	isFastCreateEnable() {
		return this._customConfig.fastCreate === undefined || Boolean(this._customConfig.fastCreate);
	}

	setFastCreateEnable(val: boolean) {
		this._customConfig.fastCreate = val;
		storageSet({ fastCreate: val });
	}

	isAutoOpenEnable() {
		return Boolean(this._customConfig.autoOpen);
	}

	setAutoOpenEnable(val: boolean) {
		this._customConfig.autoOpen = val;
		storageSet({ autoOpen: val });
	}

	getKarmaRestriction() {
		return this._customConfig.karmaRestriction || 0;
	}

	setKarmaRestriction(val: number) {
		this._customConfig.karmaRestriction = val;
		storageSet({ karmaRestriction: val });
	}

	isBetterPlayerRestriction() {
		return Boolean(this._customConfig.betterPlayerRestriction);
	}

	setBetterPlayerRestriction(val: boolean) {
		this._customConfig.betterPlayerRestriction = val;
		storageSet({ betterPlayerRestriction: val });
	}

	getLevelPlayerRestriction() {
		return this._customConfig.levelPlayerRestriction || 0;
	}

	setLevelPlayerRestriction(val: number) {
		this._customConfig.levelPlayerRestriction = val;
		storageSet({ levelPlayerRestriction: val });
	}

	isSolidBackground() {
		return Boolean(this._customConfig.solidBack);
	}

	setSolidBackground(val: boolean) {
		this._customConfig.solidBack = val;
		storageSet({ solidBack: val });
	}

	areSocialMessagesHidden() {
		return Boolean(this._customConfig.hideSocialMessages);
	}

	setSocialMessagesHidden(val: boolean) {
		this._customConfig.hideSocialMessages = val;
		storageSet({ hideSocialMessages: val });
	}

	isChatBarAutoHide() {
		return Boolean(this._customConfig.chatBarAutoHide);
	}

	setChatBarAutoHide(val: boolean) {
		this._customConfig.chatBarAutoHide = val;
		storageSet({ chatBarAutoHide: val });
	}

	areChatUserNamesHidden() {
		return Boolean(this._customConfig.hideChatUserNames);
	}

	setChatUserNamesHidden(val: boolean) {
		this._customConfig.hideChatUserNames = val;
		storageSet({ hideChatUserNames: val });
	}

	chatDarkIcons() {
		return this._customConfig.chatLightIcons != undefined && !this._customConfig.chatLightIcons;
	}

	setChatDarkIcons(val: boolean) {
		this._customConfig.chatLightIcons = !val;
		storageSet({ chatLightIcons: !val });
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

	setLogTimestampHidden(val: boolean) {
		this._customConfig.hideLogTimestamp = val;
		storageSet({ hideLogTimestamp: val });
	}

	areLogTimestampsHidden() {
		return this._customConfig.hideLogTimestamp || false;
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

	mutePlayer(name: string) {
		this._customConfig.muted = [
			...this._customConfig.muted.filter((g) => g !== name),
			name,
		];
		while (this._customConfig.muted.length > 10) {
			this._customConfig.muted.shift();
		}
		storageSet({ muted: this._customConfig.muted });
		return this.getMutedPlayers();
	}

	unmutePlayer(name: string) {
		this._customConfig.muted = [
			...this._customConfig.muted.filter((g) => g !== name),
		];
		storageSet({ muted: this._customConfig.muted });
		return this.getMutedPlayers();
	}

	getMutedPlayers() {
		return this._customConfig.muted;
	}

	setMuteWarning(enable: boolean) {
		this._customConfig.muteWarning = enable;
		storageSet({ muteWarning: enable });
	}

	isMuteWarning() {
		return this._customConfig.muteWarning === undefined || this._customConfig.muteWarning === true;
	}

	displayHideGameButton(disp: boolean) {
		this._customConfig.hiddenOn = disp;
		storageSet({ hiddenOn: disp });
	}

	isHideGameButtonDisplayed() {
		return this._customConfig.hiddenOn === undefined || this._customConfig.hiddenOn === true;
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

	displayAllGames() {
		this._customConfig.hidden = [];
		storageSet({ hidden: this._customConfig.hidden });
		return this.getHiddenGames();
	}

	getHiddenGames() {
		return this._customConfig.hidden.sort();
	}

	getHiddenGamesStyle(page: string) {
		switch (page) {
			case "gamelist":
				return this._customConfig.hidden.map(name => `div:has(> a[href="/gamepanel?game=${name}"]), div.bga-game-browser-carousel__block:has(> div > a[href="/gamepanel?game=${name}"]) { display: none; }`).join(" ");
			case "lobby":
				return this._customConfig.hidden.map(name => `div:has(> a[href="/gamepanel?game=${name}"]), div.game_box_wrap:has(> div > div > div > a[href="/gamepanel?game=${name}"]) { display: none; }`).join(" ");
			default:
				return this._customConfig.hidden.map(name => `div: has(> a[href = "/gamepanel?game=${name}"]) { display: none; }`).join(" ");
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

	isAnimatedTitle() {
		return this._customConfig.animatedTitle === undefined || this._customConfig.animatedTitle;
	}

	setAnimatedTitle(val: boolean) {
		this._customConfig.animatedTitle = val;
		storageSet({ animatedTitle: val });
	}

	isEloHidden() {
		return !!this._customConfig.hideElo;
	}

	setEloHidden(val: boolean) {
		this._customConfig.hideElo = val;
		storageSet({ hideElo: val });
	}

	getEloStyle() {
		if (this._customConfig.hideElo) {
			return '.player_elo_wrap, #game_result .adddetails, #table_stats .row-data:has(> .row-value > .gamerank) { display: none; } '
		}
		return '';
	}

	isDarkMode() {
		return !!this._customConfig.darkMode;
	}

	setDarkMode(val: boolean) {
		this._customConfig.darkMode = val;
		storageSet({ darkMode: val });
	}

	getDarkModeColor(gameName: string, def?: number) {
		const mainValue = this._customConfig.darkModeColor === undefined ? -1 : this._customConfig.darkModeColor;

		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		const result = this._customConfig.dark.find(d => d.name === gameName)?.color;
		return result === undefined ? def || mainValue : result;
	}

	getDarkModeSaturation(gameName, def?: number) {
		const mainValue = this._customConfig.darkModeSat || 15;
		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		return this._customConfig.dark.find(d => d.name === gameName)?.sat || def || mainValue;
	}

	setDarkModeColor(gameName: string, darkModeColor: number, darkModeSat: number, forceSave?: boolean) {
		if (gameName === "general" || gameName === "forum") {
			this._customConfig.darkModeColor = darkModeColor;
			this._customConfig.darkModeSat = darkModeSat;
			storageSet({ darkModeColor, darkModeSat });
		} else {
			if (!forceSave && this._customConfig.darkModeColor === darkModeColor && this._customConfig.darkModeSat === darkModeSat) {
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

	clearDarkModeColor(gameName: string) {
		this._customConfig.dark = this._customConfig.dark.filter(d => d.name !== gameName);
		storageSet({ dark: this._customConfig.dark });
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

	getGameCss() {
		const cssList: string[] = [];

		if (this._customConfig.chatBarAutoHide) {
			cssList.push('.game_interface #chatbardock { transition: top .5s ease 0s; }');
			cssList.push('.game_interface #chatbardock.bgaext_hidden:not(:has(.expanded)) { top: 0px; }')
		}

		if (this._customConfig.hideLogTimestamp) {
			cssList.push('#logs .timestamp { display: none!important; }');
		}

		if (this._localConfig.css) {
			cssList.push(this._localConfig.css);
		}

		return cssList.join('\n');
	}

	geStudioCss() {
		const cssList: string[] = [];

		if (!this._customConfig.hideChatUserNames) {
			cssList.push('#chatbar .chatwindow .playername { display: inline !important; }');
		}

		if (this._localConfig.css) {
			cssList.push(this._localConfig.css);
		}

		return cssList.join('\n');
	}

	getAllCss() {
		const home = this.getHomeConfig();
		const advHome = this.getAdvancedHomeConfig();
		const inProgress = this.getInProgressConfig();
		const cssList: string[] = [];

		if (this.areSocialMessagesHidden()) {
			cssList.push(`#newsfeed .post:not(:has(a[href^="/group"])), #bgaext-newsfeed .post:not(:has(a[href^="/group"])), .bgaext_welcome .post.bga-hover-for-list:not(:has(a[href^="/group"])) { display: none!important; }`);
		}

		if (advHome.advanced) {
			cssList.push(ADVANCED_HOME_STYLE);
		} else {
			let columns = 3;

			if (!home.fewFeeds) {
				let maxheight = 0;

				if (home.tournaments && home.tournamentsBelow) {
					maxheight = 400;
				} else if (home.classicGames && home.status) {
					maxheight = 630;
				} else if (home.classicGames) {
					maxheight = 790;
				} else {
					maxheight = 500;
				}

				cssList.push(`.bga-homepage-newsfeed { max-height: ${maxheight}px; overflow: auto; }`);
				if (home.tournaments) {
					cssList.push(`.homepage-section:has([href*="tournamentlist"]) .homepage-section__content { max-height: ${maxheight + 30}px; overflow: hidden; }`);
				}
			}

			// If we want to display events, display the recent games section
			if (home.events && document.querySelector('.bga-advent-calendar')) {
				home.recentGames = true;
			}

			if (!home.header) {
				cssList.push('.bgaext_welcome .bga-homepage-header { display: none; }');
			}
			if (!home.footer) {
				cssList.push('.bgaext_welcome .bga-homepage__pre-footer { visibility: hidden; height: 1px; }');
			}
			if (!home.latestNews) {
				cssList.push('.bgaext_welcome div:has(>.bga-homepage__out-grid-title):has([href="/headlines"]) { display: none; }');
			}
			if (!home.howToPlay) {
				cssList.push('.bgaext_welcome div:has(>.bga-homepage__out-grid-title):has([href="/gamelist?hasTutorialOnly"]) { display: none; }');
			}

			if (!home.recentGames && !home.popularGames && !home.recommandedGames && !home.classicGames) {
				cssList.push('.bgaext_welcome .bga-homepage__content { display: flex; }');
				cssList.push('.bgaext_welcome .bga-homepage__games-section { display: none; }');
				columns = 0;
			} else {
				if (!home.recentGames) {
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href*="/gamelist?isRecent"]) { display: none; }');
					--columns;
				}
				if (!home.popularGames) {
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href*="/gamelist?isPopular"]) { display: none; }');
					--columns;
				}
				if (!home.recommandedGames) {
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href*="/gamelist?isSuggested"]) { display: none; }');
					--columns;
				}
				if (!home.classicGames) {
					cssList.push('.bgaext_welcome .bga-homepage__games-section > div:last-child { display: none; }')
				} else if (columns === 0) {
					columns = 1;
				}
			}
			if (!home.tournamentsBelow && home.tournaments) {
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
				cssList.push(`.bgaext_welcome .desktop_version .bga-homepage__content { grid-template-columns: minmax(0, ${300 * columns}px) minmax(0, 100%) !important; }`);
			} else if (!home.tournamentsBelow) {
				cssList.push(`.bgaext_welcome .bga-homepage__content { grid-template-columns: minmax(0, 40%) minmax(0, 60%) !important; }`);
			}

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
		}

		if (!inProgress.emptySections) {
			cssList.push('.bgaext_gameinprogress .bga-player-progress-list__section:has(>div.relative>div.relative>div.relative>div.flex.items-center) { display: none; }');
		}
		if (!inProgress.playAgain && !inProgress.discover && !inProgress.more) {
			cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(1), .bgaext_gameinprogress #main-content > div:first-child > div:last-child { display: none; }');
		} else {
			if (!inProgress.playAgain) {
				cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(1), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(2), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(3) { display: none; }');
			}
			if (!inProgress.discover) {
				cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(4), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(5), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(6) { display: none; }');
			}
			if (!inProgress.more) {
				cssList.push('.bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(7), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(8), .bgaext_gameinprogress #main-content > div:first-child > div:last-child > div:nth-child(9) { display: none; }');
			}
		}

		if (inProgress.colorfulTables) {
			cssList.push(COLORFUL_TABLES);
		}

		if (!this._customConfig.hideChatUserNames) {
			cssList.push('#chatbar .chatwindow .playername { display: inline !important; }');
		}

		if (this._localConfig.css) {
			cssList.push(this._localConfig.css);
		}

		return cssList.join('\n');
	}

	exportConfig() {
		return JSON.stringify({
			local: this._localConfig,
			custom: this._customConfig
		}, null, '	');
	}

	importConfig(jsonConfig: string) {
		const config = JSON.parse(jsonConfig);

		if (config.local) {
			this._localConfig = config.local;
			localStorageClear();
			localStorageSet(this._localConfig);
		}

		if (config.custom) {
			this._customConfig = {
				...config.custom,
				clientId: this._customConfig.clientId
			};
			storageClear();
			storageSet(this._customConfig);
		}
	}

	resetConfig() {
		this._localConfig = {} as any;
		this._customConfig = { clientId: this._customConfig.clientId } as any;

		this._init();

		localStorageClear();
		localStorageSet(this._localConfig);

		storageClear();
		storageSet(this._customConfig);
	}
}

export default Configuration;
