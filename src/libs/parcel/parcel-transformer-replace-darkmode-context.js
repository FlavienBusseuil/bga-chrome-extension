const {Transformer} = require('@parcel/plugin');

module.exports = new Transformer({
  async transform({asset}) {
	let code = await asset.getCode();
	code = code.replace(/#D(?=[ .:])/g, 'html[data-theme=dark]')
	asset.setCode(code);
	return [asset];
  }
});