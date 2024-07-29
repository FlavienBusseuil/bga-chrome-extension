import Configuration from './js/config/configuration';
import { isNumber } from './js/utils/misc/isNumber';
import { addLocationChangeListener } from './js/utils/misc/addLocationChangeListener';
import {
	buildMainCss,
	initlogObserver,
	initLeftMenu,
	setFloatingRightMenu,
	initDevelopperUI,
	buildOptions,
	initGameListObserver,
	initChatIcon,
	setChatStyle,
	initDarkMode
} from './js/ui/content/functions';

const config = new Configuration();
let currentObserver = null;
let pageType = undefined;

const initObserver = (page) => {
	currentObserver =
		page === 'game'
			? initlogObserver(config)
			: initGameListObserver(config, page);
	if (!currentObserver) {
		setTimeout(() => initObserver(page), 500);
	}
};

const manageLocationChange = (pathname) => {
	console.log('[bga extension] load path', pathname);

	if (pathname === '/gamepanel' && config.isLobbyRedirectionEnable()) {
		const params = window.location.search.substring(1).split('&');
		const gameParam = params.find(p => p.startsWith('game'));
		const tableParam = params.find(p => p.startsWith('table'));

		if (gameParam && tableParam) {
			const redirectUrl = `https://boardgamearena.com/table?${tableParam}&nr=true`;
			window.location.replace(redirectUrl);
			return;
		}
	}

	const pageInfo = pathname.substring(1).split('.')[0].split('/');

	if (currentObserver) {
		currentObserver.disconnect();
		currentObserver = null;
	}

	if (pageInfo.length >= 2 && isNumber(pageInfo[0])) {
		initObserver('game');

		const gameName = pageInfo[1];
		const gameConfig = config.getGameConfig(gameName);

		if (
			config.isGlobalFloatingMenu() ||
			config.isGameFloatingMenu(gameName)
		) {
			setFloatingRightMenu(config, gameConfig, true);
		}

		buildOptions(config, gameName, gameConfig);

		if (gameConfig) {
			initLeftMenu(config, gameConfig, config.isLeftMenuEnabled(gameName));
		} else {
			console.log(`[bga extension] No configuration found for game ${gameName}`);
		}

		initDarkMode(config, gameName);
		return 'game';
	}

	const pageName = pageInfo[0] || 'welcome';

	if (pageName === 'welcome' && !document.getElementById('ext_homepage')) {
		const homeConfig = config.getHomeConfig();

		if (homeConfig.tournaments && !homeConfig.tournamentsBelow) {
			const script = document.createElement('script');
			script.id = 'ext_homepage';
			script.src = `${chrome.runtime.getURL('/js/homepage.js')}?&time=${new Date().getTime()}`;
			document.head.appendChild(script);
		}
	}

	if (pageName !== 'archive' && pageName !== 'tutorial') {
		initChatIcon(config);
		initDarkMode(config, 'general');

		setHtmlClass(pageName);

		if (pageName.startsWith('gamelist')) {
			initObserver('gamelist');
		} else if (pageName.startsWith('lobby')) {
			initObserver('lobby');
		} else if (pageName.startsWith('bug')) {
			initObserver('other');
			initDevelopperUI(config);
		} else {
			initObserver('other');
		}
		return 'general';
	}

	return 'archive';
};

const setHtmlClass = (mode) => {
	const oldClass = Array.from(document.documentElement.classList).find(c => c.startsWith('bgaext'));

	if (oldClass) {
		document.documentElement.classList.remove(oldClass);
	}

	document.documentElement.classList.add(`bgaext_${mode}`);
};

const initPage = () => {
	config.isEmpty() && document.dispatchEvent(new CustomEvent('bga_ext_get_config', {}));
	addLocationChangeListener(manageLocationChange);
	pageType = manageLocationChange(window.location.pathname);
	buildMainCss(pageType === 'general' ? config.getAllCss() : config.getCustomCss());
};

config.init().then(initPage);

document.addEventListener('bga_ext_set_config', function (e) {
	const jsonData = e.detail;
	console.log(
		'[bga extension] import data from deprecated extension',
		jsonData,
	);
	config.import(JSON.parse(jsonData));
	!config.isEmpty() && location.reload();
});

document.addEventListener('bga_ext_update_config', (data) => {
	console.log('bga_ext_update_config', data);
	if (data.detail.key === 'hideGeneralChat') {
		setChatStyle(config);
	}
	if (['home', 'inProgress'].includes(data.detail.key) && pageType === 'general') {
		localStorage.removeItem('bga-homepage-newsfeed-slots');
		localStorage.removeItem('bga-homepageNewsSeen');
		buildMainCss(config.getAllCss());
	}
});