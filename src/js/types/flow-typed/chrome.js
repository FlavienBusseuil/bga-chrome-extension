// @flow

declare type Chrome$ColorArray = [number, number, number, number];
declare type Chrome$Color = Chrome$ColorArray | string;
declare type Chrome$ImageData = any;

declare var chrome: {
	i18n: {
		getMessage: (key: string) => string,
		...
	},
	action: {
		getBadgeText: ({ ... }) => string,
		getBadgeBackgroundColor: ({ ... }) => Chrome$ColorArray,
		setBadgeText: (
			| { text: ?string }
			| { text: ?string, tabId: number }
			| { text: ?string, windowId: number },
		) => void,
		setBadgeBackgroundColor: (
			| { color: null | Chrome$Color }
			| { color: null | Chrome$Color, tabId: number }
			| { color: null | Chrome$Color, windowId: number },
		) => void,
		setIcon: ({
			imageData?: ImageData,
			path?: string,
			tabId?: number,
			windowId?: number,
		}) => Promise<void>,
		...
	},
	runtime: {
		getURL: (path: string) => string,
	},
	...
};
