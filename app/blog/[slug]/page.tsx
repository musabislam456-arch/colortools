import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BlogPost } from '@/data/blog-posts';
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Tag,
  Palette,
  Eye,
  CheckCircle2,
  ArrowRight,
  Grid3x3
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://colortools.utilix.site';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — ColorTools Studio',
    };
  }

  return {
    title: `${post.title} — ColorTools Studio`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const isTailwindShadesPost = post.slug === 'tailwind-color-shades-generator-guide';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ColorTools Studio',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Guides &amp; Research</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 border-b border-white/[0.08] pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="rounded-full bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 font-bold text-indigo-300 uppercase">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.publishedAt}</span>
          </span>
          <span className="text-zinc-600">&bull;</span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
          {post.subtitle}
        </p>

        {/* Author Details & Palette Stripe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-md">
              {post.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{post.author.name}</p>
              <p className="text-[11px] text-zinc-400">{post.author.role}</p>
            </div>
          </div>

          {/* Palette Tokens */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block sm:text-right">
              Palette Tokens
            </span>
            <div className="flex h-7 rounded-lg overflow-hidden border border-white/10 shadow-sm">
              {post.paletteSample.map((hex, i) => (
                <div
                  key={i}
                  className="w-8 h-full"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Prose Content */}
      <article className="prose prose-invert prose-indigo max-w-none space-y-6 text-zinc-300 leading-relaxed font-sans [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-white [&>h2]:tracking-tight [&>h2]:pt-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-white [&>p]:text-sm [&>p]:sm:text-base [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-sm [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:text-sm [&>ol]:space-y-2 [&>pre]:rounded-2xl [&>pre]:border [&>pre]:border-white/[0.1] [&>pre]:bg-[#0D0F14] [&>pre]:p-4 [&>code]:font-mono [&>code]:text-xs [&>code]:text-indigo-300">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      {/* Related Tools Callout Banner */}
      <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-r from-[#12141A] to-[#181B24] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-mono text-indigo-400">
            <Palette className="h-3.5 w-3.5" />
            <span>Interactive Tooling</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Apply these insights in ColorTools Studio
          </h3>
          <p className="text-xs text-zinc-400 max-w-md">
            {isTailwindShadesPost
              ? 'Generate your own accessible 50–950 Tailwind scale from any brand hex, with export-ready code.'
              : 'Test and formulate your own WCAG compliant tokens and wide-gamut gradients in our client-side workbench.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {isTailwindShadesPost ? (
            <Link
              href={`/tools/tailwind-shades?base=${post.paletteSample[2]?.replace('#', '')}`}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Grid3x3 className="h-3.5 w-3.5" />
              <span>Generate Shades</span>
            </Link>
          ) : (
            <Link
              href={`/tools/palette-generator?base=${post.paletteSample[0]?.replace('#', '')}`}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
            >
              Launch Palette
            </Link>
          )}
          <Link
            href={`/tools/contrast-checker?fg=${post.paletteSample[4]?.replace('#', '')}&bg=${post.paletteSample[0]?.replace('#', '')}`}
            className="rounded-xl border border-white/[0.12] bg-[#12141A] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors"
          >
            Audit Contrast
          </Link>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
        <span className="text-xs font-mono uppercase text-zinc-500 font-semibold mr-2">
          Topics:
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-white/[0.08] bg-[#12141A] px-3 py-1 text-xs font-mono text-zinc-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* More Guides */}
      <div className="space-y-6 pt-10 border-t border-white/[0.08]">
        <h3 className="text-xl font-bold text-white">Read Next</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border border-white/[0.08] bg-[#12141A] p-6 hover:border-indigo-500/40 transition-all block space-y-3"
            >
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                {p.category} &bull; {p.readTime}
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                {p.title}
              </h4>
              <p className="text-xs text-zinc-400 line-clamp-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
