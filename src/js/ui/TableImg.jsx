// @flow

type Props = {
	tableImg: string,
};

export function TableImg({ tableImg }: Props): React$Element<"img"> {
	return <img src={tableImg} className="w-6 h-6 rounded" />;
}
