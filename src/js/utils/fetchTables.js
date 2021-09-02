import { bgaUrl, bgaExtensionUrlSignature } from "./constants";

export async function fetchTables() {
	const tables = await fetch(
		`${bgaUrl}/tablemanager/tablemanager/tableinfos.html?status=play&${bgaExtensionUrlSignature}`,
	)
		.then(response => response.json())
		.then(json => json.data.tables);
	return Object.keys(tables).map(tableKey => tables[tableKey]);
}
