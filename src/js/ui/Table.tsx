import { ComponentChildren, Fragment } from "preact";

import { i18n } from "../utils/browser/i18n";
import { TableContent } from "./TableContent";
import { TableFooter } from "./TableFooter";
import { TableIcon } from "./TableIcon";
import { TableIcons } from "./TableIcons";
import { TableImg } from "./TableImg";
import { TableMode } from "./TableMode";
import { TableStatus, getTableState } from "./TableStatus";
import { TableTitle } from "./TableTitle";
import { Card } from "./base/Card";
import { ClickableTableIcon } from "./ClickableTableIcon";
import { ArenaIcon, HandshakeIcon, TrophyIcon } from "./icons";
import { cn } from "./utils/cn";

type Props = {
	gameName: string,
	tableCreatorName: null | string,
	tableImg: string,
	tableBoxImg: string,
	link: string,
	hasArenaMode: boolean,
	hasTrainingMode: boolean,
	isCurrentPlayerAtTable: boolean,
	isInvitePendingForCurrentPlayer: boolean,
	isOpenForPlayers: boolean,
	isPartOfTournament: boolean,
	tournamentLink: null | string,
	isTurnBased: boolean,
	isWaitingCurrentPlayer: boolean,
	children: ComponentChildren,
	motionSensitivityEnable: boolean,
	closePopupOnClick: boolean,
	focusOnNewTab: boolean | undefined
};

export function Table({
	gameName,
	tableCreatorName,
	tableImg,
	tableBoxImg,
	link,
	hasArenaMode,
	hasTrainingMode,
	isCurrentPlayerAtTable,
	isInvitePendingForCurrentPlayer,
	isOpenForPlayers,
	isPartOfTournament,
	tournamentLink,
	isTurnBased,
	isWaitingCurrentPlayer,
	children,
	motionSensitivityEnable,
	closePopupOnClick,
	focusOnNewTab
}: Props) {
	// Real time / turn based is shown by the TableMode wedge
	const renderIcons = [
		isPartOfTournament ? (
			<ClickableTableIcon className="table-icon--tournament" title={i18n("tournament")} url={tournamentLink as string}><TrophyIcon /></ClickableTableIcon>
		) : null,
		hasArenaMode ? <TableIcon className="table-icon--arena" title={i18n("arena")}><ArenaIcon /></TableIcon> : null,
		hasTrainingMode ? (
			<TableIcon className="table-icon--training" title={i18n("friendly_game")}><HandshakeIcon /></TableIcon>
		) : null,
	].filter(Boolean);

	const state = getTableState({
		isInvitePendingForCurrentPlayer,
		isOpenForPlayers,
		isTurnBased,
		isWaitingCurrentPlayer,
	});
	// Only the tables where the player is expected flash (as said by the option): a real time table only if the player
	// is one of its players (present during the whole game), not the open tables of the friends view
	const pulse = !motionSensitivityEnable
		&& ((state === "realtime" && isCurrentPlayerAtTable) || state === "turn" || state === "invite");

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

	return (
		<Card
			onClick={onClickFunc}
			className={cn(["table-card", `table-card--${state}`, hasArenaMode && "table-card--arena", hasTrainingMode && "table-card--training", pulse && "table-card--pulse"])}
		>
			<div className="table-card-main">
				<TableMode isTurnBased={isTurnBased} />
				<TableImg tableImg={tableImg} tableBoxImg={tableBoxImg} />
				<div className="table-card-body">
					<div className="table-card-row">
						<TableTitle gameName={gameName} />
						<TableStatus state={state} />
					</div>
					<TableContent>{children}</TableContent>
					{renderIcons.length > 0 && <TableIcons>{renderIcons}</TableIcons>}
				</div>
			</div>
			<TableFooter>
				{
					isInvitePendingForCurrentPlayer &&
					tableCreatorName !== null && (
						<span className="table-invite">
							{/* The creator name comes from BGA: render it as text, never as HTML */}
							{i18n("player_invited_you").split("$player$").map((text, index) => (
								<Fragment key={index}>
									{index > 0 && <strong className="table-invite-creator">{tableCreatorName}</strong>}
									{text}
								</Fragment>
							))}
						</span>
					)
				}
			</TableFooter>
		</Card>
	);
}
