// Script injected in the page context (not in the extension isolated world) for the game "hydroracers"
import { waitForObj } from "../js/utils/misc/wait";

waitForObj('#overall-content', 5000)
  .then(() => document.querySelectorAll(".playerBoard .whiteblock.cockpit").forEach(elt => elt.classList.remove("whiteblock")))
  .catch(() => { /* element not found: nothing to fix */ });
