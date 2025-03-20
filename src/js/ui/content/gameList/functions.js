import React, { render } from "preact";
import ConfirmationPopup from "../misc/ConfirmationPopup";

const createHiddenGameStyle = (content) => {
	const hiddenStyleId = "cde-hidden-games-style";

	let style = document.getElementById(hiddenStyleId);

	if (!style) {
		style = document.createElement("style");
		style.id = hiddenStyleId;
		document.head.appendChild(style);
	}

	style.innerHTML = content;
	return style;
};

let pageNotFoundError = false;
let links = [];
let lastLink = undefined;

const linkClick = (evt) => {
	let elt = evt.target;
	let loop = 0;

	while (!elt.href && loop < 10) {
		elt = elt.parentNode;
		++loop;
	}

	if (elt.href) {
		lastLink = elt.href;
		console.debug(`[bga extension] click on ${lastLink}`);
	}
};

export const initGameListObserver = (config, page) => {
	const mainElt = document.querySelector("#overall-content");

	if (!mainElt) {
		return null;
	}

	const style = createHiddenGameStyle(config.getHiddenGamesStyle(page));
	const updateHiddenGameStyle = () => (style.innerHTML = config.getHiddenGamesStyle(page));

	const hideGame = (name) => {
		if (localStorage.getItem("ext_delete_warning") === "off") {
			config.hideGame(name);
			updateHiddenGameStyle();
		} else {
			const container = document.createElement('div');
			container.id = "bgaext_popup_container";
			document.body.appendChild(container);

			const close = () => {
				container.remove();
			}
			const confirm = (stopWarn) => {
				if (stopWarn) {
					localStorage.setItem("ext_delete_warning", "off");
				}
				config.hideGame(name);
				updateHiddenGameStyle();
				close();
			};

			render(<ConfirmationPopup type='delete_game' confirm={confirm} cancel={close} config={config} />, container);
		}
	};

	const quickStart = (evt) => {
		evt.stopPropagation();

		const startGame = () => {
			const gameId = evt.target.id.split('_').pop();

			if (gameId) {
				let obj = evt.target;
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
					obj = obj.parentNode;
				}

				const key = new Date().getTime();
				const endPoint = `/table/table/createnew.html?game=${gameId}&gamemode=${gameMode}&forceManual=true&is_meeting=false&dojo.preventCache=${key}`;
				const detail = JSON.stringify({ method: 'GET', endPoint, key, type: 'createnew' });
				document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));
			}
		};

		if (localStorage.getItem("ext_fast_start_warning") === "off") {
			startGame();
		} else {
			const container = document.createElement('div');
			container.id = "bgaext_popup_container";
			document.body.appendChild(container);

			const close = () => {
				container.remove();
			}
			const confirm = (stopWarn) => {
				if (stopWarn) {
					localStorage.setItem("ext_fast_start_warning", "off");
				}
				startGame();
				close();
			};

			render(<ConfirmationPopup type='fast_create' confirm={confirm} cancel={close} config={config} />, container);
		}
	};

	const observer = new MutationObserver(() => {
		// attempt to fix "Page not found" bug => start

		const infoMsg = Array.from(document.querySelectorAll('.head_infomsg_item'));

		if (!pageNotFoundError && infoMsg.find(info => info.innerHTML.startsWith('Page not found'))) {
			console.log(`[bga extension] page not found error, navigate to ${lastLink}`);
			pageNotFoundError = true;
			observer.disconnect();
			window.location.replace(lastLink);
			return;
		}

		links.forEach(l => l.removeEventListener("click", linkClick));
		links = document.querySelectorAll('[href]');
		links.forEach(l => l.addEventListener("click", linkClick));

		// attempt to fix "Page not found" bug => end

		const gameButtons = document.querySelectorAll('[href^="/gamepanel?game="]');

		gameButtons.forEach(but => {
			if (but.classList.contains('bgabutton_blue') || but.classList.contains('bga-button--blue')) {
				const container = but.parentNode;

				if (!but.classList.contains('bgabutton_medium') && but.href.indexOf('#') < 0 && !container.lastChild.classList?.contains('bgabutton_red')) {
					but.style.minWidth = "100px";
					container.style.boxShadow = "none";

					const removeBut = document.createElement("a");
					removeBut.className = "ext_delete_button bgabutton bgabutton_red bga-button-inner flex-1 truncate";
					removeBut.style.padding = "5px 0px 0px 10px";
					removeBut.style.margin = "0px 0px 0px 5px";
					removeBut.style.minWidth = "32px";
					removeBut.innerHTML = '<div class="flex items-center"><div class="text-center"><i class="fa fa-trash"/></div></div>';
					removeBut.onclick = () => hideGame(but.href.split("=")[1]);
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

		const startButtons = document.querySelectorAll('a[id^="joingame_create_"]');

		startButtons.forEach(but => {
			const container = but.parentNode;
			const id = but.id.replace('join', 'quick');

			if (!document.getElementById(id)) {
				const quickBut = document.createElement("a");
				quickBut.id = id;
				quickBut.className = "bgabutton bgabutton_blue";
				quickBut.style.display = "inline-block";
				quickBut.style.marginRight = "4px";
				quickBut.innerHTML = `${but.innerHTML}&nbsp;<i class="fa fa-bolt"></i>`;
				quickBut.addEventListener("click", quickStart);
				container.insertBefore(quickBut, but);

				but.innerHTML = `${but.innerHTML}&nbsp;<i class="fa fa-gear"></i>`;
			}
		});
	});

	observer.observe(mainElt, { childList: true, subtree: true });

	return observer;
};