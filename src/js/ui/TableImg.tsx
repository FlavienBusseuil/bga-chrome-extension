type Props = {
	tableImg: string,
};

export function TableImg({ tableImg }: Props) {
	return <img src={tableImg} className="game-img" />;
}
