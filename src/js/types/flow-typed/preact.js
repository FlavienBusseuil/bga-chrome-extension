declare var React: $Exports<"react">;

declare module "preact" {
	declare var render: (React$Node, ?HTMLElement) => void;
}

declare module "preact/hooks" {
	declare var useState: typeof React.useState;
	declare var useEffect: typeof React.useEffect;
	declare var useErrorBoundary: <E>(
		callback?: (E) => void,
	) => [E, () => void];
}
