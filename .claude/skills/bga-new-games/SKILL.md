---
name: bga-new-games
description: Weekly check of the BGA games list - finds the games released or out of alpha since the last check that have no dark theme in src/games, creates and tests their theme with the Playwright MCP, and reports the files of games removed from BGA. Use when the user asks to check or handle the new BGA games.
---

# New BGA games

Find the games that became visible to the players since the last check (new, or out of alpha) and have no file in `src/games`, then create their dark theme following the "Game themes (dark mode)" rules of `CLAUDE.md`.

## 1. Prerequisites

- `yarn dev` must be running (a `node scripts/finalizeGamesBuild.js build/dev --watch` process): otherwise ask the user to start it.
- The Playwright MCP (`local/playwright-mcp.json`) loads `build/dev`. Its profile must be logged in on BGA: logged out, BGA redirects to `fr.boardgamearena.com`, not matched by the manifest, and the extension doesn't run. If `globalUserInfos.user_infos` is missing or the html has no `bgaext_*` class, ask the user to log in in the Playwright window.
- Page loads often hang in dev mode: retry the navigation once before looking for another cause.

## 2. List of the games

Open `https://boardgamearena.com/gamelist` and save the list with `browser_evaluate` (`filename: temp/playwright/bga-games-dump.json`):

```js
() => JSON.stringify(globalUserInfos.game_list.map(g => [g.name, g.status, g.display_name_en, g.published_on || '', g.beta_on || '', g.id]))
```

Then run `node .claude/skills/bga-new-games/compare.js temp/playwright/bga-games-dump.json` (without `--update`). It lists:
- the new games without a theme (statuses `alpha` and `private_alpha` are ignored),
- the files of `src/games` without a game in the list.

Without a previous snapshot (`local/bga-games.tsv`), every game without a file is listed: don't handle them all, ask the user.

## 3. Files without a game

For each one, open `/gamepanel?game={id}`:
- a redirection to `/reviewer?game={id}`: the game is in review (alpha), keep it;
- HTTP 500 with an empty page (same as an unknown id): the game is no longer on BGA for this account.

List them to the user and delete the files only after their confirmation: some games never left alpha and are kept on purpose (e.g. `amerigo`). Check first that the file isn't imported by another style (`grep -rlw {id} src/games`): it would be a partial, to add to `PARTIALS` in `compare.js`.

## 4. Theme of each new game

For each game (one at a time):

1. Find a live table: `/gametables?game={numeric id}&all` (link given by the script), open `/{n}/{id}?table={table}`; it redirects to `/tableview` and the game is in an iframe (use `page.frames()` in `browser_run_code_unsafe`).
2. Turn on the dark mode of the extension if needed: click `.bgaext_darkmode i.fa` in the game frame, check `html.bgaext_dark` and `data-theme=dark`.
3. Read the CSS of the game: it is cross-origin, download it from `x.boardgamearena.net/data/themereleases/current/games/{id}/{version}/{id}.css` (URL in the `<link>` tags of the frame; it may only `@import` other files, e.g. `modules/module.bundle.css`: download them too). Start with the background: look for `html`, `body` or `#overall-content` backgrounds (color or image) in the CSS. When the game has one, the body of the extension hides it: add `"customBack": true` first, then check the title bar and the darkening (`--ext-overall-color`) on the real background. Look for light backgrounds, light texts on game elements, own player panels (customized: `"customPanel": true` in `{id}.json` and darken them, see `CLAUDE.md`), popins, bright images.
4. Write `src/games/{id}.less` (and `{id}.json` only if needed), following `CLAUDE.md` and the existing games for the patterns. The build compiles them in a few seconds; reload the page.
5. Check in the browser with screenshots (`temp/playwright/`), including the brightness rules (`bgaext_bright`):
   - the live table,
   - the replay of a finished game (`/gamereview?table={id}`, or the "Example game" of the game panel; the game is in the `archive/archive/frame.html` frame): the first steps with `#archive_next`, and the end. Click the controls with `element.click()` in the frame: a hotseat replay covers them with `#hotseat_mask` / `.hotseat_iframe` (hide them with a local style for the screenshots), and `#archive_end_game` may do nothing. Don't replay the whole game to see the end (the user only wants the last step): `#archive_end_game` and "go to move" (`#archive_go_to_move_nbr` + `#archive_go_to_move_btn`) replay every move, often several minutes. To see the end, open the finished game with `https://boardgamearena.com/tableview?table={id}&replayLastTurn=1&replayLastTurnPlayer=85644210` (the id of the user; keep `tableview`, not `table`): it shows the final position at 100 % with the end screen of the game (e.g. the score sheet of `gretchensgarden`). Find finished tables in the "Example game" of the game panel or in the recent games of the game page.
   - At the end, the own score table of the game if it has one (not the "Game results" tab of BGA).
   - The tooltips: hover each kind of card, tile, token, die… (`locator.hover()` in the game frame, then a screenshot of `.dijitTooltip:visible`), in light mode and in dark mode, and compare: the colors of the game must stay, darkened. To switch the mode, click `.bgaext_darkmode i.fa-moon-o` in the game frame (with the mouse, `click({force: true})`: a JS `click()` does nothing); its class changes after the switch (`fa-sun-o`…), select it again by `.bgaext_darkmode span:last-child i`.
   - The buttons: during the replay, look at the buttons of the title bar at each step (`#page-title .bgabutton`) and hover each one (`locator.hover()`, then a screenshot of the button): every button with custom colors gets the mixin of `common.less` closest to its intended color (`.greenButton()` / `.greenButtonOver()`…), even if it looks right at rest.
   - The popups: click every button or icon of the game outside the board (help `?`, gear, score, rules, tabs…); find them with `cursor: pointer` on elements that aren't cards or pieces, and look for the classes `popup`, `dialog`, `modal` in the CSS of the game. Screenshot each one opened.
   - Compare with the light mode at each checked step (turn off the dark mode of the extension, same position, screenshots side by side): every difference of color between elements of the same kind (player areas, states of the zones: active, target, out of the round…) must stay visible, darkened. Look for the state classes in the CSS of the game and add them in the page to check those not shown.
   - The player colors: compare the colors of the game zones (backgrounds, borders, names) with the names in the player panels; see `playersBack`… in `CLAUDE.md`.
   - The end of a finished game is required, not optional: `replayLastTurn` only works for a game finished very recently (a few hours), older ones redirect to `/table`. Look for a finished game among the players of several live tables (`getGames` with each `player`), the most recent first. The live tables opened at the start of the check often end during it: try `replayLastTurn` on them again before the report. Injecting a copy of the end screen in a live table is only a fallback (it misses the texts and buttons added by the game at the end): say it in the report, and if none opens, say so explicitly.
   - On the real end screen, test what the game adds there: the hover of the score table (rows or cells highlighted, links to the board), the texts under or around it (winner line…), and every own button (e.g. "Replay final scoring"): click it and screenshot its effect during the animation, and hover it in both modes (the hover color of the light mode must stay visible, darkened, not a barely different grey).
   - Automatic checks, for every game, in dark mode once the theme is written (don't skip them): a script listing the visible texts with a dark computed `color`, and one listing the visible `svg` whose shapes (`path`, `use`, `circle`, `rect`, `polygon`, `text`) have a dark computed `fill` or `stroke` (often `currentColor`); look at each hit in a screenshot. Then look at the screenshot around every element you darkened: a dark background under a dark text or icon of the game is not readable. These scripts only see what is displayed: run them again on the real end screen and after clicking the game buttons, and look in the CSS of the game for the elements without a color of their own that appear only at the end or during an action.
   - Before each check, read `data-theme` and the classes of the html in the game frame: after a reload or a mode switch, the page can be back in light mode and the dark rules silently don't apply.

Pitfalls met on previous games:
- Pure or strong reds of the game used for texts (`red`, `#f00`, `darkred`, `#b3261e`…) are aggressive on the dark background: look for them in the CSS of the game and set them to `var(--red-80)` (e.g. `.text-red` of `tapfour`, the round of `zoolorettodice`), unless the game already softens them in its own dark mode.
- A light score sheet with highlights (focused row, hover, winner glow): rather than darkening each part, invert the whole sheet (`filter: invert(1) hue-rotate(180deg)` on the container only, never on its children too: they would be inverted twice) and invert back what must keep its colors (icons, player names, emoji); a light glow (`text-shadow`) becomes a dark halo once inverted: remove it (e.g. `evenglow`).
- `"overlay": true` inverts the background as computed: useless when the game already darkens its background in dark mode (it becomes light again, e.g. `evenglow`).
- Inline player colors: read them with `getAttribute('style')`, the format depends on how the game sets them (`color:#d28c45` in an HTML string, `color: rgb(210, 140, 69)` through `style.color`): declare both forms in `playersTextColor`… when both exist (`{{player_color}}`, `{{player_color_rgb}}`).
- The dark mode of BGA sets the background of the html as an inline style: a game background on `html` needs `!important` to come back (e.g. `elenco`).
- A replay runs the version of the game of the day it was played (`version=` in the URL): an alpha replay may show elements that the current version doesn't have anymore.
6. If the game needs nothing (already dark, or correct with the general dark mode), create no file and say it.

## 5. Report

- For each game: name, what was done (or nothing needed and why), what couldn't be checked (no live table, no finished game…), screenshots.
- The files to delete (step 3), waiting for confirmation.
- Typecheck only if TypeScript was changed (`npx tsc --noEmit -p .`). Don't commit.

Once the user has validated the report, update the snapshot: `node .claude/skills/bga-new-games/compare.js temp/playwright/bga-games-dump.json --update`. A game not handled this time is then no longer listed: name it in the report.
