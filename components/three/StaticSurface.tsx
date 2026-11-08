'use client';

import { SURFACE_SIZE, surfaceHeight } from '@/lib/surface';

/**
 * Static SVG rendering of the signature surface in a three-quarter view: the
 * first paint, the frame phones keep, the no-WebGL fallback, and the image
 * shown until the 3D chunk has loaded.
 *
 * A client component on purpose: it is still rendered into the HTML, but the
 * geometry is not duplicated in the RSC payload (it is recomputed, identically,
 * on hydration). Coordinates are integers on a ×50 viewBox to keep it light.
 */
const LINES = 40; // one line every 1/40 of the plane, like the shader
const SAMPLES = 40;
const HEIGHT_SCALE = 1.25;
const SCALE = 50;
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

function project(x: number, z: number): string {
  const h = surfaceHeight(x, z, 7.5) * HEIGHT_SCALE;
  const px = Math.round((x - z) * COS * SCALE);
  const py = Math.round(((x + z) * SIN * 0.9 - h) * SCALE);
  return `${px},${py}`;
}

function buildLines(): { points: string; major: boolean }[] {
  const half = SURFACE_SIZE / 2;
  const step = SURFACE_SIZE / LINES;
  const sample = SURFACE_SIZE / SAMPLES;
  const lines: { points: string; major: boolean }[] = [];
  for (let i = 0; i <= LINES; i++) {
    const fixed = -half + i * step;
    const row: string[] = [];
    const col: string[] = [];
    for (let j = 0; j <= SAMPLES; j++) {
      const v = -half + j * sample;
      row.push(project(v, fixed));
      col.push(project(fixed, v));
    }
    const major = i % 5 === 0;
    lines.push({ points: row.join(' '), major }, { points: col.join(' '), major });
  }
  return lines;
}

const LINES_DATA = buildLines();

export function StaticSurface({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-460 -320 920 610"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      // Radial fade as a CSS mask (composited), not an SVG <mask> (off-screen pass).
      style={{
        maskImage: 'radial-gradient(ellipse 55% 58% at 50% 55%, #000 55%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 55% 58% at 50% 55%, #000 55%, transparent 100%)',
      }}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="var(--sky)"
        strokeOpacity="0.32"
        strokeWidth="0.75"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      >
        {LINES_DATA.map((line, i) => (
          <polyline
            key={i}
            points={line.points}
            strokeOpacity={line.major ? 0.75 : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

export default StaticSurface;
