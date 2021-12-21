// @flow

export function cn(classnames: Array<?string>): string {
	return classnames.filter(Boolean).join(" ");
}
