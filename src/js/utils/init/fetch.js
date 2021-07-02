import { fetchActivityForPlayer } from "../fetchActivityForPlayer";
import { fetchCurrentPlayer } from "../fetchCurrentPlayer";
import { fetchGlobalInfo } from "../fetchGlobalInfo";
import { fetchGlobalTranslations } from "../fetchGlobalTranslations";
import { fetchTableInfo } from "../fetchTableInfo";
import { fetchTables } from "../fetchTables";

export async function fetch() {
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
    return { isLoggedOut: true };
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

  const tables = await fetchTables();
  const tablesInfos = (
    await Promise.all(
      tables.map(({ id: tableId }) => fetchTableInfo({ tableId }))
    )
  ).reduce(
    (prev, tableInfos) => ({ [tableInfos.id]: tableInfos, ...prev }),
    {}
  );

  return {
    nbWaitingTables,
    currentPlayerId,
    globalUserInfos,
    translations,
    assetsUrl,
    tables,
    tablesInfos,
  };
}
