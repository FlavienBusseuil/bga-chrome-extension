const fs = require("fs");
const manifest = require("../build/prod-firefox/manifest.json");
const path = require('path');

const backgroundFileName = manifest.background.scripts[0];
const buildPath = path.join(__dirname, '../build/prod-firefox');

fs.unlinkSync(`${buildPath}/${backgroundFileName}`);
fs.renameSync(`${buildPath}/background.js`, `${buildPath}/${backgroundFileName}`);
fs.readdirSync(buildPath).map(file => {
	if (file !== backgroundFileName && file.startsWith('background')) {
		fs.unlinkSync(`${buildPath}/${file}`);
	}
});
