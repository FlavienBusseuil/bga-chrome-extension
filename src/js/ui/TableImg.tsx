type Props = {
	tableImg: string,
};

export function TableImg({ tableImg }: Props) {
	return <img src={tableImg} className="w-6 h-6 rounded" />;
}
