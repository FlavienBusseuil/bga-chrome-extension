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
	return <div className={cn(["px-2", className ?? ''])}>{children}</div>;
}
