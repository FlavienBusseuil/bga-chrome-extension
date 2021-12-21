// @flow

import { cn } from "./utils/cn";

type Props = { className: string, children: React$Node };

export function TableFooter({
	className,
	children,
}: Props): React$Element<"div"> {
	if (!Boolean(children)) {
		return <div className="p-0" />;
	}

	return <div className={cn(["p-2", className])}>{children}</div>;
}
