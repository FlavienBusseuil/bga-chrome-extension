// @flow

// Language keys joined with commas "en,fr,..."
export opaque type JoinedLanguages = string;
export type LanguageKey = "fr" | "en" | "zh";
export type LanguageCode = "fr_FR" | "en_US" | "zh_TW";
export type Languages = {
	[LanguageKey]: { name: string, code: LanguageCode, level: number },
};

export function castToJoinedLanguages(string: string): JoinedLanguages {
	return string;
}
