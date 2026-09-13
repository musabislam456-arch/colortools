import type { Metadata } from 'next';
import { ContrastCheckerClient } from '@/components/ContrastCheckerClient';

export const metadata: Metadata = {
  title: 'WCAG Contrast Checker — AA/AAA Compliance Tool | ColorTools Studio',
  description:
    'Check text and UI contrast ratios against WCAG 2.1/2.2 AA and AAA thresholds in real time. One-click auto-fix, interactive component previews, and instant pass/fail results. Free and client-side.',
  alternates: {
    canonical: '/tools/contrast-checker',
  },
  openGraph: {
    title: 'WCAG Contrast Checker — AA/AAA Compliance Tool',
    description:
      'Check text and UI contrast ratios against WCAG 2.1/2.2 AA and AAA thresholds in real time, with one-click auto-fix and live component previews.',
    type: 'website',
    url: 'https://colortools.utilix.site/tools/contrast-checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WCAG Contrast Checker — AA/AAA Compliance Tool',
    description:
      'Check text and UI contrast ratios against WCAG 2.1/2.2 AA and AAA thresholds in real time with one-click auto-fix.',
  },
};

export default function ContrastCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'WCAG Contrast Checker',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Check foreground/background contrast ratios against WCAG 2.1 and 2.2 AA and AAA thresholds for normal text, large text, and UI components, with one-click auto-fix and live previews.',
    url: 'https://colortools.utilix.site/tools/contrast-checker',
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContrastCheckerClient />
    </>
  );
}
