// @flow
import type { TableId } from "../types/bga/Table";

import { tr } from "../utils/misc/translate";
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
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
	isPartOfTournament: boolean,
	isTurnBased: boolean,
	isWaitingCurrentPlayer: boolean,
	children: React$Element<typeof PlayerList>,
	onAcceptInvite: TableId => Promise<void>,
	onDeclineInvite: TableId => Promise<void>,
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
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isPartOfTournament,
	isTurnBased,
	isWaitingCurrentPlayer,
	children,
	onAcceptInvite,
	onDeclineInvite,
}: Props): React$Element<typeof Card> {
	const renderIcons: Array<React$Element<typeof TableIcon>> = [
		isPartOfTournament ? (
			<TableIcon title={tr("tournament")}>🏆</TableIcon>
		) : null,
		hasArenaMode ? <TableIcon title={tr("arena")}>🏟</TableIcon> : null,
		isTurnBased ? null : ( // <TableIcon title={tr("turn_based")}>🕰</TableIcon>
			<TableIcon title={tr("realtime")}>⚡️</TableIcon>
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
				}}
			/>
			<TableIcons>{renderIcons}</TableIcons>
			<TableHeader {...{ gameName, tableImg }} />
			<TableContent>{children}</TableContent>
			<TableFooter className="flex gap-1 items-center justify-end bg-bgaOrange-lighter">
				{isInvitePendingForCurrentPlayer && tableCreatorName !== null && (
					<span
						className="flex-grow text-gray-600 text-sm leading none"
						dangerouslySetInnerHTML={{
							__html: tr("player_invited_you", [
								`<a class="text-bgaBlue-lighter">${tableCreatorName}</a>`,
							]),
						}}
					></span>
				)

				// Button({
				//   className: "shrink-0",
				//   text: tr("decline"),
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
				//   text: tr("accept"),
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
