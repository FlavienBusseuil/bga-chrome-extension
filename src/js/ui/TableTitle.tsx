type Props = {
	gameName: string,
};

export function TableTitle({ gameName }: Props) {
	return (
		<h1 className="text-lg text-bgaBlue-light font-semibold grow">
			{gameName}
		</h1>
	);
}
