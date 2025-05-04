import equal from "fast-deep-equal";
import defaultGames from "./sideMenuGames";
import { ADVANCED_HOME_STYLE, COLORFUL_TABLES, DEF_HOME_HTML } from "./configuration.constants";
import { allTasks, type MapStore } from "nanostores";
import { persistentMap } from "./nanostores/storage";
import { storage } from "webextension-polyfill";

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
	hideLeftBarOption?: boolean;
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

export interface PopupsConfig {
	deleteWarning: boolean;
	fastStartWarning: boolean;
	muteWarning: boolean;
	reportMsg: boolean;
	infosDialog?: string | undefined;
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
	home?: AdvancedHomeConfig | {};
	popups?: PopupsConfig;
}

class Configuration {
	_defConfig: { games: Game[] };
	_customConfig: MapStore<CustomConfig>;
	_localConfig: MapStore<LocalConfig>;
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
		this._customConfig = persistentMap<CustomConfig>('customConfig', {
			clientId: self.crypto.randomUUID(),
			games: [],
			dark: [],
			disabled: [],
			hidden: [],
			muted: [],
			floating: [],
			hideChatUserNames: true
		}, storage.sync);
		this._localConfig = persistentMap<LocalConfig>('localConfig', {
			css: ''
		});
		this._config = { games: [] };
	}
	_init() {
		this.migrateLegacyPopupConfig();
		this._merge();
	}

	// Migration of config values of previous versions
	private migrateLegacyPopupConfig() {
		try {
			if (localStorage) {
				const deleteWarning = localStorage.getItem('ext_delete_warning');
				const fastStartWarning = localStorage.getItem('ext_fast_start_warning');
				const muteWarning = localStorage.getItem('ext_mute_warning');
				const reportMsg = localStorage.getItem('ext_report_msg');
				const infosDialog = localStorage.getItem('ext_infos_dialog') || undefined;

				if (deleteWarning || fastStartWarning || infosDialog || muteWarning || reportMsg) {
					this.setPopupConfiguration({
						deleteWarning: deleteWarning !== 'off',
						fastStartWarning: fastStartWarning !== 'off',
						muteWarning: muteWarning !== 'off',
						reportMsg: reportMsg !== 'off',
						infosDialog
					});

					localStorage.removeItem('ext_delete_warning');
					localStorage.removeItem('ext_fast_start_warning');
					localStorage.removeItem('ext_infos_dialog');
					localStorage.removeItem('ext_mute_warning');
					localStorage.removeItem('ext_report_msg');
				}
			}
		}
		catch (error) {
			// localstorage not available in background and private mode
		}
	}

	private async mountStores() {
		this._customConfig.get();
		this._localConfig.get();
		await allTasks();
	}


	async init() {
		// TODO: Avoid this if possible, as it defeats the purpose of using lazy stores
		await this.mountStores();

		this._init();

		console.debug('[bga extension] init config');

		return true;
	}

	private _merge() {
		const customConfig = this._customConfig.get();
		const customGames = customConfig.games
		const customNames = customGames.map((g) => g.name);
		const defGames = this._defConfig.games.filter(
			(g) => !customNames.includes(g.name),
		);

		this._config.games = [...defGames, ...customGames];
	}

	isEmpty() {
		const customConfig = this._customConfig.get();
		return (
			customConfig.floatingRightMenu === undefined &&
			customConfig.devTemplates === undefined &&
			customConfig.onlineMessages === undefined &&
			!customConfig.disabled.length &&
			!customConfig.games.length &&
			!customConfig.floating.length
		);
	}

	getLocalConfigStorage(): MapStore<LocalConfig> {
		return this._localConfig;
	}

	getSyncedConfigStorage(): MapStore<CustomConfig> {
		return this._customConfig;
	}

	import(customConfig: CustomConfig) {
		this._customConfig.set(customConfig);
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

		const games = [
			...this._customConfig.get().games.filter((g) => g.name !== name),
			game,
		]
		this._customConfig.setKey('games', games);
		this._merge();
		return this.getGamesList();
	}

	resetGame(name: string) {
		let customGames = this._customConfig.get().games;
		this._customConfig.setKey('games', customGames.filter(
			(g) => g.name !== name,
		));
		this._merge();
		return this.getGamesList();
	}

	isDefault(name: string) {
		const defGame = this._defConfig.games.find((g) => g.name === name);
		return !!defGame;
	}

	isCustomized(name: string) {
		const custGame = this._customConfig.get().games.find((g) => g.name === name);
		return !!custGame;
	}

	isTrackingEnable() {
		return Boolean(this._customConfig.get().trackTables);
	}

	setTrackingEnable(val: boolean) {
		this._customConfig.setKey('trackTables', val);
	}

	isSoundNotificationEnable() {
		return Boolean(this._customConfig.get().soundNotification);
	}

	setSoundNotificationEnable(val: boolean) {
		this._customConfig.setKey('soundNotification', val);
	}

	getHomeConfig() {
		const homeConfig = this._customConfig.get().home || {} as any;

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
		this._customConfig.setKey('home', val);
	}

	getAdvancedHomeConfig() {
		const homeConfig = this._localConfig.get().home || {} as any;

		return {
			advanced: false,
			html: DEF_HOME_HTML,
			...homeConfig
		};
	}

	setAdvancedHomeConfig(val: AdvancedHomeConfig) {
		this._localConfig.setKey('home', val);
	}

	getPopupConfiguration() {
		return this._localConfig.get().popups || {
			deleteWarning: true,
			fastStartWarning: true,
			muteWarning: true,
			reportMsg: true
		};
	}

	setPopupConfiguration(val: PopupsConfig) {
		this._localConfig.setKey('popups', val);
	}

	getInProgressConfig() {
		return {
			emptySections: true,
			playAgain: true,
			discover: true,
			more: true,
			colorfulTables: false,
			...(this._customConfig.get().inProgress || {})
		}
	}

	setInProgressConfig(val: InProgressConfig) {
		this._customConfig.setKey('inProgress', val);

	}

	isMotionSensitivityEnable() {
		return Boolean(this._customConfig.get().motionSensitivity);
	}

	setMotionSensitivityEnable(val: boolean) {
		this._customConfig.setKey('motionSensitivity', val);
	}

	isLobbyRedirectionEnable() {
		return Boolean(this._customConfig.get().lobbyRedirect);
	}

	setLobbyRedirectionEnable(val: boolean) {
		this._customConfig.setKey('lobbyRedirect', val);
	}

	isFastCreateEnable() {
		const fastCreate = this._customConfig.get().fastCreate;
		return fastCreate === undefined || Boolean(fastCreate);
	}

	setFastCreateEnable(val: boolean) {
		this._customConfig.setKey('fastCreate', val);
	}

	isAutoOpenEnable() {
		return Boolean(this._customConfig.get().autoOpen);
	}

	setAutoOpenEnable(val: boolean) {
		this._customConfig.setKey('autoOpen', val);
	}

	getKarmaRestriction() {
		return this._customConfig.get().karmaRestriction || 0;
	}

	setKarmaRestriction(val: number) {
		this._customConfig.setKey('karmaRestriction', val);
	}

	isBetterPlayerRestriction() {
		return Boolean(this._customConfig.get().betterPlayerRestriction);
	}

	setBetterPlayerRestriction(val: boolean) {
		this._customConfig.setKey('betterPlayerRestriction', val);
	}

	getLevelPlayerRestriction() {
		return this._customConfig.get().levelPlayerRestriction || 0;
	}

	setLevelPlayerRestriction(val: number) {
		this._customConfig.setKey('levelPlayerRestriction', val);
	}

	isSolidBackground() {
		return Boolean(this._customConfig.get().solidBack);
	}

	setSolidBackground(val: boolean) {
		this._customConfig.setKey('solidBack', val);
	}

	areSocialMessagesHidden() {
		return Boolean(this._customConfig.get().hideSocialMessages);
	}

	setSocialMessagesHidden(val: boolean) {
		this._customConfig.setKey('hideSocialMessages', val);
	}

	isChatBarAutoHide() {
		return Boolean(this._customConfig.get().chatBarAutoHide);
	}

	setChatBarAutoHide(val: boolean) {
		this._customConfig.setKey('chatBarAutoHide', val);
	}

	areChatUserNamesHidden() {
		return Boolean(this._customConfig.get().hideChatUserNames);
	}

	setChatUserNamesHidden(val: boolean) {
		this._customConfig.setKey('hideChatUserNames', val);
	}

	chatDarkIcons() {
		const useLightChatIcons = this._customConfig.get().chatLightIcons;
		return useLightChatIcons != undefined && !useLightChatIcons;
	}

	setChatDarkIcons(val: boolean) {
		this._customConfig.setKey('chatLightIcons', !val);
	}

	setLeftMenuEnabled(name: string, enable: boolean) {
		let disabledElements = this._customConfig.get().disabled || [];
		disabledElements = disabledElements.filter(
			(n) => n !== name,
		);

		if (!enable) {
			disabledElements.push(name);
		}

		this._customConfig.setKey('disabled', disabledElements);
	}

	isLeftMenuEnabled(name: string) {
		return !this.isLeftBarOptionHidden() && !this._customConfig.get().disabled.includes(name);
	}

	setGameFloatingMenu(name: string, enable: boolean) {
		let floatingElements = this._customConfig.get().floating || [];
		floatingElements = floatingElements.filter(
			(n) => n !== name,
		);

		if (enable) {
			floatingElements.push(name);
		}

		this._customConfig.setKey('floating', floatingElements);
	}

	isGameFloatingMenu(name: string) {
		return this._customConfig.get().floating.includes(name);
	}

	setOnlineMessagesEnabled(enable: boolean) {
		this._customConfig.setKey('onlineMessages', enable);
	}

	isOnlineMessagesEnabled() {
		return this._customConfig.get().onlineMessages || false;
	}

	setLogTimestampHidden(val: boolean) {
		this._customConfig.setKey('hideLogTimestamp', val);
	}

	areLogTimestampsHidden() {
		return this._customConfig.get().hideLogTimestamp || false;
	}

	setHideLeftBarOption(val: boolean) {
		this._customConfig.setKey('hideLeftBarOption', val);
	}

	isLeftBarOptionHidden() {
		return this._customConfig.get().hideLeftBarOption || false;
	}

	setGlobalFloatingMenu(enable: boolean) {
		this._customConfig.setKey('floatingRightMenu', enable);
	}

	isGlobalFloatingMenu() {
		return this._customConfig.get().floatingRightMenu === true;
	}

	listTemplates() {
		return [...(this._customConfig.get().devTemplates || [])];
	}

	saveTemplates(templates: Template[]) {
		this._customConfig.setKey('devTemplates', templates);
		return this.listTemplates();
	}

	addTemplate(template: Template) {
		const updatedTemplates = [
			...(this._customConfig.get().devTemplates || []),
			template,
		]
		this._customConfig.setKey('devTemplates', updatedTemplates);
		return this.listTemplates();
	}

	updateTemplate(oldName: string, oldGame: string, template: Template) {
		const devTemplates = this._customConfig.get().devTemplates;
		if (devTemplates) {
			const oldTemplate = devTemplates.find(
				(t) => t.name === oldName && t.game === oldGame,
			);

			if (oldTemplate) {
				oldTemplate.game = template.game;
				oldTemplate.name = template.name;
				oldTemplate.text = template.text;

				this._customConfig.setKey('devTemplates', devTemplates);
			}
		}

		return this.listTemplates();
	}

	removeTemplate(template: Template) {
		const devTemplates = this._customConfig.get().devTemplates;
		if (devTemplates) {
			const updatedTemplates = devTemplates.filter((t) => t.name !== template.name || t.game !== template.game);
			this._customConfig.setKey('devTemplates', updatedTemplates);
		}
		return this.listTemplates();
	}

	mutePlayer(name: string) {
		let updatedMuteTable = [
			...this._customConfig.get().muted.filter((g) => g !== name),
			name,
		];
		while (updatedMuteTable.length > 10) {
			updatedMuteTable.shift();
		}
		this._customConfig.setKey('muted', updatedMuteTable);
		return this.getMutedPlayers();
	}

	unmutePlayer(name: string) {
		let updatedMuteTable = [
			...this._customConfig.get().muted.filter((g) => g !== name),
		];
		this._customConfig.setKey('muted', updatedMuteTable);
		return this.getMutedPlayers();
	}

	getMutedPlayers() {
		return this._customConfig.get().muted;
	}

	setMuteWarning(enable: boolean) {
		this._customConfig.setKey('muteWarning', enable);
	}

	isMuteWarning() {
		const muteWarning = this._customConfig.get().muteWarning;
		return muteWarning === undefined || muteWarning === true;
	}

	displayHideGameButton(disp: boolean) {
		this._customConfig.setKey('hiddenOn', disp);
	}

	isHideGameButtonDisplayed() {
		const hiddenOn = this._customConfig.get().hiddenOn;
		return hiddenOn === undefined || hiddenOn === true;
	}

	hideGame(name: string) {
		const updatedHidden = this._customConfig.get().hidden.filter((g) => g !== name).concat(name);
		this._customConfig.setKey('hidden', updatedHidden);
		return this.getHiddenGames();
	}

	displayGame(name: string) {
		const updatedHidden = this._customConfig.get().hidden.filter((g) => g !== name);
		this._customConfig.setKey('hidden', updatedHidden);
		return this.getHiddenGames();
	}

	displayAllGames() {
		this._customConfig.setKey('hidden', []);
		return this.getHiddenGames();
	}

	getHiddenGames() {
		return this._customConfig.get().hidden.sort();
	}

	getHiddenGamesStyle(page: string) {
		const hidden = this._customConfig.get().hidden;
		switch (page) {
			case "gamelist":
				return hidden.map(name => `div:has(> a[href="/gamepanel?game=${name}"]), div.bga-game-browser-carousel__block:has(> div > a[href="/gamepanel?game=${name}"]) { display: none; }`).join(" ");
			case "lobby":
				return hidden.map(name => `div:has(> a[href="/gamepanel?game=${name}"]), div.game_box_wrap:has(> div > div > div > a[href="/gamepanel?game=${name}"]) { display: none; }`).join(" ");
			default:
				return hidden.map(name => `div: has(> a[href = "/gamepanel?game=${name}"]) { display: none; }`).join(" ");
		}
	}

	isGeneralChatHidden() {
		return !!this._customConfig.get().hideGeneralChat;
	}

	setGeneralChatHidden(val: boolean) {
		this._customConfig.setKey('hideGeneralChat', val);
	}

	toggleGeneralChatHidden() {
		this.setGeneralChatHidden(!this._customConfig.get().hideGeneralChat);
	}

	getChatStyle() {
		if (this._customConfig.get().hideGeneralChat) {
			return '#bga_extension_chat_icon { color: #c4c4c4; } #chatwindow_general { display: none !important; }';
		}
		return '#bga_extension_chat_icon { color: #01c4ca; } #chatwindow_general { display: inline-block !important; }';
	}

	isAnimatedTitle() {
		const isAnimatedTitle = this._customConfig.get().animatedTitle;
		return isAnimatedTitle === undefined || isAnimatedTitle
	}

	setAnimatedTitle(val: boolean) {
		this._customConfig.setKey('animatedTitle', val);
	}

	isEloHidden() {
		return !!this._customConfig.get().hideElo;
	}

	setEloHidden(val: boolean) {
		this._customConfig.setKey('hideElo', val);
	}

	getEloStyle() {
		if (this._customConfig.get().hideElo) {
			return '.player_elo_wrap, #game_result .adddetails, #table_stats .row-data:has(> .row-value > .gamerank) { display: none; } '
		}
		return '';
	}

	isDarkMode() {
		const darkMode = this._customConfig.get().darkMode;
		return !!darkMode;
	}

	setDarkMode(val: boolean) {
		this._customConfig.setKey('darkMode', val);
	}

	getDarkModeColor(gameName: string, def?: number) {
		const darkModeColor = this._customConfig.get().darkModeColor;
		const mainValue = darkModeColor === undefined ? -1 : darkModeColor;

		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		const result = this._customConfig.get().dark.find(d => d.name === gameName)?.color;
		return result === undefined ? def || mainValue : result;
	}

	getDarkModeSaturation(gameName, def?: number) {
		const mainValue = this._customConfig.get().darkModeSat || 15;
		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		return this._customConfig.get().dark.find(d => d.name === gameName)?.sat || def || mainValue;
	}

	setDarkModeColor(gameName: string, darkModeColor: number, darkModeSat: number, forceSave?: boolean) {
		if (gameName === "general" || gameName === "forum") {
			this._customConfig.setKey('darkModeColor', darkModeColor);
			this._customConfig.setKey('darkModeSat', darkModeSat);
		} else {
			if (!forceSave && this._customConfig.get().darkModeColor === darkModeColor && this._customConfig.get().darkModeSat === darkModeSat) {
				// default config
				this._customConfig.setKey('dark', this._customConfig.get().dark.filter(d => d.name !== gameName));
			} else {
				this._customConfig.setKey('dark', [
					...this._customConfig.get().dark.filter(d => d.name !== gameName),
					{ name: gameName, color: darkModeColor, sat: darkModeSat }
				]);
			}

		}
	}

	clearDarkModeColor(gameName: string) {
		this._customConfig.setKey('dark', this._customConfig.get().dark.filter(d => d.name !== gameName));
	}

	isCssCustomized() {
		return !!this._localConfig.get().css;
	}

	getCustomCss() {
		return this._localConfig.get().css || "";
	}

	setCustomCss(code: string) {
		this._localConfig.setKey('css', code);
	}

	getGameCss() {
		const cssList: string[] = [];

		if (this._customConfig.get().chatBarAutoHide) {
			cssList.push('.game_interface #chatbardock { transition: top .5s ease 0s; }');
			cssList.push('.game_interface #chatbardock.bgaext_hidden:not(:has(.expanded)) { top: 0px; }')
		}

		if (this._customConfig.get().hideLogTimestamp) {
			cssList.push('#logs .timestamp { display: none!important; }');
		}

		if (this._localConfig.get().css) {
			cssList.push(this._localConfig.get().css);
		}

		return cssList.join('\n');
	}

	geStudioCss() {
		const cssList: string[] = [];

		if (!this._customConfig.get().hideChatUserNames) {
			cssList.push('#chatbar .chatwindow .playername { display: inline !important; }');
		}

		if (this._localConfig.get().css) {
			cssList.push(this._localConfig.get().css);
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

		if (!this._customConfig.get().hideChatUserNames) {
			cssList.push('#chatbar .chatwindow .playername { display: inline !important; }');
		}

		if (this._localConfig.get().css) {
			cssList.push(this._localConfig.get().css);
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
			this._localConfig.set(config.local);
		}

		if (config.custom) {
			this._customConfig.set({
				...config.custom,
				clientId: this._customConfig.get().clientId
			});
		}
	}

	resetConfig() {
		this._localConfig.set({ css: "" });
		this._customConfig.set({
			clientId: this._customConfig.get().clientId,
			games: [],
			dark: [],
			disabled: [],
			hidden: [],
			muted: [],
			floating: [],
			hideChatUserNames: true
		});

		this._init();
	}
}

export default Configuration;
