export function Component(tag, props) {
	const element = document.createElement(tag);

	Object.keys(props).forEach(propName => {
		// children prop
		if (propName === "children") {
			const { children } = props;

			if (!children) {
				return;
			}

			if (Array.isArray(children)) {
				return children
					.filter(Boolean)
					.forEach(child => element.appendChild(child));
			}

			return element.appendChild(children);
		}

		// Other props
		element[propName] = props[propName];
	});

	return element;
}
