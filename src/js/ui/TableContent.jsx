// @flow

import { cn } from "./utils/cn";

type Props = {
	className?: string,
	children: React$Node,
};

export function TableContent({
	className,
	children,
}: Props): React$Element<"div"> {
	return <div className={cn(["px-2", className])}>{children}</div>;
}
