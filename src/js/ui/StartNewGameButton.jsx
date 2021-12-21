// @flow

import { bgaUrl } from "../utils/constants";
import { Button } from "./base/Button";

export function StartNewGameButton(): React$Element<typeof Button> {
	return (
		<Button
			{...{
				text: chrome.i18n.getMessage("play_new_game"),
				className: "m-2",
				url: `${bgaUrl}/lobby`,
			}}
		/>
	);
}
