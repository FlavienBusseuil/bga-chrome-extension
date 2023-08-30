import rgbHex from "rgb-hex";

export interface PlayerData {
  id: number;
  name: string;
  avatar: string;
  color: string;
};

export const getPlayersData = async (): Promise<PlayerData[]> => {
  return new Promise<PlayerData[]>(resolve => _getPlayersData(resolve));
};

const _getPlayersData = (returnFunc: (data: PlayerData[]) => void) => {
  const elements = document.querySelectorAll("div.player-name");
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

      return {
        id,
        name: userLink.innerText,
        avatar: avatar.src,
        color: `#${rgbHex(getComputedStyle(userLink).color)}`,
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

