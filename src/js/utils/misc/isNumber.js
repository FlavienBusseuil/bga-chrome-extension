export const isNumber = (val) => {
  return /^[0-9]*$/.exec(val) != null;
};