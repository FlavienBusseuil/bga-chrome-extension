import Configuration from './js/config/configuration';
import { isNumber } from './js/utils/misc/isNumber';
import { waitForObj } from './js/utils/misc/wait';
import { addLocationChangeListener } from './js/utils/misc/addLocationChangeListener';
import {
	buildMainCss,
	initLogObserver,
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

if (localStorage.getItem('ext_dark_theme') === 'on') {
	// hack to avoid light theme flashing
	const s = document.createElement('style');
	s.innerHTML = "* { visibility: hidden; }"
	document.documentElement.appendChild(s);
	window.addEventListener("load", () => {
		if (window.navigator.userAgent.toLowerCase().includes('firefox')) {
			setTimeout(() => { s.remove(); }, 500);
		} else {
			s.remove();
		}
	});
}

const initObserver = (page) => {
	currentObserver = page === 'game' ? initLogObserver(config) : initGameListObserver(config, page);
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
		const isMobile = !window.matchMedia || window.matchMedia("only screen and (max-width: 760px)").matches;

		if (!isMobile && (config.isGlobalFloatingMenu() || config.isGameFloatingMenu(gameName))) {
			setFloatingRightMenu(config, gameConfig, true);
		}

		buildOptions(config, gameName, gameConfig);

		if (gameConfig) {
			initLeftMenu(config, gameConfig, config.isLeftMenuEnabled(gameName));
		} else {
			console.debug(`[bga extension] no configuration found for game ${gameName}`);
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

		waitForObj('.bga-advent-calendar', 10).then(() => buildMainCss(config.getAllCss())).catch(() => { });
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
	const oldClasses = Array.from(document.documentElement.classList).filter(c => c.startsWith('bgaext'));

	oldClasses.map(oldClass => {
		document.documentElement.classList.remove(oldClass);
	})

	document.documentElement.classList.add(`bgaext_${mode}`);
};

const initPage = () => {
	config.isEmpty() && document.dispatchEvent(new CustomEvent('bga_ext_get_config', {}));
	addLocationChangeListener(manageLocationChange);
	pageType = manageLocationChange(window.location.pathname);
	buildMainCss(pageType === 'general' ? config.getAllCss() : config.getCustomCss());
};

config.init().then(initPage);

document.addEventListener('bga_ext_set_config', (e) => {
	const jsonData = e.detail;
	console.debug('[bga extension] import data from deprecated extension', jsonData);
	config.import(JSON.parse(jsonData));
	!config.isEmpty() && location.reload();
});

document.addEventListener('bga_ext_update_config', (data) => {
	console.debug('[bga extension] configuration updated', data);

	if (data.detail.key === 'hideGeneralChat') {
		setChatStyle(config);
	}
	if (['home', 'inProgress'].includes(data.detail.key) && pageType === 'general') {
		localStorage.removeItem('bga-homepage-newsfeed-slots');
		localStorage.removeItem('bga-homepageNewsSeen');
		buildMainCss(config.getAllCss());
	}
});

window.addEventListener('message', (evt) => {
	if (evt.origin === 'https://forum.boardgamearena.com' && evt.data.key === 'bga_ext_forum_visible') {
		// hack to avoid light theme flashing
		console.debug('[bga extension] forum displayed');
		document.documentElement.classList.add('bgaext_forum_visible');
	}
}, false);
