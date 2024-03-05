// @flow

import type { TransformedTournament } from "../../types/TransformedTournament";

import { CardList } from "../base/CardList";
import { Card } from "../base/Card";
import { cn } from "../utils/cn";
import { Button } from "../base/Button.jsx";
import { bgaUrl } from "../../utils/constants";

type Props = {
	className?: string,
	tournaments: Array<TransformedTournament>,
};

export function TournamentsView({ className, tournaments }: Props): React$Node {
	return (
		<div className={cn(["flex justify-between flex-col gap-2", className])}>
			{tournaments.length === 0 && (
				<div className="flex justify-center flex-col grow">
					<span class="text-black dark:text-white text-center text-xl">
						{chrome.i18n.getMessage("no_tournaments")}
					</span>
				</div>
			)}
			{tournaments.length > 0 && (
				<div className="max-result">
					<CardList className={className}>
						{tournaments.map(
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
			<Button
				{...{
					text: chrome.i18n.getMessage("play_tournament"),
					url: `${bgaUrl}/tournamentlist`,
				}}
			/>
		</div>
	);
}
