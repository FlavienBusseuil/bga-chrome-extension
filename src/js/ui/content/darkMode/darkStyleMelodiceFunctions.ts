import { createStyle, getFile } from "./darkStyleCommonFunctions";

const styleComponent = createStyle();

const cssList = ["dark_theme/melodice.css"];
const cssContents: Record<string, string> = {};
let customCssCode = '';

Promise.all(cssList.map(file => getFile(file))).then(fileContents => {
	fileContents.forEach(({ file, content }) => cssContents[file] = content);
});

const _setStyle = (returnFunc: () => void) => {
	if (cssContents["dark_theme/melodice.css"]) {
		styleComponent.innerHTML = `${cssContents["dark_theme/melodice.css"]}${customCssCode}`;
		returnFunc();
	} else {
		setTimeout(() => _setStyle(returnFunc), 100);
	}
};

const _setDarkOrLightStyle = (returnFunc: () => void, val: boolean, customCss: string) => {
	const theme = document.documentElement.dataset.theme;
	const newTheme = val ? 'dark' : 'light'

	customCssCode = customCss;

	if (theme !== newTheme) {
		console.log(`[bga extension - melodice] Set ${newTheme} mode`);
		document.documentElement.dataset.theme = newTheme;
	}

	_setStyle(returnFunc);
};

export const setDarkStyle = async (val: boolean, customCss: string): Promise<void> => {
	return new Promise<void>(resolve => _setDarkOrLightStyle(resolve, val, customCss));
};