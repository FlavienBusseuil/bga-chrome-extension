import Configuration from "./js/config/configuration";
import { setDarkStyle } from "./js/ui/content/darkMode/darkStyleMelodiceFunctions";
import { changeDarkColors } from "./js/ui/content/darkMode/darkColors";
import { gamesWithRecommendedConfig } from "./js/config/darkThemeRecommendedConfig";

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

	window.addEventListener('message', (evt) => {
		if (evt.origin === 'https://boardgamearena.com' && evt.data.key === 'bga_ext_game_name') {
			gameName = evt.data.name;
			console.debug(`[bga extension] Set game name for melodice: ${gameName}`);
			adjustDarkColors();
		}
	}, false);

	const sendMelodiceLoaded = () => {
		if (windowLoaded && configLoaded) {
			// hack to avoid light theme flashing
			top!.postMessage({ key: 'bga_ext_melodice_visible' }, 'https://boardgamearena.com/');
		}
	}

	const adjustDarkColors = () => {
		if (gameName) {
			const recommandedConfig = gamesWithRecommendedConfig[gameName];
			const hue = config.getDarkModeColor(gameName, recommandedConfig?.color);
			const saturation = config.getDarkModeSaturation(gameName, recommandedConfig?.sat);

			changeDarkColors(hue, saturation);
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