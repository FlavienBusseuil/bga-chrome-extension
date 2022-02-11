// @flow

import { cn } from "../utils/cn";

type Props = {
	className?: string,
	children: React$Node,
	onClick: () => void,
};

export function Card({ className, children, onClick }: Props): React$Node {
	return (
		<li
			className={cn([
				"flex",
				"flex-col",
				"gap-2",
				"pl-2",
				"relative",
				"bg-white",
				"rounded",
				"shadow-md",
				"cursor-pointer",
				"border-transparent",
				"border",
				"border-gray-300",
				"hover:border-gray-600",
				"overflow-hidden",
				className,
			])}
			onClick={onClick}
		>
			{children}
		</li>
	);
}
