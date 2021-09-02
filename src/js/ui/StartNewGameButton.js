import { bgaUrl } from "../utils/constants";
import { Button } from "./base/Button";

export const StartNewGameButton = () =>
	Button({
		text: chrome.i18n.getMessage("play_new_game"),
		className: "m-2",
		url: `${bgaUrl}/lobby`,
	});
