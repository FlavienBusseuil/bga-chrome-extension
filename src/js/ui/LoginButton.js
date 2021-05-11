import { Component } from "./Component";
import { bgaUrl } from "../utils/constants";

export const LoginButton = () =>
  Component("div", {
    innerText: chrome.i18n.getMessage("please_login"),
    className:
      "text-white font-extrabold shadow border border-bgaBlue-light px-4 py-2 m-2 bg-bgaBlue hover:bg-bgaBlue-light cursor-pointer rounded",
    onclick: () => window.open(`${bgaUrl}/account`, "_blank"),
  });
