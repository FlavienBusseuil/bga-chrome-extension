import { cn } from "./utils/cn";

interface IndicatorProps {
    isInvitePendingForCurrentPlayer: boolean;
    isOpenForPlayers: boolean;
    isTurnBased: boolean;
    isWaitingCurrentPlayer: boolean;
    motionSensitivityEnable: boolean;
}

function getIndicatorClassnames({
    isInvitePendingForCurrentPlayer,
    isOpenForPlayers,
    isTurnBased,
    isWaitingCurrentPlayer,
    motionSensitivityEnable
}: IndicatorProps): string {
    if (!isTurnBased) {
        return motionSensitivityEnable ? "table-indicator--realtime" : "table-indicator--realtime table-indicator--pulse-fast";
    }

    if (isWaitingCurrentPlayer) {
        return motionSensitivityEnable ? "table-indicator--waiting" : "table-indicator--waiting table-indicator--pulse";
    }

    if (isInvitePendingForCurrentPlayer) {
        return motionSensitivityEnable ? "table-indicator--invite" : "table-indicator--invite table-indicator--pulse";
    }

    if (isOpenForPlayers) {
        return "table-indicator--open";
    }

    return "table-indicator--inactive";
}

export function TableIndicator({
    isInvitePendingForCurrentPlayer,
    isOpenForPlayers,
    isTurnBased,
    isWaitingCurrentPlayer,
    motionSensitivityEnable
}: IndicatorProps) {
    return (
        <div
            className={cn([
                "table-indicator",
                getIndicatorClassnames({
                    isInvitePendingForCurrentPlayer,
                    isOpenForPlayers,
                    isTurnBased,
                    isWaitingCurrentPlayer,
                    motionSensitivityEnable
                }),
            ])}
        />
    );
}
