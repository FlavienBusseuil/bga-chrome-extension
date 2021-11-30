// @flow

export function hideBadge(): void {
	// $FlowFixMe[cannot-resolve-name]
	chrome.action.setBadgeText({ text: "" });
}
