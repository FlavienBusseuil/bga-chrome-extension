// Script injected in the page context (not in the extension isolated world) for the game "nemesisretaliation"
// The game forces the dark theme in its "applyMenuTheme" function, which conflicts with the extension dark mode management

const nemesisClassName = 'nemesisretaliation';

const _patchNemesisClass = (gameClass: any) => {
  if (!gameClass?.prototype || gameClass.prototype.__bgaext_patched) {
    return;
  }

  gameClass.prototype.applyMenuTheme = function () {
    // the theme is managed by BGA and the extension
  };
  gameClass.prototype.__bgaext_patched = true;
  console.debug(`[bga extension] ${nemesisClassName}.applyMenuTheme replaced`);
};

const _initNemesisPatch = () => {
  const w = window as any;
  const bgagame = w.bgagame || (w.bgagame = {});

  if (bgagame[nemesisClassName]) {
    _patchNemesisClass(bgagame[nemesisClassName]);
    return;
  }

  // the game class is not declared yet: patch it as soon as dojo declares it
  let gameClass: any = undefined;
  Object.defineProperty(bgagame, nemesisClassName, {
    configurable: true,
    enumerable: true,
    get: () => gameClass,
    set: (value) => {
      gameClass = value;
      _patchNemesisClass(value);
    }
  });
};

_initNemesisPatch();
