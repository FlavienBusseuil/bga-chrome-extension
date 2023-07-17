import {
	initLeftMenu,
	buildLeftMenu,
	buildLeftMenuCss,
} from "./leftMenu/functions";
import { setFloatingRightMenu } from "./rightMenu/functions";
import { initDevelopperUI } from "./studio/functions";
import { initGameListObserver } from "./gameList/functions";
import { initDarkMode } from "./darkMode/functions";
import shouldFilter from "../../config/filteredLogs";

const buildMainCss = () => {
	const style = document.createElement("style");
	style.id = "cde_bga_ext";
	style.innerHTML = "#lrf-bga-extension { display: none; }";
	document.head.appendChild(style);
};

const initlogObserver = (config) => {
	const logsContainer = document.querySelector("#logs");

	if (!logsContainer) {
		return null;
	}

	const observer = new MutationObserver(() => {
		if (!config.isOnlineMessagesEnabled()) {
			logsContainer.childNodes.forEach((elt, index) => {
				const text = elt.innerHTML;
				if (
					text &&
					text.indexOf("<!--PNS-->") >= 0 &&
					shouldFilter(text)
				) {
					logsContainer.removeChild(elt);
				}
				if (index > 20) {
					return;
				}
			});
		}
	});

	observer.observe(logsContainer, { childList: true, subtree: true });

	return observer;
};

const buildOption = (
	title,
	text,
	inputId,
	inputValue,
	option1,
	option2,
	toggleFunc,
) => {
	const container = document.createElement("div");
	container.className = "preference_choice";

	const row = document.createElement("div");
	row.className = "row-data row-data-large";
	container.appendChild(row);

	const label = document.createElement("div");
	label.className = "row-label";
	label.innerHTML = text;
	row.appendChild(label);

	const val = document.createElement("div");
	val.className = "row-value";
	row.appendChild(val);

	const input = document.createElement("select");
	input.id = inputId;
	input.className = "preference_control";
	input.addEventListener("click", (evt) => evt.stopPropagation());
	input.addEventListener("change", toggleFunc);
	val.appendChild(input);

	if (inputValue === "1") {
		input.insertAdjacentHTML(
			"beforeend",
			'<option value="1" selected="selected">' + option1 + "</option>",
		);
		input.insertAdjacentHTML(
			"beforeend",
			'<option value="0">' + option2 + "</option>",
		);
	} else {
		input.insertAdjacentHTML(
			"beforeend",
			'<option value="1">' + option1 + "</option>",
		);
		input.insertAdjacentHTML(
			"beforeend",
			'<option value="0" selected="selected">' + option2 + "</option>",
		);
	}

	title.parentNode.insertBefore(container, title.nextSibling);
};

const buildOptions = (config, gameName, gameConfig) => {
	const histoInputs = [
		document.getElementById("preference_global_control_logsSecondColumn"),
		document.getElementById("preference_global_fontrol_logsSecondColumn"),
	].filter((elt) => !!elt);
	const infobulleInput = document.getElementById("preference_control_200");
	const mainMenu = document.getElementById("ingame_menu_content");
	const settings = document.getElementById("pagesection_options");

	if (!settings || !mainMenu || !infobulleInput || histoInputs.length !== 2) {
		setTimeout(() => buildOptions(config, gameName, gameConfig), 500);
		return;
	}

	const mainPrefTitle = mainMenu.getElementsByTagName("h2")[0];
	const secondPrefTitle = settings.getElementsByTagName("h2")[0];

	// Add an option for floating menu
	const optionFloatingGameSelected = config.isGameFloatingMenu(gameName)
		? ' selected="selected"'
		: " ";
	const optionFloatingAlwaysSelected = config.isGlobalFloatingMenu()
		? ' selected="selected"'
		: " ";
	const optionFloatingGame =
		'<option value="2"' +
		optionFloatingGameSelected +
		">" +
		chrome.i18n.getMessage("optionFloatingGame") +
		"</option>";
	const optionFloatingAlways =
		'<option value="3"' +
		optionFloatingAlwaysSelected +
		">" +
		chrome.i18n.getMessage("optionFloatingAlways") +
		"</option>";
	const checkFloating = (evt) => {
		if (evt.target.value === "3") {
			setFloatingRightMenu(gameConfig, true);
			config.setGameFloatingMenu(gameName, false);
			config.setGlobalFloatingMenu(true);
		} else if (evt.target.value === "2") {
			setFloatingRightMenu(gameConfig, true);
			config.setGameFloatingMenu(gameName, true);
			config.setGlobalFloatingMenu(false);
		} else {
			setFloatingRightMenu(gameConfig, false);
			config.setGameFloatingMenu(gameName, false);
			config.setGlobalFloatingMenu(false);
		}
	};
	histoInputs.forEach((input) => {
		input.insertAdjacentHTML("beforeend", optionFloatingGame);
		input.insertAdjacentHTML("beforeend", optionFloatingAlways);
		input.addEventListener("change", checkFloating);
		input.addEventListener("click", (evt) => evt.stopPropagation());
	});

	// Add a parameter for left menu
	if (gameConfig) {
		const displayMenu = config.isLeftMenuEnabled(gameName) ? "1" : "0";
		const toggleDisplayMenu = () => {
			const enable = !config.isLeftMenuEnabled(gameName);
			config.setLeftMenuEnabled(gameName, enable);
			buildLeftMenu(gameConfig, enable);
			buildLeftMenuCss(gameConfig, enable);
			document.getElementById("cde_menu_1").value = enable ? "1" : "0";
			document.getElementById("cde_menu_2").value = enable ? "1" : "0";
		};
		const displayLeftMenuText = chrome.i18n.getMessage("optionLeftMenu");
		buildOption(
			mainPrefTitle,
			displayLeftMenuText,
			"cde_menu_1",
			displayMenu,
			infobulleInput[0].text,
			infobulleInput[1].text,
			toggleDisplayMenu,
		);
		buildOption(
			secondPrefTitle,
			displayLeftMenuText,
			"cde_menu_2",
			displayMenu,
			infobulleInput[0].text,
			infobulleInput[1].text,
			toggleDisplayMenu,
		);
	}

	// Add a parameter for friends activity
	const displayActivity = config.isOnlineMessagesEnabled() ? "1" : "0";
	const toggleFriendsActivity = () => {
		const enable = !config.isOnlineMessagesEnabled();
		config.setOnlineMessagesEnabled(enable);
		document.getElementById("cde_activity_1").value = enable ? "1" : "0";
		document.getElementById("cde_activity_2").value = enable ? "1" : "0";
	};
	const displayActivityText = chrome.i18n.getMessage("optionFriendsActivity");
	buildOption(
		mainPrefTitle,
		displayActivityText,
		"cde_activity_1",
		displayActivity,
		infobulleInput[0].text,
		infobulleInput[1].text,
		toggleFriendsActivity,
	);
	buildOption(
		secondPrefTitle,
		displayActivityText,
		"cde_activity_2",
		displayActivity,
		infobulleInput[0].text,
		infobulleInput[1].text,
		toggleFriendsActivity,
	);
};

const initChatIcon = (config) => {
	const chatIconId = 'bga_extension_chat_icon';

	if (!document.getElementById(chatIconId)) {
		const friendsElt = document.querySelector('.bga-friends-icon');

		if (!friendsElt) {
			setTimeout(() => initChatIcon(config), 100);
			return;
		}

		const container = friendsElt.parentNode;

		const chatElt = document.createElement('div');
		chatElt.id = chatIconId;
		chatElt.innerHTML = '<i class="fa fa-comments" style="font-size: 32px; cursor: pointer;"></i>';
		chatElt.onclick = () => config.toggleGeneralChatHidden();
		container.parentNode.insertBefore(chatElt, container);

		const sepElt = document.createElement('div');
		sepElt.className = 'ml-1 tablet:ml-6';
		container.parentNode.insertBefore(sepElt, container);

		setChatStyle(config);
	}
};

const setChatStyle = (config) => {
	const chatStyleId = 'cde-chat-style';

	let style = document.getElementById(chatStyleId);

	if (!style) {
		style = document.createElement('style');
		style.id = chatStyleId;
		document.head.appendChild(style);
	}

	style.innerHTML = config.getChatStyle();
};

export {
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
};
