import type { AdvancedHomeConfig } from "./config/configuration";

let _initialized = false;

const _init = () => {
  if (_initialized) {
    return;
  }

  if (!document.body) {
    setTimeout(_init, 50);
    return;
  }

  _initialized = true;

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
      const but = document.querySelector('.bga-homepage__newsfeed-controls > button:last-child') as HTMLButtonElement | null;

      console.debug("[bga extension] add tournaments items");

      for (let i = 0; i < 10; i++) {
        but?.click();
      }
    } else {
      setTimeout(addTournamentsItems, 50);
    }
  };

  const copyHtml = (querySource: string, queryDest: string) => {
    const source = document.querySelector(querySource);
    const dest = document.querySelector(queryDest);

    if (dest && source) {
      dest.className = source.className;
      dest.innerHTML = source.innerHTML;
    }
  };

  const advancedSetPageElements = () => {
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isRecent"])', '#bgaext-games-recent');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isTrending"])', '#bgaext-games-popular');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isSuggested"])', '#bgaext-games-suggested');
    copyHtml('#bgadef-homepage .bga-homepage__games-section > div:last-child', '#bgaext-games-classic');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/player?section=recent"])', '#bgaext-newsfeed');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="tournamentlist"])', '#bgaext-tournaments');
    copyHtml('#bgadef-homepage [style="grid-area: achievements;"]', '#bgaext-achievements');
    copyHtml('#bgadef-homepage [style="grid-area: playmore;"]', '#bgaext-playmore');
    copyHtml('#bgadef-homepage [style="grid-area: leaderboard;"]', '#bgaext-leaderboard');
    copyHtml('#bgadef-homepage .bga-homepage__service-status-section', '#bgaext-service-status');
    copyHtml('#bgadef-homepage .bga-homepage__partner-events-section', '#bgaext-partners-events');
  };

  let observer: MutationObserver | undefined;
  let customMainContent: HTMLElement | undefined;

  const advancedSetPage = (homeConfig: AdvancedHomeConfig) => {
    const mainContent = document.querySelector('.bga-homepage');

    if (mainContent) {
      console.debug("[bga extension] advanced set page");
      mainContent.id = 'bgadef-homepage';

      if (!customMainContent) {
        customMainContent = document.createElement('DIV');
        customMainContent.id = 'bgaext-homepage';
        customMainContent.className = 'bga-homepage';
        mainContent.parentNode!.appendChild(customMainContent);
      }

      customMainContent.innerHTML = homeConfig.html;
      advancedSetPageElements();

      if (!observer) {
        observer = new MutationObserver(advancedSetPageElements)
        observer.observe(mainContent, { childList: true, subtree: true });
      }
    } else {
      setTimeout(() => advancedSetPage(homeConfig), 50);
    }
  };

  const advancedReset = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
    if (customMainContent) {
      customMainContent.innerHTML = "";
      customMainContent.remove();
      customMainContent = undefined;
    }
  };

  const setPage = (homeConfig: AdvancedHomeConfig) => {
    advancedReset();

    if (homeConfig.advanced) {
      advancedSetPage(homeConfig);
    }
  };

  document.body.addEventListener('bga_ext_send_homepage_config', (data) => {
    const config = JSON.parse((data as CustomEvent).detail) as AdvancedHomeConfig;
    setPage(config);
  });
  document.body.dispatchEvent(new CustomEvent('bga_ext_get_homepage_config', {}));

  maximizeTournamentsList();

  console.debug('[bga extension] home page management initialized');
};

_init();