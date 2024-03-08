import React from "preact";
import { useState } from "preact/hooks";

import "../../../../css/confirmation.css";

interface Props {
  confirm: (stopWarn: boolean) => void;
  cancel: () => void;
}

const ConfirmationPopup = ({ confirm, cancel }: Props) => {
  const [stopWarn, setStopWarn] = useState(false);

  return (
    <div id="bgaext_popup">
      <h2 class="bgaext_popup_title">{chrome.i18n.getMessage("deleteGameTitle")}</h2>
      <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameText1") }}></p>
      <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameText2") }}></p>
      <p dangerouslySetInnerHTML={{ __html: chrome.i18n.getMessage("deleteGameText3") }}></p>
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