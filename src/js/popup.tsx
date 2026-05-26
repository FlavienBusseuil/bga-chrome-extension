import { render } from "preact";
import Configuration from "./config/configuration";
import { App } from "./ui/App";

let configInitialized = false;
let domReady = false;

const renderApp = () => {
	if (configInitialized && domReady) {
		render(<App config={config} />, document.body);
	}
}

const config = new Configuration();
config.init().then(() => {
	if (config.isDarkMode()) {
		document.documentElement.classList.add("dark");
	}
	configInitialized = true;
	renderApp();

	document.addEventListener('bga_ext_update_config', (data) => {
		const key = (data as CustomEvent).detail.key as string;
		if (key === 'darkMode') {
			if (config.isDarkMode()) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	domReady = true;
	renderApp();
});

