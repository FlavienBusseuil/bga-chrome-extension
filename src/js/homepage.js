const maximizeTournamentsList = () => {
  if (document.querySelector('.bga-homepage__content')) {
    const innerWidth = window.innerWidth;
    window.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));

    console.log("[bga extension] resize UI to maximize tournaments list");

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

    console.log("[bga extension] add tournaments items");

    for (let i = 0; i < 10; i++) {
      but.click();
    }
  } else {
    setTimeout(addTournamentsItems, 50);
  }
};

maximizeTournamentsList();