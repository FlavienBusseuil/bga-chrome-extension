// @flow

import { cn } from "../utils/cn";
import { Button } from "./Button.jsx";

type Props = {
	k: string,
	children: React$Node,
	fullWidth: boolean,
	isActive?: boolean,
	onClick: (k: string) => void,
};

export function Tab({
	k,
	fullWidth,
	children,
	isActive = false,
	onClick,
}: Props): React$Element<typeof Button> {
	return (
		<Button
			className={cn([
				fullWidth ? "w-full" : "whitespace-nowrap",
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
