import { useEffect, useState } from "preact/hooks";
import { useSyncedState } from '../hooks/useSyncedState';
import { isMobile } from "is-mobile";

import Configuration, { AdvancedHomeConfig, HomeConfig, InProgressConfig } from "../../config/configuration";
import Switch from "../base/Switch";
import { Button } from "../base/Button";
import { isSoundCustom, playMp3, removeCustomMp3, uploadCustomMp3 } from "../../utils/misc/mp3";
import { getExtensionVersion, isFirefox } from "../../utils/browser";
import { i18n } from "../../utils/browser/i18n";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

type Props = {
  config: Configuration,
  onChange: () => void
};

export const OptionsView = ({ config, onChange }: Props) => {
  const [locale, setLocale] = useSyncedState('locale', config.getLocale());
  const [onlineMessages, setOnlineMessages] = useSyncedState('isOnlineMessagesEnabled', config.isOnlineMessagesEnabled());
  const [areLogTimestampsHidden, setLogTimestampHidden] = useSyncedState('areLogTimestampsHidden', config.areLogTimestampsHidden());
  const [hideLeftBarOption, setHideLeftBarOption] = useSyncedState('hideLeftBarOption', config.isLeftBarOptionHidden());
  const [quitGameOption, setQuitGameOption] = useSyncedState('quitGameOption', config.getQuitGameTo());
  const [replayWithAutoStart, setReplayWithAutoStart] = useSyncedState('replayWithAutoStart', config.replayWithAutoStart());
  const [eloHidden, setEloHidden] = useSyncedState('eloHidden', config.isEloHidden());
  const [arenaEloHidden, setArenaEloHidden] = useSyncedState('arenaEloHidden', config.isArenaEloHidden());
  const [tracking, setTracking] = useSyncedState('tracking', config.isTrackingEnable());
  const [soundNotification, setSoundNotification] = useSyncedState('soundNotification', config.isSoundNotificationEnable());
  const [customSoundFile, setCustomSoundFile] = useSyncedState('customSoundFile', isSoundCustom());
  const [motionSensitivity, setMotionSensitivity] = useSyncedState('motionSensitivity', config.isMotionSensitivityEnable());
  const [redirect, setRedirect] = useSyncedState('redirect', config.isLobbyRedirectionEnable());
  const [hideDisabledArenaGame, setHideDisabledArenaGame] = useSyncedState('hideDisabledArenaGame', config.areDisabledArenaGamesHidden());
  const [hideLoadingLogo, setHideLoadingLogo] = useSyncedState('hideLoadingLogo', config.isFullscreenLoadingLogoHidden());
  const [fastCreate, setFastCreate] = useSyncedState('fastCreate', config.isFastCreateEnable());
  const [autoOpen, setAutoOpen] = useSyncedState('autoOpen', config.isAutoOpenEnable());
  const [karmaRestriction, setKarmaRestriction] = useSyncedState('karmaRestriction', config.getKarmaRestriction());
  const [betterPlayerRestriction, setBetterPlayerRestriction] = useSyncedState('betterPlayerRestriction', config.isBetterPlayerRestriction());
  const [levelPlayerRestriction, setLevelPlayerRestriction] = useSyncedState('levelPlayerRestriction', config.getLevelPlayerRestriction());
  const [solidBackground, setSolidBackground] = useSyncedState('solidBackground', config.isSolidBackground());
  const [socialMessagesHidden, setSocialMessagesHidden] = useSyncedState('socialMessagesHidden', config.areSocialMessagesHidden());
  const [chatUserNamesHidden, setChatUserNamesHidden] = useSyncedState('chatUserNamesHidden', config.areChatUserNamesHidden());
  const [chatDarkIcons, setChatDarkIcons] = useSyncedState('chatDarkIcons', config.chatDarkIcons());
  const [chatBarAutoHide, setChatBarAutoHide] = useSyncedState('chatBarAutoHide', config.isChatBarAutoHide());
  const [homeConfig, setHomeConfig] = useSyncedState<HomeConfig>('homeConfig', config.getHomeConfig());
  const [inProgressConfig, setInProgressConfig] = useSyncedState<InProgressConfig>('inProgressConfig', config.getInProgressConfig());
  const [isHideGameButtonDisplayed, displayHideGameButton] = useSyncedState('isHideGameButtonDisplayed', config.isHideGameButtonDisplayed());
  const [hiddenGames, setHiddenGames] = useSyncedState<string[]>('hiddenGames', config.getHiddenGames());
  const [hiddenPlayers, setHiddenPlayers] = useSyncedState<string[]>('hiddenPlayers', config.getMutedPlayers());
  const [muteWarning, setMuteWarning] = useSyncedState('muteWarning', config.isMuteWarning());
  const [animatedTitle, setAnimatedTitle] = useSyncedState('animatedTitle', config.isAnimatedTitle());
  const [configVisible, setConfigVisible] = useSyncedState('configVisible', 'about');
  const [playerRestriction, setPlayerRestriction] = useSyncedState('playerRestriction', betterPlayerRestriction || levelPlayerRestriction > 0);

  const [advancedHomeConfig, setAdvancedHomeConfig] = useSyncedState<AdvancedHomeConfig>('advancedHomeConfig', config.getAdvancedHomeConfig());
  const [advancedHomeHtml, setAdvancedHomeHtml] = useSyncedState<string>('advancedHomeHtml', advancedHomeConfig.html);
  const [advancedStatus, setAdvancedStatus] = useState('');

  const [confirmClear, setConfirmClear] = useState(false);

  const updateLocale = (locale: string) => {
    config.setLocale(locale).then(() => setLocale(locale));
  }

  const _updateAdvanceHomeConfig = (advConfig: AdvancedHomeConfig) => {
    setAdvancedHomeConfig(advConfig);
    config.setAdvancedHomeConfig(advConfig);
  };

  const _setConfigVisible = (val: string) => {
    setConfigVisible(val);
  };

  const updateOnlineMessages = (val: boolean) => {
    setOnlineMessages(val);
    config.setOnlineMessagesEnabled(val)
  };

  const updateAreLogTimestampsRemoved = (val: boolean) => {
    setLogTimestampHidden(val);
    config.setLogTimestampHidden(val);
  };

  const updateHideLeftBarOption = (val: boolean) => {
    setHideLeftBarOption(!val);
    config.setHideLeftBarOption(!val);
  };

  const updateQuitGameOption = (val: boolean) => {
    const redirectTo = val ? "lobby" : "home";
    setQuitGameOption(redirectTo);
    config.setQuitGameTo(redirectTo);
  };

  const updateReplayWithAutoStart = (val: boolean) => {
    setReplayWithAutoStart(val);
    config.setReplayWithAutoStart(val);
  };

  const updateEloHidden = (val: boolean) => {
    setEloHidden(!val);
    config.setEloHidden(!val)
  };

  const updateArenaEloHidden = (val: boolean) => {
    setArenaEloHidden(!val);
    config.setArenaEloHidden(!val)
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
    if (val) {
      uploadCustomMp3().then(setCustomSoundFile);
    } else {
      removeCustomMp3();
      setCustomSoundFile(false);
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

  const updateHideDisabledArenaGame = (val: boolean) => {
    setHideDisabledArenaGame(val);
    config.hideDisabledArenaGames(val);
  }

  const updateHideLoadingLogo = (val: boolean) => {
    setHideLoadingLogo(val);
    config.hideFullscreenLoadingLogo(val);
  }

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

  const updateLevelPlayerRestriction = (val: number) => {
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

    return <Switch checked={checked} textOn={textOn} textOff={textOff} onChange={onChange} disabled={disabled ?? false} />
  };

  const getCustomSoundSwitch = (canUploadSound: boolean) => {
    const checked = soundNotification && tracking && customSoundFile;
    const disabled = !canUploadSound || !tracking || !soundNotification;
    const warnText = canUploadSound ? '' : `(${i18n('optionsNotificationCustomSoundWarnFF')})`;
    const textOn = `${i18n('optionsNotificationCustomSoundOn')} ${warnText}`;
    const textOff = `${i18n('optionsNotificationCustomSoundOff')} ${warnText}`;

    return <Switch checked={checked} textOn={textOn} textOff={textOff} onChange={updateSoundCustom} disabled={disabled} />
  };

  useEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  const getMiscSection = () => {
    if (configVisible === 'misc') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionMiscTitle")}</div>
          <div className="options-line">
            <span>{i18n('current_locale')}</span>
            <select className="border border-black dark:dark:border-white rounded flags" onChange={(evt: any) => updateLocale(evt.target?.value)} value={locale}>
              <option value='de'>Deutsch 🇩🇪</option>
              <option value='en'>English 🇬🇧</option>
              <option value='fr'>Français 🇫🇷</option>
            </select>
          </div>
          {getSwitch(redirect, updateRedirect, "optionsLobbyRedirectOn", "optionsLobbyRedirectOff")}
          {getSwitch(hideDisabledArenaGame, updateHideDisabledArenaGame, "optionsHideDisabledArenaGameOn", "optionsHideDisabledArenaGameOff")}
          {getSwitch(solidBackground, updateSolidBackground, "optionsSolidBackgroundOn", "optionsSolidBackgroundOff")}
          {getSwitch(socialMessagesHidden, updateSocialMessagesHidden, "optionsHideSocialMessagesOn", "optionsHideSocialMessagesOff")}
          {getSwitch(!chatUserNamesHidden, updateChatUserNamesHidden, "optionsChatUserNameOn", "optionsChatUserNameOff")}
          {getSwitch(chatDarkIcons, updateChatDarkIcons, "optionsChatDarkIconsOn", "optionsChatDarkIconsOff")}
          {getSwitch(hideLoadingLogo, updateHideLoadingLogo, "optionsLoadingLogoOn", "optionsLoadingLogoOff")}
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
    const desktopVersion = !isMobile();
    const popupContext = window.location.pathname.includes('popup');
    const canUploadSound = !(isFirefox && popupContext) // FF does not support file selection in popup

    if (configVisible === 'notif') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionNotifTitle")}</div>
          {desktopVersion && <>
            {getSwitch(tracking, updateTracking, "optionsTrackingOn", "optionsTrackingOff")}
            {getSwitch(soundNotification && tracking, updateSoundNotification, "optionsNotificationSoundOn", "optionsNotificationSoundOff", !tracking)}
            {<div className="row_fullwidth">
              {getCustomSoundSwitch(canUploadSound)}
              {tracking && soundNotification && <div>
                {canUploadSound && customSoundFile && <Button {...{ text: i18n("uploadMp3"), className: "small_button", onClick: uploadCustomMp3 }} />}
                <Button {...{ text: i18n("play"), className: "small_button", onClick: playMp3 }} />
              </div>}
            </div>}
          </>}
          {getSwitch(!motionSensitivity, updateFlashing, "optionsFlashingOn", "optionsFlashingOff")}
          {desktopVersion && getSwitch(animatedTitle, updateAnimatedTitle, "optionsAnimatedTitleOn", "optionsAnimatedTitleOff")}
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
    const desktopVersion = !isMobile();

    if (configVisible === 'games') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionGamesTitle")}</div>
          {getSwitch(onlineMessages, updateOnlineMessages, "optionFriendsActivityOn", "optionFriendsActivityOff")}
          {getSwitch(!eloHidden, updateEloHidden, "optionEloHiddenOff", "optionEloHiddenOn")}
          {getSwitch(!arenaEloHidden, updateArenaEloHidden, "optionArenaEloHiddenOff", "optionArenaEloHiddenOn")}
          {desktopVersion && getSwitch(chatBarAutoHide, updateChatBarAutoHide, "optionsChatAutoHideOn", "optionsChatAutoHideOff")}
          {getSwitch(areLogTimestampsHidden, updateAreLogTimestampsRemoved, "optionRemoveLogTimestampsOn", "optionRemoveLogTimestampsOff")}
          {getSwitch(!hideLeftBarOption, updateHideLeftBarOption, "optionHideLeftBarOptionOff", "optionHideLeftBarOptionOn")}
          {getSwitch(quitGameOption === 'lobby', updateQuitGameOption, "optionsQuitGameToLobbyOn", "optionsQuitGameToLobbyOff")}
          {getSwitch(replayWithAutoStart, updateReplayWithAutoStart, "optionsReplayWithAutoStartOn", "optionsReplayWithAutoStartOff")}
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

  const getHomeSwitch = (param: keyof HomeConfig, message: string) => {
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
        <div className="options-twocolumns">
          {getHomeSwitch('header', 'optionsHomeHeader')}
          {getHomeSwitch('recentGames', 'optionsRecentColumn')}
          {getHomeSwitch('latestNews', 'optionsHomeLatest')}
          {getHomeSwitch('popularGames', 'optionsPopularColumn')}
          {getHomeSwitch('recommandedGames', 'optionsRecommendedColumn')}
          {getHomeSwitch('classicGames', 'optionsClassicGames')}
          {getHomeSwitch('smallFeed', 'optionsHomeNewsSmall')}
          {getSwitch(homeConfig.fewFeeds && homeConfig.tournaments && homeConfig.tournamentsBelow, (val) => updateHomeConfig('fewFeeds', val), "optionsHomeNewsShort", "optionsHomeNewsTall", !homeConfig.tournaments || !homeConfig.tournamentsBelow)}
          {getHomeSwitch('tournaments', 'tournaments')}
          {getSwitch(homeConfig.tournamentsBelow && homeConfig.tournaments, (val) => updateHomeConfig('tournamentsBelow', val), "tournamentsBelowOn", "tournamentsBelowOff", !homeConfig.tournaments)}
          {getHomeSwitch('status', 'optionsStatus')}
          {getHomeSwitch('howToPlay', 'optionsHomeHowToPlay')}
          {getHomeSwitch('footer', 'optionsHomeFooter')}
        </div>
      </>
    );
  };

  const getWarning = () => {
    if ((!homeConfig.smallFeed || !homeConfig.tournamentsBelow) && (!advancedHomeConfig.advanced)) {
      const warningSymbol = '<span style="color: red; font-size: 16px;">⚠</span>';
      const text = `${warningSymbol} ${i18n("optionsHomeWarning")}`;
      return <div dangerouslySetInnerHTML={{ __html: text }} onClick={(evt) => {
        _updateAdvanceHomeConfig({ html: advancedHomeConfig.html, advanced: true });
        evt.stopPropagation();
      }} />;
    }

    return <div>{i18n("optionsHomeRefresh")}</div>;
  }

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
          {getWarning()}
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

  const getInProgressSwitch = (param: keyof InProgressConfig, message: string) => {
    return getSwitch(inProgressConfig[param], (val) => updateInProgressConfig(param, val), `${message}On`, `${message}Off`);
  };

  const getInProgressSection = () => {
    if (configVisible === 'inProgress') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{i18n("optionsInProgress")}</div>
          <div className="options-twocolumns">
            {getInProgressSwitch('emptySections', 'optionsInProgressEmpty')}
            {getInProgressSwitch('playAgain', 'optionsInProgressReplay')}
            {getInProgressSwitch('discover', 'optionsInProgressDiscover')}
            {getInProgressSwitch('more', 'optionsInProgressMore')}
            {getInProgressSwitch('colorfulTables', 'optionsInProgressColorfulTables')}
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
            <select className="border border-black dark:dark:border-white rounded" onChange={(evt: any) => updateLevelPlayerRestriction(+evt.target?.value)} value={levelPlayerRestriction}>
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
          <div className="options-version">Version {getExtensionVersion()}</div>
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
