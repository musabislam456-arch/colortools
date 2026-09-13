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
  {
    slug: 'tailwind-color-shades-generator-guide',
    title: 'How to Generate Custom Tailwind CSS Color Shades (50–950) From Any Brand Color',
    subtitle: 'Stop hand-picking eleven hex codes per color. Learn the lightness-curve algorithm behind consistent Tailwind palettes, and generate an accessible scale in seconds.',
    publishedAt: 'March 18, 2026',
    readTime: '9 min read',
    author: {
      name: 'Priya Raman',
      role: 'Design Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    category: 'Engineering',
    tags: ['Tailwind CSS', 'Design Tokens', 'Color Shades', 'Accessibility'],
    paletteSample: ['#EEF2FF', '#818CF8', '#4F46E5', '#312E81', '#1E1B4B'],
    excerpt:
      'Tailwind ships eleven shades for every default color, but your brand color only gives you one. Here is the actual lightness-curve algorithm for building the other ten, plus accessible export-ready code.',
    contentHtml: `
      <h2>The One-Color Problem</h2>
      <p>Every Tailwind project eventually hits the same wall. Your brand guidelines hand you a single hex code — say <code>#4F46E5</code> — but Tailwind's own colors like <code>slate</code> or <code>indigo</code> ship as eleven coordinated shades, from a near-white <code>50</code> to a near-black <code>950</code>. The moment you add a custom brand color to <code>tailwind.config.js</code>, that coordination disappears. You get exactly one shade and have to invent the other ten yourself.</p>
      <p>Most developers solve this by eyeballing it in a color picker, nudging the lightness slider until a hover state "looks about right." The result is a brand color scale that does not visually match Tailwind's built-in palettes at all — steps that jump unevenly, a 700 that is barely darker than 600, or a 900 so dark it looks like a different hue entirely.</p>

      <h2>How Tailwind's Own Palette Is Actually Built</h2>
      <p>Tailwind's default colors are not randomly chosen — they follow a consistent lightness ladder. Each numbered stop maps to a target lightness percentage, and the ladder gets noticeably steeper at the light and dark ends, because human eyes are far more sensitive to lightness differences near white and black than in the midtones:</p>
      <pre><code>50   → ~97% lightness  (near-white surface)
100  → ~94%
200  → ~86%
300  → ~76%
400  → ~65%
500  → ~55%  (typical "base" tone)
600  → ~45%
700  → ~36%
800  → ~27%
900  → ~18%
950  → ~11%  (near-black text/background)</code></pre>
      <p>To reconstruct this for a custom brand color, you convert the hex to HSL, keep the <strong>hue</strong> constant across every stop, and walk the <strong>lightness</strong> value down this ladder. The tricky part — the part most quick scripts skip — is what happens to <strong>saturation</strong> near the extremes.</p>

      <h2>Why Saturation Has to Shrink Near White and Black</h2>
      <p>If you hold saturation constant while dropping lightness toward 10%, highly saturated hues turn muddy and lose their identity — a vivid purple at 90% saturation and 11% lightness reads as nearly black with no purple left in it. Push saturation toward 95%+ at 97% lightness and you get a neon, slightly artificial pastel instead of a soft, usable near-white surface.</p>
      <p>The fix is to trim saturation by roughly 15–30% only at the two extreme ends of the ladder (below ~13% or above ~92% lightness), while leaving the midtones — where your color actually needs to stay recognizable, like the 400–600 range used for buttons and links — untouched. This is the exact approach used by the shade generator on this page: saturation is reduced only where the human eye would otherwise perceive muddiness or artificial neon brightness, not applied uniformly across all eleven stops.</p>

      <h2>Pinning Your Exact Brand Color</h2>
      <p>One more detail matters: your original hex code should never be silently altered. A generator that recalculates all eleven stops from scratch, including the one closest to your input, will drift your brand color by a few percentage points — often just enough that a pixel-perfect brand guideline stops matching in production.</p>
      <p>The correct approach is to find which of the eleven lightness stops your color's own lightness is closest to, and <strong>pin your exact hex to that stop untouched</strong>. Every other shade is then derived outward from that anchor. So if your brand hex has 56% lightness, it gets pinned exactly at <code>500</code>, and the generator builds <code>50</code> through <code>950</code> around it — never touching your original value.</p>

      <h2>Accessible Text Pairing, Not an Afterthought</h2>
      <p>A shade scale is only useful if you know which shades are safe to put text on. The common shorthand — "light shades get dark text, dark shades get light text" — is a reasonable starting point, but the actual WCAG contrast ratio should be checked per shade, not assumed:</p>
      <ul>
        <li>Shades <strong>50–300</strong> almost always pass 4.5:1 (WCAG AA) with near-black text.</li>
        <li>Shades <strong>600–950</strong> almost always pass 4.5:1 with white text.</li>
        <li>Shades <strong>400–500</strong> are the danger zone — depending on the hue, they may fail AA with both white and black text at normal sizes, and are safer reserved for large text, icons, or borders rather than body copy.</li>
      </ul>
      <p>Calculating the actual relative luminance formula (<code>(L1 + 0.05) / (L2 + 0.05)</code>) for every shade against both white and black, and surfacing whichever wins, removes the guesswork entirely instead of relying on a rule of thumb.</p>

      <h2>Tailwind v3 vs v4: Where the Color Actually Goes</h2>
      <p>The output format changed meaningfully between major versions:</p>
      <pre><code>/* Tailwind v3 — tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#4F46E5',
          600: '#4338CA',
          // ...
        },
      },
    },
  },
};

/* Tailwind v4 — CSS-first @theme */
@theme {
  --color-brand-500: #4F46E5;
  --color-brand-600: #4338CA;
  /* ... */
}</code></pre>
      <p>v4's CSS-first configuration means your custom shade scale lives directly in a stylesheet as CSS variables, which also makes it trivial to override per-theme (for example, swapping values inside a <code>[data-theme="dark"]</code> block) without touching JavaScript config at all.</p>

      <h2>Generate Your Scale</h2>
      <p>Rather than hand-rolling this HSL math in a spreadsheet, the <a href="/tools/tailwind-shades">Tailwind Color Shades Generator</a> on this site runs the exact lightness-curve algorithm described above: paste in your brand hex, get all eleven shades with accessible text labels already resolved, and copy straight into a v3 config, a v4 <code>@theme</code> block, plain CSS variables, or JSON.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ol>
        <li><strong>Linear HSL steps with no saturation curve.</strong> Evenly spacing lightness from 0–100% without trimming saturation at the extremes produces muddy dark shades and neon-pastel light shades.</li>
        <li><strong>Recalculating the base color.</strong> If your exact brand hex isn't preserved at one exact stop, your "brand-500" class will render a slightly different color than your actual logo or brand guideline.</li>
        <li><strong>Assuming text pairing instead of checking it.</strong> Mid-range shades (400–500) are the most likely to silently fail WCAG AA — verify, don't assume.</li>
        <li><strong>Hardcoding hex values instead of CSS variables.</strong> In Tailwind v4 especially, exporting to <code>@theme</code> CSS variables (rather than pasted hex strings) makes dark-mode and per-brand theme overrides far easier to maintain later.</li>
      </ol>
    `,
  },
];
