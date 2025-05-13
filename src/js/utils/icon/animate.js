// @flow

async function wait(ms): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}


type Props = {
	images: Array<{
		path: string,
		timeframe: number, // in ms
	}>,
};

export async function animate({ images }: Props): Promise<void> {
	for (const { path, timeframe } of images) {
		const imgPath = chrome.runtime.getURL(path);
		await chrome.action.setIcon({ path: imgPath });
		await wait(timeframe);
	}
}
