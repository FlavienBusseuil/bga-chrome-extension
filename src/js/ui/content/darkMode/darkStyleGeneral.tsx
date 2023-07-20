export const darkStyleGeneral = `
/* Formulaires */
input {
  background: var(--dark-40);
}

/* Boutons */
.bgabutton_gray {
  background: var(--dark-10);
  color: var(--light-80);
}

.bgabutton_gray:hover {
  background: var(--dark-40);
}

/* Liens */
.bga-link {
  color: var(--blue-80);
}

.bga-link:hover {
  color: var(--violet-80);
}

.bga-link-inside a:not(.playername, .gamename, .bgabutton) {
  color: var(--blue-80);
}

.bga-link-inside a:not(.playername, .gamename, .bgabutton):hover {
  color: var(--violet-80);
}

/* Modales et popin */
.standard_popin,
.bga-popup-modal__content,
.bga-popup-modal__content [class*=bg-bga-graybg],
.bga-popup-modal__content [class*=text-bga-gray] {
  background: var(--dark-10);
  color: var(--light-80);
}

.bga-popup-modal [class*=bg-bga-gray] {
  background-color: transparent;
}

.bga-popup-modal .bga-popup-modal__content {
  padding: 10px;
}

.bga-popup-modal__content [class*=bg-bga-graybg] .whiteblock {
  background: var(--dark-40);
}

.bga-popup-modal__content .bga-checkbox__label [slot=label] {
  color: var(--light-80);
}

.bga-popup-modal__content .bga-checkbox--checked .bga-checkbox .bga-checkbox__checkmark * {
  color: var(--light-80);
}

.standard_popin_underlay {
  background: var(--dark-40);
}

/* Accordéon */
.tabbed_slider_bar .tabbed_slider_bar_barcenter {
  background: var(--dark-10);
  color: var(--light-80);
}

.tabbed_slider_bar .tabbed_slider_bar_left,
.tabbed_slider_bar .tabbed_slider_bar_right {
  border-top-color: var(--dark-10);
}

/* Menus déroulants */
.bga-dropdown__options,
.sectiontitle_dropdown_menu {
  background: var(--dark-10);
  color: var(--light-80);
}

.bga-dropdown__options .text-bga-link,
.bga-dropdown__options .optionRightIcon--set,
.sectiontitle_dropdown_menu a {
  color: var(--light-80);
}

.bga-dropdown__options .text-bga-link:hover,
.sectiontitle_dropdown_menu a:hover {
  background: var(--dark-40) !important;
}

/* Barre de menu */
#menubar,
#menubar-holder .bga-menu-bar {
  background: var(--dark-10);
  color: var(--light-80);
}

#menubar .bga-link,
#menubar-holder .bga-link {
  color: var(--light-80);
}

#menubar .bga-link:hover,
#menubar-holder .bga-link:hover {
  color: var(--violet-80);
}

#menubar-holder .bga-menu-subbar,
#menubar-holder .bga-sub-menu {
  background: var(--dark-40);
  color: var(--light-80);
}

#menubar-holder .bga-omni-bar input {
  background: var(--dark-40);
  color: var(--light-80);
}

.bga-mobile-sub-bar div.text-center {
  color: var(--light-80);
}

.bga-menu-bar-items.bga-mobile .bga-menu-bar-items__menu-item {
  background: var(--dark-20) !important;
}

.bga-menu-bar-items.bga-mobile .bga-menu-bar-items__menu-item--active {
  color: var(--violet-80) !important;
}

/* Barre de recherche */
.bga-omni-bar-panel-players__list .bga-player-tag-holder,
.bga-omni-bar-panel-groups__group {
  background-color: var(--dark-40) !important;
}

.bga-omni-bar-panel-players__list .bga-player-tag-holder .text-gray-500 {
  color: var(--light-80);
}

.bga-omni-bar-panel-players__list .bga-player-tag-holder .text-gray-500 a {
  color: var(--blue-50);
}

/* Liste d’amis */
.bga-friends-icon__dropdown {
  background: var(--dark-10);
  color: var(--light-80);
}

/* Barre personnelle */
.bga-player-menu {
  color: var(--light-80);
}

.bga-player-menu .bg-bga-whitebg {
  background: var(--dark-10);
  color: var(--light-80);
}

.bga-player-menu .bga-hover-for-list:hover {
  background: none var(--orange-10);
}

.bga-player-menu .bga-hover-for-list:hover .playername:hover,
.bga-player-menu .bga-hover-for-list:hover a,
.bga-player-menu .bga-hover-for-list a .gamename {
  color: var(--light-80);
}

.bga-player-menu .bga-player-menu__tab:hover,
.bga-player-menu .bga-player-menu__tab--active {
  color: var(--violet-80) !important;
}

.bga-player-menu .bga-player-menu__tab-indicator {
  background: var(--violet-80) !important;
}

.bga-player-menu .notification-unread {
  background: var(--violet-80) !important;
}

/* Barres d’informations */
#connect_status,
#connect_status .roundedbox_main,
#connect_status .roundedbox_topleft,
#connect_status .roundedbox_topmain,
#connect_status .roundedbox_topright,
#connect_status .roundedbox_bottomleft,
#connect_status .roundedbox_bottommain,
#connect_status .roundedbox_bottomright {
  background: var(--dark-20);
  color: var(--light-80);
}

#head_infomsg {
  background: var(--dark-20);
  color: var(--light-80);
}

#head_infomsg .head_info {
  background: var(--dark-30);
  color: var(--light-80);
}

/* Messages et commentaires */
.comment {
  background: var(--dark-10);
  color: var(--light-80);
}

.post .postcontent a:not(.bgabutton_blue),
.post .newsfeed_target a,
.post .more_comment a,
.post .postfooter .comment_btn {
  color: var(--blue-50);
}

.post .postcontent a:not(.bgabutton_blue):hover,
.post .newsfeed_target a:hover,
.post .more_comment a:hover,
.post .postfooter .comment_btn:hover {
  color: var(--violet-80);
}

.post .postcontent a .gamename {
  color: var(--blue-50);
}

.post .postcontent a:hover .gamename {
  color: var(--violet-80);
}

/* Erreurs */
#bga_fatal_error {
  width: 95%;
  margin: auto;
  padding: 10px;
  background-color: var(--red-10);
}

/* Amitiés */
.bga-link-inside[id*=boardposts_] .postimage:hover {
  z-index: 999;
}

/* Wiki */
.wikicontent h3 {
  margin-top: 20px;
}

/* Pages */
.pageheader {
  background: var(--dark-20);
  color: var(--light-80);
}

.pagesection__title {
  color: var(--light-80);
}

.pagesection__title .gamename {
  color: var(--blue-80);
}

.pagesection__title .gamename:hover {
  color: var(--violet-80);
}

.pagesection__content {
  background: var(--dark-10);
  color: var(--light-80);
}

/* Invitations */
#expected_table_banners .expected_banner,
#tournament_inprogress_banners .expected_banner {
  background-color: var(--dark-10);
  color: var(--light-80);
}

/* Listes de jeux */
.bga-popup-modal__header {
  background: var(--dark-10) !important;
  color: var(--light-80) !important;
}

.bga-collection-management-modal .bga-collection-management__row {
  background-color: var(--dark-20) !important;
  color: var(--light-80) !important;
}

.bga-collection-management-modal .bga-collection-management__row:hover {
  background-color: var(--dark-40);
}

/* Page d’accueil */
.agenda .agenda-tournament-list__item,
.agenda .agenda-tournament-list__item:hover {
  background: var(--dark-10);
  color: var(--light-80);
}

.agenda .agenda-tournament-list__item .agenda-tournament-list__title {
  margin-bottom: 5px;
  color: var(--light-80);
}

.agenda .agenda-tournament-list__item .agenda-tournament-list__players-num {
  color: var(--blue-80);
}

#mostwanted_games .gamename {
  color: var(--blue-50);
}

/* Page Jouer - Lobby */
#gamelobby-module #pageheaderlobby {
  background: var(--dark-10);
  color: var(--light-80);
}

#gamelobby-module .pageheader_mobile_switcher_wrap .pageheader_menuitem {
  background: var(--dark-10) !important;
  color: var(--light-80);
  border: 0;
  border-top: 1px solid var(--dark-40);
  border-left: 1px solid var(--dark-40);
  border-right: none;
}

#gamelobby-module .pageheader_mobile_switcher_wrap .pageheader_menuitem:hover {
  background: var(--dark-40) !important;
}

#gamelobby-module .pageheader_mobile_switcher_wrap .pageheader_menuitem .switcher_zone {
  background: var(--dark-30);
  border-left: 1px solid var(--dark-40);
}

#gamelobby-module .pageheader_mobile_switcher_wrap .pageheader_menuitem:hover .switcher_zone {
  background: var(--dark-30);
}

#gamelobby-module .gametable {
  background: var(--dark-30);
  border-color: var(--dark-30);
  color: var(--light-80);
}

#gamelobby-module .gametable.gametable_status_init.realtable {
  background: var(--green-10);
}

#gamelobby-module .gametable:hover {
  border-color: var(--light-80) !important;
}

#gamelobby-module .gametable .gametable_separator {
  background: var(--dark-30);
}

#gamelobby-module .gameinfoname .gamename,
#gamelobby-module .game_box_wrap .gamename {
  color: var(--light-80);
}

#gamelobby-module .game_box_wrap .gamename:hover {
  color: var(--violet-80);
}

#gamelobby-module .switch_to_arena,
#gamelobby-module .switch_to_arena_inline {
  background: var(--dark-30);
  color: var(--light-80);
}

#gamelobby-module .switch_to_arena_inline .gamename {
  color: var(--light-80);
}

/* Page Table */
#table-module .players .whiteblock {
  background: var(--dark-30);
}

#table-module #suggestion_create_others a {
  color: var(--blue-50);
}

#table-module #suggestion_create_others a:hover {
  color: var(--violet-80);
}

/* Page Jeux */
.bga-game-browser__panel {
  background: var(--dark-30) !important;
  color: var(--light-80);
}

.bga-game-browser__panel .items-center [class*=text-] {
  color: var(--light-80);
}

.bga-game-filter-tags {
  padding: 15px;
  background: var(--dark-10) !important;
  color: var(--light-80) !important;
}

.icon_arena {
  filter: invert(100%);
}

.dijitInputInner, .dijitInputField  {
  background: var(--dark-40) !important;
  color: var(--light-80) !important;
  border-color: var(--dark-30) !important;
}

/* Page détail jeu */
.bga-game-panel .bga-game-panel__content-divider-line,
.bga-game-panel .bga-game-panel__content-divider-background {
  display: none;
}

.bga-game-panel .bga-panel-table-status .bga-page-section__content [class*=text-gray],
.bga-game-panel .bga-page-section__content [class*=text-bga-gray],
.bga-game-panel .bga-page-section__content [class*=text-gray] {
  color: var(--light-80);
}

.bga-game-panel .bga-panel-table-status .bga-lobby-table-item {
  background: var(--dark-30) !important;
  color: var(--light-80);
  border-color: var(--dark-30);
}

.bga-game-panel [class*=bg-bga-gray] {
  background: var(--dark-10) !important;
}

.bga-game-panel [class*=bg-bga-gray] .text-bga-blackbg {
  color: inherit;
}

.bga-game-panel .bga-page-section__content.bga-link:hover [class*=text-bga-gray],
.bga-game-panel .bga-page-section__content .bga-link:hover [class*=text-gray] {
  color: inherit;
}

.bga-game-panel .bga-game-option-form .bga-game-option-item-choice__selector [class*=text-bga-gray],
.bga-game-panel .bga-game-option-form .bga-game-option-item-bool [class*=text-bga-gray],
.bga-game-panel .bga-game-option-form .bga-game-option-item-bool .bga-checkbox--checked .bga-checkbox .bga-checkbox__checkmark,
.bga-game-panel .bga-toggle .bga-toggle__slider [slot=slider] {
  color: var(--dark-10);
}

.bga-game-panel .bga-panel-table-status .bga-page-section__content .bga-collapse-icon {
  background: var(--light-80);
  color: var(--dark-10);
}

.bga-game-panel .bga-panel-table-status .bga-page-section__content [class*=text-bga-gray]:hover .bga-collapse-icon {
  background: var(--dark-10);
  color: var(--light-80);
}

.bga-game-panel .bga-page-section__title,
.bga-game-panel .bga-page-section__title [class*=text-bga-gray],
.bga-game-panel .bga-panel-table-configuration .bga-panel-table-configuration__player-row [class*=text-bga-gray],
.bga-game-panel .bga-panel-table-configuration .w-full>[class*=text-bga-gray],
.bga-game-panel .bga-panel-table-configuration .text-center[class*=text-bga-gray],
.bga-game-panel .bga-panel-table-configuration .items-center[class*=text-bga-gray] {
  color: var(--light-80);
}

.bga-game-panel .quick-play-drawer__panel__col1 .bga-page-section [class*=text-bga-gray] {
  padding: 20px;
  background: var(--dark-20);
  border-radius: 0.375rem;
  color: var(--light-80);
}

.bga-game-panel .quick-play-drawer__panel__col1 .bga-page-section [class*=text-bga-gray] .text-bga-blue {
  color: var(--blue-80);
}

.bga-game-panel .bga-page-section__content {
  background: var(--dark-20) !important;
  color: var(--light-80);
}

.bga-game-panel .bga-page-section__content .even\:bg-bga-graybg-2:nth-child(2n) {
  background: var(--dark-30) !important;
}

.bga-game-panel .bga-page-section .bga-game-option-messages__option-description {
  background: var(--dark-10);
  color: var(--light-80);
}

.bga-game-panel .bga-page-section .text-bga-gamename {
  color: var(--blue-50);
}

.bga-game-panel .bga-page-section .text-bga-gamename:hover {
  color: var(--violet-80);
}

.bga-game-panel .bga-page-section__content .bg-bga-graybg,
.bga-game-panel .bga-page-section__content .bg-bga-graybg-2 {
  background: var(--dark-10) !important;
  color: var(--light-80);
}

.bga-game-panel .bga-page-section__content .bg-bga-graybg .text-bga-blue,
.bga-game-panel .bga-page-section__content .bg-bga-graybg-2 .text-bga-blue {
  color: var(--blue-50);
}

.bga-game-panel .bga-page-section__content .gamerank {
  margin-bottom: 10px;
}

.bga-game-panel .block-panel-news {
  padding: 15px;
  background: var(--dark-10) !important;
  color: var(--light-80);
}

.bga-game-panel .block-panel-tournaments .bga-panel-tournaments__upper-row {
  background: var(--dark-20) !important
}

/* Page Qui sommes-nous */
#premiums .teamember,
#translators .teamember,
#developers .teamember,
#moderators .teamember,
#founders .teamember {
  background: var(--dark-30);
}

/* Page Contact */
#contact-module .support_entry {
  background: var(--dark-10);
  color: var(--light-80);
}

#contact-module .support_section,
#contact-module .support_title,
#contact-module .support_details {
  color: var(--light-80);
}

/* Page Contribution */
#contribute-module .pagesection__content {
  background: var(--dark-10);
}

#contribute-module .controlpanelmenu {
  background: var(--dark-30);
}

#contribute-module .controlpanelmenu .subtitle {
  color: var(--light-80);
}

/* Page Tutoriels */
#tutorial_list_wrapper .arenasuggestion__content .arenasuggestion__text {
  color: var(--light-80);
}

#tutorial_list_wrapper .tutolink:hover {
  background-color: hsla(0, 0%, 100%, 0.1);
}

/* Page Premium */
#club-module .premium_argument .gamename {
  color: var(--blue-80);
}

/* Page Communauté */
#community-module .controlpanelmenu .subtitle {
  color: var(--light-80);
}

#community-module .tips {
  padding: 10px;
}

/* Page Bugs */
#moderation-module .pagesection__content .whiteblock {
  background: var(--dark-40);
}

#moderation-module #last_reports .statstable a {
  color: var(--light-80);
}

#moderation-module #last_reports .statstable [bgcolor] a,
#moderation-module #last_reports .statstable th .bga-link {
  color: var(--dark-10);
}

/* Page Traduction */
#translation-module #translationwarning {
  color: var(--dark-40);
}

/* Page Liste des tournois */
#tournamentlist-module .tournaments-list-result {
  background-color: var(--dark-20);
  color: var(--light-80);
}

#tournamentlist-module .tournaments-list-result:hover,
#tournamentlist-module .tournaments-list-result:hover .tournaments-list-result__players {
  background-color: var(--dark-10);
}

#tournamentlist-module .tournaments-list-result .tournaments-list-result__championship {
  color: var(--blue-80);
}

#tournamentlist-module .tournaments-list-result .tournaments-list-result__date span {
  color: #777;
}

#tournamentlist-module .tournaments-list-result .tournaments-list-result__players,
#tournamentlist-module .tournaments-list-result .tournaments-list-result__players-reg {
  background-color: var(--dark-20);
  color: var(--light-80);
}

/* Page Tournoi */
#tournament-module .tournaments-presentation {
  background-color: var(--dark-10);
  color: var(--light-80);
}

#tournament-module .pagesection.tournament-section--stage-display .pagesection__content,
#tournament-module .pagesection.tournament-section--stage-display .v2tournament--bracketElimination {
  background-color: var(--dark-10) !important;
  color: var(--light-80);
}

#tournament-module .tournaments-presentation .tournaments-presentation-status__global,
#tournament-module .tournaments-presentation .tournaments-mode-presentation__name,
#tournament-module .tournaments-presentation .tournaments-mode-presentation__description {
  color: var(--light-80);
}

#tournament-module .pagesection.tournament-section--stage-display .v2tournament--bracketElimination h4 {
  color: var(--dark-10);
}

/* Page Vos badges */
.standard_popin .achievement .achievement_content {
  background-color: var(--dark-30);
}

/* Page News */
#follow_us_portlet.portlet .portlet__content {
  background: var(--dark-10);
  color: var(--light-80);
}

#news-module #follow_us_portlet.portlet .portlet__title,
#headlines-module #follow_us_portlet.portlet .portlet__title,
#news-module #follow_us_portlet.portlet .portlet__content a,
#headlines-module #follow_us_portlet.portlet .portlet__content a,
#news-module #follow_us_portlet.portlet .portlet__content a span,
#headlines-module #follow_us_portlet.portlet .portlet__content a span {
  color: var(--light-80);
}

#latest_news .newstitle a {
  color: var(--light-80);
}

#news-module #latest_news .newsfooter a,
#news-module #latest_news .newsabstract a {
  color: var(--blue-80);
}

/* Page parties en cours */
#gameinprogress-module .newbgatable th,
#gameinprogress-module .newbgatable td {
  color: var(--light-80);
}

/* Page replay */
#gamereview-module .gamelogreview {
  background: var(--dark-40);
}

/* Page replay */
#preferences-module textarea {
  background: var(--dark-20);
  color: var(--light-80);
}

/* Control panel */
.pagesection__content > img, .top_right_bigimage {
  filter: invert(70%);
}
.pagesection__content .subtitle {
  color: var(--light-80);
}
.newbgatable th, .newbgatable td {
  color: var(--light-80);
}
.notouch-device .newbgatable tbody tr:hover td {
  color: var(--violet-80);
}
`;