export function isPlayerActiveOnTableFromGlobalUserInfos({
  playerId,
  tableId,
  globalUserInfos,
}) {
  return !!globalUserInfos.async_status[tableId].actives.find(
    (id) => id === playerId
  );
}
