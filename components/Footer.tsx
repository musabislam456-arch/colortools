'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Eye,
  Layers,
  Sliders,
  CheckCircle2,
  Send,
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090C] text-zinc-400">
      {/* Top Banner / Studio Ethos */}
      <div className="border-b border-white/[0.06] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
              <Sparkles className="h-3 w-3" />
              <span>100% Client-Side Color Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Crafting vibrant, universally accessible interfaces.
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl">
              ColorTools Studio combines rigorous W3C color science with modern aesthetic design systems for engineers, designers, and creative agencies.
            </p>
          </div>

          {/* Quick Palette of the Week Preview */}
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#12141A] p-3 shadow-lg">
            <span className="text-xs font-mono uppercase text-zinc-400 pr-2">
              Studio Pick
            </span>
            {['#0F172A', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'].map((hex) => (
              <div
                key={hex}
                className="group relative h-8 w-8 rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-110"
                style={{ backgroundColor: hex }}
                title={`Click to view: ${hex}`}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] font-mono text-white transition-opacity pointer-events-none whitespace-nowrap">
                  {hex}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-mono">
                ColorTools<span className="text-indigo-400">.Studio</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed pr-6">
              Precision color engineering tools for high-performing product teams. Free, privacy-first, and calculated natively in your browser with zero latency.
            </p>
            <div className="pt-2">
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email for weekly palettes..."
                  className="flex-1 rounded-lg border border-white/[0.1] bg-[#12141A] px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Thank you! You are subscribed to weekly design tokens.</span>
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Design Utilities
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/palette-generator"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Palette Generator</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/contrast-checker"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>WCAG Contrast Checker</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/gradient-generator"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>CSS Gradient Studio</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/color-converter"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>HEX / RGB / HSL / CMYK</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Explore All Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Guides & Resources */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Guides & Research
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/accessible-color-design-basics"
                  className="hover:text-white transition-colors line-clamp-1"
                >
                  Accessible Color Design Basics
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2026-color-trends-for-web-design"
                  className="hover:text-white transition-colors line-clamp-1"
                >
                  2026 Color Trends for Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/mastering-modern-css-color-spaces"
                  className="hover:text-white transition-colors line-clamp-1"
                >
                  Mastering OKLCH & Display P3
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Browse All Articles &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Studio & Policies
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Standards Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>WCAG 2.1 & 2.2 Compliant Algorithms</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Standard CIE-1931 &amp; sRGB Gamut</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>CSS Color Module Level 4</span>
          </div>

          <div className="flex items-center gap-6">
            <p>&copy; {new Date().getFullYear()} ColorTools Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
