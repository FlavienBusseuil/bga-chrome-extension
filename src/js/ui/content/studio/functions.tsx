import { waitForObj } from '../../../utils/misc/wait';
import { i18n } from "../../../utils/browser/i18n";
import type Configuration from "../../../config/configuration";

export const initBugMessage = (config: Configuration) => {
	// creation of a bug report
	waitForObj("section > p", 1000).then((firstComment) => {
		console.log("[bga extension] creation of a bug report");

		try {
			const extensionComment = document.createElement("p");
			const warningSymbol = '<span class="text-red-800" style="font-size: 32px;">⚠</span>';
			const forumLink = `<a href="https://boardgamearena.com/forum/viewtopic.php?t=30509" target='_blank' class="bga-link">>> ${i18n("reportCreationWarningLink")} <<</a>`;
			extensionComment.className = "text-sm text-bga-gray-78";
			extensionComment.innerHTML = `${warningSymbol} ${i18n("reportCreationWarning")} ${forumLink}`;
			firstComment.parentNode!.insertBefore(extensionComment, firstComment.nextSibling);

			if (config.isCssCustomized()) {
				const cssComment = document.createElement("p");
				cssComment.className = "text-sm text-bga-gray-78";
				cssComment.innerHTML = `${i18n("reportCreationWarningCss")}`;
				firstComment.parentNode!.insertBefore(cssComment, extensionComment.nextSibling);
			}

			return;
		}
		catch (error) {
			window.location.reload();
		}
	});
};
