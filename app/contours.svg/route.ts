import { contourSvgDocument } from '@/components/three/ContourPattern';

export const dynamic = 'force-static';

/** Static contour map behind § 01, generated once at build time. */
export function GET(): Response {
  return new Response(contourSvgDocument(), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
