const fs = require("fs");
const manifest = require("../src/manifest.json");
const package = require("../package.json");

manifest.version = package.version;

fs.writeFile(
  "./src/manifest.json",
  JSON.stringify(manifest, null, 2),
  (err) => {
    if (err) {
      throw err;
    }
  }
);
