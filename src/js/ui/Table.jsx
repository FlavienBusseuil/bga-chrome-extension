// @flow
import type { TableId } from "../types/bga/Table";

import { PlayerList } from "./PlayerList";
import { TableContent } from "./TableContent";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableIndicator } from "./TableIndicator";
import { Button } from "./base/Button";
import { cn } from "./utils/cn";

type Props = {
	tableId: TableId,
	gameName: string,
	tableCreatorName: null | string,
	tableImg: string,
	link: string,
	acceptInviteLink: string,
	declineInviteLink: string,
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
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
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isWaitingCurrentPlayer,
	children,
	onAcceptInvite,
	onDeclineInvite,
}: Props): React$Element<"li"> {
	return (
		<li
			className={cn([
				"flex",
				"flex-col",
				"gap-2",
				"pl-2",
				"relative",
				"bg-white",
				"rounded",
				"shadow-md",
				"cursor-pointer",
				"border-transparent",
				"border",
				"border-gray-300",
				"hover:border-gray-600",
				"overflow-hidden",
			])}
			onclick={() => window.open(link, "_blank")}
		>
			<TableIndicator
				{...{
					isInvitePendingForCurrentPlayer,
					isOpenForPlayers,
					isWaitingCurrentPlayer,
				}}
			/>
			<TableHeader {...{ gameName, tableImg }} />
			<TableContent>{children}</TableContent>
			<TableFooter className="flex gap-1 items-center justify-end bg-bgaOrange-lighter">
				{isInvitePendingForCurrentPlayer && tableCreatorName !== null && (
					<span
						className="flex-grow text-gray-600 text-sm leading none"
						dangerouslySetInnerHTML={{
							__html: chrome.i18n.getMessage(
								"player_invited_you",
								[
									`<a class="text-bgaBlue-lighter">${tableCreatorName}</a>`,
								],
							),
						}}
					></span>
				)

				// Button({
				//   className: "shrink-0",
				//   text: chrome.i18n.getMessage("decline"),
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
				//   text: chrome.i18n.getMessage("accept"),
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
		</li>
	);
}
