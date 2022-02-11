// @flow

import { cn } from "../utils/cn";
import { Card } from "./Card";

type Props = {
	className?: string,
	children: React$Node,
};

export function CardList({ className, children }: Props): React$Node {
	return (
		<ul className={cn(["container flex flex-col space-y-2", className])}>
			{children}
		</ul>
	);
}
