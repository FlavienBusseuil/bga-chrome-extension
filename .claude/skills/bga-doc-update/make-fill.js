// Writes a Playwright snippet (for browser_run_code_unsafe with `filename`) that puts a wikitext file
// in the edit form of the current page, with an edit summary. Nothing is saved.
// Usage: node .claude/skills/bga-doc-update/make-fill.js temp/wiki/en/new.wiki "Edit summary"
// Output: fill.js next to the wikitext file.
const fs = require('fs');
const path = require('path');

const [file, summary = ''] = process.argv.slice(2);
if (!file) {
	console.error('Usage: node make-fill.js <file.wiki> "<summary>"');
	process.exit(1);
}

const text = fs.readFileSync(file, 'utf8');
const code = `async (page) => {
	await page.waitForSelector('#wpTextbox1', { state: 'attached' });
	return await page.evaluate(([text, summary]) => {
		const box = $('#wpTextbox1');
		// textSelection also updates WikiEditor / CodeMirror when they are active
		if (box.textSelection) box.textSelection('setContents', text); else box.val(text);
		$('#wpSummary').val(summary);
		return box.textSelection ? box.textSelection('getContents').length : box.val().length;
	}, [${JSON.stringify(text)}, ${JSON.stringify(summary)}]);
}
`;

const out = path.join(path.dirname(file), 'fill.js');
fs.writeFileSync(out, code);
console.log(`${out} (${text.length} characters)`);
