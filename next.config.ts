import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

// The placeholder check runs as the `prebuild` npm script (scripts/check-placeholders.ts).
export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    output: 'export',
    trailingSlash: false,
    images: { unoptimized: true },
    reactStrictMode: true,
    poweredByHeader: false,
    // `page.dev.tsx` routes (e.g. /dev/surface) exist only in `next dev`.
    pageExtensions: dev ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],
    // One root layout per language → a global 404 for unmatched URLs.
    experimental: { globalNotFound: true },
  };
}
