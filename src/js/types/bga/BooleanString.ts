export type BooleanString = "0" | "1" | "2";

export function castToBoolean(booleanString: BooleanString): boolean {
	if (booleanString === "0") {
		return false;
	}

	return true;
}
