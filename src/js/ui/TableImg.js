import { Component } from "./Component";

export const TableImg = ({ tableImg }) =>
  Component("img", {
    src: `${tableImg}`,
    className: "w-6 h-6 rounded mr-2",
  });
