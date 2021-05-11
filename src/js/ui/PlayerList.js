import { Component } from "./Component";

export const PlayerList = ({ children }) =>
  Component("ul", {
    className: "flex flex-wrap",
    children,
  });
