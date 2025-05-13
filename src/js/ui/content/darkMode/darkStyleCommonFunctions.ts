import { checkIfResourcePathExists, getUrl } from "../../../utils/browser";
import { waitForObj } from '../../../utils/misc/wait';

const themeStyleId = "ext-theme-style";
export const cookieName = "ext_dark_theme";

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

export const createStyle = () => {
  const styleComponent = document.createElement("style");
  styleComponent.id = themeStyleId;

  waitForObj('head').then(() => {
    document.head.appendChild(styleComponent);
  });

  return styleComponent;
};