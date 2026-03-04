class LocationChangeManager {
	private currentLocation: string;
	private listenerFunc: ((loc: string) => void) | null = null;

	public constructor() {
		this.currentLocation = '';
		setInterval(() => this.setCurrentLocation(window.location.pathname), 100);
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