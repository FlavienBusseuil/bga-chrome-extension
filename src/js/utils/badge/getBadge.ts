import browser from "webextension-polyfill";

export async function getBadge(): Promise<{
	text: string,
	color: [number, number, number, number],
}> {
	const text = await browser.action.getBadgeText({});
	const color = await browser.action.getBadgeBackgroundColor({});
	return { text, color };
}
