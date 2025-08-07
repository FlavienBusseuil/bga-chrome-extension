const fs = require("fs");
const manifest = require("../build/prod/manifest.json");
const path = require('path');

const backgroundFileName = manifest.background.service_worker;
const buildPath = path.join(__dirname, '../build/prod');

fs.unlinkSync(`${buildPath}/${backgroundFileName}`);

manifest.background.service_worker = "background.js";

const resultPath = path.join(__dirname, '../build/prod/manifest.json');

fs.writeFile(
	resultPath,
	JSON.stringify(manifest),
	(err) => {
		if (err) {
			throw err;
		}
	},
);