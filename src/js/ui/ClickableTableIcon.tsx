import type { JSX } from "preact";
import { cn } from "./utils/cn";

type Props = {
	children: JSX.Element;
	title: string;
	url: string;
	className: string;
};

export function ClickableTableIcon({ children, title, url, className }: Props) {
	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<div
			title={title}
			class={cn(["table-icon", "table-icon--clickable", className])}
			onClick={handleClick}
		>
			{children}
		</div>
	);
}
