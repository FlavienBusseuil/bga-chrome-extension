import DOMPurify from 'dompurify';
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
			extensionComment.appendChild(DOMPurify.sanitize(`${warningSymbol} ${i18n("reportCreationWarning")} ${forumLink}`, { RETURN_DOM_FRAGMENT: true, }));
			firstComment.parentNode!.insertBefore(extensionComment, firstComment.nextSibling);

			const insertComment = (text: string) => {
				const comment = document.createElement("p");
				comment.className = "text-sm text-bga-gray-78";
				comment.appendChild(DOMPurify.sanitize(text, { RETURN_DOM_FRAGMENT: true, }));
				firstComment.parentNode!.insertBefore(comment, extensionComment.nextSibling);
			};

			if (config.isCssCustomized()) {
				insertComment(i18n("reportCreationWarningCss"));
			}

			if (config.isDarkMode()) {
				insertComment(i18n("reportCreationWarningDarkMode").replace('{0}', '<i class="fa fa-moon-o"></i>'));
			}

			return;
		}
		catch (error) {
			window.location.reload();
		}
	});
};
