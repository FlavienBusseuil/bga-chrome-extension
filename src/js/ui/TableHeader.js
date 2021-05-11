import { Component } from "./Component";
import { TableTitle } from "./TableTitle";
import { TableImg } from "./TableImg";

export const TableHeader = ({ gameName, tableImg }) =>
  Component("div", {
    className: "flex items-center pb-1",
    children: [TableImg({ tableImg }), TableTitle({ gameName })],
  });
