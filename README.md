# ColorTools Studio

**Live site:** [colortools.utilix.site](https://colortools.utilix.site)

Creative agency-grade color suite for designers and developers.

## Features

- **Color Palette Generator** — intelligent, harmony-based palettes
- **Contrast Checker** — WCAG AA/AAA compliance
- **Gradient Studio** — dynamic gradient generator
- **Color Converter** — multi-format (HEX, RGB, HSL, etc.)
- Blog for design SEO content

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, Toast, etc.)
data/           Blog post data
```

## License

All rights reserved.
