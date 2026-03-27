import Markup from 'preact-markup';

import { i18n } from "../../../utils/browser/i18n";
import { isFirefox } from '../../../utils/browser';

interface Props {
    later: () => void;
    close: () => void;
}

const InformationPopup = ({ later, close }: Props) => {
    const title = isFirefox ? i18n("infosTitleFirefox") : i18n("infosTitleChrome");
    const content = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            <Markup markup={isFirefox ? i18n("infosSubTitleFirefox") : i18n("infosSubTitleChrome")} type='html' trim={false} />
            <Markup markup={i18n("infosLine3")} type='html' trim={false} />
            <Markup markup={i18n("infosLine4")} type='html' trim={false} />
            <Markup markup={i18n("infosLine5")} type='html' trim={false} />
        </div>
    );

    return (
        <div id="bgaext_popup" className="large">
            <h2 class="bgaext_popup_title">{title}</h2>
            {content}
            <div class="bgaext_popup_footer">
                <span></span>
                <div className="bgaext_popup_buttons">
                    <button class="bgabutton bgabutton_blue" onClick={later}>{i18n("buttonLater")}</button>
                    <button class="bgabutton bgabutton_blue" onClick={close}>{i18n("buttonClose")}</button>
                </div>
            </div>
        </div>
    );
};

export default InformationPopup;