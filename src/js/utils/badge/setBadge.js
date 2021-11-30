// @flow

type Props = {
	text: string,
	color: string,
};

export function setBadge({ text, color }: Props): void {
	// $FlowFixMe[cannot-resolve-name]
	chrome.action.setBadgeBackgroundColor({ color });
	chrome.action.setBadgeText({ text });
}
