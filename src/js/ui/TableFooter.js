import { Component } from "./base/Component";

export const TableFooter = ({ className, children }) => {
  if (!children) {
    return Component("div", {
      className: "p-0",
    });
  }

  return Component("div", {
    className: ["p-2", className].join(" "),
    children,
  });
};
