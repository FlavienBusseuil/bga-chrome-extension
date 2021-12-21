// @flow

import { Table } from "./Table";

type Props = {
	children: Array<React$Element<typeof Table>>,
};

export function TableList({ children }: Props): React$Element<"ul"> {
	return (
		<ul className="container flex flex-col space-y-2 justify-center p-1">
			{children}
		</ul>
	);
}
