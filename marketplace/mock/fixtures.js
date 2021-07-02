// Presentation fixures
const presentation = {
  nbWaitingTables: 2,
  tables: [
    {
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
    {
      gameName: "Splendor",
      tableCreatorName: "anotherFlav",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/210520-0804/games/splendor/210516-0818/img/game_icon.png",
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
      ],
    },
    {
      gameName: "Super Fantasy Brawl",
      tableCreatorName: "Dravalha",
      tableImg:
        "https://x.boardgamearena.net/data/themereleases/current/games/superfantasybrawl/210415-1135/img/game_icon.png",
      link: "",
      isOpenForPlayers: false,
      isWaitingCurrentPlayer: false,
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
  ],
};

// Debug fixtures
const debug = {
  nbWaitingTables: 1,
  tables: [
    {
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
      gameName: "Super Fantasy Brawl",
      tableCreatorName: "Dravalha",
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
          isInvitePending: true,
        },
        {
          playerName: "Dravalha",
          isActivePlayer: false,
        },
      ],
    },
    {
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

export { presentation, debug };
