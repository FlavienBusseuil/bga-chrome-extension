import { checkIfResourcePathExists, getUrl } from "../../../utils/browser";
import { waitForObj } from '../../../utils/misc/wait';

const themeStyleId = "bgaext-theme-style";
export const cookieName = "ext_dark_theme";

export type DarkStyle = 'on' | 'off' | 'native';

export const getDarkStyle = (): DarkStyle => {
  const mode = localStorage.getItem(cookieName) || 'off';
  return ['on', 'native'].includes(mode) ? mode as DarkStyle : 'off';
};

export const saveDarkStyle = (mode: DarkStyle) => {
  localStorage.setItem(cookieName, mode);
};

export const getFile = async (file: string, silentOnFailure: boolean = false) => {
  const fullPath = `/css/${file}`;

  // Safeguard to avoid security warnings
  // Todo: remove this once there are complete game configs
  const existsInManifest = checkIfResourcePathExists(fullPath);
  if (!existsInManifest) {
    if (!silentOnFailure) {
      console.error(`[bga extension] File not found in manifest: ${fullPath}`);
    }
    return { file, content: "" };
  }

  const url = getUrl(fullPath);
  let content = "";
  try {
    const response = await fetch(url);
    content = await response.text();
  } catch (error) {
    if (!silentOnFailure) {
      console.error(`[bga extension] Error loading file: ${file}, error: ${error}`);
    }
  }

  return { file, content };
};

export const createStyle = (id?: string) => {
  const styleComponent = document.createElement("style");
  styleComponent.id = id || themeStyleId;

  console.debug(`[bga extension] Create ${styleComponent.id} style tag`);

  waitForObj('head').then(() => {
    document.head.appendChild(styleComponent);
  });

  return styleComponent;
};