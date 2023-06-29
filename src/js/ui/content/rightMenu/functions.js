import { render } from "preact";
import RightMenu from "./RightMenu";

export const setFloatingRightMenu = (gameConfig, val) => {
	const pageTitle = document.getElementById("gotonexttable_wrap");
	const menuContainerId = "cde-floating-menu";
	const menuStyleId = "cde-floating-menu-style";

	if (!pageTitle) {
		setTimeout(() => setFloatingRightMenu(gameConfig, val), 100);
		return;
	}

	let style = document.getElementById(menuStyleId);
	let container = document.getElementById(menuContainerId);

	if (style && container && !val) {
		style.parentNode.removeChild(style);
		container.parentNode.removeChild(container);

		document.getElementById("right-side-first-part").style.maxHeight =
			"initial";
		document.getElementById("right-side-second-part").style.maxHeight =
			"initial";
	}

	if (!style && !container && val) {
		style = document.createElement("style");
		style.id = menuStyleId;
		style.innerHTML = [
			"#left-side { margin-right: 0px !important; }",
			"#right-side-first-part, #right-side-second-part { position: fixed; right: -500px;  overflow-y: auto; overflow-x: hidden; z-index: 1000; }",
			"#right-side-second-part { border: 1px solid black; outline: 1px solid white; background-color: rgb(235, 213, 189); width: 260px !important; }",
			"#cde-floating-menu { display: inline; }",
			"#logs { margin-top: 0px; max-height: 100000px; }",
			"#seemorelogs { display: none !important; }",
			"#go_to_next_table_inactive_player { margin-left: 5px }",
			".mobile_version #cde-floating-menu-log { display: none; }",
			gameConfig?.menuCss || "",
		].join(" ");
		document.head.appendChild(style);

		container = document.createElement("span");
		container.id = menuContainerId;
		pageTitle.parentNode.appendChild(container);
		render(<RightMenu />, container);
	}
};
