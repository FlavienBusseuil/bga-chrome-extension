import { Component } from "./Component";
import { TableHeader } from "./TableHeader";

export const Table = ({
  gameName,
  tableImg,
  link,
  isWaitingCurrentPlayer,
  children,
}) =>
  Component("li", {
    className: `${
      isWaitingCurrentPlayer ? "border-blue-200" : ""
    } bg-white rounded shadow-md p-3 cursor-pointer border-2 border-transparent hover:border-gray-600`,
    onclick: () => window.open(link, "_blank"),
    children: [TableHeader({ gameName, tableImg }), children],
  });
