import type { JSX } from "preact";
import { cn } from "./utils/cn";

type Props = {
	children: JSX.Element,
	title: string,
	className: string,
};

export function TableIcon({ children, title, className }: Props) {
	return (
		<div
			title={title}
			class={cn(["table-icon", className])}
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	);
}
