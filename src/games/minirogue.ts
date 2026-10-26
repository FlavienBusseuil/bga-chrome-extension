// Script injected in the page context (not in the extension isolated world) for the game "minirogue"
// The icons of the logs are styled with their "data-type" attribute, which is missing on some of them
import { waitForObj } from "../js/utils/misc/wait";

const fixSpans = () => {
  document.querySelectorAll('span.mnr-i:not([data-type])').forEach((el) => {
    const t = el.textContent?.trim();
    if (t && el.getAttribute('data-type') !== t) el.setAttribute('data-type', t);
  });
};

waitForObj('#overall-content', 5000)
  .then(() => waitForObj('#logs'))
  .then((container) => {
    const observer = new MutationObserver(fixSpans);

    observer.observe(container, {
      childList: true,
      subtree: true
    });
  })
  .catch(() => { /* element not found: nothing to fix */ });
