import type { Metadata } from 'next';
import { TailwindShadesWorkspace } from '@/components/TailwindShadesWorkspace';
import { Grid3x3, ShieldCheck, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tailwind CSS Color Shades Generator (50–950) — Free & Accessible | ColorTools Studio',
  description:
    'Turn any hex color into a complete Tailwind CSS shade scale from 50 to 950. Accessible text pairing built in. Export to Tailwind v3 config, v4 @theme, CSS variables, or JSON. Free and client-side.',
  alternates: {
    canonical: '/tools/tailwind-shades',
  },
  openGraph: {
    title: 'Tailwind CSS Color Shades Generator (50–950)',
    description:
      'Generate a full 50–950 Tailwind color scale from any hex code, with accessible text pairing and one-click export to v3 config, v4 CSS, or JSON.',
    type: 'website',
    url: 'https://colortools.toolbay.site/tools/tailwind-shades',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailwind CSS Color Shades Generator (50–950)',
    description:
      'Generate a full 50–950 Tailwind color scale from any hex code, with accessible text pairing built in.',
  },
};

const faqs = [
  {
    q: 'How does the 50–950 shade scale get generated?',
    a: 'Your base color is converted to HSL and snapped to the closest of 11 fixed lightness stops (50 through 950). Every other stop keeps the same hue and walks the same lightness ladder, with saturation trimmed near the extremes so near-white and near-black shades stay natural instead of neon or muddy.',
  },
  {
    q: 'Does this work with Tailwind CSS v4?',
    a: 'Yes. The v4 export tab outputs a ready-to-paste @theme block with --color-{name}-{shade} CSS variables, which is how Tailwind v4 defines custom colors. The v3 tab still outputs a classic tailwind.config.js colors object for older projects.',
  },
  {
    q: 'Will my exact brand color be preserved?',
    a: 'Yes. Whichever stop your base color\'s lightness is closest to gets pinned to your exact hex — it is never recalculated or approximated, so bg-brand-500 (or whichever shade gets pinned) always matches your brand color precisely.',
  },
  {
    q: 'How do I know which shade to use for readable text?',
    a: 'Each swatch already displays its label in whichever of white or black passes a higher WCAG contrast ratio. As a general pattern, shades 50–300 work with dark text and 600–950 work with white text — double check any borderline pair in the WCAG contrast checker.',
  },
];

export default function TailwindShadesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tailwind CSS Color Shades Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Generate a complete Tailwind CSS 50–950 color shade scale from any base hex color, with accessible text pairing and export to Tailwind v3, v4, CSS variables, or JSON.',
    url: 'https://colortools.toolbay.site/tools/tailwind-shades',
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
          <Grid3x3 className="h-3.5 w-3.5 text-indigo-400" />
          <span>Tailwind CSS v3 &amp; v4 Compatible</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Tailwind Color Shades Generator
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Turn a single brand hex into a full 50–950 Tailwind color scale. Your exact
          color is pinned to its nearest shade, every other stop follows Tailwind&apos;s
          own lightness curve, and each swatch shows which text color actually passes
          WCAG contrast — export straight to your config.
        </p>
      </div>

      {/* Main Interactive Workspace */}
      <TailwindShadesWorkspace />

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-indigo-400 font-bold">
            Pinned Base Color
          </p>
          <h4 className="text-base font-bold text-white">Your Hex, Preserved Exactly</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Instead of approximating your brand color, the generator snaps it to the
            closest lightness stop and keeps it pixel-exact, deriving every other shade
            around it.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Accessible by Default
          </p>
          <h4 className="text-base font-bold text-white">Contrast-Checked Labels</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Every shade already knows whether white or black text reads better against
            it, so you are not left guessing which stops are safe for body copy or
            buttons.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <p className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Framework Ready
          </p>
          <h4 className="text-base font-bold text-white">4 Export Formats</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Copy a Tailwind v3 config object, a v4 @theme block, plain CSS custom
            properties, or a flat JSON token map — whichever your stack needs.
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
