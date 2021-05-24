import { Component } from "./Component";

export const TableIndicator = ({ isWaitingCurrentPlayer }) =>
  Component("div", {
    className: `absolute ${
      isWaitingCurrentPlayer
        ? "bg-bgaGreen animate-pulse-0.5"
        : "bg-bgaBlue-lighter"
    } h-full left-0 right-0 top-0 transform w-2`,
  });
