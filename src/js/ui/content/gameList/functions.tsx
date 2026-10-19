import { render } from "preact";

import { locationChangeManager } from '../../../utils/misc/locationChangeManager';
import type Configuration from "../../../config/configuration";
import ConfirmationPopup from "../misc/ConfirmationPopup";
import { manageStartButton } from "../misc/functions";

const createHiddenGameStyle = (content: string) => {
	const hiddenStyleId = "cde-hidden-games-style";

	let style = document.getElementById(hiddenStyleId);

	if (!style) {
		style = document.createElement("style");
		style.id = hiddenStyleId;
		document.head.appendChild(style);
	}

	style.textContent = content;
	return style;
};

let pageNotFoundError = false;
let lastLink: string | undefined;
let linkListenerAdded = false;

const findClickableParent = (element: HTMLElement, maxDepth = 10): HTMLAnchorElement | null => {
	let current = element;
	let depth = 0;

	while (current && !('href' in current) && depth < maxDepth) {
		current = current.parentNode as HTMLElement;
		depth++;
	}

	return current && 'href' in current ? current as HTMLAnchorElement : null;
};

const linkClick = (evt: MouseEvent): void => {
	// only a plain left click navigates in this tab (no new tab / window)
	if (evt.button !== 0 || evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey) {
		return;
	}

	const target = evt.target as HTMLElement;
	const clickableElement = findClickableParent(target);

	if (!clickableElement?.href || (clickableElement.target && clickableElement.target !== '_self')) {
		return;
	}

	let url: URL;
	try {
		url = new URL(clickableElement.href);
	} catch (error) {
		return;
	}

	// external links (and javascript: links) are not BGA pages
	if (url.origin !== window.location.origin) {
		return;
	}

	lastLink = url.href;
	console.debug('[bga extension] click on', lastLink);
	locationChangeManager.setCurrentLocation(url.pathname);
};

export const initGameListObserver = (config: Configuration, page: string) => {
	const mainElt = document.querySelector("#overall-content");

	if (!mainElt) {
		return null;
	}

	if (!linkListenerAdded) {
		// a single listener for the whole document (capture phase: called even if BGA stops the propagation)
		linkListenerAdded = true;
		document.addEventListener("click", linkClick, true);
	}

	const style = createHiddenGameStyle(config.getHiddenGamesStyle(page));
	const updateHiddenGameStyle = () => (style.textContent = config.getHiddenGamesStyle(page));

	const hideGame = (name: string) => {
		const popupConfig = config.getPopupConfiguration();

		if (!popupConfig.deleteWarning) {
			config.hideGame(name);
			updateHiddenGameStyle();
		} else {
			const container = document.createElement('div');
			container.id = "bgaext_popup_container";
			document.body.appendChild(container);

			const close = () => {
				container.remove();
			}
			const confirm = (stopWarn: boolean) => {
				if (stopWarn) {
					popupConfig.deleteWarning = false;
					config.setPopupConfiguration(popupConfig);
				}
				config.hideGame(name);
				updateHiddenGameStyle();
				close();
			};

			render(<ConfirmationPopup type='delete_game' confirm={confirm} cancel={close} config={config} />, container);
		}
	};

	const quickStart = (evt: MouseEvent) => {
		evt.stopPropagation();

		const startGame = () => {
			const target = evt.target as HTMLElement | null;
			const gameId = target?.id.split('_').pop();

			if (gameId) {
				console.debug(`[bga extension] Create table for game ${gameId}`);
				let obj = target as HTMLElement;
				let gameMode = 'realtime';

				for (let i = 0; i < 10; i++) {
					const classes = Array.from(obj.classList);
					if (classes.includes('gametable_status_asyncinit')) {
						gameMode = 'async';
						break;
					}
					if (classes.includes('gametable_status_init')) {
						gameMode = 'realtime';
						break;
					}
					obj = obj.parentNode as HTMLElement;
				}

				const key = new Date().getTime();
				const endPoint = `/table/table/createnew.html?game=${gameId}&gamemode=${gameMode}&forceManual=true&is_meeting=false&dojo.preventCache=${key}`;
				const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'createnew' });
				document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
			}
		};

		const popupConfig = config.getPopupConfiguration();

		if (!popupConfig.fastStartWarning) {
			startGame();
		} else {
			const container = document.createElement('div');
			container.id = "bgaext_popup_container";
			document.body.appendChild(container);

			const close = () => {
				container.remove();
			}
			const confirm = (stopWarn: boolean) => {
				if (stopWarn) {
					popupConfig.fastStartWarning = false;
					config.setPopupConfiguration(popupConfig);
				}
				startGame();
				close();
			};

			render(<ConfirmationPopup type='fast_create' confirm={confirm} cancel={close} config={config} />, container);
		}
	};

	const observer = new MutationObserver(() => {
		// automatic click on start button to start the game
		if (config.autoClickStart()) {
			manageStartButton(mainElt);
		}

		// attempt to fix "Page not found" bug => start
		const infoMsg = Array.from(document.querySelectorAll('.head_infomsg_item'));

		if (!pageNotFoundError && infoMsg.find(info => info.innerHTML.startsWith('Page not found')) && lastLink) {
			console.log(`[bga extension] page not found error, navigate to ${lastLink}`);
			pageNotFoundError = true;
			observer.disconnect();
			window.location.replace(lastLink);
			return;
		}

		// attempt to fix "Page not found" bug => end

		const gameButtons = document.querySelectorAll('[href^="/gamepanel?game="]') as NodeListOf<HTMLAnchorElement>;

		gameButtons.forEach(but => {
			if (but.classList.contains('bgabutton_blue') || but.classList.contains('bga-button--blue')) {
				const container = but.parentNode as HTMLElement;

				if (config.isHideGameButtonDisplayed() && !but.classList.contains('bgabutton_medium') && but.href.indexOf('#') < 0 && !(container?.lastChild as HTMLElement).classList.contains('bgabutton_red')) {
					but.style.minWidth = "100px";
					container!.style.boxShadow = "none";

					const removeBut = document.createElement("a");
					removeBut.className = "ext_delete_button bgabutton bgabutton_red bga-button-inner flex-1 truncate";
					removeBut.style.padding = "5px 0px 0px 10px";
					removeBut.style.margin = "0px 0px 0px 5px";
					removeBut.style.minWidth = "32px";
					removeBut.onclick = () => hideGame(but.href.split("=")[1] as string);

					const flexDiv = document.createElement('div');
					flexDiv.className = 'flex items-center';
					const centerDiv = document.createElement('div');
					centerDiv.className = 'text-center';
					const icon = document.createElement('i');
					icon.className = 'fa fa-trash';
					centerDiv.append(icon);
					flexDiv.append(centerDiv);

					removeBut.replaceChildren(flexDiv);
					container.appendChild(removeBut);
				}
			} else if (config.isLobbyRedirectionEnable()) {
				const url = `${but.href}`;
				const pos = url.indexOf('&table=');
				if (pos > 0) {
					const table = url.substring(pos + 7);
					but.href = `/table?table=${table}&nr=true`;
				}
			}
		});

		if (config.isFastCreateEnable()) {
			const startButtons = document.querySelectorAll('a[id^="joingame_create_"]');

			startButtons.forEach(but => {
				const container = but.parentNode;
				const id = but.id.replace('join', 'quick');

				if (!document.getElementById(id)) {
					const quickBut = document.createElement("a");
					quickBut.id = id;
					quickBut.className = "bgabutton bgabutton_blue";
					quickBut.style.display = "inline";
					quickBut.style.marginRight = "4px";
					quickBut.textContent = but.textContent;
					quickBut.addEventListener("click", quickStart);
					container!.insertBefore(quickBut, but);

					const boltSpace = document.createTextNode('\u00A0');
					const boltIcon = document.createElement('i');
					boltIcon.className = 'fa fa-bolt';
					quickBut.append(boltSpace, boltIcon);

					const space = document.createTextNode('\u00A0');
					const icon = document.createElement('i');
					icon.className = 'fa fa-gear';
					but.append(space, icon);
				}
			});
		}
	});

	observer.observe(mainElt, { childList: true, subtree: true });

	return observer;
};