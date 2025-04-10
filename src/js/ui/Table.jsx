// @flow
import type { TableId } from "../types/bga/Table";

import { i18n } from "../utils/chrome";
import { PlayerList } from "./PlayerList";
import { TableContent } from "./TableContent";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableIcon } from "./TableIcon.jsx";
import { TableIcons } from "./TableIcons.jsx";
import { TableIndicator } from "./TableIndicator";
import { Button } from "./base/Button";
import { Card } from "./base/Card";
import { cn } from "./utils/cn";

type Props = {
	tableId: TableId,
	gameName: string,
	tableCreatorName: null | string,
	tableImg: string,
	link: string,
	acceptInviteLink: string,
	declineInviteLink: string,
	hasArenaMode: boolean,
	hasTrainingMode: boolean,
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
	isPartOfTournament: boolean,
	isTurnBased: boolean,
	isWaitingCurrentPlayer: boolean,
	children: React$Element<typeof PlayerList>,
	onAcceptInvite: (TableId) => Promise<void>,
	onDeclineInvite: (TableId) => Promise<void>,
	motionSensitivityEnable: boolean
};

export function Table({
	tableId,
	gameName,
	tableCreatorName,
	tableImg,
	link,
	acceptInviteLink,
	declineInviteLink,
	hasArenaMode,
	hasTrainingMode,
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isPartOfTournament,
	isTurnBased,
	isWaitingCurrentPlayer,
	children,
	onAcceptInvite,
	onDeclineInvite,
	motionSensitivityEnable,
}: Props): React$Element<typeof Card> {
	const renderIcons: Array<React$Element<typeof TableIcon>> = [
		isPartOfTournament ? (
			<TableIcon title={i18n("tournament")}>🏆</TableIcon>
		) : null,
		hasArenaMode ? <TableIcon title={i18n("arena")}>🏟</TableIcon> : null,
		hasTrainingMode ? (
			<TableIcon title={i18n("training")}>🤸</TableIcon>
		) : null,
		isTurnBased ? null : ( // <TableIcon title={i18n("turn_based")}>🕰</TableIcon>
			<TableIcon title={i18n("realtime")}>⚡️</TableIcon>
		),
	].filter(Boolean);

	return (
		<Card onClick={() => window.open(link, "_blank")}>
			<TableIndicator
				{...{
					isInvitePendingForCurrentPlayer,
					isOpenForPlayers,
					isTurnBased,
					isWaitingCurrentPlayer,
					motionSensitivityEnable
				}}
			/>
			<TableIcons>{renderIcons}</TableIcons>
			<TableHeader {...{ gameName, tableImg }} />
			<TableContent>{children}</TableContent>
			<TableFooter className="flex gap-1 items-center justify-end bg-bgaOrange-lighter">
				{
					isInvitePendingForCurrentPlayer &&
					tableCreatorName !== null && (
						<span
							className="flex-grow text-gray-600 text-sm leading none"
							dangerouslySetInnerHTML={{
								__html: i18n("player_invited_you", [
									`<a class="text-bgaBlue-lighter">${tableCreatorName}</a>`,
								]),
							}}
						></span>
					)

					// Button({
					//   className: "shrink-0",
					//   text: i18n("decline"),
					//   onClick: async () => {
					//     const { status, error } = await fetch(
					//       declineInviteLink
					//     ).then((r) => r.json());
					//     // ... status === 1 ?
					//     onDeclineInvite({ tableId });
					//   },
					//   size: 1,
					//   type: "secondary",
					// }),

					// Button({
					//   className: "shrink-0",
					//   text: i18n("accept"),
					//   onClick: async () => {
					//     const { status, error } = await fetch(
					//       acceptInviteLink
					//     ).then((r) => r.json());
					//     // ... status === 1 ?
					//     onAcceptInvite({ tableId });
					//   },
					//   size: 1,
					//   type: "accept",
					// }),
				}
			</TableFooter>
		</Card>
	);
}
