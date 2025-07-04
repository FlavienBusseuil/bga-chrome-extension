export async function getBadge(): Promise<{
	text: string,
	color: [number, number, number, number],
}> {
	const text = await chrome.action.getBadgeText({});
	const color = await chrome.action.getBadgeBackgroundColor({});
	return { text, color };
}
