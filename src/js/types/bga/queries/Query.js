// @flow

export type QueryStatusSuccess = 1;
export type QueryStatusError = 0;
export type QueryStatus = QueryStatusError | QueryStatusSuccess;

export type QuerySucceededResult<Data: { ... }> = {
	status: QueryStatusSuccess,
	data: Data,
};

export type Error = string;
export type ErrorCode = 300 | 504;

export type QueryFailedResult = {
	status: QueryStatusError,
	error: Error,
	expected: number,
	code: ErrorCode,
};

export type QueryResult<Data: { ... }> =
	| QuerySucceededResult<Data>
	| QueryFailedResult;
