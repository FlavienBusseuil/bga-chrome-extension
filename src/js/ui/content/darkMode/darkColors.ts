const changeDarkColors = (hue: number, saturation: number) => {
  if (hue < 0) {
    document.body.style.removeProperty("--dark-10");
    document.body.style.removeProperty("--dark-20");
    document.body.style.removeProperty("--dark-30");
    document.body.style.removeProperty("--dark-40");
    document.body.style.removeProperty("--dark-back");
    document.body.style.removeProperty("--dark-popup-back");
  } else {
    document.body.style.setProperty("--dark-10", `hsl(${hue}, ${saturation}%, 13%)`);
    document.body.style.setProperty("--dark-20", `hsl(${hue}, ${saturation}%, 17%)`);
    document.body.style.setProperty("--dark-30", `hsl(${hue}, ${saturation - 4}%, 22%)`);
    document.body.style.setProperty("--dark-40", `hsl(${hue}, ${saturation - 4}%, 26%)`);
    document.body.style.setProperty("--dark-back", `hsl(${hue}, ${saturation}%, 15%, 0.75)`);
    document.body.style.setProperty("--dark-popup-back", `hsl(${hue}, ${saturation - 4}%, 22%)`);
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