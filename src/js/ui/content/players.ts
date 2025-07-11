import rgbHex from "rgb-hex";
import { gamesWithCustomColors } from "../../config/darkThemeGames";
import { getColorForDarkMode } from "../../utils/misc/colors";

let playersData: PlayerData[] | undefined = undefined;

export interface PlayerData {
  id: number;
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
      .filter((id) => !isNaN(id));

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
        id: 0,
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
/*
const colorsMap = [
  { light: "#0000ff", dark: "#6666ff" },
  { light: "#0000ee", dark: "#6666ff" },
  { light: "#982fff", dark: "#bf80ff" },
  { light: "#1863a5", dark: "#8fc2ef" },
  { light: "#0000dd", dark: "#8080ff" },
  { light: "#442df0", dark: "#9588f7" },
  { light: "#2a05df", dark: "#5837fb" },
  { light: "#ff0000", dark: "#ff3333" },
  { light: "#e50028", dark: "#ff3333" },
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
  { light: "#00008b", dark: "#6666ff" },
  { light: "#000083", dark: "#a013bc" },
  { light: "#500080", dark: "#9100e6" },
  { light: "#7b7b7b", dark: "#999999" },
  { light: "#6d416f", dark: "#9d5ea1" },
  { light: "#631c60", dark: "#c738c0" },
  { light: "#663300", dark: "#994d00" },
  { light: "#39552f", dark: "#588448" },
  { light: "#5c3a72", dark: "#8855aa" },
  { light: "#2c5e8e", dark: "#3c82c3" },
  { light: "#008000", dark: "#009e0a" },
  { light: "#00ff00", dark: "#009e0a" },
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
  { light: "#006a8f", dark: "#0083b3" },
  { light: "#5e2791", dark: "#8e4acf" },
  { light: "#4f5c64", dark: "#70838f" },
  { light: "#505b66", dark: "#657381" },
  { light: "#074162", dark: "#0c6ea7" },
  { light: "#1f3067", dark: "#3b5bc4" },
  { light: "#732473", dark: "#ae37ae" },
  { light: "#123888", dark: "#1d5ce2" },
  { light: "#601986", dark: "#a43ddb" },
  { light: "#7d6351", dark: "#a48874" },
  { light: "#04496c", dark: "#0786c5" },
  { light: "#444442", dark: "#81817e" },
  { light: "#814b89", dark: "#a56bae" },
  { light: "#000080", dark: "#4d4dff" },
  { light: "#205623", dark: "#37953c" },
  { light: "#8f2c5a", dark: "#b0366f" },
  { light: "#b61f49", dark: "#da2558" },
  { light: "#799080", dark: "#acb9b0" },
  { light: "#4a4e51", dark: "#798086" },
  { light: "#5743e9", dark: "#705fec" },
  { light: "#595653", dark: "#b5b3b0" },
  { light: "#4d514d", dark: "#969c96" },
  { light: "#70635f", dark: "#b9afac" },
  { light: "#6e5789", dark: "#a492b9" },
  { light: "#00552e", dark: "#00cc6d" },
  { light: "#5e3f85", dark: "#9574be" },
  { light: "#20134b", dark: "#785cd6" },
  { light: "#695230", dark: "#af8950" },
  { light: "#5b3220", dark: "#bd6742" },
  { light: "#1e2c36", dark: "#5b86a4" },
  { light: "#7c5654", dark: "#986a67" },
  { light: "#6d2077", dark: "#a630b5" },
  { light: "#00677f", dark: "#00a7cc" },
  { light: "#c8102e", dark: "#ff3333" },
  { light: "#615b60", dark: "#9c969b" },
  { light: "#1b1b1b", dark: "#999" },
  { light: "#04237b", dark: "#205af8" },
  { light: "#3b550c", dark: "#6d9c16" },
  { light: "#3c3c3c", dark: "#808080" },
  { light: "#2a456b", dark: "#4776b8" },
  { light: "#4c3084", dark: "#6c44bb" },

];

const colorsToEnlight = [
  '#000000', '#101820', '#1e2e3d', '#404040', '#272c29', '#3d1303', '#2d2926', '#2d2e29',
  '#3b3232', '#010203', '#1a2126', '#302c2b', '#321500', '#080d10', '#210000', '#423d37',
  '#100000', '#171614', '#1b1819', '#101112', '#262f33', '#202020', '#12151a', '#000001',
  '#231f20', '#080404', '#0a0706', '#3c312c', '#0f0f0e', "#240e11", "#111111", "#333333",
  '#151d21', '#272727', '#252220', '#050303', '#252525', "#444444", "#10222f"
];*/
