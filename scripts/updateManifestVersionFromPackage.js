const fs = require("fs");
const manifest = require("../src/manifest.json");
const manifestFF = require("../src/manifest-firefox.json");
const manifestOpera = require("../src/manifest-opera.json");
const package = require("../package.json");

manifest.version = package.version;
manifestFF.version = package.version;
manifestOpera.version = package.version;

fs.writeFile(
	"./src/manifest.json",
	JSON.stringify(manifest, null, 2),
	(err) => {
		if (err) {
			throw err;
		}
	},
);

fs.writeFile(
	"./src/manifest-firefox.json",
	JSON.stringify(manifestFF, null, 2),
	(err) => {
		if (err) {
			throw err;
		}
	},
);

fs.writeFile(
	"./src/manifest-opera.json",
	JSON.stringify(manifestOpera, null, 2),
	(err) => {
		if (err) {
			throw err;
		}
	},
);
