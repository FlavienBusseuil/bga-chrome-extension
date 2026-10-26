import type { GameConfig } from "../config/games";
import { getExtensionVersion } from "./browser";

// The games CSS and configurations updated since the last release are published on the "games-files" branch (see .github/workflows/PublishGamesFiles.yml)
// They are stored in the local storage, under keys ignored by the configuration
// The mirrors are tried in this order, starting with the last one which answered: the first one can be slow or blocked in some countries (China)
const REMOTE_GAMES_URLS = [
	"https://cdn.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/games.json",
	"https://fastly.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/games.json",
	"https://gcore.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/games.json",
];
const REQUEST_TIMEOUT = 10000;
export const REMOTE_GAMES_PREFIX = "remoteGames:";
const GAMES_KEY = `${REMOTE_GAMES_PREFIX}games`;
const MIRROR_KEY = `${REMOTE_GAMES_PREFIX}mirror`;

// A configuration set to null removes the configuration of the extension
export type RemoteGame = {
	css?: string,
	config?: GameConfig | null,
};

type RemoteGames = {
	version: string,
	games: Record<string, RemoteGame>,
};

export const isRemoteGamesKey = (key: string) => key.startsWith(REMOTE_GAMES_PREFIX);

const getGameKey = (game: string) => `${REMOTE_GAMES_PREFIX}game:${game}`;

const getStoredGames = async (): Promise<string[]> => (await chrome.storage.local.get(GAMES_KEY))[GAMES_KEY] as string[] | undefined ?? [];

const readRemoteGame = async (game: string): Promise<RemoteGame> => {
	try {
		const key = getGameKey(game);
		return (await chrome.storage.local.get(key))[key] as RemoteGame | undefined ?? {};
	} catch (error) {
		console.error(`[bga extension] Unable to read the remote files of ${game}`, error);
		return {};
	}
};

// Read once per page: the CSS and the configuration of the game are read at different times
const remoteGameReadings = new Map<string, Promise<RemoteGame>>();

export const getRemoteGame = (game: string): Promise<RemoteGame> => {
	if (!remoteGameReadings.has(game)) {
		remoteGameReadings.set(game, readRemoteGame(game));
	}
	return remoteGameReadings.get(game)!;
};

const storeGames = async (games: Record<string, RemoteGame>) => {
	const previousGames = await getStoredGames();
	const removedKeys = previousGames.filter(game => games[game] === undefined).map(getGameKey);

	const storedKeys = Object.keys(games).map(getGameKey);
	const storedValues = await chrome.storage.local.get(storedKeys);
	const changedValues = Object.fromEntries(
		Object.entries(games)
			.map(([game, remoteGame]) => [getGameKey(game), remoteGame] as const)
			.filter(([key, remoteGame]) => JSON.stringify(storedValues[key]) !== JSON.stringify(remoteGame))
	);

	if (removedKeys.length) {
		await chrome.storage.local.remove(removedKeys);
	}
	if (Object.keys(changedValues).length || removedKeys.length) {
		await chrome.storage.local.set({ ...changedValues, [GAMES_KEY]: Object.keys(games) });
		console.log(`[bga extension] Remote files updated for: ${Object.keys(games).join(", ") || "-"}`);
	}
};

// The extension files are up to date after an update: the files downloaded for the previous version are removed
export const clearRemoteGames = async () => {
	const previousGames = await getStoredGames();
	await chrome.storage.local.remove([GAMES_KEY, ...previousGames.map(getGameKey)]);
};

const fetchRemoteGames = async (): Promise<RemoteGames> => {
	let lastError: unknown;

	const preferredUrl = (await chrome.storage.local.get(MIRROR_KEY))[MIRROR_KEY] as string | undefined;
	const urls = REMOTE_GAMES_URLS.includes(preferredUrl ?? "")
		? [preferredUrl as string, ...REMOTE_GAMES_URLS.filter(url => url !== preferredUrl)]
		: REMOTE_GAMES_URLS;

	for (const url of urls) {
		try {
			// "no-cache": the file is revalidated (a 304 response when it has not changed)
			const response = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			const remoteGames: RemoteGames = await response.json();

			if (url !== preferredUrl) {
				await chrome.storage.local.set({ [MIRROR_KEY]: url });
			}
			return remoteGames;
		} catch (error) {
			console.warn(`[bga extension] Unable to download ${url}`, error);
			lastError = error;
		}
	}

	throw lastError;
};

export const updateRemoteGames = async () => {
	try {
		// An unpacked extension uses the files being developed
		if ((await chrome.management.getSelf()).installType === "development") {
			await clearRemoteGames();
			return;
		}

		const { version, games } = await fetchRemoteGames();

		// The files are built for one release only: an older or newer extension keeps its own files
		await storeGames(version === getExtensionVersion() ? games : {});
	} catch (error) {
		console.error("[bga extension] Unable to update the remote files of the games", error);
	}
};
