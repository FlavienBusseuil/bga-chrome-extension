import rgbHex from "rgb-hex";

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1] as string, 16),
    g: parseInt(result[2] as string, 16),
    b: parseInt(result[3] as string, 16)
  } : null;
}

export const getColorForDarkMode = (color: string) => {
  const rgb = color.startsWith('#') ? hexToRgb(color) : hexToRgb(rgbHex(color));

  if (!rgb) {
    return { color, enlight: false };
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl[2] < 15) {
    return { color, enlight: true };
  }

  const treshold = Math.max(hsl[1] * 0.7, 50);

  if (hsl[2] > treshold) {
    return { color, enlight: false };
  }

  const rgbLight = hslToRgb(hsl[0], hsl[1], treshold);
  return { color: `#${rgbHex(rgbLight[0], rgbLight[1], rgbLight[2])}`, enlight: false };
};