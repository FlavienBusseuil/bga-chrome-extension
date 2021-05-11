import { Component } from "./Component";

export const Player = ({ playerName, isActivePlayer }) =>
  Component("li", {
    innerText: `${isActivePlayer ? "⏳ " : ""}${playerName}`,
    className: "w-32 text-green-500 font-bold",
  });
