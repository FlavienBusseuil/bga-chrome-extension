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
	const updateHiddenGameStyle = () =>
		(style.innerHTML = config.getHiddenGamesStyle(page));

	const hideGame = (name) => {
		config.hideGame(name);
		updateHiddenGameStyle();
	};

	const observer = new MutationObserver(() => {
		const buttons = document.querySelectorAll(
			'.bgabutton_blue[href*="/gamepanel?game="]',
		);

		buttons.forEach((but) => {
			const container = but.parentNode;

			if (!container.lastChild.classList.contains("bgabutton_red")) {
				but.style.minWidth = "100px";
				container.style.boxShadow = "none";

				const removeBut = document.createElement("a");
				removeBut.className =
					"bgabutton bgabutton_red bga-button-inner flex-1 truncate";
				removeBut.style.padding = "5px 0px 0px 10px";
				removeBut.style.margin = "0px 0px 0px 5px";
				removeBut.style.minWidth = "32px";
				removeBut.innerHTML =
					'<div class="flex items-center"><div class="text-center"><i class="fa fa-trash"/></div></div>';
				removeBut.onclick = () => hideGame(but.href.split("=")[1]);
				container.appendChild(removeBut);
			}
		});
	});

	observer.observe(mainElt, { childList: true, subtree: true });

	return observer;
};
