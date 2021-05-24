import { Component } from "./Component";

export const Error = ({ errorText, errorMessage }) =>
  Component("div", {
    className: "p-2 text-red-600 font-bold",
    children: [
      Component("p", { innerText: `${errorText} (${errorMessage})` }),
      Component("p", {
        innerHTML: chrome.i18n.getMessage("report_error", [
          "bga.extension@gmail.com",
          `mailto:bga.extension@gmail.com?subject=Error Report&body=${errorMessage}`,
        ]),
      }),
    ],
  });
