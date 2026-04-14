import rgbHex from "rgb-hex";
import { gamesWithCustomColors } from "../../config/darkThemeGames";
import { getColorForDarkMode } from "../../utils/misc/colors";

let playersData: PlayerData[] | undefined = undefined;

export interface PlayerData {
  id: string;
  name: string;
  avatar: string;
  color: string;
  darkColor: string | undefined;
  darkEnlight: boolean;
};

export const getPlayersData = async (twoTeams: boolean): Promise<PlayerData[]> => {
  return new Promise<PlayerData[]>(resolve => _getPlayersData(resolve, twoTeams, 0));
};

const _getPlayersData = (returnFunc: (data: PlayerData[]) => void, twoTeams: boolean, iteration: number, fromStyle?: boolean) => {
  if (playersData) {
    returnFunc(playersData);
    return;
  }

  const playerContainers = Array.from(document.querySelectorAll("#player_boards div.player-name[id^=\"player_name_\"]")).filter(elt => elt.id.length > 13 || elt.id === "player_name_7");
  const playerlinks = document.querySelectorAll("#player_boards div.player-name[id^=\"player_name_\"] a[href*=\"/player?id\"]");
  let result: PlayerData[] | undefined = undefined;

  document.documentElement.classList.add("bgaext_get_players_data");

  if (playerContainers && playerlinks && playerContainers.length && playerContainers.length === playerlinks.length) {
    const playersIdList = Object.values(playerContainers)
      .filter((d) => d.id)
      .map((d) => parseInt(d.id.substring(12), 10))
      .filter((id) => !isNaN(id))
      .map(id => id.toString());

    const getColor = (elt: any) => {
      if (fromStyle) {
        return elt.style.color;
      }
      return getComputedStyle(elt).color;
    }

    const playersData = playersIdList.map((id, index) => {
      const userLink = playerlinks[index] as any;
      const avatar = document.getElementById(`avatar_${id}`) as any;
      const color = `#${rgbHex(getColor(userLink))}`;
      const darkConfig = getColorForDarkMode(color);

      return {
        id,
        name: userLink.innerText || userLink.innerHTML,
        avatar: avatar.src,
        color,
        darkColor: darkConfig.color === color ? undefined : darkConfig.color,
        darkEnlight: darkConfig.enlight
      };
    });

    result = playersData.length ? playersData : undefined;
  }

  if (result) {
    const diffColors = Array.from(new Set(result.map(c => c.color)));
    const target = twoTeams ? 2 : result.length;

    if (diffColors.length === target) {
      // The number of colors match the number of players (or the number of teams)
      document.documentElement.classList.remove("bgaext_get_players_data");
      playersData = result;
      returnFunc(result);
      return;
    }

    if (iteration >= 10 && iteration < 25) {
      setTimeout(() => _getPlayersData(returnFunc, twoTeams, iteration + 1, true), 100);
      return;
    }
  }

  if (iteration < 25) {
    setTimeout(() => _getPlayersData(returnFunc, twoTeams, iteration + 1), 100);
  } else {
    console.error("[bga extension] Too many iterations in getPlayersData");
    document.documentElement.classList.remove("bgaext_get_players_data");
    playersData = result || [];
    returnFunc(result || []);
  }
};

export const getPlayersPossibleColors = (gameName: string) => {
  if (gamesWithCustomColors[gameName]) {
    return gamesWithCustomColors[gameName].map((color: string) => {
      const darkConfig = getColorForDarkMode(color);

      return {
        id: '0',
        name: '',
        avatar: '',
        color,
        darkColor: darkConfig.color === color ? undefined : darkConfig.color,
        darkEnlight: darkConfig.enlight
      };
    });
  }

  return [];
};