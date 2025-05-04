/**
 * Modified implementation of PersistentMap from @nanostores/persistent to support Browser's Storage API
*/

import { task, map, onMount, type MapStore } from "nanostores";
import { storage, type Storage } from "webextension-polyfill";

export interface PersistentEvents {
	addEventListener(
		key: string,
		callback: EventListener,
		restore: () => void
	): void
	perKey?: boolean
	removeEventListener(
		key: string,
		callback: EventListener,
		restore: () => void
	): void
}

let eventsEngine: PersistentEvents = { addEventListener() { }, removeEventListener() { } }
type StorageEngine = Storage.StorageArea | Storage.StorageAreaWithUsage | undefined
let storageEngine: StorageEngine

export let windowPersistentEvents: PersistentEvents = {
	addEventListener(key, listener, restore) {
		window.addEventListener('storage', listener)
		window.addEventListener('pageshow', restore)
	},
	removeEventListener(key, listener, restore) {
		window.removeEventListener('storage', listener)
		window.removeEventListener('pageshow', restore)
	}
}

if (typeof window !== 'undefined') {
	eventsEngine = windowPersistentEvents
}

if (storage && storage.local) {
	storageEngine = storage.local
}

export function persistentMap<Value extends Record<string, any>>(prefix: string, initial: Value, storage?: StorageEngine): MapStore<Value> {
	let encode = JSON.stringify
	let decode = (encoded: string) => {
		try {
			return JSON.parse(encoded);
		} catch (error) {
			return encoded;
		}
	}

	let _storageEngine = storage ?? storageEngine

	let store = map<Record<string, any>>()

	let setKey = store.setKey
	let storeKey = (key: string, newValue: string | undefined) => {
		if (typeof newValue === 'undefined') {
			_storageEngine?.remove(key);
		} else {
			_storageEngine?.set({ [key]: encode(newValue) });
		}
	}

	store.setKey = (key, newValue) => {
		storeKey(key, newValue)
		setKey(key, newValue)
	}

	let set = store.set
	store.set = function (newObject) {
		for (let key in newObject) {
			storeKey(key, newObject[key])
		}
		for (let key in store.value) {
			if (!(key in newObject)) {
				storeKey(key, undefined)
			}
		}
		set(newObject)
	}

	function listener(e: Event) {
		const storageEvent = e as StorageEvent;
		if (storageEvent?.storageArea?.getItem('prefix') !== prefix) {
			return
		}

		const key = storageEvent.key

		if (!key) {
			set({})
		} else {
			const value = storageEvent.newValue
			if (value === null) {
				setKey(key, undefined)
			} else {
				setKey(key, decode(value))
			}
		}
	}

	async function restore() {
		if (!_storageEngine) {
			return
		}

		_storageEngine.set({ 'prefix': prefix });

		let storage: Record<string, string> = {}
		try {
			storage = await _storageEngine.get() as Record<string, string>;
		} catch (error) {
			console.error('[bga-ext] Failed to restore storage', error)
		}

		const data: Record<string, any> = { ...initial }
		for (let key in storage) {
			data[key] = decode(storage[key])
		}

		for (let key of Object.keys(data)) {
			store.setKey(key, data[key])
		}
	}

	onMount(store, () => {
		task(async () => {
			await restore();
		})

		eventsEngine.addEventListener(prefix, listener, restore)
		return () => {
			eventsEngine.removeEventListener(prefix, listener, restore)
		}
	})

	return store as MapStore<Value>
}
