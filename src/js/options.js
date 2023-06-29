// @flow

import { render } from "preact";
import Options from "./ui/options";
import Configuration from "./config/configuration";

const config = new Configuration();

document.addEventListener("DOMContentLoaded", () => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	config.init().then(() => {
		render(<Options config={config} />, container);
	});
});
