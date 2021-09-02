import { Error as ErrorComponent } from "../../ui/Error";

export function renderError({ errorText, errorMessage }) {
	const bodyElm = document.querySelector("body");

	const errorElm = ErrorComponent({
		errorText,
		errorMessage,
	});
	bodyElm.appendChild(errorElm);

	// Set badge
	chrome.action.setBadgeBackgroundColor({ color: "#dc2626" });
	chrome.action.setBadgeText({ text: `x` });
}
