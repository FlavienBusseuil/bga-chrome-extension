import { Component } from "./base/Component";
import { TableTitle } from "./TableTitle";
import { TableImg } from "./TableImg";

export const TableHeader = ({ gameName, tableImg }) =>
  Component("div", {
    className: "flex items-center px-2 pt-2",
    children: [TableImg({ tableImg }), TableTitle({ gameName })],
  });
