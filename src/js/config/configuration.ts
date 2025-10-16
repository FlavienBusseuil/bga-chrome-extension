import { addChangeListener, localStorageClear, localStorageGet, localStorageSet, storageClear, storageGet, storageSet } from "../utils/browser";
import { i18n, setI18nLocale, getI18nDefaultLocale } from "../utils/browser/i18n";
import { ADVANCED_HOME_STYLE, ARENA_DISABLED_GAMES, COLORFUL_TABLES, DEF_HOME_HTML, HIDE_FULLSCREEN_LOADING_LOGO } from "./configuration.constants";
import { DarkModeConfig, Game, Template } from "./models";

interface CustomConfig {
	clientId: string;
	locale?: string;
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
	hideArenaElo?: boolean;
	darkMode?: boolean;
	darkModeColor?: number;
	darkModeSat?: number;
	darkModeBrightness?: number;
	trackTables?: boolean;
	soundNotification?: boolean;
	motionSensitivity?: boolean;
	home?: HomeConfig;
	inProgress?: InProgressConfig;
	lobbyRedirect?: boolean;
	hideDisabledArenaGames?: boolean;
	hideFullscreenLoadingLogo?: boolean;
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
	quitGameTo?: 'home' | 'lobby';
	replayWithAutoStart?: boolean;
	autoClickStart?: boolean;
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
	infosDialog?: string;
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
	popups?: PopupsConfig;
}

class Configuration {
	_customConfig: CustomConfig;
	_localConfig: LocalConfig;
	_config: { games: Game[] };
	_initialized: boolean;

	get initialized(): boolean {
		return this._initialized;
	}

	constructor() {
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
		this._localConfig = { css: "" };
		this._initialized = false;
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
	}

	async init() {
		const [syncStorage, localStorage] = await Promise.all([storageGet(), localStorageGet()]);

		this._customConfig = syncStorage as CustomConfig; // unsafe cast
		this._localConfig = localStorage as LocalConfig; // unsafe cast

		this._customConfig.locale ||= getI18nDefaultLocale();

		await setI18nLocale(this._customConfig.locale);

		if (!this._customConfig.clientId) {
			this._customConfig.clientId = self.crypto.randomUUID();
			storageSet({ clientId: this._customConfig.clientId });
		}

		this._init();

		addChangeListener((changes, namespace) => {
			try {
				for (let [key, { newValue }] of Object.entries(changes)) {
					if (namespace === "local") {
						(this._localConfig as Record<keyof LocalConfig, any>)[key as keyof LocalConfig] = newValue; // unsafe cast
					} else {
						(this._customConfig as Record<keyof CustomConfig, any>)[key as keyof CustomConfig] = newValue; // unsafe cast
					}
					document && document.dispatchEvent(new CustomEvent('bga_ext_update_config', { detail: { key } }));
				}
			} catch (error) { } // not a big deal, catches failing casts
		});

		this._initialized = true;

		// Return explicitly to ensure everything is done
		return true;
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

	getLocale() {
		return this._customConfig.locale || i18n('current_locale');
	}

	async setLocale(val: string) {
		this._customConfig.locale = val;
		storageSet({ locale: val });
		await setI18nLocale(val);
	}

	getGameConfig(game: string): Game | undefined {
		return this._config.games.find((c: any) => c.name === game);
	}

	getGamesList(): Game[] {
		return this._config.games.sort((a, b) => a.name.localeCompare(b.name));
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

	getHomeConfig(): HomeConfig {
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
			...homeConfig
		};
	}

	setHomeConfig(val: HomeConfig) {
		this._customConfig.home = val;
		storageSet({ home: val });
	}

	getAdvancedHomeConfig(): AdvancedHomeConfig {
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

	getPopupConfiguration() {
		return this._localConfig.popups || {
			deleteWarning: true,
			fastStartWarning: true,
			muteWarning: true,
			reportMsg: true
		};
	}

	setPopupConfiguration(val: PopupsConfig) {
		this._localConfig.popups = val;
		localStorageSet({ popups: val });
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

	areDisabledArenaGamesHidden() {
		return Boolean(this._customConfig.hideDisabledArenaGames);
	}

	hideDisabledArenaGames(val: boolean) {
		this._customConfig.hideDisabledArenaGames = val;
		storageSet({ hideDisabledArenaGames: val });
	}

	isFullscreenLoadingLogoHidden() {
		return this._customConfig.hideFullscreenLoadingLogo === undefined || Boolean(this._customConfig.hideFullscreenLoadingLogo);
	}

	hideFullscreenLoadingLogo(val: boolean) {
		this._customConfig.hideFullscreenLoadingLogo = val;
		storageSet({ hideFullscreenLoadingLogo: val });
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
		return !this.isLeftBarOptionHidden() && !this._customConfig.disabled.includes(name);
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

	setHideLeftBarOption(val: boolean) {
		this._customConfig.hideLeftBarOption = val;
		storageSet({ hideLeftBarOption: val });
	}

	isLeftBarOptionHidden() {
		return this._customConfig.hideLeftBarOption || false;
	}

	setGlobalFloatingMenu(enable: boolean) {
		this._customConfig.floatingRightMenu = enable;
		storageSet({ floatingRightMenu: enable });
	}

	isGlobalFloatingMenu() {
		return this._customConfig.floatingRightMenu === true;
	}

	setQuitGameTo(page: 'home' | 'lobby') {
		this._customConfig.quitGameTo = page;
		storageSet({ quitGameTo: page });
	}

	getQuitGameTo() {
		return this._customConfig.quitGameTo || 'home';
	}

	setReplayWithAutoStart(val: boolean) {
		this._customConfig.replayWithAutoStart = val;
		storageSet({ replayWithAutoStart: val });
	}

	replayWithAutoStart() {
		return this._customConfig.replayWithAutoStart === undefined || this._customConfig.replayWithAutoStart;
	}

	setAutoClickStart(val: boolean) {
		this._customConfig.autoClickStart = val;
		storageSet({ autoClickStart: val });
	}

	autoClickStart() {
		return Boolean(this._customConfig.autoClickStart);
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

	isArenaEloHidden() {
		// value null or undefined value hides elo at the arena (default bga behavior)
		return this._customConfig.hideArenaElo !== false;
	}

	setEloHidden(val: boolean) {
		this._customConfig.hideElo = val;
		storageSet({ hideElo: val });
	}

	setArenaEloHidden(val: boolean) {
		this._customConfig.hideArenaElo = val;
		storageSet({ hideArenaElo: val });
	}

	getEloStyle() {
		let eloStyle = '';

		if (this.isEloHidden()) {
			eloStyle += '.player_elo_wrap, #game_result .adddetails, #table_stats .row-data:has(> .row-value > .gamerank) { display: none; } '
		}

		const showArenaElo = !this.isArenaEloHidden();
		if (showArenaElo) {
			eloStyle += '.arena_mode .player_elo_wrap { visibility: visible; display: inline; } '
		}

		return eloStyle;
	}

	isDarkMode() {
		return !!this._customConfig.darkMode;
	}

	setDarkMode(val: boolean) {
		this._customConfig.darkMode = val;
		storageSet({ darkMode: val });
	}

	getDarkModeBrightness() {
		return this._customConfig.darkModeBrightness || 90;
	}

	setDarkModeBrightness(val: number) {
		this._customConfig.darkModeBrightness = val;
		storageSet({ darkModeBrightness: val });
	}

	getDarkModeColor(gameName: string, def?: number) {
		const mainValue = this._customConfig.darkModeColor === undefined ? -1 : this._customConfig.darkModeColor;

		if (gameName === "general" || gameName === "forum") {
			return mainValue;
		}

		const result = this._customConfig.dark.find(d => d.name === gameName)?.color;
		return result === undefined ? (def === undefined ? mainValue : def) : result;
	}

	getDarkModeSaturation(gameName: string, def?: number) {
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

		if (this.areDisabledArenaGamesHidden()) {
			cssList.push(ARENA_DISABLED_GAMES);
		}

		if (this.isFullscreenLoadingLogoHidden()) {
			cssList.push(HIDE_FULLSCREEN_LOADING_LOGO);
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
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href*="/gamelist?isTrending"]) { display: none; }');
					--columns;
				}
				if (!home.recommandedGames) {
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__title>[href*="/gamelist?isSuggested"]) { display: none; }');
					cssList.push('.bgaext_welcome .flex-1:has(>.homepage-section>.homepage-section__content>.bga-advent-calendar) { display: none; }');
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
