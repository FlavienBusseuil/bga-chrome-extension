// @flow

import { getBadge } from "./badge/getBadge";
import { hideBadge } from "./badge/hideBadge";
import { setBadge } from "./badge/setBadge";
import { animate } from "./icon/animate";

type Props = {
	nbWaitingTables: number,
	nbPendingInvites: number,
	tracking: boolean,
};

function getTotalFromBadgeText({ text }: { text: string }): null | number {
	const isIntegerString = Number.isInteger(text);
	if (isIntegerString) {
		return Number(text);
	}

	const isEmptyString = text === "";
	if (isEmptyString) {
		return 0;
	}

	return null;
}

export async function updateBadgeAndIcon({
	nbPendingInvites,
	nbWaitingTables,
	tracking,
	soundNotification
}: Props): Promise<void> {
	if (!tracking) {
		hideBadge();
		await chrome.action.setIcon({ path: "img/icon-grey.png" });
		return;
	}

	const newTotal = nbWaitingTables + nbPendingInvites;
	if (newTotal === 0) {
		await chrome.action.setIcon({ path: "img/icon-48.png" });
		return hideBadge();
	}

	const { text } = await getBadge();
	const oldTotal = getTotalFromBadgeText({ text });

	if (oldTotal !== null && newTotal > oldTotal) {
		const images = [
			"img/icon-48.png",
			"img/anim-0.png",
			"img/anim-1.png",
			"img/anim-2.png",
			"img/anim-3.png",
			"img/anim-4.png",
			"img/anim-5.png",
			"img/anim-6.png",
			"img/anim-7.png",
			"img/anim-6.png",
			"img/anim-5.png",
			"img/anim-4.png",
			"img/anim-3.png",
			"img/anim-2.png",
			"img/anim-1.png",
			"img/anim-0.png",
			"img/icon-48.png",
		].map((path) => ({ path, timeframe: 15 }));
		await animate({ images });
	} else {
		await chrome.action.setIcon({ path: "img/icon-48.png" });
	}
	if (oldTotal === 0 && soundNotification) {
		await playSound();
	}
	setBadge({
		text: `${newTotal}`,
		color: "#4871b6",
	});
}

async function playSound(source = "sound/myturn.mp3", volume = 1) {
	await setupOffscreenDocument("../../offscreen.html");
	await chrome.runtime.sendMessage({
		data: { source, volume },
		target: "offscreen",
	});
}

let creating;
async function setupOffscreenDocument(path) {
	const offscreenUrl = chrome.runtime.getURL(path);
	const existingContexts = await chrome.runtime.getContexts({
		contextTypes: ["OFFSCREEN_DOCUMENT"],
		documentUrls: [offscreenUrl],
	});

	if (existingContexts.length > 0) {
		return;
	}
	if (creating) {
		await creating;
	} else {
		creating = chrome.offscreen.createDocument({
			url: path,
			reasons: ["AUDIO_PLAYBACK"],
			justification: "Play a notification sound",
		});
		await creating;
		creating = null;
	}
}
