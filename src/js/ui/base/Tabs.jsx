// @flow

import { cn } from "../utils/cn";
import { Tab } from "./Tab.jsx";

type Props = {
	className?: string,
	children: Array<React$Element<typeof Tab>>,
};

export function Tabs({ children, className }: Props): React$Element<"div"> {
	return (
		<div className={cn(["flex gap-1 w-full", className])}>{children}</div>
	);
}
