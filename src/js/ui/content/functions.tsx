import { render } from "preact";
import { isMobile } from "is-mobile";

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
import InformationPopup from './misc/InformationPopup';
import { waitForObj } from '../../utils/misc/wait';
import shouldFilter from '../../config/filteredLogs';
import { i18n } from "../../utils/browser/i18n";
import type Configuration from "~/js/config/configuration";
import type { Game as GameConfig } from "~/js/config/models";

const buildMainCss = (code: string) => {
	waitForObj('head').then(() => {
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
		#logs .log.hidden { display: none !important; }
		${code}
		`;
	});
};

let mutedPlayers: string[] = [];
interface LastMessage {
	user: string;
	color: string;
	text: string | null;
}

let lastMessage: Record<string, LastMessage> = {};

const mutePlayer = (config: Configuration, evt: MouseEvent) => {
	let elt = evt.target as HTMLElement;
	let playerName: string | undefined, tableId: string | undefined;

	for (let i = 0; i < 10 && !playerName; i++) {
		playerName = elt?.dataset?.player;
		tableId = elt?.dataset?.table;
		elt = elt?.parentNode as HTMLElement;
	}

	const doMute = () => {
		if (!playerName || !tableId) {
			console.error(`[bga extension] trying to mute invalid player ${playerName}`, tableId, elt); // should never happen
			return
		}

		console.info(`[bga extension] Mute player ${playerName}`, mutedPlayers);
		config.mutePlayer(playerName);

		if (config.isMuteWarning()) {
			const msg = `${playerName} has been muted, I will no longer receive their messages. \n[Feature provided by: https://en.doc.boardgamearena.com/ChromeExtension]`;
			const endPoint = `/table/table/say.html`;
			const key = new Date().getTime();
			const body = new URLSearchParams({ table: tableId, msg, noerrortracking: 'true', "dojo.preventCache": key.toString() }).toString();
			const detail = JSON.stringify({ method: 'POST', endPoint, key, body, type: 'say' });
			document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
		}
	};

	const popupConfig = config.getPopupConfiguration();

	if (!popupConfig.muteWarning) {
		doMute();
	} else {
		const container = document.createElement('div');
		container.id = "bgaext_popup_container";
		document.body.appendChild(container);

		const close = () => {
			container.remove();
		}
		const confirm = (stopWarn: boolean) => {
			if (stopWarn) {
				popupConfig.muteWarning = false;
				config.setPopupConfiguration(popupConfig);
			}
			doMute();
			close();
		};

		render(<ConfirmationPopup type='mute_player' confirm={confirm} cancel={close} config={config} />, container);
	}
};

const displayInformationPopup = (config: Configuration) => {
	const popupConfig = config.getPopupConfiguration();

	if (popupConfig?.infosDialog === "off") {
		return;
	}

	const now = new Date().getTime();
	const showDate = parseInt(popupConfig.infosDialog || '0', 10);

	if (showDate > now) {
		//console.log("pas maintenant " + new Date(showDate));
		return;
	}

	popupConfig.infosDialog = `${now + 8 * 60 * 60 * 1000}`;
	config.setPopupConfiguration(popupConfig);

	const container = document.createElement('div');
	container.id = "bgaext_popup_container";
	document.body.appendChild(container);

	const close = () => {
		popupConfig.infosDialog = "off";
		config.setPopupConfiguration(popupConfig);
		container.remove();
	}
	const later = () => {
		container.remove();
	};

	render(<InformationPopup later={later} close={close} />, container);
};

const refreshMutedPlayers = (config: Configuration) => {
	const chatContainer = document.querySelector('#chatbar');

	mutedPlayers = config.getMutedPlayers();
	if (chatContainer) {
		muteChatAll(config, chatContainer);
	}
};

const hideElement = (elt: Element) => {
	if (!elt.classList.contains('bgaext_chat_hidden')) {
		elt.classList.add('bgaext_chat_hidden');
	}
	if (elt.classList.contains('bgaext_chat_visible')) {
		elt.classList.remove('bgaext_chat_visible');
	}
};

const displayElement = (elt: Element, force?: boolean) => {
	if (elt.classList.contains('bgaext_chat_hidden')) {
		elt.classList.remove('bgaext_chat_hidden');
	}
	if (force && !elt.classList.contains('bgaext_chat_visible')) {
		elt.classList.add('bgaext_chat_visible');
	}
};

const hideMutedPlayerWriting = (writingSpanId: string, writingAreaId: string, titleAreaId: string) => {
	const writingSpan = document.getElementById(writingSpanId);
	const writingArea = document.getElementById(writingAreaId);
	const titleArea = document.getElementById(titleAreaId);

	if (!writingSpan || !writingArea || !titleArea) {
		console.error('[bga extension] hideMutedPlayerWriting: missing elements', { writingSpan, writingArea, titleArea }); // should not happen
		return;
	}

	if (writingArea.style.display === 'none' || !writingSpan?.innerHTML || mutedPlayers.find(name => writingSpan.innerHTML.indexOf(name) >= 0)) {
		hideElement(writingArea);
		displayElement(titleArea, true);
	} else {
		displayElement(writingArea, true);
		hideElement(titleArea);
	}
};

const getMessageText = (container: Element, name: string): string | null => {
	if (container.nodeName === "#text" && container.nodeValue !== name) {
		return container.nodeValue;
	}
	return Array.from(container.childNodes).map((node: ChildNode) => getMessageText(node as Element, name)).find(v => Boolean(v))?.trim() || null;
};

const muteChatMessage = (config: Configuration, tableId: string, msg: Element) => {
	try {
		const span = msg.querySelector('.playername') as HTMLElement;
		const name = span.innerHTML.trim();

		if (mutedPlayers.includes(name)) {
			hideElement(msg);
		} else {
			displayElement(msg);

			lastMessage[tableId] = { user: span.innerHTML.trim(), color: span.style.color, text: getMessageText(msg, name) };

			const trIcon = msg.querySelector('.translate_icon');
			if (trIcon) {
				const muteIconId = trIcon.id.replace('logtr_table', 'mute_icon');

				if (!document.getElementById(muteIconId)) {
					const muteIcon = document.createElement('div');
					muteIcon.dataset.player = name;
					muteIcon.dataset.table = tableId;
					muteIcon.id = muteIconId;
					muteIcon.className = 'bgaext_chat_mute_icon';
					muteIcon.innerHTML = '<i class="fa fa-microphone-slash"></i>';
					muteIcon.onclick = (evt) => mutePlayer(config, evt);
					trIcon.parentNode?.appendChild(muteIcon);
				}
			}
		}
	}
	catch (error) {
		console.warn("[bga extension] Can't process chat message", { message: msg.outerHTML, error });
	}
};

const playPlop = () => {
	const extAudioTag = document.getElementById('ext_audiosrc_o_alt_Plop') as HTMLAudioElement | null;
	const volumeTag = document.getElementById('soundVolumeControl') as HTMLInputElement | null;
	const volumeValue = volumeTag ? parseFloat(volumeTag.value) / 100 : 0.5

	if (extAudioTag) {
		extAudioTag.volume = volumeValue;
		extAudioTag.play();
	}
};

const muteChatTable = (config: Configuration, chatTable: Element) => {
	try {
		const id = chatTable.id.split('_').pop() as string;
		const messages = Array.from(chatTable.querySelectorAll('.chatlog'));

		const prevLastMessage = lastMessage[id] || { user: '', color: '', text: '' };
		messages.forEach(msg => muteChatMessage(config, id, msg));
		const newLastMessage = lastMessage[id] || { user: '', color: '', text: '' };

		hideMutedPlayerWriting(`is_writing_now_expl_title_table_${id}`, `is_writing_now_title_table_${id}`, `chatwindowlogstitle_content_table_${id}`);
		hideMutedPlayerWriting(`is_writing_now_expl_table_${id}`, `is_writing_now_table_${id}`, `chatwindowtitlenolink_table_${id}`);

		const previewArea = document.getElementById(`chatwindowtitlenolink_table_${id}`) as HTMLElement;
		const previewPlayerSpan = previewArea?.querySelector('.playername') as HTMLElement | null;

		if (previewPlayerSpan) {
			if (lastMessage[id]) {
				if (previewPlayerSpan.innerHTML !== lastMessage[id].user) {
					previewPlayerSpan.innerHTML = lastMessage[id].user;
					previewPlayerSpan.style.color = lastMessage[id].color;
					if (previewPlayerSpan.nextSibling) {
						previewPlayerSpan.nextSibling.nodeValue = ` ${lastMessage[id].text}`;
					}
				}
			} else {
				previewArea.innerHTML = document.getElementById(`chatwindowlogstitle_content_table_${id}`)!.innerHTML;
			}
		}

		return (prevLastMessage.text !== newLastMessage.text || prevLastMessage.user !== newLastMessage.user);
	}
	catch (error) {
		console.warn("[bga extension] Can't process chat table", { table: chatTable.id, error });
		return false;
	}
};

const muteChatAll = (config: Configuration, chatContainer: Element) => {
	try {
		const audioTag = document.getElementById('audiosrc_o_alt_Plop') as HTMLAudioElement | null;
		if (audioTag) {
			audioTag.muted = true;
		}

		const tables = Array.from(chatContainer.querySelectorAll('.chatwindowtype_table'));
		let shouldPlayPlop = false;

		tables.forEach(t => shouldPlayPlop = muteChatTable(config, t) || shouldPlayPlop);

		const prevMessages = Array.from(document.querySelectorAll('.chatwindowpreviewmsg') as NodeListOf<HTMLElement>);

		prevMessages.forEach(prevMsg => {
			const span = prevMsg.querySelector('.playername');

			if (span) {
				const name = span.innerHTML.trim();

				if (mutedPlayers.includes(name)) {
					prevMsg.style.display = "none";
				}
			}
		});

		if (shouldPlayPlop) {
			setTimeout(playPlop, 1);
		}
	}
	catch (error) {
		console.warn("[bga extension] Can't process chat conversations", error);
	}
};

let chatbarObserver: MutationObserver | undefined;
let audiosourcesObserver: MutationObserver | undefined;

const initChatObserver = (config: Configuration) => {
	mutedPlayers = config.getMutedPlayers();

	waitForObj('#chatbar').then(chatContainer => {
		console.debug('[bga extension] init mute management', mutedPlayers);

		try {
			if (chatbarObserver) {
				chatbarObserver.disconnect();
			}
		} catch (error) {
			console.warn(`[bga extension] can't disconnect previous chatbar observer`);
		}

		chatbarObserver = new MutationObserver(() => muteChatAll(config, chatContainer));
		chatbarObserver.observe(chatContainer, { childList: true, subtree: true });
	});

	waitForObj('#audiosources').then(audioContainer => {
		try {
			if (audiosourcesObserver) {
				audiosourcesObserver.disconnect();
			}
		} catch (error) {
			console.warn(`[bga extension] can't disconnect previous audiosources observer`);
		}

		audiosourcesObserver = new MutationObserver(() => {
			const audioTag = document.getElementById('audiosrc_o_alt_Plop') as HTMLAudioElement | null;
			let extAudioTag = document.getElementById('ext_audiosrc_o_alt_Plop') as HTMLAudioElement | null;

			if (audioTag) {
				audioTag.muted = true;
				audioTag.volume = 0;

				if (!extAudioTag) {
					extAudioTag = document.createElement('audio') as HTMLAudioElement;
					extAudioTag.src = audioTag.src;
					extAudioTag.id = 'ext_audiosrc_o_alt_Plop';
					audioContainer.appendChild(extAudioTag);
				}
			}
		});
		audiosourcesObserver.observe(audioContainer, { childList: true, subtree: true });
	});
};

let titleObserver: MutationObserver | undefined;

const initTitleObserver = () => {
	stopTitleObserver();

	titleObserver = new MutationObserver(() => {
		if (["◢", "◣", "◣", "◤"].includes(document.title.substring(0, 1))) {
			document.title = document.title.substring(2);
		}
	});
	const title = document.querySelector("title");
	if (title) titleObserver.observe(title, { childList: true, subtree: false });
};

const stopTitleObserver = () => {
	if (titleObserver) {
		titleObserver.disconnect();
		titleObserver = undefined;
	}
};

const initLogObserver = (config: Configuration) => {
	const logsContainer = document.querySelector('#logs');

	if (!logsContainer) {
		return null;
	}

	const observer = new MutationObserver(() => {
		if (!config.isOnlineMessagesEnabled()) {
			const elements = document.querySelectorAll('#logs .log:not(.hidden)');

			elements.forEach((elt, index) => {
				const text = elt.innerHTML;
				if (text && text.indexOf('<!--PNS-->') >= 0 && shouldFilter(text)) {
					elt.classList.add('hidden');
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

export const initGamePanelObserver = () => {
	const gaminfoElt = document.querySelector(".block-panel-gaminfo");

	if (!gaminfoElt) {
		return null;
	}

	const updateOngoingGameCount = () => {
		const counterId = "in_progress_games_count";

		const ongoingGameCount = gaminfoElt.querySelectorAll('.bga-table-list-item').length;
		let counter = document.querySelector(`#${counterId}`);

		if (!counter) {
			const titleContainer = gaminfoElt.querySelector('.bga-page-section__title');
			if (!titleContainer) {
				return;
			}

			counter = document.createElement("span");
			counter.id = counterId;
			titleContainer.appendChild(counter);
		}

		counter.textContent = `(${ongoingGameCount})`;
	}

	const observer = new MutationObserver(updateOngoingGameCount);
	updateOngoingGameCount();
	return observer;
};

const buildOption = (
	title: HTMLElement,
	text: string,
	inputId: string,
	inputValue: string,
	option1: string,
	option2: string,
	toggleFunc: (evt: Event) => void,
): void => {
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

	title.parentNode!.insertBefore(container, title.nextSibling);
};

const buildOptions = (config: Configuration, gameName: string, gameConfig?: GameConfig) => {
	const histoInputs = [
		document.getElementById('preference_global_control_logsSecondColumn'),
		document.getElementById('preference_global_fontrol_logsSecondColumn'),
	].filter((elt) => !!elt);
	const infobulleInput = document.getElementById('preference_control_200') as HTMLSelectElement | null;
	const mainMenu = document.getElementById('ingame_menu_content');
	const settings = document.getElementById('pagesection_options');

	if (!settings || !mainMenu || !infobulleInput || histoInputs.length !== 2) {
		setTimeout(() => buildOptions(config, gameName, gameConfig), 500);
		return;
	}

	const mainPrefTitle = mainMenu.getElementsByTagName('h2')[0] as HTMLHeadingElement;
	const secondPrefTitle = settings.getElementsByTagName('h2')[0] as HTMLHeadingElement;

	if (!isMobile()) {
		// Add an option for floating menu
		const optionFloatingGameSelected = config.isGameFloatingMenu(gameName) ? `selected='selected'` : '';
		const optionFloatingAlwaysSelected = config.isGlobalFloatingMenu() ? `selected='selected'` : '';
		const optionFloatingGame = `<option value='2' ${optionFloatingGameSelected}>${i18n('optionFloatingGame')}</option>`;
		const optionFloatingAlways = `<option value='3' ${optionFloatingAlwaysSelected}>${i18n('optionFloatingAlways')}</option>`;
		const checkFloating = (evt: Event) => {
			const value = (evt.target as HTMLSelectElement | null)?.value;

			if (value === '1') {
				document.body.classList.add('logs_on_additional_column');
			} else {
				document.body.classList.remove('logs_on_additional_column');
			}
			if (value === '3') {
				setFloatingRightMenu(config, true);
				config.setGameFloatingMenu(gameName, false);
				config.setGlobalFloatingMenu(true);
			} else if (value === '2') {
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
	if (gameConfig && !config.isLeftBarOptionHidden()) {
		const displayMenu = config.isLeftMenuEnabled(gameName) ? '1' : '0';
		const toggleDisplayMenu = () => {
			const enable = !config.isLeftMenuEnabled(gameName);
			config.setLeftMenuEnabled(gameName, enable);
			buildLeftMenu(config, gameConfig, enable);
			buildLeftMenuCss(gameConfig, enable);

			(document.getElementById('cde_menu_1') as HTMLSelectElement).value = enable ? '1' : '0';
			(document.getElementById('cde_menu_2') as HTMLSelectElement).value = enable ? '1' : '0';
		};
		const displayLeftMenuText = i18n('optionLeftMenu');
		buildOption(
			mainPrefTitle,
			displayLeftMenuText,
			'cde_menu_1',
			displayMenu,
			infobulleInput[0]!.textContent as string,
			infobulleInput[1]!.textContent as string,
			toggleDisplayMenu,
		);
		buildOption(
			secondPrefTitle,
			displayLeftMenuText,
			'cde_menu_2',
			displayMenu,
			infobulleInput[0]!.textContent as string,
			infobulleInput[1]!.textContent as string,
			toggleDisplayMenu,
		);
	}
};

const initChatIcon = (config: Configuration) => {
	const chatIconId = 'bga_extension_chat_icon';

	if (!document.getElementById(chatIconId)) {
		waitForObj('.bga-friends-icon').then((friendsElt) => {
			const container = friendsElt.parentNode;

			const chatElt = document.createElement('div');
			chatElt.id = chatIconId;
			chatElt.innerHTML = `<i class='fa fa-comments' style='font-size: 32px; cursor: pointer;'></i>`;
			chatElt.onclick = () => config.toggleGeneralChatHidden();
			container!.parentNode?.insertBefore(chatElt, container);

			const sepElt = document.createElement('div');
			sepElt.className = 'ml-1 tablet:ml-6';
			container!.parentNode?.insertBefore(sepElt, container);

			setChatStyle(config);
		});
	}
};

const setStyle = (id: string, content: string) => {
	const chatStyleId = id;

	let style = document.getElementById(chatStyleId);

	if (!style) {
		style = document.createElement('style');
		style.id = chatStyleId;
		document.head.appendChild(style);
	}

	style.innerHTML = content;
}

const setChatStyle = (config: Configuration) => {
	setStyle('bgaext-chat-style', config.getChatStyle());
};

const setEloStyle = (config: Configuration) => {
	setStyle('bgaext-elo-style', config.getEloStyle());
};

export {
	buildMainCss,
	initLogObserver,
	initChatObserver,
	initTitleObserver,
	stopTitleObserver,
	refreshMutedPlayers,
	initLeftMenu,
	setFloatingRightMenu,
	initDevelopperUI,
	buildOptions,
	initGameListObserver,
	initChatIcon,
	setChatStyle,
	setEloStyle,
	initDarkMode,
	displayInformationPopup
};
