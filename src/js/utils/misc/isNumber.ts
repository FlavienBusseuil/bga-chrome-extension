export const isNumber = (val: string) => {
	return /^[0-9]*$/.exec(val) != null;
};
