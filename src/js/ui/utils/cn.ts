export function cn(classnames: (string | boolean | null)[]): string {
  return classnames.filter(Boolean).join(" ");
}
