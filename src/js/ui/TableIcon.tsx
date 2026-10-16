type Props = {
	children: string,
	title: string,
};

export function TableIcon({ children, title }: Props) {
	return (
		<div
			title={title}
			class="table-icon"
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	);
}
