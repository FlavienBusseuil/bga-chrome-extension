import React from "preact";
import { useState } from "preact/hooks";

import Configuration, { HomeConfig, InProgressConfig } from "../../config/configuration";
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
  const [inProgressConfig, setInProgressConfig] = useState<InProgressConfig>(config.getInProgressConfig());
  const [hiddenGames, setHiddenGames] = useState<string[]>(config.getHiddenGames());
  const [configVisible, setConfigVisible] = useState(localStorage.getItem('ext_settings') || 'misc');

  const _setConfigVisible = (val: string) => {
    localStorage.setItem('ext_settings', val);
    setConfigVisible(val);
  }

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
      <div className="options-frame reduced" onClick={() => _setConfigVisible('misc')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionMiscTitle")} {arrow()}</div>
      </div>
    );
  }

  const getHomeSwitch = (param: string, message: string) => {
    return (
      <Switch
        checked={homeConfig[param]}
        textOn={chrome.i18n.getMessage(`${message}On`)}
        textOff={chrome.i18n.getMessage(`${message}Off`)}
        onChange={(val) => updateHomeConfig(param, val)}
      />
    );
  };

  const getHomeSection = () => {
    if (configVisible === 'home') {
      return (
        <div className="options-frame">
          <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")}</div>
          <div className="options-subframe">
            <div>
              {getHomeSwitch('header', 'optionsHomeHeader')}
              {getHomeSwitch('latestNews', 'optionsHomeLatest')}
              {getHomeSwitch('smallFeed', 'optionsHomeNewsSmall')}
              <Switch
                checked={homeConfig.fewFeeds && homeConfig.tournaments && homeConfig.tournamentsBelow}
                textOn={chrome.i18n.getMessage("optionsHomeNewsShort")}
                textOff={chrome.i18n.getMessage("optionsHomeNewsTall")}
                onChange={(val) => updateHomeConfig('fewFeeds', val)}
                disabled={!homeConfig.tournaments || !homeConfig.tournamentsBelow}
              />
              {getHomeSwitch('tournaments', 'tournaments')}
            </div>
            <div>
              {getHomeSwitch('recentGames', 'optionsRecentColumn')}
              {getHomeSwitch('popularGames', 'optionsPopularColumn')}
              {getHomeSwitch('recommandedGames', 'optionsRecommendedColumn')}
              {getHomeSwitch('status', 'optionsStatus')}
              {homeConfig.tournaments && getHomeSwitch('tournamentsBelow', 'tournamentsBelow')}
            </div>
          </div>
          <div>{chrome.i18n.getMessage("optionsHomeRefresh")}</div>
        </div>
      );
    }

    return (
      <div className="options-frame reduced" onClick={() => _setConfigVisible('home')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionsHome")} {arrow()}</div>
      </div>
    );
  }

  const getInProgressSwitch = (param: string, message: string) => {
    return (
      <Switch
        checked={inProgressConfig[param]}
        textOn={chrome.i18n.getMessage(`${message}On`)}
        textOff={chrome.i18n.getMessage(`${message}Off`)}
        onChange={(val) => updateInProgressConfig(param, val)}
      />
    );
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
      <div className="options-frame reduced" onClick={() => _setConfigVisible('hidden')}>
        <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")} {arrow()}</div>
      </div>
    );
  }

  return (
    <div className="options-container">
      {getMiscSection()}
      {getHomeSection()}
      {getInProgressSection()}
      {getHiddenSection()}
      <div className="options-frame">
        <div className="options-frame-title">{chrome.i18n.getMessage("about")}</div>
        <div dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("aboutText") }}></div>
      </div>
    </div>
  );
};
