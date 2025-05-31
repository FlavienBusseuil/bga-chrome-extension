import { render } from "preact";
import SideMenu from "./SideMenu";
import { getPlayersData, PlayerData } from "../players"

import type Configuration from "~/js/config/configuration";
import type { Game } from "~/js/config/models";

let playersData: PlayerData[] = [];

export const initLeftMenu = (config: Configuration, gameConfig: Game, leftMenuEnable: boolean, twoTeams: boolean) => {
	document.addEventListener("DOMContentLoaded", () => {
		getPlayersData(twoTeams).then((data) => {
			console.debug("[bga extension] players data", data);

			playersData = data;
			buildLeftMenuCss(gameConfig, leftMenuEnable);
			buildLeftMenu(config, gameConfig, leftMenuEnable);
		});
	});
};

export const buildLeftMenu = (config: Configuration, gameConfig: Game, enable: boolean) => {
	const menuContainerId = "bga_extension_sidebar";

	if (enable) {
		const container = document.createElement("div");
		container.id = menuContainerId;
		container.style.position = "fixed";
		container.style.left = gameConfig.left;
		container.style.userSelect = "none";
		container.style.zIndex = "1000";
		document.body.appendChild(container);

		render(
			SideMenu({
				players: playersData,
				panel: gameConfig.playerPanel,
				gameConfig: gameConfig,
				config: config
			}),
			container,
		);
		return;
	}

	const container = document.getElementById(menuContainerId);
	if (container) {
		container.parentNode?.removeChild(container);
	}
};

export const buildLeftMenuCss = (gameConfig: Game, enable: boolean) => {
	const menuStyleId = "cde-left-menu-style";

	if (!enable) {
		const style = document.getElementById(menuStyleId);
		if (style) {
			style.parentNode?.removeChild(style);
		}
	} else if (gameConfig.css) {
		const style = document.createElement("style");
		style.id = menuStyleId;
		style.innerHTML = gameConfig.css;
		document.head.appendChild(style);
	}
};
