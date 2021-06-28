import { Error as ErrorComponent } from "./ui/Error";
import { LoginButton } from "./ui/LoginButton";
import { Player } from "./ui/Player";
import { PlayerList } from "./ui/PlayerList";
import { StartNewGameButton } from "./ui/StartNewGameButton";
import { Table } from "./ui/Table";
import { TableList } from "./ui/TableList";
import { bgaUrl } from "./utils/constants";
import { fetchActivityForPlayer } from "./utils/fetchActivityForPlayer";
import { fetchCurrentPlayer } from "./utils/fetchCurrentPlayer";
import { fetchGlobalInfo } from "./utils/fetchGlobalInfo";
import { fetchGlobalTranslations } from "./utils/fetchGlobalTranslations";
import { fetchTableInfo } from "./utils/fetchTableInfo";
import { fetchTables } from "./utils/fetchTables";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "./utils/isPlayerActiveOnTableFromGlobalUserInfos";

function sortTables(tables) {
  return tables.sort(
    (
      {
        isOpenForPlayers: isOpenForPlayers1,
        isWaitingCurrentPlayer: isWaitingCurrentPlayer1,
        gameName: gameName1,
      },
      {
        isOpenForPlayers: isOpenForPlayers2,
        isWaitingCurrentPlayer: isWaitingCurrentPlayer2,
        gameName: gameName2,
      }
    ) =>
      // Sort by: active tables
      isWaitingCurrentPlayer2 - isWaitingCurrentPlayer1 ||
      // open tables
      isOpenForPlayers2 - isOpenForPlayers1 ||
      // game names
      gameName1.localeCompare(gameName2)
  );
}

async function aggregateTablesAndPlayers({
  currentPlayerId,
  globalUserInfos,
  translations,
  assetsUrl,
}) {
  const tables = await fetchTables();

  const tablesAndPlayers = await Promise.all(
    tables.map(
      async ({
        id: tableId,
        players,
        game_name: gameNameKey,
        gameserver: gameServer,
      }) => {
        const tableInfos = await fetchTableInfo({ tableId });

        const {
          gameversion: gameVersion,
          status,
          max_player: nbMaxPlayers,
        } = tableInfos;

        return {
          tableId,
          isOpenForPlayers: status === "asyncopen",
          gameName: translations[`${gameNameKey}_displayed`],
          tableImg: `${assetsUrl}games/${gameNameKey}/${gameVersion}/img/game_icon.png`,
          link: `${bgaUrl}/${gameServer}/${gameNameKey}?table=${tableId}`,
          isWaitingCurrentPlayer: isPlayerActiveOnTableFromGlobalUserInfos({
            playerId: currentPlayerId,
            tableId,
            globalUserInfos,
          }),
          nbMaxPlayers,
          players: Object.keys(players).map((playerKey) => {
            const { fullname: playerName, id: playerId } = players[playerKey];
            const isActivePlayer = isPlayerActiveOnTableFromGlobalUserInfos({
              playerId,
              tableId,
              globalUserInfos,
            });

            // Player
            return { playerId, playerName, isActivePlayer };
          }),
        };
      }
    )
  );

  return tablesAndPlayers;
}

async function fetchAndAggregateTablesAndPlayers() {
  // Fetch global info
  const { globalUserInfos, assetsUrl, jsBundleVersion } = await fetchGlobalInfo(
    {
      fetchGlobalUserInfos: true,
      fetchAssetsUrl: true,
      fetchJsBundleVersion: true,
    }
  );

  // Fetch current player info
  const currentPlayer = await fetchCurrentPlayer();
  const { token: currentPlayerToken, id: currentPlayerId } = currentPlayer;

  // No user logged
  if (!currentPlayerToken || !currentPlayerId) {
    bodyElm.appendChild(LoginButton());
    return;
  }

  // Fetch number of waiting tables
  const { nbWaitingTables } = await fetchActivityForPlayer({
    playerToken: currentPlayerToken,
    playerId: currentPlayerId,
  });

  // Fetch global translations
  const translations = await fetchGlobalTranslations({
    assetsUrl,
    jsBundleVersion,
  });

  const tables = await aggregateTablesAndPlayers({
    currentPlayerId,
    globalUserInfos,
    translations,
    assetsUrl,
  });

  return { nbWaitingTables, tables };
}

async function fetchAndRender() {
  const bodyElm = document.querySelector("body");
  try {
    const {
      nbWaitingTables,
      tables,
    } = await fetchAndAggregateTablesAndPlayers();

    const sortedTables = sortTables(tables);

    // Render tables and players
    const tableListElm = TableList({
      children: sortedTables.map(
        ({
          players,
          gameName,
          link,
          tableImg,
          isOpenForPlayers,
          isWaitingCurrentPlayer,
          nbMaxPlayers,
        }) => {
          const nbMissingPlayers = isOpenForPlayers
            ? nbMaxPlayers - players.length
            : 0;
          return Table({
            gameName,
            tableImg,
            link,
            isOpenForPlayers,
            isWaitingCurrentPlayer,
            children: PlayerList({
              children: [
                ...players.map(({ playerName, isActivePlayer }) =>
                  Player({ playerName, isActivePlayer })
                ),
                ...Array(nbMissingPlayers)
                  .fill()
                  .map(() =>
                    Player({ playerName: "🪑 ...", isActivePlayer: false })
                  ),
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
  } catch (error) {
    console.log(chrome.i18n.getMessage("something_wrong"));
    const errorElm = ErrorComponent({
      errorText: chrome.i18n.getMessage("something_wrong"),
      errorMessage: error.message || error,
    });
    console.error(error);
    bodyElm.appendChild(errorElm);
  } finally {
    // Remove loading
    document.querySelector("#loading").remove();
  }
}

chrome.action.setBadgeBackgroundColor({ color: "#4871b6" });
fetchAndRender();
