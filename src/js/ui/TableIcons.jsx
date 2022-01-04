// @flow

import { TableIcon } from "./TableIcon.jsx";

type Props = {
	children: Array<React$Element<typeof TableIcon>>,
};

export function TableIcons({ children }: Props): React$Element<"div"> {
	return (
		<div class="absolute flex right-1 top-1 gap-1 text-xs opacity-80">
			{children}
		</div>
	);
}
