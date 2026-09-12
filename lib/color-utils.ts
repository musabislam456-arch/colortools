/**
 * ColorTools Studio - Core Color Math & Utility Library
 * Precision color conversions, WCAG 2.1 contrast formulas,
 * color harmonies, and color blindness simulation matrices.
 */

export interface RgbColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface HslColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface HsvColor {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

export interface CmykColor {
  c: number; // 0-100
  m: number; // 0-100
  y: number; // 0-100
  k: number; // 0-100
}

export interface ContrastResult {
  ratio: number;
  ratioFormatted: string;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  uiComponents: boolean;
  fgLuminance: number;
  bgLuminance: number;
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'tetradic'
  | 'monochromatic'
  | 'split-complementary'
  | 'studio-curated';

export type ColorBlindnessType =
  | 'normal'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia';

// Normalize hex
export function normalizeHex(hex: string): string {
  let clean = hex.trim().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) {
    return '000000';
  }
  return clean.toUpperCase();
}

export function isValidHex(hex: string): boolean {
  const clean = hex.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(clean);
}

export function hexToRgb(hex: string): RgbColor {
  const clean = normalizeHex(hex);
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HslColor): RgbColor {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;
  const hFraction = hNorm / 360;

  const r = hue2rgb(p, q, hFraction + 1 / 3);
  const g = hue2rgb(p, q, hFraction);
  const b = hue2rgb(p, q, hFraction - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function rgbToHsv({ r, g, b }: RgbColor): HsvColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) * 60;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

export function hsvToRgb({ h, s, v }: HsvColor): RgbColor {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const vNorm = Math.max(0, Math.min(100, v)) / 100;

  const c = vNorm * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = vNorm - c;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm >= 0 && hNorm < 60) {
    rPrime = c;
    gPrime = x;
  } else if (hNorm >= 60 && hNorm < 120) {
    rPrime = x;
    gPrime = c;
  } else if (hNorm >= 120 && hNorm < 180) {
    gPrime = c;
    bPrime = x;
  } else if (hNorm >= 180 && hNorm < 240) {
    gPrime = x;
    bPrime = c;
  } else if (hNorm >= 240 && hNorm < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

export function rgbToCmyk({ r, g, b }: RgbColor): CmykColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb({ c, m, y, k }: CmykColor): RgbColor {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;

  const r = 255 * (1 - cNorm) * (1 - kNorm);
  const g = 255 * (1 - mNorm) * (1 - kNorm);
  const b = 255 * (1 - yNorm) * (1 - kNorm);

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

/**
 * W3C WCAG 2.1 Relative Luminance calculation
 * Formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * where channel = c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4
 */
export function getRelativeLuminance(rgb: RgbColor): number {
  const sRgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRgb[0] + 0.7152 * sRgb[1] + 0.0722 * sRgb[2];
}

/**
 * WCAG 2.1 Contrast Ratio formula: (L1 + 0.05) / (L2 + 0.05)
 */
export function getContrastRatio(fgHex: string, bgHex: string): ContrastResult {
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);

  const fgL = getRelativeLuminance(fgRgb);
  const bgL = getRelativeLuminance(bgRgb);

  const l1 = Math.max(fgL, bgL);
  const l2 = Math.min(fgL, bgL);

  const ratio = (l1 + 0.05) / (l2 + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  return {
    ratio: roundedRatio,
    ratioFormatted: `${roundedRatio.toFixed(2)}:1`,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
    uiComponents: ratio >= 3.0,
    fgLuminance: fgL,
    bgLuminance: bgL,
  };
}

/**
 * Auto-adjust foreground or background to reach target contrast ratio
 */
export function autoFixContrast(
  fgHex: string,
  bgHex: string,
  targetRatio = 4.5
): string {
  const bgRgb = hexToRgb(bgHex);
  const bgL = getRelativeLuminance(bgRgb);
  const fgHsl = rgbToHsl(hexToRgb(fgHex));

  // Determine if we need to go darker or lighter
  const preferLight = bgL < 0.5;

  let bestHex = fgHex;
  let minDiff = Infinity;

  // Search lightness steps from 0 to 100
  for (let l = preferLight ? 50 : 0; preferLight ? l <= 100 : l <= 50; l += 1) {
    const testRgb = hslToRgb({ h: fgHsl.h, s: fgHsl.s, l });
    const testHex = rgbToHex(testRgb);
    const testL = getRelativeLuminance(testRgb);
    const ratio =
      (Math.max(testL, bgL) + 0.05) / (Math.min(testL, bgL) + 0.05);

    if (ratio >= targetRatio) {
      const diff = Math.abs(ratio - targetRatio);
      if (diff < minDiff) {
        minDiff = diff;
        bestHex = testHex;
      }
    }
  }

  // Fallback to pure black or pure white if saturation doesn't yield ratio
  if (minDiff === Infinity) {
    return preferLight ? '#FFFFFF' : '#000000';
  }

  return bestHex;
}

/**
 * Generate Harmonic Color Palettes from a single base Hex
 */
export function generateHarmonies(
  baseHex: string,
  type: HarmonyType
): string[] {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb);
  const { h, s, l } = hsl;

  const clampL = (val: number) => Math.max(12, Math.min(92, val));
  const clampS = (val: number) => Math.max(20, Math.min(95, val));

  switch (type) {
    case 'complementary': {
      const compHue = (h + 180) % 360;
      return [
        baseHex,
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.7), l: clampL(l + 20) })),
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.9), l: clampL(l - 20) })),
        rgbToHex(hslToRgb({ h: compHue, s, l })),
        rgbToHex(hslToRgb({ h: compHue, s: clampS(s * 0.8), l: clampL(l + 25) })),
      ];
    }
    case 'analogous': {
      return [
        rgbToHex(hslToRgb({ h: (h - 40 + 360) % 360, s, l })),
        rgbToHex(hslToRgb({ h: (h - 20 + 360) % 360, s, l })),
        baseHex,
        rgbToHex(hslToRgb({ h: (h + 20) % 360, s, l })),
        rgbToHex(hslToRgb({ h: (h + 40) % 360, s, l })),
      ];
    }
    case 'triadic': {
      const h2 = (h + 120) % 360;
      const h3 = (h + 240) % 360;
      return [
        baseHex,
        rgbToHex(hslToRgb({ h: h2, s, l })),
        rgbToHex(hslToRgb({ h: h3, s, l })),
        rgbToHex(hslToRgb({ h: h2, s: clampS(s * 0.75), l: clampL(l + 20) })),
        rgbToHex(hslToRgb({ h: h3, s: clampS(s * 0.75), l: clampL(l - 15) })),
      ];
    }
    case 'tetradic': {
      const h2 = (h + 90) % 360;
      const h3 = (h + 180) % 360;
      const h4 = (h + 270) % 360;
      return [
        baseHex,
        rgbToHex(hslToRgb({ h: h2, s, l })),
        rgbToHex(hslToRgb({ h: h3, s, l })),
        rgbToHex(hslToRgb({ h: h4, s, l })),
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.5), l: clampL(l > 50 ? 20 : 85) })),
      ];
    }
    case 'monochromatic': {
      return [
        rgbToHex(hslToRgb({ h, s, l: clampL(l > 50 ? l - 35 : l + 45) })),
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.85), l: clampL(l > 50 ? l - 20 : l + 25) })),
        baseHex,
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.9), l: clampL(l > 50 ? l + 15 : l - 15) })),
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.7), l: clampL(l > 50 ? l + 30 : l - 30) })),
      ];
    }
    case 'split-complementary': {
      const h2 = (h + 150) % 360;
      const h3 = (h + 210) % 360;
      return [
        baseHex,
        rgbToHex(hslToRgb({ h: h2, s, l })),
        rgbToHex(hslToRgb({ h: h3, s, l })),
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.6), l: clampL(l + 24) })),
        rgbToHex(hslToRgb({ h: h2, s: clampS(s * 0.8), l: clampL(l - 18) })),
      ];
    }
    case 'studio-curated':
    default: {
      // High-end agency 5-color aesthetic balance: Base Primary, Secondary Vibrant, Accent Pop, Deep Shade, Neutral Tint
      const popHue = (h + 155) % 360;
      const analogHue = (h + 35) % 360;
      return [
        baseHex, // Primary Anchor
        rgbToHex(hslToRgb({ h: analogHue, s: clampS(s * 1.05), l: clampL(l > 50 ? l - 8 : l + 12) })), // Harmony
        rgbToHex(hslToRgb({ h: popHue, s: 95, l: 60 })), // Vibrant High-Chroma Pop
        rgbToHex(hslToRgb({ h, s: clampS(s * 0.4), l: 14 })), // Deep Obsidian Shade
        rgbToHex(hslToRgb({ h: analogHue, s: 25, l: 94 })), // Refined Soft Surface Tint
      ];
    }
  }
}

/**
 * Generate 9-step Tints & Shades ramp for design systems
 */
export function generateTintsAndShades(hex: string): {
  tints: { pct: number; hex: string }[];
  shades: { pct: number; hex: string }[];
} {
  const rgb = hexToRgb(hex);

  // Tints mix with pure white (255, 255, 255)
  const tints = [10, 25, 40, 60, 75, 90].map((pct) => {
    const factor = pct / 100;
    const r = Math.round(rgb.r + (255 - rgb.r) * factor);
    const g = Math.round(rgb.g + (255 - rgb.g) * factor);
    const b = Math.round(rgb.b + (255 - rgb.b) * factor);
    return { pct, hex: rgbToHex({ r, g, b }) };
  });

  // Shades mix with pure black (0, 0, 0)
  const shades = [10, 25, 40, 60, 75, 90].map((pct) => {
    const factor = 1 - pct / 100;
    const r = Math.round(rgb.r * factor);
    const g = Math.round(rgb.g * factor);
    const b = Math.round(rgb.b * factor);
    return { pct, hex: rgbToHex({ r, g, b }) };
  });

  return { tints, shades };
}

/**
 * Color Blindness Simulation
 * Standard matrices for common CVD types
 */
export function simulateColorBlindness(
  hex: string,
  type: ColorBlindnessType
): string {
  if (type === 'normal') return hex;

  const { r, g, b } = hexToRgb(hex);
  let simR = r;
  let simG = g;
  let simB = b;

  switch (type) {
    case 'protanopia': // Red-weak/blind
      simR = 0.56667 * r + 0.43333 * g + 0.0 * b;
      simG = 0.55833 * r + 0.44167 * g + 0.0 * b;
      simB = 0.0 * r + 0.24167 * g + 0.75833 * b;
      break;
    case 'deuteranopia': // Green-weak/blind
      simR = 0.625 * r + 0.375 * g + 0.0 * b;
      simG = 0.7 * r + 0.3 * g + 0.0 * b;
      simB = 0.0 * r + 0.3 * g + 0.7 * b;
      break;
    case 'tritanopia': // Blue-weak/blind
      simR = 0.95 * r + 0.05 * g + 0.0 * b;
      simG = 0.0 * r + 0.43333 * g + 0.56667 * b;
      simB = 0.0 * r + 0.475 * g + 0.525 * b;
      break;
    case 'achromatopsia': // Complete color blindness (monochrome)
      {
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        simR = gray;
        simG = gray;
        simB = gray;
      }
      break;
  }

  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return rgbToHex({
    r: clamp(simR),
    g: clamp(simG),
    b: clamp(simB),
  });
}

/**
 * Generate random high-quality designer color
 */
export function getRandomDesignerHex(): string {
  const hues = [
    12, 35, 48, 142, 168, 195, 220, 245, 275, 315, 340,
  ];
  const h = hues[Math.floor(Math.random() * hues.length)] + (Math.random() * 20 - 10);
  const s = Math.round(65 + Math.random() * 30);
  const l = Math.round(45 + Math.random() * 25);
  return rgbToHex(hslToRgb({ h, s, l }));
}

/**
 * Approximate OKLCH string for modern CSS
 */
export function hexToOklchCss(hex: string): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  // Linear RGB approximation to perceived lightness & chroma
  const lNorm = Math.round((hsl.l / 100) * 1000) / 1000;
  const chroma = Math.round(((hsl.s / 100) * 0.32) * 1000) / 1000;
  return `oklch(${lNorm} ${chroma} ${hsl.h})`;
}
