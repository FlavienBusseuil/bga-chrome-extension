const STYLE_ELT_ID = 'bgaext-theme-colors';

const changeDarkColors = (hue: number, saturation: number) => {
  let style = document.getElementById(STYLE_ELT_ID);

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ELT_ID;
    document.head.appendChild(style);
  }

  if (hue < 0) {
    style.textContent = '';
  } else {
    style.textContent = `
html.bgaext_dark body {
  --dark-10: hsl(${hue}, ${saturation}%, 13%);
  --dark-20: hsl(${hue}, ${saturation}%, 17%);
  --dark-30: hsl(${hue}, ${saturation - 4}%, 22%);
  --dark-40: hsl(${hue}, ${saturation - 4}%, 26%);
  --dark-back: hsl(${hue}, ${saturation}%, 15%, 0.75);
  --dark-back-50: hsl(${hue}, ${saturation - 4}%, 22%, 0.5);
}
html.dark body {
  --palette-bga-whitebg: hsl(${hue}, ${saturation - 1}%, 17.84%);
  --palette-bga-gray-200: hsl(${hue}, ${saturation - 2.1}%, 21.57%);
  --palette-bga-gray-204: hsl(${hue}, ${saturation - 2.1}%, 23.33%);
  --palette-bga-gray-211: hsl(${hue}, ${saturation - 4.8}%, 23.92%);
  --palette-bga-gray-233: hsl(${hue}, ${saturation + 3.5}%, 28.24%);
  --palette-bga-gray-244: hsl(${hue}, ${saturation - 3.8}%, 27.65%);
  --palette-bga-gray-300: hsl(${hue}, ${saturation - 3.45}%, 30.78%);
}`;
  }
};

const changeDarkBrightness = (val: number) => {
  if (val === 90) {
    document.body.style.removeProperty("--ext-bright");
    document.body.style.removeProperty("--ext-alpha");
  } else {
    const brightness = val / 100;
    const alpha = Math.round((1 - brightness) * 255).toString(16).padStart(2, '0').toUpperCase();
    document.body.style.setProperty("--ext-bright", `brightness(${brightness})`);
    document.body.style.setProperty("--ext-alpha", `#000000${alpha}`);
  }
};

export { changeDarkColors, changeDarkBrightness };