import { Button } from "./base/Button";
import { bgaUrl } from "../utils/constants";
import { i18n } from "../utils/browser/i18n";

export function LoginButton() {
	return (
		<Button
			className="login-button"
			url={`${bgaUrl}/account`}
			text={i18n("please_login")}
		/>
	);
}
