import React, { render } from "preact";
import Templates from "./Templates";
import { waitForObj } from '../../../utils/misc/wait';

export const initDevelopperUI = (config) => {
	if (document.getElementById("last_reports") || document.getElementById("ext_templates")) {
		// display of reports list, or templates list already displayed, nothing to do
		return;
	}

	if (window.location.search.startsWith("?id=0")) {
		// creation of a bug report
		waitForObj(".pagesection__content > p", 10).then((firstComment) => {
			console.log("[bga extension] creation of a bug report");

			try {
				const extensionComment = document.createElement("p");
				const warningSymbol = '<span style="color: red; font-size: 32px;">⚠</span>';
				const forumLink = `<a href="https://boardgamearena.com/forum/viewtopic.php?t=30509" target='_blank' class="bga-link">>> ${chrome.i18n.getMessage("reportCreationWarningLink")} <<</a>`;
				const endMessage = config.isCssCustomized() ? `<p>${chrome.i18n.getMessage("reportCreationWarningCss")}</p>` : "";
				extensionComment.innerHTML = `<p>${warningSymbol} ${chrome.i18n.getMessage("reportCreationWarning")} ${forumLink}</p> ${endMessage}`;
				firstComment.parentNode.insertBefore(extensionComment, firstComment.nextSibling);
				return;
			}
			catch (error) {
				window.location.reload();
			}
		});
		return;
	}

	const butStatus = document.getElementById("change_bug_status_awaiting") || document.getElementById("change_bug_status_open");
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

		const reportName = document.getElementById("report_game_table").firstChild.innerText;
		const pos = reportName.lastIndexOf("#");
		const gameName = reportName.substring(0, pos - 1).trim();

		console.log(`[bga extension] this is a report for '${gameName}'`);

		render(<Templates config={config} gameName={gameName} />, container);
	}
};
