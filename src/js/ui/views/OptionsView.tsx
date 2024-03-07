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

  const updateTracking = (val: boolean) => {
    setTracking(val);
    config.setTrackingEnable(val);
    onChange();
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
    </div>
  );
};