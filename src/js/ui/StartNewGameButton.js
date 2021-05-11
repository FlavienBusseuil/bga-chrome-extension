import { bgaUrl } from "../utils/constants";
import { Component } from "./Component";

export const StartNewGameButton = () =>
  Component("div", {
    innerText: chrome.i18n.getMessage("play_new_game"),
    className:
      "text-white font-extrabold shadow border border-bgaBlue-light px-4 py-2 m-2 bg-bgaBlue hover:bg-bgaBlue-light cursor-pointer rounded",
    onclick: () => window.open(`${bgaUrl}/lobby`, "_blank"),
  });
