import { getBadge } from "./badge/getBadge";
import { hideBadge } from "./badge/hideBadge";
import { setBadge } from "./badge/setBadge";
import { animate } from "./icon/animate";
import { playMp3 } from "./misc/mp3";

type Props = {
	nbWaitingTables: number,
	nbPendingInvites: number,
	tracking: boolean,
	soundNotification: boolean
};

function getTotalFromBadgeText({ text }: { text: string }): null | number {
	if (!text) {
		return 0;
	}

	const result = parseInt(text, 10);

	if (isNaN(result)) {
		return null;
	}

	return result;
}

// Updates are chained: the badge is read then written, concurrent updates would both see the old value
let pendingUpdate: Promise<void> = Promise.resolve();

export function updateBadgeAndIcon(props: Props): Promise<void> {
	pendingUpdate = pendingUpdate
		.then(() => doUpdateBadgeAndIcon(props))
		.catch((error) => console.error("[bga extension] Unable to update badge", error));
	return pendingUpdate;
}

// Used by the popup and the side panel: the background script owns the badge
export function requestBadgeAndIconUpdate(props: Props): void {
	chrome.runtime.sendMessage({ type: "updateBadgeAndIcon", data: props })
		.catch((error) => console.error("[bga extension] Unable to request badge update", error));
}

async function doUpdateBadgeAndIcon({
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

	setBadge({
		text: `${newTotal}`,
		color: "#4871b6",
	});

	if (oldTotal === 0 && soundNotification) {
		try {
			await playMp3();
		} catch (error) {
			console.error("[bga extension] Unable to play notification sound", error);
		}
	}
}