// @flow

export const tr: typeof chrome.i18n.getMessage = (...args) =>
	chrome.i18n.getMessage(...args);
