type Props = {
	children: string;
	title: string;
	url: string;
};

export function ClickableTableIcon({ children, title, url }: Props) {
	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<div
			title={title}
			class="table-icon table-icon--clickable"
			onClick={handleClick}
		>
			{children}
		</div>
	);
}