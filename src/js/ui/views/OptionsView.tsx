import React from "preact";
import { useState } from "preact/hooks";

import Configuration, { AdvancedHomeConfig, HomeConfig, InProgressConfig } from "../../config/configuration";
import Switch from "../base/Switch";
import { Button } from "../base/Button";
import { isSoundCustom, playMp3, removeCustomMp3, uploadCustomMp3 } from "../../utils/misc/mp3";
import { i18n } from "../../utils/chrome";

type Props = {
  config: Configuration,
  onChange: () => void
};

export const OptionsView = ({ config, onChange }: Props) => {
  const [onlineMessages, setOnlineMessages] = useState(config.isOnlineMessagesEnabled());
  const [eloHidden, setEloHidden] = useState(config.isEloHidden());
  const [tracking, setTracking] = useState(config.isTrackingEnable());
  const [soundNotification, setSoundNotification] = useState(config.isSoundNotificationEnable());
  const [customSoundFile, setCustomSoundFile] = useState(isSoundCustom());
  const [motionSensitivity, setMotionSensitivity] = useState(config.isMotionSensitivityEnable());
  const [redirect, setRedirect] = useState(config.isLobbyRedirectionEnable());
  const [fastCreate, setFastCreate] = useState(config.isFastCreateEnable());
  const [autoOpen, setAutoOpen] = useState(config.isAutoOpenEnable());
  const [karmaRestriction, setKarmaRestriction] = useState(config.getKarmaRestriction());
  const [betterPlayerRestriction, setBetterPlayerRestriction] = useState(config.isBetterPlayerRestriction());
  const [levelPlayerRestriction, setLevelPlayerRestriction] = useState(config.getLevelPlayerRestriction());
  const [solidBackground, setSolidBackground] = useState(config.isSolidBackground());
  const [socialMessagesHidden, setSocialMessagesHidden] = useState(config.areSocialMessagesHidden());
  const [chatUserNamesHidden, setChatUserNamesHidden] = useState(config.areChatUserNamesHidden());
  const [chatDarkIcons, setChatDarkIcons] = useState(config.chatDarkIcons());
  const [chatBarAutoHide, setChatBarAutoHide] = useState(config.isChatBarAutoHide());
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(config.getHomeConfig());
  const [inProgressConfig, setInProgressConfig] = useState<InProgressConfig>(config.getInProgressConfig());
  const [isHideGameButtonDisplayed, displayHideGameButton] = useState(config.isHideGameButtonDisplayed());
  const [hiddenGames, setHiddenGames] = useState<string[]>(config.getHiddenGames());
  const [hiddenPlayers, setHiddenPlayers] = useState<string[]>(config.getMutedPlayers());
  const [muteWarning, setMuteWarning] = useState(config.isMuteWarning());
  const [animatedTitle, setAnimatedTitle] = useState(config.isAnimatedTitle());
  //const [configVisible, setConfigVisible] = useState(localStorage.getItem('ext_settings') || 'about');
  const [configVisible, setConfigVisible] = useState('about');
  const isFirefox = window.navigator.userAgent.toLowerCase().includes('firefox');
  console.log("init", { betterPlayerRestriction, levelPlayerRestriction });
  const [playerRestriction, setPlayerRestriction] = useState(betterPlayerRestriction || levelPlayerRestriction > 0);

  const [advancedHomeConfig, setAdvancedHomeConfig] = useState<AdvancedHomeConfig>(config.getAdvancedHomeConfig());
  const [advancedHomeHtml, setAdvancedHomeHtml] = useState(advancedHomeConfig.html);
  const [advancedStatus, setAdvancedStatus] = useState('');

  const [confirmClear, setConfirmClear] = useState(false);

  const _updateAdvanceHomeConfig = (advConfig: AdvancedHomeConfig) => {
    setAdvancedHomeConfig(advConfig);
    config.setAdvancedHomeConfig(advConfig);
  };

  const _setConfigVisible = (val: string) => {
    //localStorage.setItem('ext_settings', val);
    setConfigVisible(val);
  };

  const updateOnlineMessages = (val: boolean) => {
    setOnlineMessages(val);
    config.setOnlineMessagesEnabled(val)
  };

  const updateEloHidden = (val: boolean) => {
    setEloHidden(!val);
    config.setEloHidden(!val)
  };

  const updateAnimatedTitle = (val: boolean) => {
    setAnimatedTitle(val);
    config.setAnimatedTitle(val)
  };

  const updateMuteWarning = (val: boolean) => {
    setMuteWarning(val);
    config.setMuteWarning(val)
  };

  const updateTracking = (val: boolean) => {
    setTracking(val);
    config.setTrackingEnable(val);
    onChange();
  };

  const updateSoundNotification = (val: boolean) => {
    setSoundNotification(val);
    config.setSoundNotificationEnable(val)
  };

  const updateSoundCustom = (val: boolean) => {
    setCustomSoundFile(val);

    if (!val) {
      removeCustomMp3();
    }
  };

  const updateFlashing = (val: boolean) => {
    setMotionSensitivity(!val);
    config.setMotionSensitivityEnable(!val);
  };

  const updateRedirect = (val: boolean) => {
    setRedirect(val);
    config.setLobbyRedirectionEnable(val);
  };

  const updateFastCreate = (val: boolean) => {
    setFastCreate(val);
    config.setFastCreateEnable(val);
  };

  const updateAutoOpen = (val: boolean) => {
    setAutoOpen(val);
    config.setAutoOpenEnable(val);
  };

  const updateKarmaRestriction = (val: boolean) => {
    setKarmaRestriction(val ? 75 : 0);
    config.setKarmaRestriction(val ? 75 : 0);
  };

  const updatePlayerRestriction = (val: boolean) => {
    setPlayerRestriction(val);
    setLevelPlayerRestriction(0);
    setBetterPlayerRestriction(val);

    config.setLevelPlayerRestriction(0);
    config.setBetterPlayerRestriction(val);
  };

  const uplateLevelPlayerRestriction = (val: number) => {
    setLevelPlayerRestriction(val);
    setBetterPlayerRestriction(val === 0);

    config.setLevelPlayerRestriction(val);
    config.setBetterPlayerRestriction(val === 0);
  };

  const updateSolidBackground = (val: boolean) => {
    setSolidBackground(val);
    config.setSolidBackground(val);
  };

  const updateSocialMessagesHidden = (val: boolean) => {
    setSocialMessagesHidden(val);
    config.setSocialMessagesHidden(val);
  };

  const updateChatUserNamesHidden = (val: boolean) => {
    setChatUserNamesHidden(!val);
    config.setChatUserNamesHidden(!val);
  };

  const updateChatDarkIcons = (val: boolean) => {
    setChatDarkIcons(val);
    config.setChatDarkIcons(val);
  };

  const updateChatBarAutoHide = (val: boolean) => {
    setChatBarAutoHide(val);
    config.setChatBarAutoHide(val);
  };

  const updateHomeConfig = (param: string, val: boolean) => {
    const newHomeConfig = { ...homeConfig, [param]: val };
    setHomeConfig(newHomeConfig);
    config.setHomeConfig(newHomeConfig);
    onChange();
  };

  const updateInProgressConfig = (param: string, val: boolean) => {
    const newInProgressConfig = { ...inProgressConfig, [param]: val };
    setInProgressConfig(newInProgressConfig);
    config.setInProgressConfig(newInProgressConfig);
    onChange();
  };

  const updateHideGameButtonDisplay = (val: boolean) => {
    displayHideGameButton(val);
    config.displayHideGameButton(val);
  };

  const getHiddenConfiguration = () => {
    if (!hiddenGames.length) {
      return (
        <span>
          {i18n("optionNoHiddenGames")}
        </span>
      );
    }

    return hiddenGames.map((game, index) => (
      <div
        className="bgext_hidden_game"
        key={`game_${index}`}
      >
        {game}
        <div className="bgext_hidden_game_close" onClick={() => setHiddenGames(config.displayGame(game))}>🗙</div>
      </div>
    ));
  };

  const getClearHiddenSection = () => {
    if (!hiddenGames.length) {
      return <></>;
    }

    if (confirmClear) {
      return (
        <>
          {i18n("optionsClearHiddenGamesConfirm")}
          <button
            className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
            onClick={() => setHiddenGames(config.displayAllGames())}
          >
            {i18n("buttonConfirm")}
          </button>
          <button
            className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
            onClick={() => setConfirmClear(false)}
          >
            {i18n("buttonCancel")}
          </button>
        </>
      );
    }
    return <a href="#" onClick={() => setConfirmClear(true)}>{i18n("optionsClearHiddenGames")}</a>;
  };

  const getMutedConfiguration = () => {
    if (!hiddenPlayers.length) {
      return (
        <span>
          {i18n("optionNoMutedPlayer")}
        </span>
      );
    }

    return hiddenPlayers.map((name, index) => (
      <div
        className="bgext_hidden_game"
        key={`hidden_player_${index}`}
      >
        {name}
        <div className="bgext_hidden_game_close" onClick={() => setHiddenPlayers(config.unmutePlayer(name))}>🗙</div>
      </div>
    ));
  };

  const arrow = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg">
        <path fill="currentcolor" d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
      </svg>
    );
  };

  const getSwitch = (checked: boolean, onChange: (val: boolean) => void, textOnKey: string, textOffKey: string, disabled?: boolean) => {
    const textOn = i18n(textOnKey);
    const textOff = i18n(textOffKey);
    const msg = checked ? textOn : textOff;
    const className = (msg.length > 76) ? 'long_text' : undefined;

    return <Switch checked={checked} textOn={textOn} textOff={textOff} onChange={onChange} disabled={disabled} className={className} />
  };

  const getMiscSection = () => {
    if (configVisible === 'misc') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionMiscTitle")}</div>
          {getSwitch(redirect, updateRedirect, "optionsLobbyRedirectOn", "optionsLobbyRedirectOff")}
          {getSwitch(solidBackground, updateSolidBackground, "optionsSolidBackgroundOn", "optionsSolidBackgroundOff")}
          {getSwitch(socialMessagesHidden, updateSocialMessagesHidden, "optionsHideSocialMessagesOn", "optionsHideSocialMessagesOff")}
          {getSwitch(!chatUserNamesHidden, updateChatUserNamesHidden, "optionsChatUserNameOn", "optionsChatUserNameOff")}
          {getSwitch(chatDarkIcons, updateChatDarkIcons, "optionsChatDarkIconsOn", "optionsChatDarkIconsOff")}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('misc')}>
        <div className="options-frame-title">
          <span>{i18n("optionMiscTitle")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getNotificationsSection = () => {
    if (configVisible === 'notif') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionNotifTitle")}</div>
          <div className="desktop-options">
            {getSwitch(tracking, updateTracking, "optionsTrackingOn", "optionsTrackingOff")}
            {!isFirefox && getSwitch(soundNotification && tracking, updateSoundNotification, "optionsNotificationSoundOn", "optionsNotificationSoundOff", !tracking)}
            {!isFirefox && <div className="row_fullwidth">
              {getSwitch(soundNotification && tracking && customSoundFile, updateSoundCustom, "optionsNotificationCustomSoundOn", "optionsNotificationCustomSoundOff", !tracking || !soundNotification)}
              {tracking && soundNotification && <div>
                {customSoundFile && <Button {...{ text: i18n("uploadMp3"), className: "small_button", onClick: uploadCustomMp3 }} />}
                <Button {...{ text: i18n("play"), className: "small_button", onClick: playMp3 }} />
              </div>}
            </div>}
          </div>
          {getSwitch(!motionSensitivity, updateFlashing, "optionsFlashingOn", "optionsFlashingOff")}
          <div className="desktop-options">
            {getSwitch(animatedTitle, updateAnimatedTitle, "optionsAnimatedTitleOn", "optionsAnimatedTitleOff")}
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('notif')}>
        <div className="options-frame-title">
          <span>{i18n("optionNotifTitle")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getGamesSection = () => {
    if (configVisible === 'games') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionGamesTitle")}</div>
          {getSwitch(onlineMessages, updateOnlineMessages, "optionFriendsActivityOn", "optionFriendsActivityOff")}
          {getSwitch(!eloHidden, updateEloHidden, "optionEloHiddenOff", "optionEloHiddenOn")}
          <div className="desktop-options">
            {getSwitch(chatBarAutoHide, updateChatBarAutoHide, "optionsChatAutoHideOn", "optionsChatAutoHideOff")}
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('games')}>
        <div className="options-frame-title">
          <span>{i18n("optionGamesTitle")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getHomeSwitch = (param: string, message: string) => {
    return getSwitch(homeConfig[param], (val) => updateHomeConfig(param, val), `${message}On`, `${message}Off`);
  };

  const getAdvancedCommand = () => {
    if (advancedHomeConfig.advanced) {
      const saveHtml = () => {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(`<div>${advancedHomeHtml}</div>`, 'application/xml');
        const parseError = doc.documentElement.querySelector('parsererror');

        if (parseError !== null && parseError.nodeType === Node.ELEMENT_NODE) {
          console.debug("[bga extension] Html parse error", parseError);
          setAdvancedStatus('error');
        } else {
          _updateAdvanceHomeConfig({ html: advancedHomeHtml, advanced: advancedHomeConfig.advanced })
          setAdvancedStatus('saved');
        }
        setTimeout(() => setAdvancedStatus(''), 2000);
      };

      if (advancedStatus == '') {
        return (
          <div className="options-buttons-container">
            <button
              className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
              onClick={() => window.open(i18n('htmlHelpPage'), "_blank")}
            >
              {i18n('buttonHelp')}
            </button>
            <button
              className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
              onClick={saveHtml}
            >
              {i18n('buttonSave')}
            </button>
          </div>
        );
      }

      const text = i18n(advancedStatus == 'saved' ? 'htmlSaved' : 'htmlError');
      return <div className={`options-buttons-container ${advancedStatus}`}>{text}</div>;
    }

    return <></>;
  };

  const getDetailedHomeSection = () => {
    if (advancedHomeConfig.advanced) {
      return <textarea
        className="options-textarea"
        value={advancedHomeHtml}
        onChange={(evt: any) => setAdvancedHomeHtml(evt.target.value)}
      />;
    }

    return (
      <>
        <div className="options-subframe">
          <div>
            {getHomeSwitch('header', 'optionsHomeHeader')}
            {getHomeSwitch('latestNews', 'optionsHomeLatest')}
            {getHomeSwitch('smallFeed', 'optionsHomeNewsSmall')}
            {getSwitch(homeConfig.fewFeeds && homeConfig.tournaments && homeConfig.tournamentsBelow, (val) => updateHomeConfig('fewFeeds', val), "optionsHomeNewsShort", "optionsHomeNewsTall", !homeConfig.tournaments || !homeConfig.tournamentsBelow)}
            {getHomeSwitch('tournaments', 'tournaments')}
            {getSwitch(homeConfig.tournamentsBelow && homeConfig.tournaments, (val) => updateHomeConfig('tournamentsBelow', val), "tournamentsBelowOn", "tournamentsBelowOff", !homeConfig.tournaments)}
            {getHomeSwitch('howToPlay', 'optionsHomeHowToPlay')}
          </div>
          <div>
            {getHomeSwitch('recentGames', 'optionsRecentColumn')}
            {getHomeSwitch('popularGames', 'optionsPopularColumn')}
            {getHomeSwitch('recommandedGames', 'optionsRecommendedColumn')}
            {getHomeSwitch('classicGames', 'optionsClassicGames')}
            {getSwitch(homeConfig.events || homeConfig.recentGames, (val) => updateHomeConfig('events', val), "optionsHomeEventsOn", "optionsHomeEventsOff", homeConfig.recentGames)}
            {getHomeSwitch('status', 'optionsStatus')}
            {getHomeSwitch('footer', 'optionsHomeFooter')}
          </div>
        </div>
      </>
    );
  };

  const getHomeSection = () => {
    if (configVisible === 'home') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionsHome")}</div>
          <div className="row_fullwidth">
            {getSwitch(advancedHomeConfig.advanced, () => _updateAdvanceHomeConfig({ html: advancedHomeConfig.html, advanced: !advancedHomeConfig.advanced }), "optionsHomeAdvancedOn", "optionsHomeAdvancedOff")}
            {getAdvancedCommand()}
          </div>
          {getDetailedHomeSection()}
          <div>{i18n("optionsHomeRefresh")}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('home')}>
        <div className="options-frame-title">
          <span>{i18n("optionsHome")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getInProgressSwitch = (param: string, message: string) => {
    return getSwitch(inProgressConfig[param], (val) => updateInProgressConfig(param, val), `${message}On`, `${message}Off`);
  };

  const getInProgressSection = () => {
    if (configVisible === 'inProgress') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionsInProgress")}</div>
          <div className="options-subframe">
            <div>
              {getInProgressSwitch('emptySections', 'optionsInProgressEmpty')}
              {getInProgressSwitch('discover', 'optionsInProgressDiscover')}
              {getInProgressSwitch('colorfulTables', 'optionsInProgressColorfulTables')}
            </div>
            <div>
              {getInProgressSwitch('playAgain', 'optionsInProgressReplay')}
              {getInProgressSwitch('more', 'optionsInProgressMore')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('inProgress')}>
        <div className="options-frame-title">
          <span>{i18n("optionsInProgress")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getFastStartSection = () => {
    if (configVisible === 'fastStart') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionsFastCreate")}</div>
          {getSwitch(fastCreate, updateFastCreate, "optionsFastCreateOn", "optionsFastCreateOff")}
          {getSwitch(autoOpen && fastCreate, updateAutoOpen, "optionsFastCreateAutoOpenOn", "optionsFastCreateAutoOpenOff", !fastCreate)}
          {getSwitch(playerRestriction && fastCreate, updatePlayerRestriction, "optionsFastCreateLevelOn", "optionsFastCreateLevelOff", !fastCreate)}
          {playerRestriction && fastCreate &&
            <select className="border border-black dark:dark:border-white rounded" onChange={(evt: any) => uplateLevelPlayerRestriction(+evt.target?.value)} value={levelPlayerRestriction}>
              <option value={0}>{i18n('optionsFastCreateLevel0')}</option>
              <option value={1}>{i18n('optionsFastCreateLevel1')}</option>
              <option value={2}>{i18n('optionsFastCreateLevel2')}</option>
            </select>
          }
          {getSwitch(karmaRestriction > 0 && fastCreate, updateKarmaRestriction, "optionsFastCreateKarmaOn", "optionsFastCreateKarmaOff", !fastCreate)}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('fastStart')}>
        <div className="options-frame-title">
          <span>{i18n("optionsFastCreate")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getHiddenGamesSection = () => {
    if (configVisible === 'hidden') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionHiddenTab")}</div>
          {getSwitch(isHideGameButtonDisplayed, updateHideGameButtonDisplay, "optionHiddenOn", "optionHiddenOff")}
          <div>{i18n("optionHiddenGamesWarning")}</div>
          <div className="bgext_hidden_games_container">{getHiddenConfiguration()}</div>
          <div className="bgext_hidden_games_clear_container">{getClearHiddenSection()}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('hidden')}>
        <div className="options-frame-title">
          <span>{i18n("optionHiddenTab")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getHiddenPlayersSection = () => {
    if (configVisible === 'muted') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionMutedTab")}</div>
          <div>{i18n("optionMutedWarning")}</div>
          <div className="col">
            <div className="bgext_hidden_games_container">{getMutedConfiguration()}</div>
            {getSwitch(muteWarning, updateMuteWarning, "muteWarningOn", "muteWarningOff")}
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('muted')}>
        <div className="options-frame-title">
          <span>{i18n("optionMutedTab")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  const getAboutSection = () => {
    if (configVisible === 'about') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("about")}</div>
          <div dangerouslySetInnerHTML={{ __html: i18n("aboutText") }}></div>
          <div className="options-version">Version {chrome.runtime.getManifest().version}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('about')}>
        <div className="options-frame-title">
          <span>{i18n("about")}</span>
          {arrow()}
        </div>
      </div>
    );
  };

  return (
    <div className="options-container">
      {getMiscSection()}
      {getNotificationsSection()}
      {getGamesSection()}
      {getHomeSection()}
      {getInProgressSection()}
      {getFastStartSection()}
      {getHiddenGamesSection()}
      {getHiddenPlayersSection()}
      {getAboutSection()}
    </div>
  );
};
