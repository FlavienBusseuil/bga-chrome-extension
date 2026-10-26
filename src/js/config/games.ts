import type { Game } from "./models";
import { checkIfResourcePathExists, getUrl } from "../utils/browser";
import { getRemoteGame } from "../utils/remoteGames";

// The files of each game are in src/games:
// - {gameName}.less: the style of the game
// - {gameName}.json: its configuration (see gameConfig.schema.json)
// - {gameName}.ts: a script injected in the page context, for a game which needs some code
// The style and the configuration can be updated without updating the extension (see utils/remoteGames.ts)
export interface GameConfig {
  customBack?: boolean | string[];
  customPanel?: boolean;
  twoTeams?: boolean;
  overlay?: boolean;
  customDarkMode?: {
    className: string;
    applyGeneralCss: boolean;
  };
  customPlayerStyle?: string;
  playersBack?: string[];
  playersBorder?: string[];
  playersOutline?: string[];
  playersTextColor?: string[];
  customColors?: string[];
  // CSS variables set on the body (rootCssVars: on the html tag) with an image of the game: { "--back-main": "img/background.png" }
  cssVars?: Record<string, string>;
  rootCssVars?: Record<string, string>;
  // dark mode colors of the game, until the user chooses other ones
  recommendedColor?: {
    hue: number;
    saturation: number;
  };
  // the side menu of the game (completed with the default values, see ConfigurationWithGames)
  sideMenu?: Partial<Game>;
}

const configurations: Record<string, GameConfig | undefined> = {};
const loadings = new Map<string, Promise<void>>();

// The files of the games are grouped when building the extension (see scripts/finalizeGamesBuild.js)
// Only the entry of the game is kept: the rest of the file is freed from the memory
const readGroupedFile = async <T>(fileName: string, gameName: string): Promise<T | undefined> => {
  const path = `/games/${fileName}`;

  if (!(await checkIfResourcePathExists(path))) {
    return undefined;
  }

  try {
    const response = await fetch(getUrl(path));
    const entries: Record<string, T> = await response.json();
    return entries[gameName];
  } catch (error) {
    console.error(`[bga extension] Unable to read ${path}`, error);
    return undefined;
  }
};

const readExtensionConfig = (gameName: string) => readGroupedFile<GameConfig>("_configs.json", gameName);

// To be awaited before reading the configuration of the game
export const loadGameConfig = (gameName: string): Promise<void> => {
  if (!loadings.has(gameName)) {
    loadings.set(gameName, (async () => {
      // a configuration updated since the release of the extension takes precedence (null: the configuration has been removed)
      const { config } = await getRemoteGame(gameName);
      configurations[gameName] = config !== undefined ? config ?? undefined : await readExtensionConfig(gameName);
    })());
  }
  return loadings.get(gameName)!;
};

export const getGameConfig = (gameName: string): GameConfig | undefined => configurations[gameName];

export const getGameStyle = async (gameName: string): Promise<string | undefined> => {
  // a style updated since the release of the extension takes precedence
  const { css } = await getRemoteGame(gameName);
  return css ?? readGroupedFile<string>(`_styles_${gameName[0]}.json`, gameName);
};

export const hasPageScript = (gameName: string): Promise<boolean> => checkIfResourcePathExists(`/games/${gameName}.js`);
