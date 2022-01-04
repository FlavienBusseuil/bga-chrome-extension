// @flow

type Props = {
	children: string,
	title: string,
};

export function TableIcon({ children, title }: Props): React$Element<"div"> {
	return (
		<div
			title={title}
			class="text-center text-sm w-5 h-5 cursor-default rounded"
			onClick={(e: SyntheticEvent<>) => e.stopPropagation()}
		>
			{children}
		</div>
	);
}
