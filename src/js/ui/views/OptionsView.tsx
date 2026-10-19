import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { useSyncedState } from '../hooks/useSyncedState';
import Markup from 'preact-markup';

import Configuration, { AdvancedHomeConfig, HomeConfig, InProgressConfig } from "../../config/configuration";
import Switch from "../base/Switch";
import { Button } from "../base/Button";
import { isSoundCustom, playMp3, removeCustomMp3, uploadCustomMp3 } from "../../utils/misc/mp3";
import { getExtensionVersion, isFirefox, isMobile } from "../../utils/browser";
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
  const [autoClickStart, setAutoClickStart] = useSyncedState('autoClickStart', config.autoClickStart());
  const [eloHidden, setEloHidden] = useSyncedState('eloHidden', config.isEloHidden());
  const [arenaEloHidden, setArenaEloHidden] = useSyncedState('arenaEloHidden', config.isArenaEloHidden());
  const [beginnerStatusHidden, setBeginnerStatusHidden] = useSyncedState('beginnerStatusHidden', config.isBeginnerStatusHidden());
  const [tracking, setTracking] = useSyncedState('tracking', config.isTrackingEnable());
  const [soundNotification, setSoundNotification] = useSyncedState('soundNotification', config.isSoundNotificationEnable());
  const [customSoundFile, setCustomSoundFile] = useSyncedState('customSoundFile', isSoundCustom());
  const [motionSensitivity, setMotionSensitivity] = useSyncedState('motionSensitivity', config.isMotionSensitivityEnable());
  const [sidePanelIconVisible, setSidePanelIconVisible] = useSyncedState('sidePanelIconVisible', config.isSidePanelIconVisible());
  const [sidePanelMenuVisible, setSidePanelMenuVisible] = useSyncedState('sidePanelMenuVisible', config.isSidePanelMenuVisible());
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
  const [closePopupOnClick, setClosePopupOnClick] = useSyncedState('closePopupOnClick', config.shouldClosePopupOnClick(!isFirefox));
  const [focusOnNewtab, setFocusOnNewTab] = useSyncedState('focusOnNewtab', config.shouldFocusOnNewTab());

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

  // Section rendered only to measure the popup height it needs (see measureSection), never painted
  const [measuredSection, setMeasuredSection] = useState<string | null>(null);
  const shownSection = measuredSection ?? configVisible;

  // Resolved once the newly opened section is rendered (see _setConfigVisible)
  const sectionRendered = useRef<(() => void)[]>([]);
  const sectionMeasured = useRef<((height: number) => void)[]>([]);

  useLayoutEffect(() => {
    sectionRendered.current.splice(0).forEach(resolve => resolve());
  }, [configVisible]);

  useLayoutEffect(() => {
    if (measuredSection !== null) {
      const height = document.documentElement.scrollHeight;
      setMeasuredSection(null);
      sectionMeasured.current.splice(0).forEach(resolve => resolve(height));
    }
  }, [measuredSection]);

  // Height of the page with the given section opened. The section is rendered then removed before the next paint
  // (Preact renders in a microtask, the layout effect reads the height synchronously): nothing is displayed.
  const measureSection = (val: string) => new Promise<number>(resolve => {
    sectionMeasured.current.push(resolve);
    setMeasuredSection(val);
  });

  const waitForResize = () => new Promise<void>(resolve => {
    const done = () => {
      window.removeEventListener("resize", done);
      resolve();
    };
    window.addEventListener("resize", done);
    setTimeout(done, 200); // the popup may already have the right height, or be at its maximum height
  });

  const _setConfigVisible = async (val: string) => {
    if (val === configVisible) {
      return;
    }

    // The section title is a label: drop the selection (blinking cursor) left by the click
    window.getSelection()?.removeAllRanges();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reducedMotion) {
      // Without view transitions (Firefox < 144), the opened section fades in (see options-common.css)
      setConfigVisible(val);
      return;
    }

    // The transition is aborted if the window is resized meanwhile, and the extension popup window fits its content.
    // So the popup is first enlarged to the height needed by the new section, and only reduced once the animation is over.
    const isPopup = document.documentElement.classList.contains("popup");
    const root = document.documentElement;

    if (isPopup) {
      const currentHeight = root.scrollHeight;
      const newHeight = await measureSection(val);

      root.style.minHeight = `${Math.max(currentHeight, newHeight)}px`;
      // Chrome limits the popup height to 600px: beyond that the page scrolls and the window doesn't change
      if (newHeight > currentHeight && window.innerHeight < 600) {
        await waitForResize();
      }
    }

    // The section borders are drawn by the animated frames during the transition (see options-common.css)
    root.classList.add("bgaext-section-transition");

    // The browser animates between the current page and the page once the returned promise is resolved:
    // wait for Preact to render the new section (its render is not synchronous).
    const transition = document.startViewTransition(() => new Promise<void>(resolve => {
      sectionRendered.current.push(resolve);
      setTimeout(resolve, 500); // never block the page if the render doesn't happen
      setConfigVisible(val);
    }));
    transition.ready.catch((error) => console.warn("[bga extension] section transition skipped", error));

    transition.finished.finally(() => {
      root.classList.remove("bgaext-section-transition");
      if (isPopup) {
        root.style.minHeight = "";
      }
    });
  };

  // Each section and its title are animated separately by the view transition (the title of an opened section is drawn on its border)
  const sectionStyle = (id: string) => ({ viewTransitionName: `bgaext-section-${id}` });
  const titleStyle = (id: string) => ({ viewTransitionName: `bgaext-section-title-${id}` });

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

  const updateAutoClickStart = (val: boolean) => {
    setAutoClickStart(val);
    config.setAutoClickStart(val);
  };

  const updateEloHidden = (val: boolean) => {
    setEloHidden(!val);
    config.setEloHidden(!val)
  };

  const updateArenaEloHidden = (val: boolean) => {
    setArenaEloHidden(!val);
    config.setArenaEloHidden(!val)
  };

  const updateBeginnerStatusHidden = (val: boolean) => {
    setBeginnerStatusHidden(!val);
    config.setBeginnerStatusHidden(!val)
  };

  const updateAnimatedTitle = (val: boolean) => {
    setAnimatedTitle(val);
    config.setAnimatedTitle(val)
  };

  const updateClosePopupOnClick = (val: boolean) => {
    setClosePopupOnClick(val);
    config.setClosePopupOnClick(val);
  };

  const updateFocusOnNewTab = (val: boolean) => {
    setFocusOnNewTab(val);
    config.setFocusOnNewTab(val);
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

  const updateSidePanelIconVisible = (val: boolean) => {
    setSidePanelIconVisible(val);
    config.setSidePanelIconVisible(val);
  };

  const updateSidePanelMenuVisible = (val: boolean) => {
    setSidePanelMenuVisible(val);
    config.setSidePanelMenuVisible(val);
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
  };

  const updateInProgressConfig = (param: string, val: boolean) => {
    const newInProgressConfig = { ...inProgressConfig, [param]: val };
    setInProgressConfig(newInProgressConfig);
    config.setInProgressConfig(newInProgressConfig);
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
            className="options-button"
            onClick={() => setHiddenGames(config.displayAllGames())}
          >
            {i18n("buttonConfirm")}
          </button>
          <button
            className="options-button"
            onClick={() => setConfirmClear(false)}
          >
            {i18n("buttonCancel")}
          </button>
        </>
      );
    }
    return <a href="#" onClick={(evt) => { evt.preventDefault(); setConfirmClear(true); }}>{i18n("optionsClearHiddenGames")}</a>;
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

  // The arrow has its own view transition: it follows the right edge of its section instead of staying in its snapshot
  const arrow = (id: string) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" style={{ viewTransitionName: `bgaext-section-arrow-${id}` }}>
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
    const desktopVersion = !isMobile;

    if (shownSection === 'misc') {
      return (
        <div className="options-frame" style={sectionStyle('misc')}>
          <div className="options-frame-title"><span style={titleStyle('misc')}>{i18n("optionMiscTitle")}</span></div>
          <div className="options-line">
            <span>{i18n('current_locale')}</span>
            <select className="select flags" onChange={(evt: any) => updateLocale(evt.target?.value)} value={locale}>
              <option value='ca'>🇦🇩 Català</option>
              <option value='de'>🇩🇪 Deutsch</option>
              <option value='en'>🇬🇧 English</option>
              <option value='es'>🇪🇸 Español</option>
              <option value='fr'>🇫🇷 Français</option>
              <option value='ja'>🇯🇵 日本語</option>
            </select>
          </div>
          {desktopVersion && !isFirefox && getSwitch(sidePanelIconVisible, updateSidePanelIconVisible, "optionsSidePanelIconOn", "optionsSidePanelIconOff")}
          {desktopVersion && getSwitch(sidePanelMenuVisible, updateSidePanelMenuVisible, "optionsSidePanelMenuOn", "optionsSidePanelMenuOff")}
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
      <div className="options-frame reduced" style={sectionStyle('misc')} onClick={() => _setConfigVisible('misc')}>
        <div className="options-frame-title">
          <span style={titleStyle('misc')}>{i18n("optionMiscTitle")}</span>
          {arrow('misc')}
        </div>
      </div>
    );
  };

  const getNotificationsSection = () => {
    const desktopVersion = !isMobile;
    const popupContext = window.location.pathname.includes('popup');
    const canUploadSound = !(isFirefox && popupContext) // FF does not support file selection in popup

    if (shownSection === 'notif') {
      return (
        <div className="options-frame" style={sectionStyle('notif')}>
          <div className="options-frame-title"><span style={titleStyle('notif')}>{i18n("optionNotifTitle")}</span></div>
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
          {desktopVersion && getSwitch(closePopupOnClick, updateClosePopupOnClick, "optionClosePopupOnClickOn", "optionClosePopupOnClickOff")}
          {desktopVersion && isFirefox && getSwitch(focusOnNewtab, updateFocusOnNewTab, "optionFocusOnNewTabOn", "optionFocusOnNewTabOff")}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('notif')} onClick={() => _setConfigVisible('notif')}>
        <div className="options-frame-title">
          <span style={titleStyle('notif')}>{i18n("optionNotifTitle")}</span>
          {arrow('notif')}
        </div>
      </div>
    );
  };

  const getGamesSection = () => {
    const desktopVersion = !isMobile;

    if (shownSection === 'games') {
      return (
        <div className="options-frame" style={sectionStyle('games')}>
          <div className="options-frame-title"><span style={titleStyle('games')}>{i18n("optionGamesTitle")}</span></div>
          {getSwitch(onlineMessages, updateOnlineMessages, "optionFriendsActivityOn", "optionFriendsActivityOff")}
          {getSwitch(!eloHidden, updateEloHidden, "optionEloHiddenOff", "optionEloHiddenOn")}
          {getSwitch(!arenaEloHidden, updateArenaEloHidden, "optionArenaEloHiddenOff", "optionArenaEloHiddenOn")}
          {getSwitch(!beginnerStatusHidden, updateBeginnerStatusHidden, "optionBeginnerStatusHiddenOff", "optionBeginnerStatusHiddenOn")}
          {desktopVersion && getSwitch(chatBarAutoHide, updateChatBarAutoHide, "optionsChatAutoHideOn", "optionsChatAutoHideOff")}
          {getSwitch(areLogTimestampsHidden, updateAreLogTimestampsRemoved, "optionRemoveLogTimestampsOn", "optionRemoveLogTimestampsOff")}
          {getSwitch(!hideLeftBarOption, updateHideLeftBarOption, "optionHideLeftBarOptionOff", "optionHideLeftBarOptionOn")}
          {getSwitch(quitGameOption === 'lobby', updateQuitGameOption, "optionsQuitGameToLobbyOn", "optionsQuitGameToLobbyOff")}
          {getSwitch(replayWithAutoStart, updateReplayWithAutoStart, "optionsReplayWithAutoStartOn", "optionsReplayWithAutoStartOff")}
          {getSwitch(autoClickStart, updateAutoClickStart, "optionsAutoClickStartOn", "optionsAutoClickStartOff")}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('games')} onClick={() => _setConfigVisible('games')}>
        <div className="options-frame-title">
          <span style={titleStyle('games')}>{i18n("optionGamesTitle")}</span>
          {arrow('games')}
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
              className="options-button"
              onClick={() => window.open(i18n('htmlHelpPage'), "_blank")}
            >
              {i18n('buttonHelp')}
            </button>
            <button
              className="options-button"
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
      const handleAdvancedModeClick = (evt: Event): void => {
        _updateAdvanceHomeConfig({ html: advancedHomeConfig.html, advanced: true });
        evt.stopPropagation();
      };

      return <Markup markup={text} type='html' trim={false} onClick={handleAdvancedModeClick} />;
    }

    return <div>{i18n("optionsHomeRefresh")}</div>;
  }

  const getHomeSection = () => {
    if (shownSection === 'home') {
      return (
        <div className="options-frame" style={sectionStyle('home')}>
          <div className="options-frame-title"><span style={titleStyle('home')}>{i18n("optionsHome")}</span></div>
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
      <div className="options-frame reduced" style={sectionStyle('home')} onClick={() => _setConfigVisible('home')}>
        <div className="options-frame-title">
          <span style={titleStyle('home')}>{i18n("optionsHome")}</span>
          {arrow('home')}
        </div>
      </div>
    );
  };

  const getInProgressSwitch = (param: keyof InProgressConfig, message: string) => {
    return getSwitch(inProgressConfig[param], (val) => updateInProgressConfig(param, val), `${message}On`, `${message}Off`);
  };

  const getInProgressSection = () => {
    if (shownSection === 'inProgress') {
      return (
        <div className="options-frame" style={sectionStyle('inProgress')}>
          <div className="options-frame-title"><span style={titleStyle('inProgress')}>{i18n("optionsInProgress")}</span></div>
          <div className="options-twocolumns">
            {getInProgressSwitch('emptySections', 'optionsInProgressEmpty')}
            {getInProgressSwitch('playAgain', 'optionsInProgressReplay')}
            {getInProgressSwitch('discover', 'optionsInProgressDiscover')}
            {getInProgressSwitch('more', 'optionsInProgressMore')}
          </div>
          {getInProgressSwitch('colorfulTables', 'optionsInProgressColorfulTables')}
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('inProgress')} onClick={() => _setConfigVisible('inProgress')}>
        <div className="options-frame-title">
          <span style={titleStyle('inProgress')}>{i18n("optionsInProgress")}</span>
          {arrow('inProgress')}
        </div>
      </div>
    );
  };

  const getFastStartSection = () => {
    if (shownSection === 'fastStart') {
      return (
        <div className="options-frame" style={sectionStyle('fastStart')}>
          <div className="options-frame-title"><span style={titleStyle('fastStart')}>{i18n("optionsFastCreate")}</span></div>
          {getSwitch(fastCreate, updateFastCreate, "optionsFastCreateOn", "optionsFastCreateOff")}
          {getSwitch(autoOpen && fastCreate, updateAutoOpen, "optionsFastCreateAutoOpenOn", "optionsFastCreateAutoOpenOff", !fastCreate)}
          {getSwitch(playerRestriction && fastCreate, updatePlayerRestriction, "optionsFastCreateLevelOn", "optionsFastCreateLevelOff", !fastCreate)}
          {playerRestriction && fastCreate &&
            <select className="select full-width" onChange={(evt: any) => updateLevelPlayerRestriction(+evt.target?.value)} value={levelPlayerRestriction}>
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
      <div className="options-frame reduced" style={sectionStyle('fastStart')} onClick={() => _setConfigVisible('fastStart')}>
        <div className="options-frame-title">
          <span style={titleStyle('fastStart')}>{i18n("optionsFastCreate")}</span>
          {arrow('fastStart')}
        </div>
      </div>
    );
  };

  const getHiddenGamesSection = () => {
    if (shownSection === 'hidden') {
      return (
        <div className="options-frame" style={sectionStyle('hidden')}>
          <div className="options-frame-title"><span style={titleStyle('hidden')}>{i18n("optionHiddenTab")}</span></div>
          {getSwitch(isHideGameButtonDisplayed, updateHideGameButtonDisplay, "optionHiddenOn", "optionHiddenOff")}
          <div>{i18n("optionHiddenGamesWarning")}</div>
          <div className="bgext_hidden_games_container">{getHiddenConfiguration()}</div>
          <div className="bgext_hidden_games_clear_container">{getClearHiddenSection()}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('hidden')} onClick={() => _setConfigVisible('hidden')}>
        <div className="options-frame-title">
          <span style={titleStyle('hidden')}>{i18n("optionHiddenTab")}</span>
          {arrow('hidden')}
        </div>
      </div>
    );
  };

  const getHiddenPlayersSection = () => {
    if (shownSection === 'muted') {
      return (
        <div className="options-frame" style={sectionStyle('muted')}>
          <div className="options-frame-title"><span style={titleStyle('muted')}>{i18n("optionMutedTab")}</span></div>
          <div>{i18n("optionMutedWarning")}</div>
          <div className="col">
            <div className="bgext_hidden_games_container">{getMutedConfiguration()}</div>
            {getSwitch(muteWarning, updateMuteWarning, "muteWarningOn", "muteWarningOff")}
          </div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('muted')} onClick={() => _setConfigVisible('muted')}>
        <div className="options-frame-title">
          <span style={titleStyle('muted')}>{i18n("optionMutedTab")}</span>
          {arrow('muted')}
        </div>
      </div>
    );
  };

  const getAboutSection = () => {
    if (shownSection === 'about') {
      return (
        <div className="options-frame" style={sectionStyle('about')}>
          <div className="options-frame-title"><span style={titleStyle('about')}>{i18n("about")}</span></div>
          <Markup markup={i18n('aboutText')} type='html' trim={false} />
          <div className="options-version">Version {getExtensionVersion()}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" style={sectionStyle('about')} onClick={() => _setConfigVisible('about')}>
        <div className="options-frame-title">
          <span style={titleStyle('about')}>{i18n("about")}</span>
          {arrow('about')}
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
