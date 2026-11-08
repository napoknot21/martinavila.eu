/**
 * The signature surface: a calm function of two variables.
 *
 *   h(x, z, t) = two Gaussian bumps whose centres drift on small circles
 *              + two low-frequency sine waves at different angles.
 *
 * One full cycle takes SURFACE_PERIOD seconds. The same function exists in
 * TypeScript (static SVG frames, contour pattern) and GLSL (WebGL shader),
 * so every rendering of the surface agrees.
 */
export const SURFACE_SIZE = 10;
export const SURFACE_SEGMENTS = 160;
export const SURFACE_PERIOD = 25;
/** Contour lines per unit of (un-amplified) height, shared by shader and SVG. */
export const CONTOUR_DENSITY = 6;

export function surfaceHeight(x: number, z: number, t: number): number {
  const w = (Math.PI * 2 * t) / SURFACE_PERIOD;
  const c1x = -1.4 + 0.6 * Math.cos(w);
  const c1z = -0.8 + 0.6 * Math.sin(w);
  const c2x = 1.6 + 0.5 * Math.cos(w + 2.1);
  const c2z = 1.2 + 0.5 * Math.sin(w + 2.1);
  const g1 = 1.1 * Math.exp(-((x - c1x) ** 2 + (z - c1z) ** 2) / 2.6);
  const g2 = 0.75 * Math.exp(-((x - c2x) ** 2 + (z - c2z) ** 2) / 3.4);
  const s1 = 0.16 * Math.sin(0.55 * x + 0.25 * z + w);
  const s2 = 0.12 * Math.sin(-0.2 * x + 0.6 * z - w);
  return g1 + g2 + s1 + s2;
}

export const SURFACE_GLSL = /* glsl */ `
float surfaceHeight(vec2 p, float t) {
  float w = 6.28318530718 * t / ${SURFACE_PERIOD.toFixed(1)};
  vec2 c1 = vec2(-1.4 + 0.6 * cos(w), -0.8 + 0.6 * sin(w));
  vec2 c2 = vec2(1.6 + 0.5 * cos(w + 2.1), 1.2 + 0.5 * sin(w + 2.1));
  vec2 d1 = p - c1;
  vec2 d2 = p - c2;
  float g1 = 1.1 * exp(-dot(d1, d1) / 2.6);
  float g2 = 0.75 * exp(-dot(d2, d2) / 3.4);
  float s1 = 0.16 * sin(dot(p, vec2(0.55, 0.25)) + w);
  float s2 = 0.12 * sin(dot(p, vec2(-0.2, 0.6)) - w);
  return g1 + g2 + s1 + s2;
}
`;
