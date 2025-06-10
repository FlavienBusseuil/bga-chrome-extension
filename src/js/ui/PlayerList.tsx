import { ComponentChildren } from "preact";

type Props = {
	children: ComponentChildren;
};

export function PlayerList({ children }: Props) {
	return <ul className="grid gap-x-2 grid-cols-4">{children}</ul>;
}
