import React from "preact";
import { useState } from "preact/hooks";

import Configuration, { HomeConfig } from "../../config/configuration";
import Switch from "../base/Switch";

type Props = {
  config: Configuration,
  onChange: () => void
};

export const OptionsView = ({ config, onChange }: Props) => {
  const [tracking, setTracking] = useState(config.isTrackingEnable());
  const [motionSensitivity, setMotionSensitivity] = useState(config.isMotionSensitivityEnable());
  const [redirect, setRedirect] = useState(config.isLobbyRedirectionEnable());
  const [homeConfig, setHomeConfig] = useState<HomeConfig>(config.getHomeConfig());
  const [hiddenGames, setHiddenGames] = useState<string[]>(config.getHiddenGames());
  const [configVisible, setConfigVisible] = useState('misc');

  const updateTracking = (val: boolean) => {
    setTracking(val);
    config.setTrackingEnable(val);
    onChange();
  };

  const updateFlashing = (val: boolean) => {
    setMotionSensitivity(!val);
    config.setMotionSensitivityEnable(!val);
  };

  const updateRedirect = (val: boolean) => {
    setRedirect(val);
    config.setLobbyRedirectionEnable(val);
  };

  const updateHomeConfig = (param: string, val: boolean) => {
    const newHomeConfig = { ...homeConfig, [param]: val };
    setHomeConfig(newHomeConfig);
    config.setHomeConfig(newHomeConfig);
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

  const arrow = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg">
        <path fill="currentcolor" d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
      </svg>
    );
  }

  const getMiscSection = () => {
    if (configVisible === 'misc') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionMiscTitle")}</div>
          <Switch
            checked={tracking}
            textOn={chrome.i18n.getMessage("optionsTrackingOn")}
            textOff={chrome.i18n.getMessage("optionsTrackingOff")}
            onChange={updateTracking}
          />
          <Switch
            checked={!motionSensitivity}
            textOn={chrome.i18n.getMessage("optionsFlashingOn")}
            textOff={chrome.i18n.getMessage("optionsFlashingOff")}
            onChange={updateFlashing}
            className='long_text'
          />
          <Switch
            checked={redirect}
            textOn={chrome.i18n.getMessage("optionsLobbyRedirectOn")}
            textOff={chrome.i18n.getMessage("optionsLobbyRedirectOff")}
            onChange={updateRedirect}
          />
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => setConfigVisible('misc')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionMiscTitle")} {arrow()}</div>
      </div>
    );
  }

  const getHomeSection = () => {
    if (configVisible === 'home') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")}</div>
          <div className="options-subframe">
            <div>
              <Switch
                checked={homeConfig.header}
                textOn={chrome.i18n.getMessage("optionsHomeHeaderOn")}
                textOff={chrome.i18n.getMessage("optionsHomeHeaderOff")}
                onChange={(val) => updateHomeConfig('header', val)}
              />
              <Switch
                checked={homeConfig.latestNews}
                textOn={chrome.i18n.getMessage("optionsHomeLatestOn")}
                textOff={chrome.i18n.getMessage("optionsHomeLatestOff")}
                onChange={(val) => updateHomeConfig('latestNews', val)}
              />
              <Switch
                checked={homeConfig.smallFeed}
                textOn={chrome.i18n.getMessage("optionsHomeNewsSmall")}
                textOff={chrome.i18n.getMessage("optionsHomeNewsLarge")}
                onChange={(val) => updateHomeConfig('smallFeed', val)}
              />
              <Switch
                checked={homeConfig.fewFeeds}
                textOn={chrome.i18n.getMessage("optionsHomeNewsShort")}
                textOff={chrome.i18n.getMessage("optionsHomeNewsTall")}
                onChange={(val) => updateHomeConfig('fewFeeds', val)}
              />
              <Switch
                checked={homeConfig.tournaments}
                textOn={chrome.i18n.getMessage("tournamentsOn")}
                textOff={chrome.i18n.getMessage("tournamentsOff")}
                onChange={(val) => updateHomeConfig('tournaments', val)}
              />
            </div>
            <div>
              <Switch
                checked={homeConfig.recentGames}
                textOn={chrome.i18n.getMessage("optionsRecentColumnOn")}
                textOff={chrome.i18n.getMessage("optionsRecentColumnOff")}
                onChange={(val) => updateHomeConfig('recentGames', val)}
              />
              <Switch
                checked={homeConfig.popularGames}
                textOn={chrome.i18n.getMessage("optionsPopularColumnOn")}
                textOff={chrome.i18n.getMessage("optionsPopularColumnOff")}
                onChange={(val) => updateHomeConfig('popularGames', val)}
              />
              <Switch
                checked={homeConfig.recommandedGames}
                textOn={chrome.i18n.getMessage("optionsRecommendedColumnOn")}
                textOff={chrome.i18n.getMessage("optionsRecommendedColumnOff")}
                onChange={(val) => updateHomeConfig('recommandedGames', val)}
              />
              <Switch
                checked={homeConfig.status}
                textOn={chrome.i18n.getMessage("optionsStatusOn")}
                textOff={chrome.i18n.getMessage("optionsStatusOff")}
                onChange={(val) => updateHomeConfig('status', val)}
              />
              {homeConfig.tournaments &&
                <Switch
                  checked={homeConfig.tournamentsBelow}
                  textOn={chrome.i18n.getMessage("tournamentsBelowOn")}
                  textOff={chrome.i18n.getMessage("tournamentsBelowOff")}
                  onChange={(val) => updateHomeConfig('tournamentsBelow', val)}
                />
              }
            </div>
          </div>
          <div>{chrome.i18n.getMessage("optionsHomeRefresh")}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => setConfigVisible('home')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")} {arrow()}</div>
      </div>
    );
  }

  const getHiddenSection = () => {
    if (configVisible === 'hidden') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")}</div>
          <div>{chrome.i18n.getMessage("optionHiddenGamesWarning")}</div>
          <div className="bgext_hidden_games_container">{getHiddenConfiguration()}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => setConfigVisible('hidden')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")} {arrow()}</div>
      </div>
    );
  }

  return (
    <div className="options-container">
      {getMiscSection()}
      {getHomeSection()}
      {getHiddenSection()}
      <div className="options-frame">
        <div className="options-frame-title">{chrome.i18n.getMessage("about")}</div>
        <div dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("aboutText") }}></div>
      </div>
    </div>
  );
};