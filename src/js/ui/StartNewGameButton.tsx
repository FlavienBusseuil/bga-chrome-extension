import { bgaUrl } from "../utils/constants";
import { Button } from "./base/Button";
import { i18n } from "../utils/browser/i18n";

export function StartNewGameButton() {
	return (
		<Button
			{...{
				text: i18n("play_new_game"),
				className: "",
				url: `${bgaUrl}/lobby`,
			}}
		/>
	);
}
