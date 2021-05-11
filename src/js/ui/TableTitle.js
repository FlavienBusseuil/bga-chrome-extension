import { Component } from "./Component";

export const TableTitle = ({ gameName }) =>
  Component("h1", {
    innerText: `${gameName}`,
    className: "text-lg text-bgaBlue-light font-semibold",
  });
