// @flow

export opaque type DateString = string;

export function castToDateString(string: string): DateString {
	return string;
}

export function castToDate(dateString: DateString): Date {
	return new Date(Number(dateString) * 1000);
}
