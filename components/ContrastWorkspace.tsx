'use client';

import React, { useState, useMemo } from 'react';
import {
  getContrastRatio,
  autoFixContrast,
  isValidHex,
  normalizeHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
} from '@/lib/color-utils';
import { useToast } from '@/components/Toast';
import {
  CheckCircle2,
  XCircle,
  ArrowLeftRight,
  Sparkles,
  Sliders,
  Copy,
  Info,
  ShieldCheck,
  Zap,
  Eye,
  Type,
  Maximize2
} from 'lucide-react';

interface ContrastWorkspaceProps {
  initialFg?: string;
  initialBg?: string;
}

export function ContrastWorkspace({
  initialFg = '#FFFFFF',
  initialBg = '#0B0F19',
}: ContrastWorkspaceProps) {
  const { copyToClipboard, showToast } = useToast();

  const [fgHex, setFgHex] = useState(initialFg);
  const [bgHex, setBgHex] = useState(initialBg);

  const contrast = useMemo(() => {
    return getContrastRatio(fgHex, bgHex);
  }, [fgHex, bgHex]);

  const swapColors = () => {
    setFgHex(bgHex);
    setBgHex(fgHex);
    showToast('Swapped foreground & background');
  };

  const handleAutoFix = (target: 4.5 | 7.0) => {
    const fixed = autoFixContrast(fgHex, bgHex, target);
    setFgHex(fixed);
    showToast(`Adjusted foreground to satisfy ${target}:1 (${fixed})`, fixed);
  };

  const handleLightnessSlider = (l: number) => {
    const rgb = hexToRgb(fgHex);
    const hsl = rgbToHsl(rgb);
    const newRgb = hslToRgb({ h: hsl.h, s: hsl.s, l });
    setFgHex(rgbToHex(newRgb));
  };

  const fgHsl = rgbToHsl(hexToRgb(fgHex));

  // Curated accessible pairings presets
  const presets = [
    { name: 'Obsidian & Pure White', fg: '#FFFFFF', bg: '#0A0B0E' },
    { name: 'Electric Cyan on Dark', fg: '#22D3EE', bg: '#081325' },
    { name: 'Warm Ochre on Espresso', fg: '#FBBF24', bg: '#1C1917' },
    { name: 'Emerald Forest on Midnight', fg: '#34D399', bg: '#061D17' },
    { name: 'Modern Editorial Slate', fg: '#0F172A', bg: '#F8FAFC' },
    { name: 'Violet Glow on Deep Navy', fg: '#A78BFA', bg: '#0B0F2A' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Input & Gauge Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Color Pickers & Sliders (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Color Coordinates</h3>
            </div>
            <button
              type="button"
              onClick={swapColors}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Swap Fg / Bg</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foreground Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#181B24] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  Foreground (Text)
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Lum: {contrast.fgLuminance.toFixed(3)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="fg-color-picker"
                  className="relative h-10 w-10 rounded-xl border border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-md"
                  style={{ backgroundColor: fgHex }}
                >
                  <input
                    id="fg-color-picker"
                    type="color"
                    value={fgHex}
                    onChange={(e) => setFgHex(e.target.value.toUpperCase())}
                    className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                  />
                </label>
                <input
                  type="text"
                  value={fgHex}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFgHex(val);
                  }}
                  className="flex-1 rounded-lg border border-white/[0.1] bg-[#0E1017] px-3 py-2 font-mono text-sm font-bold text-white uppercase focus:border-indigo-500 focus:outline-none"
                  maxLength={7}
                />
              </div>

              {/* Lightness Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Lightness Tuning</span>
                  <span>{fgHsl.l}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fgHsl.l}
                  onChange={(e) => handleLightnessSlider(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Background Card */}
            <div className="rounded-xl border border-white/[0.08] bg-[#181B24] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  Background (Canvas)
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Lum: {contrast.bgLuminance.toFixed(3)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="bg-color-picker"
                  className="relative h-10 w-10 rounded-xl border border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-md"
                  style={{ backgroundColor: bgHex }}
                >
                  <input
                    id="bg-color-picker"
                    type="color"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value.toUpperCase())}
                    className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                  />
                </label>
                <input
                  type="text"
                  value={bgHex}
                  onChange={(e) => {
                    const val = e.target.value;
                    setBgHex(val);
                  }}
                  className="flex-1 rounded-lg border border-white/[0.1] bg-[#0E1017] px-3 py-2 font-mono text-sm font-bold text-white uppercase focus:border-indigo-500 focus:outline-none"
                  maxLength={7}
                />
              </div>

              {/* Quick Background Toggles */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 font-mono">Quick Bg:</span>
                {[
                  { hex: '#0A0B0E', label: 'Dark' },
                  { hex: '#181B24', label: 'Slate' },
                  { hex: '#FFFFFF', label: 'White' },
                  { hex: '#F1F5F9', label: 'Light' },
                ].map((bg) => (
                  <button
                    key={bg.hex}
                    type="button"
                    onClick={() => setBgHex(bg.hex)}
                    className="rounded-md border border-white/20 px-2 py-0.5 text-[10px] font-mono hover:border-white transition-colors"
                    style={{ backgroundColor: bg.hex, color: bg.hex === '#FFFFFF' || bg.hex === '#F1F5F9' ? '#000' : '#FFF' }}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-Fix Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#181B24]/70 p-3 border border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Need compliance instantly?</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAutoFix(4.5)}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <Sparkles className="h-3 w-3" />
                <span>Auto-Fix AA (4.5:1)</span>
              </button>
              <button
                type="button"
                onClick={() => handleAutoFix(7.0)}
                className="inline-flex items-center gap-1 rounded-lg bg-purple-600/80 hover:bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <Sparkles className="h-3 w-3" />
                <span>Auto-Fix AAA (7.0:1)</span>
              </button>
            </div>
          </div>

          {/* Preset Pairings Tray */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Studio Benchmarked Pairings
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setFgHex(p.fg);
                    setBgHex(p.bg);
                    showToast(`Loaded ${p.name}`);
                  }}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-[#181B24] p-2 text-left hover:bg-white/[0.06] transition-colors"
                >
                  <div
                    className="h-6 w-6 rounded-md border border-white/20 flex items-center justify-center font-bold text-[10px] shrink-0"
                    style={{ backgroundColor: p.bg, color: p.fg }}
                  >
                    Aa
                  </div>
                  <span className="text-xs text-zinc-200 truncate font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: WCAG Scoreboard & Compliance Matrix (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                WCAG 2.1 / 2.2 Ratio
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-mono text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>W3C Standard</span>
              </span>
            </div>

            {/* Huge Ratio Display */}
            <div className="text-center py-4">
              <div
                className={`text-6xl font-black font-mono tracking-tight transition-colors ${
                  contrast.ratio >= 7.0
                    ? 'text-emerald-400'
                    : contrast.ratio >= 4.5
                    ? 'text-indigo-400'
                    : contrast.ratio >= 3.0
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {contrast.ratioFormatted}
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-2">
                {contrast.ratio >= 7.0
                  ? 'Exceptional contrast. Fully passes WCAG AAA.'
                  : contrast.ratio >= 4.5
                  ? 'Good contrast. Meets WCAG AA for normal text.'
                  : contrast.ratio >= 3.0
                  ? 'Passes AA for large text & UI elements only.'
                  : 'Fails WCAG AA. Insufficient contrast for body text.'}
              </p>
            </div>

            {/* Compliance Matrix Badges */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              {/* Row 1: AA Normal Text */}
              <div className="flex items-center justify-between rounded-xl bg-[#181B24] p-3 border border-white/[0.04]">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>AA Normal Text</span>
                    <span className="text-[10px] font-normal text-zinc-400">(4.5:1 min)</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">Regular copy under 18pt / 24px</p>
                </div>
                {contrast.aaNormal ? (
                  <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>PASS</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-400 font-mono">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>

              {/* Row 2: AA Large Text */}
              <div className="flex items-center justify-between rounded-xl bg-[#181B24] p-3 border border-white/[0.04]">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>AA Large Text</span>
                    <span className="text-[10px] font-normal text-zinc-400">(3.0:1 min)</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">&ge; 18pt regular or &ge; 14pt bold</p>
                </div>
                {contrast.aaLarge ? (
                  <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>PASS</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-400 font-mono">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>

              {/* Row 3: AAA Normal Text */}
              <div className="flex items-center justify-between rounded-xl bg-[#181B24] p-3 border border-white/[0.04]">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>AAA Normal Text</span>
                    <span className="text-[10px] font-normal text-zinc-400">(7.0:1 min)</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">Strict standard for high legibility</p>
                </div>
                {contrast.aaaNormal ? (
                  <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>PASS</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-400 font-mono">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>

              {/* Row 4: UI Components & Graphical Objects */}
              <div className="flex items-center justify-between rounded-xl bg-[#181B24] p-3 border border-white/[0.04]">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>UI Components</span>
                    <span className="text-[10px] font-normal text-zinc-400">(3.0:1 min)</span>
                  </p>
                  <p className="text-[11px] text-zinc-400">Buttons, borders, charts, focus rings</p>
                </div>
                {contrast.uiComponents ? (
                  <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>PASS</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-md bg-rose-500/20 border border-rose-500/30 px-2.5 py-1 text-xs font-bold text-rose-400 font-mono">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>FAIL</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => copyToClipboard(`Contrast: ${contrast.ratioFormatted} (Fg: ${fgHex}, Bg: ${bgHex})`)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-[#181B24] py-2.5 text-xs font-semibold text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Contrast Audit Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Realistic Live UI Preview Surfaces */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-white/[0.08] pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Type className="h-4 w-4 text-indigo-400" />
            <span>Interactive Live Component Preview</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Real components rendered directly in your foreground ({fgHex}) and background ({bgHex})
          </p>
        </div>

        {/* Live Surface Canvas */}
        <div
          className="rounded-2xl p-6 sm:p-10 transition-colors border border-white/[0.08] shadow-inner"
          style={{ backgroundColor: bgHex, color: fgHex }}
        >
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header & Subhead */}
            <div className="space-y-3">
              <span
                className="inline-block rounded-md px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase border"
                style={{ borderColor: fgHex, color: fgHex }}
              >
                Editorial Sample
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Designing for Human Perception and Optical Balance
              </h1>
              <p className="text-sm sm:text-base leading-relaxed opacity-90">
                Digital legibility is not just an arbitrary accessibility regulation; it is the cornerstone of trust in product design. When contrast fails, user comprehension plummets and cognitive fatigue spikes exponentially.
              </p>
            </div>

            {/* UI Interactive Components Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: `${fgHex}33` }}>
              {/* Button & Input Demo */}
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider font-semibold opacity-75">
                  Form Controls &amp; Buttons
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-xl px-4 py-2.5 text-xs font-bold transition-opacity hover:opacity-90 shadow-md"
                    style={{ backgroundColor: fgHex, color: bgHex }}
                  >
                    Primary Action Button
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border px-4 py-2.5 text-xs font-bold transition-opacity hover:opacity-90"
                    style={{ borderColor: fgHex, color: fgHex }}
                  >
                    Outlined Variant
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium block opacity-90">
                    Sample Form Input
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="user@colortools.studio"
                    className="w-full rounded-lg border px-3.5 py-2 text-xs font-mono focus:outline-none"
                    style={{
                      borderColor: fgHex,
                      backgroundColor: 'transparent',
                      color: fgHex,
                    }}
                  />
                </div>
              </div>

              {/* Alert Notification Card */}
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider font-semibold opacity-75">
                  Status Callout Banner
                </p>
                <div
                  className="rounded-xl border p-4 shadow-sm"
                  style={{ borderColor: fgHex }}
                >
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 shrink-0 mt-0.5" style={{ color: fgHex }} />
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Contrast Validation Active</p>
                      <p className="text-xs leading-relaxed opacity-85">
                        Both small typography (14px) and large display headings (32px) have been benchmarked in this preview state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
