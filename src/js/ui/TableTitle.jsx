// @flow

type Props = {
	gameName: string,
};

export function TableTitle({ gameName }: Props): React$Element<"h1"> {
	return (
		<h1 className="text-lg text-bgaBlue-light font-semibold mr-1">
			{gameName}
		</h1>
	);
}
