export const addLocationChangeListener = (func: (loc: string) => void) => {
	let currentLocation = window.location.pathname;

	const checkLocation = () => {
		const newLocation = window.location.pathname;

		if (currentLocation !== newLocation) {
			currentLocation = newLocation;
			func(currentLocation);
		}

		setTimeout(checkLocation, 500);
	};

	checkLocation();
};
