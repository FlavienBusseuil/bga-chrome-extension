import { Component } from "./Component";

function getIncatorClassnames({ isOpenForPlayers, isWaitingCurrentPlayer }) {
  if (isWaitingCurrentPlayer) {
    return "bg-bgaGreen animate-pulse-0.5";
  }

  if (isOpenForPlayers) {
    return "bg-bgaOrange";
  }

  return "bg-bgaBlue-lighter";
}

export const TableIndicator = ({
  isOpenForPlayers,
  isWaitingCurrentPlayer,
}) => {
  return Component("div", {
    className: `absolute ${getIncatorClassnames({
      isOpenForPlayers,
      isWaitingCurrentPlayer,
    })} h-full left-0 right-0 top-0 transform w-2`,
  });
};
