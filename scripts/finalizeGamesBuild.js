// Finalizes the files of the games (src/games) in a build. Hundreds of small files make the package of the extension
// much bigger than a few files with the same content, so:
// - the configurations of the games ({gameName}.json) are merged in "games/_configs.json"
// - the styles of the games ({gameName}.less, compiled by Parcel) are grouped by first letter in "games/_styles_{letter}.json"
// - Parcel lists every file matching the patterns of web_accessible_resources: they are replaced by patterns,
//   and the list of the files is written in "games/_index.json" (read by checkIfResourcePathExists, see src/js/utils/browser/index.ts)
// See src/js/config/games.ts for the reading of these files
// Usage: node scripts/finalizeGamesBuild.js <build folder> [--watch]
const fs = require('fs');
const path = require('path');

const GAMES_FOLDER = 'games/';
const INDEX_FILE = '_index.json';
const CONFIGS_FILE = '_configs.json';
const getStylesFile = letter => `_styles_${letter}.json`;
// Partials only imported by the games styles
const PARTIALS = ['common'];
const SRC_GAMES_PATH = path.join(__dirname, '../src/games');

const [buildPath, watchOption] = process.argv.slice(2);
if (!buildPath) {
	throw new Error('Usage: node scripts/finalizeGamesBuild.js <build folder> [--watch]');
}

const isWatching = watchOption === '--watch';
const manifestPath = path.join(buildPath, 'manifest.json');
const gamesPath = path.join(buildPath, GAMES_FOLDER);

// Files are only written when they change: with --watch, writing the manifest triggers a new run
const writeIfChanged = (filePath, content) => {
	if (!fs.existsSync(filePath) || fs.readFileSync(filePath, { encoding: 'utf8' }) !== content) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, content);
		return true;
	}
	return false;
};

const listFiles = (folder, extension) => fs.existsSync(folder)
	? fs.readdirSync(folder).filter(file => file.endsWith(extension) && !file.startsWith('_')).sort()
	: [];

const mergeConfigs = () => {
	const configs = Object.fromEntries(listFiles(SRC_GAMES_PATH, '.json').map(file => {
		const filePath = path.join(SRC_GAMES_PATH, file);
		try {
			return [file.slice(0, -'.json'.length), JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))];
		} catch (error) {
			throw new Error(`Unable to read ${filePath}: ${error.message}`);
		}
	}));

	if (writeIfChanged(path.join(gamesPath, CONFIGS_FILE), JSON.stringify(configs))) {
		console.log(`[games build] ${Object.keys(configs).length} configurations merged in ${GAMES_FOLDER}${CONFIGS_FILE}`);
	}
};

const groupStyles = () => {
	const cssFiles = listFiles(gamesPath, '.css');
	const groups = {};

	cssFiles.map(file => file.slice(0, -'.css'.length)).filter(game => !PARTIALS.includes(game)).forEach(game => {
		const letter = game[0];
		groups[letter] = { ...groups[letter], [game]: fs.readFileSync(path.join(gamesPath, `${game}.css`), { encoding: 'utf8' }) };
	});

	// Without --watch, the files are not modified anymore: the grouped files replace them
	// With --watch, they are kept to group them again when one of them is modified by Parcel
	const changedGroups = Object.entries(groups).filter(([letter, styles]) => writeIfChanged(path.join(gamesPath, getStylesFile(letter)), JSON.stringify(styles)));
	fs.readdirSync(gamesPath)
		.filter(file => file.startsWith('_styles_') && !groups[file.slice('_styles_'.length, -'.json'.length)])
		.forEach(file => fs.unlinkSync(path.join(gamesPath, file)));

	if (changedGroups.length) {
		console.log(`[games build] ${cssFiles.length} styles grouped in ${Object.keys(groups).length} files (updated: ${changedGroups.map(([letter]) => letter).join(', ')})`);
	}
	if (!isWatching) {
		cssFiles.forEach(file => fs.unlinkSync(path.join(gamesPath, file)));
	}
};

const compactManifest = () => {
	if (!fs.existsSync(manifestPath)) {
		return;
	}

	const manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }));
	// The scripts injected in the pages ({gameName}.ts) and the files built above
	const gamesResources = [`${GAMES_FOLDER}*.js`, `${GAMES_FOLDER}_*.json`];
	const isGameFile = resource => resource.startsWith(GAMES_FOLDER) && !resource.slice(GAMES_FOLDER.length).includes('/');

	manifest.web_accessible_resources.forEach(entry => {
		if (entry.resources.some(isGameFile)) {
			entry.resources = [...entry.resources.filter(resource => !isGameFile(resource)), ...gamesResources];
		}
	});

	const files = fs.readdirSync(gamesPath).filter(file => file.endsWith('.js') || (file.startsWith('_') && file.endsWith('.json') && file !== INDEX_FILE)).sort();
	if (writeIfChanged(path.join(gamesPath, INDEX_FILE), JSON.stringify(files))) {
		console.log(`[games build] ${files.length} files listed in ${GAMES_FOLDER}${INDEX_FILE}`);
	}

	if (writeIfChanged(manifestPath, JSON.stringify(manifest))) {
		console.log(`[games build] ${manifestPath} updated`);
	}
};

const run = () => {
	mergeConfigs();
	groupStyles();
	compactManifest();
};

run();

if (isWatching) {
	let timeout = null;
	const scheduleRun = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			try {
				run();
			} catch (error) {
				// a file may be read while it is written: done again on the next change
				console.error(`[games build] ${error.message}`);
			}
		}, 500);
	};

	fs.mkdirSync(buildPath, { recursive: true });
	fs.watch(buildPath, { recursive: true }, (_, fileName) => {
		const file = (fileName || '').replace(/\\/g, '/');
		const isGameFile = file.startsWith(GAMES_FOLDER) && !file.slice(GAMES_FOLDER.length).startsWith('_');
		if (file === 'manifest.json' || (isGameFile && (file.endsWith('.css') || file.endsWith('.js')))) {
			scheduleRun();
		}
	});
	fs.watch(SRC_GAMES_PATH, (_, fileName) => {
		if ((fileName || '').endsWith('.json')) {
			scheduleRun();
		}
	});
	console.log(`[games build] watching ${buildPath} and ${SRC_GAMES_PATH}`);
}
