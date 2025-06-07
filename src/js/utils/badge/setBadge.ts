import browser from "webextension-polyfill";

type Props = {
	text: string,
	color: string,
};

export function setBadge({ text, color }: Props): void {
	browser.action.setBadgeBackgroundColor({ color });
	browser.action.setBadgeText({ text });
}
