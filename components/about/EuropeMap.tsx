import type { Chapter } from '@/content/types';
import { EUROPE_PATHS, MAP_HEIGHT, MAP_WIDTH, project, routePath } from '@/lib/europe';

/**
 * Scene 3 map: a low-detail, hand-drawn-looking outline of western Europe
 * (navy, 1 px), the four cities placed by an equirectangular projection of
 * their real coordinates, and the royal-blue route Paris → Brest →
 * Luxembourg → Dublin (drawn by EuropeRoute).
 */
export function EuropeMap({
  chapters,
  title,
  description,
}: {
  chapters: Chapter[];
  title: string;
  description: string;
}) {
  const points = chapters.map((c) => project([c.lon, c.lat]));
  const last = points[points.length - 1]!;
  // Labels: Brest and Dublin to the left of their dot, the others to the right.
  const labelLeft = new Set(['brest', 'dublin']);

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby="europe-title europe-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="europe-title">{title}</title>
      <desc id="europe-desc">{description}</desc>

      <g
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      >
        {EUROPE_PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <path
        data-route
        d={routePath(points)}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
      />

      {chapters.map((c, i) => {
        const [x, y] = points[i]!;
        const left = labelLeft.has(c.id);
        return (
          <g key={c.id}>
            <circle cx={x} cy={y} r="4.5" fill="var(--ink)" />
            <text
              x={left ? x - 12 : x + 12}
              y={y + 4}
              textAnchor={left ? 'end' : 'start'}
              style={{ fontFamily: 'var(--stack-mono)', fontSize: 13, letterSpacing: '0.08em' }}
              fill="var(--ink)"
            >
              {c.city.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Dublin pulse ring (animated once by EuropeRoute) */}
      <circle
        data-pulse
        cx={last[0]}
        cy={last[1]}
        r="4.5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        className="map-pulse"
      />
    </svg>
  );
}

export default EuropeMap;
