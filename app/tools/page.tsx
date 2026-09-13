import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  Eye,
  Layers,
  Sliders,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code,
  Grid3x3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Design Utilities Hub — ColorTools Studio',
  description:
    'Explore the full suite of client-side color engineering tools: Palette Generator, WCAG Contrast Checker, Gradient Studio, Tailwind Shades Generator, and multi-format Color Converter.',
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: 'Color Palette Generator',
      href: '/tools/palette-generator',
      description:
        'Generate harmonically cohesive 5-slot color palettes from any base hex. Includes locking, analogous/triadic/complementary rules, live SaaS & mobile mockups, and CSS/Tailwind export.',
      icon: Palette,
      tag: 'Core Generator',
      color: 'from-blue-500 to-indigo-600',
      features: [
        '7 color harmony algorithms',
        'Slot locking with Spacebar randomize',
        'Export to CSS, Tailwind, JSON, SVG & PNG',
        'Live mobile & dashboard mockup preview',
      ],
    },
    {
      title: 'WCAG Contrast Checker',
      href: '/tools/contrast-checker',
      description:
        'Calculate precise WCAG 2.1 & 2.2 relative luminance contrast ratios for text and UI components. Features auto-fix luminance targeting for AA (4.5:1) and AAA (7:1).',
      icon: Eye,
      tag: 'Accessibility Audit',
      color: 'from-emerald-500 to-teal-600',
      features: [
        'W3C relative luminance calculation',
        'AA & AAA compliance for normal & large text',
        'One-click auto-fix to target ratio',
        'Realistic interactive UI component test canvas',
      ],
    },
    {
      title: 'Dynamic Gradient Studio',
      href: '/tools/gradient-generator',
      description:
        'Sculpt rich multi-stop linear and radial gradients with custom angles, modern OKLCH color interpolation to prevent gray dead-zones, and 1080p PNG export.',
      icon: Layers,
      tag: 'CSS Generator',
      color: 'from-pink-500 to-rose-600',
      features: [
        'Multi-stop linear and radial builder',
        'Modern CSS Color 4 `in oklch` support',
        'Curated studio gradient presets',
        'Direct CSS, Tailwind, and SVG exports',
      ],
    },
    {
      title: 'Tailwind Color Shades Generator',
      href: '/tools/tailwind-shades',
      description:
        'Turn a single brand hex into a full 50–950 Tailwind color scale. Your exact color is pinned to its nearest shade, and every swatch shows which text color passes WCAG contrast.',
      icon: Grid3x3,
      tag: 'Design Tokens',
      color: 'from-violet-500 to-fuchsia-600',
      features: [
        'Perceptual 50–950 lightness-curve algorithm',
        'Exact base color pinned, never approximated',
        'Accessible text pairing shown per shade',
        'Export to Tailwind v3, v4, CSS vars, or JSON',
      ],
    },
    {
      title: 'Hex / RGB / HSL / CMYK Converter',
      href: '/tools/color-converter',
      description:
        'Instantaneous bi-directional translation across HEX, RGB, HSL, HSV, CMYK, and OKLCH color formats. Includes 4-type color vision deficiency simulation.',
      icon: Sliders,
      tag: 'Color Math',
      color: 'from-amber-500 to-orange-600',
      features: [
        'Bi-directional live sliders & inputs',
        'Color blindness simulation (Protan, Deutan, Tritan, Achromat)',
        'Design system 9-step tints & shades ramp',
        'One-click clipboard copy for all models',
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          <span>Complete Utility Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Studio Design Utilities
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Five dedicated workspaces engineered to streamline color selection, mathematical contrast validation, gradient production, Tailwind design tokens, and multi-coordinate conversion.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.title}
              className="flex flex-col justify-between rounded-3xl border border-white/[0.1] bg-[#12141A] p-8 shadow-xl hover:border-indigo-500/40 transition-all group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300">
                    {tool.tag}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-white/[0.06] pt-4">
                  <p className="text-xs font-mono uppercase text-zinc-500 font-semibold">
                    Core Capabilities
                  </p>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {tool.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-white/[0.06]">
                <Link
                  href={tool.href}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.08] hover:bg-indigo-600 px-5 py-3 text-xs font-bold text-white transition-colors shadow-md"
                >
                  <span>Launch {tool.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
