export const manageStartButton = (mainElt: Element) => {
	const startButton = mainElt.querySelector('#ags_start_game_accept:not(.clicked)') as any;

	if (startButton) {
		startButton.classList.add('clicked');

		const clickIfVisible = () => {
			const rect = startButton.getBoundingClientRect();

			if (rect.top > 0) {
				console.log('[bga extension] Automatic click on start button');
				setTimeout(() => startButton.click(), 2000);
			} else {
				setTimeout(clickIfVisible, 100);
			}
		}
		clickIfVisible();
	}
};