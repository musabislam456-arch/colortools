import type { Metadata } from 'next';
import { GradientWorkspace } from '@/components/GradientWorkspace';
import { Layers, Sparkles, Code2, Paintbrush } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CSS Gradient Studio — Linear & Radial Color Generators | ColorTools Studio',
  description:
    'Sculpt multi-stop linear and radial gradients with custom angle control, curated agency presets, modern OKLCH color interpolation, and instant CSS / SVG exports.',
};

export default function GradientGeneratorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-mono font-semibold text-pink-300">
          <Layers className="h-3.5 w-3.5 text-pink-400" />
          <span>Modern CSS &amp; OKLCH Gradient Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Dynamic Gradient Studio
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Craft multi-stop linear and radial gradient meshes for high-end web applications. Fine-tune angles, adjust stop positions, test against real glassmorphism cards and device mockups, and copy clean CSS or Tailwind classes.
        </p>
      </div>

      {/* Main Workspace */}
      <GradientWorkspace />

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Why OKLCH Interpolation Matters</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Standard sRGB gradients pass through muddy desaturated gray bands when transitioning between complementary hues. Declaring <code>in oklch</code> keeps the chromatic arc vibrant across the entire spectrum.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <Paintbrush className="h-4 w-4" />
            <span>Multi-Stop Precision</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Add up to 6 custom color stops with dedicated percentage sliders. Perfect for creating subtle bioluminescent highlights and atmospheric dark mode backgrounds.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#12141A] p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Code2 className="h-4 w-4" />
            <span>1080p Vector &amp; Raster Exports</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Download crisp full-HD PNG images for Figma mockups or pure scalable SVG vector files ready for embedding in production codebases.
          </p>
        </div>
      </div>
    </div>
  );
}
