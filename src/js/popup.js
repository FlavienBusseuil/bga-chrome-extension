import React, { render } from "preact";
import Configuration from "./config/configuration";
import { App } from "./ui/App";

const config = new Configuration();
config.init().then(() => {
	if (config.isDarkMode()) {
		document.documentElement.classList.add("dark");
	}
});

document.addEventListener("DOMContentLoaded", () => {
	render(<App config={config} />, document.body);
});
