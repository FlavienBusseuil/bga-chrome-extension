import { Component } from "./Component";

export const Player = ({ playerName, isActivePlayer }) =>
  Component("li", {
    className: `${
      isActivePlayer ? "text-bgaGreen" : "text-bgaBlue-lighter"
    } font-bold`,
    children: [
      Component("span", {
        className: "mr-1",
        innerText: `${isActivePlayer ? "⏳" : ""}`,
      }),
      Component("span", { innerText: `${playerName}` }),
    ],
  });
