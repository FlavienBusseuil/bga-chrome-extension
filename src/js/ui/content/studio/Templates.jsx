// @flow
import { useEffect, useState } from "preact/hooks";

import Configuration from "../../../config/configuration";
import '../../../../css/studio.css';

const config = new Configuration();

interface TemplatesProps {
  gameName: string,
}

const Templates = (props: TemplatesProps) => {
  const [configMode, setConfigMode] = useState(false);
  const [templates, setTemplates] = useState();

  useEffect(() => {
    try {
      config.init().then(() => {
        setTemplates(config.listTemplates());
      });
    }
    catch (error) { }
  }, []);

  const toggleConfig = () => setConfigMode(!configMode);
  const getTemplates = () => templates ? templates.filter(t => [props.gameName, 'all'].includes(t.game)) : [];

  const addTemplate = () => {
    setTemplates(config.addTemplate({ name: 'my sentence name', text: 'my sentence text', game: props.gameName }));
  };

  const useTemplate = () => {
    const textArea = document.getElementById('report_log');
    const templateInput = document.getElementById('templates_input');

    if (textArea && templateInput && templateInput.value) {
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;
      const text = textArea.value;

      const newText = `${text.substring(0, selectionStart)}${templateInput.value}${text.substring(selectionEnd)}`;
      textArea.value = newText;
    }
  };

  const getOptions = () => {
    if (!templates) {
      return <></>;
    }

    return getTemplates().map((t, index) => {
      return <option key={`o_${index}`} value={t.text}>{t.name}</option>;
    });
  };

  const getSentences = () => {
    if (!templates) {
      return <></>;
    }

    return getTemplates().map((t, index) => {
      const updateTemplate = (name: string, text: string, game: string) => {
        setTemplates(config.updateTemplate(t.name, t.game, { game, name, text }));
      };

      const removeTemplate = () => {
        setTemplates(config.removeTemplate(t));
      };

      const checkId = `c_${index}`;

      return (
        <div className='bgext_studio_sentence' key={`s_${index}`}>
          <div className='bgext_studio_sentence_name'>
            <input value={t.name} onChange={(evt) => updateTemplate(evt.target.value, t.text, t.game)} />
          </div>
          <div className='bgext_studio_sentence_text'>
            <textarea value={t.text} onChange={(evt) => updateTemplate(t.name, evt.target.value, t.game)} />
          </div>
          <div className='bgext_studio_sentence_game'>
            <input type='checkbox' checked={t.game === 'all'} id={checkId} onChange={(evt) => updateTemplate(t.name, t.text, evt.target.checked ? 'all' : props.gameName)} />
            <label htmlFor={checkId}>all games</label>
          </div>
          <div className='bgext_studio_sentence_action'>
            <a className="bgabutton bgabutton_blue" style={{ margin: '0px' }} onClick={removeTemplate}>remove</a>
          </div>
        </div>
      );
    });
  }

  const existsTemplates = getTemplates().length > 0;

  if (configMode) {
    return (
      <div className='bgext_studio_row'>
        <h3 className="pagesection__title" style={{ paddingLeft: '2em' }}>Template messages</h3>
        <div className='bgext_studio_big_container'>
          {existsTemplates && <div className='bgext_studio_sentences'>
            <div className='bgext_studio_sentence'>
              <div className='bgext_studio_sentence_name'>
                <div className='bgext_studio_sentence_col_title'>Name</div>
              </div>
              <div className='bgext_studio_sentence_text'>
                <div className='bgext_studio_sentence_col_title'>Text</div>
              </div>
              <div className='bgext_studio_sentence_game'></div>
              <div className='bgext_studio_sentence_action'></div>
            </div>
            {getSentences()}
          </div>}
          {!existsTemplates && <span>No templates found</span>}
        </div>
        <div className='bgext_studio_sentence_hor_buts'>
          <a className="bgabutton bgabutton_blue" onClick={addTemplate}>add new template</a>
          <a className="bgabutton bgabutton_blue" onClick={toggleConfig}>close</a>
        </div>
      </div>
    );
  }

  return (
    <div className='bgext_studio_container'>
      <div className='bgext_studio_select_container'>
        {existsTemplates && <select id='templates_input'>{getOptions()}</select>}
        {!existsTemplates && <div className='bgext_studio_no_template'>No templates found</div>}
      </div>
      {existsTemplates && <a className="bgabutton bgabutton_blue" onClick={useTemplate}>insert this template</a>}
      <a className="bgabutton bgabutton_blue" onClick={toggleConfig}>config</a>
    </div>
  );

};

export default Templates;