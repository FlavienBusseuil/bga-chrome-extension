export const gamesWithCustomBackground = ['abyss', 'conspiracy'];

const _darkStyleForGame = {};

_darkStyleForGame['hanabi'] = `
.bgagame-hanabi #hanabi_prefs .bgabutton_gray {
  background: var(--dark-10);
  color: var(--light-80);
}
.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover {
  background: var(--dark-30);
}
`;

_darkStyleForGame['arknova'] = `
.player-name > svg, .slider, #help-mode-switch {
  filter: invert(70%);
}
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score {
  filter: invert(100%) !important;
}
`;

_darkStyleForGame['carcassonne'] = `
.partisan_000000 {
  filter: invert(20%) !important;
}
`;

_darkStyleForGame['challengers'] = `
.cha-log-holder {
  background: var(--dark-20);
  color: var(--light-80);
}
`;

_darkStyleForGame['agricola'] = `
#central-board .turn-action-container .turn-number {
  filter: invert(100%) grayscale(100%);
}
#player_boards > div {
  background-color: #00000090!important;
}
#help-mode-switch > label {
  filter: invert(70%);
}
`;

_darkStyleForGame['sevenwonders'] = `
.player_board_wrap {
  background: #00000090;
}
span.tcoin {
  color: var(--light-80);
}
#discard_count, #trees h3 {
  color: var(--light-80);
}
`;

export const darkStyleForGame = _darkStyleForGame;