import React from "preact";
import { useState } from "preact/hooks";

import "../../../../css/confirmation.css";
import Configuration from "../../../config/configuration";
import { i18n } from "../../../utils/browser";

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
        <h2 class="bgaext_popup_title">{i18n("deleteGameTitle")}</h2>
        <p>{i18n("deleteGameText1")}</p>
        <p>{i18n("deleteGameText2")}</p>
        <p>{i18n("deleteGameText3")}</p>
        <p dangerouslySetInnerHTML={{ __html: i18n("deleteGameLink") }}></p>
        <div class="bgaext_popup_footer">
          <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
            <input type="checkbox" checked={stopWarn} />
            <label>{i18n("deleteStop")}</label>
          </div>
          <div className="bgaext_popup_buttons">
            <button class="bgabutton bgabutton_blue" onClick={() => confirm(stopWarn)}>{i18n("buttonConfirm")}</button>
            <button class="bgabutton bgabutton_blue" onClick={cancel}>{i18n("buttonCancel")}</button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'mute_player') {
    return (
      <div id="bgaext_popup" className="large">
        <h2 class="bgaext_popup_title">{i18n("mutePlayerTitle")}</h2>
        <p>{i18n("muteText1")}</p>
        <div className="bgaext_popup_check" onClick={() => setMuteWarning(!muteWarning)}>
          <input type="checkbox" checked={muteWarning} />
          <label>{i18n("muteWarningOn")}</label>
        </div>
        <p>{i18n("deleteGameText2")}</p>
        <p dangerouslySetInnerHTML={{ __html: i18n("deleteGameLink") }}></p>
        <div class="bgaext_popup_footer">
          <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
            <input type="checkbox" checked={stopWarn} />
            <label>{i18n("deleteStop")}</label>
          </div>
          <div className="bgaext_popup_buttons">
            <button class="bgabutton bgabutton_blue" style={{ overflow: 'visible' }} onClick={() => confirm(stopWarn)}>{i18n("buttonConfirm")}</button>
            <button class="bgabutton bgabutton_blue" style={{ overflow: 'visible' }} onClick={cancel}>{i18n("buttonCancel")}</button>
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
      <h2 class="bgaext_popup_title">{i18n("fastStartTitle")}</h2>
      <p>{i18n("fastStartText1")}</p>
      <p>{i18n("deleteGameText2")}</p>
      <div className="bgaext_popup_check" onClick={updateAutoOpen}>
        <input type='checkbox' id='check_auto_open' checked={autoOpen} />
        <label>{i18n('optionsFastCreateAutoOpenOn')}</label>
      </div>
      <p dangerouslySetInnerHTML={{ __html: i18n("deleteGameLink") }}></p>
      <div class="bgaext_popup_footer">
        <div className="bgaext_popup_check" onClick={() => setStopWarn(!stopWarn)}>
          <input type="checkbox" checked={stopWarn} />
          <label>{i18n("deleteStop")}</label>
        </div>
        <div className="bgaext_popup_buttons">
          <button class="bgabutton bgabutton_blue" onClick={() => confirm(stopWarn)}>{i18n("buttonConfirm")}</button>
          <button class="bgabutton bgabutton_blue" onClick={cancel}>{i18n("buttonCancel")}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;