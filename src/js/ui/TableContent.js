import { Component } from "./base/Component";

export const TableContent = ({ className, children }) =>
	Component("div", {
		className: ["px-2", className].join(" "),
		children,
	});
