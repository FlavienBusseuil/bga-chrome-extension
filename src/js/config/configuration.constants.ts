export const DEF_HOME_HTML = `<style>
#bgaext-newsfeed .bga-homepage-newsfeed {
	max-height: 900px;
	overflow: auto;
}
</style>
<div class='bgaext-flex-col'>
  <div class='bgaext-flex-row'>
    <div id='bgaext-tournaments'></div>
    <div class='bgaext-flex-col'>
      <div class='bgaext-flex-row'>
        <div id='bgaext-games-recent'></div>
        <div id='bgaext-games-popular'></div>
        <div id='bgaext-games-suggested'></div>
      </div>
      <div class='bgaext-flex-row'>
        <div id='bgaext-achievements'></div>
        <div id='bgaext-leaderboard'></div>
      </div>
    </div>
    <div class='bgaext-flex-col'>
      <div id='bgaext-newsfeed'></div>
      <div id='bgaext-service-status'></div>
    </div>
  </div>
  <div class='bgaext-flex-row'>
    <div id='bgaext-games-classic'></div>
    <div id='bgaext-playmore'></div>
  </div>
</div>`;

export const ADVANCED_HOME_STYLE = `
.bgaext_welcome .post.bga-hover-for-list {
  display: block !important;
}

.bgaext_welcome .bga-homepage-header {
  display: none;
}

#bgadef-homepage {
  height: 1px;
  zoom: 0.1;
  opacity: 0
}

#bgaext-tournaments {
  min-width: 400px;
}

#bgaext-newsfeed .bga-homepage-newsfeed {
  max-height: 900px;
  overflow: auto;
}

#bgaext-homepage {
  padding: 2em;
}

.bgaext-flex-row,
.bgaext-flex-row-distribution {
  display: flex;
  flex-flow: row nowrap;
  gap: 2em;
  justify-content: space-between;
}

.bgaext-flex-row>div {
  flex-grow: 1;
}

.bgaext-flex-row-distribution>div {
  flex: 1 1 0;
  width: 0;
}

.bgaext-flex-col {
  display: flex;
  flex-flow: column;
  gap: 1em;
}

#bgaext-homepage .bga-generic-game-item:hover .bga-hover-animated-border:before {
  -webkit-clip-path: circle(142% at bottom left);
  clip-path: circle(142% at bottom left);
}
`;

export const COLORFUL_TABLES = `
html.darkmode {
    .bga-table-list-item {
        --dark-10: hsl(from var(--gametile-type-color) h s calc(l / 2));
        --dark-20: hsl(from var(--gametile-type-color) h s calc(l / 3));
        --light-50: hsl(from var(--gametile-type-color) h s calc(l + 15));
        --gametile-color: hsl(from var(--gametile-type-color) h s calc(l + 25));

        & .bga-table-list-item__background > div > .bga-table-list-item__main {
            & .text-bga-gray-78,
            & .text-base {
                color: var(--gametile-color)!important;
            }
        }

        &:has(> .bga-table-list-item__background[style$="rgb(64, 117, 158);"]) {
            --gametile-type-color: hsl(200, 20%, 50%);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(150, 171, 192);"]) {
            --gametile-type-color: hsl(210, 30%, 55%);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(88, 78, 161);"]) {
            --gametile-type-color: hsl(250, 35%, 45%);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(158, 154, 194);"]) {
            --gametile-type-color: hsl(240, 30%, 55%);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(143, 92, 167);"]) {
            --gametile-type-color: hsl(280, 30%, 50%);
        }
    }
}

html:not(.darkmode) {
    .bga-table-list-item {
        --gametile-border-color: var(--gametile-type-color);
        --gametile-color: hsl(from var(--gametile-type-color) h s calc(l - 15));
        --gametile-icon-color: hsl(from var(--gametile-type-color) h s calc(l + 15));
        --gametile-surface-color: hsl(from var(--gametile-type-color) h s calc(l + 45));

        &:has(> .bga-table-list-item__background[style$="rgb(64, 117, 158);"]) {
            --gametile-type-color: rgb(64, 117, 158);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(150, 171, 192);"]) {
            --gametile-type-color: rgb(150, 171, 192);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(88, 78, 161);"]) {
            --gametile-type-color: rgb(88, 78, 161);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(158, 154, 194);"]) {
            --gametile-type-color: rgb(158, 154, 194);
        }
        &:has(> .bga-table-list-item__background[style$="rgb(143, 92, 167);"]) {
            --gametile-type-color: rgb(143, 92, 167);
        }

        & .bga-table-list-item__background > div > .bga-table-list-item__main {
            background-color: var(--gametile-surface-color);
            border: 1px solid var(--gametile-border-color);

            & .text-bga-gray-78,
            & .text-base {
                color: var(--gametile-color);
            }

            & .bga-table-list-item__details {
                & .bga-table-list-item__status-mode-icon {
                    background-color: unset;
                    color: var(--gametile-icon-color);
                }

                & .bga-table-list-item__status-mode-icon-inverse-border {
                    box-shadow: unset;
                }
            }
        }

        & > div.bga-table-list-item__players-list.flex {
            background-color: var(--gametile-surface-color);
            border: 1px solid var(--gametile-border-color);
        }
    }
}
`;

export const ARENA_DISABLED_GAMES = `
.rankingmode_arena .game_box_wrap:has(.disable_ranking),
.rankingmode_arena .game_box_wrap:has(.alpha_game),
.rankingmode_arena .game_box_wrap:has(.beta_game),
.rankingmode_arena .game_box_wrap:has(.beginner),
.rankingmode_arena .game_box_wrap:has(.howtoplay),
.rankingmode_arena .lobby_section:has(.suggestion_othergames) {
    display: none !important;
}
`;