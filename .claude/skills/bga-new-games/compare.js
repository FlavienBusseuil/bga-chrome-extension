// Compares the list of the BGA games with the previous snapshot and the files of src/games
// Usage: node compare.js <dump.json> [--update]
// - dump.json: [[name, status, display_name_en, published_on, beta_on, id], ...] from globalUserInfos.game_list (see SKILL.md)
// - --update: replaces the snapshot (local/bga-games.tsv) with the dump
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../..');
const SNAPSHOT = path.join(ROOT, 'local/bga-games.tsv');
const GAMES = path.join(ROOT, 'src/games');
// Partials imported by the styles of the games
const PARTIALS = ['common', 'gipfProject'];
const isAlpha = status => /alpha/.test(status);

const [dumpPath, option] = process.argv.slice(2);
if (!dumpPath) {
	throw new Error('Usage: node compare.js <dump.json> [--update]');
}

// the file written by the Playwright MCP may contain the JSON as a string
let dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
if (typeof dump === 'string') {
	dump = JSON.parse(dump);
}
if (!Array.isArray(dump) || dump.length < 1000) {
	throw new Error(`Unexpected dump (${Array.isArray(dump) ? dump.length + ' games' : typeof dump}): the list of the games is probably incomplete`);
}

const current = new Map(dump.map(([id, status, name, published, beta, num]) => [id, { status, name, published, beta, num }]));
const previous = new Map(fs.existsSync(SNAPSHOT)
	? fs.readFileSync(SNAPSHOT, 'utf8').split('\n').filter(Boolean).map(line => {
		const [id, status, name] = line.split('\t');
		return [id, { status, name }];
	})
	: []);
const handled = new Set(fs.readdirSync(GAMES).map(file => file.replace(/\.(json|less|ts)$/, '')));

const format = (id, game) => `- ${game.name} (${id}): ${game.status}${game.beta ? `, beta since ${game.beta}` : ''} — tables: /gametables?game=${game.num}&all`;

// new for the players: not in the previous snapshot, or out of alpha since then
const newGames = [...current].filter(([id, game]) => !isAlpha(game.status) && !handled.has(id)
	&& (!previous.has(id) || isAlpha(previous.get(id).status)));
const removed = [...handled].filter(id => !PARTIALS.includes(id) && !current.has(id));

console.log(previous.size ? `Previous snapshot: ${previous.size} games` : 'No previous snapshot: every game without a file is listed');
console.log(`BGA: ${current.size} games (${dump.filter(([, status]) => isAlpha(status)).length} in alpha)\n`);
console.log(`## New games without a theme (${newGames.length})`);
console.log(newGames.map(([id, game]) => format(id, game)).join('\n') || '(none)');
console.log(`\n## Files of src/games without a game in the list of BGA (${removed.length})`);
console.log(removed.join(', ') || '(none)');

if (option === '--update') {
	fs.mkdirSync(path.dirname(SNAPSHOT), { recursive: true });
	fs.writeFileSync(SNAPSHOT, dump.map(([id, status, name]) => [id, status, name].join('\t')).join('\n') + '\n');
	console.log(`\nSnapshot updated: ${SNAPSHOT}`);
}
