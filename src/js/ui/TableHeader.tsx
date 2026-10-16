import { TableTitle } from "./TableTitle";
import { TableImg } from "./TableImg";

type Props = {
	gameName: string,
	tableImg: string,
};

export function TableHeader({
	gameName,
	tableImg,
}: Props) {
	return (
		<div className="table-header">
			<TableImg tableImg={tableImg} />
			<TableTitle gameName={gameName} />
		</div>
	);
}
