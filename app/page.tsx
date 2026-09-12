'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Eye,
  Layers,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  BookOpen,
  Shuffle,
  MonitorSmartphone,
  ExternalLink
} from 'lucide-react';
import { PaletteWorkspace } from '@/components/PaletteWorkspace';
import { ContrastWorkspace } from '@/components/ContrastWorkspace';
import { GradientWorkspace } from '@/components/GradientWorkspace';
import { ConverterWorkspace } from '@/components/ConverterWorkspace';
import { BLOG_POSTS } from '@/data/blog-posts';
import { useToast } from '@/components/Toast';

export default function HomePage() {
  const { copyToClipboard } = useToast();
  const [activeTab, setActiveTab] = useState<'palette' | 'contrast' | 'gradient' | 'converter'>('palette');

  const tools = [
    {
      id: 'palette' as const,
      name: 'Palette Generator',
      badge: 'Harmonic 5-Tier',
      desc: 'Formulate balanced design token palettes with locking, rules & UI mockups',
      href: '/tools/palette-generator',
      icon: Palette,
      accent: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'contrast' as const,
      name: 'WCAG Contrast',
      badge: 'AA / AAA Verified',
      desc: 'Real-time relative luminance audits, component previews & auto-fixing',
      href: '/tools/contrast-checker',
      icon: Eye,
      accent: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'gradient' as const,
      name: 'Gradient Studio',
      badge: 'OKLCH & Linear',
      desc: 'Multi-stop linear and radial gradient builder with instant CSS and SVG exports',
      href: '/tools/gradient-generator',
      icon: Layers,
      accent: 'from-pink-500 to-rose-600',
    },
    {
      id: 'converter' as const,
      name: 'Color Converter',
      badge: '6 Color Models',
      desc: 'Simultaneous HEX, RGB, HSL, HSV, CMYK, OKLCH and CVD vision simulator',
      href: '/tools/color-converter',
      icon: Sliders,
      accent: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 border-b border-white/[0.08]">
        {/* Subtle geometric agency background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-pink-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Studio Release 2026 &bull; W3C WCAG 2.2 Compliant</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Engineering Color for the{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Modern Screen.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              The high-fidelity design utility suite for digital product teams, brand architects, and frontend engineers. Formulate harmonious palettes, audit accessible contrast in real-time, sculpt multi-stop gradients, and convert color spaces with zero latency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/tools/palette-generator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all active:scale-[0.98]"
              >
                <span>Launch Palette Studio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/contrast-checker"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#141720] px-5 py-3.5 text-sm font-semibold text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Test Contrast Ratio</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/[0.08] pt-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">100%</p>
              <p className="text-xs text-zinc-400 mt-0.5">Client-Side Engine</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white font-mono">0.00ms</p>
              <p className="text-xs text-zinc-400 mt-0.5">Zero API Latency</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">WCAG 2.2</p>
              <p className="text-xs text-zinc-400 mt-0.5">Mathematical Accuracy</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">OKLCH &amp; P3</p>
              <p className="text-xs text-zinc-400 mt-0.5">Wide Gamut CSS Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Studio Workbench */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Workbench Header & Tool Selector Tabs */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                Live Studio Workbench
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Interactive Color Suite
              </h2>
            </div>

            {/* Tab Pills */}
            <div className="flex flex-wrap items-center rounded-2xl border border-white/[0.1] bg-[#12141A] p-1.5 text-xs">
              {tools.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Workspace Display */}
          <div className="pt-2">
            {activeTab === 'palette' && <PaletteWorkspace initialHex="#4F46E5" />}
            {activeTab === 'contrast' && <ContrastWorkspace initialFg="#FFFFFF" initialBg="#0B0F19" />}
            {activeTab === 'gradient' && <GradientWorkspace />}
            {activeTab === 'converter' && <ConverterWorkspace initialHex="#6366F1" />}
          </div>
        </div>
      </section>

      {/* 4 Core Tools Bento Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            Dedicated Workspaces
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineered for Precision Design
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every tool is purpose-built to eliminate friction between visual concept, mathematical compliance, and production frontend code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative rounded-3xl border border-white/[0.1] bg-[#12141A] p-8 shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.accent} shadow-md`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-zinc-300">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Open Dedicated Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(tool.id);
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
                  >
                    Preview in Workbench &uarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog & Color Research Guides Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] pt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Research &amp; Field Guides
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Color Science &amp; Modern Web Strategy
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              In-depth essays and mathematical explanations written by design technologists.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#141720] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08] transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#12141A] p-6 shadow-xl hover:border-indigo-500/40 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Palette swatch stripe */}
                <div className="flex h-3 w-full rounded-full overflow-hidden border border-white/10">
                  {post.paletteSample.map((hex, i) => (
                    <div key={i} className="flex-1 h-full" style={{ backgroundColor: hex }} />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="text-indigo-400 uppercase font-semibold">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-zinc-400">{post.author.name}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Studio Palette of the Week callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#12141A] via-[#161922] to-[#12141A] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-mono font-semibold text-indigo-400">
              Curated Production Palette
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to construct your design tokens?
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Export production-ready CSS variables, Tailwind palettes, and SVG swatch sheets instantly. No signup required, always free and client-side.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/tools/palette-generator"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
              >
                Open Palette Generator
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-white/[0.12] bg-[#141720] hover:bg-white/[0.06] px-5 py-3 text-xs font-semibold text-zinc-200 transition-colors"
              >
                Learn Color Science Standards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
