import rgbHex from "rgb-hex";
import { gamesWithCustomColors } from "../../config/darkThemeGames";

export interface PlayerData {
  id: number;
  name: string;
  avatar: string;
  color: string;
  darkColor: string | undefined;
  darkEnlight: boolean;
};

export const getPlayersData = async (): Promise<PlayerData[]> => {
  return new Promise<PlayerData[]>(resolve => _getPlayersData(resolve));
};

const _getPlayersData = (returnFunc: (data: PlayerData[]) => void) => {
  const playerContainers = Array.from(document.querySelectorAll("#player_boards div.player-name[id^=\"player_name_\"]")).filter(elt => elt.id.length > 13 || elt.id === "player_name_7");
  const playerlinks = document.querySelectorAll("#player_boards div.player-name[id^=\"player_name_\"] a[href*=\"/player?id\"]");
  let result: PlayerData[] | undefined = undefined;

  if (playerContainers && playerlinks && playerContainers.length && playerContainers.length === playerlinks.length) {
    const playersIdList = Object.values(playerContainers)
      .filter((d) => d.id)
      .map((d) => parseInt(d.id.substring(12), 10))
      .filter((id) => !isNaN(id));

    const playersData = playersIdList.map((id, index) => {
      const userLink = playerlinks[index] as any;
      const avatar = document.getElementById(`avatar_${id}`) as any;
      const color = `#${rgbHex(getComputedStyle(userLink).color)}`;
      const darkColor = colorsMap.find(c => c.light === color)?.dark;
      const darkEnlight = colorsToEnlight.includes(color);

      return {
        id,
        name: userLink.innerText,
        avatar: avatar.src,
        color,
        darkColor,
        darkEnlight
      };
    });

    result = playersData.length ? playersData : undefined;
  }

  if (result) {
    returnFunc(result);
  } else {
    setTimeout(() => _getPlayersData(returnFunc), 100);
  };
};

export const getPlayersPossibleColors = (gameName: string) => {
  if (gamesWithCustomColors[gameName]) {
    return gamesWithCustomColors[gameName].map((color: string) => {
      const darkColor = colorsMap.find(c => c.light === color)?.dark;
      const darkEnlight = colorsToEnlight.includes(color);

      return {
        id: 0,
        name: '',
        avatar: '',
        color,
        darkColor,
        darkEnlight
      };
    });
  }

  return [];
};

const colorsMap = [
  { light: "#0000ff", dark: "#6666ff" },
  { light: "#982fff", dark: "#bf80ff" },
  { light: "#1863a5", dark: "#8fc2ef" },
  { light: "#0000dd", dark: "#8080ff" },
  { light: "#442df0", dark: "#9588f7" },
  { light: "#2a05df", dark: "#5837fb" },
  { light: "#ff0000", dark: "#ff3333" },
  { light: "#800000", dark: "#cc0000" },
  { light: "#1a355e", dark: "#3771c8" },
  { light: "#4e186f", dark: "#932ed1" },
  { light: "#325089", dark: "#446ebb" },
  { light: "#044396", dark: "#0559c7" },
  { light: "#003377", dark: "#006eff" },
  { light: "#0000aa", dark: "#006eaa" },
  { light: "#773300", dark: "#b34d00" },
  { light: "#5d0075", dark: "#cc00ff" },
  { light: "#6c3161", dark: "#9e478e" },
  { light: "#483d8b", dark: "#7c71c1" },
  { light: "#2b4d9c", dark: "#4b72ce" },
  { light: "#4c1b5b", dark: "#9435b1" },
  { light: "#0b2ac9", dark: "#3d5cf5" },
  { light: "#041e42", dark: "#0a4ca9" },
  { light: "#fbff00", dark: "#c9cc00" },
  { light: "#632179", dark: "#9331b4" },
  { light: "#00008b", dark: "#4d4dff" },
  { light: "#000083", dark: "#a013bc" },
  { light: "#500080", dark: "#9100e6" },
  { light: "#7b7b7b", dark: "#999999" },
  { light: "#6d416f", dark: "#9d5ea1" },
  { light: "#631c60", dark: "#c738c0" },
  { light: "#663300", dark: "#994d00" },
  { light: "#39552f", dark: "#588448" },
  { light: "#5c3a72", dark: "#8855aa" },
  { light: "#2c5e8e", dark: "#3c82c3" },
  { light: "#008000", dark: "#00b300" },
  { light: "#374c5d", dark: "#6e8faa" },
  { light: "#800080", dark: "#cc00cc" },
  { light: "#004879", dark: "#006bb3" },
  { light: "#5c315f", dark: "#824587" },
  { light: "#0d5741", dark: "#1bb184" },
  { light: "#4e008e", dark: "#7e00e6" },
  { light: "#70421d", dark: "#a2602a" },
  { light: "#971923", dark: "#c5202e" },
  { light: "#660090", dark: "#a400e6" },
  { light: "#111a22", dark: "#446888" },
  { light: "#4c266d", dark: "#693597" },
  { light: "#611e2a", dark: "#9c3044" },
  { light: "#6f1e6b", dark: "#a02c9a" },
  { light: "#6f4324", dark: "#c1753e" },
  { light: "#b300a2", dark: "#ff80f2" },
  { light: "#5e3200", dark: "#cc6d00" },
  { light: "#0045b2", dark: "#1a71ff" },
  { light: "#b20000", dark: "#ff3333" },
  { light: "#23408e", dark: "#476cd1" },
  { light: "#383636", dark: "#757070" },
];

const colorsToEnlight = [
  '#000000', '#101820', '#123888', '#1e2e3d', '#404040', '#272c29', '#3d1303', '#2d2926',
  '#3b3232', '#010203', '#1a2126', '#302c2b', '#321500', '#080d10', '#210000', '#423d37',
  '#100000', '#171614', '#1b1819', '#101112', '#262f33', '#202020', '#12151a', '#000001'
];
