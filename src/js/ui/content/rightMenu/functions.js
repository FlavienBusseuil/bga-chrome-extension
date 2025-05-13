import React, { render } from "preact";
import RightMenu from "./RightMenu";
import { waitForObj } from '../../../utils/misc/wait';

export const setFloatingRightMenu = (config, val) => {
	const menuContainerId = "cde-floating-menu";

	waitForObj('#gotonexttable_wrap', 1000).then((pageTitle) => {
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
	})
};
