export const gamesWithCustomBackground = ['abyss', 'agricola', 'conspiracy', 'spacebase', 'splendor'];

const _darkStyleForGame = {};

_darkStyleForGame['agricola'] = `
#player_boards > div {
  background-color: #000000CC !important;
}
`;

_darkStyleForGame['arknova'] = `
.player-name > svg, .slider, #help-mode-switch {
  filter: invert(0.7);
}
`;

_darkStyleForGame['arnak'] = `
.hand-amt {
  background: hsla(0,0%,100%,.5);
}
.hand-amt .player-name {
  background: transparent;
}
`;

_darkStyleForGame['carcassonne'] = `
.partisan_000000 {
  filter: invert(0.2) !important;
}
`;

_darkStyleForGame['catan'] = `
.cat_panel_prim_icons, #player_boards .cat_panel_prim_icons .cat_panel_score {
  filter: invert(1) !important;
}
`;

_darkStyleForGame['challengers'] = `
.cha-log-holder {
  background: var(--dark-20);
  color: var(--light-80);
}
`;

_darkStyleForGame['frenchtarot'] = `
#icon_first_player_in_panel {
  filter: invert(1);
}
.black {
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
`;

_darkStyleForGame['hanabi'] = `
.bgagame-hanabi #hanabi_prefs .bgabutton_gray {
  background: var(--dark-10);
  color: var(--light-80);
}
.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover {
  background: var(--dark-30);
}
`;

_darkStyleForGame['itsawonderfulworld'] = `
.avatar_active {
  filter: none;
}
.iww-resources, .player_score {
  color: black;
}
`;

_darkStyleForGame['kingoftokyo'] = `
.player-board .player-hand-card  {
  filter: invert(0.7);
}
.whiteblock {
  background: hsla(0,0%,100%,.3);
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