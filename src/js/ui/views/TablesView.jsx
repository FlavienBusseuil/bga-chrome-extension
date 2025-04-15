// @flow

import type { TransformedTable } from "../../types/TransformedTable";

import { PlayerList } from "../PlayerList";
import { Player } from "../Player";
import { StartNewGameButton } from "../StartNewGameButton";
import { Table } from "../Table";
import type { TableId } from "../../types/bga/Table";
import { i18n } from "../../utils/browser";
import { CardList } from "../base/CardList";
import { cn } from "../utils/cn";

type Props = {
	className?: string,
	tables: Array<TransformedTable>,
	onAcceptInvite: (TableId) => Promise<void>,
	onDeclineInvite: (TableId) => Promise<void>,
	motionSensitivityEnable: boolean,
};

export function TablesView({
	className,
	tables,
	onAcceptInvite,
	onDeclineInvite,
	motionSensitivityEnable
}: Props): React$Node {
	return (
		<div className={cn(["flex justify-between flex-col gap-2", className])}>
			{tables.length === 0 && (
				<div className="flex justify-center flex-col grow" style={{ minHeight: "60px" }}>
					<span class="text-black dark:text-white text-center text-xl">
						{i18n("no_games")}
					</span>
				</div>
			)}

			{tables.length > 0 && (
				<div className="max-result">
					<CardList>
						{tables.map(
							({
								nbMaxPlayers,
								players,
								hasArenaMode,
								isOpenForPlayers,
								tableId,
								gameStart,
								...restTable
							}) => {
								const nbMissingPlayers = isOpenForPlayers
									? nbMaxPlayers - players.length
									: 0;
								const isWaitingCurrentPlayer = players.some(
									({ isCurrentPlayer, isActivePlayer }) =>
										isCurrentPlayer && isActivePlayer,
								);
								const isInvitePendingForCurrentPlayer =
									players.some(
										({ isCurrentPlayer, isInvitePending }) =>
											isCurrentPlayer && isInvitePending,
									);

								return (
									<Table
										key={String(tableId)}
										{...{
											onAcceptInvite,
											onDeclineInvite,
											tableId,
											hasArenaMode,
											isInvitePendingForCurrentPlayer,
											isOpenForPlayers,
											isWaitingCurrentPlayer,
											motionSensitivityEnable,
											...restTable,
										}}
									>
										<PlayerList>
											{[
												...players.map(
													({
														playerId,
														playerName,
														isActivePlayer,
														isInvitePending,
													}) => (
														<Player
															key={String(playerId)}
															playerName={playerName}
															isActivePlayer={
																isActivePlayer
															}
															isInvitePending={
																isInvitePending
															}
														/>
													),
												),
												...Array.from(
													Array(nbMissingPlayers),
												).map(() => (
													<Player playerName="🪑 ..." />
												)),
											]}
										</PlayerList>
									</Table>
								);
							},
						)}
					</CardList>
				</div>
			)}
			<StartNewGameButton />
		</div>
	);
}
