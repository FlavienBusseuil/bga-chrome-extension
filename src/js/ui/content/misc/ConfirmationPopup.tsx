import React from "preact";
import { useState } from "preact/hooks";

import "../../../../css/confirmation.css";
import Configuration from "../../../config/configuration";

interface Props {
  type: 'delete_game' | 'fast_create' | 'mute_player'
  confirm: (stopWarn: boolean) => void;
  cancel: () => void;
  config: Configuration
}

const ConfirmationPopup = ({ type, confirm, cancel, config }: Props) => {
  const [stopWarn, setStopWarn] = useState(false);
  const [autoOpen, setAutoOpen] = useState(config.isAutoOpenEnable());
  const [muteWarning, setMuteWarning] = useState(config.isMuteWarning());

  if (type === 'delete_game') {
    return (
      <div id="bgaext_popup">
        <h2 class="bgaext_popup_title">{chrome.i18n.getMessage("deleteGameTitle")}</h2>
        <p>{chrome.i18n.getMessage("deleteGameText1")}</p>
        <p>{chrome.i18n.getMessage("deleteGameText2")}</p>
        <p>{chrome.i18n.getMessage("deleteGameText3")}</p>
        <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameLink") }}></p>
        <div class="bgaext_popup_footer">
          <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
            <input type="checkbox" checked={stopWarn} />
            <label>{chrome.i18n.getMessage("deleteStop")}</label>
          </div>
          <div className="bgaext_popup_buttons">
            <button class="bgabutton bgabutton_blue" onClick={() => confirm(stopWarn)}>{chrome.i18n.getMessage("buttonConfirm")}</button>
            <button class="bgabutton bgabutton_blue" onClick={cancel}>{chrome.i18n.getMessage("buttonCancel")}</button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'mute_player') {
    return (
      <div id="bgaext_popup" className="large">
        <h2 class="bgaext_popup_title">{chrome.i18n.getMessage("mutePlayerTitle")}</h2>
        <p>{chrome.i18n.getMessage("muteText1")}</p>
        <div className="bgaext_popup_check" onClick={() => setMuteWarning(!muteWarning)}>
          <input type="checkbox" checked={muteWarning} />
          <label>{chrome.i18n.getMessage("muteWarningOn")}</label>
        </div>
        <p>{chrome.i18n.getMessage("deleteGameText2")}</p>
        <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameLink") }}></p>
        <div class="bgaext_popup_footer">
          <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
            <input type="checkbox" checked={stopWarn} />
            <label>{chrome.i18n.getMessage("deleteStop")}</label>
          </div>
          <div className="bgaext_popup_buttons">
            <button class="bgabutton bgabutton_blue" style={{ overflow: 'visible' }} onClick={() => confirm(stopWarn)}>{chrome.i18n.getMessage("buttonConfirm")}</button>
            <button class="bgabutton bgabutton_blue" style={{ overflow: 'visible' }} onClick={cancel}>{chrome.i18n.getMessage("buttonCancel")}</button>
          </div>
        </div>
      </div>
    );
  }

  const updateAutoOpen = () => {
    setAutoOpen(!autoOpen);
    config.setAutoOpenEnable(!autoOpen);
  };

  return (
    <div id="bgaext_popup" className="huge">
      <h2 class="bgaext_popup_title">{chrome.i18n.getMessage("fastStartTitle")}</h2>
      <p>{chrome.i18n.getMessage("fastStartText1")}</p>
      <p>{chrome.i18n.getMessage("deleteGameText2")}</p>
      <div className="bgaext_popup_check" onClick={updateAutoOpen}>
        <input type='checkbox' id='check_auto_open' checked={autoOpen} />
        <label>{chrome.i18n.getMessage('optionsAutoOpenOn')}</label>
      </div>
      <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameLink") }}></p>
      <div class="bgaext_popup_footer">
        <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
          <input type="checkbox" checked={stopWarn} />
          <label>{chrome.i18n.getMessage("deleteStop")}</label>
        </div>
        <div className="bgaext_popup_buttons">
          <button class="bgabutton bgabutton_blue" onClick={() => confirm(stopWarn)}>{chrome.i18n.getMessage("buttonConfirm")}</button>
          <button class="bgabutton bgabutton_blue" onClick={cancel}>{chrome.i18n.getMessage("buttonCancel")}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;