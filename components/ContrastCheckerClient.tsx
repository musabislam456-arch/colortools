'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContrastWorkspace } from '@/components/ContrastWorkspace';
import { Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

function ContrastCheckerContent() {
  const searchParams = useSearchParams();
  const fg = searchParams.get('fg');
  const bg = searchParams.get('bg');

  const initialFg = fg ? `#${fg}` : '#FFFFFF';
  const initialBg = bg ? `#${bg}` : '#0B0F19';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>WCAG 2.1 &amp; 2.2 Accessibility Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          WCAG Contrast Checker
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Verify whether your foreground typography and background surfaces comply with international accessibility mandates. Benchmark against AA and AAA thresholds for normal text, large text, and interactive UI component boundaries with live interactive previews and one-click auto-fixing.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <ContrastWorkspace initialFg={initialFg} initialBg={initialBg} />

      {/* WCAG Criteria Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-emerald-400 font-bold">
            WCAG Level AA
          </p>
          <h4 className="text-base font-bold text-white">4.5:1 Normal / 3:1 Large</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The legal compliance minimum for commercial web products, public portals, and SaaS platforms. Ensures users with moderately low visual acuity can read without magnification.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-purple-400 font-bold">
            WCAG Level AAA
          </p>
          <h4 className="text-base font-bold text-white">7.0:1 Normal / 4.5:1 Large</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            The gold standard for high-legibility applications, government documentation, healthcare portals, and continuous reading tools. Eliminates halation on wide-gamut OLED screens.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-amber-400 font-bold">
            UI Components &amp; Icons
          </p>
          <h4 className="text-base font-bold text-white">3.0:1 Graphical Boundaries</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Introduced in WCAG 2.1 Criterion 1.4.11. Button outlines, input focus rings, toggle states, and chart legend elements must maintain at least 3:1 contrast against adjacent canvas colors.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContrastCheckerClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center text-zinc-400 font-mono text-sm">
          Loading Contrast Studio...
        </div>
      }
    >
      <ContrastCheckerContent />
    </Suspense>
  );
}
