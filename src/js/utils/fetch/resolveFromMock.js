// @flow

import type { MyBgaRbtQueryResultData } from "../../types/bga/queries/MyBgaRbt";
import type { MyWhoQueryResultData } from "../../types/bga/queries/MyWho";
import type { QuerySucceededResult } from "../../types/bga/queries/Query";
import type { TableQueryResultData } from "../../types/bga/queries/Table";
import type { TableManagerQueryResultData } from "../../types/bga/queries/TableManager";
import type { TournamentListQueryResultData } from "../../types/bga/queries/TournamentList";

export type MockResolver =
	| { path: "myWho" | "tableManager" }
	| { path: "table" | "myBgaRbt" | "tournamentList", key: string };

export async function resolveFromMock(
	props: MockResolver,
): Promise<
	| MyWhoQueryResultData
	| QuerySucceededResult<TableQueryResultData>
	| QuerySucceededResult<TableManagerQueryResultData>
	| QuerySucceededResult<TournamentListQueryResultData>
	| MyBgaRbtQueryResultData,
> {
	if (process.env.MOCK === "presentation") {
		if (props.path === "myWho") {
			const { presentation } = await import(
				"../../mock/queries/myWho/presentation"
			);
			return presentation;
		}

		if (props.path === "table") {
			const { presentation } = await import(
				"../../mock/queries/table/presentation"
			);
			return presentation[props.key];
		}

		if (props.path === "tableManager") {
			const { presentation } = await import(
				"../../mock/queries/tableManager/presentation"
			);
			return presentation;
		}

		if (props.path === "myBgaRbt") {
			const { presentation } = await import(
				"../../mock/queries/myBgaRbt/presentation"
			);
			return presentation[props.key];
		}

		if (props.path === "tournamentList") {
			const { presentation } = await import(
				"../../mock/queries/tournamentList/presentation"
			);
			return presentation[props.key];
		}
	}

	throw new Error("Data mocking not handled.");
}
