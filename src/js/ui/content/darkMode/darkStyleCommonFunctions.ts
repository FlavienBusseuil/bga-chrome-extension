import { getUrl } from "../../../utils/chrome";
import { waitForObj } from '../../../utils/misc/wait';

const themeStyleId = "ext-theme-style";
export const cookieName = "ext_dark_theme";

export const getFile = async (file: string) => {
  const url = getUrl(`css/${file}`);
  const response = await fetch(url);
  const content = await response.text();
  return { file, content };
};

export const createStyle = () => {
  const styleComponent = document.createElement("style");
  styleComponent.id = themeStyleId;

  waitForObj('head', 10).then(() => {
    document.head.appendChild(styleComponent);
  });

  return styleComponent;
};