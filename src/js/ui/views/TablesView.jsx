// @flow

import type { TransformedTable } from "../../types/TransformedTable";

import { PlayerList } from "../PlayerList";
import { Player } from "../Player";
import { StartNewGameButton } from "../StartNewGameButton";
import { Table } from "../Table";
import { TableList } from "../TableList";
import type { TableId } from "../../types/bga/Table";

type Props = {
	tables: Array<TransformedTable>,
	onAcceptInvite: TableId => Promise<void>,
	onDeclineInvite: TableId => Promise<void>,
};

export function TablesView({
	tables,
	onAcceptInvite,
	onDeclineInvite,
}: Props): React$Node {
	return (
		<>
			<TableList>
				{tables.map(
					({
						acceptInviteLink,
						declineInviteLink,
						gameName,
						isOpenForPlayers,
						link,
						nbMaxPlayers,
						players,
						tableCreatorName,
						tableImg,
						tableId,
					}) => {
						const nbMissingPlayers = isOpenForPlayers
							? nbMaxPlayers - players.length
							: 0;
						const isWaitingCurrentPlayer = players.some(
							({ isCurrentPlayer, isActivePlayer }) =>
								isCurrentPlayer && isActivePlayer,
						);
						const isInvitePendingForCurrentPlayer = players.some(
							({ isCurrentPlayer, isInvitePending }) =>
								isCurrentPlayer && isInvitePending,
						);

						return (
							<Table
								key={String(tableId)}
								{...{
									acceptInviteLink,
									declineInviteLink,
									gameName,
									isInvitePendingForCurrentPlayer,
									isOpenForPlayers,
									isWaitingCurrentPlayer,
									link,
									onAcceptInvite,
									onDeclineInvite,
									tableCreatorName,
									tableId,
									tableImg,
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
			</TableList>
			<StartNewGameButton />
		</>
	);
}
