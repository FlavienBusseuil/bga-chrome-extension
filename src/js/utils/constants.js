// @flow
export const bgaUrl = "https://boardgamearena.com";
export const bgaDataUrl = "https://x.boardgamearena.net/data/";
export const bgaAvatarUrl = `${bgaDataUrl}avatar/`;
export const bgaGameMediaUrl = `${bgaDataUrl}gamemedia/`;
export const bgaExtensionSignature = "bgachromeext";
export const isDataMocked: boolean =
	Boolean(process.env.MOCK) && !self.serviceWorker;
