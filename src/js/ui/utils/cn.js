// @flow

export function cn(classnames: Array<?string | boolean>): string {
	return classnames.filter(Boolean).join(" ");
}
