import { i18n } from "../utils/browser/i18n";

export type TableState = "realtime" | "turn" | "invite" | "open" | "waiting";

interface TableStateProps {
	isInvitePendingForCurrentPlayer: boolean;
	isOpenForPlayers: boolean;
	isTurnBased: boolean;
	isWaitingCurrentPlayer: boolean;
}

export function getTableState({
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isTurnBased,
	isWaitingCurrentPlayer,
}: TableStateProps): TableState {
	// A real time table waiting for players isn't played yet: shown as open, it doesn't flash
	if (!isTurnBased) {
		return isOpenForPlayers ? "open" : "realtime";
	}

	if (isWaitingCurrentPlayer) {
		return "turn";
	}

	if (isInvitePendingForCurrentPlayer) {
		return "invite";
	}

	if (isOpenForPlayers) {
		return "open";
	}

	return "waiting";
}

const labelKeys: Record<TableState, string> = {
	realtime: "realtime",
	turn: "status_your_turn",
	invite: "status_invitation",
	open: "status_open",
	waiting: "status_waiting",
};

export function TableStatus({ state }: { state: TableState }) {
	return <span className="table-status">{i18n(labelKeys[state])}</span>;
}
