import { IBM_Plex_Sans, JetBrains_Mono, Libre_Caslon_Display, Libre_Caslon_Text } from 'next/font/google';

/**
 * Display: headings and statements. 400, 400 italic, 700.
 * Not preloaded: three static faces would compete with the first paint
 * (measured: preloading them pushed LCP back by about 1 s on mobile).
 * The metric-matched fallback (adjustFontFallback) keeps the swap shift-free.
 */
export const display = Libre_Caslon_Text({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-display',
});

/**
 * Title face for the reading pages (contact, legal, privacy, 404): Libre Caslon
 * Display, cut for large sizes. One weight, not preloaded: it is used on four
 * pages only, where the Caslon Text paragraph is the larger paint.
 */
export const title = Libre_Caslon_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-title',
});

/** Body copy. */
export const body = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

/** Utility: labels, section numbers, figures, code, formulas. Not preloaded (small, non-critical text). */
export const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-mono',
});

export const fontVariables = [display, title, body, mono].map((f) => f.variable).join(' ');
