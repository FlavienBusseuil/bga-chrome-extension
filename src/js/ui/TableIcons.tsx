import { ComponentChildren } from "preact";

type Props = {
	children: ComponentChildren,
};

export function TableIcons({ children }: Props) {
	return (
		<div class="table-icons">
			{children}
		</div>
	);
}
