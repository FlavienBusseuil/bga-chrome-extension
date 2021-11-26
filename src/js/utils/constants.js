// @flow
export const bgaUrl = "https://boardgamearena.com";
export const bgaAvatarUrl = "https://x.boardgamearena.net/data/avatar/";
export const bgaExtensionUrlSignature = "bgachromeext";
export const isDataMocked: boolean =
	Boolean(process.env.MOCK) && !self.serviceWorker;
