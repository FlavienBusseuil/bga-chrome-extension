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

export { changeDarkColors };