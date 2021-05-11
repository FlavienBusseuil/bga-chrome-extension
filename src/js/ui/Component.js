export function Component(tag, props) {
  const element = document.createElement(tag);

  Object.keys(props).forEach((propName) => {
    // children prop
    if (propName === "children") {
      const { children } = props;
      if (Array.isArray(children)) {
        children.forEach((child) => element.appendChild(child));
      } else {
        element.appendChild(children);
      }

      return;
    }

    // Other props
    element[propName] = props[propName];
  });

  return element;
}
