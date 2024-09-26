export async function wait(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const _waitForObj = (q: string, maxIteration: number, returnFunc: (val: Element) => void, returnFuncError: () => void) => {
	const elt = document.querySelector(q);

	if (elt) {
		console.debug(`[bga extension] wait for elt '${q}', result: true`);
		returnFunc(elt);
	} else if (maxIteration === 0) {
		console.debug(`[bga extension] wait for elt '${q}', result: false`);
		returnFuncError();
	} else {
		setTimeout(() => _waitForObj(q, maxIteration - 1, returnFunc, returnFuncError), 200);
	}
};

export const waitForObj = async (q: string, maxIteration: number) => {
	return new Promise((resolve, error) => _waitForObj(q, maxIteration, resolve, error));
}