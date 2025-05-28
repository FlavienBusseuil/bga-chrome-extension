import { useState } from "preact/hooks";

import type { TransformedTable } from "../../types/TransformedTable";
import type { TableId } from "../../types/bga/Table";

import { i18n } from "../../utils/browser/i18n";

import { PlayerList } from "../PlayerList";
import { Player } from "../Player";
import { Button } from "../base/Button";
import { Table } from "../Table";
import { CardList } from "../base/CardList";
import { cn } from "../utils/cn";
import { Loading } from "../Loading";
import type { Group } from "../../types/bga/Group";

type Props = {
  className?: string,
  getGroupTables: ((groupId: string) => Promise<TransformedTable[]>) | undefined,
  groups: Group[],
  motionSensitivityEnable: boolean
};

export const FriendsView = ({ className, getGroupTables, groups, motionSensitivityEnable }: Props) => {
  const [tables, setTables] = useState<TransformedTable[]>([]);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [group, setGroup] = useState("0");
  const handleAcceptOrDeclineInvite = (tableId: TableId) => { };

  const search = () => {
    setLoading(true);
    setRequested(true);
    debugger;
    if (getGroupTables) {
      getGroupTables(group).then(tables => {
        setTables(tables);
        setLoading(false);
      });
    }
  }

  if (loading) {
    return (
      <div className={cn(["flex justify-center flex-row", className || ''])}>
        <div className="max-result flex justify-center flex-col">
          <Loading />
        </div>
      </div>
    );
  }

  const noGame = () => {
    const msg = requested ? i18n("no_games_friends") : i18n("search_games_friends");
    return (
      <div className="flex justify-center flex-col grow" style={{ minHeight: "60px" }}>
        <span class="text-black dark:text-white text-center text-xl">
          {msg}
        </span>
      </div>
    );
  }

  const getOptions = () => {
    return groups.map((g, index) => <option key={`opt_${index}`} value={g.id}>{g.name}</option>);
  }

  return (
    <div className={cn(["flex justify-between flex-col gap-2", className || ''])}>
      {tables.length === 0 && noGame()}

      {(tables.length === 0 && !requested) && (
        <span></span>
      )}

      {tables.length > 0 && (
        <div className="max-result">
          <CardList>
            {tables.map(
              ({
                nbMaxPlayers,
                players,
                hasArenaMode,
                isOpenForPlayers,
                tableId,
                gameStart,
                ...restTable
              }) => {
                const nbMissingPlayers = isOpenForPlayers
                  ? nbMaxPlayers - players.length
                  : 0;
                const isWaitingCurrentPlayer = players.some(
                  ({ isCurrentPlayer, isActivePlayer }) =>
                    isCurrentPlayer && isActivePlayer,
                );
                const isInvitePendingForCurrentPlayer =
                  players.some(
                    ({ isCurrentPlayer, isInvitePending }) =>
                      isCurrentPlayer && isInvitePending,
                  );

                return (
                  <Table
                    key={String(tableId)}
                    {...{
                      onAcceptInvite: handleAcceptOrDeclineInvite,
                      onDeclineInvite: handleAcceptOrDeclineInvite,
                      tableId,
                      hasArenaMode,
                      isInvitePendingForCurrentPlayer,
                      isOpenForPlayers,
                      isWaitingCurrentPlayer,
                      motionSensitivityEnable,
                      ...restTable,
                    }}
                  >
                    <PlayerList>
                      {[
                        ...players.map(
                          ({
                            playerId,
                            playerName,
                            isActivePlayer,
                            isInvitePending,
                          }) => (
                            <Player
                              key={String(playerId)}
                              playerName={playerName}
                              isActivePlayer={
                                isActivePlayer
                              }
                              isInvitePending={
                                isInvitePending
                              }
                            />
                          ),
                        ),
                        ...Array.from(
                          Array(nbMissingPlayers),
                        ).map(() => (
                          <Player playerName="🪑 ..." />
                        )),
                      ]}
                    </PlayerList>
                  </Table>
                );
              },
            )}
          </CardList>
        </div>
      )}
      <div className={cn(["flex justify-between flex-row gap-2", className || ''])}>
        <select
          id="group-select"
          className="flex-grow border border-black dark:dark:border-white rounded"
          value={group}
          onChange={(evt: any) => evt.target && setGroup(evt.target.value)}
        >
          <option value="0">{i18n("my_friends")}</option>
          {getOptions()}
        </select>
        <Button
          {...{
            text: i18n("search"),
            className: "flex-grow",
            onClick: search,
          }}
        />
      </div>
    </div>
  );
}
