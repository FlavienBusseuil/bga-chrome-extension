import { Component } from "./Component";
import { TableHeader } from "./TableHeader";
import { TableIndicator } from "./TableIndicator";

export const Table = ({
  gameName,
  tableImg,
  link,
  isWaitingCurrentPlayer,
  children,
}) =>
  Component("li", {
    className: `relative bg-white rounded shadow-md p-3 cursor-pointer border-transparent border border-gray-300 hover:border-gray-600 overflow-hidden`,
    onclick: () => window.open(link, "_blank"),
    children: [
      TableIndicator({ isWaitingCurrentPlayer }),
      TableHeader({ gameName, tableImg }),
      children,
    ],
  });
