'use client';

import React, { useState, useMemo } from 'react';
import {
  generateTailwindShades,
  tailwindShadesToV3Config,
  tailwindShadesToV4Theme,
  tailwindShadesToCssVariables,
  tailwindShadesToJson,
  isValidHex,
  normalizeHex,
  getRandomDesignerHex,
  sanitizeTokenName,
} from '@/lib/color-utils';
import { useToast } from '@/components/Toast';
import {
  Copy,
  Shuffle,
  Grid3x3,
  Pin,
  Check,
  Info,
  Code2,
  FileJson,
  Braces,
} from 'lucide-react';

interface TailwindShadesWorkspaceProps {
  initialHex?: string;
  initialName?: string;
}

type ExportFormat = 'v3' | 'v4' | 'css' | 'json';

export function TailwindShadesWorkspace({
  initialHex = '#6366F1',
  initialName = 'brand',
}: TailwindShadesWorkspaceProps) {
  const { copyToClipboard, showToast } = useToast();

  const [hex, setHex] = useState(initialHex);
  const [colorName, setColorName] = useState(initialName);
  const [format, setFormat] = useState<ExportFormat>('v4');

  const scale = useMemo(
    () => generateTailwindShades(hex, colorName || 'brand'),
    [hex, colorName]
  );

  const exportCode = useMemo(() => {
    switch (format) {
      case 'v3':
        return tailwindShadesToV3Config(scale);
      case 'v4':
        return tailwindShadesToV4Theme(scale);
      case 'css':
        return tailwindShadesToCssVariables(scale);
      case 'json':
        return tailwindShadesToJson(scale);
    }
  }, [scale, format]);

  const handleHexChange = (val: string) => {
    setHex(val);
    if (isValidHex(val)) {
      setHex(`#${normalizeHex(val)}`);
    }
  };

  const randomize = () => {
    const newHex = getRandomDesignerHex();
    setHex(newHex);
    showToast('Generated random brand color', newHex);
  };

  const tokenName = sanitizeTokenName(colorName || 'brand');

  const formatTabs: { id: ExportFormat; label: string; hint: string; icon: React.ElementType }[] = [
    { id: 'v4', label: 'Tailwind v4', hint: '@theme CSS variables', icon: Braces },
    { id: 'v3', label: 'Tailwind v3', hint: 'tailwind.config.js', icon: Code2 },
    { id: 'css', label: 'Plain CSS', hint: ':root custom properties', icon: Code2 },
    { id: 'json', label: 'JSON', hint: 'Design token map', icon: FileJson },
  ];

  return (
    <div className="space-y-8">
      {/* Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Base Color &amp; Token Name</h3>
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

          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-white/[0.08] bg-[#181B24] p-4">
            <label
              htmlFor="tw-color-picker"
              className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-lg"
              style={{ backgroundColor: hex }}
            >
              <input
                id="tw-color-picker"
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
              />
            </label>

            <div className="flex-1 w-full space-y-3">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  Base Hex Code
                </span>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0E1017] px-4 py-2.5 font-mono text-lg font-black text-white uppercase tracking-wider focus:border-indigo-500 focus:outline-none"
                  maxLength={7}
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                  Token Name
                </span>
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="brand"
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0E1017] px-4 py-2.5 font-mono text-sm text-white focus:border-indigo-500 focus:outline-none"
                  maxLength={24}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4 text-xs space-y-1 text-zinc-400">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Pin className="h-3.5 w-3.5 text-indigo-400" />
              <span>Pinned Shade: {tokenName}-{scale.pinnedShade}</span>
            </p>
            <p className="leading-relaxed">
              Your exact base color is preserved at shade{' '}
              <strong className="text-zinc-200">{scale.pinnedShade}</strong>, the closest
              lightness match on the Tailwind ladder. Every other stop is derived from it
              so the whole scale stays visually consistent.
            </p>
          </div>
        </div>

        {/* Shade Grid */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              {tokenName}-50 → {tokenName}-950
            </span>
            <span className="text-xs text-emerald-400 font-mono">Click a swatch to copy</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {scale.shades.map((s) => (
              <button
                key={s.shade}
                type="button"
                onClick={() => copyToClipboard(s.hex, `${tokenName}-${s.shade}`)}
                className={`group flex items-center justify-between rounded-lg px-4 py-3 transition-transform hover:scale-[1.01] ${
                  s.isPinned ? 'ring-2 ring-inset ring-indigo-400' : ''
                }`}
                style={{ backgroundColor: s.hex, color: s.recommendedTextColor }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold">
                    {tokenName}-{s.shade}
                  </span>
                  {s.isPinned && (
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[9px] font-mono font-bold uppercase">
                      pinned
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs">{s.hex}</span>
                  <span className="font-mono text-[10px] opacity-70">
                    L{s.lightness}%
                  </span>
                  <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-80 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Export Panel */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-400" />
            <span>Export Your Shade Scale</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {formatTabs.map((tab) => {
              const Icon = tab.icon;
              const active = format === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFormat(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white'
                  }`}
                  title={tab.hint}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <pre className="rounded-xl border border-white/[0.1] bg-[#0D0F14] p-4 overflow-x-auto text-xs font-mono text-indigo-300 leading-relaxed">
            <code>{exportCode}</code>
          </pre>
          <button
            type="button"
            onClick={() => copyToClipboard(exportCode, formatTabs.find((f) => f.id === format)?.label)}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </button>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4 text-xs space-y-1 text-zinc-400">
          <p className="font-bold text-white flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-indigo-400" />
            <span>Accessible Text Pairing</span>
          </p>
          <p className="leading-relaxed">
            Every swatch above already shows the higher-contrast label color (white or
            black) for its own background. As a rule of thumb, shades{' '}
            <strong className="text-zinc-200">50–300</strong> pair with dark text, and{' '}
            <strong className="text-zinc-200">600–950</strong> pair with white text at
            WCAG AA (4.5:1) or better — verify borderline pairs in the{' '}
            <a href="/tools/contrast-checker" className="text-indigo-400 hover:text-indigo-300 underline">
              contrast checker
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
