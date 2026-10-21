import type { TransformedTable } from "../../types/TransformedTable";

import { PlayerList } from "../PlayerList";
import { EmptySeats, Player } from "../Player";
import { StartNewGameButton } from "../StartNewGameButton";
import { PlayersDisplaySwitch } from "../PlayersDisplaySwitch";
import { Table } from "../Table";
import { i18n } from "../../utils/browser/i18n";
import { CardList } from "../base/CardList";
import { cn } from "../utils/cn";

type Props = {
	className?: string,
	tables: Array<TransformedTable>,
	motionSensitivityEnable: boolean,
	closePopupOnClick: boolean,
	focusOnNewTab: boolean | undefined,
	playersCompact: boolean,
	onPlayersCompactChange: (compact: boolean) => void,
};

export const TablesView = ({
	className,
	tables,
	motionSensitivityEnable,
	closePopupOnClick,
	focusOnNewTab,
	playersCompact,
	onPlayersCompactChange,
}: Props) => {
	return (
		<div className={cn(["view", className || ''])}>
			{tables.length === 0 && (
				<div className="view-empty">
					<span class="view-empty-text">
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
								const isCurrentPlayerAtTable = players.some(({ isCurrentPlayer }) => isCurrentPlayer);
								const isInvitePendingForCurrentPlayer =
									players.some(
										({ isCurrentPlayer, isInvitePending }) =>
											isCurrentPlayer && isInvitePending,
									);

								return (
									<Table
										key={String(tableId)}
										{...{
											hasArenaMode,
											isCurrentPlayerAtTable,
											isInvitePendingForCurrentPlayer,
											isOpenForPlayers,
											isWaitingCurrentPlayer,
											motionSensitivityEnable,
											closePopupOnClick,
											focusOnNewTab,
											...restTable,
										}}
									>
										<PlayerList compact={playersCompact}>
											{[
												...players.map(
													({
														playerId,
														playerName,
														avatarUrl,
														isActivePlayer,
														isInvitePending,
													}) => (
														<Player
															key={String(playerId)}
															playerName={playerName}
															avatarUrl={avatarUrl}
															isActivePlayer={
																isActivePlayer
															}
															isInvitePending={
																isInvitePending
															}
														/>
													),
												),
												<EmptySeats key="seats" count={nbMissingPlayers} />,
											]}
										</PlayerList>
									</Table>
								);
							},
						)}
					</CardList>
				</div>
			)}
			<div className="view-actions">
				{tables.length > 0 && <PlayersDisplaySwitch compact={playersCompact} onChange={onPlayersCompactChange} />}
				<StartNewGameButton className="grow" />
			</div>
		</div>
	);
}
