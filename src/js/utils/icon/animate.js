// @flow

import { wait } from "../wait";

type Props = {
	images: Array<{
		path: string,
		timeframe: number, // in ms
	}>,
};

export async function animate({ images }: Props): Promise<void> {
	for (const { path, timeframe } of images) {
		// $FlowFixMe[cannot-resolve-name]
		const imgPath = chrome.runtime.getURL(path);
		chrome.action.setIcon({ path: imgPath });
		await wait(timeframe);
	}
}
