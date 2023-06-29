import Configuration from "./js/config/configuration";
import { isNumber } from "./js/utils/misc/isNumber";
import { addLocationChangeListener } from "./js/utils/misc/addLocationChangeListener";
import {
	buildMainCss,
	initlogObserver,
	initLeftMenu,
	setFloatingRightMenu,
	initDevelopperUI,
	buildOptions,
	initGameListObserver,
} from "./js/ui/content/functions";

const config = new Configuration();
let currentObserver = null;

buildMainCss();

const initObserver = (page) => {
	currentObserver =
		page === "game"
			? initlogObserver(config)
			: initGameListObserver(config, page);
	if (!currentObserver) {
		setTimeout(() => initObserver(page), 500);
	}
};

const manageLocationChange = (pathname) => {
	console.log("[bga extension] load path", pathname);

	const pageInfo = pathname.substring(1).split("/");

	if (currentObserver) {
		currentObserver.disconnect();
		currentObserver = null;
	}

	if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
		initObserver("game");

		const gameName = pageInfo[1];
		const gameConfig = config.getGameConfig(gameName);

		if (
			config.isGlobalFloatingMenu() ||
			config.isGameFloatingMenu(gameName)
		) {
			setFloatingRightMenu(gameConfig, true);
		}

		buildOptions(config, gameName, gameConfig);

		if (!gameConfig) {
			console.log(
				`[bga extension] No configuration found for game ${gameName}`,
			);
			return;
		}

		initLeftMenu(gameConfig, config.isLeftMenuEnabled(gameName));
	} else if (pageInfo[0].startsWith("gamelist")) {
		initObserver("gamelist");
	} else if (pageInfo[0].startsWith("lobby")) {
		initObserver("lobby");
	} else if (pageInfo[0].startsWith("bug")) {
		initObserver("other");
		initDevelopperUI(config);
	} else {
		initObserver("other");
	}
};

const initPage = () => {
	config.isEmpty() &&
		document.dispatchEvent(new CustomEvent("bga_ext_get_config", {}));

	addLocationChangeListener(manageLocationChange);
	manageLocationChange(window.location.pathname);
};

config.init().then(initPage);

document.addEventListener("bga_ext_set_config", function (e) {
	const jsonData = e.detail;
	console.log(
		"[bga extension] import data from deprecated extension",
		jsonData,
	);
	config.import(JSON.parse(jsonData));
	!config.isEmpty() && location.reload();
});
