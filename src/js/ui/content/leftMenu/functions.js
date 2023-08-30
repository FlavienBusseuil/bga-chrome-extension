import React, { render } from "preact";
import SideMenu from "./SideMenu";
import { getPlayersData } from "../players"

let playersData;

export const initLeftMenu = (gameConfig, leftMenuEnable) => {
	getPlayersData().then((data) => {
		console.log("[bga extension] players data", data);

		playersData = data;
		buildLeftMenuCss(gameConfig, leftMenuEnable);
		buildLeftMenu(gameConfig, leftMenuEnable);
	});
};

export const buildLeftMenu = (gameConfig, enable) => {
	const menuContainerId = "bga_extension_sidebar";

	if (enable) {
		const container = document.createElement("div");
		container.id = menuContainerId;
		container.style.position = "fixed";
		container.style.left = gameConfig.left;
		container.style.userSelect = "none";
		container.style.zIndex = 1000;
		document.body.appendChild(container);

		render(
			<SideMenu
				players={playersData}
				panel={gameConfig.playerPanel}
				gameConfig={gameConfig}
			/>,
			container,
		);
		return;
	}

	const container = document.getElementById(menuContainerId);
	if (container) {
		container.parentNode.removeChild(container);
	}
};

export const buildLeftMenuCss = (gameConfig, enable) => {
	const menuStyleId = "cde-left-menu-style";

	if (!enable) {
		const style = document.getElementById(menuStyleId);
		if (style) {
			style.parentNode.removeChild(style);
		}
	} else if (gameConfig.css) {
		const style = document.createElement("style");
		style.id = menuStyleId;
		style.innerHTML = gameConfig.css;
		document.head.appendChild(style);
	}
};
