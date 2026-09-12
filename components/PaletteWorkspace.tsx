'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  generateHarmonies,
  HarmonyType,
  getRandomDesignerHex,
  isValidHex,
  normalizeHex,
  rgbToHsl,
  hexToRgb,
  getContrastRatio,
  rgbToHex,
  hslToRgb
} from '@/lib/color-utils';
import { useToast } from '@/components/Toast';
import {
  Lock,
  Unlock,
  Copy,
  Shuffle,
  Download,
  Share2,
  Code2,
  Check,
  Sparkles,
  Sliders,
  Smartphone,
  LayoutDashboard,
  Eye,
  ArrowRight,
  Plus,
  RefreshCw,
  FileCode
} from 'lucide-react';

interface PaletteWorkspaceProps {
  initialHex?: string;
  initialHarmony?: HarmonyType;
}

export function PaletteWorkspace({
  initialHex = '#4F46E5',
  initialHarmony = 'studio-curated',
}: PaletteWorkspaceProps) {
  const { copyToClipboard, showToast } = useToast();

  const [baseHex, setBaseHex] = useState(initialHex);
  const [harmony, setHarmony] = useState<HarmonyType>(initialHarmony);
  const [colors, setColors] = useState<string[]>(() =>
    generateHarmonies(initialHex, initialHarmony)
  );
  const [lockedSlots, setLockedSlots] = useState<boolean[]>([false, false, false, false, false]);
  const [activePreview, setActivePreview] = useState<'mobile' | 'dashboard' | 'poster'>('dashboard');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportTab, setExportTab] = useState<'css' | 'tailwind' | 'json'>('css');
  const [copiedExport, setCopiedExport] = useState(false);

  // Apply harmony or base change
  const applyPaletteChange = useCallback(
    (newBaseHex: string, newHarmony: HarmonyType) => {
      const generated = generateHarmonies(newBaseHex, newHarmony);
      setColors((prev) =>
        generated.map((col, idx) => (lockedSlots[idx] && prev[idx] ? prev[idx] : col))
      );
    },
    [lockedSlots]
  );

  const handleBaseHexChange = (newHex: string) => {
    setBaseHex(newHex);
    if (isValidHex(newHex)) {
      const normalized = `#${normalizeHex(newHex)}`;
      applyPaletteChange(normalized, harmony);
    }
  };

  const handleHarmonyChange = (newHarmony: HarmonyType) => {
    setHarmony(newHarmony);
    applyPaletteChange(baseHex, newHarmony);
  };

  const randomize = useCallback(() => {
    const newRandomBase = getRandomDesignerHex();
    setBaseHex(newRandomBase);
    const newGenerated = generateHarmonies(newRandomBase, harmony);
    setColors((prev) =>
      newGenerated.map((c, i) => (lockedSlots[i] && prev[i] ? prev[i] : c))
    );
    showToast('Randomized unlocked colors (Press Space)', newRandomBase);
  }, [harmony, lockedSlots, showToast]);

  // Spacebar to randomize unlocked colors
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        randomize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [randomize]);

  const toggleLock = (index: number) => {
    setLockedSlots((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const updateColorAt = (index: number, newHex: string) => {
    if (isValidHex(newHex)) {
      const formatted = `#${normalizeHex(newHex)}`;
      setColors((prev) => {
        const copy = [...prev];
        copy[index] = formatted;
        return copy;
      });
      if (index === 0) {
        setBaseHex(formatted);
      }
    }
  };

  // Export generators
  const getCssVariables = () => {
    return `:root {\n${colors
      .map((c, i) => `  --color-token-${i + 1}: ${c};`)
      .join('\n')}\n}`;
  };

  const getTailwindConfig = () => {
    return `// tailwind.config.js or CSS theme\nextend: {\n  colors: {\n    palette: {\n${colors
      .map((c, i) => `      '${(i + 1) * 100}': '${c}',`)
      .join('\n')}\n    },\n  },\n},`;
  };

  const getJsonExport = () => {
    return JSON.stringify(
      {
        name: 'ColorTools Studio Palette',
        baseColor: baseHex,
        harmony,
        generatedAt: new Date().toISOString(),
        tokens: colors.map((hex, i) => ({
          step: (i + 1) * 100,
          hex,
          rgb: hexToRgb(hex),
          hsl: rgbToHsl(hexToRgb(hex)),
        })),
      },
      null,
      2
    );
  };

  const downloadSvg = () => {
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" width="1000" height="300">
  <rect width="1000" height="300" fill="#0A0B0E"/>
  ${colors
    .map((c, i) => {
      const x = i * 200;
      return `
    <g transform="translate(${x}, 0)">
      <rect width="200" height="230" fill="${c}"/>
      <text x="20" y="265" fill="#FFFFFF" font-family="monospace" font-size="16" font-weight="bold">${c}</text>
      <text x="20" y="285" fill="#888888" font-family="sans-serif" font-size="12">Slot ${i + 1}</text>
    </g>`;
    })
    .join('')}
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `colortools-palette-${baseHex.replace('#', '')}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded SVG palette');
  };

  const downloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0A0B0E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const slotWidth = canvas.width / colors.length;
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * slotWidth, 0, slotWidth, 310);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(color, i * slotWidth + 24, 355);

      ctx.fillStyle = '#8E8E93';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Token ${i + 1}00`, i * slotWidth + 24, 380);
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `colortools-palette-${baseHex.replace('#', '')}.png`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded PNG swatch sheet');
    });
  };

  const copyShareLink = () => {
    const params = new URLSearchParams({
      base: baseHex.replace('#', ''),
      harmony,
    });
    const url = `${window.location.origin}/tools/palette-generator?${params.toString()}`;
    copyToClipboard(url, 'Shareable Palette URL');
  };

  const harmoniesList: { id: HarmonyType; label: string; desc: string }[] = [
    { id: 'studio-curated', label: 'Studio Curated', desc: '5-tone balanced agency palette' },
    { id: 'complementary', label: 'Complementary', desc: 'Opposite on color wheel' },
    { id: 'analogous', label: 'Analogous', desc: 'Adjacent harmonic tones' },
    { id: 'triadic', label: 'Triadic', desc: '120° equilateral triad' },
    { id: 'tetradic', label: 'Tetradic', desc: 'Double complementary rectangle' },
    { id: 'monochromatic', label: 'Monochromatic', desc: 'Nuanced shades & tints' },
    { id: 'split-complementary', label: 'Split Comp.', desc: 'Base plus adjacent to opposite' },
  ];

  return (
    <div className="space-y-8">
      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-2xl border border-white/[0.1] bg-[#12141A] p-4 lg:p-5 shadow-xl">
        {/* Left: Base Hex Picker & Harmony Mode */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#181B24] p-1.5 pl-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Base Hex</span>
            <div className="flex items-center gap-2">
              <label
                htmlFor="base-color-picker"
                className="relative h-7 w-7 rounded-lg border border-white/20 cursor-pointer shadow-sm overflow-hidden"
                style={{ backgroundColor: baseHex }}
              >
                <input
                  id="base-color-picker"
                  type="color"
                  value={baseHex}
                  onChange={(e) => handleBaseHexChange(e.target.value.toUpperCase())}
                  className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                />
              </label>
              <input
                type="text"
                value={baseHex}
                onChange={(e) => handleBaseHexChange(e.target.value)}
                className="w-24 bg-transparent font-mono text-sm font-semibold text-white focus:outline-none uppercase"
                maxLength={7}
              />
            </div>
          </div>

          {/* Harmony Rules Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] p-1.5 overflow-x-auto">
            <span className="text-xs font-mono uppercase text-zinc-400 pl-2 pr-1 hidden sm:inline">
              Rule:
            </span>
            <select
              value={harmony}
              onChange={(e) => handleHarmonyChange(e.target.value as HarmonyType)}
              className="bg-transparent text-xs font-medium text-zinc-200 focus:outline-none cursor-pointer py-1 px-2 rounded-lg hover:bg-white/[0.04]"
            >
              {harmoniesList.map((h) => (
                <option key={h.id} value={h.id} className="bg-[#181B24] text-white">
                  {h.label} — {h.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={randomize}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-700 transition-all active:scale-[0.98]"
            title="Randomize unlocked slots (Press Spacebar)"
          >
            <Shuffle className="h-4 w-4" />
            <span>Randomize</span>
            <kbd className="hidden sm:inline-block rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-mono text-indigo-200">
              SPACE
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <Code2 className="h-4 w-4 text-indigo-400" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] px-3.5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-colors"
            title="Copy shareable link to this palette"
          >
            <Share2 className="h-4 w-4 text-purple-400" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main 5-Color Interactive Swatch Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {colors.map((hex, index) => {
          const isLocked = lockedSlots[index];
          const rgb = hexToRgb(hex);
          const hsl = rgbToHsl(rgb);
          // Calculate high-contrast text color for inside the swatch
          const contrastAgainstWhite = getContrastRatio('#FFFFFF', hex).ratio;
          const textOnColor = contrastAgainstWhite > 4.5 ? '#FFFFFF' : '#090A0E';

          return (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl h-[340px] sm:h-[420px]"
              style={{ backgroundColor: hex }}
            >
              {/* Top Controls: Slot Label & Lock */}
              <div className="flex items-center justify-between p-4 z-10">
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
                  style={{
                    backgroundColor: textOnColor === '#FFFFFF' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
                    color: textOnColor,
                  }}
                >
                  {index === 0 ? 'Anchor' : `Token ${index + 1}`}
                </span>

                <button
                  type="button"
                  onClick={() => toggleLock(index)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-transform hover:scale-110 shadow-sm"
                  style={{
                    backgroundColor: isLocked
                      ? 'rgba(239, 68, 68, 0.85)'
                      : textOnColor === '#FFFFFF'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)',
                    color: '#FFFFFF',
                  }}
                  title={isLocked ? 'Slot is locked' : 'Click to lock slot'}
                >
                  {isLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                  )}
                </button>
              </div>

              {/* Center Floating Actions (on hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => copyToClipboard(hex, `Hex ${hex}`)}
                  className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg transition-transform hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: textOnColor === '#FFFFFF' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                    color: textOnColor,
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </button>
              </div>

              {/* Bottom Card Info: Hex, HSL, Color Picker */}
              <div
                className="p-4 backdrop-blur-md transition-all z-10"
                style={{
                  backgroundColor: textOnColor === '#FFFFFF' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.45)',
                  color: textOnColor,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => updateColorAt(index, e.target.value)}
                    className="w-24 bg-transparent font-mono text-lg font-extrabold focus:outline-none uppercase tracking-wide"
                  />

                  {/* Direct color input */}
                  <label
                    htmlFor={`swatch-picker-${index}`}
                    className="relative h-6 w-6 rounded-md border border-white/30 cursor-pointer overflow-hidden shadow-inner"
                    style={{ backgroundColor: hex }}
                  >
                    <input
                      id={`swatch-picker-${index}`}
                      type="color"
                      value={hex}
                      onChange={(e) => updateColorAt(index, e.target.value)}
                      className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                    />
                  </label>
                </div>

                <div className="text-[11px] font-mono opacity-80 flex flex-col gap-0.5">
                  <span>RGB: {rgb.r}, {rgb.g}, {rgb.b}</span>
                  <span>HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live UI Mockup Preview Section */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-400" />
              <span>Live Application Previews</span>
            </h3>
            <p className="text-xs text-zinc-400">
              See how this palette translates into real product UI components and agency typography
            </p>
          </div>

          <div className="flex items-center rounded-xl border border-white/[0.1] bg-[#181B24] p-1 text-xs">
            <button
              type="button"
              onClick={() => setActivePreview('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePreview === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>SaaS UI</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePreview === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile Card</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('poster')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePreview === 'poster'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Agency Poster</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mockup Surface */}
        {colors.length >= 5 && (
          <div className="w-full transition-all">
            {activePreview === 'dashboard' && (
              <div
                className="rounded-2xl p-6 md:p-8 transition-colors border border-white/[0.08]"
                style={{ backgroundColor: colors[3] || '#12141A' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Key Metric */}
                  <div
                    className="rounded-xl p-5 shadow-lg border border-white/[0.08]"
                    style={{ backgroundColor: colors[4] || '#FFFFFF' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-semibold">
                        Conversion Velocity
                      </span>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: colors[2] }}
                      />
                    </div>
                    <div
                      className="text-3xl font-extrabold font-mono tracking-tight"
                      style={{ color: colors[0] }}
                    >
                      94.8%
                    </div>
                    <p className="text-xs mt-2 text-zinc-500 flex items-center gap-1">
                      <span className="font-semibold text-emerald-600">+18.4%</span> vs previous cycle
                    </p>
                  </div>

                  {/* Card 2: Interactive CTA Box */}
                  <div
                    className="rounded-xl p-5 shadow-lg border border-white/[0.08] flex flex-col justify-between"
                    style={{ backgroundColor: '#181B24' }}
                  >
                    <div>
                      <span
                        className="inline-block rounded-md px-2 py-0.5 text-[11px] font-mono font-semibold uppercase mb-2"
                        style={{ backgroundColor: colors[1], color: '#FFFFFF' }}
                      >
                        Release v4.2
                      </span>
                      <h4 className="text-sm font-bold text-white">Dynamic Chromatic Shaders</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Wide-gamut P3 color space support enabled.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold shadow-md transition-opacity hover:opacity-90"
                      style={{ backgroundColor: colors[0], color: '#FFFFFF' }}
                    >
                      <span>Deploy Palette</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Card 3: Color Token Legend */}
                  <div className="rounded-xl p-5 bg-[#0D0F14] border border-white/[0.08] flex flex-col justify-between">
                    <p className="text-xs font-mono uppercase text-zinc-400 mb-2">
                      Active Color Swatches
                    </p>
                    <div className="flex h-10 w-full rounded-lg overflow-hidden border border-white/10 shadow-sm">
                      {colors.map((c, i) => (
                        <div
                          key={i}
                          className="h-full flex-1"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-3">
                      <span>{colors[0]}</span>
                      <span>{colors[2]}</span>
                      <span>{colors[4]}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreview === 'mobile' && (
              <div className="flex justify-center py-4">
                <div
                  className="w-full max-w-sm rounded-3xl p-6 shadow-2xl border-4 border-zinc-800"
                  style={{ backgroundColor: colors[3] || '#0F172A' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-md"
                        style={{ backgroundColor: colors[0] }}
                      >
                        CT
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Design Token Bank</p>
                        <p className="text-[10px] text-zinc-400">Synced 2m ago</p>
                      </div>
                    </div>
                    <span
                      className="h-3 w-3 rounded-full animate-pulse"
                      style={{ backgroundColor: colors[2] }}
                    />
                  </div>

                  <div
                    className="rounded-2xl p-5 shadow-lg mb-4"
                    style={{ backgroundColor: colors[4] || '#F8FAFC' }}
                  >
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">
                      Balance Metric
                    </span>
                    <h3
                      className="text-2xl font-black font-mono mt-1"
                      style={{ color: colors[0] }}
                    >
                      $28,450.00
                    </h3>
                    <div className="mt-3 flex gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ backgroundColor: colors[1], color: '#FFFFFF' }}
                      >
                        +24.5%
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium py-0.5">
                        High-Yield Accent
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: colors[0] }}
                  >
                    Transfer Design Tokens
                  </button>
                </div>
              </div>
            )}

            {activePreview === 'poster' && (
              <div
                className="relative rounded-2xl p-8 sm:p-12 overflow-hidden border border-white/[0.08] shadow-2xl"
                style={{ backgroundColor: colors[3] || '#05070D' }}
              >
                <div className="relative z-10 max-w-xl space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-mono uppercase">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors[2] }}
                    />
                    <span style={{ color: colors[4] || '#FFFFFF' }}>
                      Creative Agency Manifesto
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
                    style={{ color: colors[4] || '#FFFFFF' }}
                  >
                    Chromatic <span style={{ color: colors[1] }}>Form</span> &amp;{' '}
                    <span style={{ color: colors[2] }}>Precision</span>
                  </h2>

                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: colors[4] ? `${colors[4]}CC` : '#CBD5E1' }}
                  >
                    Every hue operates as a spatial coordinate. By pairing high-chroma anchors with deep structural shadows, we evoke clarity and digital presence.
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg"
                      style={{ backgroundColor: colors[0], color: '#FFFFFF' }}
                    >
                      Studio Inquiries
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                      style={{
                        borderColor: colors[1],
                        color: colors[4] || '#FFFFFF',
                      }}
                    >
                      Read Methodology
                    </button>
                  </div>
                </div>

                {/* Decorative Visual Prism Block */}
                <div
                  className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: colors[2] }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/[0.12] bg-[#141720] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Export Palette Tokens</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Tab selection */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4">
              {(['css', 'tailwind', 'json'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setExportTab(tab)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                    exportTab === tab
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadSvg}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/[0.1] px-2.5 py-1 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                >
                  <Download className="h-3 w-3" />
                  <span>SVG</span>
                </button>
                <button
                  type="button"
                  onClick={downloadPng}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/[0.1] px-2.5 py-1 text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                >
                  <Download className="h-3 w-3" />
                  <span>PNG</span>
                </button>
              </div>
            </div>

            {/* Code Display */}
            <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4">
              <pre className="font-mono text-xs text-zinc-200 overflow-x-auto max-h-64 leading-relaxed">
                {exportTab === 'css' && getCssVariables()}
                {exportTab === 'tailwind' && getTailwindConfig()}
                {exportTab === 'json' && getJsonExport()}
              </pre>

              <button
                type="button"
                onClick={() => {
                  const code =
                    exportTab === 'css'
                      ? getCssVariables()
                      : exportTab === 'tailwind'
                      ? getTailwindConfig()
                      : getJsonExport();
                  copyToClipboard(code, `${exportTab.toUpperCase()} snippet`);
                  setCopiedExport(true);
                  setTimeout(() => setCopiedExport(false), 2000);
                }}
                className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors"
              >
                {copiedExport ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedExport ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="rounded-xl bg-white/[0.08] px-4 py-2 text-xs font-medium text-white hover:bg-white/[0.12]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
