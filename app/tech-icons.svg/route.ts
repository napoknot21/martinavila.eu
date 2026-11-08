import { techSpriteDocument } from '@/lib/techIcons';

export const dynamic = 'force-static';

/** SVG sprite of the technology logos (simple-icons), generated at build time. */
export function GET(): Response {
  return new Response(techSpriteDocument(), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
