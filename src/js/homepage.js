const maximizeTournamentsList = () => {
  if (document.querySelector('.bga-homepage__content')) {
    const innerWidth = window.innerWidth;
    window.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));

    console.debug("[bga extension] resize UI to maximize tournaments list");

    setTimeout(() => {
      window.innerWidth = innerWidth;
      window.dispatchEvent(new Event('resize'));
      addTournamentsItems();
    }, 10);
  } else {
    setTimeout(maximizeTournamentsList, 50);
  }
};

const addTournamentsItems = () => {
  if (document.querySelector('.bga-tournament-list-item')) {
    const but = document.querySelector('.bga-homepage__newsfeed-controls > button:last-child');

    console.debug("[bga extension] add tournaments items");

    for (let i = 0; i < 10; i++) {
      but.click();
    }
  } else {
    setTimeout(addTournamentsItems, 50);
  }
};

const copyResultsArea = () => {
  const source = document.querySelector('.bga-homepage__pre-footer .homepage-section');
  const destination = document.querySelector('.bga-homepage__games-section');

  if (source && destination) {
    const childs = destination.childNodes;

    const destContainerTop = document.createElement("DIV");
    const destContainerBottom = document.createElement("DIV");

    destContainerTop.id = 'bgaext_your_results_top';
    destContainerBottom.id = 'bgaext_your_results_bottom';

    destContainerTop.innerHTML = source.innerHTML;
    destContainerBottom.innerHTML = source.innerHTML;

    destination.insertBefore(destContainerBottom, childs[1]);
    destination.insertBefore(destContainerTop, childs[0]);

    const observer = new MutationObserver(() => {
      destContainerTop.innerHTML = source.innerHTML;
      destContainerBottom.innerHTML = source.innerHTML;
    })
    observer.observe(source, { childList: true, subtree: true });
  } else {
    setTimeout(copyResultsArea, 50);
  }
};

window.addEventListener('message', (evt) => {
  if (evt.origin === 'https://boardgamearena.com' && evt.data.key === 'bga_ext_home_reset') {
    copyResultsArea();
  }
}, false);

document.addEventListener('DOMContentLoaded', () => {
  maximizeTournamentsList();
  setTimeout(copyResultsArea, 100);
});