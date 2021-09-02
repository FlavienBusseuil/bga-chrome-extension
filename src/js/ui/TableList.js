import { Component } from "./base/Component";

export const TableList = ({ children }) =>
	Component("ul", {
		className: "container flex flex-col space-y-2 justify-center p-1",
		children,
	});
