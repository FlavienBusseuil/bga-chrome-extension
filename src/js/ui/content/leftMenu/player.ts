import { Game } from "../../../config/configuration";

export interface Player {
  id: string,
  name: string,
  avatar: string,
  color: string,
  fake?: boolean
};

export const getPlayerPanelId = (gameConfig: Game, p: Player, index: number) => {
  if (gameConfig.playerPanel.indexOf('{{') >= 0) {
    return gameConfig.playerPanel
      .replace('{{player_id}}', p.id)
      .replace('{{player_index}}', index.toString())
      .replace('{{player_index_1}}', (index + 1).toString());
  }
  return `bgaext_panel_${index}`;
};