import {
  fetch,
  renderError,
  renderLoggedOut,
  renderTables,
  transform,
  sort,
} from "./utils/init";

import { debug } from "../../marketplace/mock/fixtures";

async function run() {
  try {
    const { isLoggedOut, nbWaitingTables, ...rest } = await fetch();

    if (isLoggedOut) {
      return renderLoggedOut();
    }

    const transformedTables = debug.tables; //transform(rest);
    const sortedTables = sort(transformedTables);
    renderTables({ tables: sortedTables, nbWaitingTables });
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
