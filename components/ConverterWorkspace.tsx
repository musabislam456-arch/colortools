'use client';

import React, { useState, useMemo } from 'react';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  getRelativeLuminance,
  simulateColorBlindness,
  generateTintsAndShades,
  hexToOklchCss,
  isValidHex,
  normalizeHex,
  getRandomDesignerHex,
} from '@/lib/color-utils';
import { useToast } from '@/components/Toast';
import {
  Sliders,
  Copy,
  Shuffle,
  Eye,
  Check,
  Sparkles,
  Info,
  ShieldAlert,
  SunMedium
} from 'lucide-react';

interface ConverterWorkspaceProps {
  initialHex?: string;
}

export function ConverterWorkspace({ initialHex = '#6366F1' }: ConverterWorkspaceProps) {
  const { copyToClipboard, showToast } = useToast();

  const [hex, setHex] = useState(initialHex);

  // Derived color representations
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo(() => rgbToHsv(rgb), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);
  const oklchCss = useMemo(() => hexToOklchCss(hex), [hex]);
  const luminance = useMemo(() => getRelativeLuminance(rgb), [rgb]);
  const tintsShades = useMemo(() => generateTintsAndShades(hex), [hex]);

  // Handle direct changes
  const handleHexChange = (val: string) => {
    setHex(val);
    if (isValidHex(val)) {
      setHex(`#${normalizeHex(val)}`);
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const nextRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, val)) };
    setHex(rgbToHex(nextRgb));
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', val: number) => {
    const nextHsl = { ...hsl, [channel]: val };
    setHex(rgbToHex(hslToRgb(nextHsl)));
  };

  const handleCmykChange = (channel: 'c' | 'm' | 'y' | 'k', val: number) => {
    const nextCmyk = { ...cmyk, [channel]: Math.max(0, Math.min(100, val)) };
    setHex(rgbToHex(cmykToRgb(nextCmyk)));
  };

  const randomize = () => {
    const newHex = getRandomDesignerHex();
    setHex(newHex);
    showToast('Generated random color', newHex);
  };

  // Color blindness simulations
  const cvdSimulations = [
    { type: 'normal' as const, label: 'Standard Trichromatic', desc: 'Typical vision' },
    { type: 'protanopia' as const, label: 'Protanopia', desc: 'Red photoreceptor deficiency (~1% of males)' },
    { type: 'deuteranopia' as const, label: 'Deuteranopia', desc: 'Green photoreceptor deficiency (~5% of males)' },
    { type: 'tritanopia' as const, label: 'Tritanopia', desc: 'Blue photoreceptor deficiency (<0.1% rare)' },
    { type: 'achromatopsia' as const, label: 'Achromatopsia', desc: 'Complete monochromatic vision (grayscale)' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Main Converter Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Swatch & Sliders (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Color Coordinates &amp; Sliders</h3>
            </div>
            <button
              type="button"
              onClick={randomize}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>Randomize</span>
            </button>
          </div>

          {/* Master Visual Swatch & Hex */}
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-white/[0.08] bg-[#181B24] p-4">
            <label
              htmlFor="master-color-picker"
              className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-lg"
              style={{ backgroundColor: hex }}
            >
              <input
                id="master-color-picker"
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
              />
            </label>

            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  Active Hex Code
                </span>
                <span className="text-xs font-mono text-indigo-400 flex items-center gap-1">
                  <SunMedium className="h-3 w-3" />
                  <span>Lum: {(luminance * 100).toFixed(1)}%</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="flex-1 rounded-xl border border-white/[0.1] bg-[#0E1017] px-4 py-2.5 font-mono text-xl font-black text-white uppercase tracking-wider focus:border-indigo-500 focus:outline-none"
                  maxLength={7}
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(hex, 'HEX')}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3 text-xs font-bold text-white shadow-md transition-colors shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive RGB Sliders */}
          <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#181B24] p-4">
            <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              RGB Channels (0–255)
            </p>
            {(['r', 'g', 'b'] as const).map((channel) => {
              const label = channel.toUpperCase();
              const val = rgb[channel];
              const accentClass =
                channel === 'r' ? 'accent-rose-500' : channel === 'g' ? 'accent-emerald-500' : 'accent-blue-500';

              return (
                <div key={channel} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-mono font-bold text-zinc-300">{label}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={val}
                    onChange={(e) => handleRgbChange(channel, Number(e.target.value))}
                    className={`flex-1 cursor-pointer ${accentClass}`}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={val}
                    onChange={(e) => handleRgbChange(channel, Number(e.target.value))}
                    className="w-16 rounded-md border border-white/[0.1] bg-[#0E1017] px-2 py-1 font-mono text-xs text-white text-right focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Interactive HSL Sliders */}
          <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#181B24] p-4">
            <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              HSL Parameters
            </p>
            {/* Hue */}
            <div className="flex items-center gap-3">
              <span className="w-5 text-xs font-mono font-bold text-zinc-300">H</span>
              <input
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange('h', Number(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className="w-16 text-right font-mono text-xs text-white">{hsl.h}°</span>
            </div>
            {/* Saturation */}
            <div className="flex items-center gap-3">
              <span className="w-5 text-xs font-mono font-bold text-zinc-300">S</span>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => handleHslChange('s', Number(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className="w-16 text-right font-mono text-xs text-white">{hsl.s}%</span>
            </div>
            {/* Lightness */}
            <div className="flex items-center gap-3">
              <span className="w-5 text-xs font-mono font-bold text-zinc-300">L</span>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => handleHslChange('l', Number(e.target.value))}
                className="flex-1 accent-indigo-500 cursor-pointer"
              />
              <span className="w-16 text-right font-mono text-xs text-white">{hsl.l}%</span>
            </div>
          </div>
        </div>

        {/* Right: One-Click Copy Values Formats (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Formatted Color Codes
              </span>
              <span className="text-xs text-emerald-400 font-mono">1-Click Copy</span>
            </div>

            {/* Formats List */}
            {[
              { label: 'HEX', val: hex },
              { label: 'RGB', val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
              { label: 'RGBA', val: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
              { label: 'HSL', val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { label: 'HSV', val: `hsv(${hsv.h}°, ${hsv.s}%, ${hsv.v}%)` },
              { label: 'CMYK', val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
              { label: 'CSS OKLCH', val: oklchCss },
            ].map((f) => (
              <div
                key={f.label}
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#181B24] p-3 hover:border-indigo-500/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-400 font-bold">{f.label}</p>
                  <p className="font-mono text-xs text-white font-semibold">{f.val}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(f.val, f.label)}
                  className="rounded-lg bg-white/[0.06] group-hover:bg-indigo-600 p-2 text-zinc-300 group-hover:text-white transition-colors"
                  title={`Copy ${f.label}`}
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4 text-xs space-y-1 text-zinc-400">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-indigo-400" />
              <span>Display Gamut Compatibility</span>
            </p>
            <p className="leading-relaxed">
              Standard sRGB coordinates represent 35% of visible spectrum. In modern CSS, OKLCH and P3 gamuts allow up to 50% more intense saturation.
            </p>
          </div>
        </div>
      </div>

      {/* Color Blindness Simulation Matrix */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Color Vision Deficiency (CVD) Simulation</h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Brettel / Viénot Matrix Algorithm
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {cvdSimulations.map((sim) => {
            const simHex = simulateColorBlindness(hex, sim.type);

            return (
              <div
                key={sim.type}
                className="rounded-xl border border-white/[0.08] bg-[#181B24] overflow-hidden p-3 space-y-2.5"
              >
                <div
                  className="h-16 w-full rounded-lg border border-white/10 shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: simHex }}
                />
                <div>
                  <p className="text-xs font-bold text-white">{sim.label}</p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">{sim.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[11px] font-mono">
                  <span className="text-zinc-300 font-semibold">{simHex}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(simHex, `${sim.label} hex`)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tints & Shades Ramps */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Design System Tints &amp; Shades</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Systematic color ramps mixed with pure white (tints) and pure black (shades) for consistent UI token steps
          </p>
        </div>

        {/* Tints Row */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">Tints (+ White)</p>
          <div className="grid grid-cols-6 gap-2">
            {tintsShades.tints.map((item) => (
              <button
                key={item.pct}
                type="button"
                onClick={() => {
                  setHex(item.hex);
                  showToast(`Selected tint ${item.hex}`);
                }}
                className="group flex flex-col rounded-xl border border-white/[0.08] overflow-hidden bg-[#181B24] text-left hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="h-14 w-full" style={{ backgroundColor: item.hex }} />
                <div className="p-2">
                  <p className="text-[10px] font-mono text-zinc-400">{item.pct}% Tint</p>
                  <p className="text-xs font-mono font-bold text-white">{item.hex}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Shades Row */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase text-zinc-400 font-semibold">Shades (+ Black)</p>
          <div className="grid grid-cols-6 gap-2">
            {tintsShades.shades.map((item) => (
              <button
                key={item.pct}
                type="button"
                onClick={() => {
                  setHex(item.hex);
                  showToast(`Selected shade ${item.hex}`);
                }}
                className="group flex flex-col rounded-xl border border-white/[0.08] overflow-hidden bg-[#181B24] text-left hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="h-14 w-full" style={{ backgroundColor: item.hex }} />
                <div className="p-2">
                  <p className="text-[10px] font-mono text-zinc-400">{item.pct}% Shade</p>
                  <p className="text-xs font-mono font-bold text-white">{item.hex}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
