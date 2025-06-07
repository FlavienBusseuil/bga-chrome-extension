import browser from "webextension-polyfill";

export function hideBadge(): void {
	browser.action.setBadgeText({ text: "" });
}
