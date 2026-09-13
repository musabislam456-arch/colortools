import type { Metadata } from 'next';
import { PaletteGeneratorClient } from '@/components/PaletteGeneratorClient';

export const metadata: Metadata = {
  title: 'Color Palette Generator — 5-Color Harmony Tool | ColorTools Studio',
  description:
    'Generate balanced, high-contrast 5-color palettes from any base hex. 7 harmony algorithms, slot locking, live mockup previews, and export to CSS, Tailwind, JSON, SVG & PNG. Free and client-side.',
  alternates: {
    canonical: '/tools/palette-generator',
  },
  openGraph: {
    title: 'Color Palette Generator — 5-Color Harmony Tool',
    description:
      'Generate balanced, high-contrast 5-color palettes from any base hex with 7 harmony algorithms, live mockup previews, and instant export.',
    type: 'website',
    url: 'https://colortools.utilix.site/tools/palette-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Palette Generator — 5-Color Harmony Tool',
    description:
      'Generate balanced, high-contrast 5-color palettes from any base hex with 7 harmony algorithms and instant export.',
  },
};

export default function PaletteGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Palette Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Generate balanced, high-contrast 5-color palettes from any base hex color using 7 harmony algorithms, with slot locking, live mockup previews, and export to CSS, Tailwind, JSON, SVG, or PNG.',
    url: 'https://colortools.utilix.site/tools/palette-generator',
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PaletteGeneratorClient />
    </>
  );
}
