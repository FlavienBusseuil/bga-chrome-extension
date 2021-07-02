import { Player } from "../../ui/Player";
import { PlayerList } from "../../ui/PlayerList";
import { StartNewGameButton } from "../../ui/StartNewGameButton";
import { Table } from "../../ui/Table";
import { TableList } from "../../ui/TableList";

export function renderTables({ tables, nbWaitingTables }) {
  chrome.action.setBadgeBackgroundColor({ color: "#4871b6" });
  const bodyElm = document.querySelector("body");

  // Render tables and players
  const tableListElm = TableList({
    children: tables.map(
      ({
        players,
        gameName,
        link,
        tableCreatorName,
        tableImg,
        isOpenForPlayers,
        nbMaxPlayers,
      }) => {
        const nbMissingPlayers = isOpenForPlayers
          ? nbMaxPlayers - players.length
          : 0;
        const isWaitingCurrentPlayer = players.some(
          ({ isCurrentPlayer, isActivePlayer }) =>
            isCurrentPlayer && isActivePlayer
        );
        const isInvitePendingForCurrentPlayer = players.some(
          ({ isCurrentPlayer, isInvitePending }) =>
            isCurrentPlayer && isInvitePending
        );

        return Table({
          gameName,
          tableCreatorName,
          tableImg,
          link,
          isInvitePendingForCurrentPlayer,
          isOpenForPlayers,
          isWaitingCurrentPlayer,
          children: PlayerList({
            children: [
              ...players.map(
                ({ playerName, isActivePlayer, isInvitePending }) =>
                  Player({ playerName, isActivePlayer, isInvitePending })
              ),
              ...Array(nbMissingPlayers)
                .fill()
                .map(() => Player({ playerName: "🪑 ..." })),
            ],
          }),
        });
      }
    ),
  });

  bodyElm.appendChild(tableListElm);
  bodyElm.appendChild(StartNewGameButton());

  // Set badge
  chrome.action.setBadgeText({ text: `${nbWaitingTables}` });
}
