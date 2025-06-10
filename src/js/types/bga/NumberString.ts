export type NumberString = string & { readonly __brand: unique symbol };

export function castToNumberString(value: string): NumberString {
    return value as NumberString;
}

export function castToNumber(value: NumberString): number {
    if (value.endsWith("k")) {
        const [stringValue] = value.split("k");
        return Number(stringValue) * 1000;
    }

    return Number(value);
}

export function castToString(value: NumberString): string {
    return value;
}
