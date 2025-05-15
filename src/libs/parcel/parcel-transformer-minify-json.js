const {Transformer} = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({asset}) {
    const code = await asset.getCode();
    // Minify by parsing and re-stringifying
    const minified = JSON.stringify(JSON.parse(code));
    asset.type = 'json';
    asset.setCode(minified);
    return [asset];
  }
});