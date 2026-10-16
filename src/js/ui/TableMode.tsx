import { i18n } from "../utils/browser/i18n";
import { ClockIcon, LightningIcon } from "./icons";
import { cn } from "./utils/cn";

type Props = {
	isTurnBased: boolean,
};

export function TableMode({ isTurnBased }: Props) {
	return (
		<div
			className={cn(["table-mode", !isTurnBased && "table-mode--realtime"])}
			title={i18n(isTurnBased ? "turn_based" : "realtime")}
		>
			{isTurnBased ? <ClockIcon /> : <LightningIcon />}
		</div>
	);
}
