import { render } from "preact";
import Options from "./ui/options";
import ConfigurationWithGames from "./config/configurationWithGames";

const config = new ConfigurationWithGames();

// Same look as the popup (html.dark), but the options page follows the OS theme
document.documentElement.classList.add("options-page");

const osDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const setDarkMode = () => document.documentElement.classList.toggle("dark", osDarkMode.matches);

setDarkMode();
osDarkMode.addEventListener("change", setDarkMode);

document.addEventListener("DOMContentLoaded", () => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	config.init().then(() => {
		render(<Options config={config} />, container);
	});
});
