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
});

document.addEventListener("DOMContentLoaded", () => {
	domReady = true;
	renderApp();
});
