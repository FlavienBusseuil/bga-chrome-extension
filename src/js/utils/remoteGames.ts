import type { GameConfig } from "../config/games";
import { getExtensionVersion } from "./browser";

// The games CSS and configurations updated since the last release are published on the "games-files" branch (see .github/workflows/PublishGamesFiles.yml)
// Each version of the extension has its own file (games-{version}.json), the files of the 5 last versions are kept
// They are stored in the local storage, under keys ignored by the configuration
// The mirrors are tried in this order:
// - GitHub serves the last commit of the branch after 5 minutes at most, but it can be slow or blocked in some countries (China)
// - jsDelivr can keep the previous commit of the branch for 12 hours, even after a purge
const REMOTE_GAMES_MIRRORS = [
	"https://raw.githubusercontent.com/FlavienBusseuil/bga-chrome-extension/games-files/",
	"https://cdn.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/",
	"https://fastly.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/",
	"https://gcore.jsdelivr.net/gh/FlavienBusseuil/bga-chrome-extension@games-files/",
];
const REQUEST_TIMEOUT = 10000;
export const REMOTE_GAMES_PREFIX = "remoteGames:";
const GAMES_KEY = `${REMOTE_GAMES_PREFIX}games`;
const PUBLISHED_KEY = `${REMOTE_GAMES_PREFIX}published`;
// the last mirror which answered, stored by the versions until 2.1.1
const MIRROR_KEY = `${REMOTE_GAMES_PREFIX}mirror`;

// A configuration set to null removes the configuration of the extension
export type RemoteGame = {
	css?: string,
	config?: GameConfig | null,
};

type RemoteGames = {
	version: string,
	// the date of the publication: a mirror can serve an older one (jsDelivr)
	published?: number,
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

const getStoredPublished = async (): Promise<number> => (await chrome.storage.local.get(PUBLISHED_KEY))[PUBLISHED_KEY] as number | undefined ?? 0;

const storeGames = async (games: Record<string, RemoteGame>, published: number) => {
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
		await chrome.storage.local.set({ ...changedValues, [GAMES_KEY]: Object.keys(games), [PUBLISHED_KEY]: published });
		console.log(`[bga extension] Remote files updated for: ${Object.keys(games).join(", ") || "-"}`);
	} else if (published !== await getStoredPublished()) {
		await chrome.storage.local.set({ [PUBLISHED_KEY]: published });
	}
};

// The extension files are up to date after an update: the files downloaded for the previous version are removed
export const clearRemoteGames = async () => {
	const previousGames = await getStoredGames();
	await chrome.storage.local.remove([GAMES_KEY, PUBLISHED_KEY, MIRROR_KEY, ...previousGames.map(getGameKey)]);
};

// undefined: the file doesn't exist
const fetchRemoteGames = async (version: string): Promise<RemoteGames | undefined> => {
	let lastError: unknown;

	for (const mirror of REMOTE_GAMES_MIRRORS) {
		const url = `${mirror}games-${version}.json`;

		try {
			// "no-cache": the file is revalidated (a 304 response when it has not changed)
			const response = await fetch(url, { cache: "no-cache", signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
			if (!response.ok && response.status !== 404) {
				throw new Error(`HTTP ${response.status}`);
			}
			return response.status === 404 ? undefined : await response.json();
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

		const extensionVersion = getExtensionVersion();
		const remoteGames = await fetchRemoteGames(extensionVersion);

		// No file: nothing has been published for this version (or it is too old), or the mirror doesn't serve it yet (jsDelivr)
		// The stored files are kept: they are the ones of this version
		if (!remoteGames) {
			return;
		}

		// The files are built for one release only, and a mirror can serve an older publication (jsDelivr)
		const { version, published = 0, games } = remoteGames;
		if (version !== extensionVersion || published < await getStoredPublished()) {
			return;
		}

		await storeGames(games, published);
	} catch (error) {
		console.error("[bga extension] Unable to update the remote files of the games", error);
	}
};
