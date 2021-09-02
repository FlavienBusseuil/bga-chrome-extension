// Debug fixtures
const debug = {
  nbWaitingTables: 1,
  tables: [
    {
      tableId: "917340297",
      gameName: "Super Fantasy Brawl",
      tableCreatorName: "Dravalha",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/current/games/superfantasybrawl/210415-1135/img/game_icon.png",
      link: "",
      isOpenForPlayers: false,
      players: [
        {
          playerName: "anotherFlav",
          isActivePlayer: false,
          isCurrentPlayer: true,
        },
        {
          playerName: "Dravalha",
          isActivePlayer: true,
        },
      ],
    },
    {
      tableId: "20394702934",
      gameName: "Super Fantasy Brawl",
      tableCreatorName: "anotherFlav",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/current/games/superfantasybrawl/210415-1135/img/game_icon.png",
      link: "",
      isOpenForPlayers: true,
      isWaitingCurrentPlayer: false,
      nbMaxPlayers: 4,
      players: [
        {
          playerName: "anotherFlav",
          isActivePlayer: false,
          isCurrentPlayer: true,
        },
      ],
    },
    {
      tableId: "99999999999",
      gameName: "Super Fantasy Brawl",
      tableCreatorName: "Dravalha",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/current/games/superfantasybrawl/210415-1135/img/game_icon.png",
      link: "",
      isOpenForPlayers: true,
      isWaitingCurrentPlayer: false,
      nbMaxPlayers: 4,
      acceptInviteLink: `https://boardgamearena.com/table/table/joingame.html?table=99999999999`,
      declineInviteLink: `https://boardgamearena.com/table/table/refuseInvitation.html?table=99999999999`,
      players: [
        {
          playerName: "anotherFlav",
          isActivePlayer: false,
          isCurrentPlayer: true,
          isInvitePending: true,
        },
        {
          playerName: "Dravalha",
          isActivePlayer: false,
        },
      ],
    },
    {
      tableId: "309248029438",
      gameName: "Dungeon Petz",
      tableCreatorName: "anotherFlav",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/210520-0804/games/dungeonpetz/210506-0041/img/game_icon.png",
      link: "",
      isOpenForPlayers: false,
      isWaitingCurrentPlayer: true,
      players: [
        {
          playerName: "anotherFlav",
          isActivePlayer: true,
          isCurrentPlayer: true,
        },
        {
          playerName: "AriusC",
          isActivePlayer: false,
        },
        {
          playerName: "Talion4",
          isActivePlayer: false,
        },
        {
          playerName: "Domiin",
          isActivePlayer: true,
        },
      ],
    },
  ],
};

const acceptedInviteTable = {
  tableId: "99999999999",
  gameName: "Super Fantasy Brawl",
  tableCreatorName: "Dravalha",
  tableImg:
    "https://x.boardgamearena.net/data/themereleases/current/games/superfantasybrawl/210415-1135/img/game_icon.png",
  link: "",
  isOpenForPlayers: true,
  isWaitingCurrentPlayer: true,
  nbMaxPlayers: 4,
  players: [
    {
      playerName: "anotherFlav",
      isActivePlayer: true,
      isCurrentPlayer: true,
    },
    {
      playerName: "Dravalha",
      isActivePlayer: false,
    },
  ],
};

export { debug, acceptedInviteTable };
