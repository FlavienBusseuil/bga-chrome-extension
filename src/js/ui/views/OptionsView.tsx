import React from "preact";
import { useState } from "preact/hooks";

import Configuration from "../../config/configuration";
import Switch from "../base/Switch";

type Props = {
  config: Configuration,
  onChange: () => void
};

export const OptionsView = ({ config, onChange }: Props) => {
  const [tracking, setTracking] = useState(config.isTrackingEnable());
  const [hiddenGames, setHiddenGames] = useState<string[]>(config.getHiddenGames());

  const updateTracking = (val: boolean) => {
    setTracking(val);
    config.setTrackingEnable(val);
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

  return (
    <div className="options-container">
      <div className="options-frame">
        <div className="options-frame-title">{chrome.i18n.getMessage("optionsTracking")}</div>
        <Switch
          checked={tracking}
          textOn={chrome.i18n.getMessage("optionsTrackingOn")}
          textOff={chrome.i18n.getMessage("optionsTrackingOff")}
          onChange={updateTracking}
        />
      </div>
      <div className="options-frame">
        <div className="options-frame-title">{chrome.i18n.getMessage("optionHiddenTab")}</div>
        <div>{chrome.i18n.getMessage("optionHiddenGamesWarning")}</div>
        <div className="bgext_hidden_games_container">{getHiddenConfiguration()}</div>
      </div>
      <div className="options-frame">
        <div className="options-frame-title">{chrome.i18n.getMessage("about")}</div>
        <div dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("aboutText") }}></div>
      </div>
    </div>
  );
};