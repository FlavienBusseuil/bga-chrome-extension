# Project preferences

## Code

- Don't change behaviours that weren't asked for.
- Don't commit unless asked.
- Typecheck with `npx tsc --noEmit -p .`.
- Keep the flags font on the CDN.
- Keep the `?&time=` cache busters.
- The dark mode of the options page follows the OS.

## Game themes (dark mode)

- As soon as the game uses another background than the light wood of BGA (`img/layout/back-main`), keep it with `"customBack": true` in `{game}.json` (otherwise the dark background of the extension, set on the body, hides it).
- Check the display preferences of the game (`gameui.prefs`: backgrounds, themes…): each choice must look right in dark mode (e.g. `dropsofevil`: wood darkened with `--ext-overall-color`, parchment through the inverted `overlay`).
- A background color or gradient of the game is darkened by lowering its lightness only (same hue and saturation, same direction for a gradient), never removed or replaced by the background of the extension. This also applies to the bright saturated colors that flash in dark mode (e.g. a `darkorange` message banner with black text): lower their lightness and set the text to `var(--light-80)`.
- When the game has a marked dominant color (e.g. brown), set it as `recommendedColor` (`hue`, `saturation`) in `{game}.json`: it colors the panels, title bar and logs (`hsl(hue, saturation, 13–28%)`) until the user chooses other colors.
- Add a border to the title bar (see `aero.less`) as soon as the background of the game is dark (own dark background, `customBack`, darkened with `--ext-overall-color`…) or close to the color of the bar: in case of doubt, add it. Check it on a screenshot of the top of the page, also in the replay (the bar is under the replay controls):
  ```less
  #page-title,
  #maingameview_menuheader,
  #maingameview_menufooter {
  	border: 1px solid var(--dark-40);
  }

  #maingameview_menuheader {
  	border-top: none;
  	top: -1px;
  }
  ```
- Same for the zones of the game (dice, boards, player areas…) that don't stand out from the background: add `outline: 1px solid var(--dark-40);` (an outline rather than a border, which would change the size of the positioned zones).
- The dark mode changes some player colors (e.g. `#ff0000` → `rgb(255, 101, 101)` for the names in the panels). When the game shows backgrounds, borders, outlines or texts with the player color (often inline styles), declare them in `{game}.json` (`playersBack`, `playersBorder`, `playersOutline`, `playersTextColor`, with `{{player_id}}`…) so that they follow the same color.
- When the game has its own side menu to jump to the player boards (often `.bga-jump-to_controls`), replace it with the side menu of the extension: `sideMenu` in `{game}.json` (`playerPanel`, `boardPanel`…), hiding the menu of the game in its `css` and keeping the default room for the menu (`.desktop_version #game_play_area { padding-left: 50px; }`). Set `iconBackground` / `iconBackgroundDark` (and the other `icon*` colors if needed) matching the main color of the game, for the light and the dark modes.
- When the game shows the boards of the players one under the other (long page to scroll) without its own menu to navigate, add the side menu of the extension anyway: `sideMenu` in `{game}.json` with `playerPanel` (e.g. `bs-seat-{{player_id}}`) and icon colors matching the game. Add `boardPanel` only when the common board is not at the top of the page (a shortcut to the top is useless), and check that it scrolls to it.
- Check that every text of the game is readable on the dark background, also in the player areas and at the end of the game: the texts without a color of their own (counters, labels…) keep the default black of the game. Look for them with a script (visible texts with a dark computed `color` in `#game_play_area`) and set them to `var(--light-80)`, only where their background is dark. The script only sees the displayed elements: also look for the dark `color` values in the CSS of the game (log rows, arrows, icons… of moves not shown yet).
- Check that the images of the game stay visible on the dark background, especially the small icons in the logs, the title bar and the buttons (e.g. a black token): if one is hard to see, try `filter: var(--highlight-min);` (thin light outline) and keep it if it is more readable. A fully black icon (e.g. the spy of `loveletter`, zoom buttons) gets `filter: invert(0.9);` instead (not on an icon with other colors, which would change).
- The tooltips of the game often have their own colors (e.g. turquoise in `riviera`), lost in dark mode: `common.less` makes the backgrounds inside `.dijitTooltipContainer` transparent and greys the connector. Hover each kind of card, die, token… in light mode then in dark mode and compare the screenshots: keep the colors of the game with a lower lightness (background, inner boxes, connector), with a light text.
- Always compare with the light mode of the game, on the same position (screenshots of both modes side by side, at each checked step): every difference of color between elements of the same kind in light mode carries information and must stay visible in dark mode, with a lower lightness (same hue and saturation). E.g. a player area with the color of the player, or the states of the zones (`loveletter`: active player lighter, target red, player out of the round darker), often lost under a generic rule of `game.less` (`.mf_zone`): look for these state classes in the CSS of the game and check each one (add the class in the page if the position doesn't show it).
- When the background of the game is a too bright image, try `"overlay": true` in `{game}.json` (inverted copy of the background).
- The player names displayed by the game have no `text-shadow` (remove the outline of the game) and the same color as in the player panels: declare them in `playersTextColor` if needed, it also adds the light shadow of the very dark colors (black). When a player name is shown directly on a background image or a mid-tone background of the game (e.g. wood), put it on `var(--dark-back)` (dark with transparency), or on `var(--dark-20)` if it is not readable enough, with a slight rounding (`border-radius: 6px; padding: 0 6px;`; `!important` on a `span.playername`, made transparent by `game.less`). The background behind the player names (score sheets, banners…) must be dark enough for the colors lightened by the dark mode (lightness around 15 %, same hue).
- A style coming from a BGA library shared by several games (e.g. the cards library: `.card-stock`, `.bga-cards_*`) is fixed in `src/css/dark_theme/game.less`, not in the file of the game. Use the variables of `src/css/dark_theme/variables.less` (e.g. `--dark-back` for a dark background with transparency).
- Bright images of the game (cards, tokens, light boards) follow the brightness chosen by the user: `filter: var(--ext-bright)` (or `.reduceBrightness()` on a pseudo-element) under `html[data-theme=dark].bgaext_bright`, keeping the existing filters of the game (drop shadows…). For an element with children (boards, score sheets…), use `.reduceBrightness()` on its `:before` instead (`@import "./common";`): a filter on the parent can break the children.
- Every button customized by the game (own colors instead of the BGA ones, e.g. a green `#stop-button`) gets the mixin of `common.less` closest to its intended color: `.greenButton()` and `.greenButtonOver()` on `:hover`, `.purpleButton()`, `.yellowButton()`… (see `catan.less`). Look for these buttons in the CSS of the game and in the title bar during the replay, check the color they really have in light mode (a rule of the game can lose against the BGA one), and check them on hover in dark mode. To test a button not shown in the replay, inject a copy with the same tag (`<button>`, not `<a>`), id and classes.
- Check the theme in the browser before proposing it, also on the replay of a finished game: the first steps and the last one (many games display their own score table at the end, besides the "Game results" of BGA). Check the tooltips too (hover the cards, tiles, tokens…), and open every popup of the game: click its buttons and icons (help `?`, settings gear, score or rules buttons, menus…).

## Release texts

Base them on the changes since the previous release (`git log` / `git diff vX.Y.Z HEAD`, `src/games` for the games), and list after the text what to check before posting (game names deduced from their ids, approximate claims).

### BGA announcement

Posted in the BGA group of the extension: in English, short, for the players who use the extension, without technical terms.

```
I just released a new version, **X.Y.Z**.

<one short paragraph on the main change, from the player's point of view>

This version also adds or improves dark mode for <game names>. <other visible fixes, in one sentence when possible>

Feedback is welcome on the forum. Have fun!
```

No headings or lists: a detailed version with bold sections was only used for the big redesign of 2.0.0.

### GitHub release

A short list in English, one line per change, without the details of the implementation:

```
- Game themes for dark mode can now be fixed or improved without waiting for a new version of the extension
- Clearer error message in the popup when Board Game Arena is temporarily unavailable
```
