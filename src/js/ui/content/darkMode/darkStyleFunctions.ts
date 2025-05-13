import { isNumber } from "../../../utils/misc/isNumber";
import { waitForObj } from "../../../utils/misc/wait";
import { gamesWithConditionalCustomBackground, gamesWithCustomActions, gamesWithCustomBackground, gamesWithCustomDarkMode, gamesWithCustomPanel, gamesWithCustomPlayerStyle, gamesWithTwoTeams, playersBackground, playersBorder } from "../../../config/darkThemeGames";
import { PlayerData, getPlayersData, getPlayersPossibleColors } from "../players";
import { cookieName, createStyle, getFile } from "./darkStyleCommonFunctions";

const isDarkStyle = (mode: string) => {
  const customActions = gamesWithCustomActions[mode];
  return customActions && customActions.isDarkMode ? customActions.isDarkMode() : localStorage.getItem(cookieName) === "on";
}

const { cssList, mode }: { cssList: string[], mode: string } = (() => {
  const pageInfo = window.location.pathname.substring(1).split("/");
  if (pageInfo.length >= 2 && isNumber(pageInfo[0] as string)) {
    return { mode: pageInfo[1] as string, cssList: ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  if (pageInfo[0] === "tutorial") {
    const mode = window.location.search.substring(1).split('&').find(p => p.startsWith('game'))?.split('=')[1];
    return { mode: mode ?? 'general', cssList: ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  if (pageInfo[0] === "archive") {
    return { mode: "archive", cssList: ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/game.css"] };
  }

  return { mode: "general", cssList: ["light_theme/general.css", "dark_theme/background.css", "dark_theme/common.css", "dark_theme/chat.css", "dark_theme/icons.css", "dark_theme/general.css"] };
})();

const cssContents: Record<string, string> = {};
let styleComponent: HTMLStyleElement;

// hack to avoid light theme flashing
const darkThemeFlickerFixElementId = "ext_dark_theme_flicker_fix";
const applyBackgroundFlickerFix = (mode: string) => {
  const s = document.createElement('style');
  const htmlStyle = 'html { background: #000 !important; }';
  const bodyStyle = (mode == 'general') ? 'body { visibility: hidden !important; }' : '';
  s.id = darkThemeFlickerFixElementId;
  s.innerHTML = `${htmlStyle} ${bodyStyle}`;
  document.documentElement.appendChild(s);
};
if (document && isDarkStyle(mode)) {
  applyBackgroundFlickerFix(mode);
}

const removeBackgroundFlickerFix = () => {
  const s = document.getElementById(darkThemeFlickerFixElementId);
  if (s) {
    s.remove();
  }
}

Promise.all(cssList.map(file => getFile(file))).then(fileContents => {
  fileContents.forEach(({ file, content }) => cssContents[file] = content);

  styleComponent = createStyle();
  _setDarkStyleIfActivated();
});

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1] as string, 16)}, ${parseInt(result[2] as string, 16)}, ${parseInt(result[3] as string, 16)})` : hex;
};

const getDarkColorsStyle = (playersData: PlayerData[]) => {
  const getDeclaration = (color: string) => {
    return `[style*=";color:${color}"], [style*=";color: ${color}"], [style*="; color:${color}"], [style*="; color: ${color}"], [style^="color:${color}"], [style^="color: ${color}"]`
  }

  const getDeclarations = (color: string) => {
    const colorRgb = hexToRgb(color);
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
      return `.ext_player_${p.id} { color: ${p.color} !important; text-shadow: var(--text-w-shadow); }`;
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

const _setPlayersColor = (query: string, playersData: PlayerData[]) => {
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
};

const _setDarkStyleIfActivated = () => {
  try {
    const customActions = gamesWithCustomActions[mode];
    customActions && customActions.init && customActions.init();

    if (gamesWithCustomBackground.includes(mode)) {
      document.documentElement.classList.add("bgaext_cust_back");
    }

    if (isDarkStyle(mode)) {
      _setDarkStyle(mode);
    } else {
      _setLightStyle(mode);
    }
    removeBackgroundFlickerFix();
    initClassObserver(mode);
  }
  catch (error) {
    setTimeout(_setDarkStyleIfActivated, 100);
  }
};

const _applyDarkStyleForGame = (gameName: string,) => {
  const gameStyle = cssContents[`games/${gameName}/style.css`] || "";
  const gameDarkStyle = cssContents[`games/${gameName}/darkStyle.css`] || "";
  const backStyle = gamesWithCustomBackground.includes(gameName) ? "" : cssContents["dark_theme/background.css"];

  console.debug(`[bga extension] applying dark style for game`, gameName, gameStyle !== "", gameDarkStyle !== "", backStyle !== "");

  const completeStyle = `${backStyle}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/game.css"]}${gameDarkStyle}${gameStyle}`;
  styleComponent.innerHTML = completeStyle;

  if (!gamesWithCustomPanel.includes(gameName)) {
    document.documentElement.classList.add("darkpanel");
  }

  getPlayersData(gamesWithTwoTeams.includes(gameName)).then(playersData => {
    console.debug("[bga extension] players data", playersData);

    const possibleColors = [...playersData, ...getPlayersPossibleColors(gameName)];
    const colorsStyle = getDarkColorsStyle(possibleColors);
    const backStyle = playersBackground[gameName] ? playersBackground[gameName].map((rule: string) => {
      return playersData.filter(d => d.darkColor && d.darkColor !== d.color).map(d => {
        const ruleName = rule.replace('{{player_id}}', d.id.toString());
        return `${ruleName} { background-color: ${d.darkColor}!important; }`
      });
    }).flat().join(' ') : '';
    const borderStyle = playersBorder[gameName] ? playersBorder[gameName].map((rule: string) => {
      return playersData.filter(d => d.darkColor && d.darkColor !== d.color).map(d => {
        const ruleName = rule.replace('{{player_id}}', d.id.toString());
        return `${ruleName} { border-color: ${d.darkColor}!important; }`
      });
    }).flat().join(' ') : '';
    styleComponent.innerHTML = `${completeStyle}${colorsStyle}${backStyle}${borderStyle}`;

    if (gamesWithCustomPlayerStyle[gameName]) {
      _setPlayersColor(gamesWithCustomPlayerStyle[gameName], playersData);
    }
  });
}


const _setDarkStyleForGame = (gameName: string) => {
  const applyGeneralCss = !gamesWithCustomDarkMode[gameName] || gamesWithCustomDarkMode[gameName].applyGeneralCss;
  const classToAdd = gamesWithCustomDarkMode[gameName]?.className;

  if (applyGeneralCss) {
    const gameStyleFile = `games/${gameName}/style.css`;
    const gameDarkStyleFile = `games/${gameName}/darkStyle.css`;
    const gameStyle = cssContents[gameStyleFile];
    const gameDarkStyle = cssContents[gameDarkStyleFile];

    if (gameStyle === undefined || gameDarkStyle === undefined) {
      Promise.all([gameStyleFile, gameDarkStyleFile].map(file => getFile(file, true))).then(fileContents => {
        fileContents.forEach(({ file, content }) => cssContents[file] = content);

        _applyDarkStyleForGame(gameName);
      });
    } else {
      _applyDarkStyleForGame(gameName);
    }
  } else {
    const gameStyle = cssContents[`games/${gameName}/style.css`]
    if (gameStyle === undefined) {
      getFile(`games/${gameName}/style.css`, true).then(fileContent => {
        cssContents[fileContent.file] = fileContent.content;
        styleComponent.innerHTML = fileContent.content || "";
      });
    }
    else {
      styleComponent.innerHTML = gameStyle;
    }
  }

  if (classToAdd) {
    document.documentElement.classList.add(classToAdd)
  }
};

const _setDarkStyle = (mode: string) => {
  console.log(`[bga extension] set dark mode for ${mode}`);

  if (styleComponent) {
    if (mode === "archive") {
      styleComponent.innerHTML = "";

      waitForObj('[href*="table="]', 5).then((elt: any) => {
        const gameName = elt.href.substring(elt.href.lastIndexOf('/') + 1).split('?')[0];
        _setDarkStyleForGame(gameName);
      });
    } else if (mode === "general") {
      styleComponent.innerHTML = `${cssContents["dark_theme/background.css"]}${cssContents["dark_theme/icons.css"]}${cssContents["dark_theme/common.css"]}${cssContents["dark_theme/chat.css"]}${cssContents["dark_theme/general.css"]}`;
    } else {
      _setDarkStyleForGame(mode);
    }
  }

  document.documentElement.classList.add("darkmode");
};

const _applyLightStyleForGame = (generalStyle: string, gameStyle?: string) => {
  styleComponent.innerHTML = `${generalStyle}${gameStyle || ''}`;
  if (gamesWithCustomDarkMode[mode]) {
    document.documentElement.classList.remove(gamesWithCustomDarkMode[mode].className);
  }
}

const _setLightStyle = (mode: string) => {
  if (styleComponent) {
    const generalStyle = cssContents["light_theme/general.css"] as string;

    if (mode === "archive") {
      styleComponent.innerHTML = generalStyle;
      return;
    }

    if (mode === "general") {
      styleComponent.innerHTML = generalStyle;
    } else {
      const gameStyle = cssContents[`games/${mode}/style.css`];
      if (gameStyle === undefined) {
        getFile(`games/${mode}/style.css`, false).then(fileContents => { cssContents[fileContents.file] = fileContents.content; _applyLightStyleForGame(generalStyle, fileContents.content); });
      } else {
        _applyLightStyleForGame(generalStyle, gameStyle);
      }
    }
  }

  document.documentElement.classList.remove("darkmode");
  document.documentElement.classList.remove("darkpanel");
};

export const setDarkStyle = (mode: string, val: boolean) => {
  if (isDarkStyle(mode) === val) {
    return;
  }

  localStorage.setItem(cookieName, val ? "on" : "off");

  if (val) {
    _setDarkStyle(mode);
  } else {
    _setLightStyle(mode);
  }
};

const initClassObserver = (mode: string) => {
  if (mode === "general") {
    return;
  }

  // ensure that the "darkmode" class is well placed for games that used to manage their own dark mode like "Concept"
  // if the game try to remove the class "darkmode", it put it back immediately
  const observer = new MutationObserver(() => {
    const customDarkClass = gamesWithCustomDarkMode[mode]?.className;

    if (isDarkStyle(mode)) {
      if (!document.documentElement.classList.contains("darkmode")) {
        document.documentElement.classList.add("darkmode");
      }
      if (customDarkClass && !document.documentElement.classList.contains(customDarkClass)) {
        document.documentElement.classList.add(customDarkClass);
      }

      const classesList = gamesWithConditionalCustomBackground[mode];

      if (classesList) {
        if (classesList.find(c => document.documentElement.classList.contains(c))) {
          if (!document.documentElement.classList.contains("bgaext_cust_back")) {
            document.documentElement.classList.add("bgaext_cust_back");
          }
        } else if (document.documentElement.classList.contains("bgaext_cust_back")) {
          document.documentElement.classList.remove("bgaext_cust_back");
        }
      }
    } else {
      if (document.documentElement.classList.contains("darkmode")) {
        document.documentElement.classList.remove("darkmode");
      }
      if (customDarkClass && document.documentElement.classList.contains(customDarkClass)) {
        document.documentElement.classList.remove(customDarkClass);
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  return observer;
};