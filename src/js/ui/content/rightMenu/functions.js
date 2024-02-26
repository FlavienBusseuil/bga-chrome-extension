import React, { render } from "preact";
import RightMenu from "./RightMenu";

export const setFloatingRightMenu = (config, gameConfig, val) => {
	const pageTitle = document.getElementById("gotonexttable_wrap");
	const menuContainerId = "cde-floating-menu";

	if (!pageTitle) {
		setTimeout(() => setFloatingRightMenu(config, gameConfig, val), 100);
		return;
	}

	if (val) {
		document.body.classList.add("logs_on_floating_panel");
	} else {
		document.body.classList.remove("logs_on_floating_panel");
	}

	let container = document.getElementById(menuContainerId);

	if (container && !val) {
		container.parentNode.removeChild(container);
	}

	if (!container && val) {
		container = document.createElement("span");
		container.id = menuContainerId;
		pageTitle.parentNode.appendChild(container);
		render(<RightMenu config={config} />, container);
	}
};
