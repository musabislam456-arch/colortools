'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaletteWorkspace } from '@/components/PaletteWorkspace';
import { Palette, Sparkles, HelpCircle } from 'lucide-react';
import { HarmonyType } from '@/lib/color-utils';

function PaletteGeneratorContent() {
  const searchParams = useSearchParams();
  const baseParam = searchParams.get('base');
  const harmonyParam = searchParams.get('harmony') as HarmonyType | null;

  const initialHex = baseParam ? `#${baseParam}` : '#4F46E5';
  const initialHarmony = harmonyParam || 'studio-curated';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <Palette className="h-3.5 w-3.5 text-indigo-400" />
          <span>Core Design Token Utility</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Color Palette Generator
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Formulate balanced, high-contrast 5-slot color palettes mathematically derived from your anchor hex. Lock slots you love, randomize with the Spacebar, preview on real mobile and dashboard mockups, and export CSS or Tailwind design tokens.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <PaletteWorkspace initialHex={initialHex} initialHarmony={initialHarmony} />

      {/* Educational & Practical Guide section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Studio Curated Rule</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Our algorithmic 5-tone model guarantees an anchor brand color, an analogous neighbor, a high-chroma pop accent, a deep structural obsidian shade, and an airy tinted surface token.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <HelpCircle className="h-4 w-4" />
            <span>Slot Locking &amp; Hotkeys</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Click the padlock icon on any color slot to freeze it. Press the <strong>SPACEBAR</strong> on your keyboard to instantly roll fresh harmonic companion tokens around your locked anchors.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
            <Palette className="h-4 w-4" />
            <span>Production Token Handoff</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Click &ldquo;Export&rdquo; to copy CSS variables, Tailwind configuration blocks, raw JSON specs, or download vector SVG swatches and 300dpi PNG preview sheets for Figma.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaletteGeneratorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center text-zinc-400 font-mono text-sm">
          Loading Palette Studio...
        </div>
      }
    >
      <PaletteGeneratorContent />
    </Suspense>
  );
}
