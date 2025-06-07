import { ComponentChildren } from "preact";
import { cn } from "./utils/cn";

type Props = { className: string, children: ComponentChildren };

export function TableFooter({
	className,
	children,
}: Props) {
	if (!Boolean(children)) {
		return <div className="p-0" />;
	}

	return <div className={cn(["p-2", className])}>{children}</div>;
}
