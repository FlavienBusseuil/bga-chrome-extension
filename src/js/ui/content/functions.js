import React, { render } from "preact";
import {
	initLeftMenu,
	buildLeftMenu,
	buildLeftMenuCss,
} from './leftMenu/functions';
import { setFloatingRightMenu } from './rightMenu/functions';
import { initDevelopperUI } from './studio/functions';
import { initGameListObserver } from './gameList/functions';
import { initDarkMode } from './darkMode/functions';
import ConfirmationPopup from './misc/ConfirmationPopup';
import { waitForObj } from '../../utils/misc/wait';
import shouldFilter from '../../config/filteredLogs';

const buildMainCss = (code) => {
	waitForObj('head', 10).then(() => {
		let style = document.getElementById('cde_bga_ext');

		if (!style) {
			style = document.createElement('style');
			style.id = 'cde_bga_ext';
			document.head.appendChild(style);
		}
		style.innerHTML = `
		#lrf-bga-extension, .bgaext_overlay { display: none; }
		.darkmode .bgaext_overlay { display: block; }
		.bgaext_chat_mute_icon { position: absolute; width: 20px; height: 20px; top: 7px; left: 2px; display: none; }
		.bgaext_chat_hidden { display: none!important; }
		.bgaext_chat_visible { display: inline!important; }
		.roundedboxinner:hover .bgaext_chat_mute_icon { cursor: pointer; display: block; }
		${code}
		`;
	});
};

let mutedPlayers = [];
let lastMessage = {};

const mutePlayer = (config, evt) => {
	let elt = evt.target;
	let playerName, tableId;

	for (let i = 0; i < 10 && !playerName; i++) {
		playerName = elt.dataset.player;
		tableId = elt.dataset.table;
		elt = elt.parentNode;
	}

	const doMute = () => {
		console.info(`[bga extension] Mute player ${playerName}`, mutedPlayers);
		config.mutePlayer(playerName);

		const msg = `${playerName} has been muted, I will no longer receive their messages. \n[Feature provided by: https://en.doc.boardgamearena.com/ChromeExtension]`;
		const endPoint = `/table/table/say.html`;
		const key = new Date().getTime();
		const body = new URLSearchParams({ table: tableId, msg, noerrortracking: true, "dojo.preventCache": key }).toString();
		const detail = JSON.stringify({ method: 'POST', endPoint, key, body, type: 'say' });
		document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
	};

	if (localStorage.getItem("ext_mute_warning") === "off") {
		doMute();
	} else {
		const container = document.createElement('div');
		container.id = "bgaext_popup_container";
		document.body.appendChild(container);

		const close = () => {
			container.remove();
		}
		const confirm = (stopWarn) => {
			if (stopWarn) {
				localStorage.setItem("ext_mute_warning", "off");
			}
			doMute();
			close();
		};

		render(<ConfirmationPopup type='mute_player' confirm={confirm} cancel={close} config={config} />, container);
	}
};

const refreshMutedPlayers = (config) => {
	const chatContainer = document.querySelector('#chatbar');

	mutedPlayers = config.getMutedPlayers();
	if (chatContainer) {
		mutePlayers(config, chatContainer);
	}
};

const hideElement = (elt) => {
	if (!elt.classList.contains('bgaext_chat_hidden')) {
		elt.classList.add('bgaext_chat_hidden');
	}
	if (elt.classList.contains('bgaext_chat_visible')) {
		elt.classList.remove('bgaext_chat_visible');
	}
};

const displayElement = (elt, force) => {
	if (elt.classList.contains('bgaext_chat_hidden')) {
		elt.classList.remove('bgaext_chat_hidden');
	}
	if (force && !elt.classList.contains('bgaext_chat_visible')) {
		elt.classList.add('bgaext_chat_visible');
	}
};

const hideMutedPlayerWriting = (writingSpanId, writingAreaId, titleAreaId) => {
	const writingSpan = document.getElementById(writingSpanId);
	const writingArea = document.getElementById(writingAreaId);
	const titleArea = document.getElementById(titleAreaId);

	if (writingArea.style.display === 'none' || !writingSpan.innerHTML || mutedPlayers.find(name => writingSpan.innerHTML.indexOf(name) >= 0)) {
		hideElement(writingArea);
		displayElement(titleArea, true);
	} else {
		displayElement(writingArea, true);
		hideElement(titleArea);
	}
};

const getMessageText = (container, name) => {
	if (container.nodeName === "#text" && container.nodeValue !== name) {
		return container.nodeValue;
	}
	return Array.from(container.childNodes || []).map((node) => getMessageText(node, name)).find(v => Boolean(v))?.trim();
};

const mutePlayers = (config, chatContainer) => {
	const tables = Array.from(chatContainer.querySelectorAll('.chatwindowtype_table'));

	tables.forEach(t => {
		const id = t.id.split('_').pop();
		const messages = Array.from(t.querySelectorAll('.chatlog'));

		messages.forEach(msg => {
			const span = msg.querySelector('.playername');
			const name = span.innerHTML.trim();

			if (mutedPlayers.includes(name)) {
				hideElement(msg);
			} else {
				displayElement(msg);

				lastMessage[id] = { user: span.innerHTML.trim(), color: span.style.color, text: getMessageText(msg, name) };

				const trIcon = msg.querySelector('.translate_icon');
				if (trIcon) {
					const muteIconId = trIcon.id.replace('logtr_table', 'mute_icon');

					if (!document.getElementById(muteIconId)) {
						const muteIcon = document.createElement('div');
						muteIcon.dataset.player = name;
						muteIcon.dataset.table = id;
						muteIcon.id = muteIconId;
						muteIcon.className = 'bgaext_chat_mute_icon';
						muteIcon.innerHTML = '<i class="fa fa-microphone-slash"></i>';
						muteIcon.onclick = (evt) => mutePlayer(config, evt);
						trIcon.parentNode.appendChild(muteIcon);
					}
				}
			}
		});

		hideMutedPlayerWriting(`is_writing_now_expl_title_table_${id}`, `is_writing_now_title_table_${id}`, `chatwindowlogstitle_content_table_${id}`);
		hideMutedPlayerWriting(`is_writing_now_expl_table_${id}`, `is_writing_now_table_${id}`, `chatwindowtitlenolink_table_${id}`);

		const previewArea = document.getElementById(`chatwindowtitlenolink_table_${id}`);
		const previewPlayerSpan = previewArea.querySelector('.playername');

		if (previewPlayerSpan) {
			if (lastMessage[id]) {
				if (previewPlayerSpan.innerHTML !== lastMessage[id].user) {
					previewPlayerSpan.innerHTML = lastMessage[id].user;
					previewPlayerSpan.style.color = lastMessage[id].color;
					previewPlayerSpan.nextSibling.nodeValue = ` ${lastMessage[id].text}`;
				}
			} else {
				previewArea.innerHTML = document.getElementById(`chatwindowlogstitle_content_table_${id}`).innerHTML;
			}
		}
	});

	const prevMessages = Array.from(document.querySelectorAll('.chatwindowpreviewmsg'));

	prevMessages.forEach(prevMsg => {
		const span = prevMsg.querySelector('.playername');
		const name = span.innerHTML.trim();

		if (mutedPlayers.includes(name)) {
			prevMsg.style.display = "none";
		}
	});
};

const initChatObserver = (config) => {
	mutedPlayers = config.getMutedPlayers();

	waitForObj('#chatbar', 5).then(chatContainer => {
		console.debug('[bga extension] init mute management', mutedPlayers);

		const observer = new MutationObserver(() => mutePlayers(config, chatContainer))
		observer.observe(chatContainer, { childList: true, subtree: true });
		return observer;
	});
};

const initLogObserver = (config) => {
	const logsContainer = document.querySelector('#logs');

	if (!logsContainer) {
		return null;
	}

	const observer = new MutationObserver(() => {
		if (!config.isOnlineMessagesEnabled()) {
			logsContainer.childNodes.forEach((elt, index) => {
				const text = elt.innerHTML;
				if (text && text.indexOf('<!--PNS-->') >= 0 && shouldFilter(text)) {
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
	const container = document.createElement('div');
	container.className = 'preference_choice';

	const row = document.createElement('div');
	row.className = 'row-data row-data-large';
	container.appendChild(row);

	const label = document.createElement('div');
	label.className = 'row-label';
	label.innerHTML = text;
	row.appendChild(label);

	const val = document.createElement('div');
	val.className = 'row-value';
	row.appendChild(val);

	const input = document.createElement('select');
	input.id = inputId;
	input.className = 'preference_control';
	input.addEventListener('click', (evt) => evt.stopPropagation());
	input.addEventListener('change', (evt) => evt.isTrusted && toggleFunc(evt));
	val.appendChild(input);

	if (inputValue === '1') {
		input.insertAdjacentHTML(
			'beforeend',
			`<option value='1' selected='selected'>${option1}</option>`,
		);
		input.insertAdjacentHTML(
			'beforeend',
			`<option value='0'>${option2}</option>`,
		);
	} else {
		input.insertAdjacentHTML(
			'beforeend',
			`<option value='1'>${option1}</option>`,
		);
		input.insertAdjacentHTML(
			'beforeend',
			`<option value='0' selected='selected'>${option2}</option>`,
		);
	}

	title.parentNode.insertBefore(container, title.nextSibling);
};

const buildOptions = (config, gameName, gameConfig) => {
	const histoInputs = [
		document.getElementById('preference_global_control_logsSecondColumn'),
		document.getElementById('preference_global_fontrol_logsSecondColumn'),
	].filter((elt) => !!elt);
	const infobulleInput = document.getElementById('preference_control_200');
	const mainMenu = document.getElementById('ingame_menu_content');
	const settings = document.getElementById('pagesection_options');

	if (!settings || !mainMenu || !infobulleInput || histoInputs.length !== 2) {
		setTimeout(() => buildOptions(config, gameName, gameConfig), 500);
		return;
	}

	const isMobile = !window.matchMedia || window.matchMedia("only screen and (max-width: 760px)").matches;
	const mainPrefTitle = mainMenu.getElementsByTagName('h2')[0];
	const secondPrefTitle = settings.getElementsByTagName('h2')[0];

	if (!isMobile) {
		// Add an option for floating menu
		const optionFloatingGameSelected = config.isGameFloatingMenu(gameName) ? `selected='selected'` : '';
		const optionFloatingAlwaysSelected = config.isGlobalFloatingMenu() ? `selected='selected'` : '';
		const optionFloatingGame = `<option value='2' ${optionFloatingGameSelected}>${chrome.i18n.getMessage('optionFloatingGame')}</option>`;
		const optionFloatingAlways = `<option value='3' ${optionFloatingAlwaysSelected}>${chrome.i18n.getMessage('optionFloatingAlways')}</option>`;
		const checkFloating = (evt) => {
			if (evt.target.value === '1') {
				document.body.classList.add('logs_on_additional_column');
			} else {
				document.body.classList.remove('logs_on_additional_column');
			}
			if (evt.target.value === '3') {
				setFloatingRightMenu(config, true);
				config.setGameFloatingMenu(gameName, false);
				config.setGlobalFloatingMenu(true);
			} else if (evt.target.value === '2') {
				setFloatingRightMenu(config, true);
				config.setGameFloatingMenu(gameName, true);
				config.setGlobalFloatingMenu(false);
			} else {
				setFloatingRightMenu(config, false);
				config.setGameFloatingMenu(gameName, false);
				config.setGlobalFloatingMenu(false);
			}
		};
		histoInputs.forEach((input) => {
			input.insertAdjacentHTML('beforeend', optionFloatingGame);
			input.insertAdjacentHTML('beforeend', optionFloatingAlways);
			input.addEventListener('change', checkFloating);
			input.addEventListener('click', (evt) => evt.stopPropagation());
		});
	}

	// Add a parameter for left menu
	if (gameConfig) {
		const displayMenu = config.isLeftMenuEnabled(gameName) ? '1' : '0';
		const toggleDisplayMenu = () => {
			const enable = !config.isLeftMenuEnabled(gameName);
			config.setLeftMenuEnabled(gameName, enable);
			buildLeftMenu(config, gameConfig, enable);
			buildLeftMenuCss(gameConfig, enable);
			document.getElementById('cde_menu_1').value = enable ? '1' : '0';
			document.getElementById('cde_menu_2').value = enable ? '1' : '0';
		};
		const displayLeftMenuText = chrome.i18n.getMessage('optionLeftMenu');
		buildOption(
			mainPrefTitle,
			displayLeftMenuText,
			'cde_menu_1',
			displayMenu,
			infobulleInput[0].text,
			infobulleInput[1].text,
			toggleDisplayMenu,
		);
		buildOption(
			secondPrefTitle,
			displayLeftMenuText,
			'cde_menu_2',
			displayMenu,
			infobulleInput[0].text,
			infobulleInput[1].text,
			toggleDisplayMenu,
		);
	}
};

const initChatIcon = (config) => {
	const chatIconId = 'bga_extension_chat_icon';

	if (!document.getElementById(chatIconId)) {
		waitForObj('.bga-friends-icon', 10).then((friendsElt) => {
			const container = friendsElt.parentNode;

			const chatElt = document.createElement('div');
			chatElt.id = chatIconId;
			chatElt.innerHTML = `<i class='fa fa-comments' style='font-size: 32px; cursor: pointer;'></i>`;
			chatElt.onclick = () => config.toggleGeneralChatHidden();
			container.parentNode.insertBefore(chatElt, container);

			const sepElt = document.createElement('div');
			sepElt.className = 'ml-1 tablet:ml-6';
			container.parentNode.insertBefore(sepElt, container);

			setChatStyle(config);
		});
	}
};

const setStyle = (id, content) => {
	const chatStyleId = id;

	let style = document.getElementById(chatStyleId);

	if (!style) {
		style = document.createElement('style');
		style.id = chatStyleId;
		document.head.appendChild(style);
	}

	style.innerHTML = content;
}

const setChatStyle = (config) => {
	setStyle('bgaext-chat-style', config.getChatStyle());
};

const setEloStyle = (config) => {
	setStyle('bgaext-elo-style', config.getEloStyle());
};

export {
	buildMainCss,
	initLogObserver,
	initChatObserver,
	refreshMutedPlayers,
	initLeftMenu,
	setFloatingRightMenu,
	initDevelopperUI,
	buildOptions,
	initGameListObserver,
	initChatIcon,
	setChatStyle,
	setEloStyle,
	initDarkMode
};
