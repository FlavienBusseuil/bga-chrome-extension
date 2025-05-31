import { i18n } from "../../../utils/browser/i18n";
interface Props {
    title: string;
    content: preact.ComponentChildren;
    later: () => void;
    close: () => void;
}

const InformationPopup = ({ title, content, later, close }: Props) => {
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