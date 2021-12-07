// @flow

import {
	fetch,
	renderError,
	renderLoggedOut,
	renderTables,
	transformTables,
	transformTable,
	sort,
} from "./utils/init";

async function run(): Promise<void> {
	try {
		const result = await fetch();

		if (result.isLoggedOut) {
			return renderLoggedOut();
		}

		const { nbWaitingTables, ...rest } = result;

		const transformedTables = transformTables(rest);
		const sortedTables = sort(transformedTables);

		async function handleAcceptOrDeclineInvite({ tableId }) {
			// TODO: https://github.com/FlavienBusseuil/bga-chrome-extension/projects/1
			// console.log(tableId);
		}

		renderTables({
			tables: sortedTables,
			nbWaitingTables,
			onAcceptInvite: handleAcceptOrDeclineInvite,
			onDeclineInvite: handleAcceptOrDeclineInvite,
		});
	} catch (error) {
		// Unexpected error
		console.error(error);
		renderError({
			errorText: chrome.i18n.getMessage("something_wrong"),
			errorMessage: error.message || error,
		});
	} finally {
		// Remove loading
		document.querySelector("#loading")?.remove();
	}
}

run();
