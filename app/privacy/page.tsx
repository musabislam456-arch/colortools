import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — ColorTools Studio',
  description:
    'ColorTools Studio privacy policy. Learn how our client-side architecture guarantees zero data harvesting and complete privacy for your design tokens.',
};

export default function PrivacyPolicyPage() {
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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Privacy by Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Last Updated: March 2026 &bull; Effective Immediately
        </p>
      </header>

      <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Fundamental Philosophy: Client-Side Execution</h2>
          <p>
            ColorTools Studio is engineered from the ground up as a <strong>100% client-side design utility suite</strong>. When you generate color palettes, audit WCAG contrast, construct CSS gradients, or translate color coordinates, all calculations occur strictly in your browser runtime.
          </p>
          <p>
            We do not transmit your active hex codes, custom palettes, brand colors, or gradient configurations to remote application servers. Your creative assets remain entirely on your local device.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>We do not record your generated color palettes or design tokens.</li>
            <li>We do not require user account creation or passwords to access our core utility suite.</li>
            <li>We do not profile your usage or sell behavioral data to third-party ad brokers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Local Storage &amp; Browser Cache</h2>
          <p>
            Any user preferences you adjust (such as locked palette slots, theme settings, or temporary workspace history) are stored locally in your browser’s standard storage (such as <code>localStorage</code> or session memory). You can clear this data at any time through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Optional Communications &amp; Inquiries</h2>
          <p>
            If you voluntarily submit a message through our Contact form or subscribe to our weekly design token newsletter, we use your provided email address solely to respond to your specific inquiry or dispatch the requested digest. You can unsubscribe at any time with a single click.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions about our architectural privacy practices, contact our team at{' '}
            <a href="mailto:privacy@colortools.studio" className="text-indigo-400 hover:underline">
              privacy@colortools.studio
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
