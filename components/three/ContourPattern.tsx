import { CONTOUR_DENSITY, SURFACE_SIZE, surfaceHeight } from '@/lib/surface';

/**
 * Faint static contour map of the signature surface, seen from above: the
 * pattern the hero's scroll timeline lands on. Marching squares over the same
 * function and contour spacing as the shader, in --rule (#D5DCE8).
 *
 * Generated at build time into the static file /contours.svg
 * (app/contours.svg/route.ts) and shown with a lazy <img>.
 */
const N = 72; // samples per side
const TIME = 7.5;

type Pt = [number, number];

function contourSegments(): string {
  const half = SURFACE_SIZE / 2;
  const step = SURFACE_SIZE / N;
  const field: number[][] = [];
  for (let j = 0; j <= N; j++) {
    const row: number[] = [];
    for (let i = 0; i <= N; i++) {
      row.push(surfaceHeight(-half + i * step, -half + j * step, TIME) * CONTOUR_DENSITY);
    }
    field.push(row);
  }

  let min = Infinity;
  let max = -Infinity;
  for (const row of field) {
    for (const v of row) {
      min = Math.min(min, v);
      max = Math.max(max, v);
    }
  }

  const parts: string[] = [];
  const fmt = (n: number) => n.toFixed(1);
  const lerp = (a: Pt, b: Pt, va: number, vb: number, level: number): Pt => {
    const t = (level - va) / (vb - va);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };

  for (let level = Math.ceil(min); level <= Math.floor(max); level++) {
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const v0 = field[j]![i]!;
        const v1 = field[j]![i + 1]!;
        const v2 = field[j + 1]![i + 1]!;
        const v3 = field[j + 1]![i]!;
        const p0: Pt = [i, j];
        const p1: Pt = [i + 1, j];
        const p2: Pt = [i + 1, j + 1];
        const p3: Pt = [i, j + 1];
        const crossings: Pt[] = [];
        if (v0 < level !== v1 < level) crossings.push(lerp(p0, p1, v0, v1, level));
        if (v1 < level !== v2 < level) crossings.push(lerp(p1, p2, v1, v2, level));
        if (v2 < level !== v3 < level) crossings.push(lerp(p2, p3, v2, v3, level));
        if (v3 < level !== v0 < level) crossings.push(lerp(p3, p0, v3, v0, level));
        for (let k = 0; k + 1 < crossings.length; k += 2) {
          const a = crossings[k]!;
          const b = crossings[k + 1]!;
          parts.push(`M${fmt(a[0])} ${fmt(a[1])}L${fmt(b[0])} ${fmt(b[1])}`);
        }
      }
    }
  }
  return parts.join('');
}

/** The full standalone SVG document, served as /contours.svg (built statically). */
export function contourSvgDocument(): string {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" preserveAspectRatio="xMidYMid slice">`,
    '<defs><radialGradient id="f" cx="50%" cy="50%" r="50%">',
    '<stop offset="40%" stop-color="#fff" stop-opacity="1"/>',
    '<stop offset="100%" stop-color="#fff" stop-opacity="0"/>',
    `</radialGradient><mask id="m"><rect width="${N}" height="${N}" fill="url(#f)"/></mask></defs>`,
    `<path d="${contourSegments()}" mask="url(#m)" fill="none" stroke="#D5DCE8" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round"/>`,
    '</svg>',
  ].join('');
}

/**
 * Decorative background: the static file, so the path costs no HTML weight
 * and no hydration work. Lazy-loaded (it sits below the fold).
 */
export function ContourPattern({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static decorative SVG, no optimisation needed
    <img
      src="/contours.svg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      width={1200}
      height={1200}
      className={`object-cover ${className}`}
    />
  );
}

export default ContourPattern;
