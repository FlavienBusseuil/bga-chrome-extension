export const darkStyleGame = `

:root {
  --dark-0: #000000;
  --dark-10: #1d2023;
  --dark-20: #272a2f;
  --dark-30: #35373c;
  --dark-40: #404347;

  --blue-10: #003b85;
  --blue-50: #7289da;
  --blue-80: #11a9bb;

  --red-10: #993333;
  --red-50: #ff0000;

  --green-10: #01663a;
  --green-30: #009e0a;
  --green-50: #00ff00;

  --violet-80: #8f5fbd;

  --orange-10: #383b1b;

  --light-80: #dcddde;
  --light-100: #ffffff;
}

/* En jeu */
.gamestart_overlay {
  background: none var(--dark-20);
  color: var(--light-80);
}

.game_interface #topbar,
.game_interface #page-title,
.game_interface .current_player_is_active #page-title,
.game_interface .gamestate_gameEnd #page-title {
  background: var(--dark-10);
  color: var(--light-80);
}

.game_interface #ingame_menu_content {
  background: var(--dark-30);
  color: var(--light-80);
}

.game_interface #ingame_menu_content a {
  color: var(--light-80);
}

.game_interface .player-board,
.game_interface .player-board .roundedbox_main,
.game_interface .player-board .roundedbox_topleft,
.game_interface .player-board .roundedbox_topmain,
.game_interface .player-board .roundedbox_topright,
.game_interface .player-board .roundedbox_bottomleft,
.game_interface .player-board .roundedbox_bottommain,
.game_interface .player-board .roundedbox_bottomright {
  background: var(--dark-20);
  color: var(--light-80);
}

.game_interface .log .roundedbox .playername {
  display: inline !important;
}

.game_interface #logs .log .roundedbox {
  background: var(--dark-10);
  color: var(--light-80);
}

.game_interface #logs .log .timestamp {
  color: var(--light-80);
}

.game_interface #logs .log:hover .timestamp {
  background: var(--dark-40);
}

.game_interface .bgabutton_gray {
  background: var(--dark-40);
  color: var(--light-80);
}

.game_interface .bgabutton_gray:hover {
  background: var(--dark-40);
}

.game_interface .pagesection {
  background: var(--dark-20);
  color: var(--light-80);
}

.game_interface .pagesection .whiteblock {
  background: none var(--dark-40);
}

.game_interface .pagesection h2,
.game_interface .pagesection h3 {
  background: var(--dark-10);
  color: var(--light-80);
}

.game_interface .pagesection .bga-link {
  color: var(--blue-80);
}

.game_interface .pagesection .bga-link:hover {
  color: var(--violet-80);
}

.game_interface .preference_control {
  background: var(--dark-40);
  color: var(--light-80);
}

.game_interface .chatwindowtype_table .chatbarbelowinput_item {
  color: var(--light-80);
}

.game_interface .chatwindowtype_table .chatbarbelowinput_item:hover {
  color: var(--violet-80);
}

#loader_mask {
  background: var(--dark-40);
}

span[style="font-weight:bold;color:#000000;"], span[style="color:#000000;"], a[style="color: #000000"] {
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
`;

export const darkStyleForGame = {
  'hanabi': `
body {
  background: url(https://cdn.discordapp.com/attachments/334713796193026049/710093648561176606/bgadark.jpg);
}

.bgagame-hanabi .clue_button.selected,
.bgagame-hanabi .notouch-device .clue_button:hover {
  transform: scale(1.1);
}


.bgagame-hanabi #hanabi_prefs .bgabutton_gray {
  background: var(--dark-10);
  color: var(--light-80);
}

.bgagame-hanabi #hanabi_prefs .bgabutton_gray:hover {
  background: var(--dark-30);
}
`
}