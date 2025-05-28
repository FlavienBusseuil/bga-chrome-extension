import equal from "fast-deep-equal";

import Configuration from "./configuration";
import { Game } from "./models";
import defaultGames from "./sideMenuGames";
import { storageSet } from "../utils/browser";

class ConfigurationWithGames extends Configuration {
	_defConfig: { games: Game[] };

	constructor() {
		super();

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
	};

	override _init() {
		super._init();
		this._merge();
	}

	private _merge() {
		const customNames = this._customConfig.games.map((g) => g.name);
		const defGames = this._defConfig.games.filter(
			(g) => !customNames.includes(g.name),
		);

		this._config.games = [...defGames, ...this._customConfig.games];
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
}

export default ConfigurationWithGames;