// @flow

import { getBadge } from "./badge/getBadge";
import { hideBadge } from "./badge/hideBadge";
import { setBadge } from "./badge/setBadge";
import { animate } from "./icon/animate";

type Props = {
	nbWaitingTables: number,
	nbPendingInvites: number,
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
}: Props): Promise<void> {
	const newTotal = nbWaitingTables + nbPendingInvites;
	if (newTotal === 0) {
		return hideBadge();
	}

	const { text } = await getBadge();
	const oldTotal = getTotalFromBadgeText({ text });
	if (oldTotal !== null && newTotal > oldTotal) {
		const images = [
			"img/anim-0.png",
			"img/anim-1.png",
			"img/anim-2.png",
			"img/anim-3.png",
			"img/anim-4.png",
			"img/anim-5.png",
			"img/anim-6.png",
			"img/icon-48.png",
		].map((path) => ({ path, timeframe: 75 }));
		await animate({ images });
	}

	setBadge({
		text: `${newTotal}`,
		color: "#4871b6",
	});
}
