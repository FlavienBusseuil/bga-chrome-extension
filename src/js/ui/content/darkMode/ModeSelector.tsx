import { useState, useEffect } from "preact/hooks";
import { isMobile } from "is-mobile";

import Configuration from "../../../config/configuration";
import { gamesWithCustomActions } from "../../../config/darkThemeGames";
import { gamesWithRecommendedConfig } from "../../../config/darkThemeRecommendedConfig";
import { getExtensionVersion } from "../../../utils/browser";
import { i18n } from "../../../utils/browser/i18n";
import { setDarkStyle } from "./darkStyleFunctions";
import { changeDarkBrightness, changeDarkColors } from "./darkColors";

import "../../../../css/darkModeSelector.css";
import "../../../../css/modeSelector.css";

interface ModeSelectorProps {
  config: Configuration;
  gameName: string;
}

let timer = 0;
let paletteContainer: any;
let paletteCursor: any;
let saturationCursor: any;
let cssCounter = 0;

const isDarkMode = (config: Configuration, gameName: string) => {
  const customActions = gamesWithCustomActions[gameName];

  if (customActions && customActions.isDarkMode) {
    try {
      return customActions.isDarkMode();
    }
    catch (error) { }
  }

  return config.isDarkMode();
}

const HUE_STEP = 16;
const SAT_STEP = 4;

const ModeSelector = (props: ModeSelectorProps) => {
  const { config, gameName } = props;
  const popupConfig = config.getPopupConfiguration();
  const recommandedConfig = gamesWithRecommendedConfig[gameName];
  const [darkMode, setDarkMode] = useState(isDarkMode(config, gameName));
  const [darkColorHue, setDarkColorHue] = useState(config.getDarkModeColor(gameName, recommandedConfig?.color));
  const [darkColorSaturation, setDarkColorSaturation] = useState(config.getDarkModeSaturation(gameName, recommandedConfig?.sat));
  const [brightness, setBrightness] = useState(config.getDarkModeBrightness());
  const [popupVisible, setPopupVisible] = useState(false);
  const [paletteCursorMoving, setPaletteCursorMoving] = useState(false);
  const [saturationCursorMoving, setSaturationCursorMoving] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [reportScreenshot, setReportScreenshot] = useState('');
  const [newMessageVisible, setNewMessageVisible] = useState(!isMobile() && gameName !== 'general' && popupConfig.reportMsg);
  const [resultVisible, setResultVisible] = useState(false);

  const hideNewMessage = (evt: any) => {
    setNewMessageVisible(false);
    popupConfig.reportMsg = false;
    config.setPopupConfiguration(popupConfig);
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  useEffect(() => setDarkStyle(gameName, darkMode), [gameName, darkMode]);

  useEffect(() => {
    if (darkColorHue === recommandedConfig?.color && darkColorSaturation === recommandedConfig?.sat) {
      config.clearDarkModeColor(gameName);
    } else {
      config.setDarkModeColor(gameName, darkColorHue, darkColorSaturation, Boolean(recommandedConfig));
    }
    changeDarkColors(darkColorHue, darkColorSaturation);
  }, [darkColorHue, darkColorSaturation]);

  useEffect(() => {
    if (brightness) {
      config.setDarkModeBrightness(brightness);
      changeDarkBrightness(brightness);
    }
  }, [brightness]);

  useEffect(() => {
    if (popupVisible) {
      setPaletteCursorPosition();
      setSaturationCursorPosition();
    }
  }, [popupVisible, darkColorHue, darkColorSaturation]);

  useEffect(() => {
    if (popupVisible && paletteCursorMoving) {
      document.addEventListener('mousemove', paletteCursorMove);
    }
    if (popupVisible && saturationCursorMoving) {
      document.addEventListener('mousemove', saturationCursorMove);
    }
    document.addEventListener('mouseup', cursorMouseUp);
    return () => {
      document.removeEventListener('mousemove', paletteCursorMove);
      document.removeEventListener('mousemove', saturationCursorMove);
      document.removeEventListener('mouseup', cursorMouseUp);
    };
  });

  const sendBugReport = () => {
    if (reportDescription) {
      const bugType = (gameName === 'general') ? 'Bug report (general)' : `Bug report for game "${gameName}"`;
      const msg = `${bugType}\n\n${reportDescription}\n\n${reportScreenshot}\n\nBrowser: ${navigator.userAgent}\n\nExtension version: ${getExtensionVersion()}`;
      const endPoint = '/message/board/add.html';
      const key = new Date().getTime();
      const body = new URLSearchParams({ type: 'group', message: msg, id: 18063230, "dojo.preventCache": key } as any).toString();
      const detail = JSON.stringify({ method: 'POST', endPoint, key, body, type: 'say' });
      document.body.dispatchEvent(new CustomEvent('bga_ext_api_call', { detail }));

      setReportDescription('');
      setReportScreenshot('');
      setResultVisible(true);
      setFormVisible(false);
    }
  }

  const setPaletteCursorPosition = () => {
    paletteCursor = document.getElementById("bgaext_palette_cursor");

    if (paletteCursor) {
      const cursPos = darkColorHue < 0 ? (512 + 16) : (darkColorHue * 2) + 16;

      paletteCursor.style.left = `${cursPos}px`;
      paletteCursor.style.display = "block";
    }
  };

  const setSaturationCursorPosition = () => {
    saturationCursor = document.getElementById("bgaext_saturation_cursor");

    if (saturationCursor) {
      const cursPos = (darkColorSaturation - 4) * SAT_STEP + 16;

      saturationCursor.style.left = `${cursPos}px`;
      saturationCursor.style.display = "block";
    }
  };

  (window as any).setDarkStyle = (val: boolean) => {
    if (darkMode !== val) {
      toggleDarkMode();
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);
    config.setDarkMode(newDarkMode);

    if (!newDarkMode) {
      setPopupVisible(false);
    }

    const customActions = gamesWithCustomActions[gameName];
    customActions && customActions.setDarkMode && customActions.setDarkMode(newDarkMode);

    if (window.location.pathname.startsWith("/forum")) {
      location.reload();
    } else if (!newDarkMode) {
      // refresh of the CSS to load the background image that was previously blocked
      const cssName = gameName === 'general' ? 'common.css' : 'gameserver.css';
      const link = Array.from(document.querySelectorAll("link")).find(l => l.href.indexOf(cssName) > 0)
      if (link) {
        setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 100);
        setTimeout(() => link.href = `${link.href.split('?')[0]}?${cssCounter++}`, 1000);
      }
    }
  };

  const paletteCursorMove = (evt: MouseEvent) => {
    const leftEdge = paletteContainer.getBoundingClientRect().left;
    const maxPos = 33 * 16;
    const pos = Math.min(Math.max(evt.clientX - leftEdge - 10, 16), maxPos) - 16;
    const hue = pos > 510 ? - 1 : Math.round(pos / 2);

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => setDarkColorHue(hue), 200);

    paletteCursor.style.left = `${pos + 16}px`;
  };

  const saturationCursorMove = (evt: MouseEvent) => {
    const leftEdge = paletteContainer.getBoundingClientRect().left;
    const maxPos = 33 * 16;
    const pos = Math.min(Math.max(evt.clientX - leftEdge - 10, 16), maxPos) - 16;

    const sat = Math.round(pos / SAT_STEP) + 4;

    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => setDarkColorSaturation(sat), 200);

    saturationCursor.style.left = `${pos + 16}px`;
  };

  const paletteClick = (evt: MouseEvent) => {
    paletteCursorMoveDown();
    paletteCursorMove(evt);
    cursorMouseUp();
  };

  const saturationClick = (evt: MouseEvent) => {
    saturationCursorMoveDown();
    saturationCursorMove(evt);
    cursorMouseUp();
  };

  const paletteCursorMoveDown = () => {
    paletteContainer = document.getElementById("bgaext_palette_container") as any;
    paletteCursor = document.getElementById("bgaext_palette_cursor") as any;
    setPaletteCursorMoving(true);
  };

  const saturationCursorMoveDown = () => {
    paletteContainer = document.getElementById("bgaext_palette_container") as any;
    saturationCursor = document.getElementById("bgaext_saturation_cursor") as any;
    setSaturationCursorMoving(true);
  };

  const cursorMouseUp = () => {
    setPaletteCursorMoving(false);
    setSaturationCursorMoving(false);
  }

  const togglePopupVisible = () => {
    if (newMessageVisible) {
      hideNewMessage(undefined);
    }
    setFormVisible(false);
    setResultVisible(false);
    setPopupVisible(!popupVisible);
  };

  const getMessageNew = () => {
    if (newMessageVisible) {
      return (
        <div class='bgaext_report_message' onClick={hideNewMessage}>
          <span>
            <i class="fa6 fa6-circle-xmark"></i>
            {i18n('bugReportNew')}
            <i class="fa fa-arrow-right"></i>
          </span>
          <span>({i18n('bugReportNewDetail')})</span>
        </div>
      );
    }

    return <></>;
  };

  const getIcon = () => {
    const style = (gameName === "general") ? "font-size: 32px; color: #01c4ca; cursor: pointer;" : "font-size: 24px; cursor: pointer;"

    if (darkMode) {
      return (
        <span onClick={toggleDarkMode}>
          {getMessageNew()}
          <i class="fa fa-moon-o" style={style}></i>
        </span>
      );
    }

    return (
      <span onClick={toggleDarkMode}>
        <i class="fa fa-sun-o" style={style}></i>
      </span>
    );
  };

  const getMenuIcon = () => {
    if (!darkMode) {
      return <></>;
    }

    const style = (gameName === "general") ? "font-size: 32px; color: #01c4ca; cursor: pointer; padding-right: 0.3em;" : "font-size: 24px; cursor: pointer; padding-right: 0.3em;"
    const icon = popupVisible ? <i class="fa fa-caret-up" style={style}></i> : <i class="fa fa-caret-down" style={style}></i>;

    return (
      <span onClick={togglePopupVisible}>
        {icon}
      </span>
    );
  };

  const getCells = () => {
    const result: preact.JSX.Element[] = [];
    const max = (512 / HUE_STEP) / 2;

    for (let i = 0; i < max; i++) {
      const startColor = `hsl(${i * HUE_STEP}, 50%, 50%)`;
      const endColor = `hsl(${(i + 1) * HUE_STEP}, 50%, 50%)`;
      const color = `linear-gradient(90deg, ${startColor}, ${endColor}`
      result.push(
        <div
          key={`color_${i}`}
          className="bgaext_palette_cell"
          style={{ background: color, width: HUE_STEP * 2 }}
          onClick={paletteClick}
          draggable={false}
          onDragStart={() => false}
        />
      );
    }

    result.push(
      <div
        key="color_black"
        className="bgaext_palette_cell"
        style={{ background: "#272a2f" }}
        onClick={() => setDarkColorHue(-1)}
        draggable={false}
        onDragStart={() => false}
      />
    );

    return result;
  };

  const getCursor = () => {
    return (
      <div id="bgaext_palette_cursor" draggable={false} onMouseDown={paletteCursorMoveDown} onDragStart={() => false} />
    );
  };

  const getSaturationCursor = () => {
    return (
      <div id="bgaext_saturation_cursor" draggable={false} onMouseDown={saturationCursorMoveDown} onDragStart={() => false} />
    );
  };

  const reset = () => {
    if (gameName === "general") {
      setDarkColorHue(-1);
      setDarkColorSaturation(15);
    } else {
      setDarkColorHue(config.getDarkModeColor("general"));
      setDarkColorSaturation(config.getDarkModeSaturation("general"));
    }
  };

  const setRecommanded = () => {
    if (recommandedConfig) {
      setDarkColorHue(recommandedConfig.color);
      setDarkColorSaturation(recommandedConfig.sat);
    }
  };

  const getReportForm = () => {
    if (resultVisible) {
      return (
        <>
          <div className="forms_container">
            <span dangerouslySetInnerHTML={{ __html: i18n('bugReportResult') }} />
          </div>
        </>
      );
    }

    if (formVisible) {
      let updateTimeout: any = 0;

      const updateReportDescription = () => {
        if (updateTimeout) {
          clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(() => setReportDescription((document.getElementById('ext-report-desc') as any).value), 100);
      }

      return (
        <>
          <div className="forms_container">
            <span>{i18n('bugReportDescription')}</span>
            <textarea
              id='ext-report-desc'
              value={reportDescription}
              onChange={(evt: any) => setReportDescription(evt.target.value)}
              onInput={updateReportDescription}
            />
            <span dangerouslySetInnerHTML={{ __html: i18n('bugReportScreenshot') }} />
            <input type="text" value={reportScreenshot} onChange={(evt: any) => setReportScreenshot(evt.target.value)} />
          </div>
          <div className="buttons_container">
            <a href="#" className={`bgabutton bgabutton_blue ${reportDescription ? '' : 'disabled'}`} onClick={sendBugReport}>
              {i18n('bugReportButtonSend')}
            </a>
            <a href="#" className="bgabutton bgabutton_blue" onClick={togglePopupVisible}>
              {i18n('bugReportButtonCancel')}
            </a>
          </div >
        </>
      );
    }

    const brightnessHandler = (evt: any) => evt.target && setBrightness(parseInt((evt.target as any).value));

    return (
      <div className="bgaext_palette_bottom">
        <div class="bgext_range_container">
          <span><i title={i18n("darkBrightnessInfo")} /> {i18n("darkBrightness")} {brightness}%</span>
          <input class="soundVolumeSlider" type="range" min="50" max="100" value={brightness} onChange={brightnessHandler} onInput={brightnessHandler}></input>
        </div>
        <a href="#" className="bgabutton bgabutton_blue" onClick={() => setFormVisible(true)}>
          <i class="fa fa-bug"></i>&nbsp;
          {i18n('bugReportButtonCreate')}
        </a>
      </div>
    );
  };

  const getPalette = () => {
    if (formVisible || resultVisible) {
      return <></>;
    }

    const color1 = `hsl(${darkColorHue}, 4%, 35%)`;
    const color2 = `hsl(${darkColorHue}, 124%, 35%)`;
    const saturationStyle = `background: linear-gradient(90deg, ${color1}, ${color2})`;
    const resetLinkText = (gameName === "general") ? i18n("darkColorResetMain") : i18n("darkColorResetGame");

    return (
      <>
        <div className="bgaext_palette" draggable={false} onDragStart={() => false}>
          {getCells()}
          {getCursor()}
        </div>
        {darkColorHue >= 0 && <div className="bgaext_saturation_selector" style={saturationStyle} onClick={saturationClick} draggable={false} onDragStart={() => false}>
          {getSaturationCursor()}
        </div>}
        <div className="bgaext_palette_bottom">
          {recommandedConfig && <a href="#" className="bga-ext-link" onClick={setRecommanded}>{i18n("darkColorRecommanded")}</a>}
          {!recommandedConfig && <span></span>}
          {darkColorHue >= 0 && <a href="#" className="bga-ext-link" onClick={reset}>{resetLinkText}</a>}
        </div>
      </>
    );
  };

  const getPopupContent = () => {
    if (popupVisible && darkMode) {
      const titleText = (formVisible || resultVisible) ? i18n('bugReportTitle') : (gameName === "general") ? i18n("darkColorConfigurationMain") : i18n("darkColorConfigurationGame");

      return (
        <div id="bgaext_palette_container" draggable={false} onDragStart={() => false}>
          <h2 class="bgaext_palette_title">{titleText}</h2>
          <div class="bgaext_closeicon" onClick={togglePopupVisible}><i class="fa fa-times-circle" aria-hidden="true"></i></div>
          {getPalette()}
          {getReportForm()}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <span className="bgaext_darkmode">
        {getMenuIcon()}
        {getIcon()}
      </span>
      {getPopupContent()}
    </>
  );
};

export default ModeSelector;