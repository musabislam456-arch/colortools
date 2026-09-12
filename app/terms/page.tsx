import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — ColorTools Studio',
  description:
    'ColorTools Studio terms of service governing usage of our color calculation engines, exported design tokens, and digital design guides.',
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <header className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <FileText className="h-3.5 w-3.5 text-indigo-400" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Effective Date: March 2026 &bull; Version 2.4
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the ColorTools Studio website, web utilities, and educational resources, you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, your sole remedy is to cease using the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Free Commercial License for Generated Assets</h2>
          <p>
            All color palettes, contrast validation reports, CSS code snippets, Tailwind configuration files, SVG vector swatches, and PNG preview graphics generated using our tools are <strong>100% royalty-free and yours to own</strong>. You are free to use, modify, distribute, and embed these generated tokens in personal, commercial, open-source, or proprietary design systems with no attribution required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Intellectual Property of Studio Platform</h2>
          <p>
            The proprietary branding, UI layouts, interactive workbench source code, written research guides, and custom graphics of ColorTools Studio remain the intellectual property of ColorTools Studio and its contributors. You may not clone or rehost our core platform as an identical commercial service without prior written authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Disclaimer of Warranty &amp; Accessibility Verification</h2>
          <p>
            While our WCAG contrast algorithms are built strictly according to W3C specifications (WCAG 2.1 / 2.2 Criterion 1.4.3 &amp; 1.4.11), ColorTools Studio is provided &ldquo;as is&rdquo;. Total digital accessibility depends on multiple human factors, screen calibrations, ambient lighting, and semantic DOM structures. We encourage formal manual user testing alongside automated computational audits.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Governing Law &amp; Inquiries</h2>
          <p>
            These terms are governed by standard commercial internet regulations. For any questions or enterprise license queries, please reach out to{' '}
            <a href="mailto:legal@colortools.studio" className="text-indigo-400 hover:underline">
              legal@colortools.studio
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
