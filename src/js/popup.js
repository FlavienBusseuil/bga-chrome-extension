import {
  fetch,
  renderError,
  renderLoggedOut,
  renderTables,
  transformTables,
  transformTable,
  sort,
} from "./utils/init";
import { fetchTableInfo } from "./utils/fetchTableInfo";

import {
  debug,
  acceptedInviteTable,
} from "../../marketplace/mock/fixtures/debug";

async function run() {
  try {
    const { isLoggedOut, nbWaitingTables, ...rest } = await fetch();

    if (isLoggedOut) {
      return renderLoggedOut();
    }

    const transformedTables = debug.tables; // transformTables(rest);
    const sortedTables = sort(transformedTables);

    async function handleAcceptOrDeclineInvite({ tableId }) {
      console.log(tableId);
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
    document.querySelector("#loading").remove();
  }
}

run();
