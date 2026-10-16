import { ComponentChildren } from "preact";
import { cn } from "./utils/cn";

type Props = { className?: string, children: ComponentChildren };

export function TableFooter({
	className,
	children,
}: Props) {
	if (!Boolean(children)) {
		return <div />;
	}

	return <div className={cn(["table-footer", className ?? null])}>{children}</div>;
}
