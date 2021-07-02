import { LoginButton } from "../../ui/LoginButton";

export function renderLoggedOut() {
  const bodyElm = document.querySelector("body");
  bodyElm.appendChild(LoginButton());

  // Set badge
  chrome.action.setBadgeBackgroundColor({ color: "#757575" });
  chrome.action.setBadgeText({ text: `-` });
}
