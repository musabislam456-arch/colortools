import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://colortools.toolbay.site'),
  title: 'ColorTools Studio — Creative Agency Grade Color Suite',
  description:
    'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, Tailwind Color Shades Generator, and multi-format Color Converter.',
  openGraph: {
    title: 'ColorTools Studio — Creative Agency Grade Color Suite',
    description:
      'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, Tailwind Color Shades Generator, and multi-format Color Converter.',
    type: 'website',
    url: 'https://colortools.toolbay.site',
    siteName: 'ColorTools Studio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'ColorTools Studio — Creative Agency Grade Color Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ColorTools Studio — Creative Agency Grade Color Suite',
    description:
      'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, Tailwind Color Shades Generator, and multi-format Color Converter.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'I_SaNu0LrbiQSkKmCb7bm8LRBISuViD4KTJh0FHRo2s',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="bg-[#0A0B0E] text-[#E2E8F0] antialiased min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200"
      >
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
        {/* <!-- CHATBOT_SCRIPT_START --> */}
        {/* <!-- Paste client's chatbot <script> embed code here --> */}
        {/* <!-- CHATBOT_SCRIPT_END --> */}
      </body>
    </html>
  );
}
