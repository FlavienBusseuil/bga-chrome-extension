import { useLayoutEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";

import type { TransformedTable } from "../../types/TransformedTable";

import { i18n } from "../../utils/browser/i18n";

import { PlayerList } from "../PlayerList";
import { EmptySeats, Player } from "../Player";
import { Button } from "../base/Button";
import { Table } from "../Table";
import { CardList } from "../base/CardList";
import { cn } from "../utils/cn";
import { Loading } from "../Loading";
import type { Group } from "../../types/bga/Group";
import type Configuration from "../../config/configuration";
import type { TableKind, TablesMode } from "../../config/configuration";
import { PlayersDisplaySwitch } from "../PlayersDisplaySwitch";
import { ClockIcon, LightningIcon } from "../icons";

type Props = {
  className?: string,
  getGroupTables: ((groupId: string) => Promise<TransformedTable[]>) | undefined,
  groups: Group[],
  motionSensitivityEnable: boolean,
  closePopupOnClick: boolean,
  focusOnNewTab: boolean | undefined;
  config: Configuration,
};

// Realtime and turn based are exclusive: a switch with both of them
// The icons replace the labels when they keep the filters on one line
const MODES: Array<{ mode: TablesMode, label: string, title: string, icon?: JSX.Element }> = [
  { mode: "all", label: "all_tables", title: "all_tables_title" },
  { mode: "realtime", label: "realtime", title: "realtime_tables_title", icon: <LightningIcon /> },
  { mode: "turn", label: "turn_based", title: "turn_based_tables_title", icon: <ClockIcon /> },
];

// Labels if the filters fit on one line with them, else icons if they fit on one line with them, else labels on two
// lines. The height of the toolbar is given to the list (popup.css).
const layoutToolbar = (toolbar: HTMLElement) => {
  const fitsOnOneLine = (icons: boolean) => {
    toolbar.classList.toggle("view-toolbar--icons", icons);
    const items = [...toolbar.children];
    const gap = parseFloat(getComputedStyle(toolbar).columnGap) || 0;
    const width = items.reduce((total, item) => total + item.getBoundingClientRect().width, 0) + gap * (items.length - 1);
    return width <= toolbar.clientWidth;
  };

  toolbar.classList.toggle("view-toolbar--icons", !fitsOnOneLine(false) && fitsOnOneLine(true));
  toolbar.parentElement?.style.setProperty("--toolbar-height", `${toolbar.offsetHeight}px`);
};

// The kinds of tables are filters: all checked by default, an unchecked kind hides its tables
const KINDS: Array<{ kind: TableKind, label: string }> = [
  { kind: "arena", label: "arena" },
  { kind: "ranked", label: "ranked" },
  { kind: "training", label: "friendly" },
];

const getKind = (table: TransformedTable): TableKind =>
  table.hasArenaMode ? "arena" : table.hasTrainingMode ? "training" : "ranked";

const isShown = (table: TransformedTable, mode: TablesMode, hiddenKinds: TableKind[]) =>
  (mode === "all" || (mode === "turn") === table.isTurnBased) && !hiddenKinds.includes(getKind(table));

export const FriendsView = ({ className, getGroupTables, groups, motionSensitivityEnable, closePopupOnClick, focusOnNewTab, config }: Props) => {
  const [tables, setTables] = useState<TransformedTable[]>([]);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [group, setGroup] = useState("0");
  const [mode, setMode] = useState<TablesMode>(config.getPopupFriendsMode());
  const [hiddenKinds, setHiddenKinds] = useState<TableKind[]>(config.getPopupFriendsHiddenKinds());
  // Independent from the display of the players of the tables view
  const [playersCompact, setPlayersCompact] = useState(config.isPopupFriendsPlayersCompact());
  const shownTables = tables.filter((table) => isShown(table, mode, hiddenKinds));
  const toolbarRef = useRef<HTMLDivElement>(null);
  const hasTables = tables.length > 0;

  // Laid out again when the width changes, and when the players display switch appears or disappears
  useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) {
      return;
    }

    layoutToolbar(toolbar);
    const observer = new ResizeObserver(() => layoutToolbar(toolbar));
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, [requested, loading, hasTables]);

  const updateMode = (newMode: TablesMode) => {
    setMode(newMode);
    config.setPopupFriendsMode(newMode);
  };

  const toggleKind = (kind: TableKind) => {
    const newHiddenKinds = hiddenKinds.includes(kind) ? hiddenKinds.filter((k) => k !== kind) : [...hiddenKinds, kind];
    setHiddenKinds(newHiddenKinds);
    config.setPopupFriendsHiddenKinds(newHiddenKinds);
  };

  const updatePlayersCompact = (compact: boolean) => {
    setPlayersCompact(compact);
    config.setPopupFriendsPlayersCompact(compact);
  };

  const search = () => {
    if (!getGroupTables) {
      return;
    }

    setLoading(true);
    setRequested(true);

    getGroupTables(group)
      .then(setTables)
      .catch((error) => {
        console.error("[bga extension] Unable to fetch group tables", error);
        setTables([]);
      })
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <div className={cn(["view-loading", className || ''])}>
        <div className="max-result">
          <Loading />
        </div>
      </div>
    );
  }

  const noGame = () => {
    const msg = tables.length > 0 ? i18n("no_games_filters") : requested ? i18n("no_games_friends") : i18n("search_games_friends");
    return (
      <div className="view-empty">
        <span class="view-empty-text">
          {msg}
        </span>
      </div>
    );
  }

  const getOptions = () => {
    return groups.filter(g => g.name !== 'BGA reviewers' && g.name !== 'Tutorial Makers').map((g, index) => <option key={`opt_${index}`} value={g.id}>{g.name}</option>);
  }

  return (
    <div className={cn(["view", requested && "view--toolbar", className || ''])}>
      {shownTables.length === 0 && noGame()}

      {shownTables.length > 0 && (
        <div className="max-result">
          <CardList>
            {shownTables.map(
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
                const isCurrentPlayerAtTable = players.some(({ isCurrentPlayer }) => isCurrentPlayer);
                const isInvitePendingForCurrentPlayer =
                  players.some(
                    ({ isCurrentPlayer, isInvitePending }) =>
                      isCurrentPlayer && isInvitePending,
                  );

                return (
                  <Table
                    key={String(tableId)}
                    {...{
                      hasArenaMode,
                      isCurrentPlayerAtTable,
                      isInvitePendingForCurrentPlayer,
                      isOpenForPlayers,
                      isWaitingCurrentPlayer,
                      motionSensitivityEnable,
                      closePopupOnClick,
                      focusOnNewTab,
                      ...restTable,
                    }}
                  >
                    <PlayerList compact={playersCompact}>
                      {[
                        ...players.map(
                          ({
                            playerId,
                            playerName,
                            avatarUrl,
                            isActivePlayer,
                            isInvitePending,
                          }) => (
                            <Player
                              key={String(playerId)}
                              playerName={playerName}
                              avatarUrl={avatarUrl}
                              isActivePlayer={
                                isActivePlayer
                              }
                              isInvitePending={
                                isInvitePending
                              }
                            />
                          ),
                        ),
                        <EmptySeats key="seats" count={nbMissingPlayers} />,
                      ]}
                    </PlayerList>
                  </Table>
                );
              },
            )}
          </CardList>
        </div>
      )}
      {/* Useless before the first search */}
      {requested && <div ref={toolbarRef} className="view-toolbar" role="group" aria-label={i18n("table_filters")}>
        <div className="mode-switch" role="radiogroup">
          {MODES.map(({ mode: value, label, title, icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              className={`mode-switch-${value}`}
              aria-checked={mode === value}
              title={i18n(title)}
              onClick={() => updateMode(value)}
            >
              <span className={cn(["mode-switch-label", Boolean(icon) && "mode-switch-label--icon"])}>{i18n(label)}</span>
              {icon && <span className="mode-switch-icon">{icon}</span>}
            </button>
          ))}
        </div>
        <div className="table-filters">
          {KINDS.map(({ kind, label }) => (
            <button
              key={kind}
              type="button"
              className={`table-filter table-filter--${kind}`}
              aria-pressed={!hiddenKinds.includes(kind)}
              onClick={() => toggleKind(kind)}
            >
              {i18n(label)}
            </button>
          ))}
        </div>
        {hasTables && <PlayersDisplaySwitch compact={playersCompact} onChange={updatePlayersCompact} />}
      </div>}
      <div className="view-actions">
        <select
          id="group-select"
          className="select grow"
          value={group}
          onChange={(evt: any) => evt.target && setGroup(evt.target.value)}
        >
          <option value="0">{i18n("my_friends")}</option>
          {getOptions()}
        </select>
        <Button
          {...{
            text: i18n("search"),
            className: "grow",
            onClick: search,
          }}
        />
      </div>
    </div>
  );
}
