// @flow

export opaque type NumberString = string;

export function castToNumberString(string: string): NumberString {
	return string;
}

export function castToNumber(string: NumberString): number {
	if (string.endsWith("k")) {
		const [stringValue] = string.split("k");
		return Number(stringValue) * 1000;
	}

	return Number(string);
}

export function castToString(string: NumberString): string {
	return string;
}
