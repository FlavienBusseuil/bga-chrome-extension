// @flow

import { cn } from "../utils/cn";

type Props = {
	...{ onClick: () => void } | { url: string },
	text: React$Node,
	className?: string,
	size?: 1 | 2,
	type?: "primary" | "secondary" | "accept",
};

export function Button({
	text,
	className,
	size = 2,
	type = "primary",
	...rest
}: Props): React$Element<"div"> {
	const styleFromSize = {
		"1": "font-normal px-2 py-0.5",
		"2": "font-extrabold px-4 py-2",
	}[String(size)];
	const styleFromType = {
		primary: "bg-bgaBlue hover:bg-bgaBlue-light border-bgaBlue-light",
		accept: "bg-bgaGreen hover:bg-bgaGreen-light border-bgaGreen",
		secondary: "bg-gray-400 hover:bg-gray-350 border-gray-400",
	}[type];

	const onClick = (() => {
		if (rest.url !== undefined) {
			const { url } = rest;
			return () => window.open(url, "_blank");
		}

		const { onClick } = rest;
		return (event) => {
			event.stopPropagation();
			onClick();
		};
	})();

	return (
		<div
			role="button"
			className={cn([
				"text-white",
				"text-center",
				"shadow",
				"border",
				styleFromSize,
				styleFromType,
				"cursor-pointer",
				"rounded",
				className,
			])}
			onclick={onClick}
		>
			{text}
		</div>
	);
}
