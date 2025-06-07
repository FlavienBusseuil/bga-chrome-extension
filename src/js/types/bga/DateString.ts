export type DateString = string & { readonly __brand: unique symbol };;

export function castToDateString(string: string): DateString {
	return string as DateString;
}

export function castToDate(dateString: DateString): Date {
	return new Date(Number(dateString) * 1000);
}
