export async function wait(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const _waitForObj = (q: string, maxIteration: number, returnFunc: (val: unknown) => void, returnFuncError: () => void) => {
	if (document.querySelector(q)) {
		console.debug(`[bga extension] wait for elt '${q}', result: true`);
		returnFunc(true);
	} else if (maxIteration === 0) {
		console.debug(`[bga extension] wait for elt '${q}', result: false`);
		returnFuncError();
	} else {
		setTimeout(() => _waitForObj(q, maxIteration - 1, returnFunc, returnFuncError), 200);
	}
};

export const waitForObj = async (q: string, maxIteration: number) => {
	await new Promise((resolve, error) => _waitForObj(q, maxIteration, resolve, error));
}