import type { Metadata } from 'next';
import { ShadcnThemeWorkspace } from '@/components/ShadcnThemeWorkspace';
import { Paintbrush, ShieldCheck, Moon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'shadcn/ui Theme Generator — Accessible Light & Dark Themes | ColorTools Studio',
  description:
    'Turn one brand color into a complete shadcn/ui theme: all CSS variables for light and dark mode, contrast-checked against WCAG AA. Live component preview, export to globals.css, Tailwind config, or JSON. Free and client-side.',
  alternates: {
    canonical: '/tools/shadcn-theme-generator',
  },
  openGraph: {
    title: 'shadcn/ui Theme Generator — Accessible Light & Dark Themes',
    description:
      'Generate a complete, WCAG-checked shadcn/ui theme (light + dark) from a single base color, with live component preview and one-click export.',
    type: 'website',
    url: 'https://colortools.utilix.site/tools/shadcn-theme-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shadcn/ui Theme Generator — Accessible Light & Dark Themes',
    description:
      'Generate a complete, WCAG-checked shadcn/ui theme (light + dark) from a single base color, with live component preview.',
  },
};

const faqs = [
  {
    q: 'What CSS variables does this generate?',
    a: 'All 19 core shadcn/ui tokens: background, foreground, card, popover, primary, secondary, muted, accent, destructive (each with a matching -foreground pair), plus border, input, and ring — generated separately for both light and dark mode.',
  },
  {
    q: 'Why does destructive stay red no matter what color I pick?',
    a: "Error and delete states need to stay recognizably red regardless of your brand hue — that's the shadcn/ui convention this generator follows, so a purple or teal brand theme never ends up with a purple 'Delete Account' button.",
  },
  {
    q: 'Is the generated theme actually accessible, or just close?',
    a: 'Every foreground/background pair — text on page, text on card, button text on primary/secondary/destructive, muted and accent text — is run through the WCAG relative luminance formula and checked against the 4.5:1 AA threshold, shown live in the contrast audit panel below the preview.',
  },
  {
    q: 'Does this work with Tailwind v3 or v4?',
    a: 'Yes. The globals.css export gives you the raw :root and .dark variable blocks that work with either version. The Tailwind v3 tab additionally gives you the tailwind.config.js colors object that maps each token to its CSS variable.',
  },
];

export default function ShadcnThemeGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'shadcn/ui Theme Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Generate a complete shadcn/ui theme (light and dark mode CSS variables) from a single base color, contrast-checked against WCAG AA, with live component preview and export to globals.css, Tailwind config, or JSON.',
    url: 'https://colortools.utilix.site/tools/shadcn-theme-generator',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <Paintbrush className="h-3.5 w-3.5 text-indigo-400" />
          <span>shadcn/ui Compatible</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          shadcn/ui Theme Generator
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Pick one brand color and get a complete, accessible shadcn/ui theme — every CSS
          variable for light and dark mode, contrast-checked against WCAG AA, previewed
          live on real components, and ready to paste into your project.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <ShadcnThemeWorkspace />

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-indigo-400 font-bold">
            One Color In
          </p>
          <h4 className="text-base font-bold text-white">19 Tokens Out</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Background, card, popover, primary, secondary, muted, accent, destructive,
            border, input, and ring — every shadcn/ui variable derived from your single
            base hue.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Contrast-Checked
          </p>
          <h4 className="text-base font-bold text-white">Not Just Plausible — Verified</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Every foreground/background pair is run through the WCAG relative luminance
            formula and checked against 4.5:1, live, before you ever ship it.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
            <Moon className="h-3.5 w-3.5" />
            Light &amp; Dark, Together
          </p>
          <h4 className="text-base font-bold text-white">Both Modes, One Pass</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Dark mode isn&apos;t an inverted afterthought — it&apos;s generated with its own
            lightness curve so primary buttons and destructive states keep their punch on
            a dark background too.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6 pt-10 border-t border-white/[0.08]">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-white/[0.08] bg-[#12141A] p-6 space-y-2"
            >
              <h3 className="text-sm font-bold text-white">{f.q}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
