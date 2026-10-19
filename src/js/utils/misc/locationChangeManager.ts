// BGA changes pages without reloading (history.pushState): detect these navigations without polling the URL
class LocationChangeManager {
	private currentLocation: string;
	private listenerFunc: ((loc: string) => void) | null = null;

	public constructor() {
		this.currentLocation = '';

		const check = () => this.setCurrentLocation(window.location.pathname);
		const navigation = (window as any).navigation as EventTarget | undefined;

		if (navigation) {
			// Navigation API (Chrome, Edge, Opera): notified of every history change, including the ones made by the page
			navigation.addEventListener('currententrychange', check);
		} else {
			// The content script can't see the page's history.pushState calls: they are relayed by the page script (bgaApi.ts)
			document.addEventListener('bga_ext_location_change', check);
			window.addEventListener('popstate', check);
			// Safety net for a navigation made before the page script is loaded
			setInterval(check, 1000);
		}
	}

	public setCurrentLocation(loc: string) {
		if (this.currentLocation !== loc && this.listenerFunc) {
			this.currentLocation = loc;
			this.listenerFunc(loc);
		}
	}

	public onLocationChange(func: (loc: string) => void) {
		this.listenerFunc = func;
		this.setCurrentLocation(window.location.pathname);
	}
};

export const locationChangeManager = new LocationChangeManager();
