type Props = {
	gameName: string,
};

export function TableTitle({ gameName }: Props) {
	return (
		<h1 className="table-title" title={gameName}>
			{gameName}
		</h1>
	);
}
