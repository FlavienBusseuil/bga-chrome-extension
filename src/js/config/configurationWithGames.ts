import Configuration from "./configuration";
import { Game } from "./models";
import defaultGames from "./sideMenuGames";

const baseGame: Partial<Game> = {
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
};

class ConfigurationWithGames extends Configuration {
	getGameConfig(game: string): Game | undefined {
		const config = defaultGames[game];

		if (config) {
			return { name: game, ...baseGame, ...config } as Game;
		}
		return undefined;
	}
}

export default ConfigurationWithGames;