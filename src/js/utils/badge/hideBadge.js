// @flow

export function hideBadge(): void {
	chrome.action.setBadgeText({ text: "" });
}
