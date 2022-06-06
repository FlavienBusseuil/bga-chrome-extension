// @flow

import type { Query } from "../../types/bga/queries/Query";

export type MockResolver =
	| { path: "myWho" | "tableManager" }
	| { path: "table" | "myBgaRbt" | "tournamentList", key: string };

export async function resolveFromMock<T: Query>(
	props: MockResolver,
): Promise<T> {
	if (process.env.MOCK === "presentation") {
		if (props.path === "myWho") {
			const { presentation } = await import(
				"../../mock/queries/myWho/presentation"
			);
			return new Promise<T>(() => presentation);
		}

		if (props.path === "table") {
			const { presentation } = await import(
				"../../mock/queries/table/presentation"
			);
			return new Promise<T>(() => presentation[props.key]);
		}

		if (props.path === "tableManager") {
			const { presentation } = await import(
				"../../mock/queries/tableManager/presentation"
			);
			return new Promise<T>(() => presentation);
		}

		if (props.path === "myBgaRbt") {
			const { presentation } = await import(
				"../../mock/queries/myBgaRbt/presentation"
			);
			return new Promise<T>(() => presentation[props.key]);
		}

		if (props.path === "tournamentList") {
			const { presentation } = await import(
				"../../mock/queries/tournamentList/presentation"
			);
			return new Promise<T>(() => presentation[props.key]);
		}
	}

	throw new Error("Data mocking not handled.");
}
