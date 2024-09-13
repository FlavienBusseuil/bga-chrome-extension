import React, { render } from "preact";
import ConfirmationPopup from "./ConfirmationPopup";

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

			render(<ConfirmationPopup confirm={confirm} cancel={close} />, container);
		}
	};

	const observer = new MutationObserver(() => {
		const infoMsg = Array.from(document.querySelectorAll('.head_infomsg_item'));

		if (infoMsg.find(info => info.innerHTML.startsWith('Page not found'))) {
			console.log("[bga extension] Page not found error");
			window.history.back();
			window.location.reload();
			return;
		}

		const buttons = document.querySelectorAll('[href*="/gamepanel?game="]');

		buttons.forEach(but => {
			if (but.classList.contains('bgabutton_blue') || but.classList.contains('bga-button--blue')) {
				const container = but.parentNode;

				if (!but.classList.contains('bgabutton_medium') && !container.lastChild.classList?.contains('bgabutton_red')) {
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
	});

	observer.observe(mainElt, { childList: true, subtree: true });

	return observer;
};