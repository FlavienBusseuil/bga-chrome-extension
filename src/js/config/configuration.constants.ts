export const DEF_HOME_HTML = `<style>
#bgaext-newsfeed .bga-homepage-newsfeed {
	max-height: 1020px;
	overflow: auto;
}
#bgaext-tournaments .bga-homepage-tournaments-agenda {
  max-height: 700px;
  overflow: auto;
}
</style>
<div class='bgaext-flex-col'>
  <div class='bgaext-flex-row'>
    <div class='bgaext-flex-col'>
      <div id='bgaext-partners-events'></div>
      <div id='bgaext-tournaments'></div>
    </div>
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

#bgaext-homepage .bga-advent-calendar {
    display: flex;
    flex-flow: column;
    justify-content: center;
}
`;

export const COLORFUL_TABLES = `
html[data-theme=dark] {
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

html[data-theme=light] {
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
.game_box_wrap:has(.gamerank_beginner) .gametable_list_arenavail {
  display: none !important;
}
`;

export const HIDE_FULLSCREEN_LOADING_LOGO = `
#overall_loading, #main-content > #loading { display: none; }
`;

export const COMMON_CSS = `
:root {
  --header-icons-color: #01c4ca;
}

/* Delete button on gamelist page */
html:not(.bgaext_gamelist) .ext_delete_button {
  display: none;
}

/* maintenance error message */
body>h1,
body>h2 {
  color: #fff;
}
body>h2>a {
  color: #01c4ca;
}

#lrf-bga-extension, .bgaext_overlay {
  display: none;
}
html[data-theme="dark"] .bgaext_overlay{
  display: block;
}

.bgaext_chat_mute_icon {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 7px;
  left: 2px;
  display: none;
}
.bgaext_chat_hidden {
  display: none!important;
}
.bgaext_chat_visible {
  display: inline!important;
}
.roundedboxinner:hover .bgaext_chat_mute_icon {
  cursor: pointer;
  display: block;
}

#logs .log.hidden {
  display: none !important;
}

#bga_extension_chat_icon {
  color: var(--header-icons-color);
}

#chatwindow_general {
  display: inline-block !important;
}
.bgaext_general_chat_hidden #bga_extension_chat_icon {
  color: #c4c4c4;
}
.bgaext_general_chat_hidden #chatwindow_general {
  display: none !important;
}

.bga-friends-icon svg[fill="#01C4CA"] {
  fill: var(--header-icons-color) !important;
}

#bgaext-side-panel {
  display: none;
  position: absolute;
  top: 8px;
  right: 5px;
  z-index: 10000;
  color: var(--header-icons-color);
  font-size: 24px;
  cursor: pointer;
}
@media (min-width: 900px) {
  #bgaext-side-panel {
    display: block;
  }
}
.bgaext_game #bgaext-side-panel,
.bgaext_tableview #bgaext-side-panel,
.bgaext_sidepanel_opened #bgaext-side-panel,
.bgaext_forum_visible #bgaext-side-panel {
    display: none;
  }
`;

export const ARCHIVE_FLOATING_MENU_CSS = `
.bgaext_archive_floating_menu #archivecontrol_editmode {
  position: fixed;
  left: 50%;
  top: 5px;
  background: #ebd5bd;
  border: 1px solid #222;
  border-radius: 8px;
  padding-top: 8px;
  z-index: 1;
  cursor: grab;
}
.bgaext_archive_floating_menu.bgaext_dark #archivecontrol_editmode {
  background: var(--dark-10);
  border: 1px solid var(--light-50);
}
#archivecontrol_editmode .fa {
  vertical-align: top;
  padding: 10px 10px 0px 0px;
  cursor: pointer;
}
.bgaext_archive_floating_menu #archivecontrol_editmode .fa {
  display:none;
}
`;