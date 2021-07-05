import { Component } from "./base/Component";
import { TableContent } from "./TableContent";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { TableIndicator } from "./TableIndicator";
import { Button } from "./base/Button";

export const Table = ({
  gameName,
  tableCreatorName,
  tableImg,
  link,
  acceptInviteLink,
  isInvitePendingForCurrentPlayer,
  isOpenForPlayers,
  isWaitingCurrentPlayer,
  children,
}) => {
  return Component("li", {
    className: [
      "flex",
      "flex-col",
      "gap-2",
      "pl-2",
      "relative",
      "bg-white",
      "rounded",
      "shadow-md",
      "cursor-pointer",
      "border-transparent",
      "border",
      "border-gray-300",
      "hover:border-gray-600",
      "overflow-hidden",
    ].join(" "),
    onclick: () => window.open(link, "_blank"),
    children: [
      TableIndicator({
        isInvitePendingForCurrentPlayer,
        isOpenForPlayers,
        isWaitingCurrentPlayer,
      }),
      TableHeader({ gameName, tableImg }),
      TableContent({ children }),
      TableFooter({
        className: "flex gap-1 items-center justify-end bg-bgaOrange-lighter",
        children: isInvitePendingForCurrentPlayer && [
          Component("span", {
            className:
              "flex-grow text-bgaBlue text-gray-600 text-sm leading none",
            innerHTML: chrome.i18n.getMessage("player_invited_you", [
              `<a class="text-bgaBlue-lighter">${tableCreatorName}</a>`,
            ]),
          }),

          Button({
            className: "flex-shrink-0",
            text: chrome.i18n.getMessage("decline"),
            url: "",
            size: 1,
            type: "secondary",
          }),

          Button({
            className: "flex-shrink-0",
            text: chrome.i18n.getMessage("accept"),
            onClick: () => fetch(acceptInviteLink),
            size: 1,
            type: "accept",
          }),
        ],
      }),
    ],
  });
};
