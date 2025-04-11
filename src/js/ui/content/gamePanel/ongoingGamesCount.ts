import { waitForElement } from "../../utils/cn.js"

const counterId = "in_progress_games_count";
const updateOngoingGameCount = (root: Element, observer: MutationObserver) => {
    observer.disconnect();
    const ongoingGameCount = root.children[1].children[0].children.length;
    var counter = document.querySelector<HTMLParagraphElement>(`#${counterId}`);
    if (!counter)
    {
        counter = document.createElement("p");
        counter.id = counterId;
        counter.style.display = "inline";
        root.children[0].appendChild(counter);
    }

    counter.textContent = `(${ongoingGameCount})`;
    observer.observe(root, { childList: true, subtree: true });
}

export const initGamePanelObserver = () => {
    return waitForElement(".block-panel-gaminfo")
        .then((root: Element) => {
            const observer = new MutationObserver(() => updateOngoingGameCount(root.children[0], observer));
            updateOngoingGameCount(root.children[0], observer);
            return observer;
        });
}