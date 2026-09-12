import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Eye,
  Layers,
  CheckCircle2,
  Code2,
  Cpu,
  ArrowRight,
  Globe2,
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ColorTools Studio — Philosophy, Standards & Color Science',
  description:
    'Learn about ColorTools Studio’s mission to combine mathematical W3C color science with modern creative agency craft for universal digital accessibility.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Zero Latency & 100% Client-Side',
      desc: 'No remote servers, no background trackers, and zero API limits. Every calculation—from relative luminance to OKLCH interpolation—runs natively in your browser.',
      icon: Cpu,
    },
    {
      title: 'Mathematical WCAG Accuracy',
      desc: 'We follow the official W3C 2.1 and 2.2 algorithms strictly. Contrast ratios and perceived luminance are calculated down to two decimal places.',
      icon: ShieldCheck,
    },
    {
      title: 'Wide-Gamut Modern CSS',
      desc: 'We embrace Display P3 and OKLCH color spaces, bridging the gap between legacy sRGB limitations and modern OLED hardware capabilities.',
      icon: Layers,
    },
    {
      title: 'Human-Centered Utility',
      desc: 'Engineered specifically for daily product design workflows: instant clipboard copies, hotkeys like Spacebar randomization, and one-click token exports.',
      icon: Palette,
    },
  ];

  const faqs = [
    {
      q: 'Why should I use ColorTools Studio instead of standard graphic software pickers?',
      a: 'Most standard graphic design software still calculates HSL or sRGB lightness linearly, ignoring human ocular sensitivities (e.g. green wavelengths appear vastly brighter to human vision than pure blue). ColorTools Studio applies perceptually weighted math and provides immediate WCAG compliance feedback.',
    },
    {
      q: 'Are the color palettes free for commercial product use?',
      a: 'Yes. All generated color tokens, CSS stylesheets, Tailwind configuration blocks, and SVG/PNG swatch sheets are 100% free and unencumbered by licenses for commercial or personal projects.',
    },
    {
      q: 'Does ColorTools Studio store or track my colors on a remote server?',
      a: 'No. The entire suite operates strictly client-side within your browser runtime. We do not store, track, or transmit your palette data to any remote database.',
    },
    {
      q: 'What is the difference between WCAG AA and AAA?',
      a: 'WCAG AA requires a 4.5:1 contrast ratio for normal text and 3.0:1 for large text or UI components. Level AAA elevates this to 7.0:1 for normal text and 4.5:1 for large text, providing maximum legibility for long-form reading, government services, and healthcare tools.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Hero */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Our Vision &amp; Practice</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Where Color Science Meets Digital Craft.
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          ColorTools Studio was founded on a simple conviction: digital products do not have to choose between arresting, vibrant visual character and universal, accessible legibility.
        </p>
      </div>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="rounded-3xl border border-white/[0.1] bg-[#12141A] p-8 shadow-xl space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{v.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Color Science Standards Section */}
      <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#12141A] via-[#151821] to-[#12141A] p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Technical Foundation
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Our Architectural Color Standards
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We build strictly on international optical standards to ensure your tokens remain robust across mobile devices, high-end desktop screens, and assistive technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0E1017] p-6 space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-400 uppercase">
              W3C WCAG 2.2
            </span>
            <h4 className="text-base font-bold text-white">Criterion 1.4.3 &amp; 1.4.11</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Relative luminance formula with 0.05 flare compensation for high-contrast optical audits.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0E1017] p-6 space-y-2">
            <span className="font-mono text-xs font-bold text-purple-400 uppercase">
              CSS Color 4
            </span>
            <h4 className="text-base font-bold text-white">OKLCH &amp; Display P3</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Perceptual uniformity that eliminates gray bands in color ramps and unlocks 50% wider gamuts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0E1017] p-6 space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
              Viénot CVD Model
            </span>
            <h4 className="text-base font-bold text-white">Trichromatic Matrix</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Precision matrix transformations simulating Protanopia, Deuteranopia, Tritanopia, and Achromatopsia.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Knowledge Base
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.08] bg-[#12141A] p-6 space-y-3"
            >
              <h4 className="text-base font-bold text-white flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-indigo-400 mt-1 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="rounded-3xl border border-white/[0.1] bg-[#12141A] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">Experience the Suite</h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Generate your next accessible design tokens directly in your browser.
          </p>
        </div>
        <Link
          href="/tools/palette-generator"
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Launch Studio Workbench &rarr;
        </Link>
      </div>
    </div>
  );
}
