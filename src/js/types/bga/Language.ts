// Language keys joined with commas "en,fr,..."
export type JoinedLanguages = string & { readonly __brand: unique symbol };;
export type LanguageKey = "fr" | "en" | "zh";
export type LanguageCode = "fr_FR" | "en_US" | "zh_TW";
export type Languages = Partial<Record<LanguageKey, { name: string, code: LanguageCode, level: number }>>;

export function castToJoinedLanguages(string: string): JoinedLanguages {
	return string as JoinedLanguages;
}
