// @flow
import { useEffect, useState } from "preact/hooks";

import Configuration, { Game } from "../../config/configuration";
import '../../../css/options.css';

const Options = (props: { config: Configuration }) => {
  const { config } = props;
  const [list, setList] = useState < Game[] > (config.getGamesList());
  const [selected, setSelected] = useState(list[0]);
  const [changed, setChanged] = useState(false);
  const [text, setText] = useState("");

  const serialize = (game: Game) => {
    return JSON.stringify(game, ['name', 'position', 'positionTop', 'positionBottom', 'left', 'playerPanel', 'playerPanelOffset', 'iconBackground', 'iconBorder', 'iconColor', 'iconShadow', 'customZoomContainer', 'css'], 2);
  };

  useEffect(() => setText(serialize(selected)), [selected])
  useEffect(() => setChanged(serialize(selected) !== text), [selected, text]);
  useEffect(() => {
    const newSelected = list.find(g => g.name === selected.name);
    if (newSelected) {
      setSelected({ ...newSelected });
    } else {
      setSelected(list[0]);
    }
  }, [list, selected.name]);

  const reset = () => {
    setList(config.resetGame(selected.name));
  };

  const save = () => {
    const game = JSON.parse(text);
    setList(config.saveGame(selected.name, game));
    setSelected(game);
  };

  const duplicate = () => {
    const newGame = { ...selected, name: `${selected.name}_copy` };
    setList(config.saveGame(newGame.name, newGame));
    setSelected(newGame);
  };

  const isCustomized = config.isCustomized(selected.name);
  const isDefault = config.isDefault(selected.name);
  const couldReset = changed || (isCustomized && isDefault);
  const couldDelete = isCustomized && !isDefault;

  return (
    <div className="bgext_options_main">
      <div className="bgext_options_config_area">
        <div className="bgext_options_title">Navigation between players' boards - Managed games list</div>
        <div className="bgext_options_container">
          <div className="bgext_options_gamelist_container">
            <div className="bgext_options_gamelist">
              {list.map((g, i) => {
                const className = selected.name === g.name ? "bgext_options_gameitem_selected" : "bgext_options_gameitem";
                return <div className={className} key={`game_${i}`} onClick={() => setSelected(g)}>{g.name}</div>;
              })}
            </div>
          </div>
          <div className="bgext_options_col_container">
            <div className="bgext_options_gameconfig_container">
              <textarea className="bgext_options_input" value={text} onChange={(evt) => setText(evt.target.value)} />
            </div>
            <div className="bgext_options_row_container">
              <button style={{ width: '100px' }} onClick={duplicate}>Duplicate</button>
              <button disabled={!couldReset} style={{ width: '100px' }} onClick={reset}>Reset</button>
              <button disabled={!couldDelete} style={{ width: '100px' }} onClick={reset}>Delete</button>
              <button disabled={!changed} style={{ width: '100px' }} onClick={save}>Save</button>
            </div>
          </div>
        </div>
        <div className="bgext_options_warning">
          Warning: only change the configuration on this screen if you really know what you're doing ;)
        </div>
      </div>
    </div>
  );
};

export default Options;
