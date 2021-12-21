// @flow
import { Button } from "./base/Button";
import { bgaUrl } from "../utils/constants";

export function LoginButton(): React$Element<typeof Button> {
	return (
		<Button
			className="m-2"
			url={`${bgaUrl}/account`}
			text={chrome.i18n.getMessage("please_login")}
		/>
	);
}
