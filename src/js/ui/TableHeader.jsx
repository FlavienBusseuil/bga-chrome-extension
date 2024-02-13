// @flow

import { TableTitle } from "./TableTitle";
import { TableImg } from "./TableImg";

type Props = {
	gameName: string,
	tableImg: string,
};

export function TableHeader({
	gameName,
	tableImg,
}: Props): React$Element<"div"> {
	return (
		<div className="flex items-center px-2 pt-2 gap-2">
			<TableImg tableImg={tableImg} />
			<TableTitle gameName={gameName} />
		</div>
	);
}
