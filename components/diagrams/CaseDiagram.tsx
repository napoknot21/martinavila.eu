import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/**
 * Functional diagram for the case study: four teams feed one platform, which
 * connects to PostgreSQL and an LLM sentiment service. No client screenshots.
 */
const line = {
  fill: 'none',
  stroke: 'var(--ink)',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  pathLength: 1,
  className: 'draw',
} as const;

const label = {
  fontFamily: 'var(--stack-mono)',
  fontSize: 10,
  letterSpacing: '0.08em',
  fill: 'var(--ink)',
  textAnchor: 'middle',
  className: 'draw-fade',
} as const;

/** `width`: displayed size in CSS px, so strokes measure 1.25 px on screen. */
export function CaseDiagram({
  locale,
  className,
  width = 440,
}: {
  locale: Locale;
  className?: string;
  width?: number;
}) {
  const d = getContent(locale).home.work.feature.diagram;
  const teams = d.teams.map((name, i) => ({ name, x: 12 + i * 98, cx: 12 + i * 98 + 41 }));

  return (
    <svg
      viewBox="0 0 400 330"
      className={`diagram ${className ?? ''}`}
      style={{ ['--sw' as string]: ((1.25 * 400) / width).toFixed(3) }}
      role="img"
      aria-labelledby="case-diagram-title case-diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="case-diagram-title">{d.title}</title>
      <desc id="case-diagram-desc">{d.description}</desc>

      {teams.map((team) => (
        <g key={team.name}>
          <rect x={team.x} y="12" width="82" height="40" rx="1" {...line} />
          <text x={team.cx} y="36" {...label}>
            {team.name.toUpperCase()}
          </text>
          <path d={`M${team.cx} 52 C ${team.cx} 96, 200 92, 200 128`} {...line} />
        </g>
      ))}

      {/* platform */}
      <rect x="120" y="128" width="160" height="58" rx="1" {...line} stroke="var(--accent)" />
      <text x="200" y="161" {...label} fill="var(--accent)" fontSize="12">
        {d.platform.toUpperCase()}
      </text>

      <path d="M170 186 C 170 220, 92 214, 92 246" {...line} />
      <path d="M230 186 C 230 220, 308 214, 308 246" {...line} />

      {/* PostgreSQL cylinder */}
      <ellipse cx="92" cy="252" rx="46" ry="8" {...line} />
      <path d="M46 252 V304 A46 8 0 0 0 138 304 V252" {...line} />
      <text x="92" y="286" {...label}>
        {d.database.toUpperCase()}
      </text>

      {/* LLM sentiment */}
      <rect x="250" y="246" width="116" height="66" rx="1" {...line} />
      <path d="M262 302 L282 290 L298 296 L318 280 L336 286 L354 274" {...line} />
      <text x="308" y="266" {...label} fontSize="9">
        {d.llm.toUpperCase()}
      </text>
    </svg>
  );
}

export default CaseDiagram;
