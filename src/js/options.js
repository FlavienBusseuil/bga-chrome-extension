import React, { render } from "preact";
import Options from "./ui/options";
import ConfigurationWithGames from "./config/configurationWithGames";

const config = new ConfigurationWithGames();

document.addEventListener("DOMContentLoaded", () => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	config.init().then(() => {
		render(<Options config={config} />, container);
	});
});
