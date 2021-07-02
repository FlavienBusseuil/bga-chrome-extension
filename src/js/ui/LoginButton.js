import { Button } from "./base/Button";
import { bgaUrl } from "../utils/constants";

export const LoginButton = () =>
  Button({
    text: chrome.i18n.getMessage("please_login"),
    className: "m-2",
    url: `${bgaUrl}/account`,
  });
