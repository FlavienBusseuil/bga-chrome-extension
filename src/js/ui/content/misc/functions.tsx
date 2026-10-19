export const manageStartButton = (mainElt: Element) => {
	const startButton = mainElt.querySelector('#ags_start_game_accept:not(.clicked)') as any;

	if (startButton) {
		startButton.classList.add('clicked');

		const clickIfVisible = (tries = 300) => {
			if (!startButton.isConnected) {
				return;
			}

			const rect = startButton.getBoundingClientRect();

			if (rect.top > 0) {
				console.log('[bga extension] Automatic click on start button');
				setTimeout(() => startButton.isConnected && startButton.click(), 2000);
			} else if (tries > 0) {
				setTimeout(() => clickIfVisible(tries - 1), 100);
			}
		}
		clickIfVisible();
	}
};