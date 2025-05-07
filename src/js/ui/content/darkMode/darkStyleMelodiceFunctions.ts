import { createStyle, getFile } from "./darkStyleCommonFunctions";

const styleComponent = createStyle();

const cssList = ["dark_theme/melodice.css"];
const cssContents: Record<string, string> = {};
let customCssCode = '';

Promise.all(cssList.map(getFile)).then(fileContents => {
	fileContents.forEach(({ file, content }) => cssContents[file] = content);
});

const _setDarkStyle = (returnFunc: () => void) => {
	if (cssContents["dark_theme/melodice.css"]) {
		console.log("[bga extension - melodice] Set dark mode");
		styleComponent.innerHTML = `${cssContents["dark_theme/melodice.css"]}${customCssCode}`;
		returnFunc();
	} else {
		setTimeout(() => _setDarkStyle(returnFunc), 100);
	}
};

const _setLightStyle = () => {
	console.log("[bga extension - melodice] Set light mode");
	styleComponent.innerHTML = customCssCode;
};

const _setDarkOrLightStyle = (returnFunc: () => void, val: boolean, customCss: string) => {
	customCssCode = customCss;

	if (val) {
		_setDarkStyle(returnFunc);
	} else {
		_setLightStyle();
		returnFunc();
	}
};

export const setDarkStyle = async (val: boolean, customCss: string): Promise<void> => {
	return new Promise<void>(resolve => _setDarkOrLightStyle(resolve, val, customCss));
};