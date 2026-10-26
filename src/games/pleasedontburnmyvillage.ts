// Script injected in the page context (not in the extension isolated world) for the game "pleasedontburnmyvillage"
import { getColorForDarkMode } from "../js/utils/misc/colors";
import { waitForObj } from "../js/utils/misc/wait";

waitForObj('#overall-content', 5000)
  .then(() => waitForObj('.background-container'))
  .then(() => {
    const color = document.documentElement.style.getPropertyValue('--player-color');
    const darkColor = getColorForDarkMode(color);
    document.documentElement.style.setProperty('--player-color', darkColor.color);
  })
  .catch(() => { /* element not found: nothing to fix */ });
