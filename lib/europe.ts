/**
 * Low-detail outline of western Europe for the About map, as [lon, lat]
 * points, projected equirectangularly (x scaled by cos 50°) and smoothed into
 * curves so it reads as hand-drawn. Coastlines are approximate on purpose.
 */
type LonLat = [number, number];

export const MAP_BOUNDS = { lonMin: -11.5, lonMax: 16, latMin: 41.6, latMax: 59.2 };
const K = 40; // px per degree of latitude
const COS = Math.cos((50 * Math.PI) / 180);

export const MAP_WIDTH = Math.round((MAP_BOUNDS.lonMax - MAP_BOUNDS.lonMin) * COS * K);
export const MAP_HEIGHT = Math.round((MAP_BOUNDS.latMax - MAP_BOUNDS.latMin) * K);

export function project([lon, lat]: LonLat): [number, number] {
  return [(lon - MAP_BOUNDS.lonMin) * COS * K, (MAP_BOUNDS.latMax - lat) * K];
}

const IRELAND: LonLat[] = [
  [-6.2, 53.9],
  [-5.9, 54.6],
  [-6.6, 55.2],
  [-7.6, 55.3],
  [-8.3, 55.1],
  [-8.6, 54.6],
  [-10.0, 54.2],
  [-9.9, 53.5],
  [-10.2, 53.0],
  [-9.5, 52.6],
  [-10.3, 52.1],
  [-9.6, 51.6],
  [-8.5, 51.6],
  [-7.5, 52.0],
  [-6.4, 52.2],
  [-6.0, 52.9],
  [-6.2, 53.4],
  [-6.2, 53.9],
];

const GREAT_BRITAIN: LonLat[] = [
  [-5.7, 50.0],
  [-4.2, 50.4],
  [-3.0, 50.7],
  [-1.2, 50.8],
  [1.3, 51.1],
  [1.4, 51.4],
  [0.6, 51.5],
  [1.7, 52.6],
  [0.3, 53.1],
  [0.1, 53.6],
  [-0.4, 54.5],
  [-1.4, 55.0],
  [-1.8, 55.7],
  [-2.6, 56.1],
  [-1.8, 57.5],
  [-3.0, 58.6],
  [-5.0, 58.6],
  [-5.7, 57.9],
  [-5.6, 56.6],
  [-6.2, 56.3],
  [-5.5, 55.5],
  [-4.9, 55.0],
  [-5.0, 54.7],
  [-3.4, 54.9],
  [-3.0, 53.4],
  [-4.6, 53.3],
  [-4.2, 52.9],
  [-4.1, 52.2],
  [-5.3, 51.8],
  [-4.2, 51.5],
  [-3.1, 51.4],
  [-4.5, 51.1],
  [-5.7, 50.0],
];

/** Atlantic and North Sea coast, from Galicia to the Baltic (open path). */
const CONTINENT_NORTH: LonLat[] = [
  [-8.9, 41.7],
  [-9.3, 43.0],
  [-8.0, 43.7],
  [-5.8, 43.6],
  [-3.8, 43.4],
  [-1.8, 43.4],
  [-1.4, 44.6],
  [-1.2, 46.2],
  [-2.2, 47.1],
  [-2.5, 47.4],
  [-4.4, 47.8],
  [-4.8, 48.3],
  [-4.5, 48.6],
  [-3.0, 48.8],
  [-2.0, 48.6],
  [-1.6, 48.7],
  [-1.9, 49.7],
  [-1.2, 49.4],
  [0.2, 49.5],
  [1.1, 49.9],
  [1.6, 50.4],
  [1.9, 51.0],
  [3.0, 51.3],
  [3.6, 51.4],
  [4.4, 51.9],
  [4.8, 52.9],
  [5.6, 53.3],
  [7.0, 53.4],
  [8.0, 53.6],
  [8.6, 53.9],
  [8.8, 54.6],
  [8.4, 55.4],
  [8.1, 56.0],
  [8.2, 56.8],
  [8.6, 57.1],
  [9.9, 57.6],
  [10.6, 57.7],
  [10.3, 56.9],
  [10.9, 56.4],
  [10.2, 55.9],
  [10.0, 55.3],
  [11.0, 54.4],
  [12.4, 54.4],
  [13.8, 54.1],
  [14.3, 53.9],
  [16.0, 54.3],
];

/** Mediterranean coast from Catalonia to Liguria (open path). */
const CONTINENT_SOUTH: LonLat[] = [
  [3.2, 41.9],
  [3.2, 42.4],
  [3.0, 43.2],
  [4.0, 43.5],
  [5.0, 43.3],
  [6.2, 43.1],
  [7.4, 43.7],
  [8.8, 44.4],
  [10.2, 43.9],
  [10.5, 42.9],
  [11.2, 42.4],
  [12.0, 41.7],
];

/** Catmull-Rom spline through the points, as an SVG path ("hand-drawn" smoothness). */
function smoothPath(points: LonLat[], closed: boolean): string {
  const p = points.map(project);
  const at = (i: number) => p[Math.max(0, Math.min(p.length - 1, i))]!;
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(p[0]![0])} ${f(p[0]![1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

export const EUROPE_PATHS: string[] = [
  smoothPath(IRELAND, true),
  smoothPath(GREAT_BRITAIN, true),
  smoothPath(CONTINENT_NORTH, false),
  smoothPath(CONTINENT_SOUTH, false),
];

/** A gently curved route through the given points (quadratic arcs, bowed sideways). */
export function routePath(points: [number, number][]): string {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(points[0]![0])} ${f(points[0]![1])}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]!;
    const [x1, y1] = points[i]!;
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const dx = x1 - x0;
    const dy = y1 - y0;
    // Constant bow: an out-and-back leg (Paris → Brest → Luxembourg) curves on
    // opposite sides of the cities, so the two legs never overlap.
    const bow = 0.26;
    d += `Q${f(mx - dy * bow)} ${f(my + dx * bow)} ${f(x1)} ${f(y1)}`;
  }
  return d;
}
