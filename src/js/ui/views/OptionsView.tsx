import React from "preact";
import { useState } from "preact/hooks";

import Configuration, { AdvancedHomeConfig, HomeConfig, InProgressConfig } from "../../config/configuration";
import Switch from "../base/Switch";
import { Button } from "../base/Button";
import { isSoundCustom, playMp3, removeCustomMp3, uploadCustomMp3 } from "../../utils/misc/mp3";

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
  const [autoOpen, setAutoOpen] = useState(config.isAutoOpenEnable());
  const [solidBackground, setSolidBackground] = useState(config.isSolidBackground());
  const [socialMessagesHidden, setSocialMessagesHidden] = useState(config.areSocialMessagesHidden());
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(config.getHomeConfig());
  const [inProgressConfig, setInProgressConfig] = useState<InProgressConfig>(config.getInProgressConfig());
  const [hiddenGames, setHiddenGames] = useState<string[]>(config.getHiddenGames());
  const [hiddenPlayers, setHiddenPlayers] = useState<string[]>(config.getMutedPlayers());
  const [muteWarning, setMuteWarning] = useState(config.isMuteWarning());
  //const [configVisible, setConfigVisible] = useState(localStorage.getItem('ext_settings') || 'about');
  const [configVisible, setConfigVisible] = useState('about');
  const isFirefox = window.navigator.userAgent.toLowerCase().includes('firefox');

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

  const updateAutoOpen = (val: boolean) => {
    setAutoOpen(val);
    config.setAutoOpenEnable(val);
  };

  const updateSolidBackground = (val: boolean) => {
    setSolidBackground(val);
    config.setSolidBackground(val);
  };

  const updateSocialMessagesHidden = (val: boolean) => {
    setSocialMessagesHidden(val);
    config.setSocialMessagesHidden(val);
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

  const getHiddenConfiguration = () => {
    if (!hiddenGames.length) {
      return (
        <span>
          {chrome.i18n.getMessage("optionNoHiddenGames")}
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
          {chrome.i18n.getMessage("optionsClearHiddenGamesConfirm")}
          <button
            className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
            onClick={() => setHiddenGames(config.displayAllGames())}
          >
            {chrome.i18n.getMessage("buttonConfirm")}
          </button>
          <button
            className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
            onClick={() => setConfirmClear(false)}
          >
            {chrome.i18n.getMessage("buttonCancel")}
          </button>
        </>
      );
    }
    return <a href="#" onClick={() => setConfirmClear(true)}>{chrome.i18n.getMessage("optionsClearHiddenGames")}</a>;
  };

  const getMutedConfiguration = () => {
    if (!hiddenPlayers.length) {
      return (
        <span>
          {chrome.i18n.getMessage("optionNoMutedPlayer")}
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
    const textOn = chrome.i18n.getMessage(textOnKey);
    const textOff = chrome.i18n.getMessage(textOffKey);
    const msg = checked ? textOn : textOff;
    const className = (msg.length > 73) ? 'long_text' : undefined;

    return <Switch checked={checked} textOn={textOn} textOff={textOff} onChange={onChange} disabled={disabled} className={className} />
  };

  const getMiscSection = () => {
    if (configVisible === 'misc') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionMiscTitle")}</div>
          {getSwitch(tracking, updateTracking, "optionsTrackingOn", "optionsTrackingOff")}
          {!isFirefox && getSwitch(soundNotification && tracking, updateSoundNotification, "optionsNotificationSoundOn", "optionsNotificationSoundOff", !tracking)}
          {!isFirefox && <div className="row_fullwidth">
            {getSwitch(soundNotification && tracking && customSoundFile, updateSoundCustom, "optionsNotificationCustomSoundOn", "optionsNotificationCustomSoundOff", !tracking || !soundNotification)}
            {tracking && soundNotification && <div>
              {customSoundFile && <Button {...{ text: chrome.i18n.getMessage("uploadMp3"), className: "small_button", onClick: uploadCustomMp3 }} />}
              <Button {...{ text: chrome.i18n.getMessage("play"), className: "small_button", onClick: playMp3 }}
              />
            </div>}
          </div>}
          {getSwitch(!motionSensitivity, updateFlashing, "optionsFlashingOn", "optionsFlashingOff")}
          {getSwitch(redirect, updateRedirect, "optionsLobbyRedirectOn", "optionsLobbyRedirectOff")}
          {getSwitch(autoOpen, updateAutoOpen, "optionsAutoOpenOn", "optionsAutoOpenOff")}
          {getSwitch(solidBackground, updateSolidBackground, "optionsSolidBackgroundOn", "optionsSolidBackgroundOff")}
          {getSwitch(socialMessagesHidden, updateSocialMessagesHidden, "optionsHideSocialMessagesOn", "optionsHideSocialMessagesOff")}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('misc')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionMiscTitle")} {arrow()}</div>
      </div>
    );
  };

  const getGamesSection = () => {
    if (configVisible === 'games') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionGamesTitle")}</div>
          {getSwitch(onlineMessages, updateOnlineMessages, "optionFriendsActivityOn", "optionFriendsActivityOff")}
          {getSwitch(!eloHidden, updateEloHidden, "optionEloHiddenOff", "optionEloHiddenOn")}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('games')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionGamesTitle")} {arrow()}</div>
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
              onClick={() => window.open(chrome.i18n.getMessage('htmlHelpPage'), "_blank")}
            >
              {chrome.i18n.getMessage('buttonHelp')}
            </button>
            <button
              className="bg-bgaBlue hover:bg-bgaBlue-light options-button"
              onClick={saveHtml}
            >
              {chrome.i18n.getMessage('buttonSave')}
            </button>
          </div>
        );
      }

      const text = chrome.i18n.getMessage(advancedStatus == 'saved' ? 'htmlSaved' : 'htmlError');
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
          <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")}</div>
          <div className="row_fullwidth">
            {getSwitch(advancedHomeConfig.advanced, () => _updateAdvanceHomeConfig({ html: advancedHomeConfig.html, advanced: !advancedHomeConfig.advanced }), "optionsHomeAdvancedOn", "optionsHomeAdvancedOff")}
            {getAdvancedCommand()}
          </div>
          {getDetailedHomeSection()}
          <div>{chrome.i18n.getMessage("optionsHomeRefresh")}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('home')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")} {arrow()}</div>
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
          <div className="options-frame-title">{chrome.i18n.getMessage("optionsInProgress")}</div>
          <div className="options-subframe">
            <div>
              {getInProgressSwitch('emptySections', 'optionsInProgressEmpty')}
              {getInProgressSwitch('discover', 'optionsInProgressDiscover')}
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
        <div className="options-frame-title">{chrome.i18n.getMessage("optionsInProgress")} {arrow()}</div>
      </div>
    );
  };

  const getHiddenGamesSection = () => {
    if (configVisible === 'hidden') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")}</div>
          <div>{chrome.i18n.getMessage("optionHiddenGamesWarning")}</div>
          <div className="bgext_hidden_games_container">{getHiddenConfiguration()}</div>
          <div className="bgext_hidden_games_clear_container">{getClearHiddenSection()}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('hidden')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")} {arrow()}</div>
      </div>
    );
  };

  const getHiddenPlayersSection = () => {
    if (configVisible === 'muted') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionMutedTab")}</div>
          <div>{chrome.i18n.getMessage("optionMutedWarning")}</div>
          <div className="col">
            <div className="bgext_hidden_games_container">{getMutedConfiguration()}</div>
            {getSwitch(muteWarning, updateMuteWarning, "muteWarningOn", "muteWarningOff")}
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('muted')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionMutedTab")} {arrow()}</div>
      </div>
    );
  };

  const getAboutSection = () => {
    if (configVisible === 'about') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("about")}</div>
          <div dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("aboutText") }}></div>
          <div className="options-version">Version {chrome.runtime.getManifest().version}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('about')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("about")} {arrow()}</div>
      </div>
    );
  };

  return (
    <div className="options-container">
      {getMiscSection()}
      {getGamesSection()}
      {getHomeSection()}
      {getInProgressSection()}
      {getHiddenGamesSection()}
      {getHiddenPlayersSection()}
      {getAboutSection()}
    </div>
  );
};
