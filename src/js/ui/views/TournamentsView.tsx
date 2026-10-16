import { useMemo } from "preact/hooks";

import type { TransformedTournament } from "../../types/TransformedTournament";
import { CardList } from "../base/CardList";
import { Card } from "../base/Card";
import { cn } from "../utils/cn";
import { Button } from "../base/Button";
import Switch from "../base/Switch";
import { bgaUrl } from "../../utils/constants";
import { i18n } from "../../utils/browser/i18n";
import Configuration from "../../config/configuration";
import { useSyncedState } from "../hooks/useSyncedState";

type Props = {
	config: Configuration,
	className?: string,
	tournaments: Array<TransformedTournament>,
	closePopupOnClick: boolean,
	focusOnNewTab: boolean | undefined
};

export const TournamentsView = ({ config, className, tournaments, closePopupOnClick, focusOnNewTab }: Props) => {
	const [dispEliminated, setDispEliminated] = useSyncedState('isDisplayEliminatedTournaments', config.isDisplayEliminatedTournaments());
	const [dispFuture, setDispFuture] = useSyncedState('isDisplayFutureTournaments', config.isDisplayFutureTournaments());

	const toggleDispEliminated = () => {
		setDispEliminated(!dispEliminated);
		config.setDisplayEliminatedTournaments(!dispEliminated);
	}

	const toggleDispFuture = () => {
		setDispFuture(!dispFuture);
		config.setDisplayFutureTournaments(!dispFuture);
	}

	const filteredTournaments = useMemo(() => {
		let list = tournaments;
		if (!dispEliminated) {
			list = list.filter((t) => t.playerStatus !== 'eliminated' && t.playerStatus !== 'withdrawn');
		}
		if (!dispFuture) {
			list = list.filter((t) => t.status !== 'future');
		}
		return list;
	}, [dispEliminated, dispFuture, tournaments]);

	return (
		<div className={cn(["view", className || ''])}>
			{filteredTournaments.length === 0 && (
				<div className="view-empty">
					<span class="view-empty-text">
						{i18n("no_tournaments")}
					</span>
				</div>
			)}
			{filteredTournaments.length > 0 && (
				<div className="max-result">
					<CardList className={className || ''}>
						{filteredTournaments.map(
							({ gameImg, championshipName, name, link, date, playerStatus }) => {
								const onClickFunc = () => {
									const sidePanel = document.documentElement.classList.contains('side-panel');
									const active = focusOnNewTab === undefined ? sidePanel || closePopupOnClick : focusOnNewTab;

									chrome.tabs.create({
										url: link,
										active
									});

									if (closePopupOnClick && !sidePanel) {
										window.close();
									}
								};
								return <Card onClick={onClickFunc} className={playerStatus === 'eliminated' || playerStatus === 'withdrawn' ? 'eliminated' : ''}>
									<div className="tournament">
										<img
											src={gameImg}
											className="game-img"
										/>
										<div className="tournament-text">
											<h1 className="tournament-name">
												{championshipName} ‧ {name}
											</h1>
											<p>{date.toLocaleDateString()}</p>
										</div>
									</div>
								</Card>;
							},
						)}
					</CardList>
				</div>
			)}
			<div className={cn(["view-actions", className || ''])}>
				<div className="tournament-filters">
					<Switch checked={dispEliminated} textOn={i18n('optionTournamentsEliminatedOn')} textOff={i18n('optionTournamentsEliminatedOff')} onChange={toggleDispEliminated} />
					<Switch checked={dispFuture} textOn={i18n('optionTournamentsFutureOn')} textOff={i18n('optionTournamentsFutureOff')} onChange={toggleDispFuture} />
				</div>
				<div className="tournament-actions">
					<Button className="nowrap"
						{...{
							text: i18n("play_tournament"),
							url: `${bgaUrl}/tournamentlist`,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
