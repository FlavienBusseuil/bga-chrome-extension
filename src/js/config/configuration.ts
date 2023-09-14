import equal from "fast-deep-equal";
import defaultGames from "./sideMenuGames";
import { addChangeListener, storageGet, storageSet } from "../utils/chrome";

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
	menuCss?: string;
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
};

class Configuration {
	_defConfig: { games: Game[] };
	_customConfig: CustomConfig;
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
			games: [],
			dark: [],
			disabled: [],
			floating: [],
			hidden: [],
		};
		this._config = { games: [] };
	}

	async init() {
		this._customConfig = (await storageGet()) as any;
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
							`div:has(> a[href="/gamepanel?game=${name}"]) { display: none; }`,
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
			return;
		}

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

export default Configuration;
