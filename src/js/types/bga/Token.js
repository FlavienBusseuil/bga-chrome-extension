// @flow

export opaque type Token = string;

export function castToToken(string: string): Token {
	return string;
}

export function castToString(token: Token): string {
	return token;
}
