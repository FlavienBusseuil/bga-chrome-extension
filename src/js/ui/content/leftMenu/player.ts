import type { Game } from "../../../config/models";

export interface Player {
	id: string;
	name: string;
	avatar: string;
	color: string;
	darkColor: string | undefined;
	fake?: boolean;
	panelId?: string;
}

export const getPlayerPanelId = (
	gameConfig: Game,
	p: Player,
	index: number,
) => {
	if (p.fake) {
		return p.id;
	}

	if (p.panelId) {
		return p.panelId;
	}

	if (gameConfig.playerPanel.indexOf("{{") >= 0) {
		return gameConfig.playerPanel
			.replace("{{player_id}}", p.id)
			.replace("{{player_color}}", p.color.substring(1))
			.replace("{{player_index}}", index.toString())
			.replace("{{player_index_1}}", (index + 1).toString());
	}
	return `bgaext_panel_${index}`;
};
