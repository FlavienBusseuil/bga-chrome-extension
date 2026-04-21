import { isNumber } from "../../../utils/misc/isNumber";
import { waitForObj } from "../../../utils/misc/wait";
import { hexToRgb } from "../../../utils/misc/colors";
import { gamesConfiguration } from "../../../config/darkThemeGames";
import { PlayerData, getPlayersData, getPlayersPossibleColors } from "../players";
import { cookieName, createStyle, getFile } from "./darkStyleCommonFunctions";

const darkThemeFlickerFixElementId = "bgaext-dark-theme-flicker-fix";
const pageInfo = window.location.pathname.substring(1).split("/");
const cssContents: Record<string, string> = {};

let themeStyleComponent: HTMLStyleElement;
let gameStyleComponent: HTMLStyleElement;
let playersStyleComponent: HTMLStyleElement;
let cssList: string[] = ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"];
let gameName: string = "general";
let mode: string = "general";

if (pageInfo.length >= 2 && isNumber(pageInfo[0] as string)) {
  mode = pageInfo[1] as string;
  gameName = mode;
} else if (pageInfo[0] === "tutorial") {
  mode = window.location.search.substring(1).split('&').find(p => p.startsWith('game'))?.split('=')[1] ?? 'general';
  gameName = mode;
} else if (pageInfo[0] === "archive") {
  mode = "archive";
} else {
  // General mode (website)
  cssList = ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/general.css"];
}

const isHtmlPage = pageInfo[pageInfo.length - 1]?.endsWith('.html');

const _init = async () => {
  const fileContentsTask = Promise.all(cssList.map(file => getFile(file)));

  if (mode === "archive") {
    const elt: any = await waitForObj('[href*="table="]');
    gameName = elt.href.substring(elt.href.lastIndexOf('/') + 1).split('?')[0];
  }

  const fileContents = await fileContentsTask;
  fileContents.forEach(({ file, content }) => cssContents[file] = content);
};

_init().then(() => {
  themeStyleComponent = createStyle();
  if (!isHtmlPage) {
    _setDarkStyleIfActivated();
  }

  if (gameName !== 'general') {
    const gameStyleFile = `games/${gameName}.css`;
    const gameStyle = cssContents[gameStyleFile];

    gameStyleComponent = createStyle('bgaext-game-style');
    playersStyleComponent = createStyle('bgaext-players-style');

    if (gameStyle !== undefined) {
      gameStyleComponent.textContent = gameStyle;
      return;
    }

    getFile(gameStyleFile, true).then(fileContent => {
      const { file, content } = fileContent;
      cssContents[file] = content;
      gameStyleComponent.textContent = cssContents[file];
    });
  }
});

const _isDarkStyle = async () => {
  const customActions = gamesConfiguration[gameName]?.customActions;
  return customActions && customActions.isDarkMode ? await customActions.isDarkMode() : localStorage.getItem(cookieName) === "on";
}

// hack to avoid light theme flashing
const _applyBackgroundFlickerFix = () => {
  const s = document.createElement('style');
  const htmlStyle = 'html { background: #000 !important; }';
  const bodyStyle = (mode == 'general') ? 'body { visibility: hidden !important; }' : '';
  s.id = darkThemeFlickerFixElementId;
  s.textContent = `${htmlStyle} ${bodyStyle}`;
  document.documentElement.appendChild(s);
};

try {
  if (document && !isHtmlPage) {
    _isDarkStyle().then(val => {
      val && _applyBackgroundFlickerFix();
    });
  }
}
catch (error) {
  console.log("[bga extension] Can't apply background flicker fix", error);
}

const _removeBackgroundFlickerFix = () => {
  const s = document.getElementById(darkThemeFlickerFixElementId);
  if (s) {
    s.remove();
  }
};

const _hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1] as string, 16)}, ${parseInt(result[2] as string, 16)}, ${parseInt(result[3] as string, 16)})` : hex;
};

const _getDarkColorsStyle = (playersData: PlayerData[]) => {
  const getDeclaration = (color: string) => {
    return `[color="${color}"], [style*=";color:${color}"], [style*=";color: ${color}"], [style*="; color:${color}"], [style*="; color: ${color}"], [style^="color:${color}"], [style^="color: ${color}"]`
  }

  const getDeclarations = (color: string) => {
    const colorRgb = _hexToRgb(color);
    const colorUp = color.toUpperCase();

    const declaration = [getDeclaration(color), getDeclaration(colorRgb)];
    if (color !== colorUp) {
      declaration.push(getDeclaration(colorUp))
    }

    return declaration.join(', ');
  };

  const colorsMapFiltered = playersData.filter(p => p.darkColor);
  const mappingStyle = colorsMapFiltered.length ? colorsMapFiltered.map(p => {
    return `${getDeclarations(p.color)} { color: ${p.darkColor} !important; }`;
  }).join(" ") : "";

  const colorsToEnlightFiltered = playersData.filter(p => p.darkEnlight);
  const enlightStyle = colorsToEnlightFiltered.length
    ? `${colorsToEnlightFiltered.map((p) => getDeclarations(p.color)).join(', ')} { text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white !important; }`
    : "";

  const playerColorsCss = playersData.map(p => {
    if (p.darkEnlight) {
      return `.ext_player_${p.id} { color: ${p.color} !important; text-shadow: var(--text-w-shadow)!important; }`;
    }
    return `.ext_player_${p.id} { color: ${p.darkColor || p.color} !important; }`;
  }).join(" ");

  return `${mappingStyle} ${enlightStyle} ${playerColorsCss}`;
};

const _checkContent = (elt: any, text: string) => {
  const toSearch = text.trim().toLowerCase();
  const eltContent = elt.innerText.trim().toLowerCase();

  if (eltContent.startsWith(toSearch) || eltContent.endsWith(toSearch)) {
    return true;
  }

  const beforeText = getComputedStyle(elt, ':before').getPropertyValue('content') || '';
  if (beforeText.trim().replace('"', '').toLowerCase().startsWith(toSearch)) {
    return true;
  }

  return false;
};

const _setPlayersColor = (query: string | undefined, playersData: PlayerData[]) => {
  if (query) {
    const elements = document.querySelectorAll(query);

    let ok = false;
    elements.forEach((elt: any) => {
      const data = playersData.find(p => _checkContent(elt, p.name));
      if (data) {
        elt.classList.add(`ext_player_${data.id}`);
        ok = true;
      }
    });

    if (!ok) {
      setTimeout(() => _setPlayersColor(query, playersData), 100);
      return;
    }
  }
};

const _getCssPath = (file: string) => {
  const links = document.querySelectorAll('link[rel="stylesheet"]');

  for (const link of links) {
    const href = link.getAttribute('href');

    if (href && href.endsWith(file)) {
      const cssUrl = (link as any).href as string;
      return cssUrl.replace(file, '');
    }
  }

  return '';
};

const _getDefaultBackgroundStyle = (src: HTMLElement) => {
  const backStyle = getComputedStyle(src).background;
  return (backStyle.indexOf('back-main_games') > 0 || backStyle.indexOf('none') >= 0 || backStyle.indexOf('base64') >= 0) ? undefined : backStyle;
};

const _copyDefaultBackgroundStyle = (overlay: HTMLElement, cssPath: string, attempt: number) => {
  const backStyle = _getDefaultBackgroundStyle(document.documentElement) || _getDefaultBackgroundStyle(document.body) || _getDefaultBackgroundStyle(document.querySelector('#overall-content') || document.body);

  if (backStyle) {
    const absoluteCssString = backStyle.replace(/url\(['"]?([^'"]+)['"]?\)/g, (match, relPath) => {
      try {
        const absoluteUrl = new URL(relPath, cssPath).href;
        return `url("${absoluteUrl}")`;
      } catch (e) {
        return match;
      }
    });
    overlay.style.background = absoluteCssString;
  } else if (attempt < 20) {
    setTimeout(() => _copyDefaultBackgroundStyle(overlay, cssPath, attempt + 1), 100);
  }
};

const _addInvertOverlay = (cssPath: string) => {
  waitForObj('#overall-content').then(overallContent => {
    const overlay = document.createElement("DIV");
    overlay.className = `bgaext_overlay`;
    _copyDefaultBackgroundStyle(overlay, cssPath, 0);
    overallContent.insertBefore(overlay, overallContent.firstChild);
  });
};

const _setDarkStyleIfActivated = () => {
  waitForObj('#overall-content').then(() => {
    const config = gamesConfiguration[gameName];
    const customActions = config?.customActions;
    const hasCustomAction = Boolean(customActions && customActions.init);
    const hasOverlay = Boolean(config?.overlay);

    if (hasCustomAction || hasOverlay) {
      const cssPath = _getCssPath(`${gameName}.css`);
      console.debug(`[bga extension] ${gameName} css path is '${cssPath}'`);

      if (hasCustomAction) {
        customActions!.init(cssPath);
      } else {
        document.body.style.setProperty("--ext-game-back", `url(${cssPath}img/background.jpg)`);
      }
      hasOverlay && _addInvertOverlay(cssPath)
    }

    _isDarkStyle().then(darkMode => {
      if (darkMode) {
        _setDarkStyle();
      } else {
        _setLightStyle();
      }

      _manageHtmlTag();
      _removeBackgroundFlickerFix();
      _initClassObserver();
    });
  });
};

const _applyDarkStyleForGame = () => {
  const config = gamesConfiguration[gameName];
  const applyGeneralCss = !(config?.customDarkMode) || config.customDarkMode?.applyGeneralCss;
  const backStyle = applyGeneralCss && config?.customBack === true ? "" : cssContents["dark_theme/background.css"];

  console.debug(`[bga extension] applying dark style for game`, { gameName, applyGeneralCss, backStyle: backStyle !== "" });

  themeStyleComponent.textContent = applyGeneralCss
    ? `${backStyle}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/game.css"]}`
    : `${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/chat.css"]}`;

  getPlayersData(config?.twoTeams || false).then(playersData => {
    console.debug("[bga extension] players data", playersData);

    const toRgb = (color: string) => {
      const val = hexToRgb(color);
      return val ? `rgb(${val.r}, ${val.g}, ${val.b})` : color;
    }

    const getRule = (rule: string, d: PlayerData, i: number) => {
      return rule.replace('{{player_id}}', d.id.toString())
        .replace('{{player_index}}', i.toString())
        .replace('{{player_color}}', d.color.substring(1))
        .replace('{{player_color_cap}}', d.color.substring(1).toUpperCase())
        .replace("{{player_color_rgb}}", toRgb(d.color))
        .replace('{{player_index_1}}', (i + 1).toString());
    }

    const possibleColors = [...playersData, ...getPlayersPossibleColors(gameName)];
    const colorsStyle = _getDarkColorsStyle(possibleColors);
    const backStyle = config?.playersBack?.map((rule: string) => {
      return playersData.filter(d => d.darkColor && d.darkColor !== d.color).map((d, i) => {
        const ruleName = getRule(rule, d, i);
        return `${ruleName} { background-color: ${d.darkColor}!important; }`;
      });
    }).flat().join(' ') || '';
    const borderStyle = config?.playersBorder?.map((rule: string) => {
      return playersData.map((d, i) => {
        if (d.darkColor && d.darkColor !== d.color) {
          const ruleName = getRule(rule, d, i);
          return `${ruleName} { border-color: ${d.darkColor}!important; }`;
        }
        return undefined;
      }).filter(d => d);
    }).flat().join(' ') || '';
    const outlineStyle = config?.playersOutline?.map((rule: string) => {
      return playersData.map((d, i) => {
        if (d.darkColor && d.darkColor !== d.color) {
          const ruleName = getRule(rule, d, i);
          return `${ruleName} { outline-color: ${d.darkColor}!important; }`;
        }
        return undefined;
      }).filter(d => d);
    }).flat().join(' ') || '';
    const textStyle = config?.playersTextColor?.map((rule: string) => {
      return playersData.map((d, i) => {
        const ruleName = getRule(rule, d, i);
        const enlightRule = d.darkEnlight ? 'text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white !important;' : '';
        return `${ruleName} { color: ${d.darkColor || d.color}!important;${enlightRule} }`;
      });
    }).flat().join(' ') || '';

    playersStyleComponent.textContent = `${colorsStyle}${backStyle}${borderStyle}${outlineStyle}${textStyle}`;

    _setPlayersColor(config?.customPlayerStyle, playersData);
  });
}

const _setDarkStyle = () => {
  console.log(`[bga extension] set dark mode for ${mode}`);

  if (gameName !== 'general') {
    _applyDarkStyleForGame();
  } else {
    themeStyleComponent.textContent = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/general.css"]}`;
  }
};

const _setLightStyle = () => {
  const generalStyle = cssContents["light_theme/general.css"] as string;

  if (themeStyleComponent) {
    themeStyleComponent.textContent = generalStyle;
  }

  if (playersStyleComponent) {
    playersStyleComponent.textContent = '';
  }
};

let _manageHtmlTagTimeout: any = 0;

const _manageHtmlTag = () => {
  // ensure that the "darkmode" class is well placed for games that used to manage their own dark mode like "Concept"
  // if the game try to remove the class "darkmode", it put it back immediately

  try {
    const theme = document.documentElement.dataset.theme; // new attribute, BGA slowly starts to manage dark mode !
    const config = gameName ? gamesConfiguration[gameName] : undefined;
    const customDarkClass = config?.customDarkMode?.className;
    const classesList = Array.isArray(config?.customBack) ? config.customBack : [];

    if (classesList) {
      if (classesList.find(c => document.documentElement.classList.contains(c))) {
        if (!document.documentElement.classList.contains("bgaext_cust_back")) {
          document.documentElement.classList.add("bgaext_cust_back");
        }
      } else if (document.documentElement.classList.contains("bgaext_cust_back")) {
        document.documentElement.classList.remove("bgaext_cust_back");
      }
    } else if (config?.customBack && !document.documentElement.classList.contains("bgaext_cust_back")) {
      document.documentElement.classList.add("bgaext_cust_back");
    }

    _isDarkStyle().then(darkMode => {
      if (darkMode) {
        if (theme !== 'dark') {
          document.documentElement.dataset.theme = 'dark';
        }

        if (!document.documentElement.classList.contains("darkmode")) {
          document.documentElement.classList.add("darkmode");
        }
        if (customDarkClass && !document.documentElement.classList.contains(customDarkClass)) {
          document.documentElement.classList.add(customDarkClass);
        }

        if (gameName && !config?.customPanel && !document.documentElement.classList.contains("darkpanel")) {
          document.documentElement.classList.add("darkpanel");
        }
      } else {
        if (theme !== 'light') {
          document.documentElement.dataset.theme = 'light';
        }

        if (document.documentElement.classList.contains("darkmode")) {
          document.documentElement.classList.remove("darkmode");
        }
        if (customDarkClass && document.documentElement.classList.contains(customDarkClass)) {
          document.documentElement.classList.remove(customDarkClass);
        }
        if (document.documentElement.classList.contains("darkpanel")) {
          document.documentElement.classList.remove("darkpanel");
        }
      }
    });
  }
  catch (error) {
    console.error("[bga extension] Error in dark mode observer", error);
  }
};

const _initClassObserver = () => {
  const observer = new MutationObserver(() => {
    if (_manageHtmlTagTimeout) {
      clearTimeout(_manageHtmlTagTimeout);
    }
    _manageHtmlTagTimeout = setTimeout(_manageHtmlTag, 100);
  });
  observer.observe(document.documentElement, { attributes: true });
  return observer;
};

export const setDarkStyle = (newMode: string, val: boolean) => {
  mode = newMode;

  _isDarkStyle().then(darkMode => {
    if (darkMode !== val) {
      localStorage.setItem(cookieName, val ? "on" : "off");

      if (val) {
        _setDarkStyle();
      } else {
        _setLightStyle();
      }

      _manageHtmlTag();
    }
  });
};