import { ComponentChildren } from "preact";

type Props = {
	children: ComponentChildren,
};

export function TableIcons({ children }: Props) {
	return (
		<div class="absolute flex right-1 top-1 gap-1 text-xs opacity-80 z-10">
			{children}
		</div>
	);
}
