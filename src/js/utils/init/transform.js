import { bgaUrl } from "../constants";
import { isPlayerActiveOnTableFromGlobalUserInfos } from "../isPlayerActiveOnTableFromGlobalUserInfos";

export function transform({
  currentPlayerId,
  globalUserInfos,
  translations,
  assetsUrl,
  tables,
  tablesInfos,
}) {
  return tables.map(
    ({
      id: tableId,
      players,
      game_name: gameNameKey,
      gameserver: gameServer,
      table_creator: tableCreator,
    }) => {
      const {
        gameversion: gameVersion,
        status,
        max_player: nbMaxPlayers,
      } = tablesInfos[tableId];

      return {
        acceptInviteLink: `${bgaUrl}/table?table=${tableId}&acceptinvit`,
        gameName: translations[`${gameNameKey}_displayed`],
        isOpenForPlayers: status === "asyncopen",
        link: `${bgaUrl}/${gameServer}/${gameNameKey}?table=${tableId}`,
        nbMaxPlayers,
        tableCreatorName: players[tableCreator].fullname,
        tableId,
        tableImg: `${assetsUrl}games/${gameNameKey}/${gameVersion}/img/game_icon.png`,
        players: Object.keys(players).map((playerKey) => {
          const { fullname: playerName, id: playerId, table_status } = players[
            playerKey
          ];
          const isCurrentPlayer = currentPlayerId === playerId;
          const isActivePlayer = isPlayerActiveOnTableFromGlobalUserInfos({
            playerId,
            tableId,
            globalUserInfos,
          });
          const isInvitePending = table_status === "expected";

          // Player
          return {
            playerId,
            playerName,
            isActivePlayer,
            isCurrentPlayer,
            isInvitePending,
          };
        }),
      };
    }
  );
}
