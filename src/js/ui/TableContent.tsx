import { ComponentChildren } from "preact";
import { cn } from "./utils/cn";

type Props = {
	className?: string,
	children: ComponentChildren,
};

export function TableContent({
	className,
	children,
}: Props) {
	return <div className={cn(["table-content", className ?? ''])}>{children}</div>;
}
