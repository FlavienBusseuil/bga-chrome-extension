export type Token = string & { readonly __brand: unique symbol };;

export function castToToken(string: string): Token {
	return string as Token;
}

export function castToString(token: Token): string {
	return token;
}
