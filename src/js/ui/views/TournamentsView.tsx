import { useMemo, useState } from "preact/hooks";

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
	const [dispEliminated, setDispEliminated] = useSyncedState('isOnlineMessagesEnabled', config.isDisplayEliminatedTournaments());

	const toggleDispEliminated = () => {
		setDispEliminated(!dispEliminated);
		config.setDisplayEliminatedTournaments(!dispEliminated);
	}

	const filteredTournaments = useMemo(() => {
		if (dispEliminated) {
			return tournaments;
		}
		return tournaments.filter((t) => t.playerStatus !== 'eliminated');
	}, [dispEliminated, tournaments]);

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
							({ gameImg, championshipName, name, link, date }) => (
								<Card onClick={() => window.open(link, "_blank")}>
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
				<Switch checked={dispEliminated} textOn={i18n('optionTournamentsEliminatedOn')} textOff={i18n('optionTournamentsEliminatedOff')} onChange={toggleDispEliminated} />
				<Button className="whitespace-nowrap"
					{...{
						text: i18n("play_tournament"),
						url: `${bgaUrl}/tournamentlist`,
					}}
				/>
			</div>
		</div>
	);
}
