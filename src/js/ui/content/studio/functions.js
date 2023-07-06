import React, { render } from "preact";
import Templates from "./Templates";

export const initDevelopperUI = (config) => {
	if (
		document.getElementById("last_reports") ||
		document.getElementById("ext_templates")
	) {
		// display of reports list, or templates list already displayed, nothing to do
		return;
	}

	const butStatus =
		document.getElementById("change_bug_status_awaiting") ||
		document.getElementById("change_bug_status_open");
	const reportArea = document.getElementById("report_log");

	if (!butStatus || !reportArea || !reportArea.getBoundingClientRect().x) {
		console.log("[bga extension] page is loading...");
		setTimeout(() => initDevelopperUI(config), 100);
		return;
	}

	if (butStatus.getBoundingClientRect().x) {
		// the button 'awaiting' is displayed, we are a developper
		console.log("[bga extension] developper mode !");

		const container = document.createElement("div");
		container.id = "ext_templates";
		reportArea.parentNode.insertBefore(container, reportArea);

		const reportName =
			document.getElementById("report_game_table").firstChild.innerText;
		const pos = reportName.lastIndexOf("#");
		const gameName = reportName.substring(0, pos - 1).trim();

		console.log(`[bga extension] this is a report for '${gameName}'`);

		render(<Templates config={config} gameName={gameName} />, container);
	}
};
