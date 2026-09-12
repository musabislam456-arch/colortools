export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'Accessibility' | 'Trends' | 'Color Science' | 'Engineering';
  tags: string[];
  paletteSample: string[];
  excerpt: string;
  contentHtml: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'accessible-color-design-basics',
    title: 'Accessible Color Design Basics: The Pragmatic Guide to WCAG AA & AAA Compliance',
    subtitle: 'Move beyond arbitrary contrast ratios to build inclusive, legible color systems that look stunning without sacrificing readability.',
    publishedAt: 'February 28, 2026',
    readTime: '7 min read',
    author: {
      name: 'Elena Vance',
      role: 'Principal Design Technologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    category: 'Accessibility',
    tags: ['WCAG 2.2', 'Contrast Ratio', 'Design Systems', 'Inclusive Design'],
    paletteSample: ['#0A0E17', '#2563EB', '#10B981', '#F59E0B', '#F8FAFC'],
    excerpt:
      'Understanding relative luminance, contrast math, and how to balance bold branding with strict WCAG AA/AAA standards without ending up with dull, washed-out layouts.',
    contentHtml: `
      <h2>The Reality of Visual Accessibility on the Modern Web</h2>
      <p>Over 2.2 billion people worldwide live with some form of visual impairment, ranging from moderate myopia and astigmatism to severe low vision and color vision deficiency (CVD). When digital interfaces rely solely on subtle tonal distinctions, millions of users are locked out of critical software, checkout flows, and documentation.</p>
      <p>Too often, designers view WCAG guidelines as an aesthetic handicap—assuming that accessibility strictly demands boring black text on stark white backgrounds. In truth, true typographic and color mastery lies in engineering palettes that simultaneously hit contrast thresholds while delivering emotive, brand-defining beauty.</p>

      <h2>Deconstructing the WCAG 2.1 / 2.2 Mathematical Formula</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) compute contrast using <strong>Relative Luminance ($L$)</strong>, normalized between 0.0 (pure black) and 1.0 (pure sRGB white):</p>
      <pre><code>Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)</code></pre>
      <p>Where <code>L1</code> is the relative luminance of the lighter color, and <code>L2</code> is the relative luminance of the darker color. The constant <code>0.05</code> compensates for ambient glare and display flare.</p>

      <h3>The Standard Benchmarks You Must Know</h3>
      <ul>
        <li><strong>WCAG AA Normal Text (&lt; 18pt or &lt; 14pt bold):</strong> Minimum <strong>4.5:1</strong> contrast ratio.</li>
        <li><strong>WCAG AA Large Text (&ge; 18pt or &ge; 14pt bold):</strong> Minimum <strong>3.0:1</strong> contrast ratio.</li>
        <li><strong>WCAG AAA Normal Text:</strong> Minimum <strong>7.0:1</strong> contrast ratio (the gold standard for heavy reading environments and governmental tools).</li>
        <li><strong>WCAG AA UI Components & Graphical Objects:</strong> Minimum <strong>3.0:1</strong> contrast against adjacent backgrounds for input borders, focus indicators, and chart icons.</li>
      </ul>

      <h2>Three Tactical Steps for Bulletproof Accessible Palettes</h2>
      
      <h3>1. Never Rely on Hue Alone to Signal State</h3>
      <p>Roughly 8% of men and 0.5% of women have Red-Green color deficiency (Protanopia or Deuteranopia). If an input validation error is designated solely by changing a gray line to <code>#EF4444</code> (Red), users with CVD will frequently fail to register the change.</p>
      <p><strong>The Fix:</strong> Pair color indicators with secondary cues: an inline exclamation icon, microcopy explaining the error, and a distinct border weight increase.</p>

      <h3>2. Build Perceptually Uniform Lightness Ramps</h3>
      <p>Standard sRGB color pickers do not account for human optical sensitivity—the human eye is vastly more sensitive to green wavelengths (luminance multiplier 0.7152) than blue (0.0722). A yellow at 50% lightness looks blindingly bright, while a pure blue at 50% lightness looks dark and heavy.</p>
      <p>When engineering design tokens, organize your neutral and accent tiers using relative luminance checkpoints. Ensure that any token labeled <code>text-muted</code> satisfies 4.5:1 against both <code>surface-primary</code> and <code>surface-raised</code>.</p>

      <h3>3. Test Under Real-World Screen Glare</h3>
      <p>Laboratory contrast on a calibrated Apple Studio Display doesn't reflect a smartphone user standing at a sunny train platform with fingerprint smudges on their screen. Testing on mobile devices at 50% screen brightness is the fastest way to detect fragile contrast edges.</p>

      <h2>Summary Checklist for Your Next Sprint</h2>
      <ol>
        <li>Audit all primary button combinations: verify text against background &ge; 4.5:1.</li>
        <li>Check focus rings: keyboard focus states must exhibit at least a 3.0:1 contrast against both the button and the surrounding page canvas.</li>
        <li>Verify table and chart data markers: use patterns, dashed lines, and labeled tooltips alongside palette colors.</li>
      </ol>
    `,
  },
  {
    slug: '2026-color-trends-for-web-design',
    title: '2026 Color Trends for Web Design: Chromatic Bioluminescence, Neo-Mineral, and High-Fidelity Darks',
    subtitle: 'From sub-surface luminescence to architectural earth pigments, explore the color philosophies redefining high-end digital products this year.',
    publishedAt: 'March 04, 2026',
    readTime: '6 min read',
    author: {
      name: 'Marcus Thorne',
      role: 'Creative Director & Brand Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    category: 'Trends',
    tags: ['Color Trends', '2026 Design', 'UI Direction', 'Art Direction'],
    paletteSample: ['#0D1117', '#1E3A8A', '#06B6D4', '#E2E8F0', '#F43F5E'],
    excerpt:
      'Discover the aesthetic shift toward biological iridescence, raw mineral clays, and high-fidelity atmospheric dark modes replacing generic flat palettes.',
    contentHtml: `
      <h2>The Rejection of Flat Digital Uniformity</h2>
      <p>Over the past five years, corporate software converged on an identical visual signature: stark white backgrounds, uniform <code>#3B82F6</code> primary buttons, and subdued slate borders. In 2026, the design industry is staging an emphatic counter-movement.</p>
      <p>Driven by wide-gamut OLED displays, hardware-accelerated CSS shaders, and a thirst for authentic brand character, leading digital studios are embracing three powerful chromatic movements.</p>

      <h2>Trend 1: Chromatic Bioluminescence & Sub-Surface Glow</h2>
      <p>Inspired by deep-sea organisms and translucent oceanic flora, this trend replaces harsh neon lasers with soft, organic internal glows. Colors appear to radiate from <em>behind</em> or <em>within</em> the UI components rather than being painted flat on top.</p>
      <ul>
        <li><strong>Anchor Tones:</strong> Deep Oceanic Obsidian (<code>#050811</code>) and Submerged Teal (<code>#082F49</code>).</li>
        <li><strong>Luminous Accents:</strong> Cyan Bioluminescent Pulse (<code>#06B6D4</code>) and Electric Hydrangea (<code>#8B5CF6</code>).</li>
        <li><strong>Technique:</strong> Multi-layered CSS radial gradients with smooth conic falloffs and subtle CSS backdrop filters.</li>
      </ul>

      <h2>Trend 2: Neo-Mineral & Architectural Terrazzo</h2>
      <p>As digital fatigue grows, interfaces designed for contemplative tools (writing applications, architectural portfolios, financial advisory platforms) are turning to tactile geology. This aesthetic borrows pigments from raw travertine, oxidized copper, terracotta, and slate clay.</p>
      <ul>
        <li><strong>Palette Core:</strong> Warm Ochre (<code>#D97706</code>), Weathered Celadon (<code>#64748B</code>), Sandstone Cream (<code>#F5F3EF</code>), and Raw Basalt (<code>#1C1917</code>).</li>
        <li><strong>Philosophy:</strong> Low saturation, high typographic weight, and textural micro-borders (0.5px) that mimic physical stationery.</li>
      </ul>

      <h2>Trend 3: High-Fidelity Atmospheric Dark Modes</h2>
      <p>Pure black (<code>#000000</code>) against pure white text creates jarring visual vibration ("halation effect") on modern high-contrast displays. In 2026, leading design systems treat dark mode not as the absence of light, but as an atmospheric lighting environment.</p>
      <p>Dark backdrops are subtly tinted with 3% to 6% of the brand’s core chromatic temperature—such as midnight carbon with a deep indigo undertone (<code>#0B0E14</code>). UI layers elevate along the Z-axis by adopting lighter, warmer surfaces with precise edge illumination.</p>

      <h2>How to Implement These Trends in Production</h2>
      <p>Adopting cutting-edge color directions doesn't require risking brand legitimacy or accessibility:</p>
      <ol>
        <li>Keep your core body typography strictly within WCAG AA thresholds regardless of your moody backdrop.</li>
        <li>Reserve high-chroma bioluminescent gradients for key focal points: hero interactive badges, charts, and primary CTAs.</li>
        <li>Use OKLCH color spaces in CSS to avoid intermediate "muddy grey" zones in complex gradients.</li>
      </ol>
    `,
  },
  {
    slug: 'mastering-modern-css-color-spaces',
    title: 'Mastering Modern CSS Color Spaces: OKLCH, Display P3 & Wide-Gamut Gradients',
    subtitle: 'Why sRGB is no longer enough. Learn how OKLCH unlocks vivid, perceptually linear gradients without the dreaded gray dead zone.',
    publishedAt: 'March 10, 2026',
    readTime: '8 min read',
    author: {
      name: 'Dr. Sarah Lin',
      role: 'Color Systems Researcher & Frontend Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    category: 'Engineering',
    tags: ['OKLCH', 'CSS Color 4', 'Display P3', 'Wide Gamut', 'Frontend'],
    paletteSample: ['#1E1B4B', '#4F46E5', '#06B6D4', '#10B981', '#F59E0B'],
    excerpt:
      'A deep dive into CSS Color Module Level 4. How OKLCH solves the perceptual lightness bugs of HSL and why Display P3 lets you show colors impossible in sRGB.',
    contentHtml: `
      <h2>The Thirty-Year Dominance of sRGB</h2>
      <p>For three decades, web browsers operated almost exclusively within the sRGB color space, standardized in 1996 for cathode-ray tube monitors. While universal, sRGB can only display approximately 35% of all colors perceptible to the human eye.</p>
      <p>Today, virtually every smartphone, tablet, and laptop display ships with <strong>Display P3</strong> capability, reproducing roughly 50% more vibrant greens, deep oranges, and electric magentas than standard sRGB.</p>

      <h2>The Fatal Flaw in HSL: Perceptual Inconsistency</h2>
      <p>Frontend developers embraced HSL (Hue, Saturation, Lightness) because it was intuitive compared to raw hex codes. However, HSL is mathematically flawed for design systems because it ignores human eye physiology:</p>
      <ul>
        <li><code>hsl(60, 100%, 50%)</code> is pure Yellow. Perceived brightness is almost 93%.</li>
        <li><code>hsl(240, 100%, 50%)</code> is pure Blue. Perceived brightness is only 12%.</li>
      </ul>
      <p>In HSL, both colors claim a "Lightness" of 50%, but one is blinding and the other is near pitch-black. This makes automated color-ramps in HSL unpredictable for accessibility.</p>

      <h2>Enter OKLCH: The Perceptually Linear Miracle</h2>
      <p>Developed in 2020 by Björn Ottosson, OKLCH models color based on how human photoreceptors actually interpret light:</p>
      <pre><code>/* Syntax */
color: oklch(L C H);
/* L = Lightness (0% - 100%)
   C = Chroma (0 - ~0.4)
   H = Hue angle (0 - 360) */

.button-primary {
  background: oklch(0.65 0.24 260); /* Vibrant violet */
}
      </code></pre>
      <p>In OKLCH, if two colors share a Lightness of <code>0.65</code>, they have the exact same perceived luminance to human vision, regardless of whether the hue is lime green, sky blue, or fiery orange. Contrast calculations become mathematically reliable.</p>

      <h2>Banishing the Gradient "Gray Dead Zone"</h2>
      <p>Have you ever created a gradient from bright blue to bright yellow in CSS and noticed a dirty, muddy brownish-gray smear in the middle? That happens because sRGB interpolates linearly through dull coordinate space.</p>
      <p>Modern CSS allows you to declare the interpolation color space directly in your gradients:</p>
      <pre><code>/* Standard muddy sRGB gradient */
background: linear-gradient(to right, #0055ff, #ffff00);

/* Vibrant, clear OKLCH interpolated gradient */
background: linear-gradient(in oklch to right, #0055ff, #ffff00);
      </code></pre>
      <p>By specifying <code>in oklch</code>, the browser interpolates along a natural chromatic arc, maintaining high saturation and brightness across the entire transition.</p>

      <h2>Practical Strategy for Production Web Apps in 2026</h2>
      <p>Browser support for OKLCH and modern color spaces is now over 95% across all major modern browsers. You can safely adopt modern color definitions with standard hex fallbacks for legacy systems, unlocking richer palettes and mathematically coherent UI states.</p>
    `,
  },
];
