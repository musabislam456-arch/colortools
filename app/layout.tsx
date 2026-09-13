import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://colortools.utilix.site'),
  title: 'ColorTools Studio — Creative Agency Grade Color Suite',
  description:
    'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, and multi-format Color Converter.',
  openGraph: {
    title: 'ColorTools Studio — Creative Agency Grade Color Suite',
    description:
      'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, and multi-format Color Converter.',
    type: 'website',
    url: 'https://colortools.utilix.site',
    siteName: 'ColorTools Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ColorTools Studio — Creative Agency Grade Color Suite',
    description:
      'Professional design-utility site featuring an intelligent Color Palette Generator, WCAG AA/AAA Contrast Checker, Dynamic Gradient Studio, and multi-format Color Converter.',
  },
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
