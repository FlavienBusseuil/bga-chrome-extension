import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleMelodiceFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";
import { getGameConfig, loadGameConfig } from "./js/config/games";

const isInIFrame = window.self !== window.top;

console.debug(`[bga extension] loading melodice in iframe: ${isInIFrame}`);

// Only manage the page if it's loaded into an iframe (like in bga ...)
if (isInIFrame) {
	let gameName = '';
	let windowLoaded = false;
	let configLoaded = false;

	window.addEventListener("load", () => {
		windowLoaded = true;
		sendMelodiceLoaded();
	});

	chrome.runtime.onMessage.addListener((message) => {
		if (message.to === "MELODICE" && message.payload.key === 'bga_ext_game_name') {
			gameName = message.payload.name;
			console.debug(`[bga extension] Set game name for melodice: ${gameName}`);
			adjustDarkColors();
		}
	});

	const sendMelodiceLoaded = () => {
		if (windowLoaded && configLoaded) {
			// hack to avoid light theme flashing
			chrome.runtime.sendMessage({ to: 'MAIN_PAGE', payload: { key: 'bga_ext_melodice_visible' } });
		}
	}

	const adjustDarkColors = () => {
		if (gameName) {
			const currentGameName = gameName;

			loadGameConfig(currentGameName).then(() => {
				const recommendedColor = getGameConfig(currentGameName)?.recommendedColor;
				const hue = config.getDarkModeColor(currentGameName, recommendedColor?.hue);
				const saturation = config.getDarkModeSaturation(currentGameName, recommendedColor?.saturation);

				changeDarkColors(hue, saturation);
			});
		}
	};

	const initPage = () => {
		setDarkStyle(config.isDarkMode(), config.getCustomCss()).then(() => {
			configLoaded = true;
			sendMelodiceLoaded();
		});
	};

	document.addEventListener('bga_ext_update_config', (data) => {
		const key = (data as CustomEvent).detail.key as string;

		if (key === 'dark') {
			adjustDarkColors();
		} else if (key === 'darkMode') {
			setDarkStyle(config.isDarkMode(), config.getCustomCss());
		}
	});

	const config = new Configuration();
	config.init().then(initPage);
}