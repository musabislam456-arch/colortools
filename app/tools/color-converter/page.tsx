'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConverterWorkspace } from '@/components/ConverterWorkspace';
import { Sliders, Sparkles, ShieldAlert, BookOpen } from 'lucide-react';

function ColorConverterContent() {
  const searchParams = useSearchParams();
  const hexParam = searchParams.get('hex');
  const initialHex = hexParam ? `#${hexParam}` : '#6366F1';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold text-amber-300">
          <Sliders className="h-3.5 w-3.5 text-amber-400" />
          <span>Bi-directional Multi-Coordinate Conversion</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Hex, RGB, HSL &amp; CMYK Converter
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Translate color values seamlessly across HEX, RGB, RGBA, HSL, HSV, CMYK, and modern OKLCH CSS formats. Includes interactive channel sliders, 9-step systematic tints &amp; shades generation, and simulated visual testing for four forms of color vision deficiency.
        </p>
      </div>

      {/* Main Workspace */}
      <ConverterWorkspace initialHex={initialHex} />

      {/* Color Science Primer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Sliders className="h-4 w-4" />
            <span>Digital vs Print Gamut</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            RGB and HSL describe additive light emitted by screens. CMYK describes subtractive pigment absorption for print. Our algorithm translates sRGB coordinates into ink percentages with standard black plate (K) optimization.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <ShieldAlert className="h-4 w-4" />
            <span>Color Deficiency Simulation</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Testing against Protanopia, Deuteranopia, Tritanopia, and Achromatopsia ensures critical UI states (like error banners and success badges) remain distinct for the 300M+ people globally with CVD.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Systematic Tints &amp; Shades</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Generate 10% to 90% step ramps mixed against pure white and black. Ideal for setting up Tailwind config shades (`50` through `900`) with consistent perceptual contrast.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ColorConverterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center text-zinc-400 font-mono text-sm">
          Loading Color Converter...
        </div>
      }
    >
      <ColorConverterContent />
    </Suspense>
  );
}
