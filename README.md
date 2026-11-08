# martinavila.eu

Corporate website of **Martin Avila Technologies**: Next.js (App Router, TypeScript, static export), Tailwind CSS, GSAP + Lenis, Three.js (React Three Fiber), Formspree. English at `/`, French at `/fr`, Spanish at `/es`.

## Setup

Requires Node.js 22.18 or later (the placeholder check runs TypeScript directly).

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script                  | What it does                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Development server                                                 |
| `npm run build`         | Production build into `out/`. **Fails while placeholders remain.** |
| `npm run build:preview` | Same build, placeholders allowed (staging and review copies)       |
| `npm run start`         | Serves `out/` locally                                              |
| `npm run lint`          | ESLint (zero warnings) + TypeScript type check                     |
| `npm run format`        | Prettier                                                           |

## Environment variables

| Variable                   | Required | Purpose                                                                                                                  |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_FORMSPREE_ID` | yes      | Formspree form ID, the part after `https://formspree.io/f/`. Without it the form shows an error that points to LinkedIn. |

It is read at build time, so set it on the host before building. The address that receives messages is configured **in the Formspree dashboard only**; it never appears in the site code.

## Private values and the build guard

Every private or deployment-specific value lives in [`config/site.ts`](config/site.ts) and ships as a `{{PLACEHOLDER}}`:

| Key                         | Shown on     | Notes                                                        |
| --------------------------- | ------------ | ------------------------------------------------------------ |
| `businessAddress`           | Legal notice | Professional address, not a home address                     |
| `vatNumber`                 | Legal notice | Filled in; shown with a "Verify on VIES" link                |
| `hosting.name` / `.address` | Legal notice | LetsHost, operated by Team Blue Internet Services IE Limited |

`npm run build` runs [`scripts/check-placeholders.ts`](scripts/check-placeholders.ts) first and stops with the list of placeholders still present.

**No email address** is published anywhere on the site, the legal notice included: contact goes through the form, whose receiving address is set in the Formspree dashboard.

**Contact form anti-spam.** A hidden honeypot field, a 3-second minimum between the form appearing and submit (faster submissions are dropped silently), and Formspree's own spam filtering.

## Copy and languages

All text lives in [`content/en.ts`](content/en.ts), [`content/fr.ts`](content/fr.ts) and [`content/es.ts`](content/es.ts), typed by [`content/types.ts`](content/types.ts). English is the reference version, especially for the legal notice and privacy policy. In legal copy, `[label](/path)` becomes a link, and internal paths are localized automatically.

## Photos

Generic, royalty-free city photos (Unsplash or Pexels), **never people**. Any colour photo works: a navy duotone is applied in code. Until a file exists, a navy block of the same ratio is shown. The check happens at build time, so rebuild after adding files.

```
public/images/dublin-dusk.jpg     About opening, also chapter 4 for now
public/images/paris.jpg           About, chapter 1
public/images/brest.jpg           About, chapter 2 (harbour or ocean)
public/images/luxembourg.jpg      About, chapter 3 (old town or Kirchberg)
public/videos/*.mp4               Optional 4–6 s loops, < 1.5 MB each, same names
```

Export JPEGs 1920 px wide, quality 70–75 (≈ 150–400 kB each). Then add a phone copy next to each one, `<name>-960.webp` (or `.jpg`). The static export cannot resize images, so phones would otherwise download the full file. When the copy exists, it is picked up automatically through `srcset`:

````bash
magick public/images/paris.jpg -resize '960x>' -strip -quality 60 -define webp:method=6 public/images/paris-960.webp
``` For videos, `scripts/prepare-video.sh <input> <paris|brest|luxembourg|dublin> [start]` produces a compliant clip.

## Deploy

The site is fully static: everything is in `out/` after the build.

**LetsHost (current host, Apache shared hosting)**

1. Set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`, then run `npm run build` locally.
2. Upload the **contents** of `out/` into `public_html/` (cPanel File Manager or FTP), including the hidden `.htaccess` and the `_next/` folder. Delete old files first.
3. In the control panel, enable the free SSL certificate for `martinavila.eu` and `www`. Then uncomment the two HTTPS lines at the top of `public/.htaccess` and the `Strict-Transport-Security` line, rebuild and upload again.

`public/.htaccess` (copied into `out/` by the build) handles what Apache does not do by default:
- clean URLs (`/contact` serves `contact.html`; `/contact/` redirects to `/contact`);
- the 404 page;
- `www` redirects to the bare domain;
- the PNG type for the social images;
- long caching for hashed assets;
- compression and security headers: a Content-Security-Policy that only allows Formspree as an outside connection, nosniff, no framing.

It was tested on Apache 2.4.

**Cloudflare Pages or Netlify (alternative)**

Build command `npm run build`, output directory `out`, environment variables `NEXT_PUBLIC_FORMSPREE_ID` and `NODE_VERSION=22`. Both handle clean URLs and `404.html` themselves; `.htaccess` is ignored. If the host changes, update `hosting` in `config/site.ts` (shown on the legal notice).

## SEO

Every page has its own title and description, a canonical URL on `https://martinavila.eu`, and `hreflang` alternates (en, fr, es, x-default). `sitemap.xml` (18 URLs) and `robots.txt` (excludes `/dev/`) are generated at build time, as are the Open Graph and Twitter images (1200 × 630). The site sets no cookies and loads no trackers, so there is no cookie banner.

## Structure

````

app/(en)/ English routes (root layout, lang="en")
app/[locale]/ French and Spanish routes (/fr, /es)
app/global-not-found.tsx 404 for every language
components/pages/ Page bodies shared by all languages
components/sections/ Home page sections
components/contact/ Contact form
components/legal/ Email reveal for the legal notice
components/three/ 3D signature surface and its static SVG frame
config/site.ts Private values (placeholders)
content/ Copy in three languages
lib/ i18n, metadata, motion helpers, surface function

```

## Motion and accessibility

- One orchestrated moment per page at most: home loader and hero, the About journey. Contact, legal and 404 pages do not animate (contact: one 400 ms fade).
- `prefers-reduced-motion: reduce` disables Lenis, every scroll-driven animation and the loader, and shows the surface as one still frame.
- Phones get the still frame too (no 3D download).
```
