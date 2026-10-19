import rgbHex from "rgb-hex";
import { gamesConfiguration } from "../../config/darkThemeGames";
import { getColorForDarkMode } from "../../utils/misc/colors";
import { waitForObj } from "../../utils/misc/wait";

const PLAYER_LINKS = "#player_boards div.player-name[id^='player_name_'] a[href*='/player?id']";

let playersData: PlayerData[] | undefined = undefined;
let pendingPlayersData: Promise<PlayerData[]> | undefined = undefined;

export interface PlayerData {
  id: string;
  name: string;
  avatar: string;
  color: string;
  darkColor: string | undefined;
  darkEnlight: boolean;
};

// Shared by the left menu and the dark mode: the players are searched only once
export const getPlayersData = (twoTeams: boolean): Promise<PlayerData[]> => {
  if (!pendingPlayersData) {
    pendingPlayersData = (async () => {
      try {
        // The player boards are created by the game setup: react as soon as they are in the page
        await waitForObj(PLAYER_LINKS, 30000);
      } catch (error) {
        // not found: the search below gives up after a few tries
      }
      return new Promise<PlayerData[]>(resolve => _getPlayersData(resolve, twoTeams, 0));
    })();
  }
  return pendingPlayersData;
};

const _getPlayersData = (returnFunc: (data: PlayerData[]) => void, twoTeams: boolean, iteration: number, fromStyle?: boolean) => {
  if (playersData) {
    returnFunc(playersData);
    return;
  }

  //sourisdudesert is not connecting since years, let's simplify the regex
  //const regex = /^player_name_(7|[1-9]\d*)$/;
  const regex = /^player_name_([1-9]\d+)$/;
  const playerContainers = Array.from(document.querySelectorAll<HTMLElement>("#player_boards div.player-name[id^='player_name_']")).filter(elt => regex.test(elt.id));
  const playerLinks = playerContainers.map(container => container.querySelector<HTMLAnchorElement>('a[href*="/player?id"]')).filter((link): link is HTMLAnchorElement => link !== null);
  let result: PlayerData[] | undefined = undefined;

  document.documentElement.classList.add("bgaext_get_players_data");

  if (playerContainers && playerLinks && playerContainers.length && playerContainers.length === playerLinks.length) {
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
      const userLink = playerLinks[index] as any;
      const avatar = document.getElementById(`avatar_${id}`) as HTMLImageElement | null;
      const color = `#${rgbHex(getColor(userLink))}`;
      const darkConfig = getColorForDarkMode(color);

      return {
        id,
        name: userLink.innerText || userLink.innerHTML,
        avatar: avatar?.src ?? '',
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

    if (iteration >= 20 && iteration < 50) {
      setTimeout(() => _getPlayersData(returnFunc, twoTeams, iteration + 1, true), 50);
      return;
    }
  }

  if (iteration < 50) {
    setTimeout(() => _getPlayersData(returnFunc, twoTeams, iteration + 1), 50);
  } else {
    console.error("[bga extension] Too many iterations in getPlayersData");
    document.documentElement.classList.remove("bgaext_get_players_data");
    playersData = result || [];
    returnFunc(result || []);
  }
};

export const getPlayersPossibleColors = (gameName: string) => {
  if (gamesConfiguration[gameName]?.customColors) {
    return gamesConfiguration[gameName].customColors.map((color: string) => {
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