// @flow

import { cn } from "../utils/cn";
import { Button } from "./Button.jsx";

type Props = {
	k: string,
	children: React$Node,
	isActive?: boolean,
	onClick: (k: string) => void,
};

export function Tab({
	k,
	children,
	isActive = false,
	onClick,
}: Props): React$Element<typeof Button> {
	return (
		<Button
			className={cn([
				"w-full",
				!isActive && "!bg-bgaBlue-lighter",
				!isActive && "hover:!bg-bgaBlue-light",
				"!border-0",
			])}
			type="primary"
			text={children}
			onClick={() => onClick(k)}
			size={1}
		/>
	);
}
