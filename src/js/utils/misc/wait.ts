type Waiter = {
	resolve: (value: Element | PromiseLike<Element>) => void,
	error: (reason?: any) => void,
	timestamp: number,
	timeout: number | undefined,
};

class Wait {
	observer: MutationObserver;
	observerStarted: boolean;
	waiting: Record<string, Waiter[]>

	constructor() {
		this.waiting = {};
		this.observerStarted = false;
		this.observer = new MutationObserver(() => {
			const keys = Object.keys(this.waiting);

			if (keys.length) {
				const timestamp = new Date().getTime();

				keys.forEach(selector => {
					const elt = document.querySelector(selector);
					const waiters = this.waiting[selector] || [];

					if (elt) {
						waiters.forEach(waiter => {
							console.debug(`[bga extension] wait for elt '${selector}'`, { result: true, delay: `${timestamp - waiter.timestamp}ms` });
							waiter.resolve(elt);
						});
						delete this.waiting[selector];
					} else {
						const timeoutWaiters = waiters.filter(waiter => waiter.timeout && timestamp - waiter.timestamp > waiter.timeout);

						if (timeoutWaiters.length) {
							console.debug(`[bga extension] wait for elt '${selector}`, { result: false });

							timeoutWaiters.forEach(waiter => {
								waiter.error();
							});

							if (timeoutWaiters.length === waiters.length) {
								delete this.waiting[selector];
							} else {
								this.waiting[selector] = waiters.filter(waiter => !waiter.timeout || timestamp - waiter.timestamp <= waiter.timeout);
							}
						}
					}
				});
			} else {
				this.stopObserver();
			}
		});
	}

	private startObserver() {
		if (!this.observerStarted) {
			console.debug('[bga extension] start objects observer');
			this.observerStarted = true;
			this.observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
		}
	}

	private stopObserver() {
		if (this.observerStarted) {
			console.debug('[bga extension] stop objects observer');
			this.observerStarted = false;
			this.observer.disconnect();
		}
	}

	async for(selector: string, timeout?: number) {
		const elt = document.querySelector(selector);

		if (elt) {
			console.debug(`[bga extension] wait for elt '${selector}'`, { result: true, delay: '0ms' });
			return elt;
		}

		this.startObserver();

		if (!this.waiting[selector]) {
			this.waiting[selector] = [];
		}

		return new Promise<Element>((resolve, error) => {
			if (this.waiting[selector]) {
				this.waiting[selector].push({
					resolve,
					error,
					timestamp: new Date().getTime(),
					timeout
				});

				console.debug(`[bga extension] enqueue waiter for elt '${selector}'`, { waiters: this.waiting[selector].length });
			} else {
				error('Init error');
			}
		});
	}
}

let wait: Wait | undefined;

export const waitForObj = async (q: string, timeout?: number) => {
	if (!wait) {
		wait = new Wait();
	}
	return wait.for(q, timeout);
}