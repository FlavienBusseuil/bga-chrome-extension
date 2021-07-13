import { Component } from "./Component";

export const Button = ({
  onClick,
  url,
  text,
  className,
  size = 2,
  type = "primary",
}) =>
  Component("div", {
    innerText: text,
    className: [
      "text-white",
      "shadow",
      "border",
      { 1: "font-normal px-2 py-0.5", 2: "font-extrabold px-4 py-2" }[size],
      {
        primary: "bg-bgaBlue hover:bg-bgaBlue-light border-bgaBlue-light",
        accept: "bg-bgaGreen hover:bg-bgaGreen-light border-bgaGreen",
        secondary: "bg-gray-400 hover:bg-gray-350 border-gray-400",
      }[type],
      "cursor-pointer",
      "rounded",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    onclick: url
      ? () => window.open(url, "_blank")
      : (event) => {
          event.stopPropagation();
          onClick();
        },
  });
