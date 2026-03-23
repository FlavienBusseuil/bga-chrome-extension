import DOMPurify from 'dompurify';
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

    if (dest && source && (dest.className !== source.className || dest.innerHTML !== source.innerHTML)) {
      dest.className = source.className;
      dest.replaceChildren(...source.cloneNode(true).childNodes);
      return true;
    }

    return false;
  };

  let searchChangedByExt = false;

  const advancedSetPageElements = () => {
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isRecent"])', '#bgaext-games-recent');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isTrending"])', '#bgaext-games-popular');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/gamelist?isSuggested"])', '#bgaext-games-suggested');
    copyHtml('#bgadef-homepage .bga-advent-calendar', '#bgaext-games-suggested');
    copyHtml('#bgadef-homepage .bga-homepage__games-section > div:last-child', '#bgaext-games-classic');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="/player?section=recent"])', '#bgaext-newsfeed');
    copyHtml('#bgadef-homepage .homepage-section:has([href*="tournamentlist"])', '#bgaext-tournaments');
    copyHtml('#bgadef-homepage [style="grid-area: achievements;"]', '#bgaext-achievements');

    if (copyHtml('#bgadef-homepage [style="grid-area: playmore;"]', '#bgaext-playmore')) {
      const defSearchInput = document.body.querySelector('#bgadef-homepage .bgaPlayerSearch input') as HTMLInputElement | null;
      const extSearchInput = document.body.querySelector('#bgaext-homepage .bgaPlayerSearch input') as HTMLInputElement | null;

      if (defSearchInput && extSearchInput) {
        extSearchInput.value = defSearchInput.value;

        extSearchInput.addEventListener('input', () => {
          searchChangedByExt = true;
          defSearchInput.value = extSearchInput.value;
          defSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        });

        if (searchChangedByExt) {
          setTimeout(() => {
            const input = document.body.querySelector('#bgaext-homepage .bgaPlayerSearch input') as HTMLInputElement | null;
            if (input) {
              input.focus();
              const valLength = input.value.length;
              input.setSelectionRange(valLength, valLength);
            }
          }, 500);
          searchChangedByExt = false;
        }
      }

      const defCloseButton = document.body.querySelector('#bgadef-homepage [style="grid-area: playmore;"] .fa-close') as HTMLElement | null;
      const extCloseButton = document.body.querySelector('#bgaext-playmore .fa-close') as HTMLElement | null;

      if (defCloseButton && extCloseButton) {
        extCloseButton.addEventListener('click', () => defCloseButton.click());
      }

      const defLinks = document.body.querySelectorAll('#bgadef-homepage [style="grid-area: playmore;"] .bga-link') as NodeListOf<HTMLElement>;
      const extLinks = document.body.querySelectorAll('#bgaext-playmore .bga-link') as NodeListOf<HTMLElement>;

      extLinks.forEach((link, index) => {
        link.addEventListener('click', () => defLinks[index]?.click());
      });

      const defCopyInput = document.body.querySelector('#bgadef-homepage .bga-copy-text-box__copy-display') as HTMLInputElement | null;
      const extCopyInput = document.body.querySelector('#bgaext-homepage .bga-copy-text-box__copy-display') as HTMLInputElement | null;

      if (defCopyInput && extCopyInput) {
        extCopyInput.value = defCopyInput.value;
      }

      const defCopyButton = document.body.querySelector('#bgadef-homepage .bga-copy-text-box__copy-trigger') as HTMLElement | null;
      const extCopyButton = document.body.querySelector('#bgaext-homepage .bga-copy-text-box__copy-trigger') as HTMLElement | null;

      if (defCopyButton && extCopyButton) {
        extCopyButton.addEventListener('click', () => defCopyButton.click());
      }
    }

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

      customMainContent.innerHTML = DOMPurify.sanitize(homeConfig.html, { ADD_TAGS: ['style'], FORCE_BODY: true });
      advancedSetPageElements();

      if (!observer) {
        observer = new MutationObserver(advancedSetPageElements)
        observer.observe(mainContent, { childList: true, subtree: true });

        /* Fix click on calendar event with advanced display mode */
        customMainContent.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          const clickedDay = target.closest('.bga-advent-calendar__day');

          if (clickedDay && customMainContent && customMainContent.contains(clickedDay)) {
            const allDays = Array.from(customMainContent.querySelectorAll('.bga-advent-calendar__day'));
            const index = allDays.indexOf(clickedDay as HTMLElement);

            const daysB = Array.from(mainContent.querySelectorAll('.bga-advent-calendar__day'));
            const targetDay = daysB[index] as HTMLElement;

            targetDay && targetDay.click();
          }
        });
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
      customMainContent.replaceChildren();
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