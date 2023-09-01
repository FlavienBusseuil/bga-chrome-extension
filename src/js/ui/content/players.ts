import rgbHex from "rgb-hex";

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
  const elements = document.querySelectorAll("#player_boards div.player-name");
  let result: PlayerData[] | undefined = undefined;

  if (elements && elements.length) {
    const playersIdList = Object.values(elements)
      .filter((d) => d.id)
      .map((d) => parseInt(d.id.substring(12), 10))
      .filter((id) => !isNaN(id));

    const playersData = playersIdList.map((id) => {
      const userContainer = document.getElementById(`player_name_${id}`) as any;
      const userLink = userContainer.childNodes[1];
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
  { light: "#5d0075", dark: "#8f00b3" },
  { light: "#6c3161", dark: "#9e478e" },
  { light: "#483d8b", dark: "#7c71c1" },
  { light: "#2b4d9c", dark: "#4b72ce" },
  { light: "#4c1b5b", dark: "#732989" },
  { light: "#0b2ac9", dark: "#3d5cf5" },
  { light: "#041e42", dark: "#0a4ca9" },
  { light: "#fbff00", dark: "#c9cc00" },
  { light: "#632179", dark: "#9331b4" },
  { light: "#00008b", dark: "#4d4dff" },
];

const colorsToEnlight = [
  '#000000', '#101820', '#123888', '#1e2e3d', '#404040', '#272c29', '#3d1303', '#2d2926', '#3b3232', '#010203', '#1a2126', '#302c2b', '#321500', '#080d10'
];