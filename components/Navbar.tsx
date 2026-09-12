'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Palette,
  Eye,
  Sliders,
  RefreshCw,
  Layers,
  BookOpen,
  Info,
  Mail,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const tools = [
    {
      name: 'Palette Generator',
      href: '/tools/palette-generator',
      description: 'Generate harmonious 5-color palettes from any base hex',
      icon: Palette,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      name: 'Contrast Checker',
      href: '/tools/contrast-checker',
      description: 'Real-time WCAG 2.1 AA/AAA compliance & auto-fix',
      icon: Eye,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Gradient Studio',
      href: '/tools/gradient-generator',
      description: 'Multi-stop linear & radial CSS gradient builder',
      icon: Layers,
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Color Converter',
      href: '/tools/color-converter',
      description: 'Instant HEX, RGB, HSL, HSV, CMYK & OKLCH translation',
      icon: Sliders,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const isToolActive = pathname.startsWith('/tools');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0A0B0E]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Palette className="h-5 w-5 text-white" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-mono">
              ColorTools<span className="text-indigo-400">.Studio</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
              Design Utility Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <Link
              href="/tools"
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                isToolActive
                  ? 'text-white bg-white/[0.08]'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>Design Tools</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsDropdownOpen ? 'rotate-180 text-indigo-400' : 'text-zinc-400'
                }`}
              />
            </Link>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 rounded-xl border border-white/[0.1] bg-[#12141A] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Studio Utilities
                  </p>
                </div>
                <div className="space-y-1">
                  {tools.map((t) => {
                    const Icon = t.icon;
                    const active = pathname === t.href;
                    return (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors ${
                          active
                            ? 'bg-indigo-500/15 text-white'
                            : 'text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${t.color}`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-zinc-400 leading-snug">
                            {t.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.06] px-3 pb-1">
                  <Link
                    href="/tools"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-center justify-between text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    <span>View All Tools & Hub</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname.startsWith('/blog')
                ? 'text-white bg-white/[0.08]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Guides & Articles
          </Link>

          <Link
            href="/about"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/about'
                ? 'text-white bg-white/[0.08]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            About Studio
          </Link>

          <Link
            href="/contact"
            className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === '/contact'
                ? 'text-white bg-white/[0.08]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/tools/palette-generator"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/40 transition-all active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Studio</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.1] bg-[#0E1017] px-4 pt-3 pb-6 md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 pb-3 border-b border-white/[0.08]">
            <p className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Core Design Tools
            </p>
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon className="h-4 w-4 text-indigo-400" />
                  <span>{t.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="space-y-1 pt-3">
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            >
              Tools Overview Hub
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            >
              Guides & Articles
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            >
              About Studio
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.08]">
            <Link
              href="/tools/palette-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:bg-indigo-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Studio</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
