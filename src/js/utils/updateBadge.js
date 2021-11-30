// @flow

import { hideBadge } from "./badge/hideBadge";
import { setBadge } from "./badge/setBadge";

type Props = {
	nbWaitingTables: number,
	nbPendingInvites: number,
};

export function updateBadge({
	nbWaitingTables,
	nbPendingInvites,
}: Props): void {
	const total = nbWaitingTables + nbPendingInvites;
	if (total === 0) {
		return hideBadge();
	}

	setBadge({
		text: `${total}`,
		color: "#4871b6",
	});
}
