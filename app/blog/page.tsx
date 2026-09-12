'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BlogPost } from '@/data/blog-posts';
import { BookOpen, Search, ArrowRight, Sparkles, Tag, Clock, User } from 'lucide-react';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Accessibility', 'Trends', 'Engineering'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
          <span>Design Technologist Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Color Science &amp; Interface Guides
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Comprehensive essays, mathematical deep dives, and production design guidelines on WCAG contrast, modern CSS color models, and visual interface trends.
        </p>
      </div>

      {/* Featured Article Hero */}
      {featuredPost && (
        <div className="relative rounded-3xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-10 shadow-2xl overflow-hidden hover:border-indigo-500/40 transition-colors">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 text-xs font-mono font-bold text-indigo-300 uppercase">
                  Featured Guide
                </span>
                <span className="text-xs text-zinc-400 font-mono">{featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-indigo-400 transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {featuredPost.subtitle}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">{featuredPost.author.name}</span>
                  <span className="text-[11px] text-zinc-400">{featuredPost.author.role}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Visual Palette Representation */}
            <div className="lg:col-span-5 flex flex-col gap-3 rounded-2xl bg-[#181B24] p-6 border border-white/[0.08]">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Associated Article Palette Tokens
              </span>
              <div className="flex h-20 w-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
                {featuredPost.paletteSample.map((hex, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full relative group cursor-pointer"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {featuredPost.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/[0.05] px-2 py-1 text-[11px] font-mono text-zinc-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-[#181B24] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, tokens..."
            className="w-full rounded-xl border border-white/[0.1] bg-[#12141A] pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#12141A] p-7 shadow-xl hover:border-indigo-500/40 transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Palette stripe */}
              <div className="flex h-3 w-full rounded-full overflow-hidden border border-white/10 shadow-sm">
                {post.paletteSample.map((hex, i) => (
                  <div key={i} className="flex-1 h-full" style={{ backgroundColor: hex }} />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="text-indigo-400 font-bold uppercase">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 font-medium">{post.author.name}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
