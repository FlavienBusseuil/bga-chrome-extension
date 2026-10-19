type Waiter = {
	resolve: (value: Element | PromiseLike<Element>) => void,
	timestamp: number,
	timer: ReturnType<typeof setTimeout>,
};

// Waiters without an explicit timeout are dropped after this delay (the element will most likely never appear)
const DEFAULT_TIMEOUT = 60000;

class Wait {
	observer: MutationObserver;
	observerStarted: boolean;
	waiting: Record<string, Waiter[]>;

	constructor() {
		this.waiting = {};
		this.observerStarted = false;
		this.observer = new MutationObserver(() => this.check());
	}

	private check() {
		try {
			const timestamp = new Date().getTime();

			Object.entries(this.waiting).forEach(([selector, waiters]) => {
				const elt = document.querySelector(selector);

				if (elt) {
					waiters.forEach(waiter => {
						console.debug(`[bga extension] wait for elt '${selector}'`, { result: true, delay: `${timestamp - waiter.timestamp}ms` });
						clearTimeout(waiter.timer);
						waiter.resolve(elt);
					});
					delete this.waiting[selector];
				}
			});
		}
		catch (error) {
			console.error('[bga extension] exception occured in waiter', error);
		}

		this.stopObserverIfIdle();
	}

	private expire(selector: string, waiter: Waiter, onTimeout: (() => void) | null) {
		const waiters = (this.waiting[selector] || []).filter(w => w !== waiter);

		if (waiters.length) {
			this.waiting[selector] = waiters;
		} else {
			delete this.waiting[selector];
		}

		console.debug(`[bga extension] wait for elt '${selector}'`, { result: false });

		// Without an explicit timeout the promise stays pending, as the callers don't expect an error
		onTimeout?.();
		this.stopObserverIfIdle();
	}

	private startObserver() {
		if (!this.observerStarted) {
			console.debug('[bga extension] start objects observer');
			this.observerStarted = true;
			// Only attributes which can make an element match a selector: style changes (animations) are ignored
			this.observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['id', 'class', 'href'] });
		}
	}

	private stopObserverIfIdle() {
		if (this.observerStarted && !Object.keys(this.waiting).length) {
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

		return new Promise<Element>((resolve, reject) => {
			const waiter: Waiter = {
				resolve,
				timestamp: new Date().getTime(),
				timer: setTimeout(() => this.expire(selector, waiter, timeout ? reject : null), timeout ?? DEFAULT_TIMEOUT),
			};

			this.waiting[selector] = [...(this.waiting[selector] || []), waiter];
			console.debug(`[bga extension] enqueue waiter for elt '${selector}'`, { waiters: this.waiting[selector].length });
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
