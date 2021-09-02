import { Component } from "./base/Component";

export const PlayerList = ({ children }) =>
	Component("ul", {
		className: "grid gap-x-2 grid-cols-3",
		children,
	});
