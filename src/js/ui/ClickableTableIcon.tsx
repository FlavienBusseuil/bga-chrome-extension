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
			class="text-center text-sm w-5 h-5 cursor-pointer rounded hover:!bg-bgaBlue-light"
			onClick={handleClick}
		>
			{children}
		</div>
	);
}