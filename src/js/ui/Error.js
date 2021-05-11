import { Component } from "./Component";

export const Error = ({ errorText }) =>
  Component("div", {
    innerText: `${errorText}`,
    className: "text-red-600 font-bold",
  });
