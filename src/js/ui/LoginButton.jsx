// @flow
import { Button } from "./base/Button";
import { bgaUrl } from "../utils/constants";
import { i18n } from "../utils/browser/i18n";

export function LoginButton(): React$Element<typeof Button> {
	return (
		<Button
			className="m-2"
			url={`${bgaUrl}/account`}
			text={i18n("please_login")}
		/>
	);
}
