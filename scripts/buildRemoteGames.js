// Builds the file of the games CSS and configurations updated since the last release, downloaded by the extension
// (see src/js/utils/remoteGames.ts)
// Usage: node scripts/buildRemoteGames.js <release src folder> <current src folder> <version> <publication date> <output file>
// The publication date (a timestamp) lets the extension ignore an older file served by a mirror
const fs = require('fs');
const path = require('path');
const less = require('less');

// Folder of the files of the games ({gameName}.less, {gameName}.json), and its location in the releases before its creation
const GAMES_FOLDER = 'games';
const OLD_GAMES_CSS_FOLDER = 'css/games';

// Partials only imported by the games files
const PARTIALS = ['common.less'];

// The configuration is validated with its JSON schema (also used by VS Code)
const GAME_CONFIG_SCHEMA = path.join(__dirname, '../src/js/config/gameConfig.schema.json');

const getType = val => Array.isArray(val) ? 'array' : val === null ? 'null' : typeof val;

// Only the keywords used by the schema are supported: type, enum, properties, additionalProperties, required, items, anyOf
const validate = (value, schema, location) => {
	if (schema.anyOf) {
		return schema.anyOf.some(subSchema => !validate(value, subSchema, location).length) ? [] : [`${location}: invalid value`];
	}
	if (schema.type && getType(value) !== schema.type) {
		return [`${location}: ${schema.type} expected`];
	}
	if (schema.enum && !schema.enum.includes(value)) {
		return [`${location}: ${schema.enum.join(' | ')} expected`];
	}
	if (schema.type === 'array' && schema.items) {
		return value.flatMap((item, index) => validate(item, schema.items, `${location}[${index}]`));
	}
	if (schema.type === 'object') {
		const missing = (schema.required ?? []).filter(key => !(key in value)).map(key => `${location}: missing "${key}"`);
		return [...missing, ...Object.entries(value).flatMap(([key, val]) => {
			const propertySchema = schema.properties?.[key] ?? schema.additionalProperties;
			if (propertySchema === undefined || propertySchema === true) {
				return [];
			}
			return propertySchema === false ? [`${location}: unknown property "${key}"`] : validate(val, propertySchema, `${location}.${key}`);
		})];
	}
	return [];
};

const getGamesPath = (srcPath) => {
	const gamesPath = path.join(srcPath, GAMES_FOLDER);
	return fs.existsSync(gamesPath) ? gamesPath : path.join(srcPath, OLD_GAMES_CSS_FOLDER);
};

// Sorted: the order of the files depends on the file system, and the published file must not change without reason
const listGames = (gamesPath, extension) => fs.readdirSync(gamesPath)
	.filter(file => file.endsWith(extension) && !PARTIALS.includes(file))
	.sort()
	.map(file => file.slice(0, -extension.length));

const compileGames = async (srcPath) => {
	const gamesPath = getGamesPath(srcPath);
	const result = {};

	for (const game of listGames(gamesPath, '.less')) {
		const filePath = path.join(gamesPath, `${game}.less`);
		const source = fs.readFileSync(filePath, { encoding: 'utf8' });

		try {
			const { css } = await less.render(source, { filename: filePath });
			result[game] = css;
		} catch (error) {
			throw new Error(`Unable to compile ${filePath}: ${error.message}`);
		}
	}

	return result;
};

// The configurations don't exist in the releases before the creation of the games folder: no configuration is published then
const readConfigs = (srcPath) => {
	const gamesPath = path.join(srcPath, GAMES_FOLDER);
	if (!fs.existsSync(gamesPath)) {
		return null;
	}

	return Object.fromEntries(listGames(gamesPath, '.json').map(game => {
		const filePath = path.join(gamesPath, `${game}.json`);
		try {
			return [game, JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))];
		} catch (error) {
			throw new Error(`Unable to read ${filePath}: ${error.message}`);
		}
	}));
};

const validateConfigs = (configs) => {
	const schema = JSON.parse(fs.readFileSync(GAME_CONFIG_SCHEMA, { encoding: 'utf8' }));
	const errors = Object.entries(configs).flatMap(([game, config]) => validate(config, schema, `${GAMES_FOLDER}/${game}.json`));

	if (errors.length) {
		throw new Error(`Invalid games configuration:\n${errors.join('\n')}`);
	}
};

const main = async () => {
	const [releasePath, currentPath, version, published, outputPath] = process.argv.slice(2);

	if (!releasePath || !currentPath || !version || !Number(published) || !outputPath) {
		throw new Error('Usage: node scripts/buildRemoteGames.js <release src folder> <current src folder> <version> <publication date> <output file>');
	}

	const [releaseCss, currentCss] = await Promise.all([compileGames(releasePath), compileGames(currentPath)]);
	const releaseConfigs = readConfigs(releasePath);
	const currentConfigs = readConfigs(currentPath) ?? {};
	validateConfigs(currentConfigs);

	// Only the games which have changed: the others are already up to date in the extension
	const games = {};
	Object.entries(currentCss)
		.filter(([game, css]) => releaseCss[game] !== css)
		.forEach(([game, css]) => games[game] = { css });

	if (releaseConfigs) {
		const gameNames = new Set([...Object.keys(releaseConfigs), ...Object.keys(currentConfigs)]);
		gameNames.forEach(game => {
			const config = currentConfigs[game] ?? null;
			if (JSON.stringify(releaseConfigs[game] ?? null) !== JSON.stringify(config)) {
				games[game] = { ...games[game], config };
			}
		});
	}

	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, JSON.stringify({ version, published: Number(published), games }));

	const describe = ([game, { css, config }]) => `${game} (${[css !== undefined && 'css', config !== undefined && 'config'].filter(Boolean).join(' + ')})`;
	console.log(`${Object.keys(games).length} game(s) updated since v${version}: ${Object.entries(games).map(describe).join(', ') || '-'}`);
};

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
