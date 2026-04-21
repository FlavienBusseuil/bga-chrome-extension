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
};

export const TournamentsView = ({ config, className, tournaments }: Props) => {
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
		<div className={cn(["flex justify-between flex-col gap-2", className || ''])}>
			{filteredTournaments.length === 0 && (
				<div className="flex justify-center flex-col grow" style={{ minHeight: "60px" }}>
					<span class="text-black dark:text-white text-center text-xl">
						{i18n("no_tournaments")}
					</span>
				</div>
			)}
			{filteredTournaments.length > 0 && (
				<div className="max-result">
					<CardList className={className || ''}>
						{filteredTournaments.map(
							({ gameImg, championshipName, name, link, date, playerStatus }) => (
								<Card onClick={() => window.open(link, "_blank")} className={playerStatus === 'eliminated' || playerStatus === 'withdrawn' ? 'eliminated' : ''}>
									<div className="flex items-center px-1 py-2 gap-2">
										<img
											src={gameImg}
											className="w-6 h-6 rounded"
										/>
										<div className="flex flex-col leading-3">
											<h1 className="text-base">
												{championshipName} ‧ {name}
											</h1>
											<p>{date.toLocaleDateString()}</p>
										</div>
									</div>
								</Card>
							),
						)}
					</CardList>
				</div>
			)}
			<div className={cn(["flex justify-between flex-row gap-2", className || ''])}>
				<div style={{ display: 'flex', flexFlow: 'column', gap: '0.5em' }}>
					<Switch checked={dispEliminated} textOn={i18n('optionTournamentsEliminatedOn')} textOff={i18n('optionTournamentsEliminatedOff')} onChange={toggleDispEliminated} />
					<Switch checked={dispFuture} textOn={i18n('optionTournamentsFutureOn')} textOff={i18n('optionTournamentsFutureOff')} onChange={toggleDispFuture} />
				</div>
				<div style={{ height: 'fit-content', margin: 'auto 0px 0px 0px' }}>
					<Button className="whitespace-nowrap"
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
