import type { Metadata } from 'next';
import { ColorConverterClient } from '@/components/ColorConverterClient';

export const metadata: Metadata = {
  title: 'Color Converter — HEX, RGB, HSL, HSV, CMYK & OKLCH | ColorTools Studio',
  description:
    'Instantly convert colors between HEX, RGB, HSL, HSV, CMYK, and OKLCH. Interactive channel sliders, 9-step tint/shade ramps, and color blindness simulation for Protanopia, Deuteranopia, Tritanopia & Achromatopsia. Free and client-side.',
  alternates: {
    canonical: '/tools/color-converter',
  },
  openGraph: {
    title: 'Color Converter — HEX, RGB, HSL, HSV, CMYK & OKLCH',
    description:
      'Instantly convert colors between HEX, RGB, HSL, HSV, CMYK, and OKLCH, with tint/shade ramps and color blindness simulation.',
    type: 'website',
    url: 'https://colortools.utilix.site/tools/color-converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Converter — HEX, RGB, HSL, HSV, CMYK & OKLCH',
    description:
      'Instantly convert colors between HEX, RGB, HSL, HSV, CMYK, and OKLCH, with tint/shade ramps and color blindness simulation.',
  },
};

export default function ColorConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Converter',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Bi-directionally convert colors across HEX, RGB, HSL, HSV, CMYK, and OKLCH formats, with 9-step tint and shade ramps and simulation for four types of color vision deficiency.',
    url: 'https://colortools.utilix.site/tools/color-converter',
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorConverterClient />
    </>
  );
}
