// Script injected in the page context (not in the extension isolated world) for the game "dronesvsseagulls"
import { waitForObj } from "../js/utils/misc/wait";

waitForObj('#overall-content', 5000)
  .then(() => waitForObj('#tokens_wrap', 2000))
  .then((elt) => elt.classList.remove("whiteblock"))
  .catch(() => { /* element not found: nothing to fix */ });
