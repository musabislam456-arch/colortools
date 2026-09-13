'use client';

import React, { useState, useMemo } from 'react';
import {
  generateShadcnTheme,
  checkShadcnModeContrast,
  shadcnThemeToCss,
  shadcnThemeToTailwindV3,
  shadcnThemeToJson,
  isValidHex,
  normalizeHex,
  getRandomDesignerHex,
  SHADCN_TOKEN_KEYS,
} from '@/lib/color-utils';
import { useToast } from '@/components/Toast';
import {
  Copy,
  Shuffle,
  Paintbrush,
  Sun,
  Moon,
  Check,
  X,
  Code2,
  FileJson,
  Braces,
  ShieldCheck,
} from 'lucide-react';

interface ShadcnThemeWorkspaceProps {
  initialHex?: string;
}

type ExportFormat = 'css' | 'tailwind' | 'json';
type PreviewMode = 'light' | 'dark';

export function ShadcnThemeWorkspace({
  initialHex = '#6366F1',
}: ShadcnThemeWorkspaceProps) {
  const { copyToClipboard, showToast } = useToast();

  const [hex, setHex] = useState(initialHex);
  const [format, setFormat] = useState<ExportFormat>('css');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light');

  const theme = useMemo(() => generateShadcnTheme(hex), [hex]);
  const mode = previewMode === 'light' ? theme.light : theme.dark;
  const contrastChecks = useMemo(() => checkShadcnModeContrast(mode), [mode]);
  const allPass = contrastChecks.every((c) => c.passesAA);

  const exportCode = useMemo(() => {
    switch (format) {
      case 'css':
        return shadcnThemeToCss(theme);
      case 'tailwind':
        return shadcnThemeToTailwindV3();
      case 'json':
        return shadcnThemeToJson(theme);
    }
  }, [theme, format]);

  const handleHexChange = (val: string) => {
    setHex(val);
    if (isValidHex(val)) {
      setHex(`#${normalizeHex(val)}`);
    }
  };

  const randomize = () => {
    const newHex = getRandomDesignerHex();
    setHex(newHex);
    showToast('Generated random base color', newHex);
  };

  const formatTabs: { id: ExportFormat; label: string; hint: string; icon: React.ElementType }[] = [
    { id: 'css', label: 'globals.css', hint: ':root + .dark CSS variables', icon: Code2 },
    { id: 'tailwind', label: 'Tailwind v3', hint: 'tailwind.config.js colors', icon: Braces },
    { id: 'json', label: 'JSON', hint: 'Light + dark token map', icon: FileJson },
  ];

  return (
    <div className="space-y-8">
      {/* Input Panel */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Base Color</h3>
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
            htmlFor="shadcn-color-picker"
            className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-2 border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-lg"
            style={{ backgroundColor: hex }}
          >
            <input
              id="shadcn-color-picker"
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value.toUpperCase())}
              className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
            />
          </label>

          <div className="flex-1 w-full space-y-1.5">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
              Primary / Brand Hex
            </span>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-[#0E1017] px-4 py-2.5 font-mono text-lg font-black text-white uppercase tracking-wider focus:border-indigo-500 focus:outline-none"
              maxLength={7}
            />
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              Every surface, border, and muted tone below is tinted from this hue.
              Destructive stays in the red family regardless — shadcn/ui convention
              keeps error states recognizably red no matter the brand color.
            </p>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Live Component Preview
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setPreviewMode('light')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                previewMode === 'light'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('dark')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                previewMode === 'dark'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.06] text-zinc-300 hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div
          className="rounded-2xl border p-6 sm:p-8 space-y-6 transition-colors"
          style={{
            backgroundColor: mode.background,
            color: mode.foreground,
            borderColor: mode.border,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">Dashboard Preview</p>
              <p className="text-sm" style={{ color: mode['muted-foreground'] }}>
                A quick look at how this theme reads on real components.
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5 space-y-4"
            style={{ backgroundColor: mode.card, borderColor: mode.border, color: mode['card-foreground'] }}
          >
            <p className="text-sm font-semibold">Account Settings</p>
            <p className="text-xs" style={{ color: mode['muted-foreground'] }}>
              Manage your profile, preferences, and connected integrations.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-xs font-bold"
                style={{ backgroundColor: mode.primary, color: mode['primary-foreground'] }}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-xs font-semibold"
                style={{ backgroundColor: mode.secondary, color: mode['secondary-foreground'] }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-xs font-bold"
                style={{ backgroundColor: mode.destructive, color: mode['destructive-foreground'] }}
              >
                Delete Account
              </button>
            </div>
            <div
              className="rounded-lg px-4 py-2 text-xs font-semibold w-fit"
              style={{ backgroundColor: mode.accent, color: mode['accent-foreground'] }}
            >
              New feature badge
            </div>
          </div>
        </div>

        {/* Contrast Audit */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4 space-y-2">
          <p className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              WCAG AA Contrast Audit — {previewMode === 'light' ? 'Light' : 'Dark'} Mode{' '}
              {allPass ? (
                <span className="text-emerald-400">(all pairs pass)</span>
              ) : (
                <span className="text-amber-400">(some pairs need review)</span>
              )}
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {contrastChecks.map((c) => (
              <div
                key={c.pair}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-1.5 text-xs"
              >
                <span className="text-zinc-300">{c.pair}</span>
                <span
                  className={`inline-flex items-center gap-1 font-mono font-bold ${
                    c.passesAA ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {c.ratio.toFixed(2)}:1
                  {c.passesAA ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Panel */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-400" />
            <span>Export Your Theme</span>
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
          <pre className="rounded-xl border border-white/[0.1] bg-[#0D0F14] p-4 overflow-x-auto text-xs font-mono text-indigo-300 leading-relaxed max-h-96">
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
            <Paintbrush className="h-3.5 w-3.5 text-indigo-400" />
            <span>{SHADCN_TOKEN_KEYS.length} CSS Variables, Both Modes</span>
          </p>
          <p className="leading-relaxed">
            The <code className="text-indigo-300">globals.css</code> export drops straight
            into a shadcn/ui project&apos;s <code className="text-indigo-300">:root</code> and{' '}
            <code className="text-indigo-300">.dark</code> blocks. Every foreground/background
            pair above has already been checked against WCAG AA — verify borderline pairs in
            the{' '}
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
